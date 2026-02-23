import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    if (!toEmail) {
      return NextResponse.json(
        { ok: false, error: "Missing CONTACT_TO_EMAIL" },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Beyond the Beak <onboarding@resend.dev>",
      to: toEmail,
      subject: `Ny förfrågan från ${name}`,
      replyTo: email,
      text: `Namn: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}