import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { StatusPill } from "@/components/ui/StatusPill";
import { LocalTime } from "@/components/ui/LocalTime";
import {
  IconGithub,
  IconLinkedin,
  IconMail,
  IconPackage,
} from "@/components/ui/icons";
import { profile } from "@/lib/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Manan Patel — Python developer in Ahmedabad. Email, GitHub, LinkedIn and PyPI.",
};

const channels = [
  { label: "GitHub", value: "mananpatel08", href: profile.links[0].href, Icon: IconGithub },
  { label: "LinkedIn", value: "manan-patel", href: profile.links[1].href, Icon: IconLinkedin },
  { label: "PyPI", value: "mssql2mysql", href: profile.links[2].href, Icon: IconPackage },
];

export default function ContactPage() {
  return (
    <Container>
      <div className="flex min-h-[calc(100dvh-14rem)] flex-col justify-center py-16 sm:py-24">
        <p className="eyebrow">
          <span className="tabular-nums">01</span>
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
          Contact
        </p>

        <h1 className="mt-6 max-w-[18ch] text-pretty text-display text-ink">
          The fastest way to reach me is email.
        </h1>

        <a
          href={`mailto:${profile.email}`}
          className="group mt-9 inline-flex w-fit items-center gap-4 text-title font-medium text-ink transition-colors duration-300 hover:text-accent sm:mt-12"
        >
          <IconMail
            width={22}
            height={22}
            className="hidden shrink-0 text-ink-faint transition-colors group-hover:text-accent sm:block"
          />
          <span className="ulink break-all">{profile.email}</span>
        </a>

        <p className="mt-9 max-w-[54ch] text-lead text-ink-soft sm:mt-11">
          {profile.availability.note} If it involves an API, a database that
          needs rethinking, or a Django project that has outgrown its first
          shape, that&rsquo;s the sort of thing I enjoy.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <StatusPill />
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-2 text-micro text-ink-soft shadow-pill">
            {profile.location.short}
            <span className="font-mono tabular-nums text-ink">
              <LocalTime />
            </span>
          </span>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-3 border-t border-line pt-10 sm:grid-cols-3">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="card card-hover group flex items-center gap-4 p-5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 group-hover:text-accent">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-nano text-ink-soft">{label}</span>
                  <span className="mt-0.5 block truncate text-micro text-ink">
                    {value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
