import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import figmaLogo from "../assets/figma-logo.svg";
import { useLang } from "../context/LanguageContext";
import { useModal } from "../context/ModalContext";
import SocialIcons from "../components/SocialIcons";

import "./Home.css";

const FULL_NAME = "Yaroslav Horbatiuk";

export default function Home() {
  const { t, lang } = useLang();
  const { openContactModal } = useModal();

  const projects = [
    {
      id: "video-compressor",
      tag: "Media Tool · WebAssembly",
      title: "Video Compressor",
      desc: t("proj_video_desc"),
      tech: ["React", "WASM", "FFmpeg"],
    },
    {
      id: "color-palette",
      tag: "Image Tool · Canvas API",
      title: "Color Palette",
      desc: t("proj_palette_desc"),
      tech: ["React", "Canvas"],
    },
    {
      id: "css-toolkit",
      tag: "CSS Tools · Generators",
      title: "CSS Toolkit",
      desc: t("proj_toolkit_desc"),
      tech: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: "markdown-editor",
      tag: t("proj_markdown_tag"),
      title: "Markdown Editor",
      desc: t("proj_markdown_desc"),
      tech: ["React", "Regex", "localStorage"],
    },
    {
      id: "svg-editor",
      tag: "Drawing Tool · SVG",
      title: "SVG Editor",
      desc: t("proj_svg_desc"),
      tech: ["React", "SVG", "Vector"],
    },
    {
      id: "audio-extractor",
      tag: "Media Tool · WebAssembly",
      title: "Audio Extractor",
      desc: t("proj_audio_desc"),
      tech: ["React", "WASM", "FFmpeg"],
    },
  ];

  const skills = [
    { icon: "⚛\uFE0E", name: "React", level: t("skill_intermediate") },
    { icon: "{ }", name: "HTML / CSS", level: t("skill_confident") },
    { icon: "JS", name: "JavaScript", level: t("skill_confident") },
    { icon: "F", name: "Figma", level: t("skill_confident") },
    { icon: "Ps", name: "Photoshop", level: t("skill_confident") },
    { icon: "Ai", name: "Illustrator", level: t("skill_intermediate") },
  ];

  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const spotlightRef = useRef(null);
  const angleRef = useRef(0);
  const curX = useRef(50);
  const curY = useRef(50);
  const mouseX = useRef(50);
  const mouseY = useRef(50);
  const isHovering = useRef(false);

  // Feature: Typewriter
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
      el.style.background = `radial-gradient(circle 400px at ${curX.current}% ${curY.current}%, rgba(255,255,255,0.06) 0%, transparent 65%)`;
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e) => {
    mouseX.current = (e.clientX / window.innerWidth) * 100;
    mouseY.current = (e.clientY / window.innerHeight) * 100;
    isHovering.current = true;
  };

  // Feature: Scroll reveal
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
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
  const resetTilt = (e) => {
    e.currentTarget.style.transform = "";
  };

  const loopedProjects = [...projects, ...projects];

  return (
    <div
      className="home-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        isHovering.current = false;
      }}
    >
      <div className="home-spotlight" ref={spotlightRef} />

      {/* HERO SECTION */}
      <section className="home-hero">
        <p className="home-eyebrow">{t("hero_eyebrow")}</p>
        <h1 className="home-name">
          {displayed}
          {!done && <span className="home-cursor" />}
        </h1>
        <p className="home-role">{t("hero_role")}</p>
        <p className="home-description">{t("hero_desc")}</p>
        <div className="home-actions">
          <Link to="/projects" className="home-btn-primary">
            {t("hero_btn_projects")}
          </Link>
          <a
            href={lang === "cs" ? "/Horbatiuk_CV_CS.pdf" : "/Horbatiuk_CV_EN.pdf"}
            download
            className="home-btn-secondary"
          >
            {t("hero_btn_cv")}
          </a>
        </div>
      </section>

      {/* STATS SECTION */}
      <div className="home-stats">
        <div className="home-stat">
          <span className="home-stat-num">4+</span>
          <span className="home-stat-label">{t("stat_years")}</span>
        </div>
        <div className="home-stat">
          <span className="home-stat-num">20+</span>
          <span className="home-stat-label">{t("stat_projects")}</span>
        </div>
      </div>

      {/* LANGUAGES SECTION */}
      <div className="home-languages">
        <span className="lang-item">
          <span className="lang-code">EN</span>
          <span className="lang-level">{t("lang_en")}</span>
        </span>
        <span className="lang-dot">·</span>
        <span className="lang-item">
          <span className="lang-code">UA</span>
          <span className="lang-level">{t("lang_ua")}</span>
        </span>
        <span className="lang-dot">·</span>
        <span className="lang-item">
          <span className="lang-code">CZ</span>
          <span className="lang-level">{t("lang_cz")}</span>
        </span>
      </div>

      {/* SKILLS SECTION */}
      <section className="home-skills reveal">
        <p className="home-eyebrow">{t("skills_eyebrow")}</p>
        <h2 className="home-section-title">{t("skills_title")}</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className="skill-card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="skill-badge">
                {s.icon === "F" ? (
                  <img className="figma-logo" src={figmaLogo} alt="Figma" />
                ) : (
                  s.icon
                )}
              </div>
              <div className="skill-info">
                <span className="skill-name">{s.name}</span>
                <span className="skill-level">{s.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="home-projects" id="projects">
        <div className="home-projects-header">
          <p className="home-eyebrow">{t("projects_eyebrow")}</p>
          <h2 className="home-section-title">{t("projects_title")}</h2>
        </div>
        <div className="carousel-wrap">
          <div className="carousel">
            {loopedProjects.map((p, idx) => (
              <Link
                to={`/projects/${p.id}`}
                key={`${p.id}-${idx}`}
                className="proj-card"
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <span className="proj-arrow">↗</span>
                <p className="proj-tag">{p.tag}</p>
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tech">
                  {p.tech.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + CONTACT SECTION */}
      <section className="home-split">
        <div className="home-about reveal" id="about">
          <p className="home-eyebrow">{t("about_eyebrow")}</p>
          <h2 className="home-section-title">{t("about_title")}</h2>
          <p className="home-about-p">{t("about_p1")}</p>
          <p className="home-about-p">{t("about_p2")}</p>
          <p className="home-about-p">{t("about_p3")}</p>
          <p className="home-about-p">{t("about_p4")}</p>
        </div>
        <div className="home-contact reveal" id="contact">
          <p className="home-eyebrow">{t("contact_eyebrow")}</p>
          <h2 className="home-section-title">{t("contact_title")}</h2>
          <div className="contact-rows">
            <a
              href="mailto:horbatyuk.yaroslav03@gmail.com"
              className="contact-row contact-row-link"
            >
              <span className="c-label">{t("contact_email")}</span>
              <span className="c-value">horbatyuk.yaroslav03@gmail.com</span>
            </a>
            <a href="tel:+420739984652" className="contact-row contact-row-link">
              <span className="c-label">{t("contact_phone")}</span>
              <span className="c-value">+420 739 984 652</span>
            </a>
            <div className="contact-row">
              <span className="c-label">{t("contact_location")}</span>
              <span className="c-value">{t("contact_location_val")}</span>
            </div>
            <div className="contact-row">
              <span className="c-label">{t("contact_languages")}</span>
              <span className="c-value">EN · UA · CZ</span>
            </div>
            <div className="contact-row contact-row-social">
              <span className="c-label">{t("sidebar_find_me") || "Find me"}</span>
              <SocialIcons onMessageClick={openContactModal} className="social-icons-mobile-only" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="home-footer">
        <span className="footer-text">© 2026 Yaroslav Horbatiuk</span>
        <SocialIcons
          onMessageClick={openContactModal}
          className="social-icons-mobile-only social-icons-footer"
        />
        <span className="footer-text">{t("footer_built")}</span>
      </footer>
    </div>
  );
}
