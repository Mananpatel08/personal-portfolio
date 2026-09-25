import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow } from "./icons";
import { cn } from "@/lib/utils";

/** Quiet text link with an underline that grows and an arrow that nudges. */
export function ArrowLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span className="ulink">{children}</span>
      <IconArrow className="translate-y-px transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/al:translate-x-0.5 group-hover/al:-translate-y-0.5" />
    </>
  );

  const classes = cn(
    "group/al inline-flex items-center gap-1.5 text-micro font-medium text-ink transition-colors hover:text-accent",
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
