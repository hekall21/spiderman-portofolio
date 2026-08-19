import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { experience, organizations } from "../../data/experience";
import { technicalSkills } from "../../data/skills";
import { fadeUp, staggerContainer } from "../../animations/variants";

export default function Experience() {
  const timelineRef = useRef(null);
  const [fillHeight, setFillHeight] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setFillHeight(100);
      return;
    }
    const onScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      if (rect.top > viewH || rect.bottom < 0) { setFillHeight(0); return; }
      const progress = Math.min(Math.max((viewH - rect.top) / (rect.height + viewH * 0.5), 0), 1);
      setFillHeight(progress * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  return (
    <section id="experience" style={{ position: "relative" }}>
      <div className="section">
        <SectionHeading
          number="03"
          label="EXPERIENCE"
          title="EXPERIENCE"
        />

        {/* Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: "relative",
            paddingLeft: "4.5rem",
            marginTop: "3rem",
          }}
        >
          <div className="timeline-line">
            <div className="timeline-line-fill" style={{ height: `${fillHeight}%` }} />
          </div>
          <div className="timeline-node" style={{ top: 0 }} />

          {/* Year */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.5rem",
              fontWeight: 800,
              marginBottom: "2rem",
            }}
            className="gradient-text"
          >
            {experience.year}
          </motion.div>

          {/* Experience card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="neon-card"
            style={{
              padding: "3rem",
              marginBottom: "3rem",
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.5rem",
            }}>
              <div>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                  fontWeight: 700,
                  color: "var(--color-white)",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  marginBottom: "0.5rem",
                }}>
                  {experience.company}
                </h3>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-purple)",
                }}>
                  {experience.division}
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                padding: "0.4rem 1.2rem",
                border: "1px solid rgba(229,9,20,0.4)",
                color: "var(--color-red)",
                textTransform: "uppercase",
                background: "rgba(229,9,20,0.05)",
                borderRadius: "100px"
              }}>
                {experience.type}
              </span>
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              color: "var(--color-muted)",
              marginBottom: "2rem",
              lineHeight: 1.8,
            }}>
              {experience.description}
            </p>

            {/* Tasks */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1rem",
            }}>
              {experience.tasks.map((task, i) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--color-text)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{
                    width: "8px", height: "8px",
                    borderRadius: "50%",
                    background: "var(--color-purple)",
                    flexShrink: 0,
                    marginTop: "0.25rem",
                    boxShadow: "0 0 10px rgba(172,75,255,0.4)",
                  }} />
                  {task}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="timeline-node" style={{
            top: "auto", bottom: "0",
            borderColor: "var(--color-blue)",
            boxShadow: "0 0 15px rgba(48,128,255,0.4), 0 0 30px rgba(48,128,255,0.15)",
          }} />
        </div>

        {/* ORGANIZATIONS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: "5rem" }}
        >
          <p className="section-number" style={{ marginBottom: "1.5rem" }}>
            ORGANIZATION & ACTIVITIES
          </p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {organizations.map((org) => (
              <motion.div
                key={org.name}
                variants={fadeUp}
                className="neon-card"
                style={{
                  padding: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem"
                }}
              >
                <div style={{
                  fontSize: "1.75rem",
                  width: "50px", height: "50px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border)"
                }}>
                  {org.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    marginBottom: "0.25rem",
                  }}>
                    {org.name}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "var(--color-muted)",
                    textTransform: "uppercase",
                  }}>
                    {org.type}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* TECHNICAL SKILLS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginTop: "5rem" }}
        >
          <p className="section-number" style={{ marginBottom: "1.5rem" }}>
            TECHNICAL PRACTICE
          </p>

          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            fontWeight: 700,
            color: "var(--color-white)",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}>
            TECHNICAL <span className="gradient-text">FOUNDATION</span>
          </h3>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            {technicalSkills.map((skill) => (
              <motion.span
                key={skill}
                variants={fadeUp}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  color: "var(--color-text)",
                  padding: "0.5rem 1rem",
                  border: "1px solid var(--color-border)",
                  borderRadius: "100px",
                  background: "var(--color-bg-secondary)",
                  transition: "all 0.3s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-red)";
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(229,9,20,0.3)";
                  e.currentTarget.style.color = "var(--color-white)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.color = "var(--color-text)";
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="glow-divider" />
    </section>
  );
}
