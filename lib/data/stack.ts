export type StackGroup = {
  label: string;
  items: string[];
  /** The two or three things I’d actually claim depth in. */
  primary?: string[];
};

export const stack: StackGroup[] = [
  {
    label: "Backend",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "Celery",
      "Django Channels",
    ],
    primary: ["Python", "Django REST Framework"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "MS SQL Server"],
    primary: ["PostgreSQL"],
  },
  {
    label: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS"],
    primary: ["Next.js"],
  },
  {
    label: "Infrastructure",
    items: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "Linux (Ubuntu)",
      "GCP",
      "Jenkins",
      "Git",
    ],
    primary: ["Docker"],
  },
];

/** Condensed set for the homepage card — the things I reach for first. */
export const stackHighlights = [
  "Python",
  "Django REST Framework",
  "FastAPI",
  "PostgreSQL",
  "Celery",
  "Next.js",
  "TypeScript",
  "Docker",
  "Nginx",
  "Linux",
];
