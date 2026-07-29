import { useReveal } from "../hooks/useReveal";

// Testimonials section replaced with "What I'm Building Toward"
// Reason: Removed fake testimonials from fake clients.
// As a fresher, displaying fabricated client reviews would be dishonest.
// This section now highlights goals and values instead.

const goals = [
  {
    icon: "🚀",
    title: "AI Engineer",
    color: "#6ee7f7",
    text: "My primary long-term goal is to become an AI Engineer — building intelligent systems using LLMs, RAG pipelines, and Agentic AI on top of solid full-stack foundations.",
  },
  {
    icon: "🏗️",
    title: "Backend Excellence",
    color: "#a78bfa",
    text: "I believe clean, well-architected backend systems are the foundation of great software. I'm committed to mastering Django, REST API design, and scalable database patterns.",
  },
  {
    icon: "📦",
    title: "Ship Real Products",
    color: "#f472b6",
    text: "I don't just write code — I deliver working, deployed software. My e-commerce platform is live, tested, and production-ready. That mindset drives everything I build.",
  },
];

export default function Testimonials() {
  const ref = useReveal();

  return (
    <section id="goals" className="py-32 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-16 text-center">
          <span className="section-label">04. Goals & Values</span>
          <h2 className="section-title mt-3">
            What I'm Building<br />
            <span className="gradient-text">Toward</span>
          </h2>
          <p className="text-white/30 font-mono text-sm mt-4 max-w-lg mx-auto">
            These are the principles and ambitions that drive my work every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {goals.map((g, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-7 border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: g.color }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 border"
                style={{ background: `${g.color}10`, borderColor: `${g.color}25` }}
              >
                {g.icon}
              </div>

              <h3 className="font-display font-bold text-white/90 text-lg mb-3" style={{ color: g.color }}>
                {g.title}
              </h3>

              <p className="text-white/50 text-sm leading-relaxed">{g.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
