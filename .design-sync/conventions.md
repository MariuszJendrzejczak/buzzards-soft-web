# Buzzards Soft — building with this design system

Buzzards Soft is a solo software studio. Its site is dark-first: deep green-slate
surfaces, emerald brand accents and amber calls to action. Copy is Polish-first,
with EN and SV as translations. The voice is mature and peer-to-peer: assertive,
never framed as "not X / unlike others".

## 1. Always wrap the screen in `BuzzardsRoot`

```jsx
const { BuzzardsRoot } = window.BuzzardsSoft;
<BuzzardsRoot theme="dark" locale="pl" className="min-h-screen">{/* screen */}</BuzzardsRoot>
```

`BuzzardsRoot` does three things:
- It puts the theme class on `<html>`, so portalled popups (Select, Sheet,
  CertificateLightbox) are themed as well.
- It provides the site's real translations.
- It paints `bg-background text-foreground font-sans`.

Without it the screen falls back to the light `:root` palette. Components that read
translations (RoleBadge, StoreLink, ProjectLink, AgentProjectCard, AppCardGroup,
PortfolioSeriesTile, WarsztatTile, WarsztatHeroTile) throw outside it.
- Use `theme="dark"` unless the brief asks for light.
- Use one root per page. Don't nest roots with different themes: the theme is
  page-wide.

## 2. Styling: Tailwind v4 utilities on semantic tokens

Style your own layout with the utility classes below. Don't use raw hex values, and
don't make up class names. Arbitrary values such as `w-[537px]` are **not**
compiled, so put one-off sizes in `style={{ width: 537 }}` instead.

| Purpose | Classes |
|---|---|
| Surfaces | `bg-background`, `bg-card`, `bg-surface`, `bg-surface-elevated`, `bg-muted` |
| Text | `text-foreground`, `text-muted-foreground`, `text-text-subtle` |
| Brand (emerald) | `text-brand`, `bg-brand/10`, `border-brand/30`, `text-brand-soft` |
| Call to action (amber) | `bg-cta hover:bg-cta-hover text-white` |
| Lines | `border border-border`, `border-border/60` |
| Type | `font-heading` (Space Grotesk, all headings), `font-sans` (Geist, body), `font-mono` (Geist Mono, eyebrows and chips) |
| Shape | `rounded-lg`, `rounded-xl`, `rounded-2xl` (cards), `shadow-sm` |
| Layout | `flex`, `grid`, `grid-cols-1…12` (with `sm:`/`md:`/`lg:`), `gap-*`, `p-*`/`px-*`/`py-*`, `mx-auto`, `max-w-*` |

The eyebrow pattern is `font-mono text-xs uppercase tracking-widest text-brand`.
Section headings use `font-heading font-semibold tracking-tight`.

## 3. Where the truth lives

- `styles.css` → `_ds_bundle.css` holds every token: the light values on `:root`,
  the dark values on `.dark`.
- Each component's `<Name>.prompt.md` has its props and real usage examples. Read
  it before composing. Subparts (`CardHeader`, `SelectItem`, `SheetContent`,
  `FormField`, `AccordionItem`, `StaggerItem`) are named exports, shown in their
  parent's examples.
- Icons are the lucide set the site uses, as `Icons.<Name>`: `Icons.ArrowRight`,
  `Icons.Send`, `Icons.Bot`, `Icons.Smartphone`…
- Real portfolio data: `HONETI_APPS`, `AGENT_PROJECTS` (props for AppCard,
  HeroAppMiniCard, AgentProjectCard).
- Images: `next/image`-based components resolve `/portfolio/...` paths from
  https://buzzards-soft.com. PhotoBand `src` and raw `<img>` need absolute
  https URLs.

## 4. Example

```jsx
const { BuzzardsRoot, Button, AppCard, Icons, HONETI_APPS } = window.BuzzardsSoft;

<BuzzardsRoot>
  <section className="mx-auto max-w-6xl px-6 py-24">
    <span className="font-mono text-xs uppercase tracking-widest text-brand">Portfolio</span>
    <h2 className="mt-3 font-heading text-4xl font-semibold tracking-tight">Aplikacje mobilne</h2>
    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
      Aplikacje Flutter i Unity rozwijane komercyjnie, od zera i w utrzymaniu.
    </p>
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      {HONETI_APPS.slice(0, 4).map((app) => <AppCard key={app.slug} app={app} />)}
    </div>
    <Button size="lg" className="mt-10 h-12 gap-2 bg-cta px-6 text-base text-white hover:bg-cta-hover">
      Porozmawiajmy <Icons.ArrowRight className="size-4" />
    </Button>
  </section>
</BuzzardsRoot>
```
