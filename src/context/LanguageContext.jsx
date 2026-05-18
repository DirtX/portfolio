import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations/translations";

const LanguageContext = createContext();

const STORAGE_KEY = "preferred-lang";

// Feature: Get saved language from localStorage, fallback to "en"
const getInitialLang = () => {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "cs" ? saved : "en";
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  // Feature: Persist language choice across page reloads
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

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
