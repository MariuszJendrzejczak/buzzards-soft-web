# Professional Web-Copy Generation — Implementation Plan

## Overview

Build a **reusable professional copywriting capability** for the Buzzards Soft site and
apply it as its first job: rewrite the amateur-reading `/web-pages-offer` copy to a
professional, on-brand register, restructured onto a StoryBrand spine. The capability is
two user-scope Claude skills (PL generation, EN transcreation) plus a sprint-callable
`copywriter` agent, all driven by one shared set of `references/` contracts — a voice
charter, a framework spine, a native-Polish AI-tell ban-list, a namespace contract, and a
Voice-Gap-Test rubric.

The build-vs-buy question is already settled by `research.md` (**BUILD** — every AI-copy
SaaS wraps the same frontier models and gives zero PL/SV language edge). This plan is pure
solution design: how to encode the standard, how to validate it, and how to land the first
rewrite through the existing i18n pipeline.

## Current State Analysis

- **The copy defect is systemic, not cosmetic** (`research.md` Area 1): the same 3–4
  selling points are re-pitched 4–6× across sections; spoken-Polish colloquialisms
  (*pogadasz, kilka stówek, jakieś*); em-dash/scare-quote/fragment tics; and EN/SV that
  inherited the flaws via literal translation. The failure is a **missing standard**.
- **The offer page ships today** at `app/[locale]/web-pages-offer/page.tsx` with **11
  section components** in `components/sections/offer/*.tsx` (`offer-hero`,
  `offer-three-paths`, `offer-process`, `offer-standard`, `offer-pricing`, `offer-modules`,
  `offer-why-ai`, `offer-limits`, `offer-ownership`, `offer-faq`, `offer-quote`).
- **The `offer.*` namespace** top-level keys today: `meta`, `breadcrumbBack`,
  `documentBadge`, `hero`, `threePaths`, `process`, `standard`, `pricing`, `modules`,
  `whyAi`, `limits`, `ownership`, `faq`, `quote` (`messages/pl.json`).
- **The i18n CI gate already exists** (`tests/unit/i18n-offer-completeness.test.ts`): it
  **walks leaves dynamically**, so it does not hardcode key names — it enforces (a) ≥1
  `offer.*` leaf, (b) every leaf non-empty, (c) no placeholder (`[PL]|[EN]|[SV]|TODO|TBD`),
  and (d) **leaf-key set identical across pl/en/sv**. Restructuring the namespace therefore
  needs **no edit to this test** — but it does mean SV must carry real (non-placeholder)
  strings to stay green.
- **A 3-locale route smoke spec exists** (commit `6d4534c`) for `/web-pages-offer`; it may
  assert on headings/structure and may need updating after the restructure.
- **Skill anatomy is consistent** (`~/.claude/skills/{plan,research}`): one `SKILL.md`
  (YAML frontmatter: `name`, `description` with PL+EN triggers, `allowed-tools`) + numbered
  steps + house rules, with load-bearing contracts in a `references/` subdir (e.g.
  `plan/references/progress-format.md`). Agents resolve from the same registry as the Agent
  tool; user-scope agents live in `~/.claude/agents/` and are portable across projects.
- **No `context/foundation/` roadmap or lessons file exists** in this repo — no roadmap row
  to stamp.

## Desired End State

Two reusable skills and one agent exist in user scope, each driving a shared copy-standard
contract. Invoking the PL skill on a page brief produces professional, charter-compliant PL
copy as a reviewable artifact; the EN skill transcreates it. The `/web-pages-offer` page is
live with rewritten, restructured (StoryBrand) copy in all three locales, the
i18n-completeness test and route smoke spec are green, and `npm run build` + `npm run test`
+ `npm run lint` pass.

**Verification:** the pilot section passes a Voice-Gap-Test (every voice dimension MATCHED);
the full rewritten page reads professional on human review (no colloquialisms, no
repetition, affirmative phrasing); `npm run build && npm run test` green; the offer route
renders in pl/en/sv.

### Key Discoveries:

