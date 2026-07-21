---
sprint: web-design-generation-capability
slices: [web-design-generation]
created: 2026-07-19
part: 1/2
next: sprint-005-web-design-generation-redesign
---

# Sprint web-design-generation-capability: Build the design standard + theme system + validate on the hero pilot

## Goal

Build the reusable web-design capability (shared `~/.claude/design-standard/` `_core` + `web`
contracts, the `design-web` skill, the `designer` agent) via a measured design-DNA extraction of
the live site, land the **light theme + dark/light toggle** as the rendering substrate, and prove
the whole generate→gap-test→fix loop on the **hero pilot** in both themes. This sprint ends at a
human approval gate on the standard + themes + hero pilot. The full site redesign (home + offer +
chrome) and the agent finalization + closing AI review are Sprint 005
(`sprint-005-web-design-generation-redesign`, `depends_on` this one).

> **User-scope outputs (not in this repo's git):** Phase 1 writes to `~/.claude/design-standard/`
> and Phase 3 to `~/.claude/skills/design-web/` + `~/.claude/agents/designer.md` — outside the
> repo, so they will NOT appear in the repo diff. Only the in-repo changes (`app/globals.css`,
> `components/theme/**`, the new `tests/unit/design-*.test.ts`, `components/sections/hero/**`, the
> `dna-profile.md` / `pilot-hero.md` slice artifacts) and the plan `## Progress` flips are
> repo-committable. The reviewer must read the user-scope files directly to review Phases 1 & 3.

## Slices
- `web-design-generation` — `context/slices/web-design-generation/plan.md` (Phases 1–3 of 6 here)

## Cross-cutting decisions
- **Shared-home structure:** `~/.claude/design-standard/_core/` (platform-neutral: principles,
  charter, anti-slop, a11y floors, gap-test, DNA method) + `web/` (design-spine, token-contract).
  `mobile/` is the sibling slice — `_core/` MUST be authored neutral so mobile only adds a delta.
- **Static export** (`next.config.ts` `output:'export'`): the theme toggle must be client-side,
  no-flash, hydration-safe. Ground next-themes' App-Router + static-export usage via Context7 at
  implementation — do NOT assert its API from memory. Default theme = `dark` (preserve today's look).
- **Token convention:** move to the shadcn v4 convention — light values in `:root`, dark in
  `.dark`, `@theme inline` mapping preserved, `oklch()` values. Land tokens whole before any
  component re-point.
- **Artifact → land:** the `design-web` skill emits reviewable artifacts under
  `context/slices/**` and NEVER writes `globals.css`/components directly — a separate step lands.
- ADR 0002 (portfolio-url-pattern): routes are unchanged by this slice (visual/theming only).
- House rule: Conventional Commits (`feat(web-design-generation): … (pN)`); allowed agent
  verification is `npm run build` (type-check) · `npm run test` (vitest) · `npm run lint` (eslint).

## Human gate (HITL)
> Stateful, run FIRST. Every box must be `[x]` before the AFK block dispatches.

- none — the direction was locked during `/plan`: sharpen the existing identity (dark slate +
  emerald/amber) + add a light theme + toggle; extract-then-sharpen the design-DNA; add warmth +
  a distinctive display face; pilot on the hero; visual gate via `dev-live-chrome`; machine gate =
  token-conformance + WCAG contrast (both themes) + build/test/lint. The agents propose the
  concrete specifics (display font, exact light palette, warmth tokens) from that settled
  direction; quality is caught at the closing gate.

## AFK sessions

### Session 1 — Phase 1: Shared standard (`_core` + `web`) + design-DNA extraction (author)
- **Agent:** sprint-runner
- **Slice:** `web-design-generation`
- **Phase:** 1
- **Depends on:** (none)
- **Exit:** all `_core/*.md` + `web/*.md` exist non-empty under `~/.claude/design-standard/` and
  `context/slices/web-design-generation/dna-profile.md` exists (Progress rows 1.1, 1.2)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-design-generation/plan.md` (FULLY),
  > its `plan-brief.md`, and the slice `research.md` first. You are implementing **Phase 1:
  > Shared standard (`_core` + `web`) + design-DNA extraction** of slice `web-design-generation`.
  >
  > **A. Author the platform-neutral core** in the neutral shared home
  > `~/.claude/design-standard/_core/` (mirror the shape of `~/.claude/copy-standard/*`; markdown,
  > no frontmatter; MUST stay free of web-only token syntax so mobile can read it unchanged):
  > 1. `design-principles.md` — 3–7 opinionated, tie-breaking, memorable principles (NN/g + GDS
  >    shape), each paired with an on-brand vs off-brand example.
  > 2. `design-charter.md` — the brand aesthetic "X, but never Y" traits (e.g. *sharp-never-cold,
  >    structured-never-rigid, warm-never-soft*) + an affirmative/anti-slop stance + a pointer to
  >    the a11y floor. This is the visual analogue of the copy voice-charter.
  > 3. `anti-slop-checklist.md` — the visual AI-tell ban-list (from research Area 3: default
  >    indigo/purple, centered-hero→exactly-three-cards skeleton, colored left-border cards,
  >    all-caps section labels, glassmorphism defaults, Inter-everywhere) + the "converge on OUR
  >    brand every time" rule (invert frontend-design's novelty rule).
  > 4. `a11y-floors.md` — the WCAG 2.2 numeric floors as non-negotiable constraints (4.5:1 text /
  >    3:1 large+non-text; visible ≥2px 3:1 focus; `prefers-reduced-motion`; ≥24px targets; 200%
  >    resize; 320px reflow).
  > 5. `design-gap-test.md` — the visual scoring procedure: per-dimension (rhythm, hierarchy,
  >    token-adherence, alignment, contrast) MATCHED / PARTIAL / MISSED with cited evidence →
  >    one-paragraph drift diagnosis → regenerate-the-misses loop; names `dev-live-chrome`
  >    (chrome-devtools MCP screenshots) as the render substrate + corrections-as-data.
  > 6. `dna-extraction.md` — the analyzer method: read reference components/screenshots and emit a
  >    **measurable** profile under a hard rule — every observation cites a real value + uses
  >    countable metrics, never adjectives ("8px base rhythm" beats "clean").
  >
  > **B. Author the web delta** in `~/.claude/design-standard/web/`:
  > 7. `design-spine.md` — the web layout/section-composition playbook (8pt grid, size+whitespace
  >    hierarchy, F→layer-cake scan, hero/proof/section patterns, motion restraint).
  > 8. `token-contract.md` — the locked, machine-checkable web token surface the generator's output
  >    must map onto: the concrete Tailwind v4 `@theme` names + shadcn semantic tokens
  >    (`--background/--foreground/--primary/--muted/--accent/--border/--ring/--radius/...`) in
  >    `oklch()`, **for both `:root` (light) and `.dark`**, plus the type scale, radius scale, and
  >    the display-font decision. Ground the Tailwind v4 / shadcn facts in `research.md`
  >    `## External Sources` (Context7-cited) — do not invent API.
  >
  > **C. Run the design-DNA extraction** per `dna-extraction.md` over `app/globals.css:1-192` +
  > representative components (`components/sections/hero/hero.tsx`, `components/ui/card.tsx`,
  > `components/sections/offer/offer-pricing.tsx`, `components/shared/scroll-reveal.tsx`) → a
  > measurable profile written to `context/slices/web-design-generation/dna-profile.md`, then
  > propose the **sharpening deltas**: a warmth strategy, a distinctive display font (paired with
  > Geist body), and the **full light palette** as the oklch counterpart of the dark one. These
  > proposals feed `web/token-contract.md` + `_core/design-charter.md`.
  >
  > Constraints that survive (a cold agent cannot infer these): `_core/` MUST be platform-neutral
  > (mobile reuses it). Every DNA-profile line cites a real value from a real file — no adjectives.
  > The light palette must be a FULL semantic set (not an afterthought) and be designed to pass the
  > Phase-2 WCAG contrast test. Do NOT change `globals.css` or any component in this phase — this
  > is artifact-only (landing is Phase 2+).
  >
  > This session owns Progress rows 1.1 + 1.2. Rows 1.3–1.4 are Manual (human review at the
  > closing gate).
  >
  > Stop when: all `_core/*.md` (6) + `web/*.md` (2) exist non-empty and `dna-profile.md` carries
  > the measured profile + the proposed display font + full light palette + warmth tokens.

### Session 2 — Phase 2: Token infrastructure + light theme + dark/light toggle (implement)
- **Agent:** sprint-implementer
- **Slice:** `web-design-generation`
- **Phase:** 2
- **Depends on:** Session 1
- **Exit:** `npm run build` && `npm run test` (incl. new `design-contrast` + `design-token-
  conformance` tests) && `npm run lint` all pass (Progress rows 2.1, 2.2, 2.3)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-design-generation/plan.md` (FULLY),
  > and `~/.claude/design-standard/web/token-contract.md` + the proposed palette/font in
  > `context/slices/web-design-generation/dna-profile.md` first. You are implementing **Phase 2:
  > Token infrastructure + light theme + dark/light toggle** of slice `web-design-generation`.
  >
  > 1. **Tokens (light + dark) + display font** — in `app/globals.css`, re-express the palette per
  >    `token-contract.md`: light values in `:root`, dark in `.dark` (shadcn v4 convention),
  >    KEEPING the `@theme inline` semantic mapping (only the value layers move/duplicate). Add the
  >    chosen display font via `next/font` in `app/[locale]/layout.tsx` and point `--font-heading`
  >    at it (it is currently aliased to Geist). Add the warmth tokens. All token names must match
  >    `token-contract.md`.
  > 2. **Theme provider + toggle** — add `components/theme/theme-provider.tsx` and
  >    `components/theme/theme-toggle.tsx`. Use a client theme provider (next-themes is the
  >    App-Router standard) with the class strategy on `<html>` + `suppressHydrationWarning`,
  >    `defaultTheme="dark"`, no-flash. **Ground next-themes' App-Router + `output:'export'` usage
  >    via Context7 before coding — do not assert its API from memory.** Wrap the app in
  >    `app/[locale]/layout.tsx`; place the toggle in `components/layout/header.tsx` (home) and the
  >    subpage breadcrumb chrome so it is reachable everywhere. Honor system preference as an option.
  > 3. **Machine-gate tests (new)** — `tests/unit/design-contrast.test.ts` computes WCAG contrast
  >    ratios over the token pairs (bg/fg, muted, primary/cta on their surfaces) for BOTH themes and
  >    asserts ≥ 4.5:1 (text) / 3:1 (large+non-text); oracle = WCAG 2.2 thresholds, NOT current
  >    output. `tests/unit/design-token-conformance.test.ts` scans `components/**` for disallowed
  >    arbitrary color values (`bg-[#...]`, `text-[#...]`, raw hex) outside the token set; oracle =
  >    `token-contract.md`. Both are vitest tests.
  >
  > Constraints that survive: static export forbids SSR — the toggle path must be no-flash +
  > hydration-safe. Land the token inversion WHOLE before touching components. Do NOT redesign any
  > section yet (that is Phase 3+); this phase only lands the token/theme substrate + tests.
  > Preserve the existing `prefers-reduced-motion` handling in `components/shared/scroll-reveal.tsx`.
  >
  > This session owns Progress rows 2.1, 2.2, 2.3. Rows 2.4–2.5 are Manual (on-screen test at the
  > closing gate).
  >
  > Stop when: `npm run build && npm run test && npm run lint` all pass with the new contrast +
  > conformance tests green.

### Session 3 — Phase 3: `design-web` skill + `designer` agent + hero pilot (author + land)
- **Agent:** sprint-runner
- **Slice:** `web-design-generation`
- **Phase:** 3
- **Depends on:** Session 2
- **Exit:** `~/.claude/skills/design-web/SKILL.md` (valid YAML frontmatter) +
  `~/.claude/agents/designer.md` exist, `context/slices/web-design-generation/pilot-hero.md`
  carries the hero art-direction + its Design-Gap-Test report, and after hero landing
  `npm run build && npm run test && npm run lint` pass (Progress rows 3.1, 3.2)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-design-generation/plan.md` (FULLY),
  > all of `~/.claude/design-standard/_core/*` + `web/*`, and `research.md` Area 5 (skill/agent
  > anatomy) first. You are implementing **Phase 3: `design-web` skill + `designer` agent + hero
  > pilot** of slice `web-design-generation`.
  >
  > 1. **`design-web` skill** — scaffold it by **invoking the `/skill-creator` skill** (this is a
  >    hard requirement, not a style hint): run `/skill-creator` and let it generate
  >    `~/.claude/skills/design-web/SKILL.md`, then fill in the design-web specifics below.
  >    `/skill-creator` is **interactive** — if this runs unattended (AFK) and it needs input you
  >    cannot answer from the plan, STOP and flag `> TODO(user): run /skill-creator for design-web
  >    with me` for the closing gate rather than hand-writing the SKILL.md around it. Study an
  >    existing skill (e.g. `~/.claude/skills/nextjs-app-router-audit/SKILL.md`) for the house
  >    shape. Dual-mode:
  >    *generate* (produce a reviewable art-direction artifact for a section — reads `_core/` +
  >    `web/`, self-scores with the Design-Gap-Test, renders via `dev-live-chrome`) and *review*
  >    (audit an existing surface against the standard). YAML frontmatter (`name: design-web`,
  >    `description` with PL+EN triggers, `allowed-tools` incl. the chrome-devtools MCP path),
  >    prose body; substance lives in the shared home. One generation unit = one section. It emits
  >    artifacts under `context/slices/**` and MUST NEVER write `globals.css`/components directly.
  > 2. **`designer` agent** — author `~/.claude/agents/designer.md`: opens with "read
  >    `~/.claude/agents/SPRINT_RULES.md` + host `CLAUDE.md` first", reads the same shared home,
  >    runs a self-contained generate→verify(gap-test)→fix loop for a section, returns a finished
  >    artifact, never lands directly. Frontmatter `name/description/model/tools`. Platform param =
  >    web now (mobile later). Mirror the role of the `copywriter` agent described in the copy plan.
  >    (Full hardening is Sprint 005 Phase 6 — here it need only be runnable enough to co-validate
  >    the hero.)
  > 3. **Hero pilot** — using the skill in generate mode, produce the hero art-direction (both
  >    themes) → `context/slices/web-design-generation/pilot-hero.md` with its Design-Gap-Test
  >    report, iterate until every dimension is MATCHED, then LAND it: restructure
  >    `components/sections/hero/**` onto the design-spine in dark+light, addressing the
  >    cold/placeholder-graphic weakness. Keep i18n keys + the route smoke intact.
  >
  > Constraints that survive: the visual Design-Gap-Test uses `dev-live-chrome` (the user's Chrome
  > + dev server) — if the live-render substrate is unavailable in this AFK run, produce the
  > pilot-hero artifact + a static-heuristic gap-test and flag `> TODO(user): eyeball hero in
  > dev-live-chrome at the closing gate`. Do NOT scale to other sections (that is Sprint 005). Do
  > NOT write production files from inside the skill — land the hero as an explicit step in THIS
  > session.
  >
  > This session owns Progress rows 3.1, 3.2. Rows 3.3–3.4 are Manual (human sign-off at the
  > closing gate).
  >
  > Stop when: the skill + agent files exist, `pilot-hero.md` carries the hero + its gap-test
  > report, and `npm run build && npm run test && npm run lint` pass after hero landing.

### Session 4 — Review
- **Agent:** sprint-reviewer
- **Depends on:** all prior sessions
- **Exit:** verdict (pass/fail) + itemised concerns reported
- **Prompt:**
  > Read-only review of this sprint's output against
  > `context/slices/web-design-generation/plan.md` (Phases 1–3). Note: Phases 1 & 3 wrote
  > **user-scope** files outside the repo — read them directly: `~/.claude/design-standard/_core/*`
  > (6) + `web/*` (2), `~/.claude/skills/design-web/SKILL.md`, `~/.claude/agents/designer.md`.
  > In-repo: `app/globals.css`, `components/theme/**`, `tests/unit/design-*.test.ts`,
  > `components/sections/hero/**`, and the artifacts `context/slices/web-design-generation/
  > dna-profile.md` + `pilot-hero.md`.
  >
  > Verify the Manual Success Criteria are visibly satisfied:
  > - `_core/` is platform-neutral (no web-only token syntax); the charter is specific enough to
  >   change output; the anti-slop list is concrete; the a11y floors are correct (rows 1.3–1.4).
  > - The DNA profile is metric-not-adjective (every line cites a real value); the light palette is
  >   a full semantic set; the display font is a distinct choice (not Geist).
  > - The token-contract maps cleanly onto `globals.css`; the `@theme inline` mapping is preserved;
  >   light in `:root`, dark in `.dark`.
  > - The toggle is no-flash + hydration-safe under static export (`defaultTheme="dark"`), reachable
  >   on home + a subpage (rows 2.4–2.5).
  > - Contrast test covers BOTH themes against WCAG thresholds (not pinned colors); token-conformance
  >   bans arbitrary values.
  > - The hero pilot reads on-brand + warmer in both themes; its Design-Gap-Test shows all
  >   dimensions MATCHED (rows 3.3–3.4).
  > Report pass/fail with concerns. Do not edit code.

## Human gate (HITL) — closing
> Stateful, run AFTER the AFK block above completes. `/sprint-run` halts at the AFK→closing-gate
> boundary and hands back to you.

- [ ] HC1 — Approve the design standard + charter specifics + themes + hero pilot before the redesign
  - **Do:** In `dev-live-chrome`, do your on-screen test: flip the dark/light toggle on home + a
    subpage (no flash, persists, reachable), confirm the **light theme reads on-brand (warm, not
    washed out)** and the display font renders on headings. Read
    `context/slices/web-design-generation/dna-profile.md` + `~/.claude/design-standard/_core/
    design-charter.md` + `web/token-contract.md` and approve the concrete **display font, light
    palette, and warmth tokens**. Eyeball the redesigned **hero** in both themes against
    `pilot-hero.md`'s Design-Gap-Test.
  - **Why (unblocks):** Sprint 005 (redesign) applies this exact standard + token system to every
    remaining section + offer + chrome. It must not proceed on a palette/font/theme or a hero
    pattern you haven't approved on screen.
  - **Capture:** Your approval + any tweaks recorded in
    `~/.claude/design-standard/web/token-contract.md` (values) and a one-line "design standard +
    themes approved <date>" note in `context/slices/web-design-generation/change.md` → Notes.
  - **Done when:** You approve the standard, the concrete palette/font/warmth, the toggle/themes on
    screen, and the hero pilot for scaling. (If it needs another pass, loop back into Phase 1/2/3
    before closing.)

## Out of scope
- Redesigning the rest of home, the chrome (header/footer), and the offer page; finalizing the
  `designer` agent; the closing whole-site AI design review — all Sprint 005.
- Any mobile/Flutter work (sibling slice `mobile-design-generation`); any copy/content change;
  SaaS adoption; visual-regression snapshots; bespoke privacy/portfolio redesign.
