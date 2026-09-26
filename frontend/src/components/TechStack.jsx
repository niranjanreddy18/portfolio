import { useReveal } from "../hooks/useReveal";

const techCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    skills: [
      "Python",
      "Django",
      "Django REST Framework",
      "Django Channels",
      "WebSockets",
      "REST APIs",
      "JWT",
    ],
  },
  {
    title: "Database",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Redis",
      "Database Design",
    ],
  },
  {
    title: "Tools & Deployment",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Cloudinary",
      "Vercel",
      "Render",
    ],
  },
];

export default function TechStack() {
  const ref = useReveal();

  return (
    <section id="skills" className="py-20 relative overflow-hidden border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className="reveal mb-10">
          <span className="section-label">Tech Stack</span>
          <h2 className="section-title mt-1">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-slate-400 text-base mt-2 max-w-xl">
            Core technologies and tools actively used in full-stack application development.
          </p>
        </div>

        {/* 4 Column Layout on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category) => (
            <div
              key={category.title}
              className="glass-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <h3 className="font-display font-bold text-white text-lg tracking-wide">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-slate-200 text-base font-medium">
                      <span className="text-sky-400 font-mono text-sm">▸</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
