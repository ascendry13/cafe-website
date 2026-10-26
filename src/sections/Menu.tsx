import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAFE_CONFIG } from '../config/cafe';
import { TiltCard } from '../components/TiltCard';
import { Coffee, Leaf, Croissant, UtensilsCrossed } from 'lucide-react';

export const Menu: React.FC = () => {
  const { menuCategories } = CAFE_CONFIG;
  const [activeTab, setActiveTab] = useState<string>(menuCategories[0].id);

  const currentCategory =
    menuCategories.find((cat) => cat.id === activeTab) || menuCategories[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4" />;
      case 'Croissant':
        return <Croissant className="w-4 h-4" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-4 h-4" />;
      default:
        return <Coffee className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-caramel/15 border border-caramel/30 text-caramel-light mb-4">
            Curated Offerings
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight mb-4">
            Our Signature Menu
          </h2>
          <p className="text-cream/75 text-base sm:text-lg font-sans max-w-2xl mx-auto">
            Terroir-driven roasts, botanical infusions, and morning viennoiserie, crafted to perfection.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {menuCategories.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel ${
                  isActive
                    ? 'text-espresso bg-caramel shadow-lg shadow-caramel/25'
                    : 'text-cream/80 hover:text-cream glass-panel-light hover:bg-espresso-light border border-cream/10'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full border border-caramel-light pointer-events-none"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <motion.div
          key={currentCategory.id + '-desc'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="italic font-serif text-cream/70 text-sm sm:text-base">
            "{currentCategory.description}"
          </p>
        </motion.div>

        {/* Menu Items Grid with 3D Tilt Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {currentCategory.items.map((item) => (
              <TiltCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Nutritional & Sourcing Footnote */}
        <div className="mt-16 text-center text-xs text-cream/60 flex flex-wrap items-center justify-center gap-6">
          <span>Oat, almond &amp; organic whole milk available upon request</span>
          <span>•</span>
          <span>Gluten-free &amp; vegan bakery alternatives baked daily</span>
          <span>•</span>
          <span>Ask your barista for today’s featured single-origin bean card</span>
        </div>
      </div>
    </section>
  );
};
