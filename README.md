# mananpatel.dev

Personal site — Next.js 16 (App Router), TypeScript, Tailwind v4. No UI library,
no animation library, no icon package. Everything below is hand-built.

```bash
npm run dev     # http://localhost:3000
npm run build   # every route prerenders static
npm run lint
```

---

## The design system

All of it lives in `app/globals.css`, as Tailwind v4 `@theme` tokens. There is
no `tailwind.config` file — v4 is CSS-first.

**Surfaces.** Sampled pixel-for-pixel from the reference design:

| Element        | Composited value | Token                               |
| -------------- | ---------------- | ----------------------------------- |
| Page           | `#efeeeb`        | `--color-paper` (`#f0efec`)         |
| Card           | `#f5f4f1`        | `--color-surface` (`#f6f5f2`)       |
| Label chip     | `#e7e5e4`        | `--color-chip` (`#e8e6e5`)          |

The tokens are each **one value lighter** than the target because the `.grain`
overlay multiplies at 3.5% and takes one off every surface. Change the grain and
you have to re-derive them.

The card sits only six values above the page — the shadow does the separating,
not the contrast. A `.well` is the inverse: a recess cut back down to page level,
used for the mono blocks.

**Pills** are a tint *cut into* the card, not a chip floating on it: darker than
the surface, no border, no shadow. 29px tall, 14px side padding, 12px text.
`tone="light"` switches to white for pills sitting over imagery, where the tint
would disappear — the map card is the only one that needs it.

**Geometry**, also measured: card radius 12px, card padding 16px, grid gap 16px.

**The step control** on the How I work card is measured too: a 46px track in
the chip tint, a 40px active pill, and **four equal segments**. The segments
must stay equal — an earlier version let the active one grow to fit its title,
which squeezed the other three into the right-hand edge. The step title belongs
in the heading, where the number sits inline at the same size and weight as the
words, not as a small mono prefix.

**Ink.** Three greys, and the split between them matters for accessibility:

| Token           | Use                                                    |
| --------------- | ------------------------------------------------------ |
| `ink`           | Primary text                                           |
| `ink-soft`      | Anything informative — body, labels, metadata (AA)      |
| `ink-faint`     | Display type and decorative marks only (AA-large only)  |

Do not use `ink-faint` on small text; it does not pass contrast below ~19px.

**Accent.** One terracotta (`--color-accent`), plus a muted green for the
availability dot. That is the entire colour budget. The accent appears roughly
twice per screen — any more and the restraint stops reading as a choice.

**Type.** Geist and Geist Mono via `next/font`. Six sizes, deliberately:
`display · title · head · lead · body · micro/nano`. Weights stop at 500.
Hierarchy comes from size and weight; colour is not doing that job.

**Borders** sit at 8% opacity. **Shadows** are two-layer and very soft.
**Radii**: 12px cards, 16px features, 10px inner, full for pills.

Light only, on purpose — `color-scheme: light` is set so browser UI matches.
The warm-paper palette is the identity here; a dark variant would be a second
design, not a toggle.

---

## Layout

```
app/
  page.tsx              home — hero, bento, selected work, contact
  work/                 archive (three tiers of visual weight)
  work/[slug]/          case studies, numbered 01–08
  about/ experience/ playground/ contact/
  opengraph-image.tsx   generated OG card
  sitemap.ts robots.ts
components/
  layout/   Container · SiteHeader · SiteFooter · PageHeader
  ui/       Card · Pill · Tag · StatusPill · ArrowLink · ArrowCue · icons
  home/     Hero · Avatar · NowStrip · Bento + six bento cards
  work/     ProjectCover · ProjectRow/Feature/Card/Compact · CaseSection
lib/data/   profile · projects · experience · stack · approach · playground · nav
```

Everything is a Server Component except four, each for a real reason:
`SiteHeader` (scroll state, mobile menu), `LocalTime` (a live clock),
`ApproachCard` (the tabbed control) and `AudioIntro` (playback). `SiteHeader`
and `LocalTime` use `useSyncExternalStore` rather than mirroring browser state
into `useState`.

**`AudioIntro`** is worth knowing about if you touch it. The `<audio>` tag is
server-rendered, so the browser can finish loading metadata *before* React
hydrates and attaches listeners — and media events don't bubble, so there is no
delegated handler to catch the one you missed. It therefore reads `duration`
both from the events and from the element when the ref attaches. Drop the ref
callback and the duration silently stops appearing on fast connections.

