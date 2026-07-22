# Certification — badge strip + expanded-copy layout — web art direction

> Reviewable artifact (design-web, GENERATE mode) — **NOT** globals.css/components.
> Landed by the main thread (owner-authorized: "wdrożenie domknę ja jako główny wątek").
> Date: 2026-07-22. Slice: `certification-10xdevs`. Section: home slot 02 `#certification`.

## Brief

Two coupled changes after the section's copy was expanded (intro 3 sentences, badge
captions ~2 sentences, area descriptions ~2 sentences):

1. **Nano Banana badges.** Swap the broken flood-fill `public/images/badge-*.webp` for
   the clean transparent cutouts (`scripts/_tmp/sq-badge-*.png`), Best Project bigger.
2. **Fit the longer copy.** The 4-up badge grid inside the half-width credential card was
   too cramped for 2-sentence captions.

## Art direction (both themes)

### Layout & composition

- **Pull the badge strip out of the credential card into a standalone full-width block**
  between the 2-col `[credential | certificate]` row and the 5 area cards. This gives the
  longer captions room and resolves review finding **F3** (badges intended as a standalone
  strip, not nested in the card). New layer-cake read: header → credential+certificate →
  **distinctions strip** → competency areas.
- One repeated primitive: a centered `icon → name → caption` column, ×4 on a
  `grid-cols-2 sm:grid-cols-4` grid. Icons share a **bottom baseline** via a fixed-height
  flex container (`h-24 items-end sm:h-28`) so names align across the row even though Best
  Project's icon is larger.
- **Best Project bigger:** acclaimed `size-20 sm:size-24` (80/96px), Best Project
  `size-24 sm:size-28` (96/112px); the asset itself is 720² vs the acclaimed 600².
- Badges are **borderless** (icon + text only) — deliberately *not* boxed like the area
  cards, so the section isn't "every element boxed" (anti-slop §C) and the two blocks read
  as distinct.

### Tokens (dark / light)

- Name: `text-foreground` (font-heading, `text-base font-semibold`). Caption:
  `text-muted-foreground` (`text-sm leading-relaxed`, up from `text-xs`). No new color;
  badges are imagery. One accent stays where it already lives (brand on the area-card
  icons / eyebrow) — the strip introduces no competing accent.

### Type & rhythm

- 8pt grid throughout: strip `mt-12`, areas `mt-16` (was `mt-6` — more air now that a block
  sits between), `gap-8 sm:gap-6 lg:gap-8`, icon containers `h-24/h-28`, sizes 80/96/112 —
  all multiples of 8/4. Caption line-height `leading-relaxed` (~1.6), on the body band.

### Motion & a11y

- Reuses the `StaggerGroup`/`StaggerItem` (`ScrollReveal`) idiom — same fade+rise, `once`,
  `-100px` viewport margin, `prefers-reduced-motion` branch — as the area cards. No new
  motion system.
- `alt={badge.name}` on every icon; the strip is a `<ul>`/`<li>` list. Caption uses the
  token-contract's tested `muted-foreground` pair (≥4.5:1 both themes).

### The named-weakness fix

Cramped half-width 4-up captions → full-width strip with `text-sm` captions and aligned
baselines; broken washed-out badges → clean nano-banana alpha cutouts (emblem keeps its own
dark hexagon body, so it reads on **both** the dark slate and the warm off-white).

## Design-Gap-Test report

**Render substrate:** dev-live-chrome (real) — `localhost:3000/pl`, both themes
screenshotted at 1440w, console clean (0 errors/warns).

### Dark theme
| # | Dimension | Score | Rendered evidence (measured) |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Icons render 96px (acclaimed) / 112px (best); gaps `gap-8`=32 / `gap-6`=24; strip `mt-12`=48, areas `mt-16`=64 — all on the 8pt grid. |
| 2 | Hierarchy | MATCHED | Squint test: Best Project icon 112px vs 96px acclaimed reads as the emphasized one; name (font-heading base) > caption (sm muted). |
| 3 | Token-adherence / anti-slop | MATCHED | Only `text-foreground`/`text-muted-foreground`; badges borderless (not every-element-boxed), no colored left-border, no purple, no glassmorphism, one accent uncontested. |
| 4 | Alignment | MATCHED | 4 columns measured equal (280px each at 1440w); names sit on a common baseline (icons `items-end` in fixed-height box); no horizontal overflow (`scrollWidth ≤ innerWidth`). |
| 5 | Contrast | MATCHED | Captions use `muted-foreground/background` (token-contract tested ≥4.5:1 dark); badges are non-text imagery. |

### Light theme
| # | Dimension | Score | Rendered evidence (measured) |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Identical grid values; layout unchanged across theme flip. |
| 2 | Hierarchy | MATCHED | Same size deltas hold on warm off-white; Best Project still reads as emphasized. |
| 3 | Token-adherence / anti-slop | MATCHED | Same tokens; no theme-specific arbitrary color; badge cutouts keep their own emblem body so they don't wash out on light. |
| 4 | Alignment | MATCHED | Columns/baselines identical to dark (layout is theme-agnostic). |
| 5 | Contrast | MATCHED | `muted-foreground/background` tested ≥4.5:1 light (the higher-risk theme); dark name text on off-white clears the floor. |

**Drift diagnosis:** The risk here was **decoration-by-boxing** — the reflex would have been
to wrap each badge in a bordered card to "contain" the longer caption, which would have made
the section a wall of boxes (area cards + credential card + badge cards) and leaned on
borders for hierarchy instead of size+whitespace (principle 3, anti-slop §C). Held the line
by keeping the strip borderless and carrying emphasis with the icon-size delta + generous
gaps; the one place a box belongs (the competency-area cards) stays the only boxed block, so
the badge strip and the area grid read as two distinct layers rather than one undifferentiated
card field.

## Open Questions

1. **<400px reflow.** CDP couldn't force a sub-400px layout viewport this session (it stayed
   at desktop width), so the `grid-cols-2` mobile view of the strip with 2-sentence captions
   was **not** eyeballed live. Standard responsive Tailwind, low risk — but
   `> TODO(user): eyeball the badge strip at 375px in dev-live-chrome`.
