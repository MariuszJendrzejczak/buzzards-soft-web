---
date: 2026-07-25 (Europe/Warsaw)
researcher: Mariusz (Buzzards Soft)
git_commit: 30e109125f6cc4270b6f49652d9508ed07165ad9
branch: feature/mobile-apps-offer
repository: buzzards_soft_web
topic: "Section 03 skills rebuild — portfolio/workflow self-audit + external skill-positioning for cards 3.1–3.5"
tags: [research, codebase, whatICanDeliver, skills, positioning, agentic-dev]
status: complete
last_updated: 2026-07-25
last_updated_by: Mariusz (Buzzards Soft)
---

# Research: Section 03 skills rebuild

**Date**: 2026-07-25 (Europe/Warsaw)
**Researcher**: Mariusz (Buzzards Soft)
**Git Commit**: 30e109125f6cc4270b6f49652d9508ed07165ad9
**Branch**: feature/mobile-apps-offer
**Repository**: buzzards_soft_web

## Research Question

Rebuild home **section 03** (`WhatICanDeliver`, namespace `whatICanDeliver`). Drop the
word „dowieźć"; use a neutral heading in the spirit of „Moje umiejętności i zalety". Add
more concrete substance to the skill cards. Specifically: keep **3.1** (production
programming), turn **3.2** into „Programowanie Agentowe" with maximum concrete meat,
expand **3.3** toward people-management + teamwork drawing on the construction background,
remove **3.4**, and reframe or remove **3.5** (technical background).

Two planes were researched: **(1) internal** — the owner's portfolio, current workflow,
and experience as the repo already documents them; **(2) external** — how developers with
this profile (production dev + agentic/AI-assisted dev + skilled-trades background) credibly
position their skills in 2025–2026.

## Summary

- **Section 03 today** = `components/sections/work/what-i-can-deliver.tsx` +
  `messages/pl.json:206-285`. An accordion of five cards (`variant: "core"` = documented,
  `"growing"` = actively-developing). Heading `title` = **"Co umiem dowieźć"** (`pl.json:208`)
  — the word to drop. Eyebrow = "Sekcja 03 · Co umiem" (`pl.json:207`).
