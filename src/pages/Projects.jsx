import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import "./Projects.css";
import BackButton from "../components/BackButton";
import FeaturedProjectCard from "../components/FeaturedProjectCard";
import ProjectPlate from "../components/ProjectPlate";
import { getProjects } from "../data/projects";

export default function Projects() {
  const { t } = useLang();

  const projects = getProjects(t);

  return (
    <div className="projects-page">
      <BackButton to="/" />
      {/* HERO */}
      <div className="projects-hero">
        <p className="projects-eyebrow">{t("projects_eyebrow")}</p>
        <h1 className="projects-title">{t("projects_title")}</h1>
        <p className="projects-subtitle">{t("projects_subtitle")}</p>
      </div>

      {/* GRID */}
      <div className="projects-grid">
        {/* FLAGSHIP — full row */}
        <FeaturedProjectCard variant="grid" />

        {projects.map((proj, idx) => (
          <Link key={proj.id} to={`/projects/${proj.id}`} className="projects-card">
            {/* PLATE — numbered like book figures */}
            <ProjectPlate type={proj.preview} figure={idx + 1} figLabel={t("fig_label")} />

            {/* CONTENT */}
            <div className="projects-card-content">
              <div className="projects-card-head">
                <p className="projects-card-tag">{proj.tag}</p>
                <span className="projects-card-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <h3 className="projects-card-title">{proj.title}</h3>
              <p className="projects-card-desc">{proj.long}</p>

              <div className="projects-card-tech">
                {proj.tech.map((tech) => (
                  <span key={tech} className="projects-card-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
