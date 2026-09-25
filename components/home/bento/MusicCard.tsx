"use client";

import { useState } from "react";
import { ProgressBar } from "@/components/media/ProgressBar";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import {
  IconArrow,
  IconHeadphones,
  IconNext,
  IconPause,
  IconPlay,
  IconPrev,
} from "@/components/ui/icons";
import { listening } from "@/lib/data/music";
import { useAudioPlayer } from "@/lib/use-audio-player";
import { cn, formatTime } from "@/lib/utils";
import { AlbumArt } from "../AlbumArt";

const control =
  "flex size-9 items-center justify-center rounded-full text-ink-soft transition-colors duration-300 hover:bg-ink/5 hover:text-ink";

/**
 * What I'm listening to. Shares its playback and scrubbing with the hero intro
 * through `useAudioPlayer`, but deliberately not its waveform — one of those
 * on a page is enough, and the reference uses a plain bar here. Passing no
 * peaks also opts the card out of the analyser entirely.
 *
 * The controls genuinely move between tracks. Play becomes a real player the
 * moment a track carries a `preview` clip, and opens the song at its source
 * until then.
 */
export function MusicCard({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const track = listening[index];
  const live = Boolean(track.preview);

  const player = useAudioPlayer();
  const { playing, elapsed, known, progress } = player;
  const label = `${track.title} by ${track.artist}`;

  const step = (delta: number) => {
    player.resetSource();
    setIndex((i) => (i + delta + listening.length) % listening.length);
  };

  return (
    <Card className={cn("flex flex-col p-4", className)}>
      <div>
        <Pill icon={<IconHeadphones />}>What I&rsquo;m listening to</Pill>
      </div>

      <div className="mt-6 flex flex-1 gap-5 sm:gap-8 lg:gap-10">
        {/* Height comes from the row, width follows from aspect-square, so the
            art fills from under the pill to the bottom padding exactly as the
            reference does. A fixed width here would fight align-self:stretch
            and render a rectangle. The max-heights stop it dominating a
            narrow card, and the tablet-only min-height stops it collapsing
            on the card that is full-width but short at that breakpoint. */}
        <AlbumArt
          track={track}
          className="max-h-32 w-auto shrink-0 self-stretch sm:max-h-52 md:max-lg:min-h-52 md:max-h-56 xl:max-h-60"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[1.35rem] leading-tight font-medium tracking-[-0.028em] text-ink">
              {track.title}
            </h3>
            <p className="mt-2 truncate text-[0.9rem] text-ink-soft">
              {track.artist}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <ProgressBar
              progress={progress}
              onSeek={player.seekTo}
              disabled={!live || !known}
              label={`Seek within ${label}`}
              className="min-w-0 flex-1"
            />
            <span className="shrink-0 font-mono text-nano tabular-nums text-ink-soft">
              {playing || elapsed > 0
                ? formatTime(elapsed)
                : known
                  ? formatTime(player.duration)
                  : track.length}
            </span>
          </div>

          <div className="-ml-2 mt-3 flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous track"
              className={control}
            >
              <span className="size-4">
                <IconPrev />
              </span>
            </button>

            {live ? (
              <button
                type="button"
                onClick={player.toggle}
                aria-label={`${playing ? "Pause" : "Play"} ${label}`}
                className={control}
              >
                <span className="size-[18px]">
                  {playing ? <IconPause /> : <IconPlay />}
                </span>
              </button>
            ) : (
              <a
                href={track.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${label}`}
                className={control}
              >
                <span className="size-[18px]">
                  <IconPlay />
                </span>
              </a>
            )}

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next track"
              className={control}
            >
              <span className="size-4">
                <IconNext />
              </span>
            </button>

            {track.demo && (
              <span className="ml-auto pr-1 text-nano text-ink-soft">
                demo audio
              </span>
            )}

            <a
              href={track.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${label} at its source`}
              className={cn(control, !track.demo && "ml-auto")}
            >
              <IconArrow width={14} height={14} />
            </a>
          </div>
        </div>
      </div>

      {live && (
        <audio
          key={track.title}
          src={track.preview}
          {...player.mediaProps}
          onEnded={() => step(1)}
        />
      )}
    </Card>
  );
}
