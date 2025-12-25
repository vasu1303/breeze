export const WhatIsBreezeView: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto pt-10 text- space-y-6">
      <h2 className="text-3xl font-bold text-black">
        The{" "}
        <span className="text-zinc-200 hover:text-black transition-all duration-300 cursor-pointer">
          Invisible
        </span>{" "}
        Interface
      </h2>
      <div className="p-6 border border-1 rounded-xl backdrop-blur-md space-y-4">
        <p className="leading-relaxed">
          Breeze is designed to be <b>heard, not seen</b>.
        </p>
        <p className="leading-relaxed">
          Unlike traditional dictation tools, Breeze runs in the background and
          injects text directly into your active window. Whether that's VS Code,
          Slack, or Notion.
        </p>
        <p className="leading-relaxed">
          Press <kbd className="px-2 py-1 bg-zinc-100 rounded text-xs border border-zinc-300">Ctrl + T</kbd> from anywhere, speak naturally, and watch your words appear instantly—no copy-paste, no switching windows.
        </p>
        <p className="leading-relaxed">
          It's like having a <b>personal typist</b> that lives in your keyboard shortcuts.
        </p>
      </div>
    </div>
  );
};
