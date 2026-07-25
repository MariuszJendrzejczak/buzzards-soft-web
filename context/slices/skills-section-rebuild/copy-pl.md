# Section 03 skills rebuild — PL copy (Phase 1 deliverable)

> Reviewable copy artifact for `skills-section-rebuild` Phase 1. PL is the source of
> truth; EN/SV are a later phase (`transcreate-copy-en`) — NOT produced here.
> This artifact is **not** `messages/*.json` — Phase 2 lands it mechanically, key by key.
>
> **Register note.** Section 03 is the recruiter/technical-reader skills section (the
> same audience as the portfolio `warsztat` block), not the client-facing offer page.
> So technical terms (Riverpod, MCP, go_router, FCM, RevenueCat…) are legitimate here —
> the "no dev jargon" register floor governs the *client offer copy*, not this CV-style
> skills list. Prose fields still clear the full charter; bullets are sanctioned terse
> skill-phrases (owner: „ubrane w umiejętności, nie opisowe zdania").
>
> **Punctuation convention** (matches the current section-03 style): each bullet ends
> with a trailing comma; the final bullet in a block ends with a period.

---

## 1. Prose fields — `whatICanDeliver.*`

### `whatICanDeliver.eyebrow`

```
Sekcja 03 · Umiejętności
```

### `whatICanDeliver.title`  (OWNER-LOCKED)

```
Moje umiejętności i zalety
```

### `whatICanDeliver.intro`

```
Zestaw umiejętności, na których stoi moja praca — pogrupowany tak, żeby od razu było widać, gdzie mam mocne, udokumentowane doświadczenie. Rdzeń to programowanie produkcyjne aplikacji mobilnych oraz programowanie agentowe, w którym pracuję na co dzień. Za każdą pozycją stoją realne projekty z portfolio.
```

---

## 2. Card 3.1 — `whatICanDeliver.sections.31.*`

Card title (unchanged): `sections.31.title` = **„Programowanie produkcyjne"**

### 3.1 · Mobile — `sections.31.subBlocks.mobile`

`sections.31.subBlocks.mobile.title`:

```
Mobile development — Flutter / Dart
```

`sections.31.subBlocks.mobile.bullets` — **9 bullets** (`"1".."9"`):

```
1: aplikacje mobilne Android + iOS od zera i rozwój istniejących,
2: architektura: Clean Architecture, Riverpod, Dependency Injection, SOLID, use-cases, Freezed, json_serializable,
3: nawigacja i codegen: go_router, deep linki, build_runner,
4: dane i backend: REST API, Firebase, offline-first z synchronizacją, Hive, shared_preferences,
5: autoryzacja: JWT z odświeżaniem tokenu, secure storage, sesje, logowanie społecznościowe,
6: integracje z urządzeniem: aparat, skanowanie QR / kodów kreskowych, Google Maps, generowanie PDF, POS / drukarki,
7: powiadomienia i monetyzacja: FCM, in_app_purchase, RevenueCat, AdMob,
8: UI i animacje: responsywne UI, animacje implicit / Tween / Hero, Lottie,
9: jakość i wdrożenie: CI/CD na Codemagic, flavory, Git-flow, code review, publikacja w Google Play / App Store; testy jako standard w procesie.
```

**Block count to set in Phase 2:** `mobile` `bulletKeys` = 9 (`"1".."9"`).

Notes on inventory discipline (traceable to research "Verified inventory"):
- Included = only owner-✅ items. Excluded per research: BLoC/Cubit, MVVM-explicit,
  Riverpod code-gen, type-safe/nested routes, melos, retrofit, GraphQL, WebSockets,
  drift/Isar, SSL pinning/encryption/root-detection, biometric, BLE, workmanager,
  Amplitude/Mixpanel, Patrol/Maestro, golden tests, Fastlane, Pigeon/FFI/native
  Kotlin-Swift, Sentry, isolates/records/patterns/sealed, dynamic-color/adaptive/
  ThemeExtension/a11y (owner learn-list — not claimable now).
- Testing is deliberately a light "testy jako standard w procesie" tail on bullet 9
  (owner leans on the agent to write tests; the full agentic testing story lives in 3.2),
  not a standalone senior-testing claim.

### 3.1 · Unity — `sections.31.subBlocks.unity`  (SLIMMED to an "also" block)

`sections.31.subBlocks.unity.title`:

```
Wcześniej — Unity / C#
```

`sections.31.subBlocks.unity.bullets` — **1 bullet** (`"1"`):

```
1: aplikacje interaktywne w Unity / C# — wcześniejszy obszar mojej pracy, dziś skupiam się wyłącznie na mobile.
```

**Block count to set in Phase 2:** `unity` `bulletKeys` = 1 (`"1"`).

### 3.1 · Common — `sections.31.subBlocks.common`  (kept, lightly trimmed)

`sections.31.subBlocks.common.title`:

```
Wspólne dla obu stacków
```

`sections.31.subBlocks.common.bullets` — **3 bullets** (`"1".."3"`):

```
1: czytelność kodu, skalowalność architektury, długoterminowa utrzymywalność,
2: pełen cykl życia produktu: planowanie → implementacja → testy → wdrożenie → utrzymanie,
3: współpraca z developerami, testerami, project managerami, klientami.
```

**Block count to set in Phase 2:** `common` `bulletKeys` = 3 (`"1".."3"`).

---

## 3. Card 3.2 — `whatICanDeliver.sections.32.*`  (flagship, core, NO callout)

`sections.32.title`:

```
Programowanie Agentowe
```

`sections.32.bullets` — **11 bullets** (`"1".."11"`), ordered **osąd → orkiestracja → metoda → integracja**:

```
1: ocena jakości outputu agenta — gdzie mu zaufać, a gdzie wymagać weryfikacji,
2: review pod kątem intencji, zachowania i długoterminowego utrzymania kodu,
3: agent pracuje na osobnej gałęzi i nie merguje sam — decyzja zostaje po mojej stronie,
4: build i testy jako pętla zwrotna agenta — sam sprawdza swoją pracę, zanim ją oddaje,
5: wyspecjalizowane subagenty (implementer / tester / reviewer) z odseparowanym kontekstem, reviewer w trybie read-only,
6: spec-driven — plan jest kontraktem, nic nie powstaje przed zaakceptowaną specyfikacją,
7: context engineering — świadome zarządzanie budżetem tokenów i trwały, wersjonowany kontekst projektu,
8: Claude Code z własną konfiguracją: hooki, slash commands, skille,
9: MCP w stacku (context7, Playwright, Maestro) — agent ma realne narzędzia w moim stacku,
10: praca z LLM API (OpenAI, Anthropic) na poziomie integracji: structured output, function calling, tool use,
11: prompt caching i kontrola kosztów tokenów.
```

**Block count to set in Phase 2:** `sections.32` `bulletKeys` = 11 (`"1".."11"`);
`sections.32.callout` is **removed** (do not produce it — research Revision 2026-07-25b).

Dedup note vs. portfolio `warsztat` (`messages/pl.json:602-643`): 3.2 asserts the *skill*
in first-person capability register ("oceniam / prowadzę / potrafię"), phrased differently
from the `warsztat` tiles' third-person *proof* descriptions. No tile description is reused
verbatim — e.g. `warsztat` tile 4 reads „context7 (żywa dokumentacja libów), Playwright
(weryfikacja UI w przeglądarce)…"; 3.2 bullet 9 states the *capability* („MCP w stacku …
realne narzędzia agenta, nie sama wiedza") without re-listing the tile's parenthetical
gloss. Same for subagents (tile 2 lists the named agents as proof; 3.2 bullet 5 states the
orchestration skill).

---

## 4. Untouched / removed (for Phase 2 reference)

- `sections.33` (Soft skills) — **UNCHANGED**, keep all 5 existing bullets as-is.
- `sections.34`, `sections.35` — **REMOVED** (delete spec entries + i18n keys, all locales).
- `whatICanDeliver.variantGrowing` — key may stay (parity-harmless); 3.2 flips to `core`.

---

## 5. Block-count summary (for Phase 2 `bulletKeys`)

| Block | Keys | Count |
|---|---|---|
| `sections.31.subBlocks.mobile.bullets` | `"1".."9"` | 9 |
| `sections.31.subBlocks.unity.bullets` | `"1"` | 1 |
| `sections.31.subBlocks.common.bullets` | `"1".."3"` | 3 |
| `sections.32.bullets` | `"1".."11"` | 11 |
| `sections.33.bullets` | `"1".."5"` (unchanged) | 5 |
```
