// Server-side Telegram notifications for the CRM.
//
// Used to alert an employee the moment a task or a lead is assigned to them.
// Each user can store a personal `telegramChatId` (set in the staff profile).
// If they haven't, we fall back to the global TELEGRAM_CHAT_ID(s) from the env
// so the message still reaches the company channel / the owner.
//
// All functions are best-effort: they never throw. A missing bot token or a
// failed request is logged but must not break the request that triggered it.

function escapeHtml(s: string): string {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string)
  );
}

// Parse the global fallback chat ids (comma-separated: a personal chat + a channel).
function globalChatIds(): string[] {
  return (process.env.TELEGRAM_CHAT_ID || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// Low-level: send one HTML message to one chat id. Returns true on success.
async function sendToChat(token: string, chatId: string, text: string): Promise<boolean> {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[notify][telegram] ${chatId} ${res.status} ${body.slice(0, 160)}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[notify][telegram] request failed:", err);
    return false;
  }
}

/**
 * Notify a specific employee on Telegram.
 *
 * Sends to the user's own chat id when present; otherwise to the global
 * fallback chat ids. Always also forwards to the global ids when `alsoGlobal`
 * is true (handy so the owner sees every assignment). Best-effort — returns
 * the number of chats that actually received the message.
 */
export async function notifyUserTelegram(
  user: { telegramChatId?: string | null; fullName?: string | null } | null,
  text: string,
  opts: { alsoGlobal?: boolean } = {}
): Promise<number> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return 0;

  const targets = new Set<string>();
  if (user?.telegramChatId && user.telegramChatId.trim()) {
    targets.add(user.telegramChatId.trim());
  }
  // Fall back to (or additionally include) the company channel.
  if (targets.size === 0 || opts.alsoGlobal) {
    for (const id of globalChatIds()) targets.add(id);
  }
  if (targets.size === 0) return 0;

  const results = await Promise.all([...targets].map((id) => sendToChat(token, id, text)));
  return results.filter(Boolean).length;
}

// Build the body for a "new task assigned" alert.
export function taskAssignedMessage(opts: {
  assigneeName: string;
  title: string;
  description?: string | null;
  type?: string | null;
  deadline?: Date | string | null;
  assignedBy: string;
  appUrl?: string;
}): string {
  const deadline = opts.deadline
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(opts.deadline))
    : "—";
  const link = `${opts.appUrl || ""}/crm/tasks`;
  return (
    `✅ <b>Yangi vazifa / New Task</b>\n\n` +
    `👤 <b>Kim uchun:</b> ${escapeHtml(opts.assigneeName)}\n` +
    `📋 <b>Vazifa:</b> ${escapeHtml(opts.title)}\n` +
    (opts.description ? `📝 ${escapeHtml(opts.description)}\n` : "") +
    (opts.type ? `🏷 <b>Turi:</b> ${escapeHtml(opts.type)}\n` : "") +
    `⏰ <b>Muddat:</b> ${escapeHtml(deadline)}\n` +
    `🧑‍💼 <b>Bergan:</b> ${escapeHtml(opts.assignedBy)}\n\n` +
    `🔗 ${escapeHtml(link)}`
  );
}

// Build the body for a "new lead assigned" alert.
export function leadAssignedMessage(opts: {
  brokerName: string;
  leadName: string;
  leadPhone: string;
  assignedBy: string;
  appUrl?: string;
}): string {
  const link = `${opts.appUrl || ""}/crm/leads`;
  return (
    `🎯 <b>Yangi mijoz / New Lead</b>\n\n` +
    `👤 <b>Broker:</b> ${escapeHtml(opts.brokerName)}\n` +
    `🙋 <b>Mijoz:</b> ${escapeHtml(opts.leadName)}\n` +
    `📞 <b>Telefon:</b> ${escapeHtml(opts.leadPhone)}\n` +
    `🧑‍💼 <b>Biriktirgan:</b> ${escapeHtml(opts.assignedBy)}\n\n` +
    `🔗 ${escapeHtml(link)}`
  );
}
