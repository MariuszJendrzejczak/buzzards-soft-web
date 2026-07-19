<!-- PLAN-REVIEW-REPORT -->
# Plan Review: Professional Web-Copy Generation

- **Plan**: context/slices/web-copy-generation/plan.md
- **Mode**: Deep
- **Date**: 2026-07-19
- **Verdict**: REVISE → SOUND after fixes
- **Findings**: 0 critical, 2 warnings, 2 observations

## Verdicts

| Dimension | Verdict |
|-----------|---------|
| End-State Alignment | PASS |
| Lean Execution | PASS (1 observation) |
| Architectural Fitness | WARNING |
| Blind Spots | WARNING |
| Plan Completeness | PASS |

## Grounding

paths 5/5 ✓ (page, pl/en/sv, i18n test), 11 offer components ✓, route spec ✓,
~/.claude/agents/ ✓ (existing sprint agents + SPRINT_RULES.md), brief↔plan ✓.
Grounding surfaced two extra offer-coupled tests → F2.

## Findings

### F1 — Shared charter owned by PL skill, cross-referenced by EN skill + agent

- **Severity**: ⚠️ WARNING
- **Impact**: 🔎 MEDIUM — real tradeoff; pause to reason through it
- **Dimension**: Architectural Fitness
- **Location**: Phase 1 (files 1–5), Phase 2 (agent), Phase 5 (EN skill)
- **Detail**: The five contracts were nested under the PL skill's `references/`, with the EN
  skill + agent reaching in by relative path — couples three front-ends to one skill's private
  dir; fragile on rename/move. A skill dir is meant to be self-contained.
- **Fix A ⭐ Recommended**: Neutral shared home (`~/.claude/copy-standard/`) all three front-ends read.
  - Strength: One canonical charter, no cross-skill coupling; skills stay movable. Matches the plan's own "shared contract" intent; SPRINT_RULES.md precedent.
  - Tradeoff: One more top-level path to own.
  - Confidence: MED.
  - Blind spot: Personal preference for per-skill portability vs shared home.
- **Fix B**: Keep canonical in PL skill; EN + agent hold thin pointers.
- **Decision**: FIXED via Fix A — contracts moved to `~/.claude/copy-standard/`; Phase 1/2/5 references updated.

### F2 — Restructure blast radius on offer tests is under-scoped

- **Severity**: ⚠️ WARNING
- **Impact**: 🔎 MEDIUM — real tradeoff; pause to reason through it
- **Dimension**: Blind Spots
- **Location**: Phase 3 (namespace map) + Phase 4 §3
- **Detail**: The SB7 restructure renames/merges `offer.*` keys, but the plan named only
  `web-pages-offer-3-locales.spec.ts`. Grounding found (a) that spec pins the KEY
  `offer.hero.heading` (value read dynamically, so content is free), and (b)
  `tests/unit/offer-quote.test.tsx` pins `offer.quote.*` wiring (oracle offer-page.md §11).
  `nav-offer-link.test.ts` + `sitemap-offer.test.ts` are safe (route/nav preserved).
- **Fix ⭐**: Add namespace-preservation constraints to Phase 3 (keep `offer.hero.heading` +
  `offer.quote.*` wiring, or update the two tests deliberately) and enumerate offer-coupled
  tests in Phase 4 §3, marking nav/sitemap unaffected.
  - Confidence: HIGH — verified against test sources.
  - Blind spot: None significant.
- **Decision**: FIXED via Fix — Phase 3 test-coupling constraints added; Phase 4 §3 rewritten to enumerate coupled + unaffected tests.

### F3 — copywriter agent is off the critical path to the page win

- **Severity**: 🔭 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Lean Execution
- **Location**: Phase 2
- **Detail**: Phases 3–5 are driven by the skills, not the agent; building the agent in Phase 2
  gated the pilot on work the shipped page doesn't need.
- **Fix**: Split the agent into its own phase after the page ships.
- **Decision**: FIXED — agent removed from Phase 2, added as Phase 6 (after EN); Progress + brief renumbered.

### F4 — SV "DeepL cross-check" implies an unconfirmed external dependency

- **Severity**: 🔭 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Blind Spots
- **Location**: Phase 5 §2
- **Detail**: SV described as "straight translation (DeepL cross-check)" — DeepL is external
  with no key/tooling in-repo; the parity gate only needs non-placeholder SV strings.
- **Fix**: State SV is model-produced for parity; DeepL optional.
- **Decision**: FIXED — Phase 5 §2 reworded to model-produced SV, DeepL optional.
