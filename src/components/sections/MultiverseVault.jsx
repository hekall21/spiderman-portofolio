import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { multiverseAssets, multiverseCategories } from "../../data/multiverseGallery";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import {
  Download,
  Eye,
  Sparkles,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Check,
  Compass,
  LayoutGrid,
  Radio,
  SlidersHorizontal,
  Wallpaper
} from "lucide-react";

// Web Audio sound synthesizer for crisp haptic feedback
function playHapticTone(type = "click") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.setValueAtTime(780, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch {
    // Silent fail if AudioContext is blocked
  }
}

export default function MultiverseVault() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "corridor"
  const [activeCorridorIndex, setActiveCorridorIndex] = useState(0);
  const [activeLiveWallpaper, setActiveLiveWallpaper] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    if (activeCategory === "all") return multiverseAssets;
    return multiverseAssets.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const activeAsset = activeModalIndex !== null ? filteredAssets[activeModalIndex] : null;

  // Handle setting site background dynamically
  const handleSetWallpaper = useCallback((asset) => {
    playHapticTone("success");
    setActiveLiveWallpaper(asset.src);

    if (asset.isVideo && asset.videoSrc) {
      window.dispatchEvent(
        new CustomEvent("set-spidey-live-wallpaper", {
          detail: { videoSrc: asset.videoSrc }
        })
      );
      setToastMessage(`🎬 Live Video Wallpaper Diaktifkan: ${asset.title}`);
    } else {
      // Apply live wallpaper image to body background overlay
      let dynamicStyleEl = document.getElementById("dynamic-spidey-bg");
      if (!dynamicStyleEl) {
        dynamicStyleEl = document.createElement("style");
        dynamicStyleEl.id = "dynamic-spidey-bg";
        document.head.appendChild(dynamicStyleEl);
      }
      dynamicStyleEl.innerHTML = `
        body::before {
          background-image: url('${asset.src}') !important;
          opacity: 0.22 !important;
          background-size: cover !important;
          background-position: center !important;
          transition: background-image 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
      `;
      setToastMessage(`🕸️ Wallpaper Diaktifkan: ${asset.title}`);
    }

    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Handle direct file download
  const handleDownload = useCallback((asset, e) => {
    if (e) e.stopPropagation();
    playHapticTone("click");
    const link = document.createElement("a");
    link.href = asset.isVideo && asset.videoSrc ? asset.videoSrc : asset.src;
    link.download = asset.downloadName || (asset.isVideo ? "spiderman-live-wallpaper.mp4" : "spiderman-asset.jpg");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`📥 Mengunduh: ${asset.downloadName}`);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === "Escape") setActiveModalIndex(null);
      if (e.key === "ArrowRight") {
        setActiveModalIndex((prev) => (prev + 1) % filteredAssets.length);
        playHapticTone("click");
      }
      if (e.key === "ArrowLeft") {
        setActiveModalIndex((prev) => (prev - 1 + filteredAssets.length) % filteredAssets.length);
        playHapticTone("click");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalIndex, filteredAssets]);

  return (
    <section
      id="vault"
      style={{
        position: "relative",
        background: "transparent",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Background Ambient Aura */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "-5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229, 9, 20, 0.09) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "-5%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            style={{
              position: "fixed",
              top: "90px",
              left: "50%",
              zIndex: 9999,
              background: "rgba(10, 12, 22, 0.94)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(229, 9, 20, 0.5)",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(229,9,20,0.3)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <Sparkles size={16} color="var(--color-yellow, #ffe600)" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        style={{
          maxWidth: "1340px",
          margin: "0 auto",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          position: "relative",
          zIndex: 5,
        }}
      >
        {/* Section Header */}
        <SectionHeading
          number="03"
          label="SPIDER-VERSE ASSET VAULT & CINEMATIC GALLERY"
          title="CURATED ASSETS &"
          titleAccent="MULTIVERSE VAULT."
          subtitle="26 aset visual Spider-Man dan fotografi sinematik yang telah dirapikan ke standar web production. Dilengkapi fitur interactive 3D corridor, live wallpaper switcher, dan 1-click HD download."
        />

        {/* Action Controls Bar (Filters + View Modes) */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.25rem",
            marginBottom: "2.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "16px",
            background: "rgba(15, 17, 28, 0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Category Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {multiverseCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playHapticTone("click");
                    setActiveCategory(cat.id);
                    setActiveCorridorIndex(0);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "10px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(229, 9, 20, 0.9), rgba(160, 0, 15, 0.9))"
                      : "rgba(255, 255, 255, 0.04)",
                    color: isSelected ? "#fff" : "var(--color-muted)",
                    border: isSelected
                      ? "1px solid rgba(255, 255, 255, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.05)",
                    boxShadow: isSelected ? "0 4px 15px rgba(229, 9, 20, 0.35)" : "none",
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle (Grid vs 3D Corridor) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: "10px",
              padding: "3px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <button
              onClick={() => {
                playHapticTone("click");
                setViewMode("grid");
              }}
              aria-label="Grid view"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                cursor: "pointer",
                background: viewMode === "grid" ? "rgba(255, 255, 255, 0.12)" : "transparent",
                color: viewMode === "grid" ? "#fff" : "var(--color-muted)",
                transition: "all 0.2s",
              }}
            >
              <LayoutGrid size={14} />
              <span>BENTO GRID</span>
            </button>
            <button
              onClick={() => {
                playHapticTone("click");
                setViewMode("corridor");
              }}
              aria-label="3D Corridor view"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.85rem",
                borderRadius: "8px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                cursor: "pointer",
                background: viewMode === "corridor" ? "linear-gradient(135deg, #00f0ff, #0077b6)" : "transparent",
                color: viewMode === "corridor" ? "#050508" : "var(--color-muted)",
                fontWeight: viewMode === "corridor" ? 700 : 500,
                transition: "all 0.2s",
              }}
            >
              <Compass size={14} />
              <span>3D CORRIDOR</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: 3D SLIPSTREAM CORRIDOR (Inspired by Kexsio 'slipstream') */}
        {viewMode === "corridor" && (
          <div
            style={{
              position: "relative",
              minHeight: "520px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              perspective: "1200px",
              padding: "2rem 0",
              overflow: "hidden",
            }}
          >
            {/* 3D Stage Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "750px",
                height: "420px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {filteredAssets.map((asset, index) => {
                const offset = index - activeCorridorIndex;
                const absOffset = Math.abs(offset);
                if (absOffset > 2) return null; // Show 5 items at a time

                const zIndex = 30 - absOffset * 10;
                const xOffset = offset * 220;
                const zTranslate = -absOffset * 140;
                const rotateY = offset * -25;
                const opacity = 1 - absOffset * 0.35;
                const scale = 1 - absOffset * 0.15;

                return (
                  <motion.div
                    key={asset.id}
                    animate={{
                      x: xOffset,
                      z: zTranslate,
                      rotateY: rotateY,
                      scale: scale,
                      opacity: opacity,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => {
                      if (offset === 0) {
                        setActiveModalIndex(index);
                      } else {
                        setActiveCorridorIndex(index);
                        playHapticTone("click");
                      }
                    }}
                    style={{
                      position: "absolute",
                      width: asset.orientation === "portrait" ? "260px" : "420px",
                      height: "360px",
                      borderRadius: "18px",
                      overflow: "hidden",
                      background: "#080a12",
                      border: offset === 0 ? "2px solid rgba(0, 240, 255, 0.8)" : "1px solid rgba(255, 255, 255, 0.12)",
                      boxShadow: offset === 0
                        ? "0 25px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0, 240, 255, 0.3)"
                        : "0 15px 30px rgba(0,0,0,0.6)",
                      cursor: "pointer",
                      zIndex: zIndex,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <img
                      src={asset.src}
                      alt={asset.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: offset === 0 ? "none" : "brightness(0.65) saturate(0.85)",
                        transition: "filter 0.3s ease",
                      }}
                    />

                    {/* Gradient Overlay & Meta for Active Item */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(5,7,15,0.92) 0%, rgba(5,7,15,0.2) 60%, transparent 100%)",
                        padding: "1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-cyan, #00f0ff)",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {asset.universe}
                      </span>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          fontWeight: 700,
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {asset.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "var(--color-muted)",
                          margin: "0.25rem 0 0.75rem 0",
                        }}
                      >
                        {asset.dimensions} • {asset.orientation}
                      </p>

                      {offset === 0 && (
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveModalIndex(index);
                            }}
                            style={{
                              flex: 1,
                              padding: "0.45rem",
                              borderRadius: "8px",
                              background: "rgba(255,255,255,0.15)",
                              color: "#fff",
                              fontSize: "0.75rem",
                              fontFamily: "var(--font-mono)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "0.35rem",
                              cursor: "pointer",
                            }}
                          >
                            <Eye size={13} />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={(e) => handleDownload(asset, e)}
                            style={{
                              padding: "0.45rem 0.85rem",
                              borderRadius: "8px",
                              background: "linear-gradient(135deg, var(--color-red, #e50914), #990000)",
                              color: "#fff",
                              fontSize: "0.75rem",
                              fontFamily: "var(--font-mono)",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.35rem",
                              cursor: "pointer",
                            }}
                          >
                            <Download size={13} />
                            <span>Download</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Corridor Navigation Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                marginTop: "1.5rem",
              }}
            >
              <button
                onClick={() => {
                  playHapticTone("click");
                  setActiveCorridorIndex((prev) => Math.max(0, prev - 1));
                }}
                disabled={activeCorridorIndex === 0}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: activeCorridorIndex === 0 ? "not-allowed" : "pointer",
                  opacity: activeCorridorIndex === 0 ? 0.3 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--color-muted)",
                }}
              >
                <strong style={{ color: "#fff" }}>{activeCorridorIndex + 1}</strong> / {filteredAssets.length}
              </span>

              <button
                onClick={() => {
                  playHapticTone("click");
                  setActiveCorridorIndex((prev) => Math.min(filteredAssets.length - 1, prev + 1));
                }}
                disabled={activeCorridorIndex === filteredAssets.length - 1}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: activeCorridorIndex === filteredAssets.length - 1 ? "not-allowed" : "pointer",
                  opacity: activeCorridorIndex === filteredAssets.length - 1 ? 0.3 : 1,
                  transition: "all 0.2s",
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: BENTO MASONRY GRID */}
        {viewMode === "grid" && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredAssets.map((asset, index) => {
              const isLiveActive = activeLiveWallpaper === asset.src;
              return (
                <motion.div
                  key={asset.id}
                  variants={fadeUp}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => {
                    playHapticTone("click");
                    setActiveModalIndex(index);
                  }}
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    background: "rgba(10, 12, 20, 0.75)",
                    backdropFilter: "blur(12px)",
                    border: isLiveActive
                      ? "2px solid var(--color-cyan, #00f0ff)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: isLiveActive
                      ? "0 15px 35px rgba(0, 240, 255, 0.25)"
                      : "0 10px 25px rgba(0, 0, 0, 0.4)",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  {/* Image Container */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: asset.orientation === "portrait" ? "320px" : "190px",
                      overflow: "hidden",
                      background: "#030407",
                    }}
                  >
                    <img
                      src={asset.src}
                      alt={asset.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: "0.75rem",
                        left: "0.75rem",
                        right: "0.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        style={{
                          padding: "0.25rem 0.6rem",
                          borderRadius: "6px",
                          background: "rgba(5, 7, 15, 0.85)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: asset.colorAccent || "#fff",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {asset.isVideo ? "🎬 LIVE VIDEO" : asset.category}
                      </span>

                      <span
                        style={{
                          padding: "0.25rem 0.5rem",
                          borderRadius: "6px",
                          background: "rgba(5, 7, 15, 0.85)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          color: "var(--color-muted)",
                        }}
                      >
                        {asset.dimensions}
                      </span>
                    </div>

                    {/* Quick Hover Action Bar */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "0.75rem",
                        right: "0.75rem",
                        display: "flex",
                        gap: "0.4rem",
                      }}
                    >
                      <button
                        title="Set as Live Site Wallpaper"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetWallpaper(asset);
                        }}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "rgba(5, 7, 15, 0.85)",
                          backdropFilter: "blur(8px)",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          color: isLiveActive ? "var(--color-cyan, #00f0ff)" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <Wallpaper size={14} />
                      </button>

                      <button
                        title="Download HD Image"
                        onClick={(e) => handleDownload(asset, e)}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "linear-gradient(135deg, var(--color-red, #e50914), #b30000)",
                          border: "none",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: "1.1rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.3rem" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: asset.colorAccent || "var(--color-red)",
                          boxShadow: `0 0 8px ${asset.colorAccent || "var(--color-red)"}`,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-muted)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {asset.universe}
                      </span>
                    </div>

                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.98rem",
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 0.35rem 0",
                        lineHeight: 1.35,
                      }}
                    >
                      {asset.title}
                    </h4>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--color-muted)",
                        lineHeight: 1.5,
                        margin: "0 0 0.85rem 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {asset.description}
                    </p>

                    {/* Tag Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto" }}>
                      {asset.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            padding: "0.2rem 0.45rem",
                            borderRadius: "4px",
                            background: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.06)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            color: "var(--color-muted)",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* FULLSCREEN CINEMA LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveModalIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(3, 4, 8, 0.94)",
              backdropFilter: "blur(25px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(1rem, 3vw, 2.5rem)",
            }}
          >
            {/* Modal Dialog */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "1050px",
                width: "100%",
                maxHeight: "90vh",
                borderRadius: "22px",
                background: "rgba(12, 14, 24, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.9), 0 0 50px rgba(229,9,20,0.2)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Modal Top Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(8, 10, 18, 0.8)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-cyan, #00f0ff)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    [{activeAsset.universe}]
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-muted)",
                    }}
                  >
                    Asset {activeModalIndex + 1} of {filteredAssets.length}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleSetWallpaper(activeAsset)}
                    style={{
                      padding: "0.45rem 0.85rem",
                      borderRadius: "8px",
                      background: "rgba(0, 240, 255, 0.12)",
                      border: "1px solid rgba(0, 240, 255, 0.4)",
                      color: "var(--color-cyan, #00f0ff)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      cursor: "pointer",
                    }}
                  >
                    <Wallpaper size={14} />
                    <span>Set Live Wallpaper</span>
                  </button>

                  <button
                    onClick={() => handleDownload(activeAsset)}
                    style={{
                      padding: "0.45rem 0.85rem",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, var(--color-red, #e50914), #990000)",
                      border: "none",
                      color: "#fff",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={14} />
                    <span>Download HD</span>
                  </button>

                  <button
                    onClick={() => setActiveModalIndex(null)}
                    aria-label="Close Lightbox"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Modal Body (Responsive: Left Image Preview, Right Info Panel) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: activeAsset.orientation === "landscape" ? "1fr" : "1fr 340px",
                  overflowY: "auto",
                  maxHeight: "calc(90vh - 65px)",
                }}
              >
                {/* Image Stage */}
                <div
                  style={{
                    position: "relative",
                    background: "#030406",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.5rem",
                    minHeight: "420px",
                  }}
                >
                  {activeAsset.isVideo && activeAsset.videoSrc ? (
                    <video
                      src={activeAsset.videoSrc}
                      poster={activeAsset.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      style={{
                        maxWidth: "100%",
                        maxHeight: "68vh",
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(229,9,20,0.35)",
                        background: "#000",
                      }}
                    />
                  ) : (
                    <img
                      src={activeAsset.src}
                      alt={activeAsset.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "68vh",
                        objectFit: "contain",
                        borderRadius: "12px",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                      }}
                    />
                  )}

                  {/* Previous / Next Arrow Overlays */}
                  <button
                    onClick={() => {
                      playHapticTone("click");
                      setActiveModalIndex((prev) => (prev - 1 + filteredAssets.length) % filteredAssets.length);
                    }}
                    aria-label="Previous image"
                    style={{
                      position: "absolute",
                      left: "1.25rem",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(8, 10, 18, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    onClick={() => {
                      playHapticTone("click");
                      setActiveModalIndex((prev) => (prev + 1) % filteredAssets.length);
                    }}
                    aria-label="Next image"
                    style={{
                      position: "absolute",
                      right: "1.25rem",
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "rgba(8, 10, 18, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    <ChevronRight size={22} />
                  </button>
                </div>

                {/* Meta Panel (if portrait or on wide layout) */}
                <div
                  style={{
                    padding: "1.75rem",
                    background: "rgba(10, 12, 22, 0.6)",
                    borderLeft: activeAsset.orientation === "landscape" ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderTop: activeAsset.orientation === "landscape" ? "1px solid rgba(255, 255, 255, 0.08)" : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 0.4rem 0",
                      }}
                    >
                      {activeAsset.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8rem",
                        color: "var(--color-yellow, #ffe600)",
                        margin: "0 0 1rem 0",
                      }}
                    >
                      {activeAsset.subtitle}
                    </p>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.88rem",
                        color: "#d1d5db",
                        lineHeight: 1.6,
                        margin: "0 0 1.5rem 0",
                      }}
                    >
                      {activeAsset.description}
                    </p>

                    {/* Metadata Table */}
                    <div
                      style={{
                        background: "rgba(0,0,0,0.35)",
                        borderRadius: "12px",
                        padding: "1rem",
                        border: "1px solid rgba(255,255,255,0.06)",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                          Dimensions:
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#fff" }}>
                          {activeAsset.dimensions}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                          Aspect Ratio:
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#fff" }}>
                          {activeAsset.aspectRatio}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)" }}>
                          Orientation:
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "#fff", textTransform: "capitalize" }}>
                          {activeAsset.orientation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {activeAsset.tags.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: "0.3rem 0.6rem",
                          borderRadius: "6px",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.7rem",
                          color: "var(--color-muted)",
                        }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
