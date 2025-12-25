interface TechCardProps {
  title: string;
  desc: string;
}

export const TechCard: React.FC<TechCardProps> = ({ title, desc }) => {
  return (
    <div className="p-3 cursor-pointer border border-1 rounded-xl hover:border-blue-500/30 transition-colors">
      <div className="font-bold text-blue-400 mb-0.5 text-base">{title}</div>
      <div className="text-sm text-zinc-500">{desc}</div>
    </div>
  );
};
