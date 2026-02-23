import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { isLocale, Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) return notFound();

  return (
    <>
      <SiteHeader locale={locale as Locale} />
      {children}
      <SiteFooter />
    </>
  );
}