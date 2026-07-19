# Mobile-Design Generation — Implementation Plan

## Overview

Build a reusable, on-brand **mobile (Flutter) design capability** — the `mobile/` delta of the
shared standard home `~/.claude/design-standard/`, a dual-mode `design-mobile` skill, and the
mobile parameterization of the shared `designer` agent. Output is the **reusable, user-scope IP**
only: a reviewable art-direction / design-standard artifact set that a later session (in the
`home_storage` Flutter repo) will consume to actually theme + redesign an app.

This slice is **capability-authoring only** — it deliberately does **not** ship a realization
pilot, does **not** theme a real app, and runs **no on-device visual gate**. Those happen later,
separately, in the Flutter project (the standard is portable / user-scope, so authoring it from
this web repo is correct). It mirrors the `web-design-generation` slice in *shape* but is scoped
to the front-end IP: `mobile/` delta ← `design-mobile` skill + `designer` (mobile branch).

## Current State Analysis

- **No Flutter code is reachable from this repo.** The named house corpus `home_storage` exists on
  disk only as `/c/_projekty/Flutter/buzzards_soft/home_storage/build/` (build output, no `lib/`)
  and `/c/_projekty/Flutter/materiały/home_storage/` (marketing images). The only locally-reachable
  Flutter app with source is `ryj_w_blocie` — a **flat** `data/pages/utils/widgets` structure, not
  the house Clean Architecture + Riverpod. → Code-grounded realization is impossible here; hence the
  capability-only scope.
- **The shared home now exists on disk.** `~/.claude/design-standard/_core/` (6 real files:
  design-charter, design-principles, anti-slop-checklist, a11y-floors, design-gap-test,
  dna-extraction) + `web/` (design-spine, token-contract) landed from the **web slice**. Only
  `mobile/` and `~/.claude/agents/designer.md` are still absent. The `_core/` headers explicitly read
  *"Reusable unchanged by the mobile delta"* — authored platform-neutral for this slice to **read and
  consume directly** (no assumptions needed).
- **The template to clone is live:** `~/.claude/copy-standard/*` (5 contracts:
  `voice-charter.md`, `framework-spine.md`, `namespace-contract.md`, `ban-list-pl.md`,
  `voice-gap-test.md`) + the `generate-professional-copy-pl` skill. The hub-and-spoke shape is proven.
- **The web sibling already delivered `_core/` + `web/`** (its plan Phase 1). This slice reads that
  real `_core/` directly; only the shared `designer` agent (web plan Phase 3, not yet landed) is still
  pending — mobile reconciles its agent branch against web's version when it lands.
- **Flutter theming target is concrete** (research Area 2, live-doc cited): Material 3 default since
  3.16; four Dart surfaces — `ColorScheme` (45 roles, light+dark, surface-container roles since 3.22,
  deprecated `background`/`onBackground`/`surfaceVariant`), `TextTheme` (15 M3 styles,
  `TextTheme.apply()` for font binding), `ThemeExtension<T>` (requires `copyWith`+`lerp`),
  `ThemeData` assembly (+ `.adaptive()` constructors, `ThemeData.adaptations` scope, motion,
  window-size classes). No first-party DTCG→Dart pipeline (codegen seam).
- **House architecture constraint** (research Area 5, `~/.claude/architecture-flutter.md`): a Flutter
  design standard is a **Presentation-layer, `lib/shared/presentation/`-rooted, Riverpod-injectable**
  artifact; `ThemeData`/`Color`/`TextStyle` must never leak into domain/application/infrastructure;
  load-bearing rules must surface inline in the target app's `CLAUDE.md`/ADR (sprint agents read
  those, not `context/foundation/`). This is a **constraint the standard documents**, honored later
  in `home_storage`, not exercised in this slice.

## Desired End State

