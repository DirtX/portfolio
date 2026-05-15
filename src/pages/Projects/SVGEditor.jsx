import { useState, useRef, useEffect } from "react";
import ColorPicker from "../../components/ColorPicker";
import Tooltip from "../../components/Tooltip";
import "./SVGEditor.css";

const TECH_STACK = ["SVG", "React", "Pointer Events"];

const TOOLS = [
  { id: "rect", label: "Rectangle" },
  { id: "circle", label: "Circle" },
  { id: "line", label: "Line" },
  { id: "pen", label: "Pen" },
];

const STEPS = [
  {
    num: "01",
    title: "Pick a tool",
    desc: "Rectangle, Circle, Line or freehand Pen. Set fill and stroke colors.",
  },
  {
    num: "02",
    title: "Draw on canvas",
    desc: "Click and drag to create shapes. Pen tool captures every pointer movement.",
  },
  {
    num: "03",
    title: "Export as SVG",
    desc: "Save your drawing as a clean SVG file ready for any design tool.",
  },
];

export default function SVGEditor() {
  const [tool, setTool] = useState("rect");
  const [fill, setFill] = useState("#1A56DB");
  const [stroke, setStroke] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [shapes, setShapes] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);

  const svgRef = useRef(null);

  // Feature: Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Feature: Get cursor coords relative to SVG
  const getCoords = (e) => {
    const r = svgRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  // Feature: Start drawing a new shape
  const handleMouseDown = (e) => {
    const { x, y } = getCoords(e);
    setIsDrawing(true);

    if (tool === "rect") {
      setCurrentShape({ type: "rect", x, y, width: 0, height: 0, fill, stroke, strokeWidth });
    } else if (tool === "circle") {
      setCurrentShape({ type: "circle", cx: x, cy: y, r: 0, fill, stroke, strokeWidth });
    } else if (tool === "line") {
      setCurrentShape({ type: "line", x1: x, y1: y, x2: x, y2: y, stroke, strokeWidth });
    } else if (tool === "pen") {
      setCurrentShape({ type: "path", points: [{ x, y }], stroke, strokeWidth });
    }
  };

  // Feature: Update shape as mouse moves
  const handleMouseMove = (e) => {
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
    } else if (currentShape.type === "path") {
      setCurrentShape({ ...currentShape, points: [...currentShape.points, { x, y }] });
    }
  };

  // Feature: Finalize and save shape
  const handleMouseUp = () => {
    if (currentShape) {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
    }
    setIsDrawing(false);
  };

  // Feature: Clear all shapes
  const clearCanvas = () => {
    setShapes([]);
    setCurrentShape(null);
  };

  // Feature: Undo last shape
  const undo = () => {
    setShapes(shapes.slice(0, -1));
  };

  // Feature: Build SVG path string from points
  const pointsToPath = (points) => {
    if (points.length === 0) return "";
    return "M " + points.map((p) => `${p.x},${p.y}`).join(" L ");
  };

  // Feature: Render single shape
  const renderShape = (s, key) => {
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
        />
      );
    }
    if (s.type === "path") {
      return (
        <path
          key={key}
          d={pointsToPath(s.points)}
          fill="none"
          stroke={s.stroke}
          strokeWidth={s.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      );
    }
  };

  // Feature: Export current canvas as SVG file
  const exportSVG = () => {
    const svg = svgRef.current;
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

  return (
    <div className="svg-wrapper">
      {/* HERO SECTION */}
      <div className="svg-hero">
        <div className="svg-tech">
          {TECH_STACK.map((t, i) => (
            <span key={t} className="svg-tech-item">
              {t}
              {i < TECH_STACK.length - 1 && <span className="svg-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="svg-title">SVG Editor</h1>
        <p className="svg-subtitle">
          A vector drawing tool with rectangle, circle, line and freehand pen. Export your work as a
          clean SVG file ready to use anywhere.
        </p>
      </div>

      {/* TOOL CARD */}
      <div className="svg-layout">
        {/* TOOLBAR */}
        <div className="svg-toolbar">
          {/* Tools */}
          <div className="svg-group">
            <label className="svg-label">
              Tool
              <Tooltip text="Pick what to draw. Click and drag on the canvas to create the shape." />
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

          {/* Fill */}
          {(tool === "rect" || tool === "circle") && (
            <div className="svg-group">
              <label className="svg-label">
                Fill
                <Tooltip text="Inside color of the shape." />
              </label>
              <ColorPicker value={fill} onChange={setFill} />
            </div>
          )}

          {/* Stroke */}
          <div className="svg-group">
            <label className="svg-label">
              Stroke
              <Tooltip text="Outline color of the shape." />
            </label>
            <ColorPicker value={stroke} onChange={setStroke} />
          </div>

          {/* Stroke width */}
          <div className="svg-group">
            <label className="svg-label">
              Stroke width — {strokeWidth}px
              <Tooltip text="How thick the outline is." />
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

          {/* Actions */}
          <div className="svg-group">
            <label className="svg-label">
              Actions
              <span className="svg-counter">
                {shapes.length} shape{shapes.length === 1 ? "" : "s"}
              </span>
            </label>
            <div className="svg-actions">
              <button className="svg-action" onClick={undo} disabled={shapes.length === 0}>
                Undo
              </button>
              <button className="svg-action" onClick={clearCanvas} disabled={shapes.length === 0}>
                Clear
              </button>
              <button
                className="svg-action svg-action-primary"
                onClick={exportSVG}
                disabled={shapes.length === 0}
              >
                Export SVG
              </button>
            </div>
          </div>
        </div>

        {/* CANVAS */}
        <div className="svg-canvas-wrap">
          <svg
            ref={svgRef}
            className="svg-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {shapes.map((s, i) => renderShape(s, i))}
            {currentShape && renderShape(currentShape, "current")}
          </svg>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="svg-how">
        <h2 className="svg-how-title">How it works</h2>
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
      <div className="svg-tech-note">
        Shapes are stored as <strong>plain SVG primitives</strong> — no canvas raster, no library,
        infinitely scalable output.
      </div>
    </div>
  );
}
