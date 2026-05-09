import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const projectsData = [
  { id: 'video-compressor', title: 'Video Compressor', desc: 'Client-side video compression using WebAssembly and FFmpeg without server interaction.', tech: ['React', 'WASM', 'FFmpeg']},
  { id: 'color-palette', title: 'Color Palette Generator', desc: 'Extract dominant colors from any image instantly.', tech: ['React', 'Canvas API', 'CSS']}
];

export default function Projects() {
  return (
    <div className="projects-container">
      <h2 className="page-header">Selected Works.</h2>
      <div className="projects-grid">
        {projectsData.map(proj => (
          <ProjectCard key={proj.id} {...proj} />
        ))}
      </div>
    </div>
  );
}