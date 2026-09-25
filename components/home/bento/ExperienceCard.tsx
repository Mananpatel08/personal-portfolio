"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconBriefcase } from "@/components/ui/icons";
import { timeline } from "@/lib/data/experience";
import { cn } from "@/lib/utils";

const FADE = "2.25rem";

/**
 * A compact scrolling timeline. The fades are only drawn on the edge that
 * actually has something hidden behind it, so at the top of the list nothing
 * is obscured and the bottom fade is what tells you to keep scrolling.
 */
export function ExperienceCard({ className }: { className?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ top: false, bottom: true });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const top = el.scrollTop > 4;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 4;
    /* Returning the previous object when nothing changed keeps the ref
       callback from bouncing this into a render loop. */
    setEdges((prev) =>
      prev.top === top && prev.bottom === bottom ? prev : { top, bottom },
    );
  }, []);

  const attach = useCallback(
    (el: HTMLDivElement | null) => {
      scroller.current = el;
      if (el) measure();
    },
    [measure],
  );

  return (
    <Card className={cn("flex flex-col p-4", className)}>
      <div>
        <Pill icon={<IconBriefcase />}>Experience</Pill>
      </div>

      <div
        ref={attach}
        onScroll={measure}
        style={
          {
            "--edge-top": edges.top ? FADE : "0px",
            "--edge-bottom": edges.bottom ? FADE : "0px",
          } as React.CSSProperties
        }
        /* max-height, not height: with a short list the card hugs its
           content, and once there are more entries than fit it caps here and
           scrolls. A fixed height left a void whenever the list was short.
           (flex-1 would not work — in an auto-height flex column overflow-y
           never engages and the list just grows.) */
        className="edge-mask rail-scroll mt-5 max-h-[11.5rem] overflow-y-auto pr-3"
      >
        <ol className="relative py-1">
          <span
            aria-hidden="true"
            className="absolute top-2.5 bottom-2.5 left-[4px] w-[2px] rounded-full bg-ink/40"
          />
          {timeline.map((item) => (
            <li key={item.id} className="relative pb-7 pl-6 last:pb-0">
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-[5px] left-0 size-2.5 rounded-full",
                  item.current ? "bg-accent" : "bg-ink",
                )}
              />
              {item.href ? (
                <Link href={item.href} className="group block">
                  <span className="block text-[1.0625rem] leading-tight font-medium tracking-[-0.018em] text-ink">
                    <span className="ulink">{item.label}</span>
                  </span>
                  <span className="mt-1 block text-micro text-ink-soft">
                    {item.period}
                  </span>
                </Link>
              ) : (
                <>
                  <span className="block text-[1.0625rem] leading-tight font-medium tracking-[-0.018em] text-ink">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-micro text-ink-soft">
                    {item.period}
                  </span>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* mt-auto keeps the link on the card's bottom edge when a neighbour
          makes the row taller than this card's own content. */}
      <div className="mt-auto pt-6">
        <ArrowLink href="/experience">Full timeline</ArrowLink>
      </div>
    </Card>
  );
}
