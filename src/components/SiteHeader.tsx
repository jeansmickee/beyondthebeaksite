"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Locale, t } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const [showSubnav, setShowSubnav] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSubnav(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f2ea]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <Image
              src="/brand/logo.png"
              alt="Beyond the Beak"
              width={48}
              height={48}
              priority
              className="h-11 w-11 sm:h-12 sm:w-12"
            />
            <span className="font-serif text-lg sm:text-xl tracking-wide">
              Beyond the Beak
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href={`/${locale}/journeys`} className="py-2 hover:opacity-70 transition">
              {copy.nav.journeys}
            </Link>
            <Link href={`/${locale}/about`} className="py-2 hover:opacity-70 transition">
              {copy.nav.about}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-[#3f4f36] px-5 py-2.5 text-white hover:opacity-90 transition select-none touch-manipulation active:scale-[0.98]"
            >
              {copy.nav.proposal}
            </Link>
            <LanguageSwitcher locale={locale} />
          </nav>

          {/* Mobile controls (ingen meny) */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher locale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="rounded-full bg-[#3f4f36] px-4 py-3 text-sm text-white shadow-sm hover:opacity-90 transition select-none touch-manipulation active:scale-[0.98]"
            >
              {copy.nav.proposal}
            </Link>
          </div>
        </div>

        {/* Mobile subnav: visas först efter scroll */}
        <div
          className={[
            "md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out",
            showSubnav ? "max-h-24 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1",
          ].join(" ")}
        >
          <div className="mt-3 flex gap-2">
            <Link
              href={`/${locale}/journeys`}
              className="flex-1 text-center rounded-full border border-black/12 bg-white/35 px-4 py-3 text-sm hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
            >
              {copy.nav.journeys}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="flex-1 text-center rounded-full border border-black/12 bg-white/35 px-4 py-3 text-sm hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
            >
              {copy.nav.about}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}