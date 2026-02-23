import { isLocale, Locale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) return notFound();

  const copy = t(locale as Locale);

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-serif text-4xl">{copy.about.title}</h1>
      <div className="mt-6 max-w-3xl space-y-4 opacity-85">
        <p>{copy.about.p1}</p>
        <p>{copy.about.p2}</p>
      </div>
    </main>
  );
}