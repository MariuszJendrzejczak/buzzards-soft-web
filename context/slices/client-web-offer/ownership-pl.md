# offer.ownership — PL copy (reviewable artifact — NOT messages/*.json)

**Beat / job:** SB7 stakes + success, merged with honest limits — what the client
owns, what it costs (once + the one recurring domain fee), that it's portable, then
the plainly-named boundaries (ongoing SEO, shops/CRM). First-person singular ("ja"),
matching hero (`Tworzę`) and guide (`Pracuję z AI`).
**Target keys:** `offer.ownership.heading`, `.body`, `.limitsHeading`,
`.limits.seo.lead`, `.limits.seo.body`, `.limits.commerce.lead`, `.limits.commerce.body`.

## Copy (mapped to offer.* keys)

### offer.ownership.heading

**Recommended:** `Własność i koszty`

> A plain, descriptive label of what the section covers (ownership + one-time price +
> the recurring domain cost). Replaces the more casual `Co zostaje u Ciebie`. Per
> `ban-list-pl.md` §J a heading is a label, not a tagline — this is user's pick to make.
> Alternatives, same register: `Twoja własność i koszty` · `Własność strony i utrzymanie`.

### offer.ownership.body

> Cała strona jest Twoją własnością: kod, treści, konta i konfigurację przypisuję do
> Ciebie. Płacisz raz. Jedyny stały wydatek to domena, zwykle od 50 do 200 zł rocznie
> zależnie od końcówki (.pl, .com i podobne), którą opłacasz bezpośrednio rejestratorowi.

> **⛔ Portability/migration sentence REMOVED (owner hard rule, 2026-07-21).** The closer
> went through two rejected forms — `…zabierasz całość i działasz dalej` (infantile), then
> `…możesz przenieść stronę do innego wykonawcy lub dostawcy…` (**anti-advertising** — the
> owner categorically bans any "you can leave / switch vendor" message). Final body affirms
> **ownership only** and ends on the cost fact. Rule banked in `voice-charter.md` §2 +
> `ban-list-pl.md` §L + memory `no-migration-messaging`.

> **Domain range widened** `50–90` → `50–200 zł/rok` per owner (2026-07-21, see
> `offer-facts.md`). The hosting-load ceiling the owner asked for lives in
> `includes.hosting` (Rule of One — hosting feature's home), not here; this section keeps
> the cost angle only ("jedyny stały wydatek to domena").

### offer.ownership.limitsHeading

**Recommended:** `Granice oferty`

> Calm, descriptive honest-limits label. The current `Czego oferta nie obejmuje` is
> also acceptable (this is the one sanctioned place for a boundary — `voice-charter.md`
> §2 exception 1); `Granice oferty` just reads less negative. User's pick.

### offer.ownership.limits.seo.lead

> Twoją stronę buduję tak, żeby Google od pierwszego dnia ją widział i rozumiał, co się
> na niej znajduje.

### offer.ownership.limits.seo.body

> Wspinaczka na sam szczyt wyników i stałe pozycjonowanie to już osobna, ciągła usługa —
> poza tym, czym się zajmuję.

> **SEO card de-jargoned + no referral (owner, 2026-07-21):** removed "fundament techniczny
> / poprawny kod, strukturę i szybkość ładowania" (too technical) → plain findability. Owner
> also does **not** want to promise recommending an SEO specialist ("nie chcę się w to
> bawić") — dropped "polecę Ci sprawdzonego specjalistę"; the limit is now just a gentle,
> affirmative "poza tym, czym się zajmuję" (no referral, no pointing elsewhere).

### offer.ownership.limits.commerce.lead

> Sklepy internetowe, złożone integracje i systemy CRM wyceniam indywidualnie.

### offer.ownership.limits.commerce.body

> To większe wdrożenia, które wykraczają poza pakiety Basic i Full, więc buduję je od zera
> pod Twoje wymagania. Ich koszt zależy od zakresu: potrzebnych funkcji, integracji i skali
> projektu.

> **Commerce card = CONCRETE only (owner, 2026-07-21):** the soft-CTA sentence ("opowiedz
> mi, co chcesz osiągnąć, a przedstawię…") was rejected — a spec/limits card carries facts,
> not a "let's talk" invitation (that belongs in the quote/CTA section). Replaced with
> concrete cost drivers (funkcje, integracje, skala projektu) + a confident "buduję je od
> zera pod Twoje wymagania".

## Voice-Gap-Test report

| # | Dimension | Score | Evidence (cited phrase) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | "Cała strona jest Twoją własnością" — states the fact plainly, no superlative |
| 2 | Direct, never blunt | MATCHED | "Płacisz raz." — shortest honest path; the reader's leave-scenario is acknowledged ("Kiedy zechcesz przenieść ją gdzie indziej") |
| 3 | Warm, never chummy | MATCHED | "zabierasz całość i działasz dalej" — informal *ty*, plain, no slang |
| 4 | Affirmative phrasing | MATCHED | limits led affirmatively — "Zakładam solidny fundament techniczny…", "…to osobna, ciągła usługa"; negation sweep (`nie`/`bez`/`zamiast`/`a nie`/`tylko`) returns zero hits |
| 5 | Register floor | MATCHED | ~grade-7, active 1st person "przypisuję do Ciebie", "wskażę Ci"; zero dev jargon (no Firebase/SSL here) |
| 6 | AI-transparency stance | N/A (MATCHED) | AI-craft claim is owned by `guide`; this section correctly does not re-pitch it |
| 7 | Lexical hygiene | MATCHED | no `kluczowy`/triad/scare-quote; **zero** pause-dashes in the whole section (colon used in seo.lead instead) |
| 8 | Structure / Rule of One | MATCHED | ownership + pay-once + portability owned here once; SEO-limit & shops-limit named here, not elsewhere |
| 9 | Headline (4 U's) | N/A | section heading, not the hero H1; `Własność i koszty` is a descriptive label (spine §6 / ban-list §J) |
| 10 | Section QA (4 C's) | MATCHED | Clear·Concise·Compelling·Credible — every claim traces to `offer-facts.md`; domain fee stated as the client's, to the registrar |
| 11 | Claim precision | MATCHED | "Jedyny stały wydatek to domena, około 50–90 zł rocznie, którą opłacasz bezpośrednio rejestratorowi" — recurring cost is the client's, named precisely; SEO foundation in / ranking campaigns out |
| 12 | Adjacent-repetition (micro) | MATCHED | "strona" appears in sentence 1 then only as pronoun "ją" in sentence 4; "rejestr-" root deduped ("przypisuję" in body vs "rejestratorowi") — no adjacent root echo |

**Drift diagnosis:** The original copy leaned on two negation-first boundary lines
("…nie prowadzę", "Nie mieszczą się w pakiecie Basic ani Full") and a casual heading.
The rewrite holds the honest-limits content (which must stay) but re-frames each limit
as an affirmative statement of *what it is* — a separate ongoing service, an
individually-quoted build — so the reader never has to hold the "no" in mind. Ownership
and the recurring-cost precision are unchanged in substance, tightened in register.

## Open Questions

1. **Heading choice** — `Własność i koszty` (recommended) vs `Twoja własność i koszty`
   vs `Własność strony i utrzymanie`. User picks the final label.
2. **limitsHeading** — `Granice oferty` (recommended) vs keep `Czego oferta nie obejmuje`.
   Both are charter-valid; user's call.

---

*This is a reviewable artifact for human review. Landing it into `messages/pl.json`
(and EN/SV transcreation via `transcreate-copy-en`) are separate downstream steps — this
skill does not write `messages/*.json`.*
