import { useReveal } from "../hooks/useReveal";

// Honest fresher experience — no fake companies
// Currently building projects and continuously learning
const learningAreas = [
  {
    title: "Full Stack Development",
    company: "Self-Directed Learning",
    period: "2023 – Present",
    type: "Personal Projects",
    desc: "Building production-level applications using Django, DRF, React, and PostgreSQL. Implemented JWT authentication, REST APIs, payment integration, and deployment pipelines.",
    skills: ["Django", "DRF", "React", "PostgreSQL", "Stripe", "Docker", "REST APIs"],
    color: "#6ee7f7",
  },
  {
    title: "Backend & API Development",
    company: "Self-Directed Learning",
    period: "2023 – Present",
    type: "Ongoing",
    desc: "Deepening understanding of Django REST Framework, database design, serializers, viewsets, permissions, and API pagination and filtering.",
    skills: ["Django", "DRF", "PostgreSQL", "JWT", "Python"],
    color: "#a78bfa",
  },
  {
    title: "AI & LLM Engineering",
    company: "Self-Directed Learning",
    period: "2025 – Present",
    type: "In Progress",
    desc: "Actively learning Large Language Models (LLMs), prompt engineering, and Agentic AI. Goal is to integrate AI capabilities into real-world web applications.",
    skills: ["Python", "LLMs", "Agentic AI", "Prompt Engineering"],
    color: "#fbbf24",
  },
];

// Only real certifications — add yours here
const certifications = [
  // TODO: Add your real certifications here once you have them
  // Example:
  // { name: "Django for Everybody", org: "Coursera / University of Michigan", year: "2024", badge: "DJ" },
  // { name: "React - The Complete Guide", org: "Udemy", year: "2023", badge: "RE" },
];

export default function Experience() {
  const ref = useReveal();

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/3 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-20">
          <span className="section-label">04. Experience</span>
          <h2 className="section-title mt-3">
            How I've<br />
            <span className="gradient-text">Grown</span>
          </h2>
        </div>

        {/* Honest fresher notice */}
        <div className="glass rounded-2xl p-5 border border-cyan-400/15 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center font-mono text-xs text-cyan-400 font-bold flex-shrink-0">
              ✦
            </div>
            <div>
              <div className="font-display font-bold text-white/80 mb-1">Currently Building & Learning</div>
              <p className="font-mono text-sm text-white/40 leading-relaxed">
                I'm a fresher developer focused on building real projects and continuously learning modern web development and AI.
                No corporate work experience yet — but every line of code below represents genuine, self-driven growth.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Learning timeline */}
          <div>
            <h3 className="font-display font-bold text-white/60 text-sm mb-8 tracking-widest uppercase">Learning Journey</h3>
            <div className="relative space-y-6">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/30 to-transparent" />
              {learningAreas.map((exp, i) => (
                <div key={i} className="relative pl-14 group">
                  <div
                    className="absolute left-[17px] top-3 w-3 h-3 rounded-full border-2 transition-all group-hover:scale-125"
                    style={{ borderColor: exp.color, background: `${exp.color}20` }}
                  />
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <div>
                        <div className="font-display font-bold text-white/90">{exp.title}</div>
                        <div className="font-mono text-sm" style={{ color: exp.color }}>{exp.company}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-mono text-xs text-white/40">{exp.period}</div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded mt-1 inline-block" style={{ background: `${exp.color}15`, color: exp.color }}>
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed mt-3 mb-3">{exp.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span key={s} className="tech-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications + Education */}
          <div>
            <h3 className="font-display font-bold text-white/60 text-sm mb-8 tracking-widest uppercase">Certifications</h3>

            {certifications.length === 0 ? (
              <div className="glass rounded-xl p-5 border border-white/5 border-dashed">
                <p className="font-mono text-sm text-white/25 text-center">
                  {/* TODO: Add your real certifications here */}
                  Certifications will appear here once earned.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.name} className="glass rounded-xl p-5 border border-white/5 hover:border-cyan-400/20 transition-all flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl glass-strong border border-white/10 flex items-center justify-center font-mono text-xs text-white/50 font-bold flex-shrink-0 group-hover:border-cyan-400/20">
                      {cert.badge}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-white/80 text-sm">{cert.name}</div>
                      <div className="font-mono text-xs text-white/40">{cert.org}</div>
                    </div>
                    <div className="font-mono text-xs text-white/30 flex-shrink-0">{cert.year}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            <h3 className="font-display font-bold text-white/60 text-sm mt-12 mb-8 tracking-widest uppercase">Education</h3>
            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 border border-white/10 flex items-center justify-center font-display font-black text-sm gradient-text flex-shrink-0">
                  BSc
                </div>
                <div>
                  <div className="font-display font-bold text-white/90">B.Sc. Computer Science</div>
                  <div className="font-mono text-sm text-cyan-400/70">JNTU Hyderabad</div>
                  <div className="font-mono text-xs text-white/30 mt-1">2020 – 2024</div>
                  <p className="text-white/40 text-sm mt-2 leading-relaxed">
                    Core CS fundamentals — algorithms, data structures, databases, operating systems,
                    and distributed systems. Built real-world projects through self-directed learning
                    alongside academics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
