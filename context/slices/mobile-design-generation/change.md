---
change_id: mobile-design-generation
title: "Professional mobile-design generation — reusable Flutter art-direction capability"
status: implementing
created: 2026-07-19
updated: 2026-07-19
archived_at: null
---

## Notes

Mobile sibling of the `web-design-generation` / `web-copy-generation` capabilities. Goal: a
reusable, on-brand **mobile (Flutter) design** capability that mirrors the copywriting one in
shape.

Locked framing (from kickoff conversation):
- **Output:** a reviewable **art-direction / design-standard artifact** (not direct code
  dump), review → then implementation.
- **Architecture:** full mirror of copy — a shared `~/.claude/design-standard/` home driving
  thin front-ends: an interactive `design-mobile` skill + a sprint-callable `designer` agent
  (the same agent may serve web + mobile, or split — to settle in research).
- **Stack grounding (mobile):** Flutter, Clean Architecture + Riverpod house stack; Material 3
  and platform (iOS HIG / Android Material) conventions matter more than on web.
- **Grounding caveat:** this web repo has no Flutter code. Research must ground on external
  sources + a named Flutter house repo (e.g. home_storage_mobile) rather than this codebase.
  Capability itself is user-scope / portable, so planning it from here is fine.

Sibling slice: `web-design-generation`. Shared `~/.claude/design-standard/` core may be split
web/mobile or share a platform-neutral root — to be settled in research.

First artifact: `research.md` — build-vs-buy + a professional Flutter design standard, grounded
in the house Flutter conventions and cited external design sources.

### Decisions locked 2026-07-19 (post-research)
- **Shared-home structure (was research Open Question #1):** ONE home
  `~/.claude/design-standard/` with a platform-neutral `_core/` (principles, anti-slop, a11y
  floors, gap-test procedure, DNA-extraction method) + thin `web/` and `mobile/` deltas
  (spine + token-contract per platform). ONE `designer` agent, platform-parameterized.
- **Sequencing:** the WEB sibling is planned FIRST; this mobile slice is planned AFTER the web
  pattern is validated (mobile needs a named Flutter corpus, e.g. home_storage_mobile, and a
  device/emulator visual gate — heavier than web).
