---
name: "Spider-Man Portfolio Design System"
version: "4.0.0"
source: "Google Stitch, VoltAgent awesome-design-md, Produx Kinetic & Heron AI Precision Standard"
description: "High-Tech Spider-Verse / Miles Morales Cyber-Hero & BNSP Certified Telemetry Visual Design Specification"
archetype: "Spider-Verse / Neon Cyberpunk / Precision Telemetry HUD / Marvel Comic Glitch"
theme:
  mode: "dark"
  default: "dark"
tokens:
  colors:
    dark:
      background: "#050508"
      background_secondary: "#0A0A10"
      surface: "rgba(10, 12, 20, 0.85)"
      surface_elevated: "rgba(18, 22, 36, 0.95)"
      surface_hover: "rgba(25, 30, 50, 0.9)"
      spider_red: "#E50914"
      spider_red_glow: "rgba(229, 9, 20, 0.35)"
      spider_cyan: "#00F0FF"
      spider_cyan_glow: "rgba(0, 240, 255, 0.3)"
      spider_purple: "#AC4BFF"
      spider_purple_glow: "rgba(172, 75, 255, 0.25)"
      spider_yellow: "#FFE600"
      border: "rgba(255, 255, 255, 0.08)"
      border_hover: "rgba(255, 255, 255, 0.25)"
      text_primary: "#FFFFFF"
      text_secondary: "#C8CCD6"
      text_muted: "#808796"
  typography:
    font_display: "'Space Grotesk', 'Plus Jakarta Sans', sans-serif"
    font_body: "'Poppins', 'Inter', sans-serif"
    font_mono: "'JetBrains Mono', 'IBM Plex Mono', monospace"
    font_decorative: "'Dancing Script', cursive"
  motion:
    stagger: 0.12
    spring_easing: [0.16, 1, 0.3, 1]
    glitch_duration: "0.3s"
  precision_hud:
    height: "28px"
    coordinate_format: "X:[x]PX Y:[y]PX"
    crosshair_size: "11px"
---

# 🕷️ DESIGN.md - Spider-Man Portfolio (Muhammad Haikel Saleh)

> **Design Specification resmi sesuai standar Google Stitch, VoltAgent awesome-design-md, Produx Kinetic Studio & Heron AI Precision HUD.**  
> Mengintegrasikan estetika *Marvel Spider-Man*, *Into The Spider-Verse (Miles Morales)*, *Precision Telemetry Coordinate HUD*, *Chromatic Aberration Glitch*, dan *High-Tech BNSP Certified Network Terminal*.

## 1. Visual Theme & Atmosphere
- **Canvas:** Deep Cinematic Void (`#050508`) dengan aksen semi-transparan Spider-Man background artwork, halftone comic dots, dan neon ambient glow.
- **Precision Telemetry HUD:** Top bar status real-time dengan live coordinate tracking `X:1131PX Y:1131PX`, active protocol `[ PROTOCOL: SPIDER_VERSE_v4.0 ]`, dan sertifikasi BNSP.
- **Accents:** Trio warna ikonik: **Spider Crimson Red** (`#E50914`), **Miles Morales Electric Cyan** (`#00F0FF`), dan **Neon Web Purple** (`#AC4BFF`) dipadukan dengan **Spray Yellow** (`#FFE600`).
- **Interactive Audio:** Floating Sunflower soundtrack player dengan animated equalizer waves & rotating vinyl disk.
- **Micro-Interactions:** Hover glitch RGB split, Spider-sense radar pulse, hanging spider ropes, sticky notes, dual-state sliding buttons, terminal boot BIOS screen.

## 2. Component Anatomy
- **Precision Cards:** Glassmorphism panel `rgba(10, 12, 20, 0.85)` dengan 1px border subtil, corner crosshairs `+` di sudut kontainer, dan hover glow border.
- **Dual-State Sliding Buttons:** Transisi vertikal ganda (`.label-top` & `.label-bot`) pada tombol interaktif dengan background glow.
- **Badges:** Monospace font dengan animated status ping dan glowing border.

## 3. Strict Guardrails (Anti-Design-Drift)
- Semua warna harus memakai token CSS variables (`var(--color-red)`, `var(--color-cyan)`, `var(--color-purple)`, `var(--color-panel)`).
- Semua link dan tombol interaktif wajib memiliki focus ring, hover state, dan touch target min 44x44px.
