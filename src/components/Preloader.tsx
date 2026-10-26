import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
  brandName?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  brandName = 'Brew & Bloom',
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if preloader was already completed in this session
    if (sessionStorage.getItem('brew_bloom_loaded') === 'true') {
      setIsDone(true);
      onComplete?.();
      return;
    }

    const startTime = performance.now();
    const duration = 1600; // 1.6 seconds

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const current = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        sessionStorage.setItem('brew_bloom_loaded', 'true');
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 300);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-espresso text-cream select-none px-4"
        >
          {/* Subtle warm radial background glow */}
          <div className="absolute inset-0 bg-radial from-caramel/15 via-transparent to-transparent pointer-events-none" />

          <div className="relative flex flex-col items-center">
            {/* Stylized Coffee Cup Silhouette with Liquid Fill */}
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full drop-shadow-[0_10px_25px_rgba(201,139,75,0.25)]"
              >
                <defs>
                  {/* Liquid fill clip path based on current progress percentage */}
                  <clipPath id="liquidClip">
                    <rect
                      x="0"
                      y={82 - (progress / 100) * 52}
                      width="100"
                      height="100"
                    />
                  </clipPath>

                  <linearGradient id="coffeeLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#DBA366" />
                    <stop offset="50%" stopColor="#C98B4B" />
                    <stop offset="100%" stopColor="#5A3319" />
                  </linearGradient>
                </defs>

                {/* Animated Rising Steam Wisps */}
                <motion.path
                  d="M40 24 C38 18 42 14 40 8"
                  fill="none"
                  stroke="#C98B4B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{ y: [-2, -8, -2], opacity: [0.3, 0.9, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M50 24 C48 16 52 12 50 6"
                  fill="none"
                  stroke="#C98B4B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{ y: [-3, -10, -3], opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.2 }}
                />
                <motion.path
                  d="M60 24 C58 18 62 14 60 8"
                  fill="none"
                  stroke="#C98B4B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{ y: [-2, -8, -2], opacity: [0.3, 0.9, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.4 }}
                />

                {/* Cup Outer Contour */}
                <path
                  d="M26 34 H74 V58 C74 70 64 78 50 78 C36 78 26 70 26 58 Z"
                  fill="none"
                  stroke="#F5EBDD"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />

                {/* Cup Handle */}
                <path
                  d="M74 40 C84 40 88 47 88 54 C88 62 81 67 74 67"
                  fill="none"
                  stroke="#F5EBDD"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Saucer */}
                <path
                  d="M18 84 C30 88 70 88 82 84"
                  fill="none"
                  stroke="#C98B4B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Coffee Liquid Fill rising */}
                <g clipPath="url(#liquidClip)">
                  <path
                    d="M26 34 H74 V58 C74 70 64 78 50 78 C36 78 26 70 26 58 Z"
                    fill="url(#coffeeLiquidGrad)"
                  />
                  {/* Crema foam top line */}
                  <rect
                    x="24"
                    y={80 - (progress / 100) * 52}
                    width="52"
                    height="4"
                    fill="#FFF7EE"
                    opacity="0.9"
                    rx="2"
                  />
                </g>
              </svg>
            </div>

            {/* Brand Title */}
            <h2 className="font-serif text-2xl md:text-3xl tracking-wide text-cream font-medium mb-1">
              {brandName}
            </h2>

            {/* Subtitle & Loading progress */}
            <p className="text-caramel/90 text-sm font-sans tracking-widest uppercase mb-4">
              Brewing Experience • {progress}%
            </p>

            {/* Progress Bar Line */}
            <div className="w-52 h-1 bg-espresso-light rounded-full overflow-hidden border border-cream/10">
              <motion.div
                className="h-full bg-gradient-to-r from-caramel via-caramel-light to-cream"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
