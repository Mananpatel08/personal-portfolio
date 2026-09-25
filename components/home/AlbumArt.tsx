import Image from "next/image";
import type { Track } from "@/lib/data/music";
import { cn } from "@/lib/utils";

/**
 * Real cover art when a track has one, otherwise a drawn record — on-palette,
 * obviously a placeholder, and varied per track so four of them in a row don't
 * look like the same image repeated. Ring count and the accent ring are
 * derived from the track's seed, so a given song always draws the same.
 */
export function AlbumArt({
  track,
  className,
}: {
  track: Track;
  className?: string;
}) {
  const rings = 4 + (track.seed % 3); // 4–6
  const accentRing = track.seed % rings;
  const spacing = 30 / rings;

  return (
    <div
      className={cn(
        "well relative aspect-square overflow-hidden rounded-[10px]",
        className,
      )}
    >
      {track.cover ? (
        <Image
          src={track.cover}
          alt={`${track.album} by ${track.artist}`}
          fill
          sizes="(min-width: 1280px) 220px, (min-width: 768px) 208px, 140px"
          className="object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="cover-art absolute inset-0 size-full text-ink"
        >
          {Array.from({ length: rings }, (_, i) => {
            const r = 14 + (i + 1) * spacing;
            const isAccent = i === accentRing;
            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                opacity={isAccent ? 0.3 : 0.16}
                className={isAccent ? "text-accent" : undefined}
              />
            );
          })}
          <circle cx="50" cy="50" r="7" className="fill-accent" opacity="0.14" />
          <circle cx="50" cy="50" r="2.2" className="fill-accent" />
        </svg>
      )}
    </div>
  );
}