- **The richest raw material for card 3.2 already exists in the repo** — the portfolio
  "AI Native Development" tile block (`warsztat` namespace, `messages/pl.json:602-643`) lists
  six concrete agentic-workflow tiles (Claude Code config, specialized subagents, custom
  slash-commands/skills, MCP integrations, persistent memory, git control). This is a
  **duplication hazard**, not a copy source: whatever goes into 3.2 must be *deconflicted*
  against that portfolio block so the page doesn't say the same six things twice. See
  [Architecture Insights](#architecture-insights).
- **Card 3.2 has a strong honesty guardrail already** (`pl.json:257` callout: "świadomie
  nie wpisuję tu „enterprise AI agents at scale"…"). External research **strongly confirms**
  this instinct: the credible-in-2026 move is judgment + verification + named artifacts, and
  the single most-repeated failure is overclaiming ("enterprise AI agents at scale", bare
  tool dumps). Keep the callout; make 3.2 heavier on *judgment/verification* vocabulary, not
  just tool names.
- **Card 3.3 people-management is currently UNSOURCED.** The repo says the 14-year
  construction background is "neutral" except for hardware/IoT projects (`pl.json:316`) and
  makes **no claim** of leading crews / managing people. Adding people-management is a *new,
  owner-supplied claim* — legitimate (he lived it) but it needs concrete specifics (crew size,
  role, what he coordinated) or it becomes exactly the "team player / works under pressure"
  cliché the external research says to avoid. **Owner input required** (see Open Questions).
- **Card 3.5 duplicates the About section.** "14 lat… CCTV… alarmach… smart home" appears
  both in 3.5 (`pl.json:280-283`) and in About/para4 (`pl.json:316`). 3.5 uniquely adds the
  SEP E+D licenses + "niskoprądowe". Recommendation below.
- **Card 3.4 removal is clean** — its three bullets (n8n/Make automation, agentic workflows
  beyond dev, RAG/vector DB) also live in the parked `currentlyLearning` section
  (`pl.json:287-306`) and in the honest-limits callout of 3.2. Nothing unique is lost.

## Detailed Findings

### Section 03 as it stands (the thing being rebuilt)

Component: `components/sections/work/what-i-can-deliver.tsx`. Data-driven — `SECTION_SPECS`
(`:35-127`) declares five cards; copy is pulled from the `whatICanDeliver` i18n namespace.

- Heading + intro: `messages/pl.json:207-209`
  - eyebrow "Sekcja 03 · Co umiem", **title "Co umiem dowieźć"** (drop „dowieźć"),
    intro "Najpierw to, w czym mam udokumentowane doświadczenie…".
- **3.1 Programowanie produkcyjne** (`core`, `pl.json:213-245`) — three sub-blocks:
  *mobile* (Flutter/Dart, 5 bullets + 11 chips), *unity* (Unity/C#, 5 bullets + 8 chips),
  *common* (3 bullets). Component sub-block plumbing at `what-i-can-deliver.tsx:41-77`.
- **3.2 "AI tooling w workflow developera"** (`growing`, `pl.json:247-258`) — 6 bullets,
  8 chips (Claude Code, MCP, OpenAI/Anthropic API, prompt caching, function calling, tool
  use, structured output), + honesty callout (`pl.json:257`). Spec: `what-i-can-deliver.tsx:79-96`.
- **3.3 "Soft skills"** (`core`, `pl.json:259-267`) — 5 bullets: ownership, communication
  with client/team/PM, work under time pressure + parallel projects, hard-problem diagnosis,
  technical English B2/C1. **No leadership / people-management claim.**
- **3.4 "Obszary, w których się aktywnie rozwijam"** (`growing`, `pl.json:269-276`) — 3
  bullets: LLM business-process automation (n8n/Make), agentic workflows beyond dev,
  RAG/vector DB/embeddings. + 6 chips. **→ remove.**
- **3.5 "Background techniczny"** (`core`, `pl.json:277-284`) — 3 bullets: 14 yrs low-voltage
  /CCTV/alarms/smart-home, SEP E+D + driving licence, useful for software+sensors/controllers
  projects. + 4 chips.

### (1a) Internal — how the owner actually works now (feeds 3.2)

The repo documents the workflow in unusual detail (portfolio `warsztat` namespace + About):

- **Daily driver:** Claude Code with own config — "Claude Code z własną konfiguracją, hookami
  i skillami siedzi w moich projektach na co dzień" (`pl.json:105`, hero.sub). Config specifics:
  own `settings.json` with per-project permissions, custom keybindings, hookify rules, status
  line/powerline (`pl.json:614-616`); a real PostToolUse ESLint auto-fix hook on TS/TSX edits
  (`.claude/settings.json:3-14`).
- **Specialized subagents:** code-reviewer, sprint-implementer, sprint-tester, sprint-reviewer,
  codex-rescue — "Każdy subagent ma osobne narzędzia, osobny prompt i osobny scope"
  (`pl.json:619-621`).
- **Custom slash commands / skills:** repeatable SDLC processes as commands, "od planowania
  sprintu po review PR-ów", e.g. `/sprint-run`, `/sprint-plan` (`pl.json:624-626`).
- **MCP in the workflow:** context7 (live library docs), Playwright (browser UI verification),
  Maestro (mobile e2e) — "Agent ma realne narzędzia w moim stacku, nie tylko wiedzę"
  (`pl.json:629-631`).
- **Persistent memory + bilingual rule:** typed memory (user/feedback/project/reference),
  PL-conversation / EN-markdown meta-convention enforced by the workflow (`pl.json:634-636`).
- **Git control:** agent works on worktree/feature branch, never directly on main, PR only on
  request — "agent nie merguje sam" (`pl.json:638-641`, `pl.json:598`, `pl.json:604`).
- **Method spine:** spec-driven ("Nic nie powstaje przed spisaną i zaakceptowaną specyfikacją.
  Plan jest kontraktem", `pl.json:576`) + context-driven (persistent versioned project context,
  `pl.json:580`) + typed sprint sessions each with one declared deliverable, reviewer read-only
  (`pl.json:603-604`).
- **Bullet-6 of current 3.2 is already the money line** — "ewaluacja jakości outputu (gdzie
  warto zaufać agentowi, gdzie wymagać weryfikacji)" (`pl.json:255`). External research (below)
  says *this* judgment framing is the top credibility signal; 3.2 should lead with it, not bury it.

### (1b) Internal — portfolio (proof that backs the skills)

From the portfolio namespaces (agent-verified):

- **HONETi** — commercial Flutter apps, full cycle "od pierwszej linijki kodu… po publikację
  w sklepach i utrzymanie" (`pl.json:311`, `pl.json:449`). Proves 3.1 mobile.
- **Educational Flutter series** — 4 new + 3 maintained apps; shared learning-engine, IAP,
  analytics, Firebase Realtime DB (`pl.json:481-489`). Proves 3.1 mobile at scale.
- **Neatu Storage** (mobile) + **Neatu Dashboard** (web, neatu.app) — AI-assisted product,
  home-inventory + companion web panel (`pl.json:497-502`). Proves 3.2 delivering real products.
- **Polylocale** — open-source localization tool, format-faithful, AI translation via the
  user's own API keys (`pl.json:506`). Proves 3.2 LLM-API integration + tooling.
- **buzzards-soft.com itself** — built with active AI-agent assistance, process publicly
  documented (`pl.json:510`; "site-as-proof" in `offer-facts.md:23-24`). Proves 3.2 end-to-end.
- **Unity/C#** — production games/interactive apps confirmed as a capability (`pl.json:311`),
  no named public projects. Proves 3.1 unity.

### (1c) Internal — background & soft skills (feeds 3.3 and the 3.5 decision)

- **Certification (fresh, strong):** 10xDevs cohort course completed 2026-07-20 (BRAVE/10xDEVS),
  badges 10xBuilder / 10xArchitect / 10xChampion + Best Project; five competency areas span
  agentic env, workflow, AI-dev quality/maintenance, generative-AI innovation, large/legacy
  codebases (`pl.json:28-88`). This is **agentic-programming proof** — it belongs to 3.2's
  credibility even though it renders in its own section 02.
- **Construction background — what the repo actually states:** "przez 14 lat pracowałem jako
  elektryk i instalator systemów CCTV, alarmowych, p.poż. i smart home" and "Dla większości
  projektów… ten background jest neutralny. W projektach łączących software z fizycznym
  światem — IoT, smart buildings, automatyka — daje mi perspektywę, której nie ma czysty
  programista" (`pl.json:316`).
- **People-management — NOT in the repo.** No mention anywhere of leading crews, coordinating
  installers, on-site project coordination, or managing subcontractors. The only "team"-adjacent
  line is "komunikacja z klientem, zespołem, project managerem" (3.3, `pl.json:263`). So the
  owner's stated intent ("mam umiejętności… zarządzanie ludźmi, praca w zespole") is a **new
  claim** to be added, not an existing one to be surfaced.
- **Current 3.3 bullets** (`pl.json:261-266`): ownership brief→maintenance; communication with
  client/team/PM; work under time pressure + parallel projects; hard-problem diagnosis;
  technical English B2/C1.

### (2) External — how this profile positions skills in 2025–2026

Full source list in [External Sources](#external-sources-live-docs). The load-bearing themes:

**For 3.2 (agentic programming) — credibility = judgment + verification + named artifacts, not tool dumps.**
- Lead with judgment: "know when to trust vs. verify AI output" is described as the single
  most-repeated interview credibility test; "the senior job is not to type less; it is to make
  generated code trustworthy."
- Concrete, defensible vocabulary that matches what the owner *actually does*:
  - **Context engineering** (Anthropic's own term) — curating the token budget; just-in-time
    context loading; compaction / structured note-taking. Stronger than "prompt engineering".
  - **Multi-agent orchestration** — lead agent + specialist sub-agents with isolated context;
    the owner's typed subagents (implementer/tester/reviewer) map to this 1:1.
  - **MCP tool architecture** — a top-cited 2026 keyword; owner integrates context7/Playwright/Maestro.
  - **Spec-driven / plan-driven development** — mainstream in 2026 precisely to prevent
    "confident, plausible code that solves the wrong problem"; owner's spec-as-contract is this.
  - **Verification & guardrails** — review AI output for intent/behaviour/security/maintainability;
    "agents don't merge on their own"; tests/linters/CI as the agent's feedback loop; stop-rules
    for drift; small reviewable diffs. Owner's "agent nie merguje sam" + read-only reviewer is
    textbook.
  - **Structured output + tool/function-calling schema design; prompt caching / token budgeting**
    — owner already lists these.
- **AVOID (external consensus):** "enterprise AI agents at scale" (already excluded — keep it
  that way), bare tool name-dumps ("I use Claude Code"), standalone framework names with no
  outcome (LangGraph/AutoGen/n8n/CrewAI), "agentic" as a label with no substance, vague impact
  claims with no numbers.

**For 3.1 (production dev) — name specifics, they read as senior.** Riverpod + Clean
Architecture + DI; unit/widget/integration testing; CI/CD (Codemagic/Bitrise/Fastlane/GitHub
Actions); Flutter DevTools + the 16 ms frame budget / jank profiling; **published store apps
with real adoption** as an explicit differentiator; (Unity) object pooling / Profiler /
Addressables / authoritative-server multiplayer. The owner already has most of this in 3.1 —
the credible add is *store-published apps as proof* and testing/CI specifics if true.

**For 3.3 + 3.5 (soft skills + trades bridge) — translate concrete work into tool+action+outcome; never trait labels.**
- The **strongest, non-fluffy asset** is the **electrical / low-voltage → IoT / smart-building
  domain bridge**: an industry white paper (NECA) and live job postings treat an electrical /
  building-automation background as a genuine plus for IoT/automation software roles. This is a
  *domain* asset, not a soft skill — it argues for **keeping 3.5's substance** but reframing it
  from "I was an electrician" to "what this background contributes to hardware/IoT/automation work".
- Crew coordination / deadlines / H&S only read as credible when expressed as
  tool + action + measurable outcome (crew size, fixed handover dates, cross-trade coordination
  that avoided rework). As bare traits ("team player", "works under pressure") they are the exact
  clichés a technical audience discounts. **This is why 3.3 people-management needs concrete
  specifics from the owner** before it can be written well.

## Recommendations for the rebuild (for /plan to confirm)

1. **Heading** — replace "Co umiem dowieźć". Neutral options that keep the affirmative,
   asserts-not-justifies voice ([[pitch-asserts-portfolio-proves]]): "Moje umiejętności i zalety",
   "Umiejętności i mocne strony", "Co wnoszę do projektu". Owner leans "Moje umiejętności i zalety".
   Revisit the eyebrow "Sekcja 03 · Co umiem" and the intro line for the same word-family.
2. **3.1** — keep structure; consider adding *store-published apps with real usage* and, if true,
   testing/CI specifics (widget/integration tests, CI pipeline) as senior signals.
3. **3.2 „Programowanie Agentowe"** — the flagship. Reorganize around **judgment → orchestration
   → method → integration**, not a flat tool list. Pull concrete substance the owner genuinely
   does (context engineering, typed subagents/orchestration, spec-driven, MCP, verification/guardrails,
   LLM-API integration, prompt caching). **Keep the honesty callout.** **Deconflict against the
   portfolio "AI Native Development" block** (`pl.json:602-643`) — 3.2 should be the *skill claim*
   (what I can do), the portfolio block the *proof* (here it is running); don't repeat the same six
   tiles verbatim. Consider promoting 3.2 from `growing` to `core` variant given the 10xDevs cert +
   daily use — **owner call** (see Open Questions).
4. **3.3** — expand toward teamwork + people-management, but **only with concrete, owner-supplied
   specifics** (crew size, on-site coordination role, what was coordinated). Otherwise keep it to
   what's defensible and avoid trait-cliché.
5. **3.4** — remove; nothing unique is lost (mirrors parked `currentlyLearning` + 3.2 callout).
6. **3.5** — **recommended: keep but reframe** as the IoT/hardware domain bridge (external
   research's strongest asset), and **cut the overlap** with About/para4 so the reader doesn't
   read "14 lat… CCTV… smart home" twice. If instead it's removed, the SEP E+D licenses + the
   IoT-bridge argument should migrate into About or 3.3 rather than vanish. Final call deferred
   to owner + /plan.

## Code References

- `components/sections/work/what-i-can-deliver.tsx:35-127` — `SECTION_SPECS` (the five cards).
- `messages/pl.json:206-285` — `whatICanDeliver` namespace (all section-03 copy).
- `messages/pl.json:208` — heading "Co umiem dowieźć" (drop „dowieźć").
- `messages/pl.json:247-258` — card 3.2 current copy + honesty callout (`:257`).
- `messages/pl.json:259-267` — card 3.3 soft-skills bullets.
- `messages/pl.json:277-284` — card 3.5 background bullets.
- `messages/pl.json:602-643` — portfolio `warsztat` "AI Native Development" tiles (dedup target).
- `messages/pl.json:311-317` — About paras (para4 = construction overlap with 3.5; para5 = the
  other „dowieźć" usage, `:317`).
- `messages/pl.json:28-88` — `certification` namespace (10xDevs proof for 3.2 credibility).
- `.claude/settings.json:3-14` — the real ESLint PostToolUse hook (concrete config evidence).

## External Sources (live docs)

External research is **market/positioning**, not a library-API question — so it's WebSearch
+ vendor/practitioner sources, weighted as market signal (the two strongest practitioner anchors
are the Anthropic engineering post and the senior LLM-coding playbook; resume blogs corroborate
vocabulary but are marketing-tinted, and WebSearch was US-region).

- Anthropic — *Effective context engineering for AI agents*:
  https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Senior LLM-coding playbook (verification, drift, accountability):
  https://baeseokjae.github.io/posts/llm-coding-workflow-best-practices-2026/
- Claude Code resume skills / judgment framing: https://techncv.com/blog/claude-code-resume-skills
- Agentic resume — metrics + buzzwords to avoid:
  https://underdog.io/blog/agentic-ai-development-on-your-resume
- 2026 SWE resume keywords (MCP, skill files):
  https://blog.quickapply.dev/post/2026-software-engineer-resume-keywords-the-ultimate-ai-ready-optimization-guide
- Spec-driven development 2026:
  https://dev.to/krlz/spec-driven-development-in-2026-what-it-is-the-tooling-and-how-teams-actually-use-it-2fk2
- AI code-quality guardrails ("agents don't merge"): https://tfir.io/ai-code-quality-2026-guardrails/
- Review burden / AI code hides bad logic:
  https://www.faros.ai/blog/ai-code-quality-senior-engineer-review-burden
- Flutter developer skills/JD (Riverpod, Clean Arch, testing, CI/CD, publishing):
  https://www.index.dev/job-description/flutter-developer
- Flutter performance / DevTools / 16 ms frame budget:
  https://docs.flutter.dev/perf/rendering-performance ·
  https://www.freecodecamp.org/news/how-to-fix-app-jank-profiling-flutter-apps-with-devtools/
- Senior Unity skills (Profiler, pooling, Addressables, authoritative server):
  https://startup.jobs/interview-questions/senior-unity-developer
- Career-change (trades→tech) resume positioning:
  https://www.capstoneresumes.com/how-to-position-a-career-change-to-tech-on-a-resume-skills-and-proof/
- Resume clichés to avoid: https://www.altis.com/learn/stop-using-these-10-overused-resume-phrases-and-what-to-write-instead
- Electrician → smart-building / IoT domain bridge (NECA white paper):
  https://www.necanet.org/docs/default-source/systems-integration/white-papers/smart-buildings-and-internet-of-things-(iot)-impact-on-electrical-contracting-(1).pdf
- IoT/automation software dev role listing electrical background as "a plus":
  https://www.jobleads.com/us/job/iot-and-automation-software-developer-at-ksb-company-grovetown-ga--grovetown--ecabf011ccc5d80bd4b4f8036b5d9a6af

## Architecture Insights

- **Data-driven section.** Adding/removing cards or bullets is an edit to `SECTION_SPECS`
  (`what-i-can-deliver.tsx:35-127`) **and** the parallel i18n keys in all three
  `messages/{pl,en,sv}.json` (the i18n-completeness test enforces key parity — CLAUDE.md).
  Removing 3.4 means deleting its spec entry *and* its `34` keys in every locale file.
- **`variant` carries meaning.** `core` = documented experience (solid border, brand accent),
  `growing` = actively-developing (dashed border, muted). Promoting 3.2 to `core` is a *claim*
  change, not just styling — it says "this is documented, not aspirational". Justifiable now
  (10xDevs cert + daily use); still an owner call.
- **PL is the source of truth**; EN + SV are transcreations done *after* PL is approved
  (transcreate-copy-en). Don't hand-edit EN/SV during the copy pass.
- **Dedup discipline is the main architectural risk.** Section 03 (skills), the portfolio
  "AI Native Development" block (`warsztat`), and the parked `currentlyLearning` section overlap
  heavily on agentic-workflow content. The rebuild should make 3.2 the *assertion* and the
  portfolio block the *proof*, keeping them distinct.

## Historical Context (from prior changes)

- `context/slices/certification-10xdevs/change.md:23` — earlier decision explicitly kept the
  skills section (`WhatICanDeliver`) while replacing the slot-02 `HowIWork`. This rebuild is the
  first substantive rework of that skills section since.
- `context/foundation/offer-facts.md:23-24` — "site-as-proof" positioning: this very page was
  built through the process being sold; reinforces that 3.2 claims should be backed by the
  visible portfolio proof, not inflated.
- Memory priors applied: [[pitch-asserts-portfolio-proves]] (3.2 asserts capability, portfolio
  proves it), [[no-negation-marketing]] + [[no-infantile-tone]] + [[no-laconic-copy]]
  (substance floor per bullet), [[prefer-dla-over-na]] (PL copy).

## Related Research

- `context/slices/main-hero-ai-elevation/` — hero AI-elevation narrative (mobile → AI-native
  fullstack); adjacent positioning work, same voice.
- `context/slices/certification-10xdevs/plan.md` — the 10xDevs section that supplies 3.2's proof.

## Decisions (2026-07-25, owner-confirmed)

Resolutions to the Open Questions below, locked with the owner in conversation:

1. **3.3 people-management → stay defensive.** No invented crew-size / leadership metrics
   ("bo to nie IoT" — and no sourced record exists). Teamwork/coordination only as far as
   defensible: ownership, communication with client/team/PM, parallel projects, hard-problem
   diagnosis, technical English. Plus **one absorbed bullet from 3.5** (see #3).
2. **3.2 variant → promote `growing` → `core`.** Confirmed (10xDevs cert + daily use make it
   documented, not aspirational). Rename to „Programowanie Agentowe", maximum concrete substance,
   reorganized judgment → orchestration → method → integration, honesty callout kept, deconflicted
   against the portfolio "AI Native Development" block.
3. **3.5 → fold into 3.3 as a single bullet; remove the standalone card.** Since the work isn't
   IoT, the hardware/IoT-bridge asset is too weak to earn its own card, and the biography already
   lives in About (para4) with SEP E+D in Education (`pl.json:344`). Keep one honest cross-domain
   line in 3.3 (14 yrs outside IT → a perspective a pure programmer lacks) so the thread isn't lost.
   No standalone `35` card; delete its spec entry + `35` keys in all three locale files.
4. **Heading → „Moje umiejętności i zalety".** Drop „dowieźć"; align eyebrow ("Sekcja 03 · Co umiem")
   + intro to the new word-family; also retire the second „dowieźć" in About/para5 (`pl.json:317`).

**Net section-03 shape after rebuild:** 3.1 Programowanie produkcyjne (core) · 3.2 Programowanie
Agentowe (core, flagship) · 3.3 Soft skills (core, + one cross-domain background bullet). Cards 3.4
and 3.5 removed. Numbering to be reflowed (3.1/3.2/3.3) in `SECTION_SPECS` + i18n keys.

### Revision 2026-07-25b (owner — supersedes parts of #1, #2, #3 above)

- **3.5 bullet NOT absorbed into 3.3 — reverted.** The cross-domain background line goes to About,
  **not** section 03. Card 3.3 stays as its 5 existing defensible soft-skill bullets, unchanged.
  (Supersedes #1's "absorbed bullet from 3.5" and #3's "fold into 3.3".) 3.5 is simply removed from
  the section; its content lives in About + Education.
- **3.2 honesty callout REMOVED.** Drop `hasCallout` on the 3.2 spec (`what-i-can-deliver.tsx:95`)
  + delete `sections.32.callout` in all three locales. (Supersedes #2's "callout kept".)
- **3.2 dressed as skill-phrases, not prose** (owner: "ubrana w umiejętności, nie opisowe zdania").
- **3.1 Unity sub-block reduced** to a single "also" line (2D Unity no longer fits apps); the Mobile
  sub-block is the expanded one (verified inventory below).
- **Revised net shape:** 3.1 (Mobile expanded + Unity as one "also" line) · 3.2 Programowanie
  Agentowe (core, skill-phrases, **no callout**) · 3.3 Soft skills (5 bullets, unchanged). 3.4 + 3.5
  removed; reflow to 3.1/3.2/3.3.

## Follow-up Research 2026-07-25 — Flutter mobile-dev CV skill matrix (for 3.1)

Deep 4-facet web research (Dart/framework/UI/perf · state/arch/nav/DI · backend/data/integrations ·
testing/CI-CD/release/native) on what MID/SENIOR **Flutter mobile** developers list on CVs and what
2025-2026 job posts require. Full source URLs inline in each facet's agent output; key anchors:
docs.flutter.dev (Impeller default on iOS+Android since 3.27 — verified against primary doc),
Code with Andrea, pub.dev live popularity snapshot, techiecv/interviewkickstart/index.dev JD pages.
Tier: **[B]** baseline (absence flags junior) · **[S]** senior-differentiating. "✅ repo" = already
evidenced in this repo/portfolio.

**Key framing for the copy:** job posts foreground *architecture + performance + native feel* and
treat Dart/framework fundamentals as assumed. So 3.1 should **assert baseline compactly** and spend
the differentiating real estate on senior items (isolates/jank-triage/Impeller, adaptive+a11y,
go_router type-safe/nested, offline-sync+conflict, security hardening, Fastlane/flavors/obfuscation,
Pigeon/FFI/native, golden+Patrol/Maestro tests). **Unity is deprioritized** (owner: 2D Unity no
longer fits apps) — Flutter is the primary pillar.

### A. Dart + framework core
- [B] null-safety, async/await, Futures, **Streams** ✅ repo · [S] **isolates / `compute()`** (strongest Dart signal — offload CPU work off UI thread)
- [S] Dart 3 **records, pattern matching, sealed classes** (exhaustive state unions) · [B→S] extensions vs mixins judgment, generics
- [B] widget lifecycle (`initState`/`dispose`, `if(!mounted)`), const correctness · [S] **keys** (when), InheritedWidget-as-mechanism, **slivers/CustomScrollView**, CustomPainter/RenderObject, HitTestBehavior

### B. UI craft
- [B] **Material 3** seed theming, dark/light ✅ repo · [S] **dynamic color / Material You**, adaptive Material↔Cupertino per-OS
- [B] responsive (LayoutBuilder/MediaQuery) · [S] **adaptive** (tablet/foldable patterns), **ThemeExtension** design tokens (no hardcoded values)
- [B→S] **accessibility** (Semantics, ≥48px targets, ≥4.5:1 contrast, TalkBack+VoiceOver, `meetsGuideline` tests) — the common junior skip
- [B→S] **i18n/l10n** (intl, gen-l10n, ARB, plurals/RTL) — owner ships PL/EN/SV so this is real ✅ repo

### C. Animation & performance (most senior-differentiating)
- [B] implicit + explicit animations (AnimationController/Tween/AnimatedBuilder), Hero · [S] staggered, custom PageRouteBuilder, **Rive/Lottie**
- [S] **Impeller vs Skia** (default renderer since 3.27; shader-jank elimination) · [B→S] 16ms/8ms frame budget
- [S] **UI-thread vs raster-thread jank triage** (single strongest perf signal) · [S] **DevTools** profiling → fix, profiling-driven RepaintBoundary, image-cache tuning
- [S] release: `--obfuscate` + `--split-debug-info`, `--tree-shake-icons`, deferred components

### D. State management + architecture + navigation + DI
- [B] **Riverpod** ✅ repo (default for greenfield; v3 2025) · [B] **BLoC/Cubit** (enterprise standard) — posts want *both + tradeoff*; [LEGACY] GetX = yellow flag as primary
- [S] Riverpod code-gen (`@riverpod`), Signals [emerging]
- [B→S] **Clean Architecture** ✅ repo (feature-first), **MVVM** (now official), SOLID, **repository pattern** · [S] use-cases, DDD-lite
- [B→S] **freezed** ✅ repo, json_serializable, sealed unions · [B] **DI: get_it** / [S] injectable / Riverpod-as-DI ✅ repo ("Dependency Injection")
- [B] **go_router** (de-facto standard) · [S] type-safe routes (`@TypedGoRoute`), **nested/tab (`StatefulShellRoute`)**, redirect guards, deep linking
- [B] build_runner code-gen workflow · [S] **melos monorepo** / multi-package boundaries

### E. Networking + backend + persistence + offline + auth
- [B] **dio/http** ✅ repo (REST) · [S] **retrofit** + interceptors (auth/refresh), retry/backoff, pagination · [S] GraphQL, WebSockets
- [B] **Firebase suite** ✅ repo (Auth/Firestore/FCM/Crashlytics/Analytics/Remote-Config/Storage) + FlutterFire CLI · [S] a 2nd BaaS (Supabase/Appwrite/Amplify)
- [B] sqflite/**Hive**/shared_preferences · [S] **drift/Isar/ObjectBox**, **offline-first + sync + conflict resolution** ✅ repo (offline-first)
- [B] JWT + token refresh, **flutter_secure_storage**, social sign-in (Apple/Google), biometric (local_auth) · [S] **SSL pinning, encryption at rest, tamper/root detection** ("non-negotiable" for prod)

### F. Push + device integrations + monetization
- [B] **FCM** full lifecycle (foreground/background/terminated) + local notifications · [B→S] deep links / app links / universal links
- [B] camera, **QR/barcode** ✅ repo, geolocation, **Google Maps** ✅ repo, permission_handler, image_picker · [S] **PDF** ✅ repo, **POS/printer** ✅ repo, BLE, workmanager background tasks, platform channels
- [B] **in_app_purchase** ✅ repo (educational apps IAP) · [S] **RevenueCat**, AdMob, Amplitude/Mixpanel, Remote-Config feature flags / A-B

### G. Testing + CI/CD + release + native + workflow
- [B] unit/widget/integration tests, mocktail/mockito, bloc_test, coverage · [S] **golden/screenshot tests**, **Patrol/Maestro** E2E (native flows), TDD/pyramid
- [B] GitHub Actions / GitLab CI · [S] **Codemagic/Bitrise**, **Fastlane** (gym/pilot/match/sigh/supply)
- [B] flavors + `--dart-define`, Android keystore, `.aab` vs APK ✅ repo (publishing) · [S] iOS provisioning, **obfuscation**, staged rollout
- [B] **Play + App Store submission** ✅ repo, TestFlight, testing tracks · [S] store-review handling, ASO
- [B] Crashlytics · [S] **Sentry**, Firebase Performance, ANR/crash triage
- [B] MethodChannel · [S] **EventChannel, Pigeon, FFI (dart:ffi), native Kotlin/Swift**, plugin authoring
- [B] Git-flow, code review, Agile/Scrum/Jira ✅ repo · [S] leading reviews, mentoring
- [B→S] **2025-2026 gates**: Impeller awareness, Apple **Privacy Manifest** (`PrivacyInfo.xcprivacy`), **ATT**, Play **Data Safety** form

### Verified inventory (owner, 2026-07-25) — what actually goes into 3.1 Mobile

Owner walked the matrix. **Confirmed (claimable now):**
- **A (Dart core) + B (UI):** owner assumes all as baseline he holds, BUT flags a knowledge
  *refresh* pass in a separate thread — so headline the solid baseline, keep Dart-3-modern
  (isolates/`compute()`, records/patterns/sealed classes) and B-advanced (dynamic color, adaptive,
  ThemeExtension, a11y) OFF the loud-claim list until refreshed → they go on the owner's learn-list.
- **C:** has explicit/Tween animation basics ("nie za dużo"). Add now (easy/high-payoff): implicit +
  Hero + **Lottie**. Learn-list (top senior signal): DevTools jank-triage (UI vs raster) + Impeller
  awareness; Rive optional.
- **D:** ✅ Riverpod, Clean Architecture, freezed, DI + confirmed **SOLID, use-cases,
  json_serializable, go_router, deep links, build_runner code-gen**. NOT confirmed → exclude: BLoC/Cubit,
  MVVM-explicit, Riverpod code-gen, type-safe/nested routes, melos.
- **E:** ✅ REST, Firebase, JWT+refresh+secure storage+sessions, offline-first + sync + confirmed
  **shared_preferences + Hive (Neatu Storage), social sign-in**. NOT confirmed → exclude: retrofit,
  GraphQL, WebSockets, drift/Isar, SSL pinning/encryption/root-detection, biometric.
- **F:** ✅ QR/barcode, Google Maps, PDF, POS/printer, in_app_purchase + confirmed **FCM, camera,
  deep app links, RevenueCat, AdMob**. NOT confirmed → exclude: BLE, workmanager, Amplitude/Mixpanel.
- **G:** confirmed **CI/CD, Codemagic, Git-flow, code-review**, and testing as part of the process
  (per Neatu/Home-Storage). NOTE: owner leans on the *agent* to write tests ("testy piszesz ty") —
  so testing belongs in **3.2's honest agentic story** (agent writes tests → owner reviews), and 3.1
  carries only a light "testy jako standard w procesie" line. NOT confirmed → exclude: Patrol/Maestro,
  golden tests, Fastlane, Pigeon/FFI/native Kotlin-Swift, Sentry.
- Cross-cutting memory guardrail: [[web-is-personal-mobile-is-commercial]] — commercial experience =
  mobile only; never frame web/fullstack (Neatu Dashboard, Polylocale, this site) as commercial.

### How this feeds 3.1 (proposed, pending owner verification)
Rebuild the **mobile sub-block** around confirmed items, grouped so senior signals lead. Candidate
new bullets/chips (only the ones the owner confirms he has): isolates/`compute()`, Riverpod+BLoC
tradeoff, go_router (nested/type-safe), offline-first + sync/conflict, security hardening (secure
storage / SSL pinning), CI/CD (Codemagic/Fastlane) + flavors/obfuscation, testing pyramid
(widget/integration/golden + Patrol/Maestro), Impeller/DevTools jank-triage, a11y + i18n, native
interop (platform channels/Pigeon/FFI). **Unity sub-block shrinks** to a short "also" line.

## Open Questions

1. **3.3 people-management specifics** — the repo has *no* record of leading crews. To write
   this credibly (not as cliché), the owner needs to supply concretes: crew size, role
   (foreman/coordinator?), what was coordinated (trades, handover dates, subcontractors), and
   any measurable outcome. Without them, 3.3 should stay within what's defensible.
2. **3.2 variant** — promote from `growing` to `core`? (Cert + daily use argue yes; keeps the
   honest split intact either way.)
3. **3.5 fate** — keep-and-reframe as the IoT/hardware bridge (recommended) vs. remove and
   migrate SEP E+D + the bridge argument into About/3.3. Owner decision.
4. **Heading wording** — confirm "Moje umiejętności i zalety" vs. alternatives; align eyebrow +
   intro to the chosen word-family; also fix the second „dowieźć" in About/para5 (`pl.json:317`)
   if the word is being retired site-wide.
5. **3.1 additions** — is there store-published-apps-with-usage data and testing/CI detail we can
   state truthfully as senior signals?
