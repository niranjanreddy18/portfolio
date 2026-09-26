export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/80 py-10 relative bg-[#090d16]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-400/30 flex items-center justify-center">
              <span className="font-display font-black text-xs gradient-text">NR</span>
            </div>
            <div className="font-mono text-slate-400 text-xs sm:text-sm">
              © {year} <span className="text-slate-200">Nakkala Niranjan Reddy</span>
            </div>
          </div>

          {/* Technology Note */}
          <div className="font-mono text-xs text-slate-400">
            Full-Stack Developer · Django &amp; React
          </div>

          {/* Links */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/niranjanreddy18"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-slate-400 hover:text-sky-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/niranjanreddy18"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-slate-400 hover:text-sky-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:niranjanreddynakkala@gmail.com"
              className="font-mono text-xs text-slate-400 hover:text-sky-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
