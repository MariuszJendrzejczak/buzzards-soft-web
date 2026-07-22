---
sprint: certification-10xdevs
slices: [certification-10xdevs]
created: 2026-07-22
---

# Sprint certification-10xdevs: Warsztat AI — 10xDevs certificate section (replaces the HowIWork slot 02)

## Goal

Replace the home page's slot-02 section `HowIWork` — now a stale duplicate of the
`WarsztatFlow` workflow diagram — with a new "Warsztat AI" credibility section built
around the owner's 10xDevs Certificate of Completion: a credential card, four badge icons
(10xBuilder / 10xArchitect / 10xChampion / Best Project), five competency-area cards, and a
clickable certificate thumbnail that opens the enlarged image in a lightbox. All raster
assets are extracted offline from the certificate PDF. `HowIWork` is parked (kept,
unrendered); nav and the hero secondary CTA are repointed.

## Slices
- `certification-10xdevs` — `context/slices/certification-10xdevs/plan.md` (4 phases)

## Cross-cutting decisions
- No relevant ADR (0001 feature-flags, 0002 portfolio-url-pattern — neither applies; no new
  route, no feature flag).
- Copy charter (project memory): PL is source of truth; **no negation/contrast framing, no
  infantile tone, prefer "dla" over "na", no contractor-migration hints.**
- Static export (`next.config.ts`: `output: "export"`, `images.unoptimized: true`) → images via
  `next/image`. Build-before-test ordering (SSG vitest suites read `out/`).

## Human gate (HITL)
> Stateful, run FIRST. `/sprint-run` walks these point-by-point with you and flips each box.
> Every box must be `[x]` before the AFK block below dispatches.

none

## AFK sessions

