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
      <div className="p-6 border border-1 rounded-xl backdrop-blur-md">
        <p className="leading-relaxed">
          Breeze is designed to be <b>heard, not seen</b>.
          <br />
          <br />
          Unlike traditional dictation tools, Breeze runs in the background and
          injects text directly into your active window. Whether that's VS Code,
          Slack, or Notion.
        </p>
      </div>
    </div>
  );
};
