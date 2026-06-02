"use client";

import { useEffect } from "react";

export type Theme = "light" | "dark";

type PageThemeProps = {
  defaultTheme: Theme;
  storageKey?: string;
};

export const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;

  const html = document.documentElement;
  const body = document.body;

  html.setAttribute("data-theme", theme);
  body.setAttribute("data-theme", theme);
  html.classList.toggle("dark", theme === "dark");
  body.classList.toggle("dark", theme === "dark");
};

export const getStoredTheme = (
  storageKey: string | undefined,
  defaultTheme: Theme,
): Theme => {
  if (typeof window === "undefined" || !storageKey) return defaultTheme;

  const stored = window.localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" ? stored : defaultTheme;
};

export function PageTheme({ defaultTheme, storageKey }: PageThemeProps) {
  useEffect(() => {
    applyTheme(getStoredTheme(storageKey, defaultTheme));
  }, [defaultTheme, storageKey]);

  return null;
}
