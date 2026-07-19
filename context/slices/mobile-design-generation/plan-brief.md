# Mobile-Design Generation — Plan Brief

> Full plan: `context/slices/mobile-design-generation/plan.md`
> Research: `context/slices/mobile-design-generation/research.md`

## What & Why

Build a reusable, user-scope **mobile (Flutter) design capability** that mirrors the copywriting one
in shape: the `mobile/` delta of the shared standard `~/.claude/design-standard/`, a dual-mode
`design-mobile` skill, and the mobile branch of the shared `designer` agent. The motivation: give the
house a durable, on-brand, reviewable Flutter design STANDARD — the missing upstream input that the
live/porting mobile skills (`dev-live-android`, `clone-feature-to-mobile`) currently presuppose.

## Starting Point

`~/.claude/design-standard/_core/` (6 real files) + `web/` **now exist** — the web sibling's Phase 1
landed. Only `mobile/` and the shared `~/.claude/agents/designer.md` are still absent. No Flutter
source is reachable from this web repo (the named `home_storage` corpus is only a `build/` dir here).
The proven template to clone is live: `~/.claude/copy-standard/*` + `generate-professional-copy-pl`.

## Desired End State

`~/.claude/design-standard/mobile/` (spine + `ThemeData` token-contract, both platform flows, `_core/`
assumptions block), `~/.claude/skills/design-mobile/SKILL.md` (dual-mode, platform-flow param, never
lands code), and a `designer` agent carrying a mobile branch — plus a reconciliation checklist for the
deferred `_core/` landing and the later `home_storage` realization pilot. All reviewable IP; no app is
themed and no on-device gate runs in this slice.

## Key Decisions Made

| Decision | Choice | Why (1 sentence) | Source |
| --- | --- | --- | --- |
| Slice scope | Capability-only (no pilot/realization) | Source of a real Flutter app isn't reachable here; skill is user-scope/portable | Plan |
| Realization target | Deferred to `home_storage` session | Theming a real app needs its source + `CLAUDE.md`/ADR, not present here | Plan |
| `_core/` dependency | Consume the real `_core/` directly; one-time neutrality audit | `_core/` landed from web (on disk with real, mobile-ready content) — no assumptions needed | Plan (revised at review) |
| Platform stance | Hybrid, chosen at invocation (default brand-look, `.adaptive()` option) | Standard must carry both flows so the skill can branch | Plan |
| Machine gate | Widget/unit test + build, never `flutter analyze` | House rule: agents must not run analyze | Research + Plan |
| Skill shape | Separate `design-mobile` + one shared `designer` | Matches the settled hub-and-spoke shape | Research |
| Material You | Opt-in only, static brand default | M3's own guidance; protects brand identity | Research |
| Gap-test substrate | `dev-live-android` / Dart Tooling MCP (named, not run) | Natural render substrate for the later on-device gate | Research |

## Scope

**In scope:** `mobile/` delta (spine + token-contract + `_core/` assumptions); `design-mobile` skill;
`designer` agent mobile branch; reconciliation checklist. All under `~/.claude/**` +
`context/slices/mobile-design-generation/**`.

**Out of scope:** realization/pilot/app theming; on-device visual gate; authoring `_core/`; any change
to this web repo's `app/`/`components/`/tests/messages; unified `design` skill.

## Architecture / Approach

Hub-and-spoke clone of the copy capability, re-grounded in Flutter. Author the highest-leverage
artifact first (`mobile/` delta), grounding the token-contract in research's live-doc-cited Dart
surfaces (`ColorScheme`/`TextTheme`/`ThemeExtension`/`ThemeData`) and carrying both platform flows.
Build the `design-mobile` skill via `/skill-creator` (emits artifacts, never lands code). Add the
`designer` mobile branch defensively and capture deferred work in a checklist. No Flutter build runs.

## Phases at a Glance

| Phase | What it delivers | Key risk |
| --- | --- | --- |
| 1. `mobile/` delta | Spine + `ThemeData` token-contract, both flows, `_core/` deltas note | Contradicting the real `_core/` files; encoding deprecated `ColorScheme` roles |
| 2. `design-mobile` skill | Dual-mode, platform-flow-parameterized front-end | Skill leaking into landing code, or weak dual-flow knowledge |
| 3. `designer` mobile branch + checklist | Mobile-parameterized agent (extend-only) + reconciliation checklist | `designer.md` is web-owned — mobile extends or defers, never overwrites |

**Prerequisites:** `_core/` present (✓, landed from web); `/skill-creator` for Phase 2. Only the shared
`designer` agent's creation is still web-owned — mobile extends it if present, else defers the branch
spec to the checklist.
**Estimated effort:** ~1–2 sessions across 3 phases (authoring-only, no app build).

## Open Risks & Assumptions

- The shared `designer` agent isn't created yet (web-owned) — mobile extends it if present, else
  records its mobile-branch spec in the checklist; a review-time reconciliation with web's version
  is required once web lands `designer.md`.
- Exact M3 motion ms/bezier + typography token numbers should be re-verified against the live spec
  before hard-coding (research caveat).
- The capability ships **unvalidated against a real app** by design; the first true test is the later
  `home_storage` pilot.

## Success Criteria (Summary)

- All three artifact groups exist and parse; developer confirms the standard is specific enough to
  change output and carries both platform flows honestly.
- The token-contract names the current `ColorScheme` role set and an analyze-free machine-gate recipe.
- The `_core/` assumptions + reconciliation checklist make the deferred work explicit.
