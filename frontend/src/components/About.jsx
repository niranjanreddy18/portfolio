import { useReveal } from "../hooks/useReveal";

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="py-20 relative overflow-hidden border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className="reveal mb-8">
          <span className="section-label">About</span>
          <h2 className="section-title mt-1">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        {/* Content Card */}
        <div className="glass-card p-6 sm:p-8 space-y-6">
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            I am a Computer Science &amp; Engineering student at <span className="text-sky-400 font-semibold">RGUKT RK Valley</span> focused on building practical full-stack web applications.
          </p>

          <p className="text-slate-300 text-base leading-relaxed">
            My engineering work is centered on <strong className="text-white font-semibold">Python, Django, Django REST Framework, React, and PostgreSQL</strong>. I build RESTful APIs, relational data models, authentication systems, real-time applications, and responsive user interfaces.
          </p>

          <p className="text-slate-300 text-base leading-relaxed">
            I focus on clean architecture, maintainable code, and understanding how the frontend, backend, database, and APIs work together.
          </p>
        </div>
      </div>
    </section>
  );
}
