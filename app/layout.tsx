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
      <head suppressHydrationWarning>
        {/* CSS deferral script - runs immediately to prevent render-blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                // Defer all Next.js stylesheet links to prevent render blocking
                var links = document.querySelectorAll('link[rel="stylesheet"][data-precedence="next"]');
                links.forEach(function(link) {
                  link.media = 'print';
                  link.onload = function() {
                    this.media = 'all';
                  };
                  // For browsers that already have the stylesheet cached
                  if (link.sheet) {
                    link.media = 'all';
                  }
                });
                // Ensure all CSS is applied on load
                window.addEventListener('load', function() {
                  var remainingLinks = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
                  remainingLinks.forEach(function(link) {
                    link.media = 'all';
                  });
                });
              })();
            `
          }}
          suppressHydrationWarning
        />
      </head>
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
