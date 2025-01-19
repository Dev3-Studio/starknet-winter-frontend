'use server';
const Key = process.env.VOICE_API_KEY;

export async function getVoiceAuthToken(){
    
    if (!Key) {
        throw new Error('Missing VOICE_API_KEY');
    }
    
    const res = await fetch('https://eastus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
        {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
                'Content-Length': '0',
                "Ocp-Apim-Subscription-Key": Key,
            }
        }
    )

    return await res.text();
}

