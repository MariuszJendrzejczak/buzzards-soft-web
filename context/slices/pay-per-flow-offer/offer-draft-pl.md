---
type: offer-copy-draft
status: example / starting-point (NOT final)
locale: pl
iteration: v2
created: 2026-07-21
related: research.md
note: >
  Roboczy przykład oferty modelu "flow", punkt wyjścia — nie finalne copy.
  Do realnej oferty jeszcze daleko; ceny i nazewnictwo do walidacji.
  Finalne copy przeszłoby przez ścieżkę generate-professional-copy-pl (voice charter)
  zanim trafi do messages/*.json. Reguły głosu zastosowane wstępnie:
  bez negacji/kontrastów, ton dojrzały (peer-to-peer), "dla" nie "na",
  bez sugestii przenoszenia projektu do innego wykonawcy.
---

# Flow — oferta dla klientów (draft v2, przykład)

> **Kontekst wyceny:** widełki i uzasadnienie w `research.md` (sekcja
> *Follow-up Research 2026-07-21*). Kotwica ~900 zł/flow, podłoga break-even ~700 zł,
> pozycjonowanie mid+/senior- (nie fractional-CTO). Siatka niżej jest jedną z możliwych
> realizacji tych widełek.

## Copy (sekcja po sekcji)

### 1. Nagłówek — hero
> ## Flow — dzienna jednostka pracy dewelopera, wzmocniona agentami AI.
> Stała cena za flow. Codzienny stand-up z Twoim zespołem. Dowieziony kawałek produktu każdego dnia.

### 2. Czym jest flow — productized unit
> Jeden **flow** to jeden cykl dostawy w ciągu dnia:
> **stand-up** z Twoim zespołem → **blok mojej pracy** nad Twoim zadaniem → **agenci AI pracujący w tle**, którzy posuwają Twój kod dalej między sesjami.
> Kupujesz dowieziony rezultat, wyceniony z góry jako jeden flow.

### 3. Jak wygląda dzień — cadence / stand-up
> **Rano — stand-up.** Krótkie spotkanie: ustalamy priorytet dnia. To Twój stały, zarezerwowany punkt styku.
> **W ciągu dnia — flow.** Realizuję ustalony zakres; równolegle agenci AI pracują nad Twoim repozytorium.
> **Efekt — dostawa.** Dzień kończy się dowiezionym kawałkiem produktu i jasną notą, co powstało.

### 4. Co dostajesz — value bullets
> - **Doświadczonego dewelopera** prowadzącego Twoje zadanie od stand-upu do dostawy.
> - **Pracę agentów AI w tle** — Twój produkt posuwa się dalej, także między moimi sesjami.
> - **Codzienny rytm i widoczność** — wiesz każdego dnia, co powstało.
> - **Kod w Twoim repozytorium** od pierwszego flow, na Twoich zasadach bezpieczeństwa.

### 5. Cennik — fixed price per flow + retainer
> **Pierwszy flow — 900 zł** *(pilotaż)*
> Jeden dzień, żeby zobaczyć, jak pracujemy razem, i jaki rezultat dowozi jeden flow.
>
> **Pół-rytm — 10 flow / mies. × 800 zł = 8 000 zł/mies.** *(pakiet)*
> Flow co drugi dzień roboczy. Dla stałego, spokojnego tempa rozwoju.
>
> **Pełny rytm — 20 flow / mies. × 750 zł = 15 000 zł/mies.** *(retainer)*
> Zarezerwowany flow każdego dnia roboczego + Twój codzienny stand-up. Najlepsza cena za flow.

### 6. Dostępność — SLA
> Masz **zarezerwowany codzienny slot** (stand-up) i **okno reakcji** w ciągu dnia roboczego. Prowadzę jawną, ograniczoną liczbę flow'ów dziennie, żeby każdy klient dostawał świeżą, całą uwagę w swoim bloku.

### 7. Jak pracuję — transparency (wyróżnik)
> Pracuję w modelu **fractional**: prowadzę kilka flow'ów dziennie, jawnie i z limitem, każdy z zarezerwowanym slotem. Wiesz dokładnie, jak wygląda mój dzień i gdzie jesteś w moim rytmie.

### 8. Własność i bezpieczeństwo — ownership
> Kod i dostępy są **Twoje od pierwszego flow** — pracuję w Twoim repozytorium, na Twoich zasadach. **NDA** i jasna nota o tym, gdzie żyją kod i dane, są standardem współpracy.

### 9. Dla kogo — segmentacja
> - **Founderów** budujących produkt, którym potrzebny stały, dowożący rytm.
> - **Firm rozwijających** własne narzędzia i aplikacje krok po kroku.
> - **Agencji**, którym przyda się dodatkowa moc w modelu white-label.

### 10. Jak zacząć — CTA (productized trial)
> **Umówmy pierwszy flow.** Jeden stand-up, jeden dzień pracy, jeden dowieziony rezultat — i decydujesz, w jakim rytmie idziemy dalej.

## Ekonomia siatki cen (skąd te liczby)

Pakiet 20-flow to zobowiązanie **jednego** klienta (≈ jeden flow każdego dnia roboczego).
Ponieważ w modelu mieści się do 3 flow dziennie:

| Obłożenie | Klienci na pakiecie | Flow/dzień | Przychód/mies. |
|---|---|---|---|
| Start / pesymistyczne | 1 | ~1 | 15 000 zł |
| Realny cel | 2 | ~2 | 30 000 zł |
| Pełne obłożenie | 3 | ~3 | 45 000 zł |

- 750 zł to ~17% taniej niż pojedynczy flow (900) — nagroda za stały rytm, wciąż nad
  break-even ~700 zł.
- Jeden pełny pakiet (15k) dobija górną granicę etatowego seata mid+/senior-; dwa (30k)
  to komfortowe pobicie; trzeci to sufit mocy przy 3 stand-upach dziennie.

## Decyzje otwarte (do kolejnej iteracji)

1. **3 poziomy czy 2?** — pół-rytm (10 flow) można wyciąć dla prostoty sprzedaży.
2. **Nazewnictwo poziomów** — „Pilotaż / Pół-rytm / Pełny rytm" to placeholder
   (alternatywa: „Flow / Flow+ / Flow Daily").
3. **Próg wejścia** — czy pilotaż (pojedynczy flow) jest jedyną furtką do pakietu, czy
   wchodzi się też wprost w pakiet.
4. **Nazwa jednostki** — zostajemy przy „flow" jako marce (rekomendacja z researchu: tak).

## Zmiany względem v1

- Cena z placeholderowych 1,5–3k → realna siatka **900 / 800 / 750 zł** (mid+/senior-,
  nie fractional-CTO).
- Dodana drabinka 3 poziomów (pilotaż → pół-rytm → pełny rytm).
- Sekcje przepisane afirmatywnie (bez negacji, bez sugestii przenoszenia projektu).
