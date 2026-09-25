"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion, soloAudio } from "@/lib/utils";

/**
 * Everything both players need: playback state, a scrubber, and the
 * analyser-driven beat animation that moves the waveform bars.
 *
 * The bars are mutated directly through refs inside a requestAnimationFrame
 * loop — React never re-renders per frame, which is what keeps ~96 bars cheap.
 */
export function useAudioPlayer(
  peaks: readonly number[] = [],
  options: { beat?: boolean } = {},
) {
  /* No waveform to drive means no analyser, no AudioContext, and none of the
     teardown that comes with one. */
  const beat = options.beat ?? peaks.length > 0;
  const audio = useRef<HTMLAudioElement | null>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const frame = useRef(0);
  const ctx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const bins = useRef<Uint8Array<ArrayBuffer> | null>(null);

  /* Kept in a ref so the animation loop always reads the current track's
     silhouette without being torn down and restarted. */
  const shape = useRef(peaks);
  useEffect(() => {
    shape.current = peaks;
  }, [peaks]);

  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(Number.NaN);
  const [broken, setBroken] = useState(false);

  const known = Number.isFinite(duration) && duration > 0;
  const progress = known ? Math.min(1, elapsed / duration) : 0;

  /* The <audio> tag is server-rendered, so the browser can finish loading
     metadata before React hydrates — and media events don't bubble, so there's
     no delegated handler to catch the one we missed. Reading the element when
     the ref attaches covers that race. */
  const attach = useCallback((el: HTMLAudioElement | null) => {
    audio.current = el;
    if (el && Number.isFinite(el.duration) && el.duration > 0) {
      setDuration(el.duration);
      setElapsed(el.currentTime);
    }
  }, []);

  const rest = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    bars.current.forEach((node, i) => {
      if (node) node.style.transform = `scaleY(${shape.current[i] ?? 0.2})`;
    });
  }, []);

  const setupAnalysis = useCallback(() => {
    const el = audio.current;
    if (!beat || !el || ctx.current || prefersReducedMotion()) return;
    try {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;

      const context = new Ctor();
      ctx.current = context;
      const source = context.createMediaElementSource(el);
      /* Audible path first: if anything below throws, sound still comes out. */
      source.connect(context.destination);

      const node = context.createAnalyser();
      node.fftSize = 256;
      node.smoothingTimeConstant = 0.72;
      source.connect(node);
      analyser.current = node;
      bins.current = new Uint8Array(new ArrayBuffer(node.frequencyBinCount));
    } catch {
      /* No analysis available — playback is unaffected, bars stay still. */
    }
  }, [beat]);

  /* The frame loop lives inside `start` as a hoisted declaration so it can
     schedule itself without referencing a const before it is initialised. */
  const start = useCallback(() => {
    if (!analyser.current || frame.current) return;

    function tick() {
      const node = analyser.current;
      const data = bins.current;
      const peakList = shape.current;

      if (node && data) {
        node.getByteFrequencyData(data);

        /* Musical energy sits low; the top of the spectrum is mostly hiss and
           would just make every bar twitch. */
        const usable = Math.max(1, Math.floor(data.length * 0.62));
        let sum = 0;
        for (let i = 0; i < usable; i++) sum += data[i];
        const energy = sum / usable / 255;

        for (let i = 0; i < peakList.length; i++) {
          const bin = Math.min(
            usable - 1,
            Math.floor((i / peakList.length) * usable),
          );
          const local = data[bin] / 255;
          const scale = Math.min(
            1,
            Math.max(0.06, peakList[i] * (0.7 + energy * 0.85) + local * 0.22),
          );
          const bar = bars.current[i];
          if (bar) bar.style.transform = `scaleY(${scale.toFixed(3)})`;
        }
      }
      frame.current = requestAnimationFrame(tick);
    }

    frame.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
      void ctx.current?.close();
    };
  }, []);

  const toggle = useCallback(() => {
    const el = audio.current;
    if (!el) return;
    if (el.paused) {
      soloAudio(el);
      setupAnalysis();
      void ctx.current?.resume();
      void el.play().catch(() => setBroken(true));
    } else {
      el.pause();
    }
  }, [setupAnalysis]);

  const seekTo = useCallback(
    (fraction: number) => {
      const el = audio.current;
      if (!el || !known) return;
      el.currentTime = fraction * duration;
      setElapsed(el.currentTime);
    },
    [known, duration],
  );

  /** Rewind playback state. The audio graph is left intact. */
  const reset = useCallback(() => {
    audio.current?.pause();
    setElapsed(0);
    setDuration(Number.NaN);
    setPlaying(false);
    rest();
  }, [rest]);

  /**
   * Use this when the <audio> element itself is being replaced — changing
   * track, for instance. An element can only ever back one
   * MediaElementSourceNode, so the old context has to be closed or the new
   * element gets no analyser and the bars stop moving. Conversely the hero,
   * which keeps one element for its lifetime, must use `reset` instead:
   * calling createMediaElementSource on the same element twice throws.
   */
  const resetSource = useCallback(() => {
    reset();
    void ctx.current?.close();
    ctx.current = null;
    analyser.current = null;
    bins.current = null;
  }, [reset]);

  /** Spread straight onto the <audio> element. */
  const mediaProps = {
    ref: attach,
    preload: "metadata" as const,
    onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) =>
      setDuration(e.currentTarget.duration),
    onDurationChange: (e: React.SyntheticEvent<HTMLAudioElement>) =>
      setDuration(e.currentTarget.duration),
    onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) =>
      setElapsed(e.currentTarget.currentTime),
    onPlay: () => {
      setPlaying(true);
      start();
    },
    onPause: () => {
      setPlaying(false);
      rest();
    },
    onError: () => setBroken(true),
  };

  return {
    bars,
    playing,
    elapsed,
    duration,
    known,
    progress,
    broken,
    toggle,
    seekTo,
    reset,
    resetSource,
    rest,
    mediaProps,
    audio,
  };
}
