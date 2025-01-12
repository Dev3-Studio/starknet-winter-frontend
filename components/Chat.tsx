'use client';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { SendHorizontal } from 'lucide-react';
import ChatBubble from '@/components/ChatBubble';
import { useRef, useState } from 'react';
import { runTradeAI } from '@/langchain';

type Message = {
    text: string;
    side: 'left' | 'right';
    sender: string;
}

export default function Chat(){
    const [messages, setMessages] = useState<Message[]>([]);
    
    const inputRef = useRef<HTMLInputElement>(null)
    
    async function sendMessage() {
        const message = inputRef.current?.value
        if (message) {
            // clear message
            setMessages((prev) => [...prev, { text: message, side: 'right', sender: 'You' }])
            inputRef.current.value = '';

            // send message to AI for response
            const response = await runTradeAI(message);
            setMessages((prev) => [...prev, { text: response, side: 'left', sender: 'AI' }])
        }
    }
    
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            sendMessage().catch();
        }
    }
    
    return(
        <div>
            <h1 className="pb-2 text-center">Chat</h1>
            
            <div className="min-h-full overflow-y-scroll px-2 grid gap-2 w-full">
                {messages.map((message, index) => <ChatBubble text={message.text} key={index} side={message.side} sender={message.sender}/>)}
            </div>
            
            
            <div className="flex w-full absolute bottom-0">
                <Input type="text" placeholder="Ask a Question..." ref={inputRef} onKeyDown={handleKeyDown} />
                <Button onClick={sendMessage}>
                    <SendHorizontal />
                </Button>
            </div>
        </div>
    )
}