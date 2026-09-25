import Image from "next/image";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

/**
 * Monogram mark. Drop a portrait at /public/portrait.jpg and pass `src` to
 * swap it for a photo — the tile geometry stays the same either way.
 * This is the only saturated element above the fold, by design.
 */
export function Avatar({
  src,
  className,
}: {
  src?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative size-[84px] shrink-0 overflow-hidden rounded-[20px] shadow-card sm:size-[104px] sm:rounded-[24px]",
        !src && "bg-accent",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`${profile.name}, ${profile.role}`}
          fill
          sizes="108px"
          priority
          className="object-cover"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center pb-[0.06em] text-[62px] font-medium leading-none tracking-[-0.06em] text-paper/95 select-none sm:text-[76px]"
          >
            M
          </span>
          <span className="sr-only">{profile.name}</span>
        </>
      )}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] ring-1 ring-black/8 ring-inset"
      />
    </div>
  );
}
