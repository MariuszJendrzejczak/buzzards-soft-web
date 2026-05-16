# Honeti — Apps Context

Working document collecting per-app context for the Honeti portfolio subpage.
Source: 1-on-1 interview with Mariusz (PL). Final copy will be reworked into
EN-language case-study cards in the React app.

Statuses for "Rola":
- **od zera** — built from scratch by Mariusz
- **rozwój i serwis** — inherited working codebase, extended and maintained
- **przejęty w trakcie** — taken over mid-implementation, finished and shipped

---

## Flutter

### 1. Infoshare

- **Stack:** Flutter
- **Rola:** od zera
- **Sklepy:**
  - Google Play — `com.infoshare.infoshareconference`
  - App Store — `id6443543236`
- **Kontekst biznesowy:** Aplikacja konferencyjna dla eventu IT.
- **Konkretna kontrybucja:**
  - separacja zależności (clean architecture)
  - offline-first
  - state management na Riverpodzie
  - integracja REST API
  - integracja Firebase
  - skaner QR
  - Sign in with Google + Sign in with Apple
  - deep linki

### 2. Uprawnienia Budowlane

- **Stack:** Flutter
- **Rola:** od zera
- **Sklepy:**
  - Google Play — `com.investconstructions.uprawnieniabudowlane`
- **Kontekst biznesowy:** Aplikacja do nauki dla osób przygotowujących się do
  egzaminu na uprawnienia budowlane. Zamówiona przez klienta, który sprzedaje
  swoim użytkownikom subskrypcję dostępu do treści.
- **Konkretna kontrybucja:**
  - state management na Riverpodzie
  - integracja REST API
  - offline-first
  - architektura MVC
  - obsługa plików PDF

### 3. Testy Prawnicze

- **Stack:** Flutter
- **Rola:** od zera
- **Sklepy:**
  - Google Play — `com.invest_constructions.uprawnienia_prawnicze`
- **Kontekst biznesowy:** Klon Uprawnień Budowlanych dla tego samego klienta —
  ten sam model (nauka pod egzamin + subskrypcja), inna domena (prawnicza).
- **Konkretna kontrybucja:** jak w Uprawnieniach Budowlanych — Riverpod, REST API,
  offline-first, MVC, obsługa PDF.

### 4. Gastro Ninja Kelner

- **Stack:** Flutter
- **Rola:** od zera
- **Sklepy:**
  - Google Play — `com.sayurisushi.gastroninjawaiter`
- **Kontekst biznesowy:** Narzędzie restauratora w ekosystemie Gastro Ninja
  (Sayuri Sushi) — przyjmowanie i obsługa zamówień przychodzących z aplikacji
  Klient oraz dodawanie zamówień zewnętrznych (np. z sali, telefonu).
- **Konkretna kontrybucja:**
  - architektura MVC
  - state management na Riverpodzie
  - integracja z drukarkami paragonowymi POS

### 5. Gastro Ninja Kurier

- **Stack:** Flutter
- **Rola:** od zera
- **Sklepy:**
  - Google Play — `com.sayurisushi.gastroninjacourier.app_courier`
- **Kontekst biznesowy:** Aplikacja dla kurierów dowożących jedzenie z ekosystemu
  Gastro Ninja — mini-Wolt do organizacji pracy rozwozicieli (przyjmowanie
  zleceń, śledzenie trasy, statusy dostaw).
- **Konkretna kontrybucja:**
  - architektura MVC
  - state management na Riverpodzie
  - integracja z Google Maps

---

## Unity (Honeti legacy)

### 6. Gastro Ninja Klient

- **Stack:** Unity, C#
- **Rola:** rozwój i serwis (kod pisany wcześniej przez kogoś innego)
- **Sklepy:**
  - Google Play — `com.sayurisushi.gastroninjaapp`
