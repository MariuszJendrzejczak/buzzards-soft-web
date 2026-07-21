# Professional Web-Copy Generation — Plan Brief

> Full plan: `context/slices/web-copy-generation/plan.md`
> Research: `context/slices/web-copy-generation/research.md`

## What & Why

The shipped `/web-pages-offer` copy reads amateurish — the same 3–4 selling points hammered
4–6× per page, spoken-Polish colloquialisms, and EN/SV that inherited the flaws via literal
translation. The fix is not a one-off edit but a **missing standard**. This slice builds a
**reusable professional copywriting capability** (two user-scope skills + a sprint-callable
agent, driven by shared `references/` contracts) and applies it as its first job: a
StoryBrand rewrite of the offer page.

## Starting Point

The offer page ships today at `app/[locale]/web-pages-offer/page.tsx` with 11 section
components and an `offer.*` i18n namespace across pl/en/sv. A dynamic key-parity test
(`i18n-offer-completeness.test.ts`) already gates every leaf for parity + non-placeholder
content — it becomes the CI gate for generated copy with no new infrastructure.

## Desired End State

Two skills (`generate-professional-copy-pl`, `transcreate-copy-en`) and a `copywriter` agent
exist in user scope, each driving one shared copy-standard. The offer page is live with
professional, restructured (StoryBrand) copy in all three locales; the i18n test and route
smoke spec are green; build/test/lint pass.

## Key Decisions Made

| Decision | Choice | Why | Source |
| --- | --- | --- | --- |
| Build vs buy | Build (skills driving a frontier LLM) | SaaS wrappers give zero PL/SV language edge | Research |
| Rewrite scope | StoryBrand restructure (not just copy-pass) | Fixes the structural repetition, not only register | Plan |
| PL register | Half-formal "tech-flow" informal *ty* | Not chummy, not stiff `Pan/Pani`; matches positioning | Plan |
| Capability shape | 2 skills (PL-gen, EN-transcreate) + `copywriter` agent | Skill for interactive use, agent for sprint content work; shared contracts | Plan |
| Skill location | User scope (`~/.claude/`) | Brand voice stays personal, portable, iterable | Plan |
| Voice charter | confident/direct/warm "never Y" + **affirmative-phrasing rule** | Locked traits; avoid-negation targets current *bez.../nie...* framing | Plan |
| Voice-DNA extraction | Deferred — charter authored top-down | No target-voice samples exist yet (current copy is the defect) | Plan |
| Build strategy | Pilot ONE section (hero) first | ~800-word generation window; validate before scaling | Research/Plan |
| Skill output | Reviewable artifact → separate landing step | Separation of concerns; review before prod | Plan |
| Proof assets | Site-as-proof only (`/#warsztat`) | No client screenshots/testimonials available today | Plan |
| Swedish | Straight translation for parity only | Quality SV deferred; must stay non-placeholder for CI | Plan |

## Scope

**In scope:** shared copy-standard contracts; PL generation skill; `copywriter` agent; EN
transcreation skill; StoryBrand rewrite of the offer page (copy + component restructure);
landing all three locales with the i18n gate green.

**Out of scope:** buying any SaaS; a quality Swedish capability; voice-DNA sample extraction;
collecting client proof assets; pricing/module/contact-form changes; new test infrastructure;
skills writing `messages/*.json` directly.

## Architecture / Approach

One set of copy-standard contracts (voice charter, framework spine, native-PL ban-list,
namespace contract, Voice-Gap-Test) lives in a **neutral shared home** `~/.claude/copy-standard/`
(not nested in any one skill's dir — F1) and is the load-bearing IP. Thin front-ends wrap it:
a user-invoked PL skill, a user-invoked EN skill, and a sprint-callable agent (autonomous
generate→verify→fix loop). Validate the loop on one section, then rewrite the offer page onto
a StoryBrand spine, review PL as an artifact, land it, restructure the components, transcreate
EN (SV = model-produced parity translation), and finally build the agent — off the page's
critical path. The existing i18n test is the machine gate; the Voice-Gap-Test is the
copy-quality gate.

## Phases at a Glance

| Phase | What it delivers | Key risk |
| --- | --- | --- |
| 1. Shared contracts | Charter + framework + PL ban-list + namespace + Voice-Gap-Test (shared home) | Charter too vague to change output |
| 2. PL skill (pilot) | PL skill validated on hero via Voice-Gap-Test | Loop doesn't lift quality past a plain prompt |
| 3. Full PL rewrite | SB7 section map + all PL copy as artifact | Restructure loses on-brand honest voice |
| 4. Land PL + restructure page | New namespace + rebuilt components, build/i18n green | Key-parity break; offer-coupled tests (hero.heading, quote.*) |
| 5. EN transcreation + SV parity | EN skill + EN copy; SV model-produced parity | EN drifts to literal translation |
| 6. copywriter agent | Sprint-callable agent (off critical path) | Autonomous loop underperforms the skill |

**Prerequisites:** research complete (done); no roadmap/foundation dependency.
**Estimated effort:** ~5–6 sessions across 6 phases (Phase 1 + 3 are the copy-heavy ones;
Phase 6 is small).

## Open Risks & Assumptions

- Charter authored top-down (no target-voice sample corpus) — quality depends on the pilot
  loop; the approved rewrite becomes the first real corpus (corrections-as-data).
- StoryBrand restructure changes `offer.*` keys and page components — larger blast radius
  than a copy-pass; the route smoke spec may need updating.
- SV straight-translation must stay non-placeholder to keep CI green despite being
  quality-deferred.
- Site-as-proof is a weaker BAB than a real client before/after — accepted for now.

## Success Criteria (Summary)

- Pilot section passes the Voice-Gap-Test (all dimensions MATCHED); the capability produces
  professional copy an autonomous sprint agent can reuse.
- `/web-pages-offer` reads professional and affirmative in pl (primary) with no repetition,
  restructured onto the StoryBrand spine.
- i18n-completeness + route smoke green; `npm run build && npm run test && npm run lint` pass
  across all three locales.
