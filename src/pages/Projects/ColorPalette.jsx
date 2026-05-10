import { useState, useRef } from 'react';
import './ColorPalette.css';

export default function ColorPalette() {
  const [colors, setColors] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(null);
  const [colorsCount, setColorsCount] = useState(6);
  const canvasRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    extractColors(url, colorsCount);
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const extractColors = (url, count) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
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
          const [r, g, b] = key.split(',');
          return rgbToHex(+r, +g, +b);
        });

      setColors(sorted);
    };
    img.src = url;
  };

  const rgbToHex = (r, g, b) =>
    '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(null), 1500);
  };

  const handleCountChange = (e) => {
    const count = +e.target.value;
    setColorsCount(count);
    if (imageUrl) extractColors(imageUrl, count);
  };

  return (
    <div className="page-placeholder">
      <h2 className="page-header">Color Palette Generator</h2>

      <div
        className="palette-dropzone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('palette-input').click()}
      >
        <span className="palette-drop-icon">↑</span>
        <p className="palette-drop-text">Drop an image here</p>
        <p className="palette-drop-hint">or click to browse · PNG, JPG, WEBP</p>
        <input
          id="palette-input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      <div className="palette-controls">
        <span className="palette-label">Colors</span>
        <input
          type="range"
          min="2"
          max="10"
          step="1"
          value={colorsCount}
          onChange={handleCountChange}
          className="palette-slider"
        />
        <span className="palette-count">{colorsCount}</span>
      </div>

      <div className="palette-preview">
        {imageUrl
          ? <img src={imageUrl} alt="uploaded" className="palette-image" />
          : <span className="palette-preview-hint">Image preview will appear here</span>
        }
      </div>

      {colors.length > 0 && (
        <div className="palette-grid">
          {colors.map((hex) => (
            <div key={hex} className="palette-card" onClick={() => handleCopy(hex)}>
              <div className="palette-swatch" style={{ background: hex }} />
              <span className="palette-hex">{copied === hex ? 'Copied!' : hex}</span>
            </div>
          ))}
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}