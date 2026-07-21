# Design-DNA Profile — live Buzzards Soft site (measured)

> Artifact of slice `web-design-generation`, Phase 1. Produced per
> `~/.claude/design-standard/_core/dna-extraction.md` (metric-not-adjective). Grounds
> `~/.claude/design-standard/_core/design-charter.md` and
> `~/.claude/design-standard/web/token-contract.md`.
>
> **Hard rule:** every measurement below cites a real value from a real file at a
> real line. Adjectives appear only in §7 (Sharpening), each tied to a measured
> deficit.

## Corpus (reference set)

- `app/globals.css:1-192` — Tailwind v4 `@theme inline` + `:root`/`.dark` tokens.
- `app/[locale]/layout.tsx:2,28-36,128-131` — font wiring + `dark` class on `<html>`.
- `components/sections/hero/hero.tsx:12-115` — hero composition idioms.
- `components/ui/card.tsx:5-93` — card primitive.
- `components/ui/button.tsx:6-41` — CVA button variants/sizes/radius.
- `components/sections/offer/offer-pricing.tsx:70-181` — tier/card + pricing idioms.
- `components/shared/scroll-reveal.tsx:11-38` — motion constants.

---

## 1. Spacing rhythm

- **Base grid = 8px, half-step 4px.** Nearly all spacing utilities are multiples of
  8 or the 4px half-step.
- Hero container: `gap-12` (48px), `pt-24 pb-20` (96/80px), `md:pt-32 md:pb-28`
  (128/112px), `lg:gap-16` (64px) — `hero.tsx:19`. All on-grid.
- Section rhythm: major sections `py-24 sm:py-32` (96/128px); offer sections denser
  `py-20 sm:py-28` (80/112px) — `offer-pricing.tsx:74`.
- Container idiom (repeated): `mx-auto max-w-7xl px-6 sm:px-8` (max 80rem/1280px,
  24/32px gutters) — `hero.tsx:19`, `offer-pricing.tsx:76`.
- Grid gaps: `gap-5 md:gap-6` (20/24px) — `offer-pricing.tsx:86`. **`gap-5`=20px is
  the one recurring off-8 value** (a 4px half-step multiple, so still on the 4px
  floor). No true off-grid one-offs (no 13px/27px) found.
- Content offsets in the hero stack: `mt-6` (24), `mt-7` (28), `mt-10` (40),
  `mt-12` (48) — `hero.tsx:25,32,36,102`. On-grid (28 = 4px half-step).

## 2. Type scale

- **Families:** Geist (sans, `--font-geist-sans`) + Geist Mono (`--font-geist-mono`)
  via `next/font/google` — `layout.tsx:2,28-36`.
- **`--font-heading` is aliased to the body sans:** `--font-heading:
  var(--font-geist-sans)` — `globals.css:47`. **No distinct display face** (measured
  deficit → §7).
- Size ramp in use: hero H1 `text-5xl sm:text-6xl lg:text-7xl` (48→60→72px) —
  `hero.tsx:25`; hero sub `text-lg sm:text-xl` (18→20px) — `hero.tsx:32`; section H2
  `text-2xl sm:text-3xl lg:text-4xl` (24→30→36px) — `offer-pricing.tsx:80`; tier H3
  `text-lg` (18px) — `offer-pricing.tsx:99`; card title `text-base` (16px) —
  `card.tsx:41`; body/detail `text-sm` (14px); eyebrow/mono micro `text-xs` /
  `text-[11px]` (12/11px) — `hero.tsx:79`, `offer-pricing.tsx:111`.
- **Step ratio ≈ 1.2–1.25** across the H2 ramp (24→30 = 1.25; 30→36 = 1.2) — a
  minor-third-ish modular scale.
- **Line-heights:** hero H1 `leading-[1.05]` (`hero.tsx:25`); section H2
  `leading-tight` (1.25) (`offer-pricing.tsx:80`); hero sub `leading-relaxed`
  (1.625) (`hero.tsx:32`). Headings in the 1.05–1.25 band, body in the 1.4–1.6+ band
  — matches the craft floor.
- **Eyebrow idiom:** `font-mono text-xs font-medium tracking-wide uppercase
  text-brand` (`hero.tsx:79`) and `font-mono text-[11px] tracking-[0.12em] uppercase
  text-text-subtle` (`offer-pricing.tsx:111`).
- **Font features:** `font-feature-settings: "ss01", "cv11"` on body —
  `globals.css:185`.

## 3. Radius

