import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export const AboutPage: React.FC = () => {
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
          <span className="font-mono text-[10px] sm:text-xs text-[#8E9399] tracking-[0.4em] uppercase border-b border-[#2A2F36] pb-1">
            01 // THE MANIFESTO
          </span>

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
            <span className="font-mono text-xs text-[#8E9399] tracking-widest block mb-2">
              01 / THE CONTEXT
            </span>
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

        {/* Narrative Section 2: The Anti-Energy Approach */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-t border-[#14171A] pt-16">
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-[#8E9399] tracking-widest block mb-2">
              02 / THE INVERSION
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-light text-[#F3F3F0] uppercase tracking-wide">
              FOUR PRINCIPLES
            </h2>
          </div>

          <div className="md:col-span-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0A0C0E] border border-[#1A1E23] p-6 space-y-2">
                <h3 className="font-mono text-sm text-[#F3F3F0] font-medium uppercase tracking-wider">
                  01 // LESS.
                </h3>
                <p className="text-xs text-[#8E9399] font-light leading-relaxed">
                  Fewer ingredients, zero synthetic dyes, zero artificial sweeteners, zero empty filler.
                </p>
              </div>

              <div className="bg-[#0A0C0E] border border-[#1A1E23] p-6 space-y-2">
                <h3 className="font-mono text-sm text-[#F3F3F0] font-medium uppercase tracking-wider">
                  02 // QUIETER.
                </h3>
                <p className="text-xs text-[#8E9399] font-light leading-relaxed">
                  No hype slogans, no loud neon graphics. A sleek matte can that honors your focus.
                </p>
              </div>

              <div className="bg-[#0A0C0E] border border-[#1A1E23] p-6 space-y-2">
                <h3 className="font-mono text-sm text-[#F3F3F0] font-medium uppercase tracking-wider">
                  03 // SLOWER.
                </h3>
                <p className="text-xs text-[#8E9399] font-light leading-relaxed">
                  A micro-sparkle botanical beverage meant to be sipped deliberately across 10 minutes.
                </p>
              </div>

              <div className="bg-[#0A0C0E] border border-[#1A1E23] p-6 space-y-2">
                <h3 className="font-mono text-sm text-[#F3F3F0] font-medium uppercase tracking-wider">
                  04 // INTENTIONAL.
                </h3>
                <p className="text-xs text-[#8E9399] font-light leading-relaxed">
                  A tangible cue to disconnect your screen and downshift your parasympathetic tone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Climax Quote Callout */}
        <div className="bg-[#0A0C0E] border border-[#2A2F36] p-10 sm:p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 max-w-2xl mx-auto">
            <h3 className="font-display font-light text-2xl sm:text-4xl text-[#F3F3F0] uppercase tracking-wide leading-snug">
              THE WORLD WON’T STOP TALKING. <br />
              <span className="font-serif italic text-[#8E9399]">
                BUT YOU CAN STOP LISTENING.
              </span>
            </h3>

            <p className="text-xs sm:text-sm text-[#8E9399] font-light pt-2">
              Join thousands of creators, engineers, and deep thinkers reclaiming their 10-minute pause.
            </p>
          </div>

          <div className="pt-4 relative z-10">
            <Link to="/shop">
              <Button variant="primary" size="lg" icon={<ArrowRight size={14} />}>
                EXPERIENCE MUTE
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
