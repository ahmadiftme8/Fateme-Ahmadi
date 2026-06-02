"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import styles from "./FeaturedProjects.module.css";
import WheelCarousel from "./WheelCarousel";

type Category = {
  id: string;
  label: string;
  shortLabel: string;
  Icon: (props: { className?: string }) => React.JSX.Element;
};

type Project = {
  id?: string | number;
  category_main?: string;
  link?: string;
  thumbnail_img?: string;
  imageSrc?: string;
  URL?: string;
  title?: string;
  Title?: string;
  name?: string;
  excerpt?: string;
  description?: string;
  [key: string]: unknown;
};

const categories: Category[] = [
  { id: "web-development", label: "Web Development", shortLabel: "Web", Icon: WebDevIcon },
  { id: "graphic-design", label: "Graphic Design", shortLabel: "Graphic", Icon: GraphicDesignIcon },
  { id: "ui-ux-design", label: "UI/UX Design", shortLabel: "UI/UX", Icon: UiUxIcon },
  { id: "video-editing", label: "Video Editing", shortLabel: "Video", Icon: VideoEditingIcon },
];

const galleryItems: Project[] = [
  { id: 1, imageSrc: "/images/featured-1.jpg" },
  { id: 2, imageSrc: "/images/featured-2.jpg" },
  { id: 3, imageSrc: "/images/featured-3.jpg" },
  { id: 4, imageSrc: "/images/featured-4.jpg" },
  { id: 5, imageSrc: "/images/featured-5.jpg" },
  { id: 6, imageSrc: "/images/featured-6.jpg" },
];



