import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { useLang } from "../../context/LanguageContext";
import { useIsMobile } from "../../hooks/useIsMobile";
import "./AudioExtractor.css";
import BackButton from "../../components/BackButton";

const TECH_STACK = ["FFmpeg WASM", "React", "Web APIs"];
const MOBILE_MAX_MB = 100;

const BITRATES = ["8k", "16k", "32k", "64k", "96k", "128k", "192k", "256k", "320k"];

export default function AudioExtractor() {
  const { t } = useLang();
  const isMobile = useIsMobile();

  const FORMATS = [
    { id: "mp3", label: "MP3", codec: "libmp3lame", ext: "mp3", desc: t("ae_fmt_mp3_desc") },
    { id: "m4a", label: "M4A", codec: "aac", ext: "m4a", desc: t("ae_fmt_m4a_desc") },
    { id: "wav", label: "WAV", codec: "pcm_s16le", ext: "wav", desc: t("ae_fmt_wav_desc") },
  ];

  const STEPS = [
    { num: "01", title: t("ae_step1_title"), desc: t("ae_step1_desc") },
    { num: "02", title: t("ae_step2_title"), desc: t("ae_step2_desc") },
    { num: "03", title: t("ae_step3_title"), desc: t("ae_step3_desc") },
  ];

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
      setErrorMessage(t("ae_err_format"));
      setVideoFile(null);
      return;
    }
    // Feature: Block oversized files on mobile to avoid OOM crashes
    if (isMobile && file.size > MOBILE_MAX_MB * 1024 * 1024) {
      setErrorMessage(t("ae_err_mobile_size").replace("{mb}", MOBILE_MAX_MB));
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
    if (seconds === null || seconds === Infinity) return t("vc_eta_calc");
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m === 0 ? `~${s}s ${t("vc_eta_remaining")}` : `~${m}m ${s}s ${t("vc_eta_remaining")}`;
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
      setErrorMessage(`${t("ae_err_extraction")} ${err.message}`);
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
      <BackButton />
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
        <p className="ae-subtitle">{t("ae_subtitle")}</p>
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
                  <span className="ae-stat-label">{t("ae_stat_source")}</span>
                  <span className="ae-stat-value">
                    {(videoFile.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
                <span className="ae-stat-arrow">{"→"}</span>
                <div className="ae-stat">
                  <span className="ae-stat-label">{t("ae_stat_audio")}</span>
                  <span className="ae-stat-value">{outputSize} MB</span>
                </div>
                <div className="ae-stat">
                  <span className="ae-stat-label">{t("ae_stat_format")}</span>
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
                  {t("ae_btn_download")} {selectedFormat.label}
                </a>
                <button className="ae-btn-ghost" onClick={handleReset}>
                  {t("ae_btn_another")}
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
                  <p className="ae-drop-text">{t("ae_drop")}</p>
                  <p className="ae-drop-sub">{t("ae_drop_sub")}</p>
                </div>
              )}
            </div>

            {isMobile && (
              <p className="ae-mobile-notice">
                {t("ae_mobile_notice").replace("{mb}", MOBILE_MAX_MB)}
              </p>
            )}

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
                <label className="ae-label">{t("ae_bitrate")}</label>
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
              {isExtracting
                ? t("ae_btn_extracting")
                : !isLoaded
                  ? t("ae_btn_loading")
                  : t("ae_btn_extract")}
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
        <h2 className="ae-how-title">{t("page_how_title")}</h2>
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
        {t("page_powered_by")} <strong>FFmpeg WebAssembly</strong> — {t("ae_tech_note")}
      </div>
    </div>
  );
}
