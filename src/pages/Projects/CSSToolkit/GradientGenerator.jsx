import { useState, useRef } from "react";
import ColorPicker from "../../../components/ColorPicker";
import Tooltip from "../../../components/Tooltip";
import "./GradientGenerator.css";

const TYPES = ["linear", "radial", "conic"];

const defaultStops = [
  { color: "#ffffff", position: 0 },
  { color: "#050505", position: 100 },
];

export default function GradientGenerator() {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState(defaultStops);
  const [copied, setCopied] = useState(false);
  const [activeStopId, setActiveStopId] = useState(0);
  const [draggingStopId, setDraggingStopId] = useState(null);
  const timelineRef = useRef(null);

  // Feature: build gradient string from current state (sorted by position)
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const buildGradient = () => {
    const stopStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${stopStr})`;
    if (type === "radial") return `radial-gradient(circle, ${stopStr})`;
    if (type === "conic") return `conic-gradient(from ${angle}deg, ${stopStr})`;
  };

  const gradient = buildGradient();
  const css = `background: ${gradient};`;
  const timelineBg = `linear-gradient(to right, ${sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;

  // Feature: update color of a stop by index in original stops array
  const handleColorChange = (index, color) => {
    const updated = [...stops];
    updated[index] = { ...updated[index], color };
    setStops(updated);
  };

  // Feature: add new stop at midpoint between active and its neighbor
  const addStop = () => {
    if (stops.length >= 8) return;
    const activePos = stops[activeStopId]?.position ?? 50;
    const others = sortedStops.filter((_, i) => sortedStops[i] !== stops[activeStopId]);
    const next = others.find((s) => s.position > activePos);
    const targetPos = next
      ? Math.round((activePos + next.position) / 2)
      : Math.min(100, activePos + 10);
    const newStop = { color: "#888888", position: targetPos };
    const updated = [...stops, newStop];
    setStops(updated);
    setActiveStopId(updated.length - 1);
  };

  // Feature: remove stop, keeping at least two
  const removeStop = (index) => {
    if (stops.length <= 2) return;
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
    setActiveStopId(0);
  };

  // Feature: pointer-based drag on timeline to change stop position (mouse + touch via pointer events)
  const startTimelineDrag = (index, e) => {
    setDraggingStopId(index);
    setActiveStopId(index);
    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch (_) {}

    const moveHandler = (ev) => {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const pct = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
      setStops((prev) => {
        const upd = [...prev];
        upd[index] = { ...upd[index], position: pct };
        return upd;
      });
    };

    const endHandler = () => {
      setDraggingStopId(null);
      target.removeEventListener("pointermove", moveHandler);
      target.removeEventListener("pointerup", endHandler);
      target.removeEventListener("pointercancel", endHandler);
    };

    target.addEventListener("pointermove", moveHandler);
    target.addEventListener("pointerup", endHandler);
    target.addEventListener("pointercancel", endHandler);
  };

  // Feature: click on empty timeline area to add stop at that position
  const handleTimelineClick = (e) => {
    if (stops.length >= 8) return;
    if (e.target.closest(".gen-tl-stop")) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
    const left = [...sortedStops].reverse().find((s) => s.position <= pct);
    const right = sortedStops.find((s) => s.position > pct);
    const color =
      left && right
        ? mixColors(
            left.color,
            right.color,
            (pct - left.position) / (right.position - left.position)
          )
        : left?.color || right?.color || "#888888";
    const newStop = { color, position: pct };
    const updated = [...stops, newStop];
    setStops(updated);
    setActiveStopId(updated.length - 1);
  };

  // Feature: linear hex interpolation for inserted stop color
  const mixColors = (a, b, t) => {
    const ah = a.replace("#", "");
    const bh = b.replace("#", "");
    const ar = parseInt(ah.slice(0, 2), 16);
    const ag = parseInt(ah.slice(2, 4), 16);
    const ab = parseInt(ah.slice(4, 6), 16);
    const br = parseInt(bh.slice(0, 2), 16);
    const bg = parseInt(bh.slice(2, 4), 16);
    const bb = parseInt(bh.slice(4, 6), 16);
    const r = Math.round(ar + (br - ar) * t)
      .toString(16)
      .padStart(2, "0");
    const g = Math.round(ag + (bg - ag) * t)
      .toString(16)
      .padStart(2, "0");
    const bl = Math.round(ab + (bb - ab) * t)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${bl}`;
  };

  // Feature: copy CSS to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-wrapper">
      {/* TOP: PREVIEW + CONTROLS */}
      <div className="tool-top">
        <div className="tool-preview" style={{ background: gradient }} />

        <div className="tool-controls">
          {/* TYPE */}
          <div className="tool-group">
            <label className="tool-label">
              Type
              <Tooltip text="Linear goes in a straight line. Radial spreads from center outwards. Conic wraps around like a pie chart." />
            </label>
            <div className="tool-pills">
              {TYPES.map((t) => (
                <button
                  key={t}
                  className={`tool-pill ${type === t ? "active" : ""}`}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* ANGLE */}
          {(type === "linear" || type === "conic") && (
            <div className="tool-group">
              <label className="tool-label">
                Angle — {angle}°
                <Tooltip text="Direction the gradient flows. 0° goes upward, 90° to the right, 180° downward." />
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(+e.target.value)}
                className="tool-slider"
              />
            </div>
          )}

          {/* COLORS */}
          <div className="tool-group">
            <label className="tool-label">
              Colors
              <Tooltip text="Drag the dots on the timeline to reposition. Tap empty space on the bar to add a stop." />
            </label>

            {/* TIMELINE BAR with draggable dots */}
            <div
              ref={timelineRef}
              className="gen-timeline"
              style={{ background: timelineBg }}
              onClick={handleTimelineClick}
            >
              {stops.map((stop, i) => (
                <button
                  key={i}
                  type="button"
                  className={`gen-tl-stop ${activeStopId === i ? "active" : ""} ${draggingStopId === i ? "dragging" : ""}`}
                  style={{ left: `${stop.position}%`, background: stop.color }}
                  onPointerDown={(e) => startTimelineDrag(i, e)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStopId(i);
                  }}
                  aria-label={`Stop ${i + 1}`}
                />
              ))}
            </div>

            {/* STOP LIST */}
            <div className="gen-stops">
              {stops.map((stop, i) => (
                <div
                  key={i}
                  className={`gen-stop-row ${activeStopId === i ? "active" : ""}`}
                  onClick={() => setActiveStopId(i)}
                >
                  <ColorPicker
                    value={stop.color}
                    onChange={(color) => handleColorChange(i, color)}
                  />
                  <span className="gen-stop-hex">{stop.color.toUpperCase()}</span>
                  <span className="gen-stop-pos">{stop.position}%</span>
                  <button
                    type="button"
                    className="gen-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeStop(i);
                    }}
                    disabled={stops.length <= 2}
                    aria-label="Remove stop"
                  >
                    ×
                  </button>
                </div>
              ))}
              {stops.length < 8 && (
                <button type="button" className="gen-add-stop" onClick={addStop}>
                  + Add Color
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM: CSS OUTPUT */}
      <div className="tool-group">
        <label className="tool-label">CSS</label>
        <div className="tool-output">
          <code className="tool-code">{css}</code>
          <button className="tool-copy" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
