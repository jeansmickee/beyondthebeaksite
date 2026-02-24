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
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-16 sm:py-20 md:py-28 overflow-hidden">
        <div className="grid gap-12 md:grid-cols-2 md:items-center w-full">
          {/* Text */}
          <div className="text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.25em] opacity-60">
              {copy.home.metaLine}
            </p>

            <div className="mt-7 text-[#2F3E1F]">
              <h1 className="font-serif uppercase leading-[0.95] break-words">
				<span className="block tracking-[0.02em] text-[clamp(36px,8vw,64px)]">
					Beyond
				</span>
				<span className="block mt-2 tracking-[0.02em] text-[clamp(32px,7vw,56px)]">
				The Beak
				</span>
</h1>

              <p className="mt-2 font-serif text-[16px] sm:text-[18px] opacity-75">
                Journeys for the curious and kind.
              </p>
            </div>

            <p className="font-serif mt-6 text-[16px] leading-7 sm:text-[17px] opacity-80 max-w-xl mx-auto lg:mx-0">
              {copy.home.intro}
            </p>

            {/* CTA */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center rounded-2xl bg-[#3f4f36] px-7 py-4 text-white text-base shadow-sm hover:opacity-90 transition select-none touch-manipulation active:scale-[0.98]"
              >
                {copy.home.cta1}
              </Link>

              <Link
                href={`/${locale}/journeys`}
                className="inline-flex items-center justify-center rounded-2xl border border-black/20 bg-white/30 px-7 py-4 text-base hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
              >
                {copy.home.cta2}
              </Link>
            </div>

            {/* Swipe cards on mobile */}
            <div className="mt-10 sm:mt-12">
             <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible">
                {copy.home.cards.map((c) => (
                  <div
                    key={c.title}
                    className="min-w-[240px] sm:min-w-0 rounded-2xl border border-black/10 bg-white/35 p-4"
                  >
                    <div className="font-semibold">{c.title}</div>
                    <div className="opacity-75">{c.sub}</div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs opacity-60 sm:hidden">Swipe for more</p>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-3xl border border-black/10 bg-white/30 p-3">
            <div className="relative w-full overflow-hidden rounded-2xl">
				<div className="relative w-full aspect-[4/3]">
					<Image
						src="/hero/peacock.jpg"
						alt="Bird in Sri Lanka"
						fill
						priority
						sizes="(max-width: 768px) 100vw, 50vw"
						className="object-cover"
					/>
				</div>	
			  
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
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