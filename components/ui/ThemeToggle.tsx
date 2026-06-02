"use client";
import classes from "./ThemeToggle.module.css"
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { applyTheme, getStoredTheme, type Theme } from "@/components/utility/PageTheme";

type ThemeToggleProps = {
  defaultTheme?: Theme;
  storageKey?: string;
};

export default function ThemeToggle({
  defaultTheme = "light",
  storageKey,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const t = useTranslations("header.themeToggle");

  useEffect(() => {
    const initial = getStoredTheme(storageKey, defaultTheme);
    setTheme(initial);
    applyTheme(initial);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    setTheme((current) => {
      const nextTheme = current === "light" ? "dark" : "light";
      if (typeof window !== "undefined" && storageKey) {
        window.localStorage.setItem(storageKey, nextTheme);
      }
      return nextTheme;
    });
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative inline-flex h-9 w-16 items-center rounded-full border border-black/10 bg-white px-1 transition-all duration-300 ease-out hover:border-black/20 hover:shadow-md dark:border-white/10 dark:bg-neutral-900 dark:hover:border-white/20 ${classes.themeToggleBtn}`}
      aria-label={isDark ? t("light") : t("dark")}
    >
      <span
        className={`  absolute inset-y-1 inline-flex w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white transition-transform duration-300 ease-out dark:bg-blue-400 ${
          isDark ? "translate-x-6" : "translate-x-0"
        } ${classes.tglBtn} `}
      >
        {isDark ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
      </span>
      <span className="sr-only">{isDark ? t("light") : t("dark")}</span>
    </button>
  );
}
