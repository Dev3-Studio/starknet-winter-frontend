'use client';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { SendHorizontal } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';
import { LLMMessage, runTradeAI } from '@/langchain';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import ActionBubble from '@/components/ActionBubble';
import ChatBubble from '@/components/ChatBubble';

type ChatBubbleProps = {
    chatBubble: JSX.Element;
    message: LLMMessage;
}

export default function Chat() {
    const [messages, setMessages] = useState<ChatBubbleProps[]>([]);
    
    const inputRef = useRef<HTMLInputElement>(null);
    
    async function sendMessage() {
        const message = inputRef.current?.value;
        if (message) {
            // clear message
            inputRef.current.value = '';
            
            // send message to AI for response
            const newMessage = new HumanMessage(message);
            setMessages((prev) => [...prev, { message: newMessage, chatBubble: <ChatBubble text={message} side='right' sender="You"/> }]);
            const response = await runTradeAI([...messages.map(message => message.message), newMessage]);
            
            const tempMessage = new AIMessage('');
            tempMessage.content = response.content;
            tempMessage.tool_calls = response.tool_calls;
            
            for (const toolCall of tempMessage.tool_calls ?? []) {
                switch (toolCall.name) {
                    case 'stakeConfirm':
                        console.log('stakeConfirm', toolCall);
                        return setMessages((prev) => [...prev, { message: tempMessage, chatBubble: createActionBubble(tempMessage, "stake")! }]);
                    case 'swapConfirm':
                        console.log('swapConfirm', toolCall);
                        return setMessages((prev) => [...prev, { message: tempMessage, chatBubble: createActionBubble(tempMessage, "swap")! }]);
                    default:
                        console.log('Unknown tool call', toolCall);
                        break;
                }
            }
            
            setMessages((prev) => [...prev, { message: tempMessage, chatBubble: <ChatBubble text={response.content as string} side='left' sender="AI"/> }]);
        }
    }
    
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            sendMessage().catch();
        }
    }
    
    // function isConfirmMessage(message: LLMMessage) {
    //     return !(message instanceof HumanMessage) ? message.tool_calls?.some((toolCall) => toolCall.name.endsWith('Confirm')) : false;
    // }
    
    function createActionBubble(message: LLMMessage, action: 'stake' | 'swap') {
        if (message instanceof HumanMessage) return;
        const toolCall = message.tool_calls?.find((toolCall) => toolCall.name.endsWith('Confirm'));
        if (!toolCall) return;
        return <ActionBubble text={action === 'stake' ?
            `Confirm Stake ${toolCall.args.amount} ${toolCall.args.token}` :
            `Confirm Swap ${toolCall.args.amountIn ?? ''} ${toolCall.args.token1} for ${toolCall.args.amountOut ?? ''} ${toolCall.args.token2}`}
            
            actionName={action === 'stake' ? 'Stake' : 'Swap'
                             }
        side='left' sender="AI" callback={() => {}}/>;
    }
    
    // useEffect(() => {
    //     // initial message
    //     setMessages((prev) => [...prev, { message: new AIMessage(''), chatBubble: <ActionBubble text="Confirm Stake " actionName="Stake" side="left" sender="AI" callback={()=>{}}/> }]);
    // }, []);
    
    return (
        <div className="grid grid-rows-[auto,1fr] h-full">
            <h1 className="pb-2 text-center text-4xl pt-1">AI Chat</h1>
            
            <div className="h-full px-2 grid gap-2 w-full">
                {messages.map((message, key) => {
                    return (
                        <Fragment key={key}>
                            {message.chatBubble}
                        </Fragment>
                    );
                })}
            </div>
            
            <div className="flex w-4/5 mx-auto">
                <Input type="text" placeholder="Ask a Question..." ref={inputRef} onKeyDown={handleKeyDown}/>
                <Button onClick={sendMessage}>
                    <SendHorizontal/>
                </Button>
            </div>
        </div>
    );
}