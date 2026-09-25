/**
 * The spoken intro in the hero.
 *
 * Replace `public/audio/intro.m4a` with your own recording — the player reads
 * the duration off the file, so nothing here needs changing when you do.
 *
 * `peaks` is a designed waveform rather than an analysis of the file: 96
 * normalised amplitudes with a speech-like envelope. Every other bar is
 * hidden below the `sm` breakpoint, which halves the density without
 * changing the shape. Drawing it statically
 * keeps the homepage from downloading and decoding the whole clip just to
 * render a decoration.
 */
export const audioIntro = {
  src: "/audio/intro.m4a",
  label: "a short spoken introduction",
  peaks: [
    0.16, 0.16, 0.17, 0.17, 0.2, 0.18, 0.23, 0.25, 0.39, 0.4, 0.36, 0.52, 0.52,
    0.56, 0.79, 0.88, 0.93, 0.91, 1.0, 1.0, 0.8, 0.75, 0.91, 0.89, 0.91, 0.51,
    0.78, 0.75, 0.47, 0.58, 0.39, 0.53, 0.31, 0.26, 0.31, 0.28, 0.26, 0.26,
    0.26, 0.27, 0.41, 0.34, 0.28, 0.34, 0.26, 0.2, 0.21, 0.17, 0.2, 0.23, 0.27,
    0.39, 0.41, 0.34, 0.54, 0.38, 0.5, 0.37, 0.4, 0.26, 0.24, 0.22, 0.22, 0.21,
    0.22, 0.2, 0.29, 0.25, 0.25, 0.17, 0.16, 0.14, 0.12, 0.15, 0.13, 0.12, 0.09,
    0.14, 0.14, 0.12, 0.13, 0.15, 0.12, 0.14, 0.13, 0.14, 0.13, 0.14, 0.13,
    0.12, 0.11, 0.12, 0.12, 0.14, 0.11, 0.12,
  ],
} as const;
