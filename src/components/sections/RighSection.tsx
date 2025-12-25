import { TabId } from "../../types";
import { LiveView } from "./views/LiveView";
import { HowToUseView } from "./views/HowToUseView";
import { WhatIsBreezeView } from "./views/WhatIsBreezeView";
import { BuiltByView } from "./views/BuiltByView";

interface RightSectionProps {
  activeTab: TabId;
  status: string;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
}

export default function RightSection({
  activeTab,
  status,
  transcript,
  onStart,
  onStop,
}: RightSectionProps) {
  return (
    <section className="flex-1 m-2 rounded-md border text-black border-black h-full flex flex-col border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 border rounded-md border-primary pointer-events-none" />
      <div className="flex-1 overflow-y-auto p-8 z-10">
        {activeTab === TabId.Live && (
          <LiveView
            status={status}
            transcript={transcript}
            onStart={onStart}
            onStop={onStop}
          />
        )}

        {activeTab === TabId.HowToUse && (
          <HowToUseView onComplete={() => {}} />
        )}

        {activeTab === TabId.WhatIsBreeze && <WhatIsBreezeView />}

        {activeTab === TabId.BuiltBy && <BuiltByView />}
      </div>
    </section>
  );
}