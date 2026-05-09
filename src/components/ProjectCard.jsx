import { Link } from 'react-router-dom';
import './ProjectCard.css';

export default function ProjectCard ({ id, title, desc, tech}) {
    return (
        <Link to={`/projects/${id}`} className="project-card">
            <h3 className="project-title">{title}</h3>
            <p className="project-desc">{desc}</p>

            <div className="tech-stack">
                {tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                ))}
            </div>
        </Link>
    );
}