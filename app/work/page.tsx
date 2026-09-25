import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { ProjectFeature } from "@/components/work/ProjectFeature";
import { ProjectCard } from "@/components/work/ProjectCard";
import { ProjectCompact } from "@/components/work/ProjectCompact";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Production platforms and personal projects — CRM and project management, multi-tenant loan software, a database migration CLI on PyPI, and a few things built out of curiosity.",
};

export default function WorkPage() {
  const features = projects.filter((p) => p.scale === "feature");
  const cards = projects.filter((p) => p.scale === "wide");
  const compact = projects.filter((p) => p.scale === "standard");

  return (
    <>
      <PageHeader
        index="01"
        label="Work"
        title={
          <>
            Four production platforms, and three things I built because I wanted
            them to exist.
          </>
        }
        lead="Mostly backends — the data model, the API, and the business of getting it onto a server. On several of them I was the only person doing that."
      />

      <Container>
        <div className="space-y-20 sm:space-y-28">
          {features.map((project, i) => (
            <ProjectFeature
              key={project.slug}
              project={project}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-24 border-t border-line pt-12 sm:mt-32 sm:pt-16">
          <p className="eyebrow">
            <span className="tabular-nums">02</span>
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
            Also
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 sm:mt-12">
            {cards.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {compact.map((project) => (
              <ProjectCompact key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </Container>

      <div className="mt-28 sm:mt-36">
        <ContactBand />
      </div>
    </>
  );
}
