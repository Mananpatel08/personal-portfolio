import type { ReactNode } from "react";
import { IconArrow } from "./icons";
import { cn } from "@/lib/utils";

/**
 * Looks like an ArrowLink but renders spans — for use inside a parent that is
 * already a link. Nested anchors are invalid HTML and break hydration.
 */
export function ArrowCue({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-micro font-medium text-ink transition-colors duration-300 group-hover:text-accent",
        className,
      )}
    >
      <span className="ulink">{children}</span>
      <IconArrow className="translate-y-px transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  );
}
