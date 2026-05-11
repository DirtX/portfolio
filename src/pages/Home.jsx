import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const FULL_NAME = 'Yaroslav Horbatiuk';

const skills = [
  { icon: '⚛', name: 'React', level: 'Intermediate' },
  { icon: '{ }', name: 'HTML / CSS', level: 'Confident' },
  { icon: 'JS', name: 'JavaScript', level: 'Confident' },
  { icon: '◈', name: 'Figma', level: 'Confident' },
  { icon: 'Ps', name: 'Photoshop', level: 'Confident' },
  { icon: 'Ai', name: 'Illustrator', level: 'Intermediate' },
];

const projects = [
  { id: 'video-compressor', tag: 'WebAssembly · FFmpeg', title: 'Video Compressor', desc: 'Client-side video compression without any server interaction.', tech: ['React', 'WASM', 'FFmpeg'] },
  { id: 'color-palette', tag: 'Canvas API', title: 'Color Palette', desc: 'Extract dominant colors from any image instantly.', tech: ['React', 'Canvas'] },
];

export default function Home() {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const carouselRef = useRef(null);
  const spotlightRef = useRef(null);
  const isGrabbing = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const angleRef = useRef(0);
  const curX = useRef(50);
  const curY = useRef(50);
  const mouseX = useRef(50);
  const mouseY = useRef(50);
  const isHovering = useRef(false);
  const isPaused = useRef(false);

  // Feature: Typewriter
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(FULL_NAME.slice(0, i + 1));
      i++;
      if (i === FULL_NAME.length) { clearInterval(interval); setDone(true); }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Feature: Spotlight
  useEffect(() => {
    const el = spotlightRef.current;
    if (!el) return;
    let raf;
    const animate = () => {
      angleRef.current += 0.004;
      if (!isHovering.current) {
        curX.current += (50 + Math.cos(angleRef.current) * 38 - curX.current) * 0.02;
        curY.current += (50 + Math.sin(angleRef.current * 0.6) * 32 - curY.current) * 0.02;
      } else {
        curX.current += (mouseX.current - curX.current) * 0.08;
        curY.current += (mouseY.current - curY.current) * 0.08;
      }
      el.style.background = `radial-gradient(circle 400px at ${curX.current}% ${curY.current}%, rgba(255,255,255,0.03) 0%, transparent 65%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.current = (e.clientX - r.left) / r.width * 100;
    mouseY.current = (e.clientY - r.top) / r.height * 100;
    isHovering.current = true;
  };

  // Feature:Carousel auto-scroll
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (isPaused.current || isGrabbing.current) return;
      el.scrollLeft += 0.4;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) el.scrollLeft = 0;
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const handleCarouselMouseDown = (e) => {
    isGrabbing.current = true;
    startX.current = e.pageX;
    scrollStart.current = carouselRef.current.scrollLeft;
  };
  const handleCarouselMouseMove = (e) => {
    if (!isGrabbing.current) return;
    carouselRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current);
  };
  const stopGrabbing = () => { isGrabbing.current = false; };

  // Feature:Scroll reveal
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Feature: Tilt on project cards
  const handleTilt = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-2px)`;
  };
  const resetTilt = (e) => { e.currentTarget.style.transform = ''; };

  return (
    <div
      className="home-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { isHovering.current = false; }}
    >
      <div className="home-spotlight" ref={spotlightRef} />

      {/* HERO SECTION */}
      <section className="home-hero">
        <p className="home-eyebrow">Available for work · Prague</p>
        <h1 className="home-name">
          {displayed}
          {!done && <span className="home-cursor" />}
        </h1>
        <p className="home-role">Frontend Developer & Designer.</p>
        <p className="home-description">
          Translating visual concepts into clean, functional code.
          Bridging design and engineering without friction.
        </p>
        <div className="home-actions">
          <Link to="/projects" className="home-btn-primary">View Projects</Link>
          <a href="/Horbatiuk_CV.pdf" download className="home-btn-secondary">Download CV</a>
          <a href="#" className="home-btn-secondary">Figma File ↗</a>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="home-stats">
        <div className="home-stat">
          <span className="home-stat-num">4+</span>
          <span className="home-stat-label">Years freelancing</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-num">20+</span>
          <span className="home-stat-label">Projects delivered</span>
        </div>
      </div>

      {/* LANGUAGES SECTION */}
      <div className="home-languages">
        <span className="lang-item"><span className="lang-code">EN</span><span className="lang-level">Upper Intermediate</span></span>
        <span className="lang-dot">·</span>
        <span className="lang-item"><span className="lang-code">UA</span><span className="lang-level">Native</span></span>
        <span className="lang-dot">·</span>
        <span className="lang-item"><span className="lang-code">CZ</span><span className="lang-level">Beginner</span></span>
      </div>

      {/* SKILLS SECTION */}
      <section className="home-skills reveal">
        <p className="home-eyebrow">Expertise</p>
        <h2 className="home-section-title">What I work with.</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={s.name} className="skill-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="skill-icon">{s.icon}</span>
              <span className="skill-name">{s.name}</span>
              <span className="skill-level">{s.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="home-projects" id="projects">
        <div className="home-projects-header">
          <p className="home-eyebrow">Selected Works</p>
          <h2 className="home-section-title">Things I've built.</h2>
        </div>
        <div className="carousel-wrap">
          <div
            className="carousel"
            ref={carouselRef}
            onMouseEnter={() => { isPaused.current = true; }}
            onMouseLeave={() => { isPaused.current = false; stopGrabbing(); }}
            onMouseDown={handleCarouselMouseDown}
            onMouseMove={handleCarouselMouseMove}
            onMouseUp={stopGrabbing}
          >
            {projects.map(p => (
              <Link
                to={`/projects/${p.id}`}
                key={p.id}
                className="proj-card"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <span className="proj-arrow">↗</span>
                <p className="proj-tag">{p.tag}</p>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tech">
                  {p.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + CONTACT SECTION */}
      <section className="home-split">
        <div className="home-about reveal" id="about">
          <p className="home-eyebrow">About</p>
          <h2 className="home-section-title">Who I am.</h2>
          <p className="home-about-p">Frontend developer with 4 years of freelance experience building responsive websites and interfaces.</p>
          <p className="home-about-p">My background in UI/UX design gives me an edge — I can go from mockup to working code without handoff friction.</p>
          <p className="home-about-p">Based in Czech Republic, available to relocate to Prague.</p>
        </div>
        <div className="home-contact reveal" id="contact">
          <p className="home-eyebrow">Get in touch</p>
          <h2 className="home-section-title">Let's talk.</h2>
          <div className="contact-rows">
            <div className="contact-row"><span className="c-label">Email</span><span className="c-value">ggdirtxgg@gmail.com</span></div>
            <div className="contact-row"><span className="c-label">Phone</span><span className="c-value">+420 739 984 652</span></div>
            <div className="contact-row"><span className="c-label">Location</span><span className="c-value">Kolín → Prague</span></div>
            <div className="contact-row"><span className="c-label">Languages</span><span className="c-value">EN · UA · CZ</span></div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="home-footer">
        <span className="footer-text">© 2026 Yaroslav Horbatiuk</span>
        <span className="footer-text">Built with React</span>
      </footer>
    </div>
  );
}