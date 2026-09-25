import Link from "next/link";
import { IconArrow } from "@/components/ui/icons";
import type { Project } from "@/lib/data/projects";
import { ProjectMeta } from "./ProjectMeta";

/** Bottom tier: text only, three to a row. No cover — that’s the difference. */
export function ProjectCompact({ project }: { project: Project }) {
  return (
    <article className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className="card card-hover group flex h-full flex-col p-6"
      >
        <ProjectMeta project={project} />
        <h2 className="mt-4 flex items-start gap-2 text-head text-ink">
          <span className="ulink">{project.name}</span>
          <IconArrow
            width={13}
            height={13}
            className="mt-1 shrink-0 text-ink-faint opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          />
        </h2>
        <p className="mt-2.5 flex-1 text-body text-ink-soft">
          {project.tagline}
        </p>
        <p className="mt-6 font-mono text-nano text-ink-soft">
          {project.stack.slice(0, 3).join(" · ")}
        </p>
      </Link>
    </article>
  );
}
