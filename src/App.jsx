import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundGrid from "./components/BackgroundGrid";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import SocialSidebar from "./components/SocialSidebar";
import ContactModal from "./components/ContactModal";
import { ModalProvider, useModal } from "./context/ModalContext";
import "./App.css";

// Feature: Lazy-load project routes to keep initial bundle small
const Projects = lazy(() => import("./pages/Projects"));
const VideoCompressor = lazy(() => import("./pages/Projects/VideoCompressor"));
const ColorPalette = lazy(() => import("./pages/Projects/ColorPalette"));
const CSSToolkit = lazy(() => import("./pages/Projects/CSSToolkit"));
const MarkdownEditor = lazy(() => import("./pages/Projects/MarkdownEditor"));
const SVGEditor = lazy(() => import("./pages/Projects/SVGEditor"));
const AudioExtractor = lazy(() => import("./pages/Projects/AudioExtractor"));

// Feature: Inner component that consumes modal context
function AppContent() {
  const { contactModalOpen, openContactModal, closeContactModal } = useModal();

  return (
    <div className="app-layout">
      {/* GLOBAL BACKGROUND */}
      <BackgroundGrid />
      {/* STICKY NAVBAR */}
      <Navbar />
      {/* SOCIAL SIDEBAR (desktop only) */}
      <SocialSidebar onPhoneClick={openContactModal} />
      {/* CONTACT MODAL */}
      <ContactModal open={contactModalOpen} onClose={closeContactModal} />
      {/* PAGE ROUTES */}
      <main className="main-content">
        <Suspense fallback={<div />}>
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
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </Router>
  );
}
