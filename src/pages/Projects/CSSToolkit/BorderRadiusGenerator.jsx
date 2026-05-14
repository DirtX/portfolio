import { useState } from "react";
import Tooltip from "../../../components/Tooltip";
import "./BorderRadiusGenerator.css";

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [locked, setLocked] = useState(true);
  const [copied, setCopied] = useState(false);

  // Feature: Update one corner, sync all if locked
  const updateCorner = (corner, value) => {
    const v = +value;
    if (locked) {
      setTl(v);
      setTr(v);
      setBr(v);
      setBl(v);
      return;
    }
    if (corner === "tl") setTl(v);
    if (corner === "tr") setTr(v);
    if (corner === "br") setBr(v);
    if (corner === "bl") setBl(v);
  };

  // Feature: Toggle lock and sync corners to top-left
  const toggleLock = () => {
    if (!locked) {
      setTr(tl);
      setBr(tl);
      setBl(tl);
    }
    setLocked(!locked);
  };

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;
  const css = locked ? `border-radius: ${tl}px;` : `border-radius: ${radius};`;

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
          <div className="radius-preview-box" style={{ borderRadius: radius }} />
        </div>

        {/* CONTROLS */}
        <div className="tool-controls">
          {/* LOCK TOGGLE */}
          <div className="tool-group">
            <label className="tool-label">
              Sync corners
              <Tooltip text="When locked, all four corners change together. Unlock to set each corner independently." />
            </label>
            <button className={`radius-lock ${locked ? "active" : ""}`} onClick={toggleLock}>
              {locked ? "🔒 Locked" : "🔓 Unlocked"}
            </button>
          </div>

          {/* TOP-LEFT / ALL */}
          <div className="tool-group">
            <label className="tool-label">
              {locked ? "All corners" : "Top left"} — {tl}px
              <Tooltip text="How rounded this corner is. 0 = sharp square corner, higher = more rounded." />
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={tl}
              onChange={(e) => updateCorner("tl", e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* OTHER CORNERS (when unlocked) */}
          {!locked && (
            <>
              <div className="tool-group">
                <label className="tool-label">Top right — {tr}px</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tr}
                  onChange={(e) => updateCorner("tr", e.target.value)}
                  className="tool-slider"
                />
              </div>

              <div className="tool-group">
                <label className="tool-label">Bottom right — {br}px</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={br}
                  onChange={(e) => updateCorner("br", e.target.value)}
                  className="tool-slider"
                />
              </div>

              <div className="tool-group">
                <label className="tool-label">Bottom left — {bl}px</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bl}
                  onChange={(e) => updateCorner("bl", e.target.value)}
                  className="tool-slider"
                />
              </div>
            </>
          )}
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
