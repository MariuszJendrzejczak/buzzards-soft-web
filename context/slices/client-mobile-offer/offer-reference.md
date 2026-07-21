# Oferta mobilna — punkt odniesienia (materiał roboczy)

> **Status: materiał poglądowy, nie do publikacji.** To roboczy punkt odniesienia do pracy nad
> realną ofertą aplikacji mobilnych Buzzards Soft. Zawiera dwie rzeczy:
> 1. **Zestawienie funkcjonalne** Basic / Full / Większy (co jest, czego nie ma) — rdzeń oferty.
> 2. **Dziewięć przykładowych tekstów oferty** (3 apki × 3 pakiety) — ilustracja tonu i zakresu.
>
> Teksty przykładowe **nie przeszły** pełnego negation-sweepa (świadomie — to materiał
> poglądowy o zakresie, nie finalne copy). Twarde fakty (ceny, koszty, zakres) pochodzą z
> `context/foundation/mobile-offer-facts.md` — to jest oracle faktów, ten plik jest tylko roboczą
> ilustracją.
>
> Ceny (netto): **Basic/Start 9 900 zł** (bazowo 12 900) · **Full 19 900 zł** (bazowo 24 900) ·
> **Większy projekt** — wycena indywidualna, od ~30 000 zł.

---

# CZĘŚĆ I — Zestawienie funkcjonalne (Basic / Full / Większy)

Uniwersalne (działa dla każdej apki); funkcje domenowe pokazane na przykładzie bookingu.

Legenda: **✓** = w pakiecie · **—** = brak (dopiero w wyższym) · **◑** = w ograniczonej/podstawowej formie

## 1. Podstawa (w każdym pakiecie identyczna)

| Funkcja | Basic (9 900) | Full (19 900) | Większy (od 30k) |
|---|:--:|:--:|:--:|
| iOS + Android z jednego kodu | ✓ | ✓ | ✓ |
| Tryb jasny / ciemny | ✓ | ✓ | ✓ |
| Języki PL / EN | ✓ | ✓ | ✓ |
| Publikacja w App Store + Google Play na kontach klienta | ✓ | ✓ | ✓ |
| Pomoc w założeniu kont sklepowych (Apple/Google, D-U-N-S) | ✓ | ✓ | ✓ |
| Backend na koncie klienta (własność) | ✓ | ✓ | ✓ |
| Model „płacisz raz — wszystko Twoje" | ✓ | ✓ | ✓ |
| 30 dni wsparcia po starcie | ✓ | ✓ | ✓ |

## 2. Konta i użytkownicy — kluczowa granica Basic↔Full

