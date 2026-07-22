<!-- IMPL-REVIEW-REPORT -->
# Implementation Review: Sprint certification-10xdevs — Warsztat AI (10xDevs certificate section)

- **Plan**: `context/slices/certification-10xdevs/plan.md`
- **Scope**: Full sprint `certification-10xdevs` (Phases 1–4)
- **Date**: 2026-07-22
- **Verdict**: APPROVED
- **Findings**: 0 critical, 0 warnings, 4 observations

## Verdicts

| Dimension | Verdict |
|-----------|---------|
| Plan Adherence | PASS |
| Scope Discipline | PASS |
| Safety & Quality | PASS |
| Architecture | PASS |
| Pattern Consistency | PASS |
| Success Criteria | PASS |

## Acceptance check

- **Session 1 Exit** (six webp files in `public/images/`; `npm run build` passes): met — all six webp present with real bytes (cert 207KB, thumb 54KB, four badges 33–46KB); build green. Full cert legible (holder, date, instructors, 5 modules, badges all readable); three acclaimed badges centered/tightly-framed/not-clipped with labels; Best Project well-framed; thumbnail sharp. Source PDF at `scripts/assets/certificate-10xdevs.pdf`, NOT `public/`. `pdfjs-dist` + `@napi-rs/canvas` are devDependencies, referenced only in `scripts/` + planning docs — no app-code import.
- **Session 2 Exit** (PL copy artifact + zero charter violations): met — artifact at `context/slices/certification-10xdevs/copy-certification-pl.md`; landed PL strings pass the negation/"na"/migration sweep (no negation/contrast framing, no "na firmę/kogoś" misuse — only idioms "na żywo"/"na lata", no contractor-migration hint); tone mature/peer-to-peer.
- **Session 3 Exit** (`build`+`test`+`lint` pass, incl. new i18n test): met — `certification` key tree identical across pl/en/sv (verified programmatically: 0 missing/extra); proper nouns (instructors, badge names, BRAVE/10xDEVS) verbatim; dates locale-formatted (expected). `i18n-certification-completeness.test.ts` (13) green.
- **Session 4 Exit** (`build`+`test`+`lint` pass, incl. section test): met — `certification-section.test.tsx` (5) green; lightbox reuses `@base-ui/react/dialog` per `components/ui/sheet.tsx` (focus trap / Esc / backdrop / focus-return are Base UI defaults); trigger has button semantics + aria-label + focus-visible ring.
- **Session 5 Exit** (`build`+`test`+`lint` pass): met — slot 02 renders `<Certification/>`; `HowIWork` parked (import+render commented, component + `howIWork` namespace kept on disk); nav → `#certification`; hero secondary CTA → `#portfolio`; both `*.spec.ts` anchor lists updated preserving slot-02 position.
- **ADR conformance**: N/A — sprint declares no applicable ADR (0001 feature-flags, 0002 portfolio-url-pattern both out of scope: no new route, no flag). Nothing in the diff contradicts either. Copy charter (project memory) upheld.

**Manual criteria requiring the developer's eyeball** (not auto-gatable; unchecked in Progress): 1.3–1.5 assets (satisfied on reviewer's visual read of the committed webps — recommend confirm), 2.3–2.4 copy (swept clean here), 3.4 dark/light themes (code uses semantic tokens `bg-card`/`text-foreground`/`text-muted-foreground`/`border-border`/`text-brand` — sound, but render both themes), 3.5–3.6 lightbox open/close + keyboard focus trap/return (Base UI defaults; verify live), 4.4–4.7 nav/CTA scroll + no HowIWork render + `test:e2e` (user-run).

## Findings

### F1 — Three `certification.*` i18n keys defined but unused by the section

