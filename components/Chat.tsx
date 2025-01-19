'use client';

import React, { Fragment, useRef, useState } from 'react';
import { LLMMessage, runTradeAI } from '@/langchain';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import ActionBubble from '@/components/ActionBubble';
import ChatBubble from '@/components/ChatBubble';
import { getAmountIn, getAmountOut, swap } from '@/lib/swap';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { useToast } from '@/hooks/use-toast';
import ChatInput from './ChatInput';
import { getPragmaTokenFromName, getTokenAddressFromSymbol } from '@/lib/utils';
import { stake } from '@/lib/stake';


type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}


function ErrorChatBubble() {
    return <ChatBubble text="An error occured. Please try again" side="left" sender="AI"/>;
}
export default function Chat() {
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { account } = useArgentTelegram();
    const { toast } = useToast();
    
    async function sendMessage() {
        const message = inputRef.current?.value;
        if (message) {
            // clear message
            inputRef.current.value = '';
            
            // send message to AI for response
            const newMessage = new HumanMessage(message);
            // append new message to messages
            setMessages((prev) => [
                ...prev,
                { message: newMessage, chatBubble: <ChatBubble text={message} side="right" sender="You"/> },
            ]);
            
            const response = await runTradeAI([...messages.map(message => message.message), newMessage]);
            
            const tempMessage = new AIMessage('');
            tempMessage.content = response.content;
            tempMessage.tool_calls = response.tool_calls;
            
            
            if (!tempMessage.tool_calls) return;
            switch (tempMessage.tool_calls[0].name) {
                case 'stakeConfirm':
                    const stakeBubble = await createActionBubble(tempMessage, 'stake') ??
                        ErrorChatBubble();
                    return setMessages((prev) => [...prev, { message: tempMessage, chatBubble: stakeBubble }]);
                case 'swapConfirm':
                    const swapBubble = await createActionBubble(tempMessage, 'swap') ??
                        ErrorChatBubble();
                    return setMessages((prev) => [...prev, { message: tempMessage, chatBubble: swapBubble }]);
                default:
                    throw new Error('Unknown tool call');
            }
            
            
            // append new message to messages
            // setMessages((prev) => [
            //     ...prev,
            //     {
            //         message: tempMessage,
            //         chatBubble: <ChatBubble text={response.content as string} side="left" sender="AI"/>,
            //     },
            // ]);
        }
    }
    
    
    async function createActionBubble(message: LLMMessage, action: 'stake' | 'swap') {
        if (message instanceof HumanMessage) return;
        const toolCall = message.tool_calls?.find((toolCall) => toolCall.name.endsWith('Confirm'));
        if (!toolCall) return;
        
        if (!account) return <ChatBubble
            text="Please connect your wallet before performing this action" side="left"
            sender="AI"/>;
        
        switch (action) {
            case 'stake':
                if (!toolCall.args.token) return <ChatBubble
                    text="Only the stark token can be staked" side="left"
                    sender="AI"/>;
                const stakeAmount = toolCall.args.amount ?? 1n;
                
                const stakeFunction = async () => {
                    try {
                        await stake(stakeAmount, account.address);
                    } catch {
                        toast({
                            title: 'Error',
                            variant: 'destructive',
                            description: 'An error occurred executing the stake',
                        });
                    }
                    
                    toast({
                        title: 'Success',
                        description: 'Stake executed successfully',
                    });
                };
                
                return <ActionBubble
                    text={
                        `Confirm Stake ${stakeAmount} ${toolCall.args.token}`}
                    actionName={'Stake'} side="left" sender="AI" callback={() => stakeFunction}/>;
            
            case 'swap':
                const tokenIn = toolCall.args.tokenIn;
                const tokenOut = toolCall.args.tokenOut;
                // need at least 1 known token to swap
                if (!tokenIn || !tokenOut) return <ChatBubble text="Invalid swap request" side="left" sender="AI"/>;
                let amountIn = toolCall.args.amountIn;
                let amountOut = toolCall.args.amountOut;
                if (!amountIn && !amountOut) amountOut = 1n;
                
                let swapFunction;
                // quote swap
                if (amountIn) {
                    // multiply by decimals
                    const pragmaToken = getPragmaTokenFromName(tokenIn);
                    if (!pragmaToken) return ErrorChatBubble();
                    const amountInFormatted = BigInt(amountIn * 10 ** pragmaToken.Decimals);
                    // get amountOut
                    console.log(getTokenAddressFromSymbol(tokenIn), getTokenAddressFromSymbol(tokenOut), account.address, amountInFormatted);
                    const quoteOut = await getAmountOut(getTokenAddressFromSymbol(tokenIn), getTokenAddressFromSymbol(tokenOut), account.address, amountInFormatted);
                    if (!quoteOut[0]) return ErrorChatBubble();
                    amountOut = quoteOut[0].buyAmount;
                    
                    let res = '';
                    swapFunction = async () => {
                        try {
                            res = await swap(account, quoteOut[0].quoteId);
                        } catch {
                            toast({
                                title: 'Error',
                                variant: 'destructive',
                                description: 'An error occurred executing the swap',
                            });
                        }
                        
                        toast({
                            title: 'Success',
                            description: `Swap executed successfully ${res}`,
                        });
                    };
                } else {
                    const pragmaToken = getPragmaTokenFromName(tokenOut);
                    if (!pragmaToken) return ErrorChatBubble();
                    const amountOutFormatted = BigInt(amountOut * 10 ** pragmaToken.Decimals);
                    // get amountIn
                    const quoteIn = await getAmountIn(getTokenAddressFromSymbol(tokenIn), getTokenAddressFromSymbol(tokenOut), account.address, amountOutFormatted);
                    if (!quoteIn[0]) return ErrorChatBubble();
                    amountIn = quoteIn[0].sellAmount;
                    let res = '';
                    swapFunction = async () => {
                        try {
                            res = await swap(account, quoteIn[0].quoteId);
                        } catch {
                            toast({
                                title: 'Error',
                                variant: 'destructive',
                                description: 'An error occurred executing the swap',
                            });
                        }
                        
                        toast({
                            title: 'Success',
                            description: `Swap executed successfully ${res}`,
                        });
                    };
                }
                return <ActionBubble
                    text={`Confirm Swap ${amountIn} ${toolCall.args.tokenIn} for ${amountOut} ${toolCall.args.tokenOut}`}
                    actionName={'Swap'} side="left" sender="AI" callback={() => swapFunction}/>;
            
            default:
                return;
        }
    }
    
    
    return (
        <div className="h-full grid grid-rows-[1fr,auto]">
            
            <div className="px-2 grid gap-2 w-full overflow-y-scroll">
                {messages.map((message, key) => {
                    return (
                        <Fragment key={key}>
                            {message.chatBubble}
                        </Fragment>
                    );
                })}
            </div>
            
            <ChatInput onSend={sendMessage} inputRef={inputRef}/>
        </div>
    
    );
}