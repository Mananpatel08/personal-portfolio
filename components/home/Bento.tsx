import { Container } from "@/components/layout/Container";
import { ExperienceCard } from "./bento/ExperienceCard";
import { CurrentlyCard } from "./bento/CurrentlyCard";
import { PackageCard } from "./bento/PackageCard";
import { MusicCard } from "./bento/MusicCard";
import { ApproachCard } from "./bento/ApproachCard";
import { LocationCard } from "./bento/LocationCard";
import { StackCard } from "./bento/StackCard";

/**
 * A "who I am" grid, not a portfolio grid — projects get their own section
 * below. Seven cards, five different sizes; the variation comes from column
 * spans rather than from decorating each card differently.
 *
 * On wide screens:
 *   Experience │ Listening (2)  │ Package
 *   Currently (2)               │ How I work (2)
 *   Location   │ Stack (3)
 */
export function Bento() {
  return (
    <Container>
      <section aria-label="At a glance">
        <div className="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4">
          <ExperienceCard className="order-2 md:order-none" />
          <MusicCard className="order-3 md:order-none md:col-span-2 lg:col-span-2" />
          <PackageCard className="order-4 md:order-none" />
          <CurrentlyCard className="order-1 md:order-none md:col-span-2 lg:col-span-2" />
          <ApproachCard className="order-5 md:order-none md:col-span-2 lg:col-span-2" />
          <LocationCard className="order-6 md:order-none md:col-span-2 lg:col-span-1" />
          <StackCard className="order-7 md:order-none md:col-span-2 lg:col-span-3" />
        </div>
      </section>
    </Container>
  );
}