- **The i18n test walks leaves dynamically** (`i18n-offer-completeness.test.ts:21-50`) —
  namespace restructure needs no test edit, only pl/en/sv parity + non-placeholder content.
- **SV cannot be a literal placeholder** — the placeholder guard forbids `[SV]|TODO|TBD`, so
  even a quality-deferred SV must carry real translated strings to keep CI green.
- **Voice-DNA extraction from samples is not viable yet** — the mechanism in `research.md`
  §C needs 5–8 human-written samples *in the target voice*, which does not exist (the
  current copy is the defect). The charter is authored **top-down** from the locked
  decisions; the approved rewrite becomes the first real sample corpus (corrections-as-data).
- **The ~800-word output-degradation ceiling is real** (`research.md` §C) — generate one
  section per window, restating charter rules at the top of each. This is why the pilot is
  one section.
- **Negation-heavy framing is a defect to design against** — the affirmative-phrasing rule
  directly targets the current copy's *bez abonamentu / bez szablonu / nie generator / czego
  nie robię* pattern.

## What We're NOT Doing

- **Not buying** any AI-copy SaaS (settled in `research.md` Area 3).
- **Not building a quality Swedish capability now** — SV gets a straight translation only to
  hold key-parity; a real SV transcreation skill is deferred until translations mature.
- **Not doing voice-DNA sample extraction** in this slice — charter is authored top-down.
- **Not collecting client screenshots/testimonials** — proof is the honest "this very site
  was built this way" route (`/#warsztat`), the only asset available today.
- **Not changing pricing, modules, or the contact-form engine** — those stay as shipped;
  only their copy/register is touched by the rewrite.
- **Not introducing new test infrastructure** — the existing i18n-completeness test + route
  smoke spec are the CI gate.
- **Not writing `messages/*.json` directly from the skill** — the skill emits a reviewable
  artifact; a deliberate landing step lands it (separation of concerns).

## Implementation Approach

Encode the standard once as shared `references/` contracts, then wrap them in two thin
front-ends (a user-invoked skill and a sprint-callable agent) so the same IP serves both
interactive and autonomous copy work. Validate the whole loop on a single section before
scaling (the ~800-word window). Then use the validated PL skill to rewrite the offer page
onto a StoryBrand spine, review the PL copy as an artifact, land it, restructure the page
components to match, and finally transcreate EN (with SV as a parity-only straight
translation). The existing i18n test is the machine gate throughout; the Voice-Gap-Test is
the qualitative gate for copy quality.

## Critical Implementation Details

- **State sequencing (rewrite → land → restructure).** PL copy must be **generated and
  reviewed as an artifact before** `messages/pl.json` is touched, and the namespace key
  changes must land **before** the page components are re-pointed — otherwise the build
  breaks on missing keys mid-restructure. Land keys for all three locales in the same change
  so the parity test never sees a divergent tree.
- **User-experience spec (BAB proof without client assets).** The StoryBrand proof section
  uses the site-as-proof narrative (this page + `/#warsztat` as the pipeline made real), not
  a client before/after screenshot pair. The BAB structure is honored in prose, not imagery.
- **Charter drift control.** Per `research.md` §C, generation restates the ban-list + top
  voice rules at the **end** of each prompt window (primacy+recency), and no single
  generation window exceeds ~800 words.

## Phase 1: Shared Copy-Standard Reference Contracts

### Overview

Author the load-bearing IP — the shared copy-standard contracts that both skills and the
agent consume. This is the highest-leverage artifact; the front-ends are thin over it.

**Shared home (F1):** the five contracts live in a **neutral shared directory**,
`~/.claude/copy-standard/`, that the PL skill, the EN skill, and the `copywriter` agent all
read. They are **not** nested inside any one skill's `references/` — that would couple the EN
skill and agent to the PL skill's private dir by relative path (fragile on rename/move). The
shared home mirrors the existing `~/.claude/agents/SPRINT_RULES.md` shared-doc precedent.

### Changes Required:

#### 1. Voice charter

**File**: `~/.claude/copy-standard/voice-charter.md`

**Intent**: Encode the locked brand voice so every generation is governed by one constant
standard. Half-formal "tech-flow" register — not chummy, not stiff `Pan/Pani`.

