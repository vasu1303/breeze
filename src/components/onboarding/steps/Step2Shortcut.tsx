import { Keyboard } from "lucide-react";

interface Step2ShortcutProps {
  onNext: () => void;
}

export const Step2Shortcut: React.FC<Step2ShortcutProps> = ({ onNext }) => {
  return (
    <div className="border border-1 p-6 rounded-xl w-full">
      <div className="text-4xl flex justify-center mb-4">
        <Keyboard />
      </div>
      <h3 className="text-zinc-600 font-semibold mb-2">Global Shortcut</h3>
      <p className="text-zinc-500 text-sm mb-6">
        You can activate Breeze from anywhere on your computer using this
        shortcut:
      </p>
      <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 inline-flex gap-2 mb-6">
        <kbd className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">
          Ctrl
        </kbd>
        <span className="text-zinc-600">+</span>
        <kbd className="bg-zinc-800 px-2 py-1 rounded text-zinc-300 border border-zinc-700">
          T
        </kbd>
      </div>
      <div>
        <button
          className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300"
          onClick={onNext}
        >
          Got it
        </button>
      </div>
    </div>
  );
};
