# mobileOffer — EN transcreation (reviewable artifact — NOT messages/*.json)

> Produced by `transcreate-copy-en` from the approved PL `mobileOffer` namespace
> (`messages/pl.json`, branch `feature/mobile-apps-offer`). PL is the source of
> truth; this is native-EN transcreation (effect carried, not word-for-word).
> **This file is for human review.** Landing into `messages/en.json` + producing
> SV (parity-only straight translation) is a separate step, done after approval.
>
> Package-name convention aligned to the existing web offer: PL "Większy projekt"
> → EN **"Bigger project"** → SV "Större projekt" (so `custom.name` / `colCustom`
> match the site's other offer page).

## Copy (full `mobileOffer` tree, keys 1:1 with PL)

```json
{
  "mobileOffer": {
    "meta": {
      "title": "Mobile apps for business — iOS + Android, yours to own",
      "description": "I build mobile apps for small businesses and freelancers — iOS and Android from one codebase, published to the App Store and Google Play on your own accounts. An expert who works with AI, so you get it faster and at a price you can afford."
    },
    "breadcrumbBack": "Back to the home page",
    "hero": {
      "eyebrow": "Mobile apps for local businesses and one-person operations",
      "heading": "Your iPhone and Android app, published and entirely yours",
      "subheading": "This is a real product for your business, ready to work with your customers. I build it myself with the help of AI, and you have a direct line to me the whole way through. It all starts with a conversation about what your app should do.",
      "ctaPrimary": "Get a quote for your app",
      "ctaSecondary": "See how I work"
    },
    "audience": {
      "heading": "A mobile app within reach of a small business",
      "body1": "This offer is first and foremost for small businesses and freelancers who want to give their customers a handy app on their phone — for bookings, orders, or day-to-day contact with your service. An app like this is a realistic step for a small business today.",
      "body2": "I do it myself, and I openly reach for AI wherever it genuinely speeds the work up: on repetitive code, testing, and configuration. That means the app takes fewer hours to build, and since you pay for the time it takes, the price comes down with it. It's the same careful work, brought to a finish faster. That's exactly why the price fits a small business budget.",
      "body3": "The technology speeds things up, but how the app works and looks is my call, and I check it in person, screen by screen. You talk to one person, from that first conversation through to the finished app. I'm the one accountable for the result, and I'm who you ask when you want to change something."
    },
    "examples": {
      "heading": "What you can build",
      "intro": "Here are the three apps I build most often, and what each one does for a business like yours. Yours might work in a completely different way, and that's exactly where our first conversation starts. Think of these as starting points to react to.",
      "items": {
        "booking": {
          "name": "Booking app",
          "body": "Your customer opens the app, browses your services, and picks a time that suits them. Every booking lands with you the moment it's made, so you always know who's coming and when. You get a clear view of your calendar without a single phone call."
        },
        "flowchart": {
          "name": "Flowchart app",
          "body": "Your team lays out procedures as a clear diagram: each step, each decision, and instructions to follow along the way. You keep it within reach at all times, you can send it to a customer as an image, and it opens offline too. The whole process stays in one place everyone can read."
        },
        "organizer": {
          "name": "Organizer",
          "body": "Tasks, notes, and reminders live in one place, sorted into categories that make sense to you. The app flags each item at the right moment so nothing slips through. It gives you a firm grip on the day and shows you what needs attention next."
        }
      }
    },
    "guide": {
      "heading": "How your app comes together",
      "intro": "Five steps take you from an idea to an app that's live in the stores. I start the publishing process right at the beginning so it's ready in time. At every stage you know what's happening, and you have a real say in what gets built. You stay in the loop from the first conversation to launch day.",
      "steps": {
        "conversation": {
          "title": "Conversation",
          "body": "We start with a plain, human conversation in everyday language. You tell me what you do, who your customers are, and how the app should help them. You talk straight to me, so we settle the scope, the style, and a rough timeline on the spot. You walk away with a clear picture of what we're going to build."
        },
        "design": {
          "title": "Design",
          "body": "I design the app around your business: the screens, how you move between them, and the way it looks. I show you all of this before I start building, so you see the real shape of the product and point out what to adjust. Your notes go in at this stage, while a change of direction is still quick and easy. We head into the build with a layout you've already signed off on."
        },
        "build": {
          "title": "Build",
          "body": "I build both versions at once, so they grow together and behave the same way. As each part is finished, I test it myself and polish the details. I try every screen on real phones to make sure it responds smoothly to touch. You end up with a refined app that's ready for the stores."
        },
        "publish": {
          "title": "Publishing",
          "body": "We set up your store accounts together, and I publish the app to both, on the App Store and Google Play. I lay out below how the store timelines work and exactly what each one checks for. The result is simple: your app reaches both stores, ready to download."
        },
        "support": {
          "title": "Support",
          "body": "After launch you get 30 days of support, your app's first stretch on the market as it meets real users. You flag anything that needs a fix, and I respond and keep everything running the way it should. This time gives your app a calm, well-tended start on the market."
        }
      },
      "processNote": "Want to see my process under the hood? Here's how I work with AI →"
    },
    "includes": {
      "heading": "What comes with every package",
      "intro": "Whatever the size of your project, the same solid foundation is always included. This is the standard I build every app on. It's the groundwork that keeps the app dependable long after launch.",
      "items": {
        "platforms": "One app for iPhone and Android, built from a single codebase. You reach all of your customers whatever phone they carry, and one shared source means both versions behave the same way and grow together.",
        "theme": "Light and dark mode, plus Polish and English, as standard. The app adapts to the phone's settings and looks right at any hour, and with two languages you can comfortably serve a customer from abroad too.",
        "backend": "The technical backbone the app runs on: sign-in, a database, and notifications, all set up on your own cloud account. Your customers' data belongs to you and stays under your control.",
        "publication": "Full publishing in the stores: I walk the app through the whole process until it lands on the shelf. Your customers find it just like any other app, on their iPhone and Android.",
        "accounts": "Help setting up your company accounts on the App Store and Google Play, and getting through the paperwork each one asks for. I guide you through it calmly, so the accounts are in your name and the requirements are off your plate.",
        "ownership": "A finished product that's yours to own. You pay once for the build, and you decide everything that happens with the app from there.",
        "support": "30 days of support after launch. Once the app is in the stores and reaching your first customers, you have me within reach for day-to-day fixes."
      }
    },
    "pricing": {
      "heading": "Packages and pricing",
      "promoNote": "launch price",
      "footnote": "Prices are net. The launch price applies during the offer's launch period. Platform fees (Apple, Google) and backend costs go straight to those providers — I cover this in the \"Everything is yours\" section.",
      "baseReference": "+ the full standard from the \"What comes with every package\" section.",
      "extrasLabel": "Full adds:",
      "rowLabels": {
        "audience": "Who it's for",
        "scope": "Scope",
        "screens": "Screens",
        "timeline": "Time to publishing"
      },
      "start": {
        "name": "Start",
        "basePrice": "12 900 zł",
        "promoPrice": "9 900 zł",
        "priceTag": "launch price",
        "audience": "Your first real way of getting onto your customers' phones",
        "scope": "one polished scenario + a light backend",
        "screens": "~6–7 screens",
        "timeline": "~5–7 weeks",
        "cta": "Quote Start"
      },
      "full": {
        "name": "Full",
        "basePrice": "24 900 zł",
        "promoPrice": "19 900 zł",
        "priceTag": "launch price",
        "audience": "an app that works as a working tool for your business",
        "scope": "Start + user accounts and tools to run your business",
        "screens": "~25–31 screens",
        "timeline": "~8–11 weeks",
        "extras": "User accounts and profiles, Self-service cancellations and changes, Loyalty program, Push notifications, Owner panel in the app",
        "cta": "Quote Full"
      },
      "custom": {
        "name": "Bigger project",
        "price": "Custom quote",
        "audience": "payments, multiple locations, integrations",
        "scope": "scope custom-built to fit, from ~30 000 zł net",
        "screens": "based on scope",
        "timeline": "based on scope",
        "cta": "Let's talk"
      }
    },
    "comparison": {
      "heading": "How the packages differ",
      "intro": "The biggest difference is user accounts — Full starts with them, and so does everything that follows from them. A bigger project goes further, toward online payments and multiple locations. You'll find the details in the table below.",
      "colFeature": "Feature",
      "colStart": "Start",
      "colFull": "Full",
      "colCustom": "Bigger",
      "items": {
        "accounts": { "label": "User accounts and sign-in", "start": "—", "full": "✓", "custom": "✓" },
        "push": { "label": "Push notifications to your customer", "start": "—", "full": "✓", "custom": "✓" },
        "ownerPanel": { "label": "Owner panel in the app", "start": "—", "full": "✓", "custom": "✓" },
        "loyalty": { "label": "Loyalty program", "start": "—", "full": "✓", "custom": "✓" },
        "payments": { "label": "Online payments", "start": "—", "full": "—", "custom": "✓" },
        "multiLocation": { "label": "Multiple locations, staff selection", "start": "—", "full": "—", "custom": "✓" }
      }
    },
    "publishing": {
      "heading": "Publishing and timing — what to expect",
      "intro": "The Apple and Google stores keep their own calendars and their own requirements. I speak about them plainly and plan them with you from day one, so publishing runs alongside the build and your launch lands when we agree it will.",
      "points": {
        "twoTracks": {
          "title": "Two tracks from day one",
          "body": "From the start I run two things in parallel: building the app and setting up your store accounts. Some Apple and Google requirements move on the stores' own calendar, which runs longer than the coding itself, so they begin on day one, alongside the build."
        },
        "duns": {
          "title": "D-U-N-S number (for businesses)",
          "body": "A business account in the stores needs a D-U-N-S number, a free company identifier. Apple usually grants it within a few days, and Google can take up to 30. When you publish as a business, I start with this number so it arrives in time."
        },
        "googleTest": {
          "title": "Google Play closed testing",
          "body": "A new private Google Play account goes through closed testing: at least 12 testers over 14 days before the app can go on sale. Business accounts have this path open right away, so we settle your account type with you on day one."
        },
        "review": {
          "title": "Review time",
          "body": "At the end, the store looks over every app too. Apple approves more than 90% of submissions in under a day, and Google usually replies within 7 days."
        }
      }
    },
    "ownership": {
      "heading": "It's all yours",
      "body": "I set up the app's code, the cloud project, and your store accounts in your name and assign them to you. You pay once for a finished product, and the app stays yours to own.",
      "costsHeading": "Running costs on your side",
      "costs": {
        "apple": { "label": "Apple Developer", "value": "$99 a year" },
        "google": { "label": "Google Play", "value": "$25 one-time" },
        "backend": { "label": "Cloud backend", "value": "about $0 until you have real traffic" }
      },
      "limitsHeading": "What we settle separately",
      "limits": {
        "graphics": {
          "lead": "Artwork, your logo, and the app icon are a separate craft.",
          "body": "I'll point you to where to get them: AI, stock libraries, or a designer I recommend. You cover this cost yourself."
        },
        "maintenance": {
          "lead": "Care beyond the 30 days of support is a separate arrangement.",
          "body": "Updates for new system versions and store requirements, plus any further features, I quote by scope, whenever you need them."
        },
        "scope": {
          "lead": "Payments, multiple locations, and integrations I quote individually.",
          "body": "These are the larger builds from the \"Bigger project\" package, made to fit your requirements. What they cost depends on the scope."
        }
      }
    },
    "faq": {
      "heading": "Common questions",
      "items": {
        "duration": {
          "question": "How long does it take to build an app?",
          "answer": "Start usually runs 5–7 weeks to launch, Full 8–11. That time already covers the store formalities. I'll give you a firm date for your project on our first call."
        },
        "accounts": {
          "question": "Do I need Apple and Google accounts?",
          "answer": "We set them up together in your name, and I publish your finished app on those accounts, so you have full control of them from day one. I handle all the paperwork and walk you through each step."
        },
        "graphics": {
          "question": "Do I need a finished logo and artwork?",
          "answer": "You provide the artwork, logo, and icon, since that's a separate craft a designer handles. You have three routes here: an AI design, paid stock artwork, or a commission from a designer I recommend. You pay for each one directly, and I'll help you pick the one that fits your budget."
        },
        "subscription": {
          "question": "Am I paying a subscription?",
          "answer": "You pay for the app once and it's yours to own. The only ongoing costs are the platform fees, which I describe below."
        },
        "platformCosts": {
          "question": "Who pays Apple and Google?",
          "answer": "These fees go straight to the platforms from your account: Apple $99 a year, Google $25 one-time. The cloud backend costs about $0 until you have real traffic, then it grows along with your number of users. That way the accounts and the app stay entirely yours."
        },
        "afterSupport": {
          "question": "What happens after the 30 days of support?",
          "answer": "After 30 days we settle longer care separately, from small fixes, through system and store updates, to new features. We match the scope to what you genuinely need."
        }
      }
    },
    "quote": {
      "heading": "Tell me what you need.",
      "intro": "A few sentences about your business and how you picture an app like this are enough. I'll reach out to set up a short phone call or an online meeting, get to know your idea, and settle the best scope together. You'll have your quote in good time, once we've talked.",
      "messagePlaceholder": "a few words about your business and what you want from the app"
    }
  }
}
```

## Voice-Gap-Test report (EN)

Scored per section; all sections all-MATCHED. Evidence cited from the EN above.

| Section | Affirmative (zero-negation) | Substance floor | EN ban-list clean | Register / native | AI-transparency / facts |
|---|---|---|---|---|---|
| meta | "yours to own", "a price you can afford" | full claim stack in title+desc | no seamless/tailored | active "I build" | "An expert who works with AI" |
| hero | "published and entirely yours" | subheading = 3 concrete sentences | clean; contractions "It's" | plain 2nd person | "I build it myself with the help of AI… accountable" |
| audience | "a realistic step… today", "fits a small business budget" | body1–3 each 3–4 sentences | clean | active "I do it myself… I check it in person" | "the same careful work, brought to a finish faster" |
| examples | "Think of these as starting points to react to" | 3 sentences per card | clean | "Your customer opens the app, browses…" | n/a (no AI claim) |
| guide | "you have a real say in what gets built" | 5 steps × ~4 sentences | ≤1 em-dash; "under the hood" idiom | contractions throughout | processNote = expertise-with-a-tool + "→" |
| includes | "always included", "off your plate" | intro 3 sentences; items concrete | "technical backbone" not "robust" | dev jargon translated | ownership affirmed |
| pricing | "go straight to those providers" | intros carry substance | "custom-built" (sanctioned) | "You'll find the details below" | all prices verbatim (12 900 / 9 900 / 24 900 / 19 900 / ~30 000 zł net) |
| comparison | "Full starts with them… goes further" | intro 3 sentences | clean | plain labels | ✓ / — carried exactly |
| publishing | "plan them with you from day one" | each point 2–3 sentences | ≤1 em-dash | "what to expect" | D-U-N-S, 12 testers/14 days, 90%, 7 days, up to 30 verbatim |
| ownership | "the app stays yours to own", "entirely yours" | body + limits concrete | zero em-dash | active "I set up… assign to you" | $99 a year, $25 one-time, ~$0 verbatim; **no migration/lock-in angle** |
| faq | "it's yours to own", "full control from day one" | every answer 2–3 sentences | clean | contractions "I'll", "we've" | platform fees verbatim |
| quote | "You'll have your quote in good time" | intro 3 sentences | clean; "Let's talk"-warm | "Tell me what you need." | n/a |

**Drift diagnosis:** The main risk on this page was the honest-price mechanism
(*fewer hours → lower price*) sliding into negation-contrast or "cheap because
less"; it is carried instead as an affirmative comparative gain ("the same careful
work, brought to a finish faster… the price fits a small business budget"). The
ownership section held the hard line: it affirms full ownership and stops, with no
portability / leave / lock-in framing anywhere. CTAs use native EN verbs (Get a
quote / Quote Start / Quote Full / See how I work / Let's talk) rather than calques.

## Open Questions (resolved judgment calls)

1. **"Większy projekt" package name** → chose **"Bigger project"** (+ `colCustom` = "Bigger")
   to match the existing web-offer `offer.pricing.custom.name` EN convention, not the
   agent's interim "Larger project". SV will use "Större projekt" at landing.
2. **`rowLabels.timeline` "Time to publishing"** — kept literal to PL "Czas do
   publikacji"; "Time to go live" reads slightly warmer if you prefer a swap.
3. **`comparison.items.multiLocation.label` "staff selection"** — compact rendering of
   "wybór pracownika" to fit the table cell; "choose your staff member" is clearer but
   longer.

## Status

This is a **reviewable artifact**, not `messages/*.json`. On your approval, the
landing step will: (1) add this EN tree to `messages/en.json`, (2) produce the SV
parity translation into `messages/sv.json` (same keys), (3) verify build + i18n
parity, (4) commit on `feature/mobile-apps-offer` and merge to `develop`.
