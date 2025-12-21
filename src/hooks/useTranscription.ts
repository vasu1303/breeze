import { useCallback, useRef, useState } from "react";
import { TranscriptionStatus } from "../types";
import { createMediaRecorder, getMicrophoneStream } from "../services/audio";
import { connectToDeepgram } from "../services/deepgram";
import { LiveTranscriptionEvents } from "@deepgram/sdk";
import { typeText } from "../services/tauri";

export function useTranscription() {
    const [ status, setStatus ] = useState<TranscriptionStatus>(TranscriptionStatus.IDLE);
    const [ transcript, setTranscript ] = useState("");

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const socketRef = useRef<any>(null);

    const stopRecording = useCallback(() => {
        console.log("Stopping..");
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
        }

        if (socketRef.current) {
            socketRef.current.finish();
            socketRef.current = null;
        }

        setStatus(TranscriptionStatus.IDLE);
    }, []);

    const startRecording = useCallback(async () => {
        try {
            setStatus(TranscriptionStatus.CONNECTING);
            setTranscript("");

            const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
            if (!apiKey) throw new Error("API Key Missing");

            const stream = await getMicrophoneStream();
            const connection = connectToDeepgram(apiKey);
            const recorder = createMediaRecorder(stream);

            socketRef.current = connection;
            mediaRecorderRef.current = recorder;

            connection.on(LiveTranscriptionEvents.Open, () => {
                setStatus(TranscriptionStatus.LISTENING);
                recorder.start(250);
            });

            connection.on(LiveTranscriptionEvents.Transcript, (data) => {
                const received = data.channel?.alternatives?.[0]?.transcript ?? "";
                const isFinal = data.is_final;

                if (received && isFinal) {
                    setTranscript((prev) => prev + " " + received);
                    typeText(received + " ");
                };
            });

            connection.on(LiveTranscriptionEvents.Error, (err) => {
                console.error(err);
                setStatus(TranscriptionStatus.ERROR);
            });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0 && connection.getReadyState() === 1) {
                    connection.send(event.data);
                };
            };
        } catch (err) {
            console.error("Start Failed:", err);
            setStatus(TranscriptionStatus.ERROR);
            stopRecording();
        }
    }, [stopRecording]);

    return {
        status, 
        transcript, 
        startRecording, 
        stopRecording
    };
};