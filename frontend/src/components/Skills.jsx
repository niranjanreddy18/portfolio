import { useRef, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";

// Real skills only — no exaggeration
const skillGroups = [
  {
    label: "Frontend",
    color: "#6ee7f7",
    skills: [
      { name: "React.js", level: 75 },
      { name: "JavaScript (ES6+)", level: 78 },
      { name: "HTML5", level: 88 },
      { name: "CSS3", level: 82 },
    ],
  },
  {
    label: "Backend",
    color: "#a78bfa",
    skills: [
      { name: "Python", level: 85 },
      { name: "Django", level: 80 },
      { name: "Django REST Framework", level: 78 },
      { name: "REST APIs", level: 80 },
    ],
  },
  {
    label: "Database & Tools",
    color: "#f472b6",
    skills: [
      { name: "PostgreSQL", level: 72 },
      { name: "Git & GitHub", level: 82 },
      { name: "Docker (basics)", level: 60 },
      // TODO: Add more tools as you learn them (Redis, MongoDB, etc.)
    ],
  },
  {
    label: "Currently Learning",
    color: "#fbbf24",
    skills: [
      { name: "LLMs & Prompt Engineering", level: 40 },
      { name: "Agentic AI", level: 30 },
      { name: "TypeScript", level: 35 },
      // TODO: Update levels as you progress
    ],
  },
];

// Only real technologies I have used
const techBadges = [
  "Python", "Django", "DRF", "React.js", "JavaScript",
  "HTML5", "CSS3", "PostgreSQL", "SQLite", "Git",
  "GitHub", "Docker", "Stripe API", "JWT", "REST APIs",
  "Vercel", "Render",
];

function SkillBar({ name, level, color }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => { el.style.width = `${level}%`; }, 200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-sm text-white/70">{name}</span>
        <span className="font-mono text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: "0%",
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-20">
          <span className="section-label">02. Skills</span>
          <h2 className="section-title mt-3">
            Tools I Build<br />
            <span className="gradient-text">With</span>
          </h2>
        </div>

        {/* Skill groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="glass rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                <span className="font-display font-bold text-white/80">{group.label}</span>
              </div>
              <div className="space-y-4">
                {group.skills.map((s) => (
                  <SkillBar key={s.name} {...s} color={group.color} />
                ))}
              </div>
            </div>
          ))}

          {/* Wide "all tech" card */}
          <div className="glass rounded-2xl p-6 border border-white/5 md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              <span className="font-display font-bold text-white/80">All Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
