/* ============================================================
   i18n dictionary.
   To add a language: add its code to `locales`, add a block to
   `dictionary`, and it appears in the switcher automatically.
   ============================================================ */

import type { LangId } from "./team";

export const locales = ["en", "ru", "uz", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
  ar: "AR",
};

/** The one locale that reads right-to-left. Centralised so a future RTL
    language doesn't need a second `=== "ar"` check hiding somewhere. */
export const rtlLocales: readonly Locale[] = ["ar"];
export function dirFor(locale: Locale): "rtl" | "ltr" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

type Service = { title: string; body: string; tag: string };
type Stat = { value: string; label: string };
type Step = { title: string; body: string };
type SubService = { title: string; body: string };
type ServiceBlock = { id: string; nav: string; title: string; intro: string; items: SubService[] };
type RenoStep = { n: string; title: string; lead: string; body: string };
type NamedCard = { title: string; body: string };
type ListGroup = { title: string; items: string[] };
type FaqItem = { q: string; a: string };

export type Dict = {
  nav: { realEstate: string; services: string; renovation: string; it: string; team: string; partners: string; why: string; contact: string; cta: string; news: string };
  hero: {
    eyebrow: string;
    titleA: string;
    titleEm: string;
    titleB: string;
    sub: string;
    cta: string;
    ctaAlt: string;
    scroll: string;
  };
  marqueeIntro: string;
  whatsappFab: { aria: string; prefill: string };
  trust: {
    eyebrow: string;
    lead: { value: string; label: string; note: string };
    items: Stat[];
  };
  services: { eyebrow: string; title: string; items: Service[] };
  stats: { eyebrow: string; title: string; items: Stat[] };
  why: {
    about: { eyebrow: string; title: string; body: string };
    eyebrow: string;
    cards: Step[];
  };
  partners: { eyebrow: string; title: string };
  testimonials: {
    eyebrow: string; title: string; lead: string; allLabel: string; ratingSuffix: string;
    writeReview: string;
    form: {
      title: string;
      name: string;
      city: string;
      country: string;
      language: string;
      service: string;
      rating: string;
      quote: string;
      quotePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
      note: string;
      close: string;
    };
  };
  lead: {
    eyebrow: string;
    title: string;
    sub: string;
    name: string;
    phone: string;
    email: string;
    emailHint: string;
    contactPref: string;
    contactCall: string;
    contactWhatsApp: string;
    contactTelegram: string;
    contactEmail: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    consent: string;
  };
  footer: {
    blurb: string;
    licenceNote: string;
    address: string;
    addressValue: string;
    offices: string;
    contact: string;
    follow: string;
    rights: string;
    nav: string;
  };
  legal: {
    privacyLabel: string;
    termsLabel: string;
    page: { eyebrow: string; updated: string; languageNote: string };
    privacy: { title: string };
    terms: { title: string };
  };
  newsPage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    eyebrow: string;
    title: string;
    lead: string;
    empty: string;
    readMore: string;
    back: string;
  };
  servicesPage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    eyebrow: string;
    title: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: Stat[];
    blocks: ServiceBlock[];
    process: { title: string; body: string; steps: Step[] };
    trust: { title: string; items: string[] };
    visaNote: string;
    legalNote: string;
    askLabel: string;
    askWhatsApp: string;
    also: {
      eyebrow: string;
      title: string;
      renovation: { title: string; body: string; cta: string };
      it: { title: string; body: string; cta: string };
    };
    cta: { title: string; body: string };
  };
  calculatorsPage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    eyebrow: string;
    title: string;
    sub: string;
    disclaimer: string;
    cards: { slug: string; title: string; body: string; cta: string }[];
    rentalYield: {
      metaTitle: string; metaDescription: string; nav: string;
      eyebrow: string; title: string; sub: string;
      priceLabel: string; rentLabel: string; serviceChargeLabel: string; vacancyLabel: string;
      grossLabel: string; netLabel: string; resultNote: string;
    };
    paymentPlan: {
      metaTitle: string; metaDescription: string; nav: string;
      eyebrow: string; title: string; sub: string;
      modeOffplan: string; modeMortgage: string;
      priceLabel: string;
      stageDown: string; stageDuring: string; stageHandover: string; stagePost: string; postMonthsLabel: string;
      stageSumError: string; offplanNote: string; totalLabel: string; perMonthLabel: string;
      rateLabel: string; downPaymentLabel: string; termLabel: string; monthlyLabel: string; totalInterestLabel: string; mortgageNote: string;
    };
    relocationCost: {
      metaTitle: string; metaDescription: string; nav: string;
      eyebrow: string; title: string; sub: string;
      buyingLabel: string; buyingYes: string; buyingNo: string; priceLabel: string;
      lineDldTransfer: string; lineDldAdmin: string; totalLabel: string; notBuyingNote: string;
      goldenVisaTitle: string; goldenVisaNote: string; goldenVisaCta: string;
    };
    leadCapture: {
      title: string; body: string; name: string; phone: string; email: string;
      submit: string; sending: string; success: string; error: string; consent: string; whatsapp: string;
    };
  };
  itPage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    hero: { eyebrow: string; title: string; sub: string; ctaPrimary: string; ctaSecondary: string };
    proof: { eyebrow: string; title: string; items: { title: string; body: string; cta: string }[] };
    groupsIntro: { eyebrow: string; title: string; lead: string; viewLabel: string };
    process: { eyebrow: string; title: string; steps: Step[] };
    cta: { title: string; body: string; ctaPrimary: string; ctaSecondary: string };
    group: { backLabel: string; servicesLabel: string; servicesIntro: string; askLabel: string; askButton: string; otherLabel: string; ctaTitle: string; ctaBody: string };
  };
  renovationPage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    hero: { eyebrow: string; l1: string; l2: string; l3: string; sub: string; cta: string; ctaAlt: string };
    scope: { title: string; lead: string; groups: ListGroup[]; closing: string };
    process: { eyebrow: string; title: string; steps: RenoStep[] };
    design: { title: string; lead: string; body: string; stylesLabel: string; styleAsk: string; styles: { slug: string; label: string }[] };
    vision: {
      eyebrow: string;
      title: string;
      lead: string;
      disclaimer: string;
      items: { slug: string; label: string }[];
    };
    beforeAfter: { title: string; lead: string; before: string; after: string; hint: string; empty: string; emptyBody: string };
    fullService: { title: string; lead: string; cards: NamedCard[] };
    furniture: { title: string; lead: string; groups: ListGroup[]; cta: string };
    investor: { title: string; lead: string; items: string[]; cta: string };
    portfolio: { title: string; lead: string; filters: string[]; empty: string };
    quote: {
      title: string;
      lead: string;
      name: string;
      phone: string;
      email: string;
      location: string;
      propertyType: string;
      propertyTypes: string[];
      size: string;
      condition: string;
      conditions: string[];
      style: string;
      budget: string;
      budgets: string[];
      message: string;
      messagePlaceholder: string;
      photosNote: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      consent: string;
    };
    why: { title: string; cards: NamedCard[] };
    faq: { title: string; lead: string; items: FaqItem[] };
    finalCta: { title: string; lead: string; cta: string; ctaAlt: string };
  };
  propertyTypes: Record<string, string>;
  realEstatePage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    hero: { eyebrow: string; title: string; sub: string; cta: string; ctaAlt: string };
    stats: Stat[];
    types: { title: string; lead: string; groups: { title: string; items: NamedCard[] }[] };
    paths: {
      title: string;
      lead: string;
      offplan: { title: string; body: string; cta: string };
      ready: { title: string; body: string; cta: string };
    };
    districts: {
      title: string;
      lead: string;
      filters: { all: string; established: string; prestige: string; emerging: string };
      typesLabel: string;
      note: string;
      ask: string;
    };
    why: { title: string; cards: NamedCard[] };
    cta: { title: string; body: string };
    offplan: {
      metaTitle: string;
      metaDescription: string;
      current: string;
      hero: { eyebrow: string; title: string; sub: string; cta: string };
      what: { title: string; lead: string; points: NamedCard[] };
      payment: { title: string; lead: string; plans: NamedCard[]; note: string };
      process: { title: string; lead: string; steps: RenoStep[] };
      checks: { title: string; items: string[] };
      cta: { title: string; body: string };
    };
    ready: {
      metaTitle: string;
      metaDescription: string;
      current: string;
      hero: { eyebrow: string; title: string; sub: string; cta: string };
      what: { title: string; lead: string; points: NamedCard[] };
      process: { title: string; lead: string; steps: RenoStep[] };
      checks: { title: string; items: string[] };
      cta: { title: string; body: string };
    };
  };
  teamPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    titleA: string;
    titleEm: string;
    lead: string;
    bandLabel: string;
    hint: string;
    reset: string;
    peopleWord: string;
    /** `{name}` is replaced with the colleague the visitor picked. */
    waIntro: string;
    langs: Record<LangId, string>;
    langsShort: { af: string };
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
    trustedBroker: string;
  };
};

