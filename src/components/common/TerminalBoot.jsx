import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "SPIDER-OS v2.0 BIOS - initialized",
  "Checking web-shooters... OK",
  "Checking fluid levels... 98%",
  "Loading Peter Parker modules...",
  "Bypassing security protocols...",
  "Loading GUI interface...",
  "ACCESS GRANTED."
];

export default function TerminalBoot({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500); // Wait for fade out
        }, 1000);
      }
    }, 400); // 400ms between lines

    return () => clearInterval(interval);
  }, [hasStarted, onComplete]);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      // Try to auto-play background music on first interaction
      const audio = document.getElementById("bgm-audio");
      if (audio) {
        audio.play().catch(err => console.error("Auto-play failed:", err));
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          onClick={handleStart}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#000",
            zIndex: 999999,
            padding: "2rem",
            fontFamily: "var(--font-mono, monospace)",
            color: "var(--color-red, #ff0000)", // Use Spiderman Red
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            cursor: "pointer"
          }}
        >
          {!hasStarted ? (
            <motion.div
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ margin: "auto", fontSize: "1.2rem", textShadow: "0 0 10px var(--color-red, #ff0000)" }}
            >
              [ CLICK ANYWHERE TO INITIALIZE SPIDER-OS ]
            </motion.div>
          ) : (
            <>
              {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ marginBottom: "0.5rem", textShadow: "0 0 5px #0f0" }}
            >
              &gt; {line}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{
              width: "10px",
              height: "20px",
              backgroundColor: "#0f0",
              boxShadow: "0 0 5px #0f0"
            }}
          />
          </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
