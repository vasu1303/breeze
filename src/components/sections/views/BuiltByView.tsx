import { TechCard } from "../../ui/TechCard";

export const BuiltByView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto pt-10 text-zinc-300">
      <h2 className="text-3xl font-bold text-white mb-8">Engineering Stack</h2>
      <div className="grid grid-cols-2 gap-4">
        <TechCard title="Tauri v2" desc="Rust-based lightweight runtime" />
        <TechCard title="Deepgram" desc="Nova-2 Speech-to-Text Model" />
        <TechCard title="React + Vite" desc="High-performance frontend" />
        <TechCard title="Enigo" desc="Native OS Input Simulation" />
      </div>
    </div>
  );
};