export const dictionary: Record<Locale, Dict> = {
  en: {
    nav: { realEstate: "Real Estate", services: "Services", renovation: "Renovation", it: "Technology", team: "Team", partners: "Developers", why: "Why Us", contact: "Contact", cta: "Get a consultation", news: "News" },
    teamPage: {
      metaTitle: "Our team in Dubai",
      metaDescription:
        "The BIZBUYUK Real Estate team in Dubai. Seven brokers and directors speaking Russian, English, Uzbek, Kazakh, Tajik, Azerbaijani, Arabic and Chinese. Find the colleague who speaks your language.",
      eyebrow: "Team",
      titleA: "You will be heard",
      titleEm: "in your own language",
      lead: "The BIZBUYUK office in Dubai. Pick the language you are comfortable in and see who will be looking after you.",
      bandLabel: "We speak",
      hint: "Pick a language",
      reset: "Reset",
      peopleWord: "on the team",
      waIntro: "Hello! I am on the BIZBUYUK site and would like to reach {name}.",
      langs: {
        ru: "Russian", en: "English", uz: "Uzbek", kz: "Kazakh", tj: "Tajik",
        az: "Azerbaijani", ar: "Arabic", zh: "Chinese", af: "African languages",
      },
      langsShort: { af: "Africa" },
      ctaTitle: "Not sure who to ask for?",
      ctaBody: "Write to us and we will put you with the person who speaks your language and covers the part of the market you need.",
      ctaButton: "Get a consultation",
      trustedBroker: "Trusted broker",
    },
    hero: {
      eyebrow: "UAE · Real Estate · Est. 2020",
      titleA: "Your trusted partner in the",
      titleEm: "UAE property",
      titleB: "market.",
      sub: "Off-plan launches from the UAE's leading developers, protected investments, and a seamless path to living in the UAE — guided end to end.",
      cta: "Get a consultation",
      ctaAlt: "Explore services",
      scroll: "Scroll",
    },
    marqueeIntro: "Trusted by the developers building the UAE",
    whatsappFab: { aria: "Message us on WhatsApp", prefill: "Hello BIZBUYUK! I have a question." },
    trust: {
      eyebrow: "By the numbers",
      lead: {
        value: "200,000+",
        label: "clients served",
        note: "Consultations and completed transactions since 2020.",
      },
      items: [
        { value: "50,000+", label: "Transactions closed" },
        { value: "AED 10B+", label: "Portfolio volume" },
        { value: "7", label: "Emirates covered" },
        { value: "50+", label: "Specialists on the team" },
        { value: "10", label: "Languages spoken" },
      ],
    },
    services: {
      eyebrow: "What we do",
      title: "Everything we handle in the UAE",
      items: [
        {
          tag: "01",
          title: "Real Estate",
          body: "Off-plan launches and ready homes from the UAE's largest developers. Search, negotiation and acquisition, at 0% commission to the buyer.",
        },
        {
          tag: "02",
          title: "Investment Protection",
          body: "Due diligence on the developer and the project, escrow and contract checks, and registration with the Dubai Land Department.",
        },
        {
          tag: "03",
          title: "Tourism & Relocation",
          body: "Visiting, residing or moving to the UAE: residence visas, Emirates ID, banking, schools and settling in.",
        },
        {
          tag: "04",
          title: "Property Management",
          body: "After the purchase: finding tenants, collecting rent, maintenance and resale when the time is right.",
        },
        {
          tag: "05",
          title: "Turnkey Renovation",
          body: "From an empty space to a furnished home: design, 3D renders, full renovation, furniture and final installation.",
        },
        {
          tag: "06",
          title: "Technology",
          body: "BIZBUYUK GROUP's technology arm: web and mobile products, business systems and AI, for clients anywhere.",
        },
      ],
    },
    stats: {
      eyebrow: "Why the UAE",
      title: "A market built for investors",
      items: [
        { value: "11%", label: "Avg. annual price growth" },
        { value: "12%", label: "Average rental yields" },
        { value: "0%", label: "Property & income tax" },
      ],
    },
    why: {
      about: {
        eyebrow: "About us",
        title: "Welcome to BIZBUYUK Real Estate",
        body: "Established in 2020, our mission is to deliver world-class real estate brokerage services with the highest standards of professionalism, ethics and quality. Founded on deep mutual trust and dedication, we aim to become the region's most valuable brokerage.",
      },
      eyebrow: "Why choose us",
      cards: [
        { title: "Market experts", body: "Hardworking analysts who watch market trends and know the neighbourhoods — identifying the best opportunities for our clients." },
        { title: "Prime access", body: "Access to properties in prime locations directly from sellers, plus a wide selection of off-plan solutions for every budget." },
        { title: "Trouble-free acquisition", body: "An excellent return on investment through a seamless, transparent and trouble-free acquisition process." },
        { title: "Comprehensive services", body: "An ambitious, creative agency handling the buying, selling and leasing of residential and commercial property across the UAE's top focus areas." },
      ],
    },
    partners: { eyebrow: "Our developers", title: "We work with all developments across the UAE" },
    testimonials: {
      eyebrow: "In their own words",
      title: "What clients tell us",
      lead: "Unedited, in the language they were written in.",
      allLabel: "All",
      ratingSuffix: "/5",
      writeReview: "Leave a review",
      form: {
        title: "Leave a review",
        name: "Your name",
        city: "Your city",
        country: "Your country",
        language: "Language you're writing in",
        service: "Which service was this about?",
        rating: "Rating",
        quote: "Your review",
        quotePlaceholder: "What was the one thing that went right — or wrong?",
        submit: "Submit review",
        submitting: "Sending…",
        success: "Thank you. Your review is checked by our team before it goes live.",
        error: "Something went wrong. Please try again.",
        note: "Reviews are checked before they appear on the site.",
        close: "Close",
      },
    },
    lead: {
      eyebrow: "Free consultation",
      title: "Leave a request — we'll get in touch",
      sub: "Tell us how to reach you and a senior advisor will be in touch within one business day.",
      name: "Your name",
      phone: "Phone number",
      email: "Email",
      emailHint: 'Just the name is enough - "@gmail.com" is added for you.',
      contactPref: "Preferred way to reach you",
      contactCall: "Call",
      contactWhatsApp: "WhatsApp",
      contactTelegram: "Telegram",
      contactEmail: "Email",
      submit: "Send request",
      sending: "Sending…",
      success: "Thank you — we'll be in touch shortly.",
      error: "Something went wrong. Please try again or call us directly.",
      consent: "By submitting you agree to be contacted about your enquiry.",
    },
    footer: {
      blurb: "An ambitious, creative UAE real estate agency — buying, selling and leasing residential and commercial property across the Emirates.",
      licenceNote: "Licensed real estate brokerage. Every broker on our team holds an individual RERA licence — ask your broker for theirs.",
      address: "Address",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, United Arab Emirates.",
      offices: "Offices",
      contact: "Contact",
      follow: "Follow",
      rights: "All rights reserved.",
      nav: "Navigate",
    },
    legal: {
      privacyLabel: "Privacy Policy",
      termsLabel: "Terms of Use",
      page: {
        eyebrow: "Legal",
        updated: "Last updated: September 2026",
        languageNote: "This page is provided in English, which is the governing language of this document. Write to us in Russian or Uzbek and we will gladly answer any question about it in your language.",
      },
      privacy: { title: "Privacy Policy" },
      terms: { title: "Terms of Use" },
    },
    newsPage: {
      metaTitle: "News",
      metaDescription: "Updates from BIZBUYUK Real Estate and BIZBUYUK GROUP.",
      home: "Home",
      current: "News",
      eyebrow: "Updates",
      title: "News from BIZBUYUK",
      lead: "What we're working on, shipping and learning.",
      empty: "No news yet — check back soon.",
      readMore: "Read more",
      back: "All news",
    },
    servicesPage: {
      metaTitle: "Services",
      metaDescription:
        "From choosing a property to living in the UAE: real estate, investment protection, relocation and property management, guided end to end.",
      home: "Home",
      current: "Services",
      eyebrow: "What we do",
      title: "Our services",
      sub: "From choosing a property to living in the UAE, we stay with you at every step.",
      ctaPrimary: "Get a consultation",
      ctaSecondary: "Ask on WhatsApp",
      stats: [
        { value: "7", label: "Emirates covered" },
        { value: "5", label: "Service directions" },
        { value: "23", label: "Services inside" },
        { value: "4", label: "Languages: EN / RU / UZ / AR" },
      ],
      blocks: [
        {
          id: "real-estate",
          nav: "Real Estate",
          title: "Search and purchase",
          intro:
            "We select properties from the UAE's leading developers. 0% commission to the buyer: our fee is paid by the developer, not by you.",
          items: [
            { title: "Off-plan from the developer", body: "Direct developer contracts: launch pricing, payment plans and post-handover terms with no agent mark-up." },
            { title: "Ready property", body: "The secondary market: view the unit, let it and start earning right after the deal closes." },
            { title: "Investment analysis", body: "ROI and rental yield calculated with service charge, management fees and vacancy factored in." },
            { title: "A shortlist of 2-3 units", body: "Not the whole catalogue. A short list matched to your budget, goal and holding horizon." },
            { title: "Booking and SPA", body: "Unit reservation, a walk-through of the contract terms and support through signing." },
          ],
        },
        {
          id: "protection",
          nav: "Investment Protection",
          title: "Investment protection",
          intro:
            "Legal protection for your capital at every stage of the deal. We check the things that usually get checked too late.",
          items: [
            { title: "Developer due diligence", body: "Delivery track record, financial standing and the project's status in the RERA registers." },
            { title: "Escrow account and payment plan", body: "We verify that funds go to the project's escrow account and that the schedule matches the contract." },
            { title: "SPA review before signing", body: "Handover dates, penalties, termination terms and the handover procedure." },
            { title: "Oqood and Title Deed", body: "Registration with the Dubai Land Department and control over the paperwork timeline." },
            { title: "Disputes", body: "Support if the developer delays handover or breaches the terms of the contract." },
          ],
        },
        {
          id: "relocation",
          nav: "Tourism & Relocation",
          title: "Tourism and relocation",
          intro: "From a first visit to a full life in the UAE.",
          items: [
            { title: "Introductory tour", body: "A visit programme: property viewings, developer meetings, transfers and accommodation." },
            { title: "Residence visa", body: "Visa processing, including the Golden Visa when the investment meets the current threshold." },
            { title: "Bank account and Emirates ID", body: "Opening a UAE bank account and obtaining your resident ID." },
            { title: "Schools and neighbourhood", body: "Choosing a school or nursery and the right area for your family." },
            { title: "Settling in", body: "Health insurance, utilities, transport and mobile connectivity." },
          ],
        },
        {
          id: "management",
          nav: "Property Management",
          title: "Property management",
          intro:
            "The purchase does not end at signing. After the deal the property has to be prepared, let and looked after.",
          items: [
            { title: "Finding a tenant", body: "Long and short-term rentals, tenant screening, contract and Ejari registration." },
            { title: "Managing the property", body: "Working with the building management, maintaining the unit and collecting rent." },
            { title: "Renovation and furnishing", body: "Getting the unit rental-ready: finishes, furniture, appliances and listing photography." },
            { title: "Resale", body: "Resale and assignment: help exiting the investment when it makes sense." },
          ],
        },
        {
          id: "legal",
          nav: "Legal & Consulting",
          title: "Legal and consulting support",
          intro:
            "A legal and consulting arm that reaches beyond the UAE: company formation, visa processing and a network of lawyers across BRICS countries, run by the same team as your property deal.",
          items: [
            { title: "International legal network", body: "Partner lawyers across BRICS countries, coordinated through one point of contact, for matters that reach beyond the UAE." },
            { title: "Company formation", body: "Mainland, free zone or offshore: we structure the entity and handle licensing so you end up trading, not just registered." },
            { title: "Visa processing", body: "A clear number for the visa itself: 7 working days once your documents are complete. Related matters are scoped in a consultation, not promised in advance." },
            { title: "Commission and property management", body: "Selling, renting out, or handing us the property to manage: pricing is quoted for your property and your case, not published as a flat rate." },
          ],
        },
      ],
      process: {
        title: "How it works",
        body: "Five steps from the first conversation to registered ownership. Usually two weeks or more.",
        steps: [
          { title: "Brief", body: "Budget, goal, horizon and a payment method that suits you." },
          { title: "Shortlist", body: "Two or three units, each with its own yield calculation." },
          { title: "Viewing", body: "A video tour of the unit or a visit to the UAE." },
          { title: "Booking", body: "Unit reservation and an SPA review before you sign." },
          { title: "Deal", body: "Signing, payment and registration with the Dubai Land Department." },
        ],
      },
      trust: {
        title: "What this means in practice",
        items: [
          "We operate as a registered brokerage in the UAE",
          "Every deal is registered with the Dubai Land Department",
          "Buyer funds go to the project's escrow account",
          "A lawyer reviews the contract before you sign, not after",
        ],
      },
      visaNote:
        "Residence visa rules and the Golden Visa investment threshold change from time to time. We confirm the current requirements on the date of your deal.",
      legalNote:
        "Broker and partner terms are also agreed case by case. Tell us who you are working with and we confirm the best terms for the arrangement.",
      askLabel: "Question about this section?",
      askWhatsApp: "Ask on WhatsApp",
      also: {
        eyebrow: "Also part of what we do",
        title: "Two more directions",
        renovation: {
          title: "Turnkey Renovation",
          body: "Already bought, or buying elsewhere? We take a space from empty to furnished — design, renders, the full build, furniture and handover.",
          cta: "See renovation",
        },
        it: {
          title: "Technology",
          body: "BIZBUYUK GROUP's technology arm — web and mobile products, business systems and AI, for clients anywhere in the world.",
          cta: "See technology services",
        },
      },
      cta: {
        title: "Not sure which service you need?",
        body: "Describe your situation in two sentences. We will tell you where to start and what you need at each step.",
      },
    },
    calculatorsPage: {
      metaTitle: "Calculators",
      metaDescription: "Estimate rental yield, a payment plan or mortgage, and the full cost of relocating to the UAE — then get the exact numbers from a BIZBUYUK consultant.",
      home: "Home",
      current: "Calculators",
      eyebrow: "Plan the numbers",
      title: "Calculators",
      sub: "Quick estimates for the three questions every buyer and mover asks first. For a number you can commit to, a consultant confirms it against your exact case.",
      disclaimer: "Estimates only, for planning purposes. Rates, fees and government charges change — we confirm the current figures for your case in a consultation.",
      cards: [
        { slug: "rental-yield", title: "Rental yield", body: "What a property could return after service charge and vacancy.", cta: "Calculate yield" },
        { slug: "payment-plan", title: "Payment plan & mortgage", body: "An off-plan payment schedule, or a mortgage monthly payment.", cta: "Calculate payments" },
        { slug: "relocation-cost", title: "Relocation cost", body: "Visa, Emirates ID, insurance and, if you are buying, the transaction costs.", cta: "Estimate the cost" },
      ],
      rentalYield: {
        metaTitle: "Rental Yield Calculator",
        metaDescription: "Estimate gross and net rental yield on a UAE property, factoring in service charge and vacancy.",
        nav: "Rental Yield",
        eyebrow: "Rental yield calculator",
        title: "What could this property return?",
        sub: "Enter the purchase price and expected rent. We factor in service charge and a vacancy allowance to show a realistic net figure, not just the headline number.",
        priceLabel: "Purchase price, AED",
        rentLabel: "Expected annual rent, AED",
        serviceChargeLabel: "Annual service charge, AED",
        vacancyLabel: "Vacancy allowance, %",
        grossLabel: "Gross yield",
        netLabel: "Net yield",
        resultNote: "Net yield assumes the vacancy allowance and service charge are the only deductions. It does not include financing costs, which the payment plan and mortgage calculator covers.",
      },
      paymentPlan: {
        metaTitle: "Payment Plan & Mortgage Calculator",
        metaDescription: "Model an off-plan payment schedule or a standard UAE mortgage, with resident and non-resident presets.",
        nav: "Payment Plan",
        eyebrow: "Payment plan & mortgage calculator",
        title: "How would you pay for it?",
        sub: "Two ways to pay: a developer's off-plan schedule, or a bank mortgage. Switch between them to compare.",
        modeOffplan: "Off-plan schedule",
        modeMortgage: "Mortgage",
        priceLabel: "Property price, AED",
        stageDown: "Down payment, %",
        stageDuring: "During construction, %",
        stageHandover: "On handover, %",
        stagePost: "Post-handover, %",
        postMonthsLabel: "Post-handover period, months",
        stageSumError: "The four stages should add up to 100%.",
        offplanNote: "This is an example schedule, not a specific developer's terms. Plans differ by developer and by project, and change between launch phases — we compare the actual plans open at the time you are buying.",
        totalLabel: "Total",
        perMonthLabel: "per month",
        rateLabel: "Interest rate, % per year",
        downPaymentLabel: "Down payment, %",
        termLabel: "Term, years",
        monthlyLabel: "Monthly payment",
        totalInterestLabel: "Total interest over the term",
        mortgageNote: "The rate and maximum financing shown are typical starting points, not an offer. A bank confirms your actual rate and eligibility after reviewing your file.",
      },
      relocationCost: {
        metaTitle: "Relocation Cost Calculator",
        metaDescription: "The one-time government cost of a property purchase in the UAE, and how the Golden Visa works.",
        nav: "Relocation Cost",
        eyebrow: "Relocation cost calculator",
        title: "What does buying here actually cost?",
        sub: "The one-time government cost on top of the property price — and how to qualify for the UAE Golden Visa.",
        buyingLabel: "Are you buying a property?",
        buyingYes: "Yes",
        buyingNo: "No",
        priceLabel: "Property price, AED",
        lineDldTransfer: "DLD transfer fee (4%)",
        lineDldAdmin: "DLD admin fee",
        totalLabel: "Estimated total",
        notBuyingNote: "Not buying yet? The numbers below apply as soon as you are — come back once you have a property in mind.",
        goldenVisaTitle: "Golden Visa",
        goldenVisaNote: "A property investment of AED 2,000,000 or more qualifies for the UAE Golden Visa. We handle the full application for you.",
        goldenVisaCta: "Ask about the Golden Visa",
      },
      leadCapture: {
        title: "Get the exact numbers",
        body: "Send us this estimate and a consultant confirms the real figures for your case, usually within one business day.",
        name: "Your name",
        phone: "Phone number",
        email: "Email",
        submit: "Send my numbers",
        sending: "Sending…",
        success: "Received. A consultant will be in touch shortly.",
        error: "Something went wrong. Please try again or message us on WhatsApp.",
        consent: "By submitting you agree to be contacted about your enquiry.",
        whatsapp: "Ask on WhatsApp instead",
      },
    },
    itPage: {
      metaTitle: "Technology Services",
      metaDescription:
        "BIZBUYUK GROUP's technology arm — web and mobile products, business systems, AI, cloud, security and data, for clients anywhere in the world.",
      home: "Home",
      current: "Technology",
      hero: {
        eyebrow: "BIZBUYUK GROUP · Technology",
        title: "The same standard we build our own company on.",
        sub: "Web and mobile products, business systems, AI, cloud, security and data — delivered by the team that built and runs BIZBUYUK's own CRM. One partner, every discipline, for clients anywhere.",
        ctaPrimary: "Talk to the IT team",
        ctaSecondary: "Message on Telegram",
      },
      proof: {
        eyebrow: "Not a slide deck",
        title: "We run what we build",
        items: [
          {
            title: "BIZBUYUK CRM",
            body: "Leads, pipeline, finance, tasks and reporting for BIZBUYUK Real Estate's own brokerage — built in-house, used by the team every day.",
            cta: "Ask for a walkthrough",
          },
          {
            title: "LaWEra CRM",
            body: "A case- and client-management platform built for LaWEra's legal practice — intake, documents and billing in one system.",
            cta: "Ask for a walkthrough",
          },
        ],
      },
      groupsIntro: {
        eyebrow: "What we build",
        title: "Twelve disciplines, one team",
        lead: "Pick where your project starts. Most projects touch more than one of these — that conversation happens once you write in.",
        viewLabel: "View services",
      },
      process: {
        eyebrow: "How it works",
        title: "From a WhatsApp message to a shipped product",
        steps: [
          { title: "Consult", body: "Tell us what you're trying to solve. No form to fill in first — just describe it." },
          { title: "Scope", body: "We come back with what it takes: team, timeline, and how the price is structured." },
          { title: "Build", body: "Work happens in short cycles, with something to look at early and often." },
          { title: "Support", body: "Shipping isn't the end. We stay on for fixes, growth and the next phase." },
        ],
      },
      cta: {
        title: "Have a project in mind?",
        body: "Describe it in a message — English, Russian or Uzbek all work. The IT team replies directly, no ticket queue.",
        ctaPrimary: "WhatsApp the IT team",
        ctaSecondary: "Message on Telegram",
      },
      group: {
        backLabel: "All disciplines",
        servicesLabel: "What's included",
        servicesIntro: "Each of these is a starting point, not a fixed package — tell us which one is closest to what you need and we'll scope the rest together.",
        askLabel: "Ask about",
        askButton: "Discuss this on WhatsApp",
        otherLabel: "Other disciplines",
        ctaTitle: "Ready to scope this out?",
        ctaBody: "Write to the IT team with a couple of lines about the project — team size, rough timeline, what you're trying to solve.",
      },
    },
    renovationPage: {
      metaTitle: "Turnkey Renovation in Dubai",
      metaDescription:
        "BIZBUYUK provides complete turnkey renovation in Dubai: interior design and 3D visualisation, full renovation, custom furniture and final furnishing. One team, one contract, a move-in ready property.",
      home: "Home",
      current: "Turnkey Renovation",
      hero: {
        eyebrow: "Turnkey Renovation",
        l1: "Your property.",
        l2: "Our vision.",
        l3: "Move-in ready.",
        sub: "From an empty space to a fully furnished home. We handle the entire process, from design and renovation to furniture and final installation.",
        cta: "Get a free consultation",
        ctaAlt: "View our projects",
      },
      scope: {
        title: "Everything. From zero to move-in ready.",
        lead: "You do not need to coordinate a dozen contractors. The whole renovation runs under one roof, one schedule and one contract.",
        groups: [
          {
            title: "Design and planning",
            items: ["Interior design", "Architectural planning", "3D visualisation"],
          },
          {
            title: "Construction",
            items: [
              "Full renovation",
              "Electrical works",
              "Plumbing",
              "Flooring",
              "Painting",
              "Ceiling and lighting",
              "Kitchen",
              "Bathrooms",
              "Custom carpentry",
              "Wardrobes",
            ],
          },
          {
            title: "Furnishing and handover",
            items: [
              "Curtains",
              "Furniture",
              "Decorative elements",
              "Appliances",
              "Final installation",
              "Final cleaning",
            ],
          },
        ],
        closing: "You give us the keys. We give you a ready-to-live property.",
      },
      process: {
        eyebrow: "How it works",
        title: "Six stages, one team",
        steps: [
          {
            n: "01",
            title: "Consultation",
            lead: "We understand your property, lifestyle and budget.",
            body: "We visit the property, measure it, go through how you intend to use it and agree what the budget has to cover.",
          },
          {
            n: "02",
            title: "Design",
            lead: "Your space gets a complete design concept.",
            body: "Floor plans, materials, colour palette and furniture layout, developed around your taste and the way the property will be used.",
          },
          {
            n: "03",
            title: "3D visualisation",
            lead: "See your future home before renovation begins.",
            body: "Photorealistic renders of every room. Nothing is demolished until you have seen the result and approved it.",
          },
          {
            n: "04",
            title: "Renovation",
            lead: "Our team transforms the space.",
            body: "Demolition, electrics, plumbing, finishes and carpentry, run to the schedule agreed with the design, with progress reported as it goes.",
          },
          {
            n: "05",
            title: "Furnishing",
            lead: "We furnish every detail.",
            body: "Furniture, lighting, curtains, kitchen, wardrobes, appliances and decor, procured, delivered and installed.",
          },
          {
            n: "06",
            title: "Move in",
            lead: "Your property is ready.",
            body: "Final inspection, deep clean and handover. You bring a suitcase.",
          },
        ],
      },
      design: {
        title: "Designed for your lifestyle",
        lead: "Every property is different. Every client is different.",
        body: "Our designers build a concept around how you actually live, the property type and, for investors, what the unit needs to earn. The style is your decision, not a template we reuse.",
        stylesLabel: "Styles we build",
        styleAsk: "I'd like to discuss this style",
        styles: [
          { slug: "modern", label: "Modern" },
          { slug: "minimalist", label: "Minimalist" },
          { slug: "luxury", label: "Luxury" },
          { slug: "contemporary", label: "Contemporary" },
          { slug: "japandi", label: "Japandi" },
          { slug: "classic", label: "Classic" },
          { slug: "hotel-style", label: "Hotel-style" },
          { slug: "custom", label: "Custom design" },
        ],
      },
      vision: {
        eyebrow: "Design vision",
        title: "What a BIZBUYUK renovation can look like",
        lead: "Concept renders showing the range of our work — from a dated space to a finished one, in the styles we build.",
        disclaimer: "Concept visualisations, not a specific completed project. See real, photographed projects in \u201cOur work\u201d below.",
        items: [
          { slug: "villa", label: "Villa" },
          { slug: "burj-view-apartment", label: "Apartment, Burj Khalifa view" },
          { slug: "office", label: "Office fit-out" },
        ],
      },
      beforeAfter: {
        title: "From empty to extraordinary",
        lead: "Drag the handle to see the same room before and after.",
        before: "Before",
        after: "After",
        hint: "Drag to compare",
        empty: "Project comparisons are being prepared.",
        emptyBody: "We only publish a before/after once it is a real, finished BIZBUYUK project — no mockups. The first pair goes live as soon as a current renovation is handed over.",
      },
      fullService: {
        title: "One team. One contract. One result.",
        lead: "No separate designers, contractors, carpenters, electricians and furniture suppliers to manage. BIZBUYUK coordinates the project from concept to completion.",
        cards: [
          { title: "Design", body: "Interior design and 3D visualisation." },
          { title: "Renovation", body: "Complete construction and renovation works." },
          { title: "Carpentry", body: "Custom-made furniture and wardrobes." },
          { title: "Kitchen", body: "Complete kitchen design and installation." },
          { title: "Bathroom", body: "Full bathroom renovation and fit-out." },
          { title: "Lighting", body: "Lighting concept and installation." },
          { title: "Furniture", body: "Selection, procurement and delivery." },
          { title: "Decor", body: "Curtains, mirrors, artwork and accessories." },
          { title: "Appliances", body: "Complete appliance package, installed." },
        ],
      },
      furniture: {
        title: "From walls to furniture",
        lead: "We do not stop at the renovation. The property is handed over complete.",
        groups: [
          {
            title: "Living and dining",
            items: ["Sofas", "Dining tables", "Chairs", "TV units", "Coffee tables"],
          },
          {
            title: "Bedroom and storage",
            items: ["Beds", "Mattresses", "Wardrobes", "Kitchen cabinets"],
          },
          {
            title: "Soft furnishing and decor",
            items: ["Curtains", "Lighting", "Mirrors", "Rugs", "Artwork", "Accessories"],
          },
        ],
        cta: "Furnish my property",
      },
      investor: {
        title: "Renovation that adds value",
        lead: "A professionally designed and fully furnished property is easier to let, easier to sell and photographs better than an empty one.",
        items: [
          "Property renovation",
          "Interior design",
          "Full furnishing",
          "Long-term rental preparation",
          "Short-term rental preparation",
          "Property handover",
          "Investment-focused design",
        ],
        cta: "Talk to an investment specialist",
      },
      portfolio: {
        title: "Our work",
        lead: "Completed renovations across the Emirates.",
        filters: ["All", "Apartments", "Villas", "Studio", "1BR", "2BR", "3BR+"],
        empty: "Project photography is being prepared. Ask us for the current portfolio and we will send it directly.",
      },
      quote: {
        title: "Every property deserves a custom plan",
        lead: "Renovation cost depends on the size, the condition, the design concept, the materials and how far the furnishing goes. Tell us about the property and you get a written quote.",
        name: "Your name",
        phone: "WhatsApp number",
        email: "Email",
        location: "Property location",
        propertyType: "Property type",
        propertyTypes: ["Apartment", "Villa", "Townhouse", "Studio", "Office"],
        size: "Size, sq ft",
        condition: "Current condition",
        conditions: ["Brand new, handed over", "Lived in, needs a refresh", "Old, needs a full strip-out", "Under construction"],
        style: "Desired style",
        budget: "Estimated budget, AED",
        budgets: ["Up to 100k", "100k - 250k", "250k - 500k", "500k - 1M", "Over 1M", "Not sure yet"],
        message: "Anything else we should know",
        messagePlaceholder: "Handover date, what you want kept, how you plan to use the property.",
        photosNote: "Have photos of the property? Send them on WhatsApp after you submit and we will attach them to your file.",
        submit: "Request a quote",
        sending: "Sending…",
        success: "Thank you. We will come back with questions or a quote within one business day.",
        error: "Something went wrong. Please try again or message us on WhatsApp.",
        consent: "By submitting you agree to be contacted about this property.",
      },
      why: {
        title: "Why choose BIZBUYUK",
        cards: [
          { title: "One point of contact", body: "One team manages the entire project. You have one person to call." },
          { title: "Complete service", body: "Design, renovation, furniture and installation under a single contract." },
          { title: "Transparent process", body: "Agreed scope, agreed timeline, and progress you can actually see." },
          { title: "Professional design", body: "A custom interior created for your property, not a reused template." },
          { title: "Quality control", body: "Every stage is checked before it is signed off and before handover." },
          { title: "Move-in ready", body: "We do not just renovate the property. We prepare it for living." },
        ],
      },
      faq: {
        title: "Frequently asked questions",
        lead: "If your question is not here, ask us on WhatsApp.",
        items: [
          {
            q: "How long does a renovation take?",
            a: "It depends on the size and the scope. A studio or one-bedroom refresh is usually measured in weeks; a full villa strip-out and rebuild in months. You receive a dated schedule together with the design proposal, before any work starts.",
          },
          {
            q: "Do you provide interior design?",
            a: "Yes. Design is where every project starts: floor plans, materials, colour and furniture layout, followed by 3D renders so you approve the result before anything is demolished.",
          },
          {
            q: "Can you renovate a property that is currently empty?",
            a: "That is the simplest case. An empty unit means no furniture to protect and no household to work around, so the schedule is shorter.",
          },
          {
            q: "Do you provide furniture?",
            a: "Yes. We select it, procure it, deliver it and install it. You approve every piece at the design stage.",
          },
          {
            q: "Can you furnish the entire apartment?",
            a: "Yes, down to mattresses, curtains, mirrors and artwork. At handover it is a property you can sleep in that night.",
          },
          {
            q: "Do you work with villas?",
            a: "Yes. Apartments, townhouses and villas, in Dubai and across the Emirates.",
          },
          {
            q: "Can I choose the design style and materials?",
            a: "Yes. The concept is built around your taste and budget, and you sign off the material list before anything is purchased.",
          },
          {
            q: "Do you provide 3D renders before renovation?",
            a: "Always. Nothing is demolished before you have seen the renders and approved them.",
          },
          {
            q: "Can you manage the project while I am outside the UAE?",
            a: "Yes, and many owners are abroad for the whole project. You receive scheduled progress updates with photos and video, and approvals are handled remotely.",
          },
          {
            q: "Do you provide a custom quotation?",
            a: "Yes. Every property gets its own quote based on size, condition, the design concept, the materials and the level of furnishing.",
          },
        ],
      },
      finalCta: {
        title: "Ready to transform your property?",
        lead: "Let us turn your space into a home.",
        cta: "Start your project",
        ctaAlt: "WhatsApp us",
      },
    },
    propertyTypes: {
      studio: "Studio",
      apartment: "Apartment",
      penthouse: "Penthouse",
      villa: "Villa",
      townhouse: "Townhouse",
      branded: "Branded residence",
      luxury: "Luxury",
      investment: "Investment",
      offplan: "Off-plan",
    },
    realEstatePage: {
      metaTitle: "Real Estate in Dubai",
      metaDescription:
        "Buy property in Dubai with BIZBUYUK: off-plan and ready homes, studios to villas and branded residences, across seventeen districts. 0% commission to the buyer.",
      home: "Home",
      current: "Real Estate",
      hero: {
        eyebrow: "Real Estate",
        title: "Every property type, across Dubai.",
        sub: "We do not sell one building in one district. We start from your budget, your goal and your horizon, then shortlist what actually fits.",
        cta: "Get a consultation",
        ctaAlt: "See the districts",
      },
      stats: [
        { value: "17", label: "Districts we work in" },
        { value: "0%", label: "Commission to the buyer" },
        { value: "2", label: "Ways to buy: off-plan or ready" },
      ],
      types: {
        title: "What you can buy",
        lead: "The right type depends on whether you are buying to live, to let or to hold. These are the options we work with, and what each one is usually chosen for.",
        groups: [
          {
            title: "By size",
            items: [
              { title: "Studio", body: "The lowest entry price and the highest yield per dirham. Popular with short-let operators and single tenants." },
              { title: "1 bedroom", body: "The deepest rental market in Dubai. Easy to let, easy to sell on." },
              { title: "2 bedrooms", body: "The step where couples and small families start looking. Slower to let than a 1BR, longer tenancies." },
              { title: "3 bedrooms and above", body: "Family stock. Fewer tenants, but they stay for years, which cuts vacancy and turnover cost." },
              { title: "Penthouse", body: "Top-floor units with private terraces. A thin market, driven by view and finish rather than yield." },
            ],
          },
          {
            title: "By form",
            items: [
              { title: "Apartment", body: "Tower and mid-rise stock. Service charge covers the building, so ownership is close to hands-off." },
              { title: "Villa", body: "Standalone homes with a plot. Higher entry, higher maintenance, and the strongest capital growth in family communities." },
              { title: "Townhouse", body: "A villa layout at an apartment budget. The usual compromise for families who want space without a plot." },
            ],
          },
          {
            title: "By segment",
            items: [
              { title: "Luxury property", body: "Prime addresses, larger floor plates, and buyers who care about the view and the neighbours more than the yield." },
              { title: "Branded residence", body: "Managed by a hotel or fashion brand. Higher price per square foot, and a rental premium that usually follows it." },
              { title: "Investment property", body: "Chosen on the numbers first: yield, service charge, tenant demand and how easily it sells on." },
            ],
          },
        ],
      },
      paths: {
        title: "Two ways to buy",
        lead: "Almost every decision comes down to this: pay in instalments while it is built, or buy something that exists today.",
        offplan: {
          title: "Off-plan",
          body: "Bought from the developer before or during construction. Launch pricing, a payment plan spread over the build, and often post-handover instalments. You wait, and you carry construction risk.",
          cta: "How off-plan works",
        },
        ready: {
          title: "Ready property",
          body: "Bought from an existing owner. You can view the exact unit, check the building, and let it the month after the transfer. You pay today's price, usually in full.",
          cta: "How buying ready works",
        },
      },
      districts: {
        title: "Where we work",
        lead: "Seventeen districts, each with a different reason to buy there. Filter by how settled the area is, then ask us which projects are open right now.",
        filters: {
          all: "All districts",
          established: "Established",
          prestige: "Prestige",
          emerging: "Emerging",
        },
        typesLabel: "Typical stock",
        note: "We also work in districts that are not on this list. If you have one in mind, ask.",
        ask: "Ask about this district",
      },
      why: {
        title: "How we work",
        cards: [
          { title: "0% commission to you", body: "On developer sales our fee is paid by the developer, not added to your price." },
          { title: "A shortlist, not a catalogue", body: "Two or three units matched to your brief, each with the numbers behind it." },
          { title: "The whole market", body: "We are not tied to one developer, so the shortlist is chosen on merit." },
          { title: "Numbers before feelings", body: "Yield, service charge, payment plan and exit are on the table before you decide." },
          { title: "Checked before you sign", body: "Developer, project status, escrow and contract are all verified first." },
          { title: "After the purchase", body: "Furnishing, tenants, management and resale, if and when you want them." },
        ],
      },
      cta: {
        title: "Tell us the budget and the goal.",
        body: "That is enough to start. We will come back with two or three properties that fit, and the reasoning behind each one.",
      },
      offplan: {
        metaTitle: "Off-plan Property in Dubai",
        metaDescription:
          "How buying off-plan in Dubai works: payment plans, down payment, post-handover instalments, developer and escrow checks, and the full process to handover.",
        current: "Off-plan",
        hero: {
          eyebrow: "Off-plan",
          title: "Buy at launch, pay as it is built.",
          sub: "Off-plan is the cheapest way into a new Dubai project and the one with the most moving parts. Here is exactly how it works.",
          cta: "Discuss an off-plan purchase",
        },
        what: {
          title: "What off-plan actually means",
          lead: "You are buying a unit that does not exist yet, directly from the developer, on a contract that sets both the price and the build schedule.",
          points: [
            { title: "Launch pricing", body: "The first release of a project is usually its cheapest. Later phases are priced against demand." },
            { title: "Payment spread over the build", body: "You pay in instalments tied to construction milestones rather than all at once." },
            { title: "Capital appreciation", body: "If the area and the project perform, the unit can be worth more at handover than you contracted for. It can also not." },
            { title: "Construction risk", body: "Handover dates move. The contract, the escrow account and the developer's record are what protect you." },
          ],
        },
        payment: {
          title: "How payment plans are built",
          lead: "Almost every plan is a variation on these four parts. The split is what separates an easy purchase from a stretched one.",
          plans: [
            { title: "Down payment", body: "Paid at booking, on signing the reservation. This is the number that decides whether a project is within reach." },
            { title: "During construction", body: "Instalments released against build milestones, or on fixed dates, through to completion." },
            { title: "On handover", body: "The balance due when the unit is ready and the keys are issued." },
            { title: "Post-handover", body: "Some developers let part of the price run on after you have the keys, so rent can help carry it." },
          ],
          note: "Plans differ by developer and by project, and they change between phases. We compare the actual plans open at the time you are buying.",
        },
        process: {
          title: "The process, start to finish",
          lead: "Eight stages. You are involved in the first five; we carry the rest.",
          steps: [
            { n: "01", title: "Consultation", lead: "Budget, goal, horizon.", body: "We establish what you want the property to do, and what you can commit each year." },
            { n: "02", title: "Property selection", lead: "Type, size, district.", body: "We narrow to the property type and the areas that match the brief, and rule out the rest." },
            { n: "03", title: "Project selection", lead: "Developer and phase.", body: "We compare open projects on price, plan, delivery record and what the district supports." },
            { n: "04", title: "Booking", lead: "The unit is reserved.", body: "Reservation form and booking payment. The unit comes off the market in your name." },
            { n: "05", title: "SPA", lead: "The contract is signed.", body: "We read the sale and purchase agreement with you before signature: dates, penalties, and what happens if either side slips." },
            { n: "06", title: "Registration", lead: "Oqood with the DLD.", body: "The purchase is registered with the Dubai Land Department and your interest is recorded." },
            { n: "07", title: "Construction", lead: "Instalments and progress.", body: "We track milestones and payment calls so nothing is missed and no penalty is triggered." },
            { n: "08", title: "Handover", lead: "Keys and snagging.", body: "Inspection, snagging list, final payment and title. From here we can furnish it or let it." },
          ],
        },
        checks: {
          title: "What we verify before you commit",
          items: [
            "The developer's delivery record on previous projects",
            "The project's registration and status with RERA",
            "That payments go to the project's escrow account",
            "That the payment schedule in the contract matches what you were shown",
            "Handover dates, penalty clauses and termination terms",
            "What the district actually supports in rent and resale",
          ],
        },
        cta: {
          title: "Which projects are open right now?",
          body: "Launch phases open and close quickly. Tell us your budget and we will send what is genuinely available this week.",
        },
      },
      ready: {
        metaTitle: "Ready Property in Dubai",
        metaDescription:
          "Buying ready property in Dubai: search, viewings, negotiation, document checks, transfer at the Dubai Land Department and handover.",
        current: "Ready property",
        hero: {
          eyebrow: "Ready property",
          title: "See it, check it, then buy it.",
          sub: "A completed unit you can walk through, inspect and let the month after transfer. No build risk, no waiting.",
          cta: "Discuss a ready purchase",
        },
        what: {
          title: "Why buyers choose ready",
          lead: "Off-plan is cheaper on paper. Ready is certain.",
          points: [
            { title: "You see the actual unit", body: "The view, the floor, the finish and the neighbours are facts, not renders." },
            { title: "Income from month one", body: "It can be let as soon as the transfer completes, so the asset starts working immediately." },
            { title: "The building has a track record", body: "Service charge, management quality and rental history are all visible before you buy." },
            { title: "No construction risk", body: "There is no handover date to slip and no build to monitor." },
          ],
        },
        process: {
          title: "The process, start to finish",
          lead: "Nine stages from the first brief to the keys.",
          steps: [
            { n: "01", title: "Search", lead: "The brief becomes a list.", body: "We work the market against your budget, district and property type, including units not publicly listed." },
            { n: "02", title: "Shortlist", lead: "Two or three, not thirty.", body: "We cut the list to what genuinely fits and explain why the rest were dropped." },
            { n: "03", title: "Analysis", lead: "The numbers per unit.", body: "Asking price against recent transactions, service charge, achievable rent and net yield." },
            { n: "04", title: "Viewing", lead: "In person or on video.", body: "We walk the unit and the building with you, or record it properly if you are abroad." },
            { n: "05", title: "Negotiation", lead: "Price and terms.", body: "We negotiate on your side: price, what stays in the unit, and the transfer timeline." },
            { n: "06", title: "Document check", lead: "Before any money moves.", body: "Title deed, service charge history, outstanding mortgage, NOC position and any restrictions on the unit." },
            { n: "07", title: "Transaction", lead: "MOU and deposit.", body: "The memorandum of understanding is signed and the deposit is placed under the standard protections." },
            { n: "08", title: "Registration", lead: "Transfer at the DLD.", body: "Developer NOC, then transfer at the Dubai Land Department and the title deed issued in your name." },
            { n: "09", title: "Handover", lead: "Keys and utilities.", body: "Keys, access cards, DEWA and cooling transferred. From here we can furnish it or find a tenant." },
          ],
        },
        checks: {
          title: "What we check on the unit",
          items: [
            "Title deed and that the seller is the registered owner",
            "Any mortgage on the property and how it will be cleared",
            "Service charge history and whether anything is outstanding",
            "The building's own management and maintenance record",
            "Recent transaction prices in the same building, not the asking prices",
            "Rental history and what the unit realistically achieves",
          ],
        },
        cta: {
          title: "Looking for something ready?",
          body: "Tell us the district and the budget. We will come back with what is on the market and what it is actually worth.",
        },
      },
    },
  },
  ru: {
    nav: { realEstate: "Недвижимость", services: "Услуги", renovation: "Ремонт", it: "Технологии", team: "Команда", partners: "Застройщики", why: "Почему мы", contact: "Контакты", cta: "Консультация", news: "Новости" },
    teamPage: {
      metaTitle: "\u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u0430 \u0432 \u0414\u0443\u0431\u0430\u0435",
      metaDescription:
        "\u041a\u043e\u043c\u0430\u043d\u0434\u0430 BIZBUYUK Real Estate \u0432 \u0414\u0443\u0431\u0430\u0435. \u0421\u0435\u043c\u044c \u0431\u0440\u043e\u043a\u0435\u0440\u043e\u0432 \u0438 \u0434\u0438\u0440\u0435\u043a\u0442\u043e\u0440\u043e\u0432 \u0433\u043e\u0432\u043e\u0440\u044f\u0442 \u043d\u0430 \u0440\u0443\u0441\u0441\u043a\u043e\u043c, \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u043c, \u0443\u0437\u0431\u0435\u043a\u0441\u043a\u043e\u043c, \u043a\u0430\u0437\u0430\u0445\u0441\u043a\u043e\u043c, \u0442\u0430\u0434\u0436\u0438\u043a\u0441\u043a\u043e\u043c, \u0430\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043d\u0441\u043a\u043e\u043c, \u0430\u0440\u0430\u0431\u0441\u043a\u043e\u043c \u0438 \u043a\u0438\u0442\u0430\u0439\u0441\u043a\u043e\u043c.",
      eyebrow: "\u041a\u043e\u043c\u0430\u043d\u0434\u0430",
      titleA: "\u0412\u0430\u0441 \u0432\u044b\u0441\u043b\u0443\u0448\u0430\u044e\u0442",
      titleEm: "\u043d\u0430 \u0432\u0430\u0448\u0435\u043c \u044f\u0437\u044b\u043a\u0435",
      lead: "\u0414\u0443\u0431\u0430\u0439\u0441\u043a\u0438\u0439 \u043e\u0444\u0438\u0441 BIZBUYUK. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u044f\u0437\u044b\u043a, \u043d\u0430 \u043a\u043e\u0442\u043e\u0440\u043e\u043c \u0432\u0430\u043c \u0443\u0434\u043e\u0431\u043d\u043e \u0433\u043e\u0432\u043e\u0440\u0438\u0442\u044c, \u0438 \u0443\u0432\u0438\u0434\u0438\u0442\u0435, \u043a\u0442\u043e \u0438\u0437 \u043d\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0441 \u0432\u0430\u043c\u0438 \u043d\u0430 \u0441\u0432\u044f\u0437\u0438.",
      bandLabel: "\u0413\u043e\u0432\u043e\u0440\u0438\u043c \u043d\u0430",
      hint: "\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u044f\u0437\u044b\u043a",
      reset: "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c",
      peopleWord: "\u0432 \u043a\u043e\u043c\u0430\u043d\u0434\u0435",
      waIntro: "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435! \u042f \u043d\u0430 \u0441\u0430\u0439\u0442\u0435 BIZBUYUK \u0438 \u0445\u043e\u0442\u0435\u043b(\u0430) \u0431\u044b \u0441\u0432\u044f\u0437\u0430\u0442\u044c\u0441\u044f \u0441 {name}.",
      langs: {
        ru: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", en: "\u0410\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u0438\u0439", uz: "\u0423\u0437\u0431\u0435\u043a\u0441\u043a\u0438\u0439", kz: "\u041a\u0430\u0437\u0430\u0445\u0441\u043a\u0438\u0439", tj: "\u0422\u0430\u0434\u0436\u0438\u043a\u0441\u043a\u0438\u0439",
        az: "\u0410\u0437\u0435\u0440\u0431\u0430\u0439\u0434\u0436\u0430\u043d\u0441\u043a\u0438\u0439", ar: "\u0410\u0440\u0430\u0431\u0441\u043a\u0438\u0439", zh: "\u041a\u0438\u0442\u0430\u0439\u0441\u043a\u0438\u0439", af: "\u0410\u0444\u0440\u0438\u043a\u0430\u043d\u0441\u043a\u0438\u0435 \u044f\u0437\u044b\u043a\u0438",
      },
      langsShort: { af: "\u0410\u0444\u0440\u0438\u043a\u0430" },
      ctaTitle: "\u041d\u0435 \u0443\u0432\u0435\u0440\u0435\u043d\u044b, \u043a \u043a\u043e\u043c\u0443 \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u044c\u0441\u044f?",
      ctaBody: "\u041d\u0430\u043f\u0438\u0448\u0438\u0442\u0435 \u043d\u0430\u043c, \u0438 \u043c\u044b \u043f\u043e\u0434\u0431\u0435\u0440\u0451\u043c \u0447\u0435\u043b\u043e\u0432\u0435\u043a\u0430, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0433\u043e\u0432\u043e\u0440\u0438\u0442 \u043d\u0430 \u0432\u0430\u0448\u0435\u043c \u044f\u0437\u044b\u043a\u0435 \u0438 \u0432\u0435\u0434\u0451\u0442 \u043d\u0443\u0436\u043d\u044b\u0439 \u0432\u0430\u043c \u0441\u0435\u0433\u043c\u0435\u043d\u0442 \u0440\u044b\u043d\u043a\u0430.",
      ctaButton: "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u043a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0438\u044e",
      trustedBroker: "\u041f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u0439 \u0431\u0440\u043e\u043a\u0435\u0440",
    },
    hero: {
      eyebrow: "ОАЭ · Недвижимость · с 2020",
      titleA: "Ваш надёжный партнёр на рынке",
      titleEm: "недвижимости",
      titleB: "ОАЭ.",
      sub: "Старты продаж off-plan от ведущих застройщиков ОАЭ, защита инвестиций и беспроблемный путь к жизни в ОАЭ — сопровождение под ключ.",
      cta: "Получить консультацию",
      ctaAlt: "Наши услуги",
      scroll: "Листайте",
    },
    marqueeIntro: "Нам доверяют застройщики, которые строят ОАЭ",
    whatsappFab: { aria: "Написать в WhatsApp", prefill: "Здравствуйте, BIZBUYUK! У меня есть вопрос." },
    trust: {
      eyebrow: "В цифрах",
      lead: {
        value: "200 000+",
        label: "клиентов",
        note: "Консультации и завершённые сделки с 2020 года.",
      },
      items: [
        { value: "50 000+", label: "Закрытых сделок" },
        { value: "AED 10B+", label: "Объём портфеля" },
        { value: "7", label: "Эмиратов" },
        { value: "50+", label: "Специалистов в команде" },
        { value: "10", label: "Языков в работе" },
      ],
    },
    services: {
      eyebrow: "Чем мы занимаемся",
      title: "Всё, что мы берём на себя в ОАЭ",
      items: [
        {
          tag: "01",
          title: "Недвижимость",
          body: "Старты off-plan и готовые объекты от крупнейших застройщиков ОАЭ. Подбор, переговоры и сделка, с 0% комиссии для покупателя.",
        },
        {
          tag: "02",
          title: "Защита инвестиций",
          body: "Проверка застройщика и проекта, escrow и график платежей, разбор договора и регистрация в Dubai Land Department.",
        },
        {
          tag: "03",
          title: "Туризм и переезд",
          body: "Поездка, проживание или переезд в ОАЭ: резидентские визы, Emirates ID, банк, школы и обустройство.",
        },
        {
          tag: "04",
          title: "Управление недвижимостью",
          body: "После покупки: поиск арендаторов, сбор платежей, обслуживание объекта и перепродажа, когда это выгодно.",
        },
        {
          tag: "05",
          title: "Ремонт под ключ",
          body: "От пустой коробки до готового дома: дизайн, 3D-рендеры, полный ремонт, мебель и финальная комплектация.",
        },
        {
          tag: "06",
          title: "Технологии",
          body: "Технологическое направление BIZBUYUK GROUP: веб и мобильные продукты, бизнес-системы и AI — для клиентов по всему миру.",
        },
      ],
    },
    stats: {
      eyebrow: "Почему ОАЭ",
      title: "Рынок, созданный для инвесторов",
      items: [
        { value: "11%", label: "Средний рост цен в год" },
        { value: "12%", label: "Средняя доходность аренды" },
        { value: "0%", label: "Налог на имущество и доход" },
      ],
    },
    why: {
      about: {
        eyebrow: "О нас",
        title: "Добро пожаловать в BIZBUYUK Real Estate",
        body: "Основанное в 2020 году, наше агентство ставит миссией предоставлять брокерские услуги мирового класса с высочайшими стандартами профессионализма, этики и качества. Опираясь на глубокое взаимное доверие, мы стремимся стать самым ценным агентством недвижимости в регионе.",
      },
      eyebrow: "Почему мы",
      cards: [
        { title: "Эксперты рынка", body: "Команда аналитиков, которые следят за трендами рынка и знают районы — находят лучшие возможности для клиентов." },
        { title: "Прямой доступ", body: "Доступ к объектам в премиальных локациях напрямую от продавцов и широкий выбор off-plan решений под любой бюджет." },
        { title: "Сделка без хлопот", body: "Отличная доходность инвестиций благодаря прозрачному и беспроблемному процессу приобретения." },
        { title: "Полный спектр услуг", body: "Амбициозное креативное агентство: покупка, продажа и аренда жилой и коммерческой недвижимости в ключевых районах ОАЭ." },
      ],
    },
    partners: { eyebrow: "Наши застройщики", title: "Работаем со всеми проектами ОАЭ" },
    testimonials: {
      eyebrow: "Их собственные слова",
      title: "Что говорят клиенты",
      lead: "Без редактуры, на языке оригинала.",
      allLabel: "Все",
      ratingSuffix: "/5",
      writeReview: "Оставить отзыв",
      form: {
        title: "Оставить отзыв",
        name: "Ваше имя",
        city: "Ваш город",
        country: "Ваша страна",
        language: "Язык, на котором вы пишете",
        service: "По какой услуге отзыв?",
        rating: "Оценка",
        quote: "Ваш отзыв",
        quotePlaceholder: "Что прошло особенно хорошо — или не очень?",
        submit: "Отправить отзыв",
        submitting: "Отправляем…",
        success: "Спасибо. Наша команда проверит отзыв перед публикацией.",
        error: "Что-то пошло не так. Попробуйте ещё раз.",
        note: "Отзывы проверяются перед публикацией на сайте.",
        close: "Закрыть",
      },
    },
    lead: {
      eyebrow: "Бесплатная консультация",
      title: "Оставьте заявку — мы свяжемся с вами",
      sub: "Укажите контакты, и старший консультант свяжется с вами в течение рабочего дня.",
      name: "Ваше имя",
      phone: "Номер телефона",
      email: "Email",
      emailHint: "Достаточно имени - «@gmail.com» подставится сам.",
      contactPref: "Удобный способ связи",
      contactCall: "Звонок",
      contactWhatsApp: "WhatsApp",
      contactTelegram: "Telegram",
      contactEmail: "Email",
      submit: "Отправить",
      sending: "Отправляем…",
      success: "Спасибо — мы скоро свяжемся с вами.",
      error: "Что-то пошло не так. Попробуйте ещё раз или позвоните нам.",
      consent: "Отправляя форму, вы соглашаетесь на связь по вашему запросу.",
    },
    footer: {
      blurb: "Амбициозное и креативное агентство недвижимости в ОАЭ — покупка, продажа и аренда жилой и коммерческой недвижимости по всем Эмиратам.",
      licenceNote: "Лицензированное агентство недвижимости. Каждый брокер в нашей команде имеет собственную лицензию RERA — уточняйте у вашего брокера.",
      address: "Адрес",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, ОАЭ.",
      offices: "Офисы",
      contact: "Контакты",
      follow: "Соцсети",
      rights: "Все права защищены.",
      nav: "Навигация",
    },
    legal: {
      privacyLabel: "Политика конфиденциальности",
      termsLabel: "Условия использования",
      page: {
        eyebrow: "Правовая информация",
        updated: "Обновлено: сентябрь 2026",
        languageNote: "Эта страница представлена на английском языке — он является языком, на котором этот документ имеет юридическую силу. Напишите нам на русском или узбекском, и мы с радостью ответим на любой вопрос о ней на вашем языке.",
      },
      privacy: { title: "Политика конфиденциальности" },
      terms: { title: "Условия использования" },
    },
    newsPage: {
      metaTitle: "Новости",
      metaDescription: "Новости BIZBUYUK Real Estate и BIZBUYUK GROUP.",
      home: "Главная",
      current: "Новости",
      eyebrow: "Обновления",
      title: "Новости BIZBUYUK",
      lead: "Над чем мы работаем, что запускаем и чему учимся.",
      empty: "Новостей пока нет — загляните позже.",
      readMore: "Читать",
      back: "Все новости",
    },
    servicesPage: {
      metaTitle: "Услуги",
      metaDescription:
        "От выбора объекта до жизни в ОАЭ: недвижимость, защита инвестиций, переезд и управление недвижимостью под ключ.",
      home: "Главная",
      current: "Услуги",
      eyebrow: "Чем мы занимаемся",
      title: "Наши услуги",
      sub: "От выбора объекта до жизни в ОАЭ: сопровождаем на каждом шаге.",
      ctaPrimary: "Получить консультацию",
      ctaSecondary: "Спросить в WhatsApp",
      stats: [
        { value: "7", label: "Эмирата в работе" },
        { value: "5", label: "Направления сопровождения" },
        { value: "23", label: "Услуг внутри" },
        { value: "4", label: "Языка: RU / UZ / EN / AR" },
      ],
      blocks: [
        {
          id: "real-estate",
          nav: "Недвижимость",
          title: "Подбор и покупка",
          intro:
            "Подбираем объекты у ведущих застройщиков ОАЭ. Комиссия покупателя 0%: наше вознаграждение платит застройщик, а не вы.",
          items: [
            { title: "Off-plan у застройщика", body: "Прямые контракты с девелопером: стартовая цена, рассрочка и post-handover без наценки посредника." },
            { title: "Готовая недвижимость", body: "Вторичный рынок: объект можно посмотреть, сдать и получать доход сразу после сделки." },
            { title: "Инвестиционный анализ", body: "Расчёт ROI и rental yield с учётом service charge, управления и простоя между арендаторами." },
            { title: "Шорт-лист из 2-3 объектов", body: "Не весь каталог, а короткий список под ваш бюджет, цель и горизонт владения." },
            { title: "Бронирование и SPA", body: "Резервация юнита, разбор условий договора и сопровождение подписания." },
          ],
        },
        {
          id: "protection",
          nav: "Защита инвестиций",
          title: "Защита инвестиций",
          intro:
            "Юридическая защита капитала на каждом этапе сделки. Проверяем то, что обычно проверяют слишком поздно.",
          items: [
            { title: "Due diligence застройщика", body: "История сдачи проектов, финансовая устойчивость и статус проекта в реестрах RERA." },
            { title: "Escrow-счёт и график платежей", body: "Проверяем, что деньги идут на escrow-счёт проекта, а график платежей совпадает с договором." },
            { title: "Проверка SPA до подписания", body: "Сроки сдачи, штрафы, условия расторжения и порядок передачи объекта." },
            { title: "Oqood и Title Deed", body: "Регистрация права в Dubai Land Department и контроль сроков оформления документов." },
            { title: "Спорные ситуации", body: "Сопровождение при задержке сдачи или нарушении застройщиком условий договора." },
          ],
        },
        {
          id: "relocation",
          nav: "Туризм и переезд",
          title: "Туризм и переезд",
          intro: "От первого визита до полноценной жизни в ОАЭ.",
          items: [
            { title: "Ознакомительный тур", body: "Программа визита: просмотр объектов, встречи с застройщиками, трансферы и проживание." },
            { title: "Резидентская виза", body: "Оформление визы, включая Golden Visa при инвестиции от действующего порога." },
            { title: "Банк и Emirates ID", body: "Открытие счёта в банке ОАЭ и получение удостоверения резидента." },
            { title: "Школы и район", body: "Подбор школы или детского сада и района проживания под запрос семьи." },
            { title: "Адаптация", body: "Медицинская страховка, коммунальные услуги, транспорт и мобильная связь." },
          ],
        },
        {
          id: "management",
          nav: "Управление",
          title: "Управление недвижимостью",
          intro:
            "Покупка не заканчивается на подписании документов. После сделки объект нужно подготовить, сдать и обслуживать.",
          items: [
            { title: "Поиск арендатора", body: "Долгосрочная и краткосрочная аренда, проверка арендатора, договор и регистрация Ejari." },
            { title: "Управление объектом", body: "Взаимодействие с управляющей компанией, обслуживание юнита и сбор арендных платежей." },
            { title: "Ремонт и меблировка", body: "Подготовка объекта под сдачу: отделка, мебель, техника и фотосъёмка для объявления." },
            { title: "Перепродажа", body: "Resale и assignment: помогаем выйти из инвестиции, когда это становится выгодным." },
          ],
        },
        {
          id: "legal",
          nav: "Юридические услуги",
          title: "Юридическое сопровождение и консалтинг",
          intro:
            "Юридическое и консалтинговое направление, которое работает не только в ОАЭ: регистрация компаний, оформление виз и сеть юристов в странах BRICS — та же команда, что ведёт вашу сделку с недвижимостью.",
          items: [
            { title: "Международная юридическая сеть", body: "Партнёрские юристы в странах BRICS, единая точка контакта — для вопросов, которые выходят за рамки ОАЭ." },
            { title: "Регистрация компании", body: "Mainland, free zone или offshore: оформляем структуру и лицензию так, чтобы вы начали работать, а не просто получили регистрацию." },
            { title: "Оформление визы", body: "Чёткий срок на саму визу: 7 рабочих дней после подачи полного пакета документов. Смежные вопросы разбираем на консультации, а не обещаем заранее." },
            { title: "Комиссия и управление недвижимостью", body: "Продажа, сдача в аренду или передача объекта в управление: стоимость называем под конкретный объект и ситуацию, а не по фиксированному прайсу." },
          ],
        },
      ],
      process: {
        title: "Как это происходит",
        body: "Пять шагов от первого разговора до регистрации права собственности. Обычно занимает от двух недель.",
        steps: [
          { title: "Бриф", body: "Бюджет, цель, горизонт и удобный способ оплаты." },
          { title: "Шорт-лист", body: "2-3 объекта с расчётом доходности по каждому." },
          { title: "Просмотр", body: "Видео-тур по объекту или визит в ОАЭ." },
          { title: "Бронирование", body: "Резервация юнита и проверка SPA до подписания." },
          { title: "Сделка", body: "Подписание, оплата и регистрация в Dubai Land Department." },
        ],
      },
      trust: {
        title: "Что это значит на практике",
        items: [
          "Работаем как зарегистрированная брокерская компания в ОАЭ",
          "Каждая сделка регистрируется в Dubai Land Department",
          "Средства покупателя идут на escrow-счёт проекта",
          "Договор проверяет юрист до вашей подписи, а не после",
        ],
      },
      visaNote:
        "Условия резидентских виз и порог инвестиций для Golden Visa периодически меняются. Действующие требования проверяем на дату вашей сделки.",
      legalNote:
        "Условия для брокеров и партнёров также обсуждаются индивидуально. Скажите, с кем вы работаете — подтвердим лучшие условия для этого сотрудничества.",
      askLabel: "Есть вопрос по разделу?",
      askWhatsApp: "Спросить в WhatsApp",
      also: {
        eyebrow: "Тоже часть того, что мы делаем",
        title: "Ещё два направления",
        renovation: {
          title: "Ремонт под ключ",
          body: "Уже купили — здесь или в другом месте? Доводим пространство от пустой коробки до готового дома: дизайн, рендеры, ремонт, мебель и передача ключей.",
          cta: "Смотреть ремонт",
        },
        it: {
          title: "Технологии",
          body: "Технологическое направление BIZBUYUK GROUP — веб и мобильные продукты, бизнес-системы и AI для клиентов по всему миру.",
          cta: "Смотреть технологические услуги",
        },
      },
      cta: {
        title: "Не знаете, какая услуга нужна именно вам?",
        body: "Опишите ситуацию в двух предложениях. Мы скажем, с чего начать и что понадобится на каждом шаге.",
      },
    },
    calculatorsPage: {
      metaTitle: "Калькуляторы",
      metaDescription: "Рассчитайте доходность аренды, график платежей или ипотеку, а также полную стоимость переезда в ОАЭ — точные цифры уточнит консультант BIZBUYUK.",
      home: "Главная",
      current: "Калькуляторы",
      eyebrow: "Просчитайте цифры",
      title: "Калькуляторы",
      sub: "Быстрая оценка по трём вопросам, которые задаёт каждый покупатель и переезжающий. Точную цифру, на которую можно опираться, подтвердит консультант по вашей ситуации.",
      disclaimer: "Это только оценка для планирования. Ставки, сборы и госпошлины меняются — актуальные цифры по вашему случаю уточняем на консультации.",
      cards: [
        { slug: "rental-yield", title: "Доходность аренды", body: "Какую доходность может принести объект с учётом service charge и простоя.", cta: "Рассчитать доходность" },
        { slug: "payment-plan", title: "Рассрочка и ипотека", body: "График платежей от застройщика или ежемесячный платёж по ипотеке.", cta: "Рассчитать платежи" },
        { slug: "relocation-cost", title: "Стоимость переезда", body: "Виза, Emirates ID, страховка и, если покупаете недвижимость, расходы на сделку.", cta: "Оценить стоимость" },
      ],
      rentalYield: {
        metaTitle: "Калькулятор доходности аренды",
        metaDescription: "Рассчитайте валовую и чистую доходность аренды недвижимости в ОАЭ с учётом service charge и простоя.",
        nav: "Доходность аренды",
        eyebrow: "Калькулятор доходности",
        title: "Какую доходность может дать этот объект?",
        sub: "Укажите цену покупки и ожидаемую аренду. Мы учтём service charge и допущение на простой между арендаторами, чтобы показать реалистичную чистую доходность, а не только заголовочную цифру.",
        priceLabel: "Цена покупки, AED",
        rentLabel: "Ожидаемая годовая аренда, AED",
        serviceChargeLabel: "Годовой service charge, AED",
        vacancyLabel: "Допущение на простой, %",
        grossLabel: "Валовая доходность",
        netLabel: "Чистая доходность",
        resultNote: "Чистая доходность учитывает только простой и service charge. Расходы на финансирование сюда не входят — их считает калькулятор рассрочки и ипотеки.",
      },
      paymentPlan: {
        metaTitle: "Калькулятор рассрочки и ипотеки",
        metaDescription: "Смоделируйте график рассрочки от застройщика или стандартную ипотеку в ОАЭ, с готовыми условиями для резидентов и нерезидентов.",
        nav: "Рассрочка",
        eyebrow: "Калькулятор рассрочки и ипотеки",
        title: "Как вы будете платить?",
        sub: "Два способа оплаты: рассрочка от застройщика или банковская ипотека. Переключайтесь между ними, чтобы сравнить.",
        modeOffplan: "Рассрочка от застройщика",
        modeMortgage: "Ипотека",
        priceLabel: "Цена объекта, AED",
        stageDown: "Первый взнос, %",
        stageDuring: "В процессе строительства, %",
        stageHandover: "При сдаче, %",
        stagePost: "После сдачи, %",
        postMonthsLabel: "Срок после сдачи, мес.",
        stageSumError: "Четыре этапа должны в сумме давать 100%.",
        offplanNote: "Это пример графика, а не условия конкретного застройщика. Планы отличаются у разных застройщиков и проектов и меняются между этапами продаж — сравниваем актуальные планы на момент вашей покупки.",
        totalLabel: "Итого",
        perMonthLabel: "в месяц",
        rateLabel: "Ставка, % годовых",
        downPaymentLabel: "Первый взнос, %",
        termLabel: "Срок, лет",
        monthlyLabel: "Ежемесячный платёж",
        totalInterestLabel: "Переплата за весь срок",
        mortgageNote: "Указанные ставка и максимальное финансирование — типичные стартовые условия, а не предложение банка. Реальную ставку и одобрение банк подтверждает после проверки документов.",
      },
      relocationCost: {
        metaTitle: "Калькулятор стоимости переезда",
        metaDescription: "Единоразовые госрасходы при покупке недвижимости в ОАЭ и условия получения Golden Visa.",
        nav: "Стоимость переезда",
        eyebrow: "Калькулятор стоимости переезда",
        title: "Сколько стоит покупка на самом деле?",
        sub: "Единоразовые госрасходы сверх цены объекта — и как получить Golden Visa.",
        buyingLabel: "Планируете купить недвижимость?",
        buyingYes: "Да",
        buyingNo: "Нет",
        priceLabel: "Цена объекта, AED",
        lineDldTransfer: "Пошлина DLD за переоформление (4%)",
        lineDldAdmin: "Административный сбор DLD",
        totalLabel: "Итого по оценке",
        notBuyingNote: "Ещё не покупаете? Эти расчёты пригодятся, как только определитесь с объектом — возвращайтесь в любой момент.",
        goldenVisaTitle: "Golden Visa",
        goldenVisaNote: "Инвестиция в недвижимость от AED 2,000,000 даёт право на Golden Visa ОАЭ. Оформление полностью берём на себя.",
        goldenVisaCta: "Спросить про Golden Visa",
      },
      leadCapture: {
        title: "Узнать точные цифры",
        body: "Отправьте нам этот расчёт — консультант подтвердит реальные цифры по вашей ситуации, обычно в течение одного рабочего дня.",
        name: "Ваше имя",
        phone: "Номер телефона",
        email: "Email",
        submit: "Отправить расчёт",
        sending: "Отправка…",
        success: "Заявка получена. Консультант скоро свяжется с вами.",
        error: "Что-то пошло не так. Попробуйте ещё раз или напишите нам в WhatsApp.",
        consent: "Отправляя заявку, вы соглашаетесь на связь по вашему вопросу.",
        whatsapp: "Спросить в WhatsApp",
      },
    },
    itPage: {
      metaTitle: "Технологические услуги",
      metaDescription:
        "Технологическое направление BIZBUYUK GROUP — веб и мобильные продукты, бизнес-системы, AI, облако, безопасность и данные для клиентов по всему миру.",
      home: "Главная",
      current: "Технологии",
      hero: {
        eyebrow: "BIZBUYUK GROUP · Технологии",
        title: "Тот же стандарт, на котором мы строим собственную компанию.",
        sub: "Веб и мобильные продукты, бизнес-системы, AI, облако, безопасность и данные — от команды, которая построила и поддерживает собственную CRM BIZBUYUK. Один партнёр, любая дисциплина, клиенты в любой точке мира.",
        ctaPrimary: "Связаться с IT-командой",
        ctaSecondary: "Написать в Telegram",
      },
      proof: {
        eyebrow: "Не презентация",
        title: "Мы пользуемся тем, что строим",
        items: [
          {
            title: "BIZBUYUK CRM",
            body: "Лиды, воронка, финансы, задачи и отчётность для собственного брокериджа BIZBUYUK Real Estate — построена внутри компании, используется командой каждый день.",
            cta: "Запросить демонстрацию",
          },
          {
            title: "LaWEra CRM",
            body: "Платформа управления делами и клиентами для юридической практики LaWEra — приём заявок, документы и биллинг в одной системе.",
            cta: "Запросить демонстрацию",
          },
        ],
      },
      groupsIntro: {
        eyebrow: "Что мы строим",
        title: "Двенадцать направлений, одна команда",
        lead: "Выберите, с чего начинается ваш проект. Большинство проектов затрагивают сразу несколько направлений — это обсуждается, как только вы напишете нам.",
        viewLabel: "Смотреть услуги",
      },
      process: {
        eyebrow: "Как это работает",
        title: "От сообщения в WhatsApp до готового продукта",
        steps: [
          { title: "Консультация", body: "Расскажите, что нужно решить. Никаких форм заранее — просто опишите задачу." },
          { title: "Оценка", body: "Мы возвращаемся с тем, что для этого нужно: команда, сроки и структура оплаты." },
          { title: "Разработка", body: "Работа идёт короткими циклами, с результатом, который можно увидеть рано и часто." },
          { title: "Поддержка", body: "Запуск — не финал. Мы остаёмся на связи для доработок, роста и следующего этапа." },
        ],
      },
      cta: {
        title: "Есть проект на примете?",
        body: "Опишите его сообщением — на русском, английском или узбекском. IT-команда отвечает напрямую, без очереди тикетов.",
        ctaPrimary: "Написать IT-команде в WhatsApp",
        ctaSecondary: "Написать в Telegram",
      },
      group: {
        backLabel: "Все направления",
        servicesLabel: "Что входит",
        servicesIntro: "Каждый пункт — это отправная точка, а не фиксированный пакет: скажите, какой ближе всего к вашей задаче, и мы вместе определим остальное.",
        askLabel: "Спросить про",
        askButton: "Обсудить в WhatsApp",
        otherLabel: "Другие направления",
        ctaTitle: "Готовы обсудить проект?",
        ctaBody: "Напишите IT-команде пару строк о проекте — размер команды, примерные сроки, что нужно решить.",
      },
    },
    renovationPage: {
      metaTitle: "Ремонт под ключ в Дубае",
      metaDescription:
        "BIZBUYUK выполняет ремонт под ключ в Дубае: дизайн-проект и 3D-визуализация, полный ремонт, мебель на заказ и финальная комплектация. Одна команда, один договор, готовая к заселению недвижимость.",
      home: "Главная",
      current: "Ремонт под ключ",
      hero: {
        eyebrow: "Ремонт под ключ",
        l1: "Ваша недвижимость.",
        l2: "Наш дизайн.",
        l3: "Готовый дом.",
        sub: "От дизайн-проекта и полного ремонта до мебели и финальной комплектации: весь процесс мы берём на себя.",
        cta: "Бесплатная консультация",
        ctaAlt: "Смотреть проекты",
      },
      scope: {
        title: "Всё. От нуля до готового дома.",
        lead: "Не нужно координировать десяток подрядчиков. Весь ремонт идёт под одной крышей, по одному графику и одному договору.",
        groups: [
          {
            title: "Дизайн и планирование",
            items: ["Дизайн интерьера", "Архитектурное планирование", "3D-визуализация"],
          },
          {
            title: "Строительные работы",
            items: [
              "Полный ремонт",
              "Электрика",
              "Сантехника",
              "Полы",
              "Малярные работы",
              "Потолки и освещение",
              "Кухня",
              "Санузлы",
              "Столярные изделия на заказ",
              "Шкафы",
            ],
          },
          {
            title: "Комплектация и сдача",
            items: [
              "Шторы",
              "Мебель",
              "Декор",
              "Бытовая техника",
              "Финальная установка",
              "Финальная уборка",
            ],
          },
        ],
        closing: "Вы отдаёте нам ключи. Мы возвращаем готовую к жизни недвижимость.",
      },
      process: {
        eyebrow: "Как это происходит",
        title: "Шесть этапов, одна команда",
        steps: [
          {
            n: "01",
            title: "Консультация",
            lead: "Разбираемся в объекте, образе жизни и бюджете.",
            body: "Приезжаем на объект, делаем замеры, обсуждаем, как вы будете им пользоваться, и определяем, что должен покрыть бюджет.",
          },
          {
            n: "02",
            title: "Дизайн",
            lead: "Ваше пространство получает полноценную концепцию.",
            body: "Планировки, материалы, цветовая палитра и расстановка мебели, собранные под ваш вкус и способ использования объекта.",
          },
          {
            n: "03",
            title: "3D-визуализация",
            lead: "Вы видите будущий дом до начала ремонта.",
            body: "Фотореалистичные рендеры каждой комнаты. Ничего не демонтируется, пока вы не увидели результат и не согласовали его.",
          },
          {
            n: "04",
            title: "Ремонт",
            lead: "Команда преображает пространство.",
            body: "Демонтаж, электрика, сантехника, отделка и столярка по графику, согласованному вместе с дизайном, с отчётами о ходе работ.",
          },
          {
            n: "05",
            title: "Комплектация",
            lead: "Комплектуем каждую деталь.",
            body: "Мебель, свет, шторы, кухня, шкафы, техника и декор: закупка, доставка и установка.",
          },
          {
            n: "06",
            title: "Заселение",
            lead: "Объект готов.",
            body: "Финальная проверка, генеральная уборка и передача ключей. Вам остаётся привезти чемодан.",
          },
        ],
      },
      design: {
        title: "Дизайн под ваш образ жизни",
        lead: "Каждый объект разный. Каждый клиент разный.",
        body: "Дизайнеры строят концепцию вокруг того, как вы действительно живёте, типа объекта и, для инвесторов, того, что юнит должен приносить. Стиль выбираете вы, а не шаблон, который мы переиспользуем.",
        stylesLabel: "Стили, которые мы реализуем",
        styleAsk: "Хочу обсудить этот стиль",
        styles: [
          { slug: "modern", label: "Modern" },
          { slug: "minimalist", label: "Минимализм" },
          { slug: "luxury", label: "Luxury" },
          { slug: "contemporary", label: "Contemporary" },
          { slug: "japandi", label: "Japandi" },
          { slug: "classic", label: "Классика" },
          { slug: "hotel-style", label: "Hotel-style" },
          { slug: "custom", label: "Индивидуальный проект" },
        ],
      },
      vision: {
        eyebrow: "Видение дизайна",
        title: "Как может выглядеть ремонт от BIZBUYUK",
        lead: "Концепт-рендеры, показывающие диапазон нашей работы — от изношенного пространства до готового, в стилях, которые мы реализуем.",
        disclaimer: "Концептуальная визуализация, а не конкретный завершённый проект. Реальные, отснятые проекты — в разделе «Наши работы» ниже.",
        items: [
          { slug: "villa", label: "Вилла" },
          { slug: "burj-view-apartment", label: "Квартира с видом на Бурдж-Халифа" },
          { slug: "office", label: "Офис под ключ" },
        ],
      },
      beforeAfter: {
        title: "Из пустой коробки в готовый интерьер",
        lead: "Потяните ползунок, чтобы увидеть одну и ту же комнату до и после.",
        before: "До",
        after: "После",
        hint: "Потяните для сравнения",
        empty: "Сравнения по проектам готовятся.",
        emptyBody: "Мы публикуем «до/после» только по реальному завершённому проекту BIZBUYUK — без макетов. Первая пара появится сразу после сдачи текущего ремонта.",
      },
      fullService: {
        title: "Одна команда. Один договор. Один результат.",
        lead: "Не нужно отдельно вести дизайнеров, подрядчиков, столяров, электриков и поставщиков мебели. BIZBUYUK ведёт проект от концепции до завершения.",
        cards: [
          { title: "Дизайн", body: "Дизайн интерьера и 3D-визуализация." },
          { title: "Ремонт", body: "Полный комплекс строительных и отделочных работ." },
          { title: "Столярка", body: "Мебель и шкафы на заказ." },
          { title: "Кухня", body: "Проект кухни и установка под ключ." },
          { title: "Санузлы", body: "Полный ремонт и комплектация ванных комнат." },
          { title: "Освещение", body: "Световая концепция и монтаж." },
          { title: "Мебель", body: "Подбор, закупка и доставка." },
          { title: "Декор", body: "Шторы, зеркала, картины и аксессуары." },
          { title: "Техника", body: "Полный пакет бытовой техники с установкой." },
        ],
      },
      furniture: {
        title: "От стен до мебели",
        lead: "Мы не останавливаемся на ремонте. Объект передаётся полностью укомплектованным.",
        groups: [
          {
            title: "Гостиная и столовая",
            items: ["Диваны", "Обеденные столы", "Стулья", "ТВ-зоны", "Журнальные столы"],
          },
          {
            title: "Спальня и хранение",
            items: ["Кровати", "Матрасы", "Шкафы", "Кухонные гарнитуры"],
          },
          {
            title: "Текстиль и декор",
            items: ["Шторы", "Свет", "Зеркала", "Ковры", "Картины", "Аксессуары"],
          },
        ],
        cta: "Укомплектовать объект",
      },
      investor: {
        title: "Ремонт, который добавляет стоимость",
        lead: "Профессионально спроектированный и полностью укомплектованный объект легче сдать, легче продать и лучше снять для объявления, чем пустой.",
        items: [
          "Ремонт объекта",
          "Дизайн интерьера",
          "Полная комплектация",
          "Подготовка к долгосрочной аренде",
          "Подготовка к краткосрочной аренде",
          "Передача объекта",
          "Дизайн с расчётом на доходность",
        ],
        cta: "Обсудить с инвест-специалистом",
      },
      portfolio: {
        title: "Наши работы",
        lead: "Завершённые проекты по Эмиратам.",
        filters: ["Все", "Квартиры", "Виллы", "Студии", "1BR", "2BR", "3BR+"],
        empty: "Съёмка проектов готовится. Напишите нам, и мы пришлём актуальное портфолио напрямую.",
      },
      quote: {
        title: "Каждому объекту нужен свой расчёт",
        lead: "Стоимость ремонта зависит от площади, состояния, концепции, материалов и глубины комплектации. Расскажите об объекте, и вы получите письменный расчёт.",
        name: "Ваше имя",
        phone: "Номер WhatsApp",
        email: "Email",
        location: "Локация объекта",
        propertyType: "Тип объекта",
        propertyTypes: ["Квартира", "Вилла", "Таунхаус", "Студия", "Офис"],
        size: "Площадь, кв. футов",
        condition: "Текущее состояние",
        conditions: ["Новый, после передачи", "Жилой, нужно обновить", "Старый, нужен полный демонтаж", "В стройке"],
        style: "Желаемый стиль",
        budget: "Ориентировочный бюджет, AED",
        budgets: ["До 100k", "100k - 250k", "250k - 500k", "500k - 1M", "Более 1M", "Пока не определён"],
        message: "Что ещё важно знать",
        messagePlaceholder: "Дата передачи, что нужно сохранить, как планируете использовать объект.",
        photosNote: "Есть фотографии объекта? Пришлите их в WhatsApp после отправки формы, и мы приложим их к вашей заявке.",
        submit: "Запросить расчёт",
        sending: "Отправляем…",
        success: "Спасибо. Вернёмся с вопросами или расчётом в течение рабочего дня.",
        error: "Что-то пошло не так. Попробуйте ещё раз или напишите нам в WhatsApp.",
        consent: "Отправляя форму, вы соглашаетесь на связь по этому объекту.",
      },
      why: {
        title: "Почему BIZBUYUK",
        cards: [
          { title: "Одна точка контакта", body: "Проект ведёт одна команда. У вас один человек, которому можно позвонить." },
          { title: "Полный цикл", body: "Дизайн, ремонт, мебель и установка по одному договору." },
          { title: "Прозрачный процесс", body: "Согласованный объём, согласованные сроки и видимый прогресс." },
          { title: "Профессиональный дизайн", body: "Индивидуальный интерьер под ваш объект, а не переиспользованный шаблон." },
          { title: "Контроль качества", body: "Каждый этап проверяется до приёмки и до передачи объекта." },
          { title: "Готово к заселению", body: "Мы не просто делаем ремонт. Мы готовим объект к жизни." },
        ],
      },
      faq: {
        title: "Частые вопросы",
        lead: "Если вашего вопроса здесь нет, напишите нам в WhatsApp.",
        items: [
          {
            q: "Сколько длится ремонт?",
            a: "Зависит от площади и объёма работ. Обновление студии или однокомнатной квартиры считается неделями, полный демонтаж и восстановление виллы — месяцами. График с датами вы получаете вместе с дизайн-проектом, до начала работ.",
          },
          {
            q: "Вы делаете дизайн интерьера?",
            a: "Да. С дизайна начинается каждый проект: планировки, материалы, цвет и расстановка мебели, затем 3D-рендеры, чтобы вы согласовали результат до демонтажа.",
          },
          {
            q: "Можно ли отремонтировать пустой объект?",
            a: "Это самый простой случай. В пустом юните нечего защищать и не нужно подстраиваться под жильцов, поэтому сроки короче.",
          },
          {
            q: "Вы предоставляете мебель?",
            a: "Да. Подбираем, закупаем, доставляем и устанавливаем. Каждый предмет вы согласовываете на этапе дизайна.",
          },
          {
            q: "Можете укомплектовать квартиру полностью?",
            a: "Да, вплоть до матрасов, штор, зеркал и картин. На передаче это объект, в котором можно ночевать в тот же день.",
          },
          {
            q: "Вы работаете с виллами?",
            a: "Да. Квартиры, таунхаусы и виллы, в Дубае и по Эмиратам.",
          },
          {
            q: "Могу ли я выбрать стиль и материалы?",
            a: "Да. Концепция строится вокруг вашего вкуса и бюджета, а список материалов вы утверждаете до начала закупок.",
          },
          {
            q: "Делаете ли вы 3D-рендеры до ремонта?",
            a: "Всегда. Ничего не демонтируется, пока вы не увидели рендеры и не согласовали их.",
          },
          {
            q: "Можете вести проект, пока я за пределами ОАЭ?",
            a: "Да, и многие собственники находятся за границей весь проект. Вы получаете плановые отчёты с фото и видео, а согласования проходят удалённо.",
          },
          {
            q: "Вы делаете индивидуальный расчёт?",
            a: "Да. Каждый объект получает свой расчёт по площади, состоянию, концепции, материалам и уровню комплектации.",
          },
        ],
      },
      finalCta: {
        title: "Готовы преобразить свой объект?",
        lead: "Превратим ваше пространство в дом.",
        cta: "Начать проект",
        ctaAlt: "Написать в WhatsApp",
      },
    },
    propertyTypes: {
      studio: "Студия",
      apartment: "Квартира",
      penthouse: "Пентхаус",
      villa: "Вилла",
      townhouse: "Таунхаус",
      branded: "Branded residence",
      luxury: "Luxury",
      investment: "Инвестиционный",
      offplan: "Off-plan",
    },
    realEstatePage: {
      metaTitle: "Недвижимость в Дубае",
      metaDescription:
        "Покупка недвижимости в Дубае с BIZBUYUK: off-plan и готовые объекты, от студий до вилл и branded residences, в семнадцати районах. 0% комиссии для покупателя.",
      home: "Главная",
      current: "Недвижимость",
      hero: {
        eyebrow: "Недвижимость",
        title: "Любой тип объекта по всему Дубаю.",
        sub: "Мы не продаём один дом в одном районе. Начинаем с вашего бюджета, цели и горизонта, а затем собираем короткий список того, что действительно подходит.",
        cta: "Получить консультацию",
        ctaAlt: "Смотреть районы",
      },
      stats: [
        { value: "17", label: "Районов в работе" },
        { value: "0%", label: "Комиссия для покупателя" },
        { value: "2", label: "Способа купить: off-plan или готовое" },
      ],
      types: {
        title: "Что можно купить",
        lead: "Тип объекта зависит от того, покупаете вы для жизни, для сдачи или для удержания. Вот варианты, с которыми мы работаем, и для чего обычно выбирают каждый.",
        groups: [
          {
            title: "По размеру",
            items: [
              { title: "Студия", body: "Самый низкий вход и самая высокая доходность на вложенный дирхам. Популярна у операторов краткосрочной аренды и одиночных арендаторов." },
              { title: "1 спальня", body: "Самый ёмкий рынок аренды в Дубае. Легко сдаётся, легко перепродаётся." },
              { title: "2 спальни", body: "Уровень, с которого начинают смотреть пары и небольшие семьи. Сдаётся медленнее, чем 1BR, но сроки аренды длиннее." },
              { title: "3 спальни и больше", body: "Семейный формат. Арендаторов меньше, но живут годами, что снижает простой и издержки на смену жильцов." },
              { title: "Пентхаус", body: "Верхние этажи с собственными террасами. Узкий рынок, где решают вид и отделка, а не доходность." },
            ],
          },
          {
            title: "По формату",
            items: [
              { title: "Квартира", body: "Башни и среднеэтажная застройка. Service charge закрывает здание, поэтому владение почти не требует участия." },
              { title: "Вилла", body: "Отдельный дом с участком. Выше вход и выше обслуживание, но лучший рост стоимости в семейных комьюнити." },
              { title: "Таунхаус", body: "Планировка виллы за бюджет квартиры. Обычный компромисс для семей, которым нужно пространство без участка." },
            ],
          },
          {
            title: "По сегменту",
            items: [
              { title: "Luxury", body: "Премиальные адреса, большие площади и покупатели, для которых вид и соседи важнее доходности." },
              { title: "Branded residence", body: "Под управлением отельного или модного бренда. Выше цена за квадратный фут и, как правило, премия в аренде." },
              { title: "Инвестиционный объект", body: "Выбирается по цифрам: доходность, service charge, спрос арендаторов и то, насколько легко объект продать." },
            ],
          },
        ],
      },
      paths: {
        title: "Два способа купить",
        lead: "Почти всё решение сводится к этому: платить в рассрочку, пока объект строится, или купить то, что существует сегодня.",
        offplan: {
          title: "Off-plan",
          body: "Покупка у застройщика до или во время строительства. Стартовая цена, рассрочка на период стройки, часто платежи после передачи. Вы ждёте и берёте на себя строительный риск.",
          cta: "Как работает off-plan",
        },
        ready: {
          title: "Готовая недвижимость",
          body: "Покупка у текущего собственника. Можно посмотреть конкретный юнит, проверить здание и сдать его через месяц после перерегистрации. Цена сегодняшняя, обычно оплата целиком.",
          cta: "Как покупают готовое",
        },
      },
      districts: {
        title: "Где мы работаем",
        lead: "Семнадцать районов, у каждого своя причина купить именно там. Отфильтруйте по зрелости района и спросите, какие проекты открыты прямо сейчас.",
        filters: {
          all: "Все районы",
          established: "Сложившиеся",
          prestige: "Премиальные",
          emerging: "Развивающиеся",
        },
        typesLabel: "Что здесь есть",
        note: "Мы работаем и в районах, которых нет в этом списке. Если у вас есть конкретный на примете, спросите.",
        ask: "Спросить про район",
      },
      why: {
        title: "Как мы работаем",
        cards: [
          { title: "0% комиссии с вас", body: "На сделках с застройщиком наше вознаграждение платит застройщик, а не добавляется к вашей цене." },
          { title: "Шорт-лист, а не каталог", body: "Два-три объекта под ваш запрос, у каждого расчёт за спиной." },
          { title: "Весь рынок", body: "Мы не привязаны к одному застройщику, поэтому список собран по существу." },
          { title: "Сначала цифры", body: "Доходность, service charge, график платежей и выход обсуждаются до решения." },
          { title: "Проверка до подписи", body: "Застройщик, статус проекта, escrow и договор проверяются заранее." },
          { title: "После покупки", body: "Меблировка, арендаторы, управление и перепродажа, когда это понадобится." },
        ],
      },
      cta: {
        title: "Назовите бюджет и цель.",
        body: "Этого достаточно для старта. Мы вернёмся с двумя-тремя подходящими объектами и обоснованием по каждому.",
      },
      offplan: {
        metaTitle: "Off-plan недвижимость в Дубае",
        metaDescription:
          "Как работает покупка off-plan в Дубае: рассрочка, первоначальный взнос, платежи после передачи, проверка застройщика и escrow, весь процесс до handover.",
        current: "Off-plan",
        hero: {
          eyebrow: "Off-plan",
          title: "Купить на старте, платить по мере стройки.",
          sub: "Off-plan — самый доступный вход в новый проект Дубая и одновременно самый сложный по механике. Разбираем, как это устроено.",
          cta: "Обсудить покупку off-plan",
        },
        what: {
          title: "Что такое off-plan на практике",
          lead: "Вы покупаете юнит, которого ещё нет, напрямую у застройщика, по договору, который фиксирует и цену, и график строительства.",
          points: [
            { title: "Стартовая цена", body: "Первая очередь проекта обычно самая дешёвая. Последующие фазы стоят дороже по мере спроса." },
            { title: "Рассрочка на период стройки", body: "Вы платите частями, привязанными к этапам строительства, а не всю сумму сразу." },
            { title: "Рост стоимости", body: "Если район и проект показывают себя, к передаче юнит может стоить дороже, чем по договору. Может и не стоить." },
            { title: "Строительный риск", body: "Сроки сдачи сдвигаются. Защищают вас договор, escrow-счёт и история застройщика." },
          ],
        },
        payment: {
          title: "Из чего состоит рассрочка",
          lead: "Почти любой план — вариация этих четырёх частей. Именно их соотношение отличает комфортную покупку от натянутой.",
          plans: [
            { title: "Первоначальный взнос", body: "Платится при бронировании, вместе с подписанием резервации. Именно эта цифра решает, доступен ли проект." },
            { title: "В период строительства", body: "Платежи по этапам стройки или по фиксированным датам, вплоть до завершения." },
            { title: "При передаче", body: "Остаток, который вносится, когда объект готов и выдаются ключи." },
            { title: "После передачи", body: "Часть застройщиков позволяет продолжать платить уже с ключами на руках, чтобы аренда помогала закрывать платежи." },
          ],
          note: "Планы отличаются по застройщикам и проектам и меняются между фазами. Мы сравниваем те планы, что реально открыты на момент вашей покупки.",
        },
        process: {
          title: "Процесс от начала до конца",
          lead: "Восемь этапов. В первых пяти участвуете вы, остальное ведём мы.",
          steps: [
            { n: "01", title: "Консультация", lead: "Бюджет, цель, горизонт.", body: "Определяем, что объект должен вам давать и какую сумму вы готовы вносить ежегодно." },
            { n: "02", title: "Выбор типа объекта", lead: "Тип, площадь, район.", body: "Сужаем до типа недвижимости и районов, которые отвечают запросу, остальное отсекаем." },
            { n: "03", title: "Выбор проекта", lead: "Застройщик и фаза.", body: "Сравниваем открытые проекты по цене, рассрочке, истории сдачи и тому, что вытягивает район." },
            { n: "04", title: "Бронирование", lead: "Юнит резервируется.", body: "Форма резервации и booking-платёж. Юнит снимается с продажи на ваше имя." },
            { n: "05", title: "SPA", lead: "Подписание договора.", body: "Разбираем договор купли-продажи вместе с вами до подписи: сроки, штрафы и что будет, если одна из сторон нарушит условия." },
            { n: "06", title: "Регистрация", lead: "Oqood в DLD.", body: "Покупка регистрируется в Dubai Land Department, ваше право фиксируется." },
            { n: "07", title: "Строительство", lead: "Платежи и прогресс.", body: "Следим за этапами и требованиями по платежам, чтобы ничего не пропустить и не поймать штраф." },
            { n: "08", title: "Передача", lead: "Ключи и приёмка.", body: "Осмотр, список замечаний, финальный платёж и title deed. Дальше можем меблировать или сдать." },
          ],
        },
        checks: {
          title: "Что проверяем до вашего решения",
          items: [
            "Историю сдачи объектов застройщиком по прошлым проектам",
            "Регистрацию и статус проекта в RERA",
            "Что платежи идут на escrow-счёт проекта",
            "Что график платежей в договоре совпадает с тем, что вам показали",
            "Сроки передачи, штрафные условия и порядок расторжения",
            "Что район реально вытягивает по аренде и перепродаже",
          ],
        },
        cta: {
          title: "Какие проекты открыты прямо сейчас?",
          body: "Стартовые фазы открываются и закрываются быстро. Назовите бюджет, и мы пришлём то, что действительно доступно на этой неделе.",
        },
      },
      ready: {
        metaTitle: "Готовая недвижимость в Дубае",
        metaDescription:
          "Покупка готовой недвижимости в Дубае: поиск, просмотры, переговоры, проверка документов, перерегистрация в Dubai Land Department и передача объекта.",
        current: "Готовая недвижимость",
        hero: {
          eyebrow: "Готовая недвижимость",
          title: "Посмотреть, проверить и купить.",
          sub: "Готовый юнит, по которому можно пройти, который можно осмотреть и сдать через месяц после перерегистрации. Без строительного риска и без ожидания.",
          cta: "Обсудить покупку готового",
        },
        what: {
          title: "Почему выбирают готовое",
          lead: "На бумаге off-plan дешевле. Готовое — определённее.",
          points: [
            { title: "Вы видите конкретный юнит", body: "Вид, этаж, отделка и соседи — это факты, а не рендеры." },
            { title: "Доход с первого месяца", body: "Объект можно сдавать сразу после перерегистрации, актив начинает работать немедленно." },
            { title: "У здания есть история", body: "Service charge, качество управления и история аренды видны ещё до покупки." },
            { title: "Нет строительного риска", body: "Нет срока сдачи, который может сдвинуться, и нет стройки, за которой нужно следить." },
          ],
        },
        process: {
          title: "Процесс от начала до конца",
          lead: "Девять этапов от первого брифа до ключей.",
          steps: [
            { n: "01", title: "Поиск", lead: "Бриф превращается в список.", body: "Прорабатываем рынок по бюджету, району и типу объекта, включая юниты вне открытых площадок." },
            { n: "02", title: "Шорт-лист", lead: "Два-три, а не тридцать.", body: "Сокращаем список до того, что действительно подходит, и объясняем, почему остальное отпало." },
            { n: "03", title: "Анализ", lead: "Цифры по каждому юниту.", body: "Цена продавца против реальных сделок, service charge, достижимая аренда и чистая доходность." },
            { n: "04", title: "Просмотр", lead: "Лично или по видео.", body: "Проходим юнит и здание вместе с вами или снимаем всё подробно, если вы за границей." },
            { n: "05", title: "Переговоры", lead: "Цена и условия.", body: "Ведём переговоры на вашей стороне: цена, что остаётся в юните и сроки перерегистрации." },
            { n: "06", title: "Проверка документов", lead: "До любых платежей.", body: "Title deed, история service charge, непогашенная ипотека, позиция по NOC и любые ограничения на юните." },
            { n: "07", title: "Сделка", lead: "MOU и депозит.", body: "Подписывается меморандум, депозит размещается по стандартным правилам защиты сторон." },
            { n: "08", title: "Регистрация", lead: "Перерегистрация в DLD.", body: "NOC застройщика, затем перерегистрация в Dubai Land Department и title deed на ваше имя." },
            { n: "09", title: "Передача", lead: "Ключи и коммунальные.", body: "Ключи, карты доступа, переоформление DEWA и охлаждения. Дальше можем меблировать или найти арендатора." },
          ],
        },
        checks: {
          title: "Что проверяем по объекту",
          items: [
            "Title deed и что продавец действительно зарегистрированный собственник",
            "Есть ли на объекте ипотека и как она будет закрыта",
            "Историю service charge и нет ли задолженности",
            "Как здание управляется и обслуживается",
            "Реальные цены сделок в этом же здании, а не цены предложений",
            "Историю аренды и что юнит реально показывает",
          ],
        },
        cta: {
          title: "Ищете что-то готовое?",
          body: "Назовите район и бюджет. Мы вернёмся с тем, что есть на рынке, и с тем, сколько это стоит на самом деле.",
        },
      },
    },
  },
  uz: {
    nav: { realEstate: "Koʻchmas mulk", services: "Xizmatlar", renovation: "Taʼmir", it: "Texnologiyalar", team: "Jamoa", partners: "Quruvchilar", why: "Nega biz", contact: "Aloqa", cta: "Konsultatsiya", news: "Yangiliklar" },
    teamPage: {
      metaTitle: "Dubaydagi jamoamiz",
      metaDescription:
        "BIZBUYUK Real Estate Dubay jamoasi. Yetti broker va direktor rus, ingliz, o\u02bbzbek, qozoq, tojik, ozarbayjon, arab va xitoy tillarida gaplashadi.",
      eyebrow: "Jamoa",
      titleA: "Siz bilan",
      titleEm: "o\u02bbz tilingizda gaplashamiz",
      lead: "BIZBUYUK\u02bcning Dubay ofisi. O\u02bbzingizga qulay tilni tanlang va kim siz bilan aloqada bo\u02bblishini ko\u02bbring.",
      bandLabel: "Gaplashamiz",
      hint: "Tilni tanlang",
      reset: "Tozalash",
      peopleWord: "kishi",
      waIntro: "Assalomu alaykum! BIZBUYUK saytidaman, {name} bilan bog\u02bblanmoqchiman.",
      langs: {
        ru: "Rus", en: "Ingliz", uz: "O\u02bbzbek", kz: "Qozoq", tj: "Tojik",
        az: "Ozarbayjon", ar: "Arab", zh: "Xitoy", af: "Afrika tillari",
      },
      langsShort: { af: "Afrika" },
      ctaTitle: "Kimga murojaat qilishni bilmayapsizmi?",
      ctaBody: "Bizga yozing, o\u02bbz tilingizda gaplashadigan va sizga kerakli yo\u02bbnalishni yurituvchi hamkasbni tanlab beramiz.",
      ctaButton: "Konsultatsiya olish",
      trustedBroker: "Ishonchli broker",
    },
    hero: {
      eyebrow: "BAA · Koʻchmas mulk · 2020 yildan",
      titleA: "BAA koʻchmas mulk bozoridagi",
      titleEm: "ishonchli",
      titleB: "hamkoringiz.",
      sub: "BAAning yetakchi quruvchilaridan off-plan startlar, investitsiyalar himoyasi va BAAda yashashga qadar boʻlgan toʻliq yoʻl. Boshidan oxirigacha hamrohlik qilamiz.",
      cta: "Konsultatsiya olish",
      ctaAlt: "Xizmatlarimiz",
      scroll: "Pastga",
    },
    marqueeIntro: "BAAni quradigan kompaniyalar bizga ishonadi",
    whatsappFab: { aria: "WhatsApp orqali yozish", prefill: "Assalomu alaykum, BIZBUYUK! Savolim bor." },
    trust: {
      eyebrow: "Raqamlarda",
      lead: {
        value: "200 000+",
        label: "mijoz",
        note: "2020 yildan buyon konsultatsiya va yakunlangan bitimlar.",
      },
      items: [
        { value: "50 000+", label: "Yakunlangan bitim" },
        { value: "AED 10B+", label: "Portfel hajmi" },
        { value: "7", label: "Emirat" },
        { value: "50+", label: "Jamoa mutaxassisi" },
        { value: "10", label: "Ish tili" },
      ],
    },
    services: {
      eyebrow: "Nima bilan shugʻullanamiz",
      title: "BAAda oʻz zimmamizga oladigan hamma narsa",
      items: [
        {
          tag: "01",
          title: "Koʻchmas mulk",
          body: "BAAning yirik quruvchilaridan off-plan startlar va tayyor obyektlar. Tanlash, muzokara va bitim: xaridor uchun 0% komissiya.",
        },
        {
          tag: "02",
          title: "Investitsiya himoyasi",
          body: "Quruvchi va loyihani tekshirish, escrow va toʻlov jadvali, shartnoma tahlili va Dubai Land Department'da roʻyxat.",
        },
        {
          tag: "03",
          title: "Turizm va koʻchish",
          body: "BAAga safar, yashash yoki koʻchib oʻtish: rezident vizasi, Emirates ID, bank, maktab va joylashuv.",
        },
        {
          tag: "04",
          title: "Koʻchmas mulk boshqaruvi",
          body: "Xariddan soʻng: ijarachi topish, toʻlovlarni yigʻish, obyektga xizmat koʻrsatish va foydali paytda qayta sotish.",
        },
        {
          tag: "05",
          title: "Kalit topshirish taʼmiri",
          body: "Boʻsh xonadondan tayyor uygacha: dizayn, 3D render, toʻliq taʼmir, mebel va yakuniy oʻrnatish.",
        },
        {
          tag: "06",
          title: "Texnologiyalar",
          body: "BIZBUYUK GROUP'ning texnologik yoʻnalishi: veb va mobil mahsulotlar, biznes tizimlari va AI — dunyoning istalgan nuqtasidagi mijozlar uchun.",
        },
      ],
    },
    stats: {
      eyebrow: "Nega BAA",
      title: "Investorlar uchun yaratilgan bozor",
      items: [
        { value: "11%", label: "Yiliga oʻrtacha narx oʻsishi" },
        { value: "12%", label: "Oʻrtacha ijara daromadi" },
        { value: "0%", label: "Mulk va daromad soligʻi" },
      ],
    },
    why: {
      about: {
        eyebrow: "Biz haqimizda",
        title: "BIZBUYUK Real Estate'ga xush kelibsiz",
        body: "2020 yilda tashkil etilgan agentligimiz missiyasi: professionallik, axloq va sifatning eng yuqori standartlari bilan jahon darajasidagi brokerlik xizmatlarini koʻrsatish. Chuqur oʻzaro ishonchga tayanib, mintaqadagi eng qadrli agentlikka aylanishni maqsad qilganmiz.",
      },
      eyebrow: "Nega biz",
      cards: [
        { title: "Bozor mutaxassislari", body: "Bozor tendensiyalarini kuzatadigan va tumanlarni yaxshi biladigan tahlilchilar jamoasi mijozlar uchun eng yaxshi imkoniyatlarni topadi." },
        { title: "Toʻgʻridan-toʻgʻri kirish", body: "Premium lokatsiyalardagi obyektlarga sotuvchilardan toʻgʻridan-toʻgʻri kirish va har qanday byudjetga mos off-plan yechimlar." },
        { title: "Muammosiz bitim", body: "Shaffof va muammosiz sotib olish jarayoni hisobiga yuqori investitsiya daromadi." },
        { title: "Toʻliq xizmatlar spektri", body: "Ambitsiyali va kreativ agentlik: BAAning asosiy tumanlarida turar-joy va tijorat mulkini sotib olish, sotish va ijaraga berish." },
      ],
    },
    partners: { eyebrow: "Bizning quruvchilar", title: "BAAdagi barcha loyihalar bilan ishlaymiz" },
    testimonials: {
      eyebrow: "Ularning oʻz soʻzlari",
      title: "Mijozlar nima deydi",
      lead: "Tahrirsiz, original tilida.",
      allLabel: "Barchasi",
      ratingSuffix: "/5",
      writeReview: "Fikr qoldirish",
      form: {
        title: "Fikr qoldirish",
        name: "Ismingiz",
        city: "Shahringiz",
        country: "Mamlakatingiz",
        language: "Yozayotgan tilingiz",
        service: "Qaysi xizmat boʻyicha?",
        rating: "Baho",
        quote: "Fikringiz",
        quotePlaceholder: "Nima yaxshi ketdi — yoki yaxshi ketmadi?",
        submit: "Fikrni yuborish",
        submitting: "Yuborilmoqda…",
        success: "Rahmat. Jamoamiz fikringizni sayt uchun tekshiradi.",
        error: "Nimadir xato ketdi. Qayta urinib koʻring.",
        note: "Fikrlar saytda chop etilishidan oldin tekshiriladi.",
        close: "Yopish",
      },
    },
    lead: {
      eyebrow: "Bepul konsultatsiya",
      title: "Ariza qoldiring, biz bogʻlanamiz",
      sub: "Aloqa maʼlumotlaringizni qoldiring, katta konsultant bir ish kuni ichida bogʻlanadi.",
      name: "Ismingiz",
      phone: "Telefon raqami",
      email: "Email",
      emailHint: "Faqat ism kifoya, «@gmail.com» oʻzi qoʻshiladi.",
      contactPref: "Qulay aloqa usuli",
      contactCall: "Qoʻngʻiroq",
      contactWhatsApp: "WhatsApp",
      contactTelegram: "Telegram",
      contactEmail: "Email",
      submit: "Yuborish",
      sending: "Yuborilmoqda…",
      success: "Rahmat, tez orada bogʻlanamiz.",
      error: "Nimadir xato ketdi. Qayta urinib koʻring yoki bizga qoʻngʻiroq qiling.",
      consent: "Formani yuborish orqali soʻrovingiz yuzasidan siz bilan bogʻlanishga rozilik bildirasiz.",
    },
    footer: {
      blurb: "BAAdagi ambitsiyali va kreativ koʻchmas mulk agentligi: barcha Amirliklar boʻylab turar-joy va tijorat mulkini sotib olish, sotish va ijaraga berish.",
      licenceNote: "Litsenziyalangan koʻchmas mulk agentligi. Jamoamizdagi har bir broker oʻzining shaxsiy RERA litsenziyasiga ega — brokeringizdan soʻrang.",
      address: "Manzil",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, BAA.",
      offices: "Ofislar",
      contact: "Aloqa",
      follow: "Ijtimoiy tarmoqlar",
      rights: "Barcha huquqlar himoyalangan.",
      nav: "Navigatsiya",
    },
    legal: {
      privacyLabel: "Maxfiylik siyosati",
      termsLabel: "Foydalanish shartlari",
      page: {
        eyebrow: "Huquqiy maʼlumot",
        updated: "Yangilangan: 2026-yil sentyabr",
        languageNote: "Bu sahifa ingliz tilida taqdim etilgan — bu hujjatning yuridik kuchga ega tili shu. Rus yoki oʻzbek tilida yozing, biz sizga oʻz tilingizda har qanday savol boʻyicha javob beramiz.",
      },
      privacy: { title: "Maxfiylik siyosati" },
      terms: { title: "Foydalanish shartlari" },
    },
    newsPage: {
      metaTitle: "Yangiliklar",
      metaDescription: "BIZBUYUK Real Estate va BIZBUYUK GROUP yangiliklari.",
      home: "Bosh sahifa",
      current: "Yangiliklar",
      eyebrow: "Yangilanishlar",
      title: "BIZBUYUK yangiliklari",
      lead: "Biz nima ustida ishlayotganimiz va nimalarni joriy qilayotganimiz.",
      empty: "Hozircha yangiliklar yoʻq — keyinroq qayta tekshiring.",
      readMore: "Batafsil",
      back: "Barcha yangiliklar",
    },
    servicesPage: {
      metaTitle: "Xizmatlar",
      metaDescription:
        "Obyekt tanlashdan BAAda yashashgacha: koʻchmas mulk, investitsiya himoyasi, koʻchish va mulk boshqaruvi.",
      home: "Bosh sahifa",
      current: "Xizmatlar",
      eyebrow: "Nima bilan shugʻullanamiz",
      title: "Bizning xizmatlar",
      sub: "Obyekt tanlashdan BAAda yashashgacha: har bir bosqichda yoningizdamiz.",
      ctaPrimary: "Konsultatsiya olish",
      ctaSecondary: "WhatsApp orqali soʻrash",
      stats: [
        { value: "7", label: "Amirlik qamrovi" },
        { value: "5", label: "Xizmat yoʻnalishi" },
        { value: "23", label: "Ichki xizmat" },
        { value: "4", label: "Til: UZ / RU / EN / AR" },
      ],
      blocks: [
        {
          id: "real-estate",
          nav: "Koʻchmas mulk",
          title: "Tanlash va sotib olish",
          intro:
            "BAAning yetakchi quruvchilaridan obyekt tanlaymiz. Xaridor uchun komissiya 0%: bizning haqimizni siz emas, quruvchi toʻlaydi.",
          items: [
            { title: "Quruvchidan off-plan", body: "Developer bilan toʻgʻridan-toʻgʻri shartnoma: start narxi, boʻlib toʻlash va post-handover, vositachi ustamasisiz." },
            { title: "Tayyor koʻchmas mulk", body: "Ikkilamchi bozor: obyektni koʻrish, ijaraga berish va bitimdan soʻng darhol daromad olish mumkin." },
            { title: "Investitsion tahlil", body: "ROI va rental yield hisobi: service charge, boshqaruv haqi va ijarachilar orasidagi boʻsh davr hisobga olinadi." },
            { title: "2-3 obyektdan shortlist", body: "Butun katalog emas, balki byudjetingiz, maqsadingiz va egalik muddatingizga mos qisqa roʻyxat." },
            { title: "Bronlash va SPA", body: "Yunitni rezervatsiya qilish, shartnoma shartlarini tahlil qilish va imzolashda hamrohlik." },
          ],
        },
        {
          id: "protection",
          nav: "Investitsiya himoyasi",
          title: "Investitsiya himoyasi",
          intro:
            "Bitimning har bir bosqichida kapitalingizni yuridik himoya qilish. Odatda juda kech tekshiriladigan narsalarni tekshiramiz.",
          items: [
            { title: "Quruvchining due diligence'i", body: "Loyihalarni topshirish tarixi, moliyaviy barqarorlik va loyihaning RERA reyestridagi holati." },
            { title: "Escrow hisob va toʻlov jadvali", body: "Pul loyihaning escrow hisobiga tushishini va jadval shartnomaga mos kelishini tekshiramiz." },
            { title: "Imzolashdan oldin SPA tekshiruvi", body: "Topshirish muddatlari, jarimalar, bekor qilish shartlari va obyektni topshirish tartibi." },
            { title: "Oqood va Title Deed", body: "Dubai Land Department'da huquqni roʻyxatdan oʻtkazish va hujjat muddatlarini nazorat qilish." },
            { title: "Nizoli vaziyatlar", body: "Quruvchi topshirishni kechiktirsa yoki shartnoma shartlarini buzsa, hamrohlik qilamiz." },
          ],
        },
        {
          id: "relocation",
          nav: "Turizm va koʻchish",
          title: "Turizm va koʻchish",
          intro: "Birinchi tashrifdan BAAdagi toʻliq hayotgacha.",
          items: [
            { title: "Tanishtiruv turi", body: "Tashrif dasturi: obyektlarni koʻrish, quruvchilar bilan uchrashuv, transfer va joylashuv." },
            { title: "Rezident vizasi", body: "Vizani rasmiylashtirish, shu jumladan investitsiya amaldagi chegaradan oshsa Golden Visa." },
            { title: "Bank va Emirates ID", body: "BAA bankida hisob ochish va rezident guvohnomasini olish." },
            { title: "Maktab va tuman", body: "Oila soʻroviga mos maktab yoki bogʻcha hamda yashash tumanini tanlash." },
            { title: "Moslashuv", body: "Tibbiy sugʻurta, kommunal xizmatlar, transport va mobil aloqa." },
          ],
        },
        {
          id: "management",
          nav: "Boshqaruv",
          title: "Koʻchmas mulk boshqaruvi",
          intro:
            "Xarid hujjatlarni imzolash bilan tugamaydi. Bitimdan soʻng obyektni tayyorlash, ijaraga berish va xizmat koʻrsatish kerak.",
          items: [
            { title: "Ijarachi topish", body: "Uzoq va qisqa muddatli ijara, ijarachini tekshirish, shartnoma va Ejari roʻyxati." },
            { title: "Obyektni boshqarish", body: "Boshqaruv kompaniyasi bilan ishlash, yunitga xizmat koʻrsatish va ijara toʻlovlarini yigʻish." },
            { title: "Taʼmir va mebel", body: "Obyektni ijaraga tayyorlash: pardoz, mebel, texnika va eʼlon uchun fotosurat." },
            { title: "Qayta sotish", body: "Resale va assignment: foydali boʻlgan paytda investitsiyadan chiqishga yordam beramiz." },
          ],
        },
        {
          id: "legal",
          nav: "Yuridik xizmat",
          title: "Yuridik va konsalting yordami",
          intro:
            "BAAdan tashqarida ham ishlaydigan yuridik va konsalting yoʻnalishi: kompaniya ochish, viza rasmiylashtirish va BRICS mamlakatlaridagi yuristlar tarmogʻi — bitimingizni yuritayotgan jamoaning oʻzi.",
          items: [
            { title: "Xalqaro yuridik tarmoq", body: "BRICS mamlakatlaridagi hamkor yuristlar, yagona aloqa nuqtasi orqali — BAAdan tashqariga chiqadigan masalalar uchun." },
            { title: "Kompaniya ochish", body: "Mainland, free zone yoki offshore: strukturani va litsenziyani shunday tuzamizki, faqat roʻyxatdan oʻtish bilan emas, real ishlash bilan yakunlanadi." },
            { title: "Viza rasmiylashtirish", body: "Vizaning oʻzi uchun aniq muddat: hujjatlar toʻliq boʻlgach 7 ish kuni. Bogʻliq masalalar konsultatsiyada koʻrib chiqiladi, oldindan vaʼda berilmaydi." },
            { title: "Komissiya va mulk boshqaruvi", body: "Sotish, ijaraga berish yoki boshqaruvga topshirish: narx obyekt va vaziyatga qarab aytiladi, belgilangan tarif sifatida eʼlon qilinmaydi." },
          ],
        },
      ],
      process: {
        title: "Bu qanday kechadi",
        body: "Birinchi suhbatdan mulk huquqini roʻyxatdan oʻtkazishgacha besh qadam. Odatda ikki haftadan boshlanadi.",
        steps: [
          { title: "Brif", body: "Byudjet, maqsad, muddat va qulay toʻlov usuli." },
          { title: "Shortlist", body: "Har biri boʻyicha daromad hisobi bilan 2-3 obyekt." },
          { title: "Koʻrish", body: "Obyekt boʻyicha video-tur yoki BAAga tashrif." },
          { title: "Bronlash", body: "Yunitni rezervatsiya qilish va imzolashdan oldin SPA tekshiruvi." },
          { title: "Bitim", body: "Imzolash, toʻlov va Dubai Land Department'da roʻyxatdan oʻtkazish." },
        ],
      },
      trust: {
        title: "Bu amalda nimani anglatadi",
        items: [
          "BAAda roʻyxatdan oʻtgan brokerlik kompaniyasi sifatida ishlaymiz",
          "Har bir bitim Dubai Land Department'da roʻyxatdan oʻtadi",
          "Xaridor mablagʻi loyihaning escrow hisobiga tushadi",
          "Shartnomani yurist siz imzolagandan keyin emas, oldin tekshiradi",
        ],
      },
      visaNote:
        "Rezident vizalari shartlari va Golden Visa uchun investitsiya chegarasi vaqti-vaqti bilan oʻzgaradi. Amaldagi talablarni bitim sanasida tekshiramiz.",
      legalNote:
        "Broker va hamkorlar uchun shartlar ham har bir holatda alohida kelishiladi. Kim bilan ishlayotganingizni ayting — hamkorlik uchun eng yaxshi shartlarni tasdiqlaymiz.",
      askLabel: "Ushbu boʻlim boʻyicha savolingiz bormi?",
      askWhatsApp: "WhatsApp orqali soʻrash",
      also: {
        eyebrow: "Biz qiladigan ishning yana bir qismi",
        title: "Yana ikki yoʻnalish",
        renovation: {
          title: "Kalit topshirish taʼmiri",
          body: "Allaqachon sotib oldingizmi — shu yerda yoki boshqa joyda? Xonadonni boʻsh holatdan tayyorgacha olib boramiz: dizayn, renderlar, toʻliq taʼmir, mebel va kalit topshirish.",
          cta: "Taʼmirni koʻrish",
        },
        it: {
          title: "Texnologiyalar",
          body: "BIZBUYUK GROUP'ning texnologik yoʻnalishi — veb va mobil mahsulotlar, biznes tizimlari va AI, dunyoning istalgan nuqtasidagi mijozlar uchun.",
          cta: "Texnologik xizmatlarni koʻrish",
        },
      },
      cta: {
        title: "Qaysi xizmat aynan sizga kerakligini bilmayapsizmi?",
        body: "Vaziyatingizni ikki gapda yozing. Nimadan boshlash va har bir qadamda nima kerakligini aytamiz.",
      },
    },
    calculatorsPage: {
      metaTitle: "Kalkulyatorlar",
      metaDescription: "Ijara daromadini, to'lov rejasi yoki ipotekani va BAAga ko'chishning to'liq xarajatini hisoblang — aniq raqamlarni BIZBUYUK konsultanti tasdiqlaydi.",
      home: "Bosh sahifa",
      current: "Kalkulyatorlar",
      eyebrow: "Raqamlarni hisoblang",
      title: "Kalkulyatorlar",
      sub: "Har bir xaridor va ko'chib keluvchi so'raydigan uchta savol bo'yicha tezkor baho. Tayanish mumkin bo'lgan aniq raqamni konsultant sizning holatingiz bo'yicha tasdiqlaydi.",
      disclaimer: "Bu faqat rejalashtirish uchun baho. Stavkalar, yig'imlar va davlat to'lovlari o'zgarib turadi — sizning holatingiz bo'yicha amaldagi raqamlarni konsultatsiyada aniqlashtiramiz.",
      cards: [
        { slug: "rental-yield", title: "Ijara daromadi", body: "Xizmat haqi va bo'sh turishni hisobga olganda obyekt qancha daromad berishi mumkinligi.", cta: "Daromadni hisoblash" },
        { slug: "payment-plan", title: "To'lov rejasi va ipoteka", body: "Quruvchidan to'lov jadvali yoki ipoteka bo'yicha oylik to'lov.", cta: "To'lovni hisoblash" },
        { slug: "relocation-cost", title: "Ko'chish xarajati", body: "Viza, Emirates ID, sug'urta va agar mulk sotib olsangiz — bitim xarajatlari.", cta: "Xarajatni baholash" },
      ],
      rentalYield: {
        metaTitle: "Ijara daromadi kalkulyatori",
        metaDescription: "BAAdagi mulkning yalpi va sof ijara daromadini xizmat haqi va bo'sh turishni hisobga olib hisoblang.",
        nav: "Ijara daromadi",
        eyebrow: "Ijara daromadi kalkulyatori",
        title: "Bu obyekt qancha daromad berishi mumkin?",
        sub: "Sotib olish narxi va kutilayotgan ijarani kiriting. Haqiqiy sof raqamni ko'rsatish uchun xizmat haqi va ijarachilar orasidagi bo'sh turish faraz qilingan foizni hisobga olamiz.",
        priceLabel: "Sotib olish narxi, AED",
        rentLabel: "Kutilayotgan yillik ijara, AED",
        serviceChargeLabel: "Yillik xizmat haqi, AED",
        vacancyLabel: "Bo'sh turish farazi, %",
        grossLabel: "Yalpi daromad",
        netLabel: "Sof daromad",
        resultNote: "Sof daromad faqat bo'sh turish va xizmat haqini hisobga oladi. Moliyalashtirish xarajatlari bunga kirmaydi — ularni to'lov rejasi va ipoteka kalkulyatori hisoblaydi.",
      },
      paymentPlan: {
        metaTitle: "To'lov rejasi va ipoteka kalkulyatori",
        metaDescription: "Quruvchining off-plan to'lov jadvalini yoki BAAdagi standart ipotekani, rezident va norezidentlar uchun tayyor shartlar bilan modellashtiring.",
        nav: "To'lov rejasi",
        eyebrow: "To'lov rejasi va ipoteka kalkulyatori",
        title: "Qanday to'laysiz?",
        sub: "To'lovning ikki yo'li: quruvchidan rassrochka yoki bank ipotekasi. Solishtirish uchun ular orasida almashtiring.",
        modeOffplan: "Quruvchi to'lov rejasi",
        modeMortgage: "Ipoteka",
        priceLabel: "Obyekt narxi, AED",
        stageDown: "Boshlang'ich to'lov, %",
        stageDuring: "Qurilish jarayonida, %",
        stageHandover: "Topshirishda, %",
        stagePost: "Topshirilgandan keyin, %",
        postMonthsLabel: "Topshirilgandan keyingi muddat, oy",
        stageSumError: "To'rtta bosqich jami 100% bo'lishi kerak.",
        offplanNote: "Bu namunaviy jadval, aniq quruvchining shartlari emas. Rejalar quruvchi va loyihaga qarab farq qiladi va sotuv bosqichlari orasida o'zgaradi — xarid vaqtingizdagi amaldagi rejalarni solishtiramiz.",
        totalLabel: "Jami",
        perMonthLabel: "oyiga",
        rateLabel: "Stavka, yillik %",
        downPaymentLabel: "Boshlang'ich to'lov, %",
        termLabel: "Muddat, yil",
        monthlyLabel: "Oylik to'lov",
        totalInterestLabel: "Butun muddat uchun ustama",
        mortgageNote: "Ko'rsatilgan stavka va maksimal moliyalashtirish odatiy boshlang'ich shartlar, taklif emas. Haqiqiy stavka va tasdiqni bank hujjatlaringizni tekshirgandan keyin beradi.",
      },
      relocationCost: {
        metaTitle: "Ko'chish xarajati kalkulyatori",
        metaDescription: "BAAda mulk sotib olishning bir martalik davlat xarajatlari va Golden Visa shartlari.",
        nav: "Ko'chish xarajati",
        eyebrow: "Ko'chish xarajati kalkulyatori",
        title: "Sotib olish aslida qancha turadi?",
        sub: "Obyekt narxidan tashqari bir martalik davlat xarajatlari — va Golden Visa qanday olinadi.",
        buyingLabel: "Mulk sotib olmoqchimisiz?",
        buyingYes: "Ha",
        buyingNo: "Yo'q",
        priceLabel: "Obyekt narxi, AED",
        lineDldTransfer: "DLD ko'chirish yig'imi (4%)",
        lineDldAdmin: "DLD admin yig'imi",
        totalLabel: "Taxminiy jami",
        notBuyingNote: "Hali sotib olmayapsizmi? Obyekt tanlaganingizda shu hisob-kitob kerak bo'ladi — istalgan vaqt qaytib kelavering.",
        goldenVisaTitle: "Golden Visa",
        goldenVisaNote: "2,000,000 AED va undan yuqori mulk investitsiyasi BAA Golden Visa olish huquqini beradi. Rasmiylashtirishni to'liq o'zimiz bajaramiz.",
        goldenVisaCta: "Golden Visa haqida so'rash",
      },
      leadCapture: {
        title: "Aniq raqamlarni bilib oling",
        body: "Ushbu hisobni bizga yuboring — konsultant holatingiz bo'yicha real raqamlarni odatda bir ish kuni ichida tasdiqlaydi.",
        name: "Ismingiz",
        phone: "Telefon raqami",
        email: "Email",
        submit: "Hisobni yuborish",
        sending: "Yuborilmoqda…",
        success: "Qabul qilindi. Konsultant tez orada bog'lanadi.",
        error: "Xatolik yuz berdi. Qayta urinib ko'ring yoki WhatsApp orqali yozing.",
        consent: "Yuborish orqali so'rovingiz bo'yicha bog'lanishga rozilik bildirasiz.",
        whatsapp: "WhatsApp orqali so'rash",
      },
    },
    itPage: {
      metaTitle: "Texnologik xizmatlar",
      metaDescription:
        "BIZBUYUK GROUP'ning texnologik yoʻnalishi — veb va mobil mahsulotlar, biznes tizimlari, AI, cloud, xavfsizlik va maʼlumotlar, dunyoning istalgan nuqtasidagi mijozlar uchun.",
      home: "Bosh sahifa",
      current: "Texnologiyalar",
      hero: {
        eyebrow: "BIZBUYUK GROUP · Texnologiyalar",
        title: "Oʻz kompaniyamizni quradigan aynan shu standart.",
        sub: "Veb va mobil mahsulotlar, biznes tizimlari, AI, cloud, xavfsizlik va maʼlumotlar — BIZBUYUK'ning oʻz CRM'ini qurgan va ishlatayotgan jamoa tomonidan. Bitta hamkor, har qanday yoʻnalish, dunyoning istalgan nuqtasidagi mijozlar uchun.",
        ctaPrimary: "IT jamoasi bilan bogʻlanish",
        ctaSecondary: "Telegram orqali yozish",
      },
      proof: {
        eyebrow: "Taqdimot emas",
        title: "Biz oʻzimiz qurgan narsadan foydalanamiz",
        items: [
          {
            title: "BIZBUYUK CRM",
            body: "BIZBUYUK Real Estate'ning oʻz brokerlik faoliyati uchun lidlar, voronka, moliya, vazifalar va hisobot — ichkarida qurilgan, jamoa tomonidan har kuni ishlatiladi.",
            cta: "Demo koʻrishni soʻrash",
          },
          {
            title: "LaWEra CRM",
            body: "LaWEra yuridik amaliyoti uchun ish va mijozlarni boshqarish platformasi — murojaatlar, hujjatlar va hisob-kitob bitta tizimda.",
            cta: "Demo koʻrishni soʻrash",
          },
        ],
      },
      groupsIntro: {
        eyebrow: "Biz nima quramiz",
        title: "Oʻn ikki yoʻnalish, bitta jamoa",
        lead: "Loyihangiz qaysi yoʻnalishdan boshlanishini tanlang. Koʻpchilik loyihalar bir nechta yoʻnalishga tegishli boʻladi — bu haqda yozganingizdan keyin gaplashamiz.",
        viewLabel: "Xizmatlarni koʻrish",
      },
      process: {
        eyebrow: "Qanday ishlaydi",
        title: "WhatsApp xabaridan tayyor mahsulotgacha",
        steps: [
          { title: "Konsultatsiya", body: "Nimani hal qilish kerakligini ayting. Oldindan forma toʻldirish shart emas — shunchaki tasvirlab bering." },
          { title: "Baholash", body: "Buning uchun nima kerakligini qaytarib aytamiz: jamoa, muddat va toʻlov tuzilishi." },
          { title: "Qurish", body: "Ish qisqa davrlarda ketadi, erta va tez-tez koʻrsatiladigan natija bilan." },
          { title: "Qoʻllab-quvvatlash", body: "Ishga tushirish — yakun emas. Tuzatishlar, oʻsish va keyingi bosqich uchun aloqada qolamiz." },
        ],
      },
      cta: {
        title: "Loyihangiz bormi?",
        body: "Xabar yozib tasvirlab bering — ingliz, rus yoki oʻzbek tilida. IT jamoasi toʻgʻridan-toʻgʻri javob beradi, navbat yoʻq.",
        ctaPrimary: "IT jamoasiga WhatsApp yozish",
        ctaSecondary: "Telegram orqali yozish",
      },
      group: {
        backLabel: "Barcha yoʻnalishlar",
        servicesLabel: "Nimalar kiradi",
        servicesIntro: "Har biri qatʼiy paket emas, boshlangʻich nuqta — qaysi biri sizning ehtiyojingizga yaqinroq ekanini ayting, qolganini birga aniqlaymiz.",
        askLabel: "Soʻrash",
        askButton: "WhatsApp'da muhokama qilish",
        otherLabel: "Boshqa yoʻnalishlar",
        ctaTitle: "Loyihani muhokama qilishga tayyormisiz?",
        ctaBody: "IT jamoasiga loyiha haqida bir necha qator yozing — jamoa hajmi, taxminiy muddat, nimani hal qilish kerakligi.",
      },
    },
    renovationPage: {
      metaTitle: "Dubayda kalit topshirish taʼmiri",
      metaDescription:
        "BIZBUYUK Dubayda kalit topshirish taʼmirini bajaradi: dizayn-loyiha va 3D vizualizatsiya, toʻliq taʼmir, buyurtma mebel va yakuniy jihozlash. Bitta jamoa, bitta shartnoma, yashashga tayyor obyekt.",
      home: "Bosh sahifa",
      current: "Kalit topshirish taʼmiri",
      hero: {
        eyebrow: "Kalit topshirish taʼmiri",
        l1: "Sizning obyektingiz.",
        l2: "Bizning dizaynimiz.",
        l3: "Yashashga tayyor.",
        sub: "Boʻsh xonadondan toʻliq jihozlangan uygacha. Dizayn va taʼmirdan mebel va yakuniy oʻrnatishgacha butun jarayonni oʻz zimmamizga olamiz.",
        cta: "Bepul konsultatsiya",
        ctaAlt: "Loyihalarni koʻrish",
      },
      scope: {
        title: "Hammasi. Noldan yashashga tayyor holatgacha.",
        lead: "Oʻnlab pudratchini muvofiqlashtirish shart emas. Butun taʼmir bitta tom ostida, bitta jadval va bitta shartnoma boʻyicha boradi.",
        groups: [
          {
            title: "Dizayn va rejalashtirish",
            items: ["Interyer dizayni", "Arxitektura rejalashtirish", "3D vizualizatsiya"],
          },
          {
            title: "Qurilish ishlari",
            items: [
              "Toʻliq taʼmir",
              "Elektr ishlari",
              "Santexnika",
              "Pol qoplamalari",
              "Boʻyoq ishlari",
              "Shift va yoritish",
              "Oshxona",
              "Hammomlar",
              "Buyurtma duradgorlik",
              "Shkaflar",
            ],
          },
          {
            title: "Jihozlash va topshirish",
            items: [
              "Pardalar",
              "Mebel",
              "Dekor elementlari",
              "Maishiy texnika",
              "Yakuniy oʻrnatish",
              "Yakuniy tozalash",
            ],
          },
        ],
        closing: "Siz bizga kalitni berasiz. Biz sizga yashashga tayyor obyektni qaytaramiz.",
      },
      process: {
        eyebrow: "Bu qanday kechadi",
        title: "Olti bosqich, bitta jamoa",
        steps: [
          {
            n: "01",
            title: "Konsultatsiya",
            lead: "Obyektingiz, turmush tarzingiz va byudjetingizni oʻrganamiz.",
            body: "Obyektga boramiz, oʻlchov olamiz, undan qanday foydalanishingizni muhokama qilamiz va byudjet nimani qoplashi kerakligini belgilaymiz.",
          },
          {
            n: "02",
            title: "Dizayn",
            lead: "Xonadoningiz toʻliq dizayn konsepsiyasini oladi.",
            body: "Rejalar, materiallar, rang palitrasi va mebel joylashuvi: didingiz va obyektdan foydalanish usulingizga moslab ishlab chiqiladi.",
          },
          {
            n: "03",
            title: "3D vizualizatsiya",
            lead: "Taʼmir boshlanishidan oldin kelajakdagi uyingizni koʻrasiz.",
            body: "Har bir xonaning fotorealistik renderi. Siz natijani koʻrib tasdiqlamaguningizcha hech narsa buzilmaydi.",
          },
          {
            n: "04",
            title: "Taʼmir",
            lead: "Jamoa xonadonni oʻzgartiradi.",
            body: "Demontaj, elektr, santexnika, pardoz va duradgorlik: dizayn bilan kelishilgan jadval boʻyicha, jarayon hisoboti bilan.",
          },
          {
            n: "05",
            title: "Jihozlash",
            lead: "Har bir detalni jihozlaymiz.",
            body: "Mebel, yorugʻlik, pardalar, oshxona, shkaflar, texnika va dekor: xarid, yetkazib berish va oʻrnatish.",
          },
          {
            n: "06",
            title: "Koʻchib kirish",
            lead: "Obyekt tayyor.",
            body: "Yakuniy tekshiruv, chuqur tozalash va kalit topshirish. Sizga faqat chamadon olib kelish qoladi.",
          },
        ],
      },
      design: {
        title: "Turmush tarzingizga moslangan dizayn",
        lead: "Har bir obyekt boshqacha. Har bir mijoz boshqacha.",
        body: "Dizaynerlar konsepsiyani siz qanday yashashingiz, obyekt turi va investorlar uchun yunit qancha daromad keltirishi kerakligiga qarab quradi. Uslubni siz tanlaysiz, biz qayta ishlatadigan shablon emas.",
        stylesLabel: "Biz quradigan uslublar",
        styleAsk: "Shu uslubni muhokama qilmoqchiman",
        styles: [
          { slug: "modern", label: "Modern" },
          { slug: "minimalist", label: "Minimalizm" },
          { slug: "luxury", label: "Luxury" },
          { slug: "contemporary", label: "Contemporary" },
          { slug: "japandi", label: "Japandi" },
          { slug: "classic", label: "Klassika" },
          { slug: "hotel-style", label: "Hotel-style" },
          { slug: "custom", label: "Individual loyiha" },
        ],
      },
      vision: {
        eyebrow: "Dizayn vizyoni",
        title: "BIZBUYUK taʼmiri qanday koʻrinishi mumkin",
        lead: "Ishimiz doirasini koʻrsatuvchi konsept-render: eskirgan xonadondan tayyor interyergacha, biz quradigan uslublarda.",
        disclaimer: "Bu konseptual vizualizatsiya, aniq yakunlangan loyiha emas. Haqiqiy, suratga olingan loyihalar quyida, \u201cBizning ishlarimiz\u201d boʻlimida.",
        items: [
          { slug: "villa", label: "Villa" },
          { slug: "burj-view-apartment", label: "Burj Khalifa manzarali kvartira" },
          { slug: "office", label: "Ofis taʼmiri" },
        ],
      },
      beforeAfter: {
        title: "Boʻsh xonadondan mukammal interyergacha",
        lead: "Bir xil xonani oldin va keyin koʻrish uchun tutqichni suring.",
        before: "Oldin",
        after: "Keyin",
        hint: "Solishtirish uchun suring",
        empty: "Loyihalar boʻyicha taqqoslashlar tayyorlanmoqda.",
        emptyBody: "Bizda faqat real, yakunlangan BIZBUYUK loyihasining \u201coldin/keyin\u201d surati chop etiladi — maket emas. Birinchi juft rasm joriy taʼmir topshirilgach qoʻyiladi.",
      },
      fullService: {
        title: "Bitta jamoa. Bitta shartnoma. Bitta natija.",
        lead: "Dizayner, pudratchi, duradgor, elektrik va mebel yetkazib beruvchilarni alohida boshqarish shart emas. BIZBUYUK loyihani konsepsiyadan yakunigacha olib boradi.",
        cards: [
          { title: "Dizayn", body: "Interyer dizayni va 3D vizualizatsiya." },
          { title: "Taʼmir", body: "Toʻliq qurilish va pardoz ishlari." },
          { title: "Duradgorlik", body: "Buyurtma mebel va shkaflar." },
          { title: "Oshxona", body: "Oshxona loyihasi va toʻliq oʻrnatish." },
          { title: "Hammom", body: "Hammomning toʻliq taʼmiri va jihozlanishi." },
          { title: "Yoritish", body: "Yorugʻlik konsepsiyasi va montaj." },
          { title: "Mebel", body: "Tanlash, xarid qilish va yetkazib berish." },
          { title: "Dekor", body: "Pardalar, koʻzgular, rasmlar va aksessuarlar." },
          { title: "Texnika", body: "Maishiy texnikaning toʻliq paketi, oʻrnatilgan holda." },
        ],
      },
      furniture: {
        title: "Devordan mebelgacha",
        lead: "Biz taʼmir bilan toʻxtamaymiz. Obyekt toʻliq jihozlangan holda topshiriladi.",
        groups: [
          {
            title: "Mehmonxona va ovqatlanish zonasi",
            items: ["Divanlar", "Ovqat stollari", "Stullar", "TV zonalari", "Jurnal stollari"],
          },
          {
            title: "Yotoqxona va saqlash",
            items: ["Karavotlar", "Matraslar", "Shkaflar", "Oshxona garnituralari"],
          },
          {
            title: "Tekstil va dekor",
            items: ["Pardalar", "Yorugʻlik", "Koʻzgular", "Gilamlar", "Rasmlar", "Aksessuarlar"],
          },
        ],
        cta: "Obyektimni jihozlash",
      },
      investor: {
        title: "Qiymat qoʻshadigan taʼmir",
        lead: "Professional dizayn qilingan va toʻliq jihozlangan obyektni ijaraga berish ham, sotish ham osonroq, eʼlon uchun suratga olish esa yaxshiroq chiqadi.",
        items: [
          "Obyekt taʼmiri",
          "Interyer dizayni",
          "Toʻliq jihozlash",
          "Uzoq muddatli ijaraga tayyorlash",
          "Qisqa muddatli ijaraga tayyorlash",
          "Obyektni topshirish",
          "Daromadga yoʻnaltirilgan dizayn",
        ],
        cta: "Investitsiya mutaxassisi bilan gaplashish",
      },
      portfolio: {
        title: "Bizning ishlarimiz",
        lead: "Amirliklar boʻylab yakunlangan loyihalar.",
        filters: ["Hammasi", "Kvartiralar", "Villalar", "Studiya", "1BR", "2BR", "3BR+"],
        empty: "Loyihalar suratga olinmoqda. Bizga yozing, joriy portfolioni toʻgʻridan-toʻgʻri yuboramiz.",
      },
      quote: {
        title: "Har bir obyektga oʻz hisobi kerak",
        lead: "Taʼmir narxi maydon, holat, dizayn konsepsiyasi, materiallar va jihozlash darajasiga bogʻliq. Obyekt haqida aytib bering, yozma hisob olasiz.",
        name: "Ismingiz",
        phone: "WhatsApp raqami",
        email: "Email",
        location: "Obyekt lokatsiyasi",
        propertyType: "Obyekt turi",
        propertyTypes: ["Kvartira", "Villa", "Taunxaus", "Studiya", "Ofis"],
        size: "Maydon, kv. fut",
        condition: "Hozirgi holati",
        conditions: ["Yangi, topshirilgan", "Yashalgan, yangilash kerak", "Eski, toʻliq demontaj kerak", "Qurilishda"],
        style: "Istalgan uslub",
        budget: "Taxminiy byudjet, AED",
        budgets: ["100k gacha", "100k - 250k", "250k - 500k", "500k - 1M", "1M dan yuqori", "Hali aniq emas"],
        message: "Yana nima bilishimiz kerak",
        messagePlaceholder: "Topshirish sanasi, nimani saqlab qolish kerak, obyektdan qanday foydalanmoqchisiz.",
        photosNote: "Obyekt suratlari bormi? Formani yuborgach WhatsApp orqali joʻnating, arizangizga biriktiramiz.",
        submit: "Hisob soʻrash",
        sending: "Yuborilmoqda…",
        success: "Rahmat. Bir ish kuni ichida savollar yoki hisob bilan qaytamiz.",
        error: "Nimadir xato ketdi. Qayta urinib koʻring yoki WhatsApp orqali yozing.",
        consent: "Formani yuborish orqali ushbu obyekt yuzasidan bogʻlanishga rozilik bildirasiz.",
      },
      why: {
        title: "Nega BIZBUYUK",
        cards: [
          { title: "Bitta aloqa nuqtasi", body: "Loyihani bitta jamoa olib boradi. Qoʻngʻiroq qiladigan bitta odamingiz bor." },
          { title: "Toʻliq sikl", body: "Dizayn, taʼmir, mebel va oʻrnatish bitta shartnoma boʻyicha." },
          { title: "Shaffof jarayon", body: "Kelishilgan hajm, kelishilgan muddat va koʻrinadigan jarayon." },
          { title: "Professional dizayn", body: "Obyektingiz uchun individual interyer, qayta ishlatilgan shablon emas." },
          { title: "Sifat nazorati", body: "Har bir bosqich qabul qilishdan va topshirishdan oldin tekshiriladi." },
          { title: "Yashashga tayyor", body: "Biz shunchaki taʼmir qilmaymiz. Obyektni yashashga tayyorlaymiz." },
        ],
      },
      faq: {
        title: "Koʻp beriladigan savollar",
        lead: "Savolingiz bu yerda boʻlmasa, WhatsApp orqali yozing.",
        items: [
          {
            q: "Taʼmir qancha vaqt oladi?",
            a: "Maydon va ish hajmiga bogʻliq. Studiya yoki bir xonali kvartirani yangilash haftalar bilan, villani toʻliq buzib qayta qurish oylar bilan oʻlchanadi. Sanalari bilan jadvalni dizayn-loyiha bilan birga, ishlar boshlanishidan oldin olasiz.",
          },
          {
            q: "Interyer dizaynini qilasizmi?",
            a: "Ha. Har bir loyiha dizayndan boshlanadi: rejalar, materiallar, rang va mebel joylashuvi, keyin 3D renderlar, toki siz demontajdan oldin natijani tasdiqlaysiz.",
          },
          {
            q: "Boʻsh obyektni taʼmirlash mumkinmi?",
            a: "Bu eng oddiy holat. Boʻsh yunitda himoyalanadigan mebel ham, moslashadigan xonadon aholisi ham yoʻq, shuning uchun muddat qisqaroq.",
          },
          {
            q: "Mebelni ham beradsizmi?",
            a: "Ha. Tanlaymiz, xarid qilamiz, yetkazamiz va oʻrnatamiz. Har bir buyumni dizayn bosqichida siz tasdiqlaysiz.",
          },
          {
            q: "Kvartirani toʻliq jihozlay olasizmi?",
            a: "Ha, matras, parda, koʻzgu va rasmlargacha. Topshirishda bu oʻsha kuniyoq tunab qolish mumkin boʻlgan obyekt.",
          },
          {
            q: "Villalar bilan ishlaysizmi?",
            a: "Ha. Kvartiralar, taunxauslar va villalar, Dubayda va Amirliklar boʻylab.",
          },
          {
            q: "Uslub va materiallarni oʻzim tanlay olamanmi?",
            a: "Ha. Konsepsiya sizning didingiz va byudjetingiz atrofida quriladi, materiallar roʻyxatini esa xarid boshlanishidan oldin siz tasdiqlaysiz.",
          },
          {
            q: "Taʼmirdan oldin 3D render beradsizmi?",
            a: "Doim. Siz renderlarni koʻrib tasdiqlamaguningizcha hech narsa buzilmaydi.",
          },
          {
            q: "Men BAAdan tashqarida boʻlsam, loyihani olib bora olasizmi?",
            a: "Ha, koʻp egalar butun loyiha davomida chet elda boʻladi. Surat va video bilan rejali hisobotlar olasiz, tasdiqlashlar esa masofadan boradi.",
          },
          {
            q: "Individual hisob tuzasizmi?",
            a: "Ha. Har bir obyekt maydon, holat, konsepsiya, materiallar va jihozlash darajasi boʻyicha oʻz hisobini oladi.",
          },
        ],
      },
      finalCta: {
        title: "Obyektingizni oʻzgartirishga tayyormisiz?",
        lead: "Xonadoningizni uyga aylantiramiz.",
        cta: "Loyihani boshlash",
        ctaAlt: "WhatsApp orqali yozish",
      },
    },
    propertyTypes: {
      studio: "Studiya",
      apartment: "Kvartira",
      penthouse: "Penthaus",
      villa: "Villa",
      townhouse: "Taunxaus",
      branded: "Branded residence",
      luxury: "Luxury",
      investment: "Investitsion",
      offplan: "Off-plan",
    },
    realEstatePage: {
      metaTitle: "Dubayda koʻchmas mulk",
      metaDescription:
        "BIZBUYUK bilan Dubayda koʻchmas mulk xaridi: off-plan va tayyor obyektlar, studiyadan villa va branded residences'gacha, oʻn yetti tumanda. Xaridor uchun 0% komissiya.",
      home: "Bosh sahifa",
      current: "Koʻchmas mulk",
      hero: {
        eyebrow: "Koʻchmas mulk",
        title: "Dubay boʻylab har qanday obyekt turi.",
        sub: "Biz bitta tumandagi bitta binoni sotmaymiz. Byudjetingiz, maqsadingiz va muddatingizdan boshlaymiz, keyin haqiqatan mos keladiganini qisqa roʻyxatga olamiz.",
        cta: "Konsultatsiya olish",
        ctaAlt: "Tumanlarni koʻrish",
      },
      stats: [
        { value: "17", label: "Ishlaydigan tumanlarimiz" },
        { value: "0%", label: "Xaridor uchun komissiya" },
        { value: "2", label: "Xarid yoʻli: off-plan yoki tayyor" },
      ],
      types: {
        title: "Nima sotib olish mumkin",
        lead: "Obyekt turi yashash, ijaraga berish yoki ushlab turish maqsadingizga bogʻliq. Quyida biz ishlaydigan variantlar va har biri odatda nima uchun tanlanishi.",
        groups: [
          {
            title: "Oʻlchami boʻyicha",
            items: [
              { title: "Studiya", body: "Eng past kirish narxi va har dirhamga eng yuqori daromad. Kunlik ijara operatorlari va yolgʻiz ijarachilar orasida ommabop." },
              { title: "1 xonali", body: "Dubaydagi eng sigʻimli ijara bozori. Oson ijaraga beriladi, oson qayta sotiladi." },
              { title: "2 xonali", body: "Juftliklar va kichik oilalar qarashni boshlaydigan daraja. 1BR'dan sekinroq ijaraga beriladi, lekin ijara muddati uzunroq." },
              { title: "3 xonali va undan katta", body: "Oilaviy format. Ijarachi kamroq, lekin yillab yashaydi, bu boʻsh turish va almashinuv xarajatini kamaytiradi." },
              { title: "Penthaus", body: "Shaxsiy terrasali yuqori qavatlar. Tor bozor: bu yerda daromad emas, manzara va pardoz hal qiladi." },
            ],
          },
          {
            title: "Formati boʻyicha",
            items: [
              { title: "Kvartira", body: "Minora va oʻrta qavatli qurilish. Service charge binoni qoplaydi, shuning uchun egalik deyarli ishtirok talab qilmaydi." },
              { title: "Villa", body: "Yer uchastkali alohida uy. Kirish ham, xizmat koʻrsatish ham qimmatroq, lekin oilaviy jamoalarda qiymat oʻsishi eng kuchli." },
              { title: "Taunxaus", body: "Kvartira byudjetiga villa rejasi. Yer uchastkasisiz keng joy istagan oilalar uchun odatiy murosa." },
            ],
          },
          {
            title: "Segmenti boʻyicha",
            items: [
              { title: "Luxury", body: "Premium manzillar, katta maydonlar va daromaddan koʻra manzara bilan qoʻshnilar muhimroq boʻlgan xaridorlar." },
              { title: "Branded residence", body: "Mehmonxona yoki moda brendi boshqaruvida. Kvadrat futiga narx yuqoriroq va odatda ijarada ham ustama boʻladi." },
              { title: "Investitsion obyekt", body: "Avvalo raqamlar boʻyicha tanlanadi: daromad, service charge, ijarachi talabi va qanchalik oson sotilishi." },
            ],
          },
        ],
      },
      paths: {
        title: "Ikki xil xarid yoʻli",
        lead: "Deyarli butun qaror shunga borib taqaladi: qurilish davomida boʻlib toʻlash yoki bugun mavjud boʻlgan narsani sotib olish.",
        offplan: {
          title: "Off-plan",
          body: "Qurilishdan oldin yoki uning davomida quruvchidan xarid. Start narxi, qurilish davriga taqsimlangan toʻlov va koʻpincha topshirishdan keyingi boʻlib toʻlash. Siz kutasiz va qurilish riskini oʻz zimmangizga olasiz.",
          cta: "Off-plan qanday ishlaydi",
        },
        ready: {
          title: "Tayyor koʻchmas mulk",
          body: "Hozirgi egasidan xarid. Aniq yunitni koʻrish, binoni tekshirish va qayta roʻyxatdan bir oy soʻng ijaraga berish mumkin. Narx bugungi, odatda toʻliq toʻlanadi.",
          cta: "Tayyor obyekt qanday olinadi",
        },
      },
      districts: {
        title: "Qayerda ishlaymiz",
        lead: "Oʻn yetti tuman, har birida oʻsha yerdan sotib olishning oʻz sababi bor. Tumanning yetuklik darajasi boʻyicha filtrlang va hozir qaysi loyihalar ochiqligini soʻrang.",
        filters: {
          all: "Barcha tumanlar",
          established: "Shakllangan",
          prestige: "Premium",
          emerging: "Rivojlanayotgan",
        },
        typesLabel: "Bu yerda nima bor",
        note: "Bu roʻyxatda yoʻq tumanlarda ham ishlaymiz. Aniq bir tuman koʻnglingizda boʻlsa, soʻrang.",
        ask: "Tuman haqida soʻrash",
      },
      why: {
        title: "Qanday ishlaymiz",
        cards: [
          { title: "Sizdan 0% komissiya", body: "Quruvchi bilan bitimlarda haqimizni quruvchi toʻlaydi, sizning narxingizga qoʻshilmaydi." },
          { title: "Katalog emas, shortlist", body: "Soʻrovingizga mos ikki-uchta obyekt, har birining orqasida hisob-kitob bilan." },
          { title: "Butun bozor", body: "Biz bitta quruvchiga bogʻlanmaganmiz, shuning uchun roʻyxat mohiyat boʻyicha tuziladi." },
          { title: "Avval raqamlar", body: "Daromad, service charge, toʻlov jadvali va chiqish yoʻli qaror qabul qilishdan oldin muhokama qilinadi." },
          { title: "Imzodan oldin tekshiruv", body: "Quruvchi, loyiha holati, escrow va shartnoma oldindan tekshiriladi." },
          { title: "Xariddan keyin ham", body: "Jihozlash, ijarachi, boshqaruv va qayta sotish, kerak boʻlgan paytda." },
        ],
      },
      cta: {
        title: "Byudjet va maqsadni ayting.",
        body: "Boshlash uchun shuning oʻzi yetarli. Mos keladigan ikki-uchta obyekt va har biri boʻyicha asos bilan qaytamiz.",
      },
      offplan: {
        metaTitle: "Dubayda off-plan koʻchmas mulk",
        metaDescription:
          "Dubayda off-plan xaridi qanday ishlaydi: toʻlov rejalari, boshlangʻich toʻlov, topshirishdan keyingi toʻlovlar, quruvchi va escrow tekshiruvi, handover'gacha butun jarayon.",
        current: "Off-plan",
        hero: {
          eyebrow: "Off-plan",
          title: "Startda sotib oling, qurilish davomida toʻlang.",
          sub: "Off-plan Dubayning yangi loyihasiga eng arzon kirish yoʻli va ayni paytda mexanikasi eng murakkabi. Qanday ishlashini tushuntiramiz.",
          cta: "Off-plan xaridni muhokama qilish",
        },
        what: {
          title: "Off-plan amalda nima degani",
          lead: "Siz hali mavjud boʻlmagan yunitni toʻgʻridan-toʻgʻri quruvchidan, ham narxni ham qurilish jadvalini belgilaydigan shartnoma boʻyicha sotib olasiz.",
          points: [
            { title: "Start narxi", body: "Loyihaning birinchi navbati odatda eng arzoni. Keyingi fazalar talabga qarab qimmatlashadi." },
            { title: "Qurilish davriga boʻlib toʻlash", body: "Butun summani birdan emas, qurilish bosqichlariga bogʻlangan qismlarda toʻlaysiz." },
            { title: "Qiymat oʻsishi", body: "Tuman va loyiha oʻzini koʻrsatsa, topshirishga yunit shartnomadagidan qimmatroq boʻlishi mumkin. Boʻlmasligi ham mumkin." },
            { title: "Qurilish riski", body: "Topshirish muddatlari suriladi. Sizni shartnoma, escrow hisob va quruvchining tarixi himoya qiladi." },
          ],
        },
        payment: {
          title: "Toʻlov rejasi nimalardan tuziladi",
          lead: "Deyarli har qanday reja shu toʻrt qismning varianti. Aynan ularning nisbati qulay xaridni tarang xariddan ajratadi.",
          plans: [
            { title: "Boshlangʻich toʻlov", body: "Bronlashda, rezervatsiyani imzolash bilan birga toʻlanadi. Loyiha sizga yetarlimi yoʻqmi, aynan shu raqam hal qiladi." },
            { title: "Qurilish davrida", body: "Qurilish bosqichlariga yoki belgilangan sanalarga bogʻlangan toʻlovlar, yakunlanguncha." },
            { title: "Topshirishda", body: "Obyekt tayyor boʻlib, kalit berilganda toʻlanadigan qoldiq." },
            { title: "Topshirishdan keyin", body: "Ayrim quruvchilar kalit qoʻlingizda boʻlgan holda toʻlashda davom etishga ruxsat beradi, shunda ijara toʻlovni qoplashga yordam beradi." },
          ],
          note: "Rejalar quruvchi va loyihaga qarab farq qiladi hamda fazalar orasida oʻzgaradi. Biz aynan siz sotib olayotgan paytda ochiq boʻlgan rejalarni solishtiramiz.",
        },
        process: {
          title: "Jarayon boshidan oxirigacha",
          lead: "Sakkiz bosqich. Birinchi beshtasida siz ishtirok etasiz, qolganini biz olib boramiz.",
          steps: [
            { n: "01", title: "Konsultatsiya", lead: "Byudjet, maqsad, muddat.", body: "Obyekt sizga nima berishi kerakligini va yiliga qancha ajrata olishingizni aniqlaymiz." },
            { n: "02", title: "Obyekt turini tanlash", lead: "Turi, maydoni, tumani.", body: "Soʻrovga mos obyekt turi va tumanlargacha toraytiramiz, qolganini chetga surib qoʻyamiz." },
            { n: "03", title: "Loyihani tanlash", lead: "Quruvchi va faza.", body: "Ochiq loyihalarni narx, toʻlov rejasi, topshirish tarixi va tuman imkoniyati boʻyicha solishtiramiz." },
            { n: "04", title: "Bronlash", lead: "Yunit rezervatsiya qilinadi.", body: "Rezervatsiya shakli va booking toʻlovi. Yunit sizning nomingizga sotuvdan olinadi." },
            { n: "05", title: "SPA", lead: "Shartnoma imzolanadi.", body: "Oldi-sotdi shartnomasini imzodan oldin siz bilan birga koʻrib chiqamiz: muddatlar, jarimalar va tomonlardan biri shartni buzsa nima boʻlishi." },
            { n: "06", title: "Roʻyxatdan oʻtkazish", lead: "DLD'da Oqood.", body: "Xarid Dubai Land Department'da roʻyxatdan oʻtadi, huquqingiz qayd etiladi." },
            { n: "07", title: "Qurilish", lead: "Toʻlovlar va jarayon.", body: "Bosqichlar va toʻlov talablarini kuzatamiz, hech narsa oʻtkazib yuborilmasin va jarima tushmasin." },
            { n: "08", title: "Topshirish", lead: "Kalit va qabul.", body: "Koʻrik, kamchiliklar roʻyxati, yakuniy toʻlov va title deed. Keyin jihozlash yoki ijaraga berish mumkin." },
          ],
        },
        checks: {
          title: "Qaroringizdan oldin nimani tekshiramiz",
          items: [
            "Quruvchining oldingi loyihalarni topshirish tarixi",
            "Loyihaning RERA'dagi roʻyxati va holati",
            "Toʻlovlar loyihaning escrow hisobiga tushishi",
            "Shartnomadagi toʻlov jadvali sizga koʻrsatilganiga mos kelishi",
            "Topshirish muddatlari, jarima shartlari va bekor qilish tartibi",
            "Tuman ijara va qayta sotishda haqiqatan nimani koʻtarishi",
          ],
        },
        cta: {
          title: "Hozir qaysi loyihalar ochiq?",
          body: "Start fazalari tez ochilib tez yopiladi. Byudjetingizni ayting, shu hafta haqiqatan mavjud boʻlganini yuboramiz.",
        },
      },
      ready: {
        metaTitle: "Dubayda tayyor koʻchmas mulk",
        metaDescription:
          "Dubayda tayyor koʻchmas mulk xaridi: qidiruv, koʻriklar, muzokara, hujjat tekshiruvi, Dubai Land Department'da qayta roʻyxat va obyektni topshirish.",
        current: "Tayyor koʻchmas mulk",
        hero: {
          eyebrow: "Tayyor koʻchmas mulk",
          title: "Koʻring, tekshiring, keyin sotib oling.",
          sub: "Ichida yurib chiqish, koʻzdan kechirish va qayta roʻyxatdan bir oy soʻng ijaraga berish mumkin boʻlgan tayyor yunit. Qurilish riskisiz va kutishsiz.",
          cta: "Tayyor obyekt xaridini muhokama qilish",
        },
        what: {
          title: "Nega tayyorni tanlashadi",
          lead: "Qogʻozda off-plan arzonroq. Tayyori esa aniqroq.",
          points: [
            { title: "Aniq yunitni koʻrasiz", body: "Manzara, qavat, pardoz va qoʻshnilar — bular render emas, dalil." },
            { title: "Birinchi oydan daromad", body: "Qayta roʻyxatdan oʻtishi bilanoq ijaraga berish mumkin, aktiv darhol ishlay boshlaydi." },
            { title: "Binoning tarixi bor", body: "Service charge, boshqaruv sifati va ijara tarixi xariddan oldin koʻrinadi." },
            { title: "Qurilish riski yoʻq", body: "Suriladigan topshirish muddati ham, kuzatiladigan qurilish ham yoʻq." },
          ],
        },
        process: {
          title: "Jarayon boshidan oxirigacha",
          lead: "Birinchi brifdan kalitgacha toʻqqiz bosqich.",
          steps: [
            { n: "01", title: "Qidiruv", lead: "Brif roʻyxatga aylanadi.", body: "Byudjet, tuman va obyekt turi boʻyicha bozorni ishlaymiz, ochiq eʼlon qilinmagan yunitlar ham kiradi." },
            { n: "02", title: "Shortlist", lead: "Oʻttizta emas, ikki-uchta.", body: "Roʻyxatni haqiqatan mos keladiganigacha qisqartiramiz va qolgani nega chiqib ketganini tushuntiramiz." },
            { n: "03", title: "Tahlil", lead: "Har bir yunit boʻyicha raqamlar.", body: "Sotuvchi narxi haqiqiy bitimlarga qarshi, service charge, erishish mumkin boʻlgan ijara va sof daromad." },
            { n: "04", title: "Koʻrik", lead: "Shaxsan yoki video orqali.", body: "Yunit va binoni siz bilan birga aylanamiz, chet elda boʻlsangiz batafsil suratga olamiz." },
            { n: "05", title: "Muzokara", lead: "Narx va shartlar.", body: "Sizning tomoningizda muzokara olib boramiz: narx, yunitda nima qolishi va qayta roʻyxat muddati." },
            { n: "06", title: "Hujjat tekshiruvi", lead: "Har qanday toʻlovdan oldin.", body: "Title deed, service charge tarixi, yopilmagan ipoteka, NOC holati va yunitdagi har qanday cheklov." },
            { n: "07", title: "Bitim", lead: "MOU va depozit.", body: "Memorandum imzolanadi, depozit tomonlarni himoya qiluvchi standart qoidalar boʻyicha joylashtiriladi." },
            { n: "08", title: "Roʻyxatdan oʻtkazish", lead: "DLD'da qayta roʻyxat.", body: "Quruvchidan NOC, keyin Dubai Land Department'da qayta roʻyxat va nomingizga title deed." },
            { n: "09", title: "Topshirish", lead: "Kalit va kommunal.", body: "Kalit, kirish kartalari, DEWA va sovutish qayta rasmiylashtiriladi. Keyin jihozlash yoki ijarachi topish mumkin." },
          ],
        },
        checks: {
          title: "Obyekt boʻyicha nimani tekshiramiz",
          items: [
            "Title deed va sotuvchi haqiqatan roʻyxatdan oʻtgan egami",
            "Obyektda ipoteka bormi va u qanday yopiladi",
            "Service charge tarixi va qarzdorlik yoʻqligi",
            "Bino qanday boshqarilishi va xizmat koʻrsatilishi",
            "Xuddi shu binodagi haqiqiy bitim narxlari, taklif narxlari emas",
            "Ijara tarixi va yunit amalda nimani koʻrsatishi",
          ],
        },
        cta: {
          title: "Tayyor narsa qidiryapsizmi?",
          body: "Tuman va byudjetni ayting. Bozorda nima borligi va uning aslida qancha turishi bilan qaytamiz.",
        },
      },
    },
  },
  ar: {
    nav: { realEstate: "العقارات", services: "الخدمات", renovation: "التجديد", it: "التقنية", team: "الفريق", partners: "المطورون", why: "لماذا نحن", contact: "تواصل معنا", cta: "احجز استشارة", news: "الأخبار" },
    teamPage: {
      metaTitle: "فريقنا في دبي",
      metaDescription:
        "فريق BIZBUYUK Real Estate في دبي. سبعة وسطاء عقاريين ومديرين يتحدثون الروسية والإنجليزية والأوزبكية والكازاخستانية والطاجيكية والأذربيجانية والعربية والصينية. اعثر على الزميل الذي يتحدث لغتك.",
      eyebrow: "الفريق",
      titleA: "صوتك مسموع",
      titleEm: "بلغتك الأم",
      lead: "مكتب BIZBUYUK في دبي. اختر اللغة التي تشعر فيها بالراحة لتتعرف على من سيتولى متابعتك.",
      bandLabel: "نتحدث بـ",
      hint: "اختر لغة",
      reset: "إعادة تعيين",
      peopleWord: "في الفريق",
      waIntro: "مرحباً! أنا على موقع BIZBUYUK وأود التواصل مع {name}.",
      langs: {
        ru: "الروسية", en: "الإنجليزية", uz: "الأوزبكية", kz: "الكازاخستانية", tj: "الطاجيكية",
        az: "الأذربيجانية", ar: "العربية", zh: "الصينية", af: "اللغات الأفريقية",
      },
      langsShort: { af: "أفريقيا" },
      ctaTitle: "لست متأكداً بمن عليك أن تتصل؟",
      ctaBody: "راسلنا وسنوصلك بالشخص الذي يتحدث لغتك ويغطي القطاع الذي تحتاجه من السوق.",
      ctaButton: "احجز استشارة",
      trustedBroker: "وسيط عقاري موثوق",
    },
    hero: {
      eyebrow: "الإمارات · العقارات · تأسست عام 2020",
      titleA: "شريكك الموثوق في",
      titleEm: "سوق العقارات",
      titleB: "الإماراتي.",
      sub: "مشاريع off-plan حديثة الإطلاق من كبرى شركات التطوير في الإمارات، استثمارات محمية، ومسار سلس نحو الاستقرار في الإمارات — نرافقكم فيه خطوة بخطوة حتى النهاية.",
      cta: "احجز استشارة",
      ctaAlt: "استكشف خدماتنا",
      scroll: "مرر",
    },
    marqueeIntro: "تثق بنا الشركات التي تبني الإمارات",
    whatsappFab: { aria: "راسلنا عبر WhatsApp", prefill: "مرحباً BIZBUYUK! لدي سؤال." },
    trust: {
      eyebrow: "بالأرقام",
      lead: {
        value: "200,000+",
        label: "عميل",
        note: "استشارات وصفقات منجزة منذ عام 2020.",
      },
      items: [
        { value: "50,000+", label: "صفقة منجزة" },
        { value: "AED 10B+", label: "حجم المحفظة العقارية" },
        { value: "7", label: "إمارات" },
        { value: "50+", label: "أخصائي في الفريق" },
        { value: "10", label: "لغة نعمل بها" },
      ],
    },
    services: {
      eyebrow: "ماذا نقدّم",
      title: "كل ما نتولاه في الإمارات",
      items: [
        {
          tag: "01",
          title: "العقارات",
          body: "مشاريع off-plan حديثة الإطلاق ووحدات جاهزة من أكبر شركات التطوير في الإمارات. بحث، وتفاوض، وإتمام الصفقة، بعمولة 0% على المشتري.",
        },
        {
          tag: "02",
          title: "حماية الاستثمار",
          body: "فحص شامل للمطوّر والمشروع، ومراجعة حساب Escrow وبنود العقد، والتسجيل لدى Dubai Land Department.",
        },
        {
          tag: "03",
          title: "السياحة ونقل الإقامة",
          body: "زيارة الإمارات أو الإقامة فيها أو الانتقال إليها: تأشيرات الإقامة، وEmirates ID، والحسابات المصرفية، والمدارس، والاستقرار.",
        },
        {
          tag: "04",
          title: "إدارة الأملاك",
          body: "بعد الشراء: إيجاد المستأجرين، وتحصيل الإيجار، والصيانة، وإعادة البيع في الوقت المناسب.",
        },
        {
          tag: "05",
          title: "التجديد الشامل",
          body: "من مساحة فارغة إلى منزل مؤثّث بالكامل: التصميم، والرندرات ثلاثية الأبعاد، والتجديد الكامل، والأثاث، والتركيب النهائي.",
        },
        {
          tag: "06",
          title: "التقنية",
          body: "الذراع التقنية لمجموعة BIZBUYUK GROUP: منتجات ويب وموبايل، وأنظمة أعمال، وذكاء اصطناعي، لعملاء في أي مكان.",
        },
      ],
    },
    stats: {
      eyebrow: "لماذا الإمارات",
      title: "سوق بُني خصيصاً للمستثمرين",
      items: [
        { value: "11%", label: "متوسط نمو الأسعار سنوياً" },
        { value: "12%", label: "متوسط العائد الإيجاري" },
        { value: "0%", label: "ضريبة على العقار والدخل" },
      ],
    },
    why: {
      about: {
        eyebrow: "من نحن",
        title: "أهلاً بكم في BIZBUYUK Real Estate",
        body: "تأسست BIZBUYUK عام 2020 وتتمثل مهمتنا في تقديم خدمات وساطة عقارية بمستوى عالمي، وبأعلى معايير الاحترافية والأخلاقيات والجودة. وانطلاقاً من ثقة متبادلة عميقة والتزام راسخ، نسعى لأن نصبح الوكالة العقارية الأكثر قيمة في المنطقة.",
      },
      eyebrow: "لماذا نحن",
      cards: [
        { title: "خبراء السوق", body: "فريق من المحللين المجتهدين الذين يراقبون اتجاهات السوق ويعرفون الأحياء عن قرب — ليكتشفوا أفضل الفرص لعملائنا." },
        { title: "وصول مباشر", body: "وصول مباشر إلى عقارات في مواقع متميزة من البائعين أنفسهم، إلى جانب تشكيلة واسعة من حلول off-plan تناسب كل ميزانية." },
        { title: "صفقة بلا متاعب", body: "عائد استثماري ممتاز عبر عملية استحواذ شفافة وسلسة وخالية من المتاعب." },
        { title: "خدمات شاملة", body: "وكالة طموحة ومبدعة تتولى بيع وشراء وتأجير العقارات السكنية والتجارية في أبرز مناطق الإمارات." },
      ],
    },
    partners: { eyebrow: "شركاؤنا من المطورين", title: "نتعامل مع جميع المشاريع العقارية في الإمارات" },
    testimonials: {
      eyebrow: "بكلماتهم",
      title: "ماذا يقول عملاؤنا",
      lead: "بلا تحرير، باللغة التي كُتبت بها.",
      allLabel: "الكل",
      ratingSuffix: "/5",
      writeReview: "أضف تقييمك",
      form: {
        title: "أضف تقييمك",
        name: "اسمك",
        city: "مدينتك",
        country: "بلدك",
        language: "اللغة التي تكتب بها",
        service: "ما الخدمة التي يتعلق بها تقييمك؟",
        rating: "التقييم",
        quote: "رأيك",
        quotePlaceholder: "ما الأمر الذي سار بشكل جيد — أو لم يسر كذلك؟",
        submit: "إرسال التقييم",
        submitting: "جارٍ الإرسال…",
        success: "شكراً لك. يراجع فريقنا تقييمك قبل نشره.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        note: "تُراجَع التقييمات قبل ظهورها على الموقع.",
        close: "إغلاق",
      },
    },
    lead: {
      eyebrow: "استشارة مجانية",
      title: "اترك طلبك — وسنتواصل معك",
      sub: "زوّدنا بطريقة التواصل معك، وسيتصل بك أحد كبار المستشارين خلال يوم عمل واحد.",
      name: "اسمك",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      emailHint: "يكفي كتابة الاسم فقط - سنضيف «@gmail.com» تلقائياً.",
      contactPref: "طريقة التواصل المفضلة",
      contactCall: "اتصال هاتفي",
      contactWhatsApp: "WhatsApp",
      contactTelegram: "Telegram",
      contactEmail: "البريد الإلكتروني",
      submit: "إرسال الطلب",
      sending: "جارٍ الإرسال…",
      success: "شكراً لك — سنتواصل معك قريباً.",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.",
      consent: "بإرسالك هذا الطلب، فإنك توافق على أن نتواصل معك بخصوص استفسارك.",
    },
    footer: {
      blurb: "وكالة عقارية إماراتية طموحة ومبدعة — بيع وشراء وتأجير العقارات السكنية والتجارية في مختلف أنحاء الإمارات.",
      licenceNote: "وساطة عقارية مرخّصة. يحمل كل وسيط في فريقنا رخصة RERA الفردية الخاصة به — اطلبها من وسيطك.",
      address: "العنوان",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, الإمارات العربية المتحدة.",
      offices: "المكاتب",
      contact: "التواصل",
      follow: "تابعنا",
      rights: "جميع الحقوق محفوظة.",
      nav: "التنقل",
    },
    legal: {
      privacyLabel: "سياسة الخصوصية",
      termsLabel: "شروط الاستخدام",
      page: {
        eyebrow: "الشؤون القانونية",
        updated: "آخر تحديث: سبتمبر 2026",
        languageNote: "هذه الصفحة معروضة باللغة الإنجليزية، وهي اللغة المعتمدة رسمياً لهذه الوثيقة. راسلونا بالروسية أو الأوزبكية وسيسعدنا الرد على أي استفسار عنها بلغتكم.",
      },
      privacy: { title: "سياسة الخصوصية" },
      terms: { title: "شروط الاستخدام" },
    },
    newsPage: {
      metaTitle: "الأخبار",
      metaDescription: "آخر مستجدات BIZBUYUK Real Estate و BIZBUYUK GROUP.",
      home: "الرئيسية",
      current: "الأخبار",
      eyebrow: "المستجدات",
      title: "أخبار BIZBUYUK",
      lead: "ما نعمل عليه، وما نطلقه، وما نتعلمه.",
      empty: "لا توجد أخبار بعد — تفقّد الصفحة قريباً.",
      readMore: "اقرأ المزيد",
      back: "جميع الأخبار",
    },
    servicesPage: {
      metaTitle: "الخدمات",
      metaDescription:
        "من اختيار العقار إلى الاستقرار في الإمارات: عقارات، وحماية للاستثمار، ونقل إقامة، وإدارة أملاك — نرافقكم خطوة بخطوة حتى النهاية.",
      home: "الرئيسية",
      current: "الخدمات",
      eyebrow: "ماذا نقدّم",
      title: "خدماتنا",
      sub: "من اختيار العقار إلى الاستقرار في الإمارات، نرافقكم في كل خطوة.",
      ctaPrimary: "احجز استشارة",
      ctaSecondary: "اسأل عبر WhatsApp",
      stats: [
        { value: "7", label: "إمارات نغطيها" },
        { value: "5", label: "مسارات خدمية" },
        { value: "23", label: "خدمة فرعية" },
        { value: "4", label: "اللغات: EN / RU / UZ / AR" },
      ],
      blocks: [
        {
          id: "real-estate",
          nav: "العقارات",
          title: "البحث والشراء",
          intro:
            "نختار لكم العقارات من كبرى شركات التطوير في الإمارات. عمولة المشتري 0%: أتعابنا يدفعها المطوّر، لا أنتم.",
          items: [
            { title: "Off-plan مباشرة من المطوّر", body: "عقود مباشرة مع المطوّر: أسعار الإطلاق، وخطط سداد، وشروط ما بعد التسليم دون أي هامش ربح إضافي من وسيط." },
            { title: "العقار الجاهز", body: "السوق الثانوي: عاينوا الوحدة، وأجّروها، وابدأوا تحقيق الدخل فور إتمام الصفقة." },
            { title: "التحليل الاستثماري", body: "حساب ROI وrental yield مع الأخذ بعين الاعتبار service charge ورسوم الإدارة ونسبة الشغور." },
            { title: "قائمة مختصرة من 2-3 وحدات", body: "ليس الكتالوج كاملاً، بل قائمة مختصرة تتناسب مع ميزانيتكم وهدفكم ومدة احتفاظكم بالعقار." },
            { title: "الحجز وSPA", body: "حجز الوحدة، ومراجعة تفصيلية لبنود العقد، ومرافقتكم حتى التوقيع." },
          ],
        },
        {
          id: "protection",
          nav: "حماية الاستثمار",
          title: "حماية الاستثمار",
          intro:
            "حماية قانونية لرأس مالكم في كل مرحلة من مراحل الصفقة. نتحقق من الأمور التي عادةً ما يتأخر التحقق منها كثيراً.",
          items: [
            { title: "Due diligence للمطوّر", body: "سجل المطوّر في تسليم مشاريعه السابقة، ومتانته المالية، وحالة المشروع في سجلّات RERA." },
            { title: "حساب Escrow وخطة السداد", body: "نتحقق من أن الأموال تودَع في حساب Escrow الخاص بالمشروع، وأن جدول السداد مطابق لما جاء في العقد." },
            { title: "مراجعة SPA قبل التوقيع", body: "مواعيد التسليم، والغرامات، وشروط الفسخ، وإجراءات تسليم الوحدة." },
            { title: "Oqood وTitle Deed", body: "تسجيل الملكية لدى Dubai Land Department، ومتابعة المهل الزمنية لإنجاز المعاملات الورقية." },
            { title: "النزاعات", body: "الدعم اللازم في حال تأخّر المطوّر في التسليم أو أخلّ ببنود العقد." },
          ],
        },
        {
          id: "relocation",
          nav: "السياحة ونقل الإقامة",
          title: "السياحة ونقل الإقامة",
          intro: "من الزيارة الأولى إلى حياة كاملة في الإمارات.",
          items: [
            { title: "جولة تعريفية", body: "برنامج زيارة كامل: معاينة العقارات، ولقاءات مع المطورين، والتنقلات، والإقامة." },
            { title: "تأشيرة الإقامة", body: "إنجاز إجراءات التأشيرة، بما في ذلك Golden Visa إذا بلغ الاستثمار الحد المطلوب حالياً." },
            { title: "الحساب المصرفي وEmirates ID", body: "فتح حساب مصرفي في الإمارات والحصول على بطاقة الهوية الإماراتية." },
            { title: "المدارس والمنطقة السكنية", body: "اختيار المدرسة أو الحضانة المناسبة والمنطقة الملائمة لعائلتكم." },
            { title: "الاستقرار", body: "التأمين الصحي، والخدمات، والمواصلات، وخطوط الاتصال." },
          ],
        },
        {
          id: "management",
          nav: "الإدارة",
          title: "إدارة الأملاك",
          intro:
            "الشراء لا ينتهي عند التوقيع. فبعد إتمام الصفقة، يحتاج العقار إلى التجهيز والتأجير والمتابعة.",
          items: [
            { title: "إيجاد المستأجر", body: "إيجار طويل وقصير الأجل، وفحص المستأجرين، والعقد، وتسجيل Ejari." },
            { title: "إدارة العقار", body: "التنسيق مع إدارة المبنى، وصيانة الوحدة، وتحصيل الإيجار." },
            { title: "التجديد والتأثيث", body: "تجهيز الوحدة لتكون جاهزة للتأجير: التشطيبات، والأثاث، والأجهزة، وتصوير الوحدة للإعلان عنها." },
            { title: "إعادة البيع", body: "Resale وassignment: نساعدكم على الخروج من الاستثمار عندما يكون ذلك مجدياً." },
          ],
        },
        {
          id: "legal",
          nav: "الخدمات القانونية",
          title: "الدعم القانوني والاستشاري",
          intro:
            "ذراع قانونية واستشارية تمتد إلى ما هو أبعد من الإمارات: تأسيس الشركات، وإنجاز التأشيرات، وشبكة من المحامين في دول BRICS، يديرها الفريق نفسه الذي يتابع صفقتكم العقارية.",
          items: [
            { title: "شبكة قانونية دولية", body: "محامون شركاء في دول BRICS، منسّقون عبر جهة اتصال واحدة، للمسائل التي تتجاوز حدود الإمارات." },
            { title: "تأسيس الشركات", body: "Mainland أو free zone أو offshore: نبني الهيكل القانوني المناسب وننجز الترخيص بحيث تبدؤون العمل الفعلي، لا مجرد التسجيل." },
            { title: "إنجاز التأشيرات", body: "مدة واضحة للتأشيرة نفسها: 7 أيام عمل بعد اكتمال مستنداتكم. أما المسائل المرتبطة بها فتُحدَّد ضمن الاستشارة، دون وعد مسبق بها." },
            { title: "العمولة وإدارة الأملاك", body: "البيع أو التأجير أو تسليمنا العقار لإدارته: نحدد السعر بحسب عقاركم وحالتكم، لا بحسب تعرفة ثابتة معلنة." },
          ],
        },
      ],
      process: {
        title: "كيف نعمل",
        body: "خمس خطوات من أول محادثة وحتى تسجيل الملكية باسمكم. عادةً أسبوعان أو أكثر.",
        steps: [
          { title: "الموجز الأولي", body: "الميزانية، والهدف، والأفق الزمني، وطريقة السداد التي تناسبكم." },
          { title: "القائمة المختصرة", body: "وحدتان أو ثلاث، مع حساب العائد لكل منها." },
          { title: "المعاينة", body: "جولة فيديو للوحدة أو زيارة إلى الإمارات." },
          { title: "الحجز", body: "حجز الوحدة ومراجعة SPA قبل التوقيع." },
          { title: "إتمام الصفقة", body: "التوقيع، والسداد، والتسجيل لدى Dubai Land Department." },
        ],
      },
      trust: {
        title: "ما يعنيه ذلك عملياً",
        items: [
          "نعمل كوساطة عقارية مسجَّلة رسمياً في الإمارات",
          "كل صفقة تُسجَّل لدى Dubai Land Department",
          "أموال المشتري تودَع في حساب Escrow الخاص بالمشروع",
          "يراجع المحامي العقد قبل التوقيع، لا بعده",
        ],
      },
      visaNote:
        "تتغيّر من وقت لآخر ضوابط تأشيرة الإقامة وحدّ الاستثمار المطلوب لـ Golden Visa. نتحقق من المتطلبات المعمول بها في تاريخ إتمام صفقتكم.",
      legalNote:
        "تُتَّفق شروط الوسطاء والشركاء أيضاً على أساس كل حالة على حدة. أخبرونا بمن تتعاملون وسنؤكد لكم أفضل الشروط لهذا التعاون.",
      askLabel: "لديك سؤال حول هذا القسم؟",
      askWhatsApp: "اسأل عبر WhatsApp",
      also: {
        eyebrow: "من ضمن ما نقدّمه أيضاً",
        title: "مساران إضافيان",
        renovation: {
          title: "التجديد الشامل",
          body: "اشتريتم عقاركم بالفعل، أو تشترون في مكان آخر؟ نأخذ المساحة من الفراغ إلى التأثيث الكامل — تصميم، ورندرات ثلاثية الأبعاد، وتنفيذ كامل، وأثاث، وتسليم نهائي.",
          cta: "شاهد خدمات التجديد",
        },
        it: {
          title: "التقنية",
          body: "الذراع التقنية لمجموعة BIZBUYUK GROUP — منتجات ويب وموبايل، وأنظمة أعمال، وذكاء اصطناعي، لعملاء في أي مكان بالعالم.",
          cta: "شاهد خدماتنا التقنية",
        },
      },
      cta: {
        title: "لست متأكداً أي خدمة تحتاجها؟",
        body: "صف لنا وضعك في جملتين، وسنخبرك من أين تبدأ وما الذي تحتاجه في كل خطوة.",
      },
    },
    calculatorsPage: {
      metaTitle: "الحاسبات",
      metaDescription: "احسبوا العائد الإيجاري، وخطة السداد أو القسط العقاري، والتكلفة الكاملة للانتقال إلى الإمارات — ثم احصلوا على الأرقام الدقيقة من أحد مستشاري BIZBUYUK.",
      home: "الرئيسية",
      current: "الحاسبات",
      eyebrow: "احسب أرقامك",
      title: "الحاسبات",
      sub: "تقديرات سريعة للأسئلة الثلاثة التي يطرحها كل مشترٍ وكل منتقل إلى الإمارات أولاً. وللحصول على رقم يمكنكم التعويل عليه، يؤكده أحد مستشارينا بحسب حالتكم بدقة.",
      disclaimer: "هذه تقديرات فقط لأغراض التخطيط. فالأسعار والرسوم والضرائب الحكومية تتغيّر — ونحن نؤكد لكم الأرقام المعمول بها في حالتكم خلال الاستشارة.",
      cards: [
        { slug: "rental-yield", title: "العائد الإيجاري", body: "العائد المتوقع من العقار بعد خصم service charge ونسبة الشغور.", cta: "احسب العائد" },
        { slug: "payment-plan", title: "خطة السداد والقسط العقاري", body: "جدول سداد لعقار off-plan، أو القسط الشهري لقرض عقاري.", cta: "احسب الأقساط" },
        { slug: "relocation-cost", title: "تكلفة الانتقال", body: "التأشيرة، وEmirates ID، والتأمين، وإن كنتم تشترون عقاراً، تكاليف الصفقة.", cta: "قدّر التكلفة" },
      ],
      rentalYield: {
        metaTitle: "حاسبة العائد الإيجاري",
        metaDescription: "احسبوا العائد الإيجاري الإجمالي والصافي لعقار في الإمارات، مع الأخذ بعين الاعتبار service charge ونسبة الشغور.",
        nav: "العائد الإيجاري",
        eyebrow: "حاسبة العائد الإيجاري",
        title: "كم يمكن أن يُدرّ عليكم هذا العقار؟",
        sub: "أدخِلوا سعر الشراء والإيجار المتوقع. نحتسب service charge ونسبة تقديرية للشغور لنعرض لكم رقماً صافياً واقعياً، لا مجرد الرقم الأولي المعلن.",
        priceLabel: "سعر الشراء، AED",
        rentLabel: "الإيجار السنوي المتوقع، AED",
        serviceChargeLabel: "قيمة service charge السنوية، AED",
        vacancyLabel: "نسبة الشغور، %",
        grossLabel: "العائد الإجمالي",
        netLabel: "العائد الصافي",
        resultNote: "يفترض العائد الصافي أن نسبة الشغور وservice charge هما الخصمان الوحيدان. ولا يشمل تكاليف التمويل، التي تغطيها حاسبة خطة السداد والقسط العقاري.",
      },
      paymentPlan: {
        metaTitle: "حاسبة خطة السداد والقسط العقاري",
        metaDescription: "احسبوا جدول سداد لعقار off-plan أو قسط قرض عقاري عادي في الإمارات، بخيارات جاهزة للمقيمين وغير المقيمين.",
        nav: "خطة السداد",
        eyebrow: "حاسبة خطة السداد والقسط العقاري",
        title: "كيف تودّون سداد ثمنه؟",
        sub: "طريقتان للسداد: جدول Off-plan من المطوّر، أو قرض عقاري من البنك. بدّلوا بينهما للمقارنة.",
        modeOffplan: "جدول Off-plan",
        modeMortgage: "القرض العقاري",
        priceLabel: "سعر العقار، AED",
        stageDown: "الدفعة الأولى، %",
        stageDuring: "أثناء البناء، %",
        stageHandover: "عند التسليم، %",
        stagePost: "بعد التسليم، %",
        postMonthsLabel: "مدة ما بعد التسليم، بالأشهر",
        stageSumError: "يجب أن يكون مجموع المراحل الأربع 100%.",
        offplanNote: "هذا جدول توضيحي فقط، وليس شروط مطوّر بعينه. فالخطط تختلف من مطوّر لآخر ومن مشروع لآخر، وتتغيّر بين مراحل الإطلاق — ونحن نقارن لكم الخطط الفعلية المتاحة وقت شرائكم.",
        totalLabel: "الإجمالي",
        perMonthLabel: "شهرياً",
        rateLabel: "نسبة الفائدة، % سنوياً",
        downPaymentLabel: "الدفعة الأولى، %",
        termLabel: "مدة القرض، بالسنوات",
        monthlyLabel: "القسط الشهري",
        totalInterestLabel: "إجمالي الفائدة خلال مدة القرض",
        mortgageNote: "النسبة والحد الأقصى للتمويل المعروضان نقطة انطلاق نموذجية لا عرضاً فعلياً. ويؤكد البنك نسبتكم الفعلية وأهليتكم بعد مراجعة ملفكم.",
      },
      relocationCost: {
        metaTitle: "حاسبة تكلفة الانتقال",
        metaDescription: "احسبوا تكلفة الانتقال إلى الإمارات: التأشيرة، وEmirates ID، والتأمين، وإن كنتم تشترون عقاراً، تكاليف الصفقة.",
        nav: "تكلفة الانتقال",
        eyebrow: "حاسبة تكلفة الانتقال",
        title: "كم تكلّف حقاً عملية الشراء؟",
        sub: "التكاليف الحكومية لمرة واحدة فوق سعر العقار — وكيفية الحصول على Golden Visa.",
        buyingLabel: "هل تخططون لشراء عقار؟",
        buyingYes: "نعم",
        buyingNo: "لا",
        priceLabel: "سعر العقار، AED",
        lineDldTransfer: "رسوم نقل الملكية لدى DLD (4%)",
        lineDldAdmin: "رسوم DLD الإدارية",
        totalLabel: "الإجمالي التقديري",
        notBuyingNote: "لم تقرروا الشراء بعد؟ ستحتاجون هذا الحساب بمجرد تحديد العقار — عودوا إلينا في أي وقت.",
        goldenVisaTitle: "Golden Visa",
        goldenVisaNote: "استثمار عقاري بقيمة 2,000,000 AED أو أكثر يؤهّلكم للحصول على Golden Visa الإماراتية. نتولّى الإجراءات كاملة نيابةً عنكم.",
        goldenVisaCta: "اسأل عن Golden Visa",
      },
      leadCapture: {
        title: "احصل على الأرقام الدقيقة",
        body: "أرسِلوا لنا هذا التقدير، وسيؤكد لكم أحد المستشارين الأرقام الفعلية لحالتكم، عادةً خلال يوم عمل واحد.",
        name: "اسمك",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        submit: "أرسل أرقامي",
        sending: "جارٍ الإرسال…",
        success: "تم الاستلام. سيتواصل معك أحد المستشارين قريباً.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا عبر WhatsApp.",
        consent: "بإرسالك هذا الطلب، فإنك توافق على أن نتواصل معك بخصوص استفسارك.",
        whatsapp: "أو اسأل عبر WhatsApp",
      },
    },
    itPage: {
      metaTitle: "الخدمات التقنية",
      metaDescription:
        "الذراع التقنية لمجموعة BIZBUYUK GROUP — منتجات ويب وموبايل، وأنظمة أعمال، وذكاء اصطناعي، وحلول سحابية، وأمن سيبراني، وبيانات، لعملاء في أي مكان بالعالم.",
      home: "الرئيسية",
      current: "التقنية",
      hero: {
        eyebrow: "BIZBUYUK GROUP · التقنية",
        title: "المعيار نفسه الذي نبني عليه شركتنا.",
        sub: "منتجات ويب وموبايل، وأنظمة أعمال، وذكاء اصطناعي، وحلول سحابية، وأمن سيبراني، وبيانات — ينفّذها الفريق الذي بنى ويشغّل CRM الخاص بـ BIZBUYUK نفسها. شريك واحد، لكل التخصصات، لعملاء في أي مكان.",
        ctaPrimary: "تواصل مع فريق التقنية",
        ctaSecondary: "راسلنا عبر Telegram",
      },
      proof: {
        eyebrow: "لسنا مجرد عرض تقديمي",
        title: "نستخدم ما نبنيه بأنفسنا",
        items: [
          {
            title: "BIZBUYUK CRM",
            body: "العملاء المحتملون، ومسار المبيعات، والمالية، والمهام، والتقارير، لوساطة BIZBUYUK Real Estate نفسها — نظام بُني داخلياً ويستخدمه الفريق يومياً.",
            cta: "اطلب عرضاً توضيحياً",
          },
          {
            title: "LaWEra CRM",
            body: "منصة لإدارة القضايا والعملاء بُنيت لممارسة LaWEra القانونية — استقبال الطلبات، والمستندات، والفوترة في نظام واحد.",
            cta: "اطلب عرضاً توضيحياً",
          },
        ],
      },
      groupsIntro: {
        eyebrow: "ماذا نبني",
        title: "اثنا عشر تخصصاً، فريق واحد",
        lead: "اختاروا من أين يبدأ مشروعكم. معظم المشاريع تتقاطع مع أكثر من تخصص واحد من هذه — وهذا ما نناقشه بمجرد أن تراسلونا.",
        viewLabel: "عرض الخدمات",
      },
      process: {
        eyebrow: "كيف نعمل",
        title: "من رسالة على WhatsApp إلى منتج جاهز",
        steps: [
          { title: "استشارة", body: "أخبرونا بما تريدون حله. لا حاجة لتعبئة نموذج أولاً — فقط صفوه لنا." },
          { title: "تحديد النطاق", body: "نعود إليكم بما يتطلبه الأمر: الفريق، والجدول الزمني، وكيفية هيكلة السعر." },
          { title: "التنفيذ", body: "يسير العمل عبر دورات قصيرة، مع نتائج ملموسة يمكنكم الاطلاع عليها باكراً وبانتظام." },
          { title: "الدعم", body: "الإطلاق ليس النهاية. نبقى معكم للإصلاحات والتطوير والمرحلة التالية." },
        ],
      },
      cta: {
        title: "لديك مشروع في ذهنك؟",
        body: "صِفه لنا برسالة — بالإنجليزية أو الروسية أو الأوزبكية، جميعها تناسبنا. فريق التقنية يرد عليكم مباشرة، دون قوائم انتظار.",
        ctaPrimary: "راسل فريق التقنية عبر WhatsApp",
        ctaSecondary: "راسلنا عبر Telegram",
      },
      group: {
        backLabel: "جميع التخصصات",
        servicesLabel: "ما الذي يشمله",
        servicesIntro: "كل بند هنا نقطة انطلاق، لا باقة ثابتة — أخبرونا بأقربها إلى ما تحتاجونه، ونحدد الباقي معاً.",
        askLabel: "اسأل عن",
        askButton: "ناقش هذا عبر WhatsApp",
        otherLabel: "تخصصات أخرى",
        ctaTitle: "مستعدون لتحديد نطاق المشروع؟",
        ctaBody: "راسلوا فريق التقنية بضعة أسطر عن مشروعكم — حجم الفريق، والجدول الزمني التقريبي، وما تحاولون حله.",
      },
    },
    renovationPage: {
      metaTitle: "التجديد الشامل في دبي",
      metaDescription:
        "تقدّم BIZBUYUK خدمة تجديد شاملة بالكامل في دبي: تصميم داخلي وتصور ثلاثي الأبعاد، وتجديد كامل، وأثاث حسب الطلب، وتأثيث نهائي. فريق واحد، وعقد واحد، وعقار جاهز للسكن مباشرة.",
      home: "الرئيسية",
      current: "التجديد الشامل",
      hero: {
        eyebrow: "التجديد الشامل",
        l1: "عقارك.",
        l2: "رؤيتنا.",
        l3: "جاهز للسكن.",
        sub: "من مساحة فارغة إلى منزل مؤثّث بالكامل. نتولى العملية بأكملها، من التصميم والتجديد إلى الأثاث والتركيب النهائي.",
        cta: "احصل على استشارة مجانية",
        ctaAlt: "شاهد مشاريعنا",
      },
      scope: {
        title: "كل شيء. من الصفر إلى الجاهزية التامة للسكن.",
        lead: "لستم بحاجة لتنسيق عمل عشرات المقاولين. فالتجديد بأكمله يسير تحت سقف واحد، وجدول زمني واحد، وعقد واحد.",
        groups: [
          {
            title: "التصميم والتخطيط",
            items: ["التصميم الداخلي", "التخطيط المعماري", "التصور ثلاثي الأبعاد"],
          },
          {
            title: "أعمال البناء",
            items: [
              "التجديد الكامل",
              "الأعمال الكهربائية",
              "السباكة",
              "الأرضيات",
              "أعمال الدهان",
              "الأسقف والإضاءة",
              "المطبخ",
              "دورات المياه",
              "أعمال النجارة حسب الطلب",
              "الخزائن",
            ],
          },
          {
            title: "التأثيث والتسليم",
            items: [
              "الستائر",
              "الأثاث",
              "العناصر الديكورية",
              "الأجهزة المنزلية",
              "التركيب النهائي",
              "التنظيف النهائي",
            ],
          },
        ],
        closing: "تسلّموننا المفاتيح، ونعيد إليكم عقاراً جاهزاً للحياة.",
      },
      process: {
        eyebrow: "كيف نعمل",
        title: "ست مراحل، فريق واحد",
        steps: [
          {
            n: "01",
            title: "الاستشارة",
            lead: "نتعرّف على عقاركم وأسلوب حياتكم وميزانيتكم.",
            body: "نزور العقار، ونأخذ القياسات، ونناقش كيف تنوون استخدامه، ونتفق على ما يجب أن تغطيه الميزانية.",
          },
          {
            n: "02",
            title: "التصميم",
            lead: "مساحتكم تحصل على مفهوم تصميمي متكامل.",
            body: "مخططات الأرضية، والخامات، والألوان، وتوزيع الأثاث، جميعها مصممة بما يلائم ذوقكم وطريقة استخدام العقار.",
          },
          {
            n: "03",
            title: "التصور ثلاثي الأبعاد",
            lead: "شاهدوا منزلكم المستقبلي قبل بدء التجديد.",
            body: "رندرات واقعية لكل غرفة. لا يُهدَم شيء قبل أن تروا النتيجة وتوافقوا عليها.",
          },
          {
            n: "04",
            title: "التجديد",
            lead: "فريقنا يحوّل المساحة بالكامل.",
            body: "الهدم، والكهرباء، والسباكة، والتشطيبات، والنجارة، وفق الجدول الزمني المتفق عليه مع التصميم، مع تقارير دورية عن سير العمل.",
          },
          {
            n: "05",
            title: "التأثيث",
            lead: "نؤثّث كل تفصيلة.",
            body: "الأثاث، والإضاءة، والستائر، والمطبخ، والخزائن، والأجهزة، والديكور: التوريد والتوصيل والتركيب.",
          },
          {
            n: "06",
            title: "الانتقال إلى العقار",
            lead: "عقاركم جاهز.",
            body: "فحص نهائي، وتنظيف شامل، وتسليم. لا يبقى عليكم سوى إحضار حقيبتكم.",
          },
        ],
      },
      design: {
        title: "تصميم مصمَّم لأسلوب حياتكم",
        lead: "كل عقار مختلف. وكل عميل مختلف.",
        body: "يبني مصمّمونا المفهوم التصميمي حول طريقة عيشكم الفعلية، ونوع العقار، وبالنسبة للمستثمرين، حول ما يجب أن تدرّه الوحدة من عائد. الطراز قراركم أنتم، لا قالباً جاهزاً نعيد استخدامه.",
        stylesLabel: "الطرز التي ننفذها",
        styleAsk: "أرغب في مناقشة هذا الطراز",
        styles: [
          { slug: "modern", label: "Modern" },
          { slug: "minimalist", label: "البساطة" },
          { slug: "luxury", label: "Luxury" },
          { slug: "contemporary", label: "Contemporary" },
          { slug: "japandi", label: "Japandi" },
          { slug: "classic", label: "الكلاسيكي" },
          { slug: "hotel-style", label: "Hotel-style" },
          { slug: "custom", label: "تصميم مخصص" },
        ],
      },
      vision: {
        eyebrow: "رؤية التصميم",
        title: "كيف يمكن أن يبدو تجديد BIZBUYUK",
        lead: "رندرات مفاهيمية تعرض نطاق أعمالنا — من مساحة قديمة إلى أخرى جاهزة تماماً، بالطرز التي ننفذها.",
        disclaimer: "تصورات مفاهيمية، وليست مشروعاً منجزاً بعينه. شاهدوا مشاريعنا الحقيقية المصوَّرة في قسم «أعمالنا» أدناه.",
        items: [
          { slug: "villa", label: "فيلا" },
          { slug: "burj-view-apartment", label: "شقة بإطلالة على برج خليفة" },
          { slug: "office", label: "تجهيز مكتب" },
        ],
      },
      beforeAfter: { title: "من الفراغ إلى التميّز", lead: "اسحبوا المقبض لمشاهدة الغرفة نفسها قبل التجديد وبعده.", before: "قبل", after: "بعد", hint: "اسحب للمقارنة", empty: "مقارنات المشاريع قيد الإعداد.", emptyBody: "لا ننشر مقارنة «قبل/بعد» إلا لمشروع BIZBUYUK حقيقي ومنجز فعلياً — دون أي نماذج تخيلية. وستُنشر أول مقارنة فور تسليم أحد مشاريع التجديد الجارية حالياً." },
      fullService: {
        title: "فريق واحد. عقد واحد. نتيجة واحدة.",
        lead: "لا حاجة لإدارة مصممين ومقاولين ونجارين وكهربائيين وموردي أثاث كل على حدة. BIZBUYUK تنسّق المشروع من الفكرة وحتى الإنجاز الكامل.",
        cards: [
          { title: "التصميم", body: "التصميم الداخلي والتصور ثلاثي الأبعاد." },
          { title: "التجديد", body: "أعمال البناء والتجديد الكاملة." },
          { title: "النجارة", body: "أثاث وخزائن مصنوعة حسب الطلب." },
          { title: "المطبخ", body: "تصميم المطبخ وتركيبه بالكامل." },
          { title: "دورات المياه", body: "تجديد وتجهيز دورات المياه بالكامل." },
          { title: "الإضاءة", body: "مفهوم الإضاءة وتركيبها." },
          { title: "الأثاث", body: "الاختيار والتوريد والتوصيل." },
          { title: "الديكور", body: "الستائر والمرايا واللوحات والإكسسوارات." },
          { title: "الأجهزة المنزلية", body: "باقة كاملة من الأجهزة المنزلية مع التركيب." },
        ],
      },
      furniture: {
        title: "من الجدران إلى الأثاث",
        lead: "لا نتوقف عند التجديد. فالعقار يُسلَّم مكتملاً بالكامل.",
        groups: [
          {
            title: "غرفة المعيشة والطعام",
            items: ["الأرائك", "طاولات الطعام", "الكراسي", "وحدات التلفاز", "طاولات القهوة"],
          },
          {
            title: "غرفة النوم والتخزين",
            items: ["الأسرّة", "المراتب", "الخزائن", "خزائن المطبخ"],
          },
          {
            title: "المفروشات والديكور",
            items: ["الستائر", "الإضاءة", "المرايا", "السجاد", "اللوحات الفنية", "الإكسسوارات"],
          },
        ],
        cta: "أثّثوا عقاري",
      },
      investor: {
        title: "تجديد يضيف قيمة",
        lead: "العقار المصمَّم باحترافية والمؤثَّث بالكامل أسهل في التأجير، وأسهل في البيع، وتظهر صوره بشكل أفضل مقارنة بعقار فارغ.",
        items: [
          "تجديد العقار",
          "التصميم الداخلي",
          "التأثيث الكامل",
          "التجهيز للإيجار طويل الأجل",
          "التجهيز للإيجار قصير الأجل",
          "تسليم العقار",
          "تصميم موجَّه للاستثمار",
        ],
        cta: "تحدّث مع أخصائي استثمار",
      },
      portfolio: {
        title: "أعمالنا",
        lead: "مشاريع تجديد منجزة في مختلف أنحاء الإمارات.",
        filters: ["الكل", "الشقق", "الفلل", "استوديو", "1BR", "2BR", "3BR+"],
        empty: "صور المشاريع قيد الإعداد. اطلبوا منا معرض الأعمال الحالي وسنرسله لكم مباشرة.",
      },
      quote: {
        title: "كل عقار يستحق خطة مصمَّمة خصيصاً له",
        lead: "تعتمد تكلفة التجديد على المساحة، والحالة، والمفهوم التصميمي، والخامات، ومدى شمول التأثيث. أخبرونا عن عقاركم وستحصلون على عرض سعر مكتوب.",
        name: "اسمك",
        phone: "رقم WhatsApp",
        email: "البريد الإلكتروني",
        location: "موقع العقار",
        propertyType: "نوع العقار",
        propertyTypes: ["شقة", "فيلا", "تاون هاوس", "استوديو", "مكتب"],
        size: "المساحة، قدم مربع",
        condition: "الحالة الراهنة",
        conditions: ["جديد تماماً، تم تسليمه", "مسكون، يحتاج تجديداً بسيطاً", "قديم، يحتاج إزالة كاملة وإعادة بناء", "قيد الإنشاء"],
        style: "الطراز المرغوب",
        budget: "الميزانية التقديرية، AED",
        budgets: ["حتى 100k", "100k - 250k", "250k - 500k", "500k - 1M", "أكثر من 1M", "لم أحدد بعد"],
        message: "أي شيء آخر تودّون إخبارنا به",
        messagePlaceholder: "تاريخ التسليم، وما ترغبون بالإبقاء عليه، وكيف تخططون لاستخدام العقار.",
        photosNote: "هل لديكم صور للعقار؟ أرسلوها عبر WhatsApp بعد إرسال النموذج وسنرفقها بملفكم.",
        submit: "اطلب عرض سعر",
        sending: "جارٍ الإرسال…",
        success: "شكراً لكم. سنعود إليكم بأسئلة أو بعرض سعر خلال يوم عمل واحد.",
        error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا عبر WhatsApp.",
        consent: "بإرسالك هذا النموذج، فإنك توافق على أن نتواصل معك بخصوص هذا العقار.",
      },
      why: {
        title: "لماذا BIZBUYUK",
        cards: [
          { title: "جهة تواصل واحدة", body: "فريق واحد يدير المشروع بأكمله. ولديكم شخص واحد فقط تتصلون به." },
          { title: "خدمة متكاملة", body: "التصميم والتجديد والأثاث والتركيب ضمن عقد واحد." },
          { title: "عملية شفافة", body: "نطاق متفق عليه، وجدول زمني متفق عليه، وتقدّم يمكنكم رؤيته فعلياً." },
          { title: "تصميم احترافي", body: "تصميم داخلي مصمَّم خصيصاً لعقاركم، لا قالباً معاداً استخدامه." },
          { title: "ضبط الجودة", body: "تُفحص كل مرحلة قبل اعتمادها وقبل التسليم." },
          { title: "جاهز للسكن", body: "لا نكتفي بتجديد العقار، بل نجهّزه للحياة فعلياً." },
        ],
      },
      faq: {
        title: "الأسئلة الشائعة",
        lead: "إن لم تجدوا سؤالكم هنا، اسألونا عبر WhatsApp.",
        items: [
          {
            q: "كم تستغرق عملية التجديد؟",
            a: "يعتمد ذلك على المساحة ونطاق العمل. فتجديد استوديو أو شقة بغرفة نوم واحدة يُقاس عادةً بالأسابيع، بينما إزالة فيلا كاملة وإعادة بنائها تُقاس بالأشهر. تحصلون على جدول زمني مؤرَّخ مع عرض التصميم، قبل بدء أي عمل.",
          },
          {
            q: "هل تقدّمون خدمة التصميم الداخلي؟",
            a: "نعم. فالتصميم هو نقطة انطلاق كل مشروع: مخططات الأرضية، والخامات، والألوان، وتوزيع الأثاث، تليها رندرات ثلاثية الأبعاد لتعتمدوا النتيجة قبل هدم أي شيء.",
          },
          {
            q: "هل يمكنكم تجديد عقار فارغ حالياً؟",
            a: "هذه هي الحالة الأبسط. فالوحدة الفارغة لا تحتاج لحماية أثاث ولا للتنسيق حول ساكنين، لذا يكون الجدول الزمني أقصر.",
          },
          {
            q: "هل تؤمّنون الأثاث؟",
            a: "نعم. نختاره، ونوفّره، ونوصّله، ونركّبه. وتعتمدون كل قطعة في مرحلة التصميم.",
          },
          {
            q: "هل يمكنكم تأثيث الشقة بالكامل؟",
            a: "نعم، حتى المراتب والستائر والمرايا واللوحات. وعند التسليم، يكون العقار جاهزاً لتناموا فيه في المساء نفسه.",
          },
          {
            q: "هل تعملون مع الفلل؟",
            a: "نعم. الشقق والتاون هاوس والفلل، في دبي وفي مختلف أنحاء الإمارات.",
          },
          {
            q: "هل يمكنني اختيار طراز التصميم والخامات؟",
            a: "نعم. يُبنى المفهوم حول ذوقكم وميزانيتكم، وتعتمدون قائمة الخامات قبل أي عملية شراء.",
          },
          {
            q: "هل تقدّمون رندرات ثلاثية الأبعاد قبل التجديد؟",
            a: "دائماً. لا يُهدَم شيء قبل أن تروا الرندرات وتعتمدوها.",
          },
          {
            q: "هل يمكنكم إدارة المشروع وأنا خارج الإمارات؟",
            a: "نعم، والكثير من الملّاك يكونون خارج الإمارات طوال فترة المشروع. تصلكم تحديثات دورية بالصور والفيديو، وتتم الموافقات عن بُعد.",
          },
          {
            q: "هل تقدّمون عرض سعر مخصصاً؟",
            a: "نعم. يحصل كل عقار على عرض سعر خاص به بحسب المساحة، والحالة، والمفهوم التصميمي، والخامات، ومستوى التأثيث.",
          },
        ],
      },
      finalCta: {
        title: "مستعدون لتحويل عقاركم؟",
        lead: "دعونا نحوّل مساحتكم إلى منزل.",
        cta: "ابدأ مشروعك",
        ctaAlt: "راسلنا عبر WhatsApp",
      },
    },
    propertyTypes: {
      studio: "استوديو",
      apartment: "شقة",
      penthouse: "بنتهاوس",
      villa: "فيلا",
      townhouse: "تاون هاوس",
      branded: "Branded residence",
      luxury: "Luxury",
      investment: "استثماري",
      offplan: "Off-plan",
    },
    realEstatePage: {
      metaTitle: "العقارات في دبي",
      metaDescription:
        "اشترِ عقاراً في دبي مع BIZBUYUK: عقارات off-plan وجاهزة، من الاستوديوهات إلى الفلل وBranded residence، في سبع عشرة منطقة. عمولة 0% على المشتري.",
      home: "الرئيسية",
      current: "العقارات",
      hero: {
        eyebrow: "العقارات",
        title: "كل نوع عقار، في مختلف أنحاء دبي.",
        sub: "نحن لا نبيع مبنى واحداً في منطقة واحدة. بل ننطلق من ميزانيتكم وهدفكم وأفقكم الزمني، ثم نعدّ قائمة مختصرة بما يناسبكم فعلياً.",
        cta: "احجز استشارة",
        ctaAlt: "شاهد المناطق",
      },
      stats: [
        { value: "17", label: "منطقة نعمل فيها" },
        { value: "0%", label: "عمولة على المشتري" },
        { value: "2", label: "طريقتان للشراء: off-plan أو جاهز" },
      ],
      types: {
        title: "ماذا يمكنكم أن تشتروا",
        lead: "يعتمد النوع المناسب على ما إذا كنتم تشترون للسكن، أو للتأجير، أو للاحتفاظ به. هذه هي الخيارات التي نعمل بها، وما يُختار كل منها من أجله عادةً.",
        groups: [
          {
            title: "بحسب المساحة",
            items: [
              { title: "استوديو", body: "أقل سعر دخول وأعلى عائد لكل درهم. يحظى بإقبال من مشغّلي الإيجار قصير الأجل والمستأجرين الأفراد." },
              { title: "غرفة نوم واحدة", body: "أعمق سوق إيجار في دبي. سهل التأجير، وسهل إعادة البيع." },
              { title: "غرفتا نوم", body: "المرحلة التي يبدأ عندها الأزواج والعائلات الصغيرة بالبحث. أبطأ في التأجير من غرفة النوم الواحدة، لكن بعقود إيجار أطول." },
              { title: "3 غرف نوم فأكثر", body: "مخزون عقاري عائلي. مستأجرون أقل عدداً، لكنهم يبقون لسنوات، ما يقلّل من الشغور وتكلفة تبديل المستأجرين." },
              { title: "بنتهاوس", body: "وحدات في الطوابق العليا بتراسات خاصة. سوق ضيق، تحرّكه الإطلالة والتشطيب أكثر من العائد." },
            ],
          },
          {
            title: "بحسب الشكل",
            items: [
              { title: "شقة", body: "أبراج ومبانٍ متوسطة الارتفاع. تغطي service charge احتياجات المبنى، ما يجعل الملكية شبه خالية من أي عبء إداري." },
              { title: "فيلا", body: "منزل مستقل بقطعة أرض. تكلفة دخول أعلى وصيانة أكبر، لكن أقوى نمو لرأس المال في المجتمعات العائلية." },
              { title: "تاون هاوس", body: "تصميم شبيه بالفيلا بميزانية شقة. الحل الوسط المعتاد للعائلات التي تريد مساحة أكبر دون قطعة أرض مستقلة." },
            ],
          },
          {
            title: "بحسب الفئة",
            items: [
              { title: "Luxury", body: "عناوين متميزة، ومساحات أكبر، ومشترون يهتمون بالإطلالة والجيران أكثر من اهتمامهم بالعائد." },
              { title: "Branded residence", body: "تدار من قبل علامة فندقية أو علامة أزياء عالمية. سعر أعلى لكل قدم مربع، وعلاوة إيجارية تصاحبه عادةً." },
              { title: "عقار استثماري", body: "يُختار بالأرقام أولاً: العائد، وservice charge، وطلب المستأجرين، وسهولة إعادة بيعه." },
            ],
          },
        ],
      },
      paths: {
        title: "طريقتان للشراء",
        lead: "يتلخّص القرار في الغالب بهذا: السداد على دفعات أثناء البناء، أو شراء ما هو قائم فعلياً اليوم.",
        offplan: {
          title: "Off-plan",
          body: "يُشترى من المطوّر قبل البناء أو أثناءه. سعر إطلاق مميز، وخطة سداد موزّعة على فترة البناء، وغالباً أقساط بعد التسليم. تنتظرون، وتتحملون مخاطر البناء.",
          cta: "كيف يعمل نظام Off-plan",
        },
        ready: {
          title: "العقار الجاهز",
          body: "يُشترى من مالك حالي. يمكنكم معاينة الوحدة بعينها، والتحقق من المبنى، وتأجيرها بعد شهر واحد من نقل الملكية. تدفعون السعر الحالي، غالباً دفعة واحدة كاملة.",
          cta: "كيف يتم شراء العقار الجاهز",
        },
      },
      districts: {
        title: "أين نعمل",
        lead: "سبع عشرة منطقة، لكل منها سبب مختلف يدفعكم للشراء فيها. صنّفوا حسب مدى استقرار المنطقة، ثم اسألونا عن المشاريع المتاحة فيها حالياً.",
        filters: {
          all: "جميع المناطق",
          established: "مناطق راسخة",
          prestige: "مناطق راقية",
          emerging: "مناطق ناشئة",
        },
        typesLabel: "نوعية العقارات الشائعة",
        note: "نعمل أيضاً في مناطق غير مدرجة في هذه القائمة. إن كانت لديكم منطقة معينة في ذهنكم، فقط اسألونا.",
        ask: "اسأل عن هذه المنطقة",
      },
      why: {
        title: "كيف نعمل",
        cards: [
          { title: "عمولة 0% عليكم", body: "في مبيعات المطوّرين، يدفع المطوّر أتعابنا، ولا تُضاف إلى سعركم." },
          { title: "قائمة مختصرة، لا كتالوج", body: "وحدتان أو ثلاث تتوافق مع طلبكم، ولكل منها أرقامها الداعمة." },
          { title: "السوق بأكمله", body: "لسنا مرتبطين بمطوّر واحد، لذا تُختار القائمة على أساس الجدارة الفعلية." },
          { title: "الأرقام قبل المشاعر", body: "العائد، وservice charge، وخطة السداد، وخيار الخروج، جميعها مطروحة على الطاولة قبل أن تقرروا." },
          { title: "تحقّق قبل التوقيع", body: "يُتحقّق أولاً من المطوّر، وحالة المشروع، وEscrow، والعقد." },
          { title: "بعد الشراء", body: "التأثيث، والمستأجرون، والإدارة، وإعادة البيع، متى ما رغبتم بذلك." },
        ],
      },
      cta: {
        title: "أخبرونا بالميزانية والهدف.",
        body: "هذا يكفي للبدء. سنعود إليكم بعقارين أو ثلاثة مناسبة، مع التفسير المنطقي وراء كل خيار.",
      },
      offplan: {
        metaTitle: "عقارات Off-plan في دبي",
        metaDescription:
          "كيف يعمل شراء عقار off-plan في دبي: خطط السداد، والدفعة الأولى، وأقساط ما بعد التسليم، والتحقق من المطوّر وEscrow، والعملية كاملة حتى التسليم.",
        current: "Off-plan",
        hero: {
          eyebrow: "Off-plan",
          title: "اشترِ عند الإطلاق، وادفع مع تقدّم البناء.",
          sub: "الشراء off-plan هو أرخص طريقة للدخول في مشروع جديد في دبي، وهو أيضاً الأكثر تعقيداً من الناحية الإجرائية. إليكم بالتحديد كيف يعمل.",
          cta: "ناقش شراء عقار off-plan",
        },
        what: {
          title: "ما الذي يعنيه Off-plan فعلياً",
          lead: "أنتم تشترون وحدة لم تُنشأ بعد، مباشرة من المطوّر، بموجب عقد يحدد السعر وجدول البناء معاً.",
          points: [
            { title: "سعر الإطلاق", body: "الطرح الأول لأي مشروع يكون عادةً الأرخص. أما المراحل اللاحقة فتُسعَّر بحسب الطلب." },
            { title: "سداد موزّع على فترة البناء", body: "تدفعون على دفعات مرتبطة بمراحل الإنشاء، لا دفعة واحدة." },
            { title: "نمو رأس المال", body: "إن أدّت المنطقة والمشروع أداءً جيداً، فقد تصبح قيمة الوحدة عند التسليم أعلى مما تعاقدتم عليه. وقد لا تكون كذلك أيضاً." },
            { title: "مخاطر البناء", body: "مواعيد التسليم قد تتأخر. والعقد، وحساب Escrow، وسجل المطوّر، هي ما يحميكم." },
          ],
        },
        payment: {
          title: "كيف تُبنى خطط السداد",
          lead: "يكاد كل عرض يكون تنويعاً على هذه الأجزاء الأربعة. والتوزيع بينها هو ما يفرّق بين شراء مريح وآخر مرهق.",
          plans: [
            { title: "الدفعة الأولى", body: "تُدفع عند الحجز، مع توقيع نموذج الحجز. وهذا الرقم هو ما يحدد ما إذا كان المشروع في متناولكم." },
            { title: "أثناء البناء", body: "دفعات تُطلق بحسب مراحل البناء، أو في تواريخ محددة، وحتى الإنجاز الكامل." },
            { title: "عند التسليم", body: "الرصيد المتبقي المستحق عند جاهزية الوحدة وتسليم المفاتيح." },
            { title: "ما بعد التسليم", body: "يسمح بعض المطورين باستمرار جزء من السعر بعد استلام المفاتيح، بحيث يساعد الإيجار في تغطيته." },
          ],
          note: "تختلف الخطط من مطوّر لآخر ومن مشروع لآخر، وتتغيّر بين المراحل. نقارن لكم الخطط الفعلية المتاحة وقت شرائكم.",
        },
        process: {
          title: "العملية من البداية إلى النهاية",
          lead: "ثماني مراحل. تشاركون في الخمس الأولى، ونتولى نحن الباقي.",
          steps: [
            { n: "01", title: "الاستشارة", lead: "الميزانية، والهدف، والأفق الزمني.", body: "نحدد ما تريدون أن يحققه العقار لكم، والمبلغ الذي يمكنكم الالتزام به سنوياً." },
            { n: "02", title: "اختيار نوع العقار", lead: "النوع، والمساحة، والمنطقة.", body: "نضيّق الخيارات إلى نوع العقار والمناطق التي تتوافق مع طلبكم، ونستبعد الباقي." },
            { n: "03", title: "اختيار المشروع", lead: "المطوّر والمرحلة.", body: "نقارن المشاريع المطروحة من حيث السعر، وخطة السداد، وسجل التسليم، وما تدعمه المنطقة." },
            { n: "04", title: "الحجز", lead: "يتم حجز الوحدة.", body: "نموذج الحجز ودفعة الحجز. تُسحب الوحدة من السوق باسمكم." },
            { n: "05", title: "SPA", lead: "يُوقَّع العقد.", body: "نراجع معكم عقد البيع والشراء قبل التوقيع: المواعيد، والغرامات، وما يحدث إن تأخر أي طرف." },
            { n: "06", title: "التسجيل", lead: "Oqood لدى DLD.", body: "تُسجَّل الصفقة لدى Dubai Land Department ويُثبَّت حقكم رسمياً." },
            { n: "07", title: "البناء", lead: "الأقساط وسير العمل.", body: "نتابع مراحل الإنجاز ومواعيد الدفعات حتى لا يفوتكم شيء ولا تقعوا تحت طائلة أي غرامة." },
            { n: "08", title: "التسليم", lead: "المفاتيح وقائمة الملاحظات.", body: "المعاينة، وقائمة الملاحظات، والدفعة الأخيرة، والملكية. من هنا يمكننا تأثيث الوحدة أو تأجيرها." },
          ],
        },
        checks: {
          title: "ما نتحقق منه قبل التزامكم",
          items: [
            "سجل المطوّر في تسليم مشاريعه السابقة",
            "تسجيل المشروع وحالته لدى RERA",
            "أن الدفعات تودَع في حساب Escrow الخاص بالمشروع",
            "أن جدول السداد في العقد مطابق لما عُرض عليكم",
            "مواعيد التسليم، وبنود الغرامات، وشروط الفسخ",
            "ما تدعمه المنطقة فعلياً من حيث الإيجار وإعادة البيع",
          ],
        },
        cta: {
          title: "ما المشاريع المتاحة حالياً؟",
          body: "مراحل الإطلاق تُفتح وتُغلق بسرعة. أخبرونا بميزانيتكم وسنرسل لكم ما هو متاح فعلياً هذا الأسبوع.",
        },
      },
      ready: {
        metaTitle: "العقار الجاهز في دبي",
        metaDescription:
          "شراء عقار جاهز في دبي: البحث، والمعاينات، والتفاوض، والتحقق من المستندات، والنقل لدى Dubai Land Department، والتسليم.",
        current: "العقار الجاهز",
        hero: {
          eyebrow: "العقار الجاهز",
          title: "عايِن، وتحقّق، ثم اشترِ.",
          sub: "وحدة مكتملة يمكنكم التجول فيها ومعاينتها وتأجيرها بعد شهر واحد من نقل الملكية. دون أي مخاطر بناء ودون انتظار.",
          cta: "ناقش شراء عقار جاهز",
        },
        what: {
          title: "لماذا يفضّل المشترون العقار الجاهز",
          lead: "الشراء off-plan أرخص على الورق. أما العقار الجاهز فهو الخيار الأكيد.",
          points: [
            { title: "ترون الوحدة الفعلية", body: "الإطلالة، والطابق، والتشطيب، والجيران، كلها حقائق ملموسة، لا رندرات." },
            { title: "دخل من الشهر الأول", body: "يمكن تأجيرها فور إتمام نقل الملكية، فيبدأ الأصل بالعمل فوراً." },
            { title: "للمبنى سجل واضح", body: "service charge، وجودة الإدارة، وسجل الإيجار، جميعها ظاهرة للعيان قبل الشراء." },
            { title: "لا مخاطر بناء", body: "لا موعد تسليم قد يتأخر، ولا بناء يحتاج للمتابعة." },
          ],
        },
        process: {
          title: "العملية من البداية إلى النهاية",
          lead: "تسع مراحل من الموجز الأول وحتى استلام المفاتيح.",
          steps: [
            { n: "01", title: "البحث", lead: "الموجز يتحول إلى قائمة.", body: "نستعرض السوق بحسب ميزانيتكم ومنطقتكم ونوع العقار المطلوب، بما في ذلك وحدات غير معلنة للعموم." },
            { n: "02", title: "القائمة المختصرة", lead: "اثنان أو ثلاثة، لا ثلاثون.", body: "نختصر القائمة إلى ما يناسبكم فعلياً، ونوضح سبب استبعاد البقية." },
            { n: "03", title: "التحليل", lead: "الأرقام الخاصة بكل وحدة.", body: "سعر الطلب مقارنة بالصفقات الأخيرة، وservice charge، والإيجار القابل للتحقيق، والعائد الصافي." },
            { n: "04", title: "المعاينة", lead: "حضورياً أو عبر الفيديو.", body: "نستعرض معكم الوحدة والمبنى، أو نوثّقهما بدقة إن كنتم خارج الدولة." },
            { n: "05", title: "التفاوض", lead: "السعر والشروط.", body: "نتفاوض نيابة عنكم: السعر، وما يبقى داخل الوحدة، والجدول الزمني لنقل الملكية." },
            { n: "06", title: "فحص المستندات", lead: "قبل تحريك أي أموال.", body: "سند الملكية (Title Deed)، وسجل service charge، وأي رهن عقاري قائم، ووضع NOC، وأي قيود على الوحدة." },
            { n: "07", title: "الصفقة", lead: "MOU والعربون.", body: "تُوقَّع مذكرة التفاهم، ويودَع العربون وفق آليات الحماية المعتادة." },
            { n: "08", title: "التسجيل", lead: "النقل لدى DLD.", body: "NOC من المطوّر، ثم النقل لدى Dubai Land Department وإصدار سند الملكية باسمكم." },
            { n: "09", title: "التسليم", lead: "المفاتيح والخدمات.", body: "تسليم المفاتيح، وبطاقات الدخول، ونقل DEWA والتبريد باسمكم. من هنا يمكننا تأثيث الوحدة أو إيجاد مستأجر لها." },
          ],
        },
        checks: {
          title: "ما نتحقق منه في الوحدة",
          items: [
            "سند الملكية (Title Deed) والتأكد أن البائع هو المالك المسجَّل فعلياً",
            "أي رهن عقاري قائم على العقار وكيف ستتم تسويته",
            "سجل service charge وما إذا كان هناك أي مبالغ مستحقة",
            "سجل إدارة المبنى وصيانته",
            "أسعار الصفقات الأخيرة في المبنى نفسه، لا أسعار العروض المطروحة",
            "سجل الإيجار وما تحققه الوحدة فعلياً من عائد",
          ],
        },
        cta: {
          title: "تبحثون عن عقار جاهز؟",
          body: "أخبرونا بالمنطقة والميزانية. وسنعود إليكم بما هو متاح في السوق وبقيمته الفعلية.",
        },
      },
    },
  },
};

