import type { Locale } from "@/i18n/routing";
import { SITE_NAME, SITE_URL, absoluteUrl, ogLocaleFor } from "@/lib/seo";

const PERSON_ID = `${SITE_URL}/#person`;
const SERVICE_ID = `${SITE_URL}/#service`;

const PERSON_NAME = "Mariusz Jendrzejczak";
const PHONE = "+48 739 979 116";
const EMAIL_PRIMARY = "dev.buzzardssoft@gmail.com";
const ADDRESS = {
  streetAddress: "Pomorska 14/8",
  postalCode: "74-300",
  addressLocality: "Myślibórz",
  addressCountry: "PL",
};
const KNOWS_ABOUT = [
  "Flutter",
  "Dart",
  "Unity",
  "C#",
  "TypeScript",
  "Next.js",
  "AI-augmented development",
  "Claude Code",
  "Model Context Protocol",
  "Mobile development",
  "Game development",
];
const SAME_AS = [
  "https://www.linkedin.com/in/",
  "https://github.com/",
];

export function JsonLd({ locale }: { locale: Locale }) {
  const homeUrl = absoluteUrl(`/${locale}`);
  const inLanguage = ogLocaleFor(locale).replace("_", "-");

  const graph = [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON_NAME,
      jobTitle: "AI-Augmented Developer",
      description:
        "Software developer with 4+ years of commercial experience in Flutter and Unity, working with AI agents (Claude Code, MCP, custom tooling) as part of a daily development workflow.",
      url: homeUrl,
      email: `mailto:${EMAIL_PRIMARY}`,
      telephone: PHONE,
      knowsLanguage: ["pl", "en"],
      knowsAbout: KNOWS_ABOUT,
      sameAs: SAME_AS,
      worksFor: { "@id": SERVICE_ID },
      address: {
        "@type": "PostalAddress",
        ...ADDRESS,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": SERVICE_ID,
      name: SITE_NAME,
      legalName: "Buzzards Soft Mariusz Jendrzejczak",
      url: homeUrl,
      inLanguage,
      founder: { "@id": PERSON_ID },
      employee: { "@id": PERSON_ID },
      email: `mailto:${EMAIL_PRIMARY}`,
      telephone: PHONE,
      taxID: "PL9552105374",
      vatID: "PL9552105374",
      identifier: [
        { "@type": "PropertyValue", propertyID: "NIP", value: "955-210-53-74" },
        { "@type": "PropertyValue", propertyID: "REGON", value: "302197078" },
        { "@type": "PropertyValue", propertyID: "DUNS", value: "427603771" },
      ],
      address: {
        "@type": "PostalAddress",
        ...ADDRESS,
      },
      areaServed: ["PL", "EU", "Worldwide (remote)"],
      serviceType: [
        "Software development",
        "Mobile application development (Flutter)",
        "Interactive applications and games (Unity)",
        "AI-augmented development workflow consulting",
      ],
    },
  ];

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // schema.org JSON-LD must be raw JSON; React would otherwise escape it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