- `~/.claude/design-standard/mobile/` exists with `design-spine-mobile.md` + `token-contract-mobile.md`
  — the reusable mobile IP, carrying **both** platform flows (single brand-look default + `.adaptive()`
  knowledge) and a short **`_core/` deltas** note that references the real `_core/` files and marks
  mobile-only extensions.
- `~/.claude/skills/design-mobile/SKILL.md` exists — a dual-mode (generate + review) skill that reads
  `_core/` + `mobile/`, takes the platform-flow as an invocation parameter, emits art-direction
  artifacts under `context/slices/**`, and **never writes `ThemeData`/`lib/**` directly**.
- `~/.claude/agents/designer.md` carries a **mobile branch** (platform-parameterized) when web has
  landed it; if the file is still absent, this slice records the mobile-branch spec in the
  reconciliation checklist rather than creating the shared file (web owns creation).
- A `reconciliation-checklist.md` artifact in the slice folder captures what must be re-checked once
  the shared `designer` agent lands (from web) and once a real `home_storage` pilot runs.
- Verify: all three artifact groups exist and parse (frontmatter well-formed); the developer reads the
  standard and confirms it is specific enough to change output, carries both platform flows honestly,
  and the `_core/` assumptions are explicit. **No build/test of a Flutter app in this slice** (none is
  reachable).

### Key Discoveries:

- The **platform-neutral craft is `_core/`'s** (web-authored); mobile's job is strictly the **delta**:
  two platform languages, physical touch targets, thumb-zone ergonomics, bottom-anchored nav, platform
  back semantics, hardware safe-areas / edge-to-edge, gesture discoverability, OS text-scaling to 200%,
  platform motion, Material You opt-in stance, and the Flutter `deepPurple` slop tell (research Area 3).
- The **machine gate must avoid `flutter analyze`** (user-only, house rule): the token-contract
  recommends a **widget/unit test + build** invariant (deprecated-role scan, hardcoded-`Color`/hex
  scan outside the token layer, `ColorScheme` contrast) run via `flutter test` — authored **in the
  target app later**, specified as a contract here.
- The **`_core/` dependency is now satisfied**: `_core/` is on disk with real content, so mobile reads
  the actual neutral contracts and mirrors `web/token-contract.md`'s structure — no assumptions. The
  only residual step is a one-time audit that `_core/` stays Flutter-neutral.
- `dev-live-android` (Dart Tooling MCP: hot reload + runtime logs + on-device screenshots) is the
  **named** gap-test render substrate — referenced in the procedure, not exercised in this slice.

## What We're NOT Doing

- **No realization / pilot / app theming.** No `ThemeData` lands, no `home_storage` screen is
  redesigned, no pilot unit is chosen. That is a **later, separate** session in the Flutter repo.
- **No on-device / emulator visual gate.** "Building on eye" for now — the Design-Gap-Test is
  authored as a *procedure*, not run.
- **No authoring of `_core/`.** `_core/` is the web slice's deliverable and is already on disk. Mobile
  writes only the `mobile/` delta and consumes the real `_core/` directly.
- **No web changes.** This slice touches only user-scope files under `~/.claude/**` plus artifacts
  under `context/slices/mobile-design-generation/**`. It does **not** modify this repo's `app/`,
  `components/`, tests, or messages.
- **No build-vs-buy re-litigation** — settled BUILD (research Area 4).
- **No unified `design` skill** — a separate `design-mobile` was chosen; `design-web` stays the web
  front-end, one shared `designer` agent serves both.

## Implementation Approach

Author the highest-leverage artifact first — the `mobile/` delta — grounding its token-contract in
the research's live-doc-cited Flutter surfaces and carrying **both** platform flows so the skill can
branch at invocation. Because `_core/` isn't on disk, write the delta against **explicit assumptions**
about what `_core/` provides, collected in a dedicated block for review-time reconciliation. Then
build the `design-mobile` skill via `/skill-creator` (dual-mode, platform-flow param), keeping the
copy discipline that skills emit reviewable artifacts and never write production files. Finally add
the mobile branch to the shared `designer` agent (defensively, since the web slice may not have
created it yet) and drop a reconciliation checklist for the later `home_storage` pilot. No Flutter
build runs; verification is artifact-existence + developer read-through.

