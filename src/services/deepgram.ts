import { createClient, LiveClient } from "@deepgram/sdk";

export const  connectToDeepgram = (apiKey: string): LiveClient => {
    const deepgram = createClient(apiKey);

    return deepgram.listen.live({
        model: "nova-2",
        smart_format: true,
        language: "en-US",
        interim_results: true,
    });
};