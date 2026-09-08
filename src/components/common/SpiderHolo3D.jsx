import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SpiderHolo3D({
  modelType = "orb",
  accentColor = "#00f0ff",
  height = "320px",
  interactive = true,
  autoRotate = true,
  showBadge = true,
  multiverseName = "Earth-1610 Quantum Node"
}) {
  const containerRef = useRef(null);
  const isIntersectingRef = useRef(true);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 300;
    let heightPx = container.clientHeight || 300;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.z = 4.8;

    // 3. Renderer with Mobile Optimization (Capped Pixel Ratio)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, heightPx);
    // Capping DPR to 1.5 ensures butter-smooth 60fps on high-DPI mobile screens without lag
    const maxDPR = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(maxDPR);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Root Group for smooth rotation
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Dynamic Color Parsing
    const primaryColor = new THREE.Color(accentColor || "#00f0ff");
    const redColor = new THREE.Color("#e50914");
    const purpleColor = new THREE.Color("#ac4bff");

    // Construct 3D Geometry based on modelType
    let coreMesh;
    let wireMesh;
    let ringMesh1;
    let ringMesh2;
    let particleSystem;

    // A. Core Geometries
    if (modelType === "cube") {
      const geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const wireGeo = new THREE.WireframeGeometry(geo);
      const mat = new THREE.MeshBasicMaterial({ color: primaryColor, wireframe: true, transparent: true, opacity: 0.75 });
      coreMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x050510, transparent: true, opacity: 0.6 }));
      wireMesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.85 }));
      rootGroup.add(coreMesh);
      rootGroup.add(wireMesh);
    } else if (modelType === "torus") {
      const geo = new THREE.TorusGeometry(1.2, 0.4, 12, 36);
      const wireGeo = new THREE.WireframeGeometry(geo);
      coreMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x050510, transparent: true, opacity: 0.6 }));
      wireMesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.85 }));
      rootGroup.add(coreMesh);
      rootGroup.add(wireMesh);
    } else if (modelType === "towers") {
      // Audio spectrum tower rings
      const geo = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 16, 2, true);
      const wireGeo = new THREE.WireframeGeometry(geo);
      wireMesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.8 }));
      rootGroup.add(wireMesh);
    } else if (modelType === "wave") {
      // Sine wave plane wireframe
      const geo = new THREE.PlaneGeometry(2.4, 2.4, 12, 12);
      const wireGeo = new THREE.WireframeGeometry(geo);
      wireMesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.85 }));
      rootGroup.add(wireMesh);
    } else {
      // Default: Spider-Verse Icosahedral Quantum Core
      const geo = new THREE.IcosahedronGeometry(1.2, 1);
      const wireGeo = new THREE.WireframeGeometry(geo);
      coreMesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x070913, transparent: true, opacity: 0.7 }));
      wireMesh = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: primaryColor, transparent: true, opacity: 0.85 }));
      rootGroup.add(coreMesh);
      rootGroup.add(wireMesh);
    }

    // B. Multiverse Orbital Rings (Earth-616 & Earth-1610 dimensions)
    const ringGeo1 = new THREE.RingGeometry(1.6, 1.63, 48);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: redColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    rootGroup.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(1.85, 1.88, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: purpleColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    rootGroup.add(ringMesh2);

    // C. Spider-Sense Quantum Web Dust Particles (Extremely low-overhead, 80 points)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.3 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? primaryColor : i % 3 === 1 ? redColor : purpleColor;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // Interaction & Inertia physics
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isPointerDown = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const onPointerDown = (e) => {
      if (!interactive) return;
      isPointerDown = true;
      setIsInteracting(true);
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerMove = (e) => {
      if (!isPointerDown) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevPointerX;
      const deltaY = clientY - prevPointerY;
      prevPointerX = clientX;
      prevPointerY = clientY;

      targetRotationY += deltaX * 0.0075;
      targetRotationX += deltaY * 0.0075;
    };

    const onPointerUp = () => {
      isPointerDown = false;
      setTimeout(() => setIsInteracting(false), 500);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    domEl.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp, { passive: true });

    // IntersectionObserver: PAUSE RAF WHEN OUT OF VIEW! (Crucial Mobile Battery & 60fps rule)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      heightPx = container.clientHeight;
      if (width === 0 || heightPx === 0) return;
      camera.aspect = width / heightPx;
      camera.updateProjectionMatrix();
      renderer.setSize(width, heightPx);
    };
    window.addEventListener("resize", handleResize);

    // 60FPS RAF Animation Loop with Lerp Smoothing
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Skip render calculations if scrolled off screen (Zero GPU waste)
      if (!isIntersectingRef.current) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia lerp for buttery rotation feel
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      rootGroup.rotation.x = currentRotationX;
      rootGroup.rotation.y = currentRotationY;

      // Subtle continuous idle rotation
      if (autoRotate && !isPointerDown) {
        rootGroup.rotation.y += 0.008;
        if (ringMesh1) ringMesh1.rotation.z += 0.007;
        if (ringMesh2) ringMesh2.rotation.z -= 0.006;
        if (particleSystem) particleSystem.rotation.y -= 0.004;
      }

      // Gentle floating breathing effect
      rootGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP MEMORY (Prevents memory leaks on component unmount)
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      domEl.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);

      domEl.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);

      if (container && domEl && domEl.parentNode === container) {
        container.removeChild(domEl);
      }

      // Dispose Three.js objects
      renderer.dispose();
      rootGroup.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [modelType, accentColor, interactive, autoRotate]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: "16px",
        background: "radial-gradient(circle at center, rgba(14, 18, 32, 0.45) 0%, rgba(5, 5, 10, 0.85) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "inset 0 0 25px rgba(0,0,0,0.8)",
      }}
    >
      {/* 3D WebGL Canvas Mount */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "100%",
          cursor: interactive ? (isInteracting ? "grabbing" : "grab") : "default",
          touchAction: "none",
        }}
      />

      {/* Cyberpunk HUD Coordinate Overlay */}
      {showBadge && (
        <>
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "12px",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(5, 7, 14, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "4px",
              padding: "0.2rem 0.5rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              color: accentColor,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: accentColor,
                boxShadow: `0 0 8px ${accentColor}`,
                animation: "pulse 2s infinite",
              }}
            />
            <span>{multiverseName}</span>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "12px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--color-muted)",
              background: "rgba(5, 7, 14, 0.75)",
              padding: "0.2rem 0.45rem",
              borderRadius: "4px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              pointerEvents: "none",
            }}
          >
            {isInteracting ? "⚡ ROTATING // 60 FPS" : "TOUCH / DRAG TO ROTATE 3D"}
          </div>
        </>
      )}
    </div>
  );
}
