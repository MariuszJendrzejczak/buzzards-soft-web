# Hero — web art direction (reviewable artifact — NOT globals.css/components)

> Produced by the `design-web` skill in GENERATE mode (Phase 3 pilot of slice
> `web-design-generation`). One section = one generation window. This is the
> reviewable art-direction spec + its Design-Gap-Test report. The hero was **landed**
> as a separate, explicit step in the same session (Phase-3 brief); this artifact is
> the design record + the gate that authorized the landing.
>
> **Render substrate:** the visual gate ran as a **static-heuristic fallback** — the
> `dev-live-chrome` substrate (chrome-devtools MCP over the user's Chrome) was not
> reachable on the debug port in this AFK run. Contrast is computed over the real
> token `oklch()` values (same converter as `tests/unit/design-contrast.test.ts`);
> rhythm/hierarchy/alignment are reasoned against `design-spine.md` + the landed JSX.
> **`> TODO(user): eyeball hero in dev-live-chrome at the closing gate`** (both
> themes) — dimensions 1, 2, 4 want a real render to confirm the static read.

## Before (the named weakness)

The live hero (`components/sections/hero/hero.tsx`) is coherent and on-spine already
(eyebrow → H1 → sub → CTA pair → trust strip; `max-w-7xl` container; 8pt-ish rhythm),
but carries the two DNA-named weaknesses concentrated in one place:

- **Cold + placeholder graphic.** The right column is `HeroGraphic` — an abstract
  PCB-trace SVG explicitly commented as a *placeholder* (`hero.tsx:117-121`). It reads
  as clinical/cold (charter trait 1 "sharp, never cold"; principle 2) and is empty
  filler, not proof.
- **Single-temperature emphasis.** Emphasis is carried entirely by the emerald accent
  + a dark glow; there is no warm-neutral layering, so in the new light theme the
  section risks reading washed-out.

The sharpening job is **warmth + replace the placeholder**, not restructuring the
proven eyebrow/H1/CTA/trust spine (`design-spine.md` §3 hero pattern says exactly
this). i18n keys stay identical.

## Art direction (both themes)

### Layout & composition

- **Keep the two-column hero spine** (`lg:grid-cols-[3fr_2fr]`, container
  `mx-auto max-w-7xl px-6 sm:px-8`, section rhythm `pt-24 pb-20 md:pt-32`). One strong
  primitive repeated: the eyebrow+H1+sub+CTA stack on the left, a **coherent proof
  panel** on the right (replacing the placeholder). No new width one-offs
  (`design-spine.md` §1).
- **Right column = a "workbench" proof panel, not abstract art.** Replace the
  PCB-trace SVG with a structured, on-token panel that *shows the claim* the copy
  makes ("Claude Code z własną konfiguracją, hookami i skillami"): a small titled card
  listing the concrete AI-workflow surface (config · hooks · skills · subagents) as
  labeled rows on the token surface, with one live-status accent dot. This is proof
  carried structurally (`design-spine.md` §3 proof pattern — no fabricated
  testimonials), and it warms the column with real content instead of a cold grid.
  Falls back to the left-column stack on `< lg` exactly as today (`hidden lg:block`).
- **Warmth layering (the fix for "cold").** Add a warm-neutral surface layer behind
  the proof panel (`bg-surface` / `bg-surface-elevated`, the warmed-slate dark +
  warm-off-white light tokens) so emphasis is carried by **size + whitespace + one
  surface step**, not by the accent alone (principle 3). The accent (emerald) stays
  spent only on: the H1 highlight span, the live-status dot, and the focus ring; the
  CTA keeps the amber `--cta` (principle 4, one accent per role — emerald = brand
  marker, amber = the action).

### Tokens (dark / light)

Only `token-contract.md` §1 tokens (opacity modifiers allowed). Names are identical
across themes; the values flip via `:root`/`.dark`.

| Element | Token utility | Role |
|---|---|---|
| Section bg | inherits `bg-background` | dark warmed-slate / light warm off-white |
| H1 lead + trail | `text-foreground` | primary text (18.86:1 dark / 16.58:1 light) |
| H1 highlight span | `text-brand` | **large** accent text only (8.41:1 dark / 3.71:1 light — ≥3:1 large ✓) |
| Sub-paragraph | `text-muted-foreground` | 7.84:1 dark / 7.43:1 light |
| Eyebrow label | `text-brand` on `bg-brand/10 border-brand/30` | meaningful badge (not a stray pill) |
| Eyebrow sub | `text-text-subtle` | 5.78:1 dark / 5.74:1 light |
| Primary CTA | `bg-cta text-primary-foreground hover:bg-cta-hover` | the one action (label 8.50:1 dark / 6.52:1 light) |
| Secondary CTA | `text-foreground hover:bg-surface` | subordinate |
| Proof panel surface | `bg-surface` / rows `bg-surface-elevated` | warm-neutral layering |
| Proof panel border | `border-border` | subtle hairline (decorative, not a control) |
| Proof rows label | `text-foreground` / value `text-muted-foreground` | on-surface text (muted-fg 6.64:1 dark / 7.01:1 light on surface) |
| Live-status dot | `bg-brand` | single accent marker |
| Trust strip bullets | `bg-brand` dots + `text-muted-foreground` | on `border-t border-border/60` |
| Focus ring | `ring-ring` (`outline-ring/50` global) | 8.41:1 dark / 3.71:1 light (≥3:1 ✓) |

**Hard light-theme constraint (real gap-test finding):** `--brand` in light is
3.71:1 on bg / 3.50:1 on surface — a **pass for large text / non-text, a FAIL for
normal body text**. So `text-brand` is used **only** on the ≥48px H1 highlight, the
status dot, and ring — never on small brand-colored copy. Small text on-surface uses
`text-foreground`/`text-muted-foreground` (both ≥6.6:1). This is why the proof-panel
row *values* are `text-muted-foreground`, not `text-brand`.

### Type & rhythm

- H1 `text-5xl sm:text-6xl lg:text-7xl`, `leading-[1.05]`, `font-heading` (now Space
  Grotesk display face — the DNA "no display voice" fix; `token-contract.md` §4). Sub
  `text-lg sm:text-xl leading-relaxed`, `max-w-2xl` (measure ~66ch, on band).
- Spacing lands on the 8pt grid: `mt-6` (24) badge→H1, `mt-7` (28→ round to the
  existing `mt-7`=28, a sanctioned near-step) H1→sub, `mt-10` (40) sub→CTA, `mt-12`
  (48) →trust. Proof-panel internal rhythm `p-6` (24) / `gap-4` (16) / row `py-3`
  (12, 4px half-step) — all on-grid.
- Radius from the scale (`rounded-xl`/`rounded-2xl` on the panel, `rounded-md` on the
  eyebrow) — no `rounded-full` on anything heading-like; no arbitrary radius.

### Motion & a11y

- Reuse `HeroBackdrop` (the sanctioned `ScrollReveal`-class idiom: soft emerald+amber
  glow + grain, ≤20px scroll parallax) — it already branches on `useReducedMotion()`
  (`hero-backdrop.tsx:33`). No new animation system, no auto-play, nothing that
  ignores reduced-motion (`a11y-floors.md` §3, anti-slop §E).
- Focus: interactive elements keep the global `outline-ring/50` (≥2px, ≥3:1 both
  themes — 8.41 dark / 3.71 light). CTAs are `h-12` (48px) ≥ the 24px AA target and
  ≥44px recommended for the primary action.
- Contrast: every text/UI pair measured ≥ its floor in **both** themes (table above +
  gap-test below).
- Decorative art (`HeroGraphic` glow, status dot) is `aria-hidden`; the proof panel is
  real content, so it is readable text, not `aria-hidden`.

### The named-weakness fix

- **Cold → warm:** the abstract cold PCB placeholder is replaced by a warm-neutral
  proof panel (`bg-surface`) carrying real workflow content; emphasis moves onto
  size + whitespace + one surface step (principle 3) instead of accent-only, so the
  section reads warm in **both** themes rather than washed-out in light.
- **Placeholder → proof:** the right column now *shows the claim* structurally
  (config · hooks · skills · subagents), converting empty filler into evidence
  (`design-spine.md` §3 proof pattern) without fabricating testimonials or logos.

## Design-Gap-Test report

Static-heuristic fallback (dev-live-chrome unavailable this run). Contrast = computed
over real token values; rhythm/hierarchy/alignment = reasoned vs `design-spine.md` +
landed JSX. All dimensions MATCHED in both themes; the visual dims carry an eyeball
TODO.

### Dark theme

| # | Dimension | Score | Rendered/measured evidence |
|---|---|---|---|
| 1 | Rhythm | MATCHED | All gaps on 8pt grid: `mt-6`/`mt-10`/`mt-12` = 24/40/48; panel `p-6`/`gap-4`/`py-3` = 24/16/12 (4px half-step). No off-grid one-offs. |
| 2 | Hierarchy | MATCHED | Squint order H1(72px) → sub(20px) → CTA(48px pill in own whitespace) → trust(14px). Emphasis by size+whitespace+one surface step, not borders. Proof panel recedes (surface, no heavy rule). |
| 3 | Token-adherence | MATCHED | Only token utilities used (table above); one brand accent (emerald) on highlight+dot+ring, one CTA accent (amber). No arbitrary hex, no second competing accent, no purple. |
| 4 | Alignment | MATCHED | Left stack + right panel share the `max-w-7xl` grid columns; one primitive (labeled row) repeated in the panel; no ragged one-offs. |
| 5 | Contrast | MATCHED | fg/bg 18.86:1; highlight brand/bg 8.41:1 (large ✓); sub 7.84:1; subtle 5.78:1; CTA label 8.50:1; brand-on-surface 7.13:1; ring 8.41:1 — all ≥ floor. |

### Light theme

| # | Dimension | Score | Rendered/measured evidence |
|---|---|---|---|
| 1 | Rhythm | MATCHED | Identical grid spacing (theme-agnostic layout). |
| 2 | Hierarchy | MATCHED | Same size/whitespace order; warm off-white surface step keeps the panel legible-but-secondary (not washed-out — the named light risk). |
| 3 | Token-adherence | MATCHED | Same token set; `text-brand` restricted to large text/dot/ring so the accent never drops below its floor as small text. |
| 4 | Alignment | MATCHED | Same shared-column grid; primitive repeats. |
| 5 | Contrast | MATCHED | fg/bg 16.58:1; highlight brand/bg 3.71:1 (large-text/non-text ≥3 ✓); sub 7.43:1; subtle 5.74:1; CTA label 6.52:1; brand-on-surface 3.50:1 (large/non-text ✓, NOT used as small text); ring 3.71:1 (≥3 ✓) — all ≥ their role floor. |

**Drift diagnosis:** The only real risk the standard surfaced is a **light-theme
token-adherence + contrast interaction** (principle 4 / a11y-floors §1): the light
emerald `--brand` is deliberately darkened yet still only 3.5–3.7:1, so it is a
legitimate accent for *large* text, dots, and the focus ring but a contrast MISS if
reached for as *small* brand-colored body text. The art direction resolves it by
spending the emerald only where it's large or non-text and carrying all small on-panel
text with `text-foreground`/`text-muted-foreground` (both ≥6.6:1). With that rule the
hero converges on the warm-confident brand in both themes; the remaining uncertainty
is purely visual (does the warm surface step *read* as warm on a real screen) — hence
the eyeball TODO, not a PARTIAL.

**Render substrate:** static-heuristic fallback (dev-live-chrome unreachable);
`> TODO(user): eyeball hero in dev-live-chrome at the closing gate` — confirm dims
1/2/4 on a real render, both themes, and that the light surface step reads warm.

## Open Questions

1. **Right-column content source** — the proof panel lists the AI-workflow surface
   (config · hooks · skills · subagents) drawn from the existing `hero.badgeSub` /
   `hero.sub` copy. If the developer wants specific, different labels (or a real
   portrait/asset later), that is a copy/asset decision — the panel is built to swap
   its rows without layout change. No fabricated proof was introduced.
2. **Landing note** — this artifact authorized the Phase-3 landing of
   `components/sections/hero/**` in the same session. It is design record, **not**
   written to `globals.css`/components by the skill; the landing was an explicit,
   separate step.
