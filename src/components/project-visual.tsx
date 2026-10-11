import type { Project } from "@/data/projects";

export function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return <div className={`project-visual visual-${project.accent}${compact ? " visual-compact" : ""}`} aria-hidden="true">
    <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="visual-orbit orbit-three"/>
    <span className="visual-index">{project.number} / 05</span>
    <span className="visual-glyph">{project.title.slice(0, 1)}</span>
    <span className="visual-caption">{project.genre}</span>
  </div>;
}
