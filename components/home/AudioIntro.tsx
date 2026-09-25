"use client";

import { Waveform } from "@/components/media/Waveform";
import { IconPause, IconPlay } from "@/components/ui/icons";
import { audioIntro } from "@/lib/data/audio";
import { useAudioPlayer } from "@/lib/use-audio-player";
import { cn, formatTime } from "@/lib/utils";

const { src, label, peaks } = audioIntro;

/**
 * The hero's spoken intro. Playback, scrubbing and the beat animation all come
 * from the shared player hook; the waveform is the shared component.
 */
export function AudioIntro({ className }: { className?: string }) {
  const player = useAudioPlayer(peaks);
  const { playing, elapsed, duration, known, progress, broken } = player;
  const shown = playing || elapsed > 0 ? elapsed : duration;

  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 rounded-full border border-line bg-surface pr-5 pl-3 shadow-pill sm:h-14 sm:gap-4 sm:pr-6 sm:pl-4",
        className,
      )}
    >
      <audio
        src={src}
        {...player.mediaProps}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          player.reset();
        }}
      />

      <button
        type="button"
        onClick={player.toggle}
        disabled={broken}
        aria-label={
          broken
            ? "Audio introduction unavailable"
            : `${playing ? "Pause" : "Play"} ${label}`
        }
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-accent transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:scale-110 disabled:text-ink-faint disabled:hover:scale-100 sm:size-10"
      >
        <span className="size-6 sm:size-7">
          {playing ? <IconPause /> : <IconPlay />}
        </span>
      </button>

      <Waveform
        peaks={peaks}
        progress={progress}
        barsRef={player.bars}
        onSeek={player.seekTo}
        disabled={!known}
        label={`Seek within ${label}`}
        className="h-7 flex-1 sm:h-8"
      />

      <span className="shrink-0 font-mono text-nano tabular-nums text-ink-soft sm:text-micro">
        {formatTime(shown)}
      </span>
    </div>
  );
}
