import { PrismaClient, Role, TaskStatus, TaskType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

/* ═════════════════════════════════════════════════════════════════════════════
 *
 *   ⛔  T O ' X T A N G  —  B U   F A Y L   B A Z A N I   O ' C H I R A D I  ⛔
 *
 *   Bu skript ishga tushsa, quyidagi jadvallarning HAMMASI butunlay o'chadi:
 *
 *       User · Lead · LeadHistory · LeadProperty · Property
 *       Task · Comment · Reminder · AuditLog
 *
 *   Ya'ni: barcha mijozlar, barcha xodimlar, butun yozishmalar tarixi,
 *   barcha eslatmalar va loglar. Qaytarib bo'lmaydi. "Bekor qilish" yo'q.
 *
 *   Bu fayl FAQAT bo'sh, yangi bazani test ma'lumoti bilan to'ldirish uchun.
 *   Ishlab turgan bazaga hech qachon, hech qanday sababga ko'ra ishlatilmaydi.
 *
 *   ───────────────────────────────────────────────────────────────────────
 *   Shuning uchun quyida QULF qo'yilgan. U o'z-o'zidan ochilmaydi:
 *
 *     • Bazani sanab chiqadi va nima yo'q bo'lishini ko'rsatadi
 *     • Masofaviy baza bo'lsa — ALLOW_DB_WIPE o'zgaruvchisisiz ishlamaydi
 *     • Baza manzilini qo'lda yozib tasdiqlashni talab qiladi
 *
 *   QULFNI OLIB TASHLAMANG. Agar u xalaqit berayotgan bo'lsa — demak u
 *   aynan o'z vazifasini bajarayapti.
 *
 *   Tarix: 2026-09-13 da qo'shildi. Sababi — bu fayl to'g'ridan-to'g'ri
 *   ishlab turgan Neon bazasiga ulangan holda, hech qanday himoyasiz turgan
 *   edi. Bitta `npm run seed` 2 270 lid va 13 xodimni o'chirib yuborishi
 *   mumkin edi.
 *
 * ═══════════════════════════════════════════════════════════════════════════ */

const prisma = new PrismaClient();

/** Qaysi bazaga ulanayotganimizni DATABASE_URL dan aniqlaydi. */
function resolveTarget() {
  const raw = process.env.DATABASE_URL ?? "";
  try {
    const u = new URL(raw);
    return {
      ok: true,
      host: u.hostname,
      database: u.pathname.replace(/^\//, "") || "(nomsiz)",
      isLocal: /^(localhost|127\.0\.0\.1|::1|host\.docker\.internal)$/i.test(u.hostname),
    };
  } catch {
    return { ok: false, host: "", database: "", isLocal: false };
  }
}

/** O'chirilishi mumkin bo'lgan hamma narsani sanaydi. */
async function currentCounts() {
  const [users, leads, properties, tasks, comments, reminders, auditLogs, leadHistory] =
    await Promise.all([
      prisma.user.count(),
      prisma.lead.count(),
      prisma.property.count(),
      prisma.task.count(),
      prisma.comment.count(),
      prisma.reminder.count(),
      prisma.auditLog.count(),
      prisma.leadHistory.count(),
    ]);
  return { users, leads, properties, tasks, comments, reminders, auditLogs, leadHistory };
}

function die(message: string): never {
  console.error(`\n\x1b[31m${message}\x1b[0m\n`);
  process.exitCode = 1;
  throw new Error("SEED_BLOCKED");
}

/**
 * Qulf. deleteMany dan OLDIN chaqiriladi va o'tkazmasa skript to'xtaydi.
 */
async function assertWipeAllowed() {
  const target = resolveTarget();

  if (!target.ok) {
    die("DATABASE_URL o'qib bo'lmadi. Seed to'xtatildi (xavfsizlik uchun).");
  }

  const counts = await currentCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  console.log("\n\x1b[33m" + "─".repeat(68));
  console.log("  BAZANI TO'LIQ O'CHIRISH SO'RALDI");
  console.log("─".repeat(68) + "\x1b[0m");
  console.log(`  Server:  ${target.host}`);
  console.log(`  Baza:    ${target.database}`);
  console.log(`  Turi:    ${target.isLocal ? "mahalliy" : "\x1b[31mMASOFAVIY — ehtimol ishlab turgan baza\x1b[0m"}`);
  console.log("\n  Quyidagilar butunlay o'chadi:");
  console.log(`    Xodimlar (User) .......... ${counts.users}`);
  console.log(`    Lidlar (Lead) ............ ${counts.leads}`);
  console.log(`    Obyektlar (Property) ..... ${counts.properties}`);
  console.log(`    Vazifalar (Task) ......... ${counts.tasks}`);
  console.log(`    Izohlar (Comment) ........ ${counts.comments}`);
  console.log(`    Eslatmalar (Reminder) .... ${counts.reminders}`);
  console.log(`    Loglar (AuditLog) ........ ${counts.auditLogs}`);
  console.log(`    Lid tarixi (LeadHistory) . ${counts.leadHistory}`);
  console.log(`    \x1b[1mJAMI ..................... ${total} ta yozuv\x1b[0m`);
  console.log("\x1b[33m" + "─".repeat(68) + "\x1b[0m\n");

  // ── 1-qulf: masofaviy bazaga aniq ruxsat talab qilinadi ──────────────────
  if (!target.isLocal) {
    if (process.env.ALLOW_DB_WIPE !== target.host) {
      die(
        `TO'XTATILDI — bu mahalliy baza emas.\n\n` +
          `  Bu "${target.host}" serveridagi ishlab turgan baza bo'lishi mumkin.\n` +
          `  Seed unga o'z-o'zidan tegmaydi.\n\n` +
          `  Agar ROSTDAN ham shu bazani tozalamoqchi bo'lsangiz:\n\n` +
          `      1. Avval backup oling.\n` +
          `      2. Keyin shu buyruq bilan ishga tushiring:\n\n` +
          `         ALLOW_DB_WIPE=${target.host} npm run seed\n\n` +
          `  Buni bilmasdan yozib qo'yish deyarli imkonsiz — shunday o'ylangan.`
      );
    }
    console.log("\x1b[33m  ALLOW_DB_WIPE berildi — 2-bosqichga o'tildi.\x1b[0m\n");
  }

  // ── 2-qulf: qo'lda yozib tasdiqlash ──────────────────────────────────────
  if (!stdin.isTTY) {
    if (target.isLocal) {
      die(
        "TO'XTATILDI — terminal interaktiv emas, tasdiqlashning iloji yo'q.\n" +
          "Seed ni oddiy terminaldan qo'lda ishga tushiring."
      );
    }
    // Masofaviy + ALLOW_DB_WIPE + interaktiv emas: bu ataylab qilingan
    // avtomatlashtirish (CI). O'tkazamiz, lekin belgilab qo'yamiz.
    console.log("\x1b[33m  Interaktiv emas — ALLOW_DB_WIPE asosida davom etilmoqda.\x1b[0m\n");
    return;
  }

  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const expected = target.isLocal ? "ha" : target.host;
    const prompt = target.isLocal
      ? `  Mahalliy bazani tozalash uchun "ha" deb yozing: `
      : `  Tasdiqlash uchun baza manzilini to'liq yozing\n  (\x1b[1m${target.host}\x1b[0m): `;

    const answer = (await rl.question(prompt)).trim();
    if (answer !== expected) {
      die("Bekor qilindi — yozilgan matn mos kelmadi. Bazaga tegilmadi.");
    }
  } finally {
    rl.close();
  }

  console.log("\n\x1b[31m  Tasdiqlandi. O'chirish boshlanmoqda...\x1b[0m\n");
}


async function main() {
  // ⛔ QULF — bundan pastdagi deleteMany'lar butun bazani o'chiradi.
  //    Bu qatorni OLIB TASHLAMANG va pastga surmang.
  await assertWipeAllowed();

  console.log("Seeding database...");

  // Clean tables (children first to satisfy FKs)
  await prisma.reminder.deleteMany({});
  await prisma.leadHistory.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.leadProperty.deleteMany({});
  await prisma.lead.deleteMany({});
  await prisma.property.deleteMany({});
  await prisma.user.deleteMany({});

  // Hasher helper
  const hashPassword = async (pass: string) => bcrypt.hash(pass, 10);

  // 1. Create Users
  const owner = await prisma.user.create({
    data: {
      username: "owner",
      password: await hashPassword("owner123"),
      fullName: "Ta'sischi BIZBUYUK",
      email: "owner@bizbuyuk.com",
      role: Role.OWNER,
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      password: await hashPassword("admin123"),
      fullName: "Bosh Administrator",
      email: "admin@bizbuyuk.com",
      role: Role.ADMIN,
    },
  });

  const salesDirector = await prisma.user.create({
    data: {
      username: "sales",
      password: await hashPassword("sales123"),
      fullName: "Sales Director",
      email: "sales@bizbuyuk.com",
      role: Role.SALES_DIRECTOR,
    },
  });

  const marketingDirector = await prisma.user.create({
    data: {
      username: "marketing",
      password: await hashPassword("marketing123"),
      fullName: "Marketing Director",
      email: "marketing@bizbuyuk.com",
      role: Role.MARKETING_DIRECTOR,
    },
  });

  const broker1 = await prisma.user.create({
    data: {
      username: "broker1",
      password: await hashPassword("broker123"),
      fullName: "Jasur Broker",
      email: "jasur@bizbuyuk.com",
      role: Role.BROKER,
    },
  });

  const broker2 = await prisma.user.create({
    data: {
      username: "broker2",
      password: await hashPassword("broker123"),
      fullName: "Malika Broker",
      email: "malika@bizbuyuk.com",
      role: Role.BROKER,
    },
  });

  const driver = await prisma.user.create({
    data: {
      username: "driver",
      password: await hashPassword("driver123"),
      fullName: "Anvar Haydovchi",
      email: "anvar@bizbuyuk.com",
      role: Role.DRIVER,
    },
  });

  console.log("Users created successfully.");

  // 2. Create Properties
  const prop1 = await prisma.property.create({
    data: {
      title: "Burj Khalifa Premium Suite",
      location: "Downtown Dubai",
      price: 2500000,
      type: "Secondary",
      description: "Spectacular 2-bedroom apartment with full fountain views.",
    },
  });

  const prop2 = await prisma.property.create({
    data: {
      title: "Marina Gate Vista",
      location: "Dubai Marina",
      price: 1800000,
      type: "Secondary",
      description: "Luxurious waterfront 1-bedroom studio.",
    },
  });

  const prop3 = await prisma.property.create({
    data: {
      title: "Emaar Beachfront Villa",
      location: "Dubai Harbour",
      price: 4200000,
      type: "Off-plan",
      description: "Exclusive beachfront townhouse development.",
    },
  });

  console.log("Properties created successfully.");

  // 3. Create Leads
  const lead1 = await prisma.lead.create({
    data: {
      name: "Akmal Karimov",
      phone: "+998901234567",
      email: "akmal@gmail.com",
      budget: 2000000,
      status: "NEW",
      source: "Website",
      brokerId: broker1.id,
      creatorId: admin.id,
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      name: "Sardor Aliyev",
      phone: "+998998887766",
      email: "sardor@mail.ru",
      budget: 3000000,
      status: "NEGOTIATION",
      source: "Facebook",
      brokerId: broker1.id,
      creatorId: admin.id,
    },
  });

  const lead3 = await prisma.lead.create({
    data: {
      name: "Elena Petrova",
      phone: "+79031112233",
      email: "elena@yandex.ru",
      budget: 1500000,
      status: "VIEWING",
      source: "Google",
      brokerId: broker2.id,
      creatorId: salesDirector.id,
    },
  });

  const lead4 = await prisma.lead.create({
    data: {
      name: "John Doe",
      phone: "+15550199222",
      email: "john@doe.com",
      budget: 5000000,
      status: "WON",
      source: "Instagram",
      brokerId: broker2.id,
      creatorId: owner.id,
    },
  });

  // Link some properties to leads
  await prisma.leadProperty.createMany({
    data: [
      { leadId: lead1.id, propertyId: prop1.id },
      { leadId: lead2.id, propertyId: prop1.id },
      { leadId: lead2.id, propertyId: prop3.id },
      { leadId: lead3.id, propertyId: prop2.id },
    ],
  });

  // Add Comments/History
  await prisma.comment.createMany({
    data: [
      {
        leadId: lead1.id,
        author: "Chief Administrator",
        text: "Lead was created via Facebook Ads and assigned to a broker.",
      },
      {
        leadId: lead2.id,
        author: "James Broker",
        text: "Spoke with client by phone. Interested in Burj Khalifa and Emaar projects. Offers sent.",
      },
      {
        leadId: lead3.id,
        author: "Maria Broker",
        text: "Viewing scheduled. Agreed to show the property on June 12.",
      },
    ],
  });

  console.log("Leads created successfully.");

  // 4. Create Tasks
  await prisma.task.create({
    data: {
      title: "Finalize negotiation with Sardor Aliyev",
      description: "Agreement terms need to be finalized.",
      type: TaskType.DAILY,
      status: TaskStatus.IN_PROGRESS,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      assignedToId: broker1.id,
      creatorId: salesDirector.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Airport pickup for Elena Petrova",
      description: "Meet at Airport Terminal 2 at 14:00, show properties in our vehicle.",
      type: TaskType.LOGISTICS,
      status: TaskStatus.TODO,
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
      assignedToId: driver.id,
      creatorId: salesDirector.id,
    },
  });

  console.log("Tasks seeded.");
  console.log("Database seed completed successfully.");
}

main()
  .catch((e) => {
    // Qulf to'xtatgan bo'lsa sababi allaqachon chiroyli chiqarilgan —
    // ustiga stack trace qo'shib chalkashtirmaymiz.
    if (e instanceof Error && e.message === "SEED_BLOCKED") {
      process.exit(1);
    }
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
