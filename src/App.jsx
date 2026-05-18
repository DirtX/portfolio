import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundGrid from "./components/BackgroundGrid";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import VideoCompressor from "./pages/Projects/VideoCompressor";
import ColorPalette from "./pages/Projects/ColorPalette";
import CSSToolkit from "./pages/Projects/CSSToolkit";
import MarkdownEditor from "./pages/Projects/MarkdownEditor";
import SVGEditor from "./pages/Projects/SVGEditor";
import AudioExtractor from "./pages/Projects/AudioExtractor";
import ScrollToTop from "./components/ScrollToTop";
import SocialSidebar from "./components/SocialSidebar";
import ContactModal from "./components/ContactModal";
import "./App.css";

export default function App() {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-layout">
        {/* GLOBAL BACKGROUND */}
        <BackgroundGrid />
        {/* STICKY NAVBAR */}
        <Navbar />
        {/* SOCIAL SIDEBAR */}

        <SocialSidebar onPhoneClick={() => setPhoneModalOpen(true)} />
        {/* PHONE CONTACT MODAL */}
        <ContactModal open={phoneModalOpen} onClose={() => setPhoneModalOpen(false)} />
        {/* PAGE ROUTES */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/video-compressor" element={<VideoCompressor />} />
            <Route path="/projects/color-palette" element={<ColorPalette />} />
            <Route path="/projects/css-toolkit" element={<CSSToolkit />} />
            <Route path="/projects/markdown-editor" element={<MarkdownEditor />} />
            <Route path="/projects/svg-editor" element={<SVGEditor />} />
            <Route path="/projects/audio-extractor" element={<AudioExtractor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
