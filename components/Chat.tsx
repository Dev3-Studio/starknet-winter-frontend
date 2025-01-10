import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import { SendHorizontal } from 'lucide-react';
import ChatBubble from '@/components/ChatBubble';

export default function Chat(){
    
    const messages = [
        'message1',
        'message2',
        'message3'
    ]
    
    return(
        <div>
            <h1 className="pb-2 text-center">Chat</h1>
            
            <div className="min-h-full overflow-y-scroll px-2 grid gap-2">
                {messages.map((message, index) => <ChatBubble text={message} key={index} side='right'/>)}
            </div>
            
            
            <div className="flex w-full absolute bottom-0">
                <Input type="text" placeholder="Ask a Question..." />
                <Button>
                    <SendHorizontal />
                </Button>
            </div>
        </div>
    )
}