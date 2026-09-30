import React from 'react';
import { motion } from 'framer-motion';

export const WhatIsMute: React.FC = () => {
  return (
    <section id="what-is-mute" className="py-24 sm:py-36 bg-[#050607] text-[#F3F3F0] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] bg-[#0E1012] border border-[#20242A] overflow-hidden group flex items-center justify-center p-4 sm:p-6">
              <img
                src="./images/mute-can.jpg"
                alt="MUTE Anti-Energy Drink Can"
                className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#8E9399] uppercase">
                <span>MUTE® </span>
                <span>250 ML </span>
              </div>
            </div>

            {/* Accent Shadow box */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-white/[0.05] pointer-events-none -z-10 hidden sm:block" />
          </motion.div>

          {/* Right Column: Editorial Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#F3F3F0] uppercase">
                WHAT IS MUTE?
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#8E9399] font-light leading-relaxed">
              <p className="text-[#D1D5DB] text-lg sm:text-xl font-normal leading-snug">
                MUTE is india's first anti-energy drink crafted for developers, founders, and deep-workers who need clarity, not jitters.
              </p>

              <div className="border-l-2 border-[#2A2F36] pl-6 space-y-2 py-1 italic font-serif text-[#C5C9D0]">
                <p>Zero Caffeine, Zero Crash: No artificial spikes or anxiety.</p>
                <p>Grounded Mental Clarity: Calms your nervous system instantly.</p>
                <p>The 10-Minute Reset: Crack the can, step away from the noise, and get into the zone</p>
              </div>

              <p><br></br>
                0 Caffeine | 0g Sugar | 0 Synthetic Stimulants | 100% Calm, Deep-Work & Focus.</p>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};
