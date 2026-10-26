import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Menu as MenuIcon, X, CalendarCheck } from 'lucide-react';
import { CAFE_CONFIG } from '../config/cafe';

interface NavbarProps {
  onReserveClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Signature Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#testimonials' },
    { name: 'Contact & Hours', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (!element) return;
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: Element, options?: object) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(element, { duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 glass-panel border-b border-cream/10 shadow-lg shadow-black/20'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded-lg"
          aria-label={`${CAFE_CONFIG.brand.name} Home`}
        >
          <div className="w-10 h-10 rounded-full bg-caramel/15 flex items-center justify-center border border-caramel/30 group-hover:bg-caramel/25 group-hover:border-caramel transition-all">
            <Coffee className="w-5 h-5 text-caramel transition-transform group-hover:scale-110" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cream group-hover:text-caramel-light transition-colors">
              {CAFE_CONFIG.brand.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-caramel/80 -mt-1 font-sans">
              Specialty Roastery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-cream/80 hover:text-caramel transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-caramel hover:after:w-full after:transition-all after:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel rounded"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#reservation"
            onClick={(e) => {
              if (onReserveClick) {
                e.preventDefault();
                onReserveClick();
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-caramel text-espresso hover:bg-caramel-light transition-all shadow-md hover:shadow-caramel/20 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Reserve Table</span>
          </a>

          {/* Hamburger button on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-panel-light border border-cream/15 text-cream hover:text-caramel focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass-panel border-b border-cream/15 px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="text-cream/90 hover:text-caramel transition-colors py-2 border-b border-cream/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#reservation"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#reservation');
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-caramel text-espresso font-semibold uppercase text-xs tracking-wider"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Reserve a Table</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