## Critical Implementation Details

- **`_core/` is present — read it, don't assume it.** Every `mobile/` file that leans on a `_core/`
  concept (principles, anti-slop thesis, a11y floors, gap-test method, DNA-extraction) must reference
  the **real** `~/.claude/design-standard/_core/*` files by name and add mobile-only material as
  genuine *extensions*, never duplicating or contradicting them. Run a one-time audit that `_core/`
  carries no web-only token syntax that would break under Flutter.
- **No first-party DTCG→Dart pipeline.** The token-contract must define the **codegen seam** (Style
  Dictionary or custom generator) as the way a token file feeds `ThemeData`; do not assert a built-in
  Flutter token pipeline (there is none).
- **Deprecated `ColorScheme` roles are a hard "do not emit."** `background`/`onBackground`/
  `surfaceVariant` are deprecated → `surface`/`onSurface`/`surfaceContainerHighest`; surface-container
  roles arrived in 3.22. The contract must name the current role set, not the pre-3.22 one.
- **`flutter analyze` is forbidden for agents** (user-only). The machine-gate recipe the contract
  recommends must be **test + build** only. A generated sprint prompt cannot lift this — so the
  contract must not phrase the gate as "run analyze."
- **Ground external Flutter API facts in research, not memory.** The token-contract's API shapes
  (`ColorScheme.fromSeed` params, `TextTheme.apply` keys, `ThemeExtension` `copyWith`/`lerp`,
  `ThemeData.adaptations` scope) are lifted from `research.md` `## External Sources` (Context7 /
  live-doc cited). Re-verify M3 motion ms/bezier + the typography token table against the live spec
  before hard-coding exact numbers (research caveat).

## Phase 1: `mobile/` delta of the design standard

### Overview

Author the reusable mobile IP: the mobile design-spine and the `ThemeData`-targeting token-contract,
carrying both platform flows and an explicit `_core/` assumptions block. Pure artifact — nothing lands
in any app.

### Changes Required:

#### 1. Mobile design-spine

**File**: `~/.claude/design-standard/mobile/design-spine-mobile.md`

**Intent**: The mobile layout / composition playbook — the mobile-only delta over `_core/`'s neutral
craft. Encodes: two platform design languages (iOS HIG vs Material 3) and the **dual-flow stance**
(single brand-look default, `.adaptive()` optional, chosen at skill invocation); physical touch
targets (44pt / 48dp + ≥8dp); thumb-zone ergonomics; bottom-anchored navigation (tab bar / nav bar /
FAB / bottom sheets → side sheets by window class); platform back semantics; hardware safe-areas +
edge-to-edge (Android 15+); gesture discoverability tax; OS text-scaling to 200% with reflow; platform
motion languages + reduce-motion substitution; screen-reader labeling (VoiceOver / TalkBack). Both
flows must be documented richly enough that the skill can drive either without extra research.

**Contract**: Markdown, no frontmatter (mirror `~/.claude/copy-standard/*` shape). References `_core/`
concepts by name without redefining them. Every platform claim traceable to `research.md` Area 3 /
`## External Sources`. Section explicitly labels which rules are **brand-look** vs **adaptive** vs
**both**, so the skill's platform-flow param maps onto it cleanly.

#### 2. Mobile token-contract (the machine-readable target)

**File**: `~/.claude/design-standard/mobile/token-contract-mobile.md`

