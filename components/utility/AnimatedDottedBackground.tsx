"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "./AnimatedDottedBackground.module.css";

export function AnimatedDottedBackground() {
  const pathname = usePathname();
  const bgRef = useRef<HTMLDivElement>(null);

  if (pathname === "/en/blog" || pathname === "/fa/blog") {
    return null;
  }

  useEffect(() => {
    const updateOffset = () => {
      if (bgRef.current) {
        const bodyPadding = window.getComputedStyle(document.body).paddingTop;
        bgRef.current.style.setProperty('--header-offset', bodyPadding);
      }
    };

    // Initial update
    updateOffset();

    // Update on resize
    window.addEventListener('resize', updateOffset);
    
    // Use MutationObserver to detect body style changes
    const observer = new MutationObserver(updateOffset);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['style'] 
    });

    return () => {
      window.removeEventListener('resize', updateOffset);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={bgRef} className={styles.dottedBackground} aria-hidden="true" />
  );
}

