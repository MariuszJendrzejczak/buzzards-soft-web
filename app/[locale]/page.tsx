import type { Metadata } from "next";

import { About } from "@/components/sections/about/about";
import { Contact } from "@/components/sections/contact/contact";
import { CurrentlyLearning } from "@/components/sections/experience/currently-learning";
import { Education } from "@/components/sections/education/education";
import { Hero } from "@/components/sections/hero/hero";
import { HowIWork } from "@/components/sections/work/how-i-work";
import { WhatICanDeliver } from "@/components/sections/work/what-i-can-deliver";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { setRequestLocale } from "next-intl/server";
import { TITLE_DEFAULT } from "@/lib/seo";

// Home inherits title.default + openGraph + twitter from the root layout.
// `title.absolute` here keeps the home <title> as the bare brand line
// instead of "...| Buzzards Soft".
export const metadata: Metadata = {
  title: { absolute: TITLE_DEFAULT },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HowIWork />
      <WhatICanDeliver />
      <PortfolioSection id="portfolio" />
      <CurrentlyLearning />
      <About />
      <Education />
      <Contact />
    </>
  );
}
