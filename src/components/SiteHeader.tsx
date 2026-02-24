import Link from "next/link";
import Image from "next/image";
import { Locale, t } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f2ea]/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 select-none touch-manipulation active:opacity-80"
        >
          <Image
            src="/brand/logo.png"
            alt="Beyond the Beak"
            width={48}
            height={48}
            priority
            className="h-11 w-11 sm:h-14 sm:w-14"
          />
          <span className="font-serif text-lg sm:text-xl tracking-wide">
            Beyond the Beak
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href={`/${locale}/journeys`}
            className="py-2 hover:opacity-70 transition select-none touch-manipulation active:opacity-80"
          >
            {copy.nav.journeys}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="py-2 hover:opacity-70 transition select-none touch-manipulation active:opacity-80"
          >
            {copy.nav.about}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-black/15 px-5 py-3 hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
          >
            {copy.nav.proposal}
          </Link>

          <LanguageSwitcher locale={locale} />
        </nav>

        {/* Mobile right side: language + simple menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />

          {/* “Quick actions” på mobil: bara en tydlig CTA */}
          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-black/15 px-4 py-3 text-sm hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
          >
            {copy.nav.proposal}
          </Link>
        </div>
      </div>

      {/* Extra rad för mobil-länkar (stora klickytor) */}
      <div className="md:hidden border-t border-black/5">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 flex gap-2">
          <Link
            href={`/${locale}/journeys`}
            className="flex-1 text-center rounded-full border border-black/10 px-4 py-3 text-sm bg-white/30 hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
          >
            {copy.nav.journeys}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="flex-1 text-center rounded-full border border-black/10 px-4 py-3 text-sm bg-white/30 hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
          >
            {copy.nav.about}
          </Link>
        </div>
      </div>
    </header>
  );
}