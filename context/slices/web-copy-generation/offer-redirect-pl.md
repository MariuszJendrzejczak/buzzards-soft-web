# Offer page — PL rewrite v2 (owner re-brief: concrete, affirmative, no slogans)

> A **directional rewrite** of the shipped `offer.*` copy, driven by the owner's live
> re-brief (2026-07-19, round 2). Supersedes the relevant parts of
> `offer-consistency-pass-pl.md` (round 1 — punctuation/hygiene) where they overlap.
> Governed by `~/.claude/copy-standard/*` and the facts oracle
> `context/foundation/offer-facts.md`.
>
> **Reviewable artifact — NOT `messages/*.json`.** Landing (PL edits + EN/SV
> transcreation to keep i18n parity green + component/namespace changes) is a separate
> step. FAQ is intentionally **out of scope** here (owner will evaluate it separately).

## The re-brief (what changed in the direction)

The owner rejected the selling-by-contrast, slogan-led register. New rules for this page:

1. **No competitor marketing.** Drop the agency / generator / „trzecia droga" framing
   entirely (also: *„trzecia droga"* is a politically loaded term in PL — banned). The
   ex-`problem` section becomes an affirmative "what this offer is and why".
2. **No catchy slogans, no pompous lines.** Cut *„Strona jest Twoja, na własność"*,
   *„Najlepszy dowód masz przed oczami"*, *„Za to biorę odpowiedzialność"*. State things
   plainly.
3. **Minimise negation** harder than v1 — no *„nie płać stawek agencyjnych"*, no *„coś
   więcej niż »napisz mi stronę« w ChatGPT"*.
4. **Concrete and fuller, not laconic.** One sentence per card/step reads as a brush-off;
   give each 2–3 substantive sentences.
5. **No repetition / irritating interjections** — kill the recurring *„sprawdzane moim
   procesem"* and parenthetical asides.
6. **Facts:** hosting = *we configure a free hosting on the client's own account* (we do
   not provide hosting ourselves); swap the "texts prepared" item for a **design-fit**
   item (design under your guidelines + preferred colours).
7. **AI transparency** moves into "how I work" as a short, plain note + `/#warsztat`
   link; the standalone proof section is cut.

**Standard conflict (corrections-as-data).** Points 1–2 contradict locked IP: the
framework-spine mandates an SB7 "villain" section, and `concept.md` uses the "third way"
positioning. The live owner instruction wins. Follow-up: fold this back into the standard
(ban *„trzecia droga"* + loaded terms, strengthen the anti-slogan / anti-pompous / anti-
interjection rules, downgrade the mandatory villain section). Proposed, not yet applied.

---

## Revised copy (changed sections only)

### `offer.hero.heading` — de-sloganed (point 1, round 3)

Profesjonalna strona zaprojektowana pod Twoją firmę

> Removes the *„którą dostajesz na własność"* tail — ownership belongs to the `ownership`
> section, not the H1. Pinned key path `offer.hero.heading` preserved; the value is read
> dynamically by the route smoke spec, so no test edit is needed. Alt if you want the
> audience angle: *„Profesjonalna strona zaprojektowana pod Twoją firmę i Twoich klientów"*.

### `offer.hero.subheading` — longer, concrete, no echo of the H1 (point 1)

Wspólnie ustalamy układ, treści i kolorystykę pod to, czym się zajmujesz i do kogo mówisz. Dostajesz szybką, mobilną stronę z formularzem kontaktowym i technicznym fundamentem pod Google, gotową do publikacji na Twoim koncie. Płacisz za nią raz.

---

### `offer.*` ex-`problem` → affirmative "what the offer is" (points 2 + 3)

Group renamed `problem` → **`offer`**; the three competitor cards become three concrete
pillars. No agencies, no generators, no „trzecia droga".

**`offer.heading`**
Strona zaprojektowana i zbudowana pod Twoją firmę

