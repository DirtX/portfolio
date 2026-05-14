import { useState, useRef, useEffect } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import Button from "../../components/Button";
import "./VideoCompressor.css";

export default function VideoCompressor() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [etaSeconds, setEtaSeconds] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [targetMb, setTargetMb] = useState("9.5");
  const [resolution, setResolution] = useState("Original");

  const ffmpegRef = useRef(new FFmpeg());
  const startTimeRef = useRef(null);

  // Feature: Load FFmpeg WASM engine and track progress
  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpeg = ffmpegRef.current;

      ffmpeg.on("progress", ({ progress }) => {
        setProgress(progress * 100);

        if (progress > 0 && startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          const totalEstimated = elapsed / progress;
          const remaining = totalEstimated - elapsed;
          setEtaSeconds(Math.max(0, remaining));
        }
      });

      await ffmpeg.load();
      setIsLoaded(true);
    };

    loadFFmpeg();
  }, []);

  // Feature: Validate uploaded video file by MIME and extension
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/quicktime",
      "video/x-matroska",
      "video/x-msvideo",
    ];
    const validExtensions = /\.(mp4|webm|mov|mkv|avi)$/i;

    if (!validMimeTypes.includes(file.type) && !validExtensions.test(file.name)) {
      setErrorMessage(
        "Security Error: Invalid file format. Only MP4, WEBM, MOV, MKV, and AVI are allowed."
      );
      setVideoFile(null);
      e.target.value = "";
      return;
    }

    setErrorMessage("");
    setVideoFile(file);
  };

  // Feature: Read video duration before compression
  const getVideoDuration = (file) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  // Feature: Format remaining time as human readable string
  const formatEta = (seconds) => {
    if (seconds === null || seconds === Infinity) return "Calculating time remaining...";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);

    if (m === 0) {
      return `Approx. ${s}s remaining`;
    }
    return `Approx. ${m}m ${s}s remaining`;
  };

  // Feature: Compress video using FFmpeg with target size and resolution
  const startCompression = async () => {
    if (!videoFile || !isLoaded) return;

    setIsCompressing(true);
    setProgress(0);
    setEtaSeconds(null);
    setErrorMessage("");
    startTimeRef.current = Date.now();

    const ffmpeg = ffmpegRef.current;
    const inputName = "input.mp4";
    const outputName = "output.mp4";

    try {
      const duration = await getVideoDuration(videoFile);
      const targetBits = parseFloat(targetMb) * 8388608;
      let targetVideoBitrate = Math.floor(targetBits / duration) - 128000;

      if (targetVideoBitrate < 100000) {
        targetVideoBitrate = 100000;
      }

      const videoBitrateStr = `${Math.floor(targetVideoBitrate / 1000)}k`;
      const bufsizeStr = `${Math.floor((targetVideoBitrate / 1000) * 2)}k`;

      await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

      let args = ["-i", inputName];

      if (resolution !== "Original") {
        const height = resolution.replace("p", "");
        args.push("-vf", `scale=-2:${height}`);
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
        outputName
      );

      await ffmpeg.exec(args);

      const data = await ffmpeg.readFile(outputName);
      const blob = new Blob([data.buffer], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed_${videoFile.name}`;
      a.click();
    } catch (err) {
      setErrorMessage(`Compression Failed: ${err.message}`);
    } finally {
      setIsCompressing(false);
      startTimeRef.current = null;
    }
  };

  return (
    <div className="page-placeholder">
      <div className="compressor-container">
        <h2 className="compressor-header">Video Compressor</h2>

        {/* FILE UPLOAD */}
        <div className="input-group">
          <label>1. Select Video File</label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/x-matroska,video/x-msvideo"
            onChange={handleFileChange}
            className="custom-input"
            disabled={isCompressing || !isLoaded}
          />
          {errorMessage && <span className="error-message">{errorMessage}</span>}
        </div>

        {/* TARGET SIZE + RESOLUTION */}
        <div className="compressor-controls-row">
          <div className="input-group" style={{ flex: 1 }}>
            <label>Target Size (MB)</label>
            <input
              type="number"
              value={targetMb}
              onChange={(e) => setTargetMb(e.target.value)}
              className="custom-input"
              disabled={isCompressing}
            />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label>Resolution</label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
              className="custom-select"
              disabled={isCompressing}
            >
              <option value="Original">Original</option>
              <option value="1080p">1080p</option>
              <option value="720p">720p</option>
              <option value="480p">480p</option>
            </select>
          </div>
        </div>

        {/* COMPRESS BUTTON */}
        <div className="compressor-submit-btn">
          <Button
            variant={isLoaded && videoFile && !isCompressing ? "primary" : "secondary"}
            onClick={startCompression}
            disabled={!isLoaded || !videoFile || isCompressing}
          >
            {isCompressing
              ? "Compressing..."
              : !isLoaded
                ? "Loading Engine..."
                : "Start Compression"}
          </Button>
        </div>

        {/* PROGRESS BAR + ETA */}
        {isCompressing && (
          <div className="progress-section">
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="eta-text">{formatEta(etaSeconds)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
