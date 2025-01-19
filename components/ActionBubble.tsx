import AbstractChatBubble, { Side } from '@/components/AbstractChatBubble';
import { Button } from '@/components/shadcn/button';
import React from 'react';

export default function ActionBubble(props: { text: string, actionName: string, side: Side, sender: string, callback: () => void }) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    function handleClick(){
        // disable button
        if (buttonRef.current) {
            buttonRef.current.disabled = true;
        }
        
        props.callback();
    }
    
    return(
        <AbstractChatBubble side={props.side} sender={props.sender} contents={
            <div className="py-2">
                <p>{props.text}</p>
                <Button onClick={handleClick} className="bg-primary text-white px-4 py-2 rounded-xl w-full mt-2" ref={buttonRef}>{props.actionName}</Button>
            </div>
        }/>
    )
}