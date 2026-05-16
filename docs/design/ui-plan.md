# Buzzards Soft v2 — Plan UI (React)

> **Wejścia:** [`doc/content_redesign.md`](./content_redesign.md) (treść + nowe pozycjonowanie) · [`doc/v1_review/review.md`](./v1_review/review.md) (audyt v1, problemy do naprawienia)
> **Output docelowy:** katalog `v2_react/` jako odrębny projekt, deployowany przez Firebase Hosting na `buzzards-soft.com`.
> **Status:** plan przedimplementacyjny — do zatwierdzenia / iteracji przed rozpoczęciem kodu.

---

## 1. Cel i pozycjonowanie

**v1 było:** "Programista + Elektryk = wszystko". Rozproszone, dwie tożsamości równoznaczne, ściana tekstu, brak hero/CTA.

**v2 ma być:** **AI-Augmented Developer / Builder** — programista z 4+ latami komercyjnego doświadczenia (Flutter, Unity), który przebudował swój workflow wokół agentów AI i dzięki temu dostarcza software szybciej, czyściej i z mniejszym narzutem ręcznej pracy. AI **nie jest osobną kategorią usług** — jest częścią warsztatu. Strona ma działać jak **rozszerzone CV / portfolio**, a nie sklep usługowy.

**Cel strony:** głównie **pozyskiwanie kontraktów i zatrudnienia** (kandydaci na rolę full-time / kontrakt project-based / sporadycznie konsultacje AI workflow).

**Audytorium:**
- tech leady + HR oceniający kandydata na rolę dev z mocnym AI tooling,
- product-team szukający kontraktora Flutter/Unity, który "ogarnia AI",
- (poboczne) firmy pytające o konsultacje wdrożenia agentów AI w zespole.

**Ton:** "spokojny ekspert" + **uczciwa pokora** przy obszarach, w których nie ma jeszcze track recordu (procesy biznesowe, automation B2B, enterprise AI agents). Bez deklaratywnych obietnic. Personal brand portfolio (Lee Robinson / Theo Browne energy), nie sales landing.

**Co świadomie odsunięte (vs poprzednia wersja content):**
- "AI Automation Specialist" jako pozycja → zamienione na **AI-Augmented Developer**.
- Sekcja z 5 kartami usług AI → usunięta (strona to CV, nie sklep).
- Główna oś "automatyzacja procesów biznesowych B2B" → zepchnięta do sekcji "Czego się uczę" + ewentualnie mini-oferta opcjonalna.
- Elektryka jako oferta → wspomniane tylko jako kontekst dla projektów cyber-physical.

**Z review v1 do naprawy w v2:**
1. Dodać hero z value-prop i primary CTA dopasowanym do "rola/kontrakt".
2. Zastąpić ściany tekstu kartami z ikonami / listami / chips.
3. Ujednolicić system kart i typografii (jeden styl, jasna skala).
4. Naprawić Portfolio (każdy item klikalny → osobny URL z case study) i Privacy Policy (ten sam styl co reszta).
5. Dodać formularz kontaktowy.
6. Rozważyć drugi akcent koloru dla CTA (nie wszystko jedną zielenią).
7. **Wizualnie odróżnić "track record" od "growing" sekcji** — pokora bez zacierania kompetencji.

---

## 2. Stack (zatwierdzony)

| Warstwa | Wybór | Wersja minimalna | Dlaczego |
|---|---|---|---|
| Framework | **Next.js (App Router)** | 15.x | SEO (SSG), i18n routing, App Router stable, RSC, najlepszy pipeline dla landing + blog |
| Język | **TypeScript** | 5.x strict | Type safety dla form/i18n/content |
| UI Runtime | React | 19.x | Z Next.js 15 |
| Styling | **Tailwind CSS** | 4.x (CSS-first config) | Najszybszy iteracje, świetna integracja z shadcn/ui |
| Komponenty | **shadcn/ui** (Radix + Tailwind, copy-paste) | latest | Dostępne (a11y), dostosowywalne, zero vendor lock-in |
| Ikony | **Lucide React** | latest | SVG, vector, ~tree-shakeable. Zastępuje PNG icons8 z v1 |
| Animacje | **Framer Motion** | 11.x | Subtelne scroll reveals + hover micro-interactions |
| Forms | **react-hook-form + zod** | latest | Standard dla form/walidacji, świetna integracja z shadcn `<Form>` |
| i18n | **next-intl** | 3.x | Industry standard dla App Router, locale-aware routing, message formatting |
| Mailing (form) | **Resend** *(rekomendacja)* lub **Firebase Cloud Functions** | latest | Resend = prosty, dedykowany, free tier 100/d. FF = trzymamy się Firebase. Decyzja w sekcji 11 |
| Hosting | **Firebase Hosting** (static export) | — | Kontynuacja v1 setup, bez migracji DNS |
| Build mode | **`output: 'export'`** (SSG) | — | Statyk wystarczy dla landing (treść statyczna, formularz przez external endpoint) |

