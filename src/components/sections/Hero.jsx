import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import WebBackground from "../common/WebBackground";
import { staggerContainer, fadeUp, fadeIn } from "../../animations/variants";
import {
  MapPin,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Shield,
  Zap,
  Award,
} from "lucide-react";

function useTypewriter(words, typingSpeed = 55, deletingSpeed = 25, pause = 2200) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, text.length + 1));
          if (text.length + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setText(currentWord.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return text;
}

const GlitchText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const chars = "!<>-_\\\\/[]{}—=+*^?#_01";
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const triggerGlitch = () => {
      setIsGlitching(true);
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        if (iteration >= text.length) {
          clearInterval(interval);
          setIsGlitching(false);
        }
        iteration += 1 / 2.5;
      }, 35);
    };

    const loop = setInterval(triggerGlitch, 5000);
    return () => clearInterval(loop);
  }, [text]);

  return (
    <span
      className="glitch-hover"
      style={{
        display: "inline-block",
        position: "relative",
        color: isGlitching ? "#00f0ff" : "inherit",
        textShadow: isGlitching
          ? "2px 0 var(--color-red), -2px 0 var(--color-cyan, #00f0ff)"
          : "none",
        transition: "color 0.2s",
      }}
    >
      {displayText}
    </span>
  );
};

