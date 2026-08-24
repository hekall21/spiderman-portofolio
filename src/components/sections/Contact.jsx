import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { socials, contactInfo } from "../../data/social.jsx";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import {
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  Radio,
  Send,
  Sparkles,
  Phone,
  Mail,
  Clock,
  Zap,
  ShieldCheck,
  MessageSquare,
  Bot,
  Terminal,
  ExternalLink
} from "lucide-react";

export default function Contact() {
  const [copiedItem, setCopiedItem] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    topic: "Junior Web Developer Role",
    message: ""
  });
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Update Live Jakarta Time (WIB)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
      setCurrentTime(`${timeString} WIB (GMT+7)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const topics = [
    { id: "web-dev", label: "💼 Junior Web Dev Role" },
    { id: "network-it", label: "🌐 IT Support / Network Role" },
    { id: "project", label: "⚡ Web Development Project" },
    { id: "say-hi", label: "👋 Connect & Say Hi" },
  ];

  const quickPresets = [
    "Halo Haikel, kami dari HRD ingin mendiskusikan peluang kerja untuk Anda.",
    "Halo Haikel, kami butuh bantuan pembuatan aplikasi web berbasis Laravel/React.",
    "Halo Haikel, tertarik mendiskusikan implementasi infrastruktur jaringan IT."
  ];

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();
    const senderName = formData.name.trim() || "Rekruter / Klien";
    const senderContact = formData.contact.trim() || "-";
    const topic = formData.topic;
    const customMessage = formData.message.trim() || "Saya tertarik dengan portofolio Anda dan ingin berdiskusi lebih lanjut.";

    const text = `*TRANSMISI DARI PORTOFOLIO SPIDER-MAN*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Nama:* ${senderName}\n` +
      `📞 *Kontak:* ${senderContact}\n` +
      `🎯 *Topik:* ${topic}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `💬 *Pesan:*\n${customMessage}\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `_Terkirim via Spider-Comms Hub // Haikel Portfolio_`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${contactInfo.whatsappRaw}?text=${encodedText}`;
    
    setTransmissionSuccess(true);
    setTimeout(() => {
      window.open(waUrl, "_blank");
      setTransmissionSuccess(false);
    }, 400);
  };

  const handleEmailSubmit = (e) => {
    if (e) e.preventDefault();
    const senderName = formData.name.trim() || "Visitor";
    const topic = formData.topic;
    const customMessage = formData.message.trim() || "Halo Haikel, saya tertarik dengan keahlian Anda.";

    const subject = encodeURIComponent(`[Inquiry Portofolio] ${topic} - ${senderName}`);
    const body = encodeURIComponent(
      `Nama: ${senderName}\n` +
      `Kontak Pengirim: ${formData.contact || '-'}\n` +
      `Topik: ${topic}\n\n` +
      `Pesan:\n${customMessage}\n\n` +
      `---\nTerkirim via Spider-Comms Hub`
    );

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--color-bg, #050508)",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "6rem",
      }}
    >
      {/* Background Web Geometry & Cinematic Glows */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          border: "1px dashed rgba(229, 9, 20, 0.08)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(0, 240, 255, 0.08)",
          filter: "blur(140px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "rgba(229, 9, 20, 0.09)",
          filter: "blur(140px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="section" style={{ position: "relative", zIndex: 10 }}>
        {/* Section Header */}
        <SectionHeading
          number="07"
          label="COMMUNICATION PROTOCOL"
          title="TRANSMISSION &"
          titleAccent="DISPATCH HUB."
        />

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            color: "var(--color-muted)",
            maxWidth: "720px",
            marginTop: "-1rem",
            marginBottom: "3.5rem",
            lineHeight: 1.6,
          }}
        >
          Saluran komunikasi terbuka untuk peluang rekrutmen kerja (Fresh Graduate TKJ / Junior Web Developer / IT Support), proyek pengembangan web modern, konsultasi jaringan, atau diskusi kolaborasi.
        </p>

        {/* Two Column Layout: Interactive Dispatch Form & Holographic Channels */}
        <div className="contact-grid-wrapper">
          
          {/* LEFT COLUMN: Interactive Spider-Comms Dispatch Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="neon-card"
            style={{
              padding: "2.25rem",
              background: "rgba(10, 12, 22, 0.85)",
              border: "1px solid rgba(229, 9, 20, 0.3)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(229, 9, 20, 0.15)",
              borderRadius: "24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Holographic Header Badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className="animate-spider-pulse" style={{ width: "10px", height: "10px", borderRadius: "50%", background: "var(--color-red, #e50914)", display: "inline-block" }}></span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-red, #e50914)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  SPIDER-COMMS TERMINAL // v2.4
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-cyan, #00f0ff)", padding: "0.2rem 0.6rem", borderRadius: "6px", background: "rgba(0, 240, 255, 0.08)", border: "1px solid rgba(0, 240, 255, 0.2)" }}>
                ⚡ INSTANT DISPATCH
              </span>
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Kirim Pesan Langsung ke Haikel
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-text)", marginBottom: "1.75rem", lineHeight: 1.5 }}>
              Pilih topik dan isi formulir di bawah untuk mengirim pesan otomatis via <strong>WhatsApp</strong> atau <strong>Email</strong> dalam satu klik.
            </p>

            {/* Topic Selection Chips */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                1. Pilih Kategori Keperluan:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.5rem" }}>
                {topics.map((t) => {
                  const isSelected = formData.topic === t.label;
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setFormData({ ...formData, topic: t.label })}
                      style={{
                        padding: "0.55rem 0.8rem",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontFamily: "var(--font-mono)",
                        textAlign: "left",
                        cursor: "pointer",
                        border: isSelected ? "1px solid var(--color-red, #e50914)" : "1px solid rgba(255,255,255,0.08)",
                        background: isSelected ? "linear-gradient(135deg, rgba(229,9,20,0.25), rgba(172,75,255,0.2))" : "rgba(255,255,255,0.02)",
                        color: isSelected ? "#fff" : "var(--color-muted)",
                        boxShadow: isSelected ? "0 0 15px rgba(229,9,20,0.25)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleWhatsAppSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    Nama Anda / Instansi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bpk. Hendra (PT Teknologi Maju)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      background: "rgba(5, 7, 12, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      outline: "none",
                      transition: "border 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-cyan, #00f0ff)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    Nomor WhatsApp / Email *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 0812xxxx atau email@perusahaan.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      background: "rgba(5, 7, 12, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.85rem",
                      outline: "none",
                      transition: "border 0.3s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-cyan, #00f0ff)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                  />
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-muted)", textTransform: "uppercase" }}>
                    Detail Pesan / Deskripsi Proyek:
                  </label>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--color-cyan, #00f0ff)" }}>
                    Opsional / Template Siap Pakai
                  </span>
                </div>
                <textarea
                  rows={4}
                  placeholder="Tuliskan pesan Anda di sini atau pilih template cepat di bawah..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem",
                    borderRadius: "12px",
                    background: "rgba(5, 7, 12, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                    outline: "none",
                    resize: "vertical",
                    transition: "border 0.3s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-cyan, #00f0ff)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                />
              </div>

              {/* Quick Preset Message Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {quickPresets.map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setFormData({ ...formData, message: preset })}
                    style={{
                      padding: "0.3rem 0.65rem",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.68rem",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-muted)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    }}
                  >
                    + {preset.slice(0, 38)}...
                  </button>
                ))}
              </div>

              {/* Dual Action Submit Buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.85rem", marginTop: "0.5rem" }}>
                {/* Send WhatsApp */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "0.9rem 1.4rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(37, 211, 102, 0.35)",
                  }}
                >
                  <Phone size={17} />
                  <span>Kirim via WhatsApp Direct</span>
                  <Send size={14} />
                </motion.button>

                {/* Send Email */}
                <motion.button
                  type="button"
                  onClick={handleEmailSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: "0.9rem 1.4rem",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(229,9,20,0.8), rgba(172,75,255,0.8))",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.6rem",
                    cursor: "pointer",
                    border: "none",
                    boxShadow: "0 10px 25px rgba(229, 9, 20, 0.3)",
                  }}
                >
                  <Mail size={17} />
                  <span>Kirim via Email Client</span>
                  <ArrowUpRight size={15} />
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT COLUMN: Holographic Status & Direct Channels */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Live Comms Terminal Radar Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              className="neon-card"
              style={{
                padding: "1.75rem",
                borderRadius: "20px",
                background: "rgba(10, 15, 26, 0.8)",
                border: "1px solid rgba(0, 240, 255, 0.25)",
                boxShadow: "0 15px 35px rgba(0,0,0,0.7), inset 0 0 20px rgba(0, 240, 255, 0.05)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--color-cyan, #00f0ff)", letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Radio size={14} className="animate-spin" style={{ animationDuration: "6s" }} />
                  COMMS RADAR & LIVE STATUS
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", padding: "0.2rem 0.5rem", borderRadius: "4px", background: "rgba(16, 185, 129, 0.15)", color: "#10B981", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                  ● ACTIVE LINK
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1rem" }}>
                <div style={{ padding: "0.75rem", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-muted)", marginBottom: "0.3rem", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                    <Clock size={13} color="var(--color-cyan)" />
                    <span>WAKTU LOKAL:</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>
                    {currentTime || "12:00:00 WIB"}
                  </p>
                </div>

                <div style={{ padding: "0.75rem", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-muted)", marginBottom: "0.3rem", fontSize: "0.72rem", fontFamily: "var(--font-mono)" }}>
                    <Zap size={13} color="var(--color-yellow, #ffe600)" />
                    <span>RESPON RATA-RATA:</span>
                  </div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-yellow, #ffe600)" }}>
                    {contactInfo.responseTime}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text)" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <MapPin size={14} color="var(--color-red)" />
                  {contactInfo.location}
                </span>
                <span style={{ color: "var(--color-cyan)" }}>
                  ✓ Siap Mulai Segera
                </span>
              </div>
            </motion.div>

            {/* Direct Channel Cards Grid (WhatsApp, Email, LinkedIn, GitHub, Instagram, TikTok) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.85rem" }}>
              {socials.map((social) => {
                const Icon = social.icon;
                const isCopied = copiedItem === social.name;

                return (
                  <motion.div
                    key={social.name}
                    variants={fadeUp}
                    whileHover={{ y: -4, borderColor: social.color }}
                    className="neon-card"
                    style={{
                      padding: "1.25rem",
                      borderRadius: "16px",
                      background: "rgba(10, 12, 22, 0.75)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "1rem",
                      transition: "all 0.3s ease",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div
                          style={{
                            width: "38px",
                            height: "38px",
                            borderRadius: "10px",
                            background: `${social.color}15`,
                            border: `1px solid ${social.color}40`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: social.color,
                          }}
                        >
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                            {social.name}
                          </h4>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--color-muted)" }}>
                            {social.badge}
                          </span>
                        </div>
                      </div>

                      {/* Copy Action Button */}
                      {(social.name === "Email" || social.name === "WhatsApp") && (
                        <button
                          type="button"
                          onClick={() => handleCopy(social.name === "Email" ? contactInfo.email : contactInfo.whatsapp, social.name)}
                          title={`Salin ${social.name}`}
                          style={{
                            padding: "0.35rem 0.55rem",
                            borderRadius: "8px",
                            background: isCopied ? "rgba(37,211,102,0.15)" : "rgba(255,255,255,0.05)",
                            border: isCopied ? "1px solid #25D366" : "1px solid rgba(255,255,255,0.1)",
                            color: isCopied ? "#25D366" : "var(--color-muted)",
                            cursor: "pointer",
                            fontSize: "0.68rem",
                            fontFamily: "var(--font-mono)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.3rem",
                          }}
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? "TERSALIN" : "SALIN"}</span>
                        </button>
                      )}
                    </div>

                    {/* Value & Direct Action Link */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "140px" }}>
                        {social.value}
                      </span>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: social.color,
                          textDecoration: "none",
                        }}
                      >
                        <span>Buka</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

        {/* Global Responsive Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .contact-grid-wrapper {
            display: grid;
            grid-template-columns: 1.15fr 1fr;
            gap: 2rem;
            width: 100%;
            align-items: start;
          }
          @media (max-width: 1024px) {
            .contact-grid-wrapper {
              grid-template-columns: 1fr;
            }
          }
        `,
          }}
        />
      </div>
    </section>
  );
}