**Świadomie odrzucone:**
- Vercel (wymaga zmiany DNS, user wybrał Firebase)
- styled-components / Emotion (Tailwind wystarczy)
- MUI / Chakra (ciężkie, mniej elastyczne niż shadcn)
- TanStack Query (brak query'ów do API w MVP)
- Redux / Zustand (brak global state w MVP)

**Dependencje opcjonalne, do rozważenia później:**
- `next-mdx-remote` lub `contentlayer` — gdy dojdą case studies + blog
- `@vercel/og` — generowanie dynamicznych OG images per case study
- `posthog` lub `plausible` — analytics

---

## 3. Design tokens

> **Uwaga:** ten rozdział to *propozycja kierunku* dla rebrandingu. Finalne wartości zostaną dobrane przez Claude Designera w osobnym wątku — tu mam ustalić **DNA** stylu, w którym mocodawca się odnajduje.

### 3.1 Paleta — 3 warianty do wyboru

#### Wariant A: **Slate + Emerald + Amber** ✅ **ZATWIERDZONY** *(D1 — buduje na zieleni v1, ale dojrzale)*

```
bg:           slate-950   #020617
surface:      slate-900   #0f172a    (karty, sekcje)
border:       slate-800   #1e293b
text-primary: white       #ffffff
text-muted:   slate-400   #94a3b8
text-subtle:  slate-500   #64748b
accent:       emerald-500 #10b981    (brand, headings akcent)
accent-soft:  emerald-400 #34d399    (hover na akcent)
cta:          amber-500   #f59e0b    (primary buttons, "Skontaktuj się")
cta-hover:    amber-400   #fbbf24
error:        rose-500    #f43f5e
success:      emerald-500 (ten sam co accent)
```

**Plus:** kontynuacja motywu zielonego (rozpoznawalność), dojrzała, dwa akcenty rozdzielają informację (zielony = brand/headings, amber = działanie). Kombinacja sprawdzona w SaaS-ach (Linear, Stripe-adjacent).
**Minus:** "kolejny dark theme" — wymaga nieco unikatu w typografii i layoutach żeby się wyróżniać.

#### Wariant B: **Zinc + Violet + Cyan** *(neutralny "AI startup")*

```
bg:           zinc-950    #09090b
surface:      zinc-900    #18181b
accent:       violet-500  #8b5cf6
cta:          violet-500 (single accent, w gradiencie do cyan-400 #22d3ee)
```

**Plus:** typowy "AI vibe" (Anthropic, OpenAI, Vercel ekosystem). Trendy.
**Minus:** generic — wszyscy w branży AI mają fiolet+cyan. Brak rozpoznawalności od konkurencji.

#### Wariant C: **Stone + Forest + Bronze** *(retro tech, ciepły)*

```
bg:           stone-950   #0c0a09
surface:      stone-900   #1c1917
accent:       emerald-700 #047857    (ciemny forest)
cta:          orange-600  #ea580c    (bronze)
```

**Plus:** unikatowy, "rzemieślniczy" wibe (pasuje do "spokojny ekspert"). Mało kto tak robi.
**Minus:** wymaga ostrożności — łatwo wpaść w "earthy/coffee shop" zamiast tech.

### 3.2 Typografia — kierunek (D2: 🎨 designer wybierze finalnie)

Trzy fonty do rozważenia jako brief dla designera:

```
Heading: Geist Sans   (Vercel Open Source)  — modern, geometric, neutral-techy
Body:    Geist Sans   lub Inter             — wysoka czytelność body text
Mono:    Geist Mono   lub JetBrains Mono    — dla code/tech tags
```

Designer może zdecydować inaczej — sugestie są kierunkiem, nie wiążącym wyborem. Wymóg: para heading+body musi się zgrywać; mono-font dla chip cloudów technologii i kodu.

**Skala (Tailwind defaults z drobną modyfikacją):**

| Token | px | Zastosowanie |
|---|---|---|
| `text-xs` | 12 | captions, footer meta |
| `text-sm` | 14 | secondary text, labels |
| `text-base` | 16 | body |
| `text-lg` | 18 | lead paragraph |
| `text-xl` | 20 | section subheadings |
| `text-2xl` | 24 | h3 |
| `text-3xl` | 30 | h2 |
| `text-5xl` | 48 | h1 (mobile hero) |
| `text-6xl` / `text-7xl` | 60-72 | h1 (desktop hero) |

**Font weights:** `400` (body), `500` (UI, labels), `600` (h2-h4), `700` (h1, brand).

### 3.3 Spacing, radii, shadows

- **Spacing:** Tailwind default (4px base) — nie wymyślamy koła.
- **Radii:** `rounded-md` (6px) buttons, `rounded-xl` (12px) cards, `rounded-2xl` (16px) hero/duże panele. **Brak `rounded-full` pillsów** dla nagłówków (problem v1).
- **Shadows:** subtelne, skala 3 poziomów: `shadow-sm` (cards inactive), `shadow-md` (hover), `shadow-lg` (modal/dropdown). Bez kolorowych shadow'ów.

### 3.4 Vibe wizualny — co ma być, czego nie ma być

✅ **Tak:**
- czysta typografia, dużo whitespace
- karty z 1-pikselowym border + delikatny gradient/shadow
- subtelne scroll reveals (fade + slide-up 8-16px)
- code-style tags dla technologii (mono font, accent color, nieduże tła)
- portretowe zdjęcie Mariusza w hero (jeśli jest dostępne) lub abstract grafika z motywem PCB **subtelnie**
- mocna hierarchia: **1 H1** w hero, jasne H2 per sekcja, body text czytelny

❌ **Nie:**
- monochromatyczna ściana zieleni (problem v1)
- białe pillsy nagłówków na ciemnym tle (problem v1)
- pełnoekranowe scroll-driven animacje typu Awwwards (zbyt "AI startup template")
- emoji w copy
- gradients z 3+ kolorami
- circuit-board pattern jako dominanta tła (z v1: subtelnie OK, jako wallpaper — nie)
- plain `-` bullety zamiast prawdziwych list

---

## 4. Architektura informacji + routing

Z `content_redesign.md` mamy 8 sekcji home + 2 podstrony.

### 4.1 URL strategy (z next-intl)

| URL (PL) | URL (EN) | Rendering | Cel |
|---|---|---|---|
| `/` | `/en` | SSG | Home — 8 sekcji one-pager z anchor linkami |
| `/portfolio/[slug]` | `/en/portfolio/[slug]` | SSG (genStaticParams) | Case study konkretnego projektu (1 page = 1 case) |
| `/privacy-policy` | `/en/privacy-policy` | SSG | Polityka prywatności (w spójnym layout) |
| `/sitemap.xml`, `/robots.txt` | — | SSG | SEO |
| `/og/*.png` | — | static lub `@vercel/og` | OG images (1 default + per case study) |

**Anchor links na home (`/#hero`, `/#services` etc.)** dla nav buttonów.

### 4.2 Sekcje home (kolejność z `content_redesign.md`)

```
[Header — sticky]
1. Hero — pozycja "AI-Augmented Developer" + H1 + 2 CTA + trust strip
2. Jak pracuję — AI w codziennym workflow (4 podsekcje, SEDNO STRONY)
3. Co umiem dowieźć — akordeon (Programowanie core / AI tooling / Soft / Rozwijam / Background)
4. Doświadczenie i artefakty — Honeti, Unity, Własny warsztat AI, (opcj.) Strona meta-projekt
5. Czego się aktualnie uczę — krótka, narracyjna lista
6. O mnie — krótka + długa wersja
7. Wykształcenie i certyfikaty — 2 karty + chips uprawnień
8. Kontakt — formularz + dane bezpośrednie
[Footer — dane firmowe, social, copyright, privacy link]
```

**Kluczowa zmiana vs poprzednia wersja planu:**
- Sekcja "Services" (5 kart usług AI) **zniknęła** — zastąpiona "Jak pracuję" (sekcja 2, sednowa) + "Co umiem dowieźć" (sekcja 3).
- Sekcja "Differentiators" jako odrębny blok **została usunięta** — punkty z niej rozproszone do "Jak pracuję" i "O mnie".
- Doszła sekcja "Czego się aktualnie uczę" (5) — neutralizuje deklaratywność, buduje wiarygodność.
- Sekcja "Portfolio" przemianowana na "Doświadczenie i artefakty" (4) i poszerzona o "Własny warsztat AI" (artefakty z codziennej pracy zamiast nieistniejącego AI portfolio dla klientów).

---

## 5. Per-sekcja: layout + komponenty

> Format: krótki opis layoutu + kluczowe komponenty + uwagi z review.

### 5.1 Hero

**Layout (desktop):**
- Pełnoszerokie, ~min-h-[80vh]
- Lewa kolumna (60%): **badge "AI-Augmented Developer"** (mała pigułka z accent emerald, font mono, nad H1), H1 (multiline, `text-6xl`/`text-7xl` desktop), sub-headline (`text-xl`, `text-muted`), 2 CTA (primary amber + ghost link), pasek "trust" (lata + Claude Code config + edukacja jako micro-line)
- Prawa kolumna (40%): **abstract SVG pattern (subtelne PCB lines + emerald accent)** lub geometric pattern. **Bez zdjęcia portretowego** (D3) — designer dostarcza grafikę do tej kolumny
- Subtelny noise/grain overlay na bg

**Layout (mobile):**
- Stack pionowo: badge, H1 (`text-5xl`), sub, CTA, trust line; abstract grafika pod CTA jako secondary (mniejsza, ozdobnik)

**Komponenty:**
- `<Hero>` — wrapper sekcji
- `<RoleBadge>` — pigułka z pozycją zawodową ("AI-Augmented Developer" w PL, "AI-Augmented Developer" lub "AI-Augmented Builder" w EN)
- shadcn `<Button>` × 2 (variants: `default` amber dla "Porozmawiajmy o roli lub projekcie", `ghost`/`link` dla "Zobacz, jak pracuję →")
- `<TrustStrip>` — micro-line z 3 punktami: "4+ lata produkcyjnego kodu (Flutter/Dart, Unity/C#) · Claude Code daily driver · Inżynier Informatyki · EN B2/C1"
- `<HeroGraphic>` — abstract SVG/komponent dostarczany przez designera (PCB / geometric / pattern), bez zdjęcia portretowego

**Z content_redesign:**
- Badge: `AI-Augmented Developer` + sublabel `4+ lata komercyjnego programowania. Pracuję z agentami AI codziennie.`
- H1 (rekomendowany): `Dostarczam software szybciej, bo pracuję z AI codziennie — nie od święta.`
- Sub: 4-zdaniowy paragraf o przebudowie workflow + Claude Code + szukaniu roli/kontraktu
- CTA primary: `Porozmawiajmy o roli lub projekcie`
- CTA secondary: `Zobacz, jak pracuję →` (anchor scroll do `#how-i-work`)

**Rozwiązuje z review:** brak hero / brak CTA / brak hierarchii. Hero od razu komunikuje pozycjonowanie (programista, nie sales) i intencję (rola/kontrakt, nie wdrożenia enterprise).

---

### 5.2 Jak pracuję (How I work) — **SEDNO STRONY**

> Najważniejsza sekcja. Tu odbiorca rozumie, że "AI w workflow" to konkrety, nie hasło.

**Layout (desktop):**
- H2 sekcji ("Jak pracuję — AI w codziennym workflow") + intro paragraf (1 akapit z `content_redesign.md` § 2)
- Grid **4 karty 2×2** (1 col mobile), każda karta to jedna podsekcja 2.1–2.4:
  - 2.1 AI-assisted development jako codzienność
  - 2.2 Agenty i skrypty wspierające SDLC
  - 2.3 Automatyzacje wokół buildu i CI/CD
  - 2.4 Generowanie kodu i feature'ów end-to-end
- Każda karta: ikona (Lucide), tytuł (h3), 4 punkty bulletowane (każdy z **bold lead** + opis), subtelny accent border w emerald, większy padding

**Layout (mobile):**
- 1 kolumna, każda karta full-width

**Mapowanie ikon (Lucide):**
- 2.1 → `Terminal` lub `Sparkles` (AI w codziennym kodowaniu)
- 2.2 → `Bot` lub `Workflow` (subagenty + hooki)
- 2.3 → `GitMerge` lub `CheckCircle2` (CI/CD, review)
- 2.4 → `Code2` lub `Wand2` (generowanie kodu)

**Komponenty:**
- `<HowIWork>` — wrapper sekcji
- `<WorkPracticeCard>` × 4 — Card z ikoną + h3 + lista 4 punktów
- shadcn `<Card>`, `<CardHeader>`, `<CardContent>` jako baza

**Visual treatment:** **mocniejszy niż pozostałe sekcje** — to "headline act". Subtelny gradient emerald w borderze kart, akcent na liczbach 2.1/2.2/2.3/2.4 jako ozdobne numery (mono font, large, opacity 30% w narożniku karty).

**Rozwiązuje z review:** dawniej brak "headline aktu" / hero CTA prowadzi tu / pokazuje konkrety zamiast haseł. Strategia: każdy bullet to **artefakt** (rzecz, którą można zobaczyć/pokazać), nie deklaracja.

---

### 5.3 Co umiem dowieźć (What I can deliver)

**Layout:**
- H2 + intro (1 zdanie wprowadzający akcent na "udokumentowane doświadczenie najpierw")
- shadcn `<Accordion>` z **5 zakładkami** (kolejność z `content_redesign.md` § 3):
  - **3.1 Programowanie produkcyjne** *(core, 4+ lat)* — **open by default**
  - 3.2 AI tooling w workflow developera *(growing, na żywo)*
  - 3.3 Soft skills
  - 3.4 Obszary, w których się aktywnie rozwijam — **z visual marker "growing"** (np. dashed border)
  - 3.5 Background techniczny *(uzupełniająco, cyber-physical)* — collapsed, ostatnia
- Wewnątrz 3.1 — **2 sub-bloki**: "Mobile development — Flutter / Dart" i "Aplikacje interaktywne i gry — Unity / C#" + sekcja "Wspólne dla obu stacków". Każdy sub-blok jako mini-card lub stacked list z chip-cloudem dla technologii (Flutter, Riverpod, Freezed itd.).
- Wewnątrz 3.2 — chip-cloud (Claude Code, MCP, OpenAI/Anthropic API, prompt caching itd.) + 1 callout box z `content_redesign.md` (cytat: *"Świadomie nie wpisuję tu 'enterprise AI agents at scale'..."*).
- Wewnątrz 3.4 — chip-cloud z labelem "growing" (n8n, Make, RAG, agentic workflows).

**Komponenty:**
- shadcn `<Accordion>`, `<AccordionItem>`, `<AccordionTrigger>`, `<AccordionContent>`
- `<TechChip>` — custom z wariantami `core` (solid border emerald) / `growing` (dashed border slate-600)
- `<ChipCloud>` — wrapper z gap
- `<Callout>` — pudełko z italic tekstem dla "świadomie nie wpisuję..." dyscyplinujących uwag

**Visual differentiation track-record vs growing:**
- 3.1, 3.3, 3.5 → solid border, accent emerald
- 3.2, 3.4 → border z dashed accent + opacity-90 (subtelnie, żeby nie zatrzeć kompetencji)
- Cel: wizualnie widać, gdzie jest mocny grunt vs. gdzie kierunek

**Rozwiązuje z review:** lista `-` bullety → chip-cloudy, sekcja techniczna schowana pod accordion (rzadko potrzebna), uczciwa pokora wizualnie wspierana zamiast retorycznie.

---

> ⚠ **Superseded by *Revision 2026-05-15 — Sekcja 5.4 restructure*** (patrz koniec pliku). Treść sekcji 5.4 poniżej (4 karty: Honeti / Unity / Warsztat AI / Meta-projekt) została zastąpiona nowym układem trzech podsekcji (Portfolio Honeti z podstroną / Programowanie agentowe z release gating / Warsztat AI z hero kafelkiem). Oryginał pozostaje jako historia decyzji.

### 5.4 Doświadczenie i artefakty

**Layout:**
- H2 + intro (1 zdanie)
- **Stack pionowy 3-4 kart** (zamiast siatki — pozwala każdej karcie mieć więcej oddechu):
  - 4.1 **Honeti — Mobile Developer (4+ lata)** — duża karta z stack tags + 7-bulletową listą zakresu + link "Zobacz case study →" do `/portfolio/honeti` (jeśli będzie)
  - 4.2 **Unity / projekty interaktywne** — średnia karta, krótszy opis
  - 4.3 **Własny warsztat AI** — karta z visual marker "personal artifact" (subtelne tło różniące się od pozostałych, np. emerald-950/30), lista 5 punktów (config Claude Code, slash commands, subagenty, MCP, praktyki) + cytat z `content_redesign.md`: *"Jeśli zatrudniasz programistę, dostajesz nie tylko mnie — dostajesz mój workflow."*
  - 4.4 ✅ (D8 zatwierdzone) **Strona buzzards-soft.com — meta-projekt** — small banner-style card pod 4.3, ozdobnik narracji "AI w workflow → strona sama jest dowodem"

**Komponenty:**
- `<ExperienceStack>` — wrapper
- `<ExperienceCard>` — duża karta z header (logo/ikona + tytuł + chipset stack)
- `<ArtifactCard>` — wariant dla 4.3 (różny visual treatment)

**Z content_redesign:** Honeti 4+ lat (sekcja 4.1) + Unity (4.2) + Własny warsztat AI (4.3) + opcjonalny meta-projekt (4.4).

**Rozwiązuje z review:**
- Krytyczny bug v1 (`/portfolio` pusty) — naprawiony przez `/portfolio/[slug]` z fallbackiem 404.
- Klikalne karty (każda z `<Link>` na cały kafelek).
- "Pusta sekcja AI portfolio" zastąpiona "Własnym warsztatem AI" — pokazuje artefakty z codziennej pracy zamiast nieistniejących klientów AI.

---

### 5.5 Czego się aktualnie uczę

**Layout:**
- Sekcja **niska wizualnie** (mniejsze H2, mniej zajmuje miejsca) — buduje ton "uczciwości" przez sam rozmiar.
- H2 + lead paragraf (1-2 zdania)
- 4 punkty bulletowane (z `content_redesign.md` § 5):
  - Agenty wyspecjalizowane pod konkretne procesy w SDLC
  - Pipeline'y RAG nad zamkniętymi bazami wiedzy
  - Automatyzacja procesów biznesowych z warstwą LLM (n8n, Make, własne integracje)
  - Budowa własnych serwerów MCP
- Każdy bullet: bold tytuł + 1 zdanie opisu
- Pod listą — closing paragraph (1 zdanie zachęty: *"Część rzeczy testuję na własnych projektach. Jeśli w Twoim zespole któryś z tych obszarów jest na mapie — dobrze trafiłeś."*)

**Visual treatment:**
- **Wąziej niż pozostałe sekcje** (np. `max-w-2xl` zamiast `max-w-7xl`), wycentrowane.
- Subtelny visual marker — lekko inna paleta (np. tło slate-900/50 zamiast slate-900).
- Brak ramek/kart — bardziej "list w prozie", podkreśla narracyjny charakter.

**Komponenty:**
- `<CurrentlyLearning>` — wrapper, narrowy
- `<LearningList>` — `<ul>` z `<li>` per punkt, custom styled

**Rozwiązuje z review:** brak deklaratywności, "uczciwa pokora" — pokazuje kierunek bez udawania.

---

### 5.6 O mnie

**Layout (desktop):**
- 2-kolumnowy split: **abstract grafika lub ozdobnik wizualny** (lewa, ~40%) + tekst (prawa, ~60%). **Bez zdjęcia** (D3) — designer dostarcza grafikę spójną z hero
- Tekst:
  - H2 sekcji
  - **Wersja krótka jako lead** (`text-lg`, italic-ish) — z `content_redesign.md` § 6 wersja krótka
  - **Wersja długa jako 4 akapity** (z `content_redesign.md` § 6 wersja długa) z większym `leading-relaxed`

**Layout (mobile):**
- Stack: ozdobnik na górze (mały) lub pominięty, tekst pod

**Visual highlight:**
- Akcent na zdaniu *"Określam się jako programista, który świadomie używa AI w codziennej pracy"* — np. wyróżnione typograficznie (italic + lekka inna paleta), bo to kluczowe pozycjonowanie.

**Komponenty:**
- `<About>` — 2-col layout
- `<AboutGraphic>` — abstract grafika (nie zdjęcie), spójna stylistycznie z `<HeroGraphic>`
- `<Highlight>` — span z visual emphasis dla key zdania

---

### 5.7 Wykształcenie i certyfikaty

**Layout:**
- H2 + 2 karty (uczelnia + szkoła) + chip-cloud certyfikatów pod kartami
- 1 col mobile / 2 col desktop dla kart

**Komponenty:**
- `<EducationCard>` × 2 — header (nazwa uczelni) + 3 pola strukturalne (Tytuł / Kierunek / Specjalizacja)
- `<CertChips>` — chip-cloud (SEP E+D, prawo jazdy kat. B, patent żeglarski)

**Z content_redesign:** 7.1 WSB-NLU + 7.2 ZSEE + 3 certyfikaty — bez zmian.

**Rozwiązuje z review:** podwójny dwukropek "Tytuł::" naprawiony, białe pillsy headera zamienione na spójny styl, brak zmian merytorycznych.

---

### 5.8 Kontakt

**Layout (desktop, 2 col):**
- **Lewa kolumna:**
  - Nagłówek: *"Otwarty na kontrakty, role full-time i ciekawe projekty."* (z `content_redesign.md` § 8)
  - Paragraf (z `content_redesign.md`): *"Najlepiej trafiam tam, gdzie szuka się programisty, który już ma za sobą działające produkty i potrafi pracować z AI w workflow. Krótka rozmowa..."*
  - Dane bezpośrednie: email, telefon, LinkedIn, GitHub (z one-click copy w shadcn `<Button variant="ghost">` + `<Copy>` icon)
- **Prawa kolumna:** formularz

**Mobile:** stack (form na górze, dane pod, lub odwrotnie do testu UX).

**Form (z content_redesign):**
- Imię i nazwisko (text, required)
- Email (email, required, regex)
- Firma (text, optional)
- **Czego dotyczy kontakt?** (textarea, required, min 20 chars, **z hintem placeholder: "rola / kontrakt / projekt / inne"**)
- Skąd o mnie wiesz? (select, optional: LinkedIn / polecenie / Google / inne)
- Submit: `Wyślij wiadomość` (amber primary)

**Walidacja (zod schema):**
```ts
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(20),
  source: z.enum(['linkedin', 'referral', 'google', 'other']).optional(),
})
```

**Stany formularza:** idle / submitting (disable + spinner) / success (zielony banner + reset) / error (rose banner z retry).

**Komponenty:**
- shadcn `<Form>` (z react-hook-form), `<Input>`, `<Textarea>`, `<Select>`, `<Button>`, `<Label>`, `<FormMessage>` (errors)
- `<ContactInfo>` — lista danych z one-click copy
- `<Toast>` (shadcn `<Sonner>`) dla feedback po submicie

**Backend formularza:** patrz sekcja 11.

**Rozwiązuje z review:** brak formularza (lead-killer), 3 kolumny "Dane Adresowe / NIP / etc." → przeniesione do footera. Ton kontaktu zmieniony: nie "porozmawiajmy o procesie" (B2B sales), tylko "otwarty na role/kontrakty" (CV-style).

---

## 6. Layout shell

### 6.1 Header (sticky)

- Logo (lewy) + nazwa "Buzzards Soft" — link do `/`
- Nav buttons (środek, desktop): `Czym się zajmuję · Dlaczego ja · Stack · O mnie · Portfolio · Kontakt` (anchor links do `/#services` etc.)
- Mobile: hamburger → `<Sheet>` (shadcn) z full-screen menu
- Prawy róg: **language toggle z etykietą tekstową** (`PL | EN`, kontrastowy do flagi z v1) + (opcjonalnie) primary CTA "Pogadajmy" (amber, mały)
- Sticky on scroll, z subtelnym blur backdrop (`backdrop-blur-md` + półprzezroczyste tło)

### 6.2 Footer

- Lewa: logo + krótkie tagline + dane firmowe (Buzzards Soft Mariusz Jendrzejczak, Pomorska 14/8, 74-300 Myślibórz)
- Środek: links column (Polityka prywatności, RODO info, contact)
- Prawa: NIP / REGON / DUNS jako mniejsza tabela
- Bottom strip: © Buzzards Soft 2026 + social icons (subtelne, nie 8 jak v1 — top 3-4: LinkedIn, GitHub, email)

---

## 7. Stany i a11y

### 7.1 Stany interakcji

- **Hover:** wszystkie buttony, cards, links, chips. Subtelna zmiana (border accent + shadow lift, lub bg lighten 5%).
- **Focus visible:** widoczny outline (Tailwind `ring-2 ring-emerald-500/40 ring-offset-2 ring-offset-slate-950`) — KRYTYCZNE (v1 nie miał, screen reader-friendly).
- **Active (mouse down):** lekkie zagłębienie (scale 0.98 lub bg darken).
- **Loading:** shadcn `<Skeleton>` lub spinner (`<Loader2 className="animate-spin" />`).
- **Disabled:** opacity 50 + cursor-not-allowed.

### 7.2 Dostępność

- Semantic HTML (h1 → h2 → h3, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Skip link "Pomiń do głównej treści" na początku
- Alt-texty obowiązkowe na każdej grafice (z fallback "")
- Keyboard navigation — wszystko klikalne dostępne TAB-em
- aria-labels na ikon-only buttons (LanguageToggle, social icons, copy buttons)
- Color contrast WCAG AA (testować emerald na slate-950 i amber na slate-950)
- Form errors czytane przez screen reader (`aria-describedby` z `<FormMessage>`)
- Reduced motion: `prefers-reduced-motion: reduce` → wyłącza Framer Motion animacje

---

## 8. i18n (next-intl)

### 8.1 Struktura

```
messages/
├── pl.json    (źródłowy z content_redesign.md)
└── en.json    (tłumaczenia — w osobnym wątku)
```

### 8.2 Strategia kluczy

```json
{
  "hero": {
    "h1": "Automatyzuję pracę, którą ludzie nie chcą już wykonywać.",
    "sub": "Jestem AI Automation Specialist...",
    "ctaPrimary": "Porozmawiajmy o Twoim procesie",
    "ctaSecondary": "Zobacz, co potrafię zbudować"
  },
  "services": {
    "title": "Czym się zajmuję",
    "items": {
      "agents": { "title": "...", "pitch": "...", "bullets": [...], "for": "..." },
      "automation": { ... }
    }
  },
  ...
}
```

### 8.3 Routing locale

- `next-intl` middleware: locale prefix (`/` = PL default, `/en` = EN)
- Language toggle: link do `/en` lub `/`, z zachowaniem ścieżki (np. `/portfolio/honeti` → `/en/portfolio/honeti`)
- HTML `lang` attribute z aktualnego locale
- alternate hreflang tagi w `<head>` (SEO)

### 8.4 Co nie idzie do i18n

- Nazwy własne (Buzzards Soft, nazwy uczelni, nazwy projektów)
- Dane firmowe (NIP, adres) — te są niezmienne
- Tylko teksty UI/treść biznesowa

---

## 9. SEO / metadata / OG

### 9.1 Per-page metadata

Per `app/[locale]/page.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Buzzards Soft — AI Automation Specialist',
  description: 'Buduję agentów AI, integracje LLM i automatyzacje procesów...',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og/home.png'],
    locale: 'pl_PL',
    siteName: 'Buzzards Soft',
  },
  twitter: { card: 'summary_large_image' },
  alternates: {
    canonical: 'https://buzzards-soft.com',
    languages: { 'pl-PL': '/', 'en-US': '/en' },
  },
}
```

### 9.2 Schema.org / JSON-LD

`@type: Person` + `@type: ProfessionalService` — wstrzyknięte w layout root jako `<script type="application/ld+json">`. Pomaga Google zrozumieć "kto" i "co oferuje".

### 9.3 sitemap.xml + robots.txt

- `app/sitemap.ts` — auto-generated z routes (home + case studies + privacy)
- `app/robots.ts` — allow all, link do sitemap

### 9.4 OG images

- `/og/home.png` (1200×630) — default dla home + privacy
- Per case study: opcjonalnie generowane przez `@vercel/og` (Next.js native; działa przy SSG też przez Image API), albo statyczne PNG na start (1 plik per projekt)

---

## 10. Animacje (Framer Motion)

Trzymamy się **subtelnych scroll reveals + hover micro-interactions**, zgodnie z tonem "spokojny ekspert".

### 10.1 Patterns

- **Section fade-in on scroll:** każda sekcja entry — `opacity 0 → 1`, `y: 16 → 0`, duration 0.5s, easing `ease-out`. Trigger: `whileInView` (Framer Motion) z `once: true`.
- **Card stagger:** w gridach (Services, Portfolio, Education) — kolejne karty z opóźnieniem 0.05s.
- **Hero parallax (opcjonalnie):** drobny shift bg-image (10-20px) przy scroll. Bez full parallax.
- **Hover na card:** scale 1.02 + shadow lift (300ms).
- **Hover na CTA button:** zmiana bg + ikona shift +2px (motion arrow).

### 10.2 Reduced motion

Hook `useReducedMotion()` z Framer Motion + media query. Jeśli aktywne → wszystko statyczne, fade-in wyłączone.

---

## 11. Form handling — backend

### 11.1 Decyzja: Resend lub Firebase Function

| | Resend | Firebase Cloud Function |
|---|---|---|
| Setup | API key, ~20 lines kodu | Cloud Functions init + deploy |
| Free tier | 100 emails/d, 3000/m | 2M invocations/m |
| Coupling | External (jeden nowy serwis) | Trzymamy się Firebase |
| Pricing po przekroczeniu | $20/m za 50k | Pay-as-you-go GCP |
| DX | Doskonały (`resend.emails.send(...)`) | OK (Node.js w `functions/` folder) |
| Hosting integration | Routes w Next API → static export NIE wspiera, więc i tak external | Native Firebase, 1-click deploy |

**Rekomendacja: Firebase Cloud Function** — utrzymujemy 1 platformę. Kod w `functions/index.js` (Node 20), endpoint POST `/contact`, walidacja zod, send email przez Nodemailer / SendGrid / Mailgun (lub… Resend wewnątrz Function).

**Alternatywnie (najprostsze): Resend** + Next API route, ale wtedy musimy wyjść z static export do hybrid (Next w SSR mode na Firebase App Hosting). Komplikuje hosting.

→ **Plan zakłada Firebase Function** + opcjonalnie Resend jako provider mailingu w środku Functiona.

### 11.2 Anti-spam

- Honeypot field (`<input name="website" hidden>`) — bot wypełni, ludzie nie
- Cloudflare Turnstile (free) lub hCaptcha (free) — invisible challenge
- Rate-limit per IP (Firebase Function side, prosty in-memory map z 1-min window)

### 11.3 Storage

- Każde zgłoszenie → email do `dev.buzzardssoft@gmail.com`
- + opcjonalnie zapis do Firestore (collection `contacts`) jako backup. To wymaga setup Firestore — opcjonalne dla MVP.

---

## 12. Hosting i deploy

> **D4: archive v1 nie wymagany.** Domyślny single-site setup. Multi-target poniżej zostaje jako *opcjonalny dodatek*, gdyby kiedyś warto było zachować v1 — można dodać później.

### 12.1 Firebase configuration (single-site, domyślny)

`firebase.json` w `v2_react/`:
```json
{
  "hosting": {
    "public": "out",
    "cleanUrls": true,
    "trailingSlash": false,
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      {
        "source": "/_next/static/**",
        "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
      }
    ]
  },
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  }
}
```

`.firebaserc`:
```json
{ "projects": { "default": "buzzards-soft-web" } }
```

Deploy:
```bash
cd v2_react
npm run build              # next build → out/
firebase deploy            # hosting + functions
```

### 12.2 Multi-target (opcjonalnie, jeśli zachowamy archive v1)

Plan: zachować v1 jako fallback, deploy v2 jako nowy target.

`firebase.json` w root projektu (NIE w v1_flutter ani v2_react — w roocie):

```json
{
  "hosting": [
    {
      "target": "v2",
      "public": "v2_react/out",
      "cleanUrls": true,
      "trailingSlash": false,
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [
        { "source": "**", "destination": "/index.html" }
      ],
      "headers": [
        {
          "source": "/_next/static/**",
          "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
        }
      ]
    },
    {
      "target": "v1-archive",
      "public": "v1_flutter/build/web",
      "ignore": ["firebase.json", "**/.*"],
      "rewrites": [{ "source": "**", "destination": "/index.html" }]
    }
  ],
  "functions": {
    "source": "functions",
    "runtime": "nodejs20"
  }
}
```

`.firebaserc`:
```json
{
  "projects": { "default": "buzzards-soft-web" },
  "targets": {
    "buzzards-soft-web": {
      "hosting": {
        "v2": ["buzzards-soft-web"],
        "v1-archive": ["buzzards-soft-v1"]
      }
    }
  }
}
```

(Wymaga 2 sites w Firebase project: główny `buzzards-soft-web` → v2, drugi `buzzards-soft-v1` → archive. Site #2 utworzymy w Firebase Console.)

### 12.2 Deploy workflow

Lokalnie, po commit:
```bash
cd v2_react
npm run build              # next build → out/
cd ..
firebase deploy --only hosting:v2 --only functions
```

(Funkcja Cloud Function dla form deployowana razem.)

### 12.3 Rollback strategy

Firebase Hosting trzyma 10 ostatnich deployów. Rollback:
```bash
firebase hosting:rollback --site buzzards-soft-web
```

### 12.4 DNS / domena

- `buzzards-soft.com` → site `buzzards-soft-web` (v2)
- `v1.buzzards-soft.com` (opcjonalny CNAME) → site `buzzards-soft-v1` (archive)
- Brak migracji DNS — DNS zostaje na Firebase

---

## 13. Migration roadmap

> Estymata 10-15 dni roboczych dla 1 dev (z polish, ale bez blogu/case studies AI których jeszcze nie ma).

| Faza | Czas | Zakres | Output |
|---|---|---|---|
| **1. Setup** | 0.5 d | `npx create-next-app`, TS, Tailwind 4, shadcn init, port assets z `v1_flutter/web/`, init Firebase target v2 | Pusty Next.js w `v2_react/` z dev server działającym |
| **2. Design system** | 1 d | Tokens (colors/typography w `globals.css`), shadcn primitives (Button, Card, Input, Form, Accordion, Sheet, Sonner), test page z componentami | Storybook-like `/dev/components` page (tylko w dev) |
| **3. Layout shell** | 1 d | Header (sticky + mobile sheet), Footer, LanguageToggle, root layout, page transitions | `/` rendery z headerem + footerem (placeholder content) |
| **4. Hero + How I work** | 2 d | Hero z RoleBadge + H1 + CTA + TrustStrip + sekcja "Jak pracuję" (4 karty 2.1–2.4, **headline act**, najwięcej polish) | Top half strony — sedno pozycjonowania działa prod-like |
| **5. Co umiem dowieźć** | 1 d | Akordeon z 5 zakładkami, chip-cloudy z wariantami `core`/`growing`, callout boxes z cytatami | Sekcja 3 z visual differentiation core vs growing |
| **6. Doświadczenie i artefakty + Czego się uczę** | 1.5 d | Stack 3-4 kart (Honeti, Unity, Własny warsztat AI, opcj. meta-projekt) + niska sekcja "learning" + route `/portfolio/[slug]` z 1 case study (Honeti) | Sekcje 4-5 z deeplinkowalnym case study |
| **7. About + Education** | 1 d | Layout 2-col z avatarem, krótka+długa wersja, highlight kluczowego zdania, karty wykształcenia + chip-cloud certs | Sekcje 6-7 |
| **8. Contact + Form** | 1.5 d | UI formularza, walidacja zod/rhf, Firebase Function, end-to-end test, ton dopasowany do "rola/kontrakt" | Działający form z mailing |
| **9. i18n** | 1 d | next-intl setup, `pl.json` z całą treścią, locale routing, language toggle | PL działa na 100%; EN to placeholder do wątku tłumaczeń |
| **10. SEO + metadata + OG** | 0.5 d | Metadata API, sitemap, robots, JSON-LD `Person`, default OG image | Lighthouse SEO ≥ 95 |
| **11. Animations** | 0.5 d | Framer Motion scroll reveals, hover, reduced-motion | "Żywa" strona |
| **12. Privacy Policy + 404** | 0.5 d | Spójna sekcja Privacy, 404 page | 2 dodatkowe routes |
| **13. Build & deploy** | 0.5 d | Firebase multi-target setup, deploy v2 do staging, smoke test, switch DNS | Production live na buzzards-soft.com |
| **14. Lighthouse / a11y polish** | 1 d | Performance, accessibility audit, contrast fixes, bundle analysis | Wszystko ≥ 90 w Lighthouse |
| **TOTAL** | ~13 d | | |

**Kolejność krytyczna:** 1→2→3→4 (musi być w tej kolejności — Hero i "Jak pracuję" są sednem strony, muszą działać prod-like przed innymi sekcjami). 5-8 mogą iść równolegle jeśli ktoś pomoże. 9-14 są niezależne i mogą być przeplatane.

**Sekcja 4 (Hero + How I work) dostaje najwięcej polish** — to jest "headline act" strony, decyduje o pierwszym wrażeniu, musi się wyróżniać wizualnie (mocniejszy treatment niż pozostałe sekcje).

---

## 14. Decyzje (zatwierdzone)

| # | Pytanie | **Decyzja** | Konsekwencje dla implementacji / designu |
|---|---|---|---|
| D1 | Paleta | ✅ **Wariant A — Slate + Emerald + Amber** | Tokens z sekcji 3.1 wariant A wchodzą jako baza. Designer może doszlifować odcienie, ale paleta bazowa zatwierdzona |
| D2 | Fonty | 🎨 **Designer wybierze** | Zostawiamy 3 sugestie (Geist / Inter / Space Grotesk) jako kierunek, ale finalna decyzja przy designerze |
| D3 | Hero asset | ✅ **Bez zdjęcia — abstract grafika** | PCB lines + emerald accent w prawej kolumnie hero, lub geometric pattern. Designer dostarcza grafikę / SVG |
| D4 | Multi-site Firebase | ⚪ **Bez znaczenia (lokalnie → publik)** | Domyślny single-target; archive v1 opcjonalny. Sekcja 12 hosting upraszczona — patrz uwaga niżej |
| D5 | Form backend | ✅ **Firebase Function** (szczegóły w osobnym wątku) | Sekcja 11 zostaje jako kierunek; konkrety implementacji ustalimy oddzielnie |
| D6 | H1 wariant | ⏳ **Później — nie dot. UI** | Designer pracuje na rekomendowanym H1 z `content_redesign.md`; wariant finalny przy implementacji |
| D7 | Honeti case study | ⏳ **Nie dot. UI** | Designer przygotowuje template karty + layout strony case study; treść Honeti wchodzi przy implementacji |
| D8 | Sekcja 4.4 "Strona jako meta-projekt" | ✅ **TAK — w MVP** | Designer projektuje wariant card-banner pod 4.3 (smaller treatment, ozdobnik narracji) |
| D9 | Sekcja A (mini-oferta) | ❌ **Nie robimy** | Pomijamy całkowicie z planu. Strona to CV — focus na pozycjonowaniu dev |
| D10 | Sekcja B (FAQ kandydackie) | ❌ **Nie robimy** | Pomijamy w MVP. Można dodać po pierwszej iteracji jeśli powtarzające się pytania będą częste |
| D11 | Blog / MDX | ❌ **Nie robimy** | Pomijamy w MVP. Iter. 2 gdy będzie content |
| D12 | Visual differentiation `core` vs `growing` | ✅ **Subtelnie** | Dashed border + 90% opacity + ewentualnie label "growing" mono-fontem. Nie blatantly — pokora bez zatarcia kompetencji |

**Konsekwencje dla architektury (po D9, D10, D11):**

Final architektura sekcji home (po decyzjach):
```
1. Hero
2. Jak pracuję — AI w codziennym workflow
3. Co umiem dowieźć
4. Doświadczenie i artefakty (z meta-projektem 4.4 włączonym)
5. Czego się aktualnie uczę
6. O mnie
7. Wykształcenie i certyfikaty
8. Kontakt
[Footer]
```

8 sekcji + 2 podstrony (`/portfolio/[slug]`, `/privacy-policy`). **Brak FAQ, mini-oferty, bloga w MVP** — czyściejszy focus.

**Konsekwencja dla hostingu (po D4):**

Sekcja 12 może być uproszczona — multi-target Firebase nie jest wymagany. Domyślny flow:
- Build lokalnie (`npm run build` w `v2_react/`).
- Deploy single-site na `buzzards-soft-web` (zastępuje v1 Flutter w buildzie). Konfiguracja `firebase.json` w `v2_react/` z `"public": "out"`.
- Jeśli kiedyś będzie potrzeba archive v1 — można dodać multi-target później.

**Co designer dostaje na "tacę":**
- Paleta zatwierdzona (Slate + Emerald + Amber), wartości tokenów do doszlifowania
- Brief: portfolio/CV vibe, "spokojny ekspert + uczciwa pokora", referencje typu Lee Robinson / Theo Browne
- 8 sekcji home + 2 podstrony — żadnych "może", "opcjonalnie"
- Nacisk na sekcję "Jak pracuję" jako headline act
- Subtelne wizualne odróżnienie core (3.1, 3.3, 3.5, 4.1, 4.2) vs growing (3.2, 3.4, 5)
- Hero bez zdjęcia — abstract grafika (PCB lines + emerald), do dostarczenia przez designera
- System kart: default / accent / artifact (dla 4.3) / growing — 4 warianty jednego komponentu

---

## 15. Co przenosimy z v1, co odrzucamy

### Przenoszone (z `v1_flutter/`)

- **Logo** (`logo_white_transparent.png`) — odświeżone do SVG przez designera, z zachowaniem motywu PCB lines
- **Treść:**
  - Wykształcenie (WSB-NLU, ZSEE) — 1:1
  - Dane firmowe (NIP, REGON, DUNS, adres) — do footera (wartości w `doc-local/`)
  - Honeti (Mobile Developer 4+ lat) — przerobione w stylu case study
- **Polityka prywatności** — treść w `v1_flutter/lib/pages/privacy_policy_page.dart`, do refaktoru wizualnego (spójny styl)
- **Pomysł hide-on-scroll header** — zachowujemy (jako "scroll up shows / scroll down hides" w stickym headerze)
- **Anchor nav buttons** w headerze (smooth scroll do sekcji)

### Odrzucane

- **Cały Flutter Web stack** (CanvasKit + Dart + Riverpod + go_router) — zastąpiony Next.js
- **Persistent left side panel 400px na desktop** — zastąpiony klasycznym top header + footer
- **8 social media icons** — redukcja do 3-4 aktywnych (LinkedIn, GitHub, email, opcjonalnie Twitter/X)
- **Białe pille nagłówków** — stoją w sprzeczności z dojrzałym tonem
- **"Hobby" jako sekcja** (climbing, boks, taniec, gry) — nawet w v1 było to zaszyte; w v2 nie ma w ogóle
- **"Usługi techniczne i instalacyjne" jako standalone oferta** — usunięte całkowicie z głównej narracji. Background instalacyjny widoczny tylko w akordeonie 3.5 (Co umiem dowieźć / Background) i jednym akapicie w "O mnie" jako kontekst dla cyber-physical projektów
- **Buggowane `/portfolio` direct route** — zastąpione `/portfolio/[slug]` deeplinkable
- **Privacy Policy w innym stylu** — przepisane w v2 spójnym layoutem
- **Circuit pattern jako dominujący background** — subtelne pozostawione (np. w hero illu lub jako noise overlay), ale nie jako fullpage wallpaper
- **Wall-of-text "O mnie" na ~600 słów** — zastąpione krótką + długą wersją (z `content_redesign.md`)
- **Materiał icons8 PNG dla technologii** — zastąpione Lucide React (SVG, vector)
- **Loader screen Flutter (pulsujące logo)** — Next.js ma instant render, zero flash; CSS skeleton tylko dla async content

---

## 16. Verification — jak sprawdzić że v2 jest "lepszy" niż v1

Per problem z `v1_review/review.md` sekcja 12:

| Problem v1 | Test w v2 | Pass criteria |
|---|---|---|
| Brak hero / CTA | Wejdź na `/`, sprawdź pierwsze 100vh | Widać RoleBadge "AI-Augmented Developer" + H1 + sub + 2 CTA ("Porozmawiajmy..." + "Zobacz, jak pracuję") + TrustStrip |
| Brak "headline aktu" | Scroll do sekcji "Jak pracuję" | Sekcja wizualnie wyróżniona (mocniejszy treatment niż reszta), 4 karty 2.1-2.4 z artefaktami |
| Wall of text | Sekcje About / Co umiem dowieźć / Jak pracuję | Średnia długość paragrafu ≤ 100 słów; każda sekcja z kartami/bulletami/chip-cloudem |
| 3 niespójne wzorce kart | Wszystkie sekcje | Jeden komponent `<Card>` w wariantach (default / accent / artifact / growing) — używany konsekwentnie |
| Krytyczny bug `/portfolio` | `curl https://.../portfolio/honeti` | 200 OK, treść case study, sensowny content |
| Privacy w innym stylu | `/privacy-policy` | Header + footer + paleta zgodna z resztą |
| Brak formularza | `/#contact` | Form z 5 polami (z hint placeholder "rola/kontrakt/projekt/inne") + submit działa (test mail dochodzi) |
| Monochromatyczna paleta | Grep CSS / inspect | ≥ 2 akcenty (np. emerald + amber) — accent w kartach, CTA w amber |
| 2.8 MB JS bundle | Lighthouse Network | First Load JS ≤ 200KB, total ≤ 500KB |
| Brak focus rings | Tab przez stronę | Każdy interaktywny element ma widoczny focus ring |
| Flutter a11y wymaga aktywacji | Screen reader test | Cała strona od razu czytelna (semantic HTML) |
| Hide-on-scroll appbar | Scroll w dół/góra | Header chowa się przy scrolldown, pokazuje się przy scrollup |
| Brak wizualnego rozróżnienia track-record vs growing | Sekcja "Co umiem dowieźć" | Zakładki 3.1/3.3/3.5 (core) mają solid border, 3.2/3.4 (growing) mają dashed/lighter — różnica subtelna ale dostrzegalna |

**Lighthouse target:** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

**Test pozycjonowania (manualny):** poproś osobę spoza projektu o przeczytanie hero + pierwszej sekcji w 30 sekund i odpowiedź na pytanie *"Co ten gość robi i czego szuka?"* Oczekiwana odpowiedź: *"Programista (Flutter/Unity), używa AI w workflow, szuka roli/kontraktu."* — nie "AI consultant" ani "automation specialist".

---

## 17. Następne kroki

1. **User review tego planu** — dostosuj wybór paletek (D1), hero asset (D3), Honeti case study strategy (D7), sekcję meta-projekt (D8), FAQ kandydackie (D10).
2. **Claude Designer** (osobny wątek) — bazując na `v1_review/review.md` + `content_redesign.md` + tym planie — zaprojektuj **konkrety wizualne**:
   - paleta (1 z 3 wariantów lub własna),
   - typografia (rozmiary, weights, fonty),
   - hero illustration (portret + PCB pattern lub abstract),
   - ikony Lucide per sekcja "Jak pracuję" (kluczowe — sednowa sekcja),
   - system kart (default / accent / artifact / growing — wizualne odróżnienie track-record vs growing),
   - layout sekcji "Jak pracuję" jako headline act (mocniejszy treatment).
3. **Claude Designer output** = mockupy lub design tokens JSON do ręcznego przeniesienia w Tailwind config + ewentualnie 1-2 referencje portfolio (Lee Robinson, Theo Browne, Josh W Comeau) jako benchmark vibe.
4. **Implementacja** — przejście do faz 1-14 z roadmapy.

→ Po zatwierdzeniu tego planu możesz zlecić Claude Designerowi pracę na 3 wejściach:
- `v1_review/review.md` (problemy do naprawy)
- `content_redesign.md` (treść i pozycjonowanie "AI-Augmented Developer")
- `v2_ui_plan.md` (ten plik — kierunek techniczny, architektura sekcji, otwarte decyzje)

**Dla designera kluczowe to zrozumieć:**
- Strona to **rozszerzone CV / portfolio**, nie sales landing.
- Sekcja **"Jak pracuję" (5.2) jest sednem** — designer musi temu dać proporcjonalnie najwięcej uwagi.
- Track-record (3.1, 4.1, 4.2) wizualnie mocniejszy niż growing (3.2, 3.4, 5).
- Ton "spokojny ekspert + uczciwa pokora" — bez agresywnych claim'ów, bez "AI startup template" looku.

---

# Revision 2026-05-15 — Sekcja 5.4 (restructure)

> **Co tu jest:** nowy plan UI dla sekcji „Doświadczenie / Portfolio" — odpowiednik sekcji 4 z `content_redesign.md` w warstwie layoutu, komponentów i routingu. Stara sekcja 5.4 (4 karty: Honeti / Unity / Warsztat AI / Meta-projekt) pozostaje powyżej jako historia decyzji; ten Revision jest aktualnym źródłem prawdy dla layoutu sekcji 5.4.
>
> **Powiązane:** [`content_redesign.md`](./content_redesign.md) → *Revision 2026-05-15 — Sekcja 4* (źródło treści) + [`honeti_apps_context.md`](./honeti_apps_context.md), [`agent_portfolio_context.md`](./agent_portfolio_context.md), [`warsztat_ai_context.md`](./warsztat_ai_context.md).

## 5.4 Portfolio *(restructured)*

### Struktura sekcji na home

Trzy podsekcje pod jednym H2 „Portfolio":

```
## Portfolio
├── 5.4.1 Portfolio Honeti — komercyjne (4+ lata)        [always live]
├── 5.4.2 Programowanie agentowe — własne wdrożenia      [feature-gated]
└── 5.4.3 Warsztat AI — metodologia                       [always live]
```

**Spis sekcji home (zaktualizowana linia 200 z oryginału — w tym Revisionie superseduje stary punkt 4):**

```
4. Portfolio
   - Honeti (komercyjne)
   - Programowanie agentowe — własne wdrożenia [gated]
   - Warsztat AI — metodologia
```

### 5.4.1 Portfolio Honeti — komercyjne *(always live)*

**Layout (kafelek na home):**

- H3 + 1 zdanie roli (*„4+ lata jako Mobile Developer w Honeti, pełen cykl od planu do utrzymania"*)
- Stack chips: `Flutter` `Dart` `Riverpod` `REST API` `Firebase` `Clean Architecture` + mała wzmianka `Unity (legacy)`
- **3 mini-karty hero apek** w rzędzie (desktop) / stack (mobile):
  - Infoshare *(Flutter, od zera)* — Play + App Store
  - Uprawnienia Budowlane *(Flutter, od zera)* — Play
  - Gastro Ninja Klient *(Unity, rozwój i serwis)* — Play
- Pod kartami: nota *„To trzy największe projekty. Pełna lista — z opisem roli i linkami — jest na podstronie."*
- CTA `→ Zobacz pełne portfolio Honeti` → link do `/portfolio/honeti`

**Komponenty:**
- `<HoneticHero>` — wrapper kafelka
- `<HeroAppMiniCard>` — mini-karta apki (ikona + nazwa + stack badge + rola badge + linki sklepów)
- `<RoleBadge>` — wariant per rola (`od zera` zielony, `rozwój i serwis` szary, `przejęty w trakcie` amber)

**Podstrona `/portfolio/honeti`:**
- Hero z opisem roli i stackiem
- Sekcja **Flutter** — 5 kart (Infoshare, Uprawnienia Budowlane, Testy Prawnicze, Gastro Ninja Kelner, Gastro Ninja Kurier), wszystkie od zera
- Sekcja **Unity (legacy)** — podzielona na:
  - Apki *od zera* (seria edukacyjna 4 apki)
  - Apki *rozwój i serwis* (Gastro Ninja Klient, Gen / Oczami Dziecka, 3 apki z dodatkowej serii edukacyjnej)
  - Apka *przejęta w trakcie* (Soildata)
- Format karty: ikona + nazwa + stack badge + role badge + 1-2 zdania kontekstu biznesowego + lista kontrybucji + linki sklepów

**Podstrony per apka (opcjonalnie, faza późniejsza):** `/portfolio/honeti/[slug]` dla 3-4 flagowców z pełnym case study. URL pattern już istnieje (`/portfolio/[slug]` z poprzedniego planu) — wystarczy rozszerzyć.

**Komponenty (dodatkowe):**
- `<AppCard>` — pełna karta apki na podstronie zbiorczej
- `<AppCardGroup>` — grupowanie po stacku i roli
- `<CaseStudyPage>` — layout dla podstrony per apka (faza późniejsza)

### 5.4.2 Programowanie agentowe — własne wdrożenia *(feature-gated)*

**Release gating w warstwie kodu:**

- Sekcja **renderowana tylko kiedy** flag `AGENT_PORTFOLIO_SECTION_LIVE` jest `true`.
- Flag kontrolowany przez **dwa sub-flagi**: `HOME_STORAGE_MVP_LIVE` && `POLILOCALE_REPO_PUBLIC`.
- Konfiguracja flagów w `v2_react/config/feature-flags.ts` (lub przez env vars na poziomie buildu — do decyzji w implementacji).
- Default w v2 production: wszystkie 3 flagi `false`. Sekcja nieobecna w DOM.
- Po odpaleniu flag — pełny render sekcji 5.4.2 z trzema kartami.

**Layout (po odpaleniu flag):**

- H3 + 1-2 zdania intro (*„AI jest częścią mojego procesu produkcji. Trzy żywe projekty, w których to widać."*)
- **3 karty** (desktop: row, mobile: stack):
  - **Home Storage** — apka mobilna, badges: `Flutter` `Firebase` `CI/CD`. Sub-line: workflow agentowy w pipeline. Linki: Play + App Store.
  - **Polilocale** — OSS, badges: `TypeScript` `AGPL-3.0` `Web`. Sub-line: format-faithful localization manager. Link: GitHub.
  - **buzzards-soft.com** — meta-projekt, badges: `Next.js` `React` `i18n`. Sub-line: ta strona jako artefakt. Link: anchor do podstrony procesu (`/process` lub akordeon).

**Komponenty:**
- `<AgentPortfolioSection>` — wrapper z feature gate (zwraca `null` jeśli flagi off)
- `<AgentProjectCard>` — karta projektu z artefaktami procesu
- `<FeatureGate flag="AGENT_PORTFOLIO_SECTION_LIVE">` — wrapper HOC

**Artefakty procesu do podlinkowania (karta strony jako meta-projekt):**
- `content_redesign.md` (w publicznym repo strony — jeśli zdecydujemy się je otworzyć, do decyzji)
- log decyzji architektonicznych (do utworzenia jako oddzielne ADR-y)
- przykład custom slash command / skilla użytego przy budowie strony
- mini timeline „v1 (Flutter Web) → v2 (Next.js) → redesign sekcji Portfolio"

### 5.4.3 Warsztat AI *(always live)*

**Layout (grid kafelków, hero większy):**

- H3 + 1 zdanie intro (*„To, co wnoszę do każdego zespołu — niezależnie od projektu."*)
- **Hero kafelek** (col-span-2 na desktop, full-width na mobile):
  - Tytuł: „Sprint-driven workflow z typowanymi sesjami"
  - 2-3 zdania opisu
  - 2-3 chips z artefaktami do podlinkowania (BRIEF.md polilocale, sprint file, ADR)
  - Visual marker: subtelne emerald accent (to jest „hero" sekcji)
- **6 mniejszych kafelków** w gridzie 3×2 (desktop) / 1×6 (mobile):
  1. Konfiguracja Claude Code
  2. Wyspecjalizowane subagenty
  3. Custom slash commands i skille
  4. Integracje MCP w workflow
  5. Persistent memory + bilingual rule
  6. Kontrola kosztów + agent w pętli

**Każdy kafelek (mniejszy):**
- Ikona Lucide (do dobrania w fazie design)
- Tytuł
- 1-2 zdania
- 1 chip z konkretnym przykładem (link albo tooltip)

**Komponenty:**
- `<WarsztatGrid>` — wrapper grid 3×2 (po hero)
- `<WarsztatHeroTile>` — duży kafelek hero z większym padding i emerald accent
- `<WarsztatTile>` — standardowy kafelek

**Opcjonalna podstrona `/warsztat`:** deep-dive per kafelek z screenshotami i przykładami kodu. Decyzja: faza późniejsza, nie MVP.

**Alternatywa do podstrony:** akordeon — kafelek po kliknięciu rozwija się in-place. Może być lżejsze niż osobny route.

### Komponenty wspólne dla całej sekcji 4

- `<SectionPortfolio>` — wrapper całej sekcji 4 z H2 „Portfolio" i 3 subsekcjami
- `<FeatureGate>` — wrapper warunkowy dla 5.4.2 (i potencjalnie innych sekcji w przyszłości)
- `<RoleBadge>`, `<StackChip>`, `<StoreLink>` — reużywalne mikro-komponenty

### Rozwiązuje z review (extends original)

- Krytyczny bug v1 `/portfolio` pusty — naprawiony przez `/portfolio/[slug]` (z poprzedniego planu) + nowa podstrona `/portfolio/honeti` jako zbiorcza.
- „Pusta sekcja AI portfolio" — *zastąpiona* trójpodziałem: aktywne komercyjne (4.1) + własne wdrożenia gated (4.2) + warsztat zawsze live (4.3). Każde miejsce ma uczciwą wagę.
- Klikalne karty — wszystkie karty w 4.1 i 4.2 z `<Link>` na cały kafelek.
- Track-record vs growing — 4.1 (track-record) + 4.3 (track-record metodologii) mocniejsze wizualnie; 4.2 (growing, gated) emerald accent po odpaleniu.

### Wpływ na fazy implementacji (z roadmapy)

- **Faza 6** (dotychczas: „Doświadczenie i artefakty + Czego się uczę") — **rozbija się**:
  - Faza 6a (sekcje 4.1 + 4.3 + 5) — 1.5-2 dni
  - Faza 6b (sekcja 4.2 — `<FeatureGate>` + 3 karty + flag config) — 0.5 dnia, do uruchomienia gdy gates się odpalą
- **Nowa podstrona `/portfolio/honeti`** — dodatkowy 0.5-1 dzień w fazie 6a (zbiorcza lista 14 apek).

### TODO — następne kroki implementacyjne

- [ ] Dodać do `feature-flags.ts`: `HOME_STORAGE_MVP_LIVE`, `POLILOCALE_REPO_PUBLIC`, `AGENT_PORTFOLIO_SECTION_LIVE` (computed AND).
- [ ] Zaprojektować `<RoleBadge>` z 3 wariantami (od zera / rozwój i serwis / przejęty w trakcie).
- [ ] Zaprojektować layout podstrony `/portfolio/honeti` z grupowaniem po stacku + roli.
- [ ] Wybrać ikony Lucide per kafelek sekcji 4.3 (7 ikon).
- [ ] Zdecydować: podstrona `/warsztat` w MVP czy akordeon na home?
- [ ] Zdecydować: publiczne repo strony (umożliwia link do `content_redesign.md` z karty meta-projektu w 4.2)?
