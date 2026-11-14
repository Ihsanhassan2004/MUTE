import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const TABS = [
  {
    id: '01',
    label: 'DEVELOPER',
    role: 'Developer',
    pain: {
      title: 'THE 11:30 PM BUG & THE 4 PM SLUMP',
      desc: 'Third coffee, racing heart, scattered tab-switching and wrecked REM sleep after a late deploy.',
    },
    mode: {
      headline: 'PRECISION FOCUS LOCK.\nNO CAFFEINE CRASH.',
      desc: 'Clinical L-Tyrosine + B-Vitamins lock your brain into 90 minutes of unbroken laser focus for complex logic, system architecture, and deep debugging.',
      cta: 'LOCK IN THE DEV 4-PACK (₹599)',
    },
  },
  {
    id: '02',
    label: 'GAMER',
    role: 'Gamer',
    pain: {
      title: 'FINAL-CIRCLE SHAKY AIM',
      desc: 'Sugar-heavy energy drinks bring sweaty palms, shaky aim and post-match tilt.',
    },
    mode: {
      headline: 'ALL-GENRE DEEP FOCUS.\nZERO CRASH.',
      desc: "Whether you're holding pixel-tight angles in competitive FPS or locking into hours of deep tactical focus across open-world, RPG, and strategy marathons — zero eye fatigue, zero crash.",
      cta: 'UNLOCK THE GAMING 4-PACK (₹599)',
    },
  },
  {
    id: '03',
    label: 'FOUNDER',
    role: 'Founder',
    pain: {
      title: 'DECISION FATIGUE AT 4 PM',
      desc: 'Borrowed energy leaves you wired and anxious right when you need deep strategic work.',
    },
    mode: {
      headline: 'EXECUTIVE FOCUS ENGINE.\nHIGH-STAKES CLARITY.',
      desc: 'Paired with L-Tyrosine + L-Theanine to drive relentless, tunnel-vision focus — keeping your brain locked into high-stakes execution and strategy for 90+ minutes straight.',
      cta: 'RESERVE FOUNDER ALLOCATION (₹599)',
    },
  },
  {
    id: '04',
    label: 'STUDENT',
    role: 'Student',
    pain: {
      title: 'THE 2:00 AM EXAM-PREP LOOP',
      desc: 'Reading the same line five times while late-night coffee eats the sleep your memory needs.',
    },
    mode: {
      headline: 'FOCUS LOCK.\nZERO SLEEP DEBT.',
      desc: 'L-Theanine + L-Tyrosine sustains deep cognitive focus and faster concept absorption so your mind never wanders mid-chapter.',
      cta: 'CLAIM STUDENT STUDY PACK (₹599)',
    },
  },
  {
    id: '05',
    label: 'CREATOR',
    role: 'Creator',
    pain: {
      title: 'THE 3 AM EDITING BLOCK & CREATIVE BURNOUT',
      desc: 'Staring at a 4K timeline for 6 hours while sugary drinks spike your anxiety and kill your creative flow.',
    },
    mode: {
      headline: 'UNBROKEN CREATIVE FLOW.\nZERO BRAIN FOG.',
      desc: 'Clean nootropics that silence creative resistance and lock you into 90-minute hyper-focused editing and scripting sessions. L-Tyrosine + Magnesium Glycinate clear out mental clutter so you can power through colour grading, sound design, and scriptwriting with absolute clarity.',
      cta: 'UNLOCK THE CREATOR PACK (₹599)',
    },
  },
];

interface OperatingModeProps {
  selectedRole?: string;
}

export const OperatingMode: React.FC<OperatingModeProps> = ({ selectedRole }) => {
  const [active, setActive] = useState(0);

  // Keep the content panel in sync with the role selected in the hero.
  useEffect(() => {
    if (!selectedRole) return;
    const idx = TABS.findIndex((t) => t.role === selectedRole);
    if (idx !== -1) setActive(idx);
  }, [selectedRole]);

  const tab = TABS[active];

  return (
    <section
      id="operating-mode"
      className="bg-[#050607] py-20 sm:py-28 px-6 sm:px-8 lg:px-12 border-t border-[#0E1013]"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#F3F3F0] uppercase leading-none">
            ENGINEERED FOR HIGH-OUTPUT MINDS.
          </h2>
          <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#5A606A] uppercase leading-none">
            SELECT YOUR OPERATING MODE.
          </h3>
        </motion.div>

        {/* Tab Buttons Row — Clean Headings with White Selection Animation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {TABS.map((t, i) => {
            const isActive = active === i;
            return (
              <motion.button
                key={t.id}
                type="button"
                onClick={() => setActive(i)}
                whileTap={{ scale: 0.98 }}
                className={`relative px-4 py-3.5 rounded-sm font-mono text-[11px] sm:text-xs tracking-widest uppercase transition-all duration-300 text-center cursor-pointer border overflow-hidden ${isActive
                  ? 'border-white text-white bg-[#14171A] shadow-[0_0_20px_rgba(255,255,255,0.14)] font-medium'
                  : 'border-[#1F242B] text-[#717680] bg-[#07090B]/60 hover:border-[#383E47] hover:text-[#F3F3F0]'
                  }`}
              >
                {/* Subtle top indicator for active tab */}
                {isActive && (
                  <motion.span
                    layoutId="activeTabGlow"
                    className="absolute inset-0 border border-white rounded-sm pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 border border-[#1A1E24] bg-[#07090B] overflow-hidden"
          >
            {/* Left — Pain Point */}
            <div className="p-8 sm:p-10 border-b md:border-b-0 md:border-r border-[#1A1E24] space-y-4">

              <h4 className="font-display font-black text-lg sm:text-xl text-[#F3F3F0] uppercase leading-snug">
                {tab.pain.title}
              </h4>
              <p className="text-sm text-[#8E9399] font-light leading-relaxed">
                {tab.pain.desc}
              </p>
            </div>

            {/* Right — Operating Mode */}
            <div className="p-8 sm:p-10 space-y-5">

              <h4 className="font-display font-black text-2xl sm:text-3xl text-[#F3F3F0] uppercase leading-tight whitespace-pre-line">
                {tab.mode.headline}
              </h4>
              <p className="text-sm text-[#8E9399] font-light leading-relaxed">
                {tab.mode.desc}
              </p>
              <motion.button
                type="button"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="inline-flex items-center gap-2 px-5 py-3 border border-[#F3F3F0] text-[#F3F3F0] font-mono text-[11px] tracking-widest uppercase hover:bg-[#F3F3F0] hover:text-[#050607] transition-colors duration-200 group"
              >
                {tab.mode.cta}
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
