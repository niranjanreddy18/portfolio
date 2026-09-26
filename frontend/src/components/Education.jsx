import { useReveal } from "../hooks/useReveal";

export default function Education() {
  const ref = useReveal();

  return (
    <section id="education" className="py-20 relative overflow-hidden border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className="reveal mb-10">
          <span className="section-label">Education</span>
          <h2 className="section-title mt-1">
            Academic <span className="gradient-text">Background</span>
          </h2>
        </div>

        {/* Education Card */}
        <div className="glass-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center font-display font-extrabold text-sky-400 text-lg flex-shrink-0">
                CSE
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-xl sm:text-2xl">
                  B.Tech in Computer Science and Engineering
                </h3>
                <div className="font-mono text-sm text-sky-400 mt-1">
                  Rajiv Gandhi University of Knowledge and Technologies, RK Valley
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 text-sm">
            <div className="flex justify-between sm:justify-start sm:gap-4 items-center bg-slate-900/50 p-3.5 rounded-lg border border-slate-800">
              <span className="text-slate-400 font-medium">Expected Graduation:</span>
              <span className="text-slate-200 font-mono font-semibold text-base">2028</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