**Contract**: A "X, but never Y" chart with the three locked traits — **confident, never
cocky · direct, never blunt · warm, never chummy** — plus the **affirmative-phrasing rule**
(prefer positive assertions; avoid negation-framed sentences — *bez abonamentu / nie
generator / czego nie robię* → affirmative equivalents — accepting that negation is
sometimes unavoidable), plus a **register floor** (half-formal informal *ty*, ~grade-7
reading level, active voice, plain-word swaps, no dev jargon on client-facing copy).

#### 2. Framework spine

**File**: `~/.claude/copy-standard/framework-spine.md`

**Intent**: The structural playbook the generator applies to a page.

**Contract**: StoryBrand SB7 page spine (customer=hero, brand=guide, 3-step plan, one CTA) +
PAS hero hook + BAB proof + FAB "what's included" + the **Rule of One** governing constraint
+ the **4 U's** (headline test) and **4 C's** (final QA) checklist.

#### 3. Native-Polish AI-tell ban-list

**File**: `~/.claude/copy-standard/ban-list-pl.md`

**Intent**: A native-authored (not translated) catalogue of Polish AI-tells + this page's
own colloquialisms, so the specificity/ban-list editing pass has a concrete target.

**Contract**: Categorized PL ban-list seeded from `research.md` §C (lexical:
*kluczowy, kompleksowe rozwiązanie, synergia, holistyczna perspektywa, innowacyjne
podejście*; openers: *W dzisiejszych czasach / W erze cyfrowej / Warto zauważyć*; fillers:
*Co więcej / Kluczowym aspektem jest*; weak closers: *Podsumowując, warto*; the em-dash vs
Polish-hyphen convention; the *"To nie X, to Y"* pattern) **plus** the current offer copy's
own tics (*pogadasz, kilka stówek, jakieś, łapać kontakt, zaistnieć w sieci*, scare-quote
hedging).

#### 4. Offer namespace contract

**File**: `~/.claude/copy-standard/namespace-contract.md`

**Intent**: The locked target `offer.*` key structure the generated copy must fill, so
output maps 1:1 onto `messages/*.json`.

**Contract**: The **StoryBrand-restructured** `offer.*` section map (see Phase 3 for the
concrete map) expressed as a key tree; documents the parity requirement (identical leaves in
pl/en/sv) and the non-placeholder rule that CI enforces.

#### 5. Voice-Gap-Test rubric

**File**: `~/.claude/copy-standard/voice-gap-test.md`

**Intent**: The validator that scores generated copy against the charter and drives
regeneration of the misses.

**Contract**: Per-dimension scoring **MATCHED / PARTIAL / MISSED** with cited evidence + a
one-paragraph drift diagnosis + a regenerate-the-misses loop; documents corrections-as-data
(human fixes feed back into the charter).

### Success Criteria:

#### Automated Verification:

- All five reference files exist and are non-empty.

#### Manual Verification:

- Charter's three traits + affirmative-phrasing rule + register floor match the locked
  decisions.
- Ban-list is authored natively in Polish (not translated) and includes the current copy's
  tics.
- Framework spine and Voice-Gap-Test rubric are internally consistent and actionable.

**Implementation Note**: Pause after Phase 1 for human confirmation that the charter and
ban-list read right before any generation is wired to them.

---

## Phase 2: PL Generation Skill — Validated on One Section

### Overview

Wrap the Phase 1 contracts in the PL skill front-end and prove the whole loop on a single
section (hero) before scaling. (The autonomous `copywriter` agent is deferred to Phase 6 —
it is off the critical path to the shipped page, F3.)

### Changes Required:

#### 1. PL generation skill

**File**: `~/.claude/skills/generate-professional-copy-pl/SKILL.md`

**Intent**: The user-invoked, interactive front-end: read a page brief (e.g.
`offer-page.md`) → apply framework + charter → generate PL copy keyed to the namespace
contract → run the Voice-Gap-Test → write a reviewable artifact under
`context/slices/<change-id>/`. Does **not** write `messages/*.json`.

