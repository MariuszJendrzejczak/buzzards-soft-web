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

### 2026-07-19 · Closing gate (HC1) · light-theme regression fix — portfolio + honeti badges
- **Found on-screen (HC1 eyeball):** portfolio (home `#portfolio`) + HONETi page badges/chips/tags
  illegible in light theme — every badge was `border-{c}-500/30 bg-{c}-500/10 text-{c}-300` and the
  dark-optimized `text-{c}-300/200` shades measure ~1.3:1 on the off-white surface.
- **Fixed via the `designer` agent** (artifact `pilot-portfolio-badges.md`, all-MATCHED gap-test,
  per-hue contrast computed). Only 4 files carried the bug (everything else already used flipping
  tokens): `tech-badge.tsx` (11 hues), `role-badge.tsx` (2), `stack-chip.tsx` (2),
  `WarsztatHeroTile.tsx` (emerald chip+icon). Fix: each coloured chip gets a `light dark:` pair
  keeping its hue identity — light shade `-700` (amber+cyan forced `-800`; emerald+teal a thin
  `-700` pass, flagged for eyeball), dark keeps `-300/-200/-400`; tinted `-500/10` fills unchanged;
  borders bumped `-500/30`→`-600/40` for definition. **Genuinely-neutral chips (AGPL/slate,
  Next.js/zinc, rozwoj-i-serwis/gray) moved to `foreground` semantic tokens** (flip for free) —
  updated two change-detector tests (`role-badge.test.tsx`, `app-card.test.tsx`) that pinned the
  literal `gray`, preserving the meaningful "distinct from the emerald role" check.
- **Verify:** `npm run build` + `npm run test` (510/510) green; the 4 components + 2 tests lint clean.
- **For the closing gate:** eyeball both surfaces in `dev-live-chrome` both themes; decide the two
  banked tuning calls — emerald/teal `-700` vs safe `-800`, and whether the neutral chips collapsing
  slate/zinc/gray into one `foreground` look is desired (`pilot-portfolio-badges.md` Open Qs).

### 2026-07-19 · Closing gate (HC1) · light-theme audit + CurrentlyLearning band fix
- **Proactive audit** (after the warsztat + badge fixes) for the same bug class across all
  components: grep for hardcoded dark backgrounds + dark-only unguarded light-text shades.
  **Result:** the dark-only-text shades are all gone; only two hardcoded-dark backgrounds remained:
  `components/ui/sheet.tsx` `bg-black/10` (a modal scrim — correct on both themes, left as-is) and
  `components/sections/experience/currently-learning.tsx` `bg-slate-900/50` (a dark-only section band).
- **Fixed** `currently-learning.tsx`: `bg-slate-900/50` → `bg-surface/40` (theme-flipping, matching
  the sibling `how-i-work.tsx` band idiom) — removes the last hardcoded dark section band; its text
  tokens now read correctly in light. Dropped the file from the token-conformance allowlist (now
  fully token-clean). `npm run build` + `npm run test` green.
