import React, { useEffect, useRef, useState } from 'react';
import { StatItem } from '../types';

interface StatCounterProps {
  stat: StatItem;
}

export const StatCounter: React.FC<StatCounterProps> = ({ stat }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600;
          const startTime = performance.now();
          const target = stat.value;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = target % 1 !== 0 
              ? parseFloat((target * easeOutProgress).toFixed(1))
              : Math.floor(target * easeOutProgress);

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stat.value]);

  return (
    <div
      ref={containerRef}
      className="p-6 rounded-2xl glass-panel border border-cream/10 hover:border-caramel/40 transition-all duration-300 group"
    >
      <div className="font-serif text-4xl lg:text-5xl font-bold text-caramel group-hover:text-caramel-light transition-colors mb-1">
        <span>{displayValue}</span>
        <span className="text-cream text-3xl ml-0.5">{stat.suffix}</span>
      </div>
      <h4 className="text-cream font-medium text-base tracking-wide mb-1.5">
        {stat.label}
      </h4>
      <p className="text-cream/65 text-xs leading-relaxed">
        {stat.description}
      </p>
    </div>
  );
};
