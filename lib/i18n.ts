/* ============================================================
   i18n dictionary.
   To add a language: add its code to `locales`, add a block to
   `dictionary`, and it appears in the switcher automatically.
   ============================================================ */

export const locales = ["en", "ru", "uz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  uz: "UZ",
};

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
  nav: { services: string; renovation: string; partners: string; why: string; contact: string; cta: string };
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
  services: { eyebrow: string; title: string; items: Service[] };
  stats: { eyebrow: string; title: string; items: Stat[] };
  why: {
    about: { eyebrow: string; title: string; body: string };
    eyebrow: string;
    cards: Step[];
  };
  partners: { eyebrow: string; title: string };
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
    address: string;
    addressValue: string;
    contact: string;
    follow: string;
    rights: string;
    nav: string;
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
    askLabel: string;
    askWhatsApp: string;
    cta: { title: string; body: string };
  };
  renovationPage: {
    metaTitle: string;
    metaDescription: string;
    home: string;
    current: string;
    hero: { eyebrow: string; l1: string; l2: string; l3: string; sub: string; cta: string; ctaAlt: string };
    scope: { title: string; lead: string; groups: ListGroup[]; closing: string };
    process: { eyebrow: string; title: string; steps: RenoStep[] };
    design: { title: string; lead: string; body: string; styles: string[] };
    beforeAfter: { title: string; lead: string; before: string; after: string; hint: string; empty: string };
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
};

