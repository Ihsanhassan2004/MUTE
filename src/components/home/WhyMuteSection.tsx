import React from 'react';
import { motion } from 'framer-motion';

export const WhyMuteSection: React.FC = () => {
  return (
    <section id="why-mute" className="py-24 sm:py-36 bg-[#050607] text-[#F3F3F0] relative overflow-hidden border-t border-[#14171A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="font-mono text-[10px] sm:text-[11px] text-[#8E9399] tracking-[0.35em] uppercase">
            06 / CONTRAST
          </p>
          <h2 className="font-display font-light text-3xl sm:text-5xl tracking-tight text-[#F3F3F0] uppercase">
            NOT EVERY MOMENT NEEDS MORE.
          </h2>
          <p className="text-xs sm:text-sm text-[#8E9399] font-light">
            We are over-stimulated, constantly connected, and artificially accelerated. Here is the alternative.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: MORE NOISE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-10 bg-[#0A0C0E] border border-[#1A1E23] space-y-6 opacity-60 hover:opacity-80 transition-opacity"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                THE REALITY
              </span>
              <h3 className="font-display text-xl font-light tracking-wider text-[#A1A6AD] uppercase">
                MORE NOISE
              </h3>
            </div>

            <ul className="space-y-4 font-mono text-xs text-[#8E9399]">
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#4A4E54] rounded-full" />
                <span>More notifications.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#4A4E54] rounded-full" />
                <span>More scrolling.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#4A4E54] rounded-full" />
                <span>More stimulation.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#4A4E54] rounded-full" />
                <span>Endless synthetic adrenaline.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#14171A] font-mono text-[10px] text-[#4A4E54] uppercase">
              STATUS QUO
            </div>
          </motion.div>

          {/* Column 2: THE PAUSE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="p-8 sm:p-10 bg-[#0E1013] border border-[#252A30] space-y-6"
          >
            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                THE INTENTION
              </span>
              <h3 className="font-display text-xl font-medium tracking-wider text-[#D1D5DB] uppercase">
                THE PAUSE
              </h3>
            </div>

            <ul className="space-y-4 font-mono text-xs text-[#C5C9D0]">
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#8E9399] rounded-full" />
                <span>Step away.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#8E9399] rounded-full" />
                <span>Put it down.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#8E9399] rounded-full" />
                <span>Take ten.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#8E9399] rounded-full" />
                <span>Quiet the nervous system.</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#1C2025] font-mono text-[10px] text-[#8E9399] uppercase">
              BEHAVIORAL HABIT
            </div>
          </motion.div>

          {/* Column 3: MUTE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="p-8 sm:p-10 bg-[#121519] border border-[#383D45] space-y-6 relative shadow-[0_0_30px_rgba(255,255,255,0.03)]"
          >
            <div className="absolute top-4 right-4 bg-[#F3F3F0] text-[#050607] font-mono text-[9px] font-bold px-2 py-0.5 tracking-widest uppercase">
              THE SOLUTION
            </div>

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
                THE VESSEL
              </span>
              <h3 className="font-display text-xl font-bold tracking-wider text-white uppercase">
                MUTE
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#D1D5DB] font-light leading-relaxed">
              A physical beverage built around the pause.
            </p>

            <ul className="space-y-3 font-mono text-xs text-[#F3F3F0]">
              <li className="flex items-center gap-2 text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span>L-Theanine Botanical Elixir</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span>100% Caffeine & Sugar Free</span>
              </li>
              <li className="flex items-center gap-2 text-white">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                <span>Sensory Reset Ritual</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-[#2A2F36] font-mono text-[10px] text-white tracking-widest uppercase">
              THE ANTI-ENERGY STANDARD
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
