import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import WebBackground from "../common/WebBackground";
import { staggerContainer, fadeUp, fadeIn } from "../../animations/variants";
import { MapPin, ArrowUpRight } from "lucide-react";

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
      }, 30);
    };

    triggerGlitch(); // Initial trigger
    const loop = setInterval(triggerGlitch, 5000); // Trigger every 5 seconds
    
    return () => {
      clearInterval(interval);
      clearInterval(loop);
    };
  }, [text]);

  return (
    <span style={{ 
      display: "inline-block",
      position: "relative",
      color: isGlitching ? "var(--color-white)" : "inherit",
      textShadow: isGlitching ? "2px 0 var(--color-red), -2px 0 var(--color-blue)" : "none",
      transition: "color 0.2s"
    }}>
      {displayText}
    </span>
  );
};

export default function Hero() {
  const typedRole = useTypewriter(profile.roles, 60, 30, 2000);
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion || window.innerWidth < 1024) return;
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.015,
        y: (e.clientY - window.innerHeight / 2) * 0.015,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "72px" // Account for navbar
      }}
    >
      <WebBackground variant="hero" />

      {/* Cinematic glows */}
      <div style={{
        position: "absolute", top: "10%", left: "10%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "var(--color-red)", filter: "blur(200px)",
        opacity: 0.15, pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "var(--color-purple)", filter: "blur(200px)",
        opacity: 0.15, pointerEvents: "none", zIndex: 0
      }} />

      {/* Content Container */}
      <div
        className="hero-grid-container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(1.25rem, 5vw, 2rem)",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          alignItems: "center",
          gap: "4rem"
        }}
      >
        {/* Left Column - Text Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hero-text-col"
        >
          {/* Greeting */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1.5rem" }}>
            <span style={{
              fontFamily: "var(--font-decorative)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-red)",
              textShadow: "0 0 10px rgba(229,9,20,0.4)",
            }}>
              Hi, I'm
            </span>
          </motion.div>

          {/* Name */}
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 8vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--color-white)",
            marginBottom: "0.5rem"
          }}>
            <motion.div variants={fadeUp}>Muhammad</motion.div>
            <div className="gradient-text text-glow-red" style={{ paddingBottom: "10px" }}>
              <GlitchText text="Haikel Saleh" />
            </div>
          </div>

          {/* Typewriter role */}
          <motion.div variants={fadeUp} style={{
            marginTop: "1.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)",
            color: "var(--color-text)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap"
          }}>
            <span style={{ color: "var(--color-purple)" }}>Role:</span>
            <span style={{ color: "var(--color-white)", fontWeight: 600 }}>{typedRole}</span>
            <span className="typewriter-cursor" />
          </motion.div>

          {/* Description */}
          <motion.p variants={fadeUp} style={{
            marginTop: "2rem",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "var(--color-muted)",
            maxWidth: "540px",
          }}>
            {profile.description}
          </motion.p>

          {/* Location / Status Badge */}
          <motion.div variants={fadeUp} style={{
            marginTop: "2rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 1rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "100px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-text)"
          }}>
            <MapPin size={14} color="var(--color-red)" />
            {profile.location} <span style={{ color: "var(--color-purple)", margin: "0 0.5rem" }}>|</span> Open to Work
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="hero-ctas" style={{ marginTop: "3rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <a href="#skills" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
            }}>
              EXPLORE SKILLS <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="btn-secondary" onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}>
              CONTACT ME
            </a>
          </motion.div>
        </motion.div>

        {/* Right Column - Profile Image & Visuals */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          style={{ 
            position: "relative",
            transform: shouldReduceMotion ? "none" : `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.1s ease-out"
          }} 
          className="hero-image-col"
        >
          {/* Main Photo Container */}
          <div style={{ position: "relative", width: "100%", maxWidth: "340px", margin: "0 auto", zIndex: 2 }}>
            
            {/* Hanging Spiderman */}
            <motion.div
               className="hero-hanging-spiderman"
               style={{ 
                 position: "absolute", top: "-50px", right: "-30px", zIndex: 10,
                 filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.8))"
               }}
               animate={shouldReduceMotion ? {} : { y: [0, 8, 0], rotate: [-2, 2, -2] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <img 
                src="/spiderman-transparent.png" 
                alt="Spider-Man" 
                style={{ width: "110px" }}
              />
            </motion.div>

            {/* Profile Photo */}
            <div className="neon-card" style={{ 
              width: "100%", 
              aspectRatio: "3/4", 
              borderRadius: "20px", 
              padding: "10px",
              background: "rgba(10,15,26,0.6)",
              border: "1px solid var(--color-purple)",
              boxShadow: "0 0 40px rgba(172,75,255,0.2), inset 0 0 20px rgba(172,75,255,0.1)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                position: "relative"
              }}>
                <img 
                  src="/profile.jpg" 
                  alt="Muhammad Haikel Saleh"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback if photo not found */}
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
                  Please add 'profile.jpg' to the public folder
                </div>

                {/* Cyberpunk Scanline over image */}
                <div style={{
                  position: "absolute", top: 0, left: 0, width: "100%", height: "4px",
                  background: "rgba(229,9,20,0.5)",
                  boxShadow: "0 0 10px var(--color-red)",
                  animation: "scanline 6s linear infinite",
                  mixBlendMode: "overlay"
                }} />
              </div>
            </div>
          </div>

          {/* Decorative Web Behind */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%) scale(1.4)",
            width: "100%", height: "100%",
            zIndex: 1,
            opacity: 0.15,
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
              order: -1 !important; /* Make image appear ON TOP in center on mobile */
              margin: 0 auto !important;
              max-width: 260px !important;
              width: 100% !important;
            }
            .hero-hanging-spiderman img {
              width: 90px !important;
            }
            .hero-hanging-spiderman {
              top: -40px !important;
              right: -20px !important;
            }
            .hero-text-col {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .hero-ctas { 
              justify-content: center !important; 
            }
            #hero p, #hero div { 
              margin-left: auto; 
              margin-right: auto; 
            }
            #hero .btn-primary, #hero .btn-secondary { 
              margin: 0 auto; 
            }
          }
          @keyframes scanline {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
        `}} />
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "150px",
          background: "linear-gradient(0deg, var(--color-bg) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </section>
  );
}
