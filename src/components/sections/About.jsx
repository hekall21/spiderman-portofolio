import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import Counter from "../common/Counter";
import { profile } from "../../data/profile";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { User, GraduationCap, Laptop, MapPin } from "lucide-react";

export default function About() {
  return (
    <section id="about" style={{ position: "relative" }}>
      <div className="section">
        <SectionHeading
          number="01"
          label="ABOUT"
          title="ABOUT ME"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
          }}
        >
          {/* Main About Card */}
          <motion.div variants={fadeUp} className="neon-card" style={{ padding: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{
                  width: "50px", height: "50px", borderRadius: "12px",
                  background: "rgba(229, 9, 20, 0.1)", border: "1px solid var(--color-red)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 0 15px rgba(229, 9, 20, 0.2)"
                }}>
                  <User size={24} color="var(--color-red)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Nama</h3>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--color-white)", fontWeight: 600 }}>Muhammad Haikel Saleh</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{
                  width: "50px", height: "50px", borderRadius: "12px",
                  background: "rgba(172, 75, 255, 0.1)", border: "1px solid var(--color-purple)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 0 15px rgba(172, 75, 255, 0.2)"
                }}>
                  <GraduationCap size={24} color="var(--color-purple)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Pendidikan</h3>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-white)", fontWeight: 500 }}>SMKN 22 Jakarta — TKJ</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{
                  width: "50px", height: "50px", borderRadius: "12px",
                  background: "rgba(48, 128, 255, 0.1)", border: "1px solid var(--color-blue)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 0 15px rgba(48, 128, 255, 0.2)"
                }}>
                  <Laptop size={24} color="var(--color-blue)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Focus</h3>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-white)", fontWeight: 500 }}>IT & Admin Support</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{
                  width: "50px", height: "50px", borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--color-border)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <MapPin size={24} color="var(--color-white)" />
                </div>
                <div>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>Location</h3>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--color-white)", fontWeight: 500 }}>Jakarta, Indonesia</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={fadeUp} style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "2rem",
            marginTop: "1rem"
          }}>
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
