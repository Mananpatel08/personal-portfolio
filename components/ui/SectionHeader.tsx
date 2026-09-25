import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  index,
  label,
  title,
  action,
  className,
}: {
  index: string;
  label: string;
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
        <p className="eyebrow">
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-50" />
          {label}
        </p>
        <h2 className="mt-5 max-w-[22ch] text-title text-ink">{title}</h2>
      </div>
      {action ? <div className="shrink-0 sm:pb-2">{action}</div> : null}
    </div>
  );
}