- **Severity**: 📝 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Plan Adherence
- **Location**: `messages/{pl,en,sv}.json` → `certification.credential.instructors`, `certification.lightbox.title`, `certification.lightbox.imageAlt`
- **Detail**: The section reads `credential.{courseName,issuer,date,facts}`, `thumbnail.{alt,openLabel}`, `lightbox.closeLabel` (verified by grep of `components/**`). `credential.instructors` is unused — the instructor names are already folded into `credential.issuer` ("BRAVE / 10xDEVS · Przemek Smyrdek i Marcin Czarkowski"), making it redundant as the Phase-3 implementer flagged. `lightbox.title` and `lightbox.imageAlt` are also unreferenced: the lightbox uses `thumbnail.alt` for both the thumb and the enlarged image and has no `Dialog.Title`. These are in the planned key contract but dead in the shipped component. Not a defect (build/tests green; keys are harmless), but stale i18n keys rot.
- **Fix**: Either remove the three unused keys from all three locale files, or wire them in (use `lightbox.imageAlt` as the enlarged image's `alt` and add a visually-hidden `Dialog.Title`={`lightbox.title`} to give the dialog an accessible name; render `credential.instructors` as its own credential-card line). Prefer wiring `lightbox.title`+`imageAlt` in — it improves dialog a11y — and dropping the redundant `credential.instructors`.
- **Decision**: PENDING

### F2 — Lightbox dialog has no accessible name (`Dialog.Title` omitted)

- **Severity**: 📝 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Pattern Consistency
- **Location**: `components/shared/certificate-lightbox.tsx:42-64`
- **Detail**: The `Dialog.Popup` contains only the image + a `Dialog.Close`; no `Dialog.Title`/`Dialog.Description`. Base UI emits a dev-only a11y warning for a dialog without an accessible name, and screen-reader users get no announced dialog label on open. The sibling `sheet.tsx` exposes `SheetTitle`/`SheetDescription` for exactly this. The `lightbox.title` string (F1) already exists to fill it. Manual criterion 3.6 (keyboard/focus) is otherwise satisfied by Base UI defaults.
- **Fix**: Add a visually-hidden `Dialog.Title` (and optionally `Dialog.Description`) inside the popup, fed by `lightbox.title` passed from the server component — resolves the warning and names the dialog. Ties into F1.
- **Decision**: PENDING

### F3 — Badge strip nested inside the credential card rather than a separate block

- **Severity**: 📝 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Plan Adherence
- **Location**: `components/sections/certification/certification.tsx:101-122`
- **Detail**: Plan's Desired End State lists item 3 "a strip of four badge icons" and item 4 "five competency-area cards" as distinct blocks; the implementation renders the four badges as a `<ul>` *inside* the credential card (left column of a 2-col grid, opposite the lightbox), then the five area cards below. All required elements are present and correctly labelled (test-verified); this is a benign layout choice, not a functional gap. Recording it so the plan can be reconciled if the intended layout was a standalone strip.
- **Fix**: None required — accept as an intentional layout refinement, or relocate the badge `<ul>` to a standalone strip if the standalone visual was intended. Confirm during the 3.4 theme walkthrough.
- **Decision**: PENDING

### F4 — `thumbnail.openLabel` rendered twice (trigger aria-label + visible caption)

- **Severity**: 📝 OBSERVATION
- **Impact**: 🏃 LOW — quick decision; fix is obvious and narrowly scoped
- **Dimension**: Pattern Consistency
- **Location**: `components/sections/certification/certification.tsx:130,134`
- **Detail**: `t("thumbnail.openLabel")` ("Powiększ certyfikat 10xDevs") is used both as the lightbox trigger's `aria-label` and as the visible caption `<p>` under the thumbnail. Reusing one imperative string in both roles is slightly redundant (a caption reading like a button label), but not incorrect. Consider a dedicated caption key if the visible text should read differently from the button action.
- **Fix**: Optional — introduce a distinct caption string (e.g. `thumbnail.caption`) if the visible label should differ from the trigger's accessible name; otherwise leave as-is.
- **Decision**: PENDING

## Relevant file paths

- `components/sections/certification/certification.tsx`
- `components/shared/certificate-lightbox.tsx`
- `tests/unit/certification-section.test.tsx`
- `tests/unit/i18n-certification-completeness.test.ts`
- `messages/pl.json` (+ `en.json`, `sv.json`) — `certification` namespace
- `scripts/extract-cert-assets.mjs`, `scripts/README.md`
- `app/[locale]/page.tsx`, `components/layout/header.tsx`, `components/sections/hero/hero.tsx`
