import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PrecisionHUD() {
  const [coords, setCoords] = useState({ x: 1131, y: 1131 });
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="precision-hud-bar"
      style={{
        position: "fixed",
        top: "72px",
        left: 0,
        right: 0,
        zIndex: 990,
        height: "28px",
        background: "rgba(5, 5, 8, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        borderTop: "1px solid rgba(229, 9, 20, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(1rem, 3vw, 2.5rem)",
        fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
        fontSize: "0.68rem",
        color: "rgba(200, 204, 214, 0.75)",
        userSelect: "none",
        pointerEvents: "auto",
      }}
    >
      {/* Left Telemetry */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          color: "#10b981",
          fontWeight: 600,
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#10b981",
            boxShadow: "0 0 8px #10b981",
            display: "inline-block",
            animation: "pulse 2s infinite",
          }} />
          <span className="hidden-mobile">SYS_ONLINE</span>
        </span>

        <span style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>

        <span style={{ color: "var(--color-red)", fontWeight: 600 }}>
          [ PROTOCOL: SPIDER_VERSE_v4.0 ]
        </span>

        <span className="hidden-mobile" style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>

        <span className="hidden-mobile" style={{ color: "var(--color-purple)" }}>
          BNSP_CERTIFIED // NETWORK & SOFTWARE
        </span>
      </div>

      {/* Right Caliper Coordinates */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>COORD:</span>
          <span style={{ color: "var(--color-cyan, #00f0ff)", fontWeight: 600 }}>
            X:{coords.x}PX Y:{coords.y}PX
          </span>
        </div>

        <span className="hidden-mobile" style={{ color: "rgba(255, 255, 255, 0.15)" }}>|</span>

        <span className="hidden-mobile" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
          UTC {timeStr}
        </span>
      </div>
    </motion.div>
  );
}
