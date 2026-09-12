import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import Counter from "../common/Counter";
import { profile } from "../../data/profile";
import { fadeUp, staggerContainer } from "../../animations/variants";
import {
  User,
  GraduationCap,
  Laptop,
  MapPin,
  Sparkles,
  Heart,
  Globe,
  Award,
  Gamepad2,
  Dumbbell,
  Film,
  Video,
  Code2,
  Camera,
  Layers,
  ChevronRight,
} from "lucide-react";

const visualDossier = [
  {
    title: "The Daily Bugle Newspaper Collage",
    src: "/assets/ui/spiderman-daily-bugle-newspaper-collage.jpg",
    subtitle: "New York Gazette & Spidey Headlines",
    badge: "Press Archive",
  },
  {
    title: "Comic Scrapbook & Stickers Collage",
    src: "/assets/ui/spiderman-comic-scrapbook-stickers-collage.jpg",
    subtitle: "Retro Pop-Art & Multi-Dimension Decals",
    badge: "Creative Lab",
  },
  {
    title: "Cinematic Film Set Backview",
    src: "/assets/aesthetic/aesthetic-cinematic-film-set-backview.jpg",
    subtitle: "Director's Cut & Studio Lighting",
    badge: "Production Vibe",
  },
  {
    title: "Ocean Diving Board Solitude",
    src: "/assets/aesthetic/aesthetic-sza-sos-ocean-diving-board.jpg",
    subtitle: "Atmospheric Blue Gradient Horizon",
    badge: "Mood Board",
  },
];

const hobbyIconMap = {
  Basketball: Dumbbell,
  Badminton: Dumbbell,
  "Online Games": Gamepad2,
  "Watching Movies": Film,
  "Technology & Multimedia": Code2,
  "Video Editing": Video,
};

