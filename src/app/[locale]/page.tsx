import Link from "next/link";
import { isLocale, Locale, t } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) return notFound();

  const copy = t(locale as Locale);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 md:py-28 min-h-[100svh]">
        <div className="grid gap-10 lg:gap-12 md:grid-cols-2 md:items-center">
          <div className="text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.25em] opacity-60">
              {copy.home.metaLine}
            </p>

            <div className="mt-7 text-[#2F3E1F]">
              <h1 className="font-serif uppercase leading-[0.95]">
                <span className="block tracking-[0.02em] text-[clamp(44px,7vw,76px)]">
                  Beyond
                </span>
                <span className="block mt-2 tracking-[0.02em] text-[clamp(38px,6vw,64px)]">
                  The Beak
                </span>
              </h1>

              <p className="mt-2 font-serif text-[16px] sm:text-[18px] opacity-75">
                Journeys for the curious and kind.
              </p>
            </div>

            <p className="font-serif mt-6 text-[16px] leading-7 sm:text-[17px] sm:leading-7 opacity-80 max-w-xl mx-auto md:mx-0">
              {copy.home.intro}
            </p>

            {/* CTA: stora touch targets, full bredd på mobil */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-full bg-[#3f4f36] px-7 py-4 text-white text-base tracking-wide hover:opacity-90 transition shadow-sm select-none touch-manipulation active:scale-[0.98]"
              >
                {copy.home.cta1}
              </Link>

              <Link
                href={`/${locale}/journeys`}
                className="inline-flex items-center justify-center rounded-full border border-black/20 px-7 py-4 text-base hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
              >
                {copy.home.cta2}
              </Link>
            </div>

            {/* Cards: inte 3 kolumner på mobil (blir för trångt) */}
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm max-w-xl mx-auto md:mx-0">
              {copy.home.cards.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl border border-black/10 bg-white/30 p-4"
                >
                  <div className="font-semibold">{c.title}</div>
                  <div className="opacity-75">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/30 p-3">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <Image
                src="/hero/peacock.jpg"
                alt="Bird in Sri Lanka"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
            </div>

            <p className="mt-3 px-2 text-sm opacity-70">
              {copy.home.imageHint}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}