**`offer.pillar1.title`** — Zaprojektowana pod Ciebie
**`offer.pillar1.body`**
Zaczynam od tego, czym się zajmujesz i kogo chcesz przyciągnąć. Układ, treści i kolorystykę dobieram pod Twoją firmę, żeby strona od pierwszego wejścia wyglądała jak Twoja i mówiła językiem Twoich klientów.

**`offer.pillar2.title`** — Jasna cena i termin
**`offer.pillar2.body`**
Zanim zaczniemy, znasz cenę i wiesz, kiedy strona będzie gotowa: zwykle od kilku dni do około dwóch tygodni. Cena jest jedna, ustalona na starcie, i tego się trzymamy.

**`offer.pillar3.title`** — Jeden kontakt od początku do końca
**`offer.pillar3.body`**
Od pierwszej rozmowy po publikację rozmawiasz z jedną osobą, ze mną. Wiesz, na jakim etapie jest strona i do kogo się zwrócić, kiedy będziesz czegoś potrzebować.

---

### `offer.guide` — "jak pracuję" + AI note + link (points 3 + 5 + 7)

**`offer.guide.heading`**
Jak pracuję nad Twoją stroną

**`offer.guide.body1`**
Wiem, po co Ci strona: chcesz wyglądać wiarygodnie i łatwo dać się znaleźć. Dlatego pilnuję, żeby była czytelna, szybka i prowadziła klienta prosto do kontaktu z Tobą.

**`offer.guide.body2`**
Pracuję z AI i mówię o tym otwarcie. Dzięki temu robię szybciej i taniej. Narzędzia przyspieszają pracę, ale to ja decyduję, jak strona wygląda i działa, i to ja odpowiadam za efekt.

**`offer.guide.proofPrefix`**
Cały swój proces opisuję krok po kroku.
**`offer.guide.proofLink`**
Zobacz, jak pracuję →
**`offer.guide.proofSuffix`**
Tę stronę zbudowałem dokładnie tak samo.

> Renders as: „Cały swój proces opisuję krok po kroku. [Zobacz, jak pracuję →] Tę stronę
> zbudowałem dokładnie tak samo." — the short AI disclaimer + `/#warsztat` link the owner
> asked for, without the „najlepszy dowód" slogan. Old `offer.proof.*` group is **cut**.

---

### `offer.plan` — fuller steps (point 4)

**`offer.plan.heading`**
Trzy kroki od rozmowy do gotowej strony

**`offer.plan.step1.title`** — Rozmowa
**`offer.plan.step1.body`**
Zaczynamy od zwykłej rozmowy: opowiadasz, czym się zajmujesz, kto jest Twoim klientem i czego oczekujesz od strony. Zbieram materiały, które już masz, i podpowiadam, co jeszcze się przyda. Rozmawiasz przy tym ze mną bezpośrednio.

**`offer.plan.step2.title`** — Projekt i treści
**`offer.plan.step2.body`**
Przygotowuję układ strony, treści i wygląd dopasowany do Twojej firmy oraz kolorystyki, którą lubisz. Pokazuję Ci gotowy projekt do akceptacji i nanoszę Twoje uwagi w rundach poprawek, aż będzie tak, jak chcesz.

**`offer.plan.step3.title`** — Publikacja
**`offer.plan.step3.body`**
Konfiguruję darmowy hosting na Twoim koncie, podpinam Twoją domenę i publikuję gotową stronę. Od tego dnia strona działa pod Twoim adresem, a Ty masz pełny dostęp do wszystkich kont.

---

### `offer.includes` — hosting fixed, texts → design (point 6)

**`offer.includes.heading`** — To dostajesz w każdej stronie *(unchanged)*

**`offer.includes.items.mobile`**
Szybką, mobilną stronę, która dobrze wygląda na telefonie i na komputerze, a większość Twoich klientów otworzy ją właśnie na telefonie.

**`offer.includes.items.contact`**
Formularz kontaktowy i telefon pod jednym kliknięciem, żeby klient mógł odezwać się od razu.

