import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock } from 'lucide-react';

interface JoinDropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinDropModal: React.FC<JoinDropModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Save email to localStorage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem('mute_first_drop_subscribers') || '[]');
      if (!existing.includes(email.trim())) {
        existing.push(email.trim());
        localStorage.setItem('mute_first_drop_subscribers', JSON.stringify(existing));
      }
    } catch {
      // ignore storage errors
    }

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleResetAndClose}
            className="fixed inset-0 bg-[#050607]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-[#0A0C0E] border border-[#20242A] shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 z-10 overflow-hidden"
          >
            {/* Ambient Background Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-white/[0.03] rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleResetAndClose}
              className="absolute top-5 right-5 text-[#8E9399] hover:text-[#F3F3F0] p-1.5 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#14171A] border border-[#252A30] font-mono text-[10px] uppercase tracking-widest text-[#8E9399] mb-6">
              <Lock size={11} className="text-white/80" />
              <span>ALLOCATION NOTICE // ARCHIVED</span>
            </div>

            {/* Heading requested by user */}
            <div className="space-y-3 mb-8">
              <h2 className="font-display font-light text-2xl sm:text-3xl tracking-tight text-[#F3F3F0] uppercase leading-tight">
                Batch 001 is completely locked. <br />
                <span className="text-[#8E9399]">Batch 002 rocking soon.</span>
              </h2>
              <p className="text-xs text-[#8E9399] font-light leading-relaxed">
                Join the priority queue to receive release coordinates and instant access when Batch 002 unlocks.
              </p>
            </div>

            {/* Form Section */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-[#050607] border border-[#262B33] focus:border-[#F3F3F0] px-4 py-3.5 text-xs text-[#F3F3F0] placeholder-[#5A606A] font-mono tracking-wider focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#F3F3F0] hover:bg-white text-[#050607] font-display font-medium text-xs tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-2"
                  >
                    JOIN FIRST DROP
                  </button>
                </div>
                <p className="font-mono text-[10px] text-[#5A606A] tracking-wider uppercase">
                  * Limited drop reservation. No spam. Dispatches strictly for drop alerts.
                </p>
              </form>
            ) : (
              <div className="p-6 bg-[#0E1012] border border-[#252A30] text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-white/10 text-[#F3F3F0] mx-auto flex items-center justify-center">
                  <Check size={18} />
                </div>
                <h3 className="font-display text-base text-[#F3F3F0] uppercase tracking-wide">
                  Queue Confirmed
                </h3>
                <p className="font-mono text-xs text-[#8E9399]">
                  We will notify <span className="text-[#F3F3F0]">{email}</span> the second Batch 002 drops.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="text-xs font-mono tracking-wider uppercase text-[#8E9399] hover:text-[#F3F3F0] underline transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
