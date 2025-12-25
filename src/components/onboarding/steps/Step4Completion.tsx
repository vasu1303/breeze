import { PartyPopper } from "lucide-react";

interface Step4CompletionProps {
  onComplete: () => void;
  onTriggerConfetti: () => void;
}

export const Step4Completion: React.FC<Step4CompletionProps> = ({
  onComplete,
  onTriggerConfetti,
}) => {
  const handleComplete = () => {
    onTriggerConfetti();
    onComplete();
  };

  return (
    <div className="border border-1 p-6 rounded-xl w-full">
      <div className="text-4xl flex justify-center mb-4">
        <PartyPopper />
      </div>
      <h3 className="text-zinc-600 font-semibold mb-2">Hurray!</h3>
      <p className="text-zinc-500 text-sm mb-2">
        Now you are a Breezer too! Welcome to the club.
      </p>
      <p className="text-zinc-500 text-sm mb-6">
        Keep the app open, press the shortcut and breeze it!
      </p>

      <p className="text-zinc-500 mb-3">
        Happy Typing! oh I mean speaking...
      </p>
      <div>
        <button
          className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-300"
          onClick={handleComplete}
        >
          Got It!
          <p className="block text-[9px]">Press it for more confetti!</p>
        </button>
      </div>
    </div>
  );
};
