/* ============================================================
   Dubai districts BIZBUYUK works in.

   Each entry carries its own translations so a district can be
   added or reworded without touching the dictionary. Photography
   is optional on purpose: the cards are designed to read without
   it, and `image` can be filled in later per district without
   any layout change.

   `yieldNote` is deliberately empty. Put a figure there only when
   it comes from real data you can stand behind, because a wrong
   yield on a public page is a promise you did not mean to make.
   ============================================================ */

import type { Locale } from "./i18n";

export type DistrictStage = "established" | "prestige" | "emerging";

export type District = {
  slug: string;
  name: string;
  stage: DistrictStage;
  blurb: Record<Locale, string>;
  /** Three short facts. Kept to phrases, not sentences. */
  highlights: Record<Locale, [string, string, string]>;
  /** Keys into REAL_ESTATE type labels, e.g. "apartment". */
  types: string[];
  image?: string;
  yieldNote?: string;
};

export const DISTRICT_STAGES: DistrictStage[] = ["established", "prestige", "emerging"];

export const DISTRICTS: District[] = [
  {
    slug: "downtown-dubai",
    name: "Downtown Dubai",
    stage: "prestige",
    types: ["apartment", "penthouse", "branded", "luxury"],
    blurb: {
      en: "The address most buyers picture first: the Burj Khalifa, the Dubai Mall and the Opera District on one masterplan.",
      ru: "Адрес, который большинство покупателей представляет первым: Бурдж-Халифа, Dubai Mall и Opera District в одном масштабном проекте.",
      uz: "Koʻpchilik xaridor birinchi tasavvur qiladigan manzil: Burj Khalifa, Dubai Mall va Opera District bitta masterplanda.",
    },
    highlights: {
      en: ["Central location", "Strong short-let demand", "Tower and branded stock"],
      ru: ["Центральная локация", "Высокий спрос на краткосрочную аренду", "Башни и branded residences"],
      uz: ["Markaziy lokatsiya", "Qisqa muddatli ijaraga yuqori talab", "Minoralar va branded residences"],
    },
  },
  {
    slug: "business-bay",
    name: "Business Bay",
    stage: "established",
    types: ["apartment", "studio", "penthouse", "investment"],
    blurb: {
      en: "Canal-side towers a bridge away from Downtown, with the widest spread of apartment stock in central Dubai.",
      ru: "Башни вдоль канала в шаге от Downtown, с самым широким выбором квартир в центральной части Дубая.",
      uz: "Downtown'dan bir koʻprik naridagi kanal boʻyidagi minoralar, markaziy Dubaydagi eng keng kvartira tanlovi.",
    },
    highlights: {
      en: ["Walk to Downtown", "Business and professional tenants", "Entry to central Dubai"],
      ru: ["Пешком до Downtown", "Арендаторы из бизнес-среды", "Вход в центральный Дубай"],
      uz: ["Downtown'gacha piyoda", "Biznes muhitidagi ijarachilar", "Markaziy Dubayga kirish"],
    },
  },
  {
    slug: "dubai-marina",
    name: "Dubai Marina",
    stage: "established",
    types: ["apartment", "penthouse", "luxury", "investment"],
    blurb: {
      en: "A mature waterfront district with the marina walk, JBR beach and one of the deepest rental markets in the city.",
      ru: "Сформировавшийся район у воды: набережная марины, пляж JBR и один из самых ёмких рынков аренды в городе.",
      uz: "Shakllangan suv boʻyi tumani: marina sayilgohi, JBR plyaji va shahardagi eng sigʻimli ijara bozorlaridan biri.",
    },
    highlights: {
      en: ["Waterfront and beach", "Deep tenant pool", "Resale liquidity"],
      ru: ["Набережная и пляж", "Большой пул арендаторов", "Ликвидность при перепродаже"],
      uz: ["Suv boʻyi va plyaj", "Katta ijarachilar bazasi", "Qayta sotishda likvidlik"],
    },
  },
  {
    slug: "palm-jumeirah",
    name: "Palm Jumeirah",
    stage: "prestige",
    types: ["villa", "apartment", "branded", "luxury", "penthouse"],
    blurb: {
      en: "The island itself: beachfront villas, branded residences and the strongest holiday-let demand in Dubai.",
      ru: "Сам остров: виллы на первой линии, branded residences и самый высокий спрос на краткосрочную аренду в Дубае.",
      uz: "Orolning oʻzi: plyaj boʻyidagi villalar, branded residences va Dubaydagi eng yuqori kunlik ijara talabi.",
    },
    highlights: {
      en: ["Private beach access", "Branded residence supply", "Holiday-let demand"],
      ru: ["Собственный выход к пляжу", "Предложение branded residences", "Спрос на посуточную аренду"],
      uz: ["Shaxsiy plyajga chiqish", "Branded residence taklifi", "Kunlik ijaraga talab"],
    },
  },
  {
    slug: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    stage: "established",
    types: ["villa", "townhouse", "apartment", "luxury"],
    blurb: {
      en: "A masterplanned community built around a golf course, a park and its own mall, aimed squarely at families.",
      ru: "Масштабный комьюнити вокруг гольф-поля, парка и собственного молла, ориентированный прежде всего на семьи.",
      uz: "Golf maydoni, park va oʻz molli atrofida qurilgan, asosan oilalarga moʻljallangan masterplan jamoasi.",
    },
    highlights: {
      en: ["Golf and parkland", "Schools nearby", "Villa and townhouse stock"],
      ru: ["Гольф и парк", "Школы рядом", "Виллы и таунхаусы"],
      uz: ["Golf va park", "Yaqinda maktablar", "Villa va taunxauslar"],
    },
  },
  {
    slug: "jvc",
    name: "Jumeirah Village Circle",
    stage: "established",
    types: ["apartment", "studio", "townhouse", "villa", "investment"],
    blurb: {
      en: "The usual entry point for a first Dubai purchase: mid-market pricing with both apartments and townhouses.",
      ru: "Обычная точка входа для первой покупки в Дубае: средний ценовой сегмент, квартиры и таунхаусы.",
      uz: "Dubaydagi birinchi xarid uchun odatiy kirish nuqtasi: oʻrta narx segmenti, kvartira va taunxauslar.",
    },
    highlights: {
      en: ["Lower entry price", "Family tenants", "Steady rental demand"],
      ru: ["Низкий порог входа", "Семейные арендаторы", "Стабильный спрос на аренду"],
      uz: ["Past kirish narxi", "Oilaviy ijarachilar", "Barqaror ijara talabi"],
    },
  },
  {
    slug: "dubai-creek-harbour",
    name: "Dubai Creek Harbour",
    stage: "emerging",
    types: ["apartment", "offplan", "penthouse", "investment"],
    blurb: {
      en: "An Emaar masterplan on the creek, sold mostly off-plan, for buyers working to a longer horizon.",
      ru: "Масштабный проект Emaar на крик, продаётся преимущественно off-plan, для покупателей с длинным горизонтом.",
      uz: "Emaar'ning krik boʻyidagi masterplani, asosan off-plan sotiladi, uzoq muddatli xaridorlar uchun.",
    },
    highlights: {
      en: ["Off-plan led", "Waterfront masterplan", "Longer build horizon"],
      ru: ["В основном off-plan", "Проект у воды", "Длительный срок строительства"],
      uz: ["Asosan off-plan", "Suv boʻyi masterplani", "Uzoq qurilish muddati"],
    },
  },
  {
    slug: "dubai-harbour",
    name: "Dubai Harbour",
    stage: "emerging",
    types: ["apartment", "penthouse", "luxury", "offplan"],
    blurb: {
      en: "Marina berths, a cruise terminal and beachfront towers between Palm Jumeirah and Dubai Marina.",
      ru: "Марина, круизный терминал и башни на первой линии между Palm Jumeirah и Dubai Marina.",
      uz: "Palm Jumeirah va Dubai Marina oraligʻidagi marina, kruiz terminali va plyaj boʻyi minoralari.",
    },
    highlights: {
      en: ["Beachfront position", "Marina and cruise port", "New-build supply"],
      ru: ["Первая линия у пляжа", "Марина и круизный порт", "Новое предложение"],
      uz: ["Plyaj boʻyi joylashuv", "Marina va kruiz porti", "Yangi qurilish taklifi"],
    },
  },
  {
    slug: "dubai-islands",
    name: "Dubai Islands",
    stage: "emerging",
    types: ["apartment", "villa", "offplan", "investment"],
    blurb: {
      en: "The Deira waterfront redevelopment: beach frontage at an earlier stage than the established island districts.",
      ru: "Редевелопмент побережья Дейры: выход к пляжу на более ранней стадии, чем у сложившихся островных районов.",
      uz: "Deira sohilining qayta rivojlanishi: shakllangan orol tumanlariga nisbatan erta bosqichdagi plyaj chizigʻi.",
    },
    highlights: {
      en: ["Early-stage pricing", "Beach frontage", "Old Dubai proximity"],
      ru: ["Цены ранней стадии", "Выход к пляжу", "Рядом со старым Дубаем"],
      uz: ["Erta bosqich narxlari", "Plyaj chizigʻi", "Eski Dubay yaqinida"],
    },
  },
  {
    slug: "meydan",
    name: "Meydan",
    stage: "emerging",
    types: ["apartment", "villa", "townhouse", "offplan"],
    blurb: {
      en: "The racecourse district inside MBR City, close to Downtown, with a mix of villas and new apartment towers.",
      ru: "Район ипподрома внутри MBR City, близко к Downtown, с сочетанием вилл и новых жилых башен.",
      uz: "MBR City ichidagi ippodrom tumani, Downtown'ga yaqin, villalar va yangi minoralar aralashmasi.",
    },
    highlights: {
      en: ["Close to Downtown", "Villa and apartment mix", "Active new supply"],
      ru: ["Близко к Downtown", "Виллы и квартиры", "Активное новое предложение"],
      uz: ["Downtown'ga yaqin", "Villa va kvartiralar", "Faol yangi taklif"],
    },
  },
  {
    slug: "sobha-hartland",
    name: "Sobha Hartland",
    stage: "established",
    types: ["apartment", "villa", "townhouse", "luxury"],
    blurb: {
      en: "A green, low-density pocket of MBR City with international schools on the masterplan itself.",
      ru: "Зелёный малоэтажный участок MBR City с международными школами внутри самого проекта.",
      uz: "MBR City'ning yashil, past zichlikdagi qismi, masterplan ichida xalqaro maktablar bilan.",
    },
    highlights: {
      en: ["Schools on site", "Green, low density", "Single-developer quality"],
      ru: ["Школы внутри проекта", "Зелень, низкая плотность", "Единый застройщик"],
      uz: ["Loyiha ichida maktablar", "Yashillik, past zichlik", "Yagona quruvchi sifati"],
    },
  },
  {
    slug: "dubai-south",
    name: "Dubai South",
    stage: "emerging",
    types: ["apartment", "townhouse", "villa", "offplan", "investment"],
    blurb: {
      en: "Around Al Maktoum airport and Expo City: the lowest entry prices on this list, on the longest horizon.",
      ru: "Вокруг аэропорта Аль-Мактум и Expo City: самый низкий порог входа в этом списке и самый длинный горизонт.",
      uz: "Al Maktoum aeroporti va Expo City atrofida: bu roʻyxatdagi eng past kirish narxi, eng uzoq muddat.",
    },
    highlights: {
      en: ["Lowest entry price", "Airport and Expo City", "Long-horizon play"],
      ru: ["Самый низкий вход", "Аэропорт и Expo City", "Долгий горизонт"],
      uz: ["Eng past kirish", "Aeroport va Expo City", "Uzoq muddatli reja"],
    },
  },
  {
    slug: "al-furjan",
    name: "Al Furjan",
    stage: "established",
    types: ["apartment", "townhouse", "villa", "investment"],
    blurb: {
      en: "A settled mid-market community on the metro, with townhouses and apartments side by side.",
      ru: "Устоявшийся комьюнити среднего сегмента у метро, где таунхаусы соседствуют с квартирами.",
      uz: "Metro yonidagi shakllangan oʻrta segment jamoasi, taunxaus va kvartiralar yonma-yon.",
    },
    highlights: {
      en: ["Metro connected", "Mid-market pricing", "Completed community"],
      ru: ["Метро рядом", "Средний сегмент", "Готовый район"],
      uz: ["Metro yaqin", "Oʻrta segment", "Tayyor jamoa"],
    },
  },
  {
    slug: "arabian-ranches",
    name: "Arabian Ranches",
    stage: "established",
    types: ["villa", "townhouse", "luxury"],
    blurb: {
      en: "One of Dubai's original villa communities: low-rise, golf, and long-standing family tenants.",
      ru: "Один из первых вилловых районов Дубая: малоэтажная застройка, гольф и давние семейные арендаторы.",
      uz: "Dubayning ilk villa jamoalaridan biri: past qavatli qurilish, golf va koʻp yillik oilaviy ijarachilar.",
    },
    highlights: {
      en: ["Villas only", "Golf community", "Long tenancies"],
      ru: ["Только виллы", "Гольф-комьюнити", "Долгие сроки аренды"],
      uz: ["Faqat villalar", "Golf jamoasi", "Uzoq ijara muddatlari"],
    },
  },
  {
    slug: "jumeirah",
    name: "Jumeirah",
    stage: "prestige",
    types: ["villa", "townhouse", "luxury", "branded"],
    blurb: {
      en: "Old coastal Dubai: low-rise villas a street or two from the beach, with very little new supply.",
      ru: "Старый прибрежный Дубай: малоэтажные виллы в паре улиц от пляжа, нового предложения почти нет.",
      uz: "Eski sohil Dubayi: plyajdan bir-ikki koʻcha naridagi past qavatli villalar, yangi taklif deyarli yoʻq.",
    },
    highlights: {
      en: ["Beach proximity", "Low-rise, low density", "Limited supply"],
      ru: ["Рядом с пляжем", "Малоэтажность", "Ограниченное предложение"],
      uz: ["Plyajga yaqin", "Past qavatlilik", "Cheklangan taklif"],
    },
  },
  {
    slug: "ras-al-khor",
    name: "Ras Al Khor",
    stage: "emerging",
    types: ["apartment", "offplan", "investment"],
    blurb: {
      en: "The creek-side area beside the wildlife sanctuary, moving from industrial use into new residential plots.",
      ru: "Территория у крика рядом с заповедником, переходящая из промышленного использования в новую жилую застройку.",
      uz: "Qoʻriqxona yonidagi krik boʻyi hududi, sanoat foydalanishidan yangi turar-joy qurilishiga oʻtmoqda.",
    },
    highlights: {
      en: ["Creek and sanctuary", "Early redevelopment", "Central position"],
      ru: ["Крик и заповедник", "Ранний редевелопмент", "Центральное расположение"],
      uz: ["Krik va qoʻriqxona", "Erta qayta rivojlanish", "Markaziy joylashuv"],
    },
  },
  {
    slug: "dubai-silicon-oasis",
    name: "Dubai Silicon Oasis",
    stage: "established",
    types: ["apartment", "studio", "townhouse", "investment"],
    blurb: {
      en: "A tech free zone with the most affordable apartment stock on this list and a built-in tenant base.",
      ru: "Технологическая свободная зона с самым доступным предложением квартир в этом списке и собственной базой арендаторов.",
      uz: "Bu roʻyxatdagi eng arzon kvartira taklifi va oʻz ijarachilar bazasiga ega texnologik erkin zona.",
    },
    highlights: {
      en: ["Affordable entry", "Free-zone tenants", "Established community"],
      ru: ["Доступный вход", "Арендаторы из свободной зоны", "Сложившийся район"],
      uz: ["Arzon kirish", "Erkin zona ijarachilari", "Shakllangan jamoa"],
    },
  },
];

export function districtsByStage(stage: DistrictStage | "all"): District[] {
  return stage === "all" ? DISTRICTS : DISTRICTS.filter((d) => d.stage === stage);
}
