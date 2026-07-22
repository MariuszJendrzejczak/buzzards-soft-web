# Warsztat AI — 10xDevs Certificate Section Implementation Plan

## Overview

Replace the home page's slot-02 section `HowIWork` ("Jak pracuję — AI w codziennym
workflow") with a new **"Warsztat AI"** credibility section built around the owner's
**10xDevs Certificate of Completion**. `HowIWork` is now a stale duplicate of the
`WarsztatFlow` workflow diagram already rendered inside the portfolio, so its slot is
repurposed for external proof (a certificate) instead of a self-asserted workflow.

The section carries a credential card, the three acclaimed badges + a Best Project
distinction (shown as separate icons), the five competency areas from the certificate,
and a clickable certificate thumbnail that opens an enlarged image in a lightbox popup.
All raster assets (certificate + badges) are extracted **offline from the certificate
PDF** — the only source available.

## Current State Analysis

- **Slot 02** is `HowIWork` (`components/sections/work/how-i-work.tsx`), rendered in
  `app/[locale]/page.tsx:62` as an opaque COVER section (`bg-surface/40`). It presents
  four cards (2.1–2.4) describing, declaratively, how the owner works with AI agents.
- **The duplication**: `components/portfolio/WarsztatFlow.tsx` renders the *concrete*
  human+agent workflow (plan → accept → agent build/test/review → human review → live →
  deploy). `HowIWork` restates the same story without proof. The 10xDevs certificate is
  the *credentialed* version of exactly that story — its five modules map ~1:1 onto
  `HowIWork`'s themes.
- **`#how-i-work` is referenced in five places** (all to rewire):
  - `app/[locale]/page.tsx` — renders `<HowIWork/>`.
  - `components/layout/header.tsx:24` — `NAV_KEYS: { href: "#how-i-work", key: "howIWork" }`.
  - `components/sections/hero/hero.tsx:46` — secondary CTA `href="#how-i-work"` (label `hero.ctaSecondary` = "Zobacz, jak pracuję").
  - `tests/smoke.spec.ts:5` — `SECTION_IDS` includes `"how-i-work"`.
  - `tests/portfolio-regression-routes.spec.ts:61` — `expectedAnchors` includes `"how-i-work"`.
  - (Non-blocking: `docs/design/ui-plan.md` mentions it — doc only, left as-is.)
- **i18n**: `messages/{pl,en,sv}.json` carry a `howIWork` namespace and a
  `nav.items.howIWork` label. PL is the source of truth; EN + SV are translations.
  There is **no global key-parallel i18n test** — only namespace-scoped ones
  (`i18n-offer-completeness.test.ts`, `i18n-portfolio-completeness.test.ts`). The real
  gate for missing keys is `npm run build`: every locale is statically generated, so a
  key present in PL but missing in EN/SV throws at render/build.
- **Base UI dialog** is already wrapped in `components/ui/sheet.tsx`
  (`import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"` → Root / Trigger /
  Backdrop / Portal / Popup / Close / Title / Description). The lightbox reuses this
  exact primitive.
- **Images under static export**: `next.config.ts` has `output: "export"` +
  `images: { unoptimized: true }`. The repo uses `next/image` throughout
  (`AppCard`, `HoneticHero`, header/footer). New images follow the same convention.
- **Certificate hard facts** (from the PDF): holder Mariusz Jendrzejczak; dated
  2026-07-20; cohort-based 10xDevs course (BRAVE / 10xDEVS); instructors Przemek Smyrdek
  & Marcin Czarkowski; Prework + 25 lessons across 5 modules; 6 live sessions (kick-off,
  4 Live Q&A, celebration); weekly office hours; a custom AI agent + internal AI tooling
  built end-to-end. Badges: **10xBuilder, 10xArchitect, 10xChampion** + **Best Project**
  distinction. Five modules: *Agentic Environment*, *10xDevs Workflow*, *AI Development
  Quality & Maintenance*, *Innovate with Generative AI*, *Large scale & legacy projects*.

## Desired End State

Home page slot 02 renders a **"Warsztat AI"** section (COVER, matching `HowIWork`'s
former placement) with:
1. A header (eyebrow "Sekcja 02", title + intro — charter-compliant PL copy).
2. A credential card naming the certificate, course, instructors, and course facts.
3. A strip of four badge icons (10xBuilder / 10xArchitect / 10xChampion / Best Project),
   each labelled.
