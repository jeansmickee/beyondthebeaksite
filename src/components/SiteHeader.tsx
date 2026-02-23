import Link from "next/link";
import Image from "next/image";
import { Locale, t } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f2ea]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image src="/brand/logo.png" alt="Beyond the Beak" width={56} height={56} priority />
          <span className="font-serif text-xl tracking-wide">Beyond the Beak</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${locale}/journeys`} className="hover:opacity-70 transition">
            {copy.nav.journeys}
          </Link>
          <Link href={`/${locale}/about`} className="hover:opacity-70 transition">
            {copy.nav.about}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-black/15 px-4 py-2 hover:bg-black/5 transition"
          >
            {copy.nav.proposal}
          </Link>

          {/* Ny: behåller samma sida */}
          <LanguageSwitcher locale={locale} />
        </nav>
      </div>
    </header>
  );
}