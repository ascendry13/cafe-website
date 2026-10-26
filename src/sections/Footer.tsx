import React, { useState } from 'react';
import { CAFE_CONFIG } from '../config/cafe';
import { Coffee, ArrowUp, Send, Check } from 'lucide-react';

// Crisp inline SVGs for social brands
const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

export const Footer: React.FC = () => {
  const { brand, socials } = CAFE_CONFIG;
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'Instagram':
        return <InstagramIcon className="w-4 h-4" />;
      case 'Facebook':
        return <FacebookIcon className="w-4 h-4" />;
      case 'Twitter / X':
      case 'Twitter':
        return <TwitterIcon className="w-4 h-4" />;
      default:
        return <InstagramIcon className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-espresso-dark border-t border-cream/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-10 text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-cream/10">
          {/* Brand Bio */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel border border-caramel/40">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                {brand.name}
              </span>
            </div>

            <p className="text-sm text-cream/70 font-sans leading-relaxed max-w-sm mb-6">
              {brand.shortBio}
            </p>

            {/* Socials Row */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-panel-light flex items-center justify-center text-cream/80 hover:text-caramel hover:border-caramel/40 border border-cream/10 transition-colors"
                  aria-label={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base font-semibold text-cream mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70 font-sans">
              <li>
                <a href="#about" className="hover:text-caramel transition-colors">
                  Our Philosophy &amp; Craft
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-caramel transition-colors">
                  Signature Menu &amp; Bakery
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-caramel transition-colors">
                  Photo Stories
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-caramel transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-caramel transition-colors">
                  Table Reservations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-caramel transition-colors">
                  Hours &amp; Location
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-base font-semibold text-cream mb-2">
              The Sunday Morning Dispatch
            </h4>
            <p className="text-xs text-cream/70 mb-4 leading-relaxed">
              Seasonal micro-lot announcements, tasting notes, and invitation-only cupping sessions.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-full glass-panel-light text-cream text-sm placeholder-cream/40 border border-cream/20 focus:outline-none focus:ring-2 focus:ring-caramel pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-caramel text-espresso hover:bg-caramel-light transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {isSubscribed && (
                <p className="text-xs text-caramel-light font-medium pl-3 animate-fade-in">
                  Welcome to the Brew &amp; Bloom family!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved. Sourced ethically worldwide.
          </p>

          <div className="flex items-center gap-6">
            <span>Designed with Passion</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-caramel hover:text-caramel-light transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
