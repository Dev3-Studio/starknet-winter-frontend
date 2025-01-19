'use client';
import React, { useEffect } from 'react';
import { Mic, MicOff, SendHorizontal } from 'lucide-react';
import { useArgentTelegram } from '@/hooks/useArgentTelegram';
import { ConnectWalletButton } from '@/components/ConnectWalletButton';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';
import 'regenerator-runtime/runtime';
import { createSpeechServicesPonyfill } from 'web-speech-cognitive-services';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getVoiceAuthToken } from '@/actions/getVoiceAuthToken';


getVoiceAuthToken().then((token) => {
    const { SpeechRecognition: AzureSpeechRecognition } = createSpeechServicesPonyfill({
        credentials: {
            region: 'eastus',
            authorizationToken: token,
        }
    });
    SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
})


export function SpeechMic(props: {inputRef: any}) {
    // speech input
    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    useEffect(() => {
        if (transcript) {
            props.inputRef.current.value = transcript;
        }
    }, [transcript]);

    if (!browserSupportsSpeechRecognition) {
        return;
    }

    const startListening = () => SpeechRecognition.startListening({
        continuous: false,
        language: 'en-US'
    });
    
    if (!SpeechRecognition) {
        return;
    }

    return(
        <button
            onTouchStart={startListening}
            onMouseDown={startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
            className="rounded-full p-2 bg-primary"
        >
            {listening && <Mic/>}
            {!listening && <MicOff/>}
        </button>
    )
}
const ChatInput = (props: {inputRef: any, onSend: () => void}) => {
    const { account } = useArgentTelegram();
    
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
    
    return (
        <div className="flex w-full mb-1 px-2">
            <SpeechMic inputRef={props.inputRef}/>
            
            <Input className="mx-1" type="text" placeholder="Ask a Question..." ref={props.inputRef}
                   onKeyDown={handleKeyDown}/>
            <Button onClick={props.onSend}>
                <SendHorizontal />
            </Button>
        </div>
        
    );
};
export default ChatInput;