Its **beat animation is measured, not faked**. On first play the element is
tapped with a Web Audio `AnalyserNode` and a `requestAnimationFrame` loop drives
each bar's `scaleY` from real frequency data, so the movement belongs to
whatever file is loaded. Three things matter if you edit it:

- The source is connected to `ctx.destination` *before* the analyser. If
  anything after that throws, sound still comes out. Get the order wrong and a
  failure makes the player silent rather than merely still.
- `createMediaElementSource` throws if called twice on the same element, so
  setup is guarded by the context ref. That guard is load-bearing.
- Bars are full height and scaled with `transform`, not resized with `height` —
  transforms are composited, so 96 bars per frame stay cheap. The loop writes
  to the nodes directly and never re-renders React.

It does nothing under `prefers-reduced-motion`, and if Web Audio is unavailable
the bars simply stay at their drawn shape while playback continues normally.

The scrubber is a transparent `<input type="range">` laid over the bars, so
seeking works with a pointer *and* with arrow keys, and screen readers get a
control they already understand (`aria-valuetext` reads "0:04 of 0:11").

`ArrowCue` exists because `ArrowLink` renders an `<a>`. Inside a card that is
*already* a link, use `ArrowCue` — nested anchors are invalid HTML and cause a
hydration mismatch.

**Project covers** (`components/work/ProjectCover.tsx`) are inline SVG diagrams,
not stock art. Each draws the idea the project turns on: a message fanning out
over a socket, a thirteen-step form with its resume point, a schema crossing
between engines. They carry `vector-effect: non-scaling-stroke`, so the same
drawing keeps its line weight at 300px and at 700px.

---

## Content provenance — read this before publishing

Every fact on this site comes from your CV. Nothing was invented: no metrics,
no clients, no awards, no testimonials.

But facts had to be written *into prose*, and that framing is mine. Please read
and correct it in your own voice:

- **`lib/data/profile.ts`** — `headline`, `intro` and `about[]`. Your facts,
  my phrasing. The line "I build the quiet half of the product" is an editorial
  choice, not something you said.
- **`lib/data/projects.ts`** — the bullet-level facts in every `sections[]`
  entry are from the CV. The **Context** and **Reflection** sections are the
  most interpretive: they reason about *why* a decision made sense. Check that
  the reasoning is actually yours.
- **`lib/data/approach.ts`** — the four "How I work" steps are entirely written
  by me as a plausible point of view consistent with your work. Rewrite freely.
- **`lib/data/playground.ts`** — each fragment describes a real technical
  decision from the CV, framed as a short argument. Same caveat.

Two specific things to check:

1. **"Wedowebapps"** is set in sentence case everywhere. Your CV writes it
   `WEDOWEBAPPS`; at 43px that reads as shouting. If you'd rather keep the caps,
   change it in `lib/data/experience.ts` and `lib/data/projects.ts`.
2. **"A year and a half"** in `profile.intro` is hardcoded from the CV and will
   go stale. Update it, or rephrase so it doesn't carry a duration.

---

## Before deploying

- **`siteUrl`** in `lib/data/profile.ts` is set to `https://mananpatel.dev`.
  Change it — it drives canonical URLs, OG tags, the sitemap and robots.txt.
- **Portrait.** The avatar is a terracotta monogram. To use a photo, drop one at
  `public/portrait.jpg` and pass it through:
  `<Avatar src="/portrait.jpg" />` in `components/home/Hero.tsx` and
  `app/about/page.tsx`. The tile geometry is identical either way.
- **Audio intro — replace this.** `public/audio/intro.m4a` is a placeholder I
  generated with macOS `say`; it is a synthetic voice reading "replace this
  file", not you. Record ~30 seconds and overwrite it. Any browser-playable
  format works — change `src` in `lib/data/audio.ts` if you use `.mp3`.
  The player reads the duration off the file, so nothing else needs touching.

  The waveform in `lib/data/audio.ts` is *drawn*, not analysed from the audio —
  96 amplitudes with a speech-like envelope. That is deliberate: analysing the
  real file would mean downloading and decoding the whole clip on every
  homepage load just to render a decoration. Reshape the numbers if you want a
  different silhouette.

  There is no visible label on the player, matching the reference. If you'd
  rather it announced itself, add one in `components/home/HeroStrip.tsx`.
- **`availability`** in `lib/data/profile.ts` controls the status pill. Set
  `open: false` and change `label` when that stops being true.

