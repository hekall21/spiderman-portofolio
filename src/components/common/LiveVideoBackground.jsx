import { useState, useEffect, useRef, useCallback } from "react";
import { Film, Play, Pause, Sparkles } from "lucide-react";

export const SPIDEY_LIVE_VIDEOS = [
  {
    id: "tasm2-swing",
    title: "TASM 2 City Swing",
    tagline: "Andrew Garfield High-Speed Manhattan Freefall",
    videoSrc: "/assets/live-wallpapers/spiderman-tasm2-live-wallpaper.mp4",
    posterSrc: "/assets/live-wallpapers/spiderman-tasm2-live-poster.jpg",
    accentColor: "#00f0ff",
    earthBadge: "Earth-12070"
  },
  {
    id: "8k-horizon",
    title: "8K Dusk Horizon",
    tagline: "Ultra-HD Skyline Perch & Spider Web Strands",
    videoSrc: "/assets/live-wallpapers/spiderman-8k-pc-live-wallpaper.mp4",
    posterSrc: "/assets/live-wallpapers/spiderman-8k-pc-poster.jpg",
    accentColor: "#e50914",
    earthBadge: "Earth-616"
  },
  {
    id: "multiverse-tingle",
    title: "Multiverse Glitch",
    tagline: "Miles Morales Spider-Sense Quantum Resonance",
    videoSrc: "/assets/live-wallpapers/spidey-tingle-multiverse-live-wallpaper.mp4",
    posterSrc: "/assets/live-wallpapers/spidey-tingle-multiverse-poster.jpg",
    accentColor: "#ac4bff",
    earthBadge: "Earth-1610"
  },
  {
    id: "action-cinematic",
    title: "Action Cinematic",
    tagline: "High-Octane Combat & Dynamic Acrobatics",
    videoSrc: "/assets/live-wallpapers/spiderman-action-cinematic-live-wallpaper.mp4",
    posterSrc: "/assets/live-wallpapers/spiderman-action-cinematic-poster.jpg",
    accentColor: "#FFE600",
    earthBadge: "Earth-928"
  }
];

