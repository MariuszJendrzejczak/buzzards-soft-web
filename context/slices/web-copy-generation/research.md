---
date: 2026-07-18T00:00:00+02:00
researcher: Claude (Opus 4.8)
git_commit: 6d4534c7a7d661d98a29ad154ba0713f42bb9c6c
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Professional web-copy generation — build-vs-buy + a reusable copywriting standard, applied to the /web-pages-offer rewrite"
tags: [research, copywriting, i18n, content-pipeline, marketing-copy, skills]
status: complete
last_updated: 2026-07-19
last_updated_by: Claude (Opus 4.8)
last_updated_note: "Added follow-up research: how working copywriters actually use AI (best-practice playbook by workflow stage) + the AI-copywriter tool inventory with Polish-fitness notes."
---

# Research: Professional web-copy generation (capability + offer-page rewrite)

**Date**: 2026-07-18 (Europe/Warsaw)
**Researcher**: Claude (Opus 4.8)
**Git Commit**: 6d4534c
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

The copy shipped on `/web-pages-offer` reads amateurish — crude, repetitive, over-casual
("jak do kolegi w gimnazjum"). Two angles to explore:
1. **Build a reusable capability** — a Claude Code skill / prompt-system / copywriting
   framework we author for generating on-brand website content.
2. **Find a ready-made solution** — existing tools, services, prompt libraries, or
   copywriting frameworks we could adopt.

Scope confirmed with user: **produce a reusable capability AND rewrite this page**;
**compare build-vs-buy evenly and recommend.**

## Summary

**What's wrong with the current copy is diagnosable and systemic, not cosmetic.** Four
markers repeat throughout: (a) the same 3–4 selling points hammered across many sections
(*human-not-bot*, *ownership/na własność*, *bez abonamentu*, *cheaper-than-agency*);
(b) spoken-Polish colloquialisms (*pogadasz, kilka stówek, jakieś, łapać kontakt,
zaistnieć w sieci*); (c) em-dash + scare-quote + fragment tics that mimic speech; and
(d) EN/SV that inherit the PL tone flaws via literal translation rather than transcreation.

**Build-vs-buy verdict: BUILD (author our own), don't buy.** Every dedicated AI-copywriting
SaaS (Jasper, Copy.ai, Writesonic, Anyword, …) wraps the same frontier models we already
call, sells workflow scaffolding a solo dev doesn't need, gates its API behind
Business/Enterprise tiers, and gives **zero language-quality edge**. Frontier LLMs (Claude
first) benchmark at the top for Polish and Swedish. So the highest-leverage move is a
**reusable copywriting standard encoded as a bespoke skill** driving Claude directly — which
is *also* exactly the "AI content pipeline" this site already claims to dogfood.

**The standard to encode**: a StoryBrand-SB7 page spine + PAS hero hook + BAB proof + FAB
"what's included", governed by the Rule of One, QA'd with the 4 U's / 4 C's, expressed
through a fixed voice charter ("X, but never Y") and a register floor, and localized by
**transcreation** (not translation) with per-locale tone rules (PL formality held
consistently; SV *du* + Jantelagen-restrained; EN in between).

**Recommended shape**: a `references/`-backed skill (`generate-professional-copy` or
similar) in user scope, carrying a pro-copy rubric + brand-voice charter + transcreation
rules + the offer namespace contract; it writes a reviewable PL copy artifact under the
slice, which then lands in `messages/pl.json` and is transcreated into en/sv — all guarded
by the existing i18n-completeness key-parity test.

---

## Detailed Findings

### Area 1 — Why the current copy reads amateurish (codebase audit)

Grounded in `context/slices/client-web-offer/offer-page.md` (PL copy source of truth) and
the shipped `messages/{pl,en,sv}.json` `offer` namespace.

**1a. Repetition — the same claims hammered across sections.** Each selling point is
re-pitched 4–6 times instead of stated once, which reads as defensive/uncertain:

