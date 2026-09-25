import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Base surface. `interactive` adds the hover lift — only used where the whole
 * card is a link, so movement always means something is clickable.
 */
export function Card({
  children,
  className,
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "section" | "li";
}) {
  return (
    <Tag
      className={cn(
        "card overflow-hidden",
        interactive && "card-hover",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
