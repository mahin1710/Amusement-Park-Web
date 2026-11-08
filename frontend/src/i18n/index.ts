import enMessages from "../../messages/en.json";
import bnMessages from "../../messages/bn.json";

export type Locale = "en" | "bn";

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "bn"];

export const messages = {
  en: enMessages,
  bn: bnMessages,
};

export function getDictionary(locale: Locale) {
  return messages[locale] || messages.en;
}

