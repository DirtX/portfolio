import { useEffect, useRef, useState } from "react";
import "./BackgroundGrid.css";

export default function BackgroundGrid() {
  const [cells, setCells] = useState([]);
  const lastKeyRef = useRef("");
  const idRef = useRef(0);
  const frameRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const hasPointerRef = useRef(false);

  // Feature: Spawn a fading highlight on the page cell under the cursor
  // (page coordinates, so the cell stays in place while scrolling)
  useEffect(() => {
    const spawn = () => {
      frameRef.current = 0;
      const col = Math.floor((posRef.current.x + window.scrollX) / 50);
      const row = Math.floor((posRef.current.y + window.scrollY) / 50);
      const key = `${col}-${row}`;
      // Skip if cursor is still over the same cell
      if (key === lastKeyRef.current) return;
      lastKeyRef.current = key;

      const id = idRef.current++;
      setCells((prev) => [...prev, { id, col, row }]);
      // Remove after the fade-out finishes
      setTimeout(() => {
        setCells((prev) => prev.filter((c) => c.id !== id));
      }, 900);
    };

    const schedule = () => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(spawn);
    };

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      hasPointerRef.current = true;
      schedule();
    };

    // Scrolling moves the page under a still cursor, so highlight the new cell
    const handleScroll = () => {
      if (hasPointerRef.current) schedule();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="bg-grid-container">
      {/* ACTIVE CELLS */}
      {cells.map((c) => (
        <div
          key={c.id}
          className="bg-grid-cell"
          style={{ transform: `translate(${c.col * 50}px, ${c.row * 50}px)` }}
        />
      ))}
    </div>
  );
}
