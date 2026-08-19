export default function Marquee() {
  const items = [
    "NETWORKS",
    "CODE",
    "SYSTEMS",
    "WEB",
    "BACKEND",
    "INFRASTRUCTURE",
    "DATABASES",
    "LINUX",
    "DEVELOPMENT",
  ];

  const content = items.map((item) => `${item} • `).join("");

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "1.5rem 0",
        background: "var(--color-bg-secondary)",
      }}
    >
      <div className="marquee-track" aria-hidden="true">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            whiteSpace: "nowrap",
            paddingRight: "2rem",
          }}
        >
          {content}
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            whiteSpace: "nowrap",
            paddingRight: "2rem",
          }}
        >
          {content}
        </span>
      </div>
    </div>
  );
}
