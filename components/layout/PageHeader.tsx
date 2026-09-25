import type { ReactNode } from "react";
import { Container } from "./Container";

/** Consistent opening for every page but the homepage. */
export function PageHeader({
  index,
  label,
  title,
  lead,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Container>
      <header className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <p className="eyebrow">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
          {label}
        </p>

        <h1 className="mt-6 max-w-[24ch] text-pretty text-display text-ink">
          {title}
        </h1>

        {lead ? (
          <p className="mt-6 max-w-[58ch] text-lead text-ink-soft">{lead}</p>
        ) : null}

        {aside ? <div className="mt-8">{aside}</div> : null}
      </header>
    </Container>
  );
}
