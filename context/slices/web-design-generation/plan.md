# Web-Design Generation — Implementation Plan

## Overview

Build a reusable, on-brand **web-design capability** — a shared standard home
`~/.claude/design-standard/` (`_core/` + `web/`), a dual-mode `design-web` skill, and a
sprint-callable `designer` agent — by **extracting-and-sharpening the design-DNA of the live
site**, then use that capability to **add a light theme + dark/light toggle and fully redesign
the site (home + offer + chrome) in both themes**. Output is a reviewable art-direction artifact
per section; a separate reviewed step lands it. A dual quality gate governs every phase: a
**visual Design-Gap-Test** rendered through the existing `dev-live-chrome` loop, and a **machine
gate** (token-conformance lint + WCAG contrast for both themes + build/test/lint). Every phase
ends with the developer's own on-screen HITL test; a final AI design review closes the slice.

This mirrors the `web-copy-generation` capability 1:1 in shape (shared neutral home ← thin
front-ends, dual gate, pilot-one-unit-first, artifact→review→land, agent built last).

## Current State Analysis

- **Tokens** — `app/globals.css:1-192` is Tailwind v4 **CSS-first** (`@theme inline` + `:root`
  vars, no `tailwind.config.js`). The site is **dark-only**: the palette lives directly in
  `:root` (there is no light theme; `.dark` is not the primary source). Palette: slate bg
  (`--background #020617`), emerald brand (`--brand/--accent #10b981`), amber CTA
  (`--cta/--primary #f59e0b`); radius scale derived from one `--radius: 0.75rem` (`:49-54`).
- **Type** — `app/[locale]/layout.tsx:28-36`: Geist + Geist Mono via `next/font/google`;
  `--font-heading` is **aliased to Geist** (no distinct display face) — a named sharpening target.
- **Components** — `components/ui/*` on **Base UI** + **CVA** + `cn`; `data-slot` idiom. Sections
  under `components/sections/**` (hero, work, about, offer, contact) + `components/portfolio/**`.
- **Chrome** — `components/layout/header.tsx` renders **home-only** (scroll-hide); subpages carry a
  breadcrumb; `footer.tsx` 12-col grid. There is **no theme toggle** anywhere today.
- **Motion** — Framer Motion v12; `components/shared/scroll-reveal.tsx` honors
  `prefers-reduced-motion`.
- **Static export** — `next.config.ts` has `output: 'export'` (no SSR/route handlers). A theme
  toggle must be **client-side, no-flash, hydration-safe** under static export.
- **Aesthetic (from research)** — coherent, above-average, **not "AI slop"**; two honest
  weaknesses: **austere/cold** and **default type voice (Geist)**. This is a usable DNA corpus.
- **Live capability template** — `~/.claude/copy-standard/*` (5 contracts) + the
  `generate-professional-copy-pl` skill already exist on disk (built in parallel); we clone the
  structure. Skill/agent anatomy captured in `research.md` Area 5.

## Desired End State

- `~/.claude/design-standard/` exists with a platform-neutral `_core/` + a `web/` delta (the
  reusable IP). A `design-web` skill (generate + review modes) and a `designer` agent both drive it.
- The site ships a **light theme and a dark/light toggle** (default = current dark), no-flash under
  static export, reachable on home and subpages.
- **Home (all sections) + offer page + header/footer** are redesigned onto the sharpened
  design-spine in **both themes**, landed section-by-section after review.
- Every landed surface passes the machine gate (token-conformance, WCAG contrast both themes,
  build/test/lint) and the developer's on-screen HITL test; a final AI design review is recorded.
- Verify: `npm run build && npm run test && npm run lint` green across all three locales in both
  themes; the new contrast + token-conformance tests pass; the toggle works with no flash.

### Key Discoveries:

- shadcn v4 convention (research `## External Sources`): **light values in `:root`, dark in
  `.dark`**, `@theme inline` maps semantic vars → utilities, values in `oklch()`. Our repo already
  uses `@theme inline`; today it is dark-in-`:root` — the light-theme work **inverts to the shadcn
  convention** (light `:root` + `.dark` override) with `defaultTheme` = dark to preserve the look.
