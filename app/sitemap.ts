import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { SITE_URL, hreflangFor } from "@/lib/seo";

export const dynamic = "force-static";

type Frequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type Route = {
  path: string;
  changeFrequency: Frequency;
  priority: number;
};

const ROUTES: Route[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/portfolio/honeti", changeFrequency: "monthly", priority: 0.9 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [hreflangFor(l), `${SITE_URL}/${l}${path}`]),
    );

    return routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
