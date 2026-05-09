import './About.css';

export default function About() {
  return (
    <div className="page-placeholder">
      <h2 className="about-header">About Me.</h2>
      <div className="about-text-container">
        <p className="about-paragraph">
          Frontend developer with 4 years of freelance experience building responsive websites 
          and web interfaces. 
        </p>
        <p className="about-paragraph">
          My background in UI/UX design gives me an edge in translating visual concepts 
          into clean, functional code without handoff friction.
        </p>
        <p className="about-paragraph">
          Holds a Bachelor's degree in Information Measuring Technologies from 
          Igor Sikorsky Kyiv Polytechnic Institute.
        </p>
      </div>
    </div>
  );
}