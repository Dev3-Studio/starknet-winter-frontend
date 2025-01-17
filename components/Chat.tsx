'use client';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { SendHorizontal } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';
import { LLMMessage, runTradeAI } from '@/langchain';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import ActionBubble from '@/components/ActionBubble';
import ChatBubble from '@/components/ChatBubble';
import { getAmountIn, getAmountOut, swap } from '@/lib/swap';
import { useArgent } from '@/hooks/useArgent';
import { useToast } from '@/hooks/use-toast';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';

type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}

export default function Chat() {
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const {account} = useArgent();
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
                { message: newMessage, chatBubble: <ChatBubble text={message} side='right' sender="You"/> }
            ]);
            
            const response = await runTradeAI([...messages.map(message => message.message), newMessage]);
            
            const tempMessage = new AIMessage('');
            tempMessage.content = response.content;
            tempMessage.tool_calls = response.tool_calls;
            
            for (const toolCall of tempMessage.tool_calls ?? []) {
                switch (toolCall.name) {
                    case 'stakeConfirm':
                        console.log('stakeConfirm', toolCall);
                        const stakeBubble = await createActionBubble(tempMessage, "stake") ?? <ChatBubble text="An error occured. Please try again" side='left' sender="AI"/>;
                        return setMessages((prev) => [...prev, { message: tempMessage, chatBubble: stakeBubble }]);
                    case 'swapConfirm':
                        console.log('swapConfirm', toolCall);
                        const swapBubble = await createActionBubble(tempMessage, "swap") ?? <ChatBubble text="An error occured. Please try again" side='left' sender="AI"/>;
                        return setMessages((prev) => [...prev, { message: tempMessage, chatBubble: swapBubble }]);
                    default:
                        console.log('Unknown tool call', toolCall);
                        break;
                }
            }
            
            // append new message to messages
            setMessages((prev) => [
                ...prev,
                { message: tempMessage, chatBubble: <ChatBubble text={response.content as string} side='left' sender="AI"/> }
            ]);
        }
    }
    
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            sendMessage().catch();
        }
    }
    
    
    async function createActionBubble(message: LLMMessage, action: 'stake' | 'swap') {
        if (message instanceof HumanMessage) return;
        const toolCall = message.tool_calls?.find((toolCall) => toolCall.name.endsWith('Confirm'));
        if (!toolCall) return;
        
        if (!account) return <ChatBubble text="Please connect your wallet before performing this action" side='left' sender="AI"/>;
        
        switch (action) {
            case 'stake':
                // todo callback function
                if (!toolCall.args.token) return <ChatBubble text="Only the stark token can be staked" side='left' sender="AI"/>;
                const stakeAmount = toolCall.args.amount ?? 1;
                return <ActionBubble text={
                    `Confirm Stake ${stakeAmount} ${toolCall.args.token}`}
                                     actionName={'Stake'} side='left' sender="AI" callback={() => {}}/>;
                
            case 'swap':
                // todo: callback function
                const tokenIn = toolCall.args.tokenIn;
                const tokenOut = toolCall.args.tokenOut;
                if (!tokenIn || !tokenOut) return <ChatBubble text="Invalid swap request" side='left' sender="AI"/>;
                let amountIn = toolCall.args.amountIn;
                let amountOut = toolCall.args.amountOut;
                if (!amountIn && !amountOut) amountOut = 1n;
                
                let swapFunction;
                // quote swap
                if (amountIn) {
                    // get amountOut
                    const quoteOut = await getAmountOut(tokenIn, tokenOut, account.address, amountIn);
                    if (!quoteOut) return <ChatBubble text="An error occured. Please try again" side='left' sender="AI"/>;
                    amountOut = quoteOut[0].buyAmount;
                    swapFunction = async () => {
                        try {
                            await swap(account, quoteOut[0].quoteId);
                        } catch {
                            toast({
                                title: "Error",
                                variant: 'destructive',
                                description: 'An error occurred executing the swap'
                            })
                        }
                        
                        toast({
                            title: "Success",
                            description: 'Swap executed successfully'
                        })
                    }
                } else {
                    // get amountIn
                    const quoteIn = await getAmountIn(tokenIn, tokenOut, account.address, amountOut);
                    if (!quoteIn) return <ChatBubble text="An error occured. Please try again" side='left' sender="AI"/>;
                    amountIn = quoteIn[0].sellAmount;
                    swapFunction = async () => {
                        try {
                            await swap(account, quoteIn[0].quoteId);
                        } catch {
                            toast({
                                title: "Error",
                                variant: 'destructive',
                                description: 'An error occurred executing the swap'
                            })
                        }
                        
                        toast({
                            title: "Success",
                            description: 'Swap executed successfully'
                        })
                    }
                }
                
                return <ActionBubble text={`Confirm Swap ${amountIn} ${toolCall.args.tokenIn} for ${amountOut} ${toolCall.args.tokenOut}`}
                                     actionName={'Swap'} side='left' sender="AI" callback={() => swapFunction}/>;
                
            default:
                return;
                
        }
    }
    
    
    return (
        <div className="grid grid-rows-[auto,1fr] h-full">
           
            <h1 className="pb-2 text-center text-4xl pt-1">AI Chat</h1>
            
            <div className="h-full px-2 grid gap-2 w-full overflow-y-scroll">
                {messages.map((message, key) => {
                    return (
                        <Fragment key={key}>
                            {message.chatBubble}
                        </Fragment>
                    );
                })}
            </div>
            
            {!account && <ConnectWalletButton />}
            
            {account && <div className="flex w-4/5 mx-auto mb-1">
                <Input className="mr-1" type="text" placeholder="Ask a Question..." ref={inputRef}
                       onKeyDown={handleKeyDown}/>
                <Button onClick={sendMessage}>
                    <SendHorizontal/>
                </Button>
            </div>}
        
        </div>
        
    );
}