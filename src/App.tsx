import "./App.css";
import { useShortcut } from "./hooks/useShortcut";
import { useTranscription } from "./hooks/useTranscription";
import { TranscriptionStatus } from "./types";

function App() {

  const { status, transcript, startRecording, stopRecording } = useTranscription();

  const handleToggle = () => {
    if (status === TranscriptionStatus.IDLE || status === TranscriptionStatus.ERROR ){
      startRecording();
    } else {
      stopRecording();
    };
  };

  useShortcut(handleToggle);

  return (
    <main className="container">
      <h1>Welcome to Breeze</h1>
      <h2>Your seamless voice to text transcriber!</h2>
      <p>{status}</p>

      <div>
        <button onClick={startRecording} disabled={status === TranscriptionStatus.LISTENING || status === TranscriptionStatus.CONNECTING}>
          Start
        </button>
        <button onClick={stopRecording} disabled={status === TranscriptionStatus.IDLE}>
          Stop
        </button>
      </div>
      <div>
        { transcript || "Press ctrl + T or start to speak"}
      </div>

    </main>
  );
}

export default App;
