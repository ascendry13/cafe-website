import React from 'react';
import { motion } from 'framer-motion';
import { CAFE_CONFIG } from '../config/cafe';
import { StatCounter } from '../components/StatCounter';
import { HeartHandshake, Flame, Croissant, Quote } from 'lucide-react';

export const About: React.FC = () => {
  const { about, stats } = CAFE_CONFIG;

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-caramel" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-caramel" />;
      case 'Croissant':
        return <Croissant className="w-5 h-5 text-caramel" />;
      default:
        return <Flame className="w-5 h-5 text-caramel" />;
    }
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sage/15 border border-sage/30 text-sage-light mb-4"
          >
            {about.badge}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight"
          >
            {about.headline}
          </motion.h2>
        </div>

        {/* Split Layout: Story & Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Column: Narrative & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="space-y-5 text-base sm:text-lg text-cream/80 font-sans leading-relaxed mb-8">
              {about.storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Master Roaster Quote Box */}
            <div className="relative p-6 sm:p-8 rounded-2xl glass-card border border-caramel/30">
              <Quote className="absolute top-4 right-4 w-10 h-10 text-caramel/15 pointer-events-none" />
              <blockquote className="font-serif italic text-cream text-lg sm:text-xl leading-snug mb-4">
                "{about.quote.text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-caramel/20 flex items-center justify-center border border-caramel/40 text-caramel font-serif font-bold">
                  ER
                </div>
                <div>
                  <h4 className="font-sans font-semibold text-sm text-cream">
                    {about.quote.author}
                  </h4>
                  <p className="text-xs text-caramel/90 tracking-wide">
                    {about.quote.role}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Layered Photography & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="relative rounded-2xl overflow-hidden glass-panel border border-cream/15 aspect-[4/5] shadow-xl group">
                <img
                  src={about.images.cafeSpace.src}
                  alt={about.images.cafeSpace.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 text-xs uppercase tracking-widest text-cream/90 bg-espresso/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-cream/10">
                  Pearl Sanctuary
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden glass-panel border border-cream/15 aspect-[4/5] shadow-xl group translate-y-6 sm:translate-y-8">
                <img
                  src={about.images.roaster.src}
                  alt={about.images.roaster.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 text-xs uppercase tracking-widest text-cream/90 bg-espresso/70 px-2.5 py-1 rounded-md backdrop-blur-sm border border-cream/10">
                  Daily Roast
                </span>
              </div>
            </div>

            {/* Three Craft Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {about.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl glass-panel-light border border-cream/10 flex flex-col gap-2 hover:border-caramel/30 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-caramel/15 flex items-center justify-center">
                    {getPillarIcon(pillar.icon)}
                  </div>
                  <h4 className="font-semibold text-sm text-cream">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-cream/70 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Three Animated Stat Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
};
