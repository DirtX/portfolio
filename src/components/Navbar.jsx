import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">YH.</Link>
      <div className="nav-links">
        <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
        <button className="nav-link" onClick={() => scrollTo('projects')}>Projects</button>
        <button className="nav-link" onClick={() => scrollTo('contact')}>Contact</button>
      </div>
    </nav>
  );
}