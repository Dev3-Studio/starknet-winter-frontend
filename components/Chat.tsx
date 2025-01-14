'use client';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { SendHorizontal } from 'lucide-react';
import ChatBubble from '@/components/ChatBubble';
import { useRef, useState } from 'react';
import { LLMMessage, runTradeAI } from '@/langchain';
import { AIMessage, HumanMessage } from '@langchain/core/messages';

type ChatBubbleProps = {
    contents: JSX.Element;
    message: LLMMessage;
}
export default function Chat(){
    const [messages, setMessages] = useState<LLMMessage[]>([]);
    
    const inputRef = useRef<HTMLInputElement>(null)
    
    async function sendMessage() {
        const message = inputRef.current?.value
        if (message) {
            // clear message
            inputRef.current.value = '';
            
            // send message to AI for response
            const newMessage = new HumanMessage(message);
            setMessages((prev) => [...prev, newMessage])
            const response = await runTradeAI([...messages, newMessage]);
            
            const tempMessage = new AIMessage('');
            tempMessage.content = response.content;
            tempMessage.tool_calls = response.tool_calls;
            
            for (const toolCall of tempMessage.tool_calls ?? []) {
                switch (toolCall.name) {
                    case 'stakeConfirm':
                        console.log('stakeConfirm', toolCall);
                        
                        
                        break;
                    case 'swapConfirm':
                        console.log('swapConfirm', toolCall);
                        break;
                    default:
                        console.log('Unknown tool call', toolCall);
                        break;
                }
            }
            
            setMessages((prev) => [...prev, tempMessage])
        }
    }
    
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            sendMessage().catch();
        }
    }
    function isAIMessage(message: LLMMessage){
        return message instanceof AIMessage;
    }
    return(
        <div>
            <h1 className="pb-2 text-center">Chat</h1>
            
            <div className="min-h-full overflow-y-scroll px-2 grid gap-2 w-full">
                {messages.map((message, index) => <ChatBubble contents={<p>{message.text}</p>} key={index}
                                                              side={isAIMessage(message) ? 'left' : 'right'}
                                                              sender={isAIMessage(message) ? "AI": "You"}/>
                )}
            </div>
            
            <div className="flex w-full absolute bottom-20">
                <Input type="text" placeholder="Ask a Question..." ref={inputRef} onKeyDown={handleKeyDown} />
                <Button onClick={sendMessage}>
                    <SendHorizontal />
                </Button>
            </div>
        </div>
    )
}