export default function About() {
  const [activeDossierIdx, setActiveDossierIdx] = useState(0);
  const currentDossier = visualDossier[activeDossierIdx];
  return (
    <section id="about" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        <SectionHeading
          number="01"
          label="ORIGIN STORY"
          title="ABOUT"
          titleAccent="HAIKEL."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {/* Top Bento Row: Main Bio & Personality */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Bio Card */}
            <motion.div
              variants={fadeUp}
              className="neon-card with-crosshairs"
              style={{
                padding: "2.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Sparkles size={18} color="var(--color-red)" />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-red)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    BIOGRAPHY // PROFILE SUMMARY
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--color-white)",
                    marginBottom: "1rem",
                    lineHeight: 1.3,
                  }}
                >
                  Teknik Komputer & Jaringan, Administrasi Data, & Multimedia
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                    color: "var(--color-text)",
                    marginBottom: "1.5rem",
                  }}
                >
                  {profile.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--color-muted)",
                  }}
                >
                  Status: <strong style={{ color: "var(--color-white)" }}>{profile.status}</strong>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "var(--color-purple)",
                    background: "rgba(172, 75, 255, 0.1)",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(172, 75, 255, 0.2)",
                  }}
                >
                  Jurusan: {profile.field}
                </span>
              </div>
            </motion.div>

            {/* Personality & Work Ethic Card */}
            <motion.div
              variants={fadeUp}
              className="neon-card with-crosshairs"
              style={{
                padding: "2.25rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Heart size={18} color="var(--color-purple)" />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-purple)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    PERSONALITY & WORK ETHIC
                  </span>
                </div>
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "var(--color-white)",
                    lineHeight: 1.6,
                    borderLeft: "3px solid var(--color-purple)",
                    paddingLeft: "1.25rem",
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  "{profile.personality}"
                </blockquote>
              </div>

              {/* Languages & Core Traits */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--color-muted)",
                    display: "block",
                    marginBottom: "0.6rem",
                    textTransform: "uppercase",
                  }}
                >
                  Bahasa & Komunikasi
                </span>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {profile.languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.35rem 0.75rem",
                        background: "rgba(48, 128, 255, 0.08)",
                        border: "1px solid rgba(48, 128, 255, 0.25)",
                        borderRadius: "6px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--color-white)",
                      }}
                    >
                      <Globe size={12} color="var(--color-blue)" />
                      <span>{lang.name}</span>
                      <span style={{ color: "var(--color-muted)", fontSize: "0.65rem" }}>
                        ({lang.level})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 3rd Card: Spider-Verse Visual Dossier & Photographic Archive */}
            <motion.div
              variants={fadeUp}
              className="neon-card with-crosshairs"
              style={{
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Camera size={18} color="var(--color-cyan, #00f0ff)" />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--color-cyan, #00f0ff)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      VISUAL DOSSIER // ARCHIVE
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.62rem",
                      background: "rgba(0, 240, 255, 0.12)",
                      border: "1px solid rgba(0, 240, 255, 0.3)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "4px",
                      color: "#00f0ff",
                      fontWeight: 700,
                    }}
                  >
                    {currentDossier.badge}
                  </span>
                </div>

                {/* Main Media Preview Frame */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/10",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    background: "#080a12",
                    marginBottom: "0.85rem",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <img
                    src={currentDossier.src}
                    alt={currentDossier.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.92) contrast(1.08)",
                      transition: "transform 0.4s ease",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(5, 5, 8, 0.9) 0%, transparent 60%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Overlay Title */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      left: "10px",
                      right: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.2,
                      }}
                    >
                      {currentDossier.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: "var(--color-muted)",
                        marginTop: "2px",
                      }}
                    >
                      {currentDossier.subtitle}
                    </div>
                  </div>
                </div>

                {/* Thumbnails row to switch active dossier */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem" }}>
                  {visualDossier.map((item, idx) => {
                    const isSelected = activeDossierIdx === idx;
                    return (
                      <button
                        key={item.title}
                        onClick={() => setActiveDossierIdx(idx)}
                        style={{
                          height: "44px",
                          borderRadius: "6px",
                          overflow: "hidden",
                          border: isSelected ? "2px solid #00f0ff" : "1px solid rgba(255, 255, 255, 0.12)",
                          cursor: "pointer",
                          padding: 0,
                          opacity: isSelected ? 1 : 0.6,
                          transform: isSelected ? "scale(1.05)" : "scale(1)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "0.75rem",
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--color-muted)",
                }}
              >
                <span>ARCHIVE: <strong style={{ color: "#00f0ff" }}>RESTRICTED</strong></span>
                <span style={{ color: "var(--color-white)" }}>FILE {activeDossierIdx + 1}/4</span>
              </div>
            </motion.div>
          </div>

          {/* Middle Bento Row: 4 HUD Telemetry Info Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {/* Card 1: Nama */}
            <motion.div variants={fadeUp} className="neon-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(229, 9, 20, 0.12)",
                    border: "1px solid var(--color-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 15px rgba(229, 9, 20, 0.25)",
                  }}
                >
                  <User size={20} color="var(--color-red)" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Identitas Penuh
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      color: "var(--color-white)",
                      fontWeight: 600,
                    }}
                  >
                    Muhammad Haikel Saleh
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Pendidikan */}
            <motion.div variants={fadeUp} className="neon-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(172, 75, 255, 0.12)",
                    border: "1px solid var(--color-purple)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 15px rgba(172, 75, 255, 0.25)",
                  }}
                >
                  <GraduationCap size={20} color="var(--color-purple)" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Pendidikan Formal
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      color: "var(--color-white)",
                      fontWeight: 600,
                    }}
                  >
                    SMKN 22 Jakarta
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Keahlian Utama */}
            <motion.div variants={fadeUp} className="neon-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(48, 128, 255, 0.12)",
                    border: "1px solid var(--color-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "0 0 15px rgba(48, 128, 255, 0.25)",
                  }}
                >
                  <Laptop size={20} color="var(--color-blue)" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Spesialisasi
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      color: "var(--color-white)",
                      fontWeight: 600,
                    }}
                  >
                    IT & Admin Support
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 4: Lokasi */}
            <motion.div variants={fadeUp} className="neon-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={20} color="var(--color-white)" />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    Domisili
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "0.95rem",
                      color: "var(--color-white)",
                      fontWeight: 600,
                    }}
                  >
                    Jakarta Timur, ID
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hobbies & Interests Cloud */}
          <motion.div
            variants={fadeUp}
            className="neon-card"
            style={{ padding: "1.5rem 2rem" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--color-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "0.85rem",
              }}
            >
              MINAT, HOBI & MULTIMEDIA
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {profile.hobbies.map((hobby) => {
                const Icon = hobbyIconMap[hobby] || Sparkles;
                return (
                  <motion.div
                    key={hobby}
                    whileHover={{ scale: 1.05, y: -2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.45rem",
                      padding: "0.45rem 0.9rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "20px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--color-white)",
                      cursor: "default",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <Icon size={13} color="var(--color-red)" />
                    <span>{hobby}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Stats Counters Grid */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1.5rem",
              marginTop: "0.5rem",
            }}
          >
            {profile.stats.map((stat) => (
              <Counter key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="glow-divider" />
    </section>
  );
}
