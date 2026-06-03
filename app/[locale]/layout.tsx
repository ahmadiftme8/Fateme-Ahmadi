import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AnimatedDottedBackground } from "@/components/utility/AnimatedDottedBackground";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { LocaleAttributesUpdater } from "@/components/utility/LocaleAttributesUpdater";
import { ScrollProvider } from "@/components/utility/ScrollContext";
import { SpeedInsightsLazy } from "@/components/utility/SpeedInsightsLazy";

import { getDirection } from "@/lib/i18n";
import nextIntlConfig, { AppLocale, locales } from "@/next-intl.config";

import "../globals.css";

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-static";
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const fallbackLocale = nextIntlConfig.defaultLocale as AppLocale;

const resolveLocale = (locale: string): AppLocale =>
  locales.includes(locale as AppLocale) ? (locale as AppLocale) : fallbackLocale;

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocale(rawLocale);
  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;

  const dir = getDirection(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      
      <ScrollProvider>
        <LocaleAttributesUpdater />
        <div
          className="flex min-h-dvh flex-col relative"
          data-locale={locale}
          data-dir={dir}
        >
          <AnimatedDottedBackground />
          <Header />
          <main className="flex-1">
            {children}
            <SpeedInsightsLazy />
          </main>
          <Footer />
        </div>
      </ScrollProvider>
    </NextIntlClientProvider>
  );
}
