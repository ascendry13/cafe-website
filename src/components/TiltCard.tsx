import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { Sparkles } from 'lucide-react';

interface TiltCardProps {
  item: MenuItem;
}

export const TiltCard: React.FC<TiltCardProps> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max tilt angle (degrees)
    const maxTilt = 12;
    const rX = ((y - centerY) / centerY) * -maxTilt;
    const rY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rX);
    setRotateY(rY);

    // Glare position in percent
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 group relative w-full h-full rounded-2xl p-[1px] transition-all duration-300"
      style={{ perspective: 1000 }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 220 }}
        className="relative h-full flex flex-col rounded-2xl overflow-hidden glass-card transition-shadow duration-300 group-hover:shadow-[0_20px_40px_-15px_rgba(201,139,75,0.3)] border border-cream/15 group-hover:border-caramel/50"
      >
        {/* Dynamic Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 245, 230, ${glarePos.opacity}) 0%, transparent 60%)`,
          }}
        />

        {/* Card Media Header */}
        <div className="relative h-52 w-full overflow-hidden bg-espresso-dark">
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-80" />

          {/* Badge Tag */}
          {item.tag && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-espresso/80 backdrop-blur-md text-caramel border border-caramel/30 shadow-md">
              <Sparkles className="w-3 h-3 text-caramel-light" />
              <span>{item.tag}</span>
            </div>
          )}

          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 z-10 px-3.5 py-1.5 rounded-xl font-serif text-lg font-bold text-cream bg-espresso/85 backdrop-blur-md border border-cream/15 shadow-lg">
            {item.price}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-serif text-xl font-semibold text-cream group-hover:text-caramel-light transition-colors">
                {item.name}
              </h3>
            </div>
            <p className="text-cream/75 text-sm font-sans leading-relaxed mb-4">
              {item.description}
            </p>
          </div>

          {/* Card Footer / Details */}
          <div className="pt-3 border-t border-cream/10 flex items-center justify-between text-xs text-cream/50">
            {item.calories && (
              <span>{item.calories}</span>
            )}
            {item.notes && (
              <span className="italic text-caramel/80">{item.notes}</span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
