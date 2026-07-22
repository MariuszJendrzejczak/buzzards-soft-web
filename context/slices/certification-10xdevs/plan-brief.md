# Warsztat AI — 10xDevs Certificate Section — Plan Brief

> Full plan: `context/slices/certification-10xdevs/plan.md`

## What & Why

Replace the home page's slot-02 section `HowIWork` — now a stale duplicate of the
`WarsztatFlow` workflow diagram already shown in the portfolio — with a new **"Warsztat AI"**
credibility section built around the owner's **10xDevs Certificate of Completion**. The move
swaps a self-asserted "how I work with AI" for external proof (a cohort-based certificate,
three badges, and a Best Project distinction) placed early on the page.

## Starting Point

Slot 02 is `HowIWork` (four declarative cards), rendered as an opaque COVER section in
`app/[locale]/page.tsx`. Its anchor `#how-i-work` is referenced in five places (page, nav,
hero CTA, two Playwright specs). Base UI dialog is already wrapped in `components/ui/sheet.tsx`;
static export uses `next/image` with `images.unoptimized: true`. Only source for the
certificate visuals is the **PDF**.

## Desired End State

Slot 02 renders "Warsztat AI": a credential card, four labelled badge icons, five competency-area
cards (mapped from the certificate modules), and a clickable certificate thumbnail that opens
the enlarged image in a lightbox. Nav reads "Warsztat AI" → `#certification`; the hero secondary
CTA points at `#portfolio` (the real workflow diagram); `HowIWork` is parked (kept, unrendered).

## Key Decisions Made

| Decision | Choice | Why (1 sentence) | Source |
| --- | --- | --- | --- |
| Which slot | Replace `HowIWork`, keep `WhatICanDeliver` | HowIWork duplicates WarsztatFlow; skills are a different content type | Plan |
| Badges | Four separate icons | Owner wants the badges visible, not only inside the cert | Plan |
| Asset source | Extract all rasters from the PDF offline | Only the PDF is available; no separate badge art | Plan |
| Hero secondary CTA | Re-point to `#portfolio` (label unchanged) | The WarsztatFlow diagram is the real "how I work" target | Plan |
| Nav label / anchor | "Warsztat AI" / `#certification` | Communicates topic without jargon | Plan |
| HowIWork fate | Park (component + i18n kept, unrendered) | Easy restore; follows the `CurrentlyLearning` precedent | Plan |
| Lightbox | Enlarged image only (no PDF download) | Meets the request 1:1; nothing heavy in `public/` | Plan |

## Scope

**In scope:** new `Certification` section + `certificate-lightbox`; PDF→webp asset extraction
script (cert + 4 badges); `certification` i18n namespace × 3 locales + nav label; rewiring the
five `#how-i-work` references; parking `HowIWork`; unit + i18n tests; spec anchor updates.

**Out of scope:** `WhatICanDeliver` (skills) and `WarsztatFlow`; deleting `HowIWork`; PDF
download; a gallery/carousel; ambient-backdrop work; any runtime PDF dependency.

## Architecture / Approach

One-off dev script renders the PDF at high DPI (`pdfjs-dist` + `@napi-rs/canvas`, Playwright
fallback) and `sharp`-crops six webp files into `public/images/`. A server component
(`Certification`) reads the `certification` namespace and renders credential + badges + areas +
thumbnail; the thumbnail is a client `certificate-lightbox` built on `@base-ui/react/dialog`
(same primitive as `sheet.tsx`). Slot 02 swaps the render; nav/CTA/specs repoint to
`#certification`.

## Phases at a Glance

| Phase | What it delivers | Key risk |
| --- | --- | --- |
| 1. Extract assets | Six webp files (cert, thumb, 4 badges) in `public/images/` | Badge crops small → tune render scale/crop rects |
| 2. Copy + i18n | `certification` namespace × 3 locales + nav label | PL copy must pass charter (no negation/"na"/migration) |
| 3. Section + lightbox | `Certification` RSC + Base UI dialog lightbox + unit test | Dialog a11y (focus trap/return) under static export |
| 4. Wire-up + park | Slot swap, nav/CTA repoint, spec anchor updates | Missing one of the five `#how-i-work` references |

**Prerequisites:** the certificate PDF available to the extraction script; `sharp` (present),
Playwright Chromium (present).
**Estimated effort:** ~4 phases / 3–4 focused sessions.

## Open Risks & Assumptions

- Badge legibility depends on the source resolution; render scale (~4×) is the mitigation but
  crops may need eyeballing (Phase 1 manual gate).
- No global i18n parallel test exists — `npm run build` is the completeness gate; a scoped
  test is added to make it explicit.
- The extraction script may need a dev-only dependency (`pdfjs-dist`/`@napi-rs/canvas`); it is
  build-time only and never ships to runtime.

## Success Criteria (Summary)

- Slot 02 shows the certificate section (credential + 4 badges + 5 areas + working lightbox) in
  all three locales and both themes.
- Nav "Warsztat AI" and the hero CTA scroll to the correct sections; `HowIWork` no longer renders.
- `npm run build`, `npm run lint`, `npm run test` all pass; anchor specs assert `certification`.
