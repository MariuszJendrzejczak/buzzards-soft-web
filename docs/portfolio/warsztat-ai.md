# Warsztat AI — Section 4.3 Context

Working document for section 4.3 — **Warsztat AI**.

Unlike sections 4.1 (Honeti — past work) and 4.2 (own deployments — gated on
project readiness), section 4.3 is about the **methodology Mariusz brings to
any team**. Always-on, no release gating. Format: tiles / accordion.

## Hero tile

**Sprint-driven workflow z typowanymi sesjami**

This is the headline artifact of the entire section. What it says:

- Each change starts from a durable context document (BRIEF.md, sprint file,
  content_redesign.md), not from a fresh prompt.
- Each agent session has a **type** (planner / implementer / tester / reviewer)
  and a single declared deliverable.
- Reviewer sessions are **read-only by tooling** — they cannot edit code,
  only write a list of concerns.
- ADRs are written before code, not after.
- Quality gates (round-trip tests, manual review, no auto-merge) are encoded
  in the workflow, not assumed.

**Selling point:** addresses the real fear behind hiring an AI-augmented dev —
"what if your agent breaks something I rely on" — with a concrete, demonstrable
answer: it doesn't, because the workflow makes it structurally impossible to
merge without human review and a tester pass.

**Artefakty do podlinkowania (publiczne dowody):**

- `BRIEF.md` projektu **Polilocale** — pokazuje "Working style with Claude Code"
  z deliverable per session type — link wchodzi po publicznym otwarciu repo
  (gated razem z sekcją 4.2 / pozycja 2)
- Sprint file z tej strony — `docs/sprints/sprint-*.md` jeśli takowy powstanie
  podczas implementacji v2 (do uzupełnienia w trakcie)
- Wybrany ADR — np. „dlaczego v2 React zamiast Flutter Web" lub
  „dlaczego struktura portfolio 4.1/4.2/4.3" (do napisania)

## Pozostałe kafelki (kolejność wagi)

### 2. Konfiguracja Claude Code

- własne `settings.json` z permissions per project
- custom keybindings
- hookify rules — z konkretnym przykładem hooka, który zaoszczędził konkretnego
  błędu (do wybrania z aktualnego setup'u)
- własny status line / powerline

### 3. Wyspecjalizowane subagenty

- code-reviewer, sprint-implementer, sprint-tester, sprint-reviewer,
  codex-rescue, legacy-analyst itp.
- Framing: *„każdy subagent ma osobne narzędzia, osobny prompt i osobny
  scope — nie jeden uniwersalny agent, który robi wszystko"*
- Pokazać jeden przykład: prompt subagenta, którego napisałem sam / dostosowałem
  (do wybrania)

### 4. Custom slash commands i skille

- przykład jednego flagowego, używanego codziennie
- Framing: *„powtarzalne procesy w SDLC zamknięte w polecenia, które uruchamia
  sam zespół, nie tylko ja"*

### 5. Integracje MCP w workflow

- **context7** — żywa dokumentacja libów zamiast outdated training cutoff
- **Playwright / Claude in Chrome** — agent weryfikuje UI w przeglądarce
- **scheduled-tasks** — automatyzacje na cronie
- Framing: *„agent ma realne narzędzia, nie tylko wiedzę"*

### 6. Persistent memory + bilingual rule

- system pamięci `~/.claude/projects/<repo>/memory/` z typami (user, feedback,
  project, reference)
- meta-konwencja PL-conversation / EN-markdown egzekwowana przez sam workflow
- Framing: *„kontekst nie znika między sesjami; konwencje są zapisane, nie
  mam ich w głowie"*

### 7. Kontrola kosztów + agent w pętli z manualnym review

- limity i budżety tokenów
- manualne potwierdzenia przed destrukcyjnymi operacjami
- ADR-y zanim agent dotyka kodu
- Framing: *„AI nie merguje sam — ja decyduję, co ląduje w main"*

## Format prezentacji

- **Na stronie głównej:** sekcja 4.3 jako grid kafelków (hero większy, reszta
  równa). Każdy kafelek ma tytuł, 1-2 zdania, ikonę, jeden CTA / przykład.
- **Podstrona `/warsztat`** *(opcjonalna, faza późniejsza):* deep dive per
  kafelek z konkretnymi przykładami kodu i screenshotami.
- **Akordeon zamiast podstrony** — alternatywa: kafelek po kliknięciu rozwija
  się w głębszy opis bez nawigacji. Decyzja zostaje na fazę UI.

## Status

Sekcja 4.3 jest **gotowa do implementacji od razu** — nie ma gates, jak 4.2.
Może pójść live razem z resztą v2 site, niezależnie od stanu Home Storage i
Polilocale.
