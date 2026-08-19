import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { certificates } from "../../data/certificates";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import { Award, X } from "lucide-react";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  const closeModal = useCallback(() => setSelectedCert(null), []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (selectedCert) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedCert, closeModal]);

  return (
    <section id="certificates" style={{ position: "relative" }}>
      <div className="section">
        <SectionHeading
          number="04"
          label="CERTIFICATES"
          title="CERTIFICATES"
        />

        {/* Certificate cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "3rem",
          }}
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              variants={fadeUp}
            >
              <button
                className="neon-card cert-card-btn"
                onClick={() => setSelectedCert(cert)}
                aria-label={`View ${cert.title}`}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "1.5rem",
                }}
              >
                {/* Placeholder image container */}
                <div
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.5)",
                    marginBottom: "1.5rem",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                      className="cert-img"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <Award size={36} color="var(--color-purple)" />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.2em",
                          color: "var(--color-muted)",
                        }}
                      >
                        CERTIFICATE
                      </span>
                    </div>
                  )}
                  {/* Subtle Red Overlay on hover */}
                  <div className="cert-overlay" style={{
                    position: "absolute", inset: 0,
                    background: "rgba(229,9,20,0.1)",
                    opacity: 0,
                    transition: "opacity 0.3s ease"
                  }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    color: "var(--color-muted)",
                  }}
                >
                  {cert.issuer}
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
          >
            <motion.div
              className="cert-modal"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                CLOSE
                <X size={16} />
              </button>

              {/* Certificate image */}
              <div
                style={{
                  width: "100%",
                  minHeight: "400px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.05)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.6)",
                  marginBottom: "2rem",
                  overflow: "hidden"
                }}
              >
                {selectedCert.image ? (
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <Award size={48} color="var(--color-purple)" />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.2em",
                        color: "var(--color-muted)",
                      }}
                    >
                      PREVIEW UNAVAILABLE
                    </span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--color-white)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                {selectedCert.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  color: "var(--color-purple)",
                  letterSpacing: "0.1em",
                }}
              >
                {selectedCert.issuer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .cert-card-btn:hover .cert-img {
          transform: scale(1.05);
        }
        .cert-card-btn:hover .cert-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
