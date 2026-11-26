import { Link } from "react-router-dom";
import "./FeaturedProjectCard.css";
import "./ProjectEntryCard.css";

const WAVE = [30, 55, 80, 45, 95, 65, 40, 85, 60, 35, 70, 50, 90, 45, 25];
// The site's own dominant colors (variables.css), lightest to darkest
const SWATCHES = ["#f5f5f5", "#a0a0a0", "#666666", "#333333", "#1a1a1a"];
const GUTTER = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

// Feature: Side rail, the per-project counterpart of the dictionary's thumb index
function EntryRail({ type }) {
  let content = null;

  if (type === "audio") {
    content = WAVE.map((w, i) => <span key={i} style={{ width: `${w}%` }} />);
  } else if (type === "palette") {
    content = SWATCHES.map((c) => <span key={c} style={{ background: c }} />);
  } else if (type === "markdown") {
    content = GUTTER.map((n) => <span key={n}>{n}</span>);
  } else if (type === "svg") {
    content = (
      <svg viewBox="0 0 24 200" preserveAspectRatio="none" fill="none">
        <path
          d="M12 8 C2 50, 22 70, 12 100 S2 160, 12 192"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        {[8, 100, 192].map((y) => (
          <rect key={y} x="9" y={y - 3} width="6" height="6" className="entry-rail-anchor" />
        ))}
      </svg>
    );
  }

  return (
    <div className={`entry-rail entry-rail--${type}`} aria-hidden="true">
      {content}
    </div>
  );
}

// Feature: Project card in the same "reference entry" language as the dictionary card
export default function ProjectEntryCard({ project, ...rest }) {
  const [category, tech] = project.tag.split(" · ");

  return (
    <Link to={`/projects/${project.id}`} className="dict-card entry-card" {...rest}>
      <div className="dict-body entry-body">
        {/* RUNNING HEAD */}
        <div className="dict-running-head">
          <span className="entry-category">{category}</span>
          <span className="dict-domain">
            {tech} <span className="card-arrow">→</span>
          </span>
        </div>

        {/* HEADWORD */}
        <h3 className="dict-headword entry-title">{project.title}</h3>

        {/* DEFINITION */}
        <p className="entry-desc">{project.long}</p>

        {/* TECH */}
        <div className="dict-tech">
          {project.tech.map((t) => (
            <span key={t} className="dict-pill">
              {t}
            </span>
          ))}
        </div>
      </div>

      <EntryRail type={project.preview} />
    </Link>
  );
}
