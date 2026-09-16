/* ============================================================
   BIZBUYUK GROUP — technology services catalogue.

   Real estate is BIZBUYUK's main business; this is the second thing
   the company does, built to the same standard. Everything listed
   here is something the team can actually deliver — see itPage.proof
   in lib/i18n.ts for the two systems (this real estate platform's own
   CRM, and LaWEra's) that back that claim.

   Twelve groups, six services each, and every service carries a real
   one-line description — not just a label — so a group page reads as
   an actual explanation of the work, not a bare list of nouns. Each
   group gets its own page at /it/<slug>; the hub at /it links out to
   all twelve. Add a group by appending to IT_GROUPS — the hub grid and
   the dynamic route both read from this array, so nothing else needs
   to change.
   ============================================================ */

import type { Locale } from "./i18n";
import type { LucideIcon } from "lucide-react";
import {
  Globe,
  Smartphone,
  Building2,
  Plug,
  Sparkles,
  BarChart3,
  Cloud,
  ShieldCheck,
  Palette,
  Megaphone,
  Users,
  MapPin,
} from "lucide-react";

export type ITServiceItem = {
  label: Record<Locale, string>;
  description: Record<Locale, string>;
  /** Representative tools/technologies — language-agnostic, shown as-is. */
  stack: string[];
};

export type ITGroup = {
  slug: string;
  icon: LucideIcon;
  /** /public/it/groups/<slug>.webp — one dedicated hero image per discipline. */
  heroImage: string;
  title: Record<Locale, string>;
  blurb: Record<Locale, string>;
  items: ITServiceItem[];
};

