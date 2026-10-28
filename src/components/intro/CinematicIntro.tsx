import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, Layers, HelpCircle, CheckCircle, SkipForward } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface CinematicIntroProps {
  onComplete: () => void;
}

type Stage = 'background' | 'logo' | 'learning_transform' | 'fadeout';

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const { reducedMotion } = useTheme();
  const [stage, setStage] = useState<Stage>('background');
  const [transformStep, setTransformStep] = useState<number>(0);

  // If user prefers reduced motion, complete immediately
  useEffect(() => {
    if (reducedMotion) {
      onComplete();
    }
  }, [reducedMotion, onComplete]);

  // Stage progression timer (approx 2.8 seconds total)
  useEffect(() => {
    if (reducedMotion) return;

    // Stage 1 -> Stage 2 after 450ms
    const timer1 = setTimeout(() => {
      setStage('logo');
    }, 450);

    // Stage 2 -> Stage 3 (AI learning transformation) after 1100ms
    const timer2 = setTimeout(() => {
      setStage('learning_transform');
    }, 1100);

    // Transform cycle steps
    const stepTimer1 = setTimeout(() => setTransformStep(1), 1400); // concepts
    const stepTimer2 = setTimeout(() => setTransformStep(2), 1750); // flashcards
    const stepTimer3 = setTimeout(() => setTransformStep(3), 2100); // quiz
    const stepTimer4 = setTimeout(() => setTransformStep(4), 2450); // success

    // Stage 4 -> Finish after 2850ms
    const finishTimer = setTimeout(() => {
      setStage('fadeout');
      setTimeout(onComplete, 400);
    }, 2850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      clearTimeout(stepTimer4);
      clearTimeout(finishTimer);
    };
  }, [reducedMotion, onComplete]);

  const handleSkip = () => {
    setStage('fadeout');
    setTimeout(onComplete, 200);
  };

  const transformStages = [
    { label: 'Raw Study Notes', icon: <FileText className="w-5 h-5 text-indigo-400" />, color: 'from-blue-500/20 to-indigo-500/20' },
    { label: 'Smart Concepts Extracted', icon: <Sparkles className="w-5 h-5 text-cyan-400" />, color: 'from-cyan-500/20 to-blue-500/20' },
    { label: 'Interactive Flashcards', icon: <Layers className="w-5 h-5 text-violet-400" />, color: 'from-violet-500/20 to-purple-500/20' },
    { label: 'Adaptive Quiz Ready', icon: <HelpCircle className="w-5 h-5 text-pink-400" />, color: 'from-pink-500/20 to-rose-500/20' },
    { label: 'Mastery Achieved', icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, color: 'from-emerald-500/20 to-teal-500/20' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'fadeout' ? 0 : 1, scale: stage === 'fadeout' ? 1.05 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight-950 text-white overflow-hidden select-none"
      >
        {/* Stage 1: Ambient background lighting and drifting orbs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage !== 'background' ? 0.9 : 0.4 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-brand-primary/25 via-brand-secondary/20 to-brand-accent/25 blur-[120px]" />
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </motion.div>

        {/* Skip Intro Button */}
        <div className="absolute top-6 right-8 z-20">
          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
            aria-label="Skip introduction"
          >
            <span>Skip Intro</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center Container */}
        <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
          {/* Stage 2: Logo Reveal with Orbiting Ring */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 15 }}
            animate={{
              scale: stage === 'background' ? 0.7 : 1,
              opacity: stage === 'background' ? 0 : 1,
              y: 0,
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-6"
          >
            {/* Orbiting Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute -inset-3 rounded-full border border-dashed border-brand-accent/40 pointer-events-none"
            />
            {/* Second counter-rotating ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
              className="absolute -inset-6 rounded-full border border-indigo-500/20 pointer-events-none"
            />

            {/* Glowing Logo Icon */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-primary via-indigo-600 to-brand-secondary p-[1px] shadow-glow-md">
              <div className="w-full h-full rounded-2xl bg-midnight-900/95 flex items-center justify-center p-3 backdrop-blur-md">
                <img src="/logo.svg" alt="AI Study Buddy" className="w-12 h-12" />
              </div>
            </div>
          </motion.div>

          {/* Logo Title and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: stage === 'background' ? 0 : 1,
              y: stage === 'background' ? 10 : 0,
            }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-display font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>AI Study Buddy</span>
              <sup className="text-xs font-normal">®</sup>
            </h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide mt-1 uppercase">
              Autonomous Intelligence for Higher Learning
            </p>
          </motion.div>

          {/* Stage 3: AI Learning Transformation Sequence */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: stage === 'learning_transform' || stage === 'fadeout' ? 1 : 0,
              height: stage === 'learning_transform' || stage === 'fadeout' ? 'auto' : 0,
            }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <div className="relative px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-glass">
              <AnimatePresence mode="wait">
                <motion.div
                  key={transformStep}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.22 }}
                  className="flex items-center justify-center gap-3"
                >
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${transformStages[transformStep].color} border border-white/10`}>
                    {transformStages[transformStep].icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-200">
                    {transformStages[transformStep].label}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Step indicator dots */}
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {transformStages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === transformStep
                        ? 'w-6 bg-brand-primary'
                        : i < transformStep
                        ? 'w-1.5 bg-brand-secondary/60'
                        : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
