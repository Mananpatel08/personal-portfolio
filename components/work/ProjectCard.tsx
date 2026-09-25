import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/data/projects";
import { ProjectCover } from "./ProjectCover";
import { ProjectMeta } from "./ProjectMeta";

/** Middle tier: cover above, text below, two to a row. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <Link href={`/work/${project.slug}`} className="group block">
        <ProjectCover kind={project.cover} />
        <div className="mt-6">
          <ProjectMeta project={project} />
          <h2 className="mt-3 text-[1.5rem] leading-[1.12] font-medium tracking-[-0.03em] text-ink">
            <span className="ulink">{project.name}</span>
          </h2>
          <p className="mt-2.5 max-w-[42ch] text-body text-ink-soft">
            {project.tagline}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>
        </div>
      </Link>
    </article>
  );
}
