import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress((window.scrollY / docHeight) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Vertical progress (desktop) */}
      <div className="scroll-progress-vertical">
        <div className="scroll-progress-fill" style={{ height: `${progress}%` }} />
        <div className="scroll-progress-dot" style={{ top: `${progress}%` }} />
      </div>

      {/* Horizontal progress (mobile) */}
      <div className="scroll-progress-top" style={{ width: `${progress}%` }} />
    </>
  );
}
