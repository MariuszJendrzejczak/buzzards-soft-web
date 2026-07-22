---
change_id: web-visual-elevation
title: Visual elevation — ambient scroll-driven background imagery + design-review polish
status: new
created: 2026-07-22
updated: 2026-07-22
archived_at: null
---

## Notes

Goal: make the whole site look noticeably better — a deliberate visual-elevation
pass over the shipped design.

Two workstreams feed this slice:

1. **Ambient scroll-driven background imagery (headline, owner's request).** Full-bleed
   photographic/generated backdrops that live *behind* the sections and transition as the
   reader scrolls: one image at the top, then a section scrolls up and covers it, and a
   different backdrop is revealed further down. The reference is the "scroll-jacking /
   pinned-backdrop" storytelling pattern (think Apple product pages). Must respect
   `prefers-reduced-motion` and must NOT regress text contrast (image scrims / a11y floors).
   Asset dependency: images to be generated (candidate: Google "nano banana" / Gemini image
   models — tooling TBD, see design-review.md ## Asset generation).

2. **Design-review-driven polish.** Findings captured in `design-review.md` (this folder)
   from the 4-agent `/design-web` REVIEW pass (2026-07-22). Highest-priority: light-theme
   WCAG contrast blockers (focus ring, emerald-as-small-text, amber asterisk) and the
   portfolio raw-palette "rainbow" (incl. the purple slop tell) that falls out of the token
   contract. Existing guardrails to reconcile with: `tests/unit/design-contrast.test.ts`,
   `tests/unit/design-token-conformance.test.ts`.

Scope/phasing (light a11y bug-fixes vs. the ambient feature vs. portfolio de-rainbow) to be
decided at `/plan`. Nothing implemented yet — this slice is freshly opened.
