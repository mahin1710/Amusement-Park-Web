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
  // Always default strictly to English ("en")
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only check active tab's sessionStorage if visitor explicitly toggled in this session.
    // Fresh website session always starts in English ("en").
    try {
      const sessionLocale = sessionStorage.getItem("magic_island_locale");
      if (sessionLocale === "bn") {
        setLocaleState("bn");
        document.documentElement.lang = "bn";
      } else {
        setLocaleState("en");
        document.documentElement.lang = "en";
      }
    } catch {
      setLocaleState("en");
      document.documentElement.lang = "en";
    }
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      sessionStorage.setItem("magic_island_locale", newLocale);
      document.documentElement.lang = newLocale;
    } catch {
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
