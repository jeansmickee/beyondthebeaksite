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
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] opacity-60">
				{copy.home.metaLine}
			</p>

            <div className="mt-8 text-[#2F3E1F] text-center md:text-left">

  <div className="inline-block text-center">
    <h1 className="font-serif uppercase leading-[0.95]">

      <span className="block text-[52px] md:text-[76px] tracking-[0.02em]">
        Beyond
      </span>

      <span className="block mt-2 text-[44px] md:text-[64px] tracking-[0.02em]">
        The Beak
      </span>

    </h1>

    <p className="mt-1 font-serif text-[16px] md:text-[18px] opacity-75">
      Journeys for the curious and kind.
    </p>
  </div>

</div>

            <p className="font-serif mt-7 text-[16px] leading-7 opacity-80 max-w-xl">
				{copy.home.intro}
			</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/contact`}
                className="rounded-full bg-[#3f4f36] px-7 py-3.5 text-white text-sm tracking-wide hover:opacity-90 transition shadow-sm"
              >
                {copy.home.cta1}
              </Link>

              <Link
                href={`/${locale}/journeys`}
                className="rounded-full border border-black/20 px-6 py-3.5 text-sm hover:bg-black/5 transition"
              >
                {copy.home.cta2}
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 text-sm">
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
					src="/hero/peacock.jpg"   // byt till /hero/peacock.jpg om du vill
					alt="Bird in Sri Lanka"
					fill
					priority
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover"
				/>

    {/* subtil overlay för “boutique” känsla */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
  </div>

  <p className="mt-3 px-2 text-sm opacity-70">
    {/* du kan ta bort denna text helt om du vill */}
    {copy.home.imageHint}
  </p>
</div>
        </div>
      </section>
    </main>
  );
}