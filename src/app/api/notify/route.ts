import { NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/clients/db";
import { sendTelegramMessage } from "~/server/clients/telegram";

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (!env.DINQCLAW_NOTIFY_API_KEY || apiKey !== env.DINQCLAW_NOTIFY_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    dinq_id: string;
    name: string;
    email: string;
    message: string;
    source_url: string;
  };

  const { dinq_id, name, email, message, source_url } = body;

  if (!dinq_id || !name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const user = await db.user.findUnique({
    where: { dinqId: dinq_id },
    include: {
      instances: {
        select: { telegramChatId: true },
        take: 1,
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  const telegramChatId = user.instances[0]?.telegramChatId;

  if (!telegramChatId) {
    console.error("[notify] user has no Telegram linked:", dinq_id);
    return NextResponse.json(
      { ok: true, warning: "No Telegram linked" },
      { status: 200 },
    );
  }

  const telegramMessage = `🔔 New lead from your website!

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
🌐 From: ${source_url}

Reply here to follow up with Lucy 👇`;

  try {
    await sendTelegramMessage(telegramChatId, telegramMessage);
  } catch (error) {
    console.error("[notify] Telegram send failed:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