**Intent**: The locked, machine-checkable Flutter token surface the generator's output must map onto,
across the four Dart surfaces: `ColorScheme` (45 M3 roles, light + dark = two `ThemeData`,
current surface-container roles, **no deprecated roles**); `TextTheme` (15 M3 styles, brand-font
binding via `TextTheme.apply({fontFamily, …})`, `TextStyle.height` as a fontSize multiple);
`ThemeExtension<T>` for brand tokens Material doesn't model (each with `copyWith` + `lerp`);
`ThemeData` assembly + `.adaptive()` / `ThemeData.adaptations` scope + motion + window-size
breakpoints. Encodes the **Material You opt-in-only** stance (static brand scheme = source of truth),
the **DTCG→Dart codegen seam**, and the **machine-gate recipe** (widget/unit test + build, never
`flutter analyze`): deprecated-role scan, hardcoded-`Color`/hex scan outside the token layer,
`ColorScheme` contrast check. Names the Flutter **`deepPurple` slop tell** + its API-level
countermeasure.

**Contract**: Names exactly the Dart surfaces/roles a later `home_storage` theming step will own.
Grounds every API shape in `research.md` `## External Sources` (Context7-cited), citing the source
inline. Machine-gate section phrases the gate as **test + build**, explicitly not analyze.

#### 3. `_core/` deltas note + mobile a11y/anti-slop extensions

**File**: `~/.claude/design-standard/mobile/token-contract-mobile.md` (a short `_core/ deltas` section)
and/or a short `~/.claude/design-standard/mobile/_core-deltas.md`

**Intent**: A short note that (a) points to the **real** on-disk `_core/*` files mobile builds on and
(b) lists the **mobile-only extensions** to them — mobile a11y floors (text 4.5:1 / non-text 3:1 /
target ≥24×24 AA aligning to 44pt/48dp) and mobile anti-slop tells (incl. the Flutter `deepPurple`
tell) — that extend `_core/a11y-floors.md` and `_core/anti-slop-checklist.md` without redefining them.
Includes the one-time neutrality audit: confirm `_core/` carries no web-only token syntax.

**Contract**: References the real `_core/` files by name; mobile material clearly marked as
*extensions*, not a fork. No standing assumptions to reconcile later.

### Success Criteria:

#### Automated Verification:

- Mobile delta files exist: `ls ~/.claude/design-standard/mobile/*.md`

#### Manual Verification:

- Developer reads `design-spine-mobile.md` + `token-contract-mobile.md`: the spine is specific enough
  to change generated output; **both** platform flows (brand-look + `.adaptive()`) are documented well
  enough to drive generation; the token-contract names the correct current `ColorScheme` role set (no
  deprecated roles) and the four Dart surfaces; the machine-gate recipe avoids `flutter analyze`.
- The `_core/` deltas note references the real `_core/` files and marks mobile material as genuine
  extensions; the one-time `_core/` neutrality audit is recorded.

**Implementation Note**: Pause for developer confirmation of the `mobile/` delta before building the
skill — this is the highest-leverage artifact.

---

## Phase 2: `design-mobile` skill (dual-mode, platform-flow parameterized)

### Overview

Author the interactive capability front-end via `/skill-creator`: a dual-mode skill that generates and
reviews mobile art-direction against the standard, branching on the platform-flow parameter.

### Changes Required:

#### 1. `design-mobile` skill

**Files**: `~/.claude/skills/design-mobile/SKILL.md` (+ optional `references/`)

