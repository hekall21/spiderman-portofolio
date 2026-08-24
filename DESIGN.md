---
name: "Spider-Man Portfolio Design System"
version: "2.1.0"
source: "Google Stitch & VoltAgent awesome-design-md Standard"
description: "High-Tech Spider-Man & Miles Morales Cyber-Hero Visual Design Specification"
archetype: "Spider-Verse / Neon Cyberpunk / Marvel Comic Glitch"
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
    font_mono: "'JetBrains Mono', monospace"
    font_decorative: "'Dancing Script', cursive"
  motion:
    stagger: 0.12
    spring_easing: [0.16, 1, 0.3, 1]
    glitch_duration: "0.3s"
---

# 🕷️ DESIGN.md - Spider-Man Portfolio (Muhammad Haikel Saleh)

> **Design Specification resmi sesuai standar Google Stitch & VoltAgent awesome-design-md.**  
> Mengintegrasikan estetika *Marvel Spider-Man*, *Into The Spider-Verse (Miles Morales)*, *Cyberpunk Web Grid*, *Chromatic Aberration Glitch*, dan *High-Tech BNSP Certified Network Terminal*.

## 1. Visual Theme & Atmosphere
- **Canvas:** Deep Cinematic Void (`#050508`) dengan aksen semi-transparan Spider-Man background artwork, halftone comic dots, dan neon ambient glow.
- **Accents:** Trio warna ikonik: **Spider Crimson Red** (`#E50914`), **Miles Morales Electric Cyan** (`#00F0FF`), dan **Neon Web Purple** (`#AC4BFF`) dipadukan dengan **Spray Yellow** (`#FFE600`).
- **Interactive Audio:** Floating Sunflower soundtrack player dengan animated equalizer waves & rotating vinyl disk.
- **Micro-Interactions:** Hover glitch RGB split, Spider-sense radar pulse, hanging spider ropes, sticky notes, terminal boot BIOS screen.

## 2. Component Anatomy
- **Cards:** Glassmorphism panel `rgba(10, 12, 20, 0.85)` dengan 1px border subtil, hover glow border, dan corner tags.
- **Badges:** Monospace font dengan animated status ping dan glowing border.
- **Buttons:** Magnetic effect, hover scale `1.03`, active scale `0.97`, shadow glow.

## 3. Strict Guardrails (Anti-Design-Drift)
- Semua warna harus memakai token CSS variables (`var(--color-red)`, `var(--color-cyan)`, `var(--color-purple)`, `var(--color-panel)`).
- Semua link dan tombol interaktif wajib memiliki focus ring, hover state, dan touch target min 44x44px.
