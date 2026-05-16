import type { HoneticApp, Role, Stack } from "@/lib/portfolio/types";

const playUrl = (pkg: string) =>
  `https://play.google.com/store/apps/details?id=${pkg}`;

const HONETI_APPS_RAW = [
  {
    slug: "infoshare",
    name: "Infoshare",
    iconSrc: "/portfolio/icons/infoshare.png",
    stack: "Flutter",
    role: "od-zera",
    packageName: "com.infoshare.infoshareconference",
    googleLink: playUrl("com.infoshare.infoshareconference"),
    appleLink: "https://apps.apple.com/app/id6443543236",
    description:
      "Aplikacja konferencyjna dla eventu IT — agenda, mówcy, networking i obsługa offline.",
    contribution: [
      "separacja zależności (clean architecture)",
      "offline-first",
      "state management na Riverpodzie",
      "integracja REST API i Firebase",
      "skaner QR oraz deep linki",
      "Sign in with Google i Sign in with Apple",
    ],
  },
  {
    slug: "uprawnienia-budowlane",
    name: "Uprawnienia Budowlane",
    iconSrc: "/portfolio/icons/uprawnienia-budowlane.png",
    stack: "Flutter",
    role: "od-zera",
    packageName: "com.investconstructions.uprawnieniabudowlane",
    googleLink: playUrl("com.investconstructions.uprawnieniabudowlane"),
    appleLink: "https://apps.apple.com/pl/app/uprawnienia-budowlane-2026/id6593680389?l=pl",
    description:
      "Aplikacja do nauki dla osób przygotowujących się do egzaminu na uprawnienia budowlane — testy, materiały, model subskrypcyjny dostępu do treści.",
    contribution: [
      "architektura MVC",
      "state management na Riverpodzie",
      "integracja REST API",
      "offline-first",
      "obsługa plików PDF",
    ],
  },
  {
    slug: "testy-prawnicze",
    name: "Testy Prawnicze",
    iconSrc: "/portfolio/icons/testy-prawnicze.png",
    stack: "Flutter",
    role: "od-zera",
    packageName: "com.invest_constructions.uprawnienia_prawnicze",
    googleLink: playUrl("com.invest_constructions.uprawnienia_prawnicze"),
    appleLink: "https://apps.apple.com/pl/app/testy-prawnicze/id6737805136?l=pl",
    description:
      "Aplikacja do nauki dla osób przygotowujących się do egzaminu prawniczego — ten sam model nauki przez testy i subskrypcji co Uprawnienia Budowlane, inna domena.",
    contribution: [
      "architektura MVC",
      "state management na Riverpodzie",
      "integracja REST API",
      "offline-first",
      "obsługa plików PDF",
    ],
  },
  {
    slug: "gastro-ninja-kelner",
    name: "Gastro Ninja Kelner",
    iconSrc: "/portfolio/icons/gastro-ninja-kelner.png",
    stack: "Flutter",
    role: "od-zera",
    packageName: "com.sayurisushi.gastroninjawaiter",
    googleLink: playUrl("com.sayurisushi.gastroninjawaiter"),
    description:
      "Narzędzie restauratora w ekosystemie Gastro Ninja (Sayuri Sushi) — przyjmowanie zamówień z aplikacji Klient oraz dodawanie zamówień zewnętrznych (sala, telefon).",
    contribution: [
      "architektura MVC",
      "state management na Riverpodzie",
      "integracja z drukarkami paragonowymi POS",
    ],
  },
  {
    slug: "gastro-ninja-kurier",
    name: "Gastro Ninja Kurier",
    iconSrc: "/portfolio/icons/gastro-ninja-kurier.png",
    stack: "Flutter",
    role: "od-zera",
    packageName: "com.sayurisushi.gastroninjacourier.app_courier",
    googleLink: playUrl("com.sayurisushi.gastroninjacourier.app_courier"),
    description:
      "Aplikacja dla kurierów dowożących jedzenie z ekosystemu Gastro Ninja — mini-Wolt dla rozwozicieli (zlecenia, śledzenie trasy, statusy dostaw).",
    contribution: [
      "architektura MVC",
      "state management na Riverpodzie",
      "integracja z Google Maps",
    ],
  },
  {
    slug: "gastro-ninja-klient",
    name: "Gastro Ninja Klient",
    iconSrc: "/portfolio/icons/gastro-ninja-klient.png",
    stack: "Unity",
    role: "rozwoj-i-serwis",
    packageName: "com.sayurisushi.gastroninjaapp",
    googleLink: playUrl("com.sayurisushi.gastroninjaapp"),
    appleLink: "https://apps.apple.com/pl/app/gastroninja/id1542344916?l=pl",
    description:
      "Aplikacja klienta końcowego w ekosystemie Gastro Ninja — platforma do zamawiania jedzenia na wynos i dostawę, w modelu podobnym do pyszne.pl / pizzaportal.",
    contribution: [
      "dodanie obsługi kodów promocyjnych",
      "odświeżanie i poprawki widoków",
      "utrzymanie i drobne usprawnienia na zgłoszenia z produkcji",
    ],
  },
  {
    slug: "soildata",
    name: "Soildata",
    iconSrc: "/portfolio/icons/soildata.png",
    stack: "Unity",
    role: "rozwoj-i-serwis",
    packageName: "com.soildata.soildataapp",
    googleLink: playUrl("com.soildata.soildataapp"),
    description:
      "Narzędzie dla geodetów — niszowa aplikacja branżowa z mapami i danymi pomiarowymi. Projekt przejęty w połowie implementacji i dopięty do stanu shipowalnego.",
    contribution: [
      "integracja z Google Maps w środowisku Unity (nietrywialna)",
      "integracja REST API",
      "architektura MVC",
      "integracja z zewnętrzną biblioteką .dll dostarczoną przez klienta",
    ],
  },
  {
    slug: "gen-oczami-dziecka",
    name: "Gen / Oczami Dziecka",
    iconSrc: "/portfolio/icons/gen-oczami-dziecka.png",
    iconBackground: "white",
    stack: "Unity",
    role: "rozwoj-i-serwis",
    description:
      "Interaktywna aplikacja edukacyjna dla szkół — build desktopowy dystrybuowany poza sklepami (projekt sprzed czasu API, baza pytań zaszyta w buildzie).",
    contribution: [
      "moduł tablicy interaktywnej z obsługą pisania dotykiem",
      "implementacja kolejnych rozszerzeń aktywności edukacyjnych",
      "aktualizacja bazy pytań zaszytej w buildzie",
    ],
    external: {
      label: "gen.edu.pl",
      url: "https://gen.edu.pl/",
    },
  },
  {
    slug: "words-en",
    name: "Angielski — słówka i obrazki",
    iconSrc: "/portfolio/icons/words-en.png",
    stack: "Unity",
    role: "od-zera",
    packageName: "com.honeti.words_en",
    googleLink: playUrl("com.honeti.words_en"),
    description:
      "Apka edukacyjna dla dzieci — nauka słówek po angielsku. Część czteroapkowej serii budowanej na wspólnym silniku trybu nauki.",
    contribution: [
      "wspólny silnik trybu nauki dla całej serii",
      "In-App Purchases (IAP) i reklamy (Ads)",
      "Object Pooling do zarządzania obiektami w grze",
      "Firebase Realtime Database i Firebase Analytics",
    ],
  },
  {
    slug: "irregular-verbs",
    name: "Czasowniki nieregularne IQ",
    iconSrc: "/portfolio/icons/irregular-verbs.png",
    stack: "Unity",
    role: "od-zera",
    packageName: "com.Honeti.IrregularVerbs",
    googleLink: playUrl("com.Honeti.IrregularVerbs"),
    description:
      "Apka edukacyjna dla dzieci — nauka angielskich czasowników nieregularnych. Część czteroapkowej serii na wspólnym silniku.",
    contribution: [
      "wspólny silnik trybu nauki dla całej serii",
      "In-App Purchases (IAP) i reklamy (Ads)",
      "Object Pooling do zarządzania obiektami w grze",
      "Firebase Realtime Database i Firebase Analytics",
    ],
  },
  {
    slug: "der-die-das",
    name: "Der Die Das",
    iconSrc: "/portfolio/icons/der-die-das.png",
    stack: "Unity",
    role: "od-zera",
    packageName: "com.honeti.derdiedas",
    googleLink: playUrl("com.honeti.derdiedas"),
    description:
      "Apka edukacyjna dla dzieci — nauka rodzajników niemieckich (der / die / das). Część czteroapkowej serii na wspólnym silniku.",
    contribution: [
      "wspólny silnik trybu nauki dla całej serii",
      "In-App Purchases (IAP) i reklamy (Ads)",
      "Object Pooling do zarządzania obiektami w grze",
      "Firebase Realtime Database i Firebase Analytics",
    ],
  },
  {
    slug: "flags",
    name: "Flagi",
    iconSrc: "/portfolio/icons/flags.png",
    stack: "Unity",
    role: "od-zera",
    packageName: "com.honeti.flags",
    googleLink: playUrl("com.honeti.flags"),
    description:
      "Apka edukacyjna dla dzieci — nauka flag państw świata. Część czteroapkowej serii na wspólnym silniku.",
    contribution: [
      "wspólny silnik trybu nauki dla całej serii",
      "In-App Purchases (IAP) i reklamy (Ads)",
      "Object Pooling do zarządzania obiektami w grze",
      "Firebase Realtime Database i Firebase Analytics",
    ],
  },
  {
    slug: "multiplication",
    name: "Tabliczka Mnożenia",
    iconSrc: "/portfolio/icons/multiplication.png",
    stack: "Unity",
    role: "rozwoj-i-serwis",
    packageName: "com.honeti.multiplication",
    googleLink: playUrl("com.honeti.multiplication"),
    description:
      "Apka edukacyjna do nauki tabliczki mnożenia — przejęta do utrzymania w ramach tej samej serii edukacyjnej Honeti (wspólny silnik z apkami od zera).",
    contribution: [
      "utrzymanie wspólnego silnika serii edukacyjnej",
      "drobne poprawki i aktualizacje na zgłoszenia z produkcji",
    ],
  },
  {
    slug: "exponents",
    name: "Potęgi i Pierwiastki",
    iconSrc: "/portfolio/icons/exponents.png",
    stack: "Unity",
    role: "rozwoj-i-serwis",
    packageName: "com.honeti.exponents",
    googleLink: playUrl("com.honeti.exponents"),
    description:
      "Apka edukacyjna do nauki potęg i pierwiastków — przejęta do utrzymania w ramach tej samej serii edukacyjnej Honeti.",
    contribution: [
      "utrzymanie wspólnego silnika serii edukacyjnej",
      "drobne poprawki i aktualizacje na zgłoszenia z produkcji",
    ],
  },
  {
    slug: "roman",
    name: "Cyfry Rzymskie",
    iconSrc: "/portfolio/icons/roman.png",
    stack: "Unity",
    role: "rozwoj-i-serwis",
    packageName: "com.honeti.roman",
    googleLink: playUrl("com.honeti.roman"),
    description:
      "Apka edukacyjna do nauki cyfr rzymskich — przejęta do utrzymania w ramach tej samej serii edukacyjnej Honeti.",
    contribution: [
      "utrzymanie wspólnego silnika serii edukacyjnej",
      "drobne poprawki i aktualizacje na zgłoszenia z produkcji",
    ],
  },
] as const satisfies readonly HoneticApp[];

