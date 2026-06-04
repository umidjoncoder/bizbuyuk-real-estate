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
  why: { eyebrow: string; title: string; lead: string; steps: Step[] };
  partners: { eyebrow: string; title: string };
  lead: {
    eyebrow: string;
    title: string;
    sub: string;
    name: string;
    phone: string;
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
      eyebrow: "Dubai · Real Estate · Est. 2023",
      titleA: "Your trusted partner in the",
      titleEm: "Dubai property",
      titleB: "market.",
      sub: "Off-plan launches from the emirate's leading developers, protected investments, and a seamless path to living in Dubai — guided end to end.",
      cta: "Get a consultation",
      ctaAlt: "Explore services",
      scroll: "Scroll",
    },
    marqueeIntro: "Trusted by the developers building Dubai",
    services: {
      eyebrow: "What we do",
      title: "Three ways we move your goals forward",
      items: [
        {
          tag: "01",
          title: "Real Estate",
          body: "Off-plan launches and ready homes from Dubai's largest developers. We handle search, negotiation and acquisition — at 0% commission to the buyer.",
        },
        {
          tag: "02",
          title: "Investment Protection",
          body: "Legal counsel on the safety of your capital in Dubai, due diligence on every deal, and clear resolutions when situations get complicated.",
        },
        {
          tag: "03",
          title: "Tourism & Relocation",
          body: "Visiting, residing or moving to Dubai — full support with residence permits, settling in, and everything in between.",
        },
      ],
    },
    stats: {
      eyebrow: "Why Dubai",
      title: "A market built for investors",
      items: [
        { value: "8.5%", label: "Avg. annual price growth" },
        { value: "6.2%", label: "Average rental yields" },
        { value: "0%", label: "Property & income tax" },
        { value: "0%", label: "Commission for buyers" },
      ],
    },
    why: {
      eyebrow: "Why BIZBUYUK",
      title: "Discretion, data, and the right doors",
      lead: "We are hardworking analysts who watch market trends, know the neighbourhoods, and identify the best opportunities in prime locations — directly from sellers.",
      steps: [
        { title: "Prime access", body: "Direct lines to Emaar, Nakheel, Meraas, Dubai Properties and beyond — including launches before they go public." },
        { title: "Maximum qualified buyers", body: "Advanced marketing and a broad investor network put your property in front of the right people, fast." },
        { title: "Trouble-free acquisition", body: "Seamless, transparent transactions with legal guidance from first viewing to handover." },
        { title: "Personal approach", body: "Approachable, honest and discreet — every client is advised as if their goals were our own." },
      ],
    },
    partners: { eyebrow: "Our developers", title: "We work with all developments in Dubai" },
    lead: {
      eyebrow: "Free consultation",
      title: "Leave a request — we'll call you back",
      sub: "Tell us how to reach you and a senior advisor will be in touch within one business day.",
      name: "Your name",
      phone: "Phone number",
      submit: "Send request",
      sending: "Sending…",
      success: "Thank you — we'll be in touch shortly.",
      error: "Something went wrong. Please try again or call us directly.",
      consent: "By submitting you agree to be contacted about your enquiry.",
    },
    footer: {
      blurb: "An ambitious, creative Dubai real estate agency — buying, selling and leasing residential and commercial property across the emirate.",
      address: "Address",
      addressValue: "Dubai, United Arab Emirates",
      contact: "Contact",
      follow: "Follow",
      rights: "All rights reserved.",
      nav: "Navigate",
    },
  },
  ru: {
    nav: { services: "Услуги", partners: "Застройщики", why: "Почему мы", contact: "Контакты", cta: "Консультация" },
    hero: {
      eyebrow: "Дубай · Недвижимость · с 2023",
      titleA: "Ваш надёжный партнёр на рынке",
      titleEm: "недвижимости",
      titleB: "Дубая.",
      sub: "Старты продаж off-plan от ведущих застройщиков эмирата, защита инвестиций и беспроблемный путь к жизни в Дубае — сопровождение под ключ.",
      cta: "Получить консультацию",
      ctaAlt: "Наши услуги",
      scroll: "Листайте",
    },
    marqueeIntro: "Нам доверяют застройщики, которые строят Дубай",
    services: {
      eyebrow: "Чем мы занимаемся",
      title: "Три направления для ваших целей",
      items: [
        {
          tag: "01",
          title: "Недвижимость",
          body: "Старты off-plan и готовые объекты от крупнейших застройщиков Дубая. Подбор, переговоры и сделка — с 0% комиссии для покупателя.",
        },
        {
          tag: "02",
          title: "Защита инвестиций",
          body: "Юридическое сопровождение по безопасности вашего капитала в Дубае, проверка каждой сделки и чёткие решения в сложных ситуациях.",
        },
        {
          tag: "03",
          title: "Туризм и релокация",
          body: "Поездка, проживание или переезд в Дубай — полное сопровождение по резидентским визам и обустройству.",
        },
      ],
    },
    stats: {
      eyebrow: "Почему Дубай",
      title: "Рынок, созданный для инвесторов",
      items: [
        { value: "8.5%", label: "Средний рост цен в год" },
        { value: "6.2%", label: "Средняя доходность аренды" },
        { value: "0%", label: "Налог на имущество и доход" },
        { value: "0%", label: "Комиссия для покупателя" },
      ],
    },
    why: {
      eyebrow: "Почему BIZBUYUK",
      title: "Конфиденциальность, данные и нужные двери",
      lead: "Мы — команда аналитиков, которые следят за трендами рынка, знают районы и находят лучшие возможности в премиальных локациях напрямую от продавцов.",
      steps: [
        { title: "Прямой доступ", body: "Прямые связи с Emaar, Nakheel, Meraas, Dubai Properties и другими — включая старты до публичного запуска." },
        { title: "Максимум покупателей", body: "Продвинутый маркетинг и широкая сеть инвесторов быстро находят нужного покупателя для вашего объекта." },
        { title: "Сделка без хлопот", body: "Прозрачные сделки с юридическим сопровождением — от первого показа до передачи ключей." },
        { title: "Личный подход", body: "Открыто, честно и конфиденциально — каждого клиента ведём как если бы его цели были нашими." },
      ],
    },
    partners: { eyebrow: "Наши застройщики", title: "Работаем со всеми проектами Дубая" },
    lead: {
      eyebrow: "Бесплатная консультация",
      title: "Оставьте заявку — мы перезвоним",
      sub: "Укажите контакты, и старший консультант свяжется с вами в течение рабочего дня.",
      name: "Ваше имя",
      phone: "Номер телефона",
      submit: "Отправить",
      sending: "Отправляем…",
      success: "Спасибо — мы скоро свяжемся с вами.",
      error: "Что-то пошло не так. Попробуйте ещё раз или позвоните нам.",
      consent: "Отправляя форму, вы соглашаетесь на связь по вашему запросу.",
    },
    footer: {
      blurb: "Амбициозное и креативное агентство недвижимости в Дубае — покупка, продажа и аренда жилой и коммерческой недвижимости по всему эмирату.",
      address: "Адрес",
      addressValue: "Дубай, ОАЭ",
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
];
