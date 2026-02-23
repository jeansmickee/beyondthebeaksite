import { NextResponse } from "next/server";
import { Resend } from "resend";

const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 min
const RATE_LIMIT_MAX = 5;

const ipStore = new Map<string, { count: number; firstRequest: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry) {
    ipStore.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
    ipStore.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    const { name, email, message, company } = await req.json();

    // Honeypot: om ifyllt → låtsas OK (tyst)
    if (company) {
      return NextResponse.json({ ok: true });
    }

    // Rate limit (per IP / instance)
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false }, { status: 429 });
    }

    // Validering
    if (
      !name ||
      !email ||
      !message ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      name.trim().length < 2 ||
      name.length > 100 ||
      message.length > 2000 ||
      !isValidEmail(email)
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Beyond the Beak <onboarding@resend.dev>",
      to: toEmail,
      subject: `New inquiry from ${name.trim()}`,
      replyTo: email.trim(),
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nIP: ${ip}\n\n${message.trim()}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}