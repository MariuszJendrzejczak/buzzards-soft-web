# Section 03 Skills Rebuild — Implementation Plan

## Overview

Rebuild the home page's **section 03** (`whatICanDeliver`) from "Co umiem dowieźć" into
**„Moje umiejętności i zalety"** — a tighter, more concrete skills section. Expand the 3.1
Mobile (Flutter) sub-block from a verified CV-skill inventory, shrink the Unity sub-block to a
slim "also" block, promote 3.2 to a flagship **„Programowanie Agentowe"** card dressed as
skill-phrases, keep 3.3 as-is, and remove cards 3.4 + 3.5 — across the component `SECTION_SPECS`
and all three `messages/*.json`, staying key-parallel. Also retire the second „dowieźć" in
About/para5 (PL).

## Current State Analysis

- Section 03 is a **data-driven accordion**: `SECTION_SPECS` in
  `components/sections/work/what-i-can-deliver.tsx:35-127` declares five cards
  (`variant: "core"` = documented, `"growing"` = actively-developing); all copy is pulled from
  the `whatICanDeliver` i18n namespace (`messages/pl.json:206-285`, mirrored in `en.json`/`sv.json`).
- Card shapes today: **3.1** (`core`, 3 sub-blocks: mobile/unity/common) · **3.2** (`growing`,
  6 bullets + chips + honesty callout via `hasCallout: true`) · **3.3** (`core`, 5 bullets) ·
  **3.4** (`growing`, 3 bullets + chips) · **3.5** (`core`, 3 bullets + chips).
- Chips are **hard-coded arrays in the component** (`SECTION_SPECS`), NOT i18n — so chip edits are
  component-only. Bullet/title/callout text lives in i18n.
- Bullet counts are driven by `bulletKeys` arrays in the spec that MUST match the i18n keys present
  (`what-i-can-deliver.tsx:225-234`); adding/removing bullets means editing both the spec array and
  the keys.
- **i18n parity is enforced by `npm run test`** (i18n-completeness suite) — `pl`/`en`/`sv` must be
  key-parallel; removing `34`/`35` and renaming keys must happen in all three locales.
- **PL is source of truth**; EN/SV are transcreations landed after PL is approved
  (`transcreate-copy-en`). `npm run build` is also the type-check (no separate `tsc`).
- Full research + the owner-verified skill inventory + all locked content decisions live in
  `context/slices/skills-section-rebuild/research.md` (incl. the 4-facet Flutter CV skill matrix).

## Desired End State

Section 03 renders **three** accordion cards — 3.1 Programowanie produkcyjne (Mobile expanded +
slim Unity), 3.2 Programowanie Agentowe (core, skill-phrases, no callout), 3.3 Soft skills
(unchanged) — under the heading **„Moje umiejętności i zalety"**, in all three locales, with
`npm run build`, `npm run test`, and `npm run lint` green, and the accordion visually verified on
the dev server. About/para5 no longer contains „dowieźć".

### Key Discoveries:

- Data-driven accordion — `what-i-can-deliver.tsx:35-127` (`SECTION_SPECS`) + parallel i18n keys.
- Chips are component-only arrays (`:45-56`, `:85-94`, `:110-117`, `:125`); bullets/titles/callout
  are i18n.
- `variantGrowing` label branch (`:171`) becomes dead once every card is `core` — the key can stay
  (parity-harmless) or the branch be simplified; no card uses `growing` after this change.
- The 3.2 honesty callout is toggled by `hasCallout: true` (`:95`) + `sections.32.callout` (i18n).
- The portfolio "AI Native Development" block (`messages/pl.json:602-643`, `warsztat` namespace) is
  the **proof** counterpart of 3.2 — 3.2 must not duplicate its six tiles; different register.

## What We're NOT Doing

