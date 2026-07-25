# Główny hero (recruiter-facing) — PL copy (reviewable artifact — NOT messages/*.json)

## ✅ LOCKED — final copy to land (owner-approved P1 + owner edit, this session)

### hero.headingLead
`Samodzielny, kompletny developer `

### hero.headingHighlight
`z własnym workflow agentowym`

### hero.headingTrail
` — dostarczam end-to-end.`

### hero.sub
Zanim przyszła era AI, tworzyłem komercyjne aplikacje mobilne we Flutterze i Unity. Dziś,
dzięki narzędziom generatywnym, dodałem do tego stacku strony i aplikacje internetowe.
Prowadzę projekt od pomysłu po wdrożenie, dostosowując się do wymagań, jakie stawia projekt
czy klient.

> Also at landing:
> - badge `hero.badges.web`: „Web Fullstack Developer" → „Fullstack Developer".
> - EN + SV need transcreation (`transcreate-copy-en`) so all three locales match (i18n parity).
> - Owner edit: „i dostosowuję się" → imiesłów „dostosowując się" (+ required comma after „wdrożenie").

---

> Odświeżenie catch-phrase głównego hero (`hero.*` w `messages/pl.json`, ~linie 95–114).
> Audytorium: rekruterzy / zleceniodawcy (żargon techniczny = atut). Standard obowiązuje:
> trzy cechy głosu, afirmatywność ([[no-negation-marketing]]), higiena leksykalna,
> substance floor, pitch twierdzi — nie tłumaczy się ([[pitch-asserts-portfolio-proves]]).
>
> **Oparte na `research.md`** (ta sama teczka) + decyzjach ownera z tej sesji:
> - **Oś hooka = METODA jako wyróżnik** (agentowy warsztat prowadzony przez inżyniera).
> - **Hero = elevation, krótko.** Łuk ewolucji (mobile → AI-native fullstack) i szczegóły
>   idą do sekcji „o mnie", nie tu. Twardy dowód → portfolio / `/#warsztat` (`ctaSecondary`).
> - Konkret podany jako **fakt, pewnie** (research: konkret = wiarygodność) — nie jako
>   obronne tłumaczenie.
>
> **Zakres:** `headingLead` + `headingHighlight` + `headingTrail` + `sub`.
> `badges` / `badgeSub` / `trust.*` / CTA — bez zmian.

---

## Copy — FINAŁ (owner-locked): AI rozszerzyło mój stack (mobile → web fullstack)

Oparte na dwóch decyzjach ownera (ta sesja): web = **frontend + backend na własnych
projektach** (fullstack trafny jako capability); rama = **AI-enabled stack expansion**
(honest: mobile zawodowo, web własne projekty; `research.md` Revision 2026-07-25,
[[web-is-personal-mobile-is-commercial]]).

### hero.headingLead
`Zawodowo buduję aplikacje mobilne, a z agentami AI `

### hero.headingHighlight
`rozszerzyłem swój stack o web`

### hero.headingTrail
`.`

> **Zawodowo buduję aplikacje mobilne, a z agentami AI** <span brand>**rozszerzyłem swój
> stack o web**</span>**.**
> Hook = elewacja jako fakt: AI → mój stack obejmuje teraz web. Nie „używam AI" (meta), tylko
> konkretny skutek. „Zawodowo … mobilne" oddaje komercyjny rdzeń; web dookreśla `sub`.

### hero.sub
To frontend i backend w Next.js, TypeScript i Firebase, we własnych projektach — jak ta
strona. Agenty przyspieszają wykonanie, a decyzje i jakość biorę na siebie.

> - **Honest (dim 11):** „we własnych projektach — jak ta strona" jasno oddziela web (własne)
>   od mobile (zawodowo). Nie ma claimu komercyjnego webu.
> - **Konkret:** nazwany web-stack (Next.js/TS/Firebase, front+back) to NOWA informacja (nie
>   ma jej w badge/trust) → uzupełnia, nie powtarza.
> - **Human-led + elevuje mnie:** kończy na „decyzje i jakość biorę na siebie" (o mnie, nie
>   ogłoszenie dostępności). Ask niesie `ctaPrimary`.

---

## Copy — ALT (prostszy czasownik, ten sam hook)

Jeśli „orkiestrując" brzmi zbyt buzzword — plaśniejsze „prowadząc":

### hero.headingLead
`Buduję software, `

### hero.headingHighlight
`prowadząc własne agenty AI`

### hero.headingTrail
`.`

> **Buduję software,** <span brand>**prowadząc własne agenty AI**</span>**.**
> `sub` — jak w PRIMARY.

---

## Voice-Gap-Test report — PRIMARY (heading + sub jako jedna jednostka)

| # | Wymiar | Ocena | Dowód (cytat) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | „orkiestrując własne agenty AI" — metoda/zdolność bez superlatywu; pokrycie w toolchainie (`sub`) |
| 2 | Direct, never blunt | MATCHED | „jako jeden inżynier prowadzę całość od kodu po gotowy produkt" — najkrótsze, konkretne stwierdzenie zakresu |
| 3 | Warm, never chummy | MATCHED | 1. os., zwykły rejestr; zero slangu w rodzaju „dowozi" |
| 4 | Affirmative phrasing | MATCHED | sweep negacji czysty (brak `nie`/`bez`/`zamiast`/`a nie`/`tylko`) |
| 5 | Register floor (recruiter) | MATCHED | strona czynna; żargon celowy („orkiestrować agenty", „Claude Code", „hooki", „skille") — atut dla rekrutera |
| 6 | AI-transparency (ekspert z narzędziem) | MATCHED | „decyzje i jakość trzymam po swojej stronie" + „własne agenty" (to ja dyryguję) — nie „made by AI" |
| 7 | Lexical hygiene | MATCHED | brak `kluczowy`/triad/scare-quotes; **0** myślników w H1, **1** w `sub` |
| 8 | Structure / Rule of One | MATCHED | jedna idea (metoda-wyróżnik); tożsamość w `badges`, łuk w „o mnie", dowód w portfolio |
| 9 | Headline (4 U's) | MATCHED | Useful/Unique/Ultra-specific — „własne agenty AI" + toolchain w `sub`; nie „używam AI" |
| 10 | Section QA (4 C's) | MATCHED | Clear/Concise(bez wypełniacza)/Compelling/Credible |
| 11 | Claim precision | MATCHED | Claude Code + własna konfiguracja/hooki/skille, agenty codziennie — wszystko już na stronie; zero wymyślonych liczb |
| 12 | Adjacent-repetition (micro) | MATCHED | „agenty AI" tylko w H1; `sub` nie powtarza „agent" (Claude Code / warsztat); „software" 1× |
| 13 | Substance floor | MATCHED | hero=elevation → `sub` 2 zdania z konkretem (dokładny toolchain + kontrola + zakres end-to-end); szczegóły świadomie oddane do „o mnie" (research §8) |

**Drift diagnosis:** Poprzednie drafty zgrzytały, bo osuwały się w **abstrakcję**
(„podnosi poziom", „przesuwam sufit", „więcej i szerzej") — a research pokazał, że pusto
brzmiący pitch to właśnie abstrakcja bez konkretu. Tu hook stoi na **konkretnej metodzie**
(„orkiestrując własne agenty AI"), a `sub` domyka ją **faktem, nie argumentacją** (nazwany
toolchain), zgodnie z rozstrzygnięciem napięcia „nie tłumacz się ≠ bądź ogólny"
(`research.md` §8). Hero celowo lekki — łuk i szczegóły należą do „o mnie".

## Open Questions
1. **Rejestr czasownika:** „orkiestrując" (senior-sygnał, precyzyjny termin agent
   orchestration) vs „prowadząc" (plaśniejsze). PRIMARY vs ALT — Twój wybór.

---

## Trail (odrzucone w tej sesji, wg kolejności)
- „dowozi" → „dostarcza/dostarczyć".
- ALT „podnosi poziom" / „przesuwam sufit" → flow slogana.
- „biorę na siebie więcej i schodzę głębiej" → abstrakcja bez konkretu.
- narracja ewolucji w hero → przeniesiona do sekcji „o mnie" (owner: „tu elevation, tam
  szczegóły"); hero odchudzone do metody-wyróżnika, na bazie `research.md`.

> **To artefakt do recenzji.** Nie zapisuję `messages/*.json` — landing PL i EN/SV
> (`transcreate-copy-en`) to osobne kroki. Wskaż PRIMARY lub ALT (albo popraw słowo), a
> wtedy ląduję.
