import { Link } from 'react-router-dom';
import './ProjectCard.css';

export default function ProjectCard ({ id, title, desc, tech}) {
    return (
        <Link to={`/projects/${id}`} className="project-card">
            <div className="project-card-header">
                <h3 className="project-title">{title}</h3>
                <span className="project-arrow">→</span>
            </div>

            <p className="project-desc">{desc}</p>
            <div className="tech-stack">
                {tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                ))}
            </div>
        </Link>
    );
}