import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import {
  NOTE_CATEGORIES,
  NOTE_COLORS,
  SPIDEY_ALIASES,
  INITIAL_STICKY_NOTES,
} from "../../data/stickyNotes";
import {
  subscribeToStickyNotes,
  createCloudStickyNote,
  updateCloudReaction,
  isCloudConfigured,
  isFirebaseReady,
} from "../../services/stickyNotesService";
import {
  Plus,
  X,
  Sparkles,
  Search,
  MessageSquare,
  Target,
  Zap,
  Heart,
  Grid,
  Check,
  RotateCcw,
  Flame,
  Pin,
  Trash2,
  Share2,
  Cloud,
} from "lucide-react";

const categoryIconMap = {
  Grid: Grid,
  MessageSquare: MessageSquare,
  Target: Target,
  Zap: Zap,
  Sparkles: Sparkles,
  Heart: Heart,
};

const STORAGE_KEY = "spiderman_portfolio_user_notes_v6";
const REACTED_STORAGE_KEY = "spiderman_reacted_notes_v6";

export default function StickyNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const savedUserNotes = localStorage.getItem(STORAGE_KEY);
      return savedUserNotes ? JSON.parse(savedUserNotes) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloudSyncActive, setIsCloudSyncActive] = useState(true);
  const [reactedNotes, setReactedNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(REACTED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Real-time Cloud Subscription
  useEffect(() => {
    const unsubscribe = subscribeToStickyNotes(
      (cloudNotes) => {
        if (cloudNotes && Array.isArray(cloudNotes)) {
          setIsCloudSyncActive(true);
          setNotes((prevNotes) => {
            const cloudIds = new Set(cloudNotes.map((cn) => cn.id));
            // Keep local user-created notes until confirmed present in Google Sheets
            const pendingUnsynced = prevNotes.filter(
              (pn) => pn.isPending && !cloudIds.has(pn.id)
            );
            return [...pendingUnsynced, ...cloudNotes];
          });
        }
      },
      () => {
        setIsCloudSyncActive(false);
      }
    );

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  // New Note Form State
  const [formData, setFormData] = useState({
    author: "",
    aliasBadge: "🕷️ Web Visitor",
    category: "feedback",
    colorId: "crimson",
    title: "",
    message: "",
  });
  const [copiedId, setCopiedId] = useState(null);

  // Sync user-created notes to localStorage for offline resilience
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem(REACTED_STORAGE_KEY, JSON.stringify(reactedNotes));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [reactedNotes]);

  // Filtered Notes (Defensive null checks)
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (!note) return false;
      const matchCategory =
        activeCategory === "all" || note.category === activeCategory;
      const q = (searchQuery || "").trim().toLowerCase();
      const title = String(note.title || "").toLowerCase();
      const message = String(note.message || "").toLowerCase();
      const author = String(note.author || "").toLowerCase();
      const matchSearch =
        q === "" ||
        title.includes(q) ||
        message.includes(q) ||
        author.includes(q);
      return matchCategory && matchSearch;
    });
  }, [notes, activeCategory, searchQuery]);

  // Handle Reactions (Optimistic + Firebase cloud sync)
  const handleReaction = async (noteId, reactionKey) => {
    const reactKey = `${noteId}_${reactionKey}`;
    const hasReacted = reactedNotes[reactKey];

    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id !== noteId) return note;
        const currentCount = note.reactions?.[reactionKey] || 0;
        return {
          ...note,
          reactions: {
            ...note.reactions,
            [reactionKey]: hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1,
          },
        };
      })
    );

    setReactedNotes((prev) => ({
      ...prev,
      [reactKey]: !hasReacted,
    }));

    // Update cloud document if synced
    if (isCloudSyncActive) {
      await updateCloudReaction(noteId, reactionKey, !hasReacted);
    }
  };

  // Random Alias Generator
  const handleRandomAlias = () => {
    const randomAlias =
      SPIDEY_ALIASES[Math.floor(Math.random() * SPIDEY_ALIASES.length)];
    const badges = [
      "⚡ Multiverse Visitor",
      "🕷️ Web-Crawler",
      "🌐 Cyber-Agent",
      "✨ Friendly Neighbor",
      "🛡️ Daily Bugle Fan",
    ];
    const randomBadge = badges[Math.floor(Math.random() * badges.length)];
    setFormData((prev) => ({
      ...prev,
      author: randomAlias,
      aliasBadge: randomBadge,
    }));
  };

  // Submit New Note (Optimistic + Universal Real-Time Cloud Push)
  const handleSubmitNote = async (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.message.trim()) return;

    const newNote = {
      id: `user-note-${Date.now()}`,
      author: formData.author.trim(),
      aliasBadge: formData.aliasBadge || "🕷️ Web Visitor",
      category: formData.category,
      colorId: formData.colorId,
      title: formData.title.trim() || "Web Message",
      message: formData.message.trim(),
      timestamp: "Just now",
      reactions: { web: 1, love: 1, zap: 1, fire: 1 },
      rotation: 0,
      isUserCreated: true,
      isPending: true,
      submittedAt: Date.now(),
    };

    // Ensure newly submitted note is visible immediately
    setActiveCategory("all");
    setSearchQuery("");

    // Optimistic local update
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setIsModalOpen(false);

    // Push to Universal Cross-Device Cloud DB (Syncs immediately with HP & Laptop)
    createCloudStickyNote(newNote).catch((err) => {
      console.warn("Cloud push note saved locally:", err);
    });

    // Reset Form
    setFormData({
      author: "",
      aliasBadge: "🕷️ Web Visitor",
      category: "feedback",
      colorId: "crimson",
      title: "",
      message: "",
    });
  };

  // Delete User-created Note
  const handleDeleteNote = (noteId) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Copy Note Text
  const handleCopyNote = (note) => {
    const text = `"${note.title}" - ${note.author}\n${note.message}`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Reset to initial notes
  const handleResetDefaults = () => {
    if (window.confirm("Kembalikan Sticky Notes ke data default Spider-Man?")) {
      setNotes(INITIAL_STICKY_NOTES);
      setReactedNotes({});
    }
  };

  const selectedColorObj =
    NOTE_COLORS.find((c) => c.id === formData.colorId) || NOTE_COLORS[0];

  return (
    <section id="notes" style={{ position: "relative", overflow: "hidden" }}>
      <div className="section">
        {/* Section Heading */}
        <SectionHeading
          number="06"
          label="SPIDER-BOARD"
          title="COMMUNITY"
          titleAccent="WEB NOTES."
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
          Tinggalkan pesan, feedback, misi kolaborasi, atau sekadar sapaan di
          Spider-Web Board. Tempelkan sticky note kamu dengan warna neon khas
          multiverse!
        </p>

        {/* Action Controls & Filter Bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: "relative",
                flex: "1",
                minWidth: "240px",
                maxWidth: "400px",
              }}
            >
              <Search
                size={16}
                color="var(--color-muted)"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Cari pesan, hero, atau kata kunci..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  background: "rgba(10, 10, 15, 0.8)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--color-red)";
                  e.target.style.boxShadow = "0 0 15px rgba(229, 9, 20, 0.25)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--color-border)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Main Action Buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              {/* Live Permanent Community Sync Badge */}
              <div
                style={{
                  padding: "0.65rem 1rem",
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "8px",
                  color: "#10b981",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  userSelect: "none",
                }}
              >
                <span style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                  animation: "pulse 2s infinite",
                }} />
                <span>LIVE CLOUD SYNC // {notes.length} MESSAGES SAVED</span>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
                style={{
                  padding: "0.75rem 1.4rem",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  boxShadow: "0 0 20px rgba(229, 9, 20, 0.35)",
                }}
              >
                <Plus size={16} />
                <span>PIN STICKY NOTE</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
              scrollbarWidth: "none",
            }}
          >
            {NOTE_CATEGORIES.map((cat) => {
              const Icon = categoryIconMap[cat.icon] || Grid;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(229, 9, 20, 0.3), rgba(172, 75, 255, 0.3))"
                      : "rgba(10, 10, 15, 0.6)",
                    border: isActive
                      ? "1px solid var(--color-red)"
                      : "1px solid var(--color-border)",
                    color: isActive ? "var(--color-white)" : "var(--color-muted)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.05em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.45rem",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    boxShadow: isActive ? "0 0 15px rgba(229, 9, 20, 0.2)" : "none",
                  }}
                >
                  <Icon size={13} color={isActive ? "var(--color-red)" : "currentColor"} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Notes Grid */}
        {filteredNotes.length === 0 ? (
          <div
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              background: "rgba(10, 10, 15, 0.4)",
              border: "1px dashed var(--color-border)",
              borderRadius: "12px",
            }}
          >
            <MessageSquare
              size={36}
              color="var(--color-muted)"
              style={{ margin: "0 auto 1rem", opacity: 0.5 }}
            />
            <h4
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-white)",
                marginBottom: "0.5rem",
              }}
            >
              {searchQuery
                ? "Tidak ada catatan yang cocok dengan pencarian"
                : activeCategory === "all"
                ? "Belum ada catatan yang ditempelkan"
                : "Belum ada Sticky Note di kategori ini"}
            </h4>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "var(--color-muted)",
                marginBottom: "1.5rem",
              }}
            >
              Jadilah yang pertama menempelkan catatan di Spider-Web Board!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary"
              style={{ cursor: "pointer", fontSize: "0.75rem" }}
            >
              <Plus size={14} /> Buat Sticky Note Baru
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {filteredNotes.map((note) => {
                const colorObj =
                  NOTE_COLORS.find((c) => c.id === note.colorId) || NOTE_COLORS[0];
                const isCopied = copiedId === note.id;

                return (
                  <div
                    key={note.id}
                    className="sticky-note-card"
                    style={{
                      position: "relative",
                      background: colorObj.bg,
                      border: `1px solid ${colorObj.border}`,
                      borderRadius: "12px",
                      padding: "1.5rem 1.25rem 1.25rem",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 10px ${colorObj.glow}`,
                      transform: "none",
                      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    {/* Cyber Web Tape Header (Top Pin) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "70px",
                        height: "20px",
                        background: colorObj.tape,
                        borderRadius: "3px",
                        boxShadow: `0 2px 8px ${colorObj.glow}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                      }}
                    >
                      <div
                        style={{
                          width: "80%",
                          height: "2px",
                          background: "rgba(255, 255, 255, 0.4)",
                          borderRadius: "1px",
                        }}
                      />
                    </div>

                    {/* Note Top Bar */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.85rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {/* Author & Badge */}
                      <div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            marginBottom: "0.2rem",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "0.95rem",
                              fontWeight: 700,
                              color: "var(--color-white)",
                            }}
                          >
                            {note.author}
                          </span>
                          {note.isPinned && (
                            <Pin size={12} color={colorObj.accent} />
                          )}
                        </div>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.62rem",
                            color: colorObj.badgeColor,
                            letterSpacing: "0.05em",
                            background: colorObj.tagBg,
                            padding: "0.15rem 0.45rem",
                            borderRadius: "4px",
                            display: "inline-block",
                          }}
                        >
                          {note.aliasBadge}
                        </span>
                      </div>

                      {/* Utility Action Icons */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                        <button
                          onClick={() => handleCopyNote(note)}
                          title="Salin teks"
                          style={{
                            padding: "0.3rem",
                            color: "var(--color-muted)",
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-white)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                        >
                          {isCopied ? <Check size={14} color="#10b981" /> : <Share2 size={14} />}
                        </button>

                        {note.isUserCreated && (
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            title="Hapus sticky note saya"
                            style={{
                              padding: "0.3rem",
                              color: "rgba(229, 9, 20, 0.7)",
                              borderRadius: "4px",
                              cursor: "pointer",
                              transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-red)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(229, 9, 20, 0.7)")}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Note Title */}
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: colorObj.accent,
                        marginBottom: "0.5rem",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {note.title}
                    </h4>

                    {/* Note Message */}
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.82rem",
                        lineHeight: "1.6",
                        color: "var(--color-text)",
                        marginBottom: "1.25rem",
                        wordBreak: "break-word",
                      }}
                    >
                      {note.message}
                    </p>

                    {/* Footer: Timestamp & Interactive Reactions */}
                    <div
                      style={{
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "0.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "var(--color-muted)",
                        }}
                      >
                        {note.timestamp}
                      </span>

                      {/* Reactions Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                      >
                        {[
                          { key: "web", icon: "🕸️", label: "Web" },
                          { key: "love", icon: "❤️", label: "Love" },
                          { key: "zap", icon: "⚡", label: "Zap" },
                          { key: "fire", icon: "🔥", label: "Fire" },
                        ].map((rx) => {
                          const count = note.reactions?.[rx.key] || 0;
                          const hasReacted = reactedNotes[`${note.id}_${rx.key}`];

                          return (
                            <button
                              key={rx.key}
                              onClick={() => handleReaction(note.id, rx.key)}
                              title={rx.label}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.2rem",
                                padding: "0.2rem 0.45rem",
                                background: hasReacted
                                  ? colorObj.tagBg
                                  : "rgba(255, 255, 255, 0.04)",
                                border: hasReacted
                                  ? `1px solid ${colorObj.border}`
                                  : "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "6px",
                                color: hasReacted
                                  ? "var(--color-white)"
                                  : "var(--color-muted)",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.68rem",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                            >
                              <span>{rx.icon}</span>
                              <span>{count}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* PIN STICKY NOTE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="cert-modal-overlay" onClick={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="neon-card"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "680px",
                width: "100%",
                padding: "2rem",
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                border: `1px solid ${selectedColorObj.border}`,
                boxShadow: `0 0 50px ${selectedColorObj.glow}`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  color: "var(--color-muted)",
                  padding: "0.4rem",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>

              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.3rem",
                  }}
                >
                  <Sparkles size={18} color={selectedColorObj.accent} />
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "var(--color-white)",
                    }}
                  >
                    PIN STICKY NOTE KE SPIDER-WEB
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--color-muted)",
                  }}
                >
                  Tulis pesanmu, pilih tema neon Spider-Verse, dan lihat live preview di bawah!
                </p>
              </div>

              {/* Form & Live Preview Grid */}
              <form onSubmit={handleSubmitNote} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {/* Author Name + Spidey Alias Generator */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <label
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--color-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Nama / Alias Kamu *
                    </label>
                    <button
                      type="button"
                      onClick={handleRandomAlias}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: selectedColorObj.accent,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        cursor: "pointer",
                      }}
                    >
                      <Zap size={12} />
                      <span>Acak Spidey Alias</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Peter Parker atau Haikel's Fan"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-white)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Color Palette Selector */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Pilih Tema Warna Neon Spider-Verse
                  </label>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                      gap: "0.5rem",
                    }}
                  >
                    {NOTE_COLORS.map((c) => {
                      const isSelected = formData.colorId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, colorId: c.id })}
                          style={{
                            padding: "0.5rem",
                            borderRadius: "8px",
                            background: c.bg,
                            border: isSelected
                              ? `2px solid ${c.border}`
                              : "1px solid rgba(255, 255, 255, 0.1)",
                            color: "var(--color-white)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.68rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            cursor: "pointer",
                            boxShadow: isSelected ? `0 0 12px ${c.glow}` : "none",
                          }}
                        >
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: c.border,
                              boxShadow: `0 0 6px ${c.border}`,
                            }}
                          />
                          <span style={{ fontSize: "0.65rem" }}>{c.name.split(" ")[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category Selector */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Kategori Catatan
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {NOTE_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                      const isSelected = formData.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          style={{
                            padding: "0.4rem 0.8rem",
                            borderRadius: "6px",
                            background: isSelected
                              ? selectedColorObj.tagBg
                              : "rgba(255, 255, 255, 0.04)",
                            border: isSelected
                              ? `1px solid ${selectedColorObj.border}`
                              : "1px solid var(--color-border)",
                            color: isSelected ? "var(--color-white)" : "var(--color-muted)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                          }}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Title & Message */}
                <div>
                  <label
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.72rem",
                      color: "var(--color-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: "0.4rem",
                    }}
                  >
                    Judul Sticky Note
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Nice Web Design! atau Pertanyaan Kolaborasi"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-white)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <label
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        color: "var(--color-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Isi Pesan *
                    </label>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        color: "var(--color-muted)",
                      }}
                    >
                      {formData.message.length}/300
                    </span>
                  </div>
                  <textarea
                    required
                    maxLength={300}
                    rows={3}
                    placeholder="Tuliskan pesanmu di sini..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                      color: "var(--color-white)",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      lineHeight: "1.5",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Submit Action */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.75rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{
                      padding: "0.75rem 1.25rem",
                      borderRadius: "6px",
                      background: "transparent",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                    }}
                  >
                    <Pin size={14} />
                    <span>TEMPELKAN SEKARANG</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="glow-divider" />
    </section>
  );
}
