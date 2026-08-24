import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const hLineRef = useRef(null);
  const vLineRef = useRef(null);
  const coordRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [coords, setCoords] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let rafId;
    const onMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        setCoords({ x, y });

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
        if (hLineRef.current) {
          hLineRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
        }
        if (vLineRef.current) {
          vLineRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
        }
      });
    };

    const onOver = (e) => {
      const tag = e.target.tagName;
      const clickable =
        tag === "A" ||
        tag === "BUTTON" ||
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        e.target.closest("a, button, [role='button'], input, textarea, .neon-card");
      setIsHover(!!clickable);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="cad-laser-cursor-container" style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 99999 }}>
      {/* 1px Edge-to-Edge Crosshair Laser Lines (Heron AI CAD Drafting Grid) */}
      <div
        ref={hLineRef}
        className="cad-laser-line-h"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(229, 9, 20, 0.25) 50%, transparent 100%)",
          willChange: "transform",
        }}
      />
      <div
        ref={vLineRef}
        className="cad-laser-line-v"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          width: "1px",
          background: "linear-gradient(180deg, transparent 0%, rgba(0, 240, 255, 0.25) 50%, transparent 100%)",
          willChange: "transform",
        }}
      />

      {/* Main Reticle Pointer */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        {/* Center Target Dot */}
        <div
          style={{
            position: "absolute",
            top: "-4px",
            left: "-4px",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: isHover ? "#00f0ff" : "#e50914",
            boxShadow: isHover
              ? "0 0 15px #00f0ff, 0 0 30px #00f0ff"
              : "0 0 12px #e50914, 0 0 20px rgba(229,9,20,0.5)",
            transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
            transform: isHover ? "scale(1.6)" : "scale(1)",
          }}
        />

        {/* Rotating Spider-Sense Reticle Ring */}
        <div
          style={{
            position: "absolute",
            top: isHover ? "-22px" : "-16px",
            left: isHover ? "-22px" : "-16px",
            width: isHover ? "44px" : "32px",
            height: isHover ? "44px" : "32px",
            borderRadius: "50%",
            border: isHover
              ? "1.5px dashed rgba(0, 240, 255, 0.8)"
              : "1px solid rgba(229, 9, 20, 0.45)",
            transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            animation: "spin 8s linear infinite",
          }}
        />

        {/* Floating Mini Coordinate Pill */}
        {isHover && (
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              color: "#00f0ff",
              background: "rgba(5, 5, 8, 0.9)",
              border: "1px solid rgba(0, 240, 255, 0.4)",
              padding: "2px 6px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              backdropFilter: "blur(8px)",
              letterSpacing: "0.08em",
            }}
          >
            TARGET // X:{coords.x} Y:{coords.y}
          </div>
        )}
      </div>
    </div>
  );
}