export const dictionary: Record<Locale, Dict> = {
  en: {
    nav: { services: "Services", renovation: "Renovation", partners: "Developers", why: "Why Us", contact: "Contact", cta: "Get a consultation" },
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
    services: {
      eyebrow: "What we do",
      title: "Three ways we move your goals forward",
      items: [
        {
          tag: "01",
          title: "Real Estate",
          body: "Off-plan launches and ready homes from the UAE's largest developers. We handle search, negotiation and acquisition — at 0% commission to the buyer.",
        },
        {
          tag: "02",
          title: "Investment Protection",
          body: "Legal counsel on the safety of your capital in the UAE, due diligence on every deal, and clear resolutions when situations get complicated.",
        },
        {
          tag: "03",
          title: "Tourism & Relocation",
          body: "Visiting, residing or moving to the UAE — full support with residence permits, settling in, and everything in between.",
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
      address: "Address",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, United Arab Emirates.",
      contact: "Contact",
      follow: "Follow",
      rights: "All rights reserved.",
      nav: "Navigate",
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
        { value: "4", label: "Service directions" },
        { value: "19", label: "Services inside" },
        { value: "3", label: "Languages: EN / RU / UZ" },
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
      askLabel: "Question about this section?",
      askWhatsApp: "Ask on WhatsApp",
      cta: {
        title: "Not sure which service you need?",
        body: "Describe your situation in two sentences. We will tell you where to start and what you need at each step.",
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
        styles: [
          "Modern",
          "Minimalist",
          "Luxury",
          "Contemporary",
          "Japandi",
          "Classic",
          "Hotel-style",
          "Custom design",
        ],
      },
      beforeAfter: {
        title: "From empty to extraordinary",
        lead: "Drag the handle to see the same room before and after.",
        before: "Before",
        after: "After",
        hint: "Drag to compare",
        empty: "Project comparisons are being prepared.",
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
  },
  ru: {
    nav: { services: "Услуги", renovation: "Ремонт", partners: "Застройщики", why: "Почему мы", contact: "Контакты", cta: "Консультация" },
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
    services: {
      eyebrow: "Чем мы занимаемся",
      title: "Три направления для ваших целей",
      items: [
        {
          tag: "01",
          title: "Недвижимость",
          body: "Старты off-plan и готовые объекты от крупнейших застройщиков ОАЭ. Подбор, переговоры и сделка — с 0% комиссии для покупателя.",
        },
        {
          tag: "02",
          title: "Защита инвестиций",
          body: "Юридическое сопровождение по безопасности вашего капитала в ОАЭ, проверка каждой сделки и чёткие решения в сложных ситуациях.",
        },
        {
          tag: "03",
          title: "Туризм и релокация",
          body: "Поездка, проживание или переезд в ОАЭ — полное сопровождение по резидентским визам и обустройству.",
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
      address: "Адрес",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, ОАЭ.",
      contact: "Контакты",
      follow: "Соцсети",
      rights: "Все права защищены.",
      nav: "Навигация",
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
        { value: "4", label: "Направления сопровождения" },
        { value: "19", label: "Услуг внутри" },
        { value: "3", label: "Языка: RU / UZ / EN" },
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
      askLabel: "Есть вопрос по разделу?",
      askWhatsApp: "Спросить в WhatsApp",
      cta: {
        title: "Не знаете, какая услуга нужна именно вам?",
        body: "Опишите ситуацию в двух предложениях. Мы скажем, с чего начать и что понадобится на каждом шаге.",
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
        styles: [
          "Modern",
          "Минимализм",
          "Luxury",
          "Contemporary",
          "Japandi",
          "Классика",
          "Hotel-style",
          "Индивидуальный проект",
        ],
      },
      beforeAfter: {
        title: "Из пустой коробки в готовый интерьер",
        lead: "Потяните ползунок, чтобы увидеть одну и ту же комнату до и после.",
        before: "До",
        after: "После",
        hint: "Потяните для сравнения",
        empty: "Сравнения по проектам готовятся.",
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
  },
  uz: {
    nav: { services: "Xizmatlar", renovation: "Taʼmir", partners: "Quruvchilar", why: "Nega biz", contact: "Aloqa", cta: "Konsultatsiya" },
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
    services: {
      eyebrow: "Nima bilan shugʻullanamiz",
      title: "Maqsadingiz uchun uchta yoʻnalish",
      items: [
        {
          tag: "01",
          title: "Koʻchmas mulk",
          body: "BAAning yirik quruvchilaridan off-plan startlar va tayyor obyektlar. Tanlash, muzokara va bitim: xaridor uchun 0% komissiya.",
        },
        {
          tag: "02",
          title: "Investitsiya himoyasi",
          body: "BAAdagi kapitalingiz xavfsizligi boʻyicha yuridik hamrohlik, har bir bitimni tekshirish va murakkab vaziyatlarda aniq yechim.",
        },
        {
          tag: "03",
          title: "Turizm va koʻchish",
          body: "BAAga safar, yashash yoki koʻchib oʻtish: rezident vizasi va joylashishda toʻliq yordam.",
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
      address: "Manzil",
      addressValue: "Al Barsha South 4, Jumeirah Village Circle, Prime Business Center, BAA.",
      contact: "Aloqa",
      follow: "Ijtimoiy tarmoqlar",
      rights: "Barcha huquqlar himoyalangan.",
      nav: "Navigatsiya",
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
        { value: "4", label: "Xizmat yoʻnalishi" },
        { value: "19", label: "Ichki xizmat" },
        { value: "3", label: "Til: UZ / RU / EN" },
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
      askLabel: "Ushbu boʻlim boʻyicha savolingiz bormi?",
      askWhatsApp: "WhatsApp orqali soʻrash",
      cta: {
        title: "Qaysi xizmat aynan sizga kerakligini bilmayapsizmi?",
        body: "Vaziyatingizni ikki gapda yozing. Nimadan boshlash va har bir qadamda nima kerakligini aytamiz.",
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
        styles: [
          "Modern",
          "Minimalizm",
          "Luxury",
          "Contemporary",
          "Japandi",
          "Klassika",
          "Hotel-style",
          "Individual loyiha",
        ],
      },
      beforeAfter: {
        title: "Boʻsh xonadondan mukammal interyergacha",
        lead: "Bir xil xonani oldin va keyin koʻrish uchun tutqichni suring.",
        before: "Oldin",
        after: "Keyin",
        hint: "Solishtirish uchun suring",
        empty: "Loyihalar boʻyicha taqqoslashlar tayyorlanmoqda.",
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
  },
};

/* Shared, non-translated constants */
export const CONTACT = {
  phone: "+971 55 479 13 13",
  phoneHref: "tel:+971554791313",
  phone2: "+971 55 182 7010",
  phone2Href: "tel:+971551827010",
  email: "info@bizbuyuk.com",
  instagram: "https://instagram.com/bizbuyukrealestate",
  instagramHandle: "@bizbuyukrealestate",
  facebook: "https://facebook.com/bizbuyukrealestate",
  youtube: "https://youtube.com/@bizbuyukrealestate",
  whatsapp: "https://wa.me/971554791313",
};

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
