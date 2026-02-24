"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Locale, t } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function SiteHeader({ locale }: { locale: Locale }) {
  const copy = t(locale);
  const [open, setOpen] = useState(false);

  // Stäng menyn vid route-byte (när man klickar en länk)
  const close = () => setOpen(false);

  // Stäng vid ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#f6f2ea]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 select-none touch-manipulation active:opacity-80"
            onClick={close}
          >
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

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher locale={locale} />

            <button
              type="button"
              aria-label={open ? "Stäng meny" : "Öppna meny"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-black/15 bg-white/40 px-4 py-3 text-sm hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.98]"
            >
              {open ? "Stäng" : "Meny"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-3 rounded-2xl border border-black/10 bg-white/40 p-2">
            <Link
              href={`/${locale}/journeys`}
              onClick={close}
              className="block rounded-xl px-4 py-3 text-base hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.99]"
            >
              {copy.nav.journeys}
            </Link>

            <Link
              href={`/${locale}/about`}
              onClick={close}
              className="block rounded-xl px-4 py-3 text-base hover:bg-black/5 transition select-none touch-manipulation active:scale-[0.99]"
            >
              {copy.nav.about}
            </Link>

            <Link
              href={`/${locale}/contact`}
              onClick={close}
              className="mt-2 block text-center rounded-xl bg-[#3f4f36] px-4 py-3 text-base text-white hover:opacity-90 transition select-none touch-manipulation active:scale-[0.99]"
            >
              {copy.nav.proposal}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}