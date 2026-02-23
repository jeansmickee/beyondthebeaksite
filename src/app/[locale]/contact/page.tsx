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