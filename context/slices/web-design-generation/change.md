---
change_id: web-design-generation
title: "Professional web-design generation — reusable web art-direction capability"
status: implementing
created: 2026-07-19
updated: 2026-07-19
archived_at: null
---

## Notes

Design sibling of the `web-copy-generation` capability. Goal: a reusable, on-brand
**web design** capability that mirrors the copywriting one in shape.

Locked framing (from kickoff conversation):
- **Output:** a reviewable **art-direction / design-standard artifact** (not direct code
  dump), review → then implementation. Mirrors the copy `research → standard → pilot → land`
  path.
- **Architecture:** full mirror of copy — a shared `~/.claude/design-standard/` home
  (charter / tokens / component-rules / motion-language / design-gap-test) driving thin
  front-ends: an interactive `design-web` skill + a sprint-callable `designer` agent.
- **Stack grounding (web):** Next.js 16 / React 19 / Tailwind v4 / shadcn + Base UI.
- **Market analyzed:** `frontend-design` (official) generates production UI code but is
  stateless — no persistent brand standard, no stack grounding; `frontend-developer` is a
  generic executor. The gap (a durable on-brand design standard + review seam) is what this
  slice builds — same build-vs-buy conclusion as copy.

Sibling slice: `mobile-design-generation` (Flutter). Shared `~/.claude/design-standard/`
core may be split web/mobile or share a platform-neutral root — to be settled in research.

First artifact: `research.md` — build-vs-buy + a professional web design standard, grounded
in the live site and cited external design sources.

### Decisions locked 2026-07-19 (post-research)
- **Shared-home structure (was research Open Question #1):** ONE home
  `~/.claude/design-standard/` with a platform-neutral `_core/` (principles, anti-slop, a11y
  floors, gap-test procedure, DNA-extraction method) + thin `web/` and `mobile/` deltas
  (spine + token-contract per platform). ONE `designer` agent, platform-parameterized.
- **Sequencing:** `/plan` this WEB slice first (live site = ready DNA corpus, headless-Chrome
  visual gate), validate the pattern, then `/plan` the mobile sibling.
