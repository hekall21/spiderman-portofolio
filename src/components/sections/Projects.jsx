import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import SpiderHolo3D from "../common/SpiderHolo3D";
import KineticMatrix from "@/components/ui/kinetic-matrix";
import MusicHero from "@/components/ui/scroll-locked-video-hero";
import SpideyArcade from "@/components/ui/spidey-arcade";
import { projects, projectCategories } from "../../data/projects";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import {
  ExternalLink,
  Layers,
  Sparkles,
  Zap,
  Globe,
  Radio,
  ChevronRight,
  Code2,
  Maximize2,
  X,
  Play,
  Film,
  Image as ImageIcon,
  Box,
} from "lucide-react";

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedFeaturedProject, setSelectedFeaturedProject] = useState(projects[0]);
  const [activeLabModal, setActiveLabModal] = useState(null);
  const [stageViewMode, setStageViewMode] = useState("visual"); // "visual" | "3d"

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        background: "transparent",
        overflow: "hidden",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
      }}
    >
      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229, 9, 20, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="section" style={{ position: "relative", zIndex: 5, maxWidth: "1340px", margin: "0 auto", padding: "0 clamp(1.25rem, 4vw, 3rem)" }}>
        {/* Section Heading */}
        <SectionHeading
          number="02"
          label="MULTIVERSE LABS & DEPLOYMENTS"
          title="WEB & 3D SPATIAL"
          titleAccent="PORTFOLIO LABS."
        />

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.82rem, 1.4vw, 0.92rem)",
            color: "var(--color-muted)",
            maxWidth: "760px",
            marginTop: "-1rem",
            marginBottom: "3rem",
            lineHeight: 1.7,
          }}
        >
          Koleksi proyek aplikasi web modern, eksperimen 3D WebGL interaktif, dan arsitektur microservices. Seluruh proyek telah di-deploy langsung ke production dan dapat diuji secara live.
        </p>

        {/* 1. HERO 3D INTERACTIVE SHOWCASE STAGE */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="neon-card"
          style={{
            padding: "clamp(1.25rem, 3vw, 2.25rem)",
            borderRadius: "24px",
            background: "linear-gradient(135deg, rgba(12, 16, 30, 0.88), rgba(5, 7, 14, 0.95))",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            boxShadow: "0 25px 50px rgba(0,0,0,0.85), 0 0 30px rgba(0, 240, 255, 0.12)",
            marginBottom: "3.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className="showcase-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "2rem", alignItems: "center" }}>
            {/* Left Col: Details of Selected Project */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.85rem", flexWrap: "wrap" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: selectedFeaturedProject.accentColor,
                    background: "rgba(255, 255, 255, 0.04)",
                    border: `1px solid ${selectedFeaturedProject.accentColor}50`,
                    padding: "0.25rem 0.65rem",
                    borderRadius: "4px",
                    fontWeight: 700,
                  }}
                >
                  {selectedFeaturedProject.earthBadge}
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "#10b981",
                    background: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  ● {selectedFeaturedProject.stats.status}
                </span>

                {selectedFeaturedProject.is3D && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "#ac4bff",
                      background: "rgba(172, 75, 255, 0.12)",
                      border: "1px solid rgba(172, 75, 255, 0.35)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "4px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <Sparkles size={12} /> 3D Accelerated
                  </span>
                )}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.15,
                  marginBottom: "0.4rem",
                }}
              >
                {selectedFeaturedProject.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: selectedFeaturedProject.accentColor,
                  fontWeight: 600,
                  marginBottom: "1rem",
                }}
              >
                {selectedFeaturedProject.subtitle}
              </p>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  color: "var(--color-text)",
                  lineHeight: 1.7,
                  marginBottom: "1.25rem",
                }}
              >
                {selectedFeaturedProject.description}
              </p>

              {/* Key Features List */}
              <div style={{ marginBottom: "1.5rem" }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.5rem",
                  }}
                >
                  KAPABILITAS UTAMA:
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {selectedFeaturedProject.keyFeatures.slice(0, 3).map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "#fff",
                      }}
                    >
                      <ChevronRight size={13} color={selectedFeaturedProject.accentColor} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
                {selectedFeaturedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "rgba(255,255,255,0.85)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "6px",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                {selectedFeaturedProject.interactiveComponent && (
                  <button
                    onClick={() => setActiveLabModal(selectedFeaturedProject.interactiveComponent)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.55rem",
                      padding: "0.8rem 1.4rem",
                      borderRadius: "8px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                      background: "linear-gradient(135deg, #00f0ff, #ac4bff)",
                      color: "#050510",
                      fontWeight: 800,
                      cursor: "pointer",
                      border: "none",
                      boxShadow: "0 0 25px rgba(0, 240, 255, 0.4)",
                    }}
                  >
                    <Sparkles size={15} />
                    <span>LAUNCH LIVE LAB</span>
                  </button>
                )}

                <a
                  href={selectedFeaturedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.8rem 1.4rem",
                    borderRadius: "8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    letterSpacing: "0.08em",
                    background: `linear-gradient(135deg, ${selectedFeaturedProject.accentColor}, var(--color-red))`,
                    color: "#ffffff",
                    boxShadow: `0 0 20px ${selectedFeaturedProject.accentColor}40`,
                  }}
                >
                  <Globe size={15} />
                  <span>BUKA LIVE DEMO</span>
                  <ExternalLink size={14} />
                </a>

                <a
                  href={selectedFeaturedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    padding: "0.8rem 1.3rem",
                    borderRadius: "8px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                  }}
                >
                  <GithubIcon size={15} />
                  <span>INSPECT SOURCE</span>
                </a>
              </div>
            </div>

            {/* Right Col: Live Interactive Media & 3D Hologram Canvas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Dual Mode Switcher: 4K Visual Showcase vs 3D Hologram */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: "0.3rem 0.5rem",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  <button
                    onClick={() => setStageViewMode("visual")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: stageViewMode === "visual" ? "rgba(0, 240, 255, 0.15)" : "transparent",
                      border: stageViewMode === "visual" ? "1px solid rgba(0, 240, 255, 0.4)" : "1px solid transparent",
                      color: stageViewMode === "visual" ? "#00f0ff" : "var(--color-muted)",
                      transition: "all 0.2s",
                    }}
                  >
                    <ImageIcon size={12} />
                    <span>4K VISUAL SHOWCASE</span>
                  </button>

                  <button
                    onClick={() => setStageViewMode("3d")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.35rem 0.75rem",
                      borderRadius: "6px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: stageViewMode === "3d" ? "rgba(172, 75, 255, 0.15)" : "transparent",
                      border: stageViewMode === "3d" ? "1px solid rgba(172, 75, 255, 0.4)" : "1px solid transparent",
                      color: stageViewMode === "3d" ? "#ac4bff" : "var(--color-muted)",
                      transition: "all 0.2s",
                    }}
                  >
                    <Box size={12} />
                    <span>3D HOLOGRAM</span>
                  </button>
                </div>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    color: selectedFeaturedProject.accentColor,
                    paddingRight: "0.4rem",
                    fontWeight: 600,
                  }}
                >
                  {selectedFeaturedProject.earthBadge}
                </span>
              </div>

              {/* Media Content Display */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "340px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "rgba(5, 7, 14, 0.95)",
                  border: `1px solid ${selectedFeaturedProject.accentColor}40`,
                  boxShadow: `0 15px 35px rgba(0, 0, 0, 0.7), 0 0 25px ${selectedFeaturedProject.accentColor}18`,
                }}
              >
                {stageViewMode === "visual" ? (
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    {selectedFeaturedProject.videoPreview ? (
                      <video
                        key={selectedFeaturedProject.videoPreview}
                        src={selectedFeaturedProject.videoPreview}
                        poster={selectedFeaturedProject.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.95) contrast(1.1)",
                        }}
                      />
                    ) : (
                      <img
                        src={selectedFeaturedProject.image}
                        alt={selectedFeaturedProject.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.95) contrast(1.05)",
                        }}
                      />
                    )}

                    {/* HUD Scanlines & Frame Overlays */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Tech Corner Crosshairs */}
                    <div style={{ position: "absolute", top: "10px", left: "12px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: selectedFeaturedProject.accentColor, fontWeight: 800 }}>+</div>
                    <div style={{ position: "absolute", top: "10px", right: "12px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: selectedFeaturedProject.accentColor, fontWeight: 800 }}>+</div>
                    <div style={{ position: "absolute", bottom: "10px", left: "12px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: selectedFeaturedProject.accentColor, fontWeight: 800 }}>+</div>
                    <div style={{ position: "absolute", bottom: "10px", right: "12px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: selectedFeaturedProject.accentColor, fontWeight: 800 }}>+</div>

                    {/* Badge at Bottom Left of Preview */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "14px",
                        left: "14px",
                        background: "rgba(5, 7, 14, 0.85)",
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${selectedFeaturedProject.accentColor}50`,
                        padding: "0.3rem 0.7rem",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "#ffffff",
                      }}
                    >
                      <Sparkles size={11} color={selectedFeaturedProject.accentColor} />
                      <span>{selectedFeaturedProject.title} // 4K RENDER</span>
                    </div>
                  </div>
                ) : (
                  <SpiderHolo3D
                    modelType={selectedFeaturedProject.modelType || "orb"}
                    accentColor={selectedFeaturedProject.accentColor}
                    height="340px"
                    interactive={true}
                    autoRotate={true}
                    showBadge={true}
                    multiverseName={selectedFeaturedProject.earthBadge}
                  />
                )}
              </div>

              {/* Quick Model Selector Pills */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)", marginRight: "0.25rem" }}>
                  PILIH LAB SHOWCASE:
                </span>
                {projects.slice(0, 6).map((p) => {
                  const isSelected = selectedFeaturedProject.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedFeaturedProject(p)}
                      style={{
                        padding: "0.3rem 0.65rem",
                        borderRadius: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        cursor: "pointer",
                        border: isSelected ? `1px solid ${p.accentColor}` : "1px solid rgba(255,255,255,0.08)",
                        background: isSelected ? `${p.accentColor}25` : "rgba(255,255,255,0.03)",
                        color: isSelected ? "#ffffff" : "var(--color-muted)",
                        transition: "all 0.2s",
                      }}
                    >
                      {p.title.split(" ")[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. CATEGORY FILTER BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "2.5rem",
          }}
        >
          {projectCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: "0.55rem 1.1rem",
                  borderRadius: "100px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  border: isActive ? "1px solid var(--color-red)" : "1px solid rgba(255, 255, 255, 0.1)",
                  background: isActive ? "linear-gradient(135deg, var(--color-red), rgba(172, 75, 255, 0.7))" : "rgba(255, 255, 255, 0.03)",
                  color: isActive ? "#ffffff" : "var(--color-muted)",
                  boxShadow: isActive ? "0 0 15px rgba(229, 9, 20, 0.4)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3. MULTIVERSE PROJECTS CARDS GRID */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          className="projects-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={fadeUp}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6, borderColor: project.accentColor }}
                className="neon-card project-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "1.5rem",
                  borderRadius: "18px",
                  background: "rgba(10, 14, 24, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.7)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent Top Edge Glow Bar */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
                  }}
                />

                <div>
                  {/* High-Impact 16:9 Media Preview Box */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16/9",
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "1rem",
                      background: "#080a12",
                      border: `1px solid ${project.accentColor}30`,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s",
                        filter: "brightness(0.92) contrast(1.08)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                    />

                    {/* Scanline texture */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 50%)",
                        backgroundSize: "100% 4px",
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
                    />

                    {/* Tech Corner Crosshairs */}
                    <span style={{ position: "absolute", top: "6px", left: "8px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: project.accentColor, fontWeight: 800 }}>+</span>
                    <span style={{ position: "absolute", top: "6px", right: "8px", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: project.accentColor, fontWeight: 800 }}>+</span>

                    {/* Video indicator badge if has videoPreview */}
                    {project.videoPreview && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "8px",
                          right: "8px",
                          background: "rgba(5, 7, 14, 0.85)",
                          backdropFilter: "blur(6px)",
                          border: "1px solid rgba(0, 240, 255, 0.4)",
                          padding: "0.18rem 0.45rem",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color: "#00f0ff",
                          fontWeight: 700,
                        }}
                      >
                        <Film size={10} />
                        <span>VIDEO</span>
                      </div>
                    )}
                  </div>

                  {/* Top Metadata Row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.85rem" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: project.accentColor,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: `1px solid ${project.accentColor}40`,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "4px",
                        fontWeight: 600,
                      }}
                    >
                      {project.earthBadge}
                    </span>

                    {project.interactiveComponent && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "#00f0ff",
                          background: "rgba(0, 240, 255, 0.1)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          border: "1px solid rgba(0, 240, 255, 0.25)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontWeight: 700,
                        }}
                      >
                        <Sparkles size={11} /> LAB COMPONENT
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {project.title}
                  </h4>

                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: project.accentColor,
                      marginBottom: "0.85rem",
                      fontWeight: 500,
                    }}
                  >
                    {project.subtitle}
                  </p>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.82rem",
                      color: "var(--color-text)",
                      lineHeight: 1.6,
                      marginBottom: "1.2rem",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.2rem" }}>
                    {project.techStack.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-muted)",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    marginTop: "auto",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    {project.interactiveComponent ? (
                      <button
                        onClick={() => setActiveLabModal(project.interactiveComponent)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "#00f0ff",
                          background: "rgba(0, 240, 255, 0.12)",
                          border: "1px solid rgba(0, 240, 255, 0.3)",
                          padding: "0.35rem 0.65rem",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        <Play size={12} fill="#00f0ff" />
                        <span>Live Lab</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedFeaturedProject(project);
                          const el = document.getElementById("projects");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          color: "var(--color-muted)",
                          cursor: "pointer",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = project.accentColor)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                      >
                        <Maximize2 size={13} />
                        <span>3D Inspect</span>
                      </button>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Repository"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-muted)",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--color-muted)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      }}
                    >
                      <GithubIcon size={15} />
                    </a>

                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.45rem 0.9rem",
                        borderRadius: "8px",
                        background: `${project.accentColor}20`,
                        border: `1px solid ${project.accentColor}50`,
                        color: project.accentColor,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = project.accentColor;
                        e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = `${project.accentColor}20`;
                        e.currentTarget.style.color = project.accentColor;
                      }}
                    >
                      <span>Demo</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. FULLSCREEN INTERACTIVE COMPONENT LAB MODAL */}
      <AnimatePresence>
        {activeLabModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              background: "rgba(3, 5, 10, 0.94)",
              backdropFilter: "blur(25px)",
              WebkitBackdropFilter: "blur(25px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(10px, 2vw, 24px)",
            }}
          >
            {/* Modal Top Control Bar */}
            <div
              style={{
                width: "100%",
                maxWidth: "1100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
                padding: "0 8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#fff", fontWeight: 700 }}>
                  {activeLabModal === "kinetic-matrix"
                    ? "KINETIC TOPOLOGICAL MATRIX LAB"
                    : activeLabModal === "spidey-arcade"
                    ? "🕷️ SPIDER-VERSE WEB SLINGER ARCADE // GAME LAB"
                    : "SCROLL-LOCKED VIDEO HERO LAB"}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-muted)", background: "rgba(255,255,255,0.06)", padding: "0.15rem 0.5rem", borderRadius: "4px" }}>
                  INTERACTIVE PREVIEW
                </span>
              </div>

              <button
                onClick={() => setActiveLabModal(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "rgba(229, 9, 20, 0.2)",
                  border: "1px solid var(--color-red)",
                  color: "#ffffff",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                }}
              >
                <span>TUTUP LAB</span>
                <X size={15} />
              </button>
            </div>

            {/* Component Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "1100px",
                height: "calc(100vh - 120px)",
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(0, 240, 255, 0.35)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(0, 240, 255, 0.15)",
                background: "#000",
              }}
            >
              {activeLabModal === "kinetic-matrix" && (
                <KineticMatrix title="TOPOLOGY" className="h-full w-full" />
              )}

              {activeLabModal === "scroll-hero" && (
                <MusicHero fullBleed={false} style={{ height: "100%", width: "100%" }} />
              )}

              {activeLabModal === "spidey-arcade" && (
                <SpideyArcade className="h-full w-full" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Responsive Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 900px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}
