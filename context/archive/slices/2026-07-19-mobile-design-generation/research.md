---
date: 2026-07-19T12:35:00+0200
researcher: Claude (Opus 4.8)
git_commit: 6d4534c7a7d661d98a29ad154ba0713f42bb9c6c
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Reusable professional MOBILE (Flutter) design capability — mirror of the copywriting capability"
tags: [research, design-system, flutter, material-3, themedata, themeextension, capability, skill, agent]
status: complete
last_updated: 2026-07-19
last_updated_by: Claude (Opus 4.8)
---

# Research: Professional mobile-design generation (reusable Flutter art-direction capability)

**Date**: 2026-07-19T12:35:00+0200
**Researcher**: Claude (Opus 4.8)
**Git Commit**: 6d4534c7a7d661d98a29ad154ba0713f42bb9c6c
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web (web repo — no Flutter code; mobile grounding is external + house seed)

## Research Question

How do we build a reusable, on-brand **professional mobile (Flutter) design capability** that mirrors
the `web-copy-generation` copywriting capability in shape — producing a **reviewable art-direction /
design-standard artifact** (not a direct code dump), driven by a shared `~/.claude/design-standard/`
home + an interactive `design-mobile` skill + a sprint-callable `designer` agent, grounded in the
Flutter house stack (Clean Architecture + Riverpod, Material 3 / `ThemeData`)? Includes a build-vs-buy
analysis and the concrete content a professional Flutter design standard should hold — plus how mobile
design differs from web (the sibling `web-design-generation` slice).

## Summary

**Build, not buy — same verdict as copy and web.** Across all five installed marketplaces, **no skill
is simultaneously (a) Flutter/`ThemeData`-grounded AND (b) carries a durable, on-brand, reviewable
design STANDARD.** The two properties exist only apart: Flutter-grounded agents (`flutter-mobile-app-dev`,
`mobile-app-builder`) are **stateless dev assistants that presuppose the standard we'd build**; the one
real brand/token *standard* (tonone `form-brand`/`form-tokens`) is **web/Figma/CSS-first** and cannot
emit Flutter theming; the one well-structured *scored* standard (`wondelai-ios-hig-design`) is
**iOS/SwiftUI + generic Apple HIG**, not our brand and not Flutter. The reusable IP must be built.

**Same hub-and-spoke clone as web**, re-grounded in Flutter: `~/.claude/design-standard/` (charter +
spine + anti-slop-checklist + **token-contract targeting `ThemeData`** + design-gap-test) ← a
`design-mobile` interactive skill + the **shared** `designer` sprint agent. The platform-neutral core
(principles, anti-slop thesis, a11y floors, gap-test procedure, DNA-extraction method) is **identical
to web** — strong argument for a shared `design-standard/_core/` with `web/` and `mobile/` deltas
(cross-referenced with the web research's Open Question #1).

**Mobile's genuine divergences from web are large and must be encoded as mobile-only rules** (full
delta list below): two platform design languages (iOS HIG vs Material 3, not one canvas), **physical
touch targets** (44pt / 48dp + 8dp, hit-area ≠ visual size), thumb-zone ergonomics, bottom-anchored
navigation, platform back semantics, hardware-shaped safe areas (notch / Dynamic Island / edge-to-edge
enforced on Android 15+), invisible gesture vocabulary, OS-driven text scaling (Dynamic Type / `sp`
to 200%), system dark mode + a deliberate **opt-in-only** stance on Material You dynamic color, and the
Flutter-specific **`ColorScheme.fromSeed(Colors.deepPurple)` "slop tell."**

