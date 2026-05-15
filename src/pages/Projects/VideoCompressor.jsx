import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import "./VideoCompressor.css";

const TECH_STACK = ["FFmpeg WASM", "React", "Web APIs"];

const STEPS = [
  {
    num: "01",
    title: "Select your video",
    desc: "Drop any MP4, MOV, MKV, AVI or WEBM file. Nothing leaves your device.",
  },
  {
    num: "02",
    title: "Set target size",
    desc: "Pick how small you want the output. Adjust resolution if needed.",
  },
  {
    num: "03",
    title: "Download",
    desc: "Compression runs entirely in your browser via FFmpeg WebAssembly.",
  },
];

export default function VideoCompressor() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [targetMb, setTargetMb] = useState("9.5");
  const [resolution, setResolution] = useState("Original");
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

  // Feature: Read video duration before compression
  const getVideoDuration = (file) =>
    new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });

  // Feature: Format ETA as readable string
  const formatEta = (seconds) => {
    if (seconds === null || seconds === Infinity) return "Calculating...";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m === 0 ? `~${s}s remaining` : `~${m}m ${s}s remaining`;
  };

  // Feature: Compress video with target size and resolution
  const startCompression = async () => {
    if (!videoFile || !isLoaded) return;
    setIsCompressing(true);
    setProgress(0);
    setEtaSeconds(null);
    setErrorMessage("");
    setOutputUrl(null);
    startTimeRef.current = Date.now();

    const ffmpeg = ffmpegRef.current;

    try {
      const duration = await getVideoDuration(videoFile);
      const targetBits = parseFloat(targetMb) * 8388608;
      const targetVideoBitrate = Math.max(100000, Math.floor(targetBits / duration) - 128000);
      const videoBitrateStr = `${Math.floor(targetVideoBitrate / 1000)}k`;
      const bufsizeStr = `${Math.floor((targetVideoBitrate / 1000) * 2)}k`;

      await ffmpeg.writeFile("input.mp4", await fetchFile(videoFile));

      let args = ["-i", "input.mp4"];
      if (resolution !== "Original") {
        args.push("-vf", `scale=-2:${resolution.replace("p", "")}`);
      }
      args.push(
        "-c:v",
        "libx264",
        "-preset",
        "ultrafast",
        "-b:v",
        videoBitrateStr,
        "-maxrate",
        videoBitrateStr,
        "-bufsize",
        bufsizeStr,
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "output.mp4"
      );

      await ffmpeg.exec(args);

      const data = await ffmpeg.readFile("output.mp4");
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      setOutputUrl(URL.createObjectURL(blob));
      setOutputSize((blob.size / 1024 / 1024).toFixed(1));
    } catch (err) {
      setErrorMessage(`Compression failed: ${err.message}`);
    } finally {
      setIsCompressing(false);
      startTimeRef.current = null;
    }
  };

  // Feature: Reset to compress another video
  const handleReset = () => {
    setVideoFile(null);
    setOutputUrl(null);
    setOutputSize(null);
    setProgress(0);
    setErrorMessage("");
  };

  return (
    <div className="vc-page">
      {/* HERO SECTION */}
      <div className="vc-hero">
        <div className="vc-tech">
          {TECH_STACK.map((t, i) => (
            <span key={t} className="vc-tech-item">
              {t}
              {i < TECH_STACK.length - 1 && <span className="vc-tech-dot">·</span>}
            </span>
          ))}
        </div>
        <h1 className="vc-title">Video Compressor</h1>
        <p className="vc-subtitle">
          Reduce video file size by up to 90% without visible quality loss. Runs entirely in your
          browser — your files never leave your device.
        </p>
      </div>

      {/* TOOL CARD */}
      <div className="vc-card">
        {/* OUTPUT PREVIEW */}
        {outputUrl ? (
          <div className="vc-result">
            <video className="vc-preview-video" src={outputUrl} controls />
            <div className="vc-result-info">
              <div className="vc-result-stats">
                <div className="vc-stat">
                  <span className="vc-stat-label">Original</span>
                  <span className="vc-stat-value">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <span className="vc-stat-arrow">→</span>
                <div className="vc-stat">
                  <span className="vc-stat-label">Compressed</span>
                  <span className="vc-stat-value">{outputSize} MB</span>
                </div>
                <div className="vc-stat">
                  <span className="vc-stat-label">Saved</span>
                  <span className="vc-stat-value vc-stat-saved">
                    {Math.round((1 - outputSize / (videoFile.size / 1024 / 1024)) * 100)}%
                  </span>
                </div>
              </div>
              <div className="vc-result-actions">
                <a href={outputUrl} download={`compressed_${videoFile.name}`} className="vc-btn">
                  Download
                </a>
                <button className="vc-btn-ghost" onClick={handleReset}>
                  Compress another
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* DROPZONE */}
            <div
              className={`vc-dropzone ${isDragging ? "dragging" : ""} ${videoFile ? "has-file" : ""}`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => !isCompressing && fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/x-msvideo"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {videoFile ? (
                <div className="vc-file-info">
                  <span className="vc-file-icon">🎬</span>
                  <span className="vc-file-name">{videoFile.name}</span>
                  <span className="vc-file-size">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              ) : (
                <div className="vc-drop-hint">
                  <span className="vc-drop-icon">↑</span>
                  <p className="vc-drop-text">Drop your video here</p>
                  <p className="vc-drop-sub">or click to browse · MP4, MOV, MKV, AVI, WEBM</p>
                </div>
              )}
            </div>

            {errorMessage && <p className="vc-error">{errorMessage}</p>}

            {/* SETTINGS */}
            <div className="vc-settings">
              <div className="vc-setting-group">
                <label className="vc-label">Target size (MB)</label>
                <input
                  type="number"
                  value={targetMb}
                  onChange={(e) => setTargetMb(e.target.value)}
                  className="vc-input"
                  disabled={isCompressing}
                />
              </div>
              <div className="vc-setting-group">
                <label className="vc-label">Resolution</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="vc-select"
                  disabled={isCompressing}
                >
                  <option value="Original">Original</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>
              </div>
            </div>

            {/* BUTTON */}
            <button
              className={`vc-btn ${!isLoaded || !videoFile || isCompressing ? "disabled" : ""}`}
              onClick={startCompression}
              disabled={!isLoaded || !videoFile || isCompressing}
            >
              {isCompressing
                ? "Compressing..."
                : !isLoaded
                  ? "Loading engine..."
                  : "Compress video"}
            </button>

            {/* PROGRESS */}
            {isCompressing && (
              <div className="vc-progress">
                <div className="vc-progress-track">
                  <div className="vc-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="vc-progress-row">
                  <span className="vc-progress-pct">{Math.round(progress)}%</span>
                  <span className="vc-eta">{formatEta(etaSeconds)}</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* HOW IT WORKS */}
      <div className="vc-how">
        <h2 className="vc-how-title">How it works</h2>
        <div className="vc-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="vc-step">
              <span className="vc-step-num">{s.num}</span>
              <h3 className="vc-step-title">{s.title}</h3>
              <p className="vc-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH NOTE */}
      <div className="vc-tech-note">
        Powered by <strong>FFmpeg WebAssembly</strong> — the same engine used in professional video
        tools, running entirely in your browser.
      </div>
    </div>
  );
}
