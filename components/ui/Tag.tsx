import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Quiet technology chip. Lighter than a Pill — these appear in groups. */
export function Tag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "rounded-full border border-line px-2.5 py-1 text-nano text-ink-soft",
        className,
      )}
    >
      {children}
    </li>
  );
}
