import { useState, useRef } from "react";
import { useLang } from "../../context/LanguageContext";
import "./ColorPalette.css";

const TECH_STACK = ["Canvas API", "React", "Color Math"];

export default function ColorPalette() {
  const { t } = useLang();

  const STEPS = [
    { num: "01", title: t("color_palette_step1_title"), desc: t("color_palette_step1_desc") },
    { num: "02", title: t("color_palette_step2_title"), desc: t("color_palette_step2_desc") },
    { num: "03", title: t("color_palette_step3_title"), desc: t("color_palette_step3_desc") },
  ];

  const [colors, setColors] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(null);
  const [colorsCount, setColorsCount] = useState(6);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Feature: Validate and load image file
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    extractColors(url, colorsCount);
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  // Feature: Drag and drop image upload
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // Feature: Extract dominant colors from image via canvas pixel sampling
  const extractColors = (url, count) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const colorMap = {};

      for (let i = 0; i < imageData.length; i += 4 * 10) {
        const r = Math.round(imageData[i] / 32) * 32;
        const g = Math.round(imageData[i + 1] / 32) * 32;
        const b = Math.round(imageData[i + 2] / 32) * 32;
        const key = `${r},${g},${b}`;
        colorMap[key] = (colorMap[key] || 0) + 1;
      }

      const sorted = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([key]) => {
          const [r, g, b] = key.split(",");
          return rgbToHex(+r, +g, +b);
        });

      setColors(sorted);
    };
    img.src = url;
  };

  // Feature: Convert RGB to HEX string
  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

  // Feature: Convert HEX to RGB string
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Feature: Copy hex value to clipboard
  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  // Feature: Re-extract colors when count changes
  const handleCountChange = (e) => {
    const count = +e.target.value;
    setColorsCount(count);
    if (imageUrl) extractColors(imageUrl, count);
  };

  return (
    <div className="color-palette-page">
      {/* HERO SECTION */}
      <div className="color-palette-hero">
        <div className="color-palette-tech">
          {TECH_STACK.map((tech, i) => (
            <span key={tech} className="color-palette-tech-item">
              {tech}
              {i < TECH_STACK.length - 1 && <span className="color-palette-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="color-palette-title">Color Palette Generator</h1>
        <p className="color-palette-subtitle">{t("color_palette_subtitle")}</p>
      </div>

      {/* MAIN CARD */}
      <div className="color-palette-card">
        {/* IMAGE PREVIEW + DROPZONE */}
        <div
          className={`color-palette-dropzone ${isDragging ? "dragging" : ""} ${imageUrl ? "has-image" : ""}`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {imageUrl ? (
            <img src={imageUrl} alt="uploaded" className="color-palette-image" />
          ) : (
            <div className="color-palette-drop-hint">
              <span className="color-palette-drop-icon">↑</span>
              <p className="color-palette-drop-text">{t("color_palette_drop")}</p>
              <p className="color-palette-drop-sub">{t("color_palette_drop_sub")}</p>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="color-palette-controls">
          <div className="color-palette-controls-left">
            <span className="color-palette-label">
              {t("color_palette_colors")} — {colorsCount}
            </span>
            <input
              type="range"
              min="2"
              max="10"
              step="1"
              value={colorsCount}
              onChange={handleCountChange}
              className="color-palette-slider"
            />
          </div>
          {imageUrl && (
            <button
              className="color-palette-reset"
              onClick={() => {
                setImageUrl(null);
                setColors([]);
              }}
            >
              {t("color_palette_upload_new")}
            </button>
          )}
        </div>

        {/* COLOR SWATCHES */}
        {colors.length > 0 && (
          <div className="color-palette-swatches">
            {colors.map((hex) => (
              <div
                key={hex}
                className={`color-palette-swatch-card ${copied === hex ? "copied" : ""}`}
                onClick={() => handleCopy(hex)}
              >
                <div className="color-palette-swatch" style={{ background: hex }} />
                <div className="color-palette-swatch-info">
                  <span className="color-palette-swatch-hex">{hex}</span>
                  <span className="color-palette-swatch-rgb">{hexToRgb(hex)}</span>
                </div>
                <span className="color-palette-swatch-copy">
                  {copied === hex ? t("color_palette_copied") : t("color_palette_copy")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* HOW IT WORKS */}
      <div className="color-palette-how">
        <h2 className="color-palette-how-title">{t("page_how_title")}</h2>
        <div className="color-palette-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="color-palette-step">
              <span className="color-palette-step-num">{s.num}</span>
              <h3 className="color-palette-step-title">{s.title}</h3>
              <p className="color-palette-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH NOTE */}
      <div className="color-palette-tech-note">
        {t("page_powered_by")} <strong>Canvas API pixel sampling</strong> —{" "}
        {t("color_palette_tech_note")}
      </div>

      {/* HIDDEN CANVAS */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
}
