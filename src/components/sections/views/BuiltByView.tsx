import { BookSearch, Bot, Coffee, Github, Linkedin } from "lucide-react";
import { TechCard } from "../../ui/TechCard";

export const BuiltByView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto pt-6 text-zinc-300">
      <h2 className="text-2xl font-bold text-black mb-2">Engineering Stack</h2>
      <p className="text-zinc-400 text-sm mb-4">
        Built with modern, performant technologies for a seamless voice-to-text experience.
      </p>
      
      <div className="space-y-3">
        {/* Core Technologies */}
        <div>
          <h3 className="text-base font-semibold text-black mb-2">Core</h3>
          <div className="grid grid-cols-2 gap-2">
            <TechCard title="Tauri v2" desc="Rust-based lightweight runtime" />
            <TechCard title="React + Vite" desc="High-performance frontend" />
            <TechCard title="TypeScript" desc="Type-safe development" />
            <TechCard title="Tailwind CSS" desc="Utility-first styling" />
          </div>
        </div>

        {/* AI & Services */}
        <div>
          <h3 className="text-base font-semibold text-black mb-2">AI & Services</h3>
          <div className="grid grid-cols-2 gap-2">
            <TechCard title="Deepgram" desc="Nova-2 Speech-to-Text Model" />
            <TechCard title="WebSocket API" desc="Real-time streaming" />
          </div>
        </div>

        {/* System Integration */}
        <div>
          <h3 className="text-base font-semibold text-black mb-2">System Integration</h3>
          <div className="grid grid-cols-2 gap-2">
            <TechCard title="Enigo" desc="Native OS Input Simulation" />
            <TechCard title="Global Shortcuts" desc="System-wide hotkeys" />
          </div>
        </div>
      </div>

      {/* Built By Section */}
      <div className="mt-6 pt-4 border-t border-zinc-700">
        <h3 className="text-lg font-semibold text-black mb-2">Built By  <span className="font-semibold  text-blue-600">Vasu</span> </h3>
        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
          <p className="text-zinc-700 leading-relaxed text-base mb-3">
            Crafted with <span className="font-semibold">lots of coffee</span> <Coffee className="inline w-4 h-4 mx-1" />, 
            extensive documentation <BookSearch className="inline w-4 h-4 mx-1" />, and a little help from AI <Bot className="inline w-4 h-4 mx-1"  /> (okay maybe a bit more..).
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 text-zinc-700">
              <Linkedin className="w-5 h-5" />
              <span className="text-xs text-zinc-500">(/vasusingh1305/)</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-700">
              <Github className="w-5 h-5" />
              <span className="text-xs text-zinc-500">(/Vasu1303)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
