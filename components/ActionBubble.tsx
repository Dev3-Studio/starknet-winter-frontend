import AbstractChatBubble, { Side } from '@/components/AbstractChatBubble';

export default function ActionBubble(props: { text: string, actionName: string, side: Side, sender: string, callback: () => void }) {
    return(
        <AbstractChatBubble side={props.side} sender={props.sender} contents={
            <div className="py-2">
                <p>{props.text}</p>
                <button onClick={props.callback} className="bg-primary text-white px-4 py-2 rounded-xl w-full mt-2">{props.actionName}</button>
            </div>
        }/>
    )
}