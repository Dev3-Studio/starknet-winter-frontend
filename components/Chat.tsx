'use client';

import React, { Fragment, useRef, useState } from 'react';
import { LLMMessage, runTradeAI } from '@/langchain';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import ActionBubble from '@/components/ActionBubble';
import ChatBubble from '@/components/ChatBubble';
import { getAmountIn, getAmountOut, swap } from '@/lib/swap';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import ChatInput from './ChatInput';
import { customToast, getTokenFromSymbol } from '@/lib/utils';
import { stake } from '@/lib/stake';
import { formatUnits } from 'ethers';
import { SessionAccountInterface } from '@argent/tma-wallet';


type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}


function ErrorChatBubble() {
    return <ChatBubble text="An error occured. Please try again" side="left" sender="AI"/>;
}

async function swapFn(account: SessionAccountInterface, quoteId: string) {
    console.log('executing swap');
    
    try {
        await swap(account, quoteId);
    } catch (e) {
        console.log(e);
        return customToast({
            variant: 'error',
            description: 'Could not execute swap',
        });
    }
    console.log('swap executed');
    customToast({
        variant: 'success',
        description: 'Swap executed successfully',
    });
}

export default function Chat() {
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const { account } = useArgentTelegram();
    
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
            
            
            if (tempMessage.tool_calls && tempMessage.tool_calls.length > 0) {
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
            }
            
            // append new message to messages
            setMessages((prev) => [
                ...prev,
                {
                    message: tempMessage,
                    chatBubble: <ChatBubble text={response.content as string} side="left" sender="AI"/>,
                },
            ]);
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
                
                // stark decimals
                const stakeAmount = BigInt(((toolCall.args.amount) ?? 1) * 10 ** 18);
                
                const stakeFunction = async () => {
                    if (!account) return customToast({
                        variant: 'error',
                        description: 'Please connect your wallet before performing this action',
                    });
                    try {
                        await stake(stakeAmount, account);
                    } catch (e) {
                        console.log(e);
                        return customToast({
                            variant: 'error',
                            description: 'An error occurred executing the stake',
                        });
                    }
                    
                    customToast({
                        variant: 'success',
                        description: 'Stake executed successfully',
                    });
                };
                
                return <ActionBubble
                    text={
                        `Confirm Stake ${formatUnits(stakeAmount)} ${toolCall.args.token}`}
                    actionName={'Stake'} side="left" sender="AI" callback={() => stakeFunction()}/>;
            
            case 'swap':
                const tokenIn = toolCall.args.tokenIn;
                const tokenOut = toolCall.args.tokenOut;
                // need at least 1 known token to swap
                if (!tokenIn || !tokenOut) return <ChatBubble text="Invalid swap request" side="left" sender="AI"/>;
                let amountIn = toolCall.args.amountIn;
                let amountOut = toolCall.args.amountOut;
                if (!amountIn && !amountOut) amountOut = 1n;
                
                let tokenInDetails;
                let tokenOutDetails;
                
                try {
                    tokenInDetails = getTokenFromSymbol(tokenIn);
                    tokenOutDetails = getTokenFromSymbol(tokenOut);
                } catch {
                    return ErrorChatBubble();
                }
                let quoteId;
                
                // quote swap
                if (amountIn) {
                    // multiply by decimals
                    const amountInFormatted = BigInt(amountIn * 10 ** tokenInDetails.decimals);
                    // get amountOut
                    const quoteOut = await getAmountOut(tokenInDetails.address, tokenOutDetails.address, account.address, amountInFormatted);
                    if (!quoteOut[0]) return ErrorChatBubble();
                    amountOut = quoteOut[0].buyAmount;
                    quoteId = quoteOut[0].quoteId;
                } else {
                    const amountOutFormatted = BigInt(amountOut * 10 ** tokenInDetails.decimals);
                    // get amountIn
                    const quoteIn = await getAmountIn(tokenInDetails.address, tokenOutDetails.address, account.address, amountOutFormatted);
                    if (!quoteIn[0]) return ErrorChatBubble();
                    amountIn = quoteIn[0].sellAmount;
                    quoteId = quoteIn[0].quoteId;
                    
                }
                return <ActionBubble
                    text={`Confirm Swap ${amountIn} ${toolCall.args.tokenIn} for ${Number(formatUnits(amountOut, tokenOutDetails.decimals)).toPrecision(6)} ${toolCall.args.tokenOut}`}
                    actionName={'Swap'} side="left" sender="AI" callback={() => swapFn(account, quoteId)}/>;
            
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