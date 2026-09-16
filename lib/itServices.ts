/* ============================================================
   BIZBUYUK GROUP — technology services catalogue.

   Real estate is BIZBUYUK's main business; this is the second thing
   the company does, built to the same standard. Everything listed
   here is something the team can actually deliver — see itPage.proof
   in lib/i18n.ts for the two systems (this real estate platform's own
   CRM, and LaWEra's) that back that claim.

   Twelve groups, six services each. Each group gets its own page at
   /it/<slug>; the hub at /it links out to all twelve. Add a group by
   appending to IT_GROUPS — the hub grid and the dynamic route both
   read from this array, so nothing else needs to change.
   ============================================================ */

import type { Locale } from "./i18n";

export type ITGroup = {
  slug: string;
  title: Record<Locale, string>;
  blurb: Record<Locale, string>;
  items: Record<Locale, string>[];
};

export const IT_GROUPS: ITGroup[] = [
  {
    slug: "web",
    title: { en: "Web & Digital Products", ru: "Веб и цифровые продукты", uz: "Veb va raqamli mahsulotlar" },
    blurb: {
      en: "Corporate sites, stores and client portals — built to load fast and hold up under real traffic.",
      ru: "Корпоративные сайты, магазины и клиентские порталы — быстрые и устойчивые под реальной нагрузкой.",
      uz: "Korporativ saytlar, doʻkonlar va mijozlar portallari — tez ishlaydigan va real yuklama ostida barqaror.",
    },
    items: [
      { en: "Corporate websites & landing pages", ru: "Корпоративные сайты и лендинги", uz: "Korporativ saytlar va lending sahifalar" },
      { en: "E-commerce platforms", ru: "E-commerce платформы", uz: "E-commerce platformalar" },
      { en: "Client portals & dashboards", ru: "Клиентские порталы и дашборды", uz: "Mijozlar portali va dashboardlar" },
      { en: "Headless CMS builds", ru: "Сборка на headless CMS", uz: "Headless CMS asosida qurish" },
      { en: "Multilingual & Arabic RTL localisation", ru: "Мультиязычность и арабская RTL-локализация", uz: "Koʻp tillilik va arabcha RTL lokalizatsiya" },
      { en: "Site migration & performance overhaul", ru: "Миграция сайта и ускорение производительности", uz: "Sayt migratsiyasi va tezlikni oshirish" },
    ],
  },
  {
    slug: "mobile",
    title: { en: "Mobile Apps", ru: "Мобильные приложения", uz: "Mobil ilovalar" },
    blurb: {
      en: "Native and cross-platform apps, taken all the way through to the App Store and Google Play.",
      ru: "Нативные и кроссплатформенные приложения — до публикации в App Store и Google Play.",
      uz: "Native va cross-platform ilovalar — App Store va Google Play'ga chiqarishgacha.",
    },
    items: [
      { en: "iOS — Swift / SwiftUI", ru: "iOS — Swift / SwiftUI", uz: "iOS — Swift / SwiftUI" },
      { en: "Android — Kotlin", ru: "Android — Kotlin", uz: "Android — Kotlin" },
      { en: "Cross-platform — React Native, Flutter", ru: "Кроссплатформенно — React Native, Flutter", uz: "Cross-platform — React Native, Flutter" },
      { en: "App Store & Google Play submission", ru: "Публикация в App Store и Google Play", uz: "App Store va Google Play'ga joylash" },
      { en: "Push notifications & mobile analytics", ru: "Push-уведомления и мобильная аналитика", uz: "Push-bildirishnoma va mobil analitika" },
      { en: "Legacy app modernisation", ru: "Модернизация устаревших приложений", uz: "Eski ilovalarni zamonaviylashtirish" },
    ],
  },
  {
    slug: "business-systems",
    title: { en: "Business Systems", ru: "Бизнес-системы", uz: "Biznes tizimlari" },
    blurb: {
      en: "The systems a growing company runs on — the same category as the CRM behind this website.",
      ru: "Системы, на которых работает растущая компания — та же категория, что и CRM за этим сайтом.",
      uz: "Oʻsayotgan kompaniya ishlaydigan tizimlar — aynan shu saytning orqasidagi CRM kabi.",
    },
    items: [
      { en: "CRM — leads, pipeline, reporting", ru: "CRM — лиды, воронка, отчётность", uz: "CRM — lidlar, voronka, hisobot" },
      { en: "ERP — finance, inventory, procurement", ru: "ERP — финансы, склад, закупки", uz: "ERP — moliya, ombor, xarid" },
      { en: "HRM — staff, attendance, payroll", ru: "HRM — персонал, учёт времени, зарплата", uz: "HRM — xodimlar, davomat, ish haqi" },
      { en: "Booking & reservation systems", ru: "Системы бронирования", uz: "Bron qilish tizimlari" },
      { en: "Document workflow & e-signature", ru: "Документооборот и электронная подпись", uz: "Hujjat aylanmasi va elektron imzo" },
      { en: "Internal company portals", ru: "Внутренние корпоративные порталы", uz: "Ichki korporativ portallar" },
    ],
  },
  {
    slug: "integrations",
    title: { en: "Integrations & APIs", ru: "Интеграции и API", uz: "Integratsiya va API" },
    blurb: {
      en: "Making the tools you already use talk to each other, instead of living as separate spreadsheets.",
      ru: "Соединяем инструменты, которыми вы уже пользуетесь, вместо разрозненных таблиц.",
      uz: "Allaqachon ishlatayotgan vositalaringizni bir-biriga ulaymiz — alohida jadvallar oʻrniga.",
    },
    items: [
      { en: "REST & GraphQL API design", ru: "Проектирование REST и GraphQL API", uz: "REST va GraphQL API loyihalash" },
      { en: "Payment gateway integration", ru: "Интеграция платёжных шлюзов", uz: "Toʻlov shlyuzlarini integratsiya qilish" },
      { en: "WhatsApp Business API & Telegram bots", ru: "WhatsApp Business API и Telegram-боты", uz: "WhatsApp Business API va Telegram botlar" },
      { en: "CRM/ERP connectors (Bitrix24, amoCRM, HubSpot)", ru: "Коннекторы CRM/ERP (Bitrix24, amoCRM, HubSpot)", uz: "CRM/ERP konnektorlari (Bitrix24, amoCRM, HubSpot)" },
      { en: "Call tracking & telephony", ru: "Коллтрекинг и телефония", uz: "Qoʻngʻiroqlarni kuzatish va telefoniya" },
      { en: "Legacy system migration", ru: "Миграция с устаревших систем", uz: "Eski tizimlardan koʻchirish" },
    ],
  },
  {
    slug: "ai",
    title: { en: "Artificial Intelligence", ru: "Искусственный интеллект", uz: "Sunʼiy intellekt" },
    blurb: {
      en: "Practical AI: it answers a ticket, reads a contract, or scores a lead — not a slide-deck demo.",
      ru: "Прикладной ИИ: отвечает на обращение, читает договор, оценивает лида — а не демо для презентации.",
      uz: "Amaliy sunʼiy intellekt: murojaatga javob beradi, shartnomani oʻqiydi, lidni baholaydi — taqdimot uchun emas.",
    },
    items: [
      { en: "AI chat & customer-support agents", ru: "AI-чат и агенты поддержки клиентов", uz: "AI-chat va mijozlarga yordam agentlari" },
      { en: "Document intelligence — OCR + LLM", ru: "Обработка документов — OCR + LLM", uz: "Hujjatlarni tahlil qilish — OCR + LLM" },
      { en: "Contract review & risk scoring", ru: "Проверка договоров и скоринг рисков", uz: "Shartnoma tekshiruvi va risk skoringi" },
      { en: "Lead scoring & sales forecasting", ru: "Скоринг лидов и прогноз продаж", uz: "Lid skoring va sotuv prognozi" },
      { en: "Computer vision & quality inspection", ru: "Компьютерное зрение и контроль качества", uz: "Computer vision va sifat nazorati" },
      { en: "Adding AI to an existing product", ru: "Внедрение AI в существующий продукт", uz: "Mavjud mahsulotga AI qoʻshish" },
    ],
  },
  {
    slug: "data",
    title: { en: "Data & Analytics", ru: "Данные и аналитика", uz: "Maʼlumot va analitika" },
    blurb: {
      en: "Turning scattered records into numbers your team can actually act on.",
      ru: "Превращаем разрозненные записи в цифры, на которые команда может опираться.",
      uz: "Tarqoq yozuvlarni jamoangiz haqiqatda tayanadigan raqamlarga aylantiramiz.",
    },
    items: [
      { en: "Data warehousing", ru: "Хранилища данных", uz: "Data warehouse qurish" },
      { en: "ETL / ELT pipelines", ru: "ETL / ELT пайплайны", uz: "ETL / ELT pipeline" },
      { en: "BI dashboards — Power BI, Metabase", ru: "BI-дашборды — Power BI, Metabase", uz: "BI dashboard — Power BI, Metabase" },
      { en: "Database design & optimisation", ru: "Проектирование и оптимизация баз данных", uz: "Maʼlumotlar bazasini loyihalash va optimallashtirish" },
      { en: "Real-time analytics", ru: "Аналитика в реальном времени", uz: "Real vaqt analitikasi" },
      { en: "Reporting automation", ru: "Автоматизация отчётности", uz: "Hisobotlarni avtomatlashtirish" },
    ],
  },
  {
    slug: "cloud",
    title: { en: "Cloud & DevOps", ru: "Облако и DevOps", uz: "Cloud va DevOps" },
    blurb: {
      en: "Infrastructure that stays up at 3am, and a deploy process nobody has to be afraid of.",
      ru: "Инфраструктура, которая держится в 3 часа ночи, и деплой, которого никто не боится.",
      uz: "Tunning uchida ham ishlab turadigan infratuzilma va hech kim qoʻrqmaydigan deploy jarayoni.",
    },
    items: [
      { en: "AWS / Azure / GCP architecture & migration", ru: "Архитектура и миграция AWS / Azure / GCP", uz: "AWS / Azure / GCP arxitekturasi va migratsiyasi" },
      { en: "Kubernetes, Docker, Terraform", ru: "Kubernetes, Docker, Terraform", uz: "Kubernetes, Docker, Terraform" },
      { en: "CI/CD pipelines", ru: "CI/CD пайплайны", uz: "CI/CD pipeline" },
      { en: "Monitoring & observability", ru: "Мониторинг и observability", uz: "Monitoring va observability" },
      { en: "Backup & disaster recovery", ru: "Резервное копирование и аварийное восстановление", uz: "Zaxira nusxa va falokatdan tiklash" },
      { en: "Load testing & auto-scaling", ru: "Нагрузочное тестирование и автомасштабирование", uz: "Yuklama testi va avto-scaling" },
    ],
  },
  {
    slug: "security",
    title: { en: "Cybersecurity", ru: "Кибербезопасность", uz: "Kiberxavfsizlik" },
    blurb: {
      en: "Finding the hole before someone else does, and proving it's fixed.",
      ru: "Находим уязвимость раньше, чем кто-то другой, и подтверждаем, что она закрыта.",
      uz: "Kamchilikni boshqa birov topmasdan avval topamiz va tuzatilganini isbotlaymiz.",
    },
    items: [
      { en: "Security audits & vulnerability assessment", ru: "Аудит безопасности и оценка уязвимостей", uz: "Xavfsizlik auditi va zaifliklarni baholash" },
      { en: "Penetration testing", ru: "Пентест", uz: "Penetration testing" },
      { en: "Zero Trust, SSO & MFA", ru: "Zero Trust, SSO и MFA", uz: "Zero Trust, SSO va MFA" },
      { en: "Incident response", ru: "Реагирование на инциденты", uz: "Insidentlarga javob berish" },
      { en: "UAE PDPL & GDPR compliance", ru: "Соответствие UAE PDPL и GDPR", uz: "UAE PDPL va GDPR muvofiqligi" },
      { en: "Security awareness training", ru: "Обучение сотрудников кибербезопасности", uz: "Xodimlar uchun xavfsizlik treningi" },
    ],
  },
  {
    slug: "design",
    title: { en: "Product & Design", ru: "Продукт и дизайн", uz: "Mahsulot va dizayn" },
    blurb: {
      en: "Interfaces people can actually use, and a brand that looks like it means it.",
      ru: "Интерфейсы, которыми реально удобно пользоваться, и бренд, которому веришь.",
      uz: "Odamlar haqiqatda qulay foydalana oladigan interfeys va jiddiy koʻrinadigan brend.",
    },
    items: [
      { en: "UX research", ru: "UX-исследования", uz: "UX tadqiqot" },
      { en: "UI design & prototyping", ru: "UI-дизайн и прототипирование", uz: "UI dizayn va prototiplash" },
      { en: "Design systems", ru: "Дизайн-системы", uz: "Dizayn tizimlari" },
      { en: "Branding & identity", ru: "Брендинг и айдентика", uz: "Brending va identifikatsiya" },
      { en: "Motion design & 3D render", ru: "Моушн-дизайн и 3D-рендер", uz: "Motion dizayn va 3D render" },
      { en: "Conversion-focused redesign", ru: "Редизайн под конверсию", uz: "Konversiyaga yoʻnaltirilgan redizayn" },
    ],
  },
  {
    slug: "marketing",
    title: { en: "Digital Marketing", ru: "Digital-маркетинг", uz: "Raqamli marketing" },
    blurb: {
      en: "Getting the product found, then proving which channel actually paid for itself.",
      ru: "Делаем продукт заметным и показываем, какой канал реально окупился.",
      uz: "Mahsulotni topiladigan qilamiz va qaysi kanal oʻzini oqlaganini koʻrsatamiz.",
    },
    items: [
      { en: "SEO — technical, local, multilingual", ru: "SEO — техническое, локальное, мультиязычное", uz: "SEO — texnik, lokal, koʻp tilli" },
      { en: "Google, Meta & TikTok Ads", ru: "Реклама в Google, Meta и TikTok", uz: "Google, Meta va TikTok reklamasi" },
      { en: "Analytics setup — GA4, GTM", ru: "Настройка аналитики — GA4, GTM", uz: "Analitika sozlash — GA4, GTM" },
      { en: "A/B testing & CRO", ru: "A/B-тестирование и CRO", uz: "A/B test va CRO" },
      { en: "Marketing automation", ru: "Маркетинговая автоматизация", uz: "Marketing avtomatlashtiruvi" },
      { en: "Reputation & review management", ru: "Управление репутацией и отзывами", uz: "Reputatsiya va otzivlarni boshqarish" },
    ],
  },
  {
    slug: "consulting",
    title: { en: "Consulting & Teams", ru: "Консалтинг и команды", uz: "Konsalting va jamoalar" },
    blurb: {
      en: "A technical partner for a decision, a due-diligence report, or the whole next six months.",
      ru: "Технический партнёр для решения, отчёта due diligence или на следующие полгода целиком.",
      uz: "Bitta qaror, due diligence hisoboti yoki keyingi olti oy uchun texnik hamkor.",
    },
    items: [
      { en: "IT strategy & digital transformation", ru: "IT-стратегия и цифровая трансформация", uz: "IT strategiya va raqamli transformatsiya" },
      { en: "Technical audits", ru: "Технический аудит", uz: "Texnik audit" },
      { en: "Technical due diligence for investors", ru: "Техническое due diligence для инвесторов", uz: "Investorlar uchun texnik due diligence" },
      { en: "Dedicated team / staff augmentation", ru: "Выделенная команда / augmentation", uz: "Maxsus jamoa / staff augmentation" },
      { en: "MVP & startup technical partnership", ru: "MVP и техническое партнёрство для стартапов", uz: "MVP va startaplar uchun texnik hamkorlik" },
      { en: "CTO-as-a-service", ru: "CTO-as-a-service", uz: "CTO-as-a-service" },
    ],
  },
  {
    slug: "uae",
    title: { en: "UAE-specific", ru: "Специфика ОАЭ", uz: "BAAga xos yechimlar" },
    blurb: {
      en: "The local integrations and compliance work a UAE business runs into sooner or later.",
      ru: "Локальные интеграции и комплаенс, с которыми рано или поздно сталкивается любой бизнес в ОАЭ.",
      uz: "BAAdagi har qanday biznes ertami-kechmi duch keladigan lokal integratsiya va muvofiqlik ishlari.",
    },
    items: [
      { en: "UAE Pass integration", ru: "Интеграция UAE Pass", uz: "UAE Pass integratsiyasi" },
      { en: "DLD, Trakheesi & Ejari integration", ru: "Интеграция DLD, Trakheesi и Ejari", uz: "DLD, Trakheesi va Ejari integratsiyasi" },
      { en: "FTA e-invoicing & VAT compliance", ru: "FTA e-invoicing и соответствие НДС", uz: "FTA e-invoicing va QQS muvofiqligi" },
      { en: "Free zone / mainland technical setup support", ru: "Техническая поддержка запуска в free zone / mainland", uz: "Free zone / mainland texnik sozlash yordami" },
      { en: "Arabic RTL localisation", ru: "Арабская RTL-локализация", uz: "Arabcha RTL lokalizatsiya" },
      { en: "Local hosting & data residency", ru: "Локальный хостинг и резидентность данных", uz: "Lokal hosting va maʼlumot rezidentligi" },
    ],
  },
];

export function itGroupBySlug(slug: string): ITGroup | undefined {
  return IT_GROUPS.find((g) => g.slug === slug);
}
