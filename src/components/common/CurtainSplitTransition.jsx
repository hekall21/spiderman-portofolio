import { motion, AnimatePresence } from "framer-motion";

export default function CurtainSplitTransition({ isRevealing, onComplete }) {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isRevealing && (
        <motion.div
          key="curtain-split-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            pointerEvents: "none",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Left Shutter */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 1.1,
              ease: [0.77, 0, 0.175, 1], // Cinematic high-inertia cubic-bezier
              delay: 0.15,
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              background: "#05060a",
              borderRight: "2px solid rgba(229, 9, 20, 0.8)",
              boxShadow: "10px 0 35px rgba(229, 9, 20, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "rgba(255, 255, 255, 0.08)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              SPIDER
            </span>
          </motion.div>

          {/* Right Shutter */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.1,
              ease: [0.77, 0, 0.175, 1],
              delay: 0.15,
            }}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              background: "#05060a",
              borderLeft: "2px solid rgba(0, 240, 255, 0.8)",
              boxShadow: "-10px 0 35px rgba(0, 240, 255, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: "2rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 4vw, 3rem)",
                fontWeight: 900,
                color: "rgba(255, 255, 255, 0.08)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              VERSE
            </span>
          </motion.div>

          {/* Center Energy Seam Laser */}
          <motion.div
            initial={{ opacity: 1, scaleY: 1 }}
            animate={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "3px",
              height: "100%",
              background: "linear-gradient(to bottom, #00f0ff, #fff, #e50914)",
              boxShadow: "0 0 20px #00f0ff, 0 0 40px #e50914",
              zIndex: 10,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
