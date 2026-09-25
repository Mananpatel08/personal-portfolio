import { hashSeed } from "@/lib/utils";

type TrackInput = {
  title: string;
  artist: string;
  album: string;
  year: string;
  /** Full track length, shown while nothing is playing. */
  length: string;
  /** Cover art in /public — falls back to drawn artwork when absent. */
  cover?: string;
  /**
   * A short clip in /public. Supply one and the card becomes a real player:
   * the waveform scrubs, the timer runs, and the bars move with the audio.
   * Without it, the controls still move between tracks and play opens the
   * song at its source.
   */
  preview?: string;
  /**
   * True while `preview` points at one of the generated placeholder beds
   * rather than the real recording. The card shows a "demo audio" marker so a
   * visitor is never told they are hearing the actual track. Delete the flag
   * along with the file when you drop in your own clip.
   */
  demo?: boolean;
};

export type Track = TrackInput & {
  href: string;
  /** Stable per-track seed, driving the drawn cover art. */
  seed: number;
};

/**
 * PLACEHOLDER — swap these for what you actually listen to.
 *
 * The titles and artists are placeholders. The audio under them is NOT the
 * real recording: those are other people's copyright and nothing of the sort
 * is bundled here. Each `preview` is a short original bed generated for this
 * project purely so the player works end to end, which is why every track
 * carries `demo: true`.
 *
 * To make it real: drop your clip in /public/audio/previews, point `preview`
 * at it and remove `demo`. Cover art works the same way through `cover`.
 */
const raw: TrackInput[] = [
  {
    title: "Nights",
    artist: "Frank Ocean",
    album: "Blonde",
    year: "2016",
    length: "5:07",
    preview: "/audio/previews/nights.m4a",
    demo: true,
  },
  {
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    year: "2011",
    length: "4:03",
    preview: "/audio/previews/midnight.m4a",
    demo: true,
  },
  {
    title: "Strobe",
    artist: "deadmau5",
    album: "For Lack of a Better Name",
    year: "2009",
    length: "10:37",
    preview: "/audio/previews/strobe.m4a",
    demo: true,
  },
  {
    title: "Time",
    artist: "Hans Zimmer",
    album: "Inception",
    year: "2010",
    length: "4:35",
    preview: "/audio/previews/time.m4a",
    demo: true,
  },
];

export const listening: Track[] = raw.map((track) => {
  const seed = hashSeed(`${track.title} ${track.artist}`);
  return {
    ...track,
    seed,
    href: `https://open.spotify.com/search/${encodeURIComponent(
      `${track.title} ${track.artist}`,
    )}`,
  };
});
