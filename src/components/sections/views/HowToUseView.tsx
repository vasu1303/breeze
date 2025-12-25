import { Welcome } from "../../onboarding/Welcome";
import IntroBox from "../../ui/IntroBox";

interface HowToUseViewProps {
  onComplete: () => void;
}

export const HowToUseView: React.FC<HowToUseViewProps> = ({ onComplete }) => {
  return (
    <div className="max-w-2xl mx-auto pt-10">
      <IntroBox />
      <Welcome onComplete={onComplete} />
    </div>
  );
};
