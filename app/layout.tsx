import type { Metadata } from "next";
/* import { Big_Shoulders, Anton_SC, Inter, Poppins, Antonio } from "next/font/google"; */
import { ReactNode } from "react";

import { getDirection } from "@/lib/i18n";
import nextIntlConfig, { AppLocale } from "@/next-intl.config";

export const dynamic = "force-static";






const defaultLocale = nextIntlConfig.defaultLocale as AppLocale;

export const metadata: Metadata = {
  title: {
    default: "Fateme Ahmadi - Brand Identity & Web Design",
    template: "%s | Fateme Ahmadi",
  },
  description:
    "Bilingual brand identity and web design studio crafting bold digital experiences for English and Persian audiences.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = defaultLocale;
  const dir = getDirection(locale);
  const bodyFontClass = locale === "fa" ? "font-vazirmatn" : "font-poppins";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${bodyFontClass} min-h-dvh antialiased `}
        data-theme="light"
        data-locale={locale}
        data-dir={dir}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
