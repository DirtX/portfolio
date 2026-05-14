import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({ children, variant = "primary", to, href, ...props }) {
  const btnClass = `base-btn btn-${variant}`;

  // Feature: Render as Link if "to" prop is provided
  if (to) {
    return (
      <Link to={to} className={btnClass} {...props}>
        {children}
      </Link>
    );
  }

  // Feature: Render as anchor if "href" prop is provided
  if (href) {
    return (
      <a href={href} className={btnClass} {...props}>
        {children}
      </a>
    );
  }

  // Feature: Fallback to native button
  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
}
