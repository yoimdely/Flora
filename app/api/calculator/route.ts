import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "calculator", ...payload })
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Calculator webhook error", error);
    return NextResponse.json({ error: "Не удалось зафиксировать заявку" }, { status: 500 });
  }
}