## The Experience card

`components/home/bento/ExperienceCard.tsx`, fed by `timeline` in
`lib/data/experience.ts` — which is derived from the entries and projects in
that same file, so there is only one place to update.

Two things will bite you if you edit it:

- **The scroll area uses `max-height`, never `height` or `flex-1`.** With a
  short list the card hugs its content; once there are more entries than fit,
  it caps and scrolls. A fixed height left a void whenever the list was short,
  and `flex-1` is worse still — in an auto-height flex column `overflow-y`
  never engages at all and the list simply grows to fit.
- **`INCLUDE_PROJECTS`** in `lib/data/experience.ts` folds every shipped
  project into the timeline. It is off, so the card shows the job and the
  degree; turn it on and the list becomes long enough to scroll and fade.
- **The edge fades are state-driven.** `--edge-top` and `--edge-bottom` are
  registered with `@property` so they can transition, and each is only turned on
  when there is really something hidden that way. At the top of the list nothing
  is obscured; the bottom fade is what tells you to keep scrolling.

The scrollbar is styled through `::-webkit-scrollbar` and deliberately does
*not* set `scrollbar-width` — Chrome ignores the pseudo-element whenever the
standard property is present, which left the bar invisible.

## The two players share one implementation

`lib/use-audio-player.ts` holds all the playback logic — state, scrubbing, the
Web Audio analyser and the requestAnimationFrame beat loop. The hero intro and
the listening card are both thin shells around it.

They differ in their scrubber on purpose. The hero uses
`components/media/Waveform.tsx`; the card uses `components/media/ProgressBar.tsx`,
because one animated waveform on a page is enough and the reference design uses
a plain bar there. Both wrap a transparent range input, so dragging and arrow
keys work either way.

Passing no peaks to the hook also opts a player out of the analyser entirely —
the card creates no `AudioContext` at all, since it has nothing to draw with.

One trap worth knowing: the frame loop is a **hoisted function declaration
inside `start`**, not a `useCallback`. A self-scheduling
`requestAnimationFrame(draw)` inside `const draw = useCallback(...)` references
the binding before it is initialised, and the lint rules reject it.

## The listening card

`components/home/bento/MusicCard.tsx`, with tracks in `lib/data/music.ts`.

The four songs are **placeholders** — replace them with what you actually
listen to. Nothing copyrighted is bundled: no artwork, no audio. Each track
falls back to a drawn record (`AlbumArt`) until you set `cover` to an image in
`/public`, and `href` points at a Spotify search for the song.

**Album art sizing is height-driven, not width-driven.** `align-self: stretch`
gives it the row's height and `aspect-square` derives the width, so it fills
from under the pill to the bottom padding the way the reference does. Setting a
fixed width here fights the stretch and renders a *rectangle* — the artwork
comes out squashed at phone widths. The max-heights stop it dominating a narrow
card, and the tablet-only min-height stops it collapsing on the card that is
full-width but short at that breakpoint.

It is a **real player**: prev and next move between tracks, play plays, and the
progress bar scrubs. Both players call `soloAudio()`
before starting, so the hero intro and the card can never talk over each other.

**The audio under those four songs is not the real recording.** Those are other
people's masters and nothing of the sort is bundled. Each `preview` points at a
short original bed generated for this project so the player works end to end,
which is why every track carries `demo: true` and the card renders a quiet
"demo audio" marker — a visitor is never told they are hearing the real track.

Replacing one is two lines: drop your clip in `/public/audio/previews`, point
`preview` at it and delete `demo`. Cover art works the same way through
`cover`. Licensing whatever you put there is yours to sort out.

**Changing track replaces the `<audio>` element**, so the card calls
`resetSource()` rather than `reset()`. That matters the moment anything here
uses the analyser: an element can only ever back one `MediaElementSourceNode`,
so a stale `AudioContext` would leave the new element without one. The hero
does the opposite — it keeps a single element for its lifetime and must use
`reset()`, because calling `createMediaElementSource` twice on the same element
throws.

## Accessibility

Semantic landmarks, a skip link, visible focus rings on the accent colour, real
tab semantics with arrow-key support on the approach control, a keyboard-seekable
audio scrubber, `aria-current` on
the active nav item, and a full `prefers-reduced-motion` block that disables
every transition and the hover lift. Verified: no horizontal overflow on any
route at 360 / 390 / 430 / 768 / 1024px.
