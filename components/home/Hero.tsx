import { Container } from "@/components/layout/Container";
import { profile } from "@/lib/data/profile";
import { Avatar } from "./Avatar";
import { HeroStrip } from "./HeroStrip";

export function Hero() {
  return (
    <Container>
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <Avatar />

        {/* One sentence, two levels: the muted clause carries the facts. */}
        <h1 className="mt-7 max-w-[17ch] text-pretty text-display text-ink sm:mt-9 sm:max-w-[30ch]">
          {profile.headline.lead}{" "}
          <span className="text-ink-faint">{profile.headline.muted}</span>
        </h1>

        <p className="mt-6 max-w-[58ch] text-lead text-ink-soft sm:mt-7">
          {profile.intro}
        </p>

        <div className="mt-9 max-w-3xl sm:mt-11">
          <HeroStrip />
        </div>
      </section>
    </Container>
  );
}
