import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactBand } from "@/components/home/ContactBand";
import { fragments } from "@/lib/data/playground";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Small technical ideas pulled out of real projects — token-bound webhooks, per-step form persistence, overlapping transcript chunks, and a few others.",
};

export default function PlaygroundPage() {
  return (
    <>
      <PageHeader
        index="01"
        label="Playground"
        title="Small ideas that turned out to be the interesting part."
        lead="Not side projects — smaller than that. Each of these came out of something I was building for another reason, and ended up being the bit I’d actually want to talk about."
      />

      <Container>
        <ul className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
          {fragments.map((fragment, i) => (
            <li key={fragment.id}>
              <article className="card card-hover p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-nano tabular-nums text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {fragment.fromSlug ? (
                    <Link
                      href={`/work/${fragment.fromSlug}`}
                      className="pill transition-colors duration-300 hover:bg-ink/12 hover:text-ink"
                    >
                      {fragment.from}
                    </Link>
                  ) : (
                    <span className="pill">{fragment.from}</span>
                  )}
                </div>

                <h2 className="mt-5 max-w-[26ch] text-[1.3rem] leading-[1.2] font-medium tracking-[-0.028em] text-ink">
                  {fragment.title}
                </h2>

                <p className="mt-4 max-w-[50ch] text-body text-ink-soft">
                  {fragment.note}
                </p>

                {fragment.snippet ? (
                  <div className="well mt-6 overflow-x-auto p-3.5 hide-scrollbar">
                    <code className="font-mono text-nano whitespace-pre text-ink-soft">
                      {fragment.snippet}
                    </code>
                  </div>
                ) : null}

                <ul className="mt-6 flex flex-wrap gap-x-2 gap-y-1.5">
                  {fragment.tags.map((tag, t) => (
                    <li key={tag} className="text-nano text-ink-soft">
                      {tag}
                      {t < fragment.tags.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="px-1.5 text-accent/40"
                        >
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <div className="mt-28 sm:mt-36">
        <ContactBand />
      </div>
    </>
  );
}
