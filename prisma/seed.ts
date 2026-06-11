import { PrismaClient, Role, TaskStatus, TaskType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
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
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
