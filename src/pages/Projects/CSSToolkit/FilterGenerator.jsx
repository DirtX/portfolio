import { useState } from "react";
import Tooltip from "../../../components/Tooltip";
import "./FilterGenerator.css";

const PRESET_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600",
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600",
];

export default function FilterGenerator() {
  const [imageIndex, setImageIndex] = useState(0);
  const [customImage, setCustomImage] = useState(null);
  const [blur, setBlur] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturate, setSaturate] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [grayscale, setGrayscale] = useState(0);
  const [invert, setInvert] = useState(0);
  const [copied, setCopied] = useState(false);

  const filter = `blur(${blur}px) brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%) hue-rotate(${hueRotate}deg) sepia(${sepia}%) grayscale(${grayscale}%) invert(${invert}%)`;
  const css = `filter: ${filter};`;

  const currentImage = customImage || PRESET_IMAGES[imageIndex];

  // Feature: Upload custom image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setCustomImage(URL.createObjectURL(file));
  };

  // Feature: Reset all filters
  const handleReset = () => {
    setBlur(0);
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
    setHueRotate(0);
    setSepia(0);
    setGrayscale(0);
    setInvert(0);
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
        {/* PREVIEW */}
        <div className="tool-preview">
          <img
            src={currentImage}
            alt="filter preview"
            className="filter-preview-image"
            style={{ filter }}
          />
        </div>

        {/* CONTROLS */}
        <div className="tool-controls">
          {/* IMAGE PRESETS */}
          <div className="tool-group">
            <label className="tool-label">
              Image
              <Tooltip text="Pick a preset image or upload your own to see how the filter looks." />
            </label>
            <div className="filter-presets">
              {PRESET_IMAGES.map((img, i) => (
                <button
                  key={i}
                  className={`filter-preset ${!customImage && imageIndex === i ? "active" : ""}`}
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => {
                    setImageIndex(i);
                    setCustomImage(null);
                  }}
                />
              ))}
              <label className="filter-upload">
                +
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>

          {/* BLUR */}
          <div className="tool-group">
            <label className="tool-label">
              Blur — {blur}px
              <Tooltip text="Softens the image, making it look out of focus. Higher = more blurred." />
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={blur}
              onChange={(e) => setBlur(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* BRIGHTNESS */}
          <div className="tool-group">
            <label className="tool-label">
              Brightness — {brightness}%
              <Tooltip text="How light or dark the image is. 100% = original, 0% = pure black, 200% = very bright." />
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={brightness}
              onChange={(e) => setBrightness(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* CONTRAST */}
          <div className="tool-group">
            <label className="tool-label">
              Contrast — {contrast}%
              <Tooltip text="Difference between dark and bright areas. 0% = all gray, 100% = original, 200% = very contrasty." />
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={contrast}
              onChange={(e) => setContrast(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* SATURATE */}
          <div className="tool-group">
            <label className="tool-label">
              Saturate — {saturate}%
              <Tooltip text="Color intensity. 0% = black and white, 100% = original, 200% = very vivid colors." />
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={saturate}
              onChange={(e) => setSaturate(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* HUE ROTATE */}
          <div className="tool-group">
            <label className="tool-label">
              Hue rotate — {hueRotate}°
              <Tooltip text="Shifts all colors around the color wheel. Try 180° to invert colors." />
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={hueRotate}
              onChange={(e) => setHueRotate(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* SEPIA */}
          <div className="tool-group">
            <label className="tool-label">
              Sepia — {sepia}%
              <Tooltip text="Old-photo brownish tint. 100% = full vintage look." />
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={sepia}
              onChange={(e) => setSepia(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* GRAYSCALE */}
          <div className="tool-group">
            <label className="tool-label">
              Grayscale — {grayscale}%
              <Tooltip text="Removes color. 100% = pure black and white." />
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={grayscale}
              onChange={(e) => setGrayscale(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* INVERT */}
          <div className="tool-group">
            <label className="tool-label">
              Invert — {invert}%
              <Tooltip text="Flips all colors to their opposite. 100% = negative photo effect." />
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={invert}
              onChange={(e) => setInvert(+e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* RESET */}
          <button className="filter-reset" onClick={handleReset}>
            Reset all filters
          </button>
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
