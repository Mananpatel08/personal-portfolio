/** Tiny class joiner. Not worth a dependency. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** "Dec 2024" from "2024-12". */
export function formatMonth(iso: string) {
  const [year, month] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** "Dec 2024 — Present" */
export function formatRange(start: string, end: string | null) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

/**
 * Two players on one page should never talk over each other. Called before a
 * play() so whichever the visitor just started is the only one running.
 */
export function soloAudio(current: HTMLAudioElement) {
  document.querySelectorAll("audio").forEach((el) => {
    if (el !== current) el.pause();
  });
}

/** Honour the OS setting before starting anything that moves. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** "4:03". Shared by both players. */
export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "–:––";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

/** FNV-1a — a stable numeric seed from a string, for deterministic artwork. */
export function hashSeed(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
