"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import enMessages from "../../messages/en.json";
import bnMessages from "../../messages/bn.json";

export type Locale = "en" | "bn";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, defaultText?: string) => string;
  isBangla: boolean;
}

const dictionaries: Record<Locale, any> = {
  en: enMessages,
  bn: bnMessages,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check localStorage or cookie on mount
    try {
      const savedLocale = localStorage.getItem("magic_island_locale") as Locale | null;
      if (savedLocale === "en" || savedLocale === "bn") {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      } else {
        // Check cookie
        const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
        if (match && (match[1] === "en" || match[1] === "bn")) {
          setLocaleState(match[1] as Locale);
          document.documentElement.lang = match[1];
        }
      }
    } catch (e) {
      // Storage access safety
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem("magic_island_locale", newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = newLocale;
    } catch (e) {
      // Storage safety
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const keys = key.split(".");
    let current = dictionaries[locale];

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        current = undefined;
        break;
      }
    }

    if (typeof current === "string") {
      return current;
    }

    // Fallback to English if not found in target locale
    let fallback = dictionaries.en;
    for (const k of keys) {
      if (fallback && typeof fallback === "object" && k in fallback) {
        fallback = fallback[k];
      } else {
        fallback = undefined;
        break;
      }
    }

    if (typeof fallback === "string") {
      return fallback;
    }

    return defaultText || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        isBangla: locale === "bn",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

