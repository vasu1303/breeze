export async function getMicrophoneStream(): Promise<MediaStream> {
    return navigator.mediaDevices.getUserMedia({ audio: true });
};

export function createMediaRecorder(stream: MediaStream): MediaRecorder {
    return new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
    });
};