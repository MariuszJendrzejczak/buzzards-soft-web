# Copy skill — critique session (offer page, PL)

> Session opened 2026-07-19 because the `generate-professional-copy-pl` skill (and the
> `copywriter` agent) repeatedly shipped PL offer copy the owner rejected, while the
> skill's own Voice-Gap-Test self-scored "all MATCHED". This file captures a brutally
> honest critical read of the **current** shipped state + the **root causes in the skill**
> + proposed fixes. Format: my analysis first (owner's choice), owner corrects/adds below.
>
> The point of this file is to fix the **skill/standard**, not to patch the copy again.

## The meta-failure (why the skill produced bad copy while scoring itself green)

1. **Critic = generator, same pass.** The Voice-Gap-Test was run by the same model, in the
   same window, that wrote the copy. It rationalised its own output to "all MATCHED" every
   time. A self-graded rubric is near-worthless as a quality gate — especially in PL, where
   the model has no reliable native "ear" to fail itself with.
2. **Word-level fixes masqueraded as quality.** I kept de-duplicating *phrases* while the
   real defects (bloated information architecture, floating claims, awkward native PL) went
   untouched. Passing the repetition sweep is necessary and nowhere near sufficient.
3. **Structural edits weren't re-checked for logic.** Removing the competitor comparison
   left comparative claims ("szybciej i taniej") with no referent — nobody re-verified the
   claims after the frame changed.

## Findings — current state (cited)

### A. Structure / information architecture (the biggest problem)

- **A1 — Four low-substance sections in a row before any concrete content.** `hero` →
  `problem` (pillars) → `guide` → `plan` are all "how nice this is / how I work". The reader
  gets ~4 screens of reassurance before `includes`/`pricing` say anything concrete. A tired
  buyer bounces. The page front-loads fluff.
- **A2 — "One person, end-to-end" stated ~4×, now at the *idea* level.** `hero`
  ("Zajmuję się całością"), `problem.mineBody` ("Jeden kontakt od początku do końca"),
  `guide.heading` ("Jak pracuję nad Twoją stroną"), `plan` (the steps) all say the same
  thing. Word-dedup didn't touch this because the *words* differ; the *message* repeats.
- **A3 — The pillars are a grab-bag, not one message.** "Dopasowana do Ciebie" (design) +
  "Jasna cena i termin" (price) + "Jeden kontakt" (comms) are three unrelated reassurances
  under one heading ("Czego możesz się po mnie spodziewać"). The section doesn't cohere.

### B. Logic / trust holes

- **B1 — "szybciej i taniej" floats.** `guide.body2`: *"Dzięki temu robię szybciej i
  taniej."* Cheaper/faster **than what?** We deleted the agency/generator comparison but
  kept the comparative that depended on it. Now it's a claim with no referent.
- **B2 — "ustalamy cenę" contradicts the fixed price list.** `problem.generatorBody`:
  *"Zanim zaczniemy, ustalamy cenę i termin"* reads as *negotiated*, but `pricing` is
  *"Proste pakiety, jawne ceny"* — fixed, published. Which is it?
- **B3 — Unearned claims a skeptic discounts.** `hero`: *"przyciąga klientów"* (does it?
  no proof), and *"Profesjonalna … wygląda profesjonalnie"* — "profesjonalny" is the empty
  self-praise adjective every agency uses.

### C. Native-PL awkwardness (the language angle, precisely)

The ban-list catches single tell-words; it does **not** catch construction-level awkward
Polish. Examples currently live:

- **C1 — "Pomagam Ci mieć stronę"** (`hero.subheading`) — nobody says this in PL; it's a
  weak calque. A person says *"Robię/buduję strony…"*.
- **C2 — "Profesjonalna" + "wygląda profesjonalnie"** in the two hero lines — same root
  twice, back to back.
- **C3 — "konta … na Twoje konta"** (`ownership.body`) — tautology in one clause.
- **C4 — "Tę stronę zbudowałem dokładnie tak samo."** (`guide.proofSuffix`) — dangles after
  the link; "tak samo" has no clear referent as rendered.
- **C5 — Abstract corporate fillers:** *"jak chcesz być odbierany"* (`includes.content`),
  *"techniczne podstawy widoczności"* (`ownership.limits.seo.lead`), *"odpowiadam za
  efekt"* (`guide.body2`).

### D. Residual repetition (word level, still there)

- **D1 —** *"z wyceną"* in `quote.heading` **and** `quote.intro`; the "profesjonaln*" and
  "gotow*" families across hero/plan.

## Root cause → proposed skill/standard fix

| # | Root cause | Fix to the skill / standard |
|---|---|---|
| 1 | Self-scoring in the same pass → false greens (worst in PL) | The Voice-Gap-Test must be run by a **separate, adversarial critic** (fresh agent, told to *fail* the copy), or treated as advisory only with the **human read as the real gate**. Stop reporting "all MATCHED" from self-scoring as if it were a pass. |
| 2 | Repetition sweep is word-level; no IA gate | Add a **structural pass**: "does each section earn its place? can sections merge? is the page too long?" Cap the number of persuasion sections; force a merge when two sections share a message (not just a phrase). |
| 3 | No claim-logic recheck after structural change | When a frame is removed (e.g. comparisons), **re-verify every dependent claim** ("taniej niż co?"). Add to the whole-page pass. |
| 4 | Ban-list is lexical only | Add a **native-fluency pass** distinct from the ban-list: read each line as *"would a Pole say this out loud?"* — flag calques ("Pomagam Ci mieć"), tautologies, dangling fragments, filler adjectives ("profesjonalny"). |
| 5 | No cross-section fact/claim consistency check | Consistency gate against the facts sheet **and against other sections** (fixed pricing vs "ustalamy cenę"). |
| 6 | The language hypothesis (owner's) | Partly true: PL raises the floor for 4 above and makes 1 more dangerous (no native ear to self-fail). Mitigation: the adversarial critic + native-fluency pass should be run **in PL with an explicitly skeptical, native-reader persona**, not a translated English rubric. |

## Owner additions / corrections

_(to fill in during the session — what I missed, what I got wrong, what matters most)_

-
