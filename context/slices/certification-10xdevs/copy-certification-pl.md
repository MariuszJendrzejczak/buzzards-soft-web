# Certification section — PL copy (source of truth)

> Returned by the `copywriter` agent for **Session 2 / Phase 2** of slice
> `certification-10xdevs`. This is the PL string set for a new `certification` i18n
> namespace. **NOT `messages/*.json`** — the next session lands it (PL here → EN/SV
> transcreated → all three landed key-parallel with a `nav.items.certification` label).
>
> Facts oracle for this section = the **certificate itself** (facts quoted verbatim in
> the Session-2 brief + slice plan §Current State, line 47–53). Proper nouns (course,
> instructors, badge names, date) are verbatim and must survive transcreation unchanged.
> Charter self-check (Voice-Gap-Test) below reports **zero** charter violations.

## Copy (one key per line, `certification.*` namespace)

```
certification.eyebrow = Sekcja 02 · Warsztat
certification.title = Warsztat AI, potwierdzony certyfikatem 10xDevs
certification.intro = Ukończyłem kohortowy kurs 10xDevs — intensywny program o budowaniu software'u z agentami AI, prowadzony przez Przemka Smyrdka i Marcina Czarkowskiego. Poniżej certyfikat, zdobyte odznaki i pięć obszarów, które kurs objął.

certification.credential.courseName = 10xDevs — kurs kohortowy
certification.credential.issuer = BRAVE / 10xDEVS · Przemek Smyrdek i Marcin Czarkowski
certification.credential.date = 20 lipca 2026
certification.credential.instructors = Przemek Smyrdek i Marcin Czarkowski
certification.credential.facts = Prework i 25 lekcji w 5 modułach, 6 sesji na żywo (kick-off, 4× Live Q&A, celebracja) oraz cotygodniowe office hours. Projekt końcowy: własny agent AI i wewnętrzne narzędzia zbudowane end-to-end.

certification.badges.builder.name = 10xBuilder
certification.badges.builder.caption = Za zbudowanie działającego rozwiązania w toku kursu.
certification.badges.architect.name = 10xArchitect
certification.badges.architect.caption = Za projektowanie architektury pod pracę z agentami AI.
certification.badges.champion.name = 10xChampion
certification.badges.champion.caption = Wyróżnienie za aktywność i wyniki w całej kohorcie.
certification.badges.bestProject.name = Best Project
certification.badges.bestProject.caption = Wyróżnienie dla projektu końcowego.

certification.areas.1.title = Agentic Environment
certification.areas.1.desc = Konfiguracja środowiska pod pracę z agentami AI: narzędzia, uprawnienia i reguły, które trzymają agenta w ryzach projektu.
certification.areas.2.title = 10xDevs Workflow
certification.areas.2.desc = Powtarzalny tor od briefu do działającego kodu — z jasnym podziałem na to, co robi agent, a gdzie decyduje człowiek.
certification.areas.3.title = AI Development Quality & Maintenance
certification.areas.3.desc = Jakość i utrzymanie kodu tworzonego z AI: testy, przeglądy i standardy, które utrzymują projekt w dobrej formie na lata.
certification.areas.4.title = Innowacje z generatywnym AI
certification.areas.4.desc = Wykorzystanie generatywnego AI do budowania nowych funkcji i narzędzi, które realnie przyspieszają pracę.
certification.areas.5.title = Duże i zastane projekty
certification.areas.5.desc = Praca z AI w dużych bazach kodu i projektach zastanych: bezpieczne wprowadzanie zmian tam, gdzie stawka jest wysoka.

certification.thumbnail.alt = Certyfikat ukończenia kursu 10xDevs
certification.thumbnail.openLabel = Powiększ certyfikat 10xDevs
certification.lightbox.title = Certyfikat 10xDevs
certification.lightbox.closeLabel = Zamknij podgląd
certification.lightbox.imageAlt = Certyfikat ukończenia kursu 10xDevs, wystawiony 20 lipca 2026
```

