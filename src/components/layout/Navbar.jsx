import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "education", label: "EDUCATION" },
  { id: "certificates", label: "CERTIFICATES" },
  { id: "notes", label: "NOTES" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -72; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className="navbar-header"
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        background: scrolled ? "rgba(5, 5, 5, 0.75)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.2)" : "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
        aria-label="Back to top"
        style={{
          fontFamily: "var(--font-decorative)",
          fontSize: "1.8rem",
          fontWeight: 700,
          color: "var(--color-white)",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          textShadow: "0 0 10px rgba(255,255,255,0.2)"
        }}
      >
        <span className="gradient-text">Haikel</span>
        <span style={{ color: "var(--color-red)", fontSize: "1.5rem", fontFamily: "var(--font-display)" }}>.</span>
      </a>

      {/* Desktop Nav */}
      <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: active === item.id ? "var(--color-white)" : "var(--color-muted)",
              position: "relative",
              transition: "color 0.3s",
              paddingBottom: "6px",
            }}
            onMouseEnter={(e) => {
              if (active !== item.id) e.currentTarget.style.color = "var(--color-text)";
            }}
            onMouseLeave={(e) => {
              if (active !== item.id) e.currentTarget.style.color = "var(--color-muted)";
            }}
          >
            {item.label}
            <span style={{
              position: "absolute", bottom: 0, left: 0,
              height: "2px",
              width: active === item.id ? "100%" : "0%",
              background: "linear-gradient(90deg, var(--color-red), var(--color-purple))",
              transition: "width 0.3s ease",
              boxShadow: active === item.id ? "0 0 10px rgba(229,9,20,0.5)" : "none",
              borderRadius: "2px"
            }} />
          </a>
        ))}
      </nav>

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-white)",
          padding: "0.5rem",
          cursor: "pointer",
          width: "44px", height: "44px",
          border: "1px solid var(--color-border)",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0, top: "72px",
              background: "rgba(5, 5, 5, 0.98)",
              backdropFilter: "blur(30px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem",
              zIndex: 999,
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  color: active === item.id ? "var(--color-white)" : "var(--color-muted)",
                  position: "relative"
                }}
              >
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--color-red)",
                  marginRight: "1rem",
                  verticalAlign: "super",
                }}>
                  0{i + 1}
                </span>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
