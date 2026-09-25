import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/home/Hero";
import { Bento } from "@/components/home/Bento";
import { ContactBand } from "@/components/home/ContactBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectRow } from "@/components/work/ProjectRow";
import { featuredProjects } from "@/lib/data/projects";

export default function HomePage() {
  const selected = featuredProjects.slice(0, 3);

  return (
    <>
      <Hero />
      <Bento />

      <Container className="mt-28 sm:mt-36">
        <section aria-labelledby="selected-work">
          <SectionHeader
            index="02"
            label="Selected work"
            title={
              <span id="selected-work">
                Things I&rsquo;ve built, and what made them interesting.
              </span>
            }
            action={<ArrowLink href="/work">All work</ArrowLink>}
          />

          <ul className="mt-12 border-b border-line sm:mt-14">
            {selected.map((project) => (
              <ProjectRow key={project.slug} project={project} />
            ))}
          </ul>
        </section>
      </Container>

      <div className="mt-28 sm:mt-36">
        <ContactBand />
      </div>
    </>
  );
}
