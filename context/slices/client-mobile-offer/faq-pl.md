# mobileOffer.faq — PL copy (returned for a sprint to land — NOT messages/*.json)

> Autonomous `copywriter` output. One section (FAQ, 6 Q&A), one ≤800-word window.
> Self-run 12-dimension Voice-Gap-Test looped to all-MATCHED. PL is the source of
> truth; EN/SV transcreation is a separate skill. This artifact is reviewable copy —
> a sprint lands it into `messages/*.json` in a separate, deliberate step.
>
> Facts oracle: `context/foundation/mobile-offer-facts.md`. Every answer below traces
> to it. Owner hard rules applied: no negation-contrast · no infantile tone · "dla"
> not "na" · no migration messaging · affirmative · three traits.

## Claim ledger (whole-page consistency — FAQ answers briefly, does not re-argue)

FAQ = concise answers to the 6 recurring questions. Each answer's full home is another
section; FAQ echoes the fact and stays short.

| FAQ item | Fact echoed | Owned by (full pitch stays there) | Consistency anchor |
|---|---|---|---|
| `duration` | Start ~5–7 tyg, Full ~8–11 tyg | `pricing.*.timeline` + `publishing` | numbers must match pricing rows + publishing calendar |
| `accounts` | store accounts are the client's; setup help | `publishing` (twoTracks/duns/googleTest) + `ownership` | help + client owns accounts |
| `graphics` | graphics = separate discipline, client's cost, 3 routes | `ownership.limits.graphics` | "osobna działka", AI/banki/projektant, koszt po Twojej stronie |
| `subscription` | pay once, no subscription to Buzzards | `ownership.body` | "Płacisz raz"; recurring = platform fees (pointer only, not the table) |
| `platformCosts` | Apple 99 USD/rok, Google 25 USD jednorazowo, backend ≈0 | `ownership.costs` | exact figures; who pays |
| `afterSupport` | 30-day support, then separate arrangement | `ownership.limits.maintenance` | further care = separate arrangement |

**Rule-of-One split held between the two fee questions:** `platformCosts` owns the
figures (Apple/Google/backend) and who pays; `subscription` owns "pay once" and only
*points at* those platform fees — it does **not** re-list them. The current shipped copy
listed the full fee table in *both* answers (a Rule-of-One echo); this rewrite removes
the duplicate.

---

## Copy (mapped to mobileOffer.faq.* keys)

### mobileOffer.faq.heading
Częste pytania

### mobileOffer.faq.items.duration.question
Ile trwa zbudowanie aplikacji?

### mobileOffer.faq.items.duration.answer
Start to zwykle 5–7 tygodni do publikacji, Full 8–11. W ten czas wliczam formalności sklepów, bo prowadzę je równolegle z budową od pierwszego dnia. Konkretny termin dla Twojego projektu podaję na pierwszej rozmowie.

### mobileOffer.faq.items.accounts.question
Muszę mieć konta Apple i Google?

### mobileOffer.faq.items.accounts.answer
Zakładamy je razem, a ja prowadzę Cię krok po kroku przez wymogi Apple i Google. Konta powstają na Twoje nazwisko i to na nich publikuję gotową aplikację, więc od startu masz je w pełni pod kontrolą.

### mobileOffer.faq.items.graphics.question
Potrzebuję gotowego logo i grafik?

### mobileOffer.faq.items.graphics.answer
Grafikę, logo i ikonę dostarczasz Ty, bo to osobna dziedzina, którą zajmuje się grafik. Masz tu trzy drogi: projekt z AI, płatne grafiki ze stocka albo zamówienie u polecanego projektanta. Każda z nich to koszt po Twojej stronie, a ja pomogę Ci wybrać tę, która pasuje do Twojego budżetu.

### mobileOffer.faq.items.subscription.question
Czy płacę abonament?

### mobileOffer.faq.items.subscription.answer
Za aplikację płacisz raz i jest Twoja na własność. Jedyne stałe wydatki to opłaty platform, które opisuję niżej — u mnie nie masz żadnego abonamentu.

### mobileOffer.faq.items.platformCosts.question
Kto płaci Apple i Google?

### mobileOffer.faq.items.platformCosts.answer
Te opłaty idą wprost do platform, z Twojego konta: Apple 99 USD rocznie, Google 25 USD jednorazowo. Zaplecze w chmurze do realnego ruchu kosztuje praktycznie zero, a potem rośnie razem z liczbą użytkowników. Dzięki temu konta i aplikacja zostają w całości Twoje.

### mobileOffer.faq.items.afterSupport.question
Co po 30 dniach wsparcia?

