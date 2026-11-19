import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Project } from "@/lib/data/projects";
import { ProjectCover } from "./ProjectCover";

/** Middle tier: cover above, text below, two to a row. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <Link href={`/work/${project.slug}`} className="group block">
        <ProjectCover kind={project.cover} />
        <div className="mt-6">
          <h2 className="text-h3-medium text-ink">
            <span className="ulink">{project.name}</span>
          </h2>
          <p className="mt-2.5 max-w-[42ch] text-body-sm-regular text-ink-soft">
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
