import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050607] pt-28 pb-12 px-6 sm:px-8 lg:px-12">
      {/* Background Cinematic Radial Lighting & Pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.5, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full bg-gradient-to-tr from-white/[0.03] via-transparent to-white/[0.01] blur-3xl pointer-events-none"
      />

      {/* Atmospheric Dark Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[540px] md:w-[620px] h-[380px] sm:h-[540px] md:h-[620px] rounded-full border border-white/[0.04] pointer-events-none" />

      {/* Top Editorial Subtitle Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.2 }}
        className="text-center z-10"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#1F242B] bg-[#0E1013]/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#8E9399]">
            The 10-Minute System Shutdown
          </span>
        </div>
      </motion.div>

      {/* Hero Center Grid: Headline & Can Presentation */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8 relative z-10">
        {/* Left Headline & Typography */}
        <div className="lg:col-span-6 text-center lg:text-left space-y-6 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3"
          >
            <h1 className="font-display font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[1.05] text-[#F3F3F0]">
              THE WORLD <br className="hidden sm:inline" />
              WON’T STOP <br className="hidden sm:inline" />
              <span className="font-normal text-white drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">
                TALKING.
              </span>
            </h1>

            <h2 className="font-display font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] leading-[1.05] text-[#8E9399]">
              BUT YOU CAN <br className="hidden sm:inline" />
              <span className="text-[#C5C9D0] italic font-serif">
                STOP LISTENING.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1.2 }}
            className="text-xs sm:text-sm text-[#8E9399] font-light max-w-md mx-auto lg:mx-0 leading-relaxed tracking-wide"
          >
            MUTE is not an energy drink. It is an intentional pause designed to downshift your nervous system, quiet mental chatter, and reclaim ten minutes of stillness.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/shop')}
              icon={<ArrowRight size={14} />}
            >
              SHOP MUTE
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('shutdown-system')}
            >
              DISCOVER THE SYSTEM
            </Button>
          </motion.div>

          {/* Minimal Specs Subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.0, duration: 1.0 }}
            className="pt-4 flex items-center justify-center lg:justify-start gap-6 font-mono text-[10px] tracking-widest text-[#5A606A] uppercase"
          >
            <span>250 ML CAN</span>
            <span>•</span>
            <span>0G SUGAR</span>
            <span>•</span>
            <span>100% CAFFEINE-FREE</span>
          </motion.div>
        </div>

        {/* Right Hero Can Presentation */}
        <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 relative">
          {/* Subtle Ambient Back Glow behind can */}
          <div className="absolute w-[320px] sm:w-[440px] h-[320px] sm:h-[440px] rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

          {/* Hero Can Reveal Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[440px] aspect-[4/5] flex items-center justify-center group"
          >
            <img
              src="./images/mute-can.jpg"
              alt="MUTE Anti-Energy Drink Can Hero"
              className="w-full h-full object-contain filter contrast-110 drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-1000 ease-out select-none"
              loading="eager"
            />

            {/* Floating Specs Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.4, duration: 1.0 }}
              className="absolute -right-2 sm:right-0 top-1/4 bg-[#0E1013]/85 backdrop-blur-md border border-[#20242A] px-3.5 py-2 hidden sm:block shadow-xl"
            >
              <p className="font-mono text-[9px] text-[#8E9399] tracking-widest uppercase">FORMULATION</p>
              <p className="text-xs font-mono text-[#F3F3F0] font-medium">L-THEANINE + BOTANICALS</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.6, duration: 1.0 }}
              className="absolute -left-2 sm:left-0 bottom-1/4 bg-[#0E1013]/85 backdrop-blur-md border border-[#20242A] px-3.5 py-2 hidden sm:block shadow-xl"
            >
              <p className="font-mono text-[9px] text-[#8E9399] tracking-widest uppercase">EFFECT</p>
              <p className="text-xs font-mono text-[#F3F3F0] font-medium">10-MIN NERVOUS DOWN-SHIFT</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1.0 }}
        className="flex flex-col items-center justify-center text-center z-10"
      >
        <button
          type="button"
          onClick={() => scrollToSection('brand-statement')}
          className="text-[#5A606A] hover:text-[#F3F3F0] transition-colors flex flex-col items-center gap-1.5 focus:outline-none"
          aria-label="Scroll down to brand statement"
        >
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase">SCROLL FOR STILLNESS</span>
          <ChevronDown size={14} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
};
