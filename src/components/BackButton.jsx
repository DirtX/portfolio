import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import "./BackButton.css";

// Feature: Back link that says where it goes. Target configurable.
export default function BackButton({ to = "/projects" }) {
  const { t } = useLang();
  const label = to === "/" ? t("back_home") : t("back_to_projects");

  return (
    <Link to={to} className="back-button">
      <span className="back-button-circle" aria-hidden="true">
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="13" y1="8" x2="3" y2="8" />
          <polyline points="7.5 3.5 3 8 7.5 12.5" />
        </svg>
      </span>
      <span className="back-button-label">{label}</span>
    </Link>
  );
}
