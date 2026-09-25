import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { Tag } from "@/components/ui/Tag";
import { IconArrow } from "@/components/ui/icons";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { formatRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Python Developer at Wedowebapps since December 2024, building production REST APIs across four platforms. B.Tech in Information Technology, Parul University.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        index="01"
        label="Experience"
        title="Where I’ve worked, and what I actually did there."
        lead="One role so far, and four platforms inside it. The useful detail is in what each project demanded rather than in the job title."
      />

      <Container>
        <ol className="space-y-16 sm:space-y-20">
          {experience.map((entry) => {
            const built = (entry.projects ?? [])
              .map((slug) => projects.find((p) => p.slug === slug))
              .filter((p): p is NonNullable<typeof p> => Boolean(p));

            return (
              <li
                key={entry.id}
                className="grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-12"
              >
                <div className="lg:col-span-3">
                  <p className="font-mono text-nano tabular-nums text-ink-soft">
                    {formatRange(entry.start, entry.end)}
                  </p>
                  <p className="mt-3 text-nano text-ink-faint">
                    {entry.location}
                  </p>
                </div>

                <div className="lg:col-span-8 lg:col-start-5">
                  <h2 className="text-title text-ink">{entry.org}</h2>
                  <p className="mt-2 text-head text-ink-soft">{entry.role}</p>
                  <p className="mt-5 max-w-[60ch] text-lead text-ink-soft">
                    {entry.summary}
                  </p>

                  {entry.highlights.length > 0 && (
                    <ul className="mt-8 space-y-3 border-t border-line pt-6">
                      {entry.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex max-w-[62ch] gap-3 text-body text-ink-soft"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] size-1 shrink-0 rounded-full bg-ink-faint"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {built.length > 0 && (
                    <div className="mt-9">
                      <p className="text-nano text-ink-soft">Projects</p>
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {built.map((project) => (
                          <Link
                            key={project.slug}
                            href={`/work/${project.slug}`}
                            className="card card-hover group flex items-start justify-between gap-4 p-5"
                          >
                            <span>
                              <span className="block text-micro text-ink">
                                {project.name}
                              </span>
                              <span className="mt-1 block text-nano text-ink-soft">
                                {project.tagline}
                              </span>
                            </span>
                            <IconArrow
                              width={13}
                              height={13}
                              className="mt-0.5 shrink-0 text-ink-faint transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.stack.length > 0 && (
                    <ul className="mt-9 flex flex-wrap gap-x-2 gap-y-1.5">
                      {entry.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>

      <div className="mt-28 sm:mt-36">
        <ContactBand />
      </div>
    </>
  );
}
