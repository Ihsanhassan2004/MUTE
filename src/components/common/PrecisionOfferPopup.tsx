import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDown } from 'lucide-react';

export const PrecisionOfferPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup 15 seconds after opening website
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll and listen for Escape key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handlePlayGame = () => {
    setIsOpen(false);
    // Smooth scroll down to the precision game section
    setTimeout(() => {
      const target =
        document.getElementById('precision-game') ||
        document.getElementById('shutdown-system');

      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Full-screen Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#050607]/90 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0A0A0A] border border-[#26282B] shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-6 sm:p-10 z-10 text-[#F4F1EA] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-heading"
          >
            {/* Subtle gold ambient glow in top-right */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/[0.05] rounded-full blur-3xl pointer-events-none" />

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#8D8D8D] hover:text-[#F4F1EA] p-2 transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Vertical terminal-style layout line & content */}
            <div className="relative pl-4 sm:pl-5 border-l-2 border-[#33373E] space-y-5">
              {/* Tagline / Header */}
              <div className="space-y-1 font-mono text-sm sm:text-base tracking-wider text-[#F4F1EA] uppercase font-bold leading-tight">
                <p>CAFFEINE MAKES YOU JITTER.</p>
                <p className="text-[#C5A059]">PROVE YOUR FOCUS IS STEADY.</p>
              </div>

              {/* Subtext description */}
              <p className="font-mono text-xs sm:text-[13px] text-[#8D8D8D] leading-relaxed max-w-md">
                Sink 3 of 5 shots in our 15-second focus test to unlock your{' '}
                <span className="text-[#F4F1EA]">Batch 001 Founder Allocation</span>.
              </p>

              {/* Hit tier boxes side-by-side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Tier 1 */}
                <div className="p-3.5 bg-[#0E1012] border border-dashed border-[#2F343C] font-mono text-xs space-y-1.5">
                  <span className="text-[#8D8D8D] text-[10px] sm:text-[11px] tracking-widest block uppercase">
                    3 OF 5 HITS
                  </span>
                  <span className="text-[#F4F1EA] font-semibold tracking-wider block">
                    10% OFF — ₹539
                  </span>
                </div>

                {/* Tier 2 */}
                <div className="p-3.5 bg-[#0E1012] border border-dashed border-[#C5A059]/50 font-mono text-xs space-y-1.5">
                  <span className="text-[#C5A059] text-[10px] sm:text-[11px] tracking-widest block uppercase">
                    5 OF 5 HITS (PERFECT)
                  </span>
                  <span className="text-[#F4F1EA] font-semibold tracking-wider block">
                    15% OFF — ₹509 + STICKERS
                  </span>
                </div>
              </div>

              {/* Action Box: PLAY GAME GET OFFER */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handlePlayGame}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#F4F1EA] hover:bg-white text-[#0A0A0A] font-mono text-xs tracking-widest uppercase font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(244,241,234,0.25)] active:scale-[0.99]"
                >
                  <span>PLAY GAME GET OFFER</span>
                  <ArrowDown size={14} className="animate-bounce" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
