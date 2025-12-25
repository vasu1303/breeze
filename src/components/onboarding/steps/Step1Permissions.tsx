import { MicIcon } from "lucide-react";

interface Step1PermissionsProps {
  onNext: () => void;
}

export const Step1Permissions: React.FC<Step1PermissionsProps> = ({
  onNext,
}) => {
  return (
    <div className="border border- p-6 rounded-xl w-full">
      <div className="text-4xl flex justify-center mb-4">
        <MicIcon />
      </div>
      <h3 className="text-zinc-700 font-semibold mb-2">Microphone Access</h3>
      <p className="text-zinc-600 text-sm mb-6">
        Breeze needs to hear you to work its magic. We don't store your audio.
      </p>
      <button
        className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300"
        onClick={onNext}
      >
        Grant Permission
      </button>
    </div>
  );
};