## Facts-oracle trace (every claim → certificate)

| Copy claim | Source (certificate fact, brief line) |
|---|---|
| "kohortowy kurs 10xDevs" | cohort-based 10xDevs course (BRAVE / 10xDEVS) |
| "Przemek Smyrdek i Marcin Czarkowski" | instructors, verbatim |
| "20 lipca 2026" | dated 2026-07-20 |
| "Prework i 25 lekcji w 5 modułach" | Prework + 25 lessons across 5 modules |
| "6 sesji na żywo (kick-off, 4× Live Q&A, celebracja)" | 6 live sessions (kick-off, 4 Live Q&A, celebration) |
| "cotygodniowe office hours" | weekly office hours |
| "własny agent AI i wewnętrzne narzędzia zbudowane end-to-end" | a custom AI agent + internal AI tooling built end-to-end |
| badge names 10xBuilder / 10xArchitect / 10xChampion / Best Project | badge names, verbatim |
| five `areas` titles | the five certificate modules |

**Areas rendered as the brief specified them:** areas 1–3 keep the certificate's English
module names (*Agentic Environment*, *10xDevs Workflow*, *AI Development Quality &
Maintenance*) because they read as domain proper-terms of the credential and match this
page's technical register; areas 4–5 (*Innowacje z generatywnym AI*, *Duże i zastane
projekty*) are given in PL because *Innovate with Generative AI* / *Large scale & legacy
projects* are descriptive, not fixed marks. The badge names and course/instructor/date
proper nouns stay verbatim per the brief. If the owner prefers all five titles verbatim
in English (or all five in PL) that is a one-line swap — see Open Questions.

## Voice-Gap-Test report

Scored per `voice-gap-test.md`. This is a credibility/proof section on the **home/CV
page** (recruiter audience, technical register — the neighbouring `howIWork`,
`whatICanDeliver`, `portfolio` sections use `agenty`, `stack`, `MCP` freely), so the
"no dev jargon" floor (charter §3, scoped to the *non-technical offer-page buyer*) is
read against this page's actual register. The four charter items the brief flags as
binding everywhere (no negation/contrast, no infantile tone, "dla">"na", no
migration/vendor-switch messaging) are enforced in full.

