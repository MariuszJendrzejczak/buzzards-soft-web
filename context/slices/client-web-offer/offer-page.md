---
date: 2026-07-18
author: Claude (Opus 4.8) + Mariusz
repository: buzzards_soft_web
topic: "Offer subpage — structure + copy (client-facing landing for the web offer)"
status: draft (copy source of truth = PL; EN + SV are downstream translations)
related: ./concept.md, ./research.md
---

# Offer subpage — structure + copy

Client-facing subpage on buzzards-soft.com that presents the web offer (Basic / Full +
individual quote) to **individual clients / micro-businesses**. This is the `(a)` copy +
structure step — the input for `/plan`. It does **not** implement anything.

## Locked decisions (this step)

- **Prices shown publicly** — full price list (1299 / 2499 + modules), promo as a launch price.
- **Languages: PL + EN + SV** — same set as the rest of the site. **PL is the copy source of
  truth here;** EN + SV are produced later as translations (dogfood the AI content pipeline).
- **Lead form: reuse the existing `contactForm`** — repeated on this page, possibly re-wrapped
  with an offer-specific intro. No new form engine.

## Audience & register note (important)

The parent site speaks to **tech recruiters / contract-givers** in technical language
(subagenty, codemody, MCP, sprint sessions). This subpage speaks to a **non-technical
micro-business owner**. Same honest Buzzards voice ("nie obiecuję rzeczy, których nie umiem
dowieźć"), but **plain register** — no dev jargon. The sophisticated-AI-process proof gets
**translated into client language** ("nie generator — realny człowiek z dopracowanym procesem",
"dostajesz gotowy tekst, nic nie piszesz"). Link the existing `#warsztat` / "AI Native
Development Workflow" section as the credibility anchor for anyone who wants to look under the hood.

---

## Section structure (top → bottom)

1. Hero · 2. Trzy drogi (problem/gap) · 3. Jak to działa (proces) · 4. W każdej stronie
(standard) · 5. Cennik (Basic / Full / indywidualna) · 6. Moduły (rozbudowa) · 7. Dlaczego
mówię wprost o AI · 8. Uczciwe granice (co NIE wchodzi) · 9. Wszystko jest Twoje (własność) ·
10. FAQ · 11. Wycena / formularz.

---

## 1. Hero

**Cel:** w 5 sekund powiedzieć *dla kogo*, *co* i *czym się różnisz*. CTA do wyceny.

> **Eyebrow:** Strony internetowe · dla firm i freelancerów
>
> **Nagłówek:** Strona jak z agencji — bez ceny agencji.
>
> **Podtytuł:** Robię strony dla małych firm, freelancerów i osób, które chcą zaistnieć w
> sieci. Pracuję z AI — dzięki temu dostarczam szybciej i taniej to, za co agencje liczą
> 4–5 tys. zł. Ale to nie generator: na każdym kroku jest człowiek, z którym pogadasz.
>
> **CTA główne:** Wyceń swoją stronę · **CTA poboczne:** Zobacz, jak to działa

## 2. Trzy drogi (problem / gap)

**Cel:** ustawić Cię jako trzecią drogę między agencją a generatorem.

> **Nagłówek:** Masz dziś dwie drogi — i obie mają haczyk.
>
> - **Agencja** — ładnie, ale 4–5 tys. zł i tygodnie czekania.
> - **Generator AI** — kilka stówek, ale szablon jak u wszystkich, a stronę tracisz w dniu,
>   w którym przestaniesz płacić abonament.
> - **Ja — trzecia droga.** Indywidualna strona robiona przez człowieka, w cenie bliżej
>   generatora niż agencji, którą dostajesz na własność. Bez abonamentu, bez szablonu.

## 3. Jak to działa (proces)

**Cel:** to jest różnicownik — pokazać kontrolowany proces „AI + człowiek" językiem klienta.
Podlinkować `#warsztat` jako dowód.

> **Nagłówek:** Jak powstaje Twoja strona — 5 kroków
>
> 1. **Rozmowa.** Zaczynamy od zwykłej rozmowy — opowiadasz, co robisz, dla kogo i czego
>    potrzebujesz. Rozmawiasz ze mną, nie z botem.
> 2. **Treść.** Nie musisz nic pisać. Na podstawie krótkiego wywiadu generuję i **sprawdzam**
>    teksty moim procesem — dostajesz gotowe do akceptacji. Wolisz swoje? Też dobrze — wtedy je
>    dopracowuję.
> 3. **Projekt.** Projektuję stronę pod Ciebie (nie szablon), pokazuję, nanosimy uwagi.
> 4. **Publikacja.** Publikuję na Twoim hostingu i Twojej domenie — wszystko na Twoich kontach.
> 5. **Poprawki.** Po starcie masz jeszcze rundy zmian (2 przy Basic, 4 przy Full).
>
> *Chcesz zobaczyć mój proces pod maską? [Tak pracuję z AI →](/#warsztat)* — ten sam
> kontrolowany tor, na którym powstała ta strona.

## 4. W każdej stronie (standard)

**Cel:** lista zaufania — co dostajesz zawsze, niezależnie od pakietu.

> **Nagłówek:** To dostajesz w każdej stronie
>
> - Mobilna i szybka (bo większość Twoich klientów wejdzie z telefonu)
> - Formularz kontaktowy + „zadzwoń jednym kliknięciem"
> - Podstawy SEO — techniczny fundament, żeby Google Cię widział
> - Darmowy hosting + Twoja własna domena + certyfikat SSL
> - Zgodność z RODO (baner cookies + polityka prywatności)
> - Teksty przygotowane i sprawdzone (jeśli nie masz własnych)

## 5. Cennik (Basic / Full / indywidualna)

**Cel:** jawny cennik, promo jako cena startowa. Trzecia kolumna = disclaimer.

> **Nagłówek:** Proste pakiety, jawne ceny

| | **Basic** | **Full** | **Większy projekt** |
|---|---|---|---|
| **Cena** | ~~1299 zł~~ **999 zł** *(cena startowa)* | ~~2499 zł~~ **1999 zł** *(cena startowa)* | **Wycena indywidualna** |
| **Dla kogo** | wizytówka / prosta oferta | firma, która chce być widoczna i łapać kontakt | sklep, custom od zera, złożone integracje |
| **Strona** | 1 strona, do 5 sekcji | do 8 sekcji + 2 podstrony | wg potrzeb |
| **Treść z AI + weryfikacja** | ✓ | ✓ | ✓ |
| **Formularz + SEO techniczne + RODO + hosting + domena** | ✓ | ✓ | ✓ |
| **Google Business (widoczność lokalna)** | moduł | ✓ | ✓ |
| **Animacje** | moduł | ✓ | ✓ |
| **Tryb ciemny/jasny (przełącznik)** | moduł | ✓ | ✓ |
| **1 język** | ✓ | ✓ | ✓ |
| **Rundy poprawek** | 2 / 7 dni | 4 / 14 dni | ustalane |
| | *Wyceń Basic* | *Wyceń Full* | *Porozmawiajmy* |

> *Ceny netto. „Cena startowa" obowiązuje w okresie startu oferty.* (Promo = okno 1–3 mies.,
> patrz concept.md — do domknięcia: warunek/termin końca promo.)

## 6. Moduły (rozbudowa)

**Cel:** pokazać, że stronę można rozbudować dokładnie o to, czego klient potrzebuje.

> **Nagłówek:** Rozbuduj o to, czego potrzebujesz

| Moduł | Cena |
|---|---|
| Widoczność lokalna (Google Business + Mapy + opinie) | +250 zł |
| Animacje / efekty | +400 zł |
| Tryb ciemny/jasny (przełącznik) | +400 zł |
| Dodatkowy język | +400 zł / język |
| Samodzielna edycja treści (bez abonamentu) | +700 zł |
| Zbieranie leadów (lista mailingowa albo arkusz zgłoszeń) | +400 zł (oba +550) |
| Rezerwacje / kalendarz | +350 zł |
| Dodatkowa podstrona | +300 zł |
| Blog / aktualności | +700 zł |
| Śledzenie konwersji (pod reklamy) | +250 zł |
| Konfiguracja domeny + firmowy e-mail | +150 zł |

## 7. Dlaczego mówię wprost o AI

**Cel:** zamienić jawność AI w atut (Twoje pozycjonowanie), bez wpadania w „to generator".

> **Nagłówek:** Używam AI — i mówię o tym wprost
>
> Bo to uczciwe i bo dzięki temu jesteś do przodu: płacisz mniej i masz szybciej. Ale to
> **nie jest „napisz mi stronę" wklejone do ChatGPT.** Mam własny, dopracowany proces —
> wyspecjalizowane narzędzia i etapy sprawdzania — żeby to, co dostajesz, było **dobre, a nie
> „jakieś". AI daje prędkość i niższą cenę. Ja daję jakość, decyzje i odpowiedzialność.**
>
> Dowód? Ta strona i moje projekty powstały dokładnie w tym procesie — a cały mój warsztat
> jest [publicznie opisany →](/#warsztat).

## 8. Uczciwe granice (co NIE wchodzi)

**Cel:** uczciwość = zaufanie (spójne z „nie obiecuję rzeczy, których nie umiem dowieźć").

> **Nagłówek:** Czego nie robię (i mówię to od razu)
>
> - **Nie sprzedaję kampanii pozycjonujących ani gwarancji „1. miejsce w Google"** — to
>   osobna, ciągła usługa i nie udaję, że ją robię. Buduję solidny fundament techniczny pod
>   SEO i widoczność lokalną (Google Business) — resztę uczciwie wskażę, komu zlecić.
> - **Sklepy, złożone integracje, realny system CRM** — robię, ale w wycenie indywidualnej,
>   nie w pakiecie.

## 9. Wszystko jest Twoje (własność, bez uwięzienia)

**Cel:** mocny różnicownik vs generatory i tani wykonawcy trzymający dostępy „jako zakładnika".

> **Nagłówek:** Strona jest Twoja — bez uwięzienia
>
> Domena, hosting, kod, treści, konta — wszystko na **Twoje** nazwisko i Twoje konta.
> **Bez abonamentu za stronę.** Gdybyś kiedyś chciał przejść do kogoś innego — zabierasz
> całość i nic nie tracisz. U mnie nic nie jest „zakładnikiem".

## 10. FAQ

> - **Ile to trwa?** Zwykle od kilku dni do ~2 tygodni, zależnie od pakietu.
> - **Muszę mieć gotowe teksty?** Nie. Mogę je przygotować i sprawdzić na podstawie krótkiej
>   rozmowy. Jeśli masz własne — tym lepiej, dopracuję.
> - **Nie mam logo / zdjęć?** [do domknięcia — zakres: co dostarczasz Ty, co jest modułem.]
> - **Czy sam będę mógł później edytować stronę?** Tak, jeśli dokupisz moduł samodzielnej
>   edycji — i to **bez abonamentu**.
> - **Czy płacę co miesiąc?** Nie. Za stronę płacisz raz. Jedyny stały koszt to Twoja domena
>   (~50–90 zł/rok), którą płacisz rejestratorowi, nie mnie.
> - **Pomożesz z domeną?** Tak — zakup i konfiguracja są w cenie.
> - **A RODO?** Baner cookies + polityka prywatności są w każdej stronie.

## 11. Wycena / formularz

**Cel:** konwersja. Reuse `contactForm` z ofertowym intro.

> **Nagłówek:** Opisz krótko, czego potrzebujesz — odezwę się z wyceną.
>
> (Reuse istniejącego `contactForm`; pole „Czego dotyczy kontakt?" z placeholderem
> dopasowanym do oferty stron, np. „jaką firmę/usługę masz i czego potrzebujesz".)

---

## Notes for /plan (technical mapping — not part of copy)

- **Route:** new segment under `app/[locale]/` — proponowane `oferta` (lub `strony`).
  `app/[locale]/oferta/page.tsx`. Zdecydować slug.
- **i18n:** nowa przestrzeń w `messages/pl.json` (source), potem `en.json` + `sv.json`
  (tłumaczenia). Namespace np. `offer`.
- **Form reuse:** `components/contactForm` + `contactInfo` — wstawić na podstronie z ofertowym
  intro; sprawdzić, czy formularz nie jest zahardkodowany pod kontekst „rola/kontrakt”
  (placeholdery mówią „rola / kontrakt / projekt”).
- **Design system:** reuse istniejących komponentów/sekcji (eyebrow „Sekcja NN”, karty,
  siatki z `components/portfolio/*`), żeby podstrona była spójna wizualnie.
- **Nawigacja:** dodać link w `nav.items` (np. „Strony dla firm” / „Oferta”). Zdecydować, czy
  w menu głównym, czy tylko link bezpośredni — bo audytorium inne niż reszta CV-strony.
- **SEO/meta:** własny title/description pod ofertę (osobne intencje wyszukiwania niż CV).
- **Pricing/promo:** jak technicznie obsłużyć „cena startowa” (hardcode teraz + ręczne
  zdjęcie po oknie promo, czy flaga/data). Najprościej: wartości w messages, zdjęcie ręczne.

## Open questions

1. **Slug + miejsce w nawigacji** (`/oferta` vs `/strony`; menu główne vs osobne wejście).
2. **Nazwy pakietów** — zostają „Basic / Full”, czy PL („Podstawowy / Pełny”)?
3. **Warunek/termin końca promo** („cena startowa” — do kiedy / do ilu klientów).
4. **Zakres FAQ „nie mam logo/zdjęć”** — co dostarcza klient, co jest modułem/wyceną.
5. **Czy podstrona zmienia pozycjonowanie całej strony?** buzzards-soft.com jest dziś CV pod
   rekrutację; dołożenie usługi dla mikrofirm to druga linia biznesowa — świadomie zostawić
   je rozdzielone (osobne wejścia), czy zintegrować?
6. **EN + SV** — tłumaczenia po zatwierdzeniu PL (dogfooding pipeline’u treści).
