import { useEffect } from "react";

/**
 * ProjectModal Component
 * 
 * Provides an in-depth view of project architecture, overview, highlights,
 * and live demonstrations without any external API calls.
 */
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!project) return null;

  const title = project.title || project.name;
  const liveUrl = project.live_url || project.frontend_url;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="glass-strong border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors text-sm font-mono border border-slate-700"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-xs text-sky-400 font-medium">
              {project.category || project.short_desc}
            </span>
            {project.status && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.status}</span>
              </span>
            )}
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {title}
          </h2>
          {project.short_desc && (
            <p className="font-mono text-xs sm:text-sm text-sky-400/90 font-medium">
              {project.short_desc}
            </p>
          )}
        </div>

        {/* Preview Banner */}
        {project.image && (
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900/60 aspect-video">
            <img
              src={project.image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overview Section */}
        <div className="space-y-2">
          <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
            Overview
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.overview || project.description}
          </p>
        </div>

        {/* Highlights Section */}
        {(project.highlights || project.key_features) && (
          <div className="space-y-2.5">
            <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Highlights &amp; Key Features
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {(project.highlights || project.key_features).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-sky-400 font-mono text-base leading-none mt-0.5">▸</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {Array.isArray(project.tech_stack) && project.tech_stack.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span key={tech} className="tech-tag text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Backend Note if applicable */}
        {project.backend_note && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-sky-950/30 border border-sky-500/20 text-slate-300 text-xs font-mono">
            <span className="text-sky-400 text-sm leading-none mt-0.5">⚡</span>
            <span className="leading-relaxed text-[11px] text-slate-400">{project.backend_note}</span>
          </div>
        )}

        {/* Action CTAs in Modal */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs py-2.5 px-5 font-medium"
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
              className="btn-outline text-xs py-2.5 px-5 font-medium"
            >
              <span>View Code</span>
              <span className="ml-1.5 text-[10px]">↗</span>
            </a>
          )}
          <button
            onClick={onClose}
            className="btn-outline text-xs py-2.5 px-4 font-medium text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
