import { useLang } from "../context/LanguageContext";
import { FEATURED_PROJECT as P } from "../data/projects";
import "./FeaturedProjectCard.css";

const THUMB_INDEX = ["A", "B", "Č", "D", "H", "K", "M", "P", "Ř", "S", "T", "Ž"];

// Feature: Flagship project styled as a dictionary entry.
// variant "carousel" = Home carousel (two cards wide), "grid" = Projects page (full row)
export default function FeaturedProjectCard({ variant = "carousel", ...rest }) {
  const { t } = useLang();

  return (
    <a
      href={P.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`dict-card dict-card--${variant}`}
      {...rest}
    >
      <div className="dict-body">
        {/* RUNNING HEAD — like the top line of a dictionary page */}
        <div className="dict-running-head">
          <span className="dict-live">
            <span className="dict-live-dot" />
            {t("proj_dict_live")}
          </span>
          <span className="dict-domain">
            {P.domain} <span className="card-arrow card-arrow--out">↗</span>
          </span>
        </div>

        {/* HEADWORD */}
        <div className="dict-headline">
          <h3 className="dict-headword" aria-label={P.title}>
            {P.headword}
          </h3>
          <span className="dict-pos">{t("proj_dict_pos")}</span>
          <span className="dict-levels">A1–C2</span>
        </div>

        {/* SENSE + EXAMPLE */}
        <ol className="dict-senses">
          <li className="dict-sense">
            <p className="dict-def">
              {variant === "grid" ? t("proj_dict_long") : t("proj_dict_desc")}
            </p>
            <p className="dict-example">„Naše rodina bydlí ve velkém městě.“</p>
            <p className="dict-example-tr">— {t("proj_dict_example_tr")}</p>
          </li>
        </ol>

        {/* TECH */}
        <div className="dict-tech">
          {P.tech.map((tech) => (
            <span key={tech} className="dict-pill">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* KEY FIGURES — Projects page only, fills the wide card */}
      {variant === "grid" && (
        <aside className="dict-aside">
          {P.stats.map((s) => (
            <div key={s.key} className="dict-stat">
              <span className="dict-stat-num">{s.value}</span>
              <span className="dict-stat-label">{t(s.key)}</span>
            </div>
          ))}
        </aside>
      )}

      {/* THUMB INDEX — letter tabs on the edge of a printed dictionary */}
      <div className="dict-thumb" aria-hidden="true">
        {THUMB_INDEX.map((l) => (
          <span key={l} className={l === "S" ? "is-active" : undefined}>
            {l}
          </span>
        ))}
      </div>
    </a>
  );
}
