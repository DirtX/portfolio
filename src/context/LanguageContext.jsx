import { createContext, useContext, useState } from "react";
import { translations } from "../translations/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Feature: Translate a key using the current language
  const t = (key) => translations[lang][key] || key;

  // Feature: Toggle between English and Czech
  const toggleLang = () => setLang((prev) => (prev === "en" ? "cs" : "en"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>
  );
}

// Feature: Shortcut hook to use the language context anywhere
export const useLang = () => useContext(LanguageContext);
