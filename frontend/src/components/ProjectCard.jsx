/**
 * ProjectCard Component
 * 
 * Renders individual project cards using statically supplied metadata.
 * Designed to load instantly without any backend API dependence or network latency.
 */

export default function ProjectCard({ project }) {
  const title = project.title || project.name;
  const liveUrl = project.live_url || project.frontend_url;

  return (
    <div className="glass-card p-6 sm:p-7 flex flex-col justify-between h-full group">
      {/* Card Header & Content */}
      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-sky-400 font-medium tracking-wide">
            {project.category || project.short_desc}
          </span>
          {project.status && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.status}</span>
            </span>
          )}
        </div>

        {/* Title & Short Description */}
        <div>
          <h3 className="font-display font-bold text-2xl text-white group-hover:text-sky-400 transition-colors inline-block">
            {title}
          </h3>
          {project.short_desc && (
            <p className="font-mono text-xs text-sky-400 font-medium mt-1">
              {project.short_desc}
            </p>
          )}
        </div>

        {/* Detailed Description */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>

        {/* Key Highlights / Features */}
        {Array.isArray(project.key_features) && project.key_features.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
                Key Features
              </span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.key_features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-sky-400 font-mono text-sm leading-none mt-0.5">▸</span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies Tags */}
        {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
          <div>
            <div className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2.5">
              Technologies
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span key={tech} className="tech-tag text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Backend Note / Wake-up Explanation if applicable */}
        {project.backend_note && (
          <div className="flex items-start gap-2 p-2.5 rounded-lg bg-sky-950/20 border border-sky-500/15 text-slate-300 text-xs">
            <span className="text-sky-400 font-mono text-xs mt-0.5">⚡</span>
            <span className="text-[11px] font-mono text-slate-400 leading-relaxed">
              {project.backend_note}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer CTAs */}
      <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-3">
        {liveUrl && (
          <a
            href={liveUrl}
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
            <span>View Code</span>
            <span className="ml-1.5 text-[10px]">↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
