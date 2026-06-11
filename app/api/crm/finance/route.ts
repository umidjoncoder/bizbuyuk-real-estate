import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role, TxType } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

function periodStart(period: string): Date | null {
  const d = new Date();
  if (period === "week") { d.setDate(d.getDate() - 7); return d; }
  if (period === "month") { d.setMonth(d.getMonth() - 1); return d; }
  if (period === "year") { d.setFullYear(d.getFullYear() - 1); return d; }
  return null; // all
}

// GET: ledger + summary (Owner only).
export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const period = new URL(req.url).searchParams.get("period") || "all";
    const start = periodStart(period);
    const where = start ? { date: { gte: start } } : {};

    const transactions = await prisma.transaction.findMany({ where, orderBy: { date: "desc" }, take: 500 });
    let income = 0, expense = 0;
    const byCategory: Record<string, number> = {};
    for (const t of transactions) {
      if (t.type === TxType.INCOME) income += t.amount;
      else { expense += t.amount; byCategory[t.category] = (byCategory[t.category] || 0) + t.amount; }
    }

    return NextResponse.json({ transactions, summary: { income, expense, net: income - expense, byCategory } });
  } catch (err) {
    console.error("GET Finance error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST: add a transaction (Owner only).
export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden: Owner only" }, { status: 403 });

    const { type, category, amount, description, staffName, date } = await req.json();
    if (!type || !category || amount === undefined || isNaN(parseFloat(amount))) {
      return NextResponse.json({ error: "Type, category and amount are required" }, { status: 400 });
    }

    const tx = await prisma.transaction.create({
      data: {
        type: type === "INCOME" ? TxType.INCOME : TxType.EXPENSE,
        category: String(category).trim(),
        amount: Math.abs(parseFloat(amount)),
        description: description ? String(description).trim() : null,
        staffName: staffName ? String(staffName).trim() : null,
        date: date ? new Date(date) : new Date(),
        createdById: user.id,
      },
    });

    await prisma.auditLog.create({
      data: { userId: user.id, action: "CREATE_TRANSACTION", details: JSON.stringify({ id: tx.id, type: tx.type, category: tx.category, amount: tx.amount }) },
    });

    return NextResponse.json({ success: true, transaction: tx });
  } catch (err) {
    console.error("POST Finance error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
