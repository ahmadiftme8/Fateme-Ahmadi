"use client";

import { useTranslations } from "next-intl";
import styles from "./AboutHero.module.css";
import Image from "next/image";
import { FaLinkedin, FaWhatsapp, FaTelegram, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function AboutHero() {
  const t = useTranslations("about");

  return (
    <section className={styles.aboutSection} data-page="about">
      {/* Hero Card Container */}
      <div className={styles.heroCard}>
        {/* Hero Content */}
        <div className={styles.heroContent}>
          <div className={styles.titleGroup}>
            <h1>
              {t("hero.subtitle")}
              <br />
              <span>{t("hero.title")}</span>
            </h1>
          </div>

          <button className={styles.btnPrimary} onClick={() => {
            document.getElementById('about-content')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            {t("hero.cta")}
            <span className={styles.iconArrow}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.74 49.74" width="100%" height="100%">
                <path d="m24.87,0C11.16,0,0,11.16,0,24.87s11.16,24.87,24.87,24.87,24.87-11.16,24.87-24.87S38.59,0,24.87,0Zm17.32,27.19c-.69,0-2.31.27-5.3,2.11-2.4,1.47-4.58,3.43-6.48,5.82-2.55,3.19-2.58,4.34-2.58,4.35h-4.63c0-1.18.38-3.22,3.58-7.24,1.53-1.92,3.22-3.6,5.05-5.04H6.91v-4.63h24.91c-1.84-1.44-3.52-3.13-5.05-5.04-3.2-4.02-3.58-6.06-3.58-7.24h4.63s.03,1.17,2.57,4.35c1.91,2.39,4.08,4.35,6.49,5.82,3,1.84,4.61,2.11,5.3,2.11v4.63Z" fill="currentColor" strokeWidth="0"/>
              </svg>
            </span>
          </button>
        </div>

        {/* Social Links */}
        <div className={styles.socialLinks}>
          <a href="https://www.linkedin.com/in/fatemeh-ahmadi8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://wa.me/message/D3NPOSXZLBYAA1?src=qr" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://t.me/AhmadiFtme" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <FaTelegram />
          </a>
          <a href="https://instagram.com/ahmadiftme" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="mailto:devftme@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Main Content Container */}
      <div id="about-content" className={styles.mainContainer}>
        {/* Header Pill */}
        <div className={`${styles.pillBox} ${styles.headerPill}`}>
          <h2 className={styles.headline}>
            {t("intro.title")
              .split("!")
              .filter((phrase) => phrase.trim())
              .map((phrase, index, array) => (
                <span key={index}>
                  {phrase.replace(/\.$/, ".")}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
          </h2>
          <p className={styles.subhead}>{t("intro.subtitle")}</p>
        </div>

        {/* First Content Row */}
        <div className={styles.contentRow}>
          <div className={styles.textContent}>
            <h3>{t("philosophy.title")}</h3>
            <p>{t("philosophy.description")}</p>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="/images/about/ftmestory-01.webp"
              alt={t("images.workspace1")}
              width={240}
              height={340}
              className={styles.imgBack}
            />
            <Image
              src="/images/about/ftmestory-02.webp"
              alt={t("images.workspace2")}
              width={240}
              height={340}
              className={styles.imgFront}
            />
          </div>
        </div>

        {/* Second Content Row (Reversed) */}
        <div className={`${styles.contentRow} ${styles.reverse}`}>
          <div className={styles.textContent}>
            <h3>{t("journey.title")}</h3>
            <p>{t("journey.description")}</p>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="/images/about/ftmestory-03.webp"
              alt={t("images.journey1")}
              width={240}
              height={340}
              className={styles.imgBack}
            />
            <Image
              src="/images/about/ftmestory-04.webp"
              alt={t("images.journey2")}
              width={240}
              height={340}
              className={styles.imgFront}
            />
          </div>
        </div>

        {/* Third Content Row */}
        <div className={styles.contentRow}>
          <div className={styles.textContent}>
            <h3>{t("current.title")}</h3>
            <p>{t("current.description")}</p>
          </div>

          <div className={styles.imageStack}>
            <Image
              src="/images/about/ftmestory-05.webp"
              alt={t("images.current1")}
              width={240}
              height={340}
              className={styles.imgBack}
            />
            <Image
              src="/images/about/ftmestory-06.webp"
              alt={t("images.current2")}
              width={240}
              height={340}
              className={styles.imgFront}
            />
          </div>
        </div>

        {/* Toolkit Section */}
        <div className={styles.toolkitSection}>
          <h2 className={styles.sectionTitle}>{t("toolkit.title")}</h2>
          <p className={styles.skillsList}>{t("toolkit.skills")}</p>
        </div>

        {/* CTA Pill */}
        <a 
          href="https://calendar.app.google/rjUiNwzF5sr7WvCY7" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.pillBox} ${styles.ctaPill}`}
          style={{ textDecoration: 'none', cursor: 'pointer' }}
        >
          <p className={styles.ctaText}>
            I am currently <strong className={styles.ctaHighlight}>open to collaborating</strong> with teams who value this multidisciplinary mindset.
          </p>
          <div className={styles.ctaArrow}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.74 49.74" width="100%" height="100%">
              <path d="m24.87,0C11.16,0,0,11.16,0,24.87s11.16,24.87,24.87,24.87,24.87-11.16,24.87-24.87S38.59,0,24.87,0Zm17.32,27.19c-.69,0-2.31.27-5.3,2.11-2.4,1.47-4.58,3.43-6.48,5.82-2.55,3.19-2.58,4.34-2.58,4.35h-4.63c0-1.18.38-3.22,3.58-7.24,1.53-1.92,3.22-3.6,5.05-5.04H6.91v-4.63h24.91c-1.84-1.44-3.52-3.13-5.05-5.04-3.2-4.02-3.58-6.06-3.58-7.24h4.63s.03,1.17,2.57,4.35c1.91,2.39,4.08,4.35,6.49,5.82,3,1.84,4.61,2.11,5.3,2.11v4.63Z" fill="#ea5b37" strokeWidth="0"/>
            </svg>
          </div>
        </a>
      </div>
    </section>
  );
}
