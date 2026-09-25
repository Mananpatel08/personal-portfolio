import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ContactBand } from "@/components/home/ContactBand";
import { Avatar } from "@/components/home/Avatar";
import { LocalTime } from "@/components/ui/LocalTime";
import { approach } from "@/lib/data/approach";
import { experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";
import { stack } from "@/lib/data/stack";
import { formatRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Manan Patel — Python developer in Ahmedabad. Django REST Framework, FastAPI and PostgreSQL, mostly as the only backend person on the project.",
};

export default function AboutPage() {
  const current = experience[0];

  return (
    <>
      <Container>
        <header className="pt-10 pb-14 sm:pt-16 sm:pb-16">
          <p className="eyebrow">
            <span className="tabular-nums">01</span>
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
            About
          </p>

          <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-9">
            <Avatar />
            <h1 className="max-w-[20ch] text-pretty text-display text-ink">
              I learned most of this by being the only backend person on the
              project.
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-6 lg:col-span-7">
            {profile.about.map((paragraph, i) => (
              <p key={i} className="max-w-[62ch] text-lead text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="card p-6 sm:p-7">
              <dl className="space-y-5">
                <div>
                  <dt className="text-nano text-ink-soft">Currently</dt>
                  <dd className="mt-1.5 text-micro text-ink">
                    {current.role}, {current.org}
                  </dd>
                  <dd className="mt-0.5 font-mono text-nano text-ink-soft">
                    {formatRange(current.start, current.end)}
                  </dd>
                </div>
                <div className="border-t border-line pt-5">
                  <dt className="text-nano text-ink-soft">Based in</dt>
                  <dd className="mt-1.5 text-micro text-ink">
                    {profile.location.city}, {profile.location.country}
                  </dd>
                  <dd className="mt-0.5 font-mono text-nano tabular-nums text-ink-soft">
                    <LocalTime /> {profile.location.offset}
                  </dd>
                </div>
                <div className="border-t border-line pt-5">
                  <dt className="text-nano text-ink-soft">Studied</dt>
                  <dd className="mt-1.5 text-micro text-ink">
                    {experience[1].role}
                  </dd>
                  <dd className="mt-0.5 font-mono text-nano text-ink-soft">
                    {experience[1].org}
                  </dd>
                </div>
                <div className="border-t border-line pt-5">
                  <dt className="text-nano text-ink-soft">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-micro text-ink transition-colors hover:text-accent"
                    >
                      <span className="ulink">{profile.email}</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <section className="mt-24 border-t border-line pt-12 sm:mt-32 sm:pt-16">
          <p className="eyebrow">
            <span className="tabular-nums">02</span>
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
            What I use
          </p>
          <h2 className="mt-5 max-w-[22ch] text-title text-ink">
            The tools I reach for, and roughly in what order.
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {stack.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-nano tracking-[0.08em] uppercase text-ink-faint">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-2 border-t border-line pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={
                        group.primary?.includes(item)
                          ? "text-micro text-ink"
                          : "text-micro text-ink-soft"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-line pt-12 sm:mt-32 sm:pt-16">
          <p className="eyebrow">
            <span className="tabular-nums">03</span>
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
            How I work
          </p>
          <h2 className="mt-5 max-w-[22ch] text-title text-ink">
            Four steps, in the order I actually work in.
          </h2>

          <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
            {approach.map((step) => (
              <li key={step.id} className="border-t border-line pt-6">
                <p className="font-mono text-nano tabular-nums text-ink-faint">
                  {step.id}
                </p>
                <h3 className="mt-2 text-head text-ink">{step.title}</h3>
                <p className="mt-3 max-w-[48ch] text-body text-ink-soft">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <div className="mt-28 sm:mt-36">
        <ContactBand />
      </div>
    </>
  );
}
