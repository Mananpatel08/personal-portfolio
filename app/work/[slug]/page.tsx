import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ContactBand } from "@/components/home/ContactBand";
import { Tag } from "@/components/ui/Tag";
import { IconArrow } from "@/components/ui/icons";
import { CaseSection } from "@/components/work/CaseSection";
import { ProjectCover } from "@/components/work/ProjectCover";
import { ProjectMeta } from "@/components/work/ProjectMeta";
import { getProject, projects } from "@/lib/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Container>
        <div className="pt-8">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-micro text-ink-soft transition-colors hover:text-ink"
          >
            <IconArrow
              width={13}
              height={13}
              className="rotate-[225deg] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-0.5"
            />
            <span className="ulink">Work</span>
          </Link>
        </div>

        <header className="pt-10 pb-12 sm:pt-12 sm:pb-14">
          <ProjectMeta project={project} />
          <h1 className="mt-5 max-w-[16ch] text-display text-ink">
            {project.name}
          </h1>
          <p className="mt-5 max-w-[52ch] text-lead text-ink-soft">
            {project.tagline}
          </p>

        </header>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ProjectCover
              kind={project.cover}
              className="rounded-feature shadow-card"
            />
          </div>

          <dl className="border-b border-line lg:col-span-4 lg:col-start-9">
            <div className="border-t border-line py-5">
              <dt className="text-nano text-ink-soft">Role</dt>
              <dd className="mt-1.5 text-micro text-ink">{project.role}</dd>
            </div>

            {project.facts?.map((fact) => (
              <div key={fact.label} className="border-t border-line py-5">
                <dt className="text-nano text-ink-soft">{fact.label}</dt>
                <dd className="mt-1.5 text-micro text-ink">{fact.value}</dd>
              </div>
            ))}

            {project.links?.length ? (
              <div className="border-t border-line py-5">
                <dt className="text-nano text-ink-soft">Links</dt>
                <dd className="mt-2 flex flex-wrap gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-micro text-ink transition-colors hover:text-accent"
                    >
                      <span className="ulink">{link.label}</span>
                      <IconArrow width={12} height={12} />
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="mt-20 space-y-16 sm:mt-24 sm:space-y-20">
          {project.sections.map((section, i) => (
            <CaseSection key={section.title} section={section} index={i + 1} />
          ))}
        </div>

        <div className="mt-20 border-t border-line pt-10 sm:mt-24">
          <p className="text-nano text-ink-soft">Built with</p>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
            {project.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </ul>
        </div>

        <Link
          href={`/work/${next.slug}`}
          className="group mt-20 flex items-end justify-between gap-8 border-t border-line pt-10 sm:mt-24"
        >
          <div>
            <p className="text-nano text-ink-soft">Next project</p>
            <p className="mt-3 text-title text-ink">
              <span className="ulink">{next.name}</span>
            </p>
          </div>
          <IconArrow
            width={22}
            height={22}
            className="mb-3 shrink-0 text-ink-faint transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </Container>

      <div className="mt-28 sm:mt-36">
        <ContactBand />
      </div>
    </>
  );
}
