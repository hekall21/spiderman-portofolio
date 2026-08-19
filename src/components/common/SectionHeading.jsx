import { motion } from "framer-motion";
import { fadeUp, defaultViewport } from "../../animations/variants";

export default function SectionHeading({ number, label, title, titleAccent }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <motion.p
        className="section-number"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
      >
        {number} / {label}
      </motion.p>
      <motion.h2
        className="decorative-heading"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        transition={{ delay: 0.1 }}
      >
        {title}
        {titleAccent && (
          <>
            <br />
            <span className="gradient-text">{titleAccent}</span>
          </>
        )}
      </motion.h2>
    </div>
  );
}