**Contract**: `SKILL.md` with YAML frontmatter (`name: generate-professional-copy-pl`,
`description` with PL+EN trigger phrases, `allowed-tools`), numbered process steps, house
rules (PL-source-of-truth, generator-not-inventor → anything missing goes to `## Open
Questions`, ≤800-word generation windows restating rules at the tail). Reads the shared
contracts from `~/.claude/copy-standard/` (F1).

#### 2. Pilot on one section

**File**: `context/slices/web-copy-generation/pilot-hero.md` (reviewable artifact)

**Intent**: End-to-end smoke of the capability — generate the offer **hero** (PAS hook) in
PL, run the Voice-Gap-Test, iterate until every dimension is MATCHED.

**Contract**: One generated section + its Voice-Gap-Test report; gate = professional
register, no ban-list hits, affirmative phrasing, all dimensions MATCHED.

### Success Criteria:

#### Automated Verification:

- `SKILL.md` exists with valid frontmatter (parses without error).

#### Manual Verification:

- Invoking the PL skill produces a hero draft as an artifact (not written to `messages/*`).
- The hero draft passes the Voice-Gap-Test (all dimensions MATCHED) after ≤ a few iterations.
- Pilot hero reads professional, affirmative, and free of the catalogued tics.

**Implementation Note**: Pause after the pilot for human sign-off that the capability
produces professional copy before scaling to the full page.

---

## Phase 3: Full PL Offer Rewrite on a StoryBrand Spine

### Overview

Use the validated skill to rewrite the entire offer page onto the SB7 spine, defining the
new section map and generating every section as a reviewable PL artifact.

### Changes Required:

#### 1. Target StoryBrand section map

**File**: `context/slices/web-copy-generation/offer-rewrite-pl.md` (reviewable artifact) +
finalize `references/namespace-contract.md`

**Intent**: Map the 11 current sections onto the SB7 spine, merging the repetitive
ownership / anti-generator / human-touch content that currently spans 3–4 sections.

**Contract**: Proposed target `offer.*` map — e.g. `hero` (PAS hook) · `problem` (from
`threePaths`) · `guide` (empathy+authority, merging `whyAi`) · `plan` (3-step, from
`process`) · `proof` (BAB, site-as-proof — new) · `includes` (FAB, from `standard`) ·
`pricing` · `modules` · `stakes/ownership` (merging `ownership`+`limits`) · `faq` · `quote`
(CTA). `meta`/`breadcrumbBack`/`documentBadge` retained. Exact leaf keys locked here and
mirrored into the namespace contract.

**Test-coupling constraints (F2) — the map MUST either preserve these keys or update the
pinning test deliberately:**
- `offer.hero.heading` — pinned by `tests/web-pages-offer-3-locales.spec.ts` (the H1
  assertion reads the value dynamically, so content may change freely; only the **key path**
  must survive, or the spec is updated).
- `offer.quote.*` intro / placeholder / context wiring — pinned by
  `tests/unit/offer-quote.test.tsx` (oracle: offer-page.md §11). Renaming/merging the `quote`
  namespace requires updating that unit test in the same change.

#### 2. Generate all PL sections

**Intent**: Run the skill section-by-section (≤800-word windows) to fill the new map with
professional PL copy; consolidate into the rewrite artifact.

**Contract**: Every leaf in the target map filled, each section Voice-Gap-Tested; repetition
across sections eliminated (each selling point stated once).

### Success Criteria:

#### Automated Verification:

- The rewrite artifact and finalized namespace contract exist and cover every target leaf.

#### Manual Verification:

- Every section passes the Voice-Gap-Test.
- No selling point is re-pitched across sections (repetition defect gone).
- Copy is affirmative, half-formal tech-flow, jargon-free; the honest voice and the
  transparency-about-AI stance from `concept.md` are preserved.
- Human review sign-off on the full PL rewrite.

**Implementation Note**: Pause for human review + approval of the full PL copy before it
lands in `messages/pl.json`.

---

## Phase 4: Land PL Copy + Restructure Page Components

### Overview

