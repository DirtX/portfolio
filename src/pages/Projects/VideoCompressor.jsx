import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useLang } from "../../context/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./VideoCompressor.css";

const TECH_STACK = ["FFmpeg WASM", "React", "Web APIs"];
const MOBILE_MAX_MB = 50;

export default function VideoCompressor() {
  const { t } = useLang();
  const isMobile = useIsMobile();

  const STEPS = [
    { num: "01", title: t("vc_step1_title"), desc: t("vc_step1_desc") },
    { num: "02", title: t("vc_step2_title"), desc: t("vc_step2_desc") },
    { num: "03", title: t("vc_step3_title"), desc: t("vc_step3_desc") },
  ];

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
      setErrorMessage(t("vc_err_format"));
      setVideoFile(null);
      return;
    }
    // Feature: Block oversized files on mobile to avoid OOM crashes
    if (isMobile && file.size > MOBILE_MAX_MB * 1024 * 1024) {
      setErrorMessage(t("vc_err_mobile_size").replace("{mb}", MOBILE_MAX_MB));
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
    if (seconds === null || seconds === Infinity) return t("vc_eta_calc");
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m === 0 ? `~${s}s ${t("vc_eta_remaining")}` : `~${m}m ${s}s ${t("vc_eta_remaining")}`;
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
      setErrorMessage(`${t("vc_err_compression")} ${err.message}`);
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
        <p className="vc-subtitle">{t("vc_subtitle")}</p>
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
                  <span className="vc-stat-label">{t("vc_stat_original")}</span>
                  <span className="vc-stat-value">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <span className="vc-stat-arrow">→</span>
                <div className="vc-stat">
                  <span className="vc-stat-label">{t("vc_stat_compressed")}</span>
                  <span className="vc-stat-value">{outputSize} MB</span>
                </div>
                <div className="vc-stat">
                  <span className="vc-stat-label">{t("vc_stat_saved")}</span>
                  <span className="vc-stat-value vc-stat-saved">
                    {Math.round((1 - outputSize / (videoFile.size / 1024 / 1024)) * 100)}%
                  </span>
                </div>
              </div>
              <div className="vc-result-actions">
                <a href={outputUrl} download={`compressed_${videoFile.name}`} className="vc-btn">
                  {t("vc_btn_download")}
                </a>
                <button className="vc-btn-ghost" onClick={handleReset}>
                  {t("vc_btn_another")}
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
                  <p className="vc-drop-text">{t("vc_drop")}</p>
                  <p className="vc-drop-sub">{t("vc_drop_sub")}</p>
                </div>
              )}
            </div>

            {isMobile && (
              <p className="vc-mobile-notice">
                {t("vc_mobile_notice").replace("{mb}", MOBILE_MAX_MB)}
              </p>
            )}

            {errorMessage && <p className="vc-error">{errorMessage}</p>}

            {/* SETTINGS */}
            <div className="vc-settings">
              <div className="vc-setting-group">
                <label className="vc-label">{t("vc_target_size")}</label>
                <input
                  type="number"
                  value={targetMb}
                  onChange={(e) => setTargetMb(e.target.value)}
                  className="vc-input"
                  disabled={isCompressing}
                />
              </div>
              <div className="vc-setting-group">
                <label className="vc-label">{t("vc_resolution")}</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  className="vc-select"
                  disabled={isCompressing}
                >
                  <option value="Original">{t("vc_res_original")}</option>
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
                ? t("vc_btn_compressing")
                : !isLoaded
                  ? t("vc_btn_loading")
                  : t("vc_btn_compress")}
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
        <h2 className="vc-how-title">{t("page_how_title")}</h2>
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
        {t("page_powered_by")} <strong>FFmpeg WebAssembly</strong> — {t("vc_tech_note")}
      </div>
    </div>
  );
}
