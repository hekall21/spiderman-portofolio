import { useCountUp } from "../../hooks/useCountUp";

export default function Counter({ value, label }) {
  const { count, ref } = useCountUp(value, 1500);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 4vw, 4rem)",
          fontWeight: 700,
          lineHeight: 1,
        }}
        className="gradient-text"
      >
        {String(count).padStart(2, "0")}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}