export const HONETI_APPS: readonly HoneticApp[] = HONETI_APPS_RAW;

export type HoneticAppSlug = (typeof HONETI_APPS_RAW)[number]["slug"];

export type HoneticAppsByStackRole = {
  readonly [S in Stack]: {
    readonly [R in Role]: readonly HoneticApp[];
  };
};

function groupByStackRole(
  apps: readonly HoneticApp[],
): HoneticAppsByStackRole {
  const init = (): { readonly [R in Role]: HoneticApp[] } => ({
    "od-zera": [],
    "rozwoj-i-serwis": [],
  });

  const grouped: { [S in Stack]: { [R in Role]: HoneticApp[] } } = {
    Flutter: init() as { [R in Role]: HoneticApp[] },
    Unity: init() as { [R in Role]: HoneticApp[] },
  };

  for (const app of apps) {
    grouped[app.stack][app.role].push(app);
  }

  return grouped;
}

export const HONETI_APPS_BY_STACK_ROLE: HoneticAppsByStackRole =
  groupByStackRole(HONETI_APPS);

export function getHoneticApp(
  slug: HoneticAppSlug | string,
): HoneticApp | undefined {
  return HONETI_APPS.find((app) => app.slug === slug);
}

export const HONETI_APP_SLUGS: readonly HoneticAppSlug[] = HONETI_APPS_RAW.map(
  (a) => a.slug,
);
