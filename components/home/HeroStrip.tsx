import { StatusPill } from "@/components/ui/StatusPill";
import { AudioIntro } from "./AudioIntro";

/**
 * Anchors the bottom of the hero: the spoken intro on the left, availability
 * beside it. Location and local time live on the bento's map card instead, so
 * nothing is lost by giving this row to the player.
 */
export function HeroStrip() {
  return (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      <AudioIntro className="w-full sm:flex-1" />
      <StatusPill className="h-12 shrink-0 px-5 sm:h-14 bg-transparent" />
    </div>
  );
}
