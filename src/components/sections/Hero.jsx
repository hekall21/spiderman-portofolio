import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import WebBackground from "../common/WebBackground";
import { staggerContainer, fadeUp, fadeIn } from "../../animations/variants";
import { MapPin, ArrowUpRight, Sparkles, Terminal, Shield, Zap, ArrowRight, ShieldCheck, GraduationCap, Award } from "lucide-react";

function useTypewriter(words, typingSpeed = 60, deletingSpeed = 30, pause = 2000) {
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
  const chars = "!<>-_\\\\/[]{}—=+*^?#_";
  
  useEffect(() => {
    // Only run glitch loop on desktop to save battery & CPU on mobile
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return;
    }

    let interval;
    const triggerGlitch = () => {
      setIsGlitching(true);
      let iteration = 0;
      
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(text
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
        );
        
        if(iteration >= text.length){ 
          clearInterval(interval);
          setIsGlitching(false);
        }
        
        iteration += 1 / 3;
      }, 40);
    };

    const loop = setInterval(triggerGlitch, 6000);
    return () => {
      clearInterval(interval);
      clearInterval(loop);
    };
  }, [text]);

  return (
    <span 
      className="glitch-hover"
      style={{ 
        display: "inline-block",
        position: "relative",
        color: isGlitching ? "var(--color-white)" : "inherit",
        textShadow: isGlitching ? "2px 0 var(--color-red), -2px 0 var(--color-blue)" : "none",
        transition: "color 0.2s"
      }}
    >
      {displayText}
    </span>
  );
};

