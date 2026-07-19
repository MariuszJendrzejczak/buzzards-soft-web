---
sprint: web-copy-generation-capability
slices: [web-copy-generation]
created: 2026-07-19
part: 1/2
next: sprint-003-web-copy-generation-landing
---

# Sprint web-copy-generation-capability: Build the copy standard + produce the PL offer rewrite

## Goal

Build the reusable professional-copywriting capability (shared copy-standard contracts + the
PL generation skill) and use it to produce the full StoryBrand rewrite of the `/web-pages-offer`
copy in Polish — as a **reviewable artifact**, not yet landed. This sprint ends at a human
approval gate on the PL copy; landing + EN + the agent are Sprint 003
(`sprint-003-web-copy-generation-landing`, `depends_on` this one).

> **User-scope outputs (not in this repo's git):** Phases 1 & 2 write to `~/.claude/copy-standard/`
> and `~/.claude/skills/generate-professional-copy-pl/` — outside the repo, so they will NOT
> appear in the repo diff. Only the slice artifacts under `context/slices/web-copy-generation/`
> and the plan `## Progress` flips are repo-committable. The reviewer must read the user-scope
> files directly to review Phases 1–2.

## Slices
- `web-copy-generation` — `context/slices/web-copy-generation/plan.md` (Phases 1–3 of 6 here)

## Cross-cutting decisions
- ADR 0002 — portfolio-url-pattern: route `/web-pages-offer` already exists and is **not
  changed** by this slice (copy/structure only). No new route work.
- Plan decision (F1): the 5 copy-standard contracts live in the neutral shared home
  `~/.claude/copy-standard/`, read by the PL skill (and later the EN skill + agent) — NOT
  nested in any one skill's `references/`.
- House rule: PL is the copy source of truth; skills emit reviewable artifacts, never write
  `messages/*.json` directly.

## Human gate (HITL)
> Stateful, run FIRST. Every box must be `[x]` before the AFK block dispatches.

- none — the voice charter (traits: confident-not-cocky · direct-not-blunt · warm-not-chummy
  + affirmative-phrasing rule + half-formal register floor), framework (StoryBrand), PL
  formality (informal *ty*), pilot-one-section strategy, and proof approach (site-as-proof)
  were all locked during `/plan`. The agents author from those settled decisions; quality is
  caught at the closing gate.

## AFK sessions

### Session 1 — Phase 1: Shared Copy-Standard Reference Contracts (author)
- **Agent:** sprint-runner
- **Slice:** `web-copy-generation`
- **Phase:** 1
- **Depends on:** (none)
- **Exit:** all five files exist and are non-empty under `~/.claude/copy-standard/` (Progress row 1.1)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-copy-generation/plan.md` (FULLY),
  > its `plan-brief.md`, and the slice `research.md` first. You are implementing **Phase 1:
  > Shared Copy-Standard Reference Contracts** of slice `web-copy-generation`.
  >
  > Author the five load-bearing copy-standard contracts in the **neutral shared home**
  > `~/.claude/copy-standard/` (F1 — NOT nested inside any skill's `references/`):
  >
  > 1. `voice-charter.md` — the "X, but never Y" chart with the three locked traits
  >    (**confident, never cocky · direct, never blunt · warm, never chummy**), the
  >    **affirmative-phrasing rule** (prefer positive assertions; avoid negation-framed
  >    sentences — e.g. rewrite *bez abonamentu / nie generator / czego nie robię* into
  >    affirmative equivalents — accepting negation is sometimes unavoidable), and a
  >    **register floor** (half-formal "tech-flow" informal *ty*, ~grade-7 reading level,
  >    active voice, plain-word swaps, no dev jargon on client-facing copy).
  > 2. `framework-spine.md` — StoryBrand SB7 page spine (customer=hero, brand=guide, 3-step
  >    plan, one CTA) + PAS hero hook + BAB proof + FAB "what's included" + the Rule of One +
  >    the 4 U's (headline test) and 4 C's (final QA) checklist.
  > 3. `ban-list-pl.md` — a **natively Polish-authored** (NOT translated) AI-tell ban-list,
  >    seeded from `research.md` §C (lexical: *kluczowy, kompleksowe rozwiązanie, synergia,
  >    holistyczna perspektywa, innowacyjne podejście*; openers: *W dzisiejszych czasach / W
  >    erze cyfrowej / Warto zauważyć*; fillers: *Co więcej / Kluczowym aspektem jest*; weak
  >    closers: *Podsumowując, warto*; the em-dash-vs-Polish-hyphen convention; the *"To nie X,
  >    to Y"* pattern) PLUS the current offer copy's own tics (*pogadasz, kilka stówek, jakieś,
  >    łapać kontakt, zaistnieć w sieci*, scare-quote hedging).
  > 4. `namespace-contract.md` — the target `offer.*` StoryBrand key structure (Phase 3 finalizes
  >    exact leaves; scaffold it now from the plan's proposed section map) + the parity rule
  >    (identical leaves in pl/en/sv) and the non-placeholder rule CI enforces.
  > 5. `voice-gap-test.md` — the validator rubric: per-dimension scoring MATCHED / PARTIAL /
  >    MISSED with cited evidence + a one-paragraph drift diagnosis + a regenerate-the-misses
  >    loop; documents corrections-as-data.
  >
  > Constraints that survive (a cold agent cannot infer these): the charter is authored
  > **top-down** from the locked `/plan` decisions — do NOT attempt voice-DNA extraction from
  > samples (no target-voice corpus exists yet). Generate copy in ≤800-word windows restating
  > the ban-list + top voice rules at the tail (primacy+recency) — encode this discipline in
  > the contracts. Preserve the honest, transparency-about-AI Buzzards stance from
  > `context/slices/client-web-offer/concept.md`.
  >
  > This session owns Progress row 1.1 (flip it when the five files exist). Rows 1.2–1.4 are
  > Manual — leave them for the human/reviewer.
  >
  > Stop when: all five `~/.claude/copy-standard/*.md` files exist and are non-empty.

### Session 2 — Phase 2: PL Generation Skill — Validated on One Section (author + pilot)
- **Agent:** sprint-runner
- **Slice:** `web-copy-generation`
- **Phase:** 2
- **Depends on:** Session 1
- **Exit:** `~/.claude/skills/generate-professional-copy-pl/SKILL.md` exists and parses (valid
  YAML frontmatter) (Progress row 2.1)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-copy-generation/plan.md` (FULLY),
  > and the five contracts in `~/.claude/copy-standard/` first. You are implementing **Phase 2:
  > PL Generation Skill — Validated on One Section** of slice `web-copy-generation`.
  >
  > 1. Author `~/.claude/skills/generate-professional-copy-pl/SKILL.md` — the user-invoked PL
  >    front-end. YAML frontmatter (`name: generate-professional-copy-pl`, `description` with
  >    PL+EN trigger phrases, `allowed-tools`), numbered process steps, house rules
  >    (PL-source-of-truth; generator-not-inventor → anything missing goes to `## Open
  >    Questions`; ≤800-word generation windows restating rules at the tail). It **reads the
  >    shared contracts from `~/.claude/copy-standard/`** and writes a reviewable artifact under
  >    `context/slices/<change-id>/`; it must **never** write `messages/*.json` directly.
  > 2. Pilot the skill on ONE section — the offer **hero** (PAS hook). Generate the hero in PL,
  >    run the Voice-Gap-Test from `~/.claude/copy-standard/voice-gap-test.md`, iterate until
  >    every dimension is MATCHED. Write the result + its Voice-Gap-Test report to
  >    `context/slices/web-copy-generation/pilot-hero.md`.
  >
  > Grounding for the hero copy: the current (amateur) hero is in
  > `context/slices/client-web-offer/offer-page.md` §1 — study it as the "before". The new hero
  > must be professional, affirmative (no negation framing), half-formal tech-flow, free of the
  > catalogued tics.
  >
  > This session owns Progress row 2.1 (SKILL.md parses). Rows 2.2–2.4 are Manual.
  >
  > Stop when: `SKILL.md` exists with valid frontmatter and `pilot-hero.md` carries the hero
  > draft + its Voice-Gap-Test report.

### Session 3 — Phase 3: Full PL Offer Rewrite on a StoryBrand Spine (generate)
- **Agent:** sprint-runner
- **Slice:** `web-copy-generation`
- **Phase:** 3
- **Depends on:** Session 2
- **Exit:** `context/slices/web-copy-generation/offer-rewrite-pl.md` and the finalized
  `~/.claude/copy-standard/namespace-contract.md` exist and cover every target `offer.*` leaf
  (Progress row 3.1)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-copy-generation/plan.md` (FULLY),
  > the five `~/.claude/copy-standard/` contracts, the PL skill `SKILL.md`, and
  > `context/slices/client-web-offer/offer-page.md` (the current 11-section copy) first. You are
  > implementing **Phase 3: Full PL Offer Rewrite on a StoryBrand Spine** of slice
  > `web-copy-generation`.
  >
  > 1. Lock the target StoryBrand section map, mapping the 11 current sections onto the SB7
  >    spine and MERGING the repetitive ownership / anti-generator / human-touch content that
  >    currently spans 3–4 sections. Proposed map (plan Phase 3): `hero` (PAS) · `problem` (from
  >    `threePaths`) · `guide` (empathy+authority, merging `whyAi`) · `plan` (3-step, from
  >    `process`) · `proof` (BAB, **site-as-proof** — this site + `/#warsztat`, no client
  >    screenshots) · `includes` (FAB, from `standard`) · `pricing` · `modules` ·
  >    `stakes/ownership` (merging `ownership`+`limits`) · `faq` · `quote` (CTA);
  >    `meta`/`breadcrumbBack`/`documentBadge` retained.
  > 2. **Test-coupling constraints (F2) — the map MUST either preserve these keys or the
  >    landing sprint updates the pinning test deliberately; record the decision in
  >    `namespace-contract.md`:** keep the key `offer.hero.heading` (pinned by the route smoke
  >    spec) and the `offer.quote.*` intro/placeholder/context wiring (pinned by
  >    `tests/unit/offer-quote.test.tsx`).
  > 3. Generate every section in PL in ≤800-word windows (restating rules at the tail),
  >    Voice-Gap-Test each, eliminate cross-section repetition (each selling point stated once),
  >    and consolidate into `context/slices/web-copy-generation/offer-rewrite-pl.md` keyed to the
  >    locked map. Finalize the exact leaf keys in `~/.claude/copy-standard/namespace-contract.md`.
  >
  > Constraints that survive: preserve the honest / transparency-about-AI voice from
  > `context/slices/client-web-offer/concept.md`; affirmative phrasing throughout; do NOT write
  > `messages/*.json` (that is Sprint 003). Anything you cannot resolve → an `## Open Questions`
  > block in the artifact, do not invent facts (prices/modules come from `offer-page.md`).
  >
  > This session owns Progress row 3.1. Rows 3.2–3.5 are Manual (human review at the closing gate).
  >
  > Stop when: `offer-rewrite-pl.md` covers every leaf of the locked map and
  > `namespace-contract.md` is finalized with the test-coupling constraints recorded.

### Session 4 — Review
- **Agent:** sprint-reviewer
- **Depends on:** all prior sessions
- **Exit:** verdict (pass/fail) + itemised concerns reported
- **Prompt:**
  > Read-only review of this sprint's output against
  > `context/slices/web-copy-generation/plan.md` (Phases 1–3). Note: Phases 1–2 wrote
  > **user-scope** files outside the repo — read them directly:
  > `~/.claude/copy-standard/*.md` (5 files) and
  > `~/.claude/skills/generate-professional-copy-pl/SKILL.md`. In-repo artifacts:
  > `context/slices/web-copy-generation/pilot-hero.md` and `offer-rewrite-pl.md`.
  >
  > Verify the Manual Success Criteria are visibly satisfied:
  > - Charter's three traits + affirmative-phrasing rule + register floor match the locked
  >   decisions; ban-list is authored natively in Polish (not translated) and includes the
  >   current copy's tics (rows 1.2–1.4).
  > - The pilot hero reads professional, affirmative, free of catalogued tics; its
  >   Voice-Gap-Test shows all dimensions MATCHED (rows 2.2–2.4).
  > - The full PL rewrite: every section Voice-Gap-Tested; NO selling point re-pitched across
  >   sections (the repetition defect is gone); affirmative, half-formal, jargon-free; honest /
  >   AI-transparency voice preserved (rows 3.2–3.4).
  > - The namespace map records the F2 test-coupling constraints (`offer.hero.heading`,
  >   `offer.quote.*`).
  > Report pass/fail with concerns. Do not edit code.

## Human gate (HITL) — closing
> Stateful, run AFTER the AFK block above completes. `/sprint-run` halts at the AFK→closing-gate
> boundary and hands back to you.

- [x] HC1 — Approve the PL copy (and the copy standard) before landing
  - **Do:** Read `context/slices/web-copy-generation/offer-rewrite-pl.md` (+ `pilot-hero.md`
    and `~/.claude/copy-standard/voice-charter.md`). Confirm the PL copy reads professional,
    affirmative (no negation framing), half-formal tech-flow, with no cross-section repetition,
    and that the honest / AI-transparency voice is preserved. Confirm the locked StoryBrand
    section map + `offer.*` key structure — including the preserved `offer.hero.heading` and
    `offer.quote.*` wiring keys (F2).
  - **Why (unblocks):** Sprint 003 (landing) writes this copy into `messages/pl.json` and
    rebuilds the page components against the locked key map — it must not proceed on copy or a
    key map you haven't approved.
  - **Capture:** Your approval + the locked `offer.*` key map recorded in
    `~/.claude/copy-standard/namespace-contract.md` (and a one-line "PL copy approved
    <date>" note in `context/slices/web-copy-generation/change.md` → Notes).
  - **Done when:** You approve the PL copy and the locked key map for landing. (If it needs
    another pass, loop back into Phase 3 before closing.)

## Out of scope
- Landing copy into `messages/*.json`, restructuring page components, EN transcreation, SV,
  and the `copywriter` agent — all Sprint 003.
- Buying any SaaS; voice-DNA sample extraction; client proof assets; pricing/module/form changes.
