import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import "./Projects.css";

// Feature: Render preview visualization based on project type
function ProjectPreview({ type }) {
  const { t } = useLang();

  // Feature: Video Compressor — large video frames with play icon
  if (type === "video") {
    return (
      <div className="preview-frame preview-video">
        <div className="preview-video-row">
          <div className="preview-video-card">
            <div className="preview-video-thumb preview-video-thumb-big">
              <svg viewBox="0 0 24 24" className="preview-video-play">
                <polygon points="9,6 9,18 18,12" fill="#ffffff" />
              </svg>
            </div>
            <span className="preview-video-size">120 MB</span>
          </div>
          <span className="preview-video-arrow">→</span>
          <div className="preview-video-card">
            <div className="preview-video-thumb preview-video-thumb-small">
              <svg viewBox="0 0 24 24" className="preview-video-play">
                <polygon points="9,6 9,18 18,12" fill="#ffffff" />
              </svg>
            </div>
            <span className="preview-video-size preview-video-size-saved">12 MB</span>
          </div>
        </div>
        <div className="preview-video-bar">
          <div className="preview-video-progress" />
        </div>
      </div>
    );
  }

  // Feature: Audio Extractor — video icon → waveform conversion
  if (type === "audio") {
    return (
      <div className="preview-frame preview-audio">
        <div className="preview-audio-video">
          <svg viewBox="0 0 24 24" className="preview-audio-play">
            <polygon points="9,6 9,18 18,12" fill="#ffffff" />
          </svg>
        </div>
        <span className="preview-audio-arrow">→</span>
        <div className="preview-audio-wave">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="preview-audio-wave-bar"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Feature: Color Palette — framed mini-artwork with 5 dominant areas, ordered by area
  if (type === "palette") {
    // Colors ordered by visual prominence (largest area first)
    const orderedColors = ["#FF6B6B", "#A78BFA", "#4ECDC4", "#06B6D4", "#FFE66D"];
    return (
      <div className="preview-frame preview-palette">
        <div className="preview-palette-art">
          <svg viewBox="0 0 200 100" className="preview-palette-svg" preserveAspectRatio="none">
            {/* Sky (large) */}
            <rect x="0" y="0" width="200" height="55" fill="#A78BFA" />
            {/* Sun (smallest) */}
            <circle cx="155" cy="32" r="14" fill="#FFE66D" />
            {/* Far mountains */}
            <polygon points="0,55 50,25 100,55" fill="#06B6D4" />
            {/* Near mountains */}
            <polygon points="60,55 110,18 165,55" fill="#4ECDC4" />
            {/* Ground (largest at bottom) */}
            <rect x="0" y="55" width="200" height="45" fill="#FF6B6B" />
          </svg>
        </div>
        <div className="preview-palette-row">
          {orderedColors.map((c, i) => (
            <div
              key={c}
              className="preview-palette-swatch"
              style={{ background: c, animationDelay: `${i * 0.12}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Feature: CSS Toolkit — 5 mini thumbnails with corner abbreviation labels
  if (type === "css") {
    const CSS_THUMBS = [
      { id: "gradient", label: "GR" },
      { id: "shadow", label: "BS" },
      { id: "glass", label: "GM" },
      { id: "radius", label: "BR" },
      { id: "filter", label: "FT" },
    ];

    return (
      <div className="preview-frame preview-css">
        {CSS_THUMBS.map((thumb, i) => (
          <div
            key={thumb.id}
            className={`preview-css-thumb preview-css-${thumb.id}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {thumb.id === "glass" && <div className="preview-css-glass-inner" />}
            <span className="preview-css-label">{thumb.label}</span>
          </div>
        ))}
      </div>
    );
  }

  // Feature: Markdown Editor — split source / preview view
  if (type === "markdown") {
    return (
      <div className="preview-frame preview-markdown">
        <div className="preview-markdown-pane preview-markdown-source">
          <span className="preview-markdown-label">{t("md_label_source")}</span>
          <div className="preview-markdown-content">
            <span className="preview-md-line">
              <span className="preview-md-token">#</span> Title
            </span>
            <span className="preview-md-line">
              <span className="preview-md-token">**</span>bold
              <span className="preview-md-token">**</span>
            </span>
            <span className="preview-md-line">
              <span className="preview-md-token">-</span> item
            </span>
          </div>
        </div>
        <div className="preview-markdown-divider" />
        <div className="preview-markdown-pane preview-markdown-preview">
          <span className="preview-markdown-label">{t("md_label_preview")}</span>
          <div className="preview-markdown-content">
            <span className="preview-md-h">Title</span>
            <span className="preview-md-b">bold</span>
            <span className="preview-md-li">• item</span>
          </div>
        </div>
      </div>
    );
  }

  // Feature: SVG Editor — cursor draws rectangle, clicks, recolors it
  if (type === "svg") {
    return (
      <div className="preview-frame preview-svg">
        <svg viewBox="0 0 240 120" className="preview-svg-canvas">
          <defs>
            <pattern id="svg-preview-grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path
                d="M 16 0 L 0 0 0 16"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="240" height="120" fill="url(#svg-preview-grid)" />

          {/* Static circle */}
          <circle cx="180" cy="60" r="22" fill="#10B981" stroke="#ffffff" strokeWidth="1.5" />

          {/* Static line */}
          <line x1="40" y1="100" x2="200" y2="105" stroke="#ffffff" strokeWidth="2" />

          {/* Rectangle being drawn and recolored — width animated */}
          <rect className="preview-svg-rect" x="40" y="25" height="48" rx="2" />

          {/* Animated cursor */}
          <g className="preview-svg-cursor">
            <path
              d="M 0 0 L 0 14 L 4 11 L 7 16 L 9 15 L 6 10 L 11 10 Z"
              fill="#ffffff"
              stroke="#000000"
              strokeWidth="0.5"
            />
          </g>
        </svg>
      </div>
    );
  }

  return null;
}

export default function Projects() {
  const { t } = useLang();

  // Feature: All projects with translated metadata
  const PROJECTS_T = [
    {
      id: "video-compressor",
      tag: "Media Tool · WebAssembly",
      title: "Video Compressor",
      desc: t("proj_video_long"),
      tech: ["React", "FFmpeg WASM", "Web APIs"],
      preview: "video",
    },
    {
      id: "audio-extractor",
      tag: "Media Tool · WebAssembly",
      title: "Audio Extractor",
      desc: t("proj_audio_long"),
      tech: ["React", "FFmpeg WASM", "Audio"],
      preview: "audio",
    },
    {
      id: "color-palette",
      tag: "Image Tool · Canvas API",
      title: "Color Palette",
      desc: t("proj_palette_long"),
      tech: ["React", "Canvas", "Color Math"],
      preview: "palette",
    },
    {
      id: "css-toolkit",
      tag: "CSS Tools · Generators",
      title: "CSS Toolkit",
      desc: t("proj_toolkit_long"),
      tech: ["React", "CSS", "Generators"],
      preview: "css",
    },
    {
      id: "markdown-editor",
      tag: "Text Editor · React",
      title: "Markdown Editor",
      desc: t("proj_markdown_long"),
      tech: ["React", "Regex", "Storage"],
      preview: "markdown",
    },
    {
      id: "svg-editor",
      tag: "Drawing Tool · SVG",
      title: "SVG Editor",
      desc: t("proj_svg_long"),
      tech: ["React", "SVG", "DOMParser"],
      preview: "svg",
    },
  ];

  return (
    <div className="projects-page">
      {/* HERO */}
      <div className="projects-hero">
        <p className="projects-eyebrow">{t("projects_eyebrow")}</p>
        <h1 className="projects-title">{t("projects_title")}</h1>
        <p className="projects-subtitle">{t("projects_subtitle")}</p>
      </div>

      {/* GRID */}
      <div className="projects-grid">
        {PROJECTS_T.map((proj) => {
          return (
            <Link key={proj.id} to={`/projects/${proj.id}`} className="projects-card">
              {/* PREVIEW */}
              <div className="projects-card-preview">
                <ProjectPreview type={proj.preview} />
              </div>

              {/* CONTENT */}
              <div className="projects-card-content">
                <p className="projects-card-tag">{proj.tag}</p>
                <h3 className="projects-card-title">{proj.title}</h3>
                <p className="projects-card-desc">{proj.desc}</p>

                <div className="projects-card-footer">
                  <div className="projects-card-tech">
                    {proj.tech.map((tech) => (
                      <span key={tech} className="projects-card-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="projects-card-arrow">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
