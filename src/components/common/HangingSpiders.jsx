import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Spider = ({ delay, left, duration, dropDepth }) => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: `${left}%`,
        zIndex: 9995,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: [ -100, dropDepth, dropDepth, -100 ] }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5 + 2,
        ease: "easeInOut"
      }}
    >
      {/* Web thread */}
      <div style={{ width: "1px", height: "100vh", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.4))", position: "absolute", bottom: "30px" }} />
      
      {/* Spider SVG */}
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--color-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 8px var(--color-red))", transform: "rotate(180deg)", zIndex: 2 }}>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4"/>
        <path d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4"/>
        <path d="M8 12H4M8 10L3 7M8 14l-5 3M16 12h4M16 10l5-3M16 14l5 3"/>
      </svg>
    </motion.div>
  );
};

export default function HangingSpiders() {
  const [spiders, setSpiders] = useState([]);

  useEffect(() => {
    // Generate 4-6 random spiders
    const count = Math.floor(Math.random() * 3) + 4;
    const newSpiders = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5, // 5% to 95%
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6, // 6 to 10 seconds
      dropDepth: Math.random() * 300 + 100 // 100px to 400px drop
    }));
    setSpiders(newSpiders);
  }, []);

  return (
    <>
      {spiders.map((s) => (
        <Spider key={s.id} {...s} />
      ))}
    </>
  );
}
