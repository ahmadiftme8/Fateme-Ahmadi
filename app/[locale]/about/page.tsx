import AboutHero from "@/components/about/AboutHero";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-static";
export const revalidate = 3600;

type PageParams = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t("seo.about.title"),
    description: t("seo.about.description"),
    alternates: {
      languages: {
        en: "/en/about",
        fa: "/fa/about",
      },
      canonical: `/${locale}/about`,
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      
    </>
  );
}

