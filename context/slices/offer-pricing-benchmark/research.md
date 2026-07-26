---
date: 2026-07-22 (Europe/Warsaw)
researcher: Claude (opus-4-8) for Mariusz
git_commit: ad420024697ce43328f7d14d5417b34590aa7c13
branch: feature/client-web-offer
repository: buzzards_soft_web
topic: "Is Basic (1299/999 zł) too low vs the PL market, and how to anchor toward Full"
tags: [research, pricing, offer, market-benchmark, anchoring, web-pages-offer]
status: complete
last_updated: 2026-07-25
last_updated_by: Claude (opus-4-8)
last_updated_note: "Follow-up (d) — per-module market benchmark: are the add-on module prices too low? + definition of 'śledzenie konwersji pod reklamy'"
---

# Research: Is Basic too low, and how to anchor toward Full?

**Date**: 2026-07-22 (Europe/Warsaw)
**Researcher**: Claude (opus-4-8) for Mariusz
**Git Commit**: ad420024697ce43328f7d14d5417b34590aa7c13
**Branch**: feature/client-web-offer
**Repository**: buzzards_soft_web

## Research Question

Czy cena pakietu **Basic** (base **1299 zł** / promo **999 zł**, netto) dla strony
wizytówki nie jest za niska względem rynku PL 2026 — i jak świadomie ustawić Basic
jako **kotwicę**, żeby klienci wybierali **Full**, bez rozdrabniania się na
niskomarżowe jednostronicówki. Zestawienie aktualnej oferty z czterema półkami
rynku: dół/masówka, solidni freelancerzy, agencje, model abonamentowy.

## Summary

**Krótko: tak — Basic na promo 999 zł jest za nisko, ale problem nie jest „cena vs
rynek", tylko „cena vs kotwica".** Dostarczasz produkt z półki solidnego freelancera
(custom, na własność, pełna baza techniczna: SSL, RODO, hosting, konfiguracja domeny),
a wyceniasz go jak szablon z kreatora. To uderza w oba Twoje cele naraz:

1. **Sygnał jakości.** Rynek freelancerski jednoznacznie: custom one-page = **2000–3500 zł
   netto**; **500–1500 zł to półka szablonowa** („jeden z tysięcy takich samych",
   treści klienta, ~1 runda). Na promo 999 zł Basic ląduje **w środku półki szablonowej**,
   choć nią nie jest.
2. **Mechanika kotwicy.** Dziś Basic→Full to skok promo **999 → 1999 = +100% (2×)**.
   „Podwojenie ceny" to realna decyzja budżetowa — **spycha wrażliwego cenowo klienta w dół,
   do Basic**, zamiast w górę, do Full. Żeby popychać do Full, trzeba **zwęzić różnicę
   procentową, a poszerzyć różnicę wartości**.

**Dobra wiadomość: oba problemy naprawia jeden ruch — podniesienie Basic przy Full bez
zmian.** To rzadki przypadek, gdzie „uczciwość rynkowa", „anti-rozdrabnianie" i „popychanie
do Full" wskazują ten sam kierunek.

**Rekomendacja (główna):** Basic **base 1590 / promo 1290 zł**, Full bez zmian
(2499/1999). Nowa różnica promo: **+709 zł (+55%)** za 2× podstrony, 2× rundy poprawek
i **+1050 zł modułów w cenie** — to czyni Full oczywistym wyborem, jednocześnie wynosząc
Basic ponad półkę szablonową (baza >1500 zł = sygnał „custom, nie kreator") i filtrując
klientów w górę.

## Market benchmark (PL 2026, wszystko netto)

### Drabina rynkowa — strona wizytówka / one-page

| Półka | Widełki (netto) | Co za to jest | Gdzie jesteś Ty |
|---|---|---|---|
| **Abonament / „strona za X/mies."** | ~50–400 zł/mies | **Nie jesteś właścicielem**; strona kasowana 14–30 dni po zaprzestaniu płatności; zwykle brak eksportu | — (inny model: „płacisz raz") |
| **Dół / masówka (szablon)** | **500–1500 zł** | Szablon Wix/WordPress, „jeden z tysięcy takich samych", treści klienta, ~1 runda, brak logo/SEO | ← **Basic promo 999 zł tu ląduje** |
| **Solidny freelancer (custom)** | **2000–3500 zł** | Custom, na własność, SSL/RODO/hosting, 1–2 rundy, faktura | ← tu **jest** produkt Basic (dostarczany), ale nie cena |
| **Agencja** | floor **2500–4500**, typ. **3000–7000** | Zespół, proces, PM, gwarancja, VAT | kotwica premium (nie Twoja półka) |
| **Duża agencja / software house** | **8000+** | Standardy korporacyjne, UX research, SLA | sufit rynku |

### Drabina rynkowa — mała strona firmowa (główna + 2–4 podstrony)

| Półka | Widełki (netto) | Gdzie jesteś Ty |
|---|---|---|
| **Solidny freelancer** | **2000–5000** (custom typ. 4000–6000) | ← **Full promo 1999 / base 2499 jest NA/PONIŻEJ floora** |
| **Agencja** | typ. **7000–15000** | — |
| **Duża agencja** | 15000–50000+ | — |

### Model abonamentowy — kluczowy różnicownik (nie cena do pobicia)

Rosnący w PL 2026 model „strona za 50–400 zł/mies". Sedno z wielu niezależnych źródeł
(leostrony.pl, 77media.pl, ajmer.pl + strony samych dostawców): **klient często NIGDY nie
jest właścicielem**, nie może wyeksportować strony, a **strona jest kasowana 14–30 dni po
zaprzestaniu płatności** (przepadają treści i pozycja w Google). Wariant „własność po
12–24 miesiącach" i tak kasuje stronę, jeśli klient przerwie wcześniej.

To **wzmacnia**, a nie osłabia, Twoją cenę Basic: Twoje „płacisz raz, strona jest Twoja"
to dokładnie ta luka zaufania, którą rynek zostawia otwartą. *(Rationale wewnętrzne, nie
copy — patrz Guardrails niżej: w tekście oferty ownership wyrażamy afirmatywnie, bez
kontrastu „w przeciwieństwie do…", zgodnie z [[no-negation-marketing]] i
[[no-migration-messaging]].)*

## Verdict: czy Basic jest za niski?

**Tak — o jedną półkę.** Dwa niezależne dowody:

- **Vs. dostarczana wartość:** deliverable Basic (custom, na własność, pełna baza
  techniczna) to produkt z półki **2000–3500 zł**. Na promo **999 zł** sprzedajesz go
  **~2–3× poniżej** jego własnej półki, na base **1299 zł** — na jej dolnej krawędzi.
- **Vs. strategia (rozdrabnianie):** 999 zł to dużo procesu (rozmowa, makieta na żywo,
  2 rundy, hosting/domena, RODO) za cienką marżę — i **przyciąga łowców okazji z półki
  500–1500 zł**, którzy nigdy nie kupią Full. Podbicie Basic filtruje pulę klientów w górę:
  dokładnie „nie rozdrabniać się".

**Ważne zastrzeżenie:** to NIE znaczy „gonić rynek w górę na siłę". Twój segment budżetowy
(mikrofirmy, które przed AI nie stać było na agencję) jest **świadomym wyborem** — patrz
`context/slices/web-copy-generation/market-research-offer.md` §C. Chodzi o to, by cena
**odzwierciedlała rzemiosło** (custom + na własność), a nie zjeżdżała do półki kreatorów.
AI = korzyść „szybciej/dostępniej", nie rabat.

## Anchor strategy: jak popychać do Full

### Dlaczego obecny układ osłabia Full

- Basic→Full: promo **999 → 1999 = +100%**; base **1299 → 2499 = +92%**.
- Psychologia: **„zapłać 2× więcej"** brzmi jak osobna decyzja budżetowa. Klient wrażliwy
  cenowo częściej **zostaje przy Basic** niż dopłaca. Kotwica działa wtedy w złą stronę.

### Zasada: zwęź różnicę procentową, poszerz różnicę wartości

Full już ma silny argument wartości: **+1050 zł modułów w cenie** (widoczność lokalna +
animacje + tryb jasny/ciemny) za **+1000 zł** ceny, plus 2× podstrony i 2× rundy. Problem
jest po stronie Basic — jest tak tani, że dopłata do Full wygląda na „drugie tyle".
**Podnosząc Basic, a trzymając Full**, zmieniasz komunikat na: *„za jakieś +50% masz
dwa razy więcej + moduły warte tyle, co dopłata"* — to klasyczny nudge w górę.

### Rekomendacja główna (A) — bezpieczna, dobrze uzasadniona

| | Teraz | Rekomendacja A |
|---|---|---|
| **Basic** | base 1299 / promo 999 | **base 1590 / promo 1290** |
| **Full** | base 2499 / promo 1999 | **bez zmian** |
| Różnica promo Basic→Full | +1000 (+100%) | **+709 (+55%)** |
| Różnica base Basic→Full | +1200 (+92%) | **+909 (+57%)** |

Dlaczego te liczby:
- **Base 1590 > 1500** → wychodzi ponad półkę szablonową; sygnał „custom, nie kreator".
- Ląduje na **wejściu w pasmo solidnego freelancera** (2000–3500) — nadal przystępny,
  spójny z narracją „z AI taniej/szybciej", ale już nie „jak szablon".
- **+55% do Full** za 2× wszystko + 1050 zł modułów = mocny, ale nie przytłaczający próg.
- Filtruje klientów w górę → mniej rozdrabniania.

### Wariant (B) — mocniej pchać do Full (agresywny)

- Basic **base 1690 / promo 1390**; Full bez zmian → różnica promo **+609 (+44%)**.
- Efekt: Full staje się jeszcze bardziej oczywisty; Basic zbliża się do roli **wabika**
  (istnieje, by Full wyglądał świetnie, niekoniecznie by go kupować).
- Ryzyko: tracisz część **czysto budżetowych** klientów one-page (uciekną do konkurencyjnego
  999). To akceptowalne — to jest właśnie pula „rozdrabniania", której nie chcesz.

### Czego NIE ruszać (i co dorzucić) — dźwignie prezentacji, nie ceny

Z priorów w `market-research-offer.md` §B/E — działają niezależnie od liczb i wspierają Full:
- **Badge „Najczęściej wybierany" na Full** → wzrost konwersji tej opcji ~25–35%. Tania,
  mocna dźwignia — zrobić niezależnie od decyzji cenowej.
