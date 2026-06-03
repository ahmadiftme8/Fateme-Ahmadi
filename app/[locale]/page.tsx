import { HomeHero } from "@/components/blocks/hero/HomeHero";
import FeaturedProjects from "@/components/blocks/projects/FeaturedProjects";
// Trigger rebuild
import Services from "@/components/blocks/services/Services";
import TrustedBy from "@/components/blocks/trustedby/TrustedBy";
import FAQ from "@/components/blocks/FAQ/FAQ";
import ContactMe from "@/components/blocks/contact/ContactMe";
import { getTranslations } from "next-intl/server";
import ThemeToggle from '@/components/ui/ThemeToggle'
import { PageTheme } from "@/components/utility/PageTheme";
import { getSheetData } from "@/lib/googleSheets";
/* import { Header } from "@/components/layout/header/Header"; */

export const dynamic = "force-static";
export const revalidate = 3600;

type PageParams = {
  params: Promise<{ locale: string }>;
};

// This runs on the server before rendering the page.
// It sets <title> and <meta name="description"> for SEO.
export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("seo.home.title"),
    description: t("seo.home.description"),
    alternates: {
      languages: {
        en: "/en",
        fa: "/fa",
      },
      canonical: `/${locale}`,
    },
  };
}
export default async function HomePage() {
  const projects = await getSheetData();

  return (
    <>
    
    <PageTheme defaultTheme="light" storageKey="fateme-theme-home" />
    <ThemeToggle defaultTheme="light" storageKey="fateme-theme-home" />
      <HomeHero />
      
      
      <Services />
      <FeaturedProjects projects={projects} />
      <TrustedBy />
      <FAQ />
      <ContactMe />
    </>
  );
}
