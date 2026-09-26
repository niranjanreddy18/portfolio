import { useState, useEffect } from "react";
import { useReveal } from "../hooks/useReveal";
import { getProjects } from "../services/api";

export default function Projects() {
  const ref = useReveal();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (isMounted) {
          const list = Array.isArray(data) ? data : data.results || [];
          setProjects(list);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Unable to load projects. Please try again later.");
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="projects" className="py-20 relative overflow-hidden border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div ref={ref} className="reveal mb-10">
          <span className="section-label">Projects</span>
          <h2 className="section-title mt-1">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-400 text-base mt-2 max-w-xl">
            Practical full-stack applications showcasing end-to-end user flows, API architecture, and database persistence.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 font-mono text-slate-400 text-sm">
            <div className="inline-block w-7 h-7 border-2 border-sky-400 border-t-transparent rounded-full animate-spin mb-3" />
            <div>Loading projects...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="glass-card p-8 text-center text-slate-300 font-mono text-sm max-w-md mx-auto space-y-2 border-red-500/30">
            <div className="text-red-400 font-semibold text-base">Connection Error</div>
            <div className="text-slate-400">{error}</div>
          </div>
        )}

        {/* Desktop Side-by-Side Grid (Equal width & equal height cards) */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {projects.map((project) => (
              <div
                key={project.id || project.slug}
                className="glass-card p-6 sm:p-8 flex flex-col justify-between h-full group"
              >
                {/* Card Header & Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-white group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.short_desc && (
                      <p className="font-mono text-xs text-sky-400 font-medium mt-1">
                        {project.short_desc}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
                    <div>
                      <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
                        Technologies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer CTAs */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary text-xs py-2.5 px-4 font-medium"
                    >
                      <span>Live Demo</span>
                      <span className="ml-1.5 text-[10px]">↗</span>
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline text-xs py-2.5 px-4 font-medium"
                    >
                      <span>Source Code</span>
                      <span className="ml-1.5 text-[10px]">↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
