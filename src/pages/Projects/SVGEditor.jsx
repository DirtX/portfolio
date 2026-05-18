import { useState, useRef } from "react";
import ColorPicker from "../../components/ColorPicker";
import Tooltip from "../../components/Tooltip";
import { useLang } from "../../context/LanguageContext";
import "./SVGEditor.css";

const TECH_STACK = ["SVG", "React", "DOMParser"];

// Feature: Generate unique id for each shape
const newId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5;
const ZOOM_STEP = 0.2;

// Feature: List of SVG tags we can import
const IMPORTABLE_TAGS = ["rect", "circle", "ellipse", "line", "polygon", "polyline", "path"];

// Feature: Convert DOM element attributes to plain object
const elementAttrs = (el) => {
  const obj = {};
  for (const attr of el.attributes) {
    obj[attr.name] = attr.value;
  }
  return obj;
};

export default function SVGEditor() {
  const { t } = useLang();

  const TOOLS = [
    { id: "hand", label: t("svg_tool_hand") },
    { id: "select", label: t("svg_tool_select") },
    { id: "rect", label: t("svg_tool_rect") },
    { id: "circle", label: t("svg_tool_circle") },
    { id: "line", label: t("svg_tool_line") },
    { id: "pen", label: t("svg_tool_pen") },
  ];

  const STEPS = [
    { num: "01", title: t("svg_step1_title"), desc: t("svg_step1_desc") },
    { num: "02", title: t("svg_step2_title"), desc: t("svg_step2_desc") },
    { num: "03", title: t("svg_step3_title"), desc: t("svg_step3_desc") },
  ];

  const [tool, setTool] = useState("hand");
  const [fill, setFill] = useState("#1A56DB");
  const [stroke, setStroke] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState(null);

  const svgRef = useRef(null);
  const importInputRef = useRef(null);

  // Feature: Get cursor coords in canvas space accounting for zoom and pan
  const getCoords = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    const screenX = e.clientX - r.left;
    const screenY = e.clientY - r.top;
    return {
      x: (screenX - pan.x) / zoom,
      y: (screenY - pan.y) / zoom,
    };
  };

  // Feature: Get raw screen coords (for pan tool — without zoom transform)
  const getScreenCoords = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  // Feature: Start interaction depending on active tool
  const handleMouseDown = (e) => {
    if (tool === "hand") {
      const s = getScreenCoords(e);
      setIsPanning(true);
      setPanStart({ x: s.x - pan.x, y: s.y - pan.y });
      return;
    }

    if (tool === "select") {
      if (e.target === svgRef.current || e.target.classList.contains("svg-canvas-bg")) {
        setSelectedId(null);
      }
      return;
    }

    const { x, y } = getCoords(e);
    setIsDrawing(true);
    const id = newId();

    if (tool === "rect") {
      setCurrentShape({ id, type: "rect", x, y, width: 0, height: 0, fill, stroke, strokeWidth });
    } else if (tool === "circle") {
      setCurrentShape({ id, type: "circle", cx: x, cy: y, r: 0, fill, stroke, strokeWidth });
    } else if (tool === "line") {
      setCurrentShape({ id, type: "line", x1: x, y1: y, x2: x, y2: y, stroke, strokeWidth });
    } else if (tool === "pen") {
      setCurrentShape({ id, type: "path-drawn", points: [{ x, y }], stroke, strokeWidth });
    }
  };

  // Feature: Update on cursor move
  const handleMouseMove = (e) => {
    if (isPanning && panStart) {
      const s = getScreenCoords(e);
      setPan({ x: s.x - panStart.x, y: s.y - panStart.y });
      return;
    }

    if (!isDrawing || !currentShape) return;
    const { x, y } = getCoords(e);

    if (currentShape.type === "rect") {
      setCurrentShape({ ...currentShape, width: x - currentShape.x, height: y - currentShape.y });
    } else if (currentShape.type === "circle") {
      const dx = x - currentShape.cx;
      const dy = y - currentShape.cy;
      setCurrentShape({ ...currentShape, r: Math.sqrt(dx * dx + dy * dy) });
    } else if (currentShape.type === "line") {
      setCurrentShape({ ...currentShape, x2: x, y2: y });
    } else if (currentShape.type === "path-drawn") {
      setCurrentShape({ ...currentShape, points: [...currentShape.points, { x, y }] });
    }
  };

  // Feature: Finalize action on mouse up
  const handleMouseUp = () => {
    if (isPanning) {
      setIsPanning(false);
      setPanStart(null);
      return;
    }
    if (currentShape) {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
    }
    setIsDrawing(false);
  };

  // Feature: Handle click on shape — for selection
  const handleShapeClick = (e, shapeId) => {
    if (tool === "select") {
      e.stopPropagation();
      setSelectedId(shapeId);
    }
  };

  const clearCanvas = () => {
    setShapes([]);
    setCurrentShape(null);
    setSelectedId(null);
  };

  const undo = () => {
    setShapes(shapes.slice(0, -1));
    setSelectedId(null);
  };

  const deleteSelected = () => {
    setShapes(shapes.filter((s) => s.id !== selectedId));
    setSelectedId(null);
  };

  // Feature: Update an attribute on selected shape
  const updateSelected = (changes) => {
    setShapes(
      shapes.map((s) => {
        if (s.id !== selectedId) return s;
        if (s.imported) {
          return { ...s, attrs: { ...s.attrs, ...changes } };
        }
        return { ...s, ...changes };
      })
    );
  };

  const pointsToPath = (points) => {
    if (points.length === 0) return "";
    return "M " + points.map((p) => `${p.x},${p.y}`).join(" L ");
  };

  // Feature: Render single shape
  const renderShape = (s, key, isPreview = false) => {
    const onClick = isPreview ? undefined : (e) => handleShapeClick(e, s.id);
    const className =
      !isPreview && selectedId === s.id ? "svg-shape svg-shape-selected" : "svg-shape";

    if (s.imported) {
      const Tag = s.type;
      return <Tag key={key} {...s.attrs} className={className} onClick={onClick} />;
    }

    if (s.type === "rect") {
      const x = s.width < 0 ? s.x + s.width : s.x;
      const y = s.height < 0 ? s.y + s.height : s.y;
      return (
        <rect
          key={key}
          x={x}
          y={y}
          width={Math.abs(s.width)}
          height={Math.abs(s.height)}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          opacity={s.opacity ?? 1}
          className={className}
          onClick={onClick}
        />
      );
    }
    if (s.type === "circle") {
      return (
        <circle
          key={key}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill={s.fill}
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          opacity={s.opacity ?? 1}
          className={className}
          onClick={onClick}
        />
      );
    }
    if (s.type === "line") {
      return (
        <line
          key={key}
          x1={s.x1}
          y1={s.y1}
          x2={s.x2}
          y2={s.y2}
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          opacity={s.opacity ?? 1}
          className={className}
          onClick={onClick}
        />
      );
    }
    if (s.type === "path-drawn") {
      return (
        <path
          key={key}
          d={pointsToPath(s.points)}
          fill="none"
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          opacity={s.opacity ?? 1}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          onClick={onClick}
        />
      );
    }
  };

  const exportSVG = () => {
    const svg = svgRef.current.cloneNode(true);
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drawing.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    if (shapes.length > 0) {
      if (!confirm(t("svg_confirm_import"))) return;
    }
    importInputRef.current?.click();
  };

  // Feature: Parse and import SVG file
  const handleImportFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const text = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "image/svg+xml");

    const collected = [];
    const walk = (node) => {
      for (const child of node.children) {
        const tag = child.tagName.toLowerCase();
        if (IMPORTABLE_TAGS.includes(tag)) {
          collected.push({
            id: newId(),
            type: tag,
            imported: true,
            attrs: elementAttrs(child),
          });
        }
        if (child.children.length > 0) walk(child);
      }
    };

    const svgRoot = doc.querySelector("svg");
    if (svgRoot) walk(svgRoot);

    if (collected.length === 0) {
      alert(t("svg_alert_no_shapes"));
      e.target.value = "";
      return;
    }

    setShapes(collected);
    setSelectedId(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    e.target.value = "";
  };

  const selectedShape = shapes.find((s) => s.id === selectedId);
  const getSelectedAttr = (key) => {
    if (!selectedShape) return null;
    if (selectedShape.imported) return selectedShape.attrs[key];
    return selectedShape[key];
  };

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2)));
  const zoomFit = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="svg-wrapper">
      {/* HERO */}
      <div className="svg-hero">
        <div className="svg-tech">
          {TECH_STACK.map((tech, i) => (
            <span key={tech} className="svg-tech-item">
              {tech}
              {i < TECH_STACK.length - 1 && <span className="svg-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="svg-title">SVG Editor</h1>
        <p className="svg-subtitle">{t("svg_subtitle")}</p>
      </div>

      {/* TOOL LAYOUT */}
      <div className="svg-layout">
        {/* TOOLBAR */}
        <div className="svg-toolbar">
          {/* TOOLS */}
          <div className="svg-group">
            <label className="svg-label">
              {t("svg_tool")}
              <Tooltip text={t("svg_tool_tooltip")} />
            </label>
            <div className="svg-tools">
              {TOOLS.map((tt) => (
                <button
                  key={tt.id}
                  className={`svg-tool ${tool === tt.id ? "active" : ""}`}
                  onClick={() => setTool(tt.id)}
                >
                  {tt.label}
                </button>
              ))}
            </div>
          </div>

          {/* SELECTED SHAPE EDITOR */}
          {selectedShape && tool === "select" ? (
            <>
              <div className="svg-group">
                <label className="svg-label">
                  {t("svg_selected")}
                  <span className="svg-counter">{selectedShape.type}</span>
                </label>
              </div>

              {selectedShape.type !== "line" && (
                <div className="svg-group">
                  <label className="svg-label">{t("svg_fill")}</label>
                  <ColorPicker
                    value={getSelectedAttr("fill") || "#000000"}
                    onChange={(v) => updateSelected({ fill: v })}
                  />
                </div>
              )}

              <div className="svg-group">
                <label className="svg-label">{t("svg_stroke")}</label>
                <ColorPicker
                  value={getSelectedAttr("stroke") || "#ffffff"}
                  onChange={(v) => updateSelected({ stroke: v })}
                />
              </div>

              <div className="svg-group">
                <label className="svg-label">
                  {t("svg_stroke_width")} —{" "}
                  {getSelectedAttr("strokeWidth") || getSelectedAttr("stroke-width") || 1}
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={getSelectedAttr("strokeWidth") || getSelectedAttr("stroke-width") || 1}
                  onChange={(e) => {
                    const v = +e.target.value;
                    if (selectedShape.imported) {
                      updateSelected({ "stroke-width": v });
                    } else {
                      updateSelected({ strokeWidth: v });
                    }
                  }}
                  className="svg-slider"
                />
              </div>

              <div className="svg-group">
                <label className="svg-label">
                  {t("svg_opacity")} — {getSelectedAttr("opacity") || 1}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={getSelectedAttr("opacity") || 1}
                  onChange={(e) => updateSelected({ opacity: +e.target.value })}
                  className="svg-slider"
                />
              </div>

              <button className="svg-action svg-action-danger" onClick={deleteSelected}>
                {t("svg_delete")}
              </button>
            </>
          ) : (
            <>
              {(tool === "rect" || tool === "circle") && (
                <div className="svg-group">
                  <label className="svg-label">
                    {t("svg_fill")}
                    <Tooltip text={t("svg_fill_tooltip")} />
                  </label>
                  <ColorPicker value={fill} onChange={setFill} />
                </div>
              )}

              {tool !== "hand" && tool !== "select" && (
                <>
                  <div className="svg-group">
                    <label className="svg-label">
                      {t("svg_stroke")}
                      <Tooltip text={t("svg_stroke_tooltip")} />
                    </label>
                    <ColorPicker value={stroke} onChange={setStroke} />
                  </div>

                  <div className="svg-group">
                    <label className="svg-label">
                      {t("svg_stroke_width")} — {strokeWidth}px
                      <Tooltip text={t("svg_stroke_width_tooltip")} />
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={strokeWidth}
                      onChange={(e) => setStrokeWidth(+e.target.value)}
                      className="svg-slider"
                    />
                  </div>
                </>
              )}

              {(tool === "hand" || tool === "select") && (
                <div className="svg-group">
                  <p className="svg-hint">
                    {tool === "hand"
                      ? t("svg_hint_hand")
                      : shapes.length === 0
                        ? t("svg_hint_empty")
                        : t("svg_hint_select")}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ZOOM CONTROL */}
          <div className="svg-group">
            <label className="svg-label">
              {t("svg_zoom")} — {Math.round(zoom * 100)}%
            </label>
            <input
              type="range"
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(+e.target.value)}
              className="svg-slider"
            />
          </div>

          {/* ACTIONS */}
          <div className="svg-group">
            <label className="svg-label">
              {t("svg_actions")}
              <span className="svg-counter">
                {shapes.length} {shapes.length === 1 ? t("svg_shape") : t("svg_shapes")}
              </span>
            </label>
            <div className="svg-actions">
              <button className="svg-action" onClick={undo} disabled={shapes.length === 0}>
                {t("svg_undo")}
              </button>
              <button className="svg-action" onClick={clearCanvas} disabled={shapes.length === 0}>
                {t("svg_clear")}
              </button>
              <button className="svg-action" onClick={handleImportClick}>
                {t("svg_import")}
              </button>
              <input
                ref={importInputRef}
                type="file"
                accept=".svg,image/svg+xml"
                onChange={handleImportFile}
                style={{ display: "none" }}
              />
              <button
                className="svg-action svg-action-primary"
                onClick={exportSVG}
                disabled={shapes.length === 0}
              >
                {t("svg_export")}
              </button>
            </div>
          </div>
        </div>

        {/* CANVAS */}
        <div className="svg-canvas-wrap">
          <div className="svg-canvas-zoom">
            <button className="svg-zoom-btn" onClick={zoomOut} aria-label="Zoom out">
              −
            </button>
            <button className="svg-zoom-display" onClick={zoomFit} aria-label="Reset zoom">
              {Math.round(zoom * 100)}%
            </button>
            <button className="svg-zoom-btn" onClick={zoomIn} aria-label="Zoom in">
              +
            </button>
          </div>

          <svg
            ref={svgRef}
            className={`svg-canvas svg-canvas-tool-${tool} ${isPanning ? "is-panning" : ""}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <rect className="svg-canvas-bg" width="100%" height="100%" fill="transparent" />

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {shapes.map((s) => renderShape(s, s.id))}
              {currentShape && renderShape(currentShape, "current", true)}
            </g>
          </svg>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="svg-how">
        <h2 className="svg-how-title">{t("page_how_title")}</h2>
        <div className="svg-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="svg-step">
              <span className="svg-step-num">{s.num}</span>
              <h3 className="svg-step-title">{s.title}</h3>
              <p className="svg-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH NOTE */}
      <div className="svg-tech-note">{t("svg_tech_note")}</div>
    </div>
  );
}
