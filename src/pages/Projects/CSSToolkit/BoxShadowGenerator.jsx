import { useState } from "react";
import ColorPicker from "../../../components/ColorPicker";
import Tooltip from "../../../components/Tooltip";
import "./BoxShadowGenerator.css";
import BackButton from "../../../components/BackButton";

const defaultShadows = [
  { x: 10, y: 10, blur: 30, spread: 0, color: "#ff0000", opacity: 0.5, inset: false },
];

export default function BoxShadowGenerator() {
  const [shadows, setShadows] = useState(defaultShadows);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const active = shadows[activeIndex];

  // Feature: Convert hex + opacity to rgba color string
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Feature: Build full box-shadow CSS string from all layers
  const buildShadow = () => {
    return shadows
      .map((s) => {
        const insetStr = s.inset ? "inset " : "";
        return `${insetStr}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${hexToRgba(s.color, s.opacity)}`;
      })
      .join(", ");
  };

  const shadow = buildShadow();
  const css = `box-shadow: ${shadow};`;

  // Feature: Update single property of active shadow
  const updateActive = (field, value) => {
    const updated = [...shadows];
    updated[activeIndex] = { ...updated[activeIndex], [field]: value };
    setShadows(updated);
  };

  // Feature: Add new shadow layer
  const addShadow = () => {
    if (shadows.length >= 5) return;
    setShadows([
      ...shadows,
      { x: 0, y: 4, blur: 12, spread: 0, color: "#000000", opacity: 0.2, inset: false },
    ]);
    setActiveIndex(shadows.length);
  };

  // Feature: Remove shadow layer
  const removeShadow = (i) => {
    if (shadows.length <= 1) return;
    const updated = shadows.filter((_, idx) => idx !== i);
    setShadows(updated);
    if (activeIndex >= updated.length) setActiveIndex(updated.length - 1);
  };

  // Feature: Drag and drop reorder shadow layers
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
      const updated = [...shadows];
      const dragged = updated[draggedIndex];
      updated.splice(draggedIndex, 1);
      updated.splice(dragOverIndex, 0, dragged);
      setShadows(updated);
      setActiveIndex(dragOverIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Feature: Copy CSS to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="tool-wrapper">
      {/* TOP: PREVIEW + CONTROLS */}
      <div className="tool-top">
        <div className="tool-preview">
          <div className="shadow-preview-box" style={{ boxShadow: shadow }} />
        </div>

        <div className="tool-controls">
          {/* LAYERS LIST */}
          <div className="tool-group">
            <label className="tool-label">
              Layers
              <Tooltip text="You can stack multiple shadows on the same element to create depth or complex effects." />
            </label>
            <div className="shadow-layers">
              {shadows.map((s, i) => (
                <div
                  key={i}
                  className={`shadow-layer ${activeIndex === i ? "active" : ""} ${draggedIndex === i ? "dragging" : ""} ${dragOverIndex === i ? "drag-over" : ""}`}
                  onClick={() => setActiveIndex(i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDragEnd();
                  }}
                >
                  <span className="shadow-layer-name">
                    {s.inset ? "Inset" : "Drop"} Shadow {i + 1}
                  </span>
                  <button
                    className="shadow-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeShadow(i);
                    }}
                    disabled={shadows.length <= 1}
                  >
                    ×
                  </button>
                  <span
                    className="shadow-drag-handle"
                    draggable
                    onDragStart={(e) => handleDragStart(e, i)}
                  >
                    ⋮⋮
                  </span>
                </div>
              ))}
              {shadows.length < 5 && (
                <button className="shadow-add" onClick={addShadow}>
                  + Add Layer
                </button>
              )}
            </div>
          </div>

          {/* TYPE */}
          <div className="tool-group">
            <label className="tool-label">
              Type
              <Tooltip text="Outset puts shadow outside the element. Inset puts it inside, making the element look pressed in." />
            </label>
            <div className="tool-pills">
              <button
                className={`tool-pill ${!active.inset ? "active" : ""}`}
                onClick={() => updateActive("inset", false)}
              >
                Outset
              </button>
              <button
                className={`tool-pill ${active.inset ? "active" : ""}`}
                onClick={() => updateActive("inset", true)}
              >
                Inset
              </button>
            </div>
          </div>

          {/* X OFFSET */}
          <div className="tool-group">
            <label className="tool-label">
              X offset — {active.x}px
              <Tooltip text="Horizontal shadow position. Positive moves right, negative moves left." />
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={active.x}
              onChange={(e) => updateActive("x", +e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* Y OFFSET */}
          <div className="tool-group">
            <label className="tool-label">
              Y offset — {active.y}px
              <Tooltip text="Vertical shadow position. Positive moves down, negative moves up." />
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={active.y}
              onChange={(e) => updateActive("y", +e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* BLUR */}
          <div className="tool-group">
            <label className="tool-label">
              Blur — {active.blur}px
              <Tooltip text="How soft the shadow edges are. 0 = sharp edge, higher = smoother and more spread out." />
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={active.blur}
              onChange={(e) => updateActive("blur", +e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* SPREAD */}
          <div className="tool-group">
            <label className="tool-label">
              Spread — {active.spread}px
              <Tooltip text="Makes the shadow bigger or smaller than the element. Negative shrinks it, positive expands it." />
            </label>
            <input
              type="range"
              min="-50"
              max="50"
              value={active.spread}
              onChange={(e) => updateActive("spread", +e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* COLOR */}
          <div className="tool-group">
            <label className="tool-label">
              Color
              <Tooltip text="The base color of the shadow before opacity is applied." />
            </label>
            <ColorPicker value={active.color} onChange={(color) => updateActive("color", color)} />
          </div>

          {/* OPACITY */}
          <div className="tool-group">
            <label className="tool-label">
              Opacity — {Math.round(active.opacity * 100)}%
              <Tooltip text="How transparent the shadow is. 0% = invisible, 100% = fully solid color." />
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={active.opacity}
              onChange={(e) => updateActive("opacity", +e.target.value)}
              className="tool-slider"
            />
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
