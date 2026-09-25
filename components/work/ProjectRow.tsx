import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { IconArrow } from "@/components/ui/icons";
import type { Project } from "@/lib/data/projects";
import { ProjectCover } from "./ProjectCover";

/**
 * An index entry rather than a card — the archive reads as a list of work,
 * with the project name doing the heavy lifting.
 */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <li className="border-t border-line">
      <Link
        href={`/work/${project.slug}`}
        className="group -mx-5 grid grid-cols-1 gap-6 rounded-[14px] px-5 py-8 transition-colors duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:bg-surface sm:grid-cols-12 sm:items-center sm:gap-8 sm:py-9"
      >
        <div className="flex items-center gap-3 sm:col-span-2 sm:block sm:self-start sm:pt-1">
          <span className="font-mono text-nano tabular-nums text-ink-soft">
            {project.year}
          </span>
          <span className="text-nano text-ink-soft sm:mt-2 sm:block">
            {project.context}
          </span>
        </div>

        <div className="sm:col-span-6 lg:col-span-5">
          <h3 className="flex items-start gap-2 text-[1.7rem] leading-[1.08] font-medium tracking-[-0.034em] text-ink sm:text-[2.05rem]">
            <span className="ulink">{project.name}</span>
            <IconArrow
              width={15}
              height={15}
              className="mt-2 shrink-0 text-ink-faint opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            />
          </h3>
          <p className="mt-3 max-w-[44ch] text-body text-ink-soft">
            {project.tagline}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>
        </div>

        <div className="sm:col-span-4 sm:col-start-9">
          <ProjectCover kind={project.cover} />
        </div>
      </Link>
    </li>
  );
}
