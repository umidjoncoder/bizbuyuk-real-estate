import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { Role } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

export async function GET(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Only Owner and Sales Director and Marketing Director (for sources) can view dashboard analytics
    if (
      user.role !== Role.OWNER &&
      user.role !== Role.SALES_DIRECTOR &&
      user.role !== Role.MARKETING_DIRECTOR
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Period filter (week/month/year/all) for weekly/monthly/yearly stats.
    const period = new URL(req.url).searchParams.get("period") || "all";
    const start = (() => {
      const d = new Date();
      if (period === "week") { d.setDate(d.getDate() - 7); return d; }
      if (period === "month") { d.setMonth(d.getMonth() - 1); return d; }
      if (period === "year") { d.setFullYear(d.getFullYear() - 1); return d; }
      return null;
    })();
    const dateWhere = start ? { createdAt: { gte: start } } : {};
    const wonWhere = start ? { updatedAt: { gte: start } } : {};

    // Lead Status breakdown (created in period)
    const statusCounts = await prisma.lead.groupBy({ by: ["status"], _count: true, where: { archived: false, ...dateWhere } });

    // Lead Source breakdown (created in period)
    const sourceCounts = await prisma.lead.groupBy({ by: ["source"], _count: true, where: { archived: false, ...dateWhere } });

    // Broker performance — WON in the selected period.
    const brokerPerformanceRaw = await prisma.user.findMany({
      where: { role: Role.BROKER },
      select: {
        fullName: true,
        assignedLeads: { select: { status: true, budget: true, updatedAt: true, createdAt: true } },
      },
    });

    const brokerPerformance = brokerPerformanceRaw.map((b) => {
      const inPeriod = start ? b.assignedLeads.filter((l) => l.createdAt >= start) : b.assignedLeads;
      const wonLeads = b.assignedLeads.filter((l) => l.status === "WON" && (!start || l.updatedAt >= start));
      const totalBudget = wonLeads.reduce((sum, l) => sum + (l.budget || 0), 0);
      return { name: b.fullName, totalLeads: inPeriod.length, wonLeads: wonLeads.length, totalSales: totalBudget };
    }).sort((a, b) => b.totalSales - a.totalSales);

    const totalSold = brokerPerformance.reduce((s, b) => s + b.totalSales, 0);
    const bestBroker = brokerPerformance.find((b) => b.totalSales > 0)?.name || null;

    // Property stats
    const propertyCount = await prisma.property.count();
    const propertySum = await prisma.property.aggregate({
      _sum: {
        price: true,
      },
    });

    // Marketing Director sees lead sources/funnel only — NOT broker financials
    // or portfolio value (those are sales/owner figures).
    const isMarketing = user.role === Role.MARKETING_DIRECTOR;

    return NextResponse.json({
      period,
      statusCounts: statusCounts.map((s) => ({ status: s.status, count: s._count })),
      sourceCounts: sourceCounts.map((s) => ({ source: s.source, count: s._count })),
      brokerPerformance: isMarketing ? [] : brokerPerformance,
      totalSold: isMarketing ? null : totalSold,
      bestBroker: isMarketing ? null : bestBroker,
      propertyCount,
      propertyTotalValue: isMarketing ? null : (propertySum._sum.price || 0),
    });
  } catch (err: any) {
    console.error("GET Analytics Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
