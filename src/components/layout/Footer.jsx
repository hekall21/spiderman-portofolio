import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "4rem 2rem 2rem",
        textAlign: "center",
        position: "relative",
        background: "var(--color-bg-secondary)",
        overflow: "hidden"
      }}
    >
      {/* Subtle Web Pattern */}
      <div className="web-pattern-bg" style={{ opacity: 0.03 }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-decorative)",
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1rem",
            color: "var(--color-white)"
          }}
        >
          Haikel<span style={{ color: "var(--color-red)", fontFamily: "var(--font-display)" }}>.</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            color: "var(--color-muted)",
            marginBottom: "2rem",
            padding: "0.5rem 1rem",
            border: "1px solid var(--color-border)",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: "rgba(255,255,255,0.02)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-white)";
            e.currentTarget.style.borderColor = "var(--color-red)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(229,9,20,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-muted)";
            e.currentTarget.style.borderColor = "var(--color-border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          BACK TO TOP <ArrowUp size={14} />
        </button>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "var(--color-muted)",
            letterSpacing: "0.1em",
          }}
        >
          © 2026 Muhammad Haikel Saleh. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
