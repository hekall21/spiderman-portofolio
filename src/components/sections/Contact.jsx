import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { socials, contactInfo } from "../../data/social.jsx";
import { fadeUp, staggerContainer, defaultViewport } from "../../animations/variants";
import { MapPin, ArrowUpRight, Copy, Check } from "lucide-react";

export default function Contact() {
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [copied, setCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(contactInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--color-bg)",
        overflow: "hidden"
      }}
    >
      {/* Background Web Ring */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "1000px", height: "1000px",
        borderRadius: "50%",
        border: "1px solid rgba(229,9,20,0.05)",
        zIndex: 0, pointerEvents: "none"
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px", height: "700px",
          borderRadius: "50%",
          border: "1px dashed rgba(172,75,255,0.15)",
          animation: "spin 40s linear infinite"
        }} />
      </div>

      {/* Cinematic glows */}
      <div style={{
        position: "absolute", top: "30%", left: "10%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "var(--color-red)", filter: "blur(200px)",
        opacity: 0.1, pointerEvents: "none", zIndex: 0
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "40vw", height: "40vw", borderRadius: "50%",
        background: "var(--color-purple)", filter: "blur(200px)",
        opacity: 0.1, pointerEvents: "none", zIndex: 0
      }} />

      <div className="section" style={{ paddingBottom: "6rem", position: "relative", zIndex: 10 }}>
        <SectionHeading
          number="05"
          label="COMM LINK"
          title="LET'S CONNECT"
        />

        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "4rem",
          gap: "3rem"
        }}>
          {/* Bento Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="contact-bento-grid"
          >
            {socials.map((social) => {
              const Icon = social.icon;
              const isHovered = hoveredSocial === social.name;
              
              // Email card gets special treatment (spans 2 columns on large screens)
              const isEmail = social.name === "Email";
              
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className={`neon-card contact-card ${isEmail ? 'contact-card-email' : ''}`}
                  onMouseEnter={() => setHoveredSocial(social.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    display: "flex",
                    flexDirection: isEmail ? "row" : "column",
                    alignItems: isEmail ? "center" : "flex-start",
                    gap: isEmail ? "2rem" : "1.5rem",
                    padding: isEmail ? "3rem" : "2rem",
                    cursor: "pointer",
                    textDecoration: "none",
                    background: "rgba(10, 15, 26, 0.6)",
                    position: "relative",
                    overflow: "hidden",
                    height: "100%",
                    justifyContent: "space-between"
                  }}
                  animate={shouldReduceMotion ? {} : {
                    borderColor: isHovered ? social.color : "var(--color-border)",
                    boxShadow: isHovered ? `0 10px 40px rgba(0,0,0,0.8), inset 0 0 30px ${social.color}22` : "none",
                    y: isHovered ? -5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Neon Edge Highlight */}
                  <motion.div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: "4px",
                    background: social.color, opacity: 0
                  }} animate={{ opacity: isHovered ? 1 : 0 }} />

                  {/* Top section (Icon) */}
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <motion.div
                      style={{
                        width: isEmail ? "80px" : "60px", 
                        height: isEmail ? "80px" : "60px",
                        borderRadius: "16px",
                        background: "rgba(255,255,255,0.03)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid rgba(255,255,255,0.05)"
                      }}
                      animate={{ 
                        color: isHovered ? social.color : "var(--color-white)",
                        borderColor: isHovered ? `${social.color}55` : "rgba(255,255,255,0.05)",
                        background: isHovered ? `${social.color}15` : "rgba(255,255,255,0.03)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={isEmail ? 36 : 28} />
                    </motion.div>

                    {/* Copy button for email, external link for others */}
                    {isEmail ? (
                      <button 
                        onClick={handleCopyEmail}
                        className="email-copy-btn"
                        style={{
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          padding: "0.5rem 1rem",
                          borderRadius: "100px",
                          color: copied ? "#25D366" : "var(--color-muted)",
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                          cursor: "pointer", transition: "all 0.3s",
                          zIndex: 10
                        }}
                      >
                        {copied ? <><Check size={14} /> COPIED</> : <><Copy size={14} /> COPY</>}
                      </button>
                    ) : (
                      <motion.div
                        animate={{
                          color: isHovered ? social.color : "var(--color-muted)",
                          transform: isHovered ? "translate(3px, -3px)" : "translate(0, 0)",
                          opacity: isHovered ? 1 : 0.3
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowUpRight size={24} />
                      </motion.div>
                    )}
                  </div>
                  
                  <div style={{ flex: 1, marginTop: isEmail ? 0 : "auto", width: "100%" }}>
                    <h4 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: isEmail ? "2.5rem" : "1.5rem",
                      fontWeight: 700,
                      color: "var(--color-white)",
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.02em"
                    }}>
                      {social.name}
                    </h4>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: isEmail ? "1rem" : "0.85rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      transition: "color 0.3s",
                      color: isHovered ? "var(--color-text)" : "var(--color-muted)"
                    }}>
                      {isEmail ? contactInfo.email : 
                       social.name === "WhatsApp" ? contactInfo.whatsapp : 
                       social.url.replace("https://", "").replace("www.", "")}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </motion.div>
        </div>

        {/* Location Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            marginTop: "6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            color: "var(--color-muted)",
            textTransform: "uppercase"
          }}
        >
          <MapPin size={16} color="var(--color-red)" />
          Based in {contactInfo.location}
        </motion.div>

        <style dangerouslySetInnerHTML={{__html: `
          .contact-bento-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            width: 100%;
            max-width: 1200px;
          }
          .contact-card-email {
            grid-column: span 2;
          }
          .email-copy-btn:hover {
            background: rgba(255,255,255,0.05) !important;
            color: var(--color-white) !important;
          }
          @keyframes spin {
            0% { transform: translate(-50%, -50%) rotate(0deg); }
            100% { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @media (max-width: 1024px) {
            .contact-bento-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .contact-bento-grid {
              grid-template-columns: 1fr;
            }
            .hide-on-mobile { display: none !important; }
            .contact-card-email {
              grid-column: span 1;
              flex-direction: column !important;
              align-items: flex-start !important;
              padding: 2rem !important;
              gap: 1.5rem !important;
            }
            .contact-card-email h4 {
              font-size: 1.5rem !important;
            }
            .contact-card-email p {
              font-size: 0.85rem !important;
            }
            .contact-card-email > div:first-child {
              flex-direction: row;
            }
          }
        `}} />
      </div>
    </section>
  );
}
