import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

/** Availability indicator. The dot is one of only two places colour appears. */
export function StatusPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-2 text-micro font-medium text-ink-soft shadow-pill",
        className,
      )}
    >
      <span className="relative flex size-1.5 items-center justify-center">
        <span className="live-dot absolute size-2.5 rounded-full bg-live/25" />
        <span className="size-1.5 rounded-full bg-live" />
      </span>
      {profile.availability.label}
    </span>
  );
}
