import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  title,
  action,
  className,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div>
        <h2 className="max-w-[22ch] text-h2-medium text-ink">{title}</h2>
      </div>
      {action ? <div className="shrink-0 sm:pb-2">{action}</div> : null}
    </div>
  );
}
