import React from 'react';
import { motion } from 'framer-motion';
import { MUTE_PRODUCT } from '../../data/product';

export const BenefitsGrid: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#030405] text-[#F3F3F0] relative overflow-hidden border-t border-[#14171A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <p className="font-mono text-[10px] sm:text-[11px] text-[#8E9399] tracking-[0.35em] uppercase">
            05 / THE FOUR PILLARS
          </p>
          <h2 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase">
            CRAFTED FOR STILLNESS.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9399] font-light max-w-md mx-auto">
            A distinct, intentional approach to daily cognitive recovery.
          </p>
        </div>

        {/* 4 Minimalist Benefit Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MUTE_PRODUCT.benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0A0C0E] border border-[#1A1E23] p-8 sm:p-10 flex flex-col justify-between hover:border-[#2E343D] transition-colors group"
            >
              <div>
                <span className="font-mono text-xs text-[#8E9399] tracking-widest block mb-6 group-hover:text-[#F3F3F0] transition-colors">
                  {benefit.number} //
                </span>
                <h3 className="font-display text-lg sm:text-xl font-medium tracking-wide text-[#F3F3F0] mb-4 uppercase">
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#8E9399] font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-[#14171A] flex items-center justify-between font-mono text-[10px] text-[#5A606A] uppercase tracking-widest">
                <span>SYSTEM PILLAR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#20242A] group-hover:bg-white transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