- **Kontekst biznesowy:** Aplikacja klienta końcowego w ekosystemie Gastro Ninja
  — platforma do zamawiania jedzenia, której właściciel używa we własnej
  restauracji i licencjonuje innym (model podobny do pyszne.pl / pizzaportal).
- **Konkretna kontrybucja:**
  - dodanie obsługi kodów promocyjnych
  - odświeżanie i poprawki widoków
  - utrzymanie i drobne usprawnienia na zgłoszenia z produkcji

### 7. Soildata

- **Stack:** Unity, C#
- **Rola:** projekt przejęty w połowie implementacji
- **Sklepy:**
  - Google Play — `com.soildata.soildataapp`
- **Kontekst biznesowy:** Narzędzie dla geodetów — aplikacja niszowa zamówiona
  przez konkretnego klienta, niezbyt popularna w sklepie.
- **Konkretna kontrybucja:**
  - integracja z Google Maps (w środowisku Unity — nietrywialna)
  - integracja REST API
  - architektura MVC
  - integracja z zewnętrzną biblioteką `.dll` dostarczoną przez klienta
- **Wyzwania techniczne:** dopięcie projektu zaczętego przez kogoś innego do
  stanu shipowalnego; integracja z dostarczoną z zewnątrz biblioteką DLL o
  ograniczonej dokumentacji.

### 8. Gen / Oczami Dziecka

- **Stack:** Unity, C# (build na PC)
- **Rola:** rozwój i serwis (kod pisany wcześniej przez kogoś innego)
- **Dystrybucja:** Aplikacja desktopowa, dystrybuowana poza sklepami (nie ma w
  Google Play). Strona produktu: <https://gen.edu.pl/>.
- **Kontekst biznesowy:** Interaktywna aplikacja edukacyjna dla szkół.
- **Konkretna kontrybucja:**
  - dodanie modułu tablicy interaktywnej do rozwiązywania zadań z obsługą
    pisania dotykiem
  - implementacja kolejnych rozszerzeń aktywności edukacyjnych
  - aktualizacja bazy pytań (zaszyta w buildzie — projekt sprzed czasu API)

### 9. Seria edukacyjna dla dzieci (4 apki, od zera)

- **Stack:** Unity, C#
- **Rola:** od zera (wszystkie 4 apki budowane na wspólnym silniku)
- **Kontekst biznesowy:** Apki edukacyjne dla dzieci — każda uczy innego
  zakresu treści, ale dzielą wspólny silnik trybu nauki, UX i monetyzację.
- **Wspólna kontrybucja techniczna:**
  - In-App Purchases (IAP)
  - reklamy (Ads)
  - Object Pooling (zarządzanie obiektami w grze)
  - Firebase Realtime Database
  - Firebase Analytics

**Apki w serii:**

| App | Package | Zakres treści |
|---|---|---|
| Angielski — słówka i obrazki | `com.honeti.words_en` | nauka słówek po angielsku |
| Czasowniki nieregularne IQ | `com.Honeti.IrregularVerbs` | nauka angielskich czasowników nieregularnych |
| Der Die Das | `com.honeti.derdiedas` | nauka rodzajników niemieckich (der / die / das) |
| Flagi | `com.honeti.flags` | nauka flag państw świata |

### 10. Dodatkowe apki edukacyjne (rozwój i serwis)

Apki przejęte do utrzymania, wpisane w tę samą serię edukacyjną Honeti, ale
**nie pisane od zera przez Mariusza**. Budują szerokość portfolio bez rozwadniania
sekcji „od zera".

| App | Package | Zakres treści |
|---|---|---|
| Tabliczka Mnożenia | `com.honeti.multiplication` | nauka tabliczki mnożenia |
| Potęgi i Pierwiastki | `com.honeti.exponents` | nauka potęg i pierwiastków |
| Cyfry Rzymskie | `com.honeti.roman` | nauka cyfr rzymskich |

*Rola dla wszystkich trzech:* rozwój i serwis w ramach tej samej serii
edukacyjnej Honeti (wspólny silnik z apkami z punktu 9).
