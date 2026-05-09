import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const projectsData = [
  { id: 'video-compressor', title: 'Video Compressor', desc: 'Client-side video compression using WebAssembly and FFmpeg without server interaction.', tech: ['React', 'WASM', 'FFmpeg']},
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
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>
    </div>
  );
}