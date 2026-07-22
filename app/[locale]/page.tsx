import type { Metadata } from "next";

import { About } from "@/components/sections/about/about";
import { Contact } from "@/components/sections/contact/contact";
// Temporarily hidden — the "Rozwój" (currently-learning) section is parked while
// the offer is reworked in another context. Restore this import + its render below.
// import { CurrentlyLearning } from "@/components/sections/experience/currently-learning";
import { Education } from "@/components/sections/education/education";
import { Hero } from "@/components/sections/hero/hero";
import { HowIWork } from "@/components/sections/work/how-i-work";
import { WhatICanDeliver } from "@/components/sections/work/what-i-can-deliver";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { PhotoBand } from "@/components/shared/photo-band";
import { setRequestLocale } from "next-intl/server";
import { TITLE_DEFAULT } from "@/lib/seo";

// Home inherits title.default + openGraph + twitter from the root layout.
// `title.absolute` here keeps the home <title> as the bare brand line
// instead of "...| Buzzards Soft".
export const metadata: Metadata = {
  title: { absolute: TITLE_DEFAULT },
};

// Ambient photo backdrops (PROTOTYPE — throwaway grayscale placeholders).
// The site alternates REVEAL sections (own photo behind their content, wrapped
// in <PhotoBand>) with opaque COVER sections. Each reveal owns its own pinned
// photo clipped to its box, so a swap happens behind a cover section — and when
// a cover strip is short (the Portfolio header), two reveal photos can be
// partially visible at once, each correctly clipped to its own section.
// Curated colour backdrops, self-hosted in public/images/ (converted to webp).
// Direction (web-visual-elevation): nature/"buzzard" mood for hero + portfolio,
// a real climbing shot for about, tech imagery for deliver + contact.
const BACKDROP = {
  hero: "/images/hero.webp",
  deliver: "/images/deliver.webp",
  portfolio: "/images/portfolio.webp",
  about: "/images/about.webp",
  contact: "/images/contact.webp",
} as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 01 · Hero — REVEAL (photo behind the hero, top of page). Colour photo:
          moderate lift keeps the dramatic mountains dark-theme rich. */}
      <PhotoBand
        src={BACKDROP.hero}
        scrimClassName="bg-white/35 dark:bg-black/30"
        photoClassName="bg-center dark:brightness-125"
      >
        <Hero />
      </PhotoBand>

      {/* 02 · Jak pracuję — COVER (opaque bg-surface) */}
      <HowIWork />

      {/* 03 · Co umiem dowieźć — REVEAL (dark IDE photo: brighter lift so the
          near-black screen brings light into the dark theme; syntax colour on
          black survives it). */}
      <PhotoBand
        src={BACKDROP.deliver}
        scrimClassName="bg-white/45 dark:bg-black/42"
        photoClassName="bg-center dark:brightness-140"
      >
        <WhatICanDeliver />
      </PhotoBand>

      {/* 04 · Portfolio — header COVERS; HONETi + Programowanie agentowe REVEAL
          (own photo); AI Native Development COVERS again (handled inside). */}
      <PortfolioSection id="portfolio" backdropSrc={BACKDROP.portfolio} />
      {/* <CurrentlyLearning /> — temporarily hidden (see import note above) */}

      {/* 06 · O mnie — REVEAL (real climbing photo: gentle brightness so the
          pink belayer + green-helmet climber keep their colour; crop anchored
          low so both subjects stay in the wide band). */}
      <PhotoBand
        src={BACKDROP.about}
        scrimClassName="bg-white/40 dark:bg-black/40"
        photoClassName="bg-bottom dark:brightness-110"
      >
        <About />
      </PhotoBand>

      {/* 07 · Wykształcenie — COVER */}
      <Education />

      {/* 08 · Kontakt — REVEAL (dusk-window workspace: gentle lift keeps the
          city + warm screen glow; already has its own light sources). */}
      <PhotoBand
        src={BACKDROP.contact}
        scrimClassName="bg-white/45 dark:bg-black/42"
        photoClassName="bg-center dark:brightness-115"
      >
        <Contact />
      </PhotoBand>
    </>
  );
}