### Session 1 — Phase 1: Extract certificate + badge assets from the PDF (implement)
- **Agent:** sprint-implementer
- **Slice:** `certification-10xdevs`
- **Phase:** 1
- **Depends on:** (none)
- **Exit:** All six webp files exist in `public/images/` (cert, thumb, four badges); `npm run build` passes.
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/certification-10xdevs/plan.md`, and its
  > `plan-brief.md` first. You are implementing **Phase 1: Extract certificate + badge assets
  > from the PDF** of slice `certification-10xdevs`.
  >
  > **Context:** The only source for the certificate visuals is a PDF. This machine has NO
  > `pdftoppm`/ImageMagick, and `sharp` has no PDF input (`sharp.format.pdf.input === false`).
  > `sharp` IS installed; Playwright + Chromium are installed. This is a one-off dev script — it
  > must NOT run at app runtime and NOT ship to the client bundle.
  >
  > **What to do:**
  > 1. Copy the source PDF into the repo as a build input:
  >    `scripts/assets/certificate-10xdevs.pdf` — source at
  >    `C:\Users\Mariusz\Downloads\da500a66-2b97-4309-881b-98fd374e66f7.pdf` (copy via Bash `cp`).
  >    Do NOT place the PDF in `public/`.
  > 2. Write `scripts/extract-cert-assets.mjs`: render the PDF page to a high-resolution raster
  >    (scale ≈4×) and crop it into webp files. Preferred renderer: `pdfjs-dist` (legacy build) +
  >    `@napi-rs/canvas` added as **devDependencies**; if that proves unworkable offline, fall
  >    back to driving the bundled Playwright Chromium PDF viewer at a high `deviceScaleFactor`
  >    and screenshotting. Crop + encode webp with `sharp`. The script logs every output path +
  >    dimensions.
  > 3. Emit to `public/images/`:
  >    - `certificate-10xdevs.webp` — full page, long edge ~1600px (for the lightbox).
  >    - `certificate-10xdevs-thumb.webp` — downscaled, long edge ~640px.
  >    - `badge-10xbuilder.webp`, `badge-10xarchitect.webp`, `badge-10xchampion.webp`,
  >      `badge-best-project.webp` — square-ish crops (~400–500px).
  >    The three acclaimed badges sit top-right of the certificate; "Best Project" is the large
  >    badge bottom-right. Tune crop rectangles against the rendered page.
  > 4. After generating, **Read each output image back** and self-verify: the full cert text is
  >    legible, each badge is centered and not clipped, the thumbnail is sharp. Iterate crop
  >    rectangles until they look right.
  > 5. Add a short `scripts/README.md` (or append) documenting the regeneration command
  >    (`node scripts/extract-cert-assets.mjs`), its outputs, and any devDependency it needs.
  >
  > **Files to touch:** `scripts/extract-cert-assets.mjs` (new), `scripts/assets/certificate-10xdevs.pdf`
  > (new, copied), `scripts/README.md` (new/append), `public/images/*.webp` (6 new), `package.json` +
  > lockfile (devDependency, if used).
  >
  > **Constraints that survive:** one-off/dev-only — nothing here is imported by app code. Badge
  > crops are small on the source; render at ≈4× so a ~120px display badge stays crisp.
  >
  > **Progress rows it owns:** Phase 1 owns Progress rows 1.1, 1.2. Flip them in the plan when green.
  >
  > **Stop when:** all six webp files exist in `public/images/` and `npm run build` passes.

### Session 2 — Phase 2: Certification copy (PL source) (content)
- **Agent:** copywriter
- **Slice:** `certification-10xdevs`
- **Phase:** 2
- **Depends on:** (none)
- **Exit:** PL copy artifact written to `context/slices/certification-10xdevs/copy-certification-pl.md`; Voice-Gap-Test passes (zero charter violations).
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/certification-10xdevs/plan.md`, and
  > `context/foundation/offer-facts.md` first. You are producing the **PL copy** for **Phase 2:
  > Copy + i18n** of slice `certification-10xdevs`. You return copy only — do NOT write
  > `messages/*.json`; the next session lands it.
  >
  > **Deliverable:** write `context/slices/certification-10xdevs/copy-certification-pl.md` — the
  > full PL string set for a new `certification` i18n namespace, one key per line, ready to land.
  > Keys required:
  > - `eyebrow`, `title`, `intro` (section header — eyebrow is "Sekcja 02 · …" style)
  > - `credential.courseName`, `credential.issuer`, `credential.date`, `credential.instructors`,
  >   `credential.facts` (a one-line course-facts summary)
  > - `badges.builder.{name,caption}`, `badges.architect.{name,caption}`,
  >   `badges.champion.{name,caption}`, `badges.bestProject.{name,caption}`
  > - `areas.1.{title,desc}` … `areas.5.{title,desc}`
  > - `thumbnail.{alt,openLabel}`, `lightbox.{title,closeLabel,imageAlt}`
  >
  > **Hard facts (from the certificate — use verbatim, do NOT invent):** Certificate of
  > Completion, dated 2026-07-20; cohort-based **10xDevs** course (BRAVE / 10xDEVS); instructors
  > **Przemek Smyrdek** and **Marcin Czarkowski**; Prework + **25 lessons across 5 modules**; **6
  > live sessions** (kick-off, 4 Live Q&A, celebration); weekly office hours; a custom AI agent +
  > internal AI tooling built end-to-end. Badge names verbatim: **10xBuilder, 10xArchitect,
  > 10xChampion, Best Project**. The five areas map to the certificate modules — express them in
  > PL: *Agentic Environment*, *10xDevs Workflow*, *AI Development Quality & Maintenance*,
  > *Innovate with Generative AI*, *Large scale & legacy projects*.
  >
  > **Charter (binding, self-check with the Voice-Gap-Test):** PL is source of truth; **no
  > negation/contrast framing** (owner rejects it with zero tolerance), **no infantile/coddling
  > tone** (mature, peer-to-peer), **prefer "dla" over "na"**, and **no messaging hinting the
  > client could move to another contractor/provider**. Proper nouns (course, instructors, badge
  > names, dates) stay verbatim.
  >
  > **Stop when:** the artifact is written and your Voice-Gap-Test reports zero charter violations.

### Session 3 — Phase 2: Land copy + EN/SV + nav + i18n test (implement)
- **Agent:** sprint-implementer
- **Slice:** `certification-10xdevs`
- **Phase:** 2
- **Depends on:** Session 2
- **Exit:** `npm run build` passes; then `npm run test` passes (incl. a new `i18n-certification-completeness` test); `npm run lint` passes.
- **Prompt:**
  > Read `CLAUDE.md` and the slice plan at `context/slices/certification-10xdevs/plan.md` first.
  > You are landing the copy for **Phase 2: Copy + i18n** of slice `certification-10xdevs`.
  >
  > **What to change:**
  > 1. Read the approved PL copy artifact
  >    `context/slices/certification-10xdevs/copy-certification-pl.md` and land it as a new
  >    top-level `certification` namespace in `messages/pl.json` (mirror the exact key tree the
  >    artifact defines: `eyebrow`, `title`, `intro`, `credential.*`, `badges.*.{name,caption}`,
  >    `areas.{1..5}.{title,desc}`, `thumbnail.*`, `lightbox.*`).
  > 2. Add the **key-parallel** `certification` namespace to `messages/en.json` and
  >    `messages/sv.json` by transcreating the PL prose — keep proper nouns (course, instructors,
  >    badge names, dates) verbatim across all three locales; mirror the key tree exactly.
  > 3. Add `nav.items.certification` = "Warsztat AI" to `messages/pl.json` (+ EN/SV equivalents).
  >    Leave the existing `nav.items.howIWork` key in place (parked, unused).
  > 4. Add `tests/unit/i18n-certification-completeness.test.ts`, mirroring the existing
  >    `tests/unit/i18n-offer-completeness.test.ts` / `i18n-portfolio-completeness.test.ts`
  >    pattern, asserting the `certification` key tree is identical across pl/en/sv.
  >
  > **Files to touch:** `messages/pl.json`, `messages/en.json`, `messages/sv.json`,
  > `tests/unit/i18n-certification-completeness.test.ts` (new).
  >
  > **Constraints that survive:** do NOT touch the `howIWork` namespace (it stays parked). Do NOT
  > alter PL wording from the artifact — you are landing it, not rewriting. There is no global
  > i18n parallel test; the real completeness gate is `npm run build` (every locale is statically
  > generated) plus your new scoped test.
  >
  > **Progress rows it owns:** Phase 2 owns Progress rows 2.1, 2.2. Flip them when green.
  >
  > **Stop when:** `npm run build` passes, then `npm run test` passes (incl. the new i18n test),
  > and `npm run lint` passes.

### Session 4 — Phase 3: Certification section + lightbox components (implement)
- **Agent:** sprint-implementer
- **Slice:** `certification-10xdevs`
- **Phase:** 3
- **Depends on:** Session 1, Session 3
- **Exit:** `npm run build` passes; then `npm run test` passes (incl. a new `certification-section` unit test); `npm run lint` passes.
- **Prompt:**
  > Read `CLAUDE.md` and the slice plan at `context/slices/certification-10xdevs/plan.md` first.
  > You are implementing **Phase 3: Certification section + lightbox components** of slice
  > `certification-10xdevs`. Sessions 1 and 3 have already produced the webp assets in
  > `public/images/` and the `certification` i18n namespace.
  >
  > **What to change:**
  > 1. `components/sections/certification/certification.tsx` (new) — a server component
  >    `export async function Certification()` using `getTranslations("certification")` and
  >    `ScrollReveal`. Structure it like `components/sections/work/how-i-work.tsx` /
  >    `what-i-can-deliver.tsx`: eyebrow + `id="certification"` /
  >    `aria-labelledby="certification-heading"` heading + intro, `max-w-7xl` container, opaque
  >    COVER styling (`bg-surface/40`, matching the slot it replaces). Render: a credential card
  >    (course/issuer/date/instructors/facts), a strip of four badge icons via `next/image`
  >    (`badge-10xbuilder|architect|champion|best-project.webp`, each with its `badges.*.name` +
  >    `caption`), five competency-area cards reusing the `PracticeCard` idiom from
  >    `how-i-work.tsx` (`areas.{1..5}`), and the certificate thumbnail rendered by the lightbox
  >    component below.
  > 2. `components/shared/certificate-lightbox.tsx` (new) — `"use client"`. Build on
  >    `@base-ui/react/dialog` following the pattern in `components/ui/sheet.tsx` (Root / Trigger
  >    / Backdrop / Portal / Popup / Close). Trigger = the thumbnail (`next/image` of
  >    `certificate-10xdevs-thumb.webp`) with button semantics + `aria-label` from
  >    `thumbnail.openLabel`. Popup centers the large image (`certificate-10xdevs.webp`) with a
  >    max-height cap and a close control; closes on Esc, backdrop click, and the button (Base UI
  >    defaults). Props: `{ thumbSrc, fullSrc, alt, openLabel, closeLabel }` — pass strings from
  >    the server component so this client stays translation-agnostic.
  > 3. `tests/unit/certification-section.test.tsx` (new) — render `<Certification/>` via the
  >    existing test-utils i18n wrapper (`tests/unit/test-utils.tsx`); assert (a) four badge
  >    images by alt/label, (b) five area headings, (c) a thumbnail control with its accessible
  >    name, (d) after activating the trigger, a dialog containing the full-cert image is present.
  >
  > **Files to touch:** `components/sections/certification/certification.tsx` (new),
  > `components/shared/certificate-lightbox.tsx` (new),
  > `tests/unit/certification-section.test.tsx` (new).
  >
  > **Constraints that survive:** static export → `next/image` with `images.unoptimized` (already
  > configured); do NOT wrap the section in `PhotoBand` (it is a COVER slot). Both dark and light
  > themes are first-class — spend accent color sparingly, keep contrast. Do NOT wire the section
  > into the page yet — that is Phase 4.
  >
  > **Progress rows it owns:** Phase 3 owns Progress rows 3.1, 3.2, 3.3. Flip them when green.
  >
  > **Stop when:** `npm run build` passes, then `npm run test` passes (incl. the new section
  > test), and `npm run lint` passes.

### Session 5 — Phase 4: Wire into the page, park HowIWork, update anchors + specs (implement)
- **Agent:** sprint-implementer
- **Slice:** `certification-10xdevs`
- **Phase:** 4
- **Depends on:** Session 4
- **Exit:** `npm run build` passes; then `npm run test` passes; `npm run lint` passes.
- **Prompt:**
  > Read `CLAUDE.md` and the slice plan at `context/slices/certification-10xdevs/plan.md` first.
  > You are implementing **Phase 4: Wire into the page, park HowIWork, update anchors + specs** of
  > slice `certification-10xdevs`.
  >
  > **What to change:**
  > 1. `app/[locale]/page.tsx` — in slot 02 (where `<HowIWork/>` renders, COVER, no `PhotoBand`),
  >    render `<Certification/>` instead. Comment out the `HowIWork` import and its render with a
  >    short restore note, mirroring the existing parked `CurrentlyLearning` pattern in this file.
  > 2. `components/layout/header.tsx` — change the `NAV_KEYS` entry
  >    `{ href: "#how-i-work", key: "howIWork" }` to `{ href: "#certification", key: "certification" }`.
  > 3. `components/sections/hero/hero.tsx` — change the secondary CTA's
  >    `render={<a href="#how-i-work" />}` to `href="#portfolio"`. Leave the label
  >    (`hero.ctaSecondary`) unchanged.
  > 4. `tests/smoke.spec.ts` — in `SECTION_IDS`, replace `"how-i-work"` with `"certification"`
  >    (keep slot-02 position).
  > 5. `tests/portfolio-regression-routes.spec.ts` — in `expectedAnchors`, replace `"how-i-work"`
  >    with `"certification"` (keep position).
  >
  > **Files to touch:** `app/[locale]/page.tsx`, `components/layout/header.tsx`,
  > `components/sections/hero/hero.tsx`, `tests/smoke.spec.ts`,
  > `tests/portfolio-regression-routes.spec.ts`.
  >
  > **Constraints that survive:** `HowIWork` is **parked, not deleted** — keep the component file
  > and its `howIWork` i18n namespace intact; only remove it from the render/nav/CTA. The two
  > `*.spec.ts` files are Playwright e2e (run via `npm run test:e2e`, user-run) — they are NOT
  > part of `npm run test`; edit them correctly but do not expect the AFK `npm run test` gate to
  > execute them.
  >
  > **Progress rows it owns:** Phase 4 owns Progress rows 4.1, 4.2, 4.3. Flip them when green.
  >
  > **Stop when:** `npm run build` passes, then `npm run test` passes, and `npm run lint` passes.

### Session 6 — Review
- **Agent:** sprint-reviewer
- **Depends on:** all prior sessions
- **Exit:** verdict (pass/fail) + itemised concerns reported.
- **Prompt:**
  > Read-only review of the full sprint diff against
  > `context/slices/certification-10xdevs/plan.md`. Verify the implementation matches the plan's
  > Desired End State, and that the plan's **Manual Success Criteria** are visibly satisfied in
  > the diff (these were NOT auto-gated in AFK — flag anything the developer must eyeball):
  > - **Assets (Phase 1):** the full certificate webp is legible; each badge crop is centered,
  >   tightly framed, not clipped; the thumbnail is sharp. The source PDF lives under `scripts/`,
  >   NOT `public/`. Any devDependency added for extraction is dev-only and unused by app code.
  > - **Copy (Phase 2):** PL copy is charter-compliant — run a **negation / "na" / migration
  >   sweep** over the `certification` PL strings and flag any hit; tone is mature/peer-to-peer;
  >   EN/SV keep proper nouns verbatim and mirror the PL key tree.
  > - **Section (Phase 3):** correct in **dark and light** themes; thumbnail opens the lightbox;
  >   the enlarged image is present; Esc / backdrop / button all close it; the thumbnail is
  >   keyboard-focusable with focus trap + focus return.
  > - **Wire-up (Phase 4):** slot 02 renders `<Certification/>`; `HowIWork` is parked (not
  >   deleted); nav points at `#certification`; the hero secondary CTA points at `#portfolio`;
  >   both `*.spec.ts` anchor lists updated.
  > Report pass/fail with itemised concerns. Do not edit code.

## Out of scope
- The skills section `WhatICanDeliver` (3.1–3.5) and `WarsztatFlow` — untouched.
- Deleting `HowIWork` (it is parked, not removed).
- Offering the source PDF for download; committing the PDF to `public/`.
- A generic gallery/carousel — single certificate, single lightbox.
- The ambient-backdrop work from `web-visual-elevation`.
- Any runtime PDF-rendering dependency — extraction is a one-off dev script.
