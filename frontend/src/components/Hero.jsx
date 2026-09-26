export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background ambient lighting and grid */}
      <div className="absolute inset-0 grid-bg opacity-75 pointer-events-none" />
      <div className="absolute top-1/4 left-1/6 w-[450px] h-[450px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Text & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 font-mono text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span>Full Stack Developer</span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-tight">
                Niranjan <span className="gradient-text">Reddy</span>
              </h1>
              <p className="font-display font-semibold text-xl sm:text-2xl text-slate-300 mt-2">
                Full Stack Developer
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3 max-w-xl">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                I build full-stack web applications using Django, Django REST Framework, React, and PostgreSQL.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Computer Science &amp; Engineering student at <span className="text-slate-200 font-medium">RGUKT RK Valley</span>.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="#projects" className="btn-primary text-sm py-3 px-6">
                View Projects
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-outline text-sm py-3 px-6 inline-flex items-center gap-1.5"
              >
                <span>Resume</span>
                <span className="text-xs">↗</span>
              </a>
              <a href="#contact" className="btn-outline text-sm py-3 px-6 border-slate-700/80 hover:border-sky-400/40">
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column: Information Card */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 sm:p-7 space-y-5 border border-slate-800/80 shadow-xl bg-slate-900/50">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-400" />
                  <span className="font-display font-bold text-white text-base">Developer Profile</span>
                </div>
                <span className="font-mono text-xs text-sky-400 bg-sky-400/10 px-2.5 py-1 rounded border border-sky-400/20">
                  CSE
                </span>
              </div>

              {/* Education info */}
              <div className="space-y-3">
                <div className="flex justify-between items-start text-sm">
                  <span className="text-slate-400 font-medium">Degree</span>
                  <span className="text-slate-200 font-semibold text-right">B.Tech in CSE</span>
                </div>

                <div className="flex justify-between items-start text-sm">
                  <span className="text-slate-400 font-medium">Institution</span>
                  <span className="text-slate-200 font-semibold text-right">RGUKT RK Valley</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400 font-medium">Expected Graduation</span>
                  <span className="text-slate-200 font-semibold">2028</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2">
                  Quick Contacts &amp; Links
                </div>

                <a
                  href="mailto:niranjanreddynakkala@gmail.com"
                  className="flex items-center justify-between text-xs font-mono text-slate-300 hover:text-sky-400 p-2 rounded bg-slate-800/40 hover:bg-slate-800/80 transition-colors"
                >
                  <span className="truncate">Email: niranjanreddynakkala@gmail.com</span>
                  <span className="ml-2 text-slate-400">✉</span>
                </a>

                <a
                  href="https://github.com/niranjanreddy18"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-slate-300 hover:text-sky-400 p-2 rounded bg-slate-800/40 hover:bg-slate-800/80 transition-colors"
                >
                  <span>GitHub: github.com/niranjanreddy18</span>
                  <span className="ml-2 text-slate-400">↗</span>
                </a>

                <a
                  href="https://linkedin.com/in/niranjanreddy18"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs font-mono text-slate-300 hover:text-sky-400 p-2 rounded bg-slate-800/40 hover:bg-slate-800/80 transition-colors"
                >
                  <span>LinkedIn: linkedin.com/in/niranjanreddy18</span>
                  <span className="ml-2 text-slate-400">↗</span>
                </a>

                <a
                  href="#home"
                  className="flex items-center justify-between text-xs font-mono text-slate-300 hover:text-sky-400 p-2 rounded bg-slate-800/40 hover:bg-slate-800/80 transition-colors"
                >
                  <span>Portfolio: niranjan.dev</span>
                  <span className="ml-2 text-slate-400">★</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
