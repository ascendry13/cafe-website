import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAFE_CONFIG } from '../config/cafe';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { testimonials } = CAFE_CONFIG;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-caramel/15 border border-caramel/30 text-caramel-light mb-4">
            Guest Reflections
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight mb-4">
            Loved by Daily Seekers
          </h2>
          <p className="text-cream/75 text-base sm:text-lg font-sans">
            Hear from our community of coffee purists, critics, and slow-morning enthusiasts.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl glass-card border border-cream/20 p-8 sm:p-14 shadow-2xl overflow-hidden"
        >
          {/* Subtle Background Coffee Watermark */}
          <Quote className="absolute -top-4 -right-4 w-40 h-40 text-caramel/5 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col items-center text-center max-w-3xl mx-auto"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < current.rating
                        ? 'text-caramel fill-caramel'
                        : 'text-cream/20'
                    }`}
                  />
                ))}
              </div>

              {/* Quote Body */}
              <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-cream leading-relaxed mb-8">
                "{current.comment}"
              </blockquote>

              {/* Reviewer Details */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.avatarAlt}
                  className="w-14 h-14 rounded-full object-cover border-2 border-caramel shadow-md"
                />
                <div className="sm:text-left text-center">
                  <h4 className="font-serif text-lg font-semibold text-cream">
                    {current.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-caramel tracking-wide font-sans">
                    {current.role} • <span className="text-cream/50">{current.date}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-10 pt-8 border-t border-cream/10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-caramel' : 'w-2 bg-cream/30 hover:bg-cream/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev & Next Chevrons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full glass-panel-light hover:bg-caramel text-cream hover:text-espresso transition-colors border border-cream/15 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full glass-panel-light hover:bg-caramel text-cream hover:text-espresso transition-colors border border-cream/15 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