export default function FeaturedProjects({ projects = [] }: { projects?: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("web-development");

  // Check URL hash on mount and set initial category
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#portfolio-")) {
      const categoryFromHash = hash.replace("#portfolio-", "");
      const validCategory = categories.find(cat => cat.id === categoryFromHash);
      if (validCategory) {
        setActiveCategory(categoryFromHash);
      }
    }
  }, []);

  // Listen for category change events from Services component
  useEffect(() => {
    const handleCategoryChange = (event: CustomEvent<string>) => {
      setActiveCategory(event.detail);
    };

    window.addEventListener("changeFeaturedCategory", handleCategoryChange as EventListener);
    
    return () => {
      window.removeEventListener("changeFeaturedCategory", handleCategoryChange as EventListener);
    };
  }, []);

  // Filter projects based on active category
  // Using 'category_main' column from Sheet matching our category IDs or Labels
  // Fallback to galleryItems if no projects provided
  const displayItems = projects && projects.length > 0
    ? projects.filter(p => {
      // Logic: Check if 'category_main' column matches activeCategory id or label
      const cat = (p.category_main || "").toLowerCase();
      const activeId = activeCategory.toLowerCase();
      const activeLabel = categories.find(c => c.id === activeCategory)?.label.toLowerCase() || "";

      // Match if category string contains the ID (e.g. "graphic-design") 
      // OR the Label (e.g. "graphic design")
      // OR simply checks normalization (replacing spaces with hyphens)

      return cat.includes(activeId) || cat.includes(activeLabel) || cat === activeId || cat === activeLabel;
    })
    : activeCategory === "web-development" ? galleryItems : []; // Keep fallback for now or remove if strictly dynamic

  return (
    <section id="portfolio" className={styles.featuredProjects}>
      <div
        className={styles.featuredProjects__container}
      >
        <h2 className={`${styles.featuredProjects__title} sectionTitle`}>Featured Projects</h2>

        <div
          style={{
            width: "100%",
            position: "relative",
            zIndex: 40
          }}
        >
          <motion.div
            initial={false}
            animate={{
              backgroundColor: "rgba(217, 217, 217, 0)",
              paddingBottom: 0,
              paddingTop: 0,
              boxShadow: "none",
              borderBottom: "1px solid rgba(0,0,0,0)"
            }}
            transition={{ duration: 0.3 }}
          >
            <nav className={styles.featuredProjects__categories} aria-label="Featured project categories">
              <ul className={styles.featuredProjects__categoryList}>
                {categories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <motion.li
                      key={category.id}
                      className={`${styles.featuredProjects__category} ${isActive ? styles["featuredProjects__category--active"] : ""
                        }`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setActiveCategory(category.id)}
                      initial={false}
                      animate={isActive ? "active" : "inactive"}
                      whileHover="hover"
                      style={{ cursor: "pointer", position: "relative" }}
                    >
                      <motion.span
                        className={styles.featuredProjects__categoryIcon}
                        aria-hidden="true"
                        variants={{
                          active: { color: "#1f67f1" },
                          inactive: { color: "var(--color-foreground-lowopacity)" },
                          hover: { color: "#1f67f1" }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <category.Icon />
                      </motion.span>

                      <motion.span
                        className={styles.featuredProjects__categoryLabel}
                        aria-label={category.label}
                        variants={{
                          active: { color: "#1f67f1" },
                          inactive: { color: "#797979" },
                          hover: { color: "#1f67f1" }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        <span className={styles.featuredProjects__categoryLabelFull}>{category.label}</span>
                        <span className={styles.featuredProjects__categoryLabelShort}>{category.shortLabel}</span>

                        {isActive && (
                          <motion.div
                            layoutId="underline"
                            className={styles.featuredProjects__activeUnderline}
                            style={{
                              position: "absolute",
                              bottom: "-2px", // Align with the static border
                              left: 0,
                              width: "100%",
                              height: "3px",
                              backgroundColor: "#1f67f1",
                              zIndex: 10,
                              borderRadius: "2px"
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                      </motion.span>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </div>

        <div className="w-full">
          <WheelCarousel key={activeCategory} projects={displayItems} activeCategory={activeCategory} />
        </div>

        {/* Bottom Sentinel to trigger sticky OFF */}

      </div>
    </section>
  );
}

function GraphicDesignIcon({ className }: { className?: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M48.3333 30C47.0072 30 45.7355 29.4732 44.7978 28.5355C43.8601 27.5979 43.3333 26.3261 43.3333 25C43.3333 23.6739 43.8601 22.4021 44.7978 21.4645C45.7355 20.5268 47.0072 20 48.3333 20C49.6594 20 50.9312 20.5268 51.8689 21.4645C52.8065 22.4021 53.3333 23.6739 53.3333 25C53.3333 26.3261 52.8065 27.5979 51.8689 28.5355C50.9312 29.4732 49.6594 30 48.3333 30ZM38.3333 16.6667C37.0073 16.6667 35.7355 16.1399 34.7978 15.2022C33.8601 14.2645 33.3333 12.9927 33.3333 11.6667C33.3333 10.3406 33.8601 9.06881 34.7978 8.13113C35.7355 7.19345 37.0073 6.66667 38.3333 6.66667C39.6594 6.66667 40.9312 7.19345 41.8689 8.13113C42.8065 9.06881 43.3333 10.3406 43.3333 11.6667C43.3333 12.9927 42.8065 14.2645 41.8689 15.2022C40.9312 16.1399 39.6594 16.6667 38.3333 16.6667ZM21.6667 16.6667C20.3406 16.6667 19.0688 16.1399 18.1311 15.2022C17.1934 14.2645 16.6667 12.9927 16.6667 11.6667C16.6667 10.3406 17.1934 9.06881 18.1311 8.13113C19.0688 7.19345 20.3406 6.66667 21.6667 6.66667C22.9927 6.66667 24.2645 7.19345 25.2022 8.13113C26.1399 9.06881 26.6667 10.3406 26.6667 11.6667C26.6667 12.9927 26.1399 14.2645 25.2022 15.2022C24.2645 16.1399 22.9927 16.6667 21.6667 16.6667ZM11.6667 30C10.3406 30 9.06881 29.4732 8.13113 28.5355C7.19345 27.5979 6.66667 26.3261 6.66667 25C6.66667 23.6739 7.19345 22.4021 8.13113 21.4645C9.06881 20.5268 10.3406 20 11.6667 20C12.9927 20 14.2645 20.5268 15.2022 21.4645C16.1399 22.4021 16.6667 23.6739 16.6667 25C16.6667 26.3261 16.1399 27.5979 15.2022 28.5355C14.2645 29.4732 12.9927 30 11.6667 30ZM30 0C22.0435 0 14.4129 3.1607 8.7868 8.7868C3.1607 14.4129 0 22.0435 0 30C0 37.9565 3.1607 45.5871 8.7868 51.2132C14.4129 56.8393 22.0435 60 30 60C31.3261 60 32.5979 59.4732 33.5355 58.5355C34.4732 57.5978 35 56.3261 35 55C35 53.7 34.5 52.5333 33.7 51.6667C32.9333 50.7667 32.4333 49.6 32.4333 48.3333C32.4333 47.0072 32.9601 45.7355 33.8978 44.7978C34.8355 43.8601 36.1073 43.3333 37.4333 43.3333H43.3333C47.7536 43.3333 51.9928 41.5774 55.1184 38.4518C58.2441 35.3262 60 31.0869 60 26.6667C60 11.9333 46.5667 0 30 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

function WebDevIcon({ className }: { className?: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M10.1702 57.445C14.259 57.7775 20.749 58.125 30.0002 58.125C39.2515 58.125 45.7415 57.7775 49.8302 57.445C53.9402 57.1113 57.1115 53.94 57.4452 49.83C57.7777 45.7412 58.1252 39.2512 58.1252 30C58.1252 25.3625 58.0377 21.42 57.909 18.125H2.09149C1.94234 22.0816 1.87024 26.0406 1.87524 30C1.87524 39.2512 2.22274 45.7412 2.55524 49.83C2.88899 53.94 6.06024 57.1113 10.1702 57.445Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.26855 14.375C2.36022 12.7642 2.45564 11.3625 2.5548 10.17C2.88855 6.06 6.0598 2.88875 10.1698 2.555C14.2586 2.2225 20.7486 1.875 29.9998 1.875C39.2511 1.875 45.7411 2.2225 49.8298 2.555C53.9398 2.88875 57.1111 6.06 57.4448 10.17C57.5431 11.3617 57.6386 12.7633 57.7311 14.375H2.26855ZM9.3748 8.75C9.3748 8.25272 9.57235 7.7758 9.92398 7.42417C10.2756 7.07254 10.7525 6.875 11.2498 6.875H13.7498C14.2471 6.875 14.724 7.07254 15.0756 7.42417C15.4273 7.7758 15.6248 8.25272 15.6248 8.75C15.6248 9.24728 15.4273 9.72419 15.0756 10.0758C14.724 10.4275 14.2471 10.625 13.7498 10.625H11.2498C10.7525 10.625 10.2756 10.4275 9.92398 10.0758C9.57235 9.72419 9.3748 9.24728 9.3748 8.75ZM21.2498 6.875C20.7525 6.875 20.2756 7.07254 19.924 7.42417C19.5723 7.7758 19.3748 8.25272 19.3748 8.75C19.3748 9.24728 19.5723 9.72419 19.924 10.0758C20.2756 10.4275 20.7525 10.625 21.2498 10.625H23.7498C24.2471 10.625 24.724 10.4275 25.0756 10.0758C25.4273 9.72419 25.6248 9.24728 25.6248 8.75C25.6248 8.25272 25.4273 7.7758 25.0756 7.42417C24.724 7.07254 24.2471 6.875 23.7498 6.875H21.2498Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UiUxIcon({ className }: { className?: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_885_1156)">
        <path
          d="M11.25 51.25H25C25.4973 51.25 25.9742 51.0525 26.3258 50.7008C26.6775 50.3492 26.875 49.8723 26.875 49.375C26.875 48.8777 26.6775 48.4008 26.3258 48.0492C25.9742 47.6975 25.4973 47.5 25 47.5H11.25C10.7527 47.5 10.2758 47.6975 9.92417 48.0492C9.57254 48.4008 9.375 48.8777 9.375 49.375C9.375 49.8723 9.57254 50.3492 9.92417 50.7008C10.2758 51.0525 10.7527 51.25 11.25 51.25ZM25 55H11.25C10.7527 55 10.2758 55.1975 9.92417 55.5492C9.57254 55.9008 9.375 56.3777 9.375 56.875C9.375 57.3723 9.57254 57.8492 9.92417 58.2008C10.2758 58.5525 10.7527 58.75 11.25 58.75H25C25.4973 58.75 25.9742 58.5525 26.3258 58.2008C26.6775 57.8492 26.875 57.3723 26.875 56.875C26.875 56.3777 26.6775 55.9008 26.3258 55.5492C25.9742 55.1975 25.4973 55 25 55ZM35 48.125H47.5C47.5 48.125 50 48.125 50 50.625V55.625C50 55.625 50 58.125 47.5 58.125H35C35 58.125 32.5 58.125 32.5 55.625V50.625C32.5 50.625 32.5 48.125 35 48.125Z"
          fill="currentColor"
        />
        <path
          d="M26.25 5C26.913 5 27.5489 5.26339 28.0178 5.73223C28.4866 6.20107 28.75 6.83696 28.75 7.5C28.75 8.16304 28.4866 8.79893 28.0178 9.26777C27.5489 9.73661 26.913 10 26.25 10C25.587 10 24.9511 9.73661 24.4822 9.26777C24.0134 8.79893 23.75 8.16304 23.75 7.5C23.75 6.83696 24.0134 6.20107 24.4822 5.73223C24.9511 5.26339 25.587 5 26.25 5ZM17.5 5C18.163 5 18.7989 5.26339 19.2678 5.73223C19.7366 6.20107 20 6.83696 20 7.5C20 8.16304 19.7366 8.79893 19.2678 9.26777C18.7989 9.73661 18.163 10 17.5 10C16.837 10 16.2011 9.73661 15.7322 9.26777C15.2634 8.79893 15 8.16304 15 7.5C15 6.83696 15.2634 6.20107 15.7322 5.73223C16.2011 5.26339 16.837 5 17.5 5ZM8.75 5C9.41304 5 10.0489 5.26339 10.5178 5.73223C10.9866 6.20107 11.25 6.83696 11.25 7.5C11.25 8.16304 10.9866 8.79893 10.5178 9.26777C10.0489 9.73661 9.41304 10 8.75 10C8.08696 10 7.45107 9.73661 6.98223 9.26777C6.51339 8.79893 6.25 8.16304 6.25 7.5C6.25 6.83696 6.51339 6.20107 6.98223 5.73223C7.45107 5.26339 8.08696 5 8.75 5ZM60 56.05V8.75C60 6.76088 59.2098 4.85322 57.8033 3.4467C56.3968 2.04018 54.4891 1.25 52.5 1.25H7.5C5.51088 1.25 3.60322 2.04018 2.1967 3.4467C0.790176 4.85322 0 6.76088 0 8.75L0 56.05C0 56.713 0.263392 57.3489 0.732233 57.8178C1.20107 58.2866 1.83696 58.55 2.5 58.55C3.16304 58.55 3.79893 58.2866 4.26777 57.8178C4.73661 57.3489 5 56.713 5 56.05V14.375C5 14.2092 5.06585 14.0503 5.18306 13.9331C5.30027 13.8158 5.45924 13.75 5.625 13.75H54.375C54.5408 13.75 54.6997 13.8158 54.8169 13.9331C54.9342 14.0503 55 14.2092 55 14.375V56.05C55 56.713 55.2634 57.3489 55.7322 57.8178C56.2011 58.2866 56.837 58.55 57.5 58.55C58.163 58.55 58.7989 58.2866 59.2678 57.8178C59.7366 57.3489 60 56.713 60 56.05Z"
          fill="currentColor"
        />
        <path
          d="M10 19.275V40.525H50V19.275H10ZM18.125 29.8C17.6305 29.8 17.1472 29.6534 16.7361 29.3787C16.325 29.104 16.0045 28.7135 15.8153 28.2567C15.6261 27.7999 15.5766 27.2973 15.673 26.8123C15.7695 26.3273 16.0076 25.8819 16.3572 25.5323C16.7069 25.1826 17.1523 24.9445 17.6373 24.8481C18.1222 24.7516 18.6249 24.8011 19.0817 24.9903C19.5385 25.1795 19.929 25.5 20.2037 25.9111C20.4784 26.3222 20.625 26.8056 20.625 27.3C20.625 27.9631 20.3616 28.599 19.8928 29.0678C19.4239 29.5366 18.788 29.8 18.125 29.8ZM24.2 36.05L34.775 26.625C35.2373 26.1963 35.8445 25.9581 36.475 25.9581C37.1055 25.9581 37.7127 26.1963 38.175 26.625L47.5 36.05H24.2Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_885_1156">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function VideoEditingIcon({ className }: { className?: string }) {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_885_1160)">
        <path
          d="M15.0038 0H45.0037V7.48875H52.5037V0C54.4922 0.000994237 56.3989 0.791609 57.8046 2.19802C59.2103 3.60444 60 5.51153 60 7.5V52.5C60 54.4885 59.2103 56.3956 57.8046 57.802C56.3989 59.2084 54.4922 59.999 52.5037 60V52.4887H45.0037V60H15.0038V52.4887H7.50375V60C5.51463 60 3.60322 59.2098 2.1967 57.8033C0.790176 56.3968 0 54.4891 0 52.5V7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0L7.50375 7.48875H15.0038V0ZM22.5 41.25L39.375 30L22.5 18.75V41.25ZM52.5037 44.9887V33.7387H45.0037V44.9887H52.5037ZM52.5037 26.2387V14.9888H45.0037V26.2387H52.5037ZM15.0038 44.9887V33.7387H7.50375V44.9887H15.0038ZM15.0038 26.2387V14.9888H7.50375V26.2387H15.0038Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_885_1160">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
