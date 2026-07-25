# Section 03 Skills Rebuild — Plan Brief

> Full plan: `context/slices/skills-section-rebuild/plan.md`
> Research: `context/slices/skills-section-rebuild/research.md`

## What & Why

Rebuild the home page's section 03 (`whatICanDeliver`) into a tighter, more concrete skills section.
Drop the word „dowieźć" for the neutral heading **„Moje umiejętności i zalety"**, add real substance
to the skills (backed by a verified Flutter-CV skill inventory), and make **„Programowanie Agentowe"**
a flagship card rather than a hedged "growing" one.

## Starting Point

Section 03 is a data-driven accordion (`SECTION_SPECS` in `what-i-can-deliver.tsx:35-127` + the
`whatICanDeliver` i18n namespace across `pl`/`en`/`sv`) with five cards: 3.1 production (mobile/unity/
common), 3.2 "AI tooling…" (growing + honesty callout), 3.3 soft skills, 3.4 growth areas, 3.5 tech
background. Heading is „Co umiem dowieźć".

## Desired End State

Three cards under „Moje umiejętności i zalety": 3.1 with an expanded Mobile (Flutter) sub-block and a
slim Unity block, 3.2 „Programowanie Agentowe" (core, skill-phrases, no callout), 3.3 unchanged —
rendered in all three locales with build/test/lint green, verified on the dev server. About/para5 no
longer says „dowieźć".

## Key Decisions Made

| Decision | Choice | Why (1 sentence) | Source |
| --- | --- | --- | --- |
| Heading | „Moje umiejętności i zalety" | Neutral, drops „dowieźć" | Conversation |
| 3.2 variant | `growing` → `core`, callout removed | 10xDevs cert + daily use make it documented; owner cut the callout | Conversation |
| 3.2 form | Skill-phrases, not prose | Owner: „ubrane w umiejętności, nie opisowe zdania" | Conversation |
| 3.1 Mobile | Expanded from verified CV inventory | Deep Flutter-CV research + owner check of what he actually has | Research |
| 3.1 Unity | Slim sub-block | 2D Unity no longer fits apps; kept honestly (commercial exp.) | Conversation |
| 3.3 | Unchanged, defensive | No sourced people-management record → no invented metrics | Research |
| 3.4 + 3.5 | Removed | 3.4 duplicates parked `currentlyLearning`; 3.5 is biography (lives in About) | Research |
| Copy pipeline | Prose via generator, bullets as-is | Voice-Gap-Test for prose; bullets already decided/terse | Conversation |
| EN/SV | Same slice, after PL approved | Close the section tri-locale; keep i18n parity green | Conversation |

## Scope

**In scope:** heading/eyebrow/intro rewrite; expand 3.1 Mobile + slim Unity; 3.2 rename→core→
skill-phrases→no callout; remove 3.4 + 3.5; reflow 3.1/3.2/3.3; land PL then transcreate EN/SV;
trim „dowieźć" in About/para5 (PL).

**Out of scope:** accordion redesign/styling; portfolio `warsztat` block; unverified skills; commercial
web claims; About beyond the one para5 line; restoring `currentlyLearning`.

## Architecture / Approach

Content → code → localization. Phase 1 produces PL strings (prose via `generate-professional-copy-pl`
+ Voice-Gap-Test; skill bullets finalized). Phase 2 refactors `SECTION_SPECS` (rename, variant flip,
callout + 3.4/3.5 removal, chips, slim Unity) and lands PL + trims About. Phase 3 transcreates EN/SV
via `transcreate-copy-en` and lands, then the full tri-locale gate runs.

## Phases at a Glance

| Phase | What it delivers | Key risk |
| --- | --- | --- |
| 1. PL copy | Approved PL strings (prose + skill bullets) | Generator over-lengthening terse bullets — mitigated by "bullets as-is" |
| 2. Refactor + land PL | Component + `pl.json` updated; About trimmed | Spec `bulletKeys` ↔ i18n key-count mismatch → build fails |
| 3. EN/SV + verify | Tri-locale parity + dev-server check | i18n test stays RED until EN/SV mirror the structure |

**Prerequisites:** none — research + verified inventory + decisions are locked in research.md.
**Estimated effort:** ~1–2 foreground sessions across 3 phases via `/slice-run`.

## Open Risks & Assumptions

- Between Phase 2 and Phase 3 the i18n-completeness test is intentionally RED (PL structure changed
  before EN/SV mirror it); the closing gate is Phase 3.
- `variantGrowing` label becomes dead code (all cards `core`) — left intact, parity-harmless.
- Skill-bullet terseness is a sanctioned deviation from the `no-laconic` floor (prose-only).

## Success Criteria (Summary)

- Section 03 shows three cards under „Moje umiejętności i zalety", 3.2 as a flagship skill list with
  no callout, Unity slimmed — in PL/EN/SV.
- `npm run build`, `npm run test` (incl. i18n-completeness), `npm run lint` all green.
- No „dowieźć" in section 03 or About/para5 (PL).
