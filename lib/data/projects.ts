export type CoverKind =
  | "realtime"
  | "steps"
  | "migrate"
  | "transcribe"
  | "agent"
  | "inventory"
  | "render";

export type CaseSection = {
  title: string;
  body: string[];
  /** Optional pull-out list rendered beside the prose. */
  aside?: { label: string; items: string[] };
};

export type Project = {
  slug: string;
  name: string;
  /** Two or three words, for dense lists. */
  short: string;
  tagline: string;
  year: string;
  role: string;
  context: "Client work" | "Personal" | "Open source";
  /** One or two lines, used on cards. */
  summary: string;
  stack: string[];
  cover: CoverKind;
  /** Layout weight on the work archive. */
  scale: "feature" | "wide" | "standard";
  featured: boolean;
  links?: { label: string; href: string }[];
  /** Quiet factual details. Never presented as a stats bar. */
  facts?: { label: string; value: string }[];
  sections: CaseSection[];
};

export const projects: Project[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "timely",
    name: "Timely",
    short: "PM & CRM",
    tagline: "Project management & CRM, in one system",
    year: "2025",
    role: "Sole developer — backend, frontend, deployment",
    context: "Client work",
    summary:
      "An in-house SaaS platform used day to day by 40–50 people: CRM, real-time chat, worklogs and remote deployment controls behind one login.",
    stack: [
      "Django REST Framework",
      "Django Channels",
      "Next.js",
      "WebSockets",
      "JWT",
      "Paramiko",
    ],
    cover: "realtime",
    scale: "feature",
    featured: true,
    facts: [
      { label: "Users", value: "40–50 daily" },
      { label: "Team", value: "One developer" },
      { label: "Surface", value: "Four modules" },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          "Timely is an internal SaaS platform at Wedowebapps — project management and CRM in a single system, used day to day by 40 to 50 employees. I was the only developer on it, which meant the API, the interface and the production deployment were all mine.",
        ],
      },
      {
        title: "Context",
        body: [
          "An agency accumulates process faster than it accumulates tools to hold it. Leads live in one place, contracts in another, and the record of who actually worked which hours in a third. None of those systems know about each other, so every question that crosses a boundary becomes a person asking another person.",
          "The brief was to put those pieces behind one login and have them share a database.",
        ],
      },
      {
        title: "Problem",
        body: [
          "The difficulty wasn’t any single module. It was that Timely is really four products wearing one coat. A CRM is transactional and record-heavy. A chat system is persistent and stateful. A worklog is time-series. A deployment console is a remote-execution tool with an entirely different threat model.",
          "They share almost nothing except the people using them — and an expectation that it all feels like one application.",
        ],
      },
      {
        title: "Approach",
        body: [
          "One Django project, split into apps along domain lines rather than technical ones, with Django REST Framework as the API surface and a Next.js frontend consuming it over JWT.",
          "Keeping the boundaries at the domain level meant the chat module could grow a WebSocket layer without the CRM having to know it existed, and the deployment module could carry a much stricter permission model without that strictness leaking everywhere else.",
        ],
        aside: {
          label: "Modules",
          items: [
            "CRM — leads, clients, contracts, invoices, payments",
            "Chat — real-time, WebSocket-backed",
            "Worklogs — per-employee time tracking",
            "Servers — remote start / stop / restart",
          ],
        },
      },
      {
        title: "Process",
        body: [
          "The CRM came first, because it defined the shape of everything downstream: leads become clients, clients sign contracts, contracts generate invoices, invoices collect payment records. Once that chain was modelled properly, most of the later features were reads against it.",
          "Chat followed, on Django Channels over WebSockets. Then the worklog module, which is deceptively simple until you account for corrections to past entries. The server management module came last and was the one I was most careful with: admins can start, stop and restart site deployments remotely, which happens through server-side scripts executed over SSH with Paramiko.",
        ],
      },
      {
        title: "Solution",
        body: [
          "The piece I’m happiest with is the public integration API. External tools — Jenkins, in practice — can post messages straight into an internal chat channel, authenticated with a token-bound slug rather than a user session.",
          "It’s a small surface, maybe a hundred lines. But it turns the chat module from a place people talk into a place the build system reports to, and it did that without handing an external system anything resembling a user credential.",
        ],
      },
      {
        title: "Result",
        body: [
          "Timely runs in production and is used daily by 40 to 50 employees. The CRM, chat, worklog and deployment modules all shipped, and the Jenkins integration means build notifications land in the same place the conversation about them happens.",
        ],
      },
      {
        title: "Reflection",
        body: [
          "Being the only developer on a four-module platform is the fastest education available in the cost of a bad data model. Decisions I made in the CRM in week two were still shaping what was easy and what was painful six months later.",
          "If I started again I’d spend longer on the contract-to-invoice relationship before writing any view code. Everything else I’d keep.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "rfnb",
    name: "RFNB",
    short: "Loan management",
    tagline: "Multi-tenant loan management for UK brokers",
    year: "2025",
    role: "Backend developer",
    context: "Client work",
    summary:
      "A broker-facing loan platform with a thirteen-step application that survives being abandoned halfway through, per-step access control, and Stripe subscription billing.",
    stack: [
      "Django",
      "Django REST Framework",
      "Next.js",
      "PostgreSQL",
      "Stripe",
      "JWT",
    ],
    cover: "steps",
    scale: "feature",
    featured: true,
    facts: [
      { label: "Form", value: "13 steps" },
      { label: "Tenancy", value: "Broker + master admin" },
      { label: "Billing", value: "Stripe Subscriptions" },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          "RFNB is a multi-tenant SaaS platform for UK loan brokers. Brokers manage their own customers and loan applications; a master admin role sits above all of them with oversight across every broker, customer and application record.",
        ],
      },
      {
        title: "Context",
        body: [
          "A UK loan application is not a form. It is a long, legally-shaped interview that can involve more than one applicant, takes real effort to complete, and is routinely started on one day and finished on another.",
          "Any system that treats it as a single POST has already lost.",
        ],
      },
      {
        title: "Problem",
        body: [
          "Thirteen steps, multiple applicants per application, and a customer who will close the tab at step six. The application has to be resumable from exactly where it was left — not restarted, not half-validated into an unusable state.",
          "On top of that, brokers needed to be able to intervene mid-flight: lock a step, unlock a step, or read a partially completed application before the customer had submitted anything.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Persist per step rather than per submission. Each completed step is written as it’s finished, so the application always has a well-defined furthest point and a customer returning later resumes from their last completed step instead of the beginning.",
          "Because the state lives server-side rather than in a draft blob, the per-step access control fell out almost for free: if a step is a real record, a broker can lock it, unlock it, or read it while the rest of the application is still in progress.",
        ],
        aside: {
          label: "Constraints",
          items: [
            "Multiple applicants per application",
            "Resume from last completed step",
            "Per-step lock / unlock by broker",
            "Broker review before submission",
          ],
        },
      },
      {
        title: "Process",
        body: [
          "The tenancy model came first — brokers, their customers, their applications, and a master admin able to see across all of it without those queries becoming a special case everywhere in the codebase.",
          "Billing came next. Stripe Subscriptions handles broker billing with custom pricing tiers and billing cycles, and a set of webhook handlers keeps subscription lifecycle events, payment status and transaction history in sync on our side. Webhooks are where this kind of integration actually lives; the checkout is the easy half.",
          "Broker-to-customer chat was added last, using short polling for continuous message delivery.",
        ],
      },
      {
        title: "Solution",
        body: [
          "The result is an application flow that behaves the way the paperwork actually behaves. A customer can leave and come back. A broker can watch progress, unlock a step the customer got wrong, and review the whole thing before it’s formally submitted.",
        ],
      },
      {
        title: "Result",
        body: [
          "Brokers manage customers and applications end to end, with subscription billing running through Stripe and lifecycle events reconciled through webhooks rather than trusted from the client.",
        ],
      },
      {
        title: "Reflection",
        body: [
          "Short polling for the chat was the pragmatic call under the deadline and it works, but it’s the part of this system I’d revisit first — the same Channels-and-WebSockets approach I used on Timely would fit here cleanly.",
          "The per-step persistence decision, on the other hand, paid for itself repeatedly. Nearly every later requirement turned out to be easy specifically because the steps were real rows.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mssql2mysql",
    name: "mssql2mysql",
    short: "Migration CLI",
    tagline: "Config-driven SQL Server → MySQL migration CLI",
    year: "2025",
    role: "Author",
    context: "Open source",
    summary:
      "A command-line tool that migrates a Microsoft SQL Server database to MySQL from a single YAML file — schema inferred, keys preserved, large tables batched. Published on PyPI.",
    stack: ["Python", "MySQL", "MS SQL Server", "YAML", "PyPI"],
    cover: "migrate",
    scale: "wide",
    featured: true,
    links: [
      { label: "PyPI", href: "https://pypi.org/project/mssql2mysql/" },
      { label: "GitHub", href: "https://github.com/mananpatel08" },
    ],
    facts: [
      { label: "Install", value: "pip install mssql2mysql" },
      { label: "Config", value: "One YAML file" },
      { label: "Modes", value: "Strict / smart" },
    ],
    sections: [
      {
        title: "Overview",
        body: [
          "A CLI that automates migrating a database from Microsoft SQL Server to MySQL, driven entirely by a single YAML configuration file. It’s on PyPI, so the whole setup is a pip install and a config.",
        ],
      },
      {
        title: "Context",
        body: [
          "Cross-engine migration is a task everyone hits eventually and nobody wants to own. The usual approach is a pile of one-off scripts that work exactly once, for exactly one database, and are thrown away immediately afterwards.",
        ],
      },
      {
        title: "Problem",
        body: [
          "The hard part isn’t moving rows, it’s moving meaning. SQL Server and MySQL disagree about types, and a naive migration quietly drops the things that made the schema a schema — primary keys, foreign keys, which columns were allowed to be null.",
          "The second problem is size. Any table large enough to be worth automating is large enough to exhaust memory if you read it in one go.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Read the source schema from MSSQL’s own metadata rather than asking the user to describe it. The tool infers structure and maps types automatically, carrying primary keys, foreign keys and column nullability across instead of flattening them.",
          "Everything the user does provide lives in one YAML file, so a migration is reproducible and reviewable — you can diff it, commit it, and run it again.",
        ],
        aside: {
          label: "What it preserves",
          items: [
            "Inferred schema and type mapping",
            "Primary keys",
            "Foreign keys",
            "Column nullability",
          ],
        },
      },
      {
        title: "Process",
        body: [
          "Two migration modes, because the right behaviour depends on what you’re doing. Strict mode refuses to guess: if a type doesn’t map cleanly, it stops and tells you. Smart mode makes the sensible conversion and keeps going.",
          "Large tables are handled with configurable batch inserts, with progress tracked per table so a long migration is legible while it’s running rather than a silent hang.",
        ],
      },
      {
        title: "Solution",
        body: [
          "The finished tool turns a migration into a config file and one command. Point it at both databases, choose a mode, set a batch size, and watch it work through the tables.",
        ],
      },
      {
        title: "Result",
        body: [
          "Published on PyPI and installable with pip. It’s the first thing I’ve written where the interface mattered as much as the implementation, because every design decision is one a stranger has to understand from a README.",
        ],
      },
      {
        title: "Reflection",
        body: [
          "Publishing changes how you write. A script only you run can have surprising defaults; a package cannot. Adding strict mode was a direct consequence of that — I didn’t want the tool making a judgement call on someone else’s data without saying so.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "sage",
    name: "Sage",
    short: "Campaign platform",
    tagline: "Hi-vis campaign platform — storefront and admin",
    year: "2025",
    role: "Backend developer — API from inception",
    context: "Client work",
    summary:
      "A two-part campaign platform: a public ordering site and an internal admin panel, with role-scoped permissions, bulk order import and inventory that keeps itself honest.",
    stack: ["Django REST Framework", "PostgreSQL", "Celery", "Django Groups"],
    cover: "inventory",
    scale: "standard",
    featured: false,
    sections: [
      {
        title: "Overview",
        body: [
          "Sage is a campaign platform in two halves — a public ordering site and an internal admin panel behind it. I owned the backend API from project inception.",
        ],
      },
      {
        title: "Problem",
        body: [
          "Two audiences with opposite needs. The public side has to be simple enough to order from without instructions. The admin side has to expose products, orders, users and settings to several kinds of administrator — who should emphatically not all see the same things.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Role-based access control built on Django Groups with custom permissions, so each admin role gets a scoped view of products, orders, users and settings rather than a single blunt is_staff flag.",
          "Product management ran deeper than it first appears: SKUs, descriptions, multi-image uploads and per-size stock, alongside order and user administration with activation controls.",
        ],
      },
      {
        title: "Process",
        body: [
          "The feature I put the most care into was bulk order import. Anyone can accept a spreadsheet; the useful part is what happens when it’s wrong.",
          "Validation runs at column level, and a failed import produces a downloadable error sheet explaining why each rejected row was rejected. It turns a support conversation into a file the customer can fix themselves.",
        ],
        aside: {
          label: "Backend surface",
          items: [
            "Role-scoped admin permissions",
            "Bulk import with per-row error sheet",
            "Signal-driven size-wise inventory",
            "Product, order and user APIs",
          ],
        },
      },
      {
        title: "Solution",
        body: [
          "Inventory management is automated through Django signals, adjusting size-wise stock levels when an order is placed rather than relying on an admin to remember. Stock that corrects itself is stock you can trust.",
        ],
      },
      {
        title: "Reflection",
        body: [
          "The error sheet is the thing I’d build first next time. It cost about a day and removed an entire category of back-and-forth.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "vidnote",
    name: "VidNote",
    short: "Video to notes",
    tagline: "Lecture video in, structured notes out",
    year: "2025",
    role: "Full-stack — personal project",
    context: "Personal",
    summary:
      "A pipeline that turns a lecture recording into readable notes: FFmpeg for audio, Whisper for transcription, then AI structuring — with live Markdown preview and PDF export.",
    stack: ["FastAPI", "Whisper", "FFmpeg", "React", "Docker Compose"],
    cover: "transcribe",
    scale: "wide",
    featured: true,
    sections: [
      {
        title: "Overview",
        body: [
          "VidNote takes a lecture video and gives back structured notes. Audio is extracted with FFmpeg, transcribed with OpenAI Whisper, then passed through AI structuring to become something with headings rather than a wall of text.",
        ],
      },
      {
        title: "Problem",
        body: [
          "A raw transcript is almost useless. It’s accurate and completely unreadable — no paragraphs, no structure, no sense of where one idea ends.",
          "Worse, lecture transcripts are long. Long enough that they don’t fit in a single model context, which means chunking, which means losing the thread at every boundary.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Chunk the transcript with configurable overlap, so each chunk carries the tail of the one before it. The model never starts a section cold, and the structure holds across boundaries instead of resetting every few thousand words.",
        ],
      },
      {
        title: "Process",
        body: [
          "The pipeline is four stages, each independently runnable: extract, transcribe, chunk, structure. Keeping them separate meant I could iterate on the structuring prompt without re-transcribing an hour of audio every time.",
          "The whole stack is containerised with Docker Compose — Whisper and FFmpeg have opinions about their environment, and a compose file is a cheaper answer than a README full of installation steps.",
        ],
        aside: {
          label: "Pipeline",
          items: [
            "FFmpeg — audio extraction",
            "Whisper — transcription",
            "Overlapping chunker",
            "AI note structuring",
          ],
        },
      },
      {
        title: "Solution",
        body: [
          "The frontend renders a live Markdown preview as notes are generated, with one-click styled PDF export at the end. Watching structure appear as it’s produced makes the wait feel like progress rather than a spinner.",
        ],
      },
      {
        title: "Reflection",
        body: [
          "The overlap parameter was the whole project. Everything else was plumbing; the difference between a good output and a disjointed one was a single number I spent a long time tuning.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "aizen",
    name: "Aizen",
    short: "AI assistant",
    tagline: "An assistant that looks things up",
    year: "2025",
    role: "Full-stack — personal project",
    context: "Personal",
    summary:
      "A conversational assistant that answers from live web search rather than model memory, using a LangGraph ReAct agent to decide when searching is actually warranted.",
    stack: ["FastAPI", "LangChain", "LangGraph", "React", "Groq", "Docker"],
    cover: "agent",
    scale: "standard",
    featured: false,
    sections: [
      {
        title: "Overview",
        body: [
          "Aizen is a conversational assistant that answers questions using live web search results rather than model knowledge alone — and shows you the sources it used.",
        ],
      },
      {
        title: "Problem",
        body: [
          "Always searching is slow and often pointless. Never searching means confidently wrong answers about anything recent. The decision of whether this particular question needs a lookup is the actual product.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Tool calling through a LangGraph ReAct agent, which reasons about whether a search is needed before reaching for one. Tavily is the primary search provider, with DuckDuckGo as a fallback so a provider outage degrades the answer rather than ending the conversation.",
        ],
        aside: {
          label: "Decisions",
          items: [
            "LangGraph ReAct agent for tool routing",
            "Tavily primary, DuckDuckGo fallback",
            "Groq-hosted models for latency",
            "Sources shown beside every answer",
          ],
        },
      },
      {
        title: "Process",
        body: [
          "Latency is what makes or breaks a chat interface, so inference runs on Groq-hosted models. When the agent may take an extra round trip to search, the underlying generation has to be fast enough that the user doesn’t feel the difference.",
        ],
      },
      {
        title: "Solution",
        body: [
          "The React frontend displays each response alongside the sources behind it. An assistant that cites is one you can check, and one you can check is one worth using.",
        ],
      },
      {
        title: "Reflection",
        body: [
          "Building the fallback before I needed it was the right instinct. The first time Tavily returned nothing useful, the conversation simply continued.",
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "inkture",
    name: "InkTure",
    short: "Mobile app API",
    tagline: "See the print on your own wall",
    year: "2025",
    role: "Backend developer — full API layer",
    context: "Client work",
    summary:
      "The complete backend for a cross-platform mobile app that visualises custom prints on a photo of your wall, with dimension-based pricing and push notifications.",
    stack: ["Django REST Framework", "Firebase FCM", "PostgreSQL"],
    cover: "render",
    scale: "standard",
    featured: false,
    sections: [
      {
        title: "Overview",
        body: [
          "InkTure is a cross-platform mobile app that lets someone photograph a wall, visualise a custom print on it, and order it. I built the complete backend API layer behind it.",
        ],
      },
      {
        title: "Problem",
        body: [
          "Two things a physical-goods app gets wrong more often than anything else: addresses and notifications. People order to more than one address, and they expect to know where their order is without opening the app to check.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Full authentication — registration, login, password reset — with multi-address management, so a user keeps several saved addresses rather than overwriting one every time they order somewhere new.",
          "Pricing is computed from wall dimensions and the selected print size, so the number the user sees is derived from their actual input rather than a lookup table that drifts out of date.",
        ],
      },
      {
        title: "Solution",
        body: [
          "Firebase Cloud Messaging handles order lifecycle notifications. For promotional campaigns I used FCM topic-based broadcasting, which sends one request to reach every subscribed user instead of iterating device by device.",
        ],
        aside: {
          label: "API surface",
          items: [
            "Auth — register, login, reset",
            "Multi-address management",
            "Dimension-based pricing",
            "FCM lifecycle + topic broadcast",
          ],
        },
      },
      {
        title: "Reflection",
        body: [
          "Topic broadcasting is one of those features that looks like an optimisation and is actually a correctness fix — per-device sends fail partially, and partial failure across a promotional campaign is very hard to reason about after the fact.",
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
