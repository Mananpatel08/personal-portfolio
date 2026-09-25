import type { CoverKind } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

/**
 * Each cover draws the idea the project turns on — a message crossing a socket,
 * a thirteen-step form with a resume point, a schema moving between engines.
 * Diagrams, not decoration: they mean something, and they cost no bytes.
 */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Realtime() {
  return (
    <>
      {/* One source, a socket, many clients — the shape of the chat module. */}
      <g {...stroke} strokeWidth="1.4" opacity="0.45">
        <rect x="26" y="61" width="30" height="28" rx="9" />
      </g>
      <g {...stroke} strokeWidth="1.25" opacity="0.3">
        <path d="M56 75h38" />
        <path d="M94 46v58" />
        <path d="M94 48h26M94 75h26M94 102h26" />
      </g>
      <g {...stroke} strokeWidth="1.25" opacity="0.32">
        <rect x="120" y="39" width="28" height="18" rx="6" />
        <rect x="120" y="66" width="28" height="18" rx="6" />
        <rect x="120" y="93" width="28" height="18" rx="6" />
      </g>
      {/* The message, mid-flight */}
      <circle cx="78" cy="75" r="4.5" className="fill-accent" />
      <circle cx="162" cy="48" r="2" className="fill-current" opacity="0.22" />
      <circle cx="162" cy="75" r="2" className="fill-current" opacity="0.22" />
      <circle cx="162" cy="102" r="2" className="fill-current" opacity="0.22" />
    </>
  );
}

function Steps() {
  const bars = Array.from({ length: 13 }, (_, i) => i);
  return (
    <>
      {bars.map((i) => {
        const x = 24 + i * 12.3;
        const done = i < 6;
        const here = i === 6;
        return (
          <rect
            key={i}
            x={x}
            y={here ? 44 : done ? 52 : 58}
            width="5"
            height={here ? 62 : done ? 54 : 48}
            rx="2.5"
            className={
              here
                ? "fill-accent"
                : done
                  ? "fill-current opacity-40"
                  : "fill-current opacity-12"
            }
          />
        );
      })}
      <g {...stroke} strokeWidth="1.25" opacity="0.22">
        <path d="M24 122h152" />
      </g>
    </>
  );
}

function Migrate() {
  const rows = [0, 1, 2, 3];
  return (
    <>
      {rows.map((i) => (
        <g key={i}>
          <rect
            x="26"
            y={46 + i * 17}
            width="48"
            height="10"
            rx="3"
            className="fill-current"
            opacity={0.22}
          />
          <rect
            x="126"
            y={46 + i * 17}
            width="48"
            height="10"
            rx="3"
            className="fill-current"
            opacity={i === 1 ? 0 : 0.12}
          />
          {i === 1 && (
            <rect
              x="126"
              y={46 + i * 17}
              width="48"
              height="10"
              rx="3"
              className="fill-accent"
              opacity={0.85}
            />
          )}
          <g {...stroke} strokeWidth="1.25" opacity={i === 1 ? 0.55 : 0.2}>
            <path d={`M82 ${51 + i * 17}h36`} />
            <path d={`M114 ${47 + i * 17}l4 4-4 4`} />
          </g>
        </g>
      ))}
    </>
  );
}

function Transcribe() {
  const amps = [10, 20, 34, 16, 28, 40, 22, 12, 30, 18];
  return (
    <>
      <g {...stroke} strokeWidth="3" opacity="0.3">
        {amps.map((a, i) => (
          <path key={i} d={`M${28 + i * 7} ${75 - a / 2}v${a}`} />
        ))}
      </g>
      <g {...stroke} strokeWidth="1.25" opacity="0.4">
        <path d="M104 75h14" />
        <path d="M114 71l4 4-4 4" />
      </g>
      <rect
        x="128"
        y="48"
        width="46"
        height="6"
        rx="3"
        className="fill-accent"
        opacity="0.85"
      />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="128"
          y={62 + i * 11}
          width={i === 3 ? 30 : 46}
          height="5"
          rx="2.5"
          className="fill-current"
          opacity="0.2"
        />
      ))}
    </>
  );
}

function Agent() {
  return (
    <>
      <g {...stroke} strokeWidth="1.25" opacity="0.25">
        <path d="M100 62V48M100 88v8M100 96h-38M100 96h38M62 96v8M138 96v8" />
      </g>
      <g {...stroke} strokeWidth="1.4" opacity="0.45">
        <rect x="80" y="62" width="40" height="26" rx="8" />
        <rect x="46" y="104" width="32" height="17" rx="6" />
      </g>
      <rect
        x="122"
        y="104"
        width="32"
        height="17"
        rx="6"
        className="fill-accent"
        opacity="0.85"
      />
      <circle cx="100" cy="42" r="4" className="fill-current" opacity="0.3" />
    </>
  );
}

function Inventory() {
  const cells = Array.from({ length: 24 }, (_, i) => i);
  const filled = new Set([0, 1, 2, 6, 7, 8, 9, 12, 13, 18, 19, 20]);
  return (
    <>
      {cells.map((i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        return (
          <rect
            key={i}
            x={34 + col * 23}
            y={44 + row * 19}
            width="17"
            height="13"
            rx="3.5"
            className={i === 9 ? "fill-accent" : "fill-current"}
            opacity={i === 9 ? 0.9 : filled.has(i) ? 0.26 : 0.1}
          />
        );
      })}
    </>
  );
}

function Render() {
  return (
    <>
      <g {...stroke} strokeWidth="1.25" opacity="0.25">
        <rect x="26" y="34" width="140" height="82" rx="4" />
        <path d="M26 120h140M26 116v8M166 116v8" />
        <path d="M174 34v82M170 34h8M170 116h8" />
      </g>
      <rect
        x="70"
        y="54"
        width="52"
        height="42"
        rx="3"
        className="fill-accent"
        opacity="0.16"
      />
      <g {...stroke} strokeWidth="1.5" className="text-accent" opacity="0.9">
        <rect x="70" y="54" width="52" height="42" rx="3" />
      </g>
    </>
  );
}

const covers: Record<CoverKind, () => React.JSX.Element> = {
  realtime: Realtime,
  steps: Steps,
  migrate: Migrate,
  transcribe: Transcribe,
  agent: Agent,
  inventory: Inventory,
  render: Render,
};

export function ProjectCover({
  kind,
  className,
}: {
  kind: CoverKind;
  className?: string;
}) {
  const Shape = covers[kind];
  return (
    <div
      className={cn(
        "well relative aspect-160/98 w-full overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox="20 26 160 98"
        aria-hidden="true"
        className="cover-art absolute inset-0 size-full text-ink transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.035]"
      >
        <Shape />
      </svg>
    </div>
  );
}
