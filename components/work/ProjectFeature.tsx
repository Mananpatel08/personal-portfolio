import Link from "next/link";
import { ArrowCue } from "@/components/ui/ArrowCue";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCover } from "./ProjectCover";
import { ProjectMeta } from "./ProjectMeta";

/** Top tier: the cover carries the row, text sits beside it, sides alternate. */
export function ProjectFeature({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  return (
    <article>
      <Link
        href={`/work/${project.slug}`}
        className="group grid grid-cols-1 items-center gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14"
      >
        <div className={cn(reverse && "lg:order-2")}>
          <ProjectCover
            kind={project.cover}
            className="rounded-feature transition-shadow duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:shadow-card"
          />
        </div>

        <div className={cn(reverse && "lg:order-1")}>
          <ProjectMeta project={project} />
          <h2 className="mt-4 text-title text-ink">
            <span className="ulink">{project.name}</span>
          </h2>
          <p className="mt-4 max-w-[46ch] text-lead text-ink-soft">
            {project.summary}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>
          <div className="mt-8">
            <ArrowCue>Case study</ArrowCue>
          </div>
        </div>
      </Link>
    </article>
  );
}
