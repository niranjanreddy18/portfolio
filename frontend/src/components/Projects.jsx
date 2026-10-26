import { useReveal } from "../hooks/useReveal";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const ref = useReveal();

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
            Practical full-stack web applications and modern healthcare platforms showcasing interactive animations, end-to-end user flows, and clean architectures.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {projects.map((project) => (
            <ProjectCard
              key={project.id || project.slug}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
