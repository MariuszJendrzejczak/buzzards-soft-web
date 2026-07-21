<!-- IMPL-REVIEW-REPORT -->
# Implementation Review: Sprint web-design-generation-capability (Phases 1–3)

- **Plan**: `context/slices/web-design-generation/plan.md` (Phases 1–3 of 6); sprint `context/sprints/sprint-004-web-design-generation-capability.md`
- **Scope**: Full sprint web-design-generation-capability (Phases 1–3; Phases 4–6 are Sprint 005)
- **Date**: 2026-07-19
- **Verdict**: NEEDS ATTENTION
- **Findings**: 0 critical, 2 warnings, 4 observations

## Verdicts

| Dimension | Verdict |
|-----------|---------|
| Plan Adherence | PASS |
| Scope Discipline | PASS |
| Safety & Quality | PASS |
| Architecture | PASS |
| Pattern Consistency | PASS |
| Success Criteria | WARNING |

## Acceptance check

- **Session 1 Exit** (all `_core/*.md` (6) + `web/*.md` (2) exist non-empty + `dna-profile.md` exists — rows 1.1, 1.2): **met** — all 8 standard files present and substantive under `~/.claude/design-standard/`; `dna-profile.md` (267 lines, fully metric-cited) present. `_core/` is platform-neutral (references slate/emerald/amber as brand concepts, never web-only token syntax; mobile-reuse notes throughout). Charter is specific ("X but never Y" with per-side trait tests); anti-slop list is concrete (16 catalogued tells, grouped); a11y floors correct (4.5:1 text / 3:1 large+non-text, focus ≥2px/3:1, reduced-motion, ≥24px, 200%/320px). Rows 1.3–1.4 are Manual (closing HITL) — evidence supports them.
- **Session 2 Exit** (`npm run build` && `npm run test` && `npm run lint` — rows 2.1, 2.2, 2.3): **met with caveat** — build passes (type-check clean), `npm run test` green (510 tests incl. 158 design-gate tests), design footprint lints clean (exit 0). Row 2.3 project-wide lint left `[ ]` intentionally — see F1. Rows 2.4–2.5 Manual. `@theme inline` mapping preserved; light in `:root`, dark in `.dark`; `--font-heading`→`--font-display` (Space Grotesk); toggle is mount-gated no-flash, `defaultTheme="dark"`, `suppressHydrationWarning` on `<html>`.
- **Session 3 Exit** (skill + agent files exist with valid frontmatter; `pilot-hero.md` carries hero + Design-Gap-Test; post-landing build/test pass — rows 3.1, 3.2): **met** — `~/.claude/skills/design-web/SKILL.md` (valid YAML, PL+EN triggers, chrome-devtools MCP tools) + `~/.claude/agents/designer.md` (valid frontmatter, SPRINT_RULES preamble) present; `pilot-hero.md` carries art direction + all-MATCHED gap-test (both themes); hero landed on tokens, build+test green. Rows 3.3–3.4 Manual.
- **Contained deviation (change.md §Deviations, light `--accent-foreground`)**: **verified sound** — `globals.css:105` = `oklch(0.20 0.06 162)` (deep emerald), mirrored at `:121` (`--sidebar-primary-foreground`); contrast test asserts this pair ≥4.5:1 and passes. See F3.
- **ADR 0002 (portfolio-url-pattern) conformance**: **ok** — this slice is visual/theming only; no routes changed (confirmed: no route files in the three design commits' diffs).
- **Cross-cutting decisions** (shared-home neutral `_core`; static-export no-flash toggle; shadcn v4 token convention; artifact→land separation): all honored.

## Findings

### F1 — Project-wide `npm run lint` left red; row 2.3 unchecked

- **Severity**: ⚠️ WARNING
- **Impact**: 🔎 MEDIUM — the sprint's own footprint is clean, but a session `Exit:` names `npm run lint` passing and it does not
- **Dimension**: Success Criteria
- **Location**: `context/slices/web-design-generation/plan.md:485` (row 2.3); pre-existing offenders `components/portfolio/{AgentCardLink,CardDeviceLink}.tsx`
- **Detail**: Session 2's `Exit:` requires `npm run build && npm run test && npm run lint` all pass. Build + test pass; project-wide `npm run lint` is red. I confirmed the redness is genuinely pre-existing and outside this sprint's footprint: `CardDeviceLink.tsx:49` / `AgentCardLink.tsx` carry `react-hooks/set-state-in-effect` errors, both in the portfolio workstream that predates all three design commits (74f3d09/390a559/a8c6b39). The design footprint itself (`components/theme/**`, `hero.tsx`, `globals.css`, `layout.tsx`, `header.tsx`, both design tests, the two subpages) lints clean (exit 0). The carve-out is reasonable and hides no new lint issue in this sprint's changed files. One nuance: the Deviation note characterizes the redness partly as ESLint walking `out/**`/`build/**` (~22.7k problems), but `eslint.config` already lists `out/**` and `build/**` in `globalIgnores` — so that portion of the characterization is likely stale; the real live redness is the portfolio hook errors. This does not change the conclusion (footprint clean), only the accuracy of the note.
- **Fix**: Land a separate `chore(lint)` that fixes the two portfolio `set-state-in-effect` errors (or an explicit, justified `eslint-disable` with a WHY, as `theme-toggle.tsx:38` already does), so `npm run lint` can serve as a real gate again; then row 2.3 can flip. Track as a Sprint-005 / follow-up item, not a blocker for this sprint's HITL gate.
- **Decision**: PENDING

### F2 — Theme toggle unreachable on the offer page (`/web-pages-offer`)

- **Severity**: ⚠️ WARNING
- **Impact**: 🔎 MEDIUM — a real reachability gap the plan's Desired End State names ("reachable on home and subpages"), deferred but not yet delivered
- **Dimension**: Plan Adherence
- **Location**: `app/[locale]/web-pages-offer/page.tsx` (no `<ThemeToggle />`); toggle present on `header.tsx`, `privacy-policy/page.tsx:165`, `portfolio/honeti/page.tsx:116`
- **Detail**: The plan's Desired End State and Manual row 2.4 require the toggle "reachable on home and subpages". It is reachable on home (header desktop + mobile sheet) and two subpages (privacy, honeti) — so row 2.4's literal "home + a subpage" is satisfied — but the offer subpage has no toggle: a user browsing `/web-pages-offer` in light mode has no in-page way to switch. This is documented in `change.md §Deviations` as a deliberate boundary (the offer page is owned by the concurrent `client-web-offer` copy workstream this session must not touch), and it is explicitly slated for Phase 5 / Sprint 005. Documented, contained, and correctly deferred — flagged so it is not lost at the closing gate.
- **Fix**: Add `<ThemeToggle />` to the offer breadcrumb chrome when the offer page is redesigned in Sprint 005 Phase 5 (or have the concurrent workstream pick it up), matching the privacy/honeti subpage pattern. Verify at the closing HITL that the toggle is reachable on every subpage including offer before the redesign scales.
- **Decision**: PENDING

### F3 — DNA-profile artifact still shows the superseded light `--accent-foreground` value

- **Severity**: 🔎 OBSERVATION
- **Impact**: 🏃 LOW — artifact-vs-code drift; the shipped code is correct
- **Dimension**: Plan Adherence
- **Location**: `context/slices/web-design-generation/dna-profile.md:234` (and token-contract.md:99) vs landed `app/globals.css:105`
- **Detail**: The Phase-2 contained deviation darkened light `--accent-foreground` from `oklch(0.98 0.01 162)` (asserted "light on brand fill ✓") to `oklch(0.20 0.06 162)` after the contrast gate measured the near-white pair at 3.67:1 (below the 4.5:1 floor). The fix is correctly landed in `globals.css:105` + mirrored at `:121`, and the contrast test now passes for that pair. But the source artifacts (`dna-profile.md §8c` line 234 and `token-contract.md §2a` line 99) still carry the old near-white value with its now-false "✓". Per the append-don't-overwrite rule for decision docs, these should get a dated revision pointer to the deviation rather than being left as a silent contradiction of what shipped. The fix itself is sound and on-brand-plausible (deep emerald mirrors the dark theme's `accent-foreground` idiom); confirm it reads on-brand on-screen (skip-link + brand-fill chips) at the HITL pass — it clears by a small margin (4.55:1).
- **Fix**: Append a dated revision note to `dna-profile.md §8c` and `token-contract.md §2a` recording that light `--accent-foreground` was darkened to `oklch(0.20 0.06 162)` per the Phase-2 contrast-gate deviation, so the artifacts match the shipped tokens.
- **Decision**: PENDING