export default function LiveVideoBackground({
  variant = "global", // "global" | "hero"
  showControls = false,
  defaultIndex = 0
}) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(defaultIndex);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [opacityLevel, setOpacityLevel] = useState(0.52); // 0.25, 0.52, 0.75
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const videoRef = useRef(null);
  const activeVideo = SPIDEY_LIVE_VIDEOS[activeVideoIndex];

  // Listen for global custom events from MultiverseVault & HUD Controller
  useEffect(() => {
    const handleSetCustomVideo = (event) => {
      const { videoSrc } = event.detail || {};
      if (!videoSrc) return;
      const matchedIdx = SPIDEY_LIVE_VIDEOS.findIndex((v) => v.videoSrc === videoSrc);
      if (matchedIdx !== -1) {
        setActiveVideoIndex(matchedIdx);
        setIsPlaying(true);
      }
    };

    const handleSetIndex = (event) => {
      if (typeof event.detail?.index === "number") {
        setActiveVideoIndex(event.detail.index);
        setIsPlaying(true);
      }
    };

    const handleTogglePlay = () => {
      setIsPlaying((prev) => !prev);
    };

    const handleCycleOpacity = (event) => {
      if (typeof event.detail?.opacity === "number") {
        setOpacityLevel(event.detail.opacity);
      } else {
        setOpacityLevel((prev) => (prev <= 0.3 ? 0.52 : prev <= 0.6 ? 0.75 : 0.3));
      }
    };

    window.addEventListener("set-spidey-live-wallpaper", handleSetCustomVideo);
    window.addEventListener("set-spidey-video-idx", handleSetIndex);
    window.addEventListener("toggle-spidey-video-play", handleTogglePlay);
    window.addEventListener("cycle-spidey-video-opacity", handleCycleOpacity);

    return () => {
      window.removeEventListener("set-spidey-live-wallpaper", handleSetCustomVideo);
      window.removeEventListener("set-spidey-video-idx", handleSetIndex);
      window.removeEventListener("toggle-spidey-video-play", handleTogglePlay);
      window.removeEventListener("cycle-spidey-video-opacity", handleCycleOpacity);
    };
  }, []);

  // Sync play/pause with videoRef
  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, activeVideoIndex]);

  return (
    <div
      className={`spidey-live-video-layer spidey-variant-${variant}`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        key={activeVideo.videoSrc}
        src={activeVideo.videoSrc}
        poster={activeVideo.posterSrc}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          opacity: isVideoLoaded ? opacityLevel : 0,
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          filter: "saturate(1.2) contrast(1.1)",
        }}
      />

      {/* Cinematic Vignette & Dark Contrast Overlay to guarantee WCAG AAA typography */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(5, 5, 8, 0.45) 0%, rgba(5, 5, 8, 0.78) 75%, rgba(5, 5, 8, 0.92) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Halftone / Precision Tech Grid Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/**
 * Interactive HUD Controller Pill specifically rendered in Hero
 */
export function LiveVideoHUDController() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [opacity, setOpacity] = useState(0.52);

  const selectVideo = (idx) => {
    setActiveIdx(idx);
    setIsPlaying(true);
    window.dispatchEvent(new CustomEvent("set-spidey-video-idx", { detail: { index: idx } }));
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    window.dispatchEvent(new CustomEvent("toggle-spidey-video-play"));
  };

  const cycleOpacity = () => {
    const nextOp = opacity <= 0.3 ? 0.52 : opacity <= 0.6 ? 0.75 : 0.3;
    setOpacity(nextOp);
    window.dispatchEvent(new CustomEvent("cycle-spidey-video-opacity", { detail: { opacity: nextOp } }));
  };

  // Sync with external events (e.g. from MultiverseVault)
  useEffect(() => {
    const handleSync = (event) => {
      const { videoSrc } = event.detail || {};
      if (!videoSrc) return;
      const found = SPIDEY_LIVE_VIDEOS.findIndex((v) => v.videoSrc === videoSrc);
      if (found !== -1) {
        setActiveIdx(found);
        setIsPlaying(true);
      }
    };
    window.addEventListener("set-spidey-live-wallpaper", handleSync);
    return () => window.removeEventListener("set-spidey-live-wallpaper", handleSync);
  }, []);

  return (
    <div
      className="spidey-live-hud-controller"
      style={{
        position: "absolute",
        bottom: "1.25rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.45rem 0.85rem",
        background: "rgba(10, 12, 22, 0.88)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(0, 240, 255, 0.35)",
        borderRadius: "100px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 240, 255, 0.2)",
        maxWidth: "94vw",
      }}
    >
      {/* Live Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          paddingRight: "0.5rem",
          borderRight: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <span
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: isPlaying ? "#00f0ff" : "#808796",
            boxShadow: isPlaying ? "0 0 10px #00f0ff" : "none",
            animation: isPlaying ? "pulse 1.8s infinite" : "none",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#ffffff",
            letterSpacing: "0.08em",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          LIVE BG:
        </span>
      </div>

      {/* Video Selector Buttons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {SPIDEY_LIVE_VIDEOS.map((vid, idx) => {
          const isCurrent = activeIdx === idx;
          return (
            <button
              key={vid.id}
              onClick={() => selectVideo(idx)}
              title={vid.tagline}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "100px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent ? "#ffffff" : "var(--color-muted)",
                background: isCurrent ? `${vid.accentColor}30` : "rgba(255, 255, 255, 0.04)",
                border: isCurrent ? `1px solid ${vid.accentColor}` : "1px solid rgba(255, 255, 255, 0.08)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ color: vid.accentColor }}>●</span>
              <span>{vid.title.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Play/Pause & Opacity Presets Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
          paddingLeft: "0.4rem",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <button
          onClick={togglePlay}
          title={isPlaying ? "Jeda Video Background" : "Putar Video Background"}
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {isPlaying ? <Pause size={11} fill="#fff" /> : <Play size={11} fill="#fff" />}
        </button>

        <button
          onClick={cycleOpacity}
          title={`Intensitas Background: ${Math.round(opacity * 100)}% (Klik untuk ubah)`}
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: "6px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            color: "#00f0ff",
            background: "rgba(0, 240, 255, 0.1)",
            border: "1px solid rgba(0, 240, 255, 0.25)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {Math.round(opacity * 100)}%
        </button>
      </div>
    </div>
  );
}
