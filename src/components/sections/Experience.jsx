import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { experience, organizations } from "../../data/experience";
import { fadeUp, staggerContainer } from "../../animations/variants";
import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Laptop,
  Dumbbell,
  Trophy,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

const orgIconMap = {
  "IT Club": Laptop,
  "Basketball Club": Dumbbell,
  "Lomba Basket & Mobile Legends": Trophy,
};

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
      if (rect.top > viewH || rect.bottom < 0) {
        setFillHeight(0);
        return;
      }
      const progress = Math.min(
        Math.max((viewH - rect.top) / (rect.height + viewH * 0.5), 0),
        1
      );
      setFillHeight(progress * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [shouldReduceMotion]);

  return (
    <section id="experience" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="03"
          label="FIELD OPERATIONS"
          title="WORK"
          titleAccent="EXPERIENCE."
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
          Pengalaman kerja lapangan (PKL) dalam lingkungan profesional korporat serta keaktifan
          dalam organisasi dan kompetisi teknologi & olahraga.
        </p>

        {/* Timeline */}
        <div
          ref={timelineRef}
          style={{
            position: "relative",
            paddingLeft: "clamp(2.5rem, 5vw, 4.5rem)",
            marginTop: "2rem",
          }}
        >
          <div className="timeline-line">
            <div
              className="timeline-line-fill"
              style={{ height: `${fillHeight}%` }}
            />
          </div>
          <div className="timeline-node" style={{ top: 0 }} />

          {/* Year Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.4rem 1rem",
              background: "rgba(229, 9, 20, 0.1)",
              border: "1px solid var(--color-red)",
              borderRadius: "20px",
              marginBottom: "1.5rem",
            }}
          >
            <Calendar size={14} color="var(--color-red)" />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color-white)",
                letterSpacing: "0.1em",
              }}
            >
              TAHUN {experience.year} // FIELD MISSION
            </span>
          </motion.div>

          {/* Experience card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="neon-card"
            style={{
              padding: "clamp(1.5rem, 4vw, 3rem)",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "1.5rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "1.25rem",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.4rem",
                  }}
                >
                  <Building2 size={18} color="var(--color-red)" />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                      fontWeight: 700,
                      color: "var(--color-white)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {experience.company}
                  </h3>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "var(--color-purple)",
                    }}
                  >
                    {experience.division}
                  </span>
                  <span style={{ color: "var(--color-muted)" }}>•</span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-text)",
                    }}
                  >
                    Praktik Kerja Lapangan (PKL)
                  </span>
                </div>
              </div>

              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.15em",
                  padding: "0.4rem 1.2rem",
                  border: "1px solid rgba(229, 9, 20, 0.4)",
                  color: "var(--color-red)",
                  textTransform: "uppercase",
                  background: "rgba(229, 9, 20, 0.08)",
                  borderRadius: "100px",
                  boxShadow: "0 0 15px rgba(229, 9, 20, 0.2)",
                }}
              >
                VERIFIED PKL
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                color: "var(--color-text)",
                marginBottom: "2rem",
                lineHeight: 1.8,
              }}
            >
              {experience.description} Selama masa PKL, bertanggung jawab dalam
              mendukung kelancaran operasional administrasi, validasi data, serta
              arsip akuntansi dengan standar ketelitian tinggi.
            </p>

            {/* Tasks & Responsibilities Grid */}
            <h4
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                color: "var(--color-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              TANGGUNG JAWAB & CAPAIAN KERJA:
            </h4>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "0.85rem",
              }}
            >
              {experience.tasks.map((task, i) => (
                <motion.div
                  key={task}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.78rem",
                    color: "var(--color-white)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    lineHeight: 1.5,
                    background: "rgba(255, 255, 255, 0.03)",
                    padding: "0.6rem 0.8rem",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <CheckCircle2
                    size={15}
                    color="var(--color-purple)"
                    style={{ flexShrink: 0, marginTop: "0.15rem" }}
                  />
                  <span>{task}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div
            className="timeline-node"
            style={{
              top: "auto",
              bottom: "0",
              borderColor: "var(--color-blue)",
              boxShadow:
                "0 0 15px rgba(48,128,255,0.4), 0 0 30px rgba(48,128,255,0.15)",
            }}
          />
        </div>

        {/* ORGANIZATIONS & COMPETITIONS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ marginTop: "4rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.5rem",
            }}
          >
            <Sparkles size={18} color="var(--color-purple)" />
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--color-purple)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              ORGANISASI & EKSTRAKURIKULER
            </h3>
          </div>

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
            {organizations.map((org) => {
              const Icon = orgIconMap[org.name] || Trophy;
              return (
                <motion.div
                  key={org.name}
                  variants={fadeUp}
                  className="neon-card"
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "rgba(172, 75, 255, 0.1)",
                      border: "1px solid var(--color-purple)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 0 15px rgba(172, 75, 255, 0.25)",
                    }}
                  >
                    <Icon size={22} color="var(--color-purple)" />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-muted)",
                        display: "block",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {org.type}
                    </span>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "var(--color-white)",
                      }}
                    >
                      {org.name}
                    </h4>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      <div className="glow-divider" />
    </section>
  );
}
