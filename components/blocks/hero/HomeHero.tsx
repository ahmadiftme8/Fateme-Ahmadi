"use client";

import Image from "next/image";
import { Download, Eye } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import styles from "./HomeHero.module.css";

const cvUrl = "/documents/Fatemeh Ahmadi - Designer and Developer.pdf";

export function HomeHero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isFa = locale === "fa";

  const handleDownloadCv = () => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Fatemeh Ahmadi - Designer and Developer.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

/*   const handleViewCv = () => {
    window.open(cvUrl, "_blank", "noopener,noreferrer");
  }; */

  return (
    <>
      <section  className={styles.hero } id="home">
        <div className={styles.container}>
          <div className={styles.heroWrap}>
            {/* Profile Wrapper with Image and Badge */}
            <div className={styles.profileWrapper}>
              <div className={styles.heroImageFrame}>
                <div className={styles.heroCard}>
                  <Image
                    src="/fateme-pic.png"
                    alt={t("imageAlt")}
                    fill
                    sizes="205px"
                    priority
                    className={styles.heroImage}
                  />
                </div>
              </div>
              
              {/* Badge with Animation */}
              <div className={styles.badge} aria-hidden="true">
                <span className={styles.badgeText}>Hi</span>
                <div className={styles.badgeIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 77.75 92.4"
                  >
                    <path
                      fill="#fcfcfe"
                      d="m45.24,90.89c-15.94,4.59-33.94-.71-37.56-23.9-.1-.65-.21-1.31-.22-1.97-.11-12.48-2.66-24.48-6.96-36.17-1.18-3.2-.26-5.42,2.32-6.66,3.19-1.54,6.1-.4,7.22,2.97,1.9,5.72,3.65,11.49,5.59,17.2.52,1.53,1.27,4.24,2.62,3.84,1.85-.56.92-3.16.63-4.8-1.67-9.27-3.47-18.52-5.28-27.76-.48-2.47-.06-4.52,2.16-5.9,3.36-2.1,7.08-.38,7.88,3.69,1.72,8.88,3.32,17.77,5.03,26.66.34,1.78.38,4.8,2.2,4.63,1.96-.18,1.23-3.13,1.25-4.89.14-10.83.17-21.66.27-32.49.04-3.78,2.45-5.81,6.02-5.25,2.7.42,4.05,2.22,4.02,5.53-.1,10.93-.25,21.85-.33,32.77-.02,1.5.18,3,.36,4.49.06.53.22,1.19.91,1.27.72.1.95-.56,1.1-1.06.34-1.07.62-2.18.82-3.28,1.62-9.17,3.19-18.36,4.83-27.54.72-4.06,3.82-5.67,7.51-4.02,2.61,1.18,3.08,3.24,2.62,5.85-1.81,9.91-3.48,19.84-5.35,29.75-.54,2.86-.03,5.82-1.01,8.61-4.26.19-8.15,1.66-11.58,4.03-7.55,5.21-11.21,12.5-10.74,21.73.04.98-.02,2.53,1.15,2.57,1.31.05,1.1-1.51,1.19-2.45.3-3.41,1.04-6.7,2.46-9.82,3.72-8.19,10.39-12.37,18.99-13.92,2.01.59,3.27-.42,4.12-2.06.83-1.58,1.53-3.24,2.3-4.85,1.5-3.14,3.66-5.7,6.81-7.31,2.09-1.07,4.29-1.44,6.52-.38,2.72,1.28,3.43,3.81,1.71,6.27-1.14,1.61-2.39,3.16-3.59,4.72-3.3,4.29-5.57,8.87-6.7,14.37-2.48,12.11-8.65,21.91-21.27,25.54Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className={styles.textContent}>
              <h1   className={styles.heroName}>{t("name")}</h1>
              <p className={styles.heroRole}>
                {isFa ? t("designerDeveloper") : `${t("designer")} & ${t("developer")}`}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.postHero} id="about">
          <svg
            id="Layer_2"
            width="46"
            height="41"
            viewBox="0 0 46 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.quoteIcon}
          >
            <g clipPath="url(#clip0_1239_3287)">
              <path
                d="M0 41V24.2328C0 8.08161 6.29718 0 18.8793 0V7.47761C13.5237 7.47761 10.8581 11.1258 10.8581 18.4222V22.3483H18.8793V41H0ZM27.1329 41V24.2328C27.1329 8.08161 33.4179 0 46 0V7.47761C40.6443 7.47761 37.9787 11.1258 37.9787 18.4222V22.3483H46V41H27.1207H27.1329Z"
                fill="#EA5B37"
              />
            </g>
            <defs>
              <clipPath id="clip0_1239_3287">
                <rect width="46" height="41" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <p className={styles.postHeroText}>{`I'm Fateme, a multidisciplinary designer and front-end developer
            creating impactful digital experiences, visuals, and products for
            brands and businesses for over 7 years.`}
          </p>
          <div className={styles.cvActions}>
            <Button
              type="button"
              className={styles.cvButton}
              onClick={handleDownloadCv}
            >
              <Download size={18} aria-hidden="true" />
              <span>Download CV</span>
            </Button>
{/*             <Button
              type="button"
              variant="ghost"
              className={styles.cvButton}
              onClick={handleViewCv}
            >
              <Eye size={18} aria-hidden="true" />
              <span>View CV</span>
            </Button> */}
          </div>
        </div>
      </section>
    </>
  );
}
