import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import "./Navbar.css";

export default function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Feature: Track scroll to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Feature: Scroll to hash target after navigating to home
  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      };
      requestAnimationFrame(tryScroll);
    }
  }, [location]);

  // Feature: Smooth scroll to section by id, navigate home if not there
  const goTo = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="nav-logo" aria-label="Home">
        <svg viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg" className="nav-logo-svg">
          <text
            x="0"
            y="16"
            dominantBaseline="central"
            fontFamily="inherit"
            fontWeight="800"
            fontSize="22"
            letterSpacing="-1"
            fill="currentColor"
          >
            YH.
          </text>
        </svg>
      </Link>
      <div className="nav-links">
        <button className="nav-link" onClick={() => goTo("about")}>
          {t("nav_about")}
        </button>
        <button className="nav-link" onClick={() => goTo("projects")}>
          {t("nav_projects")}
        </button>
        <button className="nav-link" onClick={() => goTo("contact")}>
          {t("nav_contact")}
        </button>
        <button className="nav-lang" onClick={toggleLang}>
          {lang === "en" ? "EN" : "CZ"}
        </button>
      </div>
    </nav>
  );
}
