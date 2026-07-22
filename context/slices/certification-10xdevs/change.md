---
change_id: certification-10xdevs
title: "Warsztat AI — 10xDevs certificate section (replaces the HowIWork slot 02)"
status: impl_reviewed
created: 2026-07-22
updated: 2026-07-22
archived_at: null
---

## Notes

Replace the home slot-02 `HowIWork` section — now a stale duplicate of the
`WarsztatFlow` workflow diagram in the portfolio — with a new "Warsztat AI"
credibility section built around the owner's **10xDevs Certificate of Completion**
(cohort-based course, BRAVE / 10xDEVS, dated 2026-07-20).

Section carries: a credential card, the three acclaimed badges (10xBuilder,
10xArchitect, 10xChampion) plus the **Best Project** distinction as separate icons,
the five competency areas from the certificate, and a clickable certificate
thumbnail that opens an enlarged image in a lightbox popup.

Decisions locked in conversation (2026-07-22):
- New section takes the `HowIWork` slot (02); the skills section `WhatICanDeliver` stays.
- Badges shown as separate icons (not just inside the cert thumbnail).
- Only source available is the certificate **PDF** → all rasters (cert + badges) are
  extracted from it offline (no separate badge art).
- Hero secondary CTA "Zobacz, jak pracuję" re-points to `#portfolio` (the WarsztatFlow
  workflow diagram), label unchanged.
- Nav label "Warsztat AI", anchor `#certification`.
- `HowIWork` is **parked** (component + i18n kept, unrendered) like `CurrentlyLearning`.
- Lightbox shows the enlarged image only (no PDF download).
