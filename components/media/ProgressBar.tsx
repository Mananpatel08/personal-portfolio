"use client";

import { cn } from "@/lib/utils";

/**
 * Plain seekable progress bar. Same accessibility approach as `Waveform` — a
 * transparent range input laid over the track, so dragging and arrow keys both
 * work and screen readers get a control they already understand. The outer box
 * is taller than the bar to give the pointer something to hit.
 */
export function ProgressBar({
  progress,
  onSeek,
  label,
  disabled = false,
  className,
}: {
  progress: number;
  onSeek: (fraction: number) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-4 items-center rounded-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="h-[5px] w-full overflow-hidden rounded-full bg-ink/12"
      >
        <div
          className="h-full rounded-full bg-ink"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <input
        type="range"
        min={0}
        max={1000}
        step={1}
        value={Math.round(progress * 1000)}
        onChange={(e) => onSeek(Number(e.target.value) / 1000)}
        disabled={disabled}
        aria-label={label}
        className="absolute inset-0 size-full cursor-pointer appearance-none bg-transparent opacity-0 disabled:cursor-default"
      />
    </div>
  );
}