- *Human-not-bot / not-a-generator*: hero subtitle ("to nie generator: na każdym kroku jest
  człowiek, z którym pogadasz"), process step 1 ("Rozmawiasz ze mną, nie z botem"),
  three-paths ("robiona przez człowieka"), why-AI ("to nie jest „napisz mi stronę" wklejone
  do ChatGPT") — the same reassurance ~4–5× (`offer-page.md:55,66,79,154`).
- *Ownership / na własność*: three-paths ("dostajesz na własność"), dedicated ownership
  section ("wszystko na Twoje nazwisko i Twoje konta"), FAQ (self-edit "bez abonamentu"),
  modules ("Samodzielna edycja treści (bez abonamentu)") — ownership theme in **4** places
  (`offer-page.md:69,178,189` + modules).
- *Bez abonamentu*: repeated ~4× across three-paths, ownership, FAQ, modules.
- *4–5 tys. zł agency anchor*: stated **twice within the hero+three-paths span alone**
  (`offer-page.md:55,65`).
- *Szablon (no-template)*: ~6 instances across three sections (`offer-page.md:66,69,83`).
- *Sprawdzam / weryfikacja*: ~5 instances (`offer-page.md:80,101` + why-AI + standard).

**1b. Register / tone markers — spoken, not professional.**
- Colloquialisms: "z którym **pogadasz**" (`:55`), "**kilka stówek**" (`:66`), "a nie
  „**jakieś**"" (`:154`), "**łapać** kontakt" (pricing "dla kogo"), "chcą **zaistnieć w
  sieci**" (`:53`).
- Scare-quotes as hedging: „zakładnikiem" (`:180`), „jakieś" (`:154`), „zadzwoń jednym
  kliknięciem" (`:97`).
- Em-dash + fragment tics: "Ja — trzecia droga." (`:68`), "Bez abonamentu, bez szablonu."
  (`:69`), breathless em-dash lists in why-AI (`:154`).
- Over-familiar 2nd person throughout ("opowiadasz, co robisz" `:79`).

**1c. Structural overlap.** Ownership, "no generator", and "human touch" each span 3–4
sections in close succession — the page re-argues the same points rather than advancing.

**1d. Translations inherit the flaws.** EN/SV are **literal translations, not
transcreations**: "show up online" / "synocs på nätet" (`en/sv.json:693`), "a few hundred" /
"några hundralappar" (`:702`) carry the colloquial register straight across; the scare-quote
„gisslan"/"hostage" pattern is copied verbatim (`sv.json:865`); trailing-possessive
awkwardness in "…that you own" (`en.json:704`). No locale adapts idioms or CTAs to its own
market.

**Conclusion**: the failure is a missing *standard* — no framework, no voice charter, no
transcreation step — not a one-off bad draft.

### Area 2 — Professional copywriting frameworks & principles (external, cited)

The professional/amateur split reduces to: pros write **specific, singular, benefit-anchored,
provable**; amateurs write **vague, repetitive, feature-listing, self-asserting**.

**Structure frameworks worth adopting:**
- **StoryBrand SB7** (recommended page spine) — customer = hero, brand = guide (empathy +
  authority), a simple 3-step plan de-risks the purchase, one clear CTA. Directly fixes the
  two failure modes of designer/agency pages: talking about yourself and confusing
  non-technical buyers.
- **PAS** (Problem-Agitate-Solve) — best as the **hero hook**; name the owner's pain in
  their words (keep agitation honest/short for a trust-sensitive local buyer).
- **BAB** (Before-After-Bridge) — the proof section as a literal old-site→new-site
  screenshot pair (highest comprehension for non-technical owners).
- **FAB** (Feature-Advantage-Benefit) — section-level tool for "what's included"
  (*mobile-responsive → works on any phone → customers book you from the bus*).
- **Rule of One** — governing constraint: one reader, one big idea, one promise, one CTA.
- **4 U's** (headline test) + **4 C's** (final QA: Clear, Concise, Compelling, Credible).

**Pro-copy principles (empirically load-bearing):** specificity over adjectives; one idea
per section (stop re-pitching); benefit-led "this means that…" bridges; show-then-tell with
falsifiable proof; handle the top objection, take a position; cut hype/filler. NN/g's
writing-for-web research quantifies the payoff: concise **+58%**, scannable **+47%**,
objective/no-hype **+27%**, combined **+124%** usability.

**Voice & tone system:** *voice is constant, tone flexes*. Use NN/g's four tone dimensions
(Formal↔Casual, Serious↔Funny, Respectful↔Irreverent, Matter-of-fact↔Enthusiastic) to pick a
fixed position, expressed as a Slack-style **"X, but never Y"** chart (e.g. *confident, never
cocky; direct, never blunt; warm, never chummy*) — one line that defends against **both**
corporate-stiff and too-casual drift. Add a **register floor**: ~grade-7 reading level,
active voice, plain-word swaps, no jargon.

(Full citations in **External Sources**.)

### Area 3 — Ready-made tools & the build-vs-buy call (external, cited)

**The market has hollowed out and offers no edge for our case:**
- **Copy.ai** repositioned to a GTM/RevOps platform (Fullcast acquisition, Oct 2025); chat
  tier $29 → jumps to $1,000/mo+.
- **Writesonic** pivoted to "AI Search Visibility" (GEO/AEO), no longer a copy tool.
- **Jasper** is the most marketing-complete (brand voice, Surfer-SEO) but **API is
  Business/Enterprise only**.
- **Anyword** has the best landing-page template story + performance scoring, but **API =
  Enterprise**, and scoring is English-strongest.
- **Rytr** is the only one with a **true self-serve pay-as-you-go API** — but rides a cheaper
  model tier and buys nothing over calling Claude directly.
- Only **Jasper and Copy.ai even name Polish + Swedish**; the rest say "30+ languages"
  without specifics — disqualifying for a pipeline that needs *proven* PL/SV.

**Decisive point: the SaaS tools wrap the same frontier models** and add only workflow
scaffolding (brand-voice memory = a system-prompt file; templates = your framework; bulk =
a loop; SEO/collab = irrelevant to a one-dev static-export i18n build). One curated list's
own thesis: *"many 'AI marketing tools' are just wrappers around prompts like these."*

**Language quality favours frontier LLMs directly:**
- **Polish** benchmarks near the top despite morphology — Claude-3.5-Sonnet 82.67% on the
  Mar-2025 PL Linguistic & Cultural Competency benchmark (Gemini 83.0, GPT-4o 81.33),
  ~12 pts above PL-specific models (Bielik, PLLuM); ONERULER ranked Polish #1 of 26
  languages. Consistent weak spot across *all* models: **humor in Polish** → hand-check witty
  lines.
- **Swedish**: frontier models lead (GPT-4/Claude top the Swedish arena study / ScandEval);
  evidence thinner → budget a native-review pass.
- **DeepL** is best-in-class *translation* into PL/SV (free 500k ch/mo API) — useful as a
  cross-check aid — but **DeepL *Write* supports neither Polish nor Swedish**, so it can't do
  a PL/SV editing pass.

**Reusable free foundation (for the build path):** the frameworks themselves as prompt
scaffolds, plus CC0 prompt collections (`f/awesome-chatgpt-prompts`, ~166k★),
`WynterJones/CoppieGPT` (up to 232 frameworks, reference only), and Anthropic's official
Prompt Library ("Brand builder", "Product naming pro").

**Verdict: build (prompt Claude directly with an encoded standard), don't buy.** Adopt DeepL
only as an optional translation cross-check.

### Area 4 — How a bespoke skill would be built & integrated (codebase)

**Skill anatomy here is consistent** (from `~/.claude/skills/{research,plan,plan-prd}`):
- One `SKILL.md` with YAML frontmatter (`name`, `description` incl. PL+EN trigger phrases,
  `allowed-tools`) + numbered process steps + explicit house rules.
- Optional `references/` subdir holding **load-bearing contracts** — e.g. `plan` →
  `references/progress-format.md`; `plan-prd` → `references/prd-schema.md` (locked
  section/schema the generator must conform to).
- Skills write artifacts to `context/slices/<change-id>/<artifact>.md` with frontmatter,
  document upstream/downstream chaining, and honor house rules (append-don't-overwrite,
  PL-source-of-truth, generator-not-inventor: anything missing → `## Open Questions`).

**The repo's copy pipeline the skill must respect:**
- `messages/pl.json` = source of truth; `en.json` + `sv.json` are downstream translations.
- Key parity is enforced by `tests/unit/i18n-offer-completeness.test.ts` (and the portfolio
  twin): every `offer.*` leaf must be non-empty, non-placeholder (`[PL]|[EN]|[SV]|TODO|TBD`
  guard), and the **leaf-key set identical across all three locales**; `nav.items.offer`
  guarded separately.
- House planning flow: `context/slices/<change-id>/` (`change.md` → `research.md` /
  `frame.md` → `plan.md`) → `context/sprints/` (`/sprint-plan` → `/sprint-run`).

**Sketched capability** (`generate-professional-copy`, user scope, so the brand voice stays
personal and iterable):
- `SKILL.md`: read the structural brief (e.g. an `offer-page.md`) → apply the framework +
  voice charter → generate PL copy keyed to the namespace contract → produce transcreation
  notes for EN/SV → write a reviewable artifact; **does not** write `messages/*.json`
  directly (separation of concerns; a review + curation step lands it, then CI validates).
- `references/copy-rubric.md` — the pro-copy checklist + "X, but never Y" voice charter +
  register floor.
- `references/transcreation-rules.md` — PL→EN/SV per-locale tone/formality + CTA-per-locale +
  idiom pitfalls.
- `references/namespace-contract.md` — the locked `offer.*` (and future page) key structure.

## Code References

- `context/slices/client-web-offer/offer-page.md:45-203` — the 11-section PL copy source with
  every repetition/register issue catalogued in Area 1.
- `messages/pl.json` `offer` namespace — shipped PL strings (source of truth).
- `messages/en.json`, `messages/sv.json` `offer` namespace — literal translations that
  inherit the PL register flaws (Area 1d).
- `tests/unit/i18n-offer-completeness.test.ts` — key-parity + placeholder guard the copy
  pipeline must satisfy.
- `tests/unit/i18n-portfolio-completeness.test.ts` — the twin oracle for the portfolio
  namespace (pattern to mirror).
- `context/slices/client-web-offer/concept.md` — offer positioning + the "transparency about
  AI is deliberate/on-brand" stance that the voice charter must preserve.

## External Sources (live docs)

All fetched/searched live (2026-07); not recalled from memory. Product pricing is volatile —
treat figures as "current as of July 2026."

**Frameworks & principles:**
- PAS / AIDA / BAB / FAB / 4U's — Copyhackers: <https://copyhackers.com/2015/10/copywriting-formula/>, <https://copyhackers.com/2023/03/attention-interest-desire-action/>, <https://copyhackers.com/write-compelling-agitation-copy/>
- BAB — Anyword: <https://www.anyword.com/blog/bab-copywriting-formula>
- StoryBrand SB7 — <https://www.gravityglobal.com/blog/complete-guide-storybrand-framework>, <https://www.innatemarketinggenius.com/storybrand-framework/>, <https://storybrand.com/>
- PASTOR — Ray Edwards: <https://www.rayedwards.com/go/p-a-s-t-o-r-masterclass>
- Rule of One — <https://juliasaxena.com/the-rule-of-one-get-clear-on-this-before-writing-any-piece-of-copy/>
- Specificity / show-don't-tell / anti-hype — Copyhackers <https://copyhackers.com/how-to-be-specific/>; Marketing Examples (Harry Dry) <https://marketingexamples.com/copywriting/tips>
- Writing-for-web empirical lift — NN/g <https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/>, <https://www.nngroup.com/articles/be-succinct-writing-for-the-web/>
- Objection handling / social proof — Copyblogger <https://copyblogger.com/testimonials-social-proof/>
- Clarity / editing discipline — 37signals <https://basecamp.com/guides/how-we-communicate>

**Voice & tone:**
- Voice-vs-tone — Mailchimp <https://styleguide.mailchimp.com/voice-and-tone/>
- Four tone dimensions — NN/g <https://www.nngroup.com/articles/tone-of-voice-dimensions/>
- "X, but never Y" chart — Slack <https://slack.design/articles/thevoiceofthebrand-5principles/>; HeyOrca <https://www.heyorca.com/blog/brand-voice-chart>
- Register floor — Shopify Polaris <https://polaris-react.shopify.com/content/voice-and-tone>; GOV.UK <https://www.gov.uk/government/publications/govuk-content-principles-conventions-and-research-background/govuk-content-principles-conventions-and-research-background>; Atlassian <https://atlassian.design/content/voice-and-tone-principles/>

**Localization:**
- Transcreation vs translation — Smartling <https://www.smartling.com/blog/six-ways-transcreation-differs-from-translation>; Phrase <https://phrase.com/blog/posts/transcreation-marketing-across-cultures/>; Lokalise <https://lokalise.com/blog/transcreation-vs-localization/>
- Multilingual style guide / glossary — <https://www.adhoc-translations.com/blog/multilingual-style-guide/>
- CTA-per-locale — EuroDev <https://blog.eurodev.com/how-to-write-call-to-actions-in-different-languages>
- PL formality (Pan/Pani vs ty) — <https://talkinpolish.com/pan-vs-pani/>
- SV Jantelagen / du — <https://www.fulltextmedia.se/en/swedish-market-localization-best-practices/>

**Tools & LLM language quality:**
- Jasper <https://www.jasper.ai/pricing> / <https://www.jasper.ai/languages> · Copy.ai <https://www.copy.ai/prices> · Writesonic <https://writesonic.com/pricing> · Anyword <https://www.anyword.com/pricing> · Rytr <https://rytr.me/products/api> · DeepL <https://developers.deepl.com/docs/getting-started/supported-languages>
- Prompt assets — <https://github.com/f/awesome-chatgpt-prompts>, <https://github.com/WynterJones/CoppieGPT>, Anthropic Prompt Library <https://platform.claude.com/docs/en/resources/prompt-library/brand-builder>
- PL LLM benchmark — arXiv <https://arxiv.org/html/2503.00995v1>; ONERULER <https://ppc.land/polish-emerges-as-top-language-in-multilingual-ai-benchmark-testing/>; PL native-rater 2026 <https://jelesnianski.com/artificial-intelligence/llm-ranking-report-2026-on-content-generation-in-the-polish-language/>
- SV LLM eval — arXiv Swedish arena / ScandEval <https://arxiv.org/html/2405.14006>

## Architecture Insights

- **This is a dogfooding opportunity, not just a fix.** The offer page literally sells "an
  AI + human content pipeline" and links `/#warsztat` as proof. A bespoke copy skill that
  produces the site's own copy *is* that pipeline made real — the credibility claim and the
  tooling converge.
- **The i18n-completeness test is the natural CI gate** for any generated copy: it already
  enforces key parity + placeholder-free content, so a copy skill's output is validated by
  existing machinery with no new test infrastructure.
- **Separation of concerns**: the skill should emit a *reviewable artifact*, not write
  `messages/*.json` directly — matching how `plan`/`research` write to `context/slices/**`
  and leave landing to a deliberate step.
- **Transcreation must be a first-class step, not an afterthought.** The single biggest
  translation defect (Area 1d) is that EN/SV were *translated*, not *transcreated* — encode
  it as an explicit per-locale pass.

## Historical Context (from prior changes)

- `context/slices/client-web-offer/research.md` — the *market* research for the offer
  (pricing validation for the PL micro-business segment); complementary, different topic.
- `context/slices/client-web-offer/concept.md` (Revision v5) — locked offer positioning &
  decisions; the source of the on-brand honest voice the new standard must preserve.
- `context/slices/client-web-offer/plan.md` + `context/sprints/sprint-001-client-web-offer.md`
  — the implementation that shipped the current (amateur-reading) copy; this slice is the
  quality follow-up.

## Related Research

- `context/slices/client-web-offer/research.md` (market/pricing plane of the same offer).

## Open Questions

1. **Voice charter specifics** — the exact 3–5 "X, but never Y" traits for Buzzards Soft
   client-facing copy need to be locked with the user (candidate: *confident-not-cocky,
   direct-not-blunt, warm-not-chummy, honest-not-self-deprecating, plain-not-dumbed-down*).
2. **PL formality decision** — hold the current informal *ty* (peer/approachable, common for
   modern PL tech brands) or shift toward formal *Pan/Pani*? A deliberate positioning choice,
   not neutral; must be locked before rewrite. (SV → informal *du* is the clear default.)
3. **Scope of the rewrite vs. restructure** — does the offer page keep its current 11-section
   structure and only get a copy pass, or also adopt the StoryBrand spine (hero PAS hook,
   3-step plan, BAB proof)? The latter is a bigger change and may need `/plan`.
4. **Skill granularity** — one `generate-professional-copy` skill covering PL-gen +
   transcreation, or split PL generation from an EN/SV `transcreate` step? (Area 4 sketched
   the combined form; splitting mirrors the PL-source-of-truth boundary more cleanly.)
5. **Proof assets** — BAB (before/after) and falsifiable social proof need real
   screenshots/testimonials; do we have client work we can show, or is the honest-voice route
   "this very site was built this way" the only proof available now?
6. **Skill scope location** — user scope (personal brand voice, per Area 4) vs. repo scope
   (versioned with the site). Affects whether the charter travels with the code.

---

## Follow-up Research 2026-07-19 — How copywriters actually use AI (playbook + tool inventory)

Second pass, prompted by the user: the first pass under-covered *practitioner* material
(the "here's how I use AI daily" genre) and leaned on frameworks + products. This pass mines
~25 practitioner sources (Copyhackers/Joanna Wiebe, Rob Palmer, Nicolas Cole & Dickie
Bush/Ship30, Kieran Drew, Eddie Shleyner, Dan Nelken, Ashlyn Carter, George Kao, Forte Labs,
plus Medium/Substack workflow essays and the Rogoz seed article) and a stage-by-stage tool
survey. Two deliverables the user asked for: **(A) the AI-copywriter best-practice playbook**
and **(B) the tool inventory**. Every external claim in the source agent reports carries a URL;
the load-bearing ones are reproduced here.

> Sourcing caveats: **Reddit was hard-blocked** to the crawler, so community threads are
> represented via practitioner blogs, not verbatim — the candid "over-reliance war stories"
> plane is thinner than the rest. Tool **prices are July-2026 and volatile**; several came
> from aggregators (flagged in the source reports), not vendor line-items — re-verify before
> quoting. Voice-cloning adherence percentages (25–35%, 84/87/95%) are practitioner/vendor
> figures — directional, not peer-reviewed.

### A. The AI-copywriter playbook — best practices by workflow stage

The through-line across every credible source: **AI does volume and grunt-work in the middle;
strategy, real specifics, and voice stay human** (Cole's "10/80/10" — first 10% thinking +
last 10% polish are non-delegable). Never single-pass; never publish a raw draft.

1. **Research / Voice-of-Customer (the backbone).** Mine 50–300 *real* customer reviews,
   support tickets, survey answers, call transcripts; load them in a "here's data — wait, don't
   act yet" turn *separately* from the instruction; then extract a **ranked** list of pains /
   desires / objections **in the customer's exact words**. Pick review sources by the *outcome*
   prospects want, not by products like yours. The customer's own phrasing *is* the persuasive
   raw material (Wiebe's swiped-VoC headline reportedly beat control >400%). Bootstrap
   ("what are the likely pains of X?") only as a last resort when you have zero VoC.
2. **Ideation.** Reverse-engineer a winning competitor page into its *strategy* first ("who's
   the target, what problem, what's the primary CTA, what funnel isn't visible?") before
   borrowing anything. Generate **~50 headline/angle variations per batch** (20 too few, 100+
   diminishing returns) anchored to VoC words — raw material to mine, not finished copy. Feed
   the model *named* ideation frameworks and *your own* headline techniques; iterate the
   strongest, discard the rest. Treat AI ideation as a spark, not a vending machine.
3. **Brief / structure.** Open with a role turn ("you are a conversion copywriter, expert in
   persuasion/behavioral economics/CRO…"). Keep **strategy 100% human** — audience, awareness
   stage (Schwartz's 5), emotional driver, mechanism, offer architecture, proof hierarchy. Feed
   the framework as a *labeled skeleton* ("PROBLEM: … AGITATE: … SOLUTION: …"), not a bare
   mention. Structure rule-heavy briefs with XML-ish tags incl. an explicit **`avoid`** block
   (banned phrases + "no invented stats"). Defer VoC injection to a late, explicit step.
4. **Drafting.** The single most-repeated rule: **brief a specific persona AND a specific
   section** — never "write a sales page", but "write the problem-agitation section for a
   55-y-o who tried 3 products that failed and distrusts the category." Build layered
   (research → organize → extract → draft), not one-shot. Give *behavioral sentence rules*
   ("two sentences per paragraph, three max; lead with the insight"), not vague adjectives.
   Generate the same section in 2–3 named formulas (PAS/AIDA/BAB) and pick.
5. **Voice / brand-voice matching (the crux for us).** Reverse-engineer voice from **5–10 of
   *your own* (human-written) samples** into a reusable, *evidence-forced* spec — "cite an
   actual phrase for every observation; countable metrics, not vague labels" (avg sentence
   length, % paragraphs opening with a question, signature phrases, punctuation habits). Store
   it persistently (Claude Project / Custom GPT / a compressed <200-word voice block), pair
   **rules + few-shot examples + off-tone negatives** (each alone underperforms), and repeat
   the top rules at the *end* of the prompt to fight drift. Reported ceiling: voice quality
   degrades past ~800 words of a single output. Inject real VoC words — the review language
   *is* the voice mechanism.
6. **Editing passes (run as separate single-purpose sweeps).** (a) **Specificity sweep** —
   replace vague claims with names/numbers ("robust system" → "handles 10k req/s"); this is the
   *highest-leverage, least-gameable* anti-slop move and improves readability at the same time.
   (b) **Structural variation** — force burstiness (mix 5-word and 30-word sentences; avoid
   uniform S-V-O); kill signposting ("furthermore/moreover/in conclusion"). (c) **Ban-list
   polish** — a near-canonical AI-tell list (*delve, leverage, unlock, elevate, tapestry,
   game-changer, "it's not just X, it's Y", "in today's fast-paced world", em-dash overuse,
   rule-of-three*). (d) **Readability** — ~grade-7, active voice, cut adverbs, read aloud
   ("would I say this out loud?"). Order: specificity → structure → ban-list. **Skip third-party
   "humanizers"** (see B).
7. **Iteration / critique loops.** Structured **Audit → Critique → Rewrite**, protecting every
   fact/figure and keeping length within ~10%. **Voice-gap test**: make the model score its
   own output against each voice dimension (MATCHED / PARTIAL / MISSED) and regenerate the
   misses. Multi-axis critique (clarity/persuasion/tone, 1–10, each with feedback), not one
   number. When a thread degrades, start a *fresh* thread rather than over-prompting a dying one.
8. **Anti-patterns to design against.** AI "slop" = technically competent, strategically empty
   → fix with specific-section briefs + human strategy. AI writes *about* emotion, can't write
   *from* it → supply the lived, concrete moment yourself. **Hallucinated proof is a
   credibility/compliance risk** → forbid invented stats, human fact-check every number.
   "Sameness" comes from vague-adjective prompting (AI → the average of its training data) →
   break with behavioral rules + banned words + examples. The time-saving can be a mirage if
   the output needs heavy finessing. **Tool ≠ skill**: "the best AI copy tool is a copywriter
   who knows how to use AI."

**High-confidence consensus (appeared across many independent sources):** VoC review-mining
backbone · specific-persona + specific-section briefs · layered not single-pass · voice =
few-shot of *your* samples + do/don't rules stored persistently · a shared AI-tell ban list ·
strategy & humanity stay human (10/80/10) · self-critique/scoring loops · mandatory human
fact-check before publish.

### B. The AI-copywriter tool inventory (by stage; Polish-fitness flagged)

Frontier chat assistants (Claude / ChatGPT / Gemini, all ~$20/mo, all with public APIs, all
**strong in Polish**) are the workhorse across stages 2–7; the specialist tools below only earn
their keep where they do something a well-prompted frontier LLM can't.

| Stage | Tool(s) | Purpose | Cost (Jul 2026) | API | Polish fitness |
|---|---|---|---|---|---|
| 1 · VoC scraping | **Outscraper** | bulk Google/Trustpilot reviews | ~$3 / 1k reviews, PAYG | ✅ | language-agnostic (scrapes PL fine) |
| 1 · VoC scraping | **Apify** (actors) | reviews + Reddit + forums | ~$1–3.40 / 1k, free credit | ✅ | language-agnostic; verify actor is maintained (Reddit `.json` 403 since May-26) |
| 1 · Reddit/forum listening | **Syften** | ongoing keyword/pain listening | €20–100/mo | ✅ | matching PL ok; source-set English-skewed |
| 1 · call/interview mining | **Fireflies.ai** | transcribe+mine calls | free / $10/user | ✅ | claims 100+ langs incl. PL (verify) — safer than Otter for PL |
| 1 · interview repo | **Dovetail** | transcribe+theme surveys/interviews | free / ~$39–49 editor | higher tiers | PL transcription workable, trails English |
| 2 · workhorse | **Claude / ChatGPT / Gemini** | ideation, clustering, drafting, judging | ~$20/mo each | ✅ | **excellent PL** |
| 2 · cited research | **Perplexity** | sourced facts, anti-hallucination | free / $20/mo | ✅ (Sonar) | good PL; thin PL web → may lean English |
| 3 · SEO briefs | Frase / Surfer / Clearscope / MarketMuse / Dashword / **NeuronWriter** | SERP briefs + on-page grading | $23–$499/mo | varies | **LOW RELEVANCE** for a few-page site; if ever needed, NeuronWriter (PL-native, from ~$23) or Surfer (best non-EN) |
| 4 · generation | Jasper / Copy.ai / Writesonic / Rytr / Anyword | copy-specialist wrappers | $9–$69/mo | most | redundant — they wrap the same models; **prompt the frontier LLM directly** |
| 5 · readability/style | **LanguageTool** | grammar/style checker | free / ~$5/mo | ✅ + self-host | **first-class PL** (20k+ PL checks) — the PL pick |
| 5 · style (English) | Hemingway / Grammarly / ProWritingAid | readability/style | free–$30/mo | limited | **English-only for *style*** (Grammarly does PL spelling only, not style) — skip for PL copy |
| 5 · "humanizers"/detectors | Undetectable / StealthGPT / GPTZero / Originality | beat AI detectors | ~$10–20/mo | some | **SKIP** — unreliable, self-cancelling arms race; false-positives on non-native English (a real hazard for a PL author) |
| 6 · brand-voice persistence | **Claude Project** / Custom GPT | hold voice charter + samples | bundled ~$20/mo | ✅ | **best PL option**; Claude rated stronger for long-form voice |
| 6 · brand-voice (team) | Jasper Brand Voice / Writer.com | governed voice at scale | $59/mo / enterprise | gated | overkill for solo; English-governance-oriented |
| 7 · prompt management | **Espanso** (free/local) / TextExpander / PromptHub / Notion doc | reusable prompt snippets & versioning | free–$20/mo | PromptHub ✅ | language-agnostic |

**Minimal recommended stack for our case** (solo dev, PL-first, low volume, already on Claude):
1. **Claude (Pro/API)** — the engine for ideation, drafting, voice-extraction, judging.
2. **Claude Project** holding the Buzzards **voice charter + 5–10 PL samples** (Stage 6).
3. **Outscraper or an Apify actor** — *only if/when* real customer reviews exist to mine (none yet).
4. **LanguageTool** (~$5/mo or self-host) — the one genuine PL-capable style/grammar checker.
5. **Espanso** (free, local) — a snippet library for the reusable prompts.

**Explicitly skip:** SEO-brief platforms (Frase/Surfer/Clearscope — built for high-volume blog
engines, irrelevant to a few-page site; `lib/seo.ts` + hand-written metadata already cover it),
copy-specialist generators (Jasper/Copy.ai — wrap the same models; Jasper revenue reportedly
-54% as the moat eroded), Grammarly/Hemingway/ProWritingAid *for Polish* (English style engines),
and the entire humanizer/detector category.

### Build-vs-buy — reaffirmed and sharpened

The follow-up corroborates the earlier verdict from the practitioner side too: **the value is in
the *method* (a good prompt/voice system driving a frontier LLM), not in buying a wrapper.** For
us that means encoding the playbook (§A) as a reusable skill + voice charter, using the minimal
stack (§B) — exactly the PL-first, one-section-first, reusable-skill path the user chose.

### C. Voice-DNA extraction — the buildable core of the skill (deep-dive 2026-07-19)

The load-bearing mechanism: **one analyzer prompt reads a few of the author's samples and emits
a structured, measurable voice profile, under a hard rule that every observation cites a real
phrase and uses countable metrics — never adjectives.** Multiple independent sources converge
(promptsdaily, aiprompthackers, Forte Labs, CXL, writingfordevs, CyberCorsairs, and shipped
Claude *voice-dna* skills on GitHub).

- **Analyzer-prompt shape:** role-prime ("you have expertise in linguistics/NLP…") → analyze N
  samples across a ~10-dimension taxonomy → synthesis round merging per-sample analyses into one
  profile. Dimensions to extract (union, all corroborated): sentence-length stats + variation;
  paragraph opening/closing patterns; vocabulary fingerprint (frequent phrases + avoided words +
  formality 1–5); rhythm/cadence; punctuation habits; transitions; rhetorical moves (questions,
  emphasis-without-bold); personality / reader-relationship markers; structural defaults (hook
  type, list vs narrative); explicit anti-patterns / "never say". **The rule that makes it
  work** (verbatim): *"For each one, cite specific words, phrases, or structures from my sample
  as evidence. No vague labels… If your observations could apply to any writer, rewrite them."*
  CXL's phrasing: behavioral constraints beat adjectives — *"'Two-sentence paragraphs' beats
  'punchy'; 'Lead with the counter-intuitive finding' beats 'engaging'."*
- **Samples:** 5–8 (floor 3, ceiling ~10, diminishing returns beyond), **human-written only**
  (AI-written samples poison the fingerprint), mixed registers (LinkedIn / newsletter / email /
  long-form), ~2–4k words total, each sample within context.
- **The ~800-word output-degradation ceiling is real and cross-corroborated** (attention
  dilution — early instruction tokens lose weight as generation grows; "by paragraph twelve of a
  3,000-word generation your patterns have lost their grip"). **Practical rule: generate in
  ≤~800-word sections, restating the voice rules at the top of each.** (This dovetails with the
  user's "build the skill on ONE section first" decision — one section ≈ one safe generation
  window.)
- **Persistence:** a **Claude skill** is the strongest fit for a single-author always-on voice
  (mature examples exist); it holds an "8-part / 3-layer charter" — **Structural DNA** (sentence
  + paragraph length targets — followed most reliably because objective), **Emotional DNA** (tone
  dims 1–5), **Semantic DNA** (frequent phrases + banned list), + personality, structural
  defaults, ≥1 on-brand and ≥1 paired **off-brand** negative, and a paste-ready runtime block —
  **with the banned-list + hard rules repeated at the end** (primacy+recency beats drift).
  Rules + few-shot + off-tone negatives together beat rules alone (paired before/after rewrites
  teach *discrimination*; the "25–35% better adherence" figure is a vendor claim — direction
  solid, number not independently measured).
- **Validation — the "Voice Gap Test":** a secondary prompt scores output against the profile:
  match identification (with citations) → gap analysis → one-paragraph drift diagnosis; score
  each dimension **MATCHED / PARTIAL / MISSED** and regenerate the misses. Feed each human
  voice-correction back into the charter (corrections-as-data). Expect an iterative trial loop
  (one worked example converged after 5 trials).
- **Polish tells are NOT an open question — they're well-sourced (this reverses Open Q from
  Pass B).** A Polish scanner cataloguing **120 overused AI phrases in 9 categories** exists, and
  multiple independent PL sources converge. English patterns have direct PL equivalents: em-dash
  overuse (— instead of the Polish hyphen) is "one of the strongest markers of ChatGPT text in
  Polish"; PL triads (*"szybko, skutecznie i efektywnie"*); *"To nie X, to Y"* ("appears in every
  second AI text"). **PL-specific lexical tells with no clean English analogue**: *kluczowy,
  kompleksowe rozwiązanie/podejście, holistyczna perspektywa, synergia, innowacyjne podejście*;
  openers *"W dzisiejszych czasach / W erze cyfrowej / Warto zauważyć, że / Nie sposób nie
  zauważyć"*; fillers *"Co więcej / Kluczowym aspektem jest"*; weak closers *"Podsumowując,
  warto / Na zakończenie chciałbym"*; coaching jargon *"Uwolnij swój wewnętrzny potencjał"*.
  PL structural tell: translationese — overly flowery, formal, comma-heavy long sentences.
  **Actionable: the banned-list layer must be authored natively in Polish** (seeded from the PL
  phrases above), NOT translated from an English list — a translated list would miss
  *kluczowy/synergia/kompleksowe* and mishandle the em-dash-vs-hyphen convention.
  Sources: jacekwolniewicz.pl (120-phrase scanner), smartletter.pl, klikai.pl, harbingers.io,
  katsin.pl.

**Buildable spec for the skill (drop-in):** (1) analyzer prompt = role-prime → 10-dim taxonomy →
evidence-forced, metric-only → synthesis round; (2) 5–8 human PL samples, mixed registers,
~2–4k words; (3) store as a Claude skill holding the 3-layer DNA charter with a **native Polish
banned-list** + paired off-brand negative + rules repeated at end; (4) generate in ≤800-word
sections restating rules; (5) validate with the Voice Gap Test + corrections-as-data.

### Still-open (after the Voice-DNA dive)

- **The composition itself is the one genuine open question** — the PL *tell inventory* is
  well-sourced (detection literature) and the extraction technique is well-sourced (English), but
  **no source empirically benchmarks the voice-DNA extraction+generation loop for a single
  Polish author**. That specific composition is what our own trial loop (build on one offer
  section, iterate) will validate — which is exactly the plan.
- **Vendor-quantified adherence numbers** (25–35% / 40–60% / 84–98%) are directional single-source
  claims, not independent measurements — don't quote them as fact externally.
- **A deduplicated, categorized AI-tell ban-list spec** (PL vocabulary / syntax / structure /
  punctuation) — now compilable from the PL sources above into one reference doc when the skill
  is authored; the English list is secondary (only relevant to the future EN skill).
