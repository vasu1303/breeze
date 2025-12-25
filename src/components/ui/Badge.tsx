import React from 'react';

type BadgeProps = {
  status: string;
};

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const isListening = status === "Listening...";
  const isError = status.startsWith("Error");

  return (
    <div className={`
      relative inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300
      ${isListening 
        ? "bg-red-950/30 text-red-400 border-red-900/50 shadow-[0_0_15px_rgba(248,113,113,0.2)]" 
        : isError
        ? "bg-amber-950/30 text-amber-400 border-amber-900/50"
        : "bg-zinc-900 text-zinc-200 border-zinc-800"
      }
    `}>
      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${isListening ? "bg-red-500 animate-pulse" : "bg-current"}`} />
      {status}
    </div>
  );
};