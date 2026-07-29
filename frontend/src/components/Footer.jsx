export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg glass-strong border border-cyan-400/20 flex items-center justify-center">
              <span className="font-display font-black text-xs gradient-text">NR</span>
            </div>
            <span className="font-mono text-white/30 text-sm">© {year} Nakkala Niranjan Reddy</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Built with React + Django
          </div>

          <div className="flex gap-5">
            {/* TODO: Replace # with your actual profile URLs */}
            <a href="https://github.com/YOUR_GITHUB_USERNAME" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/YOUR_LINKEDIN_ID" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              LinkedIn
            </a>
            <a href="mailto:YOUR_EMAIL@gmail.com" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
