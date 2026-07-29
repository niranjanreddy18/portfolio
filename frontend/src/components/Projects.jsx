import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const categories = ["All", "Full Stack", "Backend", "Frontend"];

const projects = [
  {
    id: 1,
    title: "Full Stack E-commerce Platform",
    desc: "A production-level e-commerce web application built with Django REST Framework and React. Features full user authentication, product catalog with categories and filters, shopping cart, wishlist, order management, and Stripe payment integration.",
    tech: ["Django", "DRF", "React", "PostgreSQL", "Stripe", "JWT", "Docker", "Vercel", "Render"],
    category: "Full Stack",
    // TODO: Replace "#" with your live deployed URL once available
    live: "#",
    // TODO: Replace "#" with your actual GitHub repository URL
    repo: "https://github.com/YOUR_GITHUB_USERNAME/ecommerce-project",
    featured: true,
    gradient: "from-cyan-400/20 to-violet-500/20",
    accent: "#6ee7f7",
    highlights: [
      "JWT Authentication & Authorization",
      "Product Catalog with Search & Filters",
      "Shopping Cart & Wishlist",
      "Stripe Payment Gateway",
      "Admin Dashboard",
      "REST API with DRF",
    ],
  },
  // TODO: Add your next project here once built
  // {
  //   id: 2,
  //   title: "Your Next Project",
  //   desc: "Description of the project...",
  //   tech: [],
  //   category: "...",
  //   live: "#",
  //   repo: "#",
  //   featured: false,
  //   gradient: "from-violet-500/20 to-pink-500/20",
  //   accent: "#a78bfa",
  // },
];

function ProjectCard({ project }) {
  return (
    <div className="group relative glass rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500 hover:-translate-y-1">
      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="font-mono text-xs px-2 py-1 rounded bg-cyan-400/10 border border-cyan-400/20 text-cyan-400">
            ★ Featured
          </span>
        </div>
      )}

      {/* Project image placeholder */}
      {/* TODO: Add a real screenshot — replace this div with an <img> tag */}
      <div
        className="relative w-full h-48 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${project.accent}10, transparent)` }}
      >
        <div className="font-display font-black text-6xl opacity-10" style={{ color: project.accent }}>
          {project.id.toString().padStart(2, "0")}
        </div>
        <div className="absolute inset-0 shimmer" />
        {/* Grid lines on hover */}
        <div className="absolute inset-0 grid-bg opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Hint text */}
        <div className="absolute bottom-3 left-0 right-0 text-center font-mono text-xs text-white/20">
          {/* TODO: Add screenshot here */}
          screenshot coming soon
        </div>
      </div>

      <div className="relative z-10 p-6">
        <h3 className="font-display font-bold text-white/90 text-lg mb-2 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-4">{project.desc}</p>

        {/* Highlights */}
        {project.highlights && (
          <ul className="mb-4 space-y-1">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 font-mono text-xs text-white/35">
                <span className="text-cyan-400/60">▸</span> {h}
              </li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center py-2 rounded-lg font-mono text-xs font-medium transition-all"
            style={{
              background: `${project.accent}15`,
              border: `1px solid ${project.accent}30`,
              color: project.accent,
            }}
            onMouseEnter={(e) => { e.target.style.background = `${project.accent}25`; }}
            onMouseLeave={(e) => { e.target.style.background = `${project.accent}15`; }}
          >
            Live Demo ↗
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="flex-1 text-center py-2 rounded-lg font-mono text-xs font-medium border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
          >
            GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const ref = useReveal();

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="reveal mb-12">
          <span className="section-label">03. Projects</span>
          <h2 className="section-title mt-3">
            Things I've<br />
            <span className="gradient-text">Built</span>
          </h2>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-cyan-400/30 bg-transparent"
            />
            <span className="absolute right-3 top-2.5 text-white/20">⌕</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-mono text-xs transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-400/15 border border-cyan-400/30 text-cyan-400"
                    : "glass border border-white/10 text-white/40 hover:text-white/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30 font-mono">
            No projects found for "{search}"
          </div>
        )}

        <div className="text-center mt-12">
          {/* TODO: Replace with your actual GitHub profile URL */}
          <a
            href="https://github.com/YOUR_GITHUB_USERNAME"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            View All on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
