import { useState, useEffect } from "react";

const roles = [
  "Full Stack Developer",
  "Django & React Engineer",
  "AI Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const role = roles[roleIdx];
    let i = typing ? 0 : role.length;
    let timer;

    if (typing) {
      timer = setInterval(() => {
        setDisplayed(role.slice(0, i + 1));
        i++;
        if (i > role.length) {
          clearInterval(timer);
          setTimeout(() => setTyping(false), 2000);
        }
      }, 65);
    } else {
      timer = setInterval(() => {
        setDisplayed(role.slice(0, i - 1));
        i--;
        if (i <= 0) {
          clearInterval(timer);
          setRoleIdx((prev) => (prev + 1) % roles.length);
          setTyping(true);
        }
      }, 35);
    }
    return () => clearInterval(timer);
  }, [roleIdx, typing]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />

      {/* Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-400/5 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pink-500/3 blur-[80px] pointer-events-none" />

      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.02] animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-cyan-400/[0.04] animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-cyan-400/20 mb-8 animate-fadeInUp">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-cyan-400/80 text-xs tracking-widest">OPEN TO OPPORTUNITIES</span>
        </div>

        {/* Name */}
        <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
          <span className="text-white">Niranjan</span>
          <br />
          <span className="gradient-text">Reddy</span>
        </h1>

        {/* Typewriter */}
        <div className="h-12 flex items-center justify-center mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <span className="font-mono text-xl md:text-2xl text-white/50">
            {"// "}
            <span className="text-cyan-400">{displayed}</span>
            <span className="animate-blink text-cyan-400">|</span>
          </span>
        </div>

        {/* Bio */}
        <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed mb-12 animate-fadeInUp" style={{ animationDelay: '0.3s', opacity: 0, animationFillMode: 'forwards' }}>
          I build full-stack web applications with Django and React, and I'm on a journey to become an AI/LLM engineer.
          Turning ideas into production-ready digital products.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeInUp" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
          <a href="#projects" className="btn-primary relative z-10">
            <span className="relative z-10">View My Work</span>
          </a>
          <a href="#contact" className="btn-outline">
            Let's Talk →
          </a>
        </div>

        {/* Social links */}
        {/* TODO: Replace href values with your actual profile URLs */}
        <div className="flex items-center justify-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          {[
            { label: "GitHub", href: "https://github.com/YOUR_GITHUB_USERNAME", icon: "GH" },
            { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_LINKEDIN_ID", icon: "LI" },
            { label: "Email", href: "mailto:YOUR_EMAIL@gmail.com", icon: "✉" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 glass-strong rounded-lg flex items-center justify-center border border-white/10 hover:border-cyan-400/40 hover:text-cyan-400 text-white/40 transition-all hover:-translate-y-1 font-mono text-xs font-bold"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
          <span className="w-12 h-px bg-white/10" />
          {/* TODO: Replace @YOUR_GITHUB_USERNAME with your actual GitHub handle */}
          <span className="font-mono text-xs text-white/20">@YOUR_GITHUB_USERNAME</span>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-mono text-xs text-white/20 tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-cyan-400/40 to-transparent" />
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-16 left-0 right-0 hidden lg:flex justify-center">
        <div className="flex gap-16">
          {[
            { n: "1+", label: "Production Project" },
            { n: "3+", label: "Technologies" },
            { n: "∞", label: "Learning Spirit" },
            { n: "2025", label: "Ready to Contribute" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display font-black text-2xl gradient-text">{s.n}</div>
              <div className="font-mono text-xs text-white/30">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
