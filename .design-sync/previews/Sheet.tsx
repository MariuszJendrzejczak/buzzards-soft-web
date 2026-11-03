import {
  Button,
  Icons,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ThemeToggle,
} from "buzzards-soft-ui";

// Sheet portals a fixed overlay to <body>: these stories need
// overrides.Sheet = { cardMode: "single", primaryStory: "MobileMenu" }.

const NAV = [
  { href: "#certification", label: "Warsztat AI" },
  { href: "#what-i-can-deliver", label: "Co umiem" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "O mnie" },
  { href: "#education", label: "Wykształcenie" },
  { href: "/web-pages-offer", label: "Twoja Strona" },
  { href: "#contact", label: "Kontakt" },
];

const NAV_LINK =
  "rounded-md px-3 py-3 text-base font-medium text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring";

function MenuTrigger() {
  return (
    <SheetTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Otwórz menu" />}>
      <Icons.Menu />
    </SheetTrigger>
  );
}

export function MobileMenu() {
  return (
    <div className="p-6">
      <Sheet defaultOpen>
        <MenuTrigger />
        <SheetContent side="right" className="w-full max-w-sm border-l border-border bg-background sm:max-w-sm">
          <SheetHeader className="border-b border-border/60">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">Nawigacja po sekcjach strony</SheetDescription>
          </SheetHeader>
          <nav aria-label="Nawigacja mobilna" className="flex flex-1 flex-col gap-1 px-4 py-2">
            {NAV.map((item) => (
              <SheetClose key={item.href} render={<a href={item.href} className={NAV_LINK} />}>
                {item.label}
              </SheetClose>
            ))}
          </nav>
          <div className="flex flex-col gap-3 border-t border-border/60 p-4">
            <ThemeToggle className="self-start" />
            <SheetClose
              render={
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<a href="#contact" />}
                  className="h-11 w-full bg-cta text-white hover:bg-cta-hover"
                />
              }
            >
              Porozmawiajmy
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function Closed() {
  return (
    <div className="flex items-center gap-3 p-6">
      <span className="font-heading text-sm font-semibold tracking-tight text-foreground">Buzzards Soft</span>
      <Sheet>
        <MenuTrigger />
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function BottomWithDescription() {
  return (
    <div className="p-6">
      <Sheet defaultOpen>
        <SheetTrigger render={<Button variant="outline">Pakiet Full</Button>} />
        <SheetContent side="bottom" className="bg-background">
          <SheetHeader>
            <SheetTitle className="text-lg">Pakiet Full — 2499 zł netto</SheetTitle>
            <SheetDescription>
              Dla firmy, która chce być widoczna i pozyskiwać kontakt. Do 8 sekcji + 2 podstrony,
              widoczność lokalna (Google Business), animacje oraz tryb ciemny i jasny.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="sm:flex-row sm:justify-end">
            <SheetClose render={<Button variant="ghost" />}>Wróć do cennika</SheetClose>
            <Button className="bg-cta text-white hover:bg-cta-hover">Zamów Full</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function LeftDefault() {
  return (
    <div className="p-6">
      <Sheet defaultOpen>
        <SheetTrigger render={<Button variant="outline">Spis treści</Button>} />
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Polityka prywatności</SheetTitle>
            <SheetDescription>Przejdź do wybranego rozdziału dokumentu.</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4 text-sm">
            {["Administrator danych", "Zakres danych", "Cel przetwarzania", "Pliki cookies", "Twoje prawa"].map(
              (label) => (
                <a key={label} href="#" className="rounded-md px-3 py-2 text-muted-foreground hover:bg-surface hover:text-foreground">
                  {label}
                </a>
              ),
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
