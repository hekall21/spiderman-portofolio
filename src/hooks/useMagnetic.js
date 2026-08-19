import { useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useMagnetic(maxMove = 8) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e) => {
      if (reducedMotion || !ref.current) return;
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / (rect.width / 2)) * maxMove;
      const dy = ((e.clientY - cy) / (rect.height / 2)) * maxMove;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [maxMove, reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    ref.current.style.transform = "translate(0px, 0px)";
    const el = ref.current;
    const cleanup = () => {
      if (el) el.style.transition = "";
    };
    setTimeout(cleanup, 400);
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
