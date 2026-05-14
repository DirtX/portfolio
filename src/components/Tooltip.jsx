import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./Tooltip.css";

export default function Tooltip({ text }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const iconRef = useRef(null);

  // Feature: Position tooltip above the icon
  const handleEnter = () => {
    if (!iconRef.current) return;
    const r = iconRef.current.getBoundingClientRect();
    setCoords({
      top: r.top - 8,
      left: r.left + r.width / 2,
    });
    setOpen(true);
  };

  return (
    <span
      className="tooltip"
      ref={iconRef}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="tooltip-icon">?</span>
      {open &&
        createPortal(
          <span className="tooltip-bubble" style={{ top: coords.top, left: coords.left }}>
            {text}
          </span>,
          document.body
        )}
    </span>
  );
}
