import type { SVGProps } from "react";

/* A small, deliberately uniform icon set: 16px box, 1.4 stroke, round caps.
   Hand-rolled so the weight matches the text they sit beside. */

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width={13}
      height={13}
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconBriefcase = (p: IconProps) => (
  <Base {...p}>
    <rect x="1.9" y="4.6" width="12.2" height="8.6" rx="1.6" />
    <path d="M5.6 4.6V3.5a1.2 1.2 0 0 1 1.2-1.2h2.4a1.2 1.2 0 0 1 1.2 1.2v1.1" />
    <path d="M1.9 8.3h12.2" />
  </Base>
);

export const IconTerminal = (p: IconProps) => (
  <Base {...p}>
    <rect x="1.6" y="2.9" width="12.8" height="10.2" rx="1.8" />
    <path d="m4.8 6.6 1.9 1.6-1.9 1.6" />
    <path d="M8.9 10.2h2.5" />
  </Base>
);

export const IconPackage = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 1.9 14 5v6L8 14.1 2 11V5z" />
    <path d="M2 5l6 3 6-3" />
    <path d="M8 8v6.1" />
  </Base>
);

export const IconPin = (p: IconProps) => (
  <Base {...p}>
    <path d="M13 6.8c0 3.6-5 7.5-5 7.5s-5-3.9-5-7.5a5 5 0 0 1 10 0Z" />
    <circle cx="8" cy="6.7" r="1.7" />
  </Base>
);

export const IconLayers = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 1.9 14.4 5 8 8.1 1.6 5z" />
    <path d="m1.6 8.4 6.4 3.1 6.4-3.1" />
    <path d="m1.6 11.5 6.4 3.1 6.4-3.1" />
  </Base>
);

export const IconRoute = (p: IconProps) => (
  <Base {...p}>
    <circle cx="3.6" cy="3.9" r="1.8" />
    <circle cx="12.4" cy="12.1" r="1.8" />
    <path d="M3.6 5.7v3.1a2.4 2.4 0 0 0 2.4 2.4h4.6" />
  </Base>
);

export const IconClock = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="6.1" />
    <path d="M8 4.6V8l2.3 1.4" />
  </Base>
);

export const IconArrow = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.6 11.4 11.4 4.6" />
    <path d="M5.9 4.6h5.5v5.5" />
  </Base>
);

export const IconGithub = (p: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    width={14}
    height={14}
    {...p}
  >
    <path d="M8 .6a7.4 7.4 0 0 0-2.34 14.43c.37.07.5-.16.5-.35v-1.26c-2.06.45-2.5-.99-2.5-.99-.34-.86-.82-1.09-.82-1.09-.68-.46.05-.45.05-.45.75.05 1.14.77 1.14.77.66 1.14 1.74.81 2.17.62.07-.48.26-.81.47-1-1.65-.19-3.38-.82-3.38-3.67 0-.81.29-1.47.76-1.99-.08-.19-.33-.95.07-1.98 0 0 .62-.2 2.03.76a7.06 7.06 0 0 1 3.7 0c1.4-.96 2.02-.76 2.02-.76.4 1.03.15 1.79.08 1.98.48.52.76 1.18.76 1.99 0 2.86-1.74 3.48-3.4 3.66.27.23.5.69.5 1.39v2.05c0 .2.14.43.51.35A7.4 7.4 0 0 0 8 .6Z" />
  </svg>
);

export const IconLinkedin = (p: IconProps) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    width={14}
    height={14}
    {...p}
  >
    <path d="M3.4 1.6a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM1.8 6.4h3.2v8H1.8zM7 6.4h3.06v1.1h.04c.43-.77 1.47-1.34 2.6-1.34 2.2 0 2.7 1.36 2.7 3.36v4.88h-3.2v-4.3c0-1.02-.02-2.34-1.44-2.34-1.44 0-1.66 1.11-1.66 2.26v4.38H7z" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="1.6" y="3.4" width="12.8" height="9.2" rx="1.7" />
    <path d="m2.4 4.9 5.6 3.7 5.6-3.7" />
  </Base>
);

/* Playback ------------------------------------------------------------- */

/** Filled triangle with rounded joins, so it matches the system's softness. */
export const IconPlay = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full" {...p}>
    <path
      d="M7.6 4.6 19.8 12 7.6 19.4z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconPause = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full" {...p}>
    <rect x="6.6" y="5.4" width="4" height="13.2" rx="1.8" fill="currentColor" />
    <rect x="13.4" y="5.4" width="4" height="13.2" rx="1.8" fill="currentColor" />
  </svg>
);

export const IconPrev = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full" {...p}>
    <path
      d="M11.6 7.4 5.4 12l6.2 4.6zM19.4 7.4 13.2 12l6.2 4.6z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconNext = (p: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-full" {...p}>
    <path
      d="M12.4 7.4 18.6 12l-6.2 4.6zM4.6 7.4 10.8 12l-6.2 4.6z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconHeadphones = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 10.6a5 5 0 0 1 10 0" transform="translate(0 -0.4)" />
    <rect x="1.9" y="9.4" width="3.4" height="4.8" rx="1.5" />
    <rect x="10.7" y="9.4" width="3.4" height="4.8" rx="1.5" />
  </Base>
);
