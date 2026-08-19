import { useState, useRef, useEffect } from "react";
import { VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3; // Set background music volume
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "2.5rem",
      right: "2.5rem",
      zIndex: 9999,
    }}>
      {/* Audio Element: Make sure you put a file named 'bgm.mp3' in your public folder */}
      <audio id="bgm-audio" ref={audioRef} src="/bgm.mp3" loop />
      
      <button
        onClick={togglePlay}
        aria-label="Toggle background music"
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: isPlaying ? "rgba(255, 43, 61, 0.15)" : "rgba(3, 5, 10, 0.8)",
          border: `1px solid ${isPlaying ? "var(--color-red)" : "var(--color-border)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isPlaying ? "var(--color-white)" : "var(--color-muted)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isPlaying 
            ? "0 0 30px rgba(255, 43, 61, 0.4), inset 0 0 10px rgba(255, 43, 61, 0.2)" 
            : "0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        {isPlaying ? (
          <div style={{ display: "flex", gap: "4px", alignItems: "center", height: "20px" }}>
            {[0.8, 1.2, 0.9, 1.5].map((duration, i) => (
              <motion.div
                key={i}
                animate={{ height: ["6px", "20px", "6px"] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: duration, 
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
                style={{ 
                  width: "3px", 
                  background: "var(--color-white)", 
                  borderRadius: "2px",
                  boxShadow: "0 0 8px var(--color-white)"
                }}
              />
            ))}
          </div>
        ) : (
          <VolumeX size={24} />
        )}
      </button>
      
      {/* Tooltip */}
      <div style={{
        position: "absolute",
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
        marginRight: "15px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        letterSpacing: "0.15em",
        whiteSpace: "nowrap",
        color: "var(--color-muted)",
        opacity: isPlaying ? 0 : 0.7,
        pointerEvents: "none",
        transition: "opacity 0.3s",
      }}>
        PLAY BGM
      </div>
    </div>
  );
}
