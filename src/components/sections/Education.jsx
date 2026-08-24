import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { educationList } from "../../data/education";
import { GraduationCap, School, BookOpen, Sparkles, CheckCircle } from "lucide-react";

const levelIcons = {
  SMK: GraduationCap,
  SMP: School,
  SD: BookOpen,
};

export default function Education() {
  return (
    <section id="education" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="04"
          label="ACADEMIC MILESTONES"
          title="WHERE IT ALL"
          titleAccent="STARTED."
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
          Perjalanan pendidikan formal dari jenjang dasar hingga kejuruan Teknik Komputer dan Jaringan
          di SMKN 22 Jakarta.
        </p>

        {/* Education Cards Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            maxWidth: "880px",
            margin: "0 auto",
          }}
        >
          {educationList.map((edu, i) => {
            const Icon = levelIcons[edu.level] || BookOpen;
            return (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 30, x: -15 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="neon-card"
                style={{
                  padding: edu.highlight ? "2.25rem 2rem" : "1.75rem",
                  border: edu.highlight
                    ? "1px solid var(--color-red)"
                    : "1px solid var(--color-border)",
                  boxShadow: edu.highlight
                    ? "0 0 30px rgba(229, 9, 20, 0.2), inset 0 0 15px rgba(229, 9, 20, 0.08)"
                    : "none",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Highlight Badge */}
                {edu.highlight && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.25rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      padding: "0.25rem 0.75rem",
                      background: "rgba(229, 9, 20, 0.15)",
                      border: "1px solid var(--color-red)",
                      borderRadius: "100px",
                    }}
                  >
                    <Sparkles size={12} color="var(--color-red)" />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        color: "var(--color-white)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      UTAMA // TKJ
                    </span>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: edu.highlight ? "54px" : "46px",
                      height: edu.highlight ? "54px" : "46px",
                      borderRadius: "12px",
                      border: `1px solid ${
                        edu.highlight ? "var(--color-red)" : "var(--color-border)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: edu.highlight
                        ? "rgba(229, 9, 20, 0.12)"
                        : "rgba(255, 255, 255, 0.04)",
                      boxShadow: edu.highlight
                        ? "0 0 20px rgba(229, 9, 20, 0.3)"
                        : "none",
                    }}
                  >
                    <Icon
                      size={edu.highlight ? 24 : 20}
                      color={edu.highlight ? "var(--color-red)" : "var(--color-muted)"}
                    />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        paddingRight: edu.highlight ? "6rem" : "0",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: edu.highlight
                            ? "clamp(1.2rem, 2.5vw, 1.5rem)"
                            : "1.05rem",
                          fontWeight: 700,
                          color: "var(--color-white)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {edu.school}
                      </h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        marginTop: "0.35rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.75rem",
                          color: edu.highlight
                            ? "var(--color-purple)"
                            : "var(--color-muted)",
                          fontWeight: 600,
                        }}
                      >
                        {edu.years}
                      </span>
                      <span style={{ color: "var(--color-border)" }}>•</span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          letterSpacing: "0.1em",
                          color: "var(--color-text)",
                          padding: "0.15rem 0.55rem",
                          border: "1px solid var(--color-border)",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        Jenjang {edu.level}
                      </span>
                    </div>

                    {edu.major && (
                      <div style={{ marginTop: "1rem" }}>
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.85rem",
                            color: "var(--color-white)",
                            fontWeight: 600,
                            marginBottom: "0.6rem",
                          }}
                        >
                          Jurusan: {edu.major}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                          }}
                        >
                          {[
                            "Jaringan Komputer",
                            "Administrasi Server",
                            "MikroTik & Routing",
                            "Troubleshooting Hardware",
                          ].map((topic) => (
                            <span
                              key={topic}
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.7rem",
                                color: "var(--color-text)",
                                background: "rgba(255, 255, 255, 0.04)",
                                padding: "0.25rem 0.6rem",
                                borderRadius: "4px",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                              }}
                            >
                              ✓ {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glow-divider" />
    </section>
  );
}
