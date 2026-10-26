import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CAFE_CONFIG } from '../config/cafe';
import { Calendar, Users, Clock, CheckCircle2, X } from 'lucide-react';

export const Reservation: React.FC = () => {
  const { reservation } = CAFE_CONFIG;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow default
    timeSlot: reservation.timeSlots[2] || '10:00 AM',
    seating: reservation.seatingOptions[0].id,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact phone number is required';
    }
    if (!formData.date) {
      errs.date = 'Please select a date';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const code = 'BB-' + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(code);
      setShowSuccessModal(true);

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C98B4B', '#F5EBDD', '#7A8B69', '#DBA366'],
      });
    }, 900);
  };

  const selectedSeatingOption = reservation.seatingOptions.find(
    (opt) => opt.id === formData.seating
  );

  return (
    <section id="reservation" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-caramel/15 border border-caramel/30 text-caramel-light mb-4">
            Table Reservations
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cream tracking-tight leading-tight mb-4">
            {reservation.title}
          </h2>
          <p className="text-cream/75 text-base sm:text-lg font-sans">
            {reservation.subtitle}
          </p>
        </div>

        {/* Reservation Form Card */}
        <div className="rounded-3xl glass-card border border-cream/20 p-8 sm:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Maya Lin"
                  className={`w-full px-4 py-3 rounded-xl glass-panel-light text-cream placeholder-cream/40 border focus:outline-none focus:ring-2 focus:ring-caramel transition-all ${
                    errors.name ? 'border-red-400/80' : 'border-cream/15'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="e.g. maya@example.com"
                  className={`w-full px-4 py-3 rounded-xl glass-panel-light text-cream placeholder-cream/40 border focus:outline-none focus:ring-2 focus:ring-caramel transition-all ${
                    errors.email ? 'border-red-400/80' : 'border-cream/15'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="e.g. +1 (503) 555-0192"
                  className={`w-full px-4 py-3 rounded-xl glass-panel-light text-cream placeholder-cream/40 border focus:outline-none focus:ring-2 focus:ring-caramel transition-all ${
                    errors.phone ? 'border-red-400/80' : 'border-cream/15'
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
                )}
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                  Party Size
                </label>
                <div className="relative">
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-panel-light text-cream border border-cream/15 focus:outline-none focus:ring-2 focus:ring-caramel appearance-none bg-espresso-light"
                  >
                    <option value="1 Guest">1 Guest (Solo Ritual)</option>
                    <option value="2 Guests">2 Guests (Table for Two)</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests (Oak Table)</option>
                    <option value="5-6 Guests">5 – 6 Guests (Gathering)</option>
                    <option value="7+ Guests">7+ Guests (Private Nook)</option>
                  </select>
                  <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      if (errors.date) setErrors({ ...errors, date: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl glass-panel-light text-cream border focus:outline-none focus:ring-2 focus:ring-caramel ${
                      errors.date ? 'border-red-400/80' : 'border-cream/15'
                    }`}
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
                </div>
                {errors.date && (
                  <p className="text-red-400 text-xs mt-1.5">{errors.date}</p>
                )}
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-panel-light text-cream border border-cream/15 focus:outline-none focus:ring-2 focus:ring-caramel appearance-none bg-espresso-light"
                  >
                    {reservation.timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Seating Preference Options */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-3">
                Seating Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reservation.seatingOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-1 ${
                      formData.seating === opt.id
                        ? 'bg-caramel/15 border-caramel text-cream shadow-sm'
                        : 'glass-panel-light border-cream/10 text-cream/70 hover:border-cream/25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm text-cream">{opt.name}</span>
                      <input
                        type="radio"
                        name="seating"
                        value={opt.id}
                        checked={formData.seating === opt.id}
                        onChange={() => setFormData({ ...formData, seating: opt.id })}
                        className="text-caramel focus:ring-caramel"
                      />
                    </div>
                    <span className="text-xs text-cream/60">{opt.description}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Notes / Requests */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-cream/80 mb-2">
                Special Requests or Dietary Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="High chair needed, celebrating an anniversary, dairy allergy, quiet corner..."
                className="w-full px-4 py-3 rounded-xl glass-panel-light text-cream placeholder-cream/40 border border-cream/15 focus:outline-none focus:ring-2 focus:ring-caramel resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto min-w-[280px] px-8 py-4 rounded-full text-base font-semibold tracking-wide bg-caramel text-espresso hover:bg-caramel-light transition-all duration-200 shadow-xl hover:shadow-caramel/30 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-espresso border-t-transparent rounded-full animate-spin" />
                    Securing Your Table...
                  </span>
                ) : (
                  'Confirm Reservation'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Confirmation Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setShowSuccessModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-md w-full rounded-3xl glass-card border border-caramel/40 p-8 shadow-2xl text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 p-2 text-cream/60 hover:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 rounded-full bg-caramel/20 border border-caramel text-caramel flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-caramel-light" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-cream mb-2">
                  Table Reserved!
                </h3>
                <p className="text-sm text-cream/80 mb-6">
                  We look forward to hosting you at {CAFE_CONFIG.brand.name}. A confirmation details email has been simulated to {formData.email}.
                </p>

                <div className="p-4 rounded-2xl glass-panel-light border border-cream/15 text-left text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-cream/60">Booking Code:</span>
                    <span className="font-mono font-bold text-caramel">{confirmationCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Guest Name:</span>
                    <span className="text-cream font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Date &amp; Time:</span>
                    <span className="text-cream font-medium">{formData.date} at {formData.timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Atmosphere:</span>
                    <span className="text-cream font-medium">{selectedSeatingOption?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cream/60">Party:</span>
                    <span className="text-cream font-medium">{formData.guests}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 rounded-full bg-caramel text-espresso font-semibold text-sm hover:bg-caramel-light transition-colors"
                >
                  Back to Experience
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
