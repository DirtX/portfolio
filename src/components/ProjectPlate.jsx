import "./ProjectPlate.css";

// Feature: Monochrome line-art "plates", like illustrations in a reference book.
// Colour appears only on hover, and only where it means something (palette, svg).
// Elements with the "pa" class animate on hover (always on touch devices), see ProjectPlate.css.

// Palette plate: colours ordered by area in the picture (sky, ground, near hill, far hill, sun)
const PALETTE = ["#A78BFA", "#FF6B6B", "#4ECDC4", "#06B6D4", "#FFE66D"];
// Grey stand-ins with roughly matching lightness, shown until hover
const PALETTE_GREY = ["#3a3a3a", "#2a2a2a", "#4a4a4a", "#333333", "#8a8a8a"];
const tint = (i) => ({ "--grey": PALETTE_GREY[i], "--swatch": PALETTE[i], "--i": i });

// Small arrow used between "before" and "after" in several plates
function Arrow({ x1, x2, y }) {
  return (
    <g className="plate-arrow">
      <line x1={x1} y1={y} x2={x2} y2={y} className="pa pa-flow" />
      <polyline points={`${x2 - 6},${y - 5} ${x2},${y} ${x2 - 6},${y + 5}`} />
    </g>
  );
}

// Film frame with sprocket holes along top and bottom edges
function FilmFrame({ x, y, w, h, holes }) {
  const step = w / holes;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" className="plate-line" />
      {Array.from({ length: holes }, (_, i) => (
        <g key={i} className="plate-fill-faint">
          <rect x={x + step * i + step / 2 - 2} y={y + 4} width="4" height="3" />
          <rect x={x + step * i + step / 2 - 2} y={y + h - 7} width="4" height="3" />
        </g>
      ))}
      <polygon
        points={`${x + w / 2 - 6},${y + h / 2 - 8} ${x + w / 2 - 6},${y + h / 2 + 8} ${x + w / 2 + 8},${y + h / 2}`}
        className="plate-fill"
      />
    </g>
  );
}

