---
sprint: web-copy-generation-landing
slices: [web-copy-generation]
created: 2026-07-19
part: 2/2
depends_on: sprint-002-web-copy-generation-capability
---

# Sprint web-copy-generation-landing: Land the PL rewrite, transcreate EN, ship the agent

## Goal

Land the approved PL StoryBrand copy into `messages/pl.json` under the new `offer.*` structure,
restructure the `/web-pages-offer` page components to match, transcreate the copy into EN (SV =
model-produced parity), and finally package the copy standard as the sprint-callable
`copywriter` agent. Depends on `sprint-002-web-copy-generation-capability` — its closing gate
(HC1) must have approved the PL copy + locked key map first.

> **User-scope outputs (not in this repo's git):** Phase 5 writes the EN skill to
> `~/.claude/skills/transcreate-copy-en/` and Phase 6 writes `~/.claude/agents/copywriter.md` —
> outside the repo, so they will NOT appear in the repo diff. In-repo changes: `messages/*.json`,
> `app/[locale]/web-pages-offer/`, `components/sections/offer/*`, and the two offer-coupled tests.

## Slices
- `web-copy-generation` — `context/slices/web-copy-generation/plan.md` (Phases 4–6 of 6 here)

## Cross-cutting decisions
- ADR 0002 — portfolio-url-pattern: route `/web-pages-offer` stays; do NOT change routing,
  `app/sitemap.ts` entries, or the nav route — the restructure is copy + section components only.
- Build-before-tests (CLAUDE.md): several vitest SSG suites read the exported `out/` tree — run
  `npm run build` before `npm run test`.
- Static export: no SSR / route handlers / server actions. The contact form still posts to
  `/api/contact` (Cloud Function rewrite) — the reused `OfferQuote`/`ContactForm` engine is unchanged.
- i18n key parity: `tests/unit/i18n-offer-completeness.test.ts` walks leaves dynamically —
  restructuring keys needs no edit to THAT test, but every `offer.*` leaf must be identical
  across pl/en/sv and non-placeholder (so SV must carry real strings).

## Human gate (HITL)
> Stateful, run FIRST. Every box must be `[x]` before the AFK block dispatches.

- [x] H1 — Confirm Sprint 002's PL copy is approved and the key map is locked
  - **Do:** Verify `sprint-002-web-copy-generation-capability` closing gate HC1 is done — the
    approved PL copy in `context/slices/web-copy-generation/offer-rewrite-pl.md` and the locked
    `offer.*` key map in `~/.claude/copy-standard/namespace-contract.md` (with the
    `offer.hero.heading` + `offer.quote.*` constraints recorded).
  - **Why (unblocks):** Every AFK session below writes/reads that approved copy and key map.
  - **Capture:** n/a (reads the artifacts Sprint 002 recorded).
  - **Done when:** The approved PL copy artifact and the locked namespace contract exist and
    you confirm they are final.

## AFK sessions

### Session 1 — Phase 4: Land PL Copy + Restructure Page Components (implement)
- **Agent:** sprint-implementer
- **Slice:** `web-copy-generation`
- **Phase:** 4
- **Depends on:** (none — first AFK session; opening gate H1 must be `[x]`)
- **Exit:** `npm run build && npm run test && npm run lint` all pass (Progress rows 4.1, 4.2, 4.3)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan at `context/slices/web-copy-generation/plan.md` (FULLY),
  > the approved PL copy at `context/slices/web-copy-generation/offer-rewrite-pl.md`, and the
  > locked key map in `~/.claude/copy-standard/namespace-contract.md` first. You are implementing
  > **Phase 4: Land PL Copy + Restructure Page Components** of slice `web-copy-generation`.
  >
  > 1. Replace the old `offer.*` tree in `messages/pl.json` with the new StoryBrand key structure
  >    carrying the approved PL copy. Mirror the SAME key skeleton into `messages/en.json` and
  >    `messages/sv.json` with interim real (non-placeholder) strings so key-parity holds — final
  >    EN/SV land in Phase 5. Land all three locales in the same change so the parity test
  >    (`tests/unit/i18n-offer-completeness.test.ts`) never sees a divergent tree.
  > 2. Restructure the page: `app/[locale]/web-pages-offer/page.tsx` + `components/sections/offer/*.tsx`.
  >    Re-point to the SB7 section order; add the BAB **proof** section (site-as-proof: this page +
  >    `/#warsztat`, no client screenshots); collapse the merged ownership/limits content; simplify
  >    `process` to a 3-step plan. Reuse existing component shells where the structure survives;
  >    add/remove components for merged/new sections. Keep visual consistency with the existing
  >    design system (eyebrow cards, grids from `components/portfolio/*`).
  > 3. Update the two offer-coupled tests (F2): `tests/web-pages-offer-3-locales.spec.ts` (H1 from
  >    `offer.hero.heading` — key preserved per the map, else update) and
  >    `tests/unit/offer-quote.test.tsx` (the `offer.quote.*` wiring — unchanged if keys preserved,
  >    else update to match). **Do NOT touch** `tests/unit/nav-offer-link.test.ts` or
  >    `tests/unit/sitemap-offer.test.ts` — route + nav label are preserved.
  >
  > Constraints that survive: static export (no SSR); do NOT change routing / `app/sitemap.ts` /
  > nav route (ADR 0002); the reused `OfferQuote`/`ContactForm` engine is unchanged. Every
  > `t("offer.*")` key the page reads must exist in the namespace. Run `npm run build` BEFORE
  > `npm run test` (SSG suites read `out/`).
  >
  > This session owns Progress rows 4.1, 4.2, 4.3. Rows 4.4–4.6 are Manual (rendering, BAB read,
  > no console errors — reviewer/human).
  >
  > Stop when: `npm run build && npm run test && npm run lint` all pass.

### Session 2 — Phase 5: EN Transcreation Skill + EN Copy; SV Parity (implement)
- **Agent:** sprint-implementer
- **Slice:** `web-copy-generation`
- **Phase:** 5
- **Depends on:** Session 1
- **Exit:** `npm run build && npm run test && npm run lint` all pass (Progress rows 5.1, 5.2, 5.3)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan (FULLY), the approved PL copy at
  > `context/slices/web-copy-generation/offer-rewrite-pl.md`, and the shared contracts in
  > `~/.claude/copy-standard/` first. You are implementing **Phase 5: EN Transcreation Skill +
  > EN Copy; SV Parity Straight-Translation** of slice `web-copy-generation`.
  >
  > 1. Author the EN transcreation skill: `~/.claude/skills/transcreate-copy-en/SKILL.md`
  >    (frontmatter `name: transcreate-copy-en`, PL+EN triggers, `allowed-tools`) +
  >    `~/.claude/skills/transcreate-copy-en/references/transcreation-rules-en.md`. It
  >    **transcreates** (not translates) — adapts idioms, CTAs, and register to the EN market
  >    while carrying the affirmative-phrasing rule + voice charter across. It **reads the shared
  >    `~/.claude/copy-standard/` contracts** (F1); its own `references/` holds only EN-specific
  >    rules (per-locale tone, CTA-per-locale, idiom pitfalls, an EN AI-tell ban-list). Emits a
  >    reviewable EN artifact.
  > 2. Land the transcreated EN copy into `messages/en.json`. Replace the interim SV with a
  >    **model-produced** straight translation into `messages/sv.json` — good enough to be
  >    non-placeholder and parity-complete (SV quality is an explicit non-goal; DeepL cross-check
  >    is optional, no key/tooling is wired). Keep all `offer.*` leaves identical across pl/en/sv.
  >
  > Constraints that survive: PL is the source of truth (do not alter `messages/pl.json` copy);
  > key-parity + non-placeholder are enforced by `tests/unit/i18n-offer-completeness.test.ts`;
  > run `npm run build` before `npm run test`.
  >
  > This session owns Progress rows 5.1, 5.2, 5.3. Rows 5.4–5.6 are Manual.
  >
  > Stop when: `npm run build && npm run test && npm run lint` all pass with EN + SV landed.

### Session 3 — Phase 6: Sprint-callable `copywriter` Agent (author)
- **Agent:** sprint-runner
- **Slice:** `web-copy-generation`
- **Phase:** 6
- **Depends on:** Session 2
- **Exit:** `~/.claude/agents/copywriter.md` exists and parses (valid frontmatter) (Progress row 6.1)
- **Prompt:**
  > Read `CLAUDE.md`, the slice plan (FULLY, esp. Phase 6), the shared contracts in
  > `~/.claude/copy-standard/`, and the existing agent conventions in `~/.claude/agents/`
  > (`SPRINT_RULES.md`, `sprint-implementer.md`) first. You are implementing **Phase 6:
  > Sprint-callable `copywriter` Agent** of slice `web-copy-generation`.
  >
  > Author `~/.claude/agents/copywriter.md` (user scope) — the autonomous front-end for sprint
  > sessions. Same contracts as the PL/EN skills, but it runs a self-contained **generate →
  > verify (Voice-Gap-Test) → fix** loop, may spawn subagents, and returns finished copy for a
  > sprint to land (it never merges or lands directly). Frontmatter (`name`, `description`,
  > `tools`); system prompt points at the same `~/.claude/copy-standard/` contracts and encodes
  > the loop + the ~800-word window discipline. Then validate it: dispatch it on the offer hero
  > (or another section) brief and confirm it produces charter-compliant copy comparable to the
  > Phase 2 skill output; record the check in `context/slices/web-copy-generation/change.md` → Notes.
  >
  > This session owns Progress row 6.1. Row 6.2 is Manual.
  >
  > Stop when: `~/.claude/agents/copywriter.md` exists with valid frontmatter and the validation
  > check is recorded.

### Session 4 — Review
- **Agent:** sprint-reviewer
- **Depends on:** all prior sessions
- **Exit:** verdict (pass/fail) + itemised concerns reported
- **Prompt:**
  > Read-only review of this sprint's diff against `context/slices/web-copy-generation/plan.md`
  > (Phases 4–6). In-repo diff: `messages/*.json`, `app/[locale]/web-pages-offer/`,
  > `components/sections/offer/*`, the two offer-coupled tests. User-scope (read directly):
  > `~/.claude/skills/transcreate-copy-en/**` and `~/.claude/agents/copywriter.md`.
  >
  > Verify the Manual Success Criteria are visibly satisfied:
  > - `/web-pages-offer` renders the restructured page in pl/en/sv; the BAB proof section reads
  >   as honest site-as-proof; no obvious layout/console regressions (rows 4.4–4.6). Note: the
  >   3-locale Playwright route spec (`tests/web-pages-offer-3-locales.spec.ts`) is e2e
  >   (`npm run test:e2e`); flag if it needs the developer to run it.
  > - EN reads as native transcreation (idioms/CTAs adapted, not literal), affirmative,
  >   charter-consistent; SV is coherent and complete (quality deferred, not broken) (rows 5.4–5.6).
  > - The `copywriter` agent produces charter-compliant copy via its own loop, comparable to the
  >   skill (row 6.2).
  > - Confirm routing / sitemap / nav were NOT changed (ADR 0002) and key-parity holds.
  > Report pass/fail with concerns. Do not edit code.

## Out of scope
- Anything Sprint 002 already delivered (contracts, PL skill, PL copy artifact).
- Deploying to Firebase Hosting / going live — a separate manual step, not in this slice.
- A quality Swedish capability; buying SaaS; client proof assets; pricing/module/form changes.
