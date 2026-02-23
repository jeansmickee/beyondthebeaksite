"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { locales, localeFlagIso, localeLabel, type Locale } from "@/lib/i18n";

function Flag({ iso, label }: { iso: string; label: string }) {
  // 20px bredd, snyggt på rad. (Du kan ändra till w24)
  return (
    <img
      src={`https://flagcdn.com/w20/${iso}.png`}
      srcSet={`https://flagcdn.com/w40/${iso}.png 2x`}
      width={20}
      height={15}
      alt={label}
      className="rounded-[3px] shadow-[0_0_0_1px_rgba(0,0,0,0.10)]"
      loading="lazy"
    />
  );
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(() => {
    return {
      code: locale,
      iso: localeFlagIso[locale],
      label: localeLabel[locale],
    };
  }, [locale]);

  function hrefFor(target: Locale) {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${target}`;

    // byt första segmentet (locale)
    parts[0] = target;

    const base = "/" + parts.join("/");
    const qs = searchParams?.toString();
    return qs ? `${base}?${qs}` : base;
  }

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => {
  setOpen((v) => {
    const next = !v;

    if (next) {
      setAnimateIn(false);
      setTimeout(() => setAnimateIn(true), 10);
    }

    return next;
  });
}}
      >
        <Flag iso={current.iso} label={current.label} />
        <span className="uppercase">{current.code}</span>
        <span className="opacity-70" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div
			role="menu"
			className={[
				"absolute right-0 mt-2 w-25 overflow-hidden rounded-2xl border border-black/10 bg-[#f6f2ea] shadow-lg",
				"origin-top-right transition duration-150 ease-out",
				animateIn
					? "opacity-100 translate-y-0 scale-100"
					: "opacity-0 -translate-y-1 scale-[0.98]",
			].join(" ")}
		>
		
          <div className="p-1">
            {locales.map((l) => {
              const active = l === locale;
              return (
                <Link
					key={l}
					href={hrefFor(l)}
					onClick={() => setOpen(false)}
					className={[
						"flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
						active ? "bg-black/5" : "hover:bg-black/5",
					].join(" ")}
				>
					<span className="flex items-center gap-3">
						<Flag iso={localeFlagIso[l]} label={localeLabel[l]} />
						<span className="uppercase text-xs tracking-wide">{l}</span>
					</span>

					{active && <span className="text-xs opacity-60">✓</span>}
				</Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}