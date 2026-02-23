import Link from "next/link";
import { isLocale, Locale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function JourneysPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) return notFound();

  const copy = t(locale as Locale);

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <h1 className="font-serif text-4xl">{copy.journeys.title}</h1>
      <p className="mt-3 max-w-2xl opacity-80">{copy.journeys.intro}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {copy.journeys.items.map((j) => (
          <div key={j.title} className="rounded-2xl border border-black/10 bg-white/30 p-6">
            <div className="font-semibold">{j.title}</div>
            <div className="mt-2 text-sm opacity-80">{j.note}</div>
            <Link
              href={`/${locale}/contact`}
              className="mt-4 inline-block text-sm underline underline-offset-4"
            >
              {copy.journeys.request}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}