**The Flutter token surface is concrete and machine-targetable** — the standard's machine-readable half
owns four Dart surfaces: `ColorScheme` (45 M3 roles, light+dark), `TextTheme` (15 M3 styles),
`ThemeExtension<T>` (brand tokens Material doesn't model, with required `copyWith`/`lerp`), and
`ThemeData` assembly + adaptive/motion/breakpoint wiring. Flutter has **no first-party DTCG→Dart
pipeline**, so a token file feeds in via codegen (Style Dictionary or custom) — a seam the standard
must define.

**Architecture constraint (house seed):** a Flutter design standard is a **Presentation-layer,
`lib/shared/presentation/`-rooted, Riverpod-injectable, `CLAUDE.md`/ADR-surfaced** artifact — it must
NOT leak `ThemeData`/`Color`/`TextStyle` below Presentation (domain/application/infrastructure forbid
Flutter), and its load-bearing rules must land inline in the target app's `CLAUDE.md`/ADR because
sprint agents read those, not `context/foundation/`.

## Detailed Findings

### Area 1 — The copy capability blueprint we mirror (same as web; established in the sibling slice)

Identical hub-and-spoke to the web slice — see `context/slices/web-design-generation/research.md`
Area 2 and the live on-disk template `~/.claude/copy-standard/*` (5 contracts, materialized today).
The five-contract → design-standard mapping holds verbatim; only the **token-contract** and **spine**
are re-grounded for Flutter (Areas 2 & 5 below). The 6-phase build, pilot-one-unit-first, artifact→
review→land separation, ~800-word "one component/screen per generation" window, agent-last-off-critical-
path, and corrections-as-data / design-DNA method all transfer unchanged.

### Area 2 — Flutter theming & design tokens (external, cited) — the machine-readable target

Material 3 is the default since **Flutter 3.16** (`useMaterial3: true`; new code should not set the
flag). The design system enters via `MaterialApp.theme`/`darkTheme`, each a `ThemeData`, whose look is
"primarily determined by `ThemeData.colorScheme` and `ThemeData.textTheme`" (docs.flutter.dev/release/
breaking-changes/material-3-default).

- **`ColorScheme` — the color contract (45 roles).** Recommended entry point
  `ColorScheme.fromSeed(seedColor:, brightness:, dynamicSchemeVariant:, contrastLevel:)` generates an
  accessible tonal palette; individual roles can be overridden (api.flutter.dev/flutter/material/
  ColorScheme-class.html). Light + dark are **two separate `ThemeData`** with matching-brightness
  schemes. **Surface-container roles** (`surfaceDim/Bright`, `surfaceContainerLowest…Highest`) replaced
  the elevation-tint model in **Flutter 3.22.0**; `background`/`onBackground`/`surfaceVariant` are
  **deprecated** → `surface`/`onSurface`/`surfaceContainerHighest` (docs.flutter.dev/release/
  breaking-changes/new-color-scheme-roles). The standard must NOT emit the deprecated roles.
- **`TextTheme` — the type contract (15 M3 styles).** display/headline/title/body/label × L/M/S from
  `Typography.material2021`; customize via `ThemeData.textTheme`; **`TextTheme.apply({fontFamily,
  fontSizeFactor, letterSpacingFactor, …})`** transforms all 15 uniformly (the way to bind one brand
  font). `TextStyle.height` is a **multiple of fontSize** (unset ≠ 1.0); `letterSpacing` in logical px
  (api.flutter.dev/flutter/material/TextTheme-class.html, .../painting/TextStyle-class.html).
- **`ThemeExtension<T>` — the brand-token contract.** The idiomatic mechanism for tokens beyond
  Material defaults (custom colors, spacing, radii, gradients, motion). Each type must implement
  **`copyWith`** and **`lerp`** (so themes interpolate on light↔dark/animated switches); registered via
  `ThemeData(extensions: [...])`, read via `Theme.of(context).extension<T>()!`
  (api.flutter.dev/flutter/material/ThemeExtension-class.html).
- **Fonts** — `google_fonts` (8.2.0): runtime-fetch vs asset-bundling; production/offline = bundle
  weights + `GoogleFonts.config.allowRuntimeFetching = false`. Custom fonts via `pubspec flutter:
  fonts:` (family + weight/style per asset) (github.com/flutter/packages google_fonts README,
  docs.flutter.dev/cookbook/design/fonts).
- **Motion** — implicit (`AnimatedContainer`/`TweenAnimationBuilder`) vs explicit (`AnimationController`).
  Material motion via the `animations` package (Container Transform, Shared Axis, Fade Through);
  **predictive back** is the Android default page transition since **3.38** (duration 300→450ms).
  Reduced motion: gate decorative motion on `MediaQuery.of(context).disableAnimations`
  (api.flutter.dev/flutter/animation, docs.flutter.dev/platform-integration/android/predictive-back).
- **Cupertino / adaptive** — `CupertinoThemeData` for the iOS look; `.adaptive()` constructors
  (`Switch.adaptive`, `AlertDialog.adaptive`, …) branch on `Theme.of(context).platform`. **`Theme.adaptive`
  does NOT exist**; `ThemeData.adaptations`/`Adaptation<T>` currently retheme only `Switch.adaptive`.
  `SafeArea` + `MediaQuery.sizeOf/paddingOf/viewInsetsOf` for insets; window-size classes
  Compact(0-599)/Medium(600-839)/Expanded(840-1199)/Large/Extra-large drive responsive nav
  (docs.flutter.dev/platform-integration/platform-adaptations, .../ui/adaptive-responsive).

### Area 3 — Mobile design principles & how they DIFFER from web (external, cited)

The platform-neutral craft (hierarchy, contrast, spacing rhythm, brand palette/type, restraint) is
shared with web. The **mobile-only delta** the standard must add:

1. **Two platform design languages, not one** — iOS HIG (bottom **tab bar** nav, title+chevron back,
   **no persistent system back** → left-edge swipe, SF Pro, Alerts/wheel pickers/flat) vs Material 3
   (nav bar→rail→drawer by window class, top app bar, **OS Back**, FAB, Roboto, Dialogs/calendar/
   elevation). A deliberate stance on **platform-adaptive (`.adaptive()`) vs single-brand** chrome.
   Sources: developer.apple.com/design/human-interface-guidelines/{tab-bars,navigation-and-search},
   m3.material.io/components/{navigation-bar,app-bars}, docs.flutter.dev/ui/adaptive-responsive/platform-adaptations.
2. **Touch, not pointer** — physical min targets **44×44pt (Apple) / 48×48dp (Material) + ≥8dp
   spacing**; hit-area ≠ visual size. Sources: m1.material.io/usability/accessibility.html,
   support.google.com/accessibility/android/answer/7101858.
3. **Ergonomic geometry** — thumb-zone / reachability: ~75% thumb-driven, primary actions bottom-center,
   top corners a one-handed liability. (smashingmagazine.com/2016/09/the-thumb-zone…) No web analog.
4. **Bottom-anchored navigation** — tab bar / bottom nav / FAB / bottom sheets are the mobile default
   plane; web defaults to top. Bottom sheets ≤50% initial, expandable; → side sheets on large screens
   (m3.material.io/components/{bottom-sheets,side-sheets}).
5. **Platform back semantics** — iOS edge-swipe/title-back vs Android OS Back — an app-behavior contract
   absent from web's browser Back (docs.flutter.dev/ui/adaptive-responsive/platform-adaptations).
6. **Hardware-shaped safe layout** — notch / **Dynamic Island** / display cutouts; **edge-to-edge
   enforced on Android 15 (API 35)+** (`safeDrawing`/`safeGestures`/`displayCutout` insets). Keep app
   bars, FABs, last list items out of obscured zones (developer.android.com/develop/ui/…/edge-to-edge).
7. **Gesture vocabulary + discoverability tax** — swipe/long-press/pull-to-refresh are invisible;
   OS-reserved zones exist; "include a visible cue when people can swipe"
   (developer.apple.com/design/human-interface-guidelines/gestures, nngroup mobile usability).
8. **OS-driven text scaling as a hard floor** — Dynamic Type / `sp` up to **200%** with reflow, no
   overlap/truncation (developer.apple.com/help/app-store-connect/…/larger-text-evaluation-criteria,
   developer.android.com/guide/topics/ui/accessibility/apps).
9. **System dark mode + Material You** — follow OS appearance with **semantic/adaptive colors**;
   M3's own guidance: a fixed brand keeps a **static custom scheme** as source of truth and offers
   dynamic (wallpaper-derived) color **opt-in only**, never as brand default
   (m3.material.io/styles/color/dynamic-color).
10. **Platform motion languages** — iOS spring/interruptible vs Material container-transform/shared-axis;
    OS Reduce-Motion → **substitute meaningful motion (fade), don't strip** (maps WCAG 2.3.3)
    (m3.material.io/styles/motion, developer.apple.com/…/reduced-motion-evaluation-criteria).
11. **Platform screen readers** — VoiceOver / TalkBack labeling contract beyond web ARIA.
12. **The Flutter "deepPurple default" slop tell** — see Area 4.

**Mobile a11y floors (WCAG 2.2 A/AA applies to native — W3C WCAG2Mobile):** text contrast **4.5:1**
(large 3:1), non-text/UI **3:1** (SC 1.4.11); target size **≥24×24** (AA) / 44×44 (AAA) aligning to
Apple 44pt / Android 48dp; screen-reader labels on all actionable elements. Sources: w3c.github.io/matf,
w3.org/WAI/WCAG22/Understanding/{contrast-minimum,target-size-minimum}.

### Area 4 — Build-vs-buy + market scan (external + local, cited)

Searched all five marketplaces by name and by `ThemeData|useMaterial3|ColorScheme.fromSeed|MaterialApp|
Material 3` content.

| Skill / asset | Output | Persistent brand STANDARD? | Flutter/Material-grounded? | Gap for us |
| --- | --- | --- | --- | --- |
| `flutter-mobile-app-dev` (awesome) | code | No — *reads* your design system | **Yes** | Stateless dev assistant; presupposes the standard |
| `mobile-app-builder` (awesome) | code | No | Partial (one of Swift/Kotlin/RN/Flutter) | Generalist, perf-focused, no standard |
| `mobile-ux-optimizer` (awesome) | recs + code | No — analyzes existing theme | Weak (CSS/Flexbox framing) | Web mental model, not `ThemeData`; advisory |
| `wondelai-ios-hig-design` (plus) | **scored review** + guidance | Yes — but **Apple HIG**, not our brand | **iOS/SwiftUI**, not Flutter | Great *template to imitate* (scored, principled); wrong platform + generic |
| `tonone form-brand/form-tokens/form-palette` (plus) | brand brief + **token files** | **Yes — real brand+token standard** | **No — web/Figma/CSS/Tailwind** | Closest to a standard; cannot emit `ThemeData`; hand-translation on every use |
| `tonone form-mobile/touch-*` (plus) | one-shot specs | No | Flutter detected among many | Figma-style specs, not code/`ThemeData` |
| axiom SwiftUI suite (plus) | code+review | No (Apple's) | **Swift/SwiftUI iOS 26+** | Not Flutter |

**Verdict — BUILD.** No asset sits at the needed intersection (Flutter-grounded ∧ on-brand ∧ durable ∧
reviewable). Borrow structurally from `wondelai-ios-hig-design` (scored diagnostic + reference-file
layout — a good shape for the design-gap-test) and conceptually from tonone `form-brand`/`form-tokens`
(brand→tokens→code contract), **re-grounded in Flutter `ThemeData`**.

**The Flutter "AI slop" tell** (Area 3 #12): untouched `ColorScheme.fromSeed(seedColor: Colors.deepPurple)`
(the confirmed `flutter create` template default), M3 `tonalSpot` pastel palette, default Roboto, stock
`AppBar` + generic `FloatingActionButton(Icons.add)`, no shape/elevation/motion customization — the
mobile-native "purple + Inter + rounded cards" average. Countermeasure maps onto Flutter's own API:
brand-derived/role-specified `ColorScheme`, `textTheme` bound to real fonts, component themes
(`AppBarTheme`/`CardTheme`/shapes/elevation), deliberate motion/iconography — decided with human
conviction *before* generating. Sources: github.com/flutter/flutter flutter_tools app template,
api.flutter.dev ColorScheme.fromSeed, m3.material.io/theme-builder.

### Area 5 — Flutter architecture constraints + skill/agent anatomy (house seed + ecosystem)

**Architecture (from `~/.claude/architecture-flutter.md` — Clean Architecture + Riverpod, canonized in
`home_storage_mobile` ADR-0006):**
- Layers: **domain** / **application** / **infrastructure** / **presentation** (all Flutter UI) / **core**
  / **shared** / **app**. Domain/application/infrastructure **forbid Flutter** — `ThemeData`/`Color`/
  `TextStyle` cannot appear there.
- **Theming home is explicitly `lib/shared/presentation/`** ("theme, shared widgets"). A design-token
  layer sits there and is consumed by feature `presentation/`. Feature-first → tokens are a **shared
  cross-feature concern**, not scattered per feature.
- **Riverpod is the only DI** — runtime theme injection (dark-mode toggle) goes through a provider.
- **Agent-visibility rule:** sprint agents read repo `CLAUDE.md` + `docs/adr/`, **not**
  `context/foundation/`. A durable design standard must surface its load-bearing rules inline in the
  target app's `CLAUDE.md`/an ADR (same pattern the architecture doc uses).

**Skill/agent anatomy** — identical to the web slice (see `web-design-generation/research.md` Area 5):
skills at `~/.claude/skills/<name>/SKILL.md` (prose body, optional `references/`); agents at
`~/.claude/agents/<name>.md` (read `SPRINT_RULES.md` + host `CLAUDE.md` first, dispatched by
`/sprint-run`); shared home `~/.claude/design-standard/`. The `designer` agent is **shared web+mobile**
(candidate) — it reads the platform-relevant deltas.

**Relationship to existing mobile skills (complement, not overlap)** — `dev-live-android` (live visual
co-dev / hot reload), `dev-live-plan-android` (feedback capture), `dev-cycle-ios` (TestFlight build
loop), `clone-feature-to-mobile` (feature port) are all **live/porting execution loops** that own no
design-standard role. A Flutter design standard is the **missing upstream input** they consume and
iterate against — complementary.

## Code References

*(No Flutter code in this web repo.)* Grounding is external + the house seed:
- `~/.claude/architecture-flutter.md` — Clean Architecture + Riverpod; `lib/shared/presentation/` = theming home.
- `~/.claude/copy-standard/*` — live 5-contract template to structurally clone.
- `context/slices/web-design-generation/research.md` — sibling; copy-blueprint + skill/agent anatomy + shared-core decision.

## External Sources (live docs)

- **Flutter theming** — api.flutter.dev/flutter/material/{ColorScheme,TextTheme,ThemeExtension,ThemeData}-class.html;
  docs.flutter.dev/release/breaking-changes/{material-3-default,material-3-migration,new-color-scheme-roles,
  default-android-page-transition}; docs.flutter.dev/{cookbook/design/{fonts,themes},ui/animations,
  ui/adaptive-responsive/{platform-adaptations,safearea-mediaquery,large-screens},platform-integration/
  android/predictive-back}.
- **Packages** — pub.dev/packages/{google_fonts (8.2.0),flutter_animate (4.5.2),animations (2.2.0)};
  github.com/flutter/flutter material/typography.dart; github.com/flutter/flutter flutter_tools app template.
- **Design systems / platform** — m3.material.io/{styles/{color/{roles,dynamic-color},typography/type-scale-tokens,
  motion/easing-and-duration},components/*,foundations/layout,theme-builder};
  developer.apple.com/design/human-interface-guidelines/* (SPA — see caveat); developer.android.com/develop/ui/…/edge-to-edge.
- **A11y** — w3.org/TR/WCAG22, w3c.github.io/matf, w3.org/WAI/WCAG22/Understanding/{contrast-minimum,target-size-minimum};
  developer.apple.com/help/app-store-connect/…/{larger-text,reduced-motion}-evaluation-criteria.
- **Anti-slop** — eidosdesign.substack.com, drawbackwards.com/blog/ai-generated-ui….

*Caveats:* `developer.apple.com/…/human-interface-guidelines/*` and `m3.material.io/*` are JS-rendered
SPAs — numbers cross-checked against server-rendered equivalents; pull verbatim Apple/Material wording
via a real browser if the final spec needs it. Exact **M3 motion ms/bezier tokens** and the **typography
token table** should be reverified against the live spec before hard-coding. `google_fonts` 8.2.0 /
`flutter_animate` 4.5.2 versions and `ThemeData.adaptations` scope should be re-checked at impl time.

## Architecture Insights

- **Clone hub-and-spoke, re-grounded in Flutter.** `~/.claude/design-standard/` (charter + spine +
  anti-slop-checklist + **`ThemeData` token-contract** + design-gap-test) ← `design-mobile` skill +
  shared `designer` agent. Dual gate: **Design-Gap-Test** (visual — rendered on device/emulator via the
  `dev-live-android` loop / Dart Tooling MCP screenshots) + machine (token-conformance, `flutter
  analyze`* , widget tests, contrast). *Note the house rule: **agents must NOT run `flutter analyze`**
  (user-only) — the machine gate uses the project's test command + build, never analyze.
- **The four machine-readable Dart surfaces** the token-contract must own: `ColorScheme` (45 roles,
  light+dark, no deprecated roles), `TextTheme` (15 styles), `ThemeExtension<T>` (brand tokens w/
  `copyWith`+`lerp`), `ThemeData` assembly + adaptive/motion/breakpoint wiring. DTCG→Dart is codegen
  (no first-party pipeline) — define that seam.
- **Shared core web↔mobile** — principles, anti-slop thesis, a11y floors, gap-test procedure,
  DNA-extraction method are platform-neutral → favor `design-standard/_core/` + `web/`+`mobile/` deltas
  (Open Question, shared with the web slice).
- **Mobile review needs a device/emulator** — the visual gate is heavier than web's (which can use
  headless Chrome); `dev-live-android` (hot reload + runtime logs via Dart Tooling MCP) is the natural
  rendering substrate for the Design-Gap-Test.
- **Grounding gap to close before planning** — this repo has no Flutter code. The pilot and DNA
  extraction need a **named house Flutter app** (e.g. `home_storage_mobile`) as the corpus; unlike web
  (whose live site is a ready corpus), mobile design-DNA may lean more top-down until a target app is
  chosen. See Open Questions.

## Historical Context (from prior changes)

- `context/slices/web-copy-generation/**` + live `~/.claude/copy-standard/*` — the capability mirrored;
  today the other instance also created the `generate-professional-copy-pl` skill, confirming the
  front-end shape.
- `~/.claude/architecture-flutter.md` + `home_storage_mobile` ADR-0006 — the Flutter house canon a
  mobile design standard must fit.

## Related Research

- `context/slices/web-design-generation/research.md` — sibling (web). Shared-core decision, copy
  blueprint, and skill/agent anatomy are established there and referenced here.
- `context/slices/web-copy-generation/research.md` — the copy capability both design slices mirror.

## Open Questions

1. **Shared core vs per-platform split** — `design-standard/_core/` (principles, anti-slop, a11y,
   gap-test method, DNA-extraction) + `web/`+`mobile/` deltas, or two separate homes? (Decide jointly
   with the web slice — same question, must resolve once.)
2. **One `designer` agent or two?** — a single shared agent reading platform deltas, or `designer-web`
   + `designer-mobile`? (Recommendation: one agent, platform-parameterized — mirrors one shared home.)
3. **Grounding corpus** — which house Flutter app is the pilot/DNA corpus (`home_storage_mobile`?), and
   do we plan the mobile slice from THIS web repo (capability is user-scope/portable) or move it into
   the Flutter repo whose `CLAUDE.md`/ADR the standard must surface into?
4. **Platform-adaptive stance** — does the brand ship a **single look on both platforms** or lean into
   `.adaptive()` platform conventions? A load-bearing charter decision with no web analog.
5. **Material You / dynamic color** — confirm opt-in-only (M3's own recommendation) vs static brand
   scheme as default.
6. **Design-Gap-Test rendering substrate** — reuse `dev-live-android` (Dart Tooling MCP, on-device
   screenshots + runtime logs) as the visual oracle? Heavier than web's headless Chrome.
7. **Machine gate under the `flutter analyze` ban** — the agent-run machine gate is test-command + build
   only (analyze is user-only). What's the cheapest useful token-conformance invariant without analyze?
8. **Pilot unit** — which single screen/component is the Phase-2 pilot (copy chose hero)?
