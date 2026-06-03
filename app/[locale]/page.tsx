import nextDynamic from "next/dynamic";
import { HomeHero } from "@/components/blocks/hero/HomeHero";
import { getTranslations } from "next-intl/server";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { PageTheme } from "@/components/utility/PageTheme";
import { getSheetData } from "@/lib/googleSheets";

const Services = nextDynamic(
  () => import("@/components/blocks/services/Services"),
  { loading: () => <section aria-busy className="min-h-[400px]" /> }
);

const FeaturedProjects = nextDynamic(
  () => import("@/components/blocks/projects/FeaturedProjects"),
  {
    loading: () => (
      <section id="portfolio" aria-busy className="min-h-[480px]" />
    ),
  }
);

const TrustedBy = nextDynamic(
  () => import("@/components/blocks/trustedby/TrustedBy"),
  { loading: () => <section aria-busy className="min-h-[200px]" /> }
);

const FAQ = nextDynamic(() => import("@/components/blocks/FAQ/FAQ"), {
  loading: () => <section aria-busy className="min-h-[300px]" />,
});

const ContactMe = nextDynamic(
  () => import("@/components/blocks/contact/ContactMe"),
  { loading: () => <section aria-busy className="min-h-[400px]" /> }
);

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
