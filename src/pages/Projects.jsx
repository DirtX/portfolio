import { Link } from 'react-router-dom';
import './Projects.css';

const projectsData = [
  { id: 'weather-app', title: 'Weather App', desc: 'Real-time weather data fetching with async/await.', tech: ['React', 'API', 'CSS'] },
  { id: 'kanban', title: 'Kanban Board', desc: 'Drag-and-drop task management.', tech: ['React', 'State', 'DnD'] },
  { id: 'converter', title: 'Currency Converter', desc: 'Live exchange rates and UI logic.', tech: ['JavaScript', 'DOM'] }
];

export default function Projects() {
  return (
    <div className="projects-container">
      <h2 className="projects-title">Selected Works.</h2>
      <div className="projects-grid">
        {projectsData.map(proj => (
          <Link to={`/projects/${proj.id}`} key={proj.id} className="project-card">
            <h3 className="project-title">{proj.title}</h3>
            <p className="project-desc">{proj.desc}</p>
            <div className="tech-stack">
              {proj.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}