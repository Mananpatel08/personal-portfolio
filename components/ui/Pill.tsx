import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The small category tag that opens every bento card.
 * `tone="light"` is for pills sitting over imagery, where the default tint
 * would disappear into the picture.
 */
export function Pill({
  icon,
  children,
  tone = "tint",
  className,
}: {
  icon?: ReactNode;
  children: ReactNode;
  tone?: "tint" | "light";
  className?: string;
}) {
  return (
    <span className={cn("pill", tone === "light" && "pill-light", className)}>
      {icon ? <span className="text-ink-soft">{icon}</span> : null}
      {children}
    </span>
  );
}
