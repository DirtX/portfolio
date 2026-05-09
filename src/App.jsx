import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import BackgroundGrid from './components/BackgroundGrid';
import VideoCompressor from './pages/Projects/VideoCompressor';
import ColorPalette from './pages/Projects/ColorPalette';

import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <BackgroundGrid />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/video-compressor" element={<VideoCompressor />} />
            <Route path="/projects/color-palette" element={<ColorPalette />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}