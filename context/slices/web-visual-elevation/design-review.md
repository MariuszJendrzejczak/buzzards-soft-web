# Design review — whole-site audit (2026-07-22)

**Method:** `/design-web` REVIEW mode, fanned out across **4 agents** (one lens each:
layout, readability, consistency, modernity), static-heuristic Design-Gap-Test from code +
a live **dev-live-chrome** visual pass (dark + light) driving the user's Chrome. Scored
**both themes**.
**Surface:** home (`/pl`), offer page (`/pl/web-pages-offer`), portfolio case
(`/pl/portfolio/honeti`), subpage pattern (privacy-policy).
**Commit under review:** `5676f2d` (deployed `main`).
**Nothing was changed** — this is a findings record for the `web-visual-elevation` slice.

## Overall verdict

The design is genuinely good and modern — **dark theme passes across the board**. Two
serious, recurring themes dominate the fix list:

1. **Light theme has real WCAG contrast BLOCKERS** (focus ring, emerald-as-small-text,
   amber text/asterisk).
2. **The portfolio subtree falls out of the token system** into a raw-Tailwind "rainbow"
   (including the `purple`/`violet` AI-slop tell) — a token-contract + one-accent violation.

Everything else is polish (layout rhythm, minor pattern drift).

### What is solidly good (state it, don't re-flag)
- Anti-slop mostly **CLEAR**: no default glassmorphism, no centered-hero→three-cards, no
  emoji-as-icons, motion honors `prefers-reduced-motion`.
- **Display face is live** — Space Grotesk (`--font-display`/`--font-heading`) + Geist body
  + Geist Mono. Charter "display face" delta satisfied.
- Token system is solid on home + offer + chrome + shared UI.
- Theme-parity work is genuinely done — verified live that the HONETi wordmark is
  `brightness-0` / `dark:brightness-100` (correctly theme-aware, no regression).
- Existing guardrails already exist: `tests/unit/design-contrast.test.ts`,
  `tests/unit/design-token-conformance.test.ts` — reconcile fixes with these (and note the
  portfolio raw-palette apparently escapes the conformance test today).

---

## Lens 1 — Layout & composition

**Verdict:** on-spine and disciplined (8pt grid, `mx-auto max-w-7xl px-6 sm:px-8`,
`py-24 sm:py-32` rhythm consistent); defects localized. No BLOCKER.

- **MAJOR — Portfolio triple-padding → ~192px dead band.** `PortfolioSection.tsx:27`
  (`pt-32 pb-24 sm:pt-40 sm:pb-32`) + inner header `pb-24 sm:pb-32` (`:31`) + child
  `HoneticHero.tsx:54` `py-24 sm:py-32` stack to ~192px (mobile) between intro and first
  tile group. Collapse padding ownership to one layer.
- **MINOR — Portfolio uses a different vertical register** (`pt-32 sm:pt-40`) than every
  other section (`py-24 sm:py-32`). Normalize.
- **MINOR — Section-in-section rhythm:** three portfolio sub-sections each a full
  `<section> py-24 sm:py-32` nested inside a padded parent → sub-sections breathe more than
  top-level ones (hierarchy inversion). Pick one nesting level.
- **MINOR — Off-cadence steps:** header→content step is `mt-10`/`mt-12`/`mt-14` across
  siblings (`how-i-work.tsx:72` = `mt-14`); hero sub-paragraph `hero.tsx:32` = `mt-7` (28px)
  off the 8-multiple ladder. Standardize on `mt-12`.
- **MINOR — Offer container widths jump:** prose sections `max-w-3xl`
  (`offer-problem/guide/ownership/faq/quote`) vs grid sections `max-w-7xl`
  (`offer-includes/pricing/modules`) → left text-edge shifts section to section. Prefer a
  shared left edge.
- **RENDER-GATE TODO:** confirm 320px hero H1 (longest PL/SV word) and the offer modules
  table name column don't overflow.

## Lens 2 — Readability & a11y contrast

**Verdict:** DARK passes everywhere. **LIGHT fails** — 3 blockers. Ratios computed by
converting each `oklch()` token in `globals.css` to relative luminance (WCAG formula),
opacity modifiers composited.

**BLOCKERS (light):**
- **`ring-ring/50` focus ring = 1.58:1** (floor 3:1) — invisible focus on every interactive
  element (`theme-toggle.tsx:63`, `language-toggle.tsx:84`, `contact-info.tsx:98`,
  `globals.css:190` `outline-ring/50`, …). Fix: full-opacity `ring-ring` (solid = 3.71:1) or
  darker light `--ring`.
- **`text-brand` as small text = 3.71:1 (on bg) / 3.50:1 (on surface)** (floor 4.5:1) —
  eyebrows everywhere (`hero.tsx:86`, `how-i-work.tsx:56`, `about.tsx:24`, `contact.tsx:20`,
  `offer-hero.tsx:16`, …), links (`offer-proof.tsx:31`, `HoneticHero.tsx:114`), prices
  (`offer-modules.tsx:65`). The hero H1 span (`hero.tsx:28`, ≥24px) is the only legit
  `text-brand` (large-text 3:1). Fix: add a darker `--brand-text` (~`oklch(0.50 0.13 162)`)
  for small-text roles; keep `--brand` for fills + large text.
- **Amber `text-cta`/`text-primary` as small text = 2.67:1** (floor 4.5:1), incl. the
  required-field `*` (`contact-form.tsx:184,208`) which also risks color-as-sole-meaning.
  Fix: asterisk → `text-destructive` (5.22:1) or `text-foreground`.

**Non-blockers (light):**
- Input border `--border` = 1.20:1 on background — form fields hard to locate (`ui/input`,
  `textarea`, `select`). Darker input border token.
- `text-brand` on `bg-brand/15` active toggle pill = 3.31:1 light / 3.98:1 dark — ties into
  `--brand-text`.
- `accent-foreground` on `accent` = 4.55:1 light (razor-thin pass — margin note).
- Toggle target sizes tight vs 24px floor (`language-toggle.tsx:83` `py-1`,
  `theme-toggle.tsx:62`). Add `min-h-6 min-w-6`.

Type ramp, line-height, measure, hierarchy squint-test: **no findings** (clean modular
ramp, `leading-[1.05]` headings, `max-w-2xl` prose measure).

## Lens 3 — Consistency (token-adherence)

**Verdict:** MATCHED on the marketing shell (home/offer/chrome/shared UI fully
token-mapped, both themes). **MISSED on `/portfolio/**`**, which runs an off-token
raw-Tailwind palette system. Parity itself is sound; the failure is token-adherence +
one-accent.

- **BLOCKER — per-technology raw-palette tech badges** `tech-badge.tsx:30-39`
  (`sky/amber/blue/teal/cyan/violet/emerald`) → rainbow multi-accent; `violet` = purple
  slop tell.
- **BLOCKER — `purple` on the stack chip** `stack-chip.tsx:11` (Unity) + `blue` (`:10`,
  Flutter). *Verified live in the honeti DOM: `text-purple-700 dark:text-purple-300` ×5 +
  blue ×2.*
- **BLOCKER — raw `emerald-500` as a second structural accent** across
  `PortfolioSection.tsx:27`, `AgentPortfolioSection.tsx:24`, `HoneticHero.tsx:54`,
  `WarsztatGrid.tsx:20`, `WarsztatHeroTile.tsx`, `role-badge.tsx:12`,
  `honeti/page.tsx:104`, and ~25× in `WarsztatFlow.tsx`. Not `--brand` → can drift from the
  real token. Map to `border-brand/20 bg-brand/5 text-brand`; human/agent amber → `--cta`.
- **MAJOR — raw `rgba()`/`#hex`/inline `oklch()` literals** in `WarsztatFlow.tsx:177,313`
  and the `--flow-stroke-*` vars (`globals.css:131-133,183-185`). Promote to
  `var(--surface)` / `color-mix(in oklab, var(--brand) …)`.
- **MINOR — eyebrow drift:** `currently-learning.tsx:23` uses `text-text-subtle` (others use
  `text-brand`); hero uses `tracking-wide` (others `tracking-[0.18em]`). Extract a
  `<SectionEyebrow>`.
- **MINOR — `border-l-2` callout cards** (`callout.tsx:14`, `about.tsx:46`,
  `offer-ownership.tsx:45`) — mild slop tell + inconsistent border color. Unify.
- **MINOR — off-scale radius:** `rounded-4xl` (badges, consistent but off the locked
  `--radius` scale) and a lone `rounded-3xl` (`WarsztatFlow.tsx:177`).

**Scope note:** the portfolio color system is a *deliberate* build (WCAG-annotated
`light dark:` pairs, `web-design-generation/pilot-portfolio-badges.md`). De-rainbowing it is
a **design-decision reversal**, not a silent bug-fix — route through the HITL/landing step
and an owner check on whether per-tech color-coding is wanted at all.

## Lens 4 — Modernity & brand voice

**Verdict:** distinctive-brand on home + offer (both themes); AI-slop-drift **isolated to
`components/portfolio/**`**.

