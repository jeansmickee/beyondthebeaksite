import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["sv", "en", "si", "da", "fi", "no", "de", "fr", "pl"];
const defaultLocale = "sv";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorera Next interna paths och assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Om root "/" → skicka till /sv
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    );
  }

  // Om första segmentet inte är ett giltigt språk → redirect till /sv
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  return;
}