Land the approved PL copy under the new namespace, re-point the page components to the SB7
structure, and keep EN/SV in key-parity so the build and i18n test stay green.

### Changes Required:

#### 1. Land PL + parity-safe EN/SV placeholders

**File**: `messages/pl.json` (+ `messages/en.json`, `messages/sv.json` key skeletons)

**Intent**: Replace the old `offer.*` tree with the new SB7 key structure carrying the
approved PL copy; mirror the key skeleton into EN/SV with interim real strings so parity
holds (final EN/SV land in Phase 5).

**Contract**: `offer.*` leaves identical across pl/en/sv; no placeholder markers; PL carries
final copy. Interim EN/SV may carry carried-over/rough strings (non-placeholder) until
Phase 5.

#### 2. Restructure page + section components

**File**: `app/[locale]/web-pages-offer/page.tsx` + `components/sections/offer/*.tsx`

**Intent**: Re-point the page to the SB7 section order; add the BAB **proof** section
(site-as-proof), collapse the merged ownership/limits content, simplify `process` to a
3-step plan. Reuse existing component shells where the structure survives; add/remove
components for merged/new sections.

**Contract**: Page renders the new section sequence; every referenced `t("offer.*")` key
exists in the namespace; visual consistency with existing design system (eyebrow cards,
grids from `components/portfolio/*`) preserved.

#### 3. Update the offer-coupled tests (F2)

**Files**: `tests/web-pages-offer-3-locales.spec.ts`, `tests/unit/offer-quote.test.tsx`

**Intent**: Bring the two tests coupled to the `offer.*` namespace in line with the
restructure. **Unaffected (route + nav label preserved — do not touch):**
`tests/unit/nav-offer-link.test.ts`, `tests/unit/sitemap-offer.test.ts` — they assert only
the `/web-pages-offer` route + `nav.items.offer`, which the restructure preserves.

**Contract**: The route spec still asserts the restructured page renders in all three locales
and its H1 comes from `offer.hero.heading` (key preserved per Phase 3, or updated here);
`offer-quote.test.tsx` asserts the `offer.quote.*` wiring against whatever the Phase 3 map
locked (unchanged if the `quote` keys were preserved; updated if renamed).

### Success Criteria:

#### Automated Verification:

- `npm run build` passes (static export + type-check).
- `npm run test` passes after build — including `i18n-offer-completeness` (parity +
  non-placeholder for all 3 locales) and the route smoke spec.
- `npm run lint` passes.

#### Manual Verification:

- `/web-pages-offer` renders the restructured page correctly in pl (primary), en, sv.
- The BAB proof section reads as honest site-as-proof; no layout regressions.
- No console/hydration errors on the page.

**Implementation Note**: Pause after Phase 4 for human confirmation the restructured PL page
looks and reads right before EN transcreation.

---

## Phase 5: EN Transcreation Skill + EN Copy; SV Parity Straight-Translation

### Overview

Author the EN transcreation skill and transcreate the approved PL offer into EN; fill SV with
a straight translation good enough to hold parity (SV quality is an explicit non-goal).

### Changes Required:

#### 1. EN transcreation skill

**File**: `~/.claude/skills/transcreate-copy-en/SKILL.md` +
`~/.claude/skills/transcreate-copy-en/references/transcreation-rules-en.md`

**Intent**: The user-invoked EN front-end: transcreate (not translate) PL copy — adapt
idioms, CTAs, and register to the EN market while carrying the affirmative-phrasing rule and
the voice charter across. Reads the shared `~/.claude/copy-standard/` contracts (F1); its own
`references/transcreation-rules-en.md` holds only EN-specific rules.

**Contract**: `SKILL.md` (frontmatter `name: transcreate-copy-en`, PL+EN triggers,
`allowed-tools`) + `transcreation-rules-en.md` (per-locale tone between PL and SV extremes,
CTA-per-locale, idiom pitfalls, an EN AI-tell ban-list). Emits a reviewable EN artifact.

#### 2. Land EN + SV

**File**: `messages/en.json`, `messages/sv.json`

