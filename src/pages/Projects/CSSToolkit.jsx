import { useState, useEffect } from "react";
import GradientGenerator from "./CSSToolkit/GradientGenerator";
import BoxShadowGenerator from "./CSSToolkit/BoxShadowGenerator";
import GlassmorphismGenerator from "./CSSToolkit/GlassmorphismGenerator";
import BorderRadiusGenerator from "./CSSToolkit/BorderRadiusGenerator";
import FilterGenerator from "./CSSToolkit/FilterGenerator";
import "./CSSToolkit.css";

const TECH_STACK = ["CSS", "React", "Generators"];

const TABS = [
  {
    id: "gradient",
    label: "Gradient",
    subtitle:
      "Create linear and radial gradients with multiple color stops. Drag to reorder, adjust angle and position.",
  },
  {
    id: "shadow",
    label: "Box Shadow",
    subtitle:
      "Build complex shadows by stacking multiple layers. Each with its own color, offset, blur and spread.",
  },
  {
    id: "glassmorphism",
    label: "Glassmorphism",
    subtitle:
      "The frosted glass effect. Combine background blur, transparency and a subtle border.",
  },
  {
    id: "border-radius",
    label: "Border Radius",
    subtitle:
      "Round each corner independently or lock them together. Supports asymmetric horizontal and vertical radii.",
  },
  {
    id: "filter",
    label: "Filter",
    subtitle:
      "Apply CSS filter functions: blur, brightness, contrast, saturate, hue-rotate, grayscale, sepia and invert.",
  },
];

export default function CSSToolkit() {
  const [activeTab, setActiveTab] = useState("gradient");

  // Feature: Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeSubtitle = TABS.find((t) => t.id === activeTab).subtitle;

  return (
    <div className="toolkit-wrapper">
      {/* HERO */}
      <div className="toolkit-hero">
        <div className="toolkit-tech">
          {TECH_STACK.map((t, i) => (
            <span key={t} className="toolkit-tech-item">
              {t}
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
