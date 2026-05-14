import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import "./Navbar.css";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  // Feature: Track scroll to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Feature: Smooth scroll to section by id
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="nav-logo">
        YH.
      </Link>
      <div className="nav-links">
        <button className="nav-link" onClick={() => scrollTo("about")}>
          {t("nav_about")}
        </button>
        <button className="nav-link" onClick={() => scrollTo("projects")}>
          {t("nav_projects")}
        </button>
        <button className="nav-link" onClick={() => scrollTo("contact")}>
          {t("nav_contact")}
        </button>
        <button className="nav-lang" onClick={toggleLang}>
          {lang === "en" ? "CZ" : "EN"}
        </button>
      </div>
    </nav>
  );
}
