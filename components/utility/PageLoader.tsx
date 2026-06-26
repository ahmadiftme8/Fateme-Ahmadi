"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loaderData from "@/public/loader-data.json";

interface PageLoaderProps {
  children: React.ReactNode;
}

export function PageLoader({ children }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    let active = true;

    // 1. Establish a minimum show time for the loader (e.g. 2000ms) to enjoy the lottie animation
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 2000));

    // 2. Wait for page load event (all styles, scripts, images loaded)
    const pageLoadPromise = new Promise((resolve) => {
      if (document.readyState === "complete") {
        resolve(true);
      } else {
        window.addEventListener("load", () => resolve(true), { once: true });
      }
    });

    // 3. Wait for all document fonts to load (especially hero fonts)
    const fontLoadPromise = new Promise((resolve) => {
      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready
          .then(() => resolve(true))
          .catch(() => resolve(true)); // Continue even if font loading fails/rejects
      } else {
        resolve(true);
      }
    });

    // 4. Combine all loader promises
    Promise.all([minTimePromise, pageLoadPromise, fontLoadPromise]).then(() => {
      if (active) {
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Lock scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-background)]"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
              {isMounted && (
                <DotLottieReact
                  data={loaderData}
                  loop
                  autoplay
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
