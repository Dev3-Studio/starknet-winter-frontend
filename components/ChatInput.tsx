'use client';
import React from 'react';
import { SendHorizontal } from 'lucide-react';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';


// const appId = process.env.VOICE_API_KEY;
// const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
// SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

const ChatInput = (props: {inputRef: any, onSend: () => void}) => {
    
    const { account } = useArgentTelegram();
    
    
    // speech input
    // const {
    //     transcript,
    //     listening,
    //     browserSupportsSpeechRecognition
    // } = useSpeechRecognition();
    // const startListening = () => SpeechRecognition.startListening({ continuous: true });
    
    
    // send on enter
    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            props.onSend();
        }
    }
    
    
    if (!account){
        return (
            <ConnectWalletButton />
        )
    }
    
    // if (!browserSupportsSpeechRecognition) {
    //     return;
    // }
    
    // useEffect(() => {
    //     if (transcript) {
    //         props.inputRef.current.value = transcript;
    //     }
    // }, [transcript]);
    
    return (
        <div className="flex w-4/5 mx-auto mb-1">
            {/*Speech input*/}
            {/*<button*/}
            {/*    onTouchStart={startListening}*/}
            {/*    onMouseDown={startListening}*/}
            {/*    onTouchEnd={SpeechRecognition.stopListening}*/}
            {/*    onMouseUp={SpeechRecognition.stopListening}*/}
            {/*    className="rounded-full p-2"*/}
            {/*>*/}
            {/*    {listening && <Mic/>}*/}
            {/*    {!listening && <MicOff/>}*/}
            {/*</button>*/}
            
            
            <Input className="mr-1" type="text" placeholder="Ask a Question..." ref={props.inputRef}
                   onKeyDown={handleKeyDown}/>
            <Button onClick={props.onSend}>
                <SendHorizontal/>
            </Button>
        </div>
        
        
        
    );
};
export default ChatInput;