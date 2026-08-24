import { motion } from "framer-motion";
import { fadeUp, defaultViewport } from "../../animations/variants";

export default function SectionHeading({ number, label, title, titleAccent }) {
  return (
    <div style={{ marginBottom: "3.5rem", position: "relative" }}>
      {/* Top Hairline with Corner Plus Mark (+) */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        paddingBottom: "0.65rem",
        marginBottom: "1.25rem",
      }}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-red)",
            fontWeight: 600,
          }}
        >
          <span style={{
            width: "6px",
            height: "6px",
            background: "var(--color-red)",
            borderRadius: "1px",
            boxShadow: "0 0 8px var(--color-red)",
          }} />
          <span>( {number} // {label} )</span>
        </motion.div>

        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "rgba(255, 255, 255, 0.2)",
          userSelect: "none",
        }}>
          +
        </span>
      </div>

      {/* Monumental Kinetic Heading */}
      <motion.h2
        className="decorative-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        transition={{ delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5.5vw, 3.8rem)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "var(--color-white)",
        }}
      >
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="gradient-text" style={{ textShadow: "0 0 25px rgba(229,9,20,0.3)" }}>
              {titleAccent}
            </span>
          </>
        )}
      </motion.h2>
    </div>
  );
}
