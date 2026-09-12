export const projectCategories = [
  { id: "all", label: "SEMUA PROJECT" },
  { id: "3d", label: "🪐 3D WEBGL & SPATIAL" },
  { id: "apps", label: "⚡ WEB APPS & ARCHITECTURE" },
  { id: "creative", label: "🎨 CREATIVE & AUDIO" },
  { id: "tools", label: "🛠️ DEV TOOLS & AUTOMATION" }
];

export const projects = [
  {
    id: "kinetic-matrix",
    title: "Kinetic Topological Matrix",
    subtitle: "Spring-Mass Lattice Physics & Synaptic Pulses",
    category: "3d",
    earthBadge: "🕷️ Earth-928 // Cyber Grid",
    accentColor: "#00f0ff",
    modelType: "wave",
    interactiveComponent: "kinetic-matrix",
    image: "/assets/banners/spiderman-mcu-web-grid-dark-banner.jpg",
    videoPreview: "/assets/live-wallpapers/spiderman-8k-pc-live-wallpaper.mp4",
    description:
      "Simulasi matriks topologi interaktif berbasis Canvas 2D dan hukum pegas Hooke (Spring-Mass). Menampilkan propagasi gelombang kejut gravitasi saat klik, transfer data sinaptik dinamis, dan sinkronisasi mode gelap/terang.",
    keyFeatures: [
      "Simulasi Fisika Hooke's Spring-Mass Lattice Real-Time",
      "Propagasi Gravitational Shockwave Interaktif",
      "Autonomous Synaptic Data Pulse Traveling Engine",
      "Dynamic Dark & Light Mode Color Scheme Sync"
    ],
    techStack: ["React 19", "TypeScript", "HTML5 Canvas", "Hooke's Law Physics", "Tailwind CSS"],
    demoUrl: "https://spiderman-portofolio.vercel.app/#projects",
    githubUrl: "https://github.com/hekall21/spiderman-portofolio",
    is3D: true,
    isFeatured: true,
    stats: { stars: "Topological", status: "Interactive Lab" }
  },
  {
    id: "scroll-locked-video-hero",
    title: "Scroll-Locked Video Hero",
    subtitle: "Momentum Physics, Crossfade Looping Video & 3D Tilt",
    category: "creative",
    earthBadge: "🕷️ Earth-1610 // Metro Runner",
    accentColor: "#f3724c",
    modelType: "laptop",
    interactiveComponent: "scroll-hero",
    image: "/assets/ui/spiderman-streaming-ui-concept-dashboard.jpg",
    videoPreview: "/assets/live-wallpapers/spiderman-tasm2-live-wallpaper.mp4",
    description:
      "Komponen runner music hero dengan floating 3D screen yang miring mengikuti kursor, momentum physics coverflow tracklist, looping video tanpa jeda dengan crossfading, dan audio click sintetis Web Audio API.",
    keyFeatures: [
      "Seamless Crossfading Double-Video Loop (Anti-Stutter)",
      "Synthesized Double-Transient Mouse-Wheel Click SFX",
      "Flick-and-Settle Inertia Tracklist Physics",
      "Wide-Angle 3D Screen Dynamic Perspective Tilt"
    ],
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Web Audio API", "HTML5 Video"],
    demoUrl: "https://spiderman-portofolio.vercel.app/#projects",
    githubUrl: "https://github.com/hekall21/spiderman-portofolio",
    is3D: true,
    isFeatured: true,
    stats: { stars: "Audio-Video", status: "Interactive Lab" }
  },
  {
    id: "spatial-noir-gallery",
    title: "Spatial Noir Photo & Video Gallery",
    subtitle: "Cinematic 2.5D Spasial Bebas & 1-Click Download Engine",
    category: "3d",
    earthBadge: "🕷️ Earth-1610 // Spatial Core",
    accentColor: "#00f0ff",
    modelType: "orb",
    image: "/assets/ui/spiderman-ui-desktop-widget-dashboard.jpg",
    videoPreview: "/assets/live-wallpapers/spidey-tingle-multiverse-live-wallpaper.mp4",
    description:
      "Web galeri media interaktif kelas dunia terinspirasi Michael Gatt. Memadukan fotografi sinematik, fisika spasial mengambang (floating draggable nodes), audio soundscape ambient, instant lightbox 4K, dan backend Google Sheets serverless real-time.",
    keyFeatures: [
      "Fisika Mengambang Bebas 2.5D dengan Inersia Elastis",
      "Instant Cinema Lightbox & Video Player Otomatis",
      "1-Click HD Photo & 4K Video Direct Blob Downloader",
      "Database Google Sheets Serverless Real-Time (Micro-cache 50ms)",
      "Web Audio Soundscape & Shutter Click SFX"
    ],
    techStack: ["React 19", "Three.js", "WebGL", "Framer Motion", "Google Apps Script", "Tailwind CSS"],
    demoUrl: "https://hekall21.github.io/spatial-noir-gallery/",
    githubUrl: "https://github.com/hekall21/spatial-noir-gallery",
    is3D: true,
    isFeatured: true,
    stats: { stars: "WebGL 3D", status: "Production Ready" }
  },
  {
    id: "mockup-3d-studio",
    title: "Mockup 3D Studio",
    subtitle: "Free Interactive 3D WebGL Device Mockup Generator",
    category: "3d",
    earthBadge: "🕷️ Earth-928 // 2099 Tech",
    accentColor: "#e50914",
    modelType: "laptop",
    image: "/assets/banners/spiderman-crouched-landing-dark-banner.jpg",
    description:
      "Aplikasi developer tool berbasis Three.js WebGL untuk merender screenshot website ke atas layar MacBook 3D interaktif yang dapat diputar 360 derajat, disesuaikan pencahayaannya, dan diekspor ke format PNG resolusi tinggi secara instan.",
    keyFeatures: [
      "Model 3D MacBook Interaktif Full 360° Orbit Controls",
      "Live Screenshot Texture Mapping ke Layar 3D",
      "Pilihan Angle Preset (Front, Isometric, Dynamic Hero, Side)",
      "Ekspor PNG Transparan 4K Anti-Alias 1-Klik",
      "100% Client-Side Processing tanpa upload server"
    ],
    techStack: ["Three.js", "WebGL", "Canvas API", "OrbitControls", "JavaScript", "Tailwind CSS"],
    demoUrl: "https://hekall21.github.io/mockup-3d-studio/",
    githubUrl: "https://github.com/hekall21/mockup-3d-studio",
    is3D: true,
    isFeatured: true,
    stats: { stars: "3D Tool", status: "Live Tool" }
  },
  {
    id: "quantum-particle-wave-3d",
    title: "Quantum Particle Wave 3D",
    subtitle: "10,000 Interactive Quantum Particles & Mouse Gravity",
    category: "3d",
    earthBadge: "🕷️ Earth-616 // Web Dynamics",
    accentColor: "#ac4bff",
    modelType: "wave",
    image: "/assets/banners/spiderman-neon-smoke-splash-banner.jpg",
    videoPreview: "/assets/live-wallpapers/spiderman-action-cinematic-live-wallpaper.mp4",
    description:
      "Simulasi visual 10.000 partikel kuantum yang bergelombang secara dinamis dengan trigonometri prosedural, gravitasi interaktif kursor mouse, dan custom GLSL vertex shaders dengan akselerasi GPU 60fps konstan.",
    keyFeatures: [
      "10,000 Custom GPU Instanced Points",
      "Procedural Sinusoidal & Perlin Noise Dynamics",
      "Interaksi Gravitasi Kursor Mouse & Sentuhan Mobile",
      "Dukungan Fullscreen Responsive & Zero Stuttering",
      "Web Audio Reactive Frequency Mode"
    ],
    techStack: ["Three.js", "GLSL Shaders", "WebGL", "Web Audio API", "JavaScript"],
    demoUrl: "https://hekall21.github.io/quantum-particle-wave-3d/",
    githubUrl: "https://github.com/hekall21/quantum-particle-wave-3d",
    is3D: true,
    isFeatured: true,
    stats: { stars: "Creative", status: "Interactive" }
  },
  {
    id: "kinetic-typography-cube-3d",
    title: "Kinetic Typography Cube 3D",
    subtitle: "Interactive Kinetic Editorial 3D Typography Cube",
    category: "3d",
    earthBadge: "🕷️ Earth-65 // Ghost-Spider Vibe",
    accentColor: "#10b981",
    modelType: "cube",
    image: "/assets/banners/spiderman-bold-typography-poster-banner.jpg",
    description:
      "Eksplorasi tipografi kinetik editorial 3D dalam bentuk kubus interaktif terinspirasi standar Produx Studio DESIGN_2.md. Menampilkan tekstur tipografi dinamis, pencahayaan multi-titik, dan gestur drag inersia.",
    keyFeatures: [
      "Rotasi Kubus 3D Inersia Multi-Sumbu",
      "Dynamic Canvas-Generated Editorial Typography Textures",
      "Multi-Point Lighting & Ambient Shadow Dispersion",
      "Mobile Gyroscope & Touch Acceleration",
      "Sound Trigger saat Kubus Diputar"
    ],
    techStack: ["Three.js", "WebGL", "GSAP", "HTML5 Canvas", "Kinetic Typography"],
    demoUrl: "https://hekall21.github.io/kinetic-typography-cube-3d/",
    githubUrl: "https://github.com/hekall21/kinetic-typography-cube-3d",
    is3D: true,
    isFeatured: true,
    stats: { stars: "Awwwards Style", status: "Live Demo" }
  },
  {
    id: "linear-command-vault",
    title: "Linear Command Vault",
    subtitle: "Enterprise Neo-Dark Task Board & Cmd+K Palette",
    category: "apps",
    earthBadge: "🕷️ Earth-1610 // Precision Hub",
    accentColor: "#38bdf8",
    modelType: "torus",
    image: "/assets/ui/spiderman-daily-bugle-newspaper-collage.jpg",
    description:
      "Aplikasi manajemen task dan sprint enterprise dengan estetika neo-dark Linear/Vercel (DESIGN.md). Dilengkapi Command Palette (Cmd+K) keyboard-first, filter multi-layer, drag-and-drop kanban board, dan zero layout shifts.",
    keyFeatures: [
      "Spotlight Command Palette (Cmd+K) dengan Fuzzy Search",
      "Kanban Task Board Multi-Status (Backlog, Todo, In Progress, Done)",
      "Strict TypeScript Strict-Mode Architecture",
      "Keyboard Shortcuts Lengkap untuk Power Users",
      "Dark Obsidian Theme dengan Hairline Border Wireframe"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI"],
    demoUrl: "https://hekall21.github.io/linear-command-vault/",
    githubUrl: "https://github.com/hekall21/linear-command-vault",
    is3D: false,
    isFeatured: true,
    stats: { stars: "Enterprise", status: "Productive" }
  },
  {
    id: "spatial-equalizer-towers-3d",
    title: "Spatial Equalizer Towers 3D",
    subtitle: "Circular 3D Audio Spectrum & Neon Frequency",
    category: "3d",
    earthBadge: "🕷️ Earth-928 // Sonic Array",
    accentColor: "#f59e0b",
    modelType: "towers",
    image: "/assets/banners/spiderman-dark-minimalist-shadow-banner.jpg",
    description:
      "Visualizer audio spasial 3D melingkar yang menganalisis spektrum frekuensi audio secara real-time via Web Audio API, memproyeksikannya menjadi pilar menara 3D yang berdenyut dengan gradien neon Spotify.",
    keyFeatures: [
      "Analisis Spektrum Audio Real-Time (FFT Size 512)",
      "Pilar Menara 3D Melingkar dengan Deformasi Ketinggian Dinamis",
      "Chromatic Aberration & Bloom Post-Processing Glow",
      "Dukungan Mic Input & Audio File Upload",
      "Kamera Sinematik Orbit Otomatis"
    ],
    techStack: ["Three.js", "Web Audio API", "WebGL", "AnalyserNode", "JavaScript"],
    demoUrl: "https://hekall21.github.io/spatial-equalizer-towers-3d/",
    githubUrl: "https://github.com/hekall21/spatial-equalizer-towers-3d",
    is3D: true,
    isFeatured: false,
    stats: { stars: "Audio-3D", status: "Live Demo" }
  },
  {
    id: "retro-synthwave-horizon-3d",
    title: "Retro Synthwave Horizon 3D",
    subtitle: "80s Outrun Infinite Wireframe Grid & Sunset",
    category: "3d",
    earthBadge: "🕷️ Earth-616 // Retroverse",
    accentColor: "#ec4899",
    modelType: "wave",
    image: "/assets/banners/spiderman-manga-speedlines-banner.jpg",
    description:
      "Perjalanan tak bertepi di atas grid kawat neon retro synthwave 80-an dengan matahari terbenam bergaris prosedural dan efek kabut horizon bernuansa synth cyberpunk.",
    keyFeatures: [
      "Infinite Scrolling Terrain Grid Shaders",
      "Glowing Segmented Low-Poly Synthwave Sun",
      "Dynamic Starfield & Purple Neon Atmosphere",
      "Optimasi Ekstrim untuk Perangkat Seluler 60fps",
      "Soundtrack 80s Synthwave Terintegrasi"
    ],
    techStack: ["Three.js", "WebGL", "Procedural Mesh", "Audio API", "JavaScript"],
    demoUrl: "https://hekall21.github.io/retro-synthwave-horizon-3d/",
    githubUrl: "https://github.com/hekall21/retro-synthwave-horizon-3d",
    is3D: true,
    isFeatured: false,
    stats: { stars: "Retro 80s", status: "Live Demo" }
  },
  {
    id: "solar-system-orrery-3d",
    title: "Solar System Orrery 3D",
    subtitle: "Interactive Planetary Physics & Camera Tracking",
    category: "3d",
    earthBadge: "🕷️ Earth-65 // Multiverse Cosmos",
    accentColor: "#3b82f6",
    modelType: "orb",
    image: "/assets/banners/spiderman-marvel-studios-poster-banner.jpg",
    description:
      "Simulasi tata surya 3D interaktif dengan orbit planet matematis presisi, cincin Saturnus fotorealistik, pelacakan kamera fokus tiap planet, dan HUD informasi astronomi.",
    keyFeatures: [
      "8 Planet + Tata Surya dengan Skala Orbit Terkalibrasi",
      "Pelacakan Kamera 1-Klik ke Tiap Planet dengan Smooth Lerp",
      "Cincin Planet Bertekstur & Efek Cahaya Matahari Titik",
      "Panel HUD Informasi Kecepatan Orbit & Diameter Planet",
      "Dukungan Touch Pinch-to-Zoom di Mobile"
    ],
    techStack: ["Three.js", "WebGL", "Keplerian Physics", "JavaScript", "CSS3"],
    demoUrl: "https://hekall21.github.io/solar-system-orrery-3d/",
    githubUrl: "https://github.com/hekall21/solar-system-orrery-3d",
    is3D: true,
    isFeatured: false,
    stats: { stars: "Astronomy", status: "Live Demo" }
  },
  {
    id: "spotify-spatial-audio",
    title: "Spotify Spatial Audio Visualizer",
    subtitle: "Obsidian Green Frequency Arcs & Music Experience",
    category: "creative",
    earthBadge: "🕷️ Earth-1610 // Sonic Beat",
    accentColor: "#1db954",
    modelType: "torus",
    image: "/assets/aesthetic/aesthetic-sza-sos-ocean-diving-board.jpg",
    description:
      "Visualizer musik audio spasial bertema obsidian green Spotify dengan busur frekuensi taktil, pemutar audio terintegrasi, visualizer gelombang responsif, dan metadata album.",
    keyFeatures: [
      "Visualizer Busur Audio Partikel Melingkar",
      "Player Audio Interaktif dengan Playlist & Scrubber",
      "Obsidian Glassmorphism Theme ala Spotify Desktop",
      "Beat-Detection Pulse & Dynamic Glow Intensity"
    ],
    techStack: ["Web Audio API", "Canvas 2D", "JavaScript", "Audio Processing"],
    demoUrl: "https://hekall21.github.io/spotify-spatial-audio/",
    githubUrl: "https://github.com/hekall21/spotify-spatial-audio",
    is3D: false,
    isFeatured: false,
    stats: { stars: "Sound", status: "Live Demo" }
  },
  {
    id: "stripe-payment-matrix",
    title: "Stripe Payment Matrix",
    subtitle: "Financial Subscription Checkout & Gradient Mesh",
    category: "apps",
    earthBadge: "🕷️ Earth-928 // Cyber Vault",
    accentColor: "#635bff",
    modelType: "cube",
    image: "/assets/aesthetic/aesthetic-cinematic-film-set-backview.jpg",
    description:
      "Simulator sistem pembayaran modern dengan animasi mesh gradien blurple presisi, validasi input kartu kredit real-time, micro-interactions tactile haptic, dan receipt generator.",
    keyFeatures: [
      "Dynamic Blurple Gradient Mesh Background",
      "Real-Time Card Number Luhn Algorithm Validation",
      "Interactive Flipping Card 3D Perspective",
      "Receipt Simulator & One-Click PDF Download"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "https://hekall21.github.io/stripe-payment-matrix/",
    githubUrl: "https://github.com/hekall21/stripe-payment-matrix",
    is3D: false,
    isFeatured: false,
    stats: { stars: "Fintech", status: "Live Demo" }
  },
  {
    id: "supabase-database-hub",
    title: "Supabase Database Hub",
    subtitle: "Dark Emerald SQL Runner & Schema Visualizer",
    category: "tools",
    earthBadge: "🕷️ Earth-616 // Data Matrix",
    accentColor: "#3ecf8e",
    modelType: "torus",
    image: "/assets/ui/spiderman-comic-scrapbook-stickers-collage.jpg",
    description:
      "Platform visualisasi skema database dan runner query SQL berbasis web terinspirasi Supabase. Menampilkan relasi antar tabel (ERD), syntax highlighter, dan eksekusi query interaktif.",
    keyFeatures: [
      "Dark Emerald UI Theme khas Supabase Design System",
      "Interactive Table Schema & Foreign Key Relationship HUD",
      "Query SQL Playground dengan Instant Results Table",
      "Mock Database Generation & Export Data"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "SQL Engine Mock"],
    demoUrl: "https://hekall21.github.io/supabase-database-hub/",
    githubUrl: "https://github.com/hekall21/supabase-database-hub",
    is3D: false,
    isFeatured: false,
    stats: { stars: "Dev Tool", status: "Live Demo" }
  },
  {
    id: "vinss-automation-suite-web",
    title: "Vinss Automation Suite Web",
    subtitle: "Clean Architecture Media Extractor & AI Tooling",
    category: "tools",
    earthBadge: "🕷️ Earth-1610 // Microservices",
    accentColor: "#e50914",
    modelType: "cube",
    image: "/assets/aesthetic/aesthetic-sunset-beach-silhouette.jpg",
    description:
      "Suite utilitas otomasi pengembang untuk ekstraksi media berkecepatan tinggi, integrasi AI prompt formatter, dan microservices modular berstandar Clean Architecture.",
    keyFeatures: [
      "High-Speed Media Extraction & URL Resolver Engine",
      "AI Prompt Formatter & Structured Output Helper",
      "Clean Architecture Separation of Concerns",
      "Fastify Microservice Backend Compatible"
    ],
    techStack: ["JavaScript", "Fastify", "REST API", "Clean Architecture", "Tailwind CSS"],
    demoUrl: "https://hekall21.github.io/vinss-automation-suite-web/",
    githubUrl: "https://github.com/hekall21/vinss-automation-suite-web",
    is3D: false,
    isFeatured: false,
    stats: { stars: "Automation", status: "Live Demo" }
  }
];
