import { useRef, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useTilt(maxDeg = 5) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e) => {
      if (reducedMotion || !ref.current) return;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const rotateX = -y * maxDeg * 2;
        const rotateY = x * maxDeg * 2;
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
    },
    [maxDeg, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (!ref.current) return;
    ref.current.style.transition =
      "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    ref.current.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    const el = ref.current;
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 500);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
