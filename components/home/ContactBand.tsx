import { Container } from "@/components/layout/Container";
import { StatusPill } from "@/components/ui/StatusPill";
import { IconGithub, IconLinkedin, IconMail } from "@/components/ui/icons";
import { profile } from "@/lib/data/profile";

const socials = [
  { label: "GitHub", href: profile.links[0].href, Icon: IconGithub },
  { label: "LinkedIn", href: profile.links[1].href, Icon: IconLinkedin },
  { label: "Email", href: profile.links[3].href, Icon: IconMail },
];

export function ContactBand() {
  return (
    <Container>
      <section className="border-t border-line pt-14 sm:pt-20">
        <p className="eyebrow">
          <span className="tabular-nums">03</span>
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
          Contact
        </p>

        <h2 className="mt-6 max-w-[17ch] text-display text-ink">
          Building something that needs a backend?
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-8 inline-block text-title font-medium text-ink transition-colors duration-300 hover:text-accent sm:mt-10"
        >
          <span className="ulink">{profile.email}</span>
        </a>

        <div className="mt-9 flex flex-wrap items-center gap-3 sm:mt-11">
          <StatusPill />
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-full border border-line bg-surface text-ink-soft shadow-pill transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:text-accent hover:shadow-card"
            >
              <Icon />
            </a>
          ))}
        </div>
      </section>
    </Container>
  );
}
