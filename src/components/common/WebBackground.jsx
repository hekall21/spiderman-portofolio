import { useEffect, useRef, useMemo } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

function generateSpiderWebs(count) {
  const webs = [];
  for (let i = 0; i < count; i++) {
    const cx = Math.random() * 100;
    const cy = Math.random() * 100;
    const maxRadius = 15 + Math.random() * 30; // Radius in percentage
    const radialLines = 8 + Math.floor(Math.random() * 6);
    const layers = 5 + Math.floor(Math.random() * 5);
    
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
        // Add a little sag to the web between radials
        const sag = 0.8 + Math.random() * 0.2; 
        const actualRadius = currentRadius * sag;
        points.push(`${cx + Math.cos(angle) * actualRadius},${cy + Math.sin(angle) * actualRadius}`);
      }
      polygons.push(points.join(" "));
    }

    webs.push({ id: i, cx, cy, lines, polygons, delay: Math.random() * 5 });
  }
  return webs;
}

export default function WebBackground({ variant = "hero" }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const webs = useMemo(() => {
    // Generate a lot of webs! (banyak)
    return generateSpiderWebs(variant === "hero" ? 12 : 6);
  }, [variant]);

  const particles = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 15 : 35;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      dx: -30 + Math.random() * 60,
      dy: -60 + Math.random() * -40,
      color: Math.random() > 0.5 ? "var(--color-red)" : "var(--color-blue)",
      opacity: 0.15 + Math.random() * 0.25,
    }));
  }, []);

  // Parallax on mouse move (hero only)
  useEffect(() => {
    if (variant !== "hero" || reducedMotion) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const container = containerRef.current;
    if (!container) return;

    let raf;
    const onMove = (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        container.style.setProperty("--px", `${x * 15}px`);
        container.style.setProperty("--py", `${y * 10}px`);
      });
    };

    window.addEventListener("mousemove", onMove);
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
        "--px": "0px",
        "--py": "0px",
      }}
    >
      {/* Glowing orbs */}
      {variant === "hero" && (
        <>
          <div
            style={{
              position: "absolute",
              right: "15%",
              top: "25%",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "var(--color-red)",
              filter: "blur(100px)",
              opacity: 0.12,
              transform: "translate(var(--px), var(--py))",
              transition: "transform 0.3s ease-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "25%",
              bottom: "20%",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background: "var(--color-blue)",
              filter: "blur(100px)",
              opacity: 0.1,
              transform:
                "translate(calc(var(--px) * 0.6), calc(var(--py) * 0.6))",
              transition: "transform 0.3s ease-out",
            }}
          />
        </>
      )}

      {/* Spider Web structure */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform:
            variant === "hero"
              ? "translate(calc(var(--px) * 0.3), calc(var(--py) * 0.3))"
              : undefined,
          transition: variant === "hero" ? "transform 0.5s ease-out" : undefined,
        }}
      >
        {webs.map(web => (
          <g key={web.id} style={{ animation: `pulse 5s infinite ${web.delay}s` }}>
            {/* Radial lines */}
            {web.lines.map((line, i) => (
              <line
                key={`radial-${i}`}
                x1={`${web.cx}%`}
                y1={`${web.cy}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.2"
              />
            ))}
            {/* Web polygons */}
            {web.polygons.map((points, i) => (
              <polygon
                key={`poly-${i}`}
                points={points}
                fill="none"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="0.15"
              />
            ))}
          </g>
        ))}
        <style>
          {`
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
          `}
        </style>
      </svg>

      {/* CSS particles */}
      {!reducedMotion &&
        particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
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
