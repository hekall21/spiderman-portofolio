import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Spider = ({ delay, left, duration, dropDepth }) => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: `${left}%`,
        zIndex: 9993,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: [-100, dropDepth, dropDepth, -100] }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 6 + 3,
        ease: "easeInOut",
      }}
    >
      {/* Luminous Web thread */}
      <div
        style={{
          width: "1.5px",
          height: "100vh",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.6), var(--color-red), rgba(255,255,255,0.2))",
          boxShadow: "0 0 6px rgba(255,255,255,0.6)",
          position: "absolute",
          bottom: "26px",
        }}
      />

      {/* Spider SVG */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-red)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: "drop-shadow(0 0 10px var(--color-red))",
          transform: "rotate(180deg)",
          zIndex: 2,
        }}
      >
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        <circle cx="12" cy="12" r="4" fill="rgba(229,9,20,0.3)" />
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4" />
        <path d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4" />
        <path d="M8 12H4M8 10L3 7M8 14l-5 3M16 12h4M16 10l5-3M16 14l5 3" />
      </svg>
    </motion.div>
  );
};

export default function HangingSpiders() {
  const [spiders, setSpiders] = useState([]);
  const [cornerSpideySwing, setCornerSpideySwing] = useState(false);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 3 : 5;
    const newSpiders = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 85 + 7,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 5,
      dropDepth: Math.random() * 250 + 80,
    }));
    setSpiders(newSpiders);
  }, []);

  return (
    <>
      {/* Drop Spiders */}
      {spiders.map((s) => (
        <Spider key={s.id} {...s} />
      ))}

      {/* Persistent Corner Web-Slinging Spider-Man (Clickable Easter Egg) */}
      <motion.div
        onClick={() => {
          setCornerSpideySwing(true);
          setTimeout(() => setCornerSpideySwing(false), 1200);
        }}
        title="Spider-Man siap beraksi! Klik untuk swing!"
        style={{
          position: "fixed",
          top: 0,
          right: "clamp(10px, 3vw, 40px)",
          zIndex: 9994,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          transformOrigin: "top center",
        }}
        animate={
          cornerSpideySwing
            ? { y: [0, -40, 20, 0], rotate: [0, 360, -15, 0] }
            : { y: [0, 10, 0], rotate: [-3, 3, -3] }
        }
        transition={
          cornerSpideySwing
            ? { duration: 1, ease: "easeInOut" }
            : { repeat: Infinity, duration: 4.5, ease: "easeInOut" }
        }
      >
        {/* Glowing Web Thread */}
        <div
          style={{
            width: "2px",
            height: "75px",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9), var(--color-red), rgba(255,255,255,0.3))",
            boxShadow: "0 0 8px rgba(255,255,255,0.8), 0 0 15px var(--color-red)",
          }}
        />

        {/* Upside Down Spidey Mascot */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          style={{
            marginTop: "-6px",
            position: "relative",
          }}
        >
          <img
            src="/spiderman-transparent.png"
            alt="Spider-Man"
            style={{
              width: "clamp(55px, 6vw, 75px)",
              filter:
                "drop-shadow(0 10px 20px rgba(0,0,0,0.8)) drop-shadow(0 0 15px rgba(229,9,20,0.6))",
              display: "block",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
