import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyJWT } from "@/lib/jwt";
import { notifyUserTelegram, leadAssignedMessage, leadsBulkAssignedMessage } from "@/lib/notify";
import { Role } from "@prisma/client";

async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("crm_token")?.value;
  if (!token) return null;
  return verifyJWT(token);
}

const MAX_IDS = 500;
const fmt = (v: unknown) => (v === null || v === undefined || v === "" ? "—" : String(v));

// POST: hand a batch of leads to one broker and/or move them to one status in
// a single request. Owner only. Body: { ids, brokerId?, status?, lostReason? }
// where an omitted field is left alone and brokerId "" / null unassigns.
// Writes the same field-level history as editing one lead, but sends a single
// Telegram message per batch and returns only the fields that changed, so the
// page updates its cards without re-pulling the list.
export async function POST(req: Request) {
  try {
    const user = await getSessionUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (user.role !== Role.OWNER) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const ids: string[] = Array.isArray(body.ids)
      ? [...new Set<string>(body.ids.filter((x: unknown) => typeof x === "string" && x))]
      : [];
    if (ids.length === 0) return NextResponse.json({ error: "No leads selected" }, { status: 400 });
    if (ids.length > MAX_IDS) {
      return NextResponse.json({ error: `At most ${MAX_IDS} leads at a time` }, { status: 400 });
    }

    const setBroker = body.brokerId !== undefined;
    const newBrokerId: string | null = setBroker ? body.brokerId || null : null;
    const setStatus = typeof body.status === "string" && body.status.trim() !== "";
    const newStatus: string = setStatus ? body.status.trim() : "";
    const lostReason = typeof body.lostReason === "string" ? body.lostReason.trim() : "";
    if (!setBroker && !setStatus) return NextResponse.json({ error: "Nothing to change" }, { status: 400 });
    if (newStatus === "LOST" && !lostReason) {
      return NextResponse.json({ error: "Lost status requires a reason" }, { status: 400 });
    }

    const newBroker = newBrokerId
      ? await prisma.user.findUnique({
          where: { id: newBrokerId },
          select: { id: true, fullName: true, role: true, isActive: true, telegramChatId: true },
        })
      : null;
    if (newBrokerId && (!newBroker || newBroker.role !== Role.BROKER || !newBroker.isActive)) {
      return NextResponse.json({ error: "Broker not found" }, { status: 400 });
    }

    const leads = await prisma.lead.findMany({
      where: { id: { in: ids }, archived: false },
      select: {
        id: true, name: true, phone: true, status: true, lostReason: true, brokerId: true,
        broker: { select: { fullName: true } },
      },
    });

    const history: { leadId: string; field: string; oldValue: string; newValue: string }[] = [];
    const track = (leadId: string, field: string, oldVal: unknown, newVal: unknown) => {
      if (fmt(oldVal) !== fmt(newVal)) history.push({ leadId, field, oldValue: fmt(oldVal), newValue: fmt(newVal) });
    };

    const statusIds: string[] = [];
    const brokerIds: string[] = [];
    for (const l of leads) {
      if (setStatus && l.status !== newStatus) {
        statusIds.push(l.id);
        track(l.id, "status", l.status, newStatus);
        if (newStatus === "LOST") track(l.id, "lostReason", l.lostReason, lostReason);
      }
      if (setBroker && l.brokerId !== newBrokerId) {
        brokerIds.push(l.id);
        track(l.id, "broker", l.broker?.fullName, newBroker?.fullName);
      }
    }

    const changedIds = new Set([...statusIds, ...brokerIds]);
    if (changedIds.size > 0) {
      await prisma.$transaction([
        ...(statusIds.length
          ? [prisma.lead.updateMany({
              where: { id: { in: statusIds } },
              data: { status: newStatus, lostReason: newStatus === "LOST" ? lostReason : null },
            })]
          : []),
        ...(brokerIds.length
          ? [prisma.lead.updateMany({ where: { id: { in: brokerIds } }, data: { brokerId: newBrokerId } })]
          : []),
        // The Owner's own edits are pre-acknowledged, same as a single edit.
        prisma.leadHistory.createMany({
          data: history.map((h) => ({
            ...h, editorId: user.id, editorName: user.fullName, editorRole: user.role, seen: true,
          })),
        }),
        prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "BULK_UPDATE_LEADS",
            details: JSON.stringify({
              leadIds: [...changedIds],
              ...(setStatus ? { status: newStatus } : {}),
              ...(setBroker ? { broker: newBroker?.fullName ?? null } : {}),
            }),
          },
        }),
      ]);
    }

    // One Telegram message for the whole batch, never one per lead.
    const assigned = leads.filter((l) => brokerIds.includes(l.id));
    if (newBroker && newBroker.id !== user.id && assigned.length > 0) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
      const text = assigned.length === 1
        ? leadAssignedMessage({
            brokerName: newBroker.fullName, leadName: assigned[0].name, leadPhone: assigned[0].phone,
            assignedBy: user.fullName, appUrl,
          })
        : leadsBulkAssignedMessage({ brokerName: newBroker.fullName, leads: assigned, assignedBy: user.fullName, appUrl });
      await notifyUserTelegram(newBroker, text, { alsoGlobal: true });
    }

    return NextResponse.json({
      success: true,
      updated: changedIds.size,
      skipped: ids.length - leads.length,
      patch: {
        ...(setStatus ? { status: newStatus, lostReason: newStatus === "LOST" ? lostReason : null } : {}),
        ...(setBroker
          ? { brokerId: newBrokerId, broker: newBroker ? { id: newBroker.id, fullName: newBroker.fullName } : null }
          : {}),
      },
      ids: leads.map((l) => l.id),
    });
  } catch (err) {
    console.error("POST Leads bulk Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