### F4 — Hero pilot artifact's proof-panel content narrative diverges from the landed panel

- **Severity**: 🔎 OBSERVATION
- **Impact**: 🏃 LOW — cosmetic artifact/code mismatch; no functional impact
- **Dimension**: Plan Adherence
- **Location**: `context/slices/web-design-generation/pilot-hero.md:49-50` vs `components/sections/hero/hero.tsx:135-163`
- **Detail**: The pilot artifact describes the right-column "workbench" panel as listing "config · hooks · skills · subagents" rows. The landed `WorkbenchPanel` instead renders the existing `hero.trust.*` i18n keys (yearsCode / claudeDaily / engineerEnglish) — a sound choice (reuses shipped copy, adds no new keys, and the code comment at `hero.tsx:132` correctly documents this). The artifact's "config · hooks · skills · subagents" wording is aspirational and was superseded during landing; the artifact's own Open Question #1 already anticipates the rows are swappable. Worth reconciling so the design record matches what shipped.
- **Fix**: Update the pilot-hero artifact's panel-content description (or add a landing note) to reflect that the panel carries the `hero.trust.*` triplet, matching the landed component.
- **Decision**: PENDING

### F5 — Visual Design-Gap-Test ran as static-heuristic fallback (dev-live-chrome unavailable)

