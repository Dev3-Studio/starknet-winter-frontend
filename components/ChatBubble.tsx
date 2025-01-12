import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ChatBubble(props: {text: string, side: 'left' | 'right', sender: string}){
    
    return(
        <div className="">
            
            <div className={cn("max-w-[50%]", props.side === 'left' ? 'float-left' : 'float-right')}>
                <Avatar className={cn("mx-3", props.side === 'left' ? 'float-left' : 'float-right')}>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar Image" />
                    <AvatarFallback>{props.sender}</AvatarFallback>
                </Avatar>
                
                <div className="flex flex-col">
                    <div className={cn('bg-secondary rounded-xl w-fit px-4 inline-block')}>
                        <p>{props.text}</p>
                    </div>
                    <p className={cn('text-gray-500 px-2', props.side === 'left' ? 'text-left' : 'text-right')}>{props.sender}</p>
                </div>
            </div>
        </div>
    )
}