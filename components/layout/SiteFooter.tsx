import Link from "next/link";
import { nav } from "@/lib/data/nav";
import { profile } from "@/lib/data/profile";
import { Container } from "./Container";
import { LocalTime } from "@/components/ui/LocalTime";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-line sm:mt-40">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <p className="text-head text-ink">{profile.name}</p>
            <p className="mt-1.5 text-micro text-ink-soft">
              {profile.role} · {profile.location.short}
            </p>
            <p className="mt-4 font-mono text-nano text-ink-soft">
              <LocalTime /> {profile.location.offset}
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <nav aria-label="Footer" className="flex flex-col gap-2.5">
              {nav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group text-micro text-ink-soft transition-colors hover:text-ink"
                >
                  <span className="ulink">{item.label}</span>
                </Link>
              ))}
            </nav>

            <ul className="flex flex-col gap-2.5">
              {profile.links.map((link) => (
                <li key={link.label} className="text-micro leading-[1.45]">
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="group text-micro text-ink-soft transition-colors hover:text-ink"
                  >
                    <span className="ulink">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-nano text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono">Next.js · TypeScript · Tailwind</p>
        </div>
      </Container>
    </footer>
  );
}
