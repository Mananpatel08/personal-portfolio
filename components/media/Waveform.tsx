"use client";

import type { RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * The drawn waveform, doubling as the scrubber. Shared by the hero intro and
 * the listening card so both behave identically.
 *
 * Bars are full height and scaled with `transform`, never resized with
 * `height` — transforms are composited, which is what lets the beat animation
 * mutate every bar each frame without touching layout. The scrubber is a
 * transparent range input laid over the top, so seeking works with a pointer
 * and with arrow keys, and screen readers get a control they understand.
 *
 * Every other bar is hidden below `sm`, halving the density without changing
 * the silhouette.
 */
export function Waveform({
  peaks,
  progress,
  barsRef,
  onSeek,
  label,
  disabled = false,
  className,
}: {
  peaks: readonly number[];
  progress: number;
  barsRef: RefObject<(HTMLSpanElement | null)[]>;
  onSeek: (fraction: number) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-sm has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-accent",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-between gap-px [&>span:nth-child(even)]:hidden sm:[&>span:nth-child(even)]:block"
      >
        {peaks.map((peak, i) => (
          <span
            key={i}
            ref={(node) => {
              barsRef.current[i] = node;
            }}
            style={{ transform: `scaleY(${peak})` }}
            className={cn(
              "h-full w-[2px] shrink-0 origin-center rounded-full transition-colors duration-200",
              /* Dark at rest; played bars pick up the accent so progress
                 sweeps across in terracotta. */
              i / peaks.length <= progress ? "bg-accent" : "bg-ink/65",
            )}
          />
        ))}
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
