# Reconciliation checklist — mobile-design-generation

Deferred, cross-slice / cross-repo work this capability slice deliberately did **not**
do, each with its trigger condition and the file(s) to re-touch. This slice is
**capability-authoring only** (no realization pilot, no app theming, no on-device
gate); the items below are where the deferred work resumes.

Context: the shared `designer` agent (`~/.claude/agents/designer.md`) already exists
(web-authored). The mobile slice therefore **extended its body** with a mobile branch
and did **not** create the file or touch its frontmatter (single-owner discipline —
web owns `designer.md`). The `_core/` assumptions reconciliation is **resolved** —
`_core/` was on disk and consumed directly in Phase 1; only the one-time neutrality
audit remained and is recorded in `~/.claude/design-standard/mobile/_core-deltas.md`.

## 1. `designer` agent — frontmatter reconciliation (web-owned)

- **Status:** open — body extended by mobile, frontmatter untouched.
- **Trigger:** the web workstream next revises `~/.claude/agents/designer.md`, or a
  sprint needs the mobile `designer` branch to render on a real device/emulator.
- **What to re-touch — `~/.claude/agents/designer.md` frontmatter (web owns it):**
  1. **`description`** still reads *"Platform = web (the mobile sibling is a separate
     agent)"* — broaden to platform-parameterized (the agent now carries both a web
     branch and a mobile branch in its body).
  2. **`tools`** lacks the Dart Tooling MCP tools the mobile render substrate needs
     (`mcp__dart__launch_app`, `hot_reload`, `hot_restart`, `get_runtime_errors`,
     `get_app_logs`, `get_widget_tree`, `run_tests`, `list_running_apps`,
     `list_devices`). Until added, the mobile branch runs the **static-heuristic**
     gap-test only (documented fallback, never silent). Add them when the mobile
     branch must drive a device.
- **Guardrail:** mobile **never overwrites** this file; only web edits the frontmatter.
  The mobile branch body (added by this slice) is the interface web reconciles against.

## 2. `home_storage` realization pilot (deferred to the Flutter repo)

- **Status:** open — no Flutter corpus is reachable from this web repo.
- **Trigger:** a session in the named house Flutter app (e.g. `home_storage` /
  `home_storage_mobile`) picks up the mobile design capability to actually theme it.
- **What that session must do (specified here, executed there):**
  1. **Run `_core/dna-extraction.md`** against the app's real UI corpus to ground the
     brand *values* the token-contract deferred (the brand seed color, the `TextTheme`
     font pairing, the `ThemeExtension` token values) → a `dna-profile.md` in that
     repo's slice folder.
  2. **Pick the pilot unit** (one screen/component — the mobile analogue of web's hero
     pilot) and run `design-mobile` (or dispatch the `designer` mobile branch) on it.
  3. **Run the on-device Design-Gap-Test** through `dev-live-android` / the Dart
     Tooling MCP — the real visual gate this slice only *named*, scored in both themes.
  4. **Author the machine-gate test in the app** per `token-contract-mobile.md` §7 —
     a widget/unit **test + build** (deprecated-role scan, hardcoded-`Color` scan,
     `ColorScheme` contrast, `ThemeExtension` `copyWith`/`lerp` completeness). **Never
     `flutter analyze`** (user-only house rule; a generated sprint prompt cannot lift
     it).
  5. **Surface the load-bearing rules inline in that app's `CLAUDE.md` / an ADR** —
     sprint agents read those, **not** `context/foundation/` (research Area 5). The
     token surface, the four Dart surfaces, the deprecated-role ban, and the
     analyze-free gate must be visible where the agents look.
  6. **Respect the house architecture** — the theme layer is Presentation-only,
     rooted in `lib/shared/presentation/`, Riverpod-injectable; `ThemeData`/`Color`/
     `TextStyle` must never leak into domain/application/infrastructure.

## 3. Sibling-slice cross-check (informational)

- **Status:** informational — no action unless the web slice changes shape.
- **Trigger:** the web slice revises `_core/*` or the shared `designer` web branch.
- **What to re-check:** the `_core/` neutrality audit
  (`~/.claude/design-standard/mobile/_core-deltas.md` §3) assumed the six `_core/*`
  files as read on 2026-07-19. If web edits `_core/*`, re-run the one-time audit to
  confirm no web-only token syntax leaked in that would break the mobile delta.
