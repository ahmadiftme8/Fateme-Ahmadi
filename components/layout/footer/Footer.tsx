"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import {
  FaLinkedin,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
  FaEnvelope
} from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import styles from "./Footer.module.css";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className={styles.footerSection} id="contact">
      {/* Floating CV Badge */}
      <a href="/documents/Fatemeh Ahmadi - Designer and Developer.pdf" className={styles.cvBadge} download="Fatemeh Ahmadi - Designer and Developer.pdf">
        <MdDownload size={35} />
        <span className={styles.cvText}>{t("cv")}</span>
      </a>

      {/* Main Title */}
      <h1 className={styles.footerTitle}>FATEME AHMADI</h1>

      {/* Navigation Pills */}
      <nav className={styles.footerNav}>
        <a href="https://calendar.app.google/rjUiNwzF5sr7WvCY7" className={styles.pillBtn} target="_blank" rel="noopener noreferrer">Book a free call ☕</a>
        <a href="#portfolio" className={styles.pillBtn}>{t("myPortfolio")}</a>
        <Link href={`/${locale}/about`} className={styles.pillBtn}>{t("aboutMe")}</Link>
      </nav>

      {/* Social Icons */}
      <div className={styles.socialLinks}>
        <a href="https://www.linkedin.com/in/fatemeh-ahmadi8/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaLinkedin />
        </a>
        <a href="https://wa.me/message/D3NPOSXZLBYAA1?src=qr" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaWhatsapp />
        </a>
        <a href="https://t.me/AhmadiFtme" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaTelegram />
        </a>
        <a href="https://instagram.com/ahmadiftme" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
          <FaInstagram />
        </a>
        <a href="mailto:devftme@gmail.com" className={styles.socialIcon}>
          <FaEnvelope />
        </a>
      </div>

      {/* Copyright */}
      <p className={styles.copyright}>{t("copyright")}</p>
    </footer>
  );
}