- `app/globals.css:81-157` is the single token source of truth the token-contract locks onto.
- `dev-live-chrome` (chrome-devtools MCP over the user's Chrome + Fast Refresh) is the rendering
  substrate for the visual gate — no new infra.
- Copy's discipline transfers: skills emit artifacts under `context/slices/**` and **never write
  production files directly** (copy never writes `messages/*.json`; design never writes
  `globals.css`/components directly — a separate reviewed landing step does).

## What We're NOT Doing

- **No mobile/Flutter work** — `mobile/` deltas + the mobile realization are the sibling slice
  `mobile-design-generation`. `_core/` is authored platform-neutral now so mobile only adds a delta.
- **No SaaS / market skill adoption** — build-vs-buy settled BUILD (research Area 4).
- **No content/copy changes** — copy is `web-copy-generation`'s job; design consumes existing copy.
- **No visual-regression snapshots** — rejected as a change-detector anti-pattern during a
  deliberate redesign.
- **No new pricing/module/contact-form/SEO/i18n behavior** — purely visual + theming.
- **No portfolio/privacy deep redesign** beyond inheriting the new tokens + toggle reachability
  (privacy/portfolio get token inheritance, not bespoke section redesign, unless trivial).

## Implementation Approach

Author the shared standard first (highest leverage; the front-ends are thin over it), grounding
the web token-contract + charter in a **measured DNA extraction** of the live site, sharpened with
the two named deltas (warmth + a display face) and a full **light palette**. Land the token +
toggle **infrastructure** next so there is a real rendering substrate in both themes. Then build
the `design-web` skill (via `/skill-creator`) + the `designer` agent and **prove the whole loop on
the hero pilot** before scaling. Redesign the rest of home + chrome, then the offer page,
section-by-section: skill generates a reviewable artifact → Design-Gap-Test (visual, via
dev-live-chrome) → machine gate → **developer HITL eyeball test** → reviewed landing step. Finalize
the `designer` agent off the critical path and run a closing AI design review over the whole
redesign.

## Critical Implementation Details

- **Static-export theme toggle** — the toggle must be a client component with no-flash theming and
  hydration safety under `output: 'export'`. Use a theme provider (next-themes is the App-Router
  standard) with the **class strategy** on `<html>` + `suppressHydrationWarning`; ground its exact
  App-Router + static-export usage via Context7 at implementation (do not assert its API from
  memory). Default theme = `dark` to preserve today's look; light is the new addition.
- **Token inversion** — moving to the shadcn convention (light `:root` / dark `.dark`) touches every
  semantic token in `globals.css`; the `@theme inline` mapping block stays, only the value layers
  move/duplicate. Land tokens **before** any component re-point (else the redesign renders against
  half-moved tokens).
- **Contrast oracle** — both themes must satisfy WCAG 2.2 (4.5:1 text / 3:1 large + non-text). The
  contrast test computes ratios over the actual token values; light theme is the higher-risk one.

## Phase 1: Shared contracts (`_core` + `web`) + design-DNA extraction

### Overview

Author the reusable standard and derive the web charter/token-contract from a measured DNA
extraction of the live site, sharpened with warmth + a display face + a full light palette. Pure
artifact — no code landing.

### Changes Required:

#### 1. Platform-neutral core

**Files**: `~/.claude/design-standard/_core/{design-principles.md, design-charter.md,
anti-slop-checklist.md, a11y-floors.md, design-gap-test.md, dna-extraction.md}`

**Intent**: The neutral IP shared by web + mobile. `design-principles.md` = 3–7 opinionated,
tie-breaking principles (NN/g/GDS shape). `design-charter.md` = the brand aesthetic "X but never Y"
traits (e.g. *sharp-never-cold, structured-never-rigid, warm-never-soft*) + an affirmative/anti-slop
stance. `anti-slop-checklist.md` = the visual AI-tell ban-list (default indigo/purple,
centered-hero→3-cards skeleton, colored left-border cards, all-caps labels, glassmorphism).
`a11y-floors.md` = the WCAG 2.2 numeric floors as non-negotiable constraints. `design-gap-test.md` =
the visual scoring procedure (per-dimension MATCHED/PARTIAL/MISSED → regenerate misses;
dev-live-chrome as the render substrate; corrections-as-data). `dna-extraction.md` = the analyzer
method (metric-not-adjective, every observation cites a real value).

**Contract**: Markdown contracts, no frontmatter (mirror `~/.claude/copy-standard/*` shape). Neutral
of any web-only token syntax — mobile must be able to read `_core/` unchanged.

#### 2. Web delta

**Files**: `~/.claude/design-standard/web/{design-spine.md, token-contract.md}`

**Intent**: `design-spine.md` = the web layout/section-composition playbook (8pt grid, size+whitespace
hierarchy, F→layer-cake scan, hero/proof/section patterns, motion restraint). `token-contract.md` =
the locked, machine-checkable web token surface the generator's output must map onto — the concrete
Tailwind v4 `@theme` names + shadcn semantic tokens (`--background/--foreground/--primary/--muted/
--accent/--border/--ring/--radius/...`) in `oklch()`, **for both `:root` (light) and `.dark`**, plus
the type scale, radius scale, and the display-font decision.

**Contract**: `token-contract.md` names exactly the tokens `globals.css` will own (Phase 2). Grounds
its Tailwind v4 / shadcn facts in `research.md` `## External Sources` (Context7-cited).

#### 3. Design-DNA extraction of the live site → sharpened charter

**Files**: `context/slices/web-design-generation/dna-profile.md` (artifact)

**Intent**: Run the `dna-extraction.md` analyzer over `app/globals.css` + representative components
(`hero.tsx`, `card.tsx`, `offer-pricing.tsx`, `scroll-reveal.tsx`) → a **measurable** profile
(spacing rhythm in px, type-scale ratio, radius set, color-token usage %, motion durations). Then
author the **sharpening deltas**: add a warmth strategy, choose a distinctive display font (pairing
with Geist body), and derive the **light palette** as the oklch counterpart of the dark one. The
sharpened profile feeds `web/token-contract.md` and `_core/design-charter.md`.

**Contract**: Every profile line cites a real value from a real file (no adjectives). The light
palette must be a full semantic set (not an afterthought) and pass the Phase-2 contrast gate.

### Success Criteria:

#### Automated Verification:

- Standard files exist: `ls ~/.claude/design-standard/_core/*.md ~/.claude/design-standard/web/*.md`
- DNA profile artifact exists: `ls context/slices/web-design-generation/dna-profile.md`

#### Manual Verification:

- Developer reviews `_core/` + `web/` + `dna-profile.md`: the charter is specific enough to change
  output, the anti-slop list is concrete, the light palette + display font are on-brand (sharpen,
  not re-direct), and the a11y floors are correct.
- The token-contract names a token surface that maps cleanly onto the current `globals.css`.

**Implementation Note**: Pause for developer confirmation of the standard before wiring anything to
generate. This is the highest-leverage artifact.

---

## Phase 2: Token infrastructure + light theme + dark/light toggle

### Overview

Land the sharpened token system into `globals.css` (light `:root` + dark `.dark`, both `oklch`),
the new display font, and warmth tokens; add a static-export-safe, no-flash dark/light toggle
(default dark). This becomes the rendering substrate everything downstream inherits.

### Changes Required:

#### 1. Token system (light + dark) + display font

**Files**: `app/globals.css`, `app/[locale]/layout.tsx`

**Intent**: Re-express the palette per the token-contract: **light values in `:root`, dark in
`.dark`** (shadcn convention), keeping the `@theme inline` mapping. Add the chosen display font via
`next/font` and point `--font-heading` at it (no longer aliased to Geist). Add warmth tokens.

**Contract**: The `@theme inline` semantic mapping is preserved; only value layers change. All token
names match `web/token-contract.md`. `--font-heading` resolves to the new display family.

#### 2. Theme provider + toggle

**Files**: new `components/theme/theme-provider.tsx`, `components/theme/theme-toggle.tsx`;
`app/[locale]/layout.tsx` (wrap), `components/layout/header.tsx` + subpage chrome (place toggle)

**Intent**: A client theme provider (next-themes) with the class strategy on `<html>` +
`suppressHydrationWarning`, `defaultTheme="dark"`, no-flash. A toggle control reachable on home
(header) and subpages (breadcrumb chrome). Honors system preference as an option.

**Contract**: Ground next-themes' App-Router + `output:'export'` usage via Context7 at
implementation. Toggle sets/reads theme; no hydration mismatch; no flash on first paint.

#### 3. Machine-gate tests (new)

**Files**: `tests/unit/design-contrast.test.ts`, `tests/unit/design-token-conformance.test.ts`

**Intent**: `design-contrast` computes WCAG contrast ratios over the token pairs (bg/fg, muted,
primary/cta on their surfaces) for **both themes** and asserts ≥ 4.5:1 (text) / 3:1 (large/non-text).
`design-token-conformance` scans `components/**` for disallowed arbitrary color values
(`bg-[#...]`, `text-[#...]`, raw hex) outside the token set.

**Contract**: Contrast oracle = WCAG 2.2 thresholds (research-cited), not current output. Token-
conformance oracle = `web/token-contract.md`. Both are vitest unit tests (allowed command).

### Success Criteria:

#### Automated Verification:

- Build/type-check passes: `npm run build`
- Tests pass incl. new contrast + conformance: `npm run test`
- Lint passes: `npm run lint`

#### Manual Verification:

- In `dev-live-chrome`: toggle flips dark↔light with **no flash**, persists across reload, works on
  home + a subpage, and the light theme reads on-brand (warm, not washed out).
- The new display font renders on headings across locales.

**Implementation Note**: Pause for developer on-screen HITL test of both themes + the toggle before
proceeding.

---

## Phase 3: `design-web` skill (dual-mode) + `designer` agent — validated on the hero pilot

### Overview

Author the capability front-ends and prove the whole generate→gap-test→fix loop on ONE section
(hero) in both themes before scaling.

### Changes Required:

#### 1. `design-web` skill (generate + review modes)

**Files**: `~/.claude/skills/design-web/SKILL.md` (+ optional `references/`)

**Intent**: A dual-mode skill authored **using `/skill-creator`**: *generate* mode produces a
reviewable art-direction artifact for a section (reads `_core/` + `web/`, self-scores with the
Design-Gap-Test, renders via dev-live-chrome), *review* mode audits an existing surface against the
standard (gap-test as the rubric). It emits artifacts under `context/slices/**` and **never writes
`globals.css`/components directly**.

**Contract**: SKILL.md frontmatter `name: design-web` + `description` (PL+EN triggers) + allowed-tools
incl. the chrome-devtools MCP / dev-live-chrome path. Prose body; substance lives in the shared home.
One generation unit = one section (the ~800-word-window analogue).

#### 2. `designer` agent (platform-parameterized)

**Files**: `~/.claude/agents/designer.md`

**Intent**: The sprint-callable autonomous form. Opens with "read `SPRINT_RULES.md` + host
`CLAUDE.md` first", reads the same shared home, runs a self-contained generate→verify(gap-test)→fix
loop for a section, returns a finished artifact. Platform param = web now (mobile later). Never
lands directly.

**Contract**: Frontmatter `name/description/model/tools`. Mirrors the `copywriter` agent role;
authored by hand per the agent anatomy (research Area 5). *Full finalization deferred to Phase 6* —
this phase only needs it runnable enough to co-validate the hero.

#### 3. Hero pilot

**Files**: `context/slices/web-design-generation/pilot-hero.md` (artifact), then
`components/sections/hero/**` (landing)

**Intent**: Generate the hero art-direction via the skill, score it with the Design-Gap-Test in both
themes, then land it (restructured onto the design-spine, dark+light, addressing the cold/placeholder
weakness).

**Contract**: Hero passes the Design-Gap-Test on all dimensions before landing; landing keeps the
i18n keys + route smoke intact.

### Success Criteria:

#### Automated Verification:

- Skill + agent exist: `ls ~/.claude/skills/design-web/SKILL.md ~/.claude/agents/designer.md`
- After hero landing: `npm run build && npm run test && npm run lint` pass (incl. contrast/conformance)

#### Manual Verification:

- The Design-Gap-Test meaningfully lifts the hero (developer compares before/after in dev-live-chrome,
  both themes) — the loop beats a plain prompt.
- Developer HITL eyeball sign-off on the hero in both themes.

**Implementation Note**: Pause for developer sign-off on the hero pilot + the capability loop before
scaling to the rest of the site.

---

## Phase 4: Redesign remaining home sections + chrome (dark+light)

### Overview

Apply the validated capability to the rest of home (work, about, portfolio, contact) + header/footer,
section-by-section: artifact → gap-test → machine gate → HITL → land.

### Changes Required:

#### 1. Home sections

**Files**: `components/sections/{work,about,contact}/**`, `components/portfolio/**`

**Intent**: For each section, generate art-direction via `design-web`, score, land onto the
design-spine in both themes.

**Contract**: Each section maps to the token surface (no arbitrary values); i18n keys unchanged.

#### 2. Chrome

**Files**: `components/layout/header.tsx`, `components/layout/footer.tsx`, subpage breadcrumb chrome

**Intent**: Redesign header (incl. the toggle placement) + footer in both themes onto the spine.

**Contract**: Header stays home-only render; toggle reachable everywhere; scroll-hide + reduced-motion
preserved.

### Success Criteria:

#### Automated Verification:

- `npm run build && npm run test && npm run lint` pass after each section lands.

#### Manual Verification:

- Developer HITL eyeball test per section in both themes; no repetition/inconsistency across sections;
  layout holds at 320px reflow and 200% zoom.

**Implementation Note**: Pause for developer confirmation after each section (or a small batch) before
the next.

---

## Phase 5: Redesign offer page (dark+light)

### Overview

Apply the standard to the offer-page components in both themes.

### Changes Required:

#### 1. Offer sections

**Files**: `components/sections/offer/**`, `app/[locale]/web-pages-offer/**`

**Intent**: Generate + land art-direction for each offer section onto the spine in both themes.

**Contract**: Offer `i18n` namespace + the `i18n-offer-completeness` test + route smoke stay green;
no copy changes.

### Success Criteria:

#### Automated Verification:

- `npm run build && npm run test && npm run lint` pass (incl. offer i18n completeness + route smoke).

#### Manual Verification:

- Developer HITL eyeball test of the offer page in both themes; visually consistent with the
  redesigned home.

**Implementation Note**: Pause for developer confirmation of the offer page.

---

## Phase 6: Finalize `designer` agent + closing AI design review

### Overview

Complete the sprint-callable `designer` agent off the critical path and run a whole-redesign AI
design review; developer walks the closing gate.

### Changes Required:

#### 1. `designer` agent finalization

**Files**: `~/.claude/agents/designer.md`

**Intent**: Harden the autonomous loop (generate→gap-test→fix for a section, returns artifact),
confirm it reads the shared home + runs the gap-test substrate, and that it never lands directly.

**Contract**: Runnable via `Agent(subagent_type: "designer")`; matches the sprint session-report
contract.

#### 2. Closing AI design review

**Files**: review report under `context/slices/web-design-generation/` (impl-review output)

**Intent**: Run a whole-redesign design review (via `/impl-review` or the `designer` agent in review
mode) across home + offer + chrome in both themes vs the standard; record findings for the developer.

**Contract**: Canonical review report; findings resolved before archive.

### Success Criteria:

#### Automated Verification:

- `npm run build && npm run test && npm run lint` green across all three locales.
- Agent file exists and is well-formed: `ls ~/.claude/agents/designer.md`

#### Manual Verification:

- Developer reads the AI design review + does a final on-screen pass of the whole site in both themes;
  no unresolved high-severity design findings.

**Implementation Note**: Closing HITL gate — developer's final review + sign-off.

---

## Testing Strategy

| Behavior asserted | Expected outcome (oracle source) | Regression caught | Layer | Anti-pattern avoided |
|---|---|---|---|---|
| Token pairs meet WCAG contrast in BOTH themes | ≥ 4.5:1 text / 3:1 large+non-text (WCAG 2.2, research-cited) | A theme (esp. light) shipping unreadable/low-contrast tokens | unit (vitest) | Not pinning exact colors — asserts the ratio invariant |
| Components use only approved tokens | no arbitrary color values outside `web/token-contract.md` | Redesign drifting off the token system (arbitrary hex) | unit (vitest) | Not snapshotting markup — asserts the conformance invariant |
| Offer i18n completeness stays green | key-parity + non-placeholder across pl/en/sv (existing test) | Redesign accidentally breaking the offer namespace | unit (vitest) | Reuses the existing dynamic gate; no change-detector |
| Route smoke (3 locales) stays green | offer route renders per locale (existing spec) | Component restructure breaking a route | e2e (playwright) | Behavioral, not pixel snapshot |

### Manual Testing Steps:

1. In `dev-live-chrome`, toggle dark↔light on home + a subpage: no flash, persists on reload.
2. Eyeball each redesigned section in both themes for on-brand warmth, hierarchy, rhythm.
3. Check 320px reflow + 200% zoom + keyboard focus visibility in both themes.
4. Read the closing AI design review; confirm no unresolved high-severity findings.

## Performance Considerations

No-flash theming must not add a blocking render path; next-themes injects a tiny inline script. The
redesign should not regress the existing Framer Motion reduced-motion handling.

## Migration Notes

The token inversion (dark-in-`:root` → light-in-`:root` + `.dark`) is the one migration; land it
whole in Phase 2 before any component re-point so nothing renders against half-moved tokens.

## References

- Research: `context/slices/web-design-generation/research.md`
- Live template: `~/.claude/copy-standard/*`, `~/.claude/skills/generate-professional-copy-pl/`
- Sibling: `context/slices/mobile-design-generation/research.md`
- Token source of truth: `app/globals.css:81-157`; theme convention: research `## External Sources`

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles. See `references/progress-format.md`.

### Phase 1: Shared contracts (_core + web) + design-DNA extraction

#### Automated

- [x] 1.1 Standard files exist under `~/.claude/design-standard/_core/` + `web/` — 74f3d09
- [x] 1.2 DNA profile artifact exists — 74f3d09

#### Manual

- [ ] 1.3 Developer reviews standard + DNA profile (charter specific, light palette + display font on-brand, a11y floors correct)
- [ ] 1.4 Token-contract maps cleanly onto current `globals.css`

### Phase 2: Token infrastructure + light theme + dark/light toggle

#### Automated

- [x] 2.1 `npm run build` passes — 390a559
- [x] 2.2 `npm run test` passes incl. new contrast + token-conformance tests — 390a559
- [ ] 2.3 `npm run lint` passes — Phase-2 footprint lints clean (exit 0); project-wide `npm run lint` red on PRE-EXISTING debt only (ESLint walks nested generated `out/**`/`build/**` bundles → ~22.7k problems; plus prior `react-hooks/set-state-in-effect` errors in `components/portfolio/{AgentCardLink,CardDeviceLink}.tsx`). Outside this phase's footprint; recommend a separate `chore(lint)` to fix the flat-config ignores. Flagged for closing gate.

#### Manual

- [ ] 2.4 Toggle flips dark↔light no-flash, persists, works home + subpage; light reads on-brand
- [ ] 2.5 Display font renders on headings across locales

### Phase 3: design-web skill (dual-mode) + designer agent — hero pilot

#### Automated

- [x] 3.1 `design-web` skill + `designer` agent files exist
- [x] 3.2 After hero landing, `npm run build && npm run test` pass; changed hero file lints clean (project-wide lint red on pre-existing debt only — see row 2.3)

#### Manual

- [ ] 3.3 Design-Gap-Test meaningfully lifts the hero (before/after, both themes)
- [ ] 3.4 Developer HITL sign-off on hero pilot + capability loop

### Phase 4: Redesign remaining home sections + chrome (dark+light)

#### Automated

- [ ] 4.1 `npm run build && npm run test && npm run lint` pass after sections land

#### Manual

- [ ] 4.2 Developer HITL eyeball per section, both themes; consistent; 320px reflow + 200% zoom hold

### Phase 5: Redesign offer page (dark+light)

#### Automated

- [ ] 5.1 `npm run build && npm run test && npm run lint` pass (incl. offer i18n + route smoke)

#### Manual

- [ ] 5.2 Developer HITL eyeball of offer page, both themes; consistent with home

### Phase 6: Finalize designer agent + closing AI design review

#### Automated

- [ ] 6.1 `npm run build && npm run test && npm run lint` green across three locales
- [ ] 6.2 `designer` agent file exists and is well-formed

#### Manual

- [ ] 6.3 Developer reads AI design review + final on-screen pass; no unresolved high-severity findings
