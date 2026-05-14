import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ColorPicker.css';

export default function ColorPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [hsv, setHsv] = useState(() => hexToHsv(value));
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [hexInput, setHexInput] = useState(value.replace('#', '').toUpperCase());
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const canvasRef = useRef(null);
  const hueRef = useRef(null);
  const draggingCanvas = useRef(false);
  const draggingHue = useRef(false);

  // Feature: close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        wrapperRef.current && !wrapperRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    const newHsv = hexToHsv(value);
    setHsv(prev => ({
      h: (newHsv.s < 0.01 || newHsv.v < 0.01) ? prev.h : newHsv.h,
      s: newHsv.s,
      v: newHsv.v
    }));
  }, [value]);

  const updateColor = (newHsv) => {
    setHsv(newHsv);
    const newHex = hsvToHex(newHsv);
    if (newHex !== value) onChange(newHex);
  };

  // Feature: pick from saturation/value canvas
  const handleCanvasMove = (e) => {
    if (!canvasRef.current) return;
    const r = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    const y = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    updateColor({ ...hsv, s: x, v: 1 - y });
  };

  // Feature: pick hue from slider
  const handleHueMove = (e) => {
    if (!hueRef.current) return;
    const r = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    updateColor({ ...hsv, h: x * 360 });
  };

  // Feature: drag tracking on window
  useEffect(() => {
    const onMove = (e) => {
      if (draggingCanvas.current) handleCanvasMove(e);
      if (draggingHue.current) handleHueMove(e);
    };
    const onUp = () => {
      draggingCanvas.current = false;
      draggingHue.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [hsv]);

  useEffect(() => {
    setHexInput(value.replace('#', '').toUpperCase());
  }, [value]);

    const handleHexInput = (e) => {
        const cleaned = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase().slice(0, 6);
        setHexInput(cleaned);
        if (/^[0-9A-F]{6}$/.test(cleaned)) onChange('#' + cleaned);
    };

  const handleToggle = (e) => {
    if (!open) {
      const r = e.currentTarget.getBoundingClientRect();
      setCoords({ top: r.bottom + 8, left: r.left });
    }
    setOpen(prev => !prev);
  };

  const hueColor = hsvToHex({ h: hsv.h, s: 1, v: 1 });

  return (
    <div className="color-picker" ref={wrapperRef}>
      <button className="color-picker-trigger" onClick={handleToggle}>
        <span className="color-picker-swatch" style={{ background: value }} />
        <span className="color-picker-hex-label">{value}</span>
      </button>

      {open && createPortal(
        <div
          className="color-picker-dropdown"
          ref={dropdownRef}
          style={{ top: coords.top, left: coords.left }}
        >
          <div
            className="color-picker-canvas"
            ref={canvasRef}
            style={{ background: `linear-gradient(to right, white, ${hueColor})` }}
            onMouseDown={(e) => { draggingCanvas.current = true; handleCanvasMove(e); }}
          >
            <div className="color-picker-canvas-overlay" />
            <div
              className="color-picker-marker"
              style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
            />
          </div>

          <div
            className="color-picker-hue"
            ref={hueRef}
            onMouseDown={(e) => { draggingHue.current = true; handleHueMove(e); }}
          >
            <div
              className="color-picker-hue-marker"
              style={{ left: `${(hsv.h / 360) * 100}%` }}
            />
          </div>

          <div className="color-picker-hex-row">
            <span className="color-picker-hex-sign">#</span>
            <input
                type="text"
                value={hexInput}
                onChange={handleHexInput}
                className="color-picker-hex-input"
                maxLength={6}
                spellCheck={false}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// === HELPERS: HSV ↔ HEX ===
function hexToHsv(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToHex({ h, s, v }) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0').toUpperCase();
  return '#' + toHex(r) + toHex(g) + toHex(b);
}