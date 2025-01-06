import { cn } from '@/lib/utils';

export default function ChatBubble(props: {text: string, side: 'left' | 'right'}){
    
    return(
        <div className={cn('bg-secondary rounded-xl w-fit px-4', props.side === 'left' ? 'float-left' : 'float-right')}>
            <p>{props.text}</p>
        </div>
    )
}