const PLATES = {
  video: {
    caption: "120 MB → 12 MB",
    art: (
      <>
        <g className="pa pa-squeeze">
          <FilmFrame x={70} y={46} w={170} h={100} holes={10} />
        </g>
        <text x="155" y="170" className="plate-label">
          120 MB
        </text>
        <Arrow x1={262} x2={318} y={96} />
        <g className="pa pa-pop">
          <FilmFrame x={340} y={70} w={80} h={50} holes={5} />
        </g>
        <text x="380" y="144" className="plate-label plate-label--strong">
          12 MB
        </text>
      </>
    ),
  },

  audio: {
    caption: "MP4 → MP3 · M4A · WAV",
    art: (
      <>
        <FilmFrame x={70} y={56} w={130} h={80} holes={8} />
        <Arrow x1={222} x2={278} y={96} />
        <g className="plate-wave">
          {[14, 30, 52, 22, 64, 40, 18, 58, 34, 70, 26, 48, 60, 20, 44, 30, 54, 16, 36, 24].map(
            (h, i) => (
              <line
                key={i}
                x1={300 + i * 6}
                x2={300 + i * 6}
                y1={96 - h / 2}
                y2={96 + h / 2}
                className="pa pa-bar"
                style={{ "--i": i }}
              />
            )
          )}
        </g>
      </>
    ),
  },

  palette: {
    caption: "image → 5 × HEX",
    art: (
      <>
        {/* Picture: each region is filled with one of the extracted colours (grey until hover) */}
        <g className="plate-picture">
          <rect x="70" y="36" width="170" height="70" className="plate-tint" style={tint(0)} />
          <polygon points="70,106 120,62 170,106" className="plate-tint" style={tint(3)} />
          <polygon points="130,106 185,52 240,106" className="plate-tint" style={tint(2)} />
          <rect x="70" y="106" width="170" height="50" className="plate-tint" style={tint(1)} />
          <circle cx="208" cy="66" r="11" className="plate-tint" style={tint(4)} />
          <rect x="70" y="36" width="170" height="120" rx="3" className="plate-line" />
        </g>

        <Arrow x1={258} x2={300} y={96} />

        {/* Extracted palette: swatch + hex code, largest area first */}
        {PALETTE.map((c, i) => (
          <g key={c}>
            <rect
              x="318"
              y={38 + i * 24}
              width="18"
              height="18"
              rx="3"
              className="plate-tint plate-swatch"
              style={tint(i)}
            />
            <text x="346" y={51 + i * 24} className="plate-hex">
              {c}
            </text>
          </g>
        ))}
      </>
    ),
  },

  css: {
    caption: "gradient · shadow · glass · radius · filter",
    art: (
      <>
        <defs>
          <linearGradient id="plate-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
          <filter id="plate-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.9" />
          </filter>
          <filter id="plate-blur">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <pattern id="plate-stripes" width="6" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="6" x2="6" y2="0" className="plate-line-faint" />
          </pattern>
        </defs>
        {/* gradient */}
        <g className="pa pa-bob" style={{ "--i": 0 }}>
          <rect x="58" y="66" width="56" height="56" rx="6" fill="url(#plate-grad)" />
        </g>
        {/* box-shadow */}
        <g className="pa pa-bob" style={{ "--i": 1 }}>
          <rect
            x="138"
            y="66"
            width="56"
            height="56"
            rx="6"
            className="plate-surface"
            filter="url(#plate-shadow)"
          />
        </g>
        {/* glassmorphism */}
        <g className="pa pa-bob" style={{ "--i": 2 }}>
          <rect x="218" y="66" width="56" height="56" rx="6" fill="url(#plate-stripes)" />
          <rect x="226" y="74" width="40" height="40" rx="6" className="plate-glass" />
        </g>
        {/* border-radius */}
        <g className="pa pa-bob" style={{ "--i": 3 }}>
          <path
            d="M298 94 C298 66, 330 60, 346 72 C358 82, 356 122, 330 122 L306 122 C300 122, 298 112, 298 94 Z"
            className="plate-line"
          />
        </g>
        {/* filter */}
        <g className="pa pa-bob" style={{ "--i": 4 }}>
          <rect
            x="378"
            y="66"
            width="56"
            height="56"
            rx="6"
            className="plate-fill"
            filter="url(#plate-blur)"
            opacity="0.6"
          />
        </g>
      </>
    ),
  },

  markdown: {
    caption: "Markdown → HTML",
    art: (
      <>
        <line x1="240" y1="30" x2="240" y2="162" className="plate-line-faint" />
        <g className="plate-mono">
          <text x="92" y="70">
            <tspan className="plate-token"># </tspan>Title
          </text>
          <text x="92" y="100">
            <tspan className="plate-token">**</tspan>bold<tspan className="plate-token">**</tspan>
          </text>
          <text x="92" y="130">
            <tspan className="plate-token">- </tspan>item
          </text>
        </g>
        <rect x="146" y="117" width="1.5" height="17" className="plate-fill pa pa-caret" />
        <text x="272" y="72" className="plate-serif-title pa pa-render" style={{ "--i": 0 }}>
          Title
        </text>
        <text
          x="272"
          y="100"
          className="plate-text plate-text--bold pa pa-render"
          style={{ "--i": 1 }}
        >
          bold
        </text>
        <text x="272" y="130" className="plate-text pa pa-render" style={{ "--i": 2 }}>
          • item
        </text>
      </>
    ),
  },

  svg: {
    caption: "<rect> <circle> <path>",
    art: (
      <>
        <defs>
          <pattern id="plate-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" className="plate-fill-faint" />
          </pattern>
        </defs>
        <rect x="40" y="16" width="400" height="160" fill="url(#plate-dots)" />
        {/* selected rectangle with handles */}
        <rect x="88" y="44" width="126" height="86" className="pa pa-ants" />
        <rect x="96" y="52" width="110" height="70" rx="2" className="plate-line plate-svg-shape" />
        {[
          [96, 52],
          [151, 52],
          [206, 52],
          [96, 87],
          [206, 87],
          [96, 122],
          [151, 122],
          [206, 122],
        ].map(([x, y]) => (
          <rect
            key={`${x}-${y}`}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            className="plate-handle"
          />
        ))}
        {/* circle */}
        <circle
          cx="290"
          cy="80"
          r="30"
          className="plate-line plate-svg-shape plate-svg-shape--alt"
        />
        {/* bezier with control handles */}
        <path d="M250 150 C290 110, 350 190, 390 140" className="plate-line" />
        <line x1="250" y1="150" x2="290" y2="110" className="plate-line-faint" />
        <line x1="390" y1="140" x2="350" y2="190" className="plate-line-faint" />
        <circle cx="290" cy="110" r="3" className="plate-fill pa pa-handle" />
        <circle cx="350" cy="190" r="3" className="plate-fill pa pa-handle" style={{ "--i": 1 }} />
        <rect x="247" y="147" width="6" height="6" className="plate-handle" />
        <rect x="387" y="137" width="6" height="6" className="plate-handle" />
      </>
    ),
  },
};

export default function ProjectPlate({ type, figure, figLabel }) {
  const plate = PLATES[type];
  if (!plate) return null;

  return (
    <figure className={`plate plate--${type}`}>
      <svg viewBox="0 0 480 192" className="plate-svg" aria-hidden="true">
        {plate.art}
      </svg>
      <figcaption className="plate-caption">
        <span className="plate-fig">
          {figLabel} {figure}
        </span>
        <span className="plate-caption-text">{plate.caption}</span>
      </figcaption>
    </figure>
  );
}
