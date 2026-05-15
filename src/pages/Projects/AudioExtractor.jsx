import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import "./AudioExtractor.css";

const TECH_STACK = ["FFmpeg WASM", "React", "Web APIs"];

const FORMATS = [
  {
    id: "mp3",
    label: "MP3",
    codec: "libmp3lame",
    ext: "mp3",
    desc: "Universal format, works everywhere",
  },
  { id: "m4a", label: "M4A", codec: "aac", ext: "m4a", desc: "Better quality at same bitrate" },
  { id: "wav", label: "WAV", codec: "pcm_s16le", ext: "wav", desc: "Lossless, uncompressed audio" },
];

const BITRATES = ["8k", "16k", "32k", "64k", "96k", "128k", "192k", "256k", "320k"];

const STEPS = [
  {
    num: "01",
    title: "Select your video",
    desc: "Drop any MP4, MOV, MKV, AVI or WEBM file. Nothing leaves your device.",
  },
  {
    num: "02",
    title: "Choose format & bitrate",
    desc: "Pick MP3 or M4A. Higher bitrate = better quality, larger file.",
  },
  {
    num: "03",
    title: "Download audio",
    desc: "Audio is extracted in your browser via FFmpeg WebAssembly.",
  },
];

export default function AudioExtractor() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [format, setFormat] = useState("mp3");
  const [bitrate, setBitrate] = useState("192k");
  const [outputUrl, setOutputUrl] = useState(null);
  const [outputSize, setOutputSize] = useState(null);

  const ffmpegRef = useRef(new FFmpeg());
  const startTimeRef = useRef(null);
  const fileInputRef = useRef(null);

  // Feature: Load FFmpeg WASM engine
  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("progress", ({ progress }) => {
        setProgress(progress * 100);
        if (progress > 0 && startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          const remaining = elapsed / progress - elapsed;
          setEtaSeconds(Math.max(0, remaining));
        }
      });
      await ffmpeg.load();
      setIsLoaded(true);
    };
    loadFFmpeg();
  }, []);

  // Feature: Validate video file by MIME and extension
  const validateFile = (file) => {
    if (!file) return false;
    const validMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-matroska",
      "video/x-msvideo",
    ];
    const validExtensions = /\.(mp4|webm|mov|mkv|avi)$/i;
    return validMimeTypes.includes(file.type) || validExtensions.test(file.name);
  };

  const handleFile = (file) => {
    if (!validateFile(file)) {
      setErrorMessage("Invalid format. Accepted: MP4, WEBM, MOV, MKV, AVI.");
      setVideoFile(null);
      return;
    }
    setErrorMessage("");
    setVideoFile(file);
    setOutputUrl(null);
    setOutputSize(null);
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  // Feature: Drag and drop file upload
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  // Feature: Format ETA as readable string
  const formatEta = (seconds) => {
    if (seconds === null || seconds === Infinity) return "Calculating...";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m === 0 ? `~${s}s remaining` : `~${m}m ${s}s remaining`;
  };

  // Feature: Extract audio from video
  const startExtraction = async () => {
    if (!videoFile || !isLoaded) return;
    setIsExtracting(true);
    setProgress(0);
    setEtaSeconds(null);
    setErrorMessage("");
    setOutputUrl(null);
    startTimeRef.current = Date.now();

    const ffmpeg = ffmpegRef.current;
    const selectedFormat = FORMATS.find((f) => f.id === format);
    const outputName = `output.${selectedFormat.ext}`;

    try {
      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));

      await ffmpeg.exec([
        "-i",
        "input.mp4",
        "-vn",
        "-c:a",
        selectedFormat.codec,
        "-b:a",
        bitrate,
        outputName,
      ]);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], { type: `audio/${selectedFormat.ext}` });
      setOutputUrl(URL.createObjectURL(blob));
      setOutputSize((blob.size / 1024 / 1024).toFixed(1));
    } catch (err) {
      setErrorMessage(`Extraction failed: ${err.message}`);
    } finally {
      setIsExtracting(false);
      startTimeRef.current = null;
    }
  };

  // Feature: Reset to extract another file
  const handleReset = () => {
    setVideoFile(null);
    setOutputUrl(null);
    setOutputSize(null);
    setProgress(0);
    setErrorMessage("");
  };

  const selectedFormat = FORMATS.find((f) => f.id === format);

  return (
    <div className="ae-page">
      {/* HERO SECTION */}
      <div className="ae-hero">
        <div className="ae-tech">
          {TECH_STACK.map((t, i) => (
            <span key={t} className="ae-tech-item">
              {t}
              {i < TECH_STACK.length - 1 && <span className="ae-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="ae-title">Audio Extractor</h1>
        <p className="ae-subtitle">
          Extract audio from any video file. Convert MP4, MOV, MKV to MP3 or M4A directly in your
          browser — no server, no upload, no limits.
        </p>
      </div>

      {/* TOOL CARD */}
      <div className="ae-card">
        {/* OUTPUT RESULT */}
        {outputUrl ? (
          <div className="ae-result">
            <audio className="ae-preview-audio" src={outputUrl} controls />
            <div className="ae-result-info">
              <div className="ae-result-stats">
                <div className="ae-stat">
                  <span className="ae-stat-label">Source</span>
                  <span className="ae-stat-value">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <span className="ae-stat-arrow">{"→"}</span>
                <div className="ae-stat">
                  <span className="ae-stat-label">Audio</span>
                  <span className="ae-stat-value">{outputSize} MB</span>
                </div>
                <div className="ae-stat">
                  <span className="ae-stat-label">Format</span>
                  <span className="ae-stat-value">
                    {selectedFormat.label} · {bitrate}
                  </span>
                </div>
              </div>
              <div className="ae-result-actions">
                <a
                  href={outputUrl}
                  download={`${videoFile.name.replace(/\.[^/.]+$/, "")}.${selectedFormat.ext}`}
                  className="ae-btn"
                >
                  Download {selectedFormat.label}
                </a>
                <button className="ae-btn-ghost" onClick={handleReset}>
                  Extract another
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* DROPZONE */}
            <div
              className={`ae-dropzone ${isDragging ? "dragging" : ""} ${videoFile ? "has-file" : ""}`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => !isExtracting && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/x-msvideo"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {videoFile ? (
                <div className="ae-file-info">
                  <span className="ae-file-icon">🎬</span>
                  <span className="ae-file-name">{videoFile.name}</span>
                  <span className="ae-file-size">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              ) : (
                <div className="ae-drop-hint">
                  <span className="ae-drop-icon">↑</span>
                  <p className="ae-drop-text">Drop your video here</p>
                  <p className="ae-drop-sub">or click to browse · MP4, MOV, MKV, AVI, WEBM</p>
                </div>
              )}
            </div>

            {errorMessage && <p className="ae-error">{errorMessage}</p>}

            {/* FORMAT SELECTOR */}
            <div className="ae-formats">
              {FORMATS.map((f) => (
                <button
                  key={f.id}
                  className={`ae-format ${format === f.id ? "active" : ""}`}
                  onClick={() => setFormat(f.id)}
                  disabled={isExtracting}
                >
                  <span className="ae-format-label">{f.label}</span>
                  <span className="ae-format-desc">{f.desc}</span>
                </button>
              ))}
            </div>

            {/* BITRATE */}
            {format !== "wav" && (
              <div className="ae-setting-group">
                <label className="ae-label">Bitrate</label>
                <div className="ae-bitrates">
                  {BITRATES.map((b) => (
                    <button
                      key={b}
                      className={`ae-bitrate ${bitrate === b ? "active" : ""}`}
                      onClick={() => setBitrate(b)}
                      disabled={isExtracting}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BUTTON */}
            <button
              className={`ae-btn ${!isLoaded || !videoFile || isExtracting ? "disabled" : ""}`}
              onClick={startExtraction}
              disabled={!isLoaded || !videoFile || isExtracting}
            >
              {isExtracting ? "Extracting..." : !isLoaded ? "Loading engine..." : "Extract audio"}
            </button>

            {/* PROGRESS */}
            {isExtracting && (
              <div className="ae-progress">
                <div className="ae-progress-track">
                  <div className="ae-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="ae-progress-row">
                  <span className="ae-progress-pct">{Math.round(progress)}%</span>
                  <span className="ae-eta">{formatEta(etaSeconds)}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* HOW IT WORKS */}
      <div className="ae-how">
        <h2 className="ae-how-title">How it works</h2>
        <div className="ae-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="ae-step">
              <span className="ae-step-num">{s.num}</span>
              <h3 className="ae-step-title">{s.title}</h3>
              <p className="ae-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH NOTE */}
      <div className="ae-tech-note">
        Powered by <strong>FFmpeg WebAssembly</strong> — professional audio processing running
        entirely in your browser.
      </div>
    </div>
  );
}