Anti-slop walk — **HITs:** default-purple (`stack-chip.tsx:11`, `tech-badge.tsx:38`);
rainbow multi-accent (`tech-badge.tsx:30-39`); "converge on our brand" broken by the
portfolio's per-vendor hues. **CLEAR:** gradients (on-token hero backdrop
`color-mix(var(--brand)/var(--cta))`), centered-hero→3-cards, colored-left-border *cards*,
all-caps decoration, glassmorphism default, Inter-everywhere (Space Grotesk present),
emoji-icons (lucide-react), autoplay motion, reduced-motion (all `ScrollReveal`/backdrop
branch on `useReducedMotion()`).

- **MAJOR** — portfolio rainbow/purple (same as Lens 3).
- **MINOR** — `WarsztatFlow` raw `rgba()` glow shadows off-token.
- **MINOR** — `about-graphic.tsx:1-7` stale docstring still frames the SVG as a
  "placeholder … designer delivers final art" and references a deleted `<HeroGraphic/>`. The
  render is on-token/warm, but decide: keep the node-graph (fix docstring) or commission a
  warmer About visual.

---

## Consolidated fix list (prioritized)

- **P0 — light-theme a11y (low-risk, mechanical):**
  1. Focus ring `ring-ring/50` → solid `ring-ring` (site-wide).
  2. Add `--brand-text` (darker emerald) and swap small-text `text-brand` usages to it.
  3. Required-field `*` and amber small text → `text-destructive`/`text-foreground`.
  4. Darker input border token for light.
- **P1 — decision + work:**
  5. Portfolio: collapse the raw-palette rainbow (incl. purple/violet) to `--brand`/`--cta`/
     neutral — **owner decision first** (kill per-tech hue coding vs. document a scoped
     exception).
  6. De-literalize `WarsztatFlow` (board/glow/stroke → tokens / `color-mix`).
- **P2 — polish:**
  7. Portfolio ~192px dead band + section-in-section rhythm.
  8. Unify `mt-*` header→content step (`mt-12`); hero off-grid `mt-7`.
  9. `<SectionEyebrow>` primitive; unify `border-l-2` callouts; radius scale.
  10. Offer shared left-edge for prose vs grid sections.
  11. About graphic docstring / decision.

---

## Ambient scroll-driven background imagery (the headline feature — not yet designed)

Owner wants full-bleed backdrops that transition between sections on scroll (top image →
covered by a section → different image revealed lower down; the "pinned-backdrop /
scroll-jacking storytelling" pattern). To research/plan in this slice:

- **Feasibility:** fine under static export (`output: 'export'`) — it's a client-side scroll
  effect. Candidate techniques: `position: sticky`/`fixed` backdrop layers cross-faded via
  IntersectionObserver or scroll-progress; or modern CSS scroll-driven animations
  (`animation-timeline: view()`) as progressive enhancement. Reuse the existing
  `ScrollReveal`/`useReducedMotion` idiom.
- **Hard constraints:** (a) `prefers-reduced-motion` must fall back to static/no-transition;
  (b) text over imagery needs scrims/overlays so the **contrast floors still hold** — this
  directly interacts with the P0 light-theme contrast work; (c) performance/LCP (image
  weight, `next/image` vs. plain `<img>` under static export, lazy/priority).
- **Open design question:** which sections get backdrops, dark vs light behavior, and how
  loud the motion is (charter: motion serves comprehension, confident-not-loud).

### Asset generation ("nano banana") — tooling status

No image-generation plugin/MCP is currently connected to this environment (available MCP
servers: dart, context7, chrome-devtools). "Nano Banana" = Google's Gemini image models
(Gemini 2.5 Flash Image; "Nano Banana Pro" = Gemini 3 Pro Image), Google-side — not an
Anthropic/Claude tool. Two paths, to decide at plan time:

1. **Owner generates in Google's panel** (AI Studio / Gemini) and drops files into the repo;
   agent handles integration, optimization, and responsive variants.
2. **Wire up the Gemini image API** via a small Node script or an MCP using the owner's API
   key, so backdrops can be (re)generated programmatically as a repo asset step. Needs a key
   in a secret store (mirror the `RESEND_API_KEY` / Firebase Secret Manager pattern; never
   commit).

## Open questions (for /plan)
1. Phasing: split P0 a11y (ship fast) from the ambient feature + P1 de-rainbow, or one push?
2. Portfolio color-coding: retire per-tech hues (recommended) or formalize a scoped exception?
3. Ambient imagery: which sections, both themes, motion intensity, asset pipeline (path 1 vs 2)?
4. About visual: keep the node-graph SVG or commission a warmer asset?
