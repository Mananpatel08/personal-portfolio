import { projects } from "./projects";

export type Entry = {
  id: string;
  kind: "work" | "education";
  org: string;
  role: string;
  location: string;
  start: string;
  end: string | null;
  summary: string;
  highlights: string[];
  stack: string[];
  projects?: string[];
};

export const experience: Entry[] = [
  {
    id: "wedowebapps",
    kind: "work",
    org: "Wedowebapps",
    role: "Python Developer",
    location: "Ahmedabad, India",
    start: "2024-12",
    end: null,
    summary:
      "Backend development across four production platforms — an in-house SaaS used company-wide, a multi-tenant loan system, a campaign platform and a mobile app API. On most of them I was the only backend developer.",
    highlights: [
      "Owned API development from inception on multiple projects, including schema design, permissions and deployment.",
      "Built real-time features with Django Channels and WebSockets, and background processing with Celery.",
      "Shipped to Ubuntu servers with multi-stage Docker builds behind Nginx reverse proxies.",
      "Integrated third-party systems end to end — Stripe subscriptions and webhooks, Firebase Cloud Messaging, Jenkins.",
    ],
    stack: [
      "Python",
      "Django REST Framework",
      "FastAPI",
      "PostgreSQL",
      "Celery",
      "Next.js",
      "Docker",
      "Nginx",
    ],
    projects: ["timely", "rfnb", "sage", "inkture"],
  },
  {
    id: "parul",
    kind: "education",
    org: "Parul University",
    role: "B.Tech, Information Technology",
    location: "Vadodara, India",
    start: "2021-08",
    end: "2025-05",
    summary:
      "Four years of Information Technology — and, in the last of them, a full-time backend job running alongside the coursework.",
    highlights: [],
    stack: [],
  },
];

export type TimelineItem = {
  id: string;
  label: string;
  period: string;
  href?: string;
  current?: boolean;
};

/**
 * The compact timeline on the homepage card: where I've been, newest first.
 *
 * Flip `INCLUDE_PROJECTS` to true to fold every shipped project in between the
 * job and the degree. That makes the list long enough to scroll, and the card
 * caps its height and fades at the edges on its own.
 */
const INCLUDE_PROJECTS = false;

export const timeline: TimelineItem[] = [
  {
    id: "wedowebapps",
    label: "Wedowebapps",
    period: "Dec 2024 — Present",
    href: "/experience",
    current: true,
  },
  ...(INCLUDE_PROJECTS
    ? projects.map((project) => ({
        id: project.slug,
        label: project.name,
        period: project.year,
        href: `/work/${project.slug}`,
      }))
    : []),
  {
    id: "parul",
    label: "Parul University",
    period: "2021 — 2025",
    href: "/experience",
  },
];