**Intent**: A dual-mode skill authored **using `/skill-creator`**: *generate* mode produces a reviewable
art-direction artifact for one screen/component (reads `_core/` + `mobile/`, self-scores with the
Design-Gap-Test procedure, names `dev-live-android` / Dart Tooling MCP as the render substrate);
*review* mode audits an existing Flutter surface against the standard (gap-test as the rubric). Takes
the **platform-flow** as an invocation parameter (default = single brand-look, option = `.adaptive()`)
and carries enough embedded knowledge to drive both. Emits artifacts under `context/slices/**` and
**never writes `ThemeData`/`lib/**` directly** (mirrors copy's never-writes-`messages/*.json` rule).

**Contract**: SKILL.md frontmatter `name: design-mobile` + `description` with PL+EN triggers +
allowed-tools including the Dart Tooling MCP / `dev-live-android` path. Prose body; substance lives in
the shared home. One generation unit = one screen/component (the ~800-word-window analogue). Platform
grounding claims cite `research.md`.

### Success Criteria:

#### Automated Verification:

- Skill exists and frontmatter parses: `ls ~/.claude/skills/design-mobile/SKILL.md`

#### Manual Verification:

- Developer reads the skill: both modes are clear; the platform-flow parameter is real and documented;
  the skill correctly reads `_core/` + `mobile/` and never lands production code; `dev-live-android` is
  named as the (later) render substrate.

**Implementation Note**: Pause for developer confirmation of the skill before touching the shared agent.

---

## Phase 3: `designer` agent mobile branch + reconciliation checklist

### Overview

Add the mobile parameterization to the shared `designer` agent (defensively, since the web slice may
not have created it yet), and drop a reconciliation checklist for the later `home_storage` pilot and
the eventual `_core/` landing.

### Changes Required:

#### 1. `designer` agent — mobile branch

**Files**: `~/.claude/agents/designer.md`

**Intent**: The sprint-callable autonomous form, platform-parameterized. **Web owns creation of
`designer.md`** (web plan Phase 3/6). Mobile's job here is bounded: if `designer.md` **exists**, EXTEND
it with a mobile branch that reads `_core/` + `mobile/`; if it is **absent**, do **not** create it —
instead record the mobile-branch spec into `reconciliation-checklist.md` for web's Phase 3/6 to fold
in. When present, the agent opens with "read `SPRINT_RULES.md` + host `CLAUDE.md` first", reads the
shared home, runs a self-contained generate→gap-test→fix loop for a screen/component, returns a
finished artifact, and **never lands directly**.

**Contract**: Single owner = web; mobile **never overwrites** `designer.md`. When extending,
frontmatter `name/description/model/tools` is preserved and the mobile branch reads `_core/` +
`mobile/`. When absent, the mobile-branch spec lives in `reconciliation-checklist.md`, not in a
mobile-created file.

#### 2. Reconciliation checklist

**Files**: `context/slices/mobile-design-generation/reconciliation-checklist.md` (artifact)

**Intent**: A short checklist capturing what must be re-verified later: (a) reconcile the `designer`
agent's mobile branch with web's authored version once web lands `~/.claude/agents/designer.md`;
(b) the deferred `home_storage` realization pilot (pick pilot unit, run the on-device Design-Gap-Test,
author the machine-gate test in the app, surface load-bearing rules into that app's `CLAUDE.md`/ADR).
The former `_core/` assumptions reconciliation is **resolved** — `_core/` is already on disk and
consumed directly in Phase 1 (only the one-time neutrality audit remains, done there).

**Contract**: Plain markdown checklist in the slice folder; each item names the trigger condition and
the file(s) to re-touch.

### Success Criteria:

#### Automated Verification:

- Reconciliation checklist exists: `ls context/slices/mobile-design-generation/reconciliation-checklist.md`

#### Manual Verification:

- Designer state is correct: **if** `~/.claude/agents/designer.md` exists it carries a mobile branch;
  **if absent**, its mobile-branch spec is in the checklist — mobile never creates the shared file.
- Developer reads the `designer` mobile branch / spec: platform-parameterized, reads the shared home,
  never lands directly.
- The reconciliation checklist correctly captures the deferred `designer`-agent + `home_storage` pilot
  work.

**Implementation Note**: Closing gate — developer confirms the capability set is coherent and the
deferred work is captured, then the slice is ready to close (realization happens separately).

---

## Testing Strategy

This slice ships **no application code** — there is no reachable Flutter app to build or test, and the
deliverables are user-scope authored artifacts. Verification is therefore **artifact existence +
frontmatter well-formedness + developer read-through**, not a code test suite. The *test contract for
the future realization* (widget/unit token-conformance + build, never `flutter analyze`) is **authored
into `token-contract-mobile.md`** as the recipe the later `home_storage` session will implement — it
is a specification here, not a runnable gate.

| Behavior asserted | Expected outcome (oracle source) | Regression caught | Layer | Anti-pattern avoided |
|---|---|---|---|---|
| Mobile delta files exist + parse | files present, no frontmatter-parse error | Missing/broken standard artifact | file/lint | Not asserting prose content — only existence + form |
| Skill + agent frontmatter well-formed | `name`/`description`/tools present and valid | Malformed skill/agent that won't load | file/lint | Not snapshotting body prose |
| Token-contract names current `ColorScheme` roles | no deprecated `background`/`onBackground`/`surfaceVariant` (research Area 2, live-doc) | Standard encoding pre-3.22 roles | manual read vs research | Not pinning exact colors — asserts the role-set invariant |
| Machine-gate recipe avoids `flutter analyze` | gate phrased as test + build only (house rule) | A generated sprint prompt later running a user-only command | manual read | Not laundering a user-only command through the contract |

### Manual Testing Steps:

1. Read `design-spine-mobile.md`: confirm both platform flows are documented and the mobile-only deltas
   are all present (touch targets, thumb-zone, back, safe-area, text-scaling, motion, a11y).
2. Read `token-contract-mobile.md`: confirm the four Dart surfaces, current role set, Material You
   opt-in stance, codegen seam, and the analyze-free machine-gate recipe.
3. Read the skill + agent: confirm dual-mode, platform-flow param, reads shared home, never lands code.
4. Read the `_core/` assumptions block + reconciliation checklist: confirm the deferred work is honest
   and complete.

## Performance Considerations

None — no runtime artifact ships in this slice.

## Migration Notes

None in this repo. The one durable coupling is the **deferred reconciliation** with `_core/` (web) and
the `designer` agent's web-authored version, both tracked in `reconciliation-checklist.md`.

## References

- Research: `context/slices/mobile-design-generation/research.md`
- Sibling (web) plan (shape mirror + `_core/` + `designer` creation): `context/slices/web-design-generation/plan.md`
- Live template to clone: `~/.claude/copy-standard/*`, `~/.claude/skills/generate-professional-copy-pl/`
- House Flutter canon: `~/.claude/architecture-flutter.md`
- Flutter theming grounding: `research.md` `## External Sources` (ColorScheme/TextTheme/ThemeExtension/ThemeData)

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles. See `references/progress-format.md`.

### Phase 1: mobile/ delta of the design standard

#### Automated

- [x] 1.1 Mobile delta files exist under `~/.claude/design-standard/mobile/` — 25c47c2

#### Manual

- [x] 1.2 Developer reviews spine + token-contract (both flows documented, current role set, analyze-free gate) — 25c47c2
- [x] 1.3 `_core/` deltas note references real `_core/` + neutrality audit recorded — 25c47c2

### Phase 2: design-mobile skill (dual-mode, platform-flow param)

#### Automated

- [x] 2.1 Skill exists + frontmatter parses — 95e331b

#### Manual

- [x] 2.2 Developer reviews skill (both modes, platform-flow param, reads shared home, never lands code) — 95e331b

### Phase 3: designer agent mobile branch + reconciliation checklist

#### Automated

- [x] 3.1 Reconciliation checklist exists — d08cadc

#### Manual

- [x] 3.2 Designer state correct (mobile branch if designer.md exists; spec in checklist if absent; mobile never creates) — d08cadc
- [x] 3.3 Developer reviews designer mobile branch / spec (platform-param, reads home, never lands) — d08cadc
- [x] 3.4 Reconciliation checklist captures deferred agent + home_storage work — d08cadc