- **Severity**: 🔎 OBSERVATION
- **Impact**: 🏃 LOW — expected and documented for an AFK run; the closing HITL gate closes the loop
- **Dimension**: Success Criteria
- **Location**: `context/slices/web-design-generation/pilot-hero.md:11-15,125-165`
- **Detail**: The hero's Design-Gap-Test scored all five dimensions MATCHED in both themes, but the visual dimensions (rhythm/hierarchy/alignment) were reasoned statically against `design-spine.md` + the landed JSX rather than a live render, because dev-live-chrome (the user's Chrome on the debug port) was unreachable in the AFK run. The contrast dimension is genuinely computed (same oklch→WCAG converter as the passing contrast test), so dimension 5 is real, not asserted. The static gap-test is rigorous within its limits — every row cites a concrete measured/derived value, the drift diagnosis names a real light-theme token-adherence interaction (emerald `--brand` at 3.5–3.7:1 usable only as large/non-text, never small body copy — a genuine finding the standard surfaced), and the eyeball-TODO is flagged, not silently skipped. This is exactly the documented fallback the plan/skill/agent all sanction. The visual eyeball is correctly deferred to the closing HC1 gate (rows 3.3–3.4).
- **Fix**: At the closing HITL gate, eyeball the hero in both themes in dev-live-chrome per the `> TODO(user)` in `pilot-hero.md` — confirm dimensions 1/2/4 on a real render and that the warm surface step reads warm (not washed-out) in light. No code change needed unless the render contradicts the static read.
- **Decision**: PENDING

### F6 — `theme-toggle.tsx` uses a justified `eslint-disable` for set-state-in-effect

- **Severity**: 🔎 OBSERVATION
- **Impact**: 🏃 LOW — correct pattern, noted for completeness
- **Dimension**: Pattern Consistency
- **Location**: `components/theme/theme-toggle.tsx:37-40`
- **Detail**: The toggle mount-gates `aria-pressed` with a one-shot `setMounted(true)` in `useEffect`, suppressing `react-hooks/set-state-in-effect` on that line with an inline disable + a clear WHY comment (avoids hydration mismatch; a one-shot client marker, not a render-driving cascade). This is the correct next-themes pattern for static export and is well-justified — unlike the *unsuppressed* portfolio errors in F1, this is a deliberate, documented exception, not debt. Recorded only so the resolver does not conflate it with F1's genuine lint debt.
- **Fix**: None — the suppression is appropriate and documented. Keep as-is.
- **Decision**: PENDING
