import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { skillsList } from "../../data/skills";
import { staggerContainer, fadeUp, defaultViewport } from "../../animations/variants";

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" style={{ position: "relative" }}>
      <div className="section">
        <SectionHeading
          number="02"
          label="SKILLS"
          title="MY SKILLS"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "2rem"
          }}
        >
          {skillsList.map((skill, index) => {
            const Icon = skill.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={skill.title}
                variants={fadeUp}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  background: "var(--color-panel)",
                  borderRadius: "16px",
                  padding: "2rem",
                  border: "1px solid var(--color-border)",
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                animate={shouldReduceMotion ? {} : {
                  y: isHovered ? -6 : 0,
                  scale: isHovered ? 1.02 : 1,
                  borderColor: isHovered ? "var(--color-purple)" : "var(--color-border)",
                  boxShadow: isHovered 
                    ? "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(172,75,255,0.2), inset 0 0 15px rgba(229,9,20,0.15)" 
                    : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Web Scan effect on Hover */}
                {isHovered && !shouldReduceMotion && (
                  <motion.div
                    initial={{ top: "-100%" }}
                    animate={{ top: "200%" }}
                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                    style={{
                      position: "absolute",
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background: "linear-gradient(90deg, transparent, var(--color-red), var(--color-purple), transparent)",
                      boxShadow: "0 0 20px rgba(229,9,20,0.8)",
                      zIndex: 0
                    }}
                  />
                )}

                <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <motion.div
                    animate={{
                      color: isHovered ? "var(--color-white)" : "var(--color-red)",
                      rotate: isHovered ? 5 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={32} />
                  </motion.div>
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--color-white)",
                      marginBottom: "0.5rem"
                    }}>
                      {skill.title}
                    </h3>
                    
                    {/* Progress Indicator */}
                    <div style={{
                      width: "100%",
                      height: "4px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "2px",
                      overflow: "hidden"
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        style={{
                          height: "100%",
                          background: "linear-gradient(90deg, var(--color-red), var(--color-purple))",
                          borderRadius: "2px"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="glow-divider" />
    </section>
  );
}