export default function Hero() {
  const typedRole = useTypewriter(profile.roles, 55, 25, 2200);
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spideyAction, setSpideyAction] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) * 0.015,
        y: (e.clientY - window.innerHeight / 2) * 0.015,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  const handleSpideyClick = () => {
    setSpideyAction(true);
    setTimeout(() => setSpideyAction(false), 1200);
  };

  return (
    <section
      id="hero"
      className="hero-section-wrapper"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "110px",
        paddingBottom: "4rem",
        transform: "translateZ(0)",
      }}
    >
      <WebBackground variant="hero" />

      {/* Spider-Sense Ambient Glow Meshes */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "min(600px, 85vw)",
          height: "min(600px, 85vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(229, 9, 20, 0.16) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "min(600px, 85vw)",
          height: "min(600px, 85vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 240, 255, 0.14) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          filter: "blur(60px)",
        }}
      />

      {/* Main Grid Content */}
      <div
        className="hero-grid-container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1340px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(1.25rem, 4vw, 3rem)",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          alignItems: "center",
          gap: "clamp(2.5rem, 5vw, 4.5rem)",
        }}
      >
        {/* Left Column - Headline & Bio */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-text-col"
        >
          {/* Top Micro-Badges Row */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
            }}
          >
            {/* Live Signal */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.35rem 0.85rem",
                background: "rgba(229, 9, 20, 0.12)",
                border: "1px solid rgba(229, 9, 20, 0.4)",
                borderRadius: "4px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 0 15px rgba(229, 9, 20, 0.25)",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 10px #10b981",
                  animation: "pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-white)",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                SPIDER-SENSE // ONLINE
              </span>
            </div>

            {/* BNSP Certified Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.35rem 0.85rem",
                background: "rgba(0, 240, 255, 0.08)",
                border: "1px solid rgba(0, 240, 255, 0.35)",
                borderRadius: "4px",
                backdropFilter: "blur(10px)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "#00f0ff",
                fontWeight: 600,
              }}
            >
              <Award size={13} color="#00f0ff" />
              <span>BNSP CERTIFIED // TKJ</span>
            </div>
          </motion.div>

          {/* Monumental Hero Headline */}
          <div style={{ marginBottom: "1.25rem" }}>
            <motion.div
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-decorative)",
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                color: "var(--color-red)",
                textShadow: "0 0 20px rgba(229,9,20,0.6)",
                lineHeight: 1,
                marginBottom: "0.25rem",
              }}
            >
              Hello, World. I am
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)",
                fontWeight: 900,
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                color: "var(--color-white)",
              }}
            >
              MUHAMMAD
              <br />
              <span className="gradient-text text-glow-red" style={{ display: "inline-block" }}>
                <GlitchText text="HAIKEL SALEH" />
              </span>
            </motion.h1>
          </div>

          {/* Interactive Role Terminal Capsule */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.65rem",
              flexWrap: "wrap",
              background: "rgba(10, 14, 24, 0.85)",
              border: "1px solid rgba(0, 240, 255, 0.3)",
              boxShadow: "0 0 25px rgba(0, 240, 255, 0.15)",
              padding: "0.55rem 1.15rem",
              borderRadius: "6px",
              marginTop: "0.4rem",
            }}
          >
            <Terminal size={15} color="var(--color-red)" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#00f0ff", fontWeight: 700 }}>
              MISSION_ROLE:
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#fff", fontWeight: 600 }}>
              {typedRole}
            </span>
            <span className="typewriter-cursor" />
          </motion.div>

          {/* High-Impact Description */}
          <motion.p
            variants={fadeUp}
            style={{
              marginTop: "1.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.88rem, 1.5vw, 0.98rem)",
              lineHeight: 1.8,
              color: "rgba(200, 204, 214, 0.9)",
              maxWidth: "600px",
            }}
          >
            Lulusan <strong>Teknik Komputer & Jaringan (TKJ) SMKN 22 Jakarta</strong> bersertifikasi resmi <strong>BNSP</strong>. Menggabungkan keahlian infrastruktur jaringan, administrasi data, dan rancang bangun web modern kelas dunia.
          </motion.p>

          {/* Location & Institution Chips */}
          <motion.div
            variants={fadeUp}
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.8rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-white)",
              }}
            >
              <MapPin size={13} color="var(--color-red)" />
              <span>Jakarta Timur, Indonesia</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.8rem",
                background: "rgba(172, 75, 255, 0.1)",
                border: "1px solid rgba(172, 75, 255, 0.35)",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-purple)",
                fontWeight: 600,
              }}
            >
              <Shield size={13} />
              <span>TKJ SMKN 22 Jakarta</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.8rem",
                background: "rgba(48, 128, 255, 0.1)",
                border: "1px solid rgba(48, 128, 255, 0.35)",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "#38bdf8",
                fontWeight: 600,
              }}
            >
              <Zap size={13} />
              <span>PKL PT GAP Accounting</span>
            </div>
          </motion.div>

          {/* Action CTAs with Dual-State Sliding Typography */}
          <motion.div
            variants={fadeUp}
            className="hero-ctas"
            style={{
              marginTop: "2.25rem",
              display: "flex",
              gap: "0.9rem",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#skills"
              className="btn-primary with-crosshairs"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "0.85rem 1.6rem",
                borderRadius: "4px",
                boxShadow: "0 0 25px rgba(229, 9, 20, 0.4)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
              }}
            >
              <div className="btn-slide-wrap">
                <span className="label-top">EXPLORE ARSENAL</span>
                <span className="label-bot">EXPLORE ARSENAL</span>
              </div>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="#notes"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("notes")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.85rem 1.4rem",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
              }}
            >
              <Sparkles size={13} color="var(--color-purple)" />
              <div className="btn-slide-wrap">
                <span className="label-top">SPIDER-BOARD</span>
                <span className="label-bot">SPIDER-BOARD</span>
              </div>
            </a>

            <a
              href="#contact"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.55rem",
                padding: "0.85rem 1.4rem",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
              }}
            >
              <div className="btn-slide-wrap">
                <span className="label-top">TRANSMIT SIGNAL</span>
                <span className="label-bot">TRANSMIT SIGNAL</span>
              </div>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - 100% Clear Crystal Profile Card (Zero Overlapping Text on Face) */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{
            position: "relative",
            transform: shouldReduceMotion ? "none" : `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.15s ease-out",
          }}
          className="hero-image-col"
        >
          {/* Hanging Spider-Man (Attached safely to Card, scrolls naturally & NEVER covers navbar or face) */}
          <motion.div
            onClick={handleSpideyClick}
            title="Klik Spider-Man untuk aksi web swing!"
            className="hero-hanging-spiderman"
            style={{
              position: "absolute",
              top: "-75px",
              right: "-15px",
              zIndex: 25,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transformOrigin: "top center",
              pointerEvents: "auto",
            }}
            animate={
              spideyAction
                ? { y: [0, -25, 10, 0], rotate: [0, 360, -10, 0], scale: [1, 1.15, 1] }
                : shouldReduceMotion
                ? {}
                : { y: [0, 10, 0], rotate: [-3, 3, -3] }
            }
            transition={
              spideyAction
                ? { duration: 1.1, ease: "easeInOut" }
                : { repeat: Infinity, duration: 4.2, ease: "easeInOut" }
            }
          >
            {/* Luminous Web Line */}
            <div
              style={{
                width: "2px",
                height: "55px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.9), var(--color-red), rgba(255,255,255,0.3))",
                boxShadow: "0 0 10px rgba(255,255,255,0.9)",
                marginBottom: "-4px",
                zIndex: 1,
              }}
            />

            {/* Spider-Man Cutout PNG */}
            <motion.img
              src="/spiderman-transparent.png"
              alt="Hanging Spider-Man"
              whileHover={{ scale: 1.1 }}
              style={{
                width: "clamp(75px, 8vw, 100px)",
                filter:
                  "drop-shadow(0 15px 25px rgba(0,0,0,0.85)) drop-shadow(0 0 20px rgba(229,9,20,0.6))",
                display: "block",
                zIndex: 2,
              }}
            />

            {/* Callout Pill */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.58rem",
                color: "#fff",
                background: "rgba(229, 9, 20, 0.95)",
                padding: "0.15rem 0.5rem",
                borderRadius: "100px",
                marginTop: "-4px",
                letterSpacing: "0.08em",
                border: "1px solid rgba(255,255,255,0.4)",
                whiteSpace: "nowrap",
                zIndex: 3,
                boxShadow: "0 0 10px rgba(229,9,20,0.5)",
              }}
            >
              🕸️ SPIDEY PATROL
            </div>
          </motion.div>

          {/* Main Card Container */}
          <div
            className="neon-card with-crosshairs"
            style={{
              width: "100%",
              maxWidth: "360px",
              margin: "0 auto",
              padding: "1.25rem",
              borderRadius: "16px",
              background: "rgba(10, 12, 22, 0.88)",
              border: "1px solid rgba(0, 240, 255, 0.35)",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.8), 0 0 35px rgba(0, 240, 255, 0.15), inset 0 0 20px rgba(229, 9, 20, 0.08)",
            }}
          >
            {/* 100% UNBLOCKED Photo Box */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3/4",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                background: "rgba(0, 0, 0, 0.9)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
              }}
            >
              <img
                src={profile.image || "/profile.jpg"}
                alt="Muhammad Haikel Saleh"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </div>

            {/* Identity & Status Cleanly BELOW the Photo (No overlap!) */}
            <div style={{ marginTop: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.35rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.68rem",
                    color: "#00f0ff",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}
                >
                  AGENT_ID // 220806
                </span>

                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    border: "1px solid rgba(16, 185, 129, 0.35)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  ● VERIFIED
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                }}
              >
                M. HAIKEL SALEH
              </div>

              {/* Sub-meta metrics */}
              <div
                style={{
                  marginTop: "0.75rem",
                  paddingTop: "0.65rem",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-muted)",
                }}
              >
                <span>SPEC: <strong style={{ color: "var(--color-red)" }}>TKJ NETWORK</strong></span>
                <span>STATUS: <strong style={{ color: "var(--color-white)" }}>AVAILABLE</strong></span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