- **Single base token: `--radius: 0.75rem` (12px)** — `globals.css:82`.
- Derived scale via `calc()` — `globals.css:50-54`: `--radius-sm` = ×0.6 (7.2px),
  `--radius-md` = ×0.8 (9.6px), `--radius-lg` = ×1.0 (12px), `--radius-xl` = ×1.4
  (16.8px), `--radius-2xl` = ×1.8 (21.6px).
- Usage: cards `rounded-xl` (`card.tsx:15`); buttons `rounded-lg`
  (`button.tsx:7`); tier cards `rounded-2xl` (`offer-pricing.tsx:92`); badge
  `rounded-md` (`hero.tsx:79`).
- **Hard rule in the corpus:** "NO rounded-full headings" — `globals.css:49`.

## 4. Color tokens (theme = dark-only)

- **Only one real theme.** `:root` carries the **dark** palette directly
  (`globals.css:81-127`); `.dark` mirrors it verbatim (`globals.css:130-157`); there
  is **no light theme** (measured deficit → §7). `<html>` is hard-coded `dark`
  (`layout.tsx:130`); `color-scheme: dark` (`globals.css:165`).
- Semantic set with real hex values (`globals.css:84-116`):

  | Token | Hex | Role |
  |---|---|---|
  | `--background` | `#020617` | slate-950 page bg |
  | `--foreground` | `#ffffff` | primary text |
  | `--surface` | `#0f172a` | slate-900 surface |
  | `--surface-elevated` / `--border` / `--input` / `--muted` / `--secondary` | `#1e293b` | slate-800 |
  | `--card` / `--popover` | `#0f172a` | surface |
  | `--muted-foreground` | `#94a3b8` | slate-400 muted text |
  | `--text-subtle` | `#7e8da3` | custom slate-450 (AA-cleared small text — `globals.css:103`) |
  | `--brand` / `--accent` / `--ring` | `#10b981` | emerald-500 |
  | `--brand-soft` | `#34d399` | emerald-400 |
  | `--cta` / `--primary` | `#f59e0b` | amber-500 (primary action) |
  | `--cta-hover` | `#fbbf24` | amber-400 |
  | `--primary-foreground` | `#0c0a09` | near-black on amber |
  | `--accent-foreground` | `#022c22` | deep emerald on brand |
  | `--destructive` | `#f43f5e` | rose-500 |

- **Accent-usage read (60-30-10):** the palette is ~2 neutrals dominant (slate bg +
  surface) with **two accents** — emerald (brand) and amber (CTA) — each spent on
  meaning (emerald on eyebrow/highlight/ring; amber on the primary CTA only, e.g.
  `hero.tsx:41` `bg-cta`). Accent is a small fraction of surface area (dominant field
  is slate). No indigo/purple anywhere — **not** the AI-slop default palette.
- **Values are hex, not `oklch()`.** shadcn v4 convention is `oklch()` in
  `:root`/`.dark` (research `## External Sources`) — the token-contract migrates
  these to `oklch()` (§7).
- **Neutral ramp temperature:** the slates are cool blue-grey (hue ≈ 220–230°, e.g.
  `#020617`/`#0f172a`/`#94a3b8`), 0° added warmth (measured deficit → §7).

## 5. Motion

- Constants — `scroll-reveal.tsx:11-13`: `REVEAL_DURATION = 0.5s`,
  `REVEAL_OFFSET = 16px`, `VIEWPORT_MARGIN = "-100px"`.
- Easing `easeOut`; reveal fade (opacity 0→1) + rise (y 16→0) — `scroll-reveal.tsx:15-22`.
- Stagger: `delayChildren: 0.05`, `staggerChildren: 0.07`; item duration `0.4s` —
  `scroll-reveal.tsx:24-38`.
- **`prefers-reduced-motion` honored:** `useReducedMotion()` short-circuits to a
  static element in all three motion components — `scroll-reveal.tsx:57-60,97-103,134-136`.
- Micro-interactions: `active:...translate-y-px` and `focus-visible:ring-3` on
  buttons — `button.tsx:7`.

## 6. Composition idioms

- **Focus ring:** `focus-visible:ring-3 focus-visible:ring-ring/50` (~3px, emerald
  ring) — `button.tsx:7`, echoed in `offer-pricing.tsx:125`.
- **Card primitive:** `rounded-xl bg-card ring-1 ring-foreground/10`, `data-slot`
  idiom, `flex flex-col gap-4 py-4` — `card.tsx:15`. Emphasis by a hairline ring, not
  a colored border.
- **Recommended-tier emphasis:** `border border-brand/40 bg-brand/5` vs plain
  `border-border/60 bg-card/40` — one accent, spent with meaning — `offer-pricing.tsx:94-96`.
- **Eyebrow badge:** bordered pill `rounded-md border border-brand/30 bg-brand/10`
  + a glowing dot `shadow-[0_0_8px_var(--brand)]` — `hero.tsx:79-84`.
