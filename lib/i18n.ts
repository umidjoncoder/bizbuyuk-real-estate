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
  },
  uz: {
    nav: { services: "Xizmatlar", partners: "Quruvchilar", why: "Nega biz", contact: "Aloqa", cta: "Konsultatsiya" },
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
