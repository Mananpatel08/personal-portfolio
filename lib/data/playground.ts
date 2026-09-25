export type Fragment = {
  id: string;
  title: string;
  /** The project it came out of. */
  from: string;
  fromSlug?: string;
  note: string;
  tags: string[];
  /** Optional mono line — the idea in one expression. */
  snippet?: string;
};

/**
 * Not side projects — smaller than that. Ideas pulled out of real work that
 * were more interesting than the feature they were serving.
 */
export const fragments: Fragment[] = [
  {
    id: "slug-auth",
    title: "Letting a build server talk without giving it an account",
    from: "Timely",
    fromSlug: "timely",
    note: "Jenkins needed to post into an internal chat channel. Creating a service user would have meant a password, a session, and a permission set that made no sense for a machine. A token bound to a channel slug does the whole job: it can post to exactly one place and it can do nothing else.",
    tags: ["Auth", "Webhooks", "DRF"],
    snippet: "POST /api/hooks/{slug}   →   ws://chat/engineering",
  },
  {
    id: "step-persistence",
    title: "A thirteen-step form that survives a closed tab",
    from: "RFNB",
    fromSlug: "rfnb",
    note: "The instinct is to keep the whole application in a draft blob and write it on submit. Persisting each step as it completes instead turns every step into a real row — which is what made per-step locking, broker review, and resuming from step six possible later on. None of those were in the original brief.",
    tags: ["Data modelling", "Forms"],
  },
  {
    id: "chunk-overlap",
    title: "The one parameter that decides whether notes make sense",
    from: "VidNote",
    fromSlug: "vidnote",
    note: "Long transcripts don’t fit in a context window, so you chunk them. Chunk on a clean boundary and every section starts cold, having forgotten the argument it was in the middle of. Overlap the chunks and the thread holds. Tuning that overlap was most of the project.",
    tags: ["LLM", "Pipelines"],
    snippet: "chunk(text, size=4000, overlap=400)",
  },
  {
    id: "error-sheet",
    title: "Hand back a file, not an error message",
    from: "Sage",
    fromSlug: "sage",
    note: "Bulk import fails on row 847 of 2,000. A message saying so is technically correct and completely useless. Generating a downloadable sheet with every rejected row and the reason it was rejected turns a support ticket into something the customer fixes themselves in ten minutes.",
    tags: ["Imports", "Validation"],
  },
  {
    id: "signal-inventory",
    title: "Stock that corrects itself",
    from: "Sage",
    fromSlug: "sage",
    note: "Size-wise inventory adjusted by Django signals on order placement, rather than by an admin remembering to. Inventory that depends on someone remembering is inventory you cannot trust, and untrustworthy stock numbers are worse than none — people work around them.",
    tags: ["Django", "Signals"],
  },
  {
    id: "topic-broadcast",
    title: "A correctness fix disguised as an optimisation",
    from: "InkTure",
    fromSlug: "inkture",
    note: "Sending a promotional push per device looks like a loop you can optimise later. It isn’t: partial failure across thousands of sends leaves you with no idea who received what. FCM topic broadcasting is one request, one outcome — and that’s the actual reason to use it.",
    tags: ["FCM", "Push"],
  },
  {
    id: "strict-mode",
    title: "When a tool should refuse to guess",
    from: "mssql2mysql",
    fromSlug: "mssql2mysql",
    note: "Migrating between database engines means type mappings that don’t quite line up. A script I run myself can pick something sensible and move on. A package a stranger runs against their production data should stop and ask. That’s the whole argument for strict mode.",
    tags: ["CLI", "Design"],
    snippet: "mode: strict   # fail loudly rather than convert quietly",
  },
  {
    id: "search-decision",
    title: "Search as a decision, not a default",
    from: "Aizen",
    fromSlug: "aizen",
    note: "An assistant that always searches is slow and often pointless; one that never searches is confidently wrong about anything recent. The interesting part of the system isn’t the search — it’s the agent deciding whether this particular question warrants one.",
    tags: ["LangGraph", "Agents"],
  },
];
