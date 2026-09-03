import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { Button } from '../common/Button';

export const ShutdownExperience: React.FC = () => {
  const { playChime, isPlaying, toggleSound } = useSound();

  // Mode: 10 minutes (600s) or 30s Quick Preview
  const [durationMode, setDurationMode] = useState<'10min' | '30sec'>('10min');
  const totalSeconds = durationMode === '10min' ? 600 : 30;

  const [secondsLeft, setSecondsLeft] = useState<number>(totalSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (!isActive && !isCompleted) {
      setSecondsLeft(totalSeconds);
    }
  }, [durationMode, totalSeconds, isActive, isCompleted]);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsActive(false);
            setIsCompleted(true);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, playChime]);

  // Sync current step based on elapsed time percentage
  useEffect(() => {
    if (isActive) {
      const elapsed = totalSeconds - secondsLeft;
      const progress = elapsed / totalSeconds;
      const step = Math.min(4, Math.floor(progress * 5));
      setActiveStepIndex(step);
    }
  }, [secondsLeft, totalSeconds, isActive]);

  const handleStart = () => {
    setIsCompleted(false);
    setSecondsLeft(totalSeconds);
    setIsActive(true);
    if (!isPlaying) {
      toggleSound();
    }
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsCompleted(false);
    setSecondsLeft(totalSeconds);
    setActiveStepIndex(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const steps = [
    { number: '01', title: 'PUT IT DOWN', desc: 'Step away from the screen.' },
    { number: '02', title: 'OPEN MUTE', desc: 'Take your pause.' },
    { number: '03', title: 'BREATHE', desc: 'Let the noise disappear.' },
    { number: '04', title: 'RESET', desc: 'Ten minutes for yourself.' },
    { number: '05', title: 'RETURN', desc: 'Come back when you’re ready.' },
  ];

  const progressPercentage = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <section
      id="shutdown-system"
      className="py-24 sm:py-36 bg-[#030405] text-[#F3F3F0] relative overflow-hidden border-y border-[#121518]"
    >
      {/* Ambient background glow ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-radial-vignette pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="font-mono text-[10px] sm:text-xs text-[#8E9399] tracking-[0.35em] uppercase">
            03 / THE RITUAL
          </p>
          <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#F3F3F0] uppercase">
            THE 10-MINUTE SYSTEM SHUTDOWN.
          </h2>
          <p className="text-sm text-[#8E9399] font-light">
            Your day doesn’t need another notification.
          </p>
        </div>

        {/* Interactive Experience Card */}
        <div className="max-w-3xl mx-auto bg-[#0A0C0E] border border-[#20242A] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Top selector for Test/Real duration */}
          <div className="flex items-center justify-between pb-6 border-b border-[#14171A]">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8E9399] uppercase">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-[#383D45]'}`} />
              <span>{isActive ? 'SHUTDOWN IN PROGRESS' : isCompleted ? 'SHUTDOWN COMPLETE' : 'SYSTEM READY'}</span>
            </div>

            <div className="flex items-center gap-1 bg-[#14171A] p-1 border border-[#2A2F36]">
              <button
                type="button"
                onClick={() => {
                  if (!isActive) {
                    setDurationMode('10min');
                  }
                }}
                disabled={isActive}
                className={`px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                  durationMode === '10min' ? 'bg-[#F3F3F0] text-[#050607] font-semibold' : 'text-[#8E9399] hover:text-[#F3F3F0]'
                }`}
              >
                10 MIN (Standard)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!isActive) {
                    setDurationMode('30sec');
                  }
                }}
                disabled={isActive}
                className={`px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                  durationMode === '30sec' ? 'bg-[#F3F3F0] text-[#050607] font-semibold' : 'text-[#8E9399] hover:text-[#F3F3F0]'
                }`}
                title="Quick 30s demonstration mode"
              >
                30s Demo
              </button>
            </div>
          </div>

          {/* Central Timer & Breathing Visualizer */}
          <div className="py-12 sm:py-16 flex flex-col items-center justify-center text-center relative">
            {/* Breathing Ring Animation */}
            {isActive && (
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-white/20 pointer-events-none"
              />
            )}

            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="inline-flex p-3 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 mb-2">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-[0.2em] text-white">
                    SYSTEM RESTORED.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E9399] font-light max-w-sm mx-auto">
                    Your baseline is quiet. Carry this stillness into your next moment.
                  </p>
                  <div className="pt-4">
                    <Button variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw size={12} />}>
                      RESET PAUSE
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="font-mono font-light text-5xl sm:text-7xl tracking-tighter text-[#F3F3F0]">
                    {formatTime(secondsLeft)}
                  </div>
                  <p className="font-mono text-xs text-[#8E9399] tracking-[0.3em] uppercase">
                    {isActive ? 'IN THE PAUSE — BREATHE' : 'SHUT DOWN'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Controls */}
            {!isCompleted && (
              <div className="pt-8 flex items-center justify-center gap-4">
                {!isActive ? (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleStart}
                    icon={<Play size={14} />}
                  >
                    START YOUR 10 MINUTES →
                  </Button>
                ) : (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={handleStop}
                      icon={<Square size={13} />}
                    >
                      PAUSE
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleReset}
                      icon={<RotateCcw size={13} />}
                    >
                      RESET
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Ambient Sound Reminder */}
            {isActive && (
              <p className="text-[11px] font-mono text-[#5A606A] mt-6 flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>Subtle ambient frequency enabled. Focus softly on your breath.</span>
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {isActive && (
            <div className="w-full bg-[#14171A] h-1 mb-8 overflow-hidden rounded-full">
              <div
                className="h-full bg-gradient-to-r from-[#8E9399] to-white transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}

          {/* 5-Step Timeline */}
          <div className="border-t border-[#14171A] pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2">
              {steps.map((step, idx) => {
                const isCurrent = isActive && activeStepIndex === idx;
                const isDone = isActive && activeStepIndex > idx;

                return (
                  <div
                    key={step.number}
                    className={`p-3 border transition-all duration-300 ${
                      isCurrent
                        ? 'border-[#F3F3F0] bg-[#14171A]'
                        : isDone
                        ? 'border-[#2A2F36] opacity-60'
                        : 'border-[#181B1F] bg-transparent opacity-40'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-[#8E9399] tracking-widest block mb-1">
                      {step.number}
                    </span>
                    <h4 className="font-mono text-xs text-[#F3F3F0] tracking-wider mb-1">
                      {step.title}
                    </h4>
                    <p className="text-[11px] text-[#8E9399] font-light leading-snug">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
