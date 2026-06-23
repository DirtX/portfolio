import { useState, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";
import GradientGenerator from "./CSSToolkit/GradientGenerator";
import BoxShadowGenerator from "./CSSToolkit/BoxShadowGenerator";
import GlassmorphismGenerator from "./CSSToolkit/GlassmorphismGenerator";
import BorderRadiusGenerator from "./CSSToolkit/BorderRadiusGenerator";
import FilterGenerator from "./CSSToolkit/FilterGenerator";
import "./CSSToolkit.css";
import BackButton from "../../components/BackButton";

const TECH_STACK = ["CSS", "React", "Generators"];

export default function CSSToolkit() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("gradient");

  const TABS = [
    { id: "gradient", label: "Gradient", subtitle: t("ct_sub_gradient") },
    { id: "shadow", label: "Box Shadow", subtitle: t("ct_sub_shadow") },
    { id: "glassmorphism", label: "Glassmorphism", subtitle: t("ct_sub_glass") },
    { id: "border-radius", label: "Border Radius", subtitle: t("ct_sub_radius") },
    { id: "filter", label: "Filter", subtitle: t("ct_sub_filter") },
  ];

  // Feature: Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeSubtitle = TABS.find((tab) => tab.id === activeTab).subtitle;

  return (
    <div className="toolkit-wrapper">
      <BackButton />
      {/* HERO */}
      <div className="toolkit-hero">
        <div className="toolkit-tech">
          {TECH_STACK.map((tech, i) => (
            <span key={tech} className="toolkit-tech-item">
              {tech}
              {i < TECH_STACK.length - 1 && <span className="toolkit-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="toolkit-title">CSS Toolkit</h1>
        <p className="toolkit-subtitle">{activeSubtitle}</p>
      </div>

      {/* TABS */}
      <div className="toolkit-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`toolkit-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIVE TOOL */}
      <div className="toolkit-content">
        {activeTab === "gradient" && <GradientGenerator />}
        {activeTab === "shadow" && <BoxShadowGenerator />}
        {activeTab === "glassmorphism" && <GlassmorphismGenerator />}
        {activeTab === "border-radius" && <BorderRadiusGenerator />}
        {activeTab === "filter" && <FilterGenerator />}
      </div>
    </div>
  );
}
