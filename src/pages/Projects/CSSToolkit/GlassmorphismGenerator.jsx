import { useState } from "react";
import ColorPicker from "../../../components/ColorPicker";
import Tooltip from "../../../components/Tooltip";
import "./GlassmorphismGenerator.css";

const PRESET_BACKGROUNDS = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
];

export default function GlassmorphismGenerator() {
  const [bgIndex, setBgIndex] = useState(0);
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.15);
  const [saturation, setSaturation] = useState(180);
  const [borderRadius, setBorderRadius] = useState(16);
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [color, setColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  // Feature: Convert hex + opacity to rgba color string
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const glassStyle = {
    background: hexToRgba(color, opacity),
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `1px solid ${hexToRgba(color, borderOpacity)}`,
    borderRadius: `${borderRadius}px`,
  };

  const css = `background: ${hexToRgba(color, opacity)};
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid ${hexToRgba(color, borderOpacity)};
border-radius: ${borderRadius}px;`;

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
        {/* PREVIEW */}
        <div className="tool-preview" style={{ background: PRESET_BACKGROUNDS[bgIndex] }}>
          <div className="glass-preview-card" style={glassStyle} />
        </div>

        {/* CONTROLS */}
        <div className="tool-controls">
          {/* BACKGROUND PRESETS */}
          <div className="tool-group">
            <label className="tool-label">
              Background
              <Tooltip text="Glassmorphism only works on top of a colorful background. Try different presets to see the effect." />
            </label>
            <div className="glass-presets">
              {PRESET_BACKGROUNDS.map((bg, i) => (
                <button
                  key={i}
                  className={`glass-preset ${bgIndex === i ? "active" : ""}`}
                  style={{ background: bg }}
                  onClick={() => setBgIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* BLUR */}
          <div className="tool-group">
            <label className="tool-label">
              Blur — {blur}px
              <Tooltip text="How much the background behind the glass gets blurred. Higher = more frosted look." />
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* OPACITY */}
          <div className="tool-group">
            <label className="tool-label">
              Background opacity — {Math.round(opacity * 100)}%
              <Tooltip text="How see-through the glass card is. Lower values let more background show through." />
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* SATURATION */}
          <div className="tool-group">
            <label className="tool-label">
              Saturation — {saturation}%
              <Tooltip text="Boosts color intensity of what's behind the glass. Makes the effect more vivid." />
            </label>
            <input
              type="range"
              min="100"
              max="300"
              value={saturation}
              onChange={(e) => setSaturation(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* BORDER RADIUS */}
          <div className="tool-group">
            <label className="tool-label">
              Border radius — {borderRadius}px
              <Tooltip text="How rounded the corners of the glass card are." />
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={borderRadius}
              onChange={(e) => setBorderRadius(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* BORDER OPACITY */}
          <div className="tool-group">
            <label className="tool-label">
              Border opacity — {Math.round(borderOpacity * 100)}%
              <Tooltip text="A thin outline that gives the glass card definition and depth." />
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* COLOR */}
          <div className="tool-group">
            <label className="tool-label">
              Color
              <Tooltip text="Tint color of the glass effect. White gives a neutral frosted look, other colors give a tinted glass." />
            </label>
            <ColorPicker value={color} onChange={setColor} />
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
