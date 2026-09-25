import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { IconPin } from "@/components/ui/icons";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

/**
 * An abstract of Ahmedabad rather than a map tile: ring roads, radials, and
 * the Sabarmati running north to south. Drawn, so it costs nothing to load and
 * sits inside the palette instead of fighting it.
 */
function CityMap() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 size-full text-ink"
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {/* River */}
        <path
          d="M150 -20C142 30 168 62 152 100c-14 34 18 68 4 162"
          strokeWidth="7"
          opacity="0.06"
        />
        <g strokeWidth="1" opacity="0.1">
          {/* Ring road */}
          <path d="M160 26c72 0 126 36 126 90 0 58-58 90-126 90S34 174 34 116c0-54 56-90 126-90Z" />
          {/* Arterials — only four, so it reads as a city rather than a target */}
          <path d="M160 116V-10M160 116l170-56M160 116l28 146M160 116L14 194" />
        </g>
        <g strokeWidth="0.9" opacity="0.09">
          {/* Blocks */}
          <path d="M198 44l64 58M220 34l64 58M56 148l62 52M36 128l62 52M208 146h62M208 168h50M208 190h38M92 58h46M100 42h38M74 76h44" />
          <path d="M196 62v70M218 74v54M74 60v52M96 40v54" />
        </g>
      </g>
      {/* Here */}
      <circle cx="160" cy="116" r="9" className="fill-accent/12" />
      <circle cx="160" cy="116" r="3" className="fill-accent" />
    </svg>
  );
}

export function LocationCard({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "relative flex min-h-[15rem] flex-col justify-end p-4",
        className,
      )}
    >
      <CityMap />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-surface via-surface/90 to-transparent"
      />

      <div className="absolute top-4 left-4">
        <Pill icon={<IconPin />} tone="light">Based in</Pill>
      </div>

      <div className="relative">
        <h2 className="text-[1.65rem] leading-[1.1] font-medium tracking-[-0.032em] text-ink">
          {profile.location.city}
        </h2>
        <p className="mt-1.5 text-micro text-ink-soft">
          {profile.location.region}, {profile.location.country}
        </p>
        <p className="mt-0.5 font-mono text-nano tabular-nums text-ink-soft">
          <LocalTime /> {profile.location.offset}
        </p>
      </div>
    </Card>
  );
}
