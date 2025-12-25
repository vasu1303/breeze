import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { TranscriptionStatus } from "../../../types";

interface Step3TestRunProps {
  status: string;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
  onNext: () => void;
}

export const Step3TestRun: React.FC<Step3TestRunProps> = ({
  status,
  transcript,
  onStart,
  onStop,
  onNext,
}) => {
  const isListening = status === TranscriptionStatus.LISTENING;

  return (
    <div className="border border-1 p-6 rounded-xl w-full">
      <Badge status={status} />
      <h3 className="text-zinc-500 font-semibold mt-4 mb-2">Give it a spin</h3>
      <p className="text-zinc-600 text-sm mb-4">
        Try speaking a sentence below. We won't type this one into other apps
        yet.
      </p>

      <div className="min-h-[80px] bg-zinc-100 rounded-lg border border-1 p-3 mb-4 text-left text-zinc-600 text-sm font-mono">
        {transcript || (
          <span className="text-zinc-700 italic">"Hello world..."</span>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <Button
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300"
          variant={isListening ? "secondary" : "primary"}
          onClick={isListening ? onStop : onStart}
        >
          {isListening ? "Stop" : "Test Mic"}
        </Button>

        {transcript.length > 5 && (
          <Button onClick={onNext}>Looks Good →</Button>
        )}
      </div>
    </div>
  );
};
