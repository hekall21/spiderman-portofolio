import { ArrowUp, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { id: "hero", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "experience", label: "EXPERIENCE" },
    { id: "education", label: "EDUCATION" },
    { id: "certificates", label: "CERTIFICATES" },
    { id: "notes", label: "SPIDER-BOARD" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "4.5rem 2rem 2.5rem",
        textAlign: "center",
        position: "relative",
        background: "var(--color-bg-secondary)",
        overflow: "hidden",
      }}
    >
      {/* Subtle Web Pattern */}
      <div className="web-pattern-bg" style={{ opacity: 0.03 }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: "900px", margin: "0 auto" }}>
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-decorative)",
            fontSize: "2.4rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            color: "var(--color-white)",
          }}
        >
          Haikel<span style={{ color: "var(--color-red)", fontFamily: "var(--font-display)" }}>.</span>
        </div>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--color-muted)",
            marginBottom: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          "With great technology comes great responsibility." 🕸️✨
        </p>

        {/* Quick Nav Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(link.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else if (link.id === "hero") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                color: "var(--color-muted)",
                transition: "color 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              {link.label}
            </a>
          ))}
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
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            color: "var(--color-white)",
            marginBottom: "2.5rem",
            padding: "0.6rem 1.4rem",
            border: "1px solid var(--color-red)",
            borderRadius: "100px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            background: "rgba(229, 9, 20, 0.1)",
            boxShadow: "0 0 15px rgba(229, 9, 20, 0.25)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--color-red)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(229, 9, 20, 0.6)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(229, 9, 20, 0.1)";
            e.currentTarget.style.boxShadow = "0 0 15px rgba(229, 9, 20, 0.25)";
            e.currentTarget.style.transform = "none";
          }}
        >
          <span>SWING TO TOP</span> <ArrowUp size={14} />
        </button>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(255, 255, 255, 0.08)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--color-muted)",
          }}
        >
          <span>© 2026 Muhammad Haikel Saleh. All Rights Reserved.</span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Designed & Built with <Sparkles size={12} color="var(--color-red)" /> Spider-Verse Cyber Aesthetics
          </span>
        </div>
      </div>
    </footer>
  );
}
