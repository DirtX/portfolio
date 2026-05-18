import { useState, useRef, useEffect } from "react";
import Tooltip from "../../../components/Tooltip";
import "./BorderRadiusGenerator.css";

const MIN_RADIUS = 0;
const MAX_RADIUS = 100;

// Feature: Clamp value to allowed range
const clamp = (v) => Math.max(MIN_RADIUS, Math.min(MAX_RADIUS, v));

export default function BorderRadiusGenerator() {
  const [tl, setTl] = useState(16);
  const [tr, setTr] = useState(16);
  const [br, setBr] = useState(16);
  const [bl, setBl] = useState(16);
  const [syncAll, setSyncAll] = useState(false);
  const [copied, setCopied] = useState(false);
  const [draggingCorner, setDraggingCorner] = useState(null);

  const boxRef = useRef(null);

  // Feature: Update one corner, sync all if toggle is on
  const updateCorner = (corner, value) => {
    const v = clamp(value);
    if (syncAll) {
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

  // Feature: Toggle sync — when turning on, match all corners to top-left
  const toggleSync = () => {
    if (!syncAll) {
      setTr(tl);
      setBr(tl);
      setBl(tl);
    }
    setSyncAll(!syncAll);
  };

  // Feature: Compute radius value from cursor distance to box corner
  const computeRadiusFromMouse = (corner, e) => {
    const box = boxRef.current?.getBoundingClientRect();
    if (!box) return 0;

    // Distance from corner to cursor projected onto diagonal
    let dx, dy;
    if (corner === "tl") {
      dx = e.clientX - box.left;
      dy = e.clientY - box.top;
    } else if (corner === "tr") {
      dx = box.right - e.clientX;
      dy = e.clientY - box.top;
    } else if (corner === "br") {
      dx = box.right - e.clientX;
      dy = box.bottom - e.clientY;
    } else {
      dx = e.clientX - box.left;
      dy = box.bottom - e.clientY;
    }

    // Average the two distances for natural feel
    const avg = (Math.max(0, dx) + Math.max(0, dy)) / 2;
    return Math.round(clamp(avg));
  };

  // Feature: Attach window listeners while dragging a corner handle
  useEffect(() => {
    if (!draggingCorner) return;

    const onMove = (e) => {
      const v = computeRadiusFromMouse(draggingCorner, e);
      updateCorner(draggingCorner, v);
    };
    const onUp = () => setDraggingCorner(null);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggingCorner, syncAll]);

  const radius = `${tl}px ${tr}px ${br}px ${bl}px`;
  const allEqual = tl === tr && tr === br && br === bl;
  const css = allEqual ? `border-radius: ${tl}px;` : `border-radius: ${radius};`;

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
          <div className="radius-preview-wrap">
            <div ref={boxRef} className="radius-preview-box" style={{ borderRadius: radius }}>
              {/* Drag handles — one per corner */}
              <span
                className={`radius-handle radius-handle-tl ${draggingCorner === "tl" ? "active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggingCorner("tl");
                }}
              />
              <span
                className={`radius-handle radius-handle-tr ${draggingCorner === "tr" ? "active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggingCorner("tr");
                }}
              />
              <span
                className={`radius-handle radius-handle-br ${draggingCorner === "br" ? "active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggingCorner("br");
                }}
              />
              <span
                className={`radius-handle radius-handle-bl ${draggingCorner === "bl" ? "active" : ""}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setDraggingCorner("bl");
                }}
              />
            </div>
            <p className="radius-hint">↘ Drag any corner to round it</p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="tool-controls">
          {/* SYNC TOGGLE */}
          <div className="tool-group">
            <label className="radius-sync">
              <input
                type="checkbox"
                checked={syncAll}
                onChange={toggleSync}
                className="radius-sync-checkbox"
              />
              <span>Edit all corners together</span>
              <Tooltip text="When checked, changing one corner changes all four. Uncheck to set each independently." />
            </label>
          </div>

          {/* TOP LEFT */}
          <div className="tool-group">
            <label className="tool-label">Top left — {tl}px</label>
            <input
              type="range"
              min={MIN_RADIUS}
              max={MAX_RADIUS}
              value={tl}
              onChange={(e) => updateCorner("tl", e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* TOP RIGHT */}
          <div className="tool-group">
            <label className="tool-label">Top right — {tr}px</label>
            <input
              type="range"
              min={MIN_RADIUS}
              max={MAX_RADIUS}
              value={tr}
              onChange={(e) => updateCorner("tr", e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* BOTTOM RIGHT */}
          <div className="tool-group">
            <label className="tool-label">Bottom right — {br}px</label>
            <input
              type="range"
              min={MIN_RADIUS}
              max={MAX_RADIUS}
              value={br}
              onChange={(e) => updateCorner("br", e.target.value)}
              className="tool-slider"
            />
          </div>

          {/* BOTTOM LEFT */}
          <div className="tool-group">
            <label className="tool-label">Bottom left — {bl}px</label>
            <input
              type="range"
              min={MIN_RADIUS}
              max={MAX_RADIUS}
              value={bl}
              onChange={(e) => updateCorner("bl", e.target.value)}
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
