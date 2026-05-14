import { useState } from "react";
import GradientGenerator from "./CSSToolkit/GradientGenerator";
import BoxShadowGenerator from "./CSSToolkit/BoxShadowGenerator";
import GlassmorphismGenerator from "./CSSToolkit/GlassmorphismGenerator";
import BorderRadiusGenerator from "./CSSToolkit/BorderRadiusGenerator";
import FilterGenerator from "./CSSToolkit/FilterGenerator";
import "./CSSToolkit.css";

const TABS = [
  { id: "gradient", label: "Gradient" },
  { id: "shadow", label: "Box Shadow" },
  { id: "glassmorphism", label: "Glassmorphism" },
  { id: "border-radius", label: "Border Radius" },
  { id: "filter", label: "Filter" },
];

export default function CSSToolkit() {
  const [activeTab, setActiveTab] = useState("gradient");

  return (
    <div className="toolkit-wrapper">
      {/* HEADER */}
      <div className="toolkit-header">
        <h2 className="page-header">CSS Toolkit</h2>
        <p className="toolkit-desc">
          A collection of visual generators for the most common CSS properties. Tweak the controls,
          copy the code, paste into your project.
        </p>
        <p className="toolkit-desc-secondary">Built with React, no external libraries.</p>
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