| Funkcja | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| **Logowanie / rejestracja użytkowników** | **—** | **✓** (e-mail + Google/Apple) | ✓ |
| Profil użytkownika | — | ✓ | ✓ |
| Dane użytkownika między urządzeniami (synchronizacja) | — *(tylko lokalnie na urządzeniu)* | ✓ | ✓ |
| Role i uprawnienia (np. właściciel vs klient) | — | ✓ (2 role) | ✓ (rozbudowane role/zespół) |
| Historia użytkownika (np. „moje rezerwacje" w chmurze) | — | ✓ | ✓ |

## 3. Powiadomienia

| Funkcja | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| Powiadomienie do właściciela o zdarzeniu (np. nowe zgłoszenie) | ✓ *(mail/serwerowe)* | ✓ | ✓ |
| **Powiadomienia push do użytkownika końcowego** | **—** | **✓** | ✓ |
| Przypomnienia zaplanowane (np. o wizycie T-24h) | — | ✓ | ✓ |
| Historia powiadomień w aplikacji | — | ✓ | ✓ |
| Kampanie / powiadomienia masowe, segmentacja | — | — | ✓ |

## 4. Dane, backend, offline

| Funkcja | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| Baza w chmurze (na koncie klienta) | ◑ *(lekka)* | ✓ (pełna) | ✓ |
| Reguły bezpieczeństwa danych | ◑ *(podstawowe)* | ✓ (per-rola) | ✓ |
| Przechowywanie plików/zdjęć | — | ◑ *(np. zdjęcia usług/profil)* | ✓ |
| Pełny tryb offline | ◑ *(dane lokalne)* | ✓ | ✓ |
| Logika serwerowa (funkcje w chmurze) | ◑ *(1 — powiadomienie)* | ✓ *(przypomnienia, lojalność, walidacje)* | ✓ *(+ płatności, integracje)* |

## 5. Panel właściciela / administracja

| Funkcja | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| **Panel właściciela w aplikacji** (zarządzanie treścią/usługami/dostępnością) | **—** *(zmiany przez dewelopera/konsolę)* | **✓** | ✓ (rozbudowany) |
| Podgląd i obsługa zgłoszeń/rezerwacji z telefonu | — | ✓ | ✓ |
| Statystyki / przegląd | — | ◑ *(podstawowe)* | ✓ *(rozbudowane, raporty)* |
| Wiele lokalizacji / oddziałów | — | — | ✓ |
| Zaawansowane role zespołowe (recepcja, manager) | — | — | ✓ |

## 6. Funkcje domenowe — na przykładzie Booking App

| Funkcja | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| Główny scenariusz (przegląd usług + rezerwacja) | ✓ *(jako zgłoszenie)* | ✓ | ✓ |
| Gwarancja braku podwójnej rezerwacji (transakcyjnie) | — *(prośba, właściciel potwierdza)* | ✓ | ✓ |
| Samodzielne odwołanie / przełożenie przez klienta | — | ✓ | ✓ |
| Program lojalnościowy (pieczątki/punkty) | — | ◑ *(podstawowy)* | ✓ *(poziomy, kampanie)* |
| **Płatności / przedpłaty online** | **—** | **—** | **✓** |
| Wybór konkretnego pracownika / grafik per osoba | — | — | ✓ |
| Integracje zewnętrzne (kalendarz, systemy klienta) | — | — | ✓ |
| Współpraca w czasie rzeczywistym / komentarze | — | — | ✓ |

## 7. Jakość, analityka, prawne

| Funkcja | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| Analityka (podstawowe zdarzenia) | ◑ *(lekka)* | ✓ *(przez kluczowe flow)* | ✓ |
| Raportowanie awarii (crash) | ✓ | ✓ | ✓ |
| Testy | ◑ *(smoke + cienka warstwa)* | ✓ *(+ automaty na kluczowej logice)* | ✓ *(szersze)* |
| Polityka prywatności (wymóg sklepów) | ✓ | ✓ | ✓ |
| Regulamin (konta / lojalność) | — *(zwykle zbędny)* | ✓ | ✓ |

## 8. Skala projektu (orientacyjnie)

| | Basic | Full | Większy |
|---|:--:|:--:|:--:|
| Liczba ekranów | ~6–7 | ~25–31 | wg zakresu |
| Czas do publikacji | ~5–7 tyg. | ~8–11 tyg. | wg zakresu |
| Cena netto (promo / baza) | 9 900 / 12 900 | 19 900 / 24 900 | od ~30 000 |

## Trzy zdania, które trzymają całość

1. **Basic ↔ Full = granica na kontach.** Basic działa bez logowania (dane lokalnie na urządzeniu,
   rezerwacja jako zgłoszenie). Full wprowadza konta, synchronizację, role i **wszystko, co z nich
   wynika**: historia użytkownika, push do klienta, panel właściciela, lojalność.
2. **Push: właściciel dostaje powiadomienie w każdym pakiecie; użytkownik końcowy — dopiero od
   Full** (bo push do klienta wymaga konta i zaplanowanej logiki serwerowej).
3. **Full ↔ Większy = granica na pieniądzach i skali.** Płatności online, wiele lokalizacji, wybór
   pracownika, integracje i współpraca zespołowa zaczynają się w „Większy projekt".

---

# CZĘŚĆ II — Przykładowe teksty oferty (3 apki × 3 pakiety)

> Materiał poglądowy — ilustruje ton i zakres, nie jest finalnym copy.

## APKA 1 — BOOKING APP

### 1A · Basic/Start — 9 900 zł

Twoja aplikacja rezerwacyjna — na iPhone'a i Androida, gotowa, by klienci umawiali się do Ciebie z telefonu, w kilka sekund.

Buduję ją osobiście, wspierając się narzędziami AI tam, gdzie przyspieszają pracę — dzięki temu dostajesz aplikację szybciej i w rozsądnej cenie, a każdą decyzję o tym, jak działa i wygląda, podejmuję i sprawdzam sam. To ja odpowiadam za efekt.

**Co dostajesz w pakiecie Start:**
- **Jeden dopracowany scenariusz rezerwacji.** Twój klient otwiera aplikację, przegląda usługi, wybiera termin i wysyła zgłoszenie.
- **Powiadomienie o każdej nowej rezerwacji trafia prosto do Ciebie** — wiesz od razu, kto i kiedy chce się umówić, i potwierdzasz termin po swojemu.
- **iPhone i Android z jednego projektu** — jedna aplikacja dla wszystkich Twoich klientów.
- **Tryb jasny i ciemny oraz polski i angielski** w standardzie.
- **Zaplecze techniczne na Twoim koncie** — kosztuje praktycznie 0 zł do momentu realnego ruchu.
- **Pełna publikacja w App Store i Google Play na Twoich kontach.** Prowadzę Cię przez założenie kont i wymogi Apple oraz Google. Zaczynamy pierwszego dnia — formalności sklepów bywają dłuższe niż budowa, więc uruchamiamy je od razu.
- **Płacisz raz.** Kod, projekt i konta są Twoje. Stałe koszty to opłaty platform: Apple 99 USD rocznie, Google 25 USD jednorazowo.
- **30 dni wsparcia po starcie.**

Gdy zechcesz iść dalej — konta klientów, samodzielne odwoływanie, panel właściciela, przypomnienia push, program lojalnościowy — to naturalne rozszerzenia w pakiecie **Full**.

**Porozmawiajmy o Twojej aplikacji.** Napisz do mnie — pokażę, jak rezerwacje w Twoim salonie mogłyby wyglądać na telefonie.

### 1B · Full — 19 900 zł

**Aplikacja rezerwacyjna dla Twojego salonu czy gabinetu**

Twoi klienci rezerwują wizytę z telefonu, a Ty prowadzisz cały grafik z jednego miejsca — również z telefonu. Gotowa aplikacja na iOS i Androida, zbudowana raz i oddana w całości do Ciebie.

**Co dostają Twoi klienci**
- **Rezerwacja wizyty w kilka sekund** — wybierają usługę i wolny termin.
- **Własne konto** — widzą swoje nadchodzące i minione wizyty w jednym miejscu.
- **Samodzielne odwołanie i przełożenie** — przekładają wizytę sami, zgodnie z zasadami, które ustalasz.
- **Przypomnienie push o wizycie.**
- **Program lojalnościowy** — pieczątki albo punkty za wizyty i nagroda po ich uzbieraniu.

**Co dostajesz Ty — panel właściciela w aplikacji**
- **Zarządzanie usługami** — dodajesz i zmieniasz ofertę, gdy chcesz.
- **Dostępność i grafik** — ustawiasz, kiedy przyjmujesz.
- **Podgląd i obsługa rezerwacji** — porządek w terminach w jednym widoku.

**W standardzie:** iOS i Android z jednego kodu; tryb jasny/ciemny + PL/EN; zaplecze na Twoim koncie; pełna publikacja w App Store i Google Play na Twoich kontach (zakładam je razem z Tobą, zaczynamy pierwszego dnia).

**Płacisz raz — całość jest Twoja.** Koszty bieżące: Apple 99 USD/rok, Google 25 USD jednorazowo, zaplecze ≈ 0 zł do realnego ruchu. **30 dni wsparcia** po starcie.

Buduję jako jedna osoba, wspierając się AI — dlatego szybciej i taniej. Ale to ja podejmuję decyzje, sprawdzam efekt i biorę za niego odpowiedzialność.

Gdy firma urośnie, naturalnym krokiem są **płatności online** i **obsługa wielu lokalizacji** — to już „Większy projekt".

Chcesz zobaczyć swoją aplikację? **Napisz — odezwę się z propozycją i wyceną.**

### 1C · Większy projekt — od ~30 000 zł

**Booking App w wersji rozbudowanej — wycena indywidualna**

Znasz już pakiet Full: kompletną aplikację rezerwacyjną. Ten poziom zaczyna się tam, gdzie Full się kończy — i idzie dużo dalej.

Wyobraź sobie, że klient rezerwuje wizytę i od razu płaci zaliczkę online. Że wybiera konkretną osobę — swojego fryzjera, swojego trenera — i widzi wyłącznie jej wolne terminy, bo aplikacja zna grafik każdego pracownika z osobna. Że prowadzisz kilka oddziałów i każdy ma swój kalendarz, swoją obsadę i swoje statystyki, a Ty ogarniasz wszystko z jednego miejsca. Do tego aplikacja rozmawia z kalendarzem, którego już używasz. A na wierzchu: rozbudowany program lojalnościowy i kampanie przypominające stałym klientom, że czas wrócić.

To przykłady — realne kierunki. Twoja rozbudowana Booking App weźmie z nich dokładnie to, co pcha Twój biznes do przodu.

Zakres i cenę ustalamy **razem**, po rozmowie. Najpierw przechodzę z Tobą przez to, jak działasz na co dzień i gdzie uciekają pieniądze. Z tego układamy zakres — a z zakresu bierze się cena. Projekty tego typu zaczynają się od około **30 000 zł netto**.

Standard zostaje ten sam: jedna aplikacja na iPhone'ach i Androidach, tryb jasny/ciemny + PL/EN, zaplecze na Twoim koncie, publikacja w App Store i Google Play na Twoich kontach (zaczynamy pierwszego dnia). Płacisz raz, całość jest Twoja. Koszty bieżące: Apple 99 USD/rok, Google 25 USD jednorazowo, serwer ≈ 0 zł do dużego ruchu. 30 dni wsparcia.

Buduję sam, wspierając się AI — ale każdą decyzję podejmuję i sprawdzam osobiście. Dostajesz jednego rozmówcę od początku do końca.

**Umówmy rozmowę.** Opowiedz, jak działa Twój biznes — wrócę z konkretnym zakresem i wyceną.

## APKA 2 — FLOWCHART APP

### 2A · Basic/Start — 9 900 zł

Aplikacja mobilna, w której Twoi ludzie tworzą i przeglądają czytelne schematy — kroki procesu połączone strzałkami, instrukcje krok-po-kroku, mapy prostych decyzji. Idealna dla firmy szkoleniowej lub usługowej, która chce mieć swoje procedury w jednym, przejrzystym miejscu.

**Co dostajesz w pakiecie Start:**
- Tworzenie i przeglądanie prostych, liniowych schematów — kolejne kroki spięte strzałkami.
- Kilka gotowych szablonów, od których zaczynasz w kilka sekund.
- Zapis schematów bezpośrednio na urządzeniu — masz je zawsze przy sobie.
- Eksport gotowego schematu do obrazka — wyślesz mailem, wrzucisz do prezentacji albo wydrukujesz.
- Tryb jasny i ciemny oraz polski i angielski w standardzie.

**Standard, który dostajesz zawsze:** aplikacja działa na iPhone'ach i Androidach z jednego kodu. Pełną publikację w App Store i Google Play robię za Ciebie — na Twoich kontach — i pomagam je założyć oraz przejść przez wymogi Apple i Google. Zaplecze stoi na Twoim koncie i kosztuje praktycznie 0 zł do czasu realnego ruchu. Płacisz raz, a wszystko jest Twoje. Stałe opłaty platform: Apple 99 USD rocznie, Google 25 USD jednorazowo.

Jestem jednym ekspertem, który buduje z pomocą AI — dzięki temu szybciej i taniej, a Ty masz jedną osobę odpowiedzialną za całość. Publikację uruchamiam pierwszego dnia, bo procedury sklepów potrafią trwać dłużej niż budowa. W cenie 30 dni wsparcia.

Kiedy zechcesz pójść dalej — konta i synchronizacja w chmurze, rozbudowany edytor z gałęziami i decyzjami, udostępnianie online i wspólna praca zespołu — rozwijamy aplikację w pakiecie **Full**.

**Porozmawiajmy** o Twoich schematach — pokażę, jak Twoja aplikacja może wyglądać.

### 2B · Full — 19 900 zł

Jeśli prowadzisz firmę szkoleniową, usługową albo konsultingową, Twoja wiedza często ma postać procesu: krok po kroku, z decyzjami i rozgałęzieniami. Ta aplikacja zamienia to w klarowny schemat, który Twoi klienci i zespół mają zawsze pod ręką — na iPhonie i na Androidzie, z jednego wspólnego kodu.

W pakiecie **Full** dostajesz pełne narzędzie:
- **Konta użytkowników i synchronizacja** — każdy schemat dostępny na telefonie, tablecie i po zmianie urządzenia.
- **Pełny edytor** — gałęzie, decyzje i rozbudowane układy, żeby oddać nawet złożony proces.
- **Foldery i kategorie** — porządkujesz schematy po projektach, klientach albo szkoleniach.
- **Udostępnianie linkiem lub obrazkiem** — wysyłasz gotowy schemat klientowi jednym dotknięciem.
- **Tryb offline** — schematy działają na sali szkoleniowej i tam, gdzie zasięg bywa kapryśny.
- **Przypomnienia push** — informujesz odbiorców, że schemat został zaktualizowany albo udostępniony.

W standardzie: **tryb jasny i ciemny oraz PL/EN**, dane na backendzie **na Twoim koncie** — wszystko należy do Ciebie. Zajmuję się **pełną publikacją w App Store i Google Play na Twoich kontach** i pomagam je założyć. Publikację zaczynamy pierwszego dnia.

**Płacisz raz — aplikacja, kod i dane są Twoje.** Koszty bieżące: Apple 99 USD/rok, Google 25 USD jednorazowo, backend ≈ 0 zł do realnego ruchu. **30 dni wsparcia.**

**Cena: 19 900 zł netto** (promocyjnie; bazowo 24 900 zł).

Współpracę zespołową na żywo, eksport do branżowych formatów i integracje realizuję w pakiecie **„Większy projekt"**.

Pracuję solo i buduję z pomocą AI — szybciej i taniej, a odpowiadam za efekt osobiście. Napisz jednym zdaniem o swoim procesie, a podpowiem, jak ująć go w aplikacji.

### 2C · Większy projekt — od ~30 000 zł

**Flowchart App dla zespołu — schematy, nad którymi pracujecie razem**

Wyobraź sobie jedno miejsce, w którym cały zespół tworzy schematy procesów: diagramy przepływu, mapy decyzji, plany działania. Kilka osób pracuje nad tym samym schematem w tym samym czasie i widzi swoje zmiany na żywo. To wersja rozbudowana Flowchart App: aplikacja, która rośnie razem z Twoją firmą.

W tej wersji schematy stają się wspólną przestrzenią. Do konkretnego elementu ktoś dopisuje komentarz, a reszta zespołu od razu wie, o co chodzi. Uprawnienia ustalasz sam. Firmowe szablony trzymasz w jednej bibliotece. Gotowe diagramy eksportujesz do PDF i do formatów Twojej branży, a aplikację można połączyć z narzędziami, na których pracuje zespół.

Zakres ustalamy wspólnie. Zaczynamy od rozmowy o tym, jak dziś powstają u Was schematy — a potem układam z tego konkretny plan i wycenę indywidualną, od około **30 000 zł netto**, dopasowaną do tego, co ma powstać. Wszystko buduję jako ekspert, który używa AI — szybciej i taniej, a odpowiadam za efekt osobiście.

Aplikacja działa na iPhone'ach i Androidach z jednego projektu, z trybem jasnym i ciemnym oraz PL/EN w standardzie. Backend stawiam na Twoim koncie — cała aplikacja i dane należą do Ciebie. Publikację w App Store i Google Play zaczynamy pierwszego dnia, na Twoich kontach, a ja pomagam je założyć. Płacisz raz — całość jest Twoja. Koszty bieżące: Apple 99 USD/rok, Google 25 USD jednorazowo, backend ≈ 0 zł do realnego ruchu. 30 dni wsparcia.

Jeśli widzisz tu aplikację dla swojego zespołu, napisz — umówmy rozmowę i ustalmy zakres oraz wycenę.

## APKA 3 — ORGANIZER APP

### 3A · Basic/Start — 9 900 zł

**Twój osobisty organizer jako aplikacja mobilna**

Masz w głowie obraz prostej, konkretnej aplikacji: miejsce, w którym Twoi użytkownicy (albo Ty i Twój zespół) trzymają zadania, notatki i przypomnienia. Pakiet **Start** buduje dokładnie taką aplikację i oddaje ją w Twoje ręce.

Jestem samodzielnym deweloperem, który wspiera się AI, żeby robić to szybciej i taniej — a za efekt odpowiadam osobiście.

**Co dostajesz w pakiecie Start:**
- **Listy zadań i notatki** — Twoi użytkownicy zapisują, co mają zrobić, i dopisują notatki.
- **Kategorie** — zadania i notatki układają się w sensowne grupy (praca, dom, projekt).
- **Przypomnienia na urządzeniu** — aplikacja zwróci uwagę we właściwym momencie.
- **Zapis na urządzeniu** — dane od razu dostępne, aplikacja działa płynnie.
- **Tryb jasny i ciemny oraz polski i angielski** — w standardzie.

**W standardzie każdego pakietu:** aplikacja powstaje raz i działa na **iPhone'ach i Androidach** z jednego kodu. **Backend stoi na Twoim koncie**, aplikacja jest w pełni Twoja — płacisz raz. Zajmuję się też **pełną publikacją w App Store i Google Play na Twoich kontach**, z pomocą przy ich założeniu i wymogach Apple i Google.

Koszty bieżące są przewidywalne: Apple 99 USD rocznie, Google 25 USD jednorazowo, backend praktycznie 0 zł do realnego ruchu. **Publikację zaczynamy pierwszego dnia** — uczciwie mówię, że procedury sklepów potrafią trwać dłużej niż budowa. Po oddaniu aplikacji **30 dni wsparcia**.

Gdy zechcesz pójść dalej — konta i synchronizacja między urządzeniami, powiadomienia push, współdzielone listy dla zespołu — to naturalny kolejny krok w pakiecie **Full** lub większym.

**Start — 9 900 zł netto** (promocyjnie; bazowo 12 900 zł).

Jeśli widzisz tu swoją aplikację, napisz do mnie — omówimy szczegóły.

### 3B · Full — 19 900 zł

**Organizer App — pakiet Full**

Twój osobisty organizer: zadania, notatki, przypomnienia i kalendarz w jednym miejscu — na telefonie i tablecie. Gotowa aplikacja dla osób, które chcą ogarnąć swój dzień. Zapisujesz zadanie, przypinasz notatkę, ustawiasz przypomnienie — a aplikacja pilnuje reszty.

**Co dostajesz w pakiecie Full:**
- **Zadania, notatki i przypomnienia** — uporządkowane tak, jak myślisz o swoim dniu.
- **Konta i synchronizacja między urządzeniami** — te same dane na telefonie i tablecie.
- **Przypomnienia push** — aplikacja daje znać w odpowiednim momencie.
- **Kalendarz i terminy** — zadania i spotkania w jednym przejrzystym widoku.
- **Tagi i foldery** — porządkujesz sprawy po swojemu.
- **Zadania powtarzalne** — cykliczne obowiązki ustawiasz raz, wracają same.
- **Przegląd postępów** — prosty widok tego, co już zrobione.

**W standardzie:** iPhone i Android z jednego kodu, tryb jasny/ciemny oraz PL/EN. Dane trzyma backend na Twoim koncie — wszystko należy do Ciebie. Zajmuję się pełną publikacją w App Store i Google Play na Twoich kontach, z pomocą w ich założeniu. Publikację zaczynamy pierwszego dnia.

Płacisz raz i wszystko jest Twoje. Koszty bieżące po Twojej stronie: Apple 99 USD rocznie, Google 25 USD jednorazowo, backend przy realnym ruchu startuje praktycznie od zera. Do tego 30 dni wsparcia po wydaniu.

Pakiet Full to w pełni dopracowany organizer dla jednej osoby. Współdzielone listy dla zespołu lub rodziny oraz zaawansowane integracje to temat na **„Większy projekt"** — chętnie rozrysuję taki wariant, kiedy będzie Ci potrzebny.

**Full — 19 900 zł netto** (promocyjnie; bazowo 24 900 zł).

Buduję jako samodzielny developer, który świadomie korzysta z AI — szybciej i taniej, a odpowiadam za całość osobiście. Jeśli taki organizer to jest to, czego szukasz, napisz.

### 3C · Większy projekt — od ~30 000 zł

**Organizer dla całego zespołu — jeden porządek dla wszystkich**

Masz już wizję organizera, który obejmuje więcej niż jedną osobę? Taki, w którym rodzina albo cały zespół pracuje na wspólnych listach, projektach i terminach — każdy widzi to, co go dotyczy. To właśnie buduję na tym poziomie.

Wyobraź sobie współdzielone listy i projekty, do których dołączasz swoich ludzi — z uprawnieniami dopasowanymi do roli. Ty rozdzielasz zadania, przydzielasz je konkretnym osobom i na bieżąco widzisz postępy. Terminy spinają się z kalendarzem, którego już używacie. Do tego automatyzacje i zespołowe przypomnienia.

Zakres ustalamy razem. Zaczynamy od rozmowy: opowiadasz, jak pracujecie, a ja przekładam to na konkretne funkcje i realną wycenę — płacisz dokładnie za to, co jest Ci potrzebne. Taki projekt zaczyna się zwykle od około **30 000 zł netto**, a kwotę domykamy wspólnie.

Jestem solowym deweloperem, który tworzy z pomocą AI — szybciej i taniej, a za całość odpowiadam osobiście. Aplikacja działa na iOS i Androidzie z jednego kodu, z trybem jasnym i ciemnym oraz PL/EN w standardzie. Backend stoi na Twoim koncie, publikację w App Store i Google Play prowadzimy na Twoich kontach — pomagam je założyć i zaczynamy pierwszego dnia. Płacisz raz, wszystko zostaje Twoje. Koszty bieżące: Apple 99 USD rocznie, Google 25 USD jednorazowo, backend praktycznie przy zerze do realnego ruchu. 30 dni wsparcia.

Jeśli widzisz swój organizer większym, wspólnym narzędziem — porozmawiajmy. Opowiedz o pomyśle, a przygotuję indywidualną wycenę.

---

## Do pracy nad realną ofertą (otwarte tematy)

- **Ceny** — 9 900 / 19 900 / od 30 000 przyjęte jako robocze; potwierdzić jako finalne (⚠).
- **Okno promocyjne** — czy przenosimy z webu mechanikę „do końca sierpnia" (⚠).
- **Negation-sweep** — te teksty są poglądowe; realne copy przejdzie sweep (reguła zero-tolerancji: brak negacji/kontrastu).
- **Ton „Ty" vs „Pan/Pani"** — do decyzji dla realnej oferty.
- **Warunki płatności** — etapy + zadatek (z `research-payment-terms.md`), przy ticketach 10–20k+ tym bardziej zasadne (⚠).
- **Powiązanie ze stroną** — docelowo osobna podstrona `mobile-*-offer` + namespace i18n `mobileOffer` (mirror webowego `offer`).

**Źródła prawdy:** `context/foundation/mobile-offer-facts.md` (oracle faktów) · `context/slices/client-mobile-offer/research.md` (research rynkowy 2026).
