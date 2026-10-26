import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CAFE_CONFIG } from '../config/cafe';
import { Lightbox } from '../components/Lightbox';
import { ZoomIn } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery } = CAFE_CONFIG;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(gallery.map((g) => g.category)))];

  const filteredItems =
    selectedCategory === 'All'
      ? gallery
      : gallery.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sage/15 border border-sage/30 text-sage-light mb-4">
            Visual Stories
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight mb-4">
            Moments at Brew &amp; Bloom
          </h2>
          <p className="text-cream/75 text-base sm:text-lg font-sans max-w-2xl mx-auto">
            A glimpse inside our sun-drenched roastery, steam-kissed cups, and the artisan hands behind them.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cream text-espresso shadow-md'
                  : 'text-cream/70 glass-panel-light hover:text-cream border border-cream/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => {
            // Find global index in full gallery for lightbox navigation
            const globalIndex = gallery.findIndex((g) => g.id === item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setLightboxIndex(globalIndex)}
                className={`group relative rounded-2xl overflow-hidden glass-panel border border-cream/15 cursor-pointer shadow-lg hover:border-caramel/50 transition-all duration-300 ${
                  item.aspect === 'tall' ? 'sm:row-span-2 aspect-[3/4] sm:aspect-auto' : 'aspect-square'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] tracking-widest uppercase font-semibold text-caramel">
                      {item.category}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-caramel/20 flex items-center justify-center text-cream">
                      <ZoomIn className="w-4 h-4 text-caramel-light" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-cream leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          items={gallery}
          selectedIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(index) => setLightboxIndex(index)}
        />
      </div>
    </section>
  );
};
