'use client';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { SendHorizontal } from 'lucide-react';
import ChatBubble from '@/components/ChatBubble';
import { useRef } from 'react';
import { runTradeAI } from '@/langchain';

export default function Chat(){
    
    const inputRef = useRef<HTMLInputElement>(null)
    const messages = [
        'message1',
        'message2',
        'message3'
    ]
    
    function sendMessage(){
        const message = inputRef.current?.value
        if(message) {
            // send message to server
            console.log(message)
            runTradeAI(message);
        }
        
    }
    
    return(
        <div>
            <h1 className="pb-2 text-center">Chat</h1>
            
            <div className="min-h-full overflow-y-scroll px-2 grid gap-2">
                {messages.map((message, index) => <ChatBubble text={message} key={index} side='right'/>)}
            </div>
            
            
            <div className="flex w-full absolute bottom-0">
                <Input type="text" placeholder="Ask a Question..." ref={inputRef} />
                <Button onClick={sendMessage}>
                    <SendHorizontal />
                </Button>
            </div>
        </div>
    )
}