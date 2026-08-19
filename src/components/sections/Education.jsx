import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { educationList } from "../../data/education";
import { GraduationCap, School, BookOpen } from "lucide-react";

const levelIcons = {
  SMK: GraduationCap,
  SMP: School,
  SD: BookOpen,
};

export default function Education() {
  return (
    <section id="education" style={{ position: "relative" }}>
      <div className="tech-grid" />

      <div className="section">
        <SectionHeading
          number="04"
          label="EDUCATION"
          title="WHERE"
          titleAccent="IT STARTED."
        />

        {/* Education timeline */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          marginTop: "3rem",
          maxWidth: "800px",
        }}>
          {educationList.map((edu, i) => {
            const Icon = levelIcons[edu.level] || BookOpen;
            return (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 30, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`edu-card ${edu.highlight ? "edu-highlight" : ""}`}
              >
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "1.5rem",
                }}>
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                    style={{
                      width: "48px",
                      height: "48px",
                      border: `1px solid ${edu.highlight ? "rgba(255,43,61,0.3)" : "var(--color-border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      background: edu.highlight ? "rgba(255,43,61,0.05)" : "transparent",
                    }}
                  >
                    <Icon
                      size={20}
                      color={edu.highlight ? "var(--color-red)" : "var(--color-muted)"}
                    />
                  </motion.div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}>
                      <h3 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: edu.highlight ? "clamp(1.2rem, 2vw, 1.5rem)" : "1rem",
                        fontWeight: 700,
                        color: "var(--color-white)",
                        textTransform: "uppercase",
                        letterSpacing: "0.02em",
                      }}>
                        {edu.school}
                      </h3>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        color: edu.highlight ? "var(--color-red)" : "var(--color-muted)",
                        whiteSpace: "nowrap",
                      }}>
                        {edu.years}
                      </span>
                    </div>

                    {edu.major && (
                      <p style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.78rem",
                        letterSpacing: "0.05em",
                        color: "var(--color-text)",
                        marginTop: "0.4rem",
                      }}>
                        {edu.major}
                      </p>
                    )}

                    {/* Level badge */}
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      color: "var(--color-muted)",
                      marginTop: "0.75rem",
                      display: "inline-block",
                      padding: "0.2rem 0.6rem",
                      border: "1px solid var(--color-border)",
                      textTransform: "uppercase",
                    }}>
                      {edu.level}
                    </span>
                  </div>
                </div>

                {/* Corner gradient for highlight */}
                {edu.highlight && (
                  <div style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: "200px", height: "200px",
                    background: "radial-gradient(circle at top right, rgba(255,43,61,0.04), transparent 70%)",
                    pointerEvents: "none",
                  }} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glow-divider" />
    </section>
  );
}
