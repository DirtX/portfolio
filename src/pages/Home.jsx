import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const FULL_NAME = 'Yaroslav Horbatiuk';

export default function Home() {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(FULL_NAME.slice(0, i + 1));
      i++;
      if (i === FULL_NAME.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <p className="home-greeting">Available for work · Prague</p>
      <h1 className="home-name">
        {displayed}
        {!done && <span className="home-cursor" />}
      </h1>
      <p className="home-role">Frontend Developer &amp; Designer.</p>
      <p className="home-description">
        Translating visual concepts into clean, functional code.
        Bridging the gap between pixel-perfect design and responsive web experiences.
      </p>
      <div className="home-actions">
        <Link to="/projects" className="home-btn-primary">View Projects</Link>
        
          <a href="/Horbatiuk_CV.pdf"
          download
          className="home-btn-secondary"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}