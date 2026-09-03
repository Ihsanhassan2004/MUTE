import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const WhatIsMute: React.FC = () => {
  return (
    <section className="py-24 sm:py-36 bg-[#050607] text-[#F3F3F0] relative overflow-hidden">
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
            <div className="relative aspect-[4/5] bg-[#0E1012] border border-[#20242A] overflow-hidden group">
              <img
                src="/images/mute-macro.jpg"
                alt="MUTE Anti-Energy Drink Can Detail"
                className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050607]/80 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#8E9399] uppercase">
                <span>DETAIL 01 // TEXTURE</span>
                <span>250 ML / BOTANICALS</span>
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
              <p className="font-mono text-[10px] sm:text-[11px] text-[#8E9399] tracking-[0.35em] uppercase mb-3">
                02 / PHILOSOPHY
              </p>
              <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#F3F3F0] uppercase">
                WHAT IS MUTE?
              </h2>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#8E9399] font-light leading-relaxed">
              <p className="text-[#D1D5DB] text-lg sm:text-xl font-normal leading-snug">
                MUTE is an anti-energy drink created for the moments when you don’t need more stimulation.
              </p>

              <div className="border-l-2 border-[#2A2F36] pl-6 space-y-2 py-1 italic font-serif text-[#C5C9D0]">
                <p>You don’t always need to go faster.</p>
                <p>You don’t always need to do more.</p>
                <p className="text-white font-normal not-italic font-sans">Sometimes you need to pause.</p>
              </div>

              <p>
                MUTE is built around the idea of a short intentional shutdown — a physical and mental ritual to step away from the noise, put down the phone, and reset your baseline without synthetic stimulants or jitters.
              </p>
            </div>

            {/* Editorial highlights */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#181B1F]">
              <div>
                <span className="font-mono text-[10px] text-[#5A606A] tracking-widest uppercase block mb-1">
                  TARGET SENSATION
                </span>
                <p className="text-xs sm:text-sm font-mono text-[#F3F3F0]">
                  Grounded Mental Clarity
                </p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-[#5A606A] tracking-widest uppercase block mb-1">
                  RITUAL DURATION
                </span>
                <p className="text-xs sm:text-sm font-mono text-[#F3F3F0]">
                  10 Minutes Stillness
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/about">
                <Button variant="outline" size="md" icon={<ArrowRight size={13} />}>
                  READ THE FULL MANIFESTO
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