export default function Hero() {
  const typedRole = useTypewriter(profile.roles, 60, 30, 2000);
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [spideyAction, setSpideyAction] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const handleMouseMove = (e) => {
      setMousePosition({
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
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "90px",
        paddingBottom: "4rem",
        transform: "translateZ(0)", // GPU Layer
      }}
    >
      <WebBackground variant="hero" />

      {/* Hardware-Accelerated Zero-Lag Ambient Glows */}
      <div style={{
        position: "absolute", top: "5%", left: "5%",
        width: "min(500px, 80vw)", height: "min(500px, 80vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(229, 9, 20, 0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: "5%", right: "5%",
        width: "min(500px, 80vw)", height: "min(500px, 80vw)", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(172, 75, 255, 0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0
      }} />

      {/* Content Container */}
      <div
        className="hero-grid-container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(1.25rem, 4vw, 2.5rem)",
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          alignItems: "center",
          gap: "3.5rem",
        }}
      >
        {/* Left Column - Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-text-col"
        >
          {/* Cyberpunk HUD Badge */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.45rem 1rem",
              background: "rgba(229, 9, 20, 0.1)",
              border: "1px solid rgba(229, 9, 20, 0.35)",
              borderRadius: "30px",
              marginBottom: "1.25rem",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 15px rgba(229, 9, 20, 0.2)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 10px #10b981",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.68rem, 2vw, 0.75rem)",
                color: "var(--color-white)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              SPIDER-PROTOCOL // ACTIVE & READY
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={fadeUp} style={{ marginBottom: "0.25rem" }}>
            <span style={{
              fontFamily: "var(--font-decorative)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-red)",
              textShadow: "0 0 15px rgba(229,9,20,0.6)",
              display: "block",
            }}>
              Hi, I'm
            </span>
          </motion.div>

          {/* Name */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 7vw, 5.2rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--color-white)",
            marginBottom: "1rem",
          }}>
            <motion.div variants={fadeUp}>MUHAMMAD</motion.div>
            <div className="gradient-text text-glow-red" style={{ paddingBottom: "4px" }}>
              <GlitchText text="HAIKEL SALEH" />
            </div>
          </div>

          {/* Typewriter role with HUD styling */}
          <motion.div variants={fadeUp} style={{
            marginTop: "0.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.85rem, 1.4vw, 1.15rem)",
            color: "var(--color-text)",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
            background: "rgba(10, 15, 26, 0.75)",
            padding: "0.55rem 1.1rem",
            borderRadius: "8px",
            border: "1px solid rgba(172, 75, 255, 0.3)",
            boxShadow: "0 0 20px rgba(172, 75, 255, 0.15)",
          }}>
            <Terminal size={16} color="var(--color-red)" />
            <span style={{ color: "var(--color-purple)", fontWeight: 700 }}>ROLE:</span>
            <span style={{ color: "var(--color-white)", fontWeight: 700 }}>{typedRole}</span>
            <span className="typewriter-cursor" />
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeUp} style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.88rem, 1.5vw, 0.96rem)",
            lineHeight: 1.8,
            color: "var(--color-text)",
            maxWidth: "580px",
          }}>
            {profile.description}
          </motion.p>

          {/* Location & Quick Tags */}
          <motion.div variants={fadeUp} style={{
            marginTop: "1.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-white)"
            }}>
              <MapPin size={13} color="var(--color-red)" />
              <span>{profile.location}</span>
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              background: "rgba(172, 75, 255, 0.1)",
              border: "1px solid rgba(172, 75, 255, 0.3)",
              borderRadius: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-purple)",
              fontWeight: 600,
            }}>
              <Shield size={13} />
              <span>TKJ SMKN 22 Jakarta</span>
            </div>

            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 0.85rem",
              background: "rgba(48, 128, 255, 0.1)",
              border: "1px solid rgba(48, 128, 255, 0.3)",
              borderRadius: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#38bdf8",
              fontWeight: 600,
            }}>
              <Zap size={13} />
              <span>Accounting PKL GAP</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="hero-ctas" style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#skills" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            }}>
              EXPLORE SKILLS <ArrowUpRight size={16} />
            </a>
            <a href="#notes" className="btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("notes")?.scrollIntoView({ behavior: "smooth" });
            }}>
              <Sparkles size={14} /> SPIDER-BOARD
            </a>
            <a href="#contact" className="btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
              CONTACT ME
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - Profile Image with HANGING SPIDER-MAN (100% CLEAR FACE) */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ 
            position: "relative",
            transform: shouldReduceMotion ? "none" : `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.15s ease-out"
          }} 
          className="hero-image-col"
        >
          {/* Main Photo Container */}
          <div style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto", zIndex: 2 }}>
            
            {/* Hanging Spider-Man (Positioned higher so it NEVER blocks the face) */}
            <motion.div
              onClick={handleSpideyClick}
              title="Klik Spider-Man untuk aksi web swing!"
              className="hero-hanging-spiderman"
              style={{ 
                position: "absolute",
                top: "-75px",
                right: "-25px",
                zIndex: 20,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transformOrigin: "top center",
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
                  height: "60px",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.8), var(--color-red), rgba(255,255,255,0.4))",
                  boxShadow: "0 0 8px rgba(255,255,255,0.8)",
                  marginBottom: "-6px",
                  zIndex: 1,
                }}
              />

              {/* Spider-Man Cutout */}
              <motion.img 
                src="/spiderman-transparent.png" 
                alt="Hanging Spider-Man" 
                whileHover={{ scale: 1.08 }}
                style={{
                  width: "115px",
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 15px rgba(229,9,20,0.5))",
                  display: "block",
                  zIndex: 2,
                }}
              />

              {/* Interactive Callout Tooltip */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "#fff",
                  background: "rgba(229, 9, 20, 0.9)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: "100px",
                  marginTop: "-6px",
                  letterSpacing: "0.08em",
                  border: "1px solid rgba(255,255,255,0.3)",
                  whiteSpace: "nowrap",
                  zIndex: 3,
                }}
              >
                🕸️ SPIDEY PATROL
              </div>
            </motion.div>

            {/* Profile Photo Frame (Face is 100% Unobscured) */}
            <div className="neon-card" style={{ 
              width: "100%", 
              aspectRatio: "4/5", 
              borderRadius: "22px", 
              padding: "8px",
              background: "linear-gradient(135deg, rgba(10,15,26,0.9) 0%, rgba(20,10,25,0.9) 100%)",
              border: "1.5px solid rgba(229,9,20,0.6)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(229,9,20,0.2)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                background: "#080a12",
              }}>
                <img 
                  src="/profile.jpg" 
                  alt="Muhammad Haikel Saleh"
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover",
                    objectPosition: "center 15%", // Ensures face is centered and fully visible
                    display: "block",
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback */}
                <div style={{
                  display: "none",
                  width: "100%", height: "100%",
                  alignItems: "center", justifyContent: "center",
                  background: "var(--color-bg)",
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  textAlign: "center",
                  padding: "2rem"
                }}>
                  Muhammad Haikel Saleh
                </div>
              </div>
            </div>

            {/* Dedicated Info Badge (Positioned BELOW the photo so it NEVER blocks the face!) */}
            <motion.div
              variants={fadeUp}
              style={{
                marginTop: "0.85rem",
                padding: "0.75rem 1rem",
                background: "rgba(10, 14, 24, 0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem"
                  }}
                >
                  <GraduationCap size={15} color="var(--color-cyan, #00f0ff)" />
                  <span>SMKN 22 Jakarta</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-purple)",
                    letterSpacing: "0.05em",
                    marginTop: "2px"
                  }}
                >
                  TKJ • LULUSAN 2026
                </div>
              </div>

              <div
                style={{
                  padding: "0.3rem 0.6rem",
                  background: "rgba(229, 9, 20, 0.15)",
                  border: "1px solid rgba(229, 9, 20, 0.4)",
                  borderRadius: "6px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "#fff",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                <Award size={12} color="var(--color-yellow, #ffe600)" />
                <span>BNSP CERTIFIED</span>
              </div>
            </motion.div>

          </div>

          {/* Decorative Web Pattern Behind */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) scale(1.3)",
            width: "100%", height: "100%",
            zIndex: 1,
            opacity: 0.12,
            pointerEvents: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 100 M100 0 L0 100 M50 0 L50 100 M0 50 L100 50' stroke='%23ffffff' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23e50914' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E\")",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }} />
        </motion.div>

        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 1023px) {
            .hero-grid-container { 
              grid-template-columns: 1fr !important; 
              text-align: center;
              gap: 2.5rem !important;
              padding-top: 1rem !important;
            }
            .hero-image-col { 
              order: -1 !important;
              margin: 1.5rem auto 0.5rem auto !important;
              max-width: 300px !important;
              width: 100% !important;
            }
            .hero-hanging-spiderman {
              top: -65px !important;
              right: -10px !important;
            }
            .hero-hanging-spiderman img {
              width: 95px !important;
            }
            .hero-text-col {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .hero-ctas { 
              justify-content: center !important; 
              width: 100%;
            }
            #hero p, #hero div { 
              margin-left: auto; 
              margin-right: auto; 
            }
            #hero .btn-primary, #hero .btn-secondary { 
              margin: 0 auto; 
            }
          }
        `}} />
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "100px",
          background: "linear-gradient(0deg, var(--color-bg) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </section>
  );
}