export const IT_GROUPS: ITGroup[] = [
  {
    slug: "web",
    icon: Globe,
    heroImage: "/it/groups/web.webp",
    title: { en: "Web & Digital Products", ru: "Веб и цифровые продукты", uz: "Veb va raqamli mahsulotlar" },
    blurb: {
      en: "Corporate sites, stores and client portals — built to load fast and hold up under real traffic.",
      ru: "Корпоративные сайты, магазины и клиентские порталы — быстрые и устойчивые под реальной нагрузкой.",
      uz: "Korporativ saytlar, doʻkonlar va mijozlar portallari — tez ishlaydigan va real yuklama ostida barqaror.",
    },
    items: [
      {
        label: { en: "Corporate websites & landing pages", ru: "Корпоративные сайты и лендинги", uz: "Korporativ saytlar va lending sahifalar" },
        description: {
          en: "A site built to convert, not just exist: fast pages, clear copy, and a design that doesn't look templated.",
          ru: "Сайт, который создан продавать, а не просто существовать: быстрые страницы, понятные тексты и дизайн, не похожий на шаблон.",
          uz: "Shunchaki mavjud boʻlish uchun emas, sotish uchun qurilgan sayt: tez sahifalar, tushunarli matn va shablon boʻlmagan dizayn.",
        },
        stack: ["Next.js", "React", "Tailwind CSS"],
      },
      {
        label: { en: "E-commerce platforms", ru: "E-commerce платформы", uz: "E-commerce platformalar" },
        description: {
          en: "Product catalogue, cart, checkout and payment, built to handle real order volume, not a demo store.",
          ru: "Каталог товаров, корзина, оформление заказа и оплата — рассчитаны на реальный поток заказов, а не на демо-магазин.",
          uz: "Mahsulot katalogi, savat, buyurtma va toʻlov — demo doʻkon emas, real buyurtma hajmiga moʻljallangan.",
        },
        stack: ["Shopify", "Next.js", "Stripe"],
      },
      {
        label: { en: "Client portals & dashboards", ru: "Клиентские порталы и дашборды", uz: "Mijozlar portali va dashboardlar" },
        description: {
          en: "A logged-in space where your clients or team track orders, cases or data without emailing you for updates.",
          ru: "Личный кабинет, где клиенты или команда следят за заказами, делами или данными — без писем «а что там по статусу».",
          uz: "Mijoz yoki jamoa buyurtma, ish yoki maʼlumotni sizdan xat kutmasdan oʻzi kuzatadigan shaxsiy kabinet.",
        },
        stack: ["React", "Node.js", "PostgreSQL"],
      },
      {
        label: { en: "Headless CMS builds", ru: "Сборка на headless CMS", uz: "Headless CMS asosida qurish" },
        description: {
          en: "Content your team can edit without touching code, on a front end that stays fast because the CMS never renders the page itself.",
          ru: "Контент, который команда меняет без участия разработчика, на быстром фронтенде — потому что CMS не рендерит страницу сама.",
          uz: "Jamoangiz dasturchisiz oʻzgartira oladigan kontent — sayt tez ishlaydi, chunki CMS sahifani oʻzi render qilmaydi.",
        },
        stack: ["Sanity", "Contentful", "Next.js"],
      },
      {
        label: { en: "Multilingual & Arabic RTL localisation", ru: "Мультиязычность и арабская RTL-локализация", uz: "Koʻp tillilik va arabcha RTL lokalizatsiya" },
        description: {
          en: "Every string, date and currency adapted per language — including a properly mirrored Arabic layout, not just flipped text.",
          ru: "Каждая строка, дата и валюта адаптированы под язык — включая корректно зеркалированный арабский макет, а не просто перевёрнутый текст.",
          uz: "Har bir matn, sana va valyuta til boʻyicha moslashtiriladi — arabcha uchun shunchaki matn aylantirilmaydi, butun maket toʻgʻri oynadek aks ettiriladi.",
        },
        stack: ["next-intl", "RTL CSS", "Next.js"],
      },
      {
        label: { en: "Site migration & performance overhaul", ru: "Миграция сайта и ускорение производительности", uz: "Sayt migratsiyasi va tezlikni oshirish" },
        description: {
          en: "Moving off a slow platform or fixing one that's already live, without losing your search rankings in the process.",
          ru: "Переезд с медленной платформы или ускорение уже работающего сайта — без потери позиций в поиске.",
          uz: "Sekin platformadan koʻchish yoki ishlab turgan saytni tezlashtirish — qidiruv tizimidagi oʻrinlarni yoʻqotmasdan.",
        },
        stack: ["Next.js", "Cloudflare", "Lighthouse"],
      },
    ],
  },
  {
    slug: "mobile",
    icon: Smartphone,
    heroImage: "/it/groups/mobile.webp",
    title: { en: "Mobile Apps", ru: "Мобильные приложения", uz: "Mobil ilovalar" },
    blurb: {
      en: "Native and cross-platform apps, taken all the way through to the App Store and Google Play.",
      ru: "Нативные и кроссплатформенные приложения — до публикации в App Store и Google Play.",
      uz: "Native va cross-platform ilovalar — App Store va Google Play'ga chiqarishgacha.",
    },
    items: [
      {
        label: { en: "iOS — Swift / SwiftUI", ru: "iOS — Swift / SwiftUI", uz: "iOS — Swift / SwiftUI" },
        description: {
          en: "A native app built with Apple's own toolkit, so it feels like it belongs on the device, not like a wrapped webpage.",
          ru: "Нативное приложение на инструментах самой Apple — ощущается частью устройства, а не обёрнутым сайтом.",
          uz: "Apple'ning oʻz vositalari bilan qurilgan native ilova — qurilmaning bir qismidek his qilinadi, sayt oʻrami emas.",
        },
        stack: ["Swift", "SwiftUI", "Xcode"],
      },
      {
        label: { en: "Android — Kotlin", ru: "Android — Kotlin", uz: "Android — Kotlin" },
        description: {
          en: "A native Android build tuned for the phones your users actually carry, not just a flagship device in a lab.",
          ru: "Нативная Android-сборка, настроенная под телефоны реальных пользователей, а не только под флагман в лаборатории.",
          uz: "Foydalanuvchilaringiz haqiqatda ishlatadigan telefonlarga moslashtirilgan native Android ilova, faqat laboratoriya flagmani emas.",
        },
        stack: ["Kotlin", "Jetpack Compose", "Android Studio"],
      },
      {
        label: { en: "Cross-platform — React Native, Flutter", ru: "Кроссплатформенно — React Native, Flutter", uz: "Cross-platform — React Native, Flutter" },
        description: {
          en: "One codebase shipping to both app stores, when a single native app for each platform isn't the priority.",
          ru: "Один код — публикация в оба магазина, когда отдельное нативное приложение под каждую платформу не приоритет.",
          uz: "Har bir platforma uchun alohida native ilova ustuvor boʻlmaganda — bitta kod ikkala doʻkonga chiqadi.",
        },
        stack: ["React Native", "Flutter", "Expo"],
      },
      {
        label: { en: "App Store & Google Play submission", ru: "Публикация в App Store и Google Play", uz: "App Store va Google Play'ga joylash" },
        description: {
          en: "Store listings, screenshots, review responses and the submission itself — handled end to end, including the rejections.",
          ru: "Карточка приложения, скриншоты, ответы модераторам и сама публикация — от начала до конца, включая отклонения.",
          uz: "Doʻkon sahifasi, skrinshotlar, tekshiruvga javoblar va joylashning oʻzi — rad javoblarini ham hisobga olgan holda, boshidan oxirigacha.",
        },
        stack: ["App Store Connect", "Google Play Console", "Fastlane"],
      },
      {
        label: { en: "Push notifications & mobile analytics", ru: "Push-уведомления и мобильная аналитика", uz: "Push-bildirishnoma va mobil analitika" },
        description: {
          en: "Know which screens people actually use, and reach them again without spamming them into uninstalling.",
          ru: "Видно, какими экранами реально пользуются, и есть способ вернуть пользователя — не заспамив его до удаления приложения.",
          uz: "Odamlar qaysi ekranlardan foydalanishini bilasiz va ilovani oʻchirib tashlamaydigan tarzda ularga qayta murojaat qilasiz.",
        },
        stack: ["Firebase", "OneSignal", "Mixpanel"],
      },
      {
        label: { en: "Legacy app modernisation", ru: "Модернизация устаревших приложений", uz: "Eski ilovalarni zamonaviylashtirish" },
        description: {
          en: "Bringing an old codebase back to a maintainable, current state without a full rewrite from zero.",
          ru: "Возвращаем старый код в поддерживаемое, актуальное состояние — без переписывания с нуля.",
          uz: "Eski kodni noldan qayta yozmasdan, zamonaviy va qoʻllab-quvvatlanadigan holatga qaytaramiz.",
        },
        stack: ["Kotlin", "Swift", "CI/CD"],
      },
    ],
  },
  {
    slug: "business-systems",
    icon: Building2,
    heroImage: "/it/groups/business-systems.webp",
    title: { en: "Business Systems", ru: "Бизнес-системы", uz: "Biznes tizimlari" },
    blurb: {
      en: "The systems a growing company runs on — the same category as the CRM behind this website.",
      ru: "Системы, на которых работает растущая компания — та же категория, что и CRM за этим сайтом.",
      uz: "Oʻsayotgan kompaniya ishlaydigan tizimlar — aynan shu saytning orqasidagi CRM kabi.",
    },
    items: [
      {
        label: { en: "CRM — leads, pipeline, reporting", ru: "CRM — лиды, воронка, отчётность", uz: "CRM — lidlar, voronka, hisobot" },
        description: {
          en: "Every lead in one pipeline, with the reporting a sales manager actually checks each morning.",
          ru: "Все лиды в одной воронке, с отчётностью, которую руководитель отдела продаж реально смотрит каждое утро.",
          uz: "Barcha lidlar bitta voronkada, sotuv menejeri har kuni ertalab haqiqatda koʻradigan hisobot bilan.",
        },
        stack: ["PostgreSQL", "Prisma", "Next.js"],
      },
      {
        label: { en: "ERP — finance, inventory, procurement", ru: "ERP — финансы, склад, закупки", uz: "ERP — moliya, ombor, xarid" },
        description: {
          en: "Stock counts, purchase orders and financials in one system instead of three spreadsheets that disagree with each other.",
          ru: "Остатки, заказы поставщикам и финансы — в одной системе вместо трёх таблиц, которые не сходятся друг с другом.",
          uz: "Ombor qoldigʻi, xarid buyurtmalari va moliya — bir-biriga mos kelmaydigan uchta jadval oʻrniga bitta tizimda.",
        },
        stack: ["PostgreSQL", "Node.js", "REST API"],
      },
      {
        label: { en: "HRM — staff, attendance, payroll", ru: "HRM — персонал, учёт времени, зарплата", uz: "HRM — xodimlar, davomat, ish haqi" },
        description: {
          en: "Attendance, leave and payroll calculated automatically, not reassembled by hand at month end.",
          ru: "Явки, отпуска и зарплата считаются автоматически, а не собираются вручную в конце месяца.",
          uz: "Davomat, taʼtil va ish haqi avtomatik hisoblanadi, oy oxirida qoʻlda yigʻilmaydi.",
        },
        stack: ["Node.js", "PostgreSQL", "React"],
      },
      {
        label: { en: "Booking & reservation systems", ru: "Системы бронирования", uz: "Bron qilish tizimlari" },
        description: {
          en: "Real-time availability, double-booking prevention, and confirmations that go out without a human in the loop.",
          ru: "Доступность в реальном времени, защита от двойного бронирования и подтверждения, которые уходят без участия человека.",
          uz: "Real vaqtda boʻsh joylar, ikki marta bron boʻlishning oldi olinishi va odam ishtirokisiz yuboriladigan tasdiqlar.",
        },
        stack: ["Node.js", "PostgreSQL", "WebSockets"],
      },
      {
        label: { en: "Document workflow & e-signature", ru: "Документооборот и электронная подпись", uz: "Hujjat aylanmasi va elektron imzo" },
        description: {
          en: "Approvals and signatures that move through a defined chain, with a record of who signed what and when.",
          ru: "Согласования и подписи проходят по заданной цепочке, с историей — кто, что и когда подписал.",
          uz: "Tasdiqlash va imzolar belgilangan zanjir boʻyicha oʻtadi, kim nimani va qachon imzolagani yozib boriladi.",
        },
        stack: ["DocuSign API", "Node.js", "PDF.js"],
      },
      {
        label: { en: "Internal company portals", ru: "Внутренние корпоративные порталы", uz: "Ichki korporativ portallar" },
        description: {
          en: "One place for policies, requests and announcements, instead of a group chat nobody can search.",
          ru: "Одно место для регламентов, заявок и объявлений — вместо группового чата, в котором ничего не найти.",
          uz: "Qoidalar, soʻrovlar va eʼlonlar uchun bitta joy — hech narsa topilmaydigan guruh chati oʻrniga.",
        },
        stack: ["Next.js", "PostgreSQL", "Auth.js"],
      },
    ],
  },
  {
    slug: "integrations",
    icon: Plug,
    heroImage: "/it/groups/integrations.webp",
    title: { en: "Integrations & APIs", ru: "Интеграции и API", uz: "Integratsiya va API" },
    blurb: {
      en: "Making the tools you already use talk to each other, instead of living as separate spreadsheets.",
      ru: "Соединяем инструменты, которыми вы уже пользуетесь, вместо разрозненных таблиц.",
      uz: "Allaqachon ishlatayotgan vositalaringizni bir-biriga ulaymiz — alohida jadvallar oʻrniga.",
    },
    items: [
      {
        label: { en: "REST & GraphQL API design", ru: "Проектирование REST и GraphQL API", uz: "REST va GraphQL API loyihalash" },
        description: {
          en: "An API your own team — or a partner's — can actually integrate against, documented, not guessed at.",
          ru: "API, с которым реально можно интегрироваться — вашей команде или партнёру — с документацией, а не догадками.",
          uz: "Jamoangiz yoki hamkoringiz haqiqatda ulana oladigan, hujjatlashtirilgan API — taxmin qilishga majbur qilmaydigan.",
        },
        stack: ["Node.js", "GraphQL", "OpenAPI"],
      },
      {
        label: { en: "Payment gateway integration", ru: "Интеграция платёжных шлюзов", uz: "Toʻlov shlyuzlarini integratsiya qilish" },
        description: {
          en: "Cards, wallets and local payment methods wired in correctly, with failed payments handled instead of silently lost.",
          ru: "Карты, кошельки и локальные способы оплаты подключены правильно, а неудачные платежи не теряются молча.",
          uz: "Kartalar, hamyonlar va lokal toʻlov usullari toʻgʻri ulanadi, muvaffaqiyatsiz toʻlovlar sezdirmay yoʻqolib qolmaydi.",
        },
        stack: ["Stripe", "Network International", "Telr"],
      },
      {
        label: { en: "WhatsApp Business API & Telegram bots", ru: "WhatsApp Business API и Telegram-боты", uz: "WhatsApp Business API va Telegram botlar" },
        description: {
          en: "Automated replies, order updates and lead capture on the channels your customers already use.",
          ru: "Автоответы, статусы заказов и приём лидов — на тех каналах, которыми уже пользуются ваши клиенты.",
          uz: "Mijozlaringiz allaqachon ishlatayotgan kanallarda avtomatik javob, buyurtma holati va lid qabul qilish.",
        },
        stack: ["WhatsApp Cloud API", "Telegram Bot API", "Node.js"],
      },
      {
        label: { en: "CRM/ERP connectors (Bitrix24, amoCRM, HubSpot)", ru: "Коннекторы CRM/ERP (Bitrix24, amoCRM, HubSpot)", uz: "CRM/ERP konnektorlari (Bitrix24, amoCRM, HubSpot)" },
        description: {
          en: "Your website, app and existing CRM kept in sync, so a lead entered once shows up everywhere.",
          ru: "Сайт, приложение и текущая CRM синхронизированы — лид, внесённый один раз, появляется везде.",
          uz: "Sayt, ilova va mavjud CRM sinxron ishlaydi — bir marta kiritilgan lid hamma joyda koʻrinadi.",
        },
        stack: ["Bitrix24 API", "amoCRM API", "HubSpot API"],
      },
      {
        label: { en: "Call tracking & telephony", ru: "Коллтрекинг и телефония", uz: "Qoʻngʻiroqlarni kuzatish va telefoniya" },
        description: {
          en: "Know which ad or page a call actually came from, and record it against the right lead.",
          ru: "Видно, с какой рекламы или страницы пришёл звонок, и он записывается за нужным лидом.",
          uz: "Qoʻngʻiroq aynan qaysi reklama yoki sahifadan kelganini bilasiz, u toʻgʻri lidga yoziladi.",
        },
        stack: ["Twilio", "CallRail", "Node.js"],
      },
      {
        label: { en: "Legacy system migration", ru: "Миграция с устаревших систем", uz: "Eski tizimlardan koʻchirish" },
        description: {
          en: "Moving data and workflows off a system you're retiring, without losing history in the process.",
          ru: "Перенос данных и процессов с системы, которую вы выводите из эксплуатации, без потери истории.",
          uz: "Foydalanishdan chiqarayotgan tizimingizdan maʼlumot va jarayonlarni tarixni yoʻqotmasdan koʻchirish.",
        },
        stack: ["SQL", "ETL scripts", "Node.js"],
      },
    ],
  },
  {
    slug: "ai",
    icon: Sparkles,
    heroImage: "/it/groups/ai.webp",
    title: { en: "Artificial Intelligence", ru: "Искусственный интеллект", uz: "Sunʼiy intellekt" },
    blurb: {
      en: "Practical AI: it answers a ticket, reads a contract, or scores a lead — not a slide-deck demo.",
      ru: "Прикладной ИИ: отвечает на обращение, читает договор, оценивает лида — а не демо для презентации.",
      uz: "Amaliy sunʼiy intellekt: murojaatga javob beradi, shartnomani oʻqiydi, lidni baholaydi — taqdimot uchun emas.",
    },
    items: [
      {
        label: { en: "AI chat & customer-support agents", ru: "AI-чат и агенты поддержки клиентов", uz: "AI-chat va mijozlarga yordam agentlari" },
        description: {
          en: "A support agent that answers from your actual documentation, and hands off to a human when it should.",
          ru: "Агент поддержки, который отвечает по вашей реальной базе знаний и передаёт диалог человеку, когда это нужно.",
          uz: "Sizning haqiqiy hujjatlaringizdan javob beradigan va kerak boʻlganda odamga uzatadigan yordamchi agent.",
        },
        stack: ["Claude", "OpenAI", "LangChain"],
      },
      {
        label: { en: "Document intelligence — OCR + LLM", ru: "Обработка документов — OCR + LLM", uz: "Hujjatlarni tahlil qilish — OCR + LLM" },
        description: {
          en: "Contracts, invoices and forms read and structured automatically, instead of retyped by someone at a desk.",
          ru: "Договоры, счета и формы считываются и структурируются автоматически — вместо ручного перепечатывания.",
          uz: "Shartnoma, hisob-faktura va formalar qoʻlda qayta terilmasdan, avtomatik oʻqilib tuzilmaga solinadi.",
        },
        stack: ["OCR", "GPT-4", "Python"],
      },
      {
        label: { en: "Contract review & risk scoring", ru: "Проверка договоров и скоринг рисков", uz: "Shartnoma tekshiruvi va risk skoringi" },
        description: {
          en: "Flags the clause that matters before you sign, not after a dispute makes you go looking for it.",
          ru: "Отмечает важный пункт до подписания, а не после того, как спор заставит его искать.",
          uz: "Imzolashdan oldin muhim bandni belgilaydi — nizo chiqib, uni qidirishga majbur boʻlgandan keyin emas.",
        },
        stack: ["Claude", "Python", "NLP"],
      },
      {
        label: { en: "Lead scoring & sales forecasting", ru: "Скоринг лидов и прогноз продаж", uz: "Lid skoring va sotuv prognozi" },
        description: {
          en: "Which leads are worth calling first, based on your own historical data, not a generic formula.",
          ru: "Кому звонить в первую очередь — на основе ваших собственных исторических данных, а не общей формулы.",
          uz: "Qaysi lidga birinchi qoʻngʻiroq qilish kerakligini — umumiy formula emas, oʻz tarixiy maʼlumotlaringiz asosida koʻrsatadi.",
        },
        stack: ["Python", "scikit-learn", "PostgreSQL"],
      },
      {
        label: { en: "Computer vision & quality inspection", ru: "Компьютерное зрение и контроль качества", uz: "Computer vision va sifat nazorati" },
        description: {
          en: "Cameras that catch a defect or count stock accurately, faster and more consistently than a manual check.",
          ru: "Камеры, которые точнее и быстрее человека находят брак или считают остатки.",
          uz: "Nuqsonni topadigan yoki tovarni aniq sanaydigan kameralar — qoʻlda tekshirishdan tezroq va barqarorroq.",
        },
        stack: ["OpenCV", "PyTorch", "Python"],
      },
      {
        label: { en: "Adding AI to an existing product", ru: "Внедрение AI в существующий продукт", uz: "Mavjud mahsulotga AI qoʻshish" },
        description: {
          en: "A model wired into what you already run, not a separate tool your team has to remember to open.",
          ru: "Модель встроена в то, чем вы уже пользуетесь, а не отдельный инструмент, про который нужно вспоминать.",
          uz: "Model allaqachon ishlatayotgan tizimingizga ulanadi — jamoangiz eslab, alohida ochishi kerak boʻlgan vosita emas.",
        },
        stack: ["Claude API", "OpenAI API", "Python"],
      },
    ],
  },
  {
    slug: "data",
    icon: BarChart3,
    heroImage: "/it/groups/data.webp",
    title: { en: "Data & Analytics", ru: "Данные и аналитика", uz: "Maʼlumot va analitika" },
    blurb: {
      en: "Turning scattered records into numbers your team can actually act on.",
      ru: "Превращаем разрозненные записи в цифры, на которые команда может опираться.",
      uz: "Tarqoq yozuvlarni jamoangiz haqiqatda tayanadigan raqamlarga aylantiramiz.",
    },
    items: [
      {
        label: { en: "Data warehousing", ru: "Хранилища данных", uz: "Data warehouse qurish" },
        description: {
          en: "Every source — CRM, site, app, ads — landing in one place built for analysis, not just storage.",
          ru: "Все источники — CRM, сайт, приложение, реклама — в одном месте, созданном для анализа, а не просто хранения.",
          uz: "CRM, sayt, ilova, reklama — barcha manbalar tahlil uchun qurilgan bitta joyga tushadi, shunchaki saqlash uchun emas.",
        },
        stack: ["BigQuery", "Snowflake", "ClickHouse"],
      },
      {
        label: { en: "ETL / ELT pipelines", ru: "ETL / ELT пайплайны", uz: "ETL / ELT pipeline" },
        description: {
          en: "Data moved and cleaned on a schedule, so the report is right without someone running a script by hand.",
          ru: "Данные переносятся и очищаются по расписанию — отчёт верный без ручного запуска скрипта.",
          uz: "Maʼlumot jadval boʻyicha koʻchiriladi va tozalanadi — hisobot birov qoʻlda skript ishga tushirmasdan toʻgʻri chiqadi.",
        },
        stack: ["Airflow", "dbt", "Python"],
      },
      {
        label: { en: "BI dashboards — Power BI, Metabase", ru: "BI-дашборды — Power BI, Metabase", uz: "BI dashboard — Power BI, Metabase" },
        description: {
          en: "The three numbers your team checks daily, on one screen, instead of buried in five different exports.",
          ru: "Три цифры, которые команда смотрит каждый день, на одном экране — вместо пяти разных выгрузок.",
          uz: "Jamoangiz har kuni koʻradigan uchta raqam bitta ekranda — beshta turli fayl ichida yoʻqolib qolmaydi.",
        },
        stack: ["Power BI", "Metabase", "Looker"],
      },
      {
        label: { en: "Database design & optimisation", ru: "Проектирование и оптимизация баз данных", uz: "Maʼlumotlar bazasini loyihalash va optimallashtirish" },
        description: {
          en: "A schema that stays fast as your data grows, not one that needs a rewrite at 100,000 rows.",
          ru: "Схема, которая остаётся быстрой с ростом данных — а не требует переделки на 100 000 строк.",
          uz: "Maʼlumot koʻpaysa ham tez ishlaydigan tuzilma — 100 000 qatorda qayta yozishga majbur qilmaydigan.",
        },
        stack: ["PostgreSQL", "MySQL", "Redis"],
      },
      {
        label: { en: "Real-time analytics", ru: "Аналитика в реальном времени", uz: "Real vaqt analitikasi" },
        description: {
          en: "Numbers that update as the event happens, for the cases where yesterday's report is already too late.",
          ru: "Цифры, обновляющиеся по мере событий — для случаев, когда вчерашний отчёт уже опоздал.",
          uz: "Voqea sodir boʻlishi bilan yangilanadigan raqamlar — kechagi hisobot kech qolgan holatlar uchun.",
        },
        stack: ["Kafka", "ClickHouse", "WebSockets"],
      },
      {
        label: { en: "Reporting automation", ru: "Автоматизация отчётности", uz: "Hisobotlarni avtomatlashtirish" },
        description: {
          en: "The weekly report that used to take an afternoon, generated and sent on its own.",
          ru: "Еженедельный отчёт, на который раньше уходил день, теперь формируется и отправляется сам.",
          uz: "Ilgari yarim kunni oladigan haftalik hisobot endi oʻzi tuziladi va oʻzi yuboriladi.",
        },
        stack: ["Python", "Node.js", "Google Sheets API"],
      },
    ],
  },
  {
    slug: "cloud",
    icon: Cloud,
    heroImage: "/it/groups/cloud.webp",
    title: { en: "Cloud & DevOps", ru: "Облако и DevOps", uz: "Cloud va DevOps" },
    blurb: {
      en: "Infrastructure that stays up at 3am, and a deploy process nobody has to be afraid of.",
      ru: "Инфраструктура, которая держится в 3 часа ночи, и деплой, которого никто не боится.",
      uz: "Tunning uchida ham ishlab turadigan infratuzilma va hech kim qoʻrqmaydigan deploy jarayoni.",
    },
    items: [
      {
        label: { en: "AWS / Azure / GCP architecture & migration", ru: "Архитектура и миграция AWS / Azure / GCP", uz: "AWS / Azure / GCP arxitekturasi va migratsiyasi" },
        description: {
          en: "Infrastructure sized for what you actually run, migrated without a weekend of downtime.",
          ru: "Инфраструктура под реальную нагрузку, миграция — без простоя на выходные.",
          uz: "Haqiqiy yuklamangizga mos infratuzilma, dam olish kunlaridagi uzilishlarsiz koʻchirish.",
        },
        stack: ["AWS", "Azure", "Google Cloud"],
      },
      {
        label: { en: "Kubernetes, Docker, Terraform", ru: "Kubernetes, Docker, Terraform", uz: "Kubernetes, Docker, Terraform" },
        description: {
          en: "Infrastructure defined as code, so a new environment is a command, not a week of manual setup.",
          ru: "Инфраструктура описана кодом — новое окружение это команда, а не неделя ручной настройки.",
          uz: "Infratuzilma kod sifatida yoziladi — yangi muhit bitta buyruq, bir hafta qoʻlda sozlash emas.",
        },
        stack: ["Kubernetes", "Docker", "Terraform"],
      },
      {
        label: { en: "CI/CD pipelines", ru: "CI/CD пайплайны", uz: "CI/CD pipeline" },
        description: {
          en: "A deploy that runs tests automatically and ships in minutes, not a manual process someone dreads doing on a Friday.",
          ru: "Деплой, который сам прогоняет тесты и выкатывается за минуты, а не ручной процесс, которого боятся в пятницу.",
          uz: "Testlarni oʻzi ishga tushiradigan va daqiqalarda chiqadigan deploy — juma kuni hech kim qoʻrqmaydigan.",
        },
        stack: ["GitHub Actions", "GitLab CI", "Jenkins"],
      },
      {
        label: { en: "Monitoring & observability", ru: "Мониторинг и observability", uz: "Monitoring va observability" },
        description: {
          en: "An alert before your users notice something's wrong, with enough context to fix it without guessing.",
          ru: "Оповещение раньше, чем пользователи заметят проблему, с контекстом, чтобы чинить без догадок.",
          uz: "Foydalanuvchi muammoni sezishidan oldin ogohlantirish, taxmin qilmasdan tuzatish uchun yetarli maʼlumot bilan.",
        },
        stack: ["Grafana", "Datadog", "Sentry"],
      },
      {
        label: { en: "Backup & disaster recovery", ru: "Резервное копирование и аварийное восстановление", uz: "Zaxira nusxa va falokatdan tiklash" },
        description: {
          en: "A tested restore process, not just a backup file nobody has ever tried to recover from.",
          ru: "Проверенный процесс восстановления — а не просто файл бэкапа, который никто ни разу не пробовал развернуть.",
          uz: "Sinovdan oʻtgan tiklash jarayoni — hech kim bir marta ham urinib koʻrmagan zaxira fayl emas.",
        },
        stack: ["AWS S3", "Velero", "Restic"],
      },
      {
        label: { en: "Load testing & auto-scaling", ru: "Нагрузочное тестирование и автомасштабирование", uz: "Yuklama testi va avto-scaling" },
        description: {
          en: "Knowing what breaks under real traffic before a launch day finds out for you.",
          ru: "Известно, что сломается под реальной нагрузкой — до того, как это покажет день запуска.",
          uz: "Real trafik ostida nima buzilishini ishga tushirish kunidan oldin bilib olasiz.",
        },
        stack: ["k6", "AWS Auto Scaling", "Locust"],
      },
    ],
  },
  {
    slug: "security",
    icon: ShieldCheck,
    heroImage: "/it/groups/security.webp",
    title: { en: "Cybersecurity", ru: "Кибербезопасность", uz: "Kiberxavfsizlik" },
    blurb: {
      en: "Finding the hole before someone else does, and proving it's fixed.",
      ru: "Находим уязвимость раньше, чем кто-то другой, и подтверждаем, что она закрыта.",
      uz: "Kamchilikni boshqa birov topmasdan avval topamiz va tuzatilganini isbotlaymiz.",
    },
    items: [
      {
        label: { en: "Security audits & vulnerability assessment", ru: "Аудит безопасности и оценка уязвимостей", uz: "Xavfsizlik auditi va zaifliklarni baholash" },
        description: {
          en: "A clear list of what's actually exploitable, ranked by real risk, not a 200-page scan dump.",
          ru: "Понятный список реально эксплуатируемых уязвимостей по уровню риска — а не 200-страничный дамп сканера.",
          uz: "Haqiqatda xavfli boʻlgan kamchiliklarning real xatar boʻyicha aniq roʻyxati — 200 sahifalik skaner hisoboti emas.",
        },
        stack: ["OWASP ZAP", "Burp Suite", "Nessus"],
      },
      {
        label: { en: "Penetration testing", ru: "Пентест", uz: "Penetration testing" },
        description: {
          en: "An authorized attempt to break in, so you find the gap before someone without permission does.",
          ru: "Санкционированная попытка взлома — чтобы вы нашли брешь раньше, чем это сделает кто-то без разрешения.",
          uz: "Ruxsat etilgan buzib kirish urinishi — teshikni ruxsatsiz kirgan odam emas, avval siz topasiz.",
        },
        stack: ["Burp Suite", "Metasploit", "Nmap"],
      },
      {
        label: { en: "Zero Trust, SSO & MFA", ru: "Zero Trust, SSO и MFA", uz: "Zero Trust, SSO va MFA" },
        description: {
          en: "Access that's verified every time, not assumed because someone's already inside the network.",
          ru: "Доступ проверяется каждый раз — а не считается безопасным просто потому, что кто-то уже внутри сети.",
          uz: "Kirish har safar tekshiriladi — birov allaqachon tarmoq ichida boʻlgani uchun ishonib qoʻyilmaydi.",
        },
        stack: ["Okta", "Auth0", "Keycloak"],
      },
      {
        label: { en: "Incident response", ru: "Реагирование на инциденты", uz: "Insidentlarga javob berish" },
        description: {
          en: "A plan and a team on call for when something does go wrong, not a scramble to figure out who to call.",
          ru: "План и команда на связи на случай, если что-то пойдёт не так — а не паника в поисках, кому звонить.",
          uz: "Nimadir notoʻgʻri ketganda tayyor reja va aloqadagi jamoa — kimga qoʻngʻiroq qilishni izlab sarosimaga tushish emas.",
        },
        stack: ["PagerDuty", "Sentry", "Runbooks"],
      },
      {
        label: { en: "UAE PDPL & GDPR compliance", ru: "Соответствие UAE PDPL и GDPR", uz: "UAE PDPL va GDPR muvofiqligi" },
        description: {
          en: "Data handling brought in line with what the law actually requires, documented for when you're asked.",
          ru: "Работа с данными приведена в соответствие с реальными требованиями закона, задокументирована на случай проверки.",
          uz: "Maʼlumot bilan ishlash qonun talab qiladigan darajaga keltiriladi va soʻralganda koʻrsatish uchun hujjatlashtiriladi.",
        },
        stack: ["DPIA", "Policy audits", "Data mapping"],
      },
      {
        label: { en: "Security awareness training", ru: "Обучение сотрудников кибербезопасности", uz: "Xodimlar uchun xavfsizlik treningi" },
        description: {
          en: "The staff training that closes the gap no firewall can — the one where someone clicks the wrong link.",
          ru: "Обучение сотрудников закрывает брешь, которую не закроет ни один файрвол — момент, когда кто-то кликает не туда.",
          uz: "Hech qanday xavfsizlik devori yopa olmaydigan boʻshliqni — birov notoʻgʻri havolani bosgan lahzani — xodimlar treningi yopadi.",
        },
        stack: ["Phishing simulations", "Workshops", "KnowBe4"],
      },
    ],
  },
  {
    slug: "design",
    icon: Palette,
    heroImage: "/it/groups/design.webp",
    title: { en: "Product & Design", ru: "Продукт и дизайн", uz: "Mahsulot va dizayn" },
    blurb: {
      en: "Interfaces people can actually use, and a brand that looks like it means it.",
      ru: "Интерфейсы, которыми реально удобно пользоваться, и бренд, которому веришь.",
      uz: "Odamlar haqiqatda qulay foydalana oladigan interfeys va jiddiy koʻrinadigan brend.",
    },
    items: [
      {
        label: { en: "UX research", ru: "UX-исследования", uz: "UX tadqiqot" },
        description: {
          en: "Watching how people actually use what you built, before redesigning it based on opinions in a meeting.",
          ru: "Смотрим, как люди реально пользуются продуктом — до того, как переделывать его по мнениям с совещания.",
          uz: "Yigʻilishdagi fikrlar asosida qayta qurishdan oldin, odamlar mahsulotdan haqiqatda qanday foydalanishini kuzatamiz.",
        },
        stack: ["Figma", "Maze", "User interviews"],
      },
      {
        label: { en: "UI design & prototyping", ru: "UI-дизайн и прототипирование", uz: "UI dizayn va prototiplash" },
        description: {
          en: "A clickable prototype your team can react to before a single line of code gets written.",
          ru: "Кликабельный прототип, на который команда может отреагировать до написания первой строки кода.",
          uz: "Bitta ham kod yozilmasdan, jamoangiz fikr bildira oladigan bosiladigan prototip.",
        },
        stack: ["Figma", "Framer"],
      },
      {
        label: { en: "Design systems", ru: "Дизайн-системы", uz: "Dizayn tizimlari" },
        description: {
          en: "Reusable components and rules so every new screen looks like it belongs to the same product.",
          ru: "Переиспользуемые компоненты и правила — каждый новый экран выглядит частью того же продукта.",
          uz: "Qayta ishlatiladigan komponent va qoidalar — har bir yangi ekran bitta mahsulotga tegishlidek koʻrinadi.",
        },
        stack: ["Figma", "Storybook", "Tailwind CSS"],
      },
      {
        label: { en: "Branding & identity", ru: "Брендинг и айдентика", uz: "Brending va identifikatsiya" },
        description: {
          en: "A visual identity built to hold up across a website, an app, a pitch deck and a business card alike.",
          ru: "Визуальная идентика, одинаково убедительная на сайте, в приложении, презентации и на визитке.",
          uz: "Sayt, ilova, taqdimot va vizit kartochkasida bir xil ishonarli koʻrinadigan vizual uslub.",
        },
        stack: ["Illustrator", "Figma"],
      },
      {
        label: { en: "Motion design & 3D render", ru: "Моушн-дизайн и 3D-рендер", uz: "Motion dizayn va 3D render" },
        description: {
          en: "Product renders and interface animation that make a pitch or a store listing look finished, not draft.",
          ru: "Рендеры продукта и анимация интерфейса — презентация или карточка в сторе выглядит готовой, а не черновиком.",
          uz: "Mahsulot renderlari va interfeys animatsiyasi — taqdimot yoki doʻkon sahifasi qoralama emas, tayyor koʻrinadi.",
        },
        stack: ["After Effects", "Blender", "Cinema 4D"],
      },
      {
        label: { en: "Conversion-focused redesign", ru: "Редизайн под конверсию", uz: "Konversiyaga yoʻnaltirilgan redizayn" },
        description: {
          en: "A redesign judged by whether more people actually complete the action you want, not by opinion.",
          ru: "Редизайн оценивается по тому, больше ли людей реально совершают нужное действие, а не по мнениям.",
          uz: "Redizayn fikr-mulohaza emas, koʻproq odam kerakli harakatni bajarayaptimi-yoʻqmi bilan baholanadi.",
        },
        stack: ["Figma", "Hotjar", "A/B testing"],
      },
    ],
  },
  {
    slug: "marketing",
    icon: Megaphone,
    heroImage: "/it/groups/marketing.webp",
    title: { en: "Digital Marketing", ru: "Digital-маркетинг", uz: "Raqamli marketing" },
    blurb: {
      en: "Getting the product found, then proving which channel actually paid for itself.",
      ru: "Делаем продукт заметным и показываем, какой канал реально окупился.",
      uz: "Mahsulotni topiladigan qilamiz va qaysi kanal oʻzini oqlaganini koʻrsatamiz.",
    },
    items: [
      {
        label: { en: "SEO — technical, local, multilingual", ru: "SEO — техническое, локальное, мультиязычное", uz: "SEO — texnik, lokal, koʻp tilli" },
        description: {
          en: "Fixing what's actually blocking your rankings, then building the content and links that move them.",
          ru: "Сначала устраняем то, что реально мешает позициям, затем наращиваем контент и ссылки, которые их двигают.",
          uz: "Avval oʻrinlarga haqiqatda xalaqit berayotgan narsani tuzatamiz, keyin ularni siljitadigan kontent va havolalar quramiz.",
        },
        stack: ["Ahrefs", "Search Console", "Screaming Frog"],
      },
      {
        label: { en: "Google, Meta & TikTok Ads", ru: "Реклама в Google, Meta и TikTok", uz: "Google, Meta va TikTok reklamasi" },
        description: {
          en: "Campaigns built around what you sell, measured by cost per real result, not just impressions.",
          ru: "Кампании строятся вокруг того, что вы продаёте, и оцениваются по стоимости реального результата, а не по показам.",
          uz: "Nima sotayotganingizga qarab qurilgan kampaniyalar — koʻrsatilishlar emas, real natija narxi boʻyicha oʻlchanadi.",
        },
        stack: ["Google Ads", "Meta Ads Manager", "TikTok Ads"],
      },
      {
        label: { en: "Analytics setup — GA4, GTM", ru: "Настройка аналитики — GA4, GTM", uz: "Analitika sozlash — GA4, GTM" },
        description: {
          en: "Tracking that actually captures the events that matter, set up once and correctly.",
          ru: "Отслеживание, которое реально фиксирует важные события — настроено один раз и правильно.",
          uz: "Muhim voqealarni haqiqatda ushlab qoladigan kuzatuv — bir marta va toʻgʻri sozlanadi.",
        },
        stack: ["GA4", "Google Tag Manager"],
      },
      {
        label: { en: "A/B testing & CRO", ru: "A/B-тестирование и CRO", uz: "A/B test va CRO" },
        description: {
          en: "Two versions of a page tested against real visitors, so the decision is made by data, not by whoever's louder in the room.",
          ru: "Две версии страницы проверяются на реальных посетителях — решение принимают данные, а не тот, кто громче говорит.",
          uz: "Sahifaning ikki varianti real tashrif buyuruvchilarda sinaladi — qaror ovozi baland odam emas, maʼlumot asosida qabul qilinadi.",
        },
        stack: ["PostHog", "VWO", "Hotjar"],
      },
      {
        label: { en: "Marketing automation", ru: "Маркетинговая автоматизация", uz: "Marketing avtomatlashtiruvi" },
        description: {
          en: "The follow-up email or message that goes out on its own when someone takes a specific action.",
          ru: "Письмо или сообщение, которое уходит само, когда пользователь совершает определённое действие.",
          uz: "Foydalanuvchi maʼlum harakatni qilganda oʻzi yuboriladigan xat yoki xabar.",
        },
        stack: ["Klaviyo", "Mailchimp", "Zapier"],
      },
      {
        label: { en: "Reputation & review management", ru: "Управление репутацией и отзывами", uz: "Reputatsiya va otzivlarni boshqarish" },
        description: {
          en: "A process for asking happy customers for reviews, and responding to the ones who weren't, before it becomes a pattern.",
          ru: "Процесс, который просит отзывы у довольных клиентов и отвечает недовольным — до того, как это станет закономерностью.",
          uz: "Mamnun mijozlardan otziv soʻrash va norozilardan tizim boʻlib qolmasdan oldin javob berish jarayoni.",
        },
        stack: ["Google Business Profile", "Trustpilot"],
      },
    ],
  },
  {
    slug: "consulting",
    icon: Users,
    heroImage: "/it/groups/consulting.webp",
    title: { en: "Consulting & Teams", ru: "Консалтинг и команды", uz: "Konsalting va jamoalar" },
    blurb: {
      en: "A technical partner for a decision, a due-diligence report, or the whole next six months.",
      ru: "Технический партнёр для решения, отчёта due diligence или на следующие полгода целиком.",
      uz: "Bitta qaror, due diligence hisoboti yoki keyingi olti oy uchun texnik hamkor.",
    },
    items: [
      {
        label: { en: "IT strategy & digital transformation", ru: "IT-стратегия и цифровая трансформация", uz: "IT strategiya va raqamli transformatsiya" },
        description: {
          en: "A roadmap that says what to build first and why, before a single developer is hired.",
          ru: "Дорожная карта — что строить в первую очередь и почему, до найма первого разработчика.",
          uz: "Bitta ham dasturchi yollashdan oldin, nimani va nega birinchi qurish kerakligini koʻrsatuvchi reja.",
        },
        stack: ["Roadmapping", "Workshops"],
      },
      {
        label: { en: "Technical audits", ru: "Технический аудит", uz: "Texnik audit" },
        description: {
          en: "An honest read on your current codebase or infrastructure — what's fine, what's a risk, what needs to be rebuilt.",
          ru: "Честная оценка текущего кода или инфраструктуры — что в порядке, что риск, что нужно переделать.",
          uz: "Joriy kod yoki infratuzilmangizga halol baho — nima yaxshi, nima xavfli, nimani qayta qurish kerak.",
        },
        stack: ["Code review", "Architecture review"],
      },
      {
        label: { en: "Technical due diligence for investors", ru: "Техническое due diligence для инвесторов", uz: "Investorlar uchun texnik due diligence" },
        description: {
          en: "The technical review an investor's term sheet is waiting on, delivered on their timeline.",
          ru: "Техническая проверка, которую ждёт term sheet инвестора — в его сроки.",
          uz: "Investorning term sheet'i kutayotgan texnik tekshiruv — uning belgilagan muddatida.",
        },
        stack: ["Code audit", "Security audit"],
      },
      {
        label: { en: "Dedicated team / staff augmentation", ru: "Выделенная команда / augmentation", uz: "Maxsus jamoa / staff augmentation" },
        description: {
          en: "Developers who plug into your existing team and process, not a black-box vendor relationship.",
          ru: "Разработчики, которые встраиваются в вашу команду и процессы — а не работа с «чёрным ящиком» подрядчика.",
          uz: "Mavjud jamoa va jarayonlaringizga qoʻshiladigan dasturchilar — «qora quti» pudratchi emas.",
        },
        stack: ["Agile", "Jira", "Slack"],
      },
      {
        label: { en: "MVP & startup technical partnership", ru: "MVP и техническое партнёрство для стартапов", uz: "MVP va startaplar uchun texnik hamkorlik" },
        description: {
          en: "Building the first working version fast enough to actually test the idea with real users.",
          ru: "Первая рабочая версия — достаточно быстро, чтобы реально проверить идею на живых пользователях.",
          uz: "Gʻoyani haqiqiy foydalanuvchilarda sinash uchun yetarlicha tez qurilgan birinchi ishlaydigan versiya.",
        },
        stack: ["Next.js", "Supabase", "Vercel"],
      },
      {
        label: { en: "CTO-as-a-service", ru: "CTO-as-a-service", uz: "CTO-as-a-service" },
        description: {
          en: "Technical leadership and decision-making for a company that isn't ready to hire a full-time CTO yet.",
          ru: "Техническое руководство и решения для компании, которая ещё не готова нанять CTO на полную ставку.",
          uz: "Toʻliq stavkali CTO yollashga hali tayyor boʻlmagan kompaniya uchun texnik rahbarlik va qarorlar.",
        },
        stack: ["Architecture", "Hiring", "Roadmap"],
      },
    ],
  },
  {
    slug: "uae",
    icon: MapPin,
    heroImage: "/it/groups/uae.webp",
    title: { en: "UAE-specific", ru: "Специфика ОАЭ", uz: "BAAga xos yechimlar" },
    blurb: {
      en: "The local integrations and compliance work a UAE business runs into sooner or later.",
      ru: "Локальные интеграции и комплаенс, с которыми рано или поздно сталкивается любой бизнес в ОАЭ.",
      uz: "BAAdagi har qanday biznes ertami-kechmi duch keladigan lokal integratsiya va muvofiqlik ishlari.",
    },
    items: [
      {
        label: { en: "UAE Pass integration", ru: "Интеграция UAE Pass", uz: "UAE Pass integratsiyasi" },
        description: {
          en: "Letting users sign in and verify identity with UAE Pass, instead of building your own verification from scratch.",
          ru: "Вход и подтверждение личности через UAE Pass — вместо своей верификации с нуля.",
          uz: "Foydalanuvchilar UAE Pass orqali kirishi va shaxsini tasdiqlashi — noldan oʻz tekshiruvingizni qurish oʻrniga.",
        },
        stack: ["UAE Pass API", "OAuth 2.0"],
      },
      {
        label: { en: "DLD, Trakheesi & Ejari integration", ru: "Интеграция DLD, Trakheesi и Ejari", uz: "DLD, Trakheesi va Ejari integratsiyasi" },
        description: {
          en: "Property and tenancy data connected directly to the systems that regulate them, not re-entered by hand.",
          ru: "Данные об объектах и аренде подключены напрямую к регулирующим системам, а не вбиваются вручную повторно.",
          uz: "Mulk va ijara maʼlumotlari qoʻlda qayta kiritilmasdan, ularni tartibga soluvchi tizimlarga toʻgʻridan-toʻgʻri ulanadi.",
        },
        stack: ["DLD API", "Ejari API"],
      },
      {
        label: { en: "FTA e-invoicing & VAT compliance", ru: "FTA e-invoicing и соответствие НДС", uz: "FTA e-invoicing va QQS muvofiqligi" },
        description: {
          en: "Invoicing built to the format the FTA actually requires, before the compliance deadline, not after a warning.",
          ru: "Счета в формате, который реально требует FTA — до дедлайна комплаенса, а не после предупреждения.",
          uz: "FTA haqiqatda talab qiladigan formatdagi hisob-fakturalar — ogohlantirishdan keyin emas, muddatdan oldin.",
        },
        stack: ["FTA e-invoicing", "PEPPOL"],
      },
      {
        label: { en: "Free zone / mainland technical setup support", ru: "Техническая поддержка запуска в free zone / mainland", uz: "Free zone / mainland texnik sozlash yordami" },
        description: {
          en: "The technical side of setting up — domains, hosting, licensing-adjacent tooling — sorted alongside your business setup.",
          ru: "Техническая сторона запуска — домены, хостинг, инструменты рядом с лицензированием — решается параллельно с бизнес-запуском.",
          uz: "Domenlar, hosting, litsenziyaga bogʻliq vositalar — biznesingiz ochilishi bilan bir vaqtda hal qilinadi.",
        },
        stack: ["DNS", "Hosting", "Licensing tools"],
      },
      {
        label: { en: "Arabic RTL localisation", ru: "Арабская RTL-локализация", uz: "Arabcha RTL lokalizatsiya" },
        description: {
          en: "A right-to-left layout that's actually mirrored and tested, not just translated text dropped into a left-to-right design.",
          ru: "Макет справа налево, реально зеркалированный и протестированный, а не просто переведённый текст в левостороннем дизайне.",
          uz: "Shunchaki tarjima qilingan matn emas, haqiqatda oynadek aylantirilgan va sinovdan oʻtgan oʻngdan-chapga maket.",
        },
        stack: ["RTL CSS", "next-intl"],
      },
      {
        label: { en: "Local hosting & data residency", ru: "Локальный хостинг и резидентность данных", uz: "Lokal hosting va maʼlumot rezidentligi" },
        description: {
          en: "Data kept where regulation or a client contract requires it to stay, not wherever a default server happened to be.",
          ru: "Данные хранятся там, где требует закон или договор с клиентом — а не там, где случайно оказался сервер по умолчанию.",
          uz: "Maʼlumot qonun yoki mijoz shartnomasi talab qilgan joyda saqlanadi — tasodifiy standart server joylashgan yerda emas.",
        },
        stack: ["AWS UAE Region", "Azure UAE"],
      },
    ],
  },
];

export function itGroupBySlug(slug: string): ITGroup | undefined {
  return IT_GROUPS.find((g) => g.slug === slug);
}