**Intent**: Land transcreated EN copy; replace interim SV with a **model-produced** straight
translation sufficient to be non-placeholder and parity-complete. DeepL cross-check is
**optional** (per `research.md` Area 3), not a required dependency — no DeepL key/tooling is
wired in this repo, and the parity gate only needs non-placeholder SV strings.

**Contract**: EN = transcreated copy; SV = model-produced straight translation; both
key-parallel with PL, no placeholder markers.

### Success Criteria:

#### Automated Verification:

- `npm run build` passes.
- `npm run test` passes — `i18n-offer-completeness` green for all 3 locales.
- `npm run lint` passes.

#### Manual Verification:

- EN copy reads as native transcreation (idioms/CTAs adapted, not literal), affirmative,
  charter-consistent.
- SV is coherent and complete (quality deferred, but not broken).
- `/web-pages-offer` renders correctly in all three locales.

**Implementation Note**: Pause for human sign-off on EN copy and overall page across locales
before building the agent.

---

## Phase 6: Sprint-callable `copywriter` Agent

### Overview

Package the validated copy standard as an autonomous agent usable from sprint sessions. Built
**after** the offer page ships (F3) so the visible page win is never gated on the sprint-agent
form. Reuses the same shared contracts; adds only the autonomous loop.

### Changes Required:

#### 1. copywriter agent

**File**: `~/.claude/agents/copywriter.md` (user scope)

**Intent**: The autonomous front-end for sprint sessions — same contracts as the skill, but
runs a self-contained **generate → verify (Voice-Gap-Test) → fix** loop, may spawn subagents,
returns finished copy for a sprint to land. Usable via `Agent(subagent_type: "copywriter")`
or a workflow `agent()` call.

**Contract**: Agent definition (frontmatter `name`, `description`, `tools`) whose system
prompt points at the same `~/.claude/copy-standard/` contracts (F1) and encodes the internal
generate→verify→fix loop + the ~800-word window discipline. Returns copy (optionally a
Voice-Gap-Test report), never merges or lands directly.

#### 2. Validate the agent on a section

**Intent**: Dispatch the agent on the offer hero (or another section) brief and confirm it
produces charter-compliant copy through its own loop, comparable to the skill's output.

**Contract**: One agent-produced section + its Voice-Gap-Test result; parity of quality with
the Phase 2 skill output.

### Success Criteria:

#### Automated Verification:

- `copywriter.md` exists with valid parseable frontmatter.

#### Manual Verification:

- The agent produces charter-compliant copy via its generate→verify→fix loop, comparable to
  the skill's output.

**Implementation Note**: Final phase — pause for human sign-off that the agent is
sprint-ready.

---

## Testing Strategy

| Behavior asserted | Expected outcome (oracle source) | Regression caught | Layer | Anti-pattern avoided |
|---|---|---|---|---|
| `offer.*` leaf-key set identical across pl/en/sv | Parity holds after restructure (`i18n-offer-completeness.test.ts` contract; next-intl requires per-locale parallel trees) | Restructure drops/renames a key in one locale only | unit | Not mirroring the implementation — asserts the cross-locale invariant, not specific strings |
| Every `offer.*` leaf non-empty & non-placeholder | No `[PL]/[EN]/[SV]/TODO/TBD`, no empty (same test) | A stub/skeleton ships to prod as visible copy | unit | Not pinning exact copy text (which would be a change-detector) |
| `/web-pages-offer` renders in pl/en/sv | Route responds/renders per locale (`routing.locales` in `i18n/routing.ts`) | Restructure breaks a section/component wiring | smoke (e2e) | Not asserting pixel copy — asserts the page composes |
| Pilot/section copy vs voice charter | All dimensions MATCHED (`references/voice-gap-test.md` rubric; charter = oracle) | Copy drifts back to colloquial/negation/repetition | manual (skill-internal) | Not an interaction test — scores observable register against a sourced charter |

### Manual Testing Steps:

1. Invoke the PL skill on the offer hero brief; confirm it emits an artifact (not
   `messages/*`) and passes the Voice-Gap-Test.
