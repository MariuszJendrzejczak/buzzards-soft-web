import { ThemeToggle } from "buzzards-soft-ui";

// Previews render dark (site default), so "Dark theme" is the active segment.
// Don't click in the canvas: every cell shares <html>, a light flip themes all.

export function Default() {
  return (
    <div className="p-6">
      <ThemeToggle />
    </div>
  );
}

export function InHeaderBar() {
  return (
    <div className="p-6" style={{ width: 520 }}>
      <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background/80 px-4 py-3">
        <span className="font-heading text-base font-semibold tracking-tight text-foreground">
          Buzzards Soft
        </span>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <span>Warsztat AI</span>
            <span>Portfolio</span>
            <span>Kontakt</span>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
