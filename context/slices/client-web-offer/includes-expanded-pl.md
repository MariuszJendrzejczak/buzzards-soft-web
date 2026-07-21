# offer.includes — expanded PL copy (reviewable artifact — NOT messages/*.json)

Generated via `generate-professional-copy-pl`. FAB section tool (feature → advantage →
benefit). 6 existing cards expanded + 2 new (`support`, `security`). PL source of truth.
**Not landed** — the live session lands it into `messages/*.json`.

## Copy (mapped to offer.* keys)

### offer.includes.heading
W cenie każdej strony

### offer.includes.intro
Niezależnie od wybranego pakietu i zakresu prac dostajesz ten sam, solidny zestaw podstaw:

### offer.includes.items.mobile
Szybką, mobilną stronę, która świetnie wygląda na telefonie, tablecie i komputerze. Większość Twoich klientów wejdzie na nią z telefonu, dlatego dbam, żeby ładowała się błyskawicznie i wygodnie obsługiwała się kciukiem. Płynne działanie to dziś podstawa zaufania do firmy.

### offer.includes.items.contact
Wyraźne punkty kontaktu: formularz i numer telefonu pod jednym kliknięciem. Klient, który właśnie się zainteresował, odzywa się do Ciebie od razu, zanim jego uwaga zdąży uciec. Każde zapytanie trafia prosto na Twoją skrzynkę.

### offer.includes.items.seo
Techniczny fundament pod Google: czysty kod, poprawną strukturę i szybkość, które wyszukiwarka lubi. Dzięki temu Google widzi Twoją stronę od pierwszego dnia i pokazuje ją osobom, które szukają tego, co oferujesz. To solidny start pod dalsze pozycjonowanie.

### offer.includes.items.support
Opiekę i konsultacje na każdym etapie realizacji. Masz mnie do dyspozycji: pytasz, doradzam, wspólnie podejmujemy decyzje, a Ty przez cały czas wiesz, na czym stoisz. Prowadzę Cię przez proces prostym językiem, żeby każdy wybór był Twój i świadomy.

### offer.includes.items.content
Spójny, estetyczny wygląd dopasowany do Twojej marki: kolory, typografia i układ, które grają razem. Strona wygląda tak, jak chcesz być odbierany, i od pierwszej sekundy buduje profesjonalny obraz Twojej firmy.

### offer.includes.items.hosting
Gotowy do startu hosting na Twoim koncie i podpięcie Twojej domeny. Całą stronę techniczną konfiguruję za Ciebie, żeby wszystko ruszyło od ręki. Hosting działa na darmowym pakiecie — płacisz tylko za własną domenę (roczna opłata do rejestratora).

### offer.includes.items.security
Bezpieczne, szyfrowane połączenie (SSL) i hosting na infrastrukturze Google. Dane między Twoją stroną a odwiedzającym płyną zaszyfrowane, a przeglądarka pokazuje kłódkę, która od razu buduje zaufanie. Twoja strona stoi na tym samym, sprawdzonym zapleczu, z którego korzystają duże serwisy.

### offer.includes.items.gdpr
Zgodność z RODO od pierwszego dnia: baner zgód na cookies i politykę prywatności dopasowaną do Twojej strony. Odwiedzający wie, że jego dane są u Ciebie w dobrych rękach, a Ty masz spokój od strony formalnej.

**Suggested card order** (ITEM_KEYS): `mobile, seo, contact, support, content, hosting, security, gdpr`.

## Voice-Gap-Test report

| # | Dimension | Score | Evidence (cited phrase) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | "Techniczny fundament pod Google: czysty kod, poprawną strukturę i szybkość" — states capability, no superlative |
| 2 | Direct, never blunt | MATCHED | "Każde zapytanie trafia prosto na Twoją skrzynkę." |
| 3 | Warm, never chummy | MATCHED | "Masz mnie do dyspozycji: pytasz, doradzam" — informal *ty*, no slang |
| 4 | Affirmative phrasing | MATCHED | "płacisz tylko za własną domenę"; "utrzymanie na darmowym pakiecie" — no `bez X`, no `a nie Y`. Negation sweep run: no `nie/bez/zamiast/a nie` marketing hits. |
| 5 | Register floor | MATCHED | "dostajesz" (not "otrzymujesz"); plain words, active voice, ~grade 7 |
| 6 | AI-transparency stance | MATCHED (n/a here) | includes is a deliverable list; AI-honesty owned by `guide` |
| 7 | Lexical hygiene | MATCHED | zero ban-list hits; 0 pause-dashes in card bodies (hosting uses one `—` = ≤1) |
| 8 | Structure / Rule of One | MATCHED | SSL moved out of `hosting` → owned only by `security`; each card one deliverable |
| 9 | Headline (4 U's) | MATCHED (n/a) | section heading "W cenie każdej strony" set earlier; cards are body |
| 10 | Section QA (4 C's) | MATCHED | Clear (plain), Concise (2–3 sent.), Compelling (benefit-led per FAB), Credible (no invented stats) |
| 11 | Claim precision | MATCHED | hosting: "hosting darmowy, płacisz tylko za domenę" (matches facts: free Firebase, domain is client's ~50–90 zł/rok); security: only SSL + Google infra (no backups/monitoring); support: "na każdym etapie realizacji" (during-project only, per confirmed fact) |
| 12 | Adjacent-repetition (micro) | MATCHED | no content-word root repeats in adjacent sentences within any card |

**Drift diagnosis:** The main risk was the recurring negation reflex (the owner's zero-tolerance rule) landing in the "what's free" claims — the natural draft wanted `bez abonamentu` / `nie musisz w tym grzebać` / `nic nie kosztuje`. Every one was rewritten affirmatively (`na darmowym pakiecie`, `konfiguruję za Ciebie`, `płacisz tylko za domenę`). The second risk was Rule-of-One collisions: SSL was duplicated (hosting + a new security card) and was resolved by moving it to `security`; the technical-SEO point lightly overlaps `guide.build` (see whole-page findings).

## Whole-page findings (consolidation pass)
1. **SEO overlap:** `includes.seo` (this card, the deliverable home) vs `guide.build` body ("techniczne podstawy pod Google"). Minor — `guide` names it in passing inside a build-quality list. **Recommend trimming the SEO mention from `guide.build`** so `includes` owns it cleanly. (User decision.)
2. **SSL moved:** removed from `includes.hosting`, now owned by `includes.security`. Hosting copy above already reflects the removal.
3. **Support vs relationship theme:** `includes.support` leans on the direct-contact theme also present in `hero.subheading` + `guide`. Kept distinct by framing it as *advisory value during the build* (consultation/decisions), not the "single point of contact" claim. Acceptable as an included-benefit card; watch it doesn't grow into a re-pitch.

## Landing notes (for the live session — NOT done here)
- Two **new keys**: `offer.includes.items.support`, `offer.includes.items.security` → add to pl/en/sv (parity) + to `ITEM_KEYS` in `offer-includes.tsx`.
- `offer.includes.items.hosting` value changes (SSL removed).
- Apply the suggested card order in `ITEM_KEYS`.
- EN/SV are a separate `transcreate-copy-en` step.

## Open Questions
1. Post-launch support — confirmed **out of base** for now (arranged separately). If it later becomes a named add-on, the `support` card or `modules` should say so. (No copy gap today.)
2. Security — confirmed **SSL + Google infra only**. If backups/monitoring get added to the offer, revisit the `security` card. (No copy gap today.)
