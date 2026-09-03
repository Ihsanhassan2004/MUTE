import React from 'react';
import { motion } from 'framer-motion';
import { MUTE_PRODUCT } from '../../data/product';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#030405] text-[#F3F3F0] relative overflow-hidden border-t border-[#121518]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="font-mono text-[10px] sm:text-[11px] text-[#8E9399] tracking-[0.35em] uppercase">
            07 / PERSPECTIVES
          </p>
          <h2 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase">
            THE STILLNESS CIRCLE.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9399] font-light">
            Early batch impressions from founders, writers, and deep-focus practitioners.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MUTE_PRODUCT.reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="bg-[#080A0C] border border-[#1A1E23] p-8 flex flex-col justify-between space-y-6 hover:border-[#2E343D] transition-colors"
            >
              <div className="space-y-4">
                {/* 5-Star Subtle Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-white text-xs">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-serif italic text-sm text-[#D1D5DB] leading-relaxed font-light">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#14171A] flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-[#F3F3F0]">
                    {rev.author}
                  </h4>
                  <p className="font-mono text-[10px] text-[#5A606A] uppercase">
                    {rev.location}
                  </p>
                </div>

                <span className="font-mono text-[9px] text-[#8E9399] bg-[#14171A] px-2 py-0.5 border border-[#20242A]">
                  VERIFIED PAUSE
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hidden / Subtle Stealth As Seen In note */}
        <div className="pt-8 text-center">
          <p className="font-mono text-[10px] text-[#4A4E54] tracking-[0.3em] uppercase">
            PRESS & EDITORIAL DISPATCHES // EMBARGOED UNTIL GLOBAL LAUNCH
          </p>
        </div>
      </div>
    </section>
  );
};