| # | Dimension | Score | Evidence (cited phrase) |
|---|---|---|---|
| 1 | Confident, never cocky | MATCHED | "Warsztat AI, potwierdzony certyfikatem 10xDevs" — a checkable credential, not an unearned superlative; no "najlepszy" claim anywhere. |
| 2 | Direct, never blunt | MATCHED | "Poniżej certyfikat, zdobyte odznaki i pięć obszarów, które kurs objął." — states plainly what the reader will see, no throat-clearing. |
| 3 | Warm, never chummy | MATCHED | "Ukończyłem kohortowy kurs 10xDevs" — first-person singular, plain peer register; no slang (`ziomek`/`pogadasz`) and no `Pan/Pani` stiffness. |
| 4 | Affirmative phrasing | MATCHED | Every line states what the credential *proves* ("Za zbudowanie działającego rozwiązania", "potwierdzony certyfikatem"). Negation sweep for `nie `, `bez `, `zamiast`, `, a nie`, `tylko` → **zero hits**. |
| 5 | Register floor | MATCHED | Active voice, ~grade-7, first-person: "Ukończyłem…", "Wykorzystanie generatywnego AI do budowania nowych funkcji". Technical terms present match this page's own register (cf. `howIWork` "agenty w pętli"), not the offer-page floor. |
| 6 | AI-transparency stance | MATCHED | "z jasnym podziałem na to, co robi agent, a gdzie decyduje człowiek" — AI as expertise-with-a-tool + human accountability, never "made by AI". |
| 7 | Lexical hygiene | MATCHED | No `kluczowy` / `kompleksowe` / `synergia` / `W dzisiejszych czasach` / `„To nie X, to Y"`. Pause-dashes: one per string at most ("kurs 10xDevs — intensywny…"; "tor od briefu do działającego kodu — z jasnym…"); `end-to-end` and `4×` use hyphen/× correctly, not the pause-dash. No scare-quotes. |
| 8 | Structure / Rule of One | MATCHED | One idea: "a credentialed AI workshop". The credential facts live once in `credential.*`; badges own the distinctions; areas own the scope — no claim re-pitched. No CTA injected (this is a proof card, not the CTA beat). |
| 9 | Headline (4 U's) | MATCHED | "Warsztat AI, potwierdzony certyfikatem 10xDevs" — Useful (external proof of the AI workflow), Unique (a competitor can't name this credential), Ultra-specific (names 10xDevs). ≥3 U's. |
| 10 | Section QA (4 C's) | MATCHED | Clear (a recruiter reads it once), Concise (no filler), Compelling (concrete facts: 25 lekcji, 6 sesji, 4 odznaki), Credible (every number traces to the certificate; nothing invented). |
| 11 | Claim precision | MATCHED | No "w cenie / za darmo" claims in this section. Every factual claim (dates, counts, badge meanings, module scope) traces to the certificate facts table above; no fabricated stat, price, or outcome. |
| 12 | Adjacent-repetition (micro) | MATCHED | No content root echoes clause-to-clause. "Wyróżnienie za aktywność…" (champion) vs "Wyróżnienie dla projektu…" (bestProject) sit in *separate* badge captions, not adjacent sentences of one paragraph — a parallel label form, not a micro-repetition defect. |

**Drift diagnosis:** No drift to correct. The one risk this beat invites is over-claiming
from a certificate (turning "completed a course" into "expert / best"), and the copy holds
the confident-not-cocky line by letting the verifiable facts (named course, named
instructors, counts, four earned badges) carry the weight instead of adjectives — the
title says "potwierdzony certyfikatem", not "najlepszy". The second latent risk on this
page is reflexive negation (the neighbouring shipped `howIWork` intro uses "Nie chodzi
o…"); the negation sweep confirms this section stays fully affirmative, so it does not
inherit that neighbour's pattern. Converged on the first pass — all twelve dimensions
MATCHED with cited evidence, zero charter violations.

## Whole-page (cross-section) note

This slice adds **one** section; there is no sibling `certification.*` section to sweep
against. Against the wider home page, the credential's job (external proof of the AI
workflow) is distinct from `howIWork`'s *how* and `whatICanDeliver`'s *what* — it does not
re-pitch either; it substantiates them. The eyebrow `Sekcja 02 · Warsztat` takes the slot
`howIWork` (`Sekcja 02 · Sedno`) vacates, so the section numbering stays consistent.

## Open Questions

1. **Area-title language (verbatim EN vs PL for all five).** The brief lists the five
   modules with English names and says "express them in PL". I kept modules 1–3 in their
   English domain form (they read as fixed credential terms and match this page's technical
   register) and rendered 4–5 in PL. If the owner wants **all five verbatim in English**
   (closest to the certificate) or **all five in PL** (fully localized), it is a one-line
   swap per title — needs the owner's call. Does not block landing; the current split is a
   defensible default.
2. **`credential.issuer` label form.** I rendered it as "BRAVE / 10xDEVS · Przemek Smyrdek
   i Marcin Czarkowski". If the certificate names a specific legal issuer entity (e.g. a
   company name) distinct from the "BRAVE / 10xDEVS" brand, that exact string should
   replace it — I used only the brand tokens the brief supplied and did not invent an
   issuer entity. Confirm the issuer label matches the certificate wording.
3. **Date format for `credential.date`.** Rendered "20 lipca 2026" (PL long form) from the
   ISO `2026-07-20`. If the certificate prints the date in a specific format the owner
   wants mirrored (e.g. "July 20, 2026" or "2026-07-20"), swap the string. The underlying
   date is verbatim from the certificate.
```
