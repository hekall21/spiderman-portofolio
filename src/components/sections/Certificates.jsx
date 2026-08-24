import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { certificates } from "../../data/certificates";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import { Award, X, ExternalLink, ShieldCheck, Eye } from "lucide-react";

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
    <section id="certificates" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="05"
          label="CREDENTIALS & LICENSES"
          title="VERIFIED"
          titleAccent="CERTIFICATES."
        />

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-muted)",
            maxWidth: "680px",
            marginTop: "-1rem",
            marginBottom: "3rem",
            lineHeight: 1.6,
          }}
        >
          Sertifikasi kompetensi resmi BNSP (Badan Nasional Sertifikasi Profesi) dan
          sertifikat kelulusan Praktik Kerja Lapangan.
        </p>

        {/* Certificate cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {certificates.map((cert) => (
            <motion.div key={cert.id} variants={fadeUp}>
              <div
                className="neon-card with-crosshairs"
                onClick={() => setSelectedCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelectedCert(cert)}
                aria-label={`View ${cert.title}`}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  padding: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Image Showcase */}
                <div
                  style={{
                    width: "100%",
                    height: "230px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 0, 0, 0.6)",
                    marginBottom: "1.5rem",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    className="cert-img"
                  />

                  {/* Hover Overlay */}
                  <div
                    className="cert-hover-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(5, 5, 10, 0.75)",
                      backdropFilter: "blur(4px)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Eye size={28} color="var(--color-red)" />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "var(--color-white)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      KLIK UNTUK MEMPERBESAR
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <ShieldCheck size={16} color="var(--color-purple)" />
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.68rem",
                          color: "var(--color-purple)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        OFFICIAL CREDENTIAL
                      </span>
                    </div>

                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--color-white)",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {cert.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        color: "var(--color-muted)",
                      }}
                    >
                      {cert.issuer}
                    </p>
                  </div>

                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ExternalLink size={16} color="var(--color-text)" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="cert-modal-overlay" onClick={closeModal}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cert-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cert-modal-close"
                onClick={closeModal}
                aria-label="Tutup sertifikat"
              >
                <X size={16} /> TUTUP (ESC)
              </button>

              <div style={{ marginTop: "1rem", marginBottom: "1.5rem" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {selectedCert.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    color: "var(--color-purple)",
                  }}
                >
                  Diterbitkan oleh: {selectedCert.issuer}
                </p>
              </div>

              <div
                style={{
                  maxHeight: "65vh",
                  overflowY: "auto",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                }}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        .neon-card:hover .cert-hover-overlay {
          opacity: 1 !important;
        }
        .neon-card:hover .cert-img {
          transform: scale(1.04);
        }
      `}} />

      <div className="glow-divider" />
    </section>
  );
}
