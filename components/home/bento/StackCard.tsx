import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { IconLayers } from "@/components/ui/icons";
import { stack, stackHighlights } from "@/lib/data/stack";
import { cn } from "@/lib/utils";

const primary = new Set(stack.flatMap((g) => g.primary ?? []));

/**
 * Full-width typographic band. Reads as a sentence rather than a logo wall —
 * the things I’d claim depth in sit in full ink, everything else steps back.
 */
export function StackCard({ className }: { className?: string }) {
  return (
    <Card className={cn("p-4", className)}>
      <div className="flex items-start justify-between gap-6">
        <Pill icon={<IconLayers />}>Stack</Pill>
        <p className="hidden pt-1 text-caption-sm-regular text-ink-soft sm:block">
          and the Ubuntu boxes it all runs on
        </p>
      </div>

      <ul className="mt-6 flex flex-wrap items-baseline text-h5-medium sm:text-h4-medium sm:mt-7">
        {stackHighlights.map((item, i) => (
          <li key={item} className="whitespace-nowrap">
            <span className={primary.has(item) ? "text-ink" : "text-ink-soft"}>
              {item}
            </span>
            {i < stackHighlights.length - 1 && (
              <span aria-hidden="true" className="px-2.5 text-accent/40">
                /
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}
