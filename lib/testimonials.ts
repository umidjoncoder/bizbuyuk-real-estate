/* ============================================================
   Client testimonials.

   Each quote is written in the reviewer's own language and stays in
   that language regardless of which site locale the visitor is
   browsing in — the same way a Google review widget works. Attribution
   is first name + initial + city, matching how most review platforms
   credit a reviewer: enough to feel like a real person, without
   publishing a stranger's full name.

   These are placeholders in the sense that BIZBUYUK's own team should
   swap them for verbatim client quotes as those come in — but the
   shape (short, specific, one thing that went right) is exactly what
   should replace them. No portrait photos: a flag is an honest way to
   show who's talking without needing a picture of someone who didn't
   sit for one.

   `flag` is an ISO 3166-1 alpha-2 code (e.g. "KZ") from lib/countries.ts —
   any of ~195 countries, rendered as an emoji via flagEmoji() rather than
   the small hand-drawn SVG set in components/team/Flags.tsx (which only
   covers the handful of languages/countries the team page itself needs).
   ============================================================ */

export type TestimonialLang = "ru" | "ar" | "uz" | "en" | "az";

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  lang: TestimonialLang;
  flag: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service: string;
  quote: string;
};

export const TESTIMONIAL_LANGS: { id: TestimonialLang; flag: string; label: string }[] = [
  { id: "ru", flag: "ru", label: "Русский" },
  { id: "en", flag: "gb", label: "English" },
  { id: "ar", flag: "ae", label: "العربية" },
  { id: "uz", flag: "uz", label: "Oʻzbekcha" },
  { id: "az", flag: "az", label: "Azərbaycan" },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "dmitriy-k",
    name: "Дмитрий К.",
    city: "Москва",
    lang: "ru",
    flag: "RU",
    rating: 5,
    service: "Off-plan purchase",
    quote:
      "Покупал квартиру в Дубае удалённо, ни разу не приехав на объект. Переживал за escrow-счёт и договор — команда BIZBUYUK проверила всё до подписания и объясняла каждый шаг на русском. В итоге сделка прошла спокойнее, чем я ожидал.",
  },
  {
    id: "elena-v",
    name: "Елена В.",
    city: "Алматы",
    lang: "ru",
    flag: "KZ",
    rating: 5,
    service: "Relocation",
    quote:
      "Переезжали с двумя детьми — виза, Emirates ID, открытие счёта в банке, поиск школы. Боялась, что застряну в бюрократии на месяцы. Нам просто присылали список, что и когда нести, и всё двигалось само.",
  },
  {
    id: "andrey-s",
    name: "Андрей С.",
    city: "Москва",
    lang: "ru",
    flag: "RU",
    rating: 4,
    service: "Renovation",
    quote:
      "Ремонт полностью под ключ, пока я был в Москве — раз в неделю присылали фото и видео с объекта. Сроки сдвинулись примерно на две недели против плана, но меня предупредили заранее, а не поставили перед фактом.",
  },
  {
    id: "khalid-r",
    name: "خالد ر.",
    city: "دبي",
    lang: "ar",
    flag: "AE",
    rating: 5,
    service: "Off-plan purchase",
    quote:
      "اشتريت وحدة على الخارطة لأول مرة، وكنت قلقًا من التعامل مع مطور لا أعرفه. فريق BIZBUYUK راجع كل شيء معي قبل التوقيع، ومتابعة سهلة وواضحة من أول يوم للتسليم.",
  },
  {
    id: "faisal-alm",
    name: "فيصل آل م.",
    city: "الشارقة",
    lang: "ar",
    flag: "AE",
    rating: 5,
    service: "Property management",
    quote:
      "عندي وحدة استثمارية ولا أريد التعامل مع المستأجرين مباشرة. من إيجاد المستأجر للصيانة الدورية، كل شيء يصلني في تقرير شهري واضح بدون أي متابعة مني.",
  },
  {
    id: "omar-s",
    name: "عمر س.",
    city: "دبي",
    lang: "ar",
    flag: "AE",
    rating: 5,
    service: "Investment protection",
    quote:
      "قبل التوقيع طلبت منهم مراجعة عقد البيع وسجل المطور. اكتشفوا بند تأخير غير واضح في العقد وطلبوا توضيحه قبل أي التزام مني — هذا وحده كان يستحق التعامل معهم.",
  },
  {
    id: "sardor-t",
    name: "Sardor T.",
    city: "Toshkent",
    lang: "uz",
    flag: "UZ",
    rating: 5,
    service: "Relocation",
    quote:
      "Oilam bilan Dubayga koʻchib oʻtdik — viza, Emirates ID, bank hisobi, bolalar uchun maktab. Har bir bosqichda nima kerakligini oldindan aytishdi, hech narsa kutilmaganda chiqmadi.",
  },
  {
    id: "shahnoza-m",
    name: "Shahnoza M.",
    city: "Buxoro",
    lang: "uz",
    flag: "UZ",
    rating: 5,
    service: "Renovation",
    quote:
      "Kvartira taʼmirini Dubayga bormasdan turib qildik. Har haftada video yuborib, jarayonni koʻrsatib borishdi. Oxirida kalitni topshirganlarida hammasi aytilganidek tayyor edi.",
  },
  {
    id: "jasur-n",
    name: "Jasur N.",
    city: "Toshkent",
    lang: "uz",
    flag: "UZ",
    rating: 4,
    service: "Off-plan purchase",
    quote:
      "Dubaydan birinchi obyektimni sotib oldim, hammasi masofadan boʻldi. Savollarim koʻp edi, ba'zida javob kutish biroz vaqt oldi, lekin har bir savolga toʻliq va aniq tushuntirishdi.",
  },
  {
    id: "james-h",
    name: "James H.",
    city: "London",
    lang: "en",
    flag: "GB",
    rating: 5,
    service: "Investment protection",
    quote:
      "I asked for a full check on the developer before committing — payment history, project status with RERA, escrow terms. They came back with a straight answer, including the parts that weren't ideal, rather than just a sales pitch.",
  },
  {
    id: "sarah-l",
    name: "Sarah L.",
    city: "Singapore",
    lang: "en",
    flag: "SG",
    rating: 5,
    service: "Property management",
    quote:
      "I own the unit purely as an investment and have never seen it in person. Tenant turnover, maintenance calls, rent collection — it's all handled, and I get a monthly summary instead of a stream of individual problems.",
  },
  {
    id: "michael-t",
    name: "Michael T.",
    city: "Toronto",
    lang: "en",
    flag: "CA",
    rating: 5,
    service: "Off-plan purchase",
    quote:
      "Bought off-plan in JVC without visiting Dubai first. What stood out was how plainly they explained the payment plan and handover timeline — no vague answers when I pushed for specifics.",
  },
  {
    id: "elvin-m",
    name: "Elvin M.",
    city: "Bakı",
    lang: "az",
    flag: "AZ",
    rating: 5,
    service: "Off-plan purchase",
    quote:
      "Dubayda ilk mənzilimi uzaqdan aldım. Ödəniş planını və təhvil tarixlərini əvvəlcədən aydın izah etdilər, prosesin heç bir mərhələsində qeyri-müəyyənlik hiss etmədim.",
  },
  {
    id: "aygun-h",
    name: "Aygün H.",
    city: "Bakı",
    lang: "az",
    flag: "AZ",
    rating: 5,
    service: "Relocation",
    quote:
      "Ailəliklə Dubaya köçdük — viza, Emirates ID, bank hesabı, hətta uşaq üçün məktəb seçimində də kömək etdilər. Hər addımda növbəti addımın nə olduğunu əvvəlcədən bilirdik.",
  },
  {
    id: "tural-k",
    name: "Tural K.",
    city: "Bakı",
    lang: "az",
    flag: "AZ",
    rating: 4,
    service: "Renovation",
    quote:
      "Bakıda yaşayaraq Dubaydakı mənzilimin təmirini onlara həvalə etdim. Həftəlik video ilə vəziyyəti göstərirdilər. Son mərhələdə balaca gecikmə oldu, amma vaxtında xəbərdar edildim.",
  },
  {
    id: "yerlan-b",
    name: "Ерлан Б.",
    city: "Астана",
    lang: "ru",
    flag: "KZ",
    rating: 5,
    service: "Off-plan purchase",
    quote:
      "Сравнивал несколько агентств перед покупкой в Дубае. У BIZBUYUK — единственные, кто сразу прислал реестр DLD и статус эскроу-счёта, не дожидаясь, пока я сам спрошу.",
  },
  {
    id: "natalya-p",
    name: "Наталья П.",
    city: "Минск",
    lang: "ru",
    flag: "BY",
    rating: 5,
    service: "Investment protection",
    quote:
      "Переводить деньги из Беларуси в другую страну и без личного присутствия — было страшно. Юрист BIZBUYUK разобрал весь процесс по шагам ещё до перевода первого платежа, и я точно знала, за что плачу на каждом этапе.",
  },
  {
    id: "chidi-o",
    name: "Chidi O.",
    city: "Lagos",
    lang: "en",
    flag: "NG",
    rating: 5,
    service: "Relocation",
    quote:
      "Moving a family business footprint to Dubai meant visas, a bank account and a lease before we'd even landed. They sequenced it so each step was ready before we needed it — no waiting around in a foreign city for paperwork.",
  },
];

export const REVIEW_SERVICES = ["Off-plan purchase", "Investment protection", "Relocation", "Renovation", "Property management"];
