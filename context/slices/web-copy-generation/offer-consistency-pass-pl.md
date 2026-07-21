# Offer page — PL consistency pass (reviewable artifact — NOT `messages/*.json`)

> A **coherence re-pass** over the *currently shipped* `offer.*` copy in
> `messages/pl.json` (2026-07-19), requested by the owner ("przejrzyj jeszcze raz to,
> co jest w web-pages-offer; przeanalizuj i zaproponuj spójny copywriting"). Governed
> by the shared copy-standard contracts in `~/.claude/copy-standard/` and the facts
> oracle `context/foundation/offer-facts.md` (four `⚠ CONFIRM` items resolved with the
> owner today — see that file's revision log).
>
> This is **not** a rewrite from scratch — the shipped StoryBrand copy is sound and
> mostly all-MATCHED. It fixes four **consistency** defects that crept in after the
> Phase-3 sign-off (`offer-rewrite-pl.md` stays untouched as the Phase-3 record). Only
> the 14 changed leaves are listed; every other `offer.*` leaf is kept verbatim.
>
> **Reviewable artifact only.** Landing into `messages/pl.json` + EN/SV transcreation
> (`transcreate-copy-en`) are separate downstream steps.

---

## Why this pass exists — the four consistency defects found

1. **Em-dash cadence — the strongest PL AI-tell (`ban-list-pl.md` §E), page-wide.**
   The shipped page leans on one repeated rhythm — *"… — a …"* — across ~12 leaves.
   Per section most sit at the ≤1 limit, but `problem` carried **two** pause-dashes
   (`heading` + `mineBody`), and the *cumulative* cadence across the whole page reads
   like a generator. Fix: convert pause-dashes to commas / colons / periods. En-dash
   **ranges** (*4–5 tys.*, *50–90 zł*) are correct and kept.

2. **`problem.mineBody` drifted from the approved artifact.** Shipped tail
   *"— a zostaje Twoja, bez abonamentu"* reintroduced (a) a **negation-first** frame
   (*bez abonamentu*) against charter §2, and (b) a **Rule-of-One** echo — ownership +
   "no subscription" both belong to `ownership` (*płacisz raz*), not the third-way
   card. Restored to a single named ownership touch (*"którą dostajesz na własność"*).

3. **Triad density (`ban-list-pl.md` §D — max one conscious triad per page).** Two
   rhythmic triads shipped: *"jakość, decyzje i odpowiedzialność"* (`guide.body2`) and
   the anaphora *"ten sam człowiek, te same narzędzia, te same etapy sprawdzania"*
   (`proof.body`). Kept the **proof anaphora** (it genuinely earns its rhythm as
   proof); dissolved the `guide` triad.

4. **Two facts now confirmed → sharper claims.** Hosting is a **free Firebase package
   on the client's own account** → `includes.hosting` can say *"na Twoim koncie"*,
   reinforcing ownership. The **+150 zł module is business email** (domain config is
   already in the base) → `modules.domainEmail` renamed so it no longer implies domain
   config costs extra (claim precision, dimension 11).

---

## Proposed copy — only the changed leaves (before → after)

### `offer.hero.subheading`
- **Before:** Pracuję z AI, więc dostajesz gotową stronę szybciej i taniej — a nad każdym krokiem czuwa człowiek, który odpowiada za jakość i prowadzi Cię aż do publikacji.
- **After:** Pracuję z AI, więc dostajesz gotową stronę szybciej i taniej. Nad każdym krokiem czuwa człowiek, który odpowiada za jakość i prowadzi Cię aż do publikacji.
- *Why:* pause-dash → sentence split. Meaning identical, cadence de-generatored.

### `offer.problem.heading`
- **Before:** Dziś masz dwie drogi do strony — a każda ma swój koszt.
- **After:** Dziś masz dwie drogi do strony, a każda ma swój koszt.
- *Why:* pause-dash → comma; the light rhythm survives.

### `offer.problem.mineBody`
- **Before:** Strona zaprojektowana pod Twoją firmę przez człowieka, w cenie bliższej generatorowi niż agencji — a zostaje Twoja, bez abonamentu.
- **After:** Strona zaprojektowana pod Twoją firmę przez człowieka, w cenie bliższej generatorowi niż agencji, którą dostajesz na własność.
- *Why:* removes the *bez abonamentu* negation + the Rule-of-One double-load; keeps one
  named ownership touch (the allowed hero→ownership bookend). Restores the Phase-3 line.

### `offer.guide.heading`
- **Before:** Pracuję z AI i mówię o tym wprost — bo dzięki temu wychodzisz do przodu.
- **After:** Pracuję z AI i mówię o tym wprost, bo dzięki temu wychodzisz do przodu.
- *Why:* pause-dash → comma.

### `offer.guide.body2`
- **Before:** To jednak coś więcej niż wpisanie „napisz mi stronę” do ChatGPT. Prowadzę własny proces z wyspecjalizowanymi narzędziami i etapami sprawdzania, więc to, co dostajesz, trzyma standard. AI daje prędkość i niższą cenę. Ja daję jakość, decyzje i odpowiedzialność — bo na każdym kroku wie, co robi, człowiek.
- **After:** To jednak coś więcej niż wpisanie „napisz mi stronę” do ChatGPT. Prowadzę własny proces z wyspecjalizowanymi narzędziami i etapami sprawdzania, więc to, co dostajesz, trzyma standard. AI daje prędkość i niższą cenę. Ja daję jakość i biorę odpowiedzialność. Na każdym kroku wie, co robi, człowiek.
- *Why:* dissolves the *"jakość, decyzje i odpowiedzialność"* triad (§D), drops the
  pause-dash, and keeps the warm inverted closer as its own short sentence. The AI/Ja
  parallel and the single deliberate ChatGPT contrast (charter §2 case 2) are intact.

### `offer.guide.proofSuffix`
- **Before:** — i na tym samym torze powstała ta strona.
- **After:** Na tym samym torze powstała ta strona.
- *Why:* drops the leading pause-dash. Renders cleanly after the `/#warsztat` link
  (component concat is `{proofPrefix} {link} {proofSuffix}` — verified in
  `components/sections/offer/offer-guide.tsx`), now as its own sentence.

### `offer.includes.items.mobile`
- **Before:** Szybka strona, która działa na każdym telefonie — a stamtąd wejdzie większość Twoich klientów.
- **After:** Szybka strona, która działa na każdym telefonie, a większość Twoich klientów wejdzie właśnie stamtąd.
- *Why:* pause-dash → comma; slight reorder so the benefit lands last.

### `offer.includes.items.hosting`
- **Before:** Darmowy hosting, konfiguracja domeny i certyfikat SSL — wszystko gotowe do startu.
- **After:** Darmowy hosting na Twoim koncie, konfiguracja domeny i certyfikat SSL, wszystko gotowe do startu.
- *Why:* pause-dash → comma **and** folds in the confirmed fact (free hosting on the
  client's own account) — which quietly reinforces the ownership story without
  re-pitching it. "Firebase" deliberately kept out (dev jargon; it lives in the facts).

### `offer.proof.body`
- **Before:** Ta strona, którą właśnie czytasz, powstała dokładnie w procesie, który sprzedaję — ten sam człowiek, te same narzędzia, te same etapy sprawdzania. Chcesz zajrzeć głębiej? Cały warsztat opisuję krok po kroku.
- **After:** Ta strona, którą właśnie czytasz, powstała dokładnie w procesie, który sprzedaję: ten sam człowiek, te same narzędzia, te same etapy sprawdzania. Chcesz zajrzeć głębiej? Cały warsztat opisuję krok po kroku.
- *Why:* pause-dash → **colon** (the ban-list's own recommended fix — a colon naturally
  introduces the enumerated proof). This anaphora is the **one** conscious triad kept
  on the page.

### `offer.ownership.body`
- **Before:** Domena, hosting, kod, treści i konta zapisuję na Twoje nazwisko i Twoje konta. Płacisz raz — jedyny stały koszt to Twoja własna domena (około 50–90 zł rocznie, którą opłacasz rejestratorowi). Gdybyś kiedyś chciał przejść do kogoś innego, zabierasz całość i działasz dalej.
- **After:** Domena, hosting, kod, treści i konta zapisuję na Twoje nazwisko i Twoje konta. Płacisz raz. Jedyny stały koszt to Twoja własna domena (około 50–90 zł rocznie, którą opłacasz rejestratorowi). Gdybyś kiedyś chciał przejść do kogoś innego, zabierasz całość i działasz dalej.
- *Why:* pause-dash → sentence split (the standalone *"Płacisz raz."* actually hits
  harder). En-dash range kept. This section stays the owner of *płacisz raz*.

### `offer.ownership.limits.seo.body`
- **Before:** Stałych kampanii pozycjonujących ani gwarancji pierwszego miejsca w Google nie prowadzę — to osobna, ciągła usługa, którą uczciwie wskażę, komu zlecić.
- **After:** Stałych kampanii pozycjonujących ani gwarancji pierwszego miejsca w Google nie prowadzę. To osobna, ciągła usługa, którą uczciwie wskażę, komu zlecić.
- *Why:* pause-dash → period. The honest-limit framing (charter §2 case 1) is unchanged.

### `offer.faq.items.texts.answer`
- **Before:** Nie musisz. Mogę je przygotować i sprawdzić na podstawie krótkiej rozmowy. Masz własne? Tym lepiej — wtedy je dopracuję.
- **After:** Nie musisz. Mogę je przygotować i sprawdzić na podstawie krótkiej rozmowy. Masz własne? Tym lepiej, wtedy je dopracuję.
- *Why:* pause-dash → comma.

### `offer.faq.items.logo.answer`
- **Before:** Grafika to nie moja działka — jestem programistą, nie grafikiem, więc logo i zdjęcia nie wchodzą w budowę strony. Nie zostawiam Cię jednak z tym samego: podpowiem, jak zdobyć dobre. Masz trzy drogi: projekt z AI, płatne zdjęcia stockowe albo polecony grafik. Każda z nich to koszt po Twojej stronie, a ja pomogę Ci wybrać tę, która pasuje do Twojego budżetu.
- **After:** Grafika to nie moja działka. Jestem programistą, nie grafikiem, więc logo i zdjęcia nie wchodzą w budowę strony. Nie zostawiam Cię jednak z tym samego: podpowiem, jak zdobyć dobre. Masz trzy drogi: projekt z AI, płatne zdjęcia stockowe albo polecony grafik. Każda z nich to koszt po Twojej stronie, a ja pomogę Ci wybrać tę, która pasuje do Twojego budżetu.
- *Why:* pause-dash → period. The *"trzy drogi: A, B albo C"* is a real enumerated list
  (colon-introduced), not a rhythmic triad — kept.

### `offer.modules.items.domainEmail.name`
- **Before:** Konfiguracja domeny i firmowej poczty
- **After:** Firmowa poczta na Twojej domenie
- *Why:* the +150 zł buys **business email**; domain configuration is already in the
  base (confirmed 2026-07-19). The old name implied domain config costs extra — a
  claim-precision defect (dimension 11). Price *+150 zł* unchanged.

---

## Whole-page sweeps (the page is the unit of quality)

### Em-dash sweep (`ban-list-pl.md` §E)
After this pass, **zero pause-dashes remain** in the offer copy (the page had a
recognizable over-use, so near-zero is the right correction, not merely ≤1/section).
Only **en-dash ranges** stay, which are correct: `problem.agencyBody` *4–5 tys.*;
`ownership.body` / `faq.monthly` / `faq.domain` *50–90 zł*. ✓ clean.

### Triad sweep (`ban-list-pl.md` §D)
Exactly **one** conscious triad remains page-wide: the `proof.body` anaphora *"ten sam
człowiek, te same narzędzia, te same etapy sprawdzania"*. `guide.body2`'s triad
dissolved. `faq.logo`'s "trzy drogi" is an enumerated option list, not a rhythmic
triad. ✓ within limit.

### Rule-of-One sweep (`voice-gap-test.md`)
The Phase-3 claim ledger holds after the `problem.mineBody` fix — no selling point is
re-pitched:
- **you own it / na własność** → owned by `ownership`; named once in `hero` (headline)
  and once in `problem.mineBody` (restored). No third re-pitch.
- **płacisz raz / no subscription** → owned by `ownership`; the stray *bez abonamentu*
  removed from `problem`. `faq.monthly` restates it once as a direct objection answer.
- **human-led AI / verified process** → owned by `guide`; only *named* in `problem` /
  `plan` / `proof`. Unchanged.
✓ clean.

### Claim-precision sweep (dimension 11, against `offer-facts.md`)
- *"Darmowy hosting na Twoim koncie"* — true (free Firebase package on the client's
  account). ✓
- *"Firmowa poczta na Twojej domenie" +150 zł* — true; base already covers domain
  config, so no reader can assume domain config costs +150. ✓
- Domain fee still correctly disclosed as the client's cost in `faq.domain` /
  `faq.monthly` / `ownership.body`. Unchanged. ✓
- Promo *"do końca sierpnia"* and timeline *"kilka dni–2 tygodnie"* confirmed current. ✓

### One-primary-CTA
*Wyceń swoją stronę* → the `quote` form remains the single primary CTA; *Zobacz, jak
pracuję* stays a soft secondary. Unchanged. ✓

---

## Voice-Gap-Test — focused on the changed spans

The 14 edits are hygiene/consistency fixes on already-passing sections, so the
rubric is run on the changed spans (the untouched leaves keep their Phase-3
all-MATCHED scores in `offer-rewrite-pl.md`).

| # | Dimension | Score | Evidence (post-edit) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | *"Ja daję jakość i biorę odpowiedzialność."* — capability stated, no superlative. |
| 2 | Direct, never blunt | MATCHED | *"Grafika to nie moja działka. Jestem programistą, nie grafikiem…"* — boundary stated plainly, then help offered; human not stripped out. |
| 3 | Warm, never chummy | MATCHED | *"Tym lepiej, wtedy je dopracuję."* — informal *ty*, warm, no slang. |
| 4 | Affirmative phrasing | MATCHED | `problem.mineBody` now ends affirmatively *"którą dostajesz na własność"* (the *bez abonamentu* negation removed). |
| 5 | Register floor | MATCHED | Active, plain, ~grade-7; *"Darmowy hosting na Twoim koncie"* stays jargon-free (Firebase kept in facts only). |
| 6 | AI-transparency stance | MATCHED | `guide.body2` keeps *"AI daje prędkość i niższą cenę. Ja daję jakość…"* — expertise-with-a-tool + accountable human. |
| 7 | Lexical hygiene | MATCHED | **Zero pause-dashes** page-wide; one conscious triad (`proof` anaphora); en-dash used only for ranges; no scare-quotes; no *"To nie X, to Y"*. |
| 8 | Structure / Rule of One | MATCHED | `problem.mineBody` de-loaded; ownership + *płacisz raz* owned once by `ownership` (see sweep). |
| 9 | Headline (4 U's) | MATCHED | Headlines unchanged (hero/guide/problem still hit ≥3 U's per Phase-3). |
| 10 | Section QA (4 C's) | MATCHED | Clear·Concise·Compelling·Credible — every changed claim traces to `offer-facts.md`. |
| 11 | Claim precision | MATCHED | *"Firmowa poczta na Twojej domenie"* + *"Darmowy hosting na Twoim koncie"* both literally true (see claim-precision sweep). |

**Drift diagnosis:** the shipped page had a single through-line defect — a
**punctuation-and-rhythm reflex** (the *"… — a …"* pause-dash plus a couple of
rule-of-three triads) that reads as generator cadence even though every sentence is
individually true and in-voice. It was compounded in one spot (`problem.mineBody`) by
a Rule-of-One + negation slip that re-loaded the ownership pitch. The fix is almost
entirely subtractive: replace the dashes with ordinary PL punctuation, keep one triad,
and restore the single owned ownership touch. Nothing about voice, structure, or facts
needed re-inventing — the copy was 90% there; this pass makes the *whole page* read as
one hand rather than a machine's default cadence.

---

## Open Questions

None. The four facts the copy asserts (promo end date, hosting model, timeline,
domain/email module boundary) were resolved with the owner on 2026-07-19 and written
into `context/foundation/offer-facts.md` (see its revision log).

---

## Handoff

- **Scope:** 14 changed `offer.*` leaves; all other leaves kept verbatim from the
  shipped `messages/pl.json`.
- **This is a reviewable artifact — NOT `messages/*.json`.** Landing is a separate step:
  apply the 14 PL edits to `messages/pl.json`, then re-transcreate the corresponding
  EN/SV leaves via `transcreate-copy-en` so the i18n parity test stays green (EN/SV must
  change in the same commit).
- `offer-rewrite-pl.md` (Phase-3 record) is intentionally left untouched.
