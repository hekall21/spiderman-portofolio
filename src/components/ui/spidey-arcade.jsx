import React, { useRef, useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX, RotateCcw, Zap, Shield, Play, Trophy, Crosshair, Sparkles } from "lucide-react";

// Web Audio API Procedural Sound Engine
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playThwip() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "highpass";
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch (e) {}
  }

  playExplosion() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  playPowerup() {
    if (this.muted || !this.ctx) return;
    try {
      const notes = [440, 554, 659, 880];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (idx + 1) * 0.05 + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + (idx + 1) * 0.05 + 0.08);
      });
    } catch (e) {}
  }

  playVenom() {
    if (this.muted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);
    } catch (e) {}
  }
}

const sound = new SoundEngine();

export default function SpideyArcade({ className = "" }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem("spidey_arcade_high") || "0", 10);
    } catch (e) {
      return 0;
    }
  });
  const [character, setCharacter] = useState("miles"); // miles, peter, gwen
  const [isMuted, setIsMuted] = useState(false);
  const [venomCharge, setVenomCharge] = useState(100);

  // Game internal variables
  const gameRef = useRef({
    player: { x: 400, y: 500, width: 44, height: 44, vx: 0, speed: 7, shield: false },
    webs: [],
    enemies: [],
    particles: [],
    popups: [],
    keys: {},
    lastEnemySpawn: 0,
    lastShoot: 0,
    score: 0,
    combo: 1,
    health: 100,
    venom: 100,
    animFrameId: null,
    width: 800,
    height: 600,
  });

  const toggleSound = () => {
    sound.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const startNewGame = useCallback(() => {
    sound.init();
    const g = gameRef.current;
    g.score = 0;
    g.combo = 1;
    g.health = 100;
    g.venom = 100;
    g.webs = [];
    g.enemies = [];
    g.particles = [];
    g.popups = [];
    g.player.x = g.width / 2;
    g.player.y = g.height - 70;
    g.player.shield = false;
    setScore(0);
    setVenomCharge(100);
    setGameState("playing");
  }, []);

  const triggerVenomBlast = useCallback(() => {
    sound.init();
    const g = gameRef.current;
    if (g.venom < 40) return;
    g.venom -= 40;
    setVenomCharge(Math.max(0, g.venom));
    sound.playVenom();

    // Destroy all enemies on screen and grant massive combo
    g.enemies.forEach((enemy) => {
      // Spawn lightning particles
      for (let i = 0; i < 15; i++) {
        g.particles.push({
          x: enemy.x,
          y: enemy.y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 30,
          color: character === "miles" ? "#e50914" : "#00f0ff",
          size: Math.random() * 4 + 2,
        });
      }
    });

    const killed = g.enemies.length;
    g.score += killed * 250 * g.combo;
    g.enemies = [];

    g.popups.push({
      text: character === "miles" ? "⚡ VENOM SHOCKWAVE! ⚡" : "🕷️ WEB OVERDRIVE! 🕷️",
      x: g.player.x,
      y: g.player.y - 40,
      life: 45,
      color: "#00f0ff",
    });

    setScore(g.score);
  }, [character]);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const g = gameRef.current;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      g.width = rect.width;
      g.height = rect.height;
      if (gameState === "start") {
        g.player.x = g.width / 2;
        g.player.y = g.height - 70;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleKeyDown = (e) => {
      g.keys[e.key] = true;
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        shootWeb();
      }
      if (e.key === "z" || e.key === "Z" || e.key === "Shift") {
        triggerVenomBlast();
      }
    };

    const handleKeyUp = (e) => {
      g.keys[e.key] = false;
    };

    const shootWeb = () => {
      if (gameState !== "playing") return;
      const now = Date.now();
      const fireRate = character === "peter" ? 140 : 200;
      if (now - g.lastShoot < fireRate) return;
      g.lastShoot = now;
      sound.playThwip();

      if (character === "gwen") {
        // Triple Spread Shot
        [-0.3, 0, 0.3].forEach((angle) => {
          g.webs.push({
            x: g.player.x,
            y: g.player.y - 20,
            vx: Math.sin(angle) * 12,
            vy: -Math.cos(angle) * 12,
            radius: 5,
            color: "#ff007f",
          });
        });
      } else {
        // High-velocity dual web strand
        g.webs.push({
          x: g.player.x - 8,
          y: g.player.y - 20,
          vx: 0,
          vy: -14,
          radius: 4,
          color: character === "miles" ? "#00f0ff" : "#e50914",
        });
        g.webs.push({
          x: g.player.x + 8,
          y: g.player.y - 20,
          vx: 0,
          vy: -14,
          radius: 4,
          color: character === "miles" ? "#00f0ff" : "#e50914",
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Mouse & Touch aiming/firing
    const handlePointerDown = (e) => {
      sound.init();
      if (gameState === "playing") {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if (clientX) {
          g.player.x = clientX - rect.left;
        }
        shootWeb();
      }
    };

    const handlePointerMove = (e) => {
      if (gameState === "playing") {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        if (clientX) {
          g.player.x = Math.max(30, Math.min(g.width - 30, clientX - rect.left));
        }
      }
    };

    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("mousemove", handlePointerMove);
    canvas.addEventListener("touchstart", handlePointerDown, { passive: true });
    canvas.addEventListener("touchmove", handlePointerMove, { passive: true });

    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Clear Frame with Dark Comic Matrix Vignette
      ctx.fillStyle = "#070b14";
      ctx.fillRect(0, 0, g.width, g.height);

      // Draw subtle background cyber web lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.05)";
      ctx.lineWidth = 1;
      const centerX = g.width / 2;
      const centerY = g.height / 2;
      for (let r = 40; r < g.width; r += 70) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (gameState === "playing") {
        // Player keyboard horizontal movement
        if (g.keys["ArrowLeft"] || g.keys["a"] || g.keys["A"]) {
          g.player.x = Math.max(25, g.player.x - g.player.speed);
        }
        if (g.keys["ArrowRight"] || g.keys["d"] || g.keys["D"]) {
          g.player.x = Math.min(g.width - 25, g.player.x + g.player.speed);
        }

        // Recharge venom slowly
        if (g.venom < 100) {
          g.venom += 0.08;
          setVenomCharge(Math.min(100, Math.floor(g.venom)));
        }

        // Spawn Enemies (Gliders, Drones, Symbiotes)
        const now = Date.now();
        const spawnInterval = Math.max(700, 1800 - Math.min(1200, g.score / 8));
        if (now - g.lastEnemySpawn > spawnInterval) {
          g.lastEnemySpawn = now;
          const types = ["glider", "drone", "symbiote"];
          const type = types[Math.floor(Math.random() * types.length)];
          g.enemies.push({
            x: Math.random() * (g.width - 80) + 40,
            y: -30,
            type,
            vx: (Math.random() - 0.5) * 2.5,
            vy: Math.random() * 1.8 + 2.2,
            hp: type === "symbiote" ? 3 : type === "glider" ? 2 : 1,
            maxHp: type === "symbiote" ? 3 : type === "glider" ? 2 : 1,
            size: type === "symbiote" ? 26 : 22,
          });
        }

        // Update & Render Webs
        for (let i = g.webs.length - 1; i >= 0; i--) {
          const web = g.webs[i];
          web.x += web.vx;
          web.y += web.vy;

          // Draw Glowing Web Trail
          ctx.save();
          ctx.shadowColor = web.color;
          ctx.shadowBlur = 10;
          ctx.strokeStyle = web.color;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(web.x, web.y);
          ctx.lineTo(web.x - web.vx * 1.5, web.y - web.vy * 1.5);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(web.x, web.y, web.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Remove offscreen
          if (web.y < -10 || web.x < -10 || web.x > g.width + 10) {
            g.webs.splice(i, 1);
          }
        }

        // Update & Render Enemies
        for (let i = g.enemies.length - 1; i >= 0; i--) {
          const enemy = g.enemies[i];
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;

          // Bounce off walls
          if (enemy.x < 30 || enemy.x > g.width - 30) {
            enemy.vx *= -1;
          }

          // Draw Enemy Model
          ctx.save();
          ctx.translate(enemy.x, enemy.y);

          if (enemy.type === "glider") {
            // Green Goblin Glider
            ctx.fillStyle = "#10b981";
            ctx.shadowColor = "#10b981";
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.moveTo(0, 14);
            ctx.lineTo(-18, -12);
            ctx.lineTo(0, -6);
            ctx.lineTo(18, -12);
            ctx.closePath();
            ctx.fill();

            // Cockpit glow
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.arc(0, -2, 4, 0, Math.PI * 2);
            ctx.fill();
          } else if (enemy.type === "drone") {
            // Octo Cyber Drone
            ctx.fillStyle = "#e50914";
            ctx.shadowColor = "#e50914";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.fill();

            // Tentacle blades
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.strokeRect(-16, -2, 32, 4);
          } else {
            // Symbiote Mass
            ctx.fillStyle = "#9333ea";
            ctx.shadowColor = "#c084fc";
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.arc(0, 0, 16, 0, Math.PI * 2);
            ctx.fill();

            // Venom fangs
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(-6, -4);
            ctx.lineTo(-2, 4);
            ctx.lineTo(2, 4);
            ctx.lineTo(6, -4);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();

          // Check Web Collisions
          for (let w = g.webs.length - 1; w >= 0; w--) {
            const web = g.webs[w];
            const dist = Math.hypot(web.x - enemy.x, web.y - enemy.y);
            if (dist < enemy.size + web.radius) {
              // Hit!
              enemy.hp -= 1;
              g.webs.splice(w, 1);
              sound.playExplosion();

              // Spawn hit sparks
              for (let p = 0; p < 8; p++) {
                g.particles.push({
                  x: web.x,
                  y: web.y,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 20,
                  color: web.color,
                  size: Math.random() * 3 + 1,
                });
              }

              if (enemy.hp <= 0) {
                // Destroyed enemy
                g.combo += 1;
                const points = enemy.type === "symbiote" ? 300 : enemy.type === "glider" ? 200 : 100;
                g.score += points * g.combo;
                setScore(g.score);

                // Comic Pop text
                const popTexts = ["THWIP!", "BAM!", "CRASH!", "POW!"];
                g.popups.push({
                  text: `${popTexts[Math.floor(Math.random() * popTexts.length)]} +${points * g.combo}`,
                  x: enemy.x,
                  y: enemy.y,
                  life: 30,
                  color: "#00f0ff",
                });

                g.enemies.splice(i, 1);
                break;
              }
            }
          }

          // Check Collision with Player
          const playerDist = Math.hypot(g.player.x - enemy.x, g.player.y - enemy.y);
          if (playerDist < 30) {
            g.health -= 25;
            g.combo = 1;
            sound.playExplosion();
            g.enemies.splice(i, 1);

            // Screen shake / comic burst
            g.popups.push({
              text: "SPIDEY SENSE ALERT! -25 HP",
              x: g.player.x,
              y: g.player.y - 35,
              life: 35,
              color: "#e50914",
            });

            if (g.health <= 0) {
              // Game Over
              setGameState("gameover");
              if (g.score > highScore) {
                setHighScore(g.score);
                try {
                  localStorage.setItem("spidey_arcade_high", g.score.toString());
                } catch (e) {}
              }
              break;
            }
          }

          // Escaped to bottom
          if (enemy.y > g.height + 40) {
            g.enemies.splice(i, 1);
            g.combo = 1; // reset combo if enemy escapes
          }
        }

        // Draw Player (Spider-Man avatar)
        ctx.save();
        ctx.translate(g.player.x, g.player.y);

        // Web shooter light trails
        ctx.shadowColor = character === "miles" ? "#e50914" : character === "gwen" ? "#ff007f" : "#00f0ff";
        ctx.shadowBlur = 18;

        // Suit Chest Symbol
        ctx.fillStyle = character === "miles" ? "#0b1325" : character === "gwen" ? "#ffffff" : "#e50914";
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();

        // Spider Emblems
        ctx.fillStyle = character === "miles" ? "#e50914" : character === "gwen" ? "#ff007f" : "#00f0ff";
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(-8, 6);
        ctx.lineTo(0, 2);
        ctx.lineTo(8, 6);
        ctx.closePath();
        ctx.fill();

        // Glowing Spider Eyes
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(-6, -4, 4, 7, -0.3, 0, Math.PI * 2);
        ctx.ellipse(6, -4, 4, 7, 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Render Particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.size * (p.life / 20)), 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          g.particles.splice(i, 1);
        }
      }

      // Render Comic Popups ("THWIP!", "BAM!")
      for (let i = g.popups.length - 1; i >= 0; i--) {
        const pop = g.popups[i];
        pop.y -= 1.2;
        pop.life -= 1;

        ctx.save();
        ctx.font = "900 16px 'Cinzel', 'Impact', sans-serif";
        ctx.fillStyle = pop.color;
        ctx.shadowColor = pop.color;
        ctx.shadowBlur = 12;
        ctx.textAlign = "center";
        ctx.fillText(pop.text, pop.x, pop.y);
        ctx.restore();

        if (pop.life <= 0) {
          g.popups.splice(i, 1);
        }
      }

      g.animFrameId = requestAnimationFrame(loop);
    };

    g.animFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("mousedown", handlePointerDown);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("touchstart", handlePointerDown);
      canvas.removeEventListener("touchmove", handlePointerMove);
      if (g.animFrameId) cancelAnimationFrame(g.animFrameId);
    };
  }, [gameState, character, highScore, triggerVenomBlast]);

  return (
    <div className={`relative w-full h-full min-h-[500px] flex flex-col bg-[#070b14] overflow-hidden select-none ${className}`}>
      {/* Top HUD Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-3 bg-[#0b1325]/85 border-b border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-white">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>SCORE: <strong className="text-[#00f0ff] text-sm">{score.toLocaleString()}</strong></span>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>HIGH: <strong className="text-white">{highScore.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Character Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
          <button
            onClick={() => setCharacter("miles")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              character === "miles" ? "bg-[#e50914] text-white font-bold shadow-[0_0_10px_#e50914]" : "text-slate-400 hover:text-white"
            }`}
          >
            MILES
          </button>
          <button
            onClick={() => setCharacter("peter")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              character === "peter" ? "bg-[#00f0ff] text-[#070b14] font-bold shadow-[0_0_10px_#00f0ff]" : "text-slate-400 hover:text-white"
            }`}
          >
            PETER
          </button>
          <button
            onClick={() => setCharacter("gwen")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              character === "gwen" ? "bg-[#ff007f] text-white font-bold shadow-[0_0_10px_#ff007f]" : "text-slate-400 hover:text-white"
            }`}
          >
            GWEN
          </button>
        </div>

        {/* Audio Mute & Restart Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle SFX"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#00f0ff]" />}
          </button>
          <button
            onClick={startNewGame}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <div className="relative flex-1 w-full h-full min-h-[420px]">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

        {/* Start Game Screen Overlay */}
        {gameState === "start" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#070b14]/90 backdrop-blur-md text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e50914]/20 border border-[#e50914]/50 text-[#e50914] text-xs font-mono mb-4">
              <Crosshair className="w-3.5 h-3.5" />
              <span>SPIDER-VERSE ARCADE // EARTH-1610</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              WEB SLINGER <span className="text-[#00f0ff]">ASSAULT</span>
            </h2>

            <p className="max-w-md text-slate-300 text-sm font-light leading-relaxed mb-8">
              Take to the skies over Brooklyn. Shoot web projectiles, intercept Goblin Gliders, trigger electric Venom Overdrives, and climb the Multiverse leaderboard.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg w-full mb-8 font-mono text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                <div className="text-[#00f0ff] font-bold">A / D or MOUSE</div>
                <div className="text-[11px] text-slate-400">Glide Left & Right</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left">
                <div className="text-[#00f0ff] font-bold">CLICK / SPACE</div>
                <div className="text-[11px] text-slate-400">Shoot Web Blast</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-left col-span-2 sm:col-span-1">
                <div className="text-[#e50914] font-bold">Z / SHIFT</div>
                <div className="text-[11px] text-slate-400">Venom Overdrive</div>
              </div>
            </div>

            <button
              onClick={startNewGame}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#e50914] via-rose-500 to-[#00f0ff] text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(229,9,20,0.5)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>START EXPEDITION // PLAY NOW</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === "gameover" && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-[#070b14]/92 backdrop-blur-lg text-center">
            <div className="w-16 h-16 rounded-full bg-[#e50914]/20 border border-[#e50914]/50 flex items-center justify-center text-[#e50914] mb-4">
              <Shield className="w-8 h-8" />
            </div>

            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono">
              SPIDEY SENSE OVERLOAD
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              You defended Earth-1610 with exceptional valor.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xs w-full mb-8 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400">
                <span>FINAL SCORE</span>
                <span className="text-[#00f0ff] font-bold text-sm">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>ALL-TIME HIGH</span>
                <span className="text-amber-400 font-bold text-sm">{highScore.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={startNewGame}
              className="px-8 py-3.5 rounded-full bg-[#00f0ff] text-[#070b14] font-bold text-sm tracking-wider uppercase hover:bg-white transition-all cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              RESPAWN & REPLAY
            </button>
          </div>
        )}

        {/* In-Game Venom Special Button (Touch & Quick Click) */}
        {gameState === "playing" && (
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
            <button
              onClick={triggerVenomBlast}
              disabled={venomCharge < 40}
              className={`px-4 py-2.5 rounded-full font-mono text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                venomCharge >= 40
                  ? "bg-[#e50914] text-white border-[#e50914] shadow-[0_0_20px_#e50914] animate-pulse"
                  : "bg-white/5 text-slate-500 border-white/10 cursor-not-allowed opacity-50"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>VENOM SHOCK ({venomCharge}%)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
