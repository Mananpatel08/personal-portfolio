"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { IconRoute } from "@/components/ui/icons";
import { approach } from "@/lib/data/approach";
import { cn } from "@/lib/utils";

/**
 * The one genuinely interactive card. The active segment grows to reveal its
 * title, so the control explains itself without needing four labels at once.
 */
export function ApproachCard({ className }: { className?: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = approach[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -active : e.key === "End" ? approach.length - 1 - active : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + approach.length) % approach.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Card className={cn("flex flex-col p-4", className)}>
      <div>
        <Pill icon={<IconRoute />}>How I work</Pill>
      </div>

      <div
        key={step.id}
        id={`approach-panel-${step.id}`}
        role="tabpanel"
        aria-labelledby={`approach-tab-${step.id}`}
        tabIndex={0}
        className="step-in mt-6 flex-1 focus-visible:outline-none"
      >
        <h2 className="text-[1.6rem] leading-[1.15] font-medium tracking-[-0.032em] text-ink">
          <span className="tabular-nums">{step.id}</span> {step.title}
        </h2>
        <p className="mt-3 max-w-[54ch] text-body text-ink-soft">{step.body}</p>
      </div>

      <div
        role="tablist"
        aria-label="How I work"
        onKeyDown={onKeyDown}
        className="mt-7 flex rounded-full bg-chip p-[3px]"
      >
        {approach.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`approach-tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`approach-panel-${s.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "flex h-10 flex-1 items-center justify-center rounded-full text-micro font-medium whitespace-nowrap transition-colors duration-300",
                selected
                  ? "bg-ink text-paper"
                  : "text-ink-soft hover:text-ink",
              )}
            >
              Step <span className="ml-1 tabular-nums">{s.id}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
