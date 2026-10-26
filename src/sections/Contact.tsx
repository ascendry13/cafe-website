import React from 'react';
import { CAFE_CONFIG } from '../config/cafe';
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from 'lucide-react';

export const Contact: React.FC = () => {
  const { contact } = CAFE_CONFIG;

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-sage/15 border border-sage/30 text-sage-light mb-4">
            Visit &amp; Connect
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight mb-4">
            Our Roastery Sanctuary
          </h2>
          <p className="text-cream/75 text-base sm:text-lg font-sans max-w-2xl mx-auto">
            Drop in for a morning pourover or plan a slow afternoon in our sunlit botanical courtyard.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Cards: Hours & Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Opening Hours Card */}
            <div className="p-8 rounded-3xl glass-card border border-cream/15 flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cream">
                    Opening Hours
                  </h3>
                  <span className="text-xs text-caramel tracking-wide uppercase">
                    Fresh Roast Daily
                  </span>
                </div>
              </div>

              <div className="space-y-4 border-b border-cream/10 pb-6 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-cream/70 font-medium">Monday – Friday</span>
                  <span className="text-cream font-semibold">{contact.hours.weekday.split(': ')[1] || '6:30 AM – 7:00 PM'}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-cream/70 font-medium">Saturday – Sunday</span>
                  <span className="text-cream font-semibold">{contact.hours.weekend.split(': ')[1] || '7:30 AM – 8:00 PM'}</span>
                </div>
              </div>

              <p className="text-xs text-cream/60 italic leading-relaxed">
                {contact.hours.holidayNote}
              </p>
            </div>

            {/* Direct Contact Card */}
            <div className="p-8 rounded-3xl glass-card border border-cream/15 flex-1 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-caramel mb-1">
                    Location
                  </h4>
                  <p className="text-sm text-cream/90 leading-relaxed font-sans">
                    {contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-caramel mb-1">
                    Telephone
                  </h4>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-sm text-cream/90 hover:text-caramel transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-caramel mb-1">
                    Inquiries
                  </h4>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-cream/90 hover:text-caramel transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Stylized Interactive Map Placeholder */}
          <div className="lg:col-span-7 rounded-3xl glass-card border border-cream/15 overflow-hidden relative min-h-[420px] flex flex-col justify-between p-8 group">
            {/* Ambient Map Illustration Grid Overlay */}
            <div className="absolute inset-0 bg-espresso-dark opacity-90" />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'radial-gradient(#C98B4B 1px, transparent 1px), radial-gradient(#F5EBDD 1px, transparent 1px)',
                backgroundSize: '36px 36px',
                backgroundPosition: '0 0, 18px 18px',
              }}
            />

            {/* Stylized Street Map Lines (Procedural SVG vector) */}
            <svg
              className="absolute inset-0 w-full h-full opacity-25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#F5EBDD" strokeWidth="2" />
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#C98B4B" strokeWidth="3" />
              <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#F5EBDD" strokeWidth="1.5" />
              <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#F5EBDD" strokeWidth="2" />
              <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#C98B4B" strokeWidth="3" />
              <line x1="85%" y1="0" x2="85%" y2="100%" stroke="#F5EBDD" strokeWidth="1.5" />
              <circle cx="60%" cy="50%" r="48" fill="none" stroke="#C98B4B" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            {/* Map Header Pill */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold px-3 py-1.5 rounded-full bg-espresso/80 text-caramel border border-caramel/30 backdrop-blur-md">
                Pearl District • Historic Roastery
              </span>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-cream hover:text-caramel transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Animated Pin in Center */}
            <div className="relative z-10 flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-caramel/30 flex items-center justify-center animate-ping absolute inset-0" />
                <div className="w-14 h-14 rounded-full bg-caramel text-espresso flex items-center justify-center shadow-xl border-2 border-cream relative">
                  <Navigation className="w-7 h-7 text-espresso fill-espresso" />
                </div>
              </div>
              <div className="mt-4 px-4 py-2 rounded-xl glass-panel text-center shadow-xl border border-cream/20">
                <p className="font-serif font-bold text-cream text-base">
                  {CAFE_CONFIG.brand.name}
                </p>
                <p className="text-xs text-caramel">Pearl District Sanctuary</p>
              </div>
            </div>

            {/* Map Action Footer */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-cream/10">
              <p className="text-xs text-cream/70 font-sans text-center sm:text-left">
                Convenient street parking &amp; bike racks available right outside.
              </p>
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-caramel text-espresso hover:bg-caramel-light text-xs font-semibold uppercase tracking-wider transition-all shadow-md shrink-0"
              >
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
