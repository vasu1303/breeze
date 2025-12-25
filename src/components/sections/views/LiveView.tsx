interface LiveViewProps {
  status: string;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
}

export const LiveView: React.FC<LiveViewProps> = ({
  status,
  transcript,
  onStart,
  onStop,
}) => {
  return (
    <div className="max-w-2xl mx-auto pt-10">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black">Live Transcription</h2>
        <div className="p-6 border border-1 rounded-xl backdrop-blur-md">
          <p className="text-sm text-zinc-600 mb-4">Status: {status}</p>
          <div className="min-h-[200px] bg-zinc-100 rounded-lg border border-1 p-4 text-left text-zinc-700 font-mono">
            {transcript || (
              <span className="text-zinc-500 italic">
                Transcription will appear here...
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={onStart}
              className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600"
            >
              Start
            </button>
            <button
              onClick={onStop}
              className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