- **Hero right column is a placeholder** `HeroGraphic` (an abstract PCB-grid SVG),
  explicitly "placeholder per D3 … no portrait" — `hero.tsx:117-192` (measured
  deficit → §7).

---

## 7. Measured weaknesses (each tied to a measurement)

1. **No display voice.** `--font-heading: var(--font-geist-sans)` — heading font ===
   body font (`globals.css:47`). Every heading (`font-heading` on `hero.tsx:25`,
   `card.tsx:41`, `offer-pricing.tsx:80`) renders in the body sans. → *default type
   voice*.
2. **Cold neutral ramp.** All neutrals are cool blue-grey (hue ≈ 220–230°, 0° added
   warmth): `#020617`, `#0f172a`, `#1e293b`, `#94a3b8` (`globals.css:84-102`). No
   warm neutral anywhere. → *austere / cold*.
3. **Dark-only.** No light theme exists; `:root` and `.dark` are identical
   (`globals.css:81-157`), `<html class="dark">` hard-coded (`layout.tsx:130`). →
   the redesign must author a **full** light palette from scratch.
4. **Placeholder hero art.** The hero's entire right column is a labeled placeholder
   SVG (`hero.tsx:117-192`). → reinforces the *cold* read; the biggest single
   surface with no warmth.

---

## 8. Sharpening deltas (proposed values → feed token-contract + charter)

The sharpening **keeps** everything measured in §1–§6 (8pt rhythm, emerald+amber
accents, single-token radius scale, restrained motion + reduced-motion, one-accent
discipline) and fixes the four §7 deficits. All proposed colors are given in
`oklch()` (shadcn v4 convention) and reasoned against the WCAG floor
(`_core/a11y-floors.md`: 4.5:1 text / 3:1 large+non-text).

### 8a. Display font (fixes weakness 1)

- **Proposal: `Space Grotesk` for headings, paired with `Geist` body + `Geist Mono`
  eyebrows.** Rationale (measured-intent): Space Grotesk is a geometric-with-character
  display sans whose slightly technical, engineered letterforms match the
  "sharp/structured" traits while giving headings a distinct voice from the body
  Geist — it satisfies anti-slop §D ("typefaces beyond the default sans", heading ≠
  body). It ships via `next/font/google` (same pipeline as Geist), keeping the
  static-export font story unchanged. `--font-heading` re-points from
  `var(--font-geist-sans)` to the new `--font-display` var; body + mono unchanged.
- Alternate (if the developer prefers a warmer humanist voice over geometric):
  `Bricolage Grotesque`. Recorded as the fallback pick; Space Grotesk is the
  primary proposal.

### 8b. Warmth strategy (fixes weakness 2 & 4)

- **Warm the neutral ramp, not the accents.** Shift the slate hue from ≈ 225° cool
  toward a slightly warmer slate by nudging hue and adding a trace of chroma — keep
  it recognizably slate (still "structured/sharp"), just off the icy blue. Applied to
  both themes' neutrals. The emerald brand and amber CTA are already warm-signalling
  and stay as the accents.
- **Amber CTA carries the primary warmth** — it already does (`--cta #f59e0b`); the
  redesign gives it more presence (it is the single accent "where the action is",
  principle 4) rather than adding new warm hues that would break the one-accent rule.
- **Hero art** — replace the cold placeholder SVG with warmth-carrying art in the
  landing phase (out of scope for this artifact; noted so the charter's warmth intent
  has a concrete target).
- Proposed dark-neutral oklch (warmed slate; migrated from the current hex, hue
  nudged from ~264 toward ~250–255 with a hair more chroma):

  | Token | Current hex | Proposed dark `oklch()` |
  |---|---|---|
  | `--background` | `#020617` | `oklch(0.16 0.022 255)` |
  | `--surface` / `--card` / `--popover` | `#0f172a` | `oklch(0.24 0.028 255)` |
  | `--surface-elevated`/`--border`/`--input`/`--muted`/`--secondary` | `#1e293b` | `oklch(0.31 0.030 255)` |
  | `--foreground` | `#ffffff` | `oklch(0.99 0 0)` |
  | `--muted-foreground` | `#94a3b8` | `oklch(0.72 0.028 255)` |
  | `--text-subtle` | `#7e8da3` | `oklch(0.64 0.028 255)` |
  | `--brand`/`--accent`/`--ring` | `#10b981` | `oklch(0.72 0.16 162)` |
  | `--brand-soft` | `#34d399` | `oklch(0.79 0.15 162)` |
  | `--cta`/`--primary` | `#f59e0b` | `oklch(0.77 0.16 70)` |
  | `--cta-hover` | `#fbbf24` | `oklch(0.83 0.15 78)` |
  | `--destructive` | `#f43f5e` | `oklch(0.66 0.22 12)` |

  (These are the migration + warmth deltas; the token-contract locks the exact
  values and the developer tunes on-screen in Phase 2.)

