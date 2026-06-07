/* ============================================================
   i18n dictionary.
   To add a language: add its code to `locales`, add a block to
   `dictionary`, and it appears in the switcher automatically.
   ============================================================ */

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
};

type Service = { title: string; body: string; tag: string };
type Stat = { value: string; label: string };
type Step = { title: string; body: string };

export type Dict = {
  nav: { services: string; partners: string; why: string; contact: string; cta: string };
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
};

export const dictionary: Record<Locale, Dict> = {
  en: {
    nav: { services: "Services", partners: "Developers", why: "Why Us", contact: "Contact", cta: "Get a consultation" },
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
  },
  ru: {
    nav: { services: "Услуги", partners: "Застройщики", why: "Почему мы", contact: "Контакты", cta: "Консультация" },
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
