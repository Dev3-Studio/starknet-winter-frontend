import AbstractChatBubble, { Side } from '@/components/AbstractChatBubble';

export default function ChatBubble(props: { text: string, side: Side, sender: string }) {
    return (
        <AbstractChatBubble
            className="" side={props.side} sender={props.sender} contents={<p className="">{props.text}</p>}/>
    );
}