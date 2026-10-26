import { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Scene } from './three/Scene';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Menu } from './sections/Menu';
import { Gallery } from './sections/Gallery';
import { Testimonials } from './sections/Testimonials';
import { Reservation } from './sections/Reservation';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { CAFE_CONFIG } from './config/cafe';

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // Initialize Lenis smooth scroll
  useLenis(!reducedMotion);

  const handleReserveClick = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-espresso text-cream overflow-x-hidden selection:bg-caramel selection:text-espresso font-sans">
      {/* 0 -> 100% Preloader */}
      <Preloader
        brandName={CAFE_CONFIG.brand.name}
        onComplete={() => setLoadingComplete(true)}
      />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* 3D WebGL Procedural Background Experience */}
      <Scene reducedMotion={reducedMotion} />

      {/* Sticky Glass Navbar */}
      <Navbar onReserveClick={handleReserveClick} />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero onReserveClick={handleReserveClick} />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
