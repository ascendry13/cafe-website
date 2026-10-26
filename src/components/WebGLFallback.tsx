import React from 'react';

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface WebGLFallbackProps {
  imageSrc?: string;
  altText?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  imageSrc = '/images/hero.jpg',
  altText = 'Artisanal coffee cup with aromatic steam',
}) => {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[550px] rounded-3xl overflow-hidden glass-panel border border-caramel/30 shadow-2xl">
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover animate-pulse duration-10000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel-light border border-cream/20">
        <p className="text-xs tracking-widest uppercase text-caramel font-semibold">
          Classic View
        </p>
        <p className="text-sm text-cream/80">
          Handcrafted specialty coffee roasted fresh daily.
        </p>
      </div>
    </div>
  );
};
