import { isLocale, Locale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) return notFound();

  const copy = t(locale as Locale).contact;

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-serif text-4xl">{copy.title}</h1>
      <p className="mt-3 max-w-2xl opacity-80">{copy.intro}</p>

      <ContactForm copy={copy} />
    </main>
  );
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const dates = String(body?.dates ?? "").trim();
    const interests = String(body?.interests ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL!;
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const subject = `Beyond the Beak — New request from ${name}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      dates ? `Dates: ${dates}` : null,
      interests ? `Interests: ${interests}` : null,
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: `Beyond the Beak <${from}>`,
      to,
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}