- **Custom: floor „od X zł" + triggery** (sklep, integracje, CRM) → kotwiczy Full **w górę**
  (Full wygląda tanio obok „od X"), zamiast być ślepą uliczką.
- Widoczny **termin promo** + powód (masz „do końca sierpnia" — upewnić się, że jest
  wyrenderowany).

## Guardrails (twarde — z pamięci projektu i priorów)

- **Bez negacji / bez kontrastu** ([[no-negation-marketing]]): przewagę „płacisz raz / na
  własność" i matematykę TCO vs abonament trzymamy jako **rationale wewnętrzne**. W copy —
  tylko afirmatywne stwierdzenie własności, nigdy „w przeciwieństwie do dostawców, którzy Cię
  uwiężą".
- **Bez messagingu migracyjnego** ([[no-migration-messaging]]): żadnych podpowiedzi „możesz
  odejść / przenieść się od innego wykonawcy".
- **Access story, nie race-to-bottom** (`market-research-offer.md` §C): podniesienie Basic
  **wzmacnia** tę narrację — cena odzwierciedla rzemiosło, AI to korzyść czasowa, nie rabat.
- **Netto:** ceny w ofercie są netto (`pricing.footnote`). Jeśli jesteś nievatowcem,
  netto = brutto dla klienta; jeśli VAT — klient B2B dolicza 23% (zwykle i tak odlicza).
  Rynek freelancerski kwotuje netto, więc porównanie jest jak-do-jak.

## TCO framing (rationale wewnętrzne — do decyzji, nie do copy dosłownie)

Abonament 149 zł/mies × 24 mies = **3576 zł i zero własności**; Basic **1290 zł raz,
na własność**. To uzasadnia trzymanie realnej ceny Basic zamiast zjazdu do 999 — ale w
tekście wyrażamy to pozytywnie („jednorazowo, strona jest Twoja"), bez porównania.

## Code References

- `messages/pl.json:773-782` — `pricing.basic`: base 1299 / promo 999, „wizytówka", 2 rundy / 7 dni.
- `messages/pl.json:783-794` — `pricing.full`: base 2499 / promo 1999, główna + do 2 podstron,
  4 rundy / 14 dni, `extrasValue` „Osobno te moduły to +1050 zł".
- `messages/pl.json:795-802` — `pricing.custom`: „Wycena indywidualna" (brak floora — patrz rek. custom floor).
- `messages/pl.json:755-756` — `pricing.promoNote` / `footnote`: „do końca sierpnia", „Ceny netto".
- `messages/pl.json:808-852` — `modules.items`: cennik modułów (localVisibility +250, animations +400,
  themeToggle +400 → suma 1050, spójne z `full.extrasValue`).
- `messages/pl.json:855-868` — `ownership`: „Płacisz raz", własność, domena 50–200 zł/rok.
- `app/[locale]/web-pages-offer/page.tsx` — strona renderująca powyższe.
- **Parytet i18n:** każda zmiana liczb musi trafić do `messages/{pl,en,sv}.json` (test i18n-completeness).

## External Sources (live docs — market benchmark)

Wszystkie kwoty netto o ile nie zaznaczono; pełne cytaty w wynikach pod-agentów.

**Solidni freelancerzy (one-page 2000–3500 / firmowa 4000–6000):**
- [seomantyczny.pl — ceny 2026](https://seomantyczny.pl/ile-kosztuje-strona-internetowa-ceny-2026/) — freelancer: wizytówka **1000–3000**, landing **500–2000**, mała z blogiem/SEO **2000–5000**.
- [studiokreatywnychstron.pl — cennik](https://studiokreatywnychstron.pl/cennik/ile-kosztuje-strona-internetowa/) — wizytówka **1850**, firmowa 3–5 podstron **2970**, 6–9 podstron **3750**; 2 rundy, SSL, RODO w cenie.
- [varsite.pl](https://varsite.pl/blog/ile-kosztuje-strona-internetowa/) — custom landing **od 3500**, firmowa 5–10 stron **od 6000**.
- [webwavecms.com](https://webwavecms.com/blog/ile-kosztuje-strona-internetowa) (mar 2026) — freelancer one-page **1500–4000**, firmowa **3000–8000**; overall **2000–10000**.
- [tombrand.pl](https://tombrand.pl/cena-strony-internetowej-dla-malej-firmy/) — mała firmowa **2500–3500**, rozbudowana **4000–7500**.

**Agencje (wizytówka floor 2500–4500, typ. 3000–7000 / firmowa 7000–15000):**
- [webwavecms.com](https://webwavecms.com/blog/ile-kosztuje-strona-internetowa) — agencja wizytówka **3000–7000 netto**, firmowa (10 podstron) **7000–15000 netto**.
- [zdobywcysieci.pl](https://zdobywcysieci.pl/wiedza/ile-kosztuje-strona-internetowa/) (maj 2026) — wizytówka **2000–4000 netto**, firmowa **3000–8000 netto**.
- [avangardo.pl](https://avangardo.pl/tworzenie-stron-ile-kosztuje-strona-www/) (lip 2026) — wizytówka **~4500–6000**, firmowa **~5000–7500**.
- [growto.pl](https://growto.pl/blog/ile-kosztuje-strona-firmowa-2026) (maj 2026) — wizytówka rynek **3000–7000**; segmentacja: solo studio 3–15k, agencja 15–50k+, freelancer 0,5–8k.
- [thestory.is — cennik](https://thestory.is/pl/journal/koszt-strona-internetowa-cena-2020/) — freelancer **1500–5000**, lokalna agencja **3000–15000**, duża agencja/SH **10000–50000**.

**Dół/masówka (szablon 500–1500; floor 300–500):**
- [kasiaaleszczyk.pl](https://kasiaaleszczyk.pl/ile-kosztuje-strona-na-wordpressie/) — prosta wizytówka **300–500** (darmowy szablon, treści klienta); na płatnym szablonie **1000–1700**.
- [web-md.pl](https://web-md.pl/) — szablon = „jeden z tysięcy takich samych"; budżet = zmienione logo/kolory/tekst.
- [top1wsieci.pl](https://top1wsieci.pl/) / [directwebs.pl](https://directwebs.pl/) — szablon wizytówka **500–1500** / **990–1500** (WordPress, responsywność, proste SEO).

**Abonament (~50–400 zł/mies, brak własności do 12–24 mies / kasacja 14–30 dni):**
- [leostrony.pl](https://leostrony.pl/) — „Nigdy nie jesteś właścicielem… gdy przestajesz płacić, strona znika."
- [77media.pl](https://77media.pl/) — „dożywotni najemca"; „większość tanich kreatorów uniemożliwia eksport".
- Dostawcy: Arena Stron **199 netto/mies** (własność po 12 opłatach), Rimset **399 + 399 setup** (własność po 12), Strona Biznesu **369 netto/mies** (własność po 24 mies), cyber_Folks **49–99 netto/mies**.

**VAT / rozliczenie:**
- [prakreacja.pl — freelancer VAT](https://prakreacja.pl/freelancer-vat/) — web dev może korzystać ze *zwolnienia podmiotowego z VAT*; „kwota netto = kwota brutto" u nievatowca. (Limit *zwolnienia* — zweryfikować aktualną kwotę roczną w źródle 2026 przed użyciem w copy.)

## Architecture Insights

- **Trzy tiery + custom** to już dobra struktura kotwicy (Full wizualnie wyróżniony, wspólny
  blok „W cenie każdej strony"). Brakuje tylko: badge na Full i **floor na custom** — obie
  dźwignie kotwiczące Full, obie tanie, obie już zarekomendowane w priorze.
- **Moduły są wewnętrznie spójne** (`localVisibility 250 + animations 400 + themeToggle 400
  = 1050` = `full.extrasValue`). Zmiana ceny Basic/Full nie rusza tej spójności.
- **Parytet i18n** to twardy kontrakt: liczby żyją w `messages/{pl,en,sv}.json`, nie w kodzie —
  każda zmiana ceny to edycja trzech plików + test i18n-completeness (patrz `CLAUDE.md`).

## Historical Context (from prior changes)

- `context/slices/web-copy-generation/market-research-offer.md` — poprzedni research **copy/pozycjonowania**
  (nie cen). Kluczowe priory zbieżne z tą analizą: §C „AI = access story, nie race-to-bottom";
  §B/E „badge Najczęściej wybierany na Full (+25–35%)" i „custom floor + triggery kotwiczą Full";
  §A ownership afirmatywnie, bez migracji.
- `context/slices/client-web-offer/` (status `impl_reviewed`) — dom żywej oferty; jej pierwotny
  research zakładał „prosty landing 1000 zł net" — **ta analiza koryguje to założenie w górę** dla
  deliverable'u custom+na własność.
- `context/foundation/offer-facts.md` — hard-data facts sheet oferty (do zaktualizowania, jeśli
  ceny się zmienią).

## Related Research

- `context/slices/web-copy-generation/market-research-offer.md` — copy/positioning (komplementarny).

## Open Questions

1. **Decyzja cenowa:** wariant A (1590/1290, bezpieczny) czy B (1690/1390, mocniej pcha do Full)?
2. **Czy dotknąć Full?** Full (1999/2499) siedzi na/poniżej freelancerskiego floora firmowej
   strony — ma **zapas w górę**, ale jako produkt-cel jest celowo agresywnie wyceniony. Poza
   zakresem tej rundy (wybór: „benchmark + kotwica", nie „pełna rewizja cennika") — do osobnej decyzji.
3. **Status VAT** (vatowiec / nievatowiec) — determinuje realną cenę dla klienta i dobór słowa
   „netto" w copy. Do potwierdzenia po Twojej stronie.
4. **Aktualny limit zwolnienia z VAT 2026** — zweryfikować w źródle przed użyciem liczby gdziekolwiek.
5. Jeśli ceny się zmienią → aktualizacja `messages/{pl,en,sv}.json` + `offer-facts.md` + test i18n.

---

## Follow-up Research 2026-07-22 — Full analysis, scenariusz 1999/2999, luka CMS

Owner poprosił o: (1) analizę **Full** z twardym sufitem **≤ 2999 zł netto**, (2) przeliczenie
konkretnego scenariusza **Basic 1999 / Full 2999** (+ promki), (3) ocenę **luki CMS/self-edit**
— bo szablony i generatory zawsze pozwalają klientowi edytować samemu, a my ten moduł
wydzieliliśmy (+700 zł).

### 1. Full vs rynek + walidacja sufitu 2999

Full = strona główna + do 2 podstron + moduły warte osobno +1050 zł (widoczność lokalna,
animacje, tryb jasny/ciemny).

| Półka (mała strona firmowa, netto) | Widełki | Gdzie ląduje Full 2999 |
|---|---|---|
| Solidny freelancer | 2000–5000 (typ. custom 4000–6000) | **niskie-środkowe pasmo** — konkurencyjnie |
| Agencja | typ. 7000–15000 | **<½ floora agencyjnego** — mocna narracja „nie-agencyjna cena" |
| Duża agencja / SH | 15000–50000+ | — |

**Sufit 2999 jest dobrze wybrany.** Trzyma Full: (a) pod psychologiczną granicą 3000,
(b) wyraźnie poniżej floora agencyjnego, (c) w paśmie freelancerskim jako „jakość agencyjna
bez agencyjnej ceny". Rynek technicznie **dałby więcej** (Full mógłby iść w 3500–4000 i nadal
bić agencje), ale 2999 pasuje do świadomie przystępnego pozycjonowania. Nie ma powodu
przekraczać 2999 — zgoda z Twoim założeniem.

### 2. Scenariusz Basic 1999 / Full 2999 (+ promki)

**Propozycja liczb (w rodzinie „…99", spójna ze stylem cennika):**

| | base | promo (do końca sierpnia) | rabat |
|---|---|---|---|
| **Basic** | **1999 zł** | **1699 zł** | −15% |
| **Full** | **2999 zł** | **2499 zł** | −17% |

**Mechanika kotwicy:**
- Różnica base Basic→Full: **+1000 zł = +50%** (dziś +100%). Różnica promo: **+800 zł = +47%**.
  Spójnie ~+50% w obie strony — **wyraźnie lepszy nudge do Full** niż dzisiejsze podwojenie.
- Full nadal ma killer-argument: **+1050 zł modułów za +1000 zł dopłaty** → *„moduły w praktyce
  gratis, a podstrony i podwojone rundy w pakiecie"*. To jedna z najmocniejszych linii sprzedażowych
  całej oferty i **działa bez zmian przy 1999/2999**.

**Dopasowanie rynkowe:**
- **Basic 1999** ląduje **na dolnej krawędzi pasma solidnego freelancera** (custom one-page
  2000–3500). To już legalna cena za custom-wizytówkę na własność — **całkowicie wychodzi z półki
  szablonowej** (500–1500). Problem „sygnał = szablon" znika w pełni.
- **Full 2999** — jak wyżej, konkurencyjny, mocno pod agencjami.

**Nowa, ważna właściwość:** przy Basic 1999 **Basic przestaje być loss-leaderem / wabikiem i staje
się rentownym produktem fallback.** Wygrywasz niezależnie od wyboru klienta (Basic 1999 to dobra
sprzedaż, nie rozdrabnianie). To **zdrowszy** układ niż czysty decoy — nie musisz „poświęcać" Basic,
żeby kotwica działała.

**Koszt tej decyzji (uczciwie):** podnosząc **wejście** do ~1699–1999, **rezygnujesz z narracji
„access / budżet"** z poprzedniego researchu (`market-research-offer.md` §C: mikrofirmy, których
przed AI nie było stać na agencję). Cała oferta przesuwa się z „budżetowej" na „środek pasma
freelancerskiego, custom-jakość". Prawdopodobnie **mniej leadów, ale wyższej wartości** — co jest
dokładnie tym, co deklarujesz („celuję w Full", „nie chcę się rozdrabniać").

### 3. Rozwidlenie strategiczne (to jest właściwa decyzja)

| | **Postawa A** (moja pierwotna) | **Postawa B** (Twój strzał) |
|---|---|---|
| Basic | 1590 / promo 1290 | **1999 / promo 1699** |
| Full | 2499 / promo 1999 | **2999 / promo 2499** |
| Wejście | dostępne dla mikrofirmy | ~1700+ — nie-budżetowe |
| Narracja | zachowuje „access story" | porzuca ją → „przystępny custom, nie tani" |
| Basic to… | entry / lekka kotwica | **rentowny fallback** |
| Leady | więcej, cieńsza marża na Basic | mniej, wyższa wartość |
| „Nie rozdrabniać się" | częściowo | **w pełni** |
| Ryzyko | Basic wciąż blisko szablonu na promo | utrata wolumenu wejścia |

**Wniosek:** **B jest lepiej dopasowana do tego, co MÓWISZ, że chcesz** (Full jako cel,
zero rozdrabniania). A jest wierniejsza **udokumentowanemu wcześniej** pozycjonowaniu budżetowemu.
To nie jest kwestia „która liczba lepsza" — to **świadomy wybór, czy pivotujesz z segmentu
budżetowego w środek freelancerski.** Dane rynkowe bronią obu; B wymaga zaakceptowania utraty
access-story. Obie są spójne.

### 4. Luka CMS / self-edit — czy to bolączka oferty?

**Tak, to realna luka — i dziś podwójnie, bo panel jeszcze nie istnieje.**

**Fakty z kodu/oferty:**
- Self-edit jest **wydzielony jako płatny moduł** `+700 zł` (`messages/pl.json:825-827`,
  `offer-facts.md:73`). Nie ma go ani w Basic, ani w Full.
- `faq.selfEdit` (`messages/pl.json:881-883`) obiecuje „panel CMS… samodzielnie edytujesz wszystkie
  treści".
- ⚠ **`offer-facts.md:206-217`: panelu CMS FIZYCZNIE JESZCZE NIE MA** — to zobowiązanie build, nie
  istniejący produkt. Owner świadomie zdecydował (2026-07-21) sprzedawać go jako add-on, ale
  **panel musi powstać, zanim ktokolwiek złoży zamówienie z tym modułem.**

**Gdzie to boli (rynek):** szablony (Wix/WordPress) i abonamenty dają self-edit **za darmo i od
ręki** — dla części kupujących SMB „mogę sam edytować" to baseline. +700 zł za coś, co konkurencja
daje w cenie, może wyglądać na doliczanie i kłóci się z narracją „przystępnie".

**Dlaczego to mniejszy problem, niż wygląda — dla TWOJEGO kupującego:**
1. **Wizytówka jest z natury statyczna.** Godziny, oferta, kontakt, telefon — właściciel mikrofirmy
   edytuje to kilka razy w roku, nie co tydzień. Realna częstotliwość edycji jest niska.
2. **Static export (`output: 'export'`) to świadomy wybór jakościowy** — szybkość, bezpieczeństwo,
   darmowy hosting, brak powierzchni ataku WordPressa. Oferta **już to sprzedaje** (`includes.hosting`,
   `includes.security`). Brak „WP-style edycji" jest **sprzęgnięty z realnymi zaletami**, które już
   promujesz.
3. **„Ja wprowadzam zmiany" to część usługi osobistej**, nie deficyt — spójne z „masz mnie do
   dyspozycji" i bezpośrednim kontaktem (prior §A/§B).

**Kluczowe: podwyżka cen ZMNIEJSZA ekspozycję na tę lukę.** Przy Basic 1999 / Full 2999 wychodzisz
ze strefy porównań z kreatorami i wchodzisz w strefę freelancer/agencja — gdzie **płatny CMS albo
„deweloper wprowadza zmiany" to norma**, nie wada. Im wyżej, tym bardziej wiarygodne „obsługuję to
za Ciebie".

**Rekomendacja (najwyższa dźwignia) — zrób z CMS różnicownik Full, nie osobny moduł-sierotę:**
Użyj pytania o CMS, żeby **wzmocnić kotwicę** (Twój cel to Full). Opcje wg realizmu operacyjnego —
pamiętając, że panel trzeba dopiero **zbudować** (koszt inżynierski per klient na stacku static-export):

- **Opcja 1 — „lite self-edit" w cenie Full** (rekomendowana kierunkowo): Full = tier, w którym
  „możesz sam edytować" (ograniczone strefy treści: teksty, godziny, zdjęcia), Basic = „set-and-forget,
  zmiany robię ja". Podwójna korzyść: neutralizuje zarzut kreatorowy **i dokłada Full argument** →
  pcha do Full. Wymaga zbudowania *lekkiego* edytora (tańsze niż pełny CMS).
- **Opcja 2 — CMS zostaje add-onem, ale przeramowanie**: dla wizytówki self-edit rzadko potrzebny;
  „opieka / ja wprowadzam zmiany" jako domyślny standard usługi, CMS jako opcja dla treści-heavy.
  Najtańsze operacyjnie (nic nie budujesz ekstra ponad już zaplanowany panel).
- **Opcja 3 — pełny panel CMS w cenie Full**: najsilniejszy argument, ale **najdroższy operacyjnie**
  (pełny headless/git CMS per klient) — ryzyko rozdrabniania po stronie realizacji. Odradzam jako
  domyślny, chyba że panel będzie w pełni reużywalny między klientami.

**Niezależnie od wyboru — napraw framing obiekcji** „czy mogę sam edytować?": odpowiedz pewnie i
**afirmatywnie** (bez negacji, bez kontrastu do kreatorów — [[no-negation-marketing]],
[[no-migration-messaging]]). Dziś `faq.selfEdit` odpowiada defensywnie („zmiany są płatne… możesz
dokupić") — to najsłabsza sprzedażowo odpowiedź na najczęstsze pytanie kupującego.

⚠ **Twarde zobowiązanie build** (nie tylko copy): jeśli self-edit ma być argumentem (zwłaszcza w
cenie Full), **panel/edytor musi realnie istnieć** przed pierwszym zamówieniem — dziś nie istnieje
(`offer-facts.md:215-217`).

### 5. Zaktualizowane punkty decyzyjne

1. **Cennik — wybór postawy:** A (1590/1290 · 2499/1999, access) vs **B (1999/1699 · 2999/2499,
   anti-rozdrabnianie)**. B lepiej pasuje do Twoich deklaracji; wymaga świadomej rezygnacji z
   access-story. → decyzja ownera.
2. **Full ≤ 2999:** potwierdzone jako dobry sufit; 2999/promo 2499 spójne z B.
3. **CMS:** wybór Opcji 1/2/3 dla self-edit — najlepiej **Opcja 1 (lite w Full)** jako dźwignia
   pchająca do Full; przeramować `faq.selfEdit` afirmatywnie **+ zbudować panel przed sprzedażą**.
4. **Realizacja zmian cen:** `messages/{pl,en,sv}.json` (parytet i18n) + `offer-facts.md` +
   `full.extrasValue` (nadal +1050 zł — spójne) + test i18n-completeness.
5. **VAT / limit zwolnienia** — jak w rundzie 1 (do potwierdzenia po Twojej stronie).

---

## Follow-up Research 2026-07-22 (b) — CMS: architektura, build-own vs gotowiec, pomysł „własny /cms"

Owner zawęził temat do CMS-a i doprecyzował kierunek: **własny CMS jako element portfolio,
wszyty w stronę klienta pod `<domena>/cms`, z logowaniem** (żeby nikt niepowołany nie edytował).
Poniżej ugruntowanie w żywych źródłach (wersje/daty/URL) — landscape CMS-ów zmienia się szybko.

### Governing constraint — static export nie ma ISR

Next.js `output: 'export'` **nie wspiera ISR ani on-demand revalidation** — potwierdzone w docs
(Next.js 16.2.x, „ISR is not supported when creating a Static Export"):
https://nextjs.org/docs/app/guides/incremental-static-regeneration. **Wniosek:** publiczna treść
albo jest **wpieczona w build** (edycja → rebuild → redeploy), albo **czytana w runtime po stronie
klienta** z Firestore. Trzeciej drogi (regeneracja bez rebuildu) na tym stacku nie ma.

### Dwie rodziny CMS (ugruntowane)

**A) Git-based / build-time** (treść w repo → panel commit → CI rebuild → deploy; SEO zachowane):
- **Sveltia CMS** — najaktywniejszy (`@sveltia/cms` v0.172.x, 2026-07; MIT), Decap-compatible, może być
  **bez backendu** (GitLab bezpośrednio albo GitHub „sign-in with token"); panel `/admin` = statyczne
  pliki na Firebase. Top pick w tej rodzinie. https://github.com/sveltia/sveltia-cms
- **Pages CMS** — zewnętrzna appka zarządza repo, strona nietknięta; hosted za darmo; 1 instancja →
  wiele klientów. Najniższy ops. https://pagescms.org
- **Decap CMS** — działa (v3.14.x, MIT), ale wolne tempo i słabszy UX; panel statyczny + mały serverless
  OAuth proxy (Git Gateway niewymagany). https://github.com/decaporg/decap-cms
- **Tina / Keystatic — słaby fit:** oba wymagają działającego serwera/DB (Tina: GraphQL backend; Keystatic
  GitHub-mode: Node API route), więc nie mieszczą się w „static export na Firebase Hosting bez serwera".
  https://tina.io/docs/self-hosted/overview · https://keystatic.com/docs/github-mode

**B) Firebase-native / runtime** (treść w Firestore, panel edytuje, publiczna strona czyta):
- **FireCMS** (firebase/Firestore-native, `firecms` v3.3.0, 2026-06, MIT community) — schema-driven admin
  na Firestore, Firebase Auth role, media w Storage. https://firecms.co/docs/ · https://firecms.co/pricing/
  ⚠ **Fleet-economics:** najlepsze funkcje (edytor schematów, role UI, AI) są **płatne** — Cloud €9.99/user/mies,
  PRO €149.99/**projekt**/mies (nierealne przy wielu wizytówkach). Darmowe **Community (MIT)** skaluje się
  kosztowo, ale wymaga self-hostu panelu per projekt → delta względem własnego panelu maleje.
- **DIY:** Firestore + Firebase Auth + mały panel React + Storage. Klocki first-party, security = **Firestore
  Security Rules** (`allow write: if request.auth.uid == <owner>`), publiczny `allow read`. Mały nakład dla
  jednego kształtu treści; nie amortyzuje się, jeśli każdy klient to bespoke.

### Decydujący trade-off — runtime-read vs bake (SEO/LCP)

To jest **właściwa decyzja**, ważniejsza niż „własny vs gotowiec":
- **Runtime-read (klient pobiera Firestore przy ładowaniu):** natychmiastowe zmiany, prosto — ALE treść
  above-the-fold staje się client-rendered → **opóźnienie indeksacji i gorszy LCP**. Badanie Vercel×MERJ
  (2024-07-31): Google renderuje JS, ale z medianą opóźnienia ~10 s (p90 ~godziny); „client-side removal of
  noindex is not effective — Google reads initial HTML before JS".
  https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process
- **Bake/hybrid:** publiczna strona zostaje 100% statyczna → **SEO/LCP w pełni zachowane** (dokładnie to, co
  oferta sprzedaje w `includes.seo` / `includes.hosting`).

**Dla wizytówki (treść mało zmienna, SEO to priorytet oferty) runtime-read to zły default.** Rekomendacja:
**hybryda** — panel pisze do Firestore → **Firestore-trigger Cloud Function → GitHub Actions rebuild →
`firebase deploy`** (build czyta Firestore Admin SDK). Reużywa wzorzec, który już masz (`functions/`,
Secret Manager na `RESEND_API_KEY`, `firebase.json` rewrite). Treść „na żywo w minutach builda" — dla
wizytówki edytowanej kilka razy w roku w pełni akceptowalne. https://firebase.google.com/docs/functions ·
https://firebase.google.com/docs/hosting/github-integration

### Koszt (Firebase Spark, low-traffic wizytówka)

Free-tier w zupełności wystarcza: Firestore 50k reads/20k writes dziennie, Auth 50k MAU, Storage 5 GB.
https://firebase.google.com/docs/firestore/quotas · https://firebase.google.com/pricing. Uwaga: Cloud
Functions wymagają planu **Blaze** (już go masz na formularz), ale Blaze zachowuje darmowe limity.

### Ocena pomysłu „własny CMS pod `<domena>/cms`"

**Werdykt: dobry kierunek — i to z powodów wykraczających poza technikę.** Szczegóły w odpowiedzi dla
ownera; kluczowe punkty do zapamiętania w decyzji:

1. **Własny > gotowiec tutaj**, bo: (a) to **element portfolio / dowód** („ta strona powstała w procesie,
   który sprzedaję"), (b) to **różnicownik Full** wspierający strategię kotwicy z rundy cenowej, (c) brak
   lock-inu i per-seat SaaS na skalę floty (płatne funkcje FireCMS są fleet-nieprzyjazne, a darmowe Community
   i tak wymaga self-hostu per projekt → mała realna oszczędność vs własne).
2. **`/cms` na static export = client-side React app + Firebase Auth.** Wykonalne w eksporcie (routing po
   stronie klienta + Firebase Web SDK). **Code-split**, żeby publiczna wizytówka nie niosła bundla panelu.
3. **Bezpieczeństwo jest w regułach, nie w routcie.** `/cms` będzie publicznie osiągalny (statyk) — realna
   bramka to **Firebase Auth + Firestore Security Rules** (write tylko dla uid właściciela / custom claim;
   public read tylko na opublikowaną treść; Storage rules na media). Ukrycie ścieżki ≠ zabezpieczenie.
4. **Publiczna treść: hybryda (bake + rebuild), nie runtime-read** — żeby nie stracić SEO/LCP (patrz wyżej).
   Panel może czytać Firestore w runtime (admin, SEO nieistotne); publiczne strony pieką się z Firestore w buildzie.
5. **Buduj RAZ, reużywalnie** (schema-driven + config per klient), nie bespoke per stronę — inaczej N paneli
   zjada marżę (anti-rozdrabnianie także na warstwie realizacji). v1 „lite" (teksty, godziny, zdjęcia dla
   zdefiniowanych stref) → moduł/argument Full; pełny CMS = add-on +700 / większe strony.
6. ⚠ **To greenfield** (`offer-facts.md:215-217`: panel jeszcze nie istnieje) — dobra wiadomość: projektujesz
   od zera pod właściwy model. „Nie duży projekt" jest realistyczne dla v1 (jeden kształt treści + reguły +
   jeden pipeline rebuild), ale to prawdziwy slice inżynierski, nie one-liner.

### Sources (CMS, live)

- Next.js static export bez ISR: https://nextjs.org/docs/app/guides/incremental-static-regeneration
- Sveltia CMS: https://github.com/sveltia/sveltia-cms · Pages CMS: https://pagescms.org · Decap: https://github.com/decaporg/decap-cms
- Tina (backend wymagany): https://tina.io/docs/self-hosted/overview · Keystatic (Node route wymagany): https://keystatic.com/docs/github-mode
- FireCMS v3 (MIT community, płatne funkcje): https://firecms.co/pricing/ · https://firecms.co/blog/v3_release/ · https://www.npmjs.com/package/firecms
- Firestore quotas / Firebase pricing: https://firebase.google.com/docs/firestore/quotas · https://firebase.google.com/pricing
- Firestore rules: https://firebase.google.com/docs/firestore/security/get-started · Functions: https://firebase.google.com/docs/functions · Hosting+GH Actions: https://firebase.google.com/docs/hosting/github-integration
- SEO/JS rendering (Vercel×MERJ 2024-07-31): https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process

### Runtime-read vs Static (bake+rebuild) — tabela decyzyjna

| Kryterium | **Static (bake + rebuild)** | **Runtime-read (Firestore po stronie klienta)** |
|---|---|---|
| SEO / indeksacja | ✅ treść w initial HTML, od razu crawlowalna | ⚠ treść po JS → opóźnienie indeksacji; słabsze crawlery/AI gorzej |
| LCP / first paint | ✅ treść na pierwszym malowaniu, zero round-tripów | ⚠ treść po load JS + init SDK + zapytaniu; flash pustego stanu |
| Czas „na żywo" | ⚠ minuty builda | ✅ natychmiast |
| Złożoność pipeline | ⚠ Cloud Function + GitHub Actions + token (raz, reużywalne) | ✅ brak — panel i strona ten sam tor danych |
| Zależność runtime | ✅ strona działa nawet gdy Firestore leży | ⚠ awaria/wolny Firestore = brak treści |
| Koszt | ⚠ minuty CI (limit na private repo) | ✅ brak buildów; ⚠ reads per odwiedzający (free-tier ogromny) |
| Zgodność z ofertą | ✅ chroni `includes.seo` / szybkość, które sprzedajesz | ⚠ podkopuje własne argumenty SEO/szybkość |

**Kiedy runtime wygrywa:** treść naprawdę dynamiczna / częsta / za loginem / nie-SEO (np. panel zalogowanego,
live-dostępność). **Nic z tego nie opisuje wizytówki.** Dla treści zmienianej kilka razy w roku jedyny minus
statyka (minuty latencji) jest bez znaczenia → **Static (bake+rebuild) to właściwy wybór.**

### Zakres v1: „light" vs „pełny" — a sprawa podstron

Dwie **niezależne** osie, nie jedna:
- **Oś A — ile treści edytowalne:** kilka stref (light) → cała treść na istniejących stronach (pełny).
- **Oś B — czy klient zmienia STRUKTURĘ** (dodaje podstrony/route'y/nawigację) — to **page-builder**, nie CMS treści.

„Dodawanie podstron dowolnie" = **oś B = page-builder**: na static export wymaga generowania route'ów z danych
CMS (`generateStaticParams` z Firestore), dynamicznej nawigacji, szablonów, slugów, meta/SEO per nowa strona,
aktualizacji `sitemap.ts`. To duży build **i kłóci się z obietnicą oferty** (dopracowana, spójna, kuratorowana
strona — klient sam dokładający podstrony psuje spójność). **Rekomendacja:** nie robić self-serve podstron;
„dodatkowa podstrona" zostaje **usługą płatną / istniejącym modułem `extraPage +300 zł`** (`messages/pl.json:837-839`).
- **Light v1 (rekomendacja):** edycja treści w zdefiniowanych strefach istniejących stron (teksty, godziny,
  zdjęcia). Reużywalne, on-brand, argument Full. Bez tworzenia stron.
- **„Pełny" (późniejszy add-on):** edycja **wszystkich** treści na istniejących stronach — nadal **bez** wolnego
  dodawania podstron. Osobne stapianie: nowa podstrona = `extraPage`.

### Bloker: karta / Blaze — gdzie dokładnie leży granica (ugruntowane 2026-07-22)

Owner chce, by **klient nie musiał podpinać karty** (profil płatności Blaze). Granica jest czysta:
**własny kod serwerowy w projekcie klienta = Blaze = karta. Statyczny hosting + dane czytane po stronie
klienta = Spark, za darmo, bez karty.**

| Produkt Firebase | Spark / bez karty? | Źródło |
|---|---|---|
| **Hosting** (statyk) | ✅ TAK | https://firebase.google.com/docs/hosting/usage-quotas-pricing |
| **Firestore** | ✅ TAK (50k reads/20k writes dziennie) | https://firebase.google.com/pricing |
| **Authentication** | ✅ TAK (50k MAU) | https://firebase.google.com/pricing |
| **Cloud Functions** (1. i 2. gen) | ❌ **NIE — Blaze wymagany do deployu** | https://firebase.google.com/docs/functions/get-started |
| **Cloud Storage** | ❌ **NIE — Blaze wymagany** (zmiana wymuszona 2026-02-03) | https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024 |
| **Hosting rewrite → Function** | ❌ **NIE — pociąga Blaze tranzytywnie** | https://firebase.google.com/docs/hosting/cloud-run |

**Dwa ważne wnioski:**
1. ⚠ **Storage też wymaga już Blaze** (od 2026-02-03) → media/zdjęcia CMS-a **nie mogą** iść przez Firebase
   Storage bez karty. Obejście: trzymać obrazy **w repo git** (pieką się w build → i tak lepsze dla SEO/LCP)
   albo na card-free CDN.
2. ⚠ **Obecny formularz kontaktowy JUŻ jest blokerem karty.** `firebase.json` rewrite `/api/contact` →
   Cloud Function to dokładnie to, co pociąga projekt klienta na Blaze. Czyli problem karty **istnieje już
   dziś w bazowej ofercie** („formularz" w cenie), niezależnie od CMS-a. Ten sam fix rozwiązuje oba.

### Card-free architektura (ugruntowane)

- **Projekt klienta zostaje na Spark:** Hosting (statyk) + Firestore + Auth. **Zero Functions, zero Storage,
  zero rewrite-to-function** — to trzy wyzwalacze Blaze.
- **Jedyny kawałek z sekretem (token GitHub do triggera rebuildu)** → **Cloudflare Worker** (free, **bez karty**,
  100k req/dzień; weryfikuje Firebase Auth ID token przez JWKS, robi outbound fetch do GitHub API).
  https://www.cloudflare.com/plans/ · https://developers.cloudflare.com/workers/platform/limits/
- **Build:** GitHub Actions → static export → `firebase deploy` (deploy Hostingu działa na Spark).
  ⚠ **Repo publiczne = minuty Actions za darmo i bez limitu**; prywatne = wspólna pula 2000 min/mies na całą
  flotę (szybko się kończy). Dla floty → repo publiczne. https://docs.github.com/en/billing/concepts/product-billing/github-actions
- **Media:** w repo git (Storage odpada bez karty).
- **Formularz kontaktowy (card-free, zamiast Cloud Function):** Web3Forms (250/mies, bez konta i karty) albo
  Cloudflare Worker → Resend (własna domena). https://resend.com/pricing

**Reframe wywołany blokerem Storage:** skoro media i tak muszą iść do git, a treść jest czytana w buildzie, to
**git jako źródło treści** (własny CMS git-backed, jak własna Sveltia) omija OBIE ściany Blaze (Functions +
Storage) i jest prostszy niż Firestore + klucz service-account w Actions. Firestore staje się opcjonalny.

**Dwie card-free ścieżki (do wyboru ownera):**
- **Model Git-only (rekomendowany):** treść+media w repo; `/cms` (React + Firebase Auth login) → Cloudflare
  Worker (trzyma token) → commit do repo → push → Actions build+deploy. Firebase tylko Hosting (+ Auth). Bez
  karty nigdzie. Treść wersjonowana w git.
- **Model Firestore:** treść w Firestore (Spark), media w git; `/cms` → Worker → GitHub dispatch → Actions
  czyta Firestore (service-account key) → build+deploy. Bliżej pierwotnego pomysłu ownera, ale split treść/media
  i dodatkowy klucz.

**Alternatywa „owner zjada jedną kartę":** owner ma już projekt na Blaze (ten marketingowy używa Cloud
Function + Secret Manager). Można trzymać **współdzielony backend na projekcie ownera** (relay kontaktu +
trigger rebuildu jako multi-tenant funkcje) — klient zostaje Spark/bez karty, owner płaci jedną kartą. Prościej
technologicznie (zostaje w Firebase), ale multi-tenancy po stronie ownera. Cloudflare (wyżej) = zero kart
gdziekolwiek i lepsza izolacja.

Źródła (karta/Blaze): jak w tabeli + Cloudflare Workers https://developers.cloudflare.com/workers/runtime-apis/web-crypto/ ·
GitHub dispatch https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event ·
Web3Forms/Resend (card-free relay).

### Czy limit można ustawić na 0? (ugruntowane 2026-07-22)

**Nie ma natywnego twardego capa. Budżety GCP to TYLKO alerty, nie blokada.** Cytat z docs:
*„Setting a budget does not automatically cap … usage or spending … they don't automatically prevent the
use or billing."* https://docs.cloud.google.com/billing/docs/how-to/budgets

- **Jedyny prawdziwy twardy cap** = automatyka *Budget → Pub/Sub → Cloud Function wyłączająca billing*. Ale to
  tępe narzędzie: *„shutting down all resources … might be irretrievably deleted"* — **wyłącza też stronę i może
  skasować dane.** Przesada dla wizytówki. https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications
- **Nowość 2026 „Spend Caps"** (realnie pauzują ruch, zostawiając zasoby) — ale **private preview** i obejmują
  tylko AI/Cloud Run/Maps, **nie** Hosting/Firestore/Auth. Nieużywalne tu. (App Engine daily limit — deprecated.)
- **Realia praktyczne:** wizytówka **i tak siedzi na $0** na Blaze, bo darmowe limity Spark **przechodzą na Blaze**
  (Hosting 10 GB + 360 MB/dzień, Firestore 50k reads/dzień, Auth 50k MAU, Functions 2M/mies). Karta to **wymóg
  planu, nie sygnał wydatku.** https://firebase.google.com/pricing
- **Alert da się ustawić nisko** (np. 1 zł, per-projekt, progi 50/90/100%) — powiadomi szybko (z lekkim
  opóźnieniem danych). Nie blokuje.

**Uczciwy skrypt dla klienta (nie obiecywać twardego capa):** „Blaze wymaga karty, ale projekt mieści się w
stałych darmowych limitach Google, których strona firmowa nigdy nie dotyka — realny rachunek to 0 zł/mies.
Ustawię alert budżetowy na 1 zł na Twój projekt, żeby od razu przyszedł mail, gdyby cokolwiek się naliczyło.
Uczciwie: alert powiadamia, nie blokuje — Google nie ma prostego przełącznika „nigdy mnie nie obciążaj" dla
tych usług; jedyna automatyka, która twardo zatrzymuje koszty, wyłączyłaby też stronę."

---

## Follow-up Research 2026-07-25 (d) — Benchmark cen MODUŁÓW (add-onów): czy nie są za niskie?

Poprzednie rundy benchmarkowały **pakiety** (Basic/Wgląd Full) i architekturę CMS-a. **Nikt dotąd nie
zbenchmarkował cen samych MODUŁÓW** — a to jest pytanie ownera. Ta runda robi benchmark per-moduł względem
żywego rynku PL 2026 (3 równoległe pod-agenty, każda cena cytowana z realnego cennika). Wszystkie kwoty netto.

### Zestawienie: cena ownera vs rynek PL (jednorazowo, netto)

| Moduł | Cena ownera | Rynek PL (jednorazowo) | Werdykt | Źródła |
|---|---|---|---|---|
| **Śledzenie konwersji pod reklamy** | **+250** | **1000 (sam GTM) – 2800** (pełne GA4+Ads+Pixel+GTM) | 🔴 **drastycznie za nisko** (~10× pod rynkiem) | cenauslug.pl (GTM ~1050, GA4 1800–2800), pawelpiekarski.pl |
| **Rezerwacje i kalendarz** | **+350** | **1600** standalone / **500–3000** jako integracja (4–10h) | 🔴 **drastycznie za nisko** (~5× pod, najbardziej pracochłonny moduł) | cenauslug.pl (1600), growto.pl (500–3000/4–10h) |
| **Blog i aktualności** | **+700** | **500–2500** (moduł postów) / **1500–4000** (pełny CMS) | 🟠 za nisko | zdobywcysieci.pl (500–2500), growto.pl (CMS 1500–4000) |
| **Widoczność lokalna (GBP)** | **+250** | **400–1500** (floor ~300 za gołą konfigurację) | 🟠 za nisko (pod floorem) | kcmobile.pl (od 500), konkurometr.pl (400–700 / 800–1500) |
| **Firmowa poczta na domenie** | **+150** | **300–430** | 🟠 za nisko (~⅓ stawki specjalisty) | pancaro.pl (430), jakwybrachosting.pl |
| **Dodatkowy język / język** | **+400** | flat **600** / heurystyka **~30% projektu ≈ 600–900** | 🟠 za nisko | diverto.pl (600), growto.pl (1500–3500 ≈ 30%) |
| **Animacje i efekty** | **+400** | brak czystego itemu; efort **4–8h ≈ 600–1200**; jedyny item webwave 800–3000 | 🟡 nisko / na krawędzi | webwavecms.com (800–3000, zaszumione) |
| **Tryb ciemny i jasny** | **+400** | brak itemu na rynku; efort **4–7h ≈ 500–1050** | 🟡 nisko / break-even | brak cennika — tylko poradniki; reasoning po godzinach |
| **Zbieranie leadów (newsletter)** | **+400** (oba +550) | **200–350** | 🟢 OK / lekko wysoko | thenewlook.pl (350 standalone / 150 z budową) |
| **Dodatkowa podstrona** | **+300** | **50–400**, klaster **200–260** | 🟢 OK / lekko wysoko | diverto.pl (250), growto.pl (200–400) |

### Werdykt ogólny

**Tak — moduły jako zestaw są za nisko wycenione, a dwa z nich drastycznie.** Z dziesięciu modułów:
**dwa 🟢 dobrze** (leady, dodatkowa podstrona), **dwa 🟡 na efort-floorze** (animacje, tryb ciemny), **cztery 🟠
za nisko** (blog, GBP, poczta, język), **dwa 🔴 drastycznie za nisko** (śledzenie konwersji, rezerwacje).

Dwa niezależne dowody „za nisko", tak jak przy pakietach:

1. **Vs. efort ownera (nie tylko vs rynek).** Kluczowe rozróżnienie: solo dev z AI **może świadomie siedzieć
   poniżej stawek agencyjnych/specjalistycznych** — to spójne z pozycjonowaniem „przystępny custom". ALE
   **rezerwacje (+350)** i **śledzenie konwersji (+250)** są poniżej **jego własnego floora robocizny**:
   rezerwacje to 4–10h realnej pracy integracyjnej, a konwersje to GA4+Ads+Pixel+GTM+Consent Mode — kilka
   godzin konfiguracji, którą specjaliści liczą 1000–2800. Przy +250/+350 to **near-zero-margin albo pod
   kreską za najbardziej wartościowe moduły** — to nie „tanie pozycjonowanie", to niedoszacowanie.
2. **Vs. sygnał jakości (spójność z Postawą B).** Runda pakietowa ustawiła Basic 1999 / Full 2999 = „przystępny
   custom, nie tani szablon". **Moduł konwersji za +250, który specjaliści liczą 1500+, sygnalizuje „hobby",
   nie „profesjonalista"** — podkopuje to samo pozycjonowanie, które podniesienie pakietów miało zbudować. Cena
   modułu jest sygnałem tak samo jak cena pakietu.

### Niuans, który broni części niskich cen (marginal cost ownera)

Część modułów jest tania, bo **marginalny koszt na TYM stacku jest realnie niski** — i to jest OK:
- **Dodatkowa podstrona (+300):** komponenty już są, niska robocizna → cena słusznie w górnym paśmie rynku.
- **Zbieranie leadów (+400):** formularz kontaktowy już istnieje, dochodzi tylko podpięcie newslettera → dobrze.
- **Dodatkowy język (+400):** i18n **już wpięte** (strona jest trójjęzyczna: pl/en/sv, `i18n/routing.ts`),
  transkreacja własnymi skillami → marginalny koszt niski. Ale rynek broni 600, więc jest zapas w górę.
- **Tryb ciemny (+400):** ⚠ tu jest pułapka — **owner ZNA efort**, bo w tym repo oba motywy są first-class.
  Dla strony klienta to realna praca projektowa (projekt OBU motywów, nie klasa CSS) → +400 to floor.

Wniosek: „tanie" jest uzasadnione tam, gdzie marginalny koszt jest realnie bliski zera (podstrona, leady,
język). „Tanie" jest **błędem** tam, gdzie moduł to realne godziny (rezerwacje, konwersje, blog) albo realny
projekt (tryb ciemny, animacje).

### Twarde sprzężenie z kotwicą Full (nie przeoczyć przy zmianie)

⚠ **Trzy moduły, które chcę podnieść, to dokładnie te wliczone w „+1050 zł modułów" w Full** — `localVisibility
250 + animations 400 + themeToggle 400 = 1050` = `full.extrasValue` (`messages/pl.json:808-852`, potwierdzone
w rundzie 1). Podniesienie ich:
- **Wzmacnia** narrację Full („+1400 zł modułów za +1000 zł dopłaty" jest jeszcze mocniejsze niż „+1050 za +1000") —
  dobre dla kotwicy.
- **ALE** wymaga aktualizacji `full.extrasValue` w copy + parytet i18n (`messages/{pl,en,sv}.json`) + test
  i18n-completeness. Nie można ruszyć samych modułów bez przeliczenia value-story Full.

### Rekomendacja kierunkowa (do decyzji ownera — NIE wdrażać bez zgody)

Priorytet wg dotkliwości niedoszacowania:
1. **Śledzenie konwersji: +250 → ~600–900.** Wciąż mocno pod specjalistą (1500+), uczciwe dla solo, ale przestaje
   sygnalizować „hobby". Największa dźwignia.
2. **Rezerwacje i kalendarz: +350 → ~800–1200.** Najbardziej pracochłonny moduł — powinien być jednym z
   **najdroższych** add-onów, nie jednym z najtańszych.
3. **Blog: +700 → ~900–1200.** Realny build; wiąże się z luką CMS/self-edit z rundy (b) — jeśli blog = treść
   edytowalna, to zależy od panelu, którego jeszcze nie ma.
4. **Dodatkowy język: +400 → ~600.** Do jedynego flat-comparatora rynku (600) i heurystyki „30% projektu".
5. **GBP +250 i poczta +150 → ~350–450 każdy.** Oba pod nawet budżetowym floorem konfiguracji.
6. **Animacje / tryb ciemny: +400 → ~500–600**, jeśli sprzedawane jako dopracowane (nie templatowe).
7. **Zostawić: leady +400, dodatkowa podstrona +300** — jedyne dwa dobrze wycenione.

Ważne zastrzeżenie (jak w rundzie 1): to **nie** „gonić rynek w górę na siłę". Cel: cena modułu ma
**odzwierciedlać albo realny efort ownera, albo realną wartość** — a nie zjeżdżać pod jego własny floor
robocizny (rezerwacje, konwersje) ani sygnalizować amatorstwa przy pakiecie pozycjonowanym jako profesjonalny.

### Co to jest „śledzenie konwersji pod reklamy" (odpowiedź na drugie pytanie ownera)

**Definicja (prostym językiem):** to warstwa pomiarowa, która pozwala płatnym kampaniom (Google Ads,
Meta/Facebook Ads) wiedzieć, **które kliknięcia w reklamę zamieniły się w realny efekt** — wysłany formularz,
kliknięcie „zadzwoń", rezerwację, zakup. W praktyce to konfiguracja: **GA4** (Google Analytics 4), **tagów
konwersji Google Ads**, **Piksela Meta + Conversions API**, zwykle wdrożonych przez **Google Tag Manager
(GTM)**, plus zdefiniowanie **zdarzeń konwersji**, które się liczą, i **Consent Mode / zgody RODO**.

**Po co to (dwa powody):**
1. **Bez tego wydajesz budżet reklamowy na ślepo.** Widzisz kliknięcia, ale nie wiesz, **która reklama, słowo
   kluczowe czy grupa odbiorców** przyniosła realne zapytanie — więc nie umiesz odciąć tego, co przepala pieniądze.
2. **Automatyczne licytowanie reklam KARMI SIĘ tymi zdarzeniami.** Smart Bidding Google i optymalizacja Meta
   optymalizują pod konwersje, które im przekażesz — **bez dokładnych sygnałów konwersji algorytm optymalizuje
   pod nic**, więc ten sam budżet kupuje dużo mniej realnych leadów.

Krótko: **to pomiarowy fundament, dzięki któremu płatna reklama jest mierzalna i optymalizowalna, zamiast być
loterią.** Dlatego rynek liczy pełne wdrożenie 1000–2800 zł — i dlatego +250 zł to najdotkliwiej niedoszacowany
moduł w cenniku.

### Code References (nowe / potwierdzone)

- `context/foundation/offer-facts.md` (sekcja „Add-on modules") — kanoniczny cennik modułów, do aktualizacji, jeśli ceny się zmienią.
- `messages/pl.json:808-852` — `modules.items`: cennik modułów w copy (parytet i18n → en/sv też).
- `messages/pl.json` — `full.extrasValue` „+1050 zł": suma localVisibility 250 + animations 400 + themeToggle 400; ZMIANA którejkolwiek z tych trzech wymaga przeliczenia tej linii.
- `tests/unit/offer-pricing.test.tsx` — test spójności cen (sprawdzić, czy asertuje sumę modułów Full).
- `i18n/routing.ts` — pl/en/sv (dowód, że i18n jest już wpięte → marginalny koszt „dodatkowego języka" niski).

### External Sources (live, 2026-07-25 — benchmark modułów)

Wszystkie netto; pełne cytaty w wynikach pod-agentów.

**Śledzenie konwersji / GA4 / GTM / Piksel:**
- cenauslug.pl — GTM konfiguracja ~1000–1100 (śr. 1050): https://cenauslug.pl/firma-i-biuro/konfiguracja-google-tag-manager-gtm
- cenauslug.pl — GA4 wdrożenie 1800–2800 (śr. 2386): https://cenauslug.pl/firma-i-biuro/konfiguracja-analityki-internetowej-google-analytics-4
- pawelpiekarski.pl — zakres GA4+Pixel+Ads+Consent Mode: https://pawelpiekarski.pl/sledzenie-konwersji-mads/ · kcmobile.pl: https://kcmobile.pl/artykuly/konwersje-google-ads-sledzenie-konfiguracja/

**Rezerwacje / kalendarz:**
- cenauslug.pl — implementacja systemu rezerwacji ~1600: https://cenauslug.pl/firma-i-biuro/implementacja-systemu-rezerwacji-online-na-stronie
- growto.pl — integracje +500–3000 / 4–10h każda: https://growto.pl/blog/ile-kosztuje-strona-firmowa-2026
- projektowaniestroncennik.pl — strona z kalendarzem od 4000: https://projektowaniestroncennik.pl/

**Blog / CMS:**
- zdobywcysieci.pl — blog 500–2500: https://zdobywcysieci.pl/wiedza/ile-kosztuje-strona-internetowa/
- growto.pl — CMS +1500–4000: https://growto.pl/blog/ile-kosztuje-strona-firmowa-2026

**Widoczność lokalna (GBP):**
- kcmobile.pl — optymalizacja od 500 jednorazowo: https://kcmobile.pl/wizytowka-google/
- konkurometr.pl — tier 400–700 / 800–1500: https://konkurometr.pl/blog/wizytowka-google-ile-kosztuje
- multisub.pl — od 299: https://www.multisub.pl/pozycjonowanie-wizytowki-google-cena

**Firmowa poczta na domenie:**
- pancaro.pl — Google Workspace setup 430 (MX/SPF/DKIM/DMARC, do 5 kont): https://pancaro.pl/uslugi/google-workspace/
- jakwybrachosting.pl: https://jakwybrachosting.pl/google-workspace-domena/ · fotc.com: https://fotc.com/pl/blog/gmail-we-wlasnej-domenie/

**Zbieranie leadów / newsletter:**
- thenewlook.pl — MailerLite→WP 350 standalone / 150 z budową: https://thenewlook.pl/mailerlite-wordpress-newsletter/
- icommedia.pl — integracja WP z newsletterem: https://icommedia.pl/jak-zintegrowac-wordpress-z-newsletterem-mailerlite-mailchimp/

**Dodatkowa podstrona:**
- diverto.pl — 250/podstronę: https://diverto.pl/strony-internetowe-cennik/
- growto.pl — +200–400 po piątej: https://growto.pl/blog/ile-kosztuje-strona-firmowa-2026

**Dodatkowy język:**
- diverto.pl — wersja językowa flat 600: https://diverto.pl/strony-internetowe-cennik/
- growto.pl — wielojęzyczność +1500–3500 ≈ 30% projektu: https://growto.pl/blog/ile-kosztuje-strona-firmowa-2026
- zdobywcysieci.pl — tłumaczenie ~0,3–0,5 zł/słowo (osobno): https://zdobywcysieci.pl/wiedza/ile-kosztuje-strona-internetowa/

**Animacje / tryb ciemny (rzadko itemizowane) + stawki:**
- webwavecms.com — animacje/efekty 800–3000 (zaszumione, miesza motion-graphics): https://webwavecms.com/blog/ile-kosztuje-strona-internetowa
- tryb ciemny — brak publikowanej ceny w PL; tylko poradniki (soluma.pl, krakweb.pl, webgrow.pl) → wycena po godzinach
- czujowski.pl — stawka PL freelancer mid 80–150/h, senior 150–280/h: https://czujowski.pl/blog/ile-bierze-programista-za-strone-internetowa.html
- contentninja.pl / yetiweb.pl — moduły funkcjonalne 500–5000 zł (add-on floor ~500): https://contentninja.pl/ile-kosztuze-strona-internetowa/

### Open Questions (runda d)

1. **Decyzja cenowa modułów** — czy podnosić, i o ile (patrz rekomendacja kierunkowa)? Priorytet: konwersje + rezerwacje.
2. **Sprzężenie z Full** — jeśli ruszasz localVisibility/animations/themeToggle, przelicz `full.extrasValue` i zaktualizuj copy + i18n + test.
3. **Blog vs CMS** — cena bloga zależy od tego, czy treść jest edytowalna przez klienta (panel z rundy b, którego jeszcze nie ma).
4. **Realizacja** — każda zmiana ceny to `messages/{pl,en,sv}.json` (parytet) + `offer-facts.md` + `tests/unit/offer-pricing.test.tsx`.

### Rozstrzygnięcie: karta rozstrzyga architekturę (owner-input 2026-07-22)

Owner: Cloudflare już używany (DNS) → OK; GitHub Actions OK, **ale repo prywatne**; **Firestore preferowany**;
rozważa „po prostu powiedzieć klientowi: podepnij kartę + ustaw limity".

**Twarda zależność:** **client-owned Firestore + Storage (media) WYMAGA Blaze/karty.** Storage bez karty odpada
(zmiana 2026-02). Więc:
- **Chcesz Firestore+Storage (preferencja ownera)** → klient MUSI mieć kartę → **Postawa CARD**.
- **Upierasz się przy zero-card** → tracisz Firestore/Storage w projekcie klienta → git-content + Cloudflare
  (**Postawa CARD-FREE**).

Nie ma trzeciej drogi dającej „client-owned Firestore+Storage bez karty".

**Rekomendacja: Postawa CARD** — odblokowuje preferowany stack Firestore, najprostsza w budowie, realny koszt $0.
Jedyny koszt to friction „podepnij kartę" + lęk przed rachunkiem z chmury (realny u mikrofirm). Zarządzasz tym
**uczciwym skryptem + alertem 1 zł**, i — spójnie z transparentnym etosem oferty (RODO, realne koszty wprost) —
**wpisujesz to jawnie w sekcję „Własność i koszty"** jako kolejne „odpowiadam na pytanie, którego klient się boi",
a nie ukryty haczyk. Uwaga na [[no-negation-marketing]]: sformułować afirmatywnie („hosting w darmowym limicie
Google; karta to wymóg planu, realnie 0 zł, ustawiam alert"), bez straszenia.

**Architektura wynikająca z Postawy CARD (Firestore):**
- Klient na Blaze: Hosting (statyk) + Firestore (treść) + Storage (media) + Auth (login `/cms`).
- Publiczna treść: **static bake + rebuild** (SEO) — nie runtime-read.
- Trigger rebuildu: Firestore-trigger **Cloud Function** (dozwolone, bo na Blaze) **albo** Cloudflare Worker →
  dispatch. Build+deploy: **Cloud Build** (GCP, omija limit minut prywatnego repo GitHub) **albo** GitHub Actions
  (prywatne repo = wspólna pula 2000 min/mies — dla rzadkich rebuildów wizytówki OK). ⚠ Cloud Build free-tier
  (120 min/dzień vs 2500 min/mies) — do potwierdzenia bezpośrednio; i tak trywialny ułamek.
- Formularz kontaktowy: na Blaze może zostać Cloud Function (jak dziś) — ale to on dziś wymusza kartę; przy
  Postawie CARD to już nie problem.

Źródła: budżety/cap https://docs.cloud.google.com/billing/docs/how-to/budgets ·
disable-billing https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications ·
Spend Caps (preview) https://cloud.google.com/blog/topics/cost-management/introducing-spend-caps-ai-cost-visibility-next26 ·
free-tier na Blaze https://firebase.google.com/pricing · Cloud Build https://cloud.google.com/build/pricing

---

## Follow-up Research 2026-07-22 (c) — Denial of Wallet (EDoS): zagrożenie i obrona

Owner: research zagrożeń, gdzie atakujący generuje ruch, by **klient poniósł opłaty Firebase**. To nazwana
klasa ataku: **Denial of Wallet (DoW)** / **EDoS** (Kelly/Glavin/Barrett 2021; Hoffman 2008) — napompowanie
rachunku pay-per-use bez atakowania dostępności. Ugruntowane w żywych źródłach + realnych incydentach.

### Fundament: brak twardego capa (potwierdzone docs Google 2026)

Firebase „Avoid surprise bills" (last updated 2026-07-03): *„budgets and budget alerts do **not** cap your
usage or charges"*; opóźnienie kosztu vs alert **do kilku dni**. https://firebase.google.com/docs/projects/billing/avoid-surprise-bills
→ na Blaze DoW **może** naliczyć rachunek, zanim alert zdąży zadziałać. **Na Spark jest odwrotnie: przekroczenie
limitu = usługa się zatrzymuje, nie ma rachunku.** To czyni Postawę CARD-FREE **odporną na DoW z definicji**
(tryb awarii = „strona przyduszona", nie „rachunek"). Ważny wkład zwrotny do decyzji o postawie.

### Ekspozycja TEJ strony dziś — niska (audyt repo)

Audyt kodu wykazał: jedyny osiągalny z zewnątrz element compute to funkcja `contact` — i już utwardzona
(`functions/src/index.ts`: `maxInstances: 5`, allow-lista origin, honeypot, rate-limiter per-IP). Statyki mają
`Cache-Control: public, max-age=31536000, immutable` (`firebase.json`). Brak runtime Firestore/Storage, brak
klienckiego klucza Firebase (`__/firebase/init.json` nie wystawia użytecznego klucza). **Większość wektorów jest
zamknięta przez design** — nie tylko ograniczona.

### Tabela wektorów (po dodaniu CMS + Firestore klienta)

| Usługa | Atak | Dźwignia $ | Mitygacja | Status przy static-bake |
|---|---|---|---|---|
| **Hosting egress** | flood GET (duży/cache-busting) | $0.15/GB po ~10 GB/mies (⚠ vs 360 MB/dzień — zweryfikować) | Cloudflare cache HTML + Ignore-Query-String; immutable headers | **główny otwarty wektor** |
| **Cloud Functions** (kontakt) | flood POST → inwokacje+compute+Resend | $0.40/M + email | Turnstile+App Check+`maxInstances`+hard-coded odbiorca | bounded |
| **Firestore reads** | skryptowane odczyty | $/100k po 50k/dzień | — | **ZAMKNIĘTY** (bake, publiczna strona nie czyta) |
| **Storage egress** | flood pobrań mediów | $0.12/GB | media w buildzie/CDN, nie Storage-direct | **ZAMKNIĘTY** (media w git/Hosting) |
| **Cloud Build** | storm rebuildów | minuty builda | Auth-gate + concurrency + debounce | bounded |

**Wniosek projektowy:** decyzja **static-bake (a nie runtime-read) zamyka dwa najgorsze wektory** (Firestore
reads, Storage egress) — te, które stoją za realnymi horror-billami. Kolejny argument za bake.

### Realne incydenty (ugruntowane) — czego uczą

- **Milkie Way $72k** (2020) — self-inflicted rekursja Cloud Run→Firestore (116 mld reads/godz), budżet $7 nie
  zadziałał; **Google umorzył**. https://blog.tomilkieway.com/72k-1/ · https://www.theregister.com/2020/12/10/google_cloud_over_run/
- **GCS egress ATAK ~$95–98k** (2025) — atakujący znalazł nazwę **publicznego bucketa Storage** i zalał egress
  ~20–35 GB/s; **Cloudflare był, ale trafili prosto w origin** (CDN-bypass); refund dopiero po publicznej eskalacji.
  https://www.runway.horse/news/opinion-billing-in-the-cloud/
- **Netlify $104k** (2024) — flood pasma na statyku; CEO umorzył. https://news.ycombinator.com/item?id=39520776
- **Fala 2026 (skradzione klucze → Gemini)** — refundy **niespójne/odmawiane** („shared responsibility model").
  https://www.theregister.com/ai-ml/2026/05/13/google_users_fight_for_refunds...

**Lekcje:** (1) większość wielkich rachunków to **self-inflicted pętle**, nie ataki — dyscyplina kodu (guard na
`onWrite`, `maxInstances` niskie) jest ważniejsza niż mur; (2) realny atak = **flood egress na publiczny
Storage/origin** — czego ta strona nie wystawia (media w git, brak public bucket); (3) **CDN-bypass to
powtarzalna porażka** — atak trafia w `*.web.app`/`*.run.app`/bucket z pominięciem Cloudflare; (4) **nie licz na
umorzenie** — w 2026 bywa odmawiane. Rachunki bez capa naliczają się szybciej niż alert (dane ~24h opóźnione).

### Stos obrony (warstwowo, tanio → backstop)

**Brzeg (Cloudflare free — już go masz):**
- **Cache Rule: HTML „Eligible for cache" + Ignore query string + długi Edge TTL** — najwyższa dźwignia; zwija
  flood statyka do HIT na edge, egress ~0. https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-everything-ignore-query-strings/
- `Cache-Control: public, s-maxage=…` w `firebase.json` (Firebase domyślnie wysyła `private` na dynamic → CF nie
  cache'uje). https://firebase.google.com/docs/hosting/manage-cache
- **WAF custom rules (5 free):** blok non-POST na `/api/contact`, filtry geo/ASN/nagłówek.
- **1 free rate-limit rule** (per-IP, okno 10 s) na najkosztowniejszą ścieżkę.
- **Turnstile** (free, nielimitowane weryfikacje) na formularz + `/cms`.
- ⚠ **SSL Full (Strict)** + weryfikacja domeny **grey→orange** (inaczej pętla przekierowań / stall certu).
- ⚠ **CDN-bypass:** `*.web.app`/`*.run.app` zostają osiągalne bezpośrednio → dołóż **sekret-nagłówek
  wstrzykiwany przez Cloudflare**, którego funkcja wymaga (atak w origin go nie ma).

**Aplikacja:**
- **App Check** na funkcji (`onRequest` → ręczna weryfikacja `X-Firebase-AppCheck`). https://firebase.google.com/docs/app-check/cloud-functions
- **Formularz:** odbiorca **na sztywno** po stronie serwera (nie z requestu) + Turnstile `siteverify` **przed**
  wywołaniem Resend. **Resend free hard-stopuje** (3000/mies, 100/dzień, **bez naliczania overage**) — atak może
  wypalić limit, ale **nie wygeneruje rachunku**. https://resend.com/pricing
- **Trigger rebuildu:** wymaga **zweryfikowanego Firebase Auth ID token** przed dispatch; token GitHub tylko
  server-side; GitHub Actions **`concurrency` + `cancel-in-progress`** (burst → jeden build); debounce „Publikuj"
  + lock `lastBuildAt`.

**Backstop:**
- **`maxInstances` niskie (3–10)** na każdej funkcji — sufit worst-case compute (Google zaleca start od 3).
  https://firebase.google.com/docs/functions/manage-functions
- **Budget alert nisko** (np. 20–50 zł) — monitoring, nie cap.
- **Kill-switch (jedyny twardy cap):** Budget→Pub/Sub→Function wyłączająca billing. Tępy (gasi stronę, może
  skasować dane), ale realny. Gotowce: `derailed-dash/gcp-billing-killswitch`, rozszerzenie **„Auto Stop
  Services"** (łagodniejsze — wyłącza usługi, nie odpina billingu). https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications · https://extensions.dev/extensions/kurtweston/functions-auto-stop-billing

### Wkład zwrotny do decyzji o postawie (ważne)

Ten research **wzmacnia argument za Postawą CARD-FREE (Spark)**: projekt na Spark jest **odporny na DoW z
definicji** — przekroczenie limitu gasi/przydusza usługę, nigdy nie generuje rachunku. Postawa CARD (Blaze)
odblokowuje Firestore/Storage, ale **dziedziczy ekspozycję DoW bez twardego capa**, którą trzeba aktywnie
rozbroić (stos wyżej) **i** świadomie zaakceptować (umorzenia w 2026 bywają odmawiane). To realnie uzasadnia lęk
„rachunku z chmury" u mikrofirmy — nie jest to fobia, to udokumentowane ryzyko.

**Rekomendacja obronna wg postawy:**
- **Jeśli Postawa CARD (Blaze):** obowiązkowo (a) Cloudflare cache-everything + WAF + rate-limit + Turnstile,
  (b) App Check + `maxInstances` + hard-coded odbiorca + Resend hard-stop, (c) **kill-switch** (Auto Stop
  Services) jako twardy sufit, (d) sekret-nagłówek CF→funkcja przeciw CDN-bypass, (e) uczciwy skrypt dla klienta
  (bez obietnicy „nigdy nie zapłacisz"). Statyczny bake trzymać — zamyka Firestore/Storage jako wektory.
- **Jeśli Postawa CARD-FREE (Spark):** DoW w dużej mierze rozbrojony konstrukcyjnie; nadal warto Cloudflare cache
  + Turnstile na endpointach, ale bez ryzyka rachunku.

### Sources (DoW)

- Brak capa / avoid surprise bills: https://firebase.google.com/docs/projects/billing/avoid-surprise-bills · budżety https://docs.cloud.google.com/billing/docs/how-to/budgets
- Kill-switch: https://docs.cloud.google.com/billing/docs/how-to/disable-billing-with-notifications · Auto Stop Services https://extensions.dev/extensions/kurtweston/functions-auto-stop-billing
- App Check: https://firebase.google.com/docs/app-check · `maxInstances`: https://firebase.google.com/docs/functions/manage-functions
- Cloudflare: cache rules https://developers.cloudflare.com/cache/how-to/cache-rules/ · rate-limit free https://developers.cloudflare.com/waf/rate-limiting-rules/ · Turnstile https://developers.cloudflare.com/turnstile/plans/ · SSL redirect loop https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/
- Resend limity: https://resend.com/docs/knowledge-base/account-quotas-and-limits
- Incydenty: Milkie Way https://blog.tomilkieway.com/72k-1/ · GCS egress atak https://www.runway.horse/news/opinion-billing-in-the-cloud/ · Netlify https://news.ycombinator.com/item?id=39520776 · fala 2026 https://www.theregister.com/ai-ml/2026/05/13/google_users_fight_for_refunds...
- Firestore bilingowany mimo denied-rules: https://firebase.google.com/docs/database/usage/billing
- DoW akademicko: arXiv 2508.19284 (2025)

### Rozstrzygnięcie osi „kto trzyma billing" (owner-input 2026-07-22)

Owner: technicznie woli kartę/Blaze (brak rozwarstwienia usług, wszystko w Firebase); realny blok to **rozmowa
z klientem** — przekonanie go, że to bezpłatne i bezpieczne, a karta to wymóg formalny.

**Reframe:** skoro owner chce jeden-platformę (Firestore/Storage/Functions), warstwa techniczna jest już
zdecydowana. Zostaje **jedna zmienna: czyj billing account jest podpięty do projektu klienta.** Trzy warianty:

1. **Klient posiada projekt + podpina swoją kartę (domyślny, „clean cut").** Najbliżej „płacisz raz, jestem out".
   Wymaga (winnable) rozmowy o karcie. Realny koszt 0 zł.
2. **Klient posiada projekt, ale podpięty jest billing account OWNERA (owner-billed).** Klient **nie podpina
   karty** — owner absorbuje (near-zero) rachunek i bounded ryzyko. Ownership danych/kodu/domeny zostaje po
   stronie klienta; tylko metoda płatności jest ownera. Handoff: przy rozstaniu klient podpina swoją kartę (albo
   projekt spada na Spark). ⚠ Do potwierdzenia dokładny setup w konsoli (Cloud Billing account linkowalny do
   projektu innego właściciela — standard w agencjach). **Pooluje ryzyko DoW wielu klientów na koncie ownera** →
   trzymać jako per-klient wyjątek, nie default (kłóci się z „nie rozdrabniać się").
3. **Card-free / Spark (git-content):** zero karty i zero wątku billingowego, DoW-immune, ale rozwarstwia stack
   (Cloudflare Worker + git zamiast Firestore).

**Kluczowy insight — kill-switch to nie tylko backstop, to enabler sprzedaży.** Bez niego pitch „bezpieczne"
to „zaufaj, raczej nie będzie rachunku". Z nim („automatyczny odcinacz — w najgorszym razie strona się pauzuje,
nie Twój portfel") słowo **„bezpieczne" staje się uczciwe**. Rozszerzenie „Auto Stop Services" jest tym, co
czyni Postawę CARD sprzedawalną.

**Rekomendacja:** Postawa CARD, **wariant 1 (klient-billed) jako default** (czysty model „pay once, out"),
**kill-switch first-class** (warunek uczciwego „bezpieczne"), **concierge onboarding** (owner ustawia billing z
klientem na callu — spójne z „bezpośredni kontakt / prowadzę Cię przez proces"), **wariant 2 (owner-billed) jako
per-klient wentyl** dla odmawiających karty. Do Spark/git (3) iść tylko, jeśli owner chce zero wątku
billingowego i akceptuje rozwarstwienie.

**Honest PL-skrypt dla klienta (uczciwy TYLKO z wpiętym kill-switchem):** „Hosting działa w stałym darmowym
limicie Google — dla strony firmowej realny koszt to 0 zł/mies. Karta to wymóg planu Google (jak przy Google
Workspace czy Ads), nie znak, że coś płacisz. Ustawiam automatyczny odcinacz i alert: gdyby kiedykolwiek pojawił
się nietypowy ruch, usługa się wstrzyma, zanim cokolwiek się naliczy — chronię Twój portfel z automatu.
Wszystko podpinam z Tobą na krótkim callu."

### KOREKTA 2026-07-22 — wariant 2 WYCOFANY + Firestore działa na Spark

Owner (słusznie) odrzucił **wariant 2 (owner-billed)** jako niepoważny dla produktu. Zgoda — **superseded**.
Dlaczego niepoważny: czyni ownera **płatnikiem-of-record dla cudzych, niekontrolowanych na co dzień projektów**;
pooluje ryzyko DoW/nadużyć całej floty na jednej karcie ownera; jest ekonomicznie do góry nogami (jednorazowa
opłata, a **ciągła** liability); klient może zmienić IAM i zablokować ownera, który wciąż płaci; nie skaluje się.
OK najwyżej jako jednorazowa przysługa zaufanemu klientowi — **nie jako element oferty.** Wykreślić z rekomendacji.

**Druga korekta (do wcześniejszego uproszczenia):** „card-free = git-content, tracisz Firestore" było **zbyt
pesymistyczne. Firestore JEST dostępny na Spark bez karty** (50k reads/dzień) — patrz tabela granicy Blaze. Bez
karty odpadają **tylko Storage (media) i Functions (compute)**, nie Firestore. Więc card-free zachowuje Firestore
jako store treści; przesuwa jedynie **media → git** i **compute/trigger/kontakt → Cloudflare Worker**.

**Uczciwe binarne (nie ma trzeciej poważnej drogi):**
- **A — Blaze / karta klienta:** Firestore + Storage + Functions, jedna platforma, najprościej operacyjnie. Koszt:
  **rozmowa o karcie przy KAŻDEJ sprzedaży (nawracający podatek) + ekspozycja DoW** (wymaga kill-switcha).
- **C — Spark / card-free:** Hosting + **Firestore (treść, za darmo)** + Auth; media w git; trigger+kontakt na
  Cloudflare Worker. Klient nigdy nie płaci, **DoW-immune z definicji.** Koszt: **jednorazowa inżynieria** (Worker
  + pipeline media-w-git, budowane RAZ i reużywane na flotę) + lekkie rozłożenie stacku (Firestore/git/Cloudflare).

**Soczewka decyzji:** karta to **nawracający koszt per-sprzedaż** (friction + liability przy każdym kliencie,
zawsze); architektura card-free to **jednorazowy koszt inżynierski** amortyzowany na całą flotę. Dla produktu
sprzedawanego wielokrotnie to przechyla szalę ku **C** mocniej, niż sugerowałaby „prostota A" w izolacji.
Decyzja = ile owner toleruje nawracającego frictionu rozmowy o karcie vs jednorazowej roboty. Obie uczciwe.