**`offer.includes.items.seo`**
Techniczny fundament SEO, dzięki któremu Google widzi Twoją stronę od pierwszego dnia.

**`offer.includes.items.hosting`** *(fact-corrected)*
Konfigurację darmowego hostingu na Twoim koncie, podpięcie Twojej domeny i certyfikat SSL, wszystko gotowe do startu.

**`offer.includes.items.gdpr`**
Zgodność z RODO: baner cookies i politykę prywatności.

**`offer.includes.items.design`** *(replaces `items.content`)*
Wygląd projektowany pod Twoje wytyczne i ulubioną kolorystykę, żeby strona od razu pasowała do Twojej marki.

---

### `offer.pricing` — de-cluttered labels (point 7)

Table content/numbers unchanged. Copy fixes only:

- **`offer.pricing.rowLabels.aiContent`**: ~~Teksty z AI, sprawdzone moim procesem~~ →
  **Teksty przygotowane pod Twoją firmę** *(kills the „sprawdzane moim procesem" repeat)*
- Everything else (`heading`, `promoNote`, `footnote`, tiers, prices, revisions) unchanged.

> The *visual* "brzydko / nieczytelne" complaint about the pricing table is a **design**
> task, not copy — route it through `design-web` (table legibility/layout). This pass only
> removes the copy repetition + interjection.

---

### `offer.modules` — kept (owner: OK), one rename

- **`offer.modules.items.domainEmail.name`**: ~~Konfiguracja domeny i firmowej poczty~~ →
  **Firmowa poczta na Twojej domenie** *(price +150 zł unchanged; domain config is in the
  base, so the name must not imply it costs extra — confirmed 2026-07-19).*

---

### `offer.ownership` — plain, no slogan / no pompous heading (point 9)

**`offer.ownership.heading`**: ~~Strona jest Twoja, na własność~~ → **Co dostajesz, pracując ze mną**

**`offer.ownership.body`**
Kod, treści, konta i konfigurację zapisuję na Ciebie i na Twoje konta. Za stronę płacisz raz. Jedyny stały koszt to Twoja domena, około 50–90 zł rocznie, którą opłacasz rejestratorowi. Gdybyś kiedyś chciał przenieść stronę gdzie indziej, zabierasz wszystko i działasz dalej.

**`offer.ownership.limitsHeading`**: ~~Za to biorę odpowiedzialność — i mówię, gdzie są granice~~ → **Czego oferta nie obejmuje**

**`offer.ownership.limits.seo.lead`**
Buduję solidny fundament techniczny pod SEO i widoczność w Google.
**`offer.ownership.limits.seo.body`**
Stałych kampanii pozycjonujących ani gwarancji pierwszego miejsca nie prowadzę. To osobna, ciągła usługa, którą uczciwie wskażę, komu zlecić.

**`offer.ownership.limits.commerce.lead`**
Sklepy, złożone integracje i systemy CRM robię w wycenie indywidualnej.
**`offer.ownership.limits.commerce.body`**
Nie mieszczą się w pakiecie Basic ani Full, więc wyceniam je osobno, pod konkretny projekt.

---

## Not touched here

- **`offer.faq.*`** — owner evaluates separately.
- **`offer.quote.*`**, **`offer.meta.*`**, **chrome**, **`offer.modules` data** — not
  criticised; kept as shipped.
- **`offer.hero.heading`** — kept (pinned H1, not criticised).

---

## Page-level sweeps

**Affirmative / negation (charter §2 — the owner's #1 gripe).** The whole comparative,
negation-led layer is gone: no agency/generator bashing, no *„nie płać…"*, no *„coś więcej
niż ChatGPT"*. Remaining negatives are only honest limits (`ownership.limits`, charter §2
case 1), each framed after an affirmative lead.

**Slogans / pompousness.** Removed: *„na własność"* (as a section slogan), *„Najlepszy
dowód…"*, *„Za to biorę odpowiedzialność"*, *„trzecia droga"*. Headings are now plain and
descriptive.

**Repetition (Rule of One).** *„sprawdzane moim procesem"* removed from `pricing` and
`includes` (texts item dropped). Claim ownership after the rewrite:
- bespoke/design → `offer.pillar1` (+ named in `plan.step2`, `includes.design`)
- price/time clarity → `offer.pillar2` (+ the `pricing` table)
- single accountable person / AI+process → `offer.guide`
- what you own / pay once / limits → `offer.ownership`
- feature baseline → `offer.includes`
No point is re-pitched; hero previews then sections pay off (allowed bookend).

**Em-dash (§E) / triads (§D).** Zero pause-dashes introduced (colons/commas/periods
only); en-dash kept for the *50–90 zł* range. No rhythmic triads added.

**Claim precision (dim 11).** Hosting now says *„konfigurację darmowego hostingu na Twoim
koncie"* (we configure, on your account — accurate). `includes.design` and the module
rename carry no false inclusion. All traces to `offer-facts.md`.

## Voice-Gap-Test — focused on the at-risk dimensions

Given the brief, the load-bearing dimensions are 3 (warmth without slogans), 4
(affirmative), 5 (register/plain, no pompousness), 8 (Rule of One), 10 (4 C's), 11 (claim
precision). Spot-check:

| Dim | Score | Evidence |
|---|---|---|
| 3 Warm, not chummy | MATCHED | *„Rozmawiasz przy tym ze mną bezpośrednio."* — warm, plain, no slang. |
| 4 Affirmative | MATCHED | ex-`problem` states the offer positively; only honest-limit negatives remain (`ownership`). |
| 5 Register / no pompousness | MATCHED | plain descriptive headings (*„Co dostajesz, pracując ze mną"*, *„Czego oferta nie obejmuje"*); slogans/pompous lines gone. |
| 6 AI stance | MATCHED | *„Pracuję z AI i mówię o tym otwarcie… to ja decyduję… to ja odpowiadam za efekt."* — expertise-with-a-tool. |
| 8 Rule of One | MATCHED | claim ledger above — each point owned once. |
| 10 4 C's | MATCHED | fuller cards/steps (2–3 sentences), concrete, no filler. |
| 11 Claim precision | MATCHED | hosting-config claim accurate; module rename accurate. |

**Drift diagnosis:** v1 still sold the page the way the standard told it to — through a
competitor contrast and a few memorable slogans. The owner's read is that for a trust-led
local buyer that register *reduces* trust: the comparison feels like marketing and the
slogans feel like a pitch. This rewrite removes the entire persuasion-by-contrast layer
and replaces slogans with plain descriptions of what the offer is and what the buyer gets,
trading rhetorical punch for concrete substance — which is exactly the trade the brief asks
for.

## Open Questions

None blocking. One optional: whether to also soften `hero.heading`'s *„którą dostajesz na
własność"* tail for full consistency with point 9 (kept as-is for now).

## Handoff / landing notes (separate step)

- **Namespace changes** (need a `namespace-contract.md` revision + i18n parity across
  pl/en/sv in one commit): group `problem` → `offer` with `pillar1/2/3.{title,body}`;
  `includes.items.content` → `includes.items.design`; **remove** the `proof.*` group
  (merged into `guide`). No pinned test touches these (`hero.heading`, `quote.*` are the
  pins) — safe.
- **Component changes:** `offer-problem.tsx` (retitle/restructure to 3 pillars, rename),
  delete the proof section render, `offer-includes` content→design item.
- **EN/SV:** re-transcreate every changed/renamed leaf via `transcreate-copy-en`.
- **Design (separate skill):** pricing-table legibility via `design-web`.
- **Standard update (corrections-as-data):** ban „trzecia droga"/loaded terms + strengthen
  anti-slogan/anti-pompous rules in the charter/ban-list.
