"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ProfileImage } from "@/components/ui/ProfileImage";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";


import styles from "./Header.module.css";

const NAV_ITEMS = [
  { key: "home", segment: "" },
  { key: "about", segment: "about" },
  { key: "portfolio", segment: "#portfolio" },
  { key: "blog", segment: "blog" },
] as const;

const DROPDOWN_ID = "header-mobile-menu";

// const getLocalizedPath = (pathname: string, locale: string) => {
//   const safe = pathname.startsWith("/") ? pathname : `/${pathname}`;
//   const supported = ["/en", "/fa"];
//   const matched = supported.find(
//     (prefix) => safe === prefix || safe.startsWith(`${prefix}/`),
//   );
//
//   if (!matched) {
//     return safe;
//   }
//
//   const remainder = safe.slice(matched.length);
//   return remainder ? `/${locale}${remainder}` : `/${locale}`;
// };

export function Header() {
  const locale = useLocale();
  const tNav = useTranslations("navigation");
  const tHeader = useTranslations("header");
  const pathname = usePathname() ?? `/${locale}`;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const isMenuOpenRef = useRef(isMenuOpen);

  const [activeSection, setActiveSection] = useState<string>("");
  

/* const isAboutPage = pathname.startsWith(`/${locale}/about`) || pathname.startsWith(`/${locale}/blog`); */
const segment = useSelectedLayoutSegment();
const isAboutPage = segment === 'about' || segment === 'blog';


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" } // Trigger when section is in middle of viewport
    );

    const sections = ["home", "about", "portfolio"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Removed body offset logic - navbar now floats over content
  const handleDropdownAnimationComplete = useCallback(() => {
    // Dropdown animation complete handler
  }, []);

  const navLinks = NAV_ITEMS.map(({ key, segment }) => {
    const href = segment ? `/${locale}/${segment}` : `/${locale}`;

    // Determine active state
    let isActive = false;

    if (key === "home") {
      // Logic: Active if explicitly "home" section active OR no active section & simple path (fallback)
      isActive = activeSection === "home" || (pathname === `/${locale}` && !activeSection);
    } else if (key === "blog") {
      isActive = pathname.startsWith(`/${locale}/blog`);
    } else if (key === "about") {
      isActive = pathname.startsWith(`/${locale}/about`);
    } else {
      // For anchor links (portfolio)
      const targetId = segment.replace("#", "");
      isActive = activeSection === targetId;
    }

    return {
      key,
      label: tNav(key),
      href,
      isActive,
    };
  });

  // const nextLocale = locale === "fa" ? "en" : "fa";
  // const localeHref = getLocalizedPath(pathname, nextLocale);
  // const localeTextClass = `${styles.localeText} ${nextLocale === "fa" ? "font-vazirmatn" : ""
  //   }`;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  // Removed body padding logic - navbar floats over content

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 720px)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobileViewport(event.matches);
    };

    setIsMobileViewport(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };



  const navVariants = {
    default: {
      top: 18,
      paddingLeft: 16,
      paddingRight: 16,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const barVariants = {
    default: {
      borderRadius: 36,
      marginTop: 16,
      marginBottom: 16,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  // Use regular div for About and Blog pages to allow backdrop-filter to work in Chrome
// motion.div transforms break backdrop-filter in Chrome desktop
  const BarComponent = isAboutPage ? 'div' : motion.div;

  return (
    <motion.nav
      ref={navRef}
      className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""} ${isAboutPage ? styles.navAboutVariant : ""}`}
      aria-label={tHeader("title")}
      initial={false}
      animate={isMobileViewport ? "default" : undefined}
      variants={navVariants}
    >
      <BarComponent
        className={`${styles.bar} ${isMenuOpen ? styles.barOpen : ""} ${isAboutPage ? styles.barAboutVariant : ""}`}
        {...(!isAboutPage && {
          variants: barVariants,
          animate: isMobileViewport ? "default" : false
        })}
      >
        <div className={styles.avatar}>
          <ProfileImage
            alt="Fateme Ahmadi portrait"
            className={styles.avatarImage}
          />
        </div>



        <div
          className={styles.links}
          style={
            isMobileViewport && isMenuOpen ? { display: "none" } : undefined
          }
        >
          {navLinks.map(({ key, label, href, isActive }) => (
            <Link
              key={key}
              href={href}
              onClick={handleCloseMenu}
              className={`${styles.link} ${key === "home" ? styles.linkHome : ""
                } ${isActive ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          ))}

          {/* <Link
            href={localeHref}
            lang={nextLocale}
            onClick={handleCloseMenu}
            className={`${styles.link} ${styles.linkActive} ${styles.localeLink}`}
          >
            <span className={localeTextClass}>
              <span>{nextLocale === "fa" ? "\u0641\u0627\u0631\u0633\u06cc" : "EN"}</span>
            </span>
          </Link> */}
        </div>

        <motion.div
          id={DROPDOWN_ID}
          className={styles.linksOpen}
          initial={false}
          onAnimationComplete={handleDropdownAnimationComplete}
          animate={
            hasMounted && isMobileViewport
              ? {
                height: isMenuOpen ? "auto" : 0,
                opacity: isMenuOpen ? 1 : 0,
              }
              : { height: "auto", opacity: 1 }
          }
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          style={{
            overflow: "hidden",
            display: isMobileViewport ? undefined : "none",
            pointerEvents: isMenuOpen ? "auto" : "none",
          }}
          aria-hidden={!isMobileViewport || !isMenuOpen}
        >
          {navLinks.map(({ key, label, href, isActive }) => (
            <Link
              key={`${key}-mobile`}
              href={href}
              onClick={handleCloseMenu}
              className={`${styles.link} ${key === "home" ? styles.linkHome : ""
                } ${isActive ? styles.linkActive : ""}`}
            >
              {label}
            </Link>
          ))}
        </motion.div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? tHeader("closeMenu") : tHeader("openMenu")}
          aria-expanded={isMenuOpen}
          aria-controls={DROPDOWN_ID}
          onClick={handleToggleMenu}
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menuIcon}
            >
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.menuIcon}
            >
              <path
                d="M4 9H20M4 15H14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div
          className={`${styles.actions} ${isMenuOpen ? styles.actionsMenu : ""}`}
        >
          <Link
            href={`/${locale}/#contact`}
            className={styles.contactBtn}
            onClick={handleCloseMenu}
            aria-label={`${tHeader("contact")} / Available For Work`}
          >
            <span className={styles.contactLabelDesktop}>
              {tHeader("contact")}
            </span>
            <span className={styles.contactLabelMobile} aria-hidden="true">
              Available&nbsp;For&nbsp;Work
              <span className={styles.pulseWrapper} aria-hidden="true">
                <span className={styles.pulse} />
              </span>
            </span>
          </Link>
        </div>
      </BarComponent>
    </motion.nav>
  );
}
