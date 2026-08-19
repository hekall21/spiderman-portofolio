import { useTilt } from "../../hooks/useTilt";

export default function TiltCard({ children, className = "" }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt(5);

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
