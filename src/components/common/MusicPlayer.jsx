import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music, Disc, Play, Pause, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);
      
      return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('pause', handlePause);
      };
    }
  }, [volume]);

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

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        audioRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="floating-music-player">
      {/* Audio Element */}
      <audio id="bgm-audio" ref={audioRef} src="/bgm.mp3" loop />

      {/* Expanded Track Details Card */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: "1.25rem",
              borderRadius: "18px",
              background: "rgba(8, 10, 18, 0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 9, 20, 0.35)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(229, 9, 20, 0.25)",
              width: "280px",
              textAlign: "left",
            }}
          >
            {/* Header / Track info */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem" }}>
              <div 
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--color-red, #e50914), var(--color-purple, #ac4bff))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow: "0 0 15px rgba(229, 9, 20, 0.5)",
                  animation: isPlaying ? "spin 4s linear infinite" : "none",
                  flexShrink: 0
                }}
              >
                <Disc size={20} />
              </div>

              <div style={{ overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                  <Sparkles size={11} color="var(--color-yellow, #ffe600)" />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--color-yellow, #ffe600)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  }}>
                    Spider-Verse OST
                  </span>
                </div>
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#fff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: "2px 0 0 0"
                }}>
                  Sunflower
                </p>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  color: "var(--color-muted)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  margin: 0
                }}>
                  Post Malone, Swae Lee
                </p>
              </div>
            </div>

            {/* Equalizer & Controls */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "0.75rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)"
            }}>
              <button
                onClick={toggleMute}
                aria-label="Toggle mute"
                style={{
                  padding: "0.35rem",
                  color: isMuted ? "var(--color-red)" : "var(--color-muted)",
                  cursor: "pointer"
                }}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              {/* Volume Slider */}
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={isMuted ? 0 : volume} 
                onChange={handleVolumeChange}
                style={{
                  width: "75px",
                  accentColor: "var(--color-red, #e50914)",
                  cursor: "pointer",
                  height: "4px"
                }}
              />

              <button
                onClick={togglePlay}
                style={{
                  padding: "0.35rem 0.85rem",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, var(--color-red), var(--color-purple))",
                  color: "#fff",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 0 10px rgba(229, 9, 20, 0.4)"
                }}
              >
                {isPlaying ? "PAUSE" : "PLAY"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Audio Disk Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle music player menu"
          style={{
            height: "50px",
            padding: "0 1.1rem",
            borderRadius: "30px",
            background: isPlaying 
              ? "linear-gradient(135deg, rgba(229, 9, 20, 0.25), rgba(172, 75, 255, 0.25))" 
              : "rgba(10, 10, 15, 0.85)",
            border: `1px solid ${isPlaying ? "rgba(229, 9, 20, 0.6)" : "rgba(255, 255, 255, 0.12)"}`,
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            color: isPlaying ? "#fff" : "var(--color-muted)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            cursor: "pointer",
            boxShadow: isPlaying 
              ? "0 0 25px rgba(229, 9, 20, 0.4), inset 0 0 12px rgba(229, 9, 20, 0.2)" 
              : "0 6px 20px rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Rotating Vinyl Icon */}
          <div 
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--color-red), var(--color-purple))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              animation: isPlaying ? "spin 3s linear infinite" : "none",
            }}
          >
            <Music size={13} />
          </div>

          {/* Equalizer Sound Waves */}
          {isPlaying ? (
            <div style={{ display: "flex", gap: "3px", alignItems: "center", height: "16px" }}>
              {[0.6, 1.0, 0.8, 1.2].map((duration, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["4px", "16px", "4px"] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: duration, 
                    ease: "easeInOut",
                    delay: i * 0.1
                  }}
                  style={{ 
                    width: "2.5px", 
                    background: i % 2 === 0 ? "var(--color-red, #e50914)" : "var(--color-purple, #ac4bff)", 
                    borderRadius: "2px",
                    boxShadow: "0 0 6px var(--color-red)"
                  }}
                />
              ))}
            </div>
          ) : (
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              color: "var(--color-muted)"
            }}>
              OST
            </span>
          )}

          {/* Quick Play/Pause trigger */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              marginLeft: "0.2rem"
            }}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} style={{ marginLeft: "1px" }} />}
          </div>
        </motion.button>
      </div>
    </div>
  );
}