4. Five competency-area cards (mapped from the certificate modules).
5. A clickable certificate thumbnail → **lightbox** showing the enlarged certificate
   image (close on Esc / backdrop / button). Image only, no PDF download.

Nav shows "Warsztat AI" → `#certification`; the hero secondary CTA points at
`#portfolio`; `HowIWork` is parked (kept on disk + in i18n, unrendered). `npm run build`,
`npm run lint`, and `npm run test` all pass; Playwright anchor specs assert
`certification` instead of `how-i-work`.

### Key Discoveries:

- Base UI dialog pattern to copy: `components/ui/sheet.tsx:4` (`@base-ui/react/dialog`).
- Static-export image contract: `next.config.ts:8` (`images.unoptimized: true`) → use
  `next/image` (as `components/portfolio/AppCard.tsx:1` does).
- Parking precedent: `app/[locale]/page.tsx:5-7` + `:78` (the commented
  `CurrentlyLearning` import/render) — mirror this for `HowIWork`.
- No global i18n parallel test → build is the completeness gate; a scoped
  `i18n-certification-completeness.test.ts` mirrors the existing offer/portfolio ones.

## What We're NOT Doing

- **Not** touching the skills section `WhatICanDeliver` (3.1–3.5) — it stays as-is;
  trimming its 3.2 agentic overlap is a separate, later slice.
- **Not** modifying `WarsztatFlow` or the portfolio.
- **Not** deleting `HowIWork` — it is parked (component + i18n retained, unrendered).
- **Not** offering the source PDF for download; **not** committing the PDF to `public/`.
- **Not** building a generic gallery/carousel — a single certificate, single lightbox.
- **Not** regenerating or altering the ambient backdrops from `web-visual-elevation`.
- **Not** adding a runtime PDF-rendering dependency — extraction is a one-off dev script.

## Implementation Approach

Four phases, ordered by dependency: (1) extract the raster assets from the PDF so the UI
has real images to point at; (2) author the copy + i18n keys the section reads;
(3) build the section + lightbox components against those keys and assets; (4) wire the
section into the page, retire (park) `HowIWork`, and update the anchor references + specs.

## Critical Implementation Details

- **Asset extraction is offline and one-off.** No `pdftoppm`/ImageMagick on the machine
  and `sharp` has no PDF input (`sharp.format.pdf.input === false`). Preferred method for
  the one-off script: `pdfjs-dist` (legacy build) + `@napi-rs/canvas` rendered at a high
  scale (≈4×), then `sharp` crops each region and encodes webp. Fallback: drive the
  bundled Playwright Chromium PDF viewer at a high `deviceScaleFactor` and screenshot.
  Either dev-only dependency is acceptable because nothing here ships to runtime — the
  **contract** is the committed webp files, not the tool. Badge crops are small on the
  source; rendering at ≈4× yields ~400–500px badge icons, ample for ~80–120px display.
- **Copy is charter-governed.** PL is the source of truth and must pass the owner's copy
  rules (recorded in project memory): no negation/contrast framing, no infantile/coddling
  tone, prefer "dla" over "na", and **no messaging that hints the client could move to
  another contractor**. Draft PL, self-check against these, then transcreate EN/SV.

## Phase 1: Extract certificate + badge assets from the PDF

### Overview

Produce all raster assets the section needs, cropped from the certificate PDF, and place
them in `public/images/`. This is a reproducible dev script, not runtime code.

### Changes Required:

#### 1. One-off extraction script

**File**: `scripts/extract-cert-assets.mjs` (new) + the source PDF copied into the repo
at `scripts/assets/certificate-10xdevs.pdf` (so the script is reproducible; the PDF is a
build input, not a `public/` asset).

**Intent**: Render the certificate PDF page to a high-resolution raster and crop it into
the section's images, encoding webp. Run manually (documented command), not in CI.

**Contract**: Emits to `public/images/`:
- `certificate-10xdevs.webp` — full page, high-res (long edge ~1600px) for the lightbox.
- `certificate-10xdevs-thumb.webp` — downscaled thumbnail (long edge ~640px).
- `badge-10xbuilder.webp`, `badge-10xarchitect.webp`, `badge-10xchampion.webp`,
  `badge-best-project.webp` — square-ish badge crops (~400–500px).
Rendering uses `pdfjs-dist` (legacy) + `@napi-rs/canvas` at scale ≈4 (fallback: Playwright
Chromium screenshot); cropping + webp encoding via `sharp` (already a dependency). Crop
rectangles are tuned by eye against the rendered page; the script logs each output path +
dimensions.