/* Shared, non-translated constants */
export const CONTACT = {
  /* Main line — also the number behind the floating WhatsApp button. */
  phone: "+971 55 479 13 13",
  phoneHref: "tel:+971554791313",
  phone2: "+971 55 182 70 10",
  phone2Href: "tel:+971551827010",
  /* The IT desk keeps its own line so those enquiries can be told apart. */
  phoneIt: "+971 50 323 00 58",
  phoneItHref: "tel:+971503230058",
  email: "info@bizbuyuk.com",
  instagram: "https://instagram.com/bizbuyukrealestate",
  instagramHandle: "@bizbuyukrealestate",
  facebook: "https://www.facebook.com/profile.php?id=61590479769092",
  youtube: "https://youtube.com/@bizbuyukrealestate",
  telegram: "https://t.me/bizbuyukrealestate",
  telegramHandle: "@bizbuyukrealestate",
  whatsapp: "https://wa.me/971554791313",
  whatsappIt: "https://wa.me/971503230058",
  telegramIt: "https://t.me/bizbuyuk_admin",
  telegramItHandle: "@bizbuyuk_admin",
};

/* The three Dubai offices. Used by the footer, the contact block and the
   organisation schema — one list so they can never drift apart. */
export const OFFICES = ["Business Bay", "Jumeirah Village Circle", "Palm Jumeirah"] as const;

/* Languages the desk actually works in, as opposed to the three the interface
   is translated into. Kept separate so the two claims never get conflated. */
export const SPOKEN_LANGUAGES = [
  "English", "Arabic", "Turkish", "Russian", "Chinese",
  "Uzbek", "Kazakh", "Kyrgyz", "Italian", "French",
] as const;

export const DEVELOPERS = [
  "EMAAR",
  "DAMAC",
  "SOBHA",
  "NAKHEEL",
  "MERAAS",
  "DUBAI PROPERTIES",
  "ELLINGTON",
  "BINGHATTI",
  "OMNIYAT",
  "AZIZI",
  "DANUBE",
];
