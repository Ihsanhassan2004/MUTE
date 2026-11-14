import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { MUTE_PRODUCT } from '../../data/product';
import type { ProductPack } from '../../types/product';

export const ProductShowcase: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<ProductPack>(
    MUTE_PRODUCT.packs.find((p) => p.popular) || MUTE_PRODUCT.packs[2]
  );

  return (
    <section id="product-showcase" className="py-24 sm:py-36 bg-[#050607] text-[#F3F3F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <h2 className="font-display font-light text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F3F3F0] uppercase">
            MEET MUTE.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9399] font-light max-w-md mx-auto">
            "Not more energy. A moment away from it."
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cinematic Product Can Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col items-center justify-center relative"
          >
            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] bg-[#0A0C0E] border border-[#1A1E23] flex items-center justify-center p-6 sm:p-10 group overflow-hidden">
              {/* Subtle back ambient glow */}
              <div className="absolute w-60 h-60 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

              <img
                src={MUTE_PRODUCT.images.hero}
                alt="MUTE Anti-Energy Drink Can"
                className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-700 ease-out select-none"
              />

              {/* Tag bottom left */}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                MUTE® // 250 ML
              </div>

              {/* Selected Pack Indicator */}
              <div className="absolute top-4 right-4 bg-[#14171A] border border-[#2A2F36] px-2.5 py-1 text-[10px] font-mono tracking-wider text-[#F3F3F0]">
                {selectedPack.name}
              </div>
            </div>

            {/* Quick Micro-Specs under image */}
            <div className="w-full max-w-[360px] sm:max-w-[420px] grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="bg-[#0C0E10] border border-[#1A1E23] py-2 px-1">
                <span className="font-mono text-[9px] text-[#6B7280] block">CAFFEINE</span>
                <span className="font-mono text-xs text-[#F3F3F0]">0 mg</span>
              </div>
              <div className="bg-[#0C0E10] border border-[#1A1E23] py-2 px-1">
                <span className="font-mono text-[9px] text-[#6B7280] block">SUGAR</span>
                <span className="font-mono text-xs text-[#F3F3F0]">0 g</span>
              </div>
              <div className="bg-[#0C0E10] border border-[#1A1E23] py-2 px-1">
                <span className="font-mono text-[9px] text-[#6B7280] block">CALORIES</span>
                <span className="font-mono text-xs text-[#F3F3F0]">5 kcal</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pack Configuration & Purchase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-[#8E9399] tracking-[0.25em] uppercase">
                  ANTI-ENERGY DRINK
                </span>
                <span className="text-[#383D45]">•</span>
                <span className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase">
                  IN STOCK • BATCH 04
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F3F3F0] tracking-wide uppercase">
                MUTE ANTI-ENERGY DRINK
              </h3>

              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-mono text-2xl sm:text-3xl text-white font-medium">
                  ${selectedPack.price.toFixed(2)}
                </span>
                <span className="font-mono text-xs text-[#8E9399]">
                  (${(selectedPack.price / selectedPack.unitCount).toFixed(2)} / can)
                </span>
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="space-y-3">
              <label className="font-mono text-[11px] text-[#8E9399] uppercase tracking-widest flex items-center justify-between">
                <span>PACK FORMATS</span>
                {selectedPack.freeShipping && (
                  <span className="text-emerald-400 text-[10px]">Free Carbon-Neutral Shipping</span>
                )}
              </label>

              <div className="grid grid-cols-2 gap-3">
                {MUTE_PRODUCT.packs.map((pack) => {
                  const isSelected = selectedPack.id === pack.id;
                  return (
                    <button
                      key={pack.id}
                      type="button"
                      onClick={() => setSelectedPack(pack)}
                      className={`relative p-3.5 sm:p-4 text-left border transition-all ${
                        isSelected
                          ? 'border-[#F3F3F0] bg-[#14171A] shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                          : 'border-[#20242A] bg-[#0A0C0E] hover:border-[#2E343D]'
                      }`}
                    >
                      {pack.popular && (
                        <span className="absolute -top-2.5 right-3 bg-[#F3F3F0] text-[#050607] text-[9px] font-mono tracking-widest px-2 py-0.5 font-bold uppercase">
                          MOST POPULAR
                        </span>
                      )}
                      {pack.bestValue && (
                        <span className="absolute -top-2.5 right-3 bg-emerald-500 text-black text-[9px] font-mono tracking-widest px-2 py-0.5 font-bold uppercase">
                          BEST VALUE
                        </span>
                      )}

                      <div className="font-medium text-xs sm:text-sm text-[#F3F3F0] tracking-wide mb-1">
                        {pack.name}
                      </div>
                      <div className="text-[11px] text-[#8E9399] font-mono">
                        ${pack.price.toFixed(2)} (${pack.pricePerCan.toFixed(2)}/can)
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sensory & Guarantee Notes */}
            <div className="pt-2 text-[11px] font-mono text-[#5A606A] space-y-1.5 border-t border-[#14171A]">
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-[#8E9399]" />
                <span>Zero unverified medical claims. Crafted around the ritual of pause.</span>
              </div>
              <p>Discreet recyclable packaging • 30-Day Stillness Guarantee</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
