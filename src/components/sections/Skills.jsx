import { useState, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { skillsList, technicalSkills } from "../../data/skills";
import { staggerContainer, fadeUp, defaultViewport } from "../../animations/variants";
import { Cpu, Terminal, Network, ShieldCheck, Sparkles, Layers } from "lucide-react";

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const shouldReduceMotion = useReducedMotion();

  const categories = [
    { id: "all", label: "Semua Skill", icon: Layers },
    { id: "tech", label: "IT, Server & Networking", icon: Network },
    { id: "admin", label: "Administrasi & Office", icon: Terminal },
    { id: "soft", label: "Soft Skills & Team", icon: ShieldCheck },
  ];

  const filteredSkills = useMemo(() => {
    if (activeCategory === "all") return skillsList;
    if (activeCategory === "tech") {
      return skillsList.filter((s) =>
        ["Komputer & Networking", "Editing Video Dasar"].includes(s.title)
      );
    }
    if (activeCategory === "admin") {
      return skillsList.filter((s) =>
        ["Microsoft Word", "Microsoft PowerPoint", "Data Entry", "Administrasi Dasar"].includes(
          s.title
        )
      );
    }
    if (activeCategory === "soft") {
      return skillsList.filter((s) =>
        ["Teamwork", "Problem Solving"].includes(s.title)
      );
    }
    return skillsList;
  }, [activeCategory]);

  return (
    <section id="skills" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="02"
          label="ARSENAL & ABILITIES"
          title="TECHNICAL"
          titleAccent="SKILLS."
        />

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-muted)",
            maxWidth: "680px",
            marginTop: "-1rem",
            marginBottom: "2.5rem",
            lineHeight: 1.6,
          }}
        >
          Kombinasi keahlian teknis jaringan komputer (TKJ), administrasi data kantor,
          troubleshooting sistem operasi, dan multimedia digital.
        </p>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            overflowX: "auto",
            paddingBottom: "1rem",
            marginBottom: "2rem",
            scrollbarWidth: "none",
          }}
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 1.1rem",
                  borderRadius: "20px",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(229, 9, 20, 0.3), rgba(172, 75, 255, 0.3))"
                    : "rgba(10, 10, 15, 0.6)",
                  border: isActive
                    ? "1px solid var(--color-red)"
                    : "1px solid var(--color-border)",
                  color: isActive ? "var(--color-white)" : "var(--color-muted)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  boxShadow: isActive ? "0 0 15px rgba(229, 9, 20, 0.2)" : "none",
                }}
              >
                <Icon size={14} color={isActive ? "var(--color-red)" : "currentColor"} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Core Skills Cards Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={skill.title}
                  layout
                  variants={fadeUp}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="neon-card with-crosshairs"
                  style={{
                    position: "relative",
                    background: "var(--color-panel)",
                    borderRadius: "14px",
                    padding: "1.75rem",
                    border: isHovered
                      ? "1px solid var(--color-purple)"
                      : "1px solid var(--color-border)",
                    backdropFilter: "blur(20px)",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: isHovered
                      ? "0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(172,75,255,0.25)"
                      : "none",
                    transform: isHovered && !shouldReduceMotion ? "translateY(-4px)" : "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Top Scanline Line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: isHovered
                        ? "linear-gradient(90deg, var(--color-red), var(--color-purple))"
                        : "transparent",
                      transition: "background 0.3s ease",
                    }}
                  />

                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
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
                        background: isHovered
                          ? "rgba(172, 75, 255, 0.15)"
                          : "rgba(229, 9, 20, 0.1)",
                        border: isHovered
                          ? "1px solid var(--color-purple)"
                          : "1px solid rgba(229, 9, 20, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon
                        size={22}
                        color={isHovered ? "var(--color-purple)" : "var(--color-red)"}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <h3
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "var(--color-white)",
                          }}
                        >
                          {skill.title}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: isHovered
                              ? "var(--color-purple)"
                              : "var(--color-red)",
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div
                        style={{
                          width: "100%",
                          height: "5px",
                          background: "rgba(255, 255, 255, 0.06)",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.15 + index * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            height: "100%",
                            background:
                              "linear-gradient(90deg, var(--color-red), var(--color-purple))",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Technical Infrastructure Arsenal / Stack Grid */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="neon-card"
          style={{ padding: "2.25rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.25rem",
            }}
          >
            <Cpu size={20} color="var(--color-blue)" />
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--color-white)",
                }}
              >
                NETWORKING, SERVER & SYSTEM TOOLS MATRIX
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-muted)",
                }}
              >
                Protokol, sistem operasi, server tools, dan virtualisasi yang dikuasai
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
            }}
          >
            {technicalSkills.map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05, y: -2 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.45rem 0.9rem",
                  background: "rgba(48, 128, 255, 0.08)",
                  border: "1px solid rgba(48, 128, 255, 0.25)",
                  borderRadius: "8px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--color-white)",
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--color-blue)",
                    boxShadow: "0 0 6px var(--color-blue)",
                  }}
                />
                <span>{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="glow-divider" />
    </section>
  );
}
