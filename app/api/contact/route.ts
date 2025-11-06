import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  district?: string;
  link?: string;
  format?: string;
  property?: string;
  listing?: string;
};

async function notifyTelegram(payload: ContactPayload) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const message = `Новая заявка Flora Home%0AИмя: ${payload.name}%0AТелефон: ${payload.phone}%0AEmail: ${payload.email ?? "-"}%0AРайон: ${payload.district ?? "-"}%0AФормат: ${payload.format ?? "-"}%0AТип: ${payload.property ?? "-"}%0AСсылка: ${payload.link ?? payload.listing ?? "-"}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`, {
    method: "GET"
  });
}

async function notifyWebhook(payload: ContactPayload) {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "flora-home", ...payload })
  });
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as ContactPayload;

    if (!data?.name || !data?.phone) {
      return NextResponse.json({ error: "Заполните имя и телефон" }, { status: 400 });
    }

    await Promise.all([notifyTelegram(data), notifyWebhook(data)]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error", error);
    return NextResponse.json({ error: "Не удалось отправить" }, { status: 500 });
  }
}
