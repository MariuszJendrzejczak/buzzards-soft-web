import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { CurrentlyLearning } from "@/components/sections/CurrentlyLearning";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/hero";
import { HowIWork } from "@/components/sections/how-i-work";
import { WhatICanDeliver } from "@/components/sections/WhatICanDeliver";
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
      <Experience />
      <CurrentlyLearning />
      <About />
      <Education />
      <Contact />
    </>
  );
}
