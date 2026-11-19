import type { ReactNode } from "react";
import { Container } from "./Container";

/** Consistent opening for every page but the homepage. */
export function PageHeader({
  title,
  lead,
  aside,
}: {
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <Container>
      <header className="pt-10 pb-12 sm:pt-16 sm:pb-16">
        <h1 className="max-w-[24ch] text-pretty text-display text-ink">
          {title}
        </h1>

        {lead ? (
          <p className="max-w-[58ch] text-body-md-regular text-ink-soft">{lead}</p>
        ) : null}

        {aside ? <div className="mt-8">{aside}</div> : null}
      </header>
    </Container>
  );
}
