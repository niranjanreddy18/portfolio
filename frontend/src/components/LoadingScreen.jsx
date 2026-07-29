import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("Initializing");

  const steps = ["Initializing", "Loading modules", "Compiling assets", "Launching"];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 18 + 5;
        const clamped = Math.min(next, 100);
        const stepIdx = Math.floor((clamped / 100) * steps.length);
        setText(steps[Math.min(stepIdx, steps.length - 1)]);
        return clamped;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#080810] flex flex-col items-center justify-center z-[99999]">
      {/* Animated grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-[100px] animate-pulse-glow" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl glass-strong flex items-center justify-center glow-cyan">
            <span className="font-display font-black text-3xl gradient-text">NR</span>
          </div>
          <div className="absolute -inset-1 rounded-2xl border border-cyan-400/20 animate-ping opacity-30" />
        </div>

        <div className="text-center">
          <div className="font-mono text-cyan-400/60 text-sm mb-2 tracking-widest">
            {text}<span className="animate-blink">_</span>
          </div>
          <div className="w-64 h-px bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full progress-bar transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="font-mono text-white/20 text-xs mt-2">{Math.floor(progress)}%</div>
        </div>

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent animate-[scan-line_2s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
}