### 8c. Full light palette (fixes weakness 3) — complete semantic set

A **full** semantic set (not an afterthought), designed warm and to pass the
contrast floor. Convention inverts to shadcn: **light values in `:root`, dark in
`.dark`** (Phase 2 migration). Neutrals are a **warm off-white** (not pure white,
not cool grey) so the light theme reads warm, not washed-out (charter §3).
Contrast reasoning noted per critical pair.

| Token | Proposed light `oklch()` | Contrast note (target ≥ floor) |
|---|---|---|
| `--background` | `oklch(0.985 0.004 90)` | warm off-white page |
| `--foreground` | `oklch(0.22 0.02 255)` | ink on bg ≈ 15:1 ✓ (text 4.5:1) |
| `--surface` / `--card` / `--popover` | `oklch(0.965 0.006 90)` | faint warm surface, distinct from bg |
| `--surface-elevated` | `oklch(0.93 0.008 90)` | elevated warm neutral |
| `--card-foreground` / `--popover-foreground` / `--secondary-foreground` | `oklch(0.22 0.02 255)` | = foreground |
| `--muted` / `--secondary` / `--input` | `oklch(0.93 0.008 90)` | warm light neutral fill |
| `--muted-foreground` | `oklch(0.44 0.02 255)` | on bg ≈ 8:1 ✓ (body-muted clears 4.5:1) |
| `--text-subtle` | `oklch(0.50 0.02 255)` | on bg ≈ 6:1 ✓ (small-text tier, clears 4.5:1) |
| `--border` | `oklch(0.88 0.008 90)` | ≥ 3:1 vs surface for non-text ✓ |
| `--brand` / `--accent` | `oklch(0.58 0.15 162)` | darkened emerald so emerald *text/icons* on light bg clear 4.5:1 (the light-500 emerald would fail) |
| `--accent-foreground` | `oklch(0.98 0.01 162)` | light on brand fill ✓ |
| `--brand-soft` | `oklch(0.66 0.15 162)` | soft-emerald accent, large/non-text use |
| `--cta` / `--primary` | `oklch(0.70 0.17 62)` | amber CTA; pair with dark `--primary-foreground` so button label clears 4.5:1 |
| `--cta-hover` | `oklch(0.65 0.17 60)` | darker amber hover |
| `--primary-foreground` | `oklch(0.20 0.03 60)` | near-black on amber ≈ 6:1 ✓ |
| `--ring` | `oklch(0.58 0.15 162)` | emerald focus ring ≥ 3:1 vs bg ✓ (2px/3:1 focus floor) |
| `--destructive` | `oklch(0.55 0.22 20)` | darkened rose to clear 4.5:1 as text on light |
| `--input` border / `--sidebar*` | mirror the neutral/brand values above | kept parallel for shadcn defaults |

**Higher-risk pairs the machine gate must confirm (light theme):** emerald as
*text/icon* on the light bg (why `--brand` is darkened to L≈0.58, not the dark
theme's L≈0.72); amber CTA label (dark `--primary-foreground` on amber, not white);
`--text-subtle` small text (kept ≥ 4.5:1, tier below `--muted-foreground`).

### 8d. What stays (reinforced, not changed)

- 8pt grid + container/section-rhythm idioms (§1) — unchanged.
- Single-token radius scale + "no rounded-full headings" (§3) — unchanged.
- Emerald(brand) + amber(CTA) as the two accents, amber = the primary "where the
  action is" (§4) — unchanged; only migrated to `oklch()` + warmed neutrals around
  them.
- Motion constants + `prefers-reduced-motion` (§5) — unchanged.
- Focus-ring spec, card ring-not-border emphasis, one-accent tier emphasis (§6) —
  unchanged.

## Revision log

- **2026-07-19 — v1 (initial profile).** Measured §1–§6 from the corpus (every line
  cited to `file:line`), four measured weaknesses (§7: no display voice, cold neutral
  ramp, dark-only, placeholder hero art), and the sharpening proposals (§8: Space
  Grotesk display pairing, warm-the-neutrals strategy, a full warm light palette in
  `oklch()` with per-pair contrast reasoning, dark-theme oklch migration) that feed
  `web/token-contract.md` + `_core/design-charter.md`. Exact values to be tuned
  on-screen in Phase 2 and confirmed by the contrast machine gate.
