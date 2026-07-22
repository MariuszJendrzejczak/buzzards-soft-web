"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const NAV_KEYS = [
  { href: "#how-i-work", key: "howIWork" },
  { href: "#what-i-can-deliver", key: "whatIDeliver" },
  { href: "#portfolio", key: "portfolio" },
  // { href: "#currently-learning", key: "learning" }, // temporarily hidden with the "Rozwój" section
  { href: "#about", key: "about" },
  { href: "#education", key: "education" },
  { href: "/web-pages-offer", key: "offer" },
  { href: "#contact", key: "contact" },
] as const;

type NavKey = (typeof NAV_KEYS)[number];

export function Header() {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const { hidden, scrolled, hideHeader } = useHeaderScrollState();
  const [mobileOpen, setMobileOpen] = useState(false);
  // next-intl's usePathname strips the locale prefix, so the home page is "/"
  // regardless of locale. Sub-pages (case studies, privacy) get their own
  // back-button navigation and don't need the section nav.
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground focus:outline-none"
      >
        {tCommon("skipToContent")}
      </a>

      <header
        data-scrolled={scrolled || mobileOpen ? "true" : "false"}
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 will-change-transform",
          "border-b border-transparent",
          (scrolled || mobileOpen) &&
            "border-border/60 bg-background/70 supports-[backdrop-filter]:backdrop-blur-md supports-[backdrop-filter]:bg-background/55",
          hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:px-8">
          <BrandMark ariaLabel={tNav("brandHomeAria")} />

          <nav
            aria-label={tNav("mainAria")}
            className="hidden lg:flex lg:items-center lg:gap-1"
          >
            {NAV_KEYS.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                label={tNav(`items.${item.key}`)}
                onNavigate={hideHeader}
              />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle className="hidden sm:inline-flex" />
            <LanguageToggle className="hidden sm:inline-flex" />

            <Button
              size="sm"
              nativeButton={false}
              render={<a href="#contact" />}
              className="hidden bg-cta px-3 text-primary-foreground hover:bg-cta-hover sm:inline-flex"
            >
              {tCommon("ctaTalk")}
            </Button>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={tNav("openMenu")}
                    className="lg:hidden"
                  />
                }
              >
                <Menu />
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full max-w-sm border-l border-border bg-background sm:max-w-sm"
              >
                <SheetHeader className="border-b border-border/60">
                  <SheetTitle>{tNav("menuTitle")}</SheetTitle>
                  <SheetDescription className="sr-only">
                    {tNav("menuDescription")}
                  </SheetDescription>
                </SheetHeader>

                <nav
                  aria-label={tNav("mobileAria")}
                  className="flex flex-1 flex-col gap-1 px-4 py-2"
                >
                  {NAV_KEYS.map((item) => {
                    const className =
                      "rounded-md px-3 py-3 text-base font-medium text-foreground outline-none transition-colors hover:bg-surface focus-visible:ring-2 focus-visible:ring-ring";
                    return (
                      <SheetClose
                        key={item.href}
                        render={
                          item.href.startsWith("/") ? (
                            <Link
                              href={item.href}
                              onClick={hideHeader}
                              className={className}
                            >
                              {tNav(`items.${item.key}`)}
                            </Link>
                          ) : (
                            <a
                              href={item.href}
                              onClick={hideHeader}
                              className={className}
                            >
                              {tNav(`items.${item.key}`)}
                            </a>
                          )
                        }
                      />
                    );
                  })}
                </nav>

                <div className="flex flex-col gap-3 border-t border-border/60 p-4">
                  <ThemeToggle className="self-start" />
                  <LanguageToggle className="self-start sm:hidden" />
                  <SheetClose
                    render={
                      <Button
                        size="lg"
                        nativeButton={false}
                        render={<a href="#contact" />}
                        className="h-11 w-full bg-cta text-primary-foreground hover:bg-cta-hover"
                      >
                        {tCommon("ctaTalk")}
                      </Button>
                    }
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

function BrandMark({ ariaLabel }: { ariaLabel: string }) {
  return (
    <Link
      href="/"
      aria-label={ariaLabel}
      className="group/brand inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Image
        src="/brand-mark.png"
        alt=""
        width={32}
        height={32}
        priority
        aria-hidden
        // White monochrome mark — ink it black in light (matching the wordmark),
        // keep white in dark.
        className="size-8 brightness-0 transition-transform group-hover/brand:scale-105 dark:brightness-100"
      />
      <span className="font-heading text-sm font-semibold tracking-tight text-foreground sm:text-base">
        Buzzards Soft
      </span>
    </Link>
  );
}

function NavLink({
  item,
  label,
  onNavigate,
}: {
  item: NavKey;
  label: string;
  onNavigate?: () => void;
}) {
  const className =
    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";

  if (item.href.startsWith("/")) {
    return (
      <Link href={item.href} onClick={onNavigate} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={item.href} onClick={onNavigate} className={className}>
      {label}
    </a>
  );
}

/**
 * Hide-on-scroll: header retracts when scrolling down past a small threshold,
 * reappears immediately when scrolling up. Always visible at the top of the
 * page. `scrolled` toggles the translucent backdrop once the user moves at all.
 *
 * `hideHeader()` is intended for nav-link clicks: it forces the bar shut and
 * suppresses the scroll listener for ~700ms so the in-flight programmatic
 * scroll (which may go up or down) does not flip it back open.
 */
function useHeaderScrollState() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const suppressUntilRef = useRef(0);

  const hideHeader = useCallback(() => {
    suppressUntilRef.current = Date.now() + 700;
    setHidden(true);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const REVEAL_THRESHOLD = 80;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      setScrolled(y > 4);

      const suppressed = Date.now() < suppressUntilRef.current;
      if (!suppressed) {
        if (y < REVEAL_THRESHOLD) {
          setHidden(false);
        } else if (delta > 6) {
          setHidden(true);
        } else if (delta < -6) {
          setHidden(false);
        }
      }

      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { hidden, scrolled, hideHeader };
}
