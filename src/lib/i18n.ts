export type Locale =
  | "en"
  | "sv"
  | "si"
  | "da"
  | "fi"
  | "no"
  | "de"
  | "fr"
  | "pl";

export const locales: Locale[] = [
  "en",
  "sv",
  "si",
  "da",
  "fi",
  "no",
  "de",
  "fr",
  "pl",
];

export const localeFlagIso: Record<Locale, string> = {
  en: "gb",
  sv: "se",
  si: "lk",
  da: "dk",
  fi: "fi",
  no: "no",
  de: "de",
  fr: "fr",
  pl: "pl",
};

export const localeFlag: Record<Locale, string> = {
  en: "🇬🇧",
  sv: "🇸🇪",
  si: "🇱🇰",
  da: "🇩🇰",
  fi: "🇫🇮",
  no: "🇳🇴",
  de: "🇩🇪",
  fr: "🇫🇷",
  pl: "🇵🇱",
};

export function isLocale(v: string): v is Locale {
  return locales.includes(v as Locale);
}

/* Visningsnamn i språkknappen */
export const localeLabel: Record<Locale, string> = {
  en: "English",
  sv: "Svenska",
  si: "සිංහල",
  da: "Dansk",
  fi: "Suomi",
  no: "Norsk",
  de: "Deutsch",
  fr: "Français",
  pl: "Polski",
};

/* Basöversättningar – övriga språk fallbackar till engelska tills du fyller på */
const base = {
  nav: {
    journeys: "Journeys",
    about: "About",
    proposal: "Request a proposal",
  },
  home: {
    metaLine: "Sri Lanka · Birdwatching · Nature Travel",
    title: "Beyond the Beak",
    intro:
      "Journeys for the curious and kind. Small-group birdwatching and nature experiences in Sri Lanka — designed with presence, patience and respect.",
    cta1: "Request a proposal",
    cta2: "Explore journeys",
    cards: [
      { title: "Small groups", sub: "Calm pace" },
      { title: "Local insight", sub: "Deep knowledge" },
      { title: "Respect first", sub: "Ethical travel" },
    ],
    imageHint:
      "Replace this with a hero photo (bird / forest / misty landscape).",
  },
  about: {
    title: "About",
    p1:
      "Beyond the Beak is a boutique birdwatching and nature travel experience in Sri Lanka — built around presence, local knowledge, and respectful encounters away from mass tourism.",
    p2:
      "Small groups. Thoughtful pace. A journey shaped around your curiosity — and kindness.",
  },
  journeys: {
    title: "Journeys",
    intro:
      "A small selection of journeys — every trip is tailored. Request a proposal to receive an itinerary and quote.",
    request: "Request proposal",
    items: [
      { title: "7-day Birding Essentials", note: "Best highlights in a calm pace." },
      { title: "10-day Deep Nature Journey", note: "More habitats, more time." },
      { title: "Custom Photo Journey", note: "Designed around light and patience." },
    ],
  },
  contact: {
    title: "Request a proposal",
    intro:
      "Tell us your preferred dates, interests and pace — we’ll reply with a tailored itinerary and quote.",
    name: "Your name",
    email: "Email",
    message:
      "Dates, group size, interests (birds / nature / photo), and preferred pace…",
    send: "Send request",
    sending: "Sending...",
    sent: "Thank you — we’ll get back to you soon.",
    error: "Something went wrong. Please try again.",
  },
  footer: "Sri Lanka",
};

export const dict: Record<Locale, typeof base> = {
  en: base,
  sv: {
    ...base,
    nav: {
      journeys: "Resor",
      about: "Om",
      proposal: "Be om offert",
    },
    home: {
      ...base.home,
      metaLine: "Sri Lanka · Fågelskådning · Naturresor",
      intro:
        "Resor för den nyfikna och vänliga. Små grupper och naturupplevelser på Sri Lanka — skapade med närvaro och respekt.",
      cta1: "Be om offert",
      cta2: "Se resor",
      cards: [
        { title: "Små grupper", sub: "Lugnt tempo" },
        { title: "Lokal kunskap", sub: "Djup insikt" },
        { title: "Respekt först", sub: "Etiskt resande" },
      ],
    },
    about: {
      title: "Om",
      p1:
        "Beyond the Beak är en liten och personlig natur- och fågelskådningsresa på Sri Lanka — med närvaro och lokalkännedom.",
      p2:
        "Små grupper. Eftertänksamt tempo. En resa formad av din nyfikenhet.",
    },
    journeys: {
      ...base.journeys,
      title: "Resor",
      intro:
        "Ett urval av resor — varje resa skräddarsys. Skicka en förfrågan för upplägg och pris.",
      request: "Be om offert",
    },
    contact: {
  ...base.contact,
  title: "Be om offert",
  intro:
    "Berätta datum, intressen och tempo — så återkommer vi med upplägg och pris.",
  name: "Ditt namn",
  email: "E-post",
  message:
    "Datum, gruppstorlek, intressen (fåglar / natur / foto) och önskat tempo…",
  send: "Skicka förfrågan",
  sending: "Skickar...",
  sent: "Tack! Vi återkommer snart.",
},
  },
  si: base,
  da: base,
  fi: base,
  no: base,
  de: base,
  fr: base,
  pl: base,
};

export function t(locale: Locale) {
  return dict[locale] ?? dict.en;
}