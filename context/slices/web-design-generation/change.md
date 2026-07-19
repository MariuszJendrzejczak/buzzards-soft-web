---
change_id: web-design-generation
title: "Professional web-design generation — reusable web art-direction capability"
status: implementing
created: 2026-07-19
updated: 2026-07-19
archived_at: null
---

## Notes

Design sibling of the `web-copy-generation` capability. Goal: a reusable, on-brand
**web design** capability that mirrors the copywriting one in shape.

Locked framing (from kickoff conversation):
- **Output:** a reviewable **art-direction / design-standard artifact** (not direct code
  dump), review → then implementation. Mirrors the copy `research → standard → pilot → land`
  path.
- **Architecture:** full mirror of copy — a shared `~/.claude/design-standard/` home
  (charter / tokens / component-rules / motion-language / design-gap-test) driving thin
  front-ends: an interactive `design-web` skill + a sprint-callable `designer` agent.
- **Stack grounding (web):** Next.js 16 / React 19 / Tailwind v4 / shadcn + Base UI.
- **Market analyzed:** `frontend-design` (official) generates production UI code but is
  stateless — no persistent brand standard, no stack grounding; `frontend-developer` is a
  generic executor. The gap (a durable on-brand design standard + review seam) is what this
  slice builds — same build-vs-buy conclusion as copy.

Sibling slice: `mobile-design-generation` (Flutter). Shared `~/.claude/design-standard/`
core may be split web/mobile or share a platform-neutral root — to be settled in research.

First artifact: `research.md` — build-vs-buy + a professional web design standard, grounded
in the live site and cited external design sources.

### Decisions locked 2026-07-19 (post-research)
- **Shared-home structure (was research Open Question #1):** ONE home
  `~/.claude/design-standard/` with a platform-neutral `_core/` (principles, anti-slop, a11y
  floors, gap-test procedure, DNA-extraction method) + thin `web/` and `mobile/` deltas
  (spine + token-contract per platform). ONE `designer` agent, platform-parameterized.
- **Sequencing:** `/plan` this WEB slice first (live site = ready DNA corpus, headless-Chrome
  visual gate), validate the pattern, then `/plan` the mobile sibling.

## Deviations

### 2026-07-19 · Session 2 · Phase 2 — contained
- **Plan assumed:** the token-contract §2a / `dna-profile.md` §8c locked light
  `--accent-foreground: oklch(0.98 0.01 162)` (near-white on the emerald fill), annotated
  "light on brand fill ✓".
- **Actually found:** the new WCAG contrast machine gate measured that pair at **3.67:1**,
  below the 4.5:1 text floor — the profile's "✓" was asserted, never computed.
- **What I did:** followed the contract's own acceptance rule (the contrast test is the oracle)
  and darkened light `--accent-foreground` (+ mirrored `--sidebar-primary-foreground`) to
  `oklch(0.20 0.06 162)` — deep emerald, mirroring the dark theme's `accent-foreground` idiom —
  clearing at 4.55:1. Also dropped a decorative `border/surface` pair I had over-added to the
  contrast test (not a token-contract §5 critical pair; hairlines aren't WCAG 1.4.11 boundaries).
- **For the reviewer:** verify the deep-emerald light `--accent-foreground` reads on-brand
  on-screen (skip-link + any brand-fill chips) at the HITL pass; it clears the floor by a small
  margin (4.55:1).

### 2026-07-19 · Session 2 · Phase 2 — note (not a plan deviation)
- **Project-wide `npm run lint` is red on pre-existing debt** (row 2.3 left `[ ]`): ESLint walks
  nested generated `out/**`/`build/**` bundles (~22.7k problems) + prior portfolio hook errors.
  The Phase-2 footprint lints clean. Recommend a separate `chore(lint)` to fix the flat-config
  `globalIgnores` before relying on `npm run lint` as a gate.
- **Offer-page toggle unreachable** — the theme toggle is placed on home + privacy + honeti, but
  NOT on `app/[locale]/web-pages-offer/**` (owned by the concurrent `client-web-offer` copy
  workstream this session must not touch). Add `<ThemeToggle />` to the offer breadcrumb chrome
  in Phase 5 / Sprint 005, or the concurrent agent picks it up.
- **Toggle aria-labels hardcoded English** — `messages/*.json` is owned by the concurrent
  workstream; localizing the toggle labels is a small follow-up.

### 2026-07-19 · Closing gate (HC1) · light-theme regression fix — WarsztatFlow theme-aware
- **Found on-screen (HC1 eyeball):** the "AI Native Development Workflow" panel
  (`components/portfolio/WarsztatFlow.tsx`) was a HARDCODED dark schematic
  (`bg-[…linear-gradient(180deg,#0b1220,#060a13)]`). The light theme this sprint shipped made
  its `text-foreground` tokens invert to dark-on-dark → text invisible; white-alpha overlays +
  raw emerald/amber-500 accents had no light story (emerald-500 2.27:1, amber-500 1.92:1 on the
  off-white surface).
- **Decision:** developer chose the FULL theme-aware fix (panel flips to a light schematic in
  light mode) over the quick pin-text-light option. Treated as a light-theme regression fix on
  this sprint's own deliverable, not net-new Sprint 005 scope.
- **What I did:** ran the `designer` agent (the capability this sprint built) → art-direction
  artifact `pilot-warsztat.md` (all-5-dimensions-MATCHED Design-Gap-Test, contrast genuinely
  computed) → LANDED it: panel bg via `dark:` variant (light warm-off-white board + low-opacity
  glow / dark schematic gated to `.dark`); `white/x`→`foreground/x` neutral overlays; emerald/
  amber accents given explicit `light dark:` pairs (emerald-700 / amber-800 small text ≥4.5:1,
  emerald-600 / amber-700 icons ≥3:1); connector SVG strokes via new `--flow-stroke-*` vars in
  `globals.css` (per-theme). Information design (stages, connectors, i18n keys) unchanged.
  `npm run build` + `npm run test` green; `WarsztatFlow.tsx` lints clean.
- **For the reviewer / closing gate:** eyeball the panel in `dev-live-chrome` both themes (glow
  warmth vs washout, every accent label legible, focus rings visible, 320px/200% reflow) per the
  `pilot-warsztat.md` TODO — the gap-test ran static-heuristic (no live Chrome in the agent run).
