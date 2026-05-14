import { useState } from "react";
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
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Feature: build gradient string from current state
  const buildGradient = () => {
    const stopStr = stops.map((s) => `${s.color} ${s.position}%`).join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${stopStr})`;
    if (type === "radial") return `radial-gradient(circle, ${stopStr})`;
    if (type === "conic") return `conic-gradient(from ${angle}deg, ${stopStr})`;
  };

  const gradient = buildGradient();
  const css = `background: ${gradient};`;

  // Feature: update color of a stop
  const handleColorChange = (index, color) => {
    const updated = [...stops];
    updated[index] = { ...updated[index], color };
    setStops(updated);
  };

  // Feature: update position with neighbor constraints
  const handlePositionChange = (index, position) => {
    const updated = [...stops];
    const min = index === 0 ? 0 : updated[index - 1].position + 1;
    const max = index === stops.length - 1 ? 100 : updated[index + 1].position - 1;
    updated[index] = { ...updated[index], position: Math.min(max, Math.max(min, +position)) };
    setStops(updated);
  };

  // Feature: add new stop between last two positions
  const addStop = () => {
    if (stops.length >= 8) return;
    const lastIdx = stops.length - 1;
    const last = stops[lastIdx].position;
    const prev = stops[lastIdx - 1].position;
    const mid = Math.round((last + prev) / 2);
    const updated = [...stops];
    updated.splice(lastIdx, 0, { color: "#888888", position: mid });
    setStops(updated);
  };

  // Feature: remove stop, keeping at least two
  const removeStop = (index) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== index));
  };

  // Feature: drag and drop reorder
  const handleDragStart = (e, i) => {
    setDraggedIndex(i);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, i) => {
    e.preventDefault();
    if (i !== draggedIndex) setDragOverIndex(i);
  };

  const handleDragEnd = () => {
    if (draggedIndex !== null && dragOverIndex !== null && draggedIndex !== dragOverIndex) {
      const updated = [...stops];
      const dragged = updated[draggedIndex];
      updated.splice(draggedIndex, 1);
      updated.splice(dragOverIndex, 0, dragged);
      const sortedPositions = stops.map((s) => s.position).sort((a, b) => a - b);
      updated.forEach((stop, idx) => {
        stop.position = sortedPositions[idx];
      });
      setStops(updated);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Feature: copy CSS to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Feature: build slider track with constraint zones
  const buildSliderTrack = (index, stops) => {
    const min = index === 0 ? 0 : stops[index - 1].position;
    const max = index === stops.length - 1 ? 100 : stops[index + 1].position;
    const current = stops[index].position;
    const prevColor = index === 0 ? "transparent" : stops[index - 1].color;
    const nextColor = index === stops.length - 1 ? "transparent" : stops[index + 1].color;

    return `linear-gradient(to right,
      ${prevColor} 0%,
      ${prevColor} ${min}%,
      #333 ${min}%,
      #333 ${current}%,
      #555 ${current}%,
      #555 ${max}%,
      ${nextColor} ${max}%,
      ${nextColor} 100%
    )`;
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
              <Tooltip text="Each stop is a color anchor. Drag the handle to reorder them, slide to change position." />
            </label>
            <div className="gen-stops">
              {stops.map((stop, i) => (
                <div
                  key={i}
                  className={`gen-stop-row ${draggedIndex === i ? "dragging" : ""} ${dragOverIndex === i ? "drag-over" : ""}`}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDragEnd();
                  }}
                >
                  <ColorPicker
                    value={stop.color}
                    onChange={(color) => handleColorChange(i, color)}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={stop.position}
                    onChange={(e) => handlePositionChange(i, e.target.value)}
                    className="tool-slider gen-slider-sm"
                    style={{ background: buildSliderTrack(i, stops) }}
                  />
                  <span className="gen-stop-pos">{stop.position}%</span>
                  <button
                    className="gen-remove"
                    onClick={() => removeStop(i)}
                    disabled={stops.length <= 2}
                  >
                    ×
                  </button>
                  <span
                    className="gen-drag-handle"
                    draggable
                    onDragStart={(e) => handleDragStart(e, i)}
                  >
                    ⋮⋮
                  </span>
                </div>
              ))}
              {stops.length < 8 && (
                <button className="gen-add-stop" onClick={addStop}>
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
