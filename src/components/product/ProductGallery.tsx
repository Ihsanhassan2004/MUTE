import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MUTE_PRODUCT } from '../../data/product';

export const ProductGallery: React.FC = () => {
  const images = [
    { id: 'hero', src: MUTE_PRODUCT.images.hero, label: 'Hero Can Profile', subtitle: 'Studio Can on Dark Slate' },
    { id: 'macro', src: MUTE_PRODUCT.images.macro, label: 'Macro Condensation', subtitle: 'Aluminum Finish & Water Beads' },
    { id: 'ritual', src: MUTE_PRODUCT.images.ritual, label: 'Still Life Composition', subtitle: 'Calm Environment Setup' },
  ];

  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Large Visual Stage */}
      <div className="relative aspect-[4/5] bg-[#0A0C0E] border border-[#1F242B] flex items-center justify-center p-6 sm:p-12 overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage.id}
            src={activeImage.src}
            alt={activeImage.label}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)] select-none"
          />
        </AnimatePresence>

        {/* Ambient Dark Glow */}
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        {/* Corner Brand Mark */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-[#8E9399] tracking-[0.25em] uppercase">
          MUTE® // 250 ML
        </div>

        {/* Current Image Caption */}
        <div className="absolute bottom-4 right-4 bg-[#0E1013]/90 backdrop-blur-md border border-[#20242A] px-3 py-1.5 text-right">
          <p className="font-mono text-[9px] text-[#8E9399] tracking-widest uppercase">
            {activeImage.label}
          </p>
          <p className="text-[10px] text-[#F3F3F0] font-light">
            {activeImage.subtitle}
          </p>
        </div>
      </div>

      {/* Thumbnails Row */}
      <div className="grid grid-cols-3 gap-3">
        {images.map((img) => {
          const isSelected = activeImage.id === img.id;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative aspect-[4/3] bg-[#0A0C0E] border transition-all overflow-hidden p-2 flex items-center justify-center ${
                isSelected
                  ? 'border-[#F3F3F0] shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                  : 'border-[#1A1E23] opacity-60 hover:opacity-100 hover:border-[#2E343D]'
              }`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover filter contrast-105"
              />
              <span className="absolute bottom-1 left-1 bg-[#050607]/80 text-[8px] font-mono tracking-wider px-1 text-[#8E9399] uppercase">
                {img.id}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