- NOT redesigning the accordion component, its styling, or the `variant` visual system.
- NOT touching the portfolio "AI Native Development" / `warsztat` namespace.
- NOT adding skills the owner did not verify (excluded per research: BLoC/Cubit, retrofit, GraphQL,
  drift/Isar, SSL pinning, Patrol/Maestro, Fastlane, Pigeon/FFI, native Kotlin/Swift, Sentry, etc.).
- NOT claiming commercial web/fullstack experience ([[web-is-personal-mobile-is-commercial]]).
- NOT editing About beyond the one-line para5 „dowieźć" trim (PL); About EN/SV para5 untouched.
- NOT restoring the parked `currentlyLearning` section (3.4's content overlaps it — that stays parked).

## Implementation Approach

Three phases matching the content→code→localization spine: (1) produce the PL copy — prose fields
through the copy-standard generator (Voice-Gap-Test), skill bullets finalized from the agreed
rozpiska; (2) refactor the component + land PL + trim About; (3) transcreate EN/SV, land, and verify
tri-locale. Executed foreground via `/slice-run` with a dev-server visual check.

## Critical Implementation Details

- **i18n parity window.** Between Phase 2 (PL structural change: `34`/`35` removed, keys renamed)
  and Phase 3 (EN/SV mirrored), the i18n-completeness test is expected RED. Phase 2's automated gate
  is therefore build + lint only; the i18n test is the closing gate of Phase 3. Do not "fix" the red
  test between phases by machine-translating — EN/SV is Phase 3's transcreation deliverable.
- **Skill-bullet terseness is intentional.** 3.1/3.2 bullets are terse skill-phrases (owner:
  „ubrane w umiejętności, nie opisowe zdania") — a sanctioned deviation from the `no-laconic` floor,
  which governs prose fields (heading/eyebrow/intro), not skill lists.

## Phase 1: PL copy — prose via generator, skill bullets finalized

**Discipline:** content

### Overview

Produce the PL strings for section 03: heading + eyebrow + intro through
`generate-professional-copy-pl` (with its Voice-Gap-Test), and the finalized skill-phrase bullets
for 3.1 (Mobile expanded, Unity slim) and 3.2 (Programowanie Agentowe) from the agreed rozpiska in
research.md. Deliverable is a reviewable PL copy artifact — NOT a write to `messages/*.json`.

### Changes Required:

#### 1. PL prose fields (heading / eyebrow / intro)

**File**: copy artifact under `context/slices/skills-section-rebuild/` (e.g. `copy-pl.md`)

**Intent**: Replace „Co umiem dowieźć" with **„Moje umiejętności i zalety"**; realign the eyebrow
(currently „Sekcja 03 · Co umiem") and rewrite the intro — the old intro frames AI tooling +
business processes as „obszary, które aktywnie poszerzam", which is now false (3.2 is core, 3.4
removed). Run through the generator's Voice-Gap-Test. Honor [[no-negation-marketing]],
[[no-infantile-tone]], [[prefer-dla-over-na]], [[pitch-asserts-portfolio-proves]].

**Contract**: `whatICanDeliver.title`, `.eyebrow`, `.intro` — final PL strings, Voice-Gap-Test MATCHED.

#### 2. PL skill-phrase bullets (3.1 Mobile + slim Unity, 3.2)

**File**: same copy artifact

**Intent**: Finalize the terse skill-phrase bullets from research.md's verified inventory —
3.1 Mobile (~8–9 bullets: architektura, nawigacja, dane+backend, auth, integracje urządzenia,
powiadomienia+monetyzacja, UI+animacje, jakość+wdrożenie), 3.1 Unity slim (title + 1–2 bullets),
3.1 common (keep/trim), and 3.2 „Programowanie Agentowe" (~11 bullets grouped osąd → orkiestracja →
metoda → integracja). 3.3 bullets unchanged (no copy work).

**Contract**: string values for `sections.31.subBlocks.{mobile,unity,common}.*` and `sections.32.*`
(title + bullets, **no** `callout`). Bullet keys are contiguous `"1".."N"` per block.

### Success Criteria:

#### Automated Verification:

- Copy artifact exists: `context/slices/skills-section-rebuild/copy-pl.md`

#### Manual Verification:

- Heading/eyebrow/intro read on-voice; no „dowieźć"; Voice-Gap-Test MATCHED
- 3.1 Mobile bullets cover only owner-verified skills; Unity slimmed; 3.2 reads as skills, not prose
- Owner approves the PL copy before it lands

**Implementation Note**: Pause for owner approval of the PL copy before Phase 2.

---

## Phase 2: Component refactor + land PL + About trim

**Discipline:** code

### Overview

Apply the structural changes to `SECTION_SPECS`, land the approved PL strings into `messages/pl.json`
(removing `34`/`35`), and trim „dowieźć" from About/para5 (PL).

### Changes Required:

#### 1. `SECTION_SPECS` restructure

**File**: `components/sections/work/what-i-can-deliver.tsx`

**Intent**: (a) 3.1 — expand mobile `bulletKeys` to the new count, update mobile `chips` (+ go_router,
Hive, FCM, RevenueCat, AdMob, DI), slim the unity sub-block (fewer `bulletKeys` + reduced `chips`),
keep/trim common. (b) 3.2 — flip `variant` `growing`→`core`, remove `hasCallout: true`, expand
`bulletKeys` to the new count, update `chips` (+ subagenty, slash commands, hooks, spec-driven,
worktree). (c) Remove the 3.4 and 3.5 spec entries entirely. 3.3 spec unchanged.

**Contract**: `SECTION_SPECS` array (`:35-127`) — three specs remain (`3.1`/`3.2`/`3.3`);
`hasCallout` gone from 3.2; `bulletKeys` arrays match the landed i18n key counts. `Variant` type and
`ITEM_VARIANT_CLASSES` untouched; `variantGrowing` label branch (`:171`) now dead but left intact.

#### 2. Land PL strings + remove dropped keys

**File**: `messages/pl.json`

**Intent**: Write the approved Phase-1 strings into `whatICanDeliver` (title/eyebrow/intro,
`sections.31.*`, `sections.32.*` with the `callout` key deleted); delete `sections.34` and
`sections.35` entirely.

**Contract**: `whatICanDeliver` namespace — keys `34`, `35`, and `sections.32.callout` removed;
`31`/`32` bullet keys contiguous and matching the spec `bulletKeys`.

#### 3. About/para5 „dowieźć" trim (PL)

**File**: `messages/pl.json`

**Intent**: Retire the „…rzeczy, których nie umiem dowieźć." phrasing in `about.para5` — reword to
keep the meaning (kompleksowość, no „PoC" abandonment) without the word „dowieźć". PL only.

**Contract**: `about.para5` — no occurrence of „dowieźć"; same key.

### Success Criteria:

#### Automated Verification:

- Type-check + static export pass: `npm run build`
- Linting passes: `npm run lint`

#### Manual Verification:

- Dev server: section 03 renders three cards; heading „Moje umiejętności i zalety"; 3.2 shows
  `core` styling and no callout; Unity sub-block slimmed; 3.1 Mobile bullets present
- About/para5 reads clean without „dowieźć"
- (i18n-completeness test is knowingly RED here — EN/SV land in Phase 3)

**Implementation Note**: Pause for manual confirmation on the dev server before Phase 3.

---

## Phase 3: EN/SV transcreation + tri-locale verification

**Discipline:** content → code

### Overview

Transcreate the new/changed PL strings to EN + SV via `transcreate-copy-en`, land them mirroring the
PL structure (including `34`/`35` removal + `callout` removal), and run the full tri-locale gate.

### Changes Required:

#### 1. EN/SV transcreation + land

**File**: `messages/en.json`, `messages/sv.json`

**Intent**: Transcreate the changed `whatICanDeliver` keys (title/eyebrow/intro, `31`/`32` bullets,
slim Unity) to native-reading EN + SV; mirror the structural delta exactly — remove `sections.34`,
`sections.35`, and `sections.32.callout` in both files. About/para5 EN/SV left untouched (out of scope).

**Contract**: `en.json` + `sv.json` `whatICanDeliver` namespaces are key-parallel with `pl.json`
(same keys, transcreated values); no `34`/`35`/`callout` keys.

### Success Criteria:

#### Automated Verification:

- Type-check + static export pass: `npm run build`
- Full suite incl. i18n-completeness passes: `npm run test`
- Linting passes: `npm run lint`

#### Manual Verification:

- Dev server EN + SV: section 03 renders identically-structured three cards; transcreations read natively
- Owner spot-checks EN/SV wording

**Implementation Note**: Final closing gate — all three locales green + visual check.

---

## Testing Strategy

| Behavior asserted | Expected outcome (oracle source) | Regression caught | Layer | Anti-pattern avoided |
|---|---|---|---|---|
| `messages/{pl,en,sv}.json` are key-parallel after `34`/`35`/`callout` removal + renames | Parity holds across all three (i18n-completeness suite) | Orphaned or missing locale keys shipping a broken/partial section | integration (existing SSG/i18n suite via `npm run test`) | asserting on exact copy strings (brittle) instead of structural parity |
| Static export builds with the refactored `SECTION_SPECS` | `npm run build` succeeds; section 03 present in `out/` | Type error / bad key reference from a spec `bulletKeys` mismatch | build/SSG (`npm run build`) | mirror test of the spec array shape |

The existing i18n-completeness suite is the load-bearing behavioral gate (its oracle is "PL/EN/SV
must be key-parallel", a repo invariant per `CLAUDE.md`). No new bespoke test is needed; do not add
mirror/getter tests for the static spec.

### Manual Testing Steps:

1. `npm run dev`, open `/pl` → section 03: heading „Moje umiejętności i zalety", three cards, 3.2
   `core` styling with no callout, Unity slim, 3.1 Mobile bullets correct.
2. Open the 3.2 accordion — confirm skill-phrase bullets, no honesty callout.
3. Check `/en` and `/sv` render the same structure with native transcreations.
4. Confirm About/para5 (PL) has no „dowieźć".

## References

- Research + verified skill inventory + locked decisions: `context/slices/skills-section-rebuild/research.md`
- Component: `components/sections/work/what-i-can-deliver.tsx:35-127`
- Copy: `messages/pl.json:206-285` (section) · `messages/pl.json:317` (About/para5)
- Proof counterpart (do not duplicate): `messages/pl.json:602-643` (`warsztat`)

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles. See `references/progress-format.md`.

### Phase 1: PL copy — prose via generator, skill bullets finalized

#### Automated

- [x] 1.1 Copy artifact exists: `context/slices/skills-section-rebuild/copy-pl.md` — 60ddcc0

#### Manual

- [x] 1.2 Heading/eyebrow/intro on-voice; no „dowieźć"; Voice-Gap-Test MATCHED — 60ddcc0
- [x] 1.3 3.1 Mobile bullets = owner-verified skills only; Unity slimmed; 3.2 reads as skills — 60ddcc0
- [x] 1.4 Owner approves the PL copy before it lands — 60ddcc0

### Phase 2: Component refactor + land PL + About trim

#### Automated

- [x] 2.1 Type-check + static export pass: `npm run build` — 29453e9
- [x] 2.2 Linting passes: `npm run lint` — 29453e9

#### Manual

- [ ] 2.3 Dev server: three cards; heading correct; 3.2 core + no callout; Unity slim; 3.1 Mobile bullets
- [ ] 2.4 About/para5 clean without „dowieźć"

### Phase 3: EN/SV transcreation + tri-locale verification

#### Automated

- [ ] 3.1 Type-check + static export pass: `npm run build`
- [ ] 3.2 Full suite incl. i18n-completeness passes: `npm run test`
- [ ] 3.3 Linting passes: `npm run lint`

#### Manual

- [ ] 3.4 Dev server EN + SV: same structure, native transcreations
- [ ] 3.5 Owner spot-checks EN/SV wording
