import { useCallback, useEffect, useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { listen } from "@tauri-apps/api/event";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Idle");
  const [transcript, setTranscript] =  useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const socketRef = useRef<any>(null);

  const stopRecording = useCallback( () => {
    console.log("Stopping Recording...");
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      // Stop all tracks to release microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    if (socketRef.current) {
      socketRef.current.finish();
      socketRef.current = null;
    }
    setStatus("Idle");
  }, []);
const startRecording = useCallback(async () => {
  try {
    console.log("Starting recording sequence..");
    setStatus("Connecting to Deepgram...");
    setTranscript(""); // clear old transcript

    const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
    if (!apiKey) {
      alert("API Key is missing");
      setStatus("Error: No API Key");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true, // keep it simple, let the browser pick details
    });

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });
    mediaRecorderRef.current = mediaRecorder;

    const deepgram = createClient(apiKey);
    const connection = deepgram.listen.live({
      model: "nova-2",
      smart_format: true,
      language: "en-US",
      interim_results: true,
    });

    socketRef.current = connection;

    connection.on(LiveTranscriptionEvents.Open, () => {
      console.log("Deepgram socket opened");
      setStatus("Listening...");
      if (mediaRecorder.state === "inactive") {
        mediaRecorder.start(250);
        console.log("MediaRecorder started after socket open");
      }
    });

    connection.on(LiveTranscriptionEvents.Close, () => {
      console.log("Deepgram socket closed");
      setStatus("Idle");
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    });

    connection.on(LiveTranscriptionEvents.Error, (err) => {
      console.error("Deepgram error:", err);
      setStatus("Error: Deepgram connection failed");
      if (mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
      }
    });

    connection.on(LiveTranscriptionEvents.Transcript, (data: any) => {
      // Log the raw event once to inspect the actual shape
      console.log("Raw DG event:", data);

      const text =
        data?.channel?.alternatives?.[0]?.transcript ?? "";
      const isFinal = Boolean(data?.is_final);

      console.log("Transcript event:", { text, isFinal });

      if (text && text.trim().length > 0) {
        setTranscript((prev) => (prev + " " + text).trim());
      }
    });

    // IMPORTANT: send raw bytes, don't gate on readyState
    mediaRecorder.ondataavailable = async (event) => {
      if (event.data.size === 0) return;

      try {
        const buffer = await event.data.arrayBuffer();
        console.log("Sending chunk to Deepgram, bytes=", buffer.byteLength);
        connection.send(buffer);
      } catch (err) {
        console.error("Error converting blob to ArrayBuffer:", err);
      }
    };
  } catch (err) {
    console.error("startRecording failed:", err);
    setStatus("Error: " + (err as Error)?.message);
    stopRecording();
  }
}, [stopRecording]);

  // Use a ref to track status to avoid stale closures
  const statusRef = useRef(status);
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    let unlistenFn: (() => void) | null = null;

    // Guard: Tauri APIs only exist when running under Tauri; in plain Vite they are undefined
    const hasTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
    if (!hasTauri) {
      console.warn("Tauri internals not found; shortcut listener skipped (run via `npm run tauri dev`).");
      return;
    }

    listen("shortcut-pressed", () => {
      // TOGGLE LOGIC - use ref to get current status
      if (statusRef.current === "Idle") {
        startRecording();
      } else {
        stopRecording();
      }
    }).then((unlisten) => {
      unlistenFn = unlisten;
    }).catch((err) => {
      console.error("Failed to set up shortcut listener:", err);
    });

    return () => {
      if (unlistenFn) {
        unlistenFn();
      }
    };
  }, [startRecording, stopRecording]);
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  const testDeepgramAPI = async () => {
  try {
    const apiKey = import.meta.env.VITE_DEEPGRAM_API_KEY;
    const response = await fetch('https://api.deepgram.com/v1/listen', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'audio/wav'
      },
      body: await fetch('https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav').then(r => r.blob())
    });
    const result = await response.json();
    console.log('API Test Result:', result);
    alert('API works! Check console for transcription.');
  } catch (err) {
    console.error('API Test failed:', err);
  }
};



  return (
    <main className="container">
      <h1>Welcome to Breeze</h1>
      <h2>Your seamless voice to text transcriber!</h2>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <p>{status}</p>
      <div className="row" style={{ gap: "8px", marginBottom: "12px" }}>
        <button
          type="button"
          onClick={() => {
            if (statusRef.current === "Idle") {
              startRecording();
            }
          }}
        >
          Start Recording
        </button>
        <button
          type="button"
          onClick={() => {
            if (statusRef.current !== "Idle") {
              stopRecording();
            }
          }}
        >
          Stop Recording
        </button>
      </div>
      <button onClick={testDeepgramAPI}>TRANSCRIBE TEXT</button>
      <p>{transcript || "Transcribed text will appear here..."}</p>
    </main>
  );
}

export default App;
