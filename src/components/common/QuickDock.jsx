import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Award,
  User,
  Cpu,
  Briefcase,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

export default function QuickDock() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -70;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  const dockItems = [
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Cpu, label: "Skills" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "education", icon: GraduationCap, label: "Education" },
    { id: "certificates", icon: Award, label: "Certificates" },
    { id: "notes", icon: MessageSquare, label: "Spider-Board" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="quick-floating-dock"
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9990,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            padding: "0.35rem 0.6rem",
            background: "rgba(8, 12, 22, 0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(229, 9, 20, 0.3)",
            borderRadius: "100px",
            boxShadow:
              "0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(229, 9, 20, 0.2)",
          }}
        >
          {/* Top Scroll Button */}
          <motion.button
            onClick={() => scrollToSection("hero")}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Kembali ke atas"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              background: "linear-gradient(135deg, var(--color-red), var(--color-red-dark))",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              boxShadow: "0 0 10px rgba(229, 9, 20, 0.4)",
            }}
          >
            <ArrowUp size={15} color="#fff" />
          </motion.button>

          <div
            style={{
              width: "1px",
              height: "18px",
              background: "rgba(255, 255, 255, 0.12)",
              margin: "0 0.15rem",
            }}
          />

          {dockItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.18, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title={item.label}
                aria-label={item.label}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-muted)",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--color-white)";
                  e.currentTarget.style.background = "rgba(229, 9, 20, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--color-muted)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon size={14} />
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
