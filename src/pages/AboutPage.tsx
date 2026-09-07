import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';
import { JoinDropModal } from '../components/common/JoinDropModal';

export const AboutPage: React.FC = () => {
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);

  return (
    <div className="pt-28 pb-24 bg-[#050607] text-[#F3F3F0]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20 sm:space-y-28">
        {/* Hero Manifesto Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="space-y-6 text-center max-w-3xl mx-auto"
        >
          <h1 className="font-display font-light text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F3F3F0] uppercase leading-[1.08]">
            WE DIDN’T NEED ANOTHER ENERGY DRINK. <br />
            <span className="text-white font-normal drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
              WE NEEDED THE OPPOSITE.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#8E9399] font-light max-w-xl mx-auto leading-relaxed">
            In a culture obsessed with artificial stimulation and speed, MUTE was built as an antidote: a 10-minute physical boundary against cognitive burnout.
          </p>
        </motion.div>

        {/* Cinematic Imagery Banner */}
        <div className="relative aspect-[21/9] bg-[#0A0C0E] border border-[#1A1E23] overflow-hidden group">
          <img
            src="./images/mute-ritual.jpg"
            alt="MUTE Anti-Energy Drink Still Life"
            className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050607] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#8E9399] tracking-widest uppercase">
            ARCHIVE 01 // THE STILLNESS COMPOSITION
          </div>
        </div>

        {/* Narrative Section 1: The Modern Acceleration Trap */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-t border-[#14171A] pt-16">
          <div className="md:col-span-4">
            <h2 className="font-display text-xl sm:text-2xl font-light text-[#F3F3F0] uppercase tracking-wide">
              THE NOISE TAX
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6 text-sm sm:text-base text-[#8E9399] font-light leading-relaxed">
            <p className="text-[#D1D5DB] text-lg font-normal">
              Every interface in our pocket is engineered to demand more speed, more dopamine, and continuous engagement.
            </p>
            <p>
              When we feel fatigued or mentally overwhelmed, the cultural instinct is to consume 300 milligrams of caffeine, sugar, and synthetic stimulants to push through. We treat our minds like computational servers that can never afford a single millisecond of downtime.
            </p>
            <p>
              The result is a chronic state of fight-or-flight: elevated heart rates, fractured attention spans, and shallow breathing.
            </p>
          </div>
        </div>

        {/* Can Presentation & Join First Drop Callout */}
        <div className="bg-[#0A0C0E] border border-[#2A2F36] p-10 sm:p-16 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
          {/* Subtle Ambient Back Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[360px] aspect-[4/5] flex items-center justify-center">
            <img
              src="acef6708-1602-482e-8f55-f852a8635f50.png"
              alt="MUTE Anti-Energy Drink Can"
              className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
            />
          </div>

          <div className="pt-2 relative z-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsDropModalOpen(true)}
              icon={<ArrowRight size={14} />}
            >
              JOIN FIRST DROP
            </Button>
          </div>
        </div>
      </div>

      {/* Join First Drop Modal */}
      <JoinDropModal
        isOpen={isDropModalOpen}
        onClose={() => setIsDropModalOpen(false)}
      />
    </div>
  );
};
