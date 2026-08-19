import CustomCursor from "./components/common/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress";
import Marquee from "./components/common/Marquee";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Certificates from "./components/sections/Certificates";
import Contact from "./components/sections/Contact";
import MusicPlayer from "./components/common/MusicPlayer";
import TerminalBoot from "./components/common/TerminalBoot";
import HangingSpiders from "./components/common/HangingSpiders";
import { useState } from "react";

export default function App() {
  const [isBootComplete, setIsBootComplete] = useState(false);

  return (
    <>
      {/* Music Player must be mounted immediately so TerminalBoot can trigger it */}
      <MusicPlayer />

      {!isBootComplete && <TerminalBoot onComplete={() => setIsBootComplete(true)} />}

      {isBootComplete && (
        <>
          {/* Global cinematic overlays */}
          <div className="noise-overlay" />
          <div className="vignette" />
          
          {/* Spider Animations */}
          <HangingSpiders />

          {/* Custom cursor */}
          <CustomCursor />

          {/* Scroll progress */}
          <ScrollProgress />

          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main>
            <Hero />
            <Marquee />
            <About />
            <Skills />
            <Experience />
            <Certificates />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  );
}
