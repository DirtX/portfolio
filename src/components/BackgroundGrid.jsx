import { useEffect, useRef, useState } from "react";
import "./BackgroundGrid.css";

export default function BackgroundGrid() {
  const [cells, setCells] = useState([]);
  const lastKeyRef = useRef("");
  const idRef = useRef(0);
  const frameRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });

  // Feature: Spawn a fading highlight on the cell under the cursor
  useEffect(() => {
    const spawn = () => {
      frameRef.current = 0;
      const col = Math.floor(posRef.current.x / 50);
      const row = Math.floor(posRef.current.y / 50);
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

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(spawn);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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
