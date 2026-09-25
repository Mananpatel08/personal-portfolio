export const profile = {
  name: "Manan Patel",
  firstName: "Manan",
  initials: "MP",

  role: "Python Developer",
  discipline: "Backend-leaning full-stack",

  company: {
    name: "Wedowebapps",
    since: "2024-12",
  },

  location: {
    city: "Ahmedabad",
    region: "Gujarat",
    country: "India",
    short: "Ahmedabad, IN",
    timeZone: "Asia/Kolkata",
    offset: "UTC+5:30",
  },

  email: "manan.work75@gmail.com",
  phone: "+91 84909 17391",

  availability: {
    open: true,
    label: "Open to backend roles",
    note: "Currently employed full-time, but happy to talk about interesting backend work.",
  },

  /* Headline is split so the second clause can sit back in a muted tone —
     one sentence, two levels of hierarchy. */
  headline: {
    lead: "I\u2019m Manan \u2014 I build the quiet half of the product.",
    muted: "Backend, at Wedowebapps.",
  },

  intro:
    "A year and a half of production REST APIs — Django REST Framework, FastAPI, PostgreSQL — shipped onto Linux behind Nginx. Mostly the unglamorous parts: data models, permissions, webhooks.",

  /* Longer voice, used on /about. */
  about: [
    "I write backends. Most days that means a Django REST Framework service somewhere between a database and a frontend, deciding what the data actually looks like and who is allowed to touch it.",
    "I studied Information Technology at Parul University and joined Wedowebapps in December 2024. Since then I’ve mostly worked as the only backend person on a project — which turns out to be the fastest way to learn what a badly-shaped data model costs you three months later.",
    "The work I like best is the part before any code exists: reading how a business actually operates, then finding the model that makes the awkward cases stop being awkward. A thirteen-step loan form that has to survive being abandoned halfway through is a more interesting problem than it sounds.",
    "Outside of the office I ship small things — a CLI for migrating SQL Server databases to MySQL that lives on PyPI, a pipeline that turns lecture recordings into structured notes. They exist because I wanted them to, which is the best reason.",
  ],

  links: [
    { label: "GitHub", short: "GH", href: "https://github.com/mananpatel08" },
    {
      label: "LinkedIn",
      short: "IN",
      href: "https://www.linkedin.com/in/manan-patel",
    },
    { label: "PyPI", short: "PY", href: "https://pypi.org/project/mssql2mysql/" },
    { label: "Email", short: "EM", href: "mailto:manan.work75@gmail.com" },
  ],
} as const;

export const siteUrl = "https://mananpatel.dev";
