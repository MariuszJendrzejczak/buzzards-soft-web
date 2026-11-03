import { useEffect } from "react";
import { Toaster, toast } from "buzzards-soft-ui";

// Toaster renders a fixed, portalled toast stack: these stories need
// overrides.Toaster = { cardMode: "single", primaryStory: "Success" }.
// Each story mounts the site's own Toaster config (bottom-right, richColors,
// closeButton — app/[locale]/layout.tsx) and fires one toast on mount. The
// frame's transform makes it the containing block for Sonner's fixed stack,
// so the toast lands inside the cell instead of the viewport corner.

const FRAME = { width: 560, height: 360, transform: "translateZ(0)" } as const;
const CAPTION = "Formularz kontaktowy · powiadomienie po wysłaniu";

function useToastOnce(fire: () => void) {
  useEffect(() => {
    const id = setTimeout(fire, 0);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function Success() {
  useToastOnce(() => toast.success("Dziękuję, odezwę się wkrótce.", { duration: Infinity }));
  return (
    <div className="p-6" style={FRAME}>
      <p className="text-sm text-muted-foreground">{CAPTION}</p>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

export function Error() {
  useToastOnce(() =>
    toast.error("Coś poszło nie tak, spróbuj ponownie lub mailem dev.buzzardssoft@gmail.com", {
      duration: Infinity,
    }),
  );
  return (
    <div className="p-6" style={FRAME}>
      <p className="text-sm text-muted-foreground">{CAPTION}</p>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

export function Warning() {
  useToastOnce(() =>
    toast.warning("Za dużo prób w krótkim czasie. Odczekaj minutę i spróbuj ponownie.", {
      duration: Infinity,
    }),
  );
  return (
    <div className="p-6" style={FRAME}>
      <p className="text-sm text-muted-foreground">{CAPTION}</p>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

export function Neutral() {
  useToastOnce(() => toast("Skopiowano: Email", { description: "dev.buzzardssoft@gmail.com", duration: Infinity }));
  return (
    <div className="p-6" style={FRAME}>
      <p className="text-sm text-muted-foreground">Dane kontaktowe · kopiowanie do schowka</p>
      <Toaster position="bottom-right" closeButton />
    </div>
  );
}
