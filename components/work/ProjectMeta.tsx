import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/** Year · context, in the quiet mono voice used for all metadata. */
export function ProjectMeta({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-2.5 text-nano text-ink-soft", className)}>
      <span className="font-mono tabular-nums">{project.year}</span>
      <span aria-hidden="true" className="h-px w-3 bg-current opacity-40" />
      <span>{project.context}</span>
    </p>
  );
}
