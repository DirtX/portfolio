import { Link } from "react-router-dom";
import "./BackButton.css";

// Feature: Back link, target configurable
export default function BackButton({ to = "/projects" }) {
  return (
    <Link to={to} className="back-button" aria-label="Go back">
      <svg
        className="back-button-arrow"
        viewBox="0 0 24 24"
        width="40"
        height="40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </Link>
  );
}