#### 2. Document the regeneration command

**File**: `scripts/README.md` (new, or a short note appended if one exists)

**Intent**: Record how to re-run the extraction so the assets are reproducible later.

**Contract**: One `node scripts/extract-cert-assets.mjs` invocation line + the list of
outputs. Names any dev-only dependency the script needs.

### Success Criteria:

#### Automated Verification:

- [ ] All six webp files exist in `public/images/` (cert, thumb, four badges).
- [ ] `npm run build` still succeeds (assets present, no broken references yet).

#### Manual Verification:

- [ ] Full certificate webp is legible when opened at display size (text readable).
- [ ] Each badge crop is centered, tightly framed, and not clipped.
- [ ] Thumbnail is sharp at the size it will render (~a few hundred px wide).

**Implementation Note**: After automated verification passes, pause for the human to eyeball
the crops (framing/legibility can't be asserted automatically) before Phase 2.

---

## Phase 2: Copy + i18n (`certification` namespace, three locales)

**Discipline:** content

### Overview

Author the section's PL copy under the copy charter, transcreate EN/SV, and land a new
`certification` namespace (key-parallel across all three message files) plus a nav label.

### Changes Required:

#### 1. New `certification` namespace — PL (source of truth)

**File**: `messages/pl.json`

**Intent**: Provide every string the section renders — header, credential card, badge
labels, five competency areas, and lightbox a11y strings — in charter-compliant PL.

**Contract**: New top-level `certification` object with keys for: `eyebrow`, `title`,
`intro`; `credential.*` (course name, issuer, date, instructors, course-facts line);
`badges.{builder,architect,champion,bestProject}.{name,caption}`; `areas.{1..5}.{title,desc}`
mapping the five modules; `thumbnail.{alt,openLabel}`, `lightbox.{title,closeLabel,imageAlt}`.
Copy must pass: no negation/contrast, no infantile tone, "dla" > "na", no
contractor-migration hints. Exact key tree is mirrored verbatim into EN/SV below.

#### 2. `certification` namespace — EN + SV (transcreation)

**File**: `messages/en.json`, `messages/sv.json`

**Intent**: Key-parallel transcreations of the PL namespace so all three locales build.

**Contract**: Identical key tree to `messages/pl.json` `certification`. Proper-noun facts
(course, instructors, badge names, dates) stay verbatim across locales; prose is transcreated.

#### 3. Nav label

**File**: `messages/{pl,en,sv}.json`

**Intent**: Add the nav entry for the new section.

**Contract**: `nav.items.certification` = "Warsztat AI" (PL) + EN/SV equivalents. The
existing `nav.items.howIWork` key stays (parked, unused).

### Success Criteria:

#### Automated Verification:

- [ ] `npm run build` passes (all three locales resolve every `certification.*` key used).
- [ ] `npm run test` passes, including a new `tests/unit/i18n-certification-completeness.test.ts`
      asserting the `certification` key tree is identical across pl/en/sv.

#### Manual Verification:

- [ ] PL copy reads mature and peer-to-peer; a negation/"na"/migration sweep finds nothing.
- [ ] EN/SV convey the same claims; proper nouns unchanged.

---

## Phase 3: Certification section + lightbox components

### Overview

Build the RSC section and the client lightbox against the Phase-2 keys and Phase-1 assets.

### Changes Required:

#### 1. Section component

**File**: `components/sections/certification/certification.tsx` (new)

**Intent**: Render the "Warsztat AI" section — header, credential card, badge strip, five
competency-area cards, and the certificate thumbnail that triggers the lightbox. Server
component using `getTranslations("certification")` and `ScrollReveal`, structurally
consistent with `HowIWork`/`WhatICanDeliver` (eyebrow + `id`/`aria-labelledby` heading,
`max-w-7xl` container, COVER styling).

**Contract**: `export async function Certification()`. Section `id="certification"`,
`aria-labelledby="certification-heading"`. Badges + thumbnail use `next/image` (static
export, `unoptimized`). The thumbnail is rendered by the client lightbox component (below);
everything else is server-rendered. Reuses the card idiom from `how-i-work.tsx`
(PracticeCard) for the five areas rather than inventing a new one.

#### 2. Certificate lightbox

**File**: `components/shared/certificate-lightbox.tsx` (new)

**Intent**: A clickable thumbnail that opens the enlarged certificate image in a modal.

**Contract**: `"use client"`. Uses `@base-ui/react/dialog` primitives following
`components/ui/sheet.tsx` (Root / Trigger / Backdrop / Portal / Popup / Close). Trigger =
the thumbnail (`next/image`, `<button>`-semantics with `aria-label` from
`certification.thumbnail.openLabel`). Popup centers the large certificate image
(`certificate-10xdevs.webp`) with a max-height cap and a close control; closes on Esc,
backdrop click, and the button (Base UI defaults). Props: `{ thumbSrc, fullSrc, alt,
openLabel, closeLabel }` (strings passed from the server component so the client stays
translation-agnostic).

#### 3. Section unit test

**File**: `tests/unit/certification-section.test.tsx` (new)

**Intent**: Pin the section's contract: it renders the credential, all four badges, five
areas, and an accessible thumbnail trigger; activating the trigger opens the dialog with
the enlarged image.

**Contract**: Renders `<Certification/>` via the existing test-utils i18n wrapper; asserts
(a) four badge images by alt/label, (b) five area headings, (c) a thumbnail control with
its accessible name, (d) after a click, a dialog with the full-cert image is present.

### Success Criteria:

#### Automated Verification:

- [ ] `npm run test` passes, including `certification-section.test.tsx`.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes (component type-checks; images resolve).

#### Manual Verification:

- [ ] Section looks right in **dark and light** themes (credential card, badge strip, cards).
- [ ] Thumbnail click opens the lightbox; image is crisp; Esc/backdrop/button all close it.
- [ ] Keyboard: thumbnail is focusable/activatable; focus is trapped in the dialog and
      returns to the trigger on close.

---

## Phase 4: Wire into the page, park HowIWork, update anchors + specs

### Overview

Swap the section into slot 02, park `HowIWork`, and repoint every `#how-i-work` reference.

### Changes Required:

#### 1. Page render swap

**File**: `app/[locale]/page.tsx`

**Intent**: Render `<Certification/>` in slot 02 (COVER, where `<HowIWork/>` was) and park
the `HowIWork` import/render behind a comment (mirroring the `CurrentlyLearning` pattern).

**Contract**: Slot-02 render becomes `<Certification />`; `HowIWork` import + render
commented with a restore note. Section keeps its COVER placement (no `PhotoBand` wrap).

#### 2. Nav entry

**File**: `components/layout/header.tsx`

**Intent**: Point the nav at the new section.

**Contract**: `NAV_KEYS` entry `{ href: "#how-i-work", key: "howIWork" }` →
`{ href: "#certification", key: "certification" }`.

#### 3. Hero secondary CTA

**File**: `components/sections/hero/hero.tsx`

**Intent**: Re-point the "Zobacz, jak pracuję" CTA to the workflow diagram.

**Contract**: The secondary `Button`'s `render={<a href="#how-i-work" />}` →
`href="#portfolio"`. Label (`hero.ctaSecondary`) unchanged.

#### 4. Playwright anchor specs

**File**: `tests/smoke.spec.ts`, `tests/portfolio-regression-routes.spec.ts`

**Intent**: Assert the new anchor instead of the retired one.

**Contract**: Replace `"how-i-work"` with `"certification"` in `SECTION_IDS`
(`smoke.spec.ts`) and `expectedAnchors` (`portfolio-regression-routes.spec.ts`), keeping
list order/position (slot 02).

### Success Criteria:

#### Automated Verification:

- [ ] `npm run build` passes.
- [ ] `npm run test` passes (unit + SSG suites against `out/`).
- [ ] `npm run lint` passes.

#### Manual Verification:

- [ ] Nav "Warsztat AI" scrolls to the certificate section.
- [ ] Hero "Zobacz, jak pracuję" scrolls to the portfolio (WarsztatFlow) section.
- [ ] `HowIWork` no longer renders anywhere; no console/hydration warnings.
- [ ] `npm run test:e2e` (user-run) passes locally.

**Implementation Note**: After automated verification passes, pause for the human to walk
nav + CTA + both themes before closing the slice.

---

## Testing Strategy

| Behavior asserted | Expected outcome (oracle source) | Regression caught | Layer | Anti-pattern avoided |
|---|---|---|---|---|
| Section renders all four badges + five competency areas + credential | Present with correct labels (certificate facts — the PDF) | Missing/incorrect proof elements | unit (`certification-section.test.tsx`) | not asserting static class names / DOM shape |
| Thumbnail activates the lightbox showing the enlarged cert | Dialog opens with full-cert image on trigger activation (user requirement) | Lightbox wiring breaks (trigger→dialog) | unit (jsdom + testing-library) | not testing Base UI internals — assert visible outcome |
| `certification` keys parallel across pl/en/sv | Identical key trees (house i18n rule; mirrors offer/portfolio tests) | A locale missing a key → build-time render failure | unit (`i18n-certification-completeness.test.ts`) | not snapshotting whole message files |
| Home exposes anchor `certification` at slot 02 | Anchor present in section order (nav/CTA contract) | Broken in-page nav after the swap | e2e (`smoke.spec.ts`, `portfolio-regression-routes.spec.ts`) | not asserting copy text — assert the anchor |

### Manual Testing Steps:

1. Load `/pl`, `/en`, `/sv`; confirm the section renders in each with translated copy.
2. Toggle dark/light; verify credential card, badge strip, and cards hold contrast.
3. Click the thumbnail; verify the enlarged image; close via Esc, backdrop, and button.
4. Tab to the thumbnail, activate with keyboard; verify focus trap + focus return.
5. Click nav "Warsztat AI" → certificate section; click hero "Zobacz, jak pracuję" → portfolio.

## Performance Considerations

Assets are `unoptimized` webp (static export). Keep the full certificate ≤ ~1600px long
edge and the thumbnail ~640px so the page weight stays modest; the full image loads only
when the lightbox opens (thumbnail carries a small file). Badges are small webp.

## Migration Notes

`HowIWork` is parked, not deleted — a later slice may remove it once the certificate
section is proven. The `howIWork` i18n namespace + `nav.items.howIWork` stay for an easy
restore.

## References

- Certificate facts: certificate PDF (holder Mariusz Jendrzejczak, 2026-07-20).
- Base UI dialog pattern: `components/ui/sheet.tsx`
- Static-export image config: `next.config.ts` (`images.unoptimized: true`)
- Parking precedent: `app/[locale]/page.tsx` (commented `CurrentlyLearning`)
- Duplicated workflow it replaces: `components/portfolio/WarsztatFlow.tsx`

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles. See `references/progress-format.md`.

### Phase 1: Extract certificate + badge assets from the PDF

#### Automated

- [x] 1.1 All six webp files exist in `public/images/` (cert, thumb, four badges) — 14a964e
- [x] 1.2 `npm run build` still succeeds — 14a964e

#### Manual

- [ ] 1.3 Full certificate webp is legible at display size
- [ ] 1.4 Each badge crop is centered, tightly framed, not clipped
- [ ] 1.5 Thumbnail is sharp at render size

### Phase 2: Copy + i18n (`certification` namespace, three locales)

#### Automated

- [x] 2.1 `npm run build` passes (all three locales resolve `certification.*`) — 9621471
- [x] 2.2 `npm run test` passes, incl. new `i18n-certification-completeness.test.ts` — 9621471

#### Manual

- [ ] 2.3 PL copy passes a negation/"na"/migration sweep; tone mature
- [ ] 2.4 EN/SV convey the same claims; proper nouns unchanged

### Phase 3: Certification section + lightbox components

#### Automated

- [x] 3.1 `npm run test` passes, incl. `certification-section.test.tsx` — 0468bf1
- [x] 3.2 `npm run lint` passes — 0468bf1
- [x] 3.3 `npm run build` passes — 0468bf1

#### Manual

- [ ] 3.4 Section correct in dark and light themes
- [ ] 3.5 Thumbnail opens lightbox; image crisp; Esc/backdrop/button close it
- [ ] 3.6 Keyboard: thumbnail focusable; focus trapped + returned on close

### Phase 4: Wire into the page, park HowIWork, update anchors + specs

#### Automated

- [x] 4.1 `npm run build` passes — 8741243
- [x] 4.2 `npm run test` passes (unit + SSG) — 8741243
- [x] 4.3 `npm run lint` passes — 8741243

#### Manual

- [ ] 4.4 Nav "Warsztat AI" scrolls to the certificate section
- [ ] 4.5 Hero "Zobacz, jak pracuję" scrolls to portfolio (WarsztatFlow)
- [ ] 4.6 `HowIWork` no longer renders; no console/hydration warnings
- [ ] 4.7 `npm run test:e2e` (user-run) passes locally
