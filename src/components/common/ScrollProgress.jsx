import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const fillRef = useRef(null);
  const dotRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
          const progress = Math.min(Math.max((window.scrollY / docHeight) * 100, 0), 100);
          if (fillRef.current) fillRef.current.style.height = `${progress}%`;
          if (dotRef.current) dotRef.current.style.top = `${progress}%`;
          if (topRef.current) topRef.current.style.width = `${progress}%`;
        }
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Vertical progress (desktop) */}
      <div className="scroll-progress-vertical">
        <div ref={fillRef} className="scroll-progress-fill" style={{ height: "0%" }} />
        <div ref={dotRef} className="scroll-progress-dot" style={{ top: "0%" }} />
      </div>

      {/* Horizontal progress (mobile) */}
      <div ref={topRef} className="scroll-progress-top" style={{ width: "0%" }} />
    </>
  );
}
