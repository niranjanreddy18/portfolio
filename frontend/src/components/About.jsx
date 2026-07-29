import { useReveal } from "../hooks/useReveal";

// Honest, accurate student journey
const timeline = [
  {
    year: "2022",
    title: "Joined RGUKT RK Valley",
    desc: "Started B.Tech in Computer Science & Engineering. Got introduced to core CS fundamentals — programming, data structures, and problem solving.",
  },
  {
    year: "2023",
    title: "Learned Python & Web Fundamentals",
    desc: "Picked up Python as my primary language. Explored HTML, CSS, and JavaScript. Built first simple web pages and command-line tools.",
  },
  {
    year: "2024",
    title: "Discovered Django & React",
    desc: "Dived into Django REST Framework for backend APIs and React for frontend development. Started combining both to build full-stack applications.",
  },
  {
    year: "2024",
    title: "Built E-commerce Platform",
    desc: "Developed a complete, production-level e-commerce website — JWT auth, Stripe payments, product catalog, cart, orders, and REST APIs.",
  },
  {
    year: "2025",
    title: "Exploring AI & LLMs",
    desc: "Currently studying Data Structures & Algorithms, advanced Django, and Large Language Models. Working toward building AI-powered web applications.",
  },
];

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="reveal mb-20">
          <span className="section-label">01. About</span>
          <h2 className="section-title mt-3">
            Crafting Digital<br />
            <span className="gradient-text">Experiences</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: text */}
          <div className="space-y-6">
            <p className="text-white/60 text-lg leading-relaxed">
              I'm <strong className="text-white/80">Nakkala Niranjan Reddy</strong>, a 3rd-year B.Tech
              Computer Science student at RGUKT RK Valley. I build full-stack web applications using
              Django for the backend and React for the frontend, and I'm focused on writing software
              that works reliably in the real world.
            </p>
            <p className="text-white/40 leading-relaxed">
              My core stack includes Python, Django, Django REST Framework, React, and PostgreSQL.
              Alongside my studies, I built a complete e-commerce platform from scratch — covering
              JWT authentication, product management, a shopping cart, Stripe payment integration,
              and a REST API — deployed on Render and Vercel. I learn best by building things, and
              that project reflects everything I've absorbed so far.
            </p>
            <p className="text-white/40 leading-relaxed">
              I'm currently deepening my knowledge of Data Structures &amp; Algorithms, advanced Django
              patterns, and the foundations of AI — including Large Language Models and Agentic AI
              systems. My goal is to grow into an engineer who can build both the backend infrastructure
              and the intelligent layer that sits on top of it.
            </p>

            {/* Quick facts */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { label: "University", val: "RGUKT RK Valley" },
                { label: "Year", val: "3rd Year B.Tech CSE" },
                { label: "Status", val: "Open to Opportunities" },
                { label: "Primary Stack", val: "Django + React" },
              ].map((f) => (
                <div key={f.label} className="glass rounded-xl p-4 border border-white/5">
                  <div className="font-mono text-xs text-white/30 mb-1">{f.label}</div>
                  <div className="font-display font-semibold text-white/80 text-sm">{f.val}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-2">
              <a href="#contact" className="btn-primary text-sm py-3">
                Work with me
              </a>
              {/* TODO: Add your resume PDF to frontend/public/resume.pdf */}
              <a href="/resume.pdf" className="btn-outline text-sm py-3">
                Download CV
              </a>
            </div>
          </div>

          {/* Right: timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-violet-400/20 to-transparent" />

            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative pl-14 group">
                  {/* Dot */}
                  <div className="absolute left-[17px] top-1 w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform glow-cyan" />
                  {/* Connector */}
                  <div className="absolute left-[21px] top-3 w-8 h-px bg-gradient-to-r from-cyan-400/30 to-transparent" />

                  <div className="glass rounded-xl p-5 border border-white/5 hover:border-cyan-400/20 transition-all group-hover:-translate-x-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">{item.year}</span>
                      <span className="font-display font-bold text-white/90 text-sm">{item.title}</span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