2. Dispatch the `copywriter` agent on the same brief; confirm comparable output via its loop.
3. Review the full PL rewrite artifact for repetition, register, and affirmative phrasing.
4. After landing, load `/web-pages-offer` in pl/en/sv and read each section end-to-end.
5. Confirm the BAB proof section reads as honest site-as-proof and links `/#warsztat`.

## Performance Considerations

None material — static export, copy-only page changes. The only "performance" constraint is
the ~800-word generation window (a copy-quality constraint, not runtime).

## Migration Notes

The `offer.*` namespace is **restructured** (keys renamed/merged/added). Land the new key
tree for all three locales in the same change so the parity test never sees a divergent
intermediate state. Old keys are fully replaced, not deprecated in place.

## References

- Research: `context/slices/web-copy-generation/research.md`
- Current PL copy source: `context/slices/client-web-offer/offer-page.md`
- Offer positioning / honest-voice source: `context/slices/client-web-offer/concept.md`
- i18n CI gate: `tests/unit/i18n-offer-completeness.test.ts`
- Page + sections: `app/[locale]/web-pages-offer/page.tsx`, `components/sections/offer/*.tsx`
- Skill anatomy pattern: `~/.claude/skills/plan/` (`SKILL.md` + `references/progress-format.md`)

## Progress

> Convention: `- [ ]` pending, `- [x]` done. Append ` — <commit sha>` when a step lands. Do not rename step titles. See `references/progress-format.md`.

### Phase 1: Shared Copy-Standard Reference Contracts

#### Automated

- [x] 1.1 All five reference files exist and are non-empty — ead0d98

#### Manual

- [ ] 1.2 Charter traits + affirmative-phrasing rule + register floor match locked decisions
- [ ] 1.3 Ban-list authored natively in Polish and includes current copy's tics
- [ ] 1.4 Framework spine and Voice-Gap-Test rubric internally consistent and actionable

### Phase 2: PL Generation Skill — Validated on One Section

#### Automated

- [x] 2.1 SKILL.md exists with valid parseable frontmatter — e8e6760

#### Manual

- [ ] 2.2 PL skill produces a hero draft as an artifact (not written to messages/*)
- [ ] 2.3 Hero draft passes the Voice-Gap-Test (all dimensions MATCHED)
- [ ] 2.4 Pilot hero reads professional, affirmative, free of catalogued tics

### Phase 3: Full PL Offer Rewrite on a StoryBrand Spine

#### Automated

- [x] 3.1 Rewrite artifact and finalized namespace contract exist, cover every target leaf

#### Manual

- [ ] 3.2 Every section passes the Voice-Gap-Test
- [ ] 3.3 No selling point re-pitched across sections (repetition defect gone)
- [ ] 3.4 Copy is affirmative, half-formal, jargon-free; honest/AI-transparency voice preserved
- [ ] 3.5 Human review sign-off on the full PL rewrite

### Phase 4: Land PL Copy + Restructure Page Components

#### Automated

- [ ] 4.1 npm run build passes
- [ ] 4.2 npm run test passes (i18n-offer-completeness + route smoke)
- [ ] 4.3 npm run lint passes

#### Manual

- [ ] 4.4 /web-pages-offer renders restructured page in pl/en/sv
- [ ] 4.5 BAB proof section reads as honest site-as-proof; no layout regressions
- [ ] 4.6 No console/hydration errors on the page

### Phase 5: EN Transcreation Skill + EN Copy; SV Parity Straight-Translation

#### Automated

- [ ] 5.1 npm run build passes
- [ ] 5.2 npm run test passes (i18n-offer-completeness green for all 3 locales)
- [ ] 5.3 npm run lint passes

#### Manual

- [ ] 5.4 EN reads as native transcreation (idioms/CTAs adapted), affirmative, charter-consistent
- [ ] 5.5 SV coherent and complete (quality deferred, not broken)
- [ ] 5.6 /web-pages-offer renders correctly in all three locales

### Phase 6: Sprint-callable copywriter Agent

#### Automated

- [ ] 6.1 copywriter.md exists with valid parseable frontmatter

#### Manual

- [ ] 6.2 Agent produces charter-compliant copy via generate→verify→fix loop, comparable to the skill
