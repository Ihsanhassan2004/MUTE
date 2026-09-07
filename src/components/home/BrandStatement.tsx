import React from 'react';
import { motion } from 'framer-motion';

export const BrandStatement: React.FC = () => {
  return (
    <section
      id="brand-statement"
      className="relative py-28 sm:py-40 bg-[#030405] text-[#F3F3F0] overflow-hidden border-t border-[#121518]"
    >
      {/* Dark Ambient Background Gradient */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 text-center space-y-16 sm:space-y-24">
        {/* Massive Typography Statement */}
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.15] text-[#D8DCE3] uppercase"
          >
            IF YOU SEE SOMEONE DRINK MUTE, <br className="hidden sm:inline" />
            <span className="font-serif italic text-[#8E9399]">
              DO NOT TALK TO THEM FOR 10 MINUTES.
            </span>
          </motion.h2>
        </div>

        {/* 10 Minutes. No Noise. Just Mute. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="pt-10 sm:pt-16 border-t border-[#14171A] max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <span className="font-mono text-2xl sm:text-3xl text-[#F3F3F0] font-light">10</span>
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#8E9399] uppercase">
                MINUTES
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-2xl sm:text-3xl text-[#F3F3F0] font-light">0</span>
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#8E9399] uppercase">
                NOISE
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-2xl sm:text-3xl text-white font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                MUTE
              </span>
              <p className="font-mono text-[11px] tracking-[0.25em] text-[#8E9399] uppercase">
                SYSTEM PAUSE
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
