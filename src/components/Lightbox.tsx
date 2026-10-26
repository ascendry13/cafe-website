import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  selectedIndex,
  onClose,
  onNavigate,
}) => {
  const isOpen = selectedIndex !== null;
  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && selectedIndex !== null) {
        onNavigate((selectedIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        onNavigate((selectedIndex - 1 + items.length) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, selectedIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl select-none"
          onClick={onClose}
        >
          {/* Top Bar Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50 text-cream">
            <span className="text-xs uppercase tracking-widest text-cream/70 bg-espresso/60 px-3 py-1.5 rounded-full border border-cream/10">
              {currentItem.category} • {selectedIndex! + 1} of {items.length}
            </span>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-espresso/80 hover:bg-caramel text-cream hover:text-espresso transition-colors border border-cream/20 cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Chevron Left */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((selectedIndex! - 1 + items.length) % items.length);
            }}
            className="absolute left-4 z-50 p-3 rounded-full bg-espresso/80 hover:bg-caramel text-cream hover:text-espresso transition-colors border border-cream/20 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Central Image Card */}
          <motion.div
            key={currentItem.id}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center overflow-hidden rounded-2xl glass-panel shadow-2xl border border-cream/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[68vh] w-auto overflow-hidden bg-espresso-dark">
              <img
                src={currentItem.image}
                alt={currentItem.alt}
                className="w-full h-full object-contain max-h-[68vh]"
              />
            </div>
            <div className="p-5 w-full bg-espresso/90 border-t border-cream/10 text-center">
              <h3 className="font-serif text-xl font-medium text-cream mb-1">
                {currentItem.title}
              </h3>
              <p className="text-sm text-cream/75 max-w-xl mx-auto">
                {currentItem.caption}
              </p>
            </div>
          </motion.div>

          {/* Navigation Chevron Right */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((selectedIndex! + 1) % items.length);
            }}
            className="absolute right-4 z-50 p-3 rounded-full bg-espresso/80 hover:bg-caramel text-cream hover:text-espresso transition-colors border border-cream/20 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
