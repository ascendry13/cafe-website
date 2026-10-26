import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Coffee, Sparkles, ArrowRight } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafe';
import { WebGLFallback, isWebGLAvailable } from '../components/WebGLFallback';

interface HeroProps {
  onReserveClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick }) => {
  const hasWebGL = isWebGLAvailable();

  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, options?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(el, { duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column: Editorial Headline & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-espresso-light/80 border border-caramel/30 text-caramel mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-caramel-light" />
            <span>{CAFE_CONFIG.brand.subTagline}</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream leading-[1.08] mb-6 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            Where Every Cup <br />
            <span className="italic font-normal text-caramel-light">Blooms</span> With Passion.
          </h1>

          {/* Short Bio */}
          <p className="text-base sm:text-lg text-cream/85 font-sans max-w-xl leading-relaxed mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            {CAFE_CONFIG.brand.shortBio}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
            <button
              onClick={() => handleScrollTo('menu')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-caramel text-espresso hover:bg-caramel-light transition-all duration-200 shadow-lg hover:shadow-caramel/25 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (onReserveClick) onReserveClick();
                else handleScrollTo('reservation');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold tracking-wide text-cream border border-cream/25 hover:border-caramel hover:text-caramel-light glass-panel-light transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            >
              <Coffee className="w-4 h-4 text-caramel" />
              <span>Reserve a Table</span>
            </button>
          </div>

          {/* Micro-Features Row */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-cream/10 w-full max-w-lg">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-caramel">100%</p>
              <p className="text-xs text-cream/70">Organic Arabica</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-caramel">In-House</p>
              <p className="text-xs text-cream/70">Daily Drum Roast</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-caramel">Direct</p>
              <p className="text-xs text-cream/70">Farmer Trade</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: WebGL Fallback if 3D Canvas unavailable */}
        {!hasWebGL && (
          <div className="lg:col-span-5">
            <WebGLFallback
              imageSrc="/images/hero.jpg"
              altText="Artisanal latte with rosetta heart foam art"
            />
          </div>
        )}
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10 text-cream/60">
        <span className="text-[11px] tracking-widest uppercase font-medium">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-caramel" />
        </motion.div>
      </div>
    </section>
  );
};
