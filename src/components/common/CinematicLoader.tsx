import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'intro' | 'subtitle' | 'exit'>('intro');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Show wordmark → subtitle → exit
    timers.push(setTimeout(() => setPhase('subtitle'), 900));
    timers.push(setTimeout(() => setPhase('exit'), 1800));
    timers.push(
      setTimeout(() => {
        setVisible(false);
        timers.push(setTimeout(onComplete, 600));
      }, 1800),
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ background: '#050607' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px',
              mixBlendMode: 'overlay',
              opacity: 0.45,
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #050607 100%)',
            }}
          />

          {/* MUTE wordmark */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-display font-light uppercase block"
                style={{
                  fontSize: 'clamp(3rem, 9vw, 6rem)',
                  color: '#F3F3F0',
                  letterSpacing: '0.45em',
                }}
              >
                MUTE
              </span>
              {/* Light sweep shimmer */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.3) 50%, transparent 65%)',
                }}
                initial={{ x: '-120%' }}
                animate={{ x: '220%' }}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.3 }}
              />
            </motion.div>

            {/* Divider line */}
            <motion.div
              className="origin-center"
              style={{ height: 1, background: 'rgba(243,243,240,0.15)' }}
              initial={{ scaleX: 0, opacity: 0, width: '6rem' }}
              animate={{ scaleX: 1, opacity: 1, width: '6rem' }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Subtitles */}
            <AnimatePresence>
              {(phase === 'subtitle' || phase === 'exit') && (
                <motion.div
                  key="subtitle"
                  className="flex flex-col items-center gap-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.45em] uppercase"
                    style={{ color: '#6B7280' }}
                  >
                    THE ART OF SILENCE
                  </span>

                </motion.div>
              )}
            </AnimatePresence>
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
};