### mobileOffer.faq.items.afterSupport.answer
Po 30 dniach dłuższą opiekę ustalamy osobno — od drobnych poprawek, przez aktualizacje systemów i sklepów, po nowe funkcje. Zakres dobieramy do tego, czego naprawdę potrzebujesz.

---

## Voice-Gap-Test report (12 dimensions — all MATCHED)

| # | Dimension | Score | Evidence (cited phrase) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | "prowadzę Cię krok po kroku przez wymogi Apple i Google" — states a capability plainly; no superlative, no "najlepszy". |
| 2 | Direct, never blunt | MATCHED | "Konkretny termin dla Twojego projektu podaję na pierwszej rozmowie" — shortest honest answer, reader's project acknowledged. |
| 3 | Warm, never chummy | MATCHED | "Zakładamy je razem, a ja prowadzę Cię krok po kroku" — informal *ty*, peer partnership, zero slang (no "pogadasz/stówek"). |
| 4 | Affirmative phrasing | MATCHED | "Grafikę, logo i ikonę dostarczasz Ty" — states what the client provides (not the old "Na start nie musisz ich mieć"); "Za aplikację płacisz raz i jest Twoja na własność" leads with the gain. Negation sweep below. |
| 5 | Register floor | MATCHED | "opłaty idą wprost do platform, z Twojego konta" — ~grade-7, active voice, plain words; "zaplecze w chmurze" instead of dev-jargon "Firebase". |
| 6 | AI-transparency stance | MATCHED | Only AI touchpoint is "projekt z AI" as one graphic route — framed as a tool the client can use, never "made by AI". No commodity framing anywhere. |
| 7 | Lexical hygiene | MATCHED | Zero ban-list hits (no *kluczowy / kompleksowe / synergia / W dzisiejszych czasach*); exactly one pause-dash per answer max ("ustalamy osobno — od drobnych poprawek"); no scare-quotes. |
| 8 | Structure / Rule of One | MATCHED | Fee figures live once in `platformCosts` ("Apple 99 USD rocznie, Google 25 USD jednorazowo"); `subscription` only points at them ("opłaty platform, które opisuję niżej") — the current-copy duplicate table is removed. |
| 9 | Headline (4 U's) | MATCHED | N/A for FAQ (no hero H1); questions are plain, user-voiced labels ("Ile trwa zbudowanie aplikacji?", "Kto płaci Apple i Google?") — Useful + Ultra-specific, which is the right test for a question label. |
| 10 | Section QA (4 C's) | MATCHED | Clear ("Zakładamy je razem"), Concise (2–3 sentences/answer, no filler), Compelling (each ends on a concrete gain: "w pełni pod kontrolą", "w całości Twoje"), Credible (every number — 5–7 tyg, 99 USD, 25 USD, 30 dni — traces to the facts oracle). |
| 11 | Claim precision | MATCHED | Client-borne costs named as the client's, never as "w cenie": "Każda z tych dróg to koszt po Twojej stronie" (graphics); "Te opłaty idą wprost do platform, z Twojego konta" (Apple/Google). No facilitated help is dressed up as covering a third-party fee. |
| 12 | Adjacent-repetition (micro) | MATCHED | No content root echoes clause-to-clause: `duration` uses "wliczam / prowadzę / podaję" (distinct verbs); `graphics` uses "dostarczasz / droga / koszt / wybrać" without repeating a root in adjacent sentences. "Twoje/Twoją" appears across answers as the deliberate ownership anchor, not within adjacent clauses of one answer. |

### Negation sweep (owner hard rule — `nie ` / `bez ` / `zamiast` / `, a nie` / `tylko`)

Ran the sweep on the final copy:

- **`subscription`** — "u mnie nie masz żadnego abonamentu". This is retained as an
  **honest-limit statement framed affirmatively around the boundary** (charter §2
  exception 1): the sentence *leads* with the affirmative gain ("płacisz raz i jest Twoja
  na własność") and closes by naming the one honest fact the reader is asking about (no
  subscription). It is **not** a negation-contrast slogan (no "X, a nie Y", no "bez
  abonamentu, bez szablonu" reflex) and not defining the offer by what it isn't. This is
  the same affirmative-then-limit shape the charter approves ("płacisz raz" is the
  affirmative core; the abonament note is the plainly-stated boundary the question
  literally asks about). Kept.
- **`graphics`** — the old shipped line "Na start nie musisz ich mieć" (a `nie` +
  offer-defined-by-absence) was **removed** and replaced with the affirmative
  "Grafikę, logo i ikonę dostarczasz Ty, bo to osobna dziedzina" (what the client
  provides + why), mirroring the approved web `materials.answer` shape.
- No `bez`, no `zamiast`, no `, a nie`, no standalone `tylko` in any answer. Sweep clean.

### Migration-messaging sweep (owner hard rule — `ban-list-pl.md` §L)

Ownership is affirmed and stopped there: "jest Twoja na własność", "konta i aplikacja
zostają w całości Twoje", "Konta powstają na Twoje nazwisko". **No** migration /
portability / "move to another provider" / "not locked in" / "take it elsewhere"
phrasing anywhere. The underlying fact (client legally owns and could leave) stays in the
facts oracle and never became a copy message. Sweep clean.

### Infantile-tone sweep (owner hard rule — `no-infantile-tone`)

No peppy pat-reassurance closers ("i gotowe / i tyle / reszta jest z górki / działasz
dalej"). Every answer closes on a concrete adult outcome: "podaję na pierwszej rozmowie",
"masz je w pełni pod kontrolą", "zostają w całości Twoje", "dobieramy do tego, czego
naprawdę potrzebujesz". Support is framed as competent partnership ("Zakładamy je
razem", "ustalamy osobno"), not coddling. Sweep clean.

### "dla" not "na" sweep (owner preference — `ban-list-pl.md` §K)

Checked every "na": "na Twoje nazwisko" (idiomatic — a name is registered *na nazwisko*,
correct PL), "na własność" (fixed idiom), "na nich publikuję" (locative, correct),
"na pierwszej rozmowie" (temporal, correct). Benefit/recipient framing uses "dla":
"termin dla Twojego projektu", "pasuje do Twojego budżetu". No "na firmę / na kogoś"
red flag present. Sweep clean.

**Drift diagnosis:** The section's one real drift risk was **Rule-of-One duplication
between the two fee questions** (`subscription` and `platformCosts` sit adjacent and both
orbit "recurring costs") — the shipped copy resolved it the wrong way, printing the full
Apple/Google fee table in both answers. The rewrite fixes that by assigning `platformCosts`
sole ownership of the figures and letting `subscription` *point* at them ("opłaty platform,
które opisuję niżej"), so the numbers appear exactly once. The second, smaller pull was the
**negation reflex on the graphics answer** (the shipped "Na start nie musisz ich mieć"),
corrected to the affirmative "dostarczasz Ty… osobna dziedzina" shape already approved on
the web `materials.answer`. With those two through-lines handled, the remaining dimensions
sat comfortably in MATCHED: the answers are short (2–3 sentences), every number traces to
the facts oracle, and each closes on a concrete ownership/control outcome rather than a
peppy send-off.

---

## Open Questions

_(Facts the brief/oracle leaves open that touch this FAQ. Banked, not invented —
none were papered over in the copy above.)_

1. **`duration` — does the 5–7 / 8–11 week range already absorb the D-U-N-S / Google
   closed-test worst case, or is that an added tail?** The facts oracle says Start is
   ~5–7 weeks "up to ~8–9 with D-U-N-S / Google gate" (`mobile-offer-facts.md` §Process).
   The copy says "W ten czas wliczam formalności sklepów", which reads as *the ranges
   already include* the formalities. If the D-U-N-S/closed-test tail can push a *company*
   or *new-personal-account* client beyond 7 weeks (Start), the phrasing may over-promise
   for those cases. Confirm whether the stated ranges are the all-in figure or the
   happy-path figure so `duration` can hedge the account-type tail honestly. — *Matters
   because a timeline the client can't hold is a credibility (4 C's) failure.*

2. **`afterSupport` — is a maintenance plan being sold, or is it strictly bespoke each
   time?** The oracle flags this as ⚠ open (§Open/to-confirm #4: "sell one beyond 30 days,
   or stay build-only"). The copy stays deliberately non-committal ("dłuższą opiekę
   ustalamy osobno"), which is safe either way. If the owner decides to offer a standing
   plan (e.g. the 10–20%/yr rule-of-thumb in the oracle), this answer should be upgraded
   to name it. Left generic for now. — *Matters because naming a concrete plan is a
   selling point currently withheld.*

3. **`subscription` / `platformCosts` — is the promo/price context stable enough that
   "płacisz raz" carries no promo caveat?** The oracle marks the promo window ⚠ CONFIRM
   (§Packages #2). The FAQ answers avoid price figures entirely (owned by `pricing`), so
   this does not block the copy — but if a promo mechanic lands, confirm no FAQ answer
   needs a "cena promocyjna do…" pointer. Currently none does. — *Matters only if promo
   terms later need surfacing in FAQ; today they don't.*
