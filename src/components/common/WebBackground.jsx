import { useEffect, useRef, useMemo } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function generateSpiderWebs(count) {
  const webs = [];
  for (let i = 0; i < count; i++) {
    const cx = (i % 2 === 0 ? 10 : 90) + (Math.random() * 10 - 5);
    const cy = (i < 2 ? 15 : 85) + (Math.random() * 10 - 5);
    const maxRadius = 20 + Math.random() * 15;
    const radialLines = 8;
    const layers = 4;
    
    // Generate radial lines
    const lines = [];
    for (let r = 0; r < radialLines; r++) {
      const angle = (r / radialLines) * Math.PI * 2;
      lines.push({
        x2: cx + Math.cos(angle) * maxRadius,
        y2: cy + Math.sin(angle) * maxRadius
      });
    }

    // Generate web polygons
    const polygons = [];
    for (let l = 1; l <= layers; l++) {
      const currentRadius = (l / layers) * maxRadius;
      const points = [];
      for (let r = 0; r < radialLines; r++) {
        const angle = (r / radialLines) * Math.PI * 2;
        const actualRadius = currentRadius * 0.9;
        points.push(`${cx + Math.cos(angle) * actualRadius},${cy + Math.sin(angle) * actualRadius}`);
      }
      polygons.push(points.join(" "));
    }

    webs.push({ id: i, cx, cy, lines, polygons, delay: Math.random() * 2 });
  }
  return webs;
}

export default function WebBackground({ variant = "hero" }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const webs = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    return generateSpiderWebs(isMobile ? 2 : (variant === "hero" ? 5 : 3));
  }, [variant]);

  const particles = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) return []; // Disable particles on mobile for butter smooth 60fps
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
      dx: -20 + Math.random() * 40,
      dy: -40 + Math.random() * -30,
      color: Math.random() > 0.5 ? "var(--color-red)" : "var(--color-blue)",
      opacity: 0.15 + Math.random() * 0.2,
    }));
  }, []);

  // Parallax on mouse move (hero only & desktop only)
  useEffect(() => {
    if (variant !== "hero" || reducedMotion) return;
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const container = containerRef.current;
    if (!container) return;

    let raf;
    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        container.style.setProperty("--px", `${x * 12}px`);
        container.style.setProperty("--py", `${y * 8}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [variant, reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        transform: "translateZ(0)",
        "--px": "0px",
        "--py": "0px",
      }}
    >
      {/* Hardware-Accelerated Ambient Orbs (Zero Filter Lag) */}
      {variant === "hero" && (
        <>
          <div
            style={{
              position: "absolute",
              right: "10%",
              top: "20%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(229, 9, 20, 0.14) 0%, transparent 70%)",
              transform: "translate(var(--px), var(--py))",
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "10%",
              bottom: "15%",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(48, 128, 255, 0.12) 0%, transparent 70%)",
              transform: "translate(calc(var(--px) * 0.6), calc(var(--py) * 0.6))",
              transition: "transform 0.3s ease-out",
            }}
          />
        </>
      )}

      {/* Lightweight Spider Web Geometry */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.12,
          transform: variant === "hero" ? "translate(calc(var(--px) * 0.3), calc(var(--py) * 0.3))" : undefined,
          transition: variant === "hero" ? "transform 0.5s ease-out" : undefined,
        }}
      >
        {webs.map((w) => (
          <g key={w.id}>
            {w.lines.map((l, idx) => (
              <line
                key={idx}
                x1={`${w.cx}%`}
                y1={`${w.cy}%`}
                x2={`${l.x2}%`}
                y2={`${l.y2}%`}
                stroke={w.id % 2 === 0 ? "var(--color-red)" : "var(--color-purple)"}
                strokeWidth="0.15"
              />
            ))}
            {w.polygons.map((p, idx) => (
              <polygon
                key={idx}
                points={p}
                fill="none"
                stroke={idx % 2 === 0 ? "var(--color-red)" : "var(--color-purple)"}
                strokeWidth="0.12"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Floating Particles (Desktop only) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 6px ${p.color}`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            "--particle-dx": `${p.dx}px`,
            "--particle-dy": `${p.dy}px`,
            "--particle-opacity": p.opacity,
          }}
        />
      ))}
    </div>
  );
}
