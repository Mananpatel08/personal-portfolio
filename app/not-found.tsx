import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <Container>
      <div className="flex min-h-[calc(100dvh-14rem)] flex-col justify-center py-20">
        <p className="eyebrow">
          <span className="tabular-nums">404</span>
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
          Not found
        </p>
        <h1 className="mt-6 max-w-[16ch] text-display text-ink">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-6 max-w-[46ch] text-lead text-ink-soft">
          Which is the one kind of 404 that is genuinely my fault. Try the work
          archive instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-5 py-2.5 text-micro font-medium text-paper transition-opacity duration-300 hover:opacity-85"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-line bg-surface px-5 py-2.5 text-micro font-medium text-ink shadow-pill transition-colors duration-300 hover:border-line-strong"
          >
            Work
          </Link>
        </div>
      </div>
    </Container>
  );
}
