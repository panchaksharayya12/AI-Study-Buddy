import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2, RotateCw, Play, Check } from 'lucide-react';
import { playFlipSound } from '../../utils/sound';

export const LivePreviewWidget: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(1);

  const handleCardFlip = () => {
    playFlipSound();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Ambient glow backing */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 blur-2xl opacity-70 pointer-events-none" />

      {/* Main glass frame */}
      <div className="relative rounded-3xl bg-midnight-900/80 dark:bg-midnight-900/80 bg-white/85 backdrop-blur-2xl border border-white/15 dark:border-white/15 border-slate-200/80 p-5 sm:p-6 shadow-2xl">
        {/* Top window bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 dark:border-white/10 border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2">ai-study-buddy-live-engine</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active Session
          </div>
        </div>

        {/* Floating Mini Interactive Flashcard */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span className="flex items-center gap-1 text-slate-300 dark:text-slate-300 text-slate-700">
              <Brain className="w-3.5 h-3.5 text-brand-accent" />
              Interactive Memory Card
            </span>
            <span className="text-[10px] text-brand-primary font-mono">Click card to flip</span>
          </div>

          <div
            onClick={handleCardFlip}
            className="perspective-1000 cursor-pointer select-none group"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-36 rounded-2xl transform-style-3d shadow-md"
            >
              {/* Front of mini card */}
              <div className="absolute inset-0 backface-hidden rounded-2xl p-4 bg-gradient-to-br from-midnight-800 to-midnight-850 dark:from-midnight-800 dark:to-midnight-850 bg-gradient-to-br from-indigo-50/90 to-white/95 border border-white/10 dark:border-white/10 border-indigo-100 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Neural Networks
                  </span>
                  <RotateCw className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                </div>
                <p className="text-sm font-semibold text-slate-100 dark:text-slate-100 text-slate-900 leading-snug">
                  Why does the Transformer attention mechanism scale better than RNNs?
                </p>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Card 3 of 12</span>
                  <span className="text-brand-accent font-medium">Click to reveal answer &rarr;</span>
                </div>
              </div>

              {/* Back of mini card */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-4 bg-gradient-to-br from-brand-primary/20 via-midnight-850 to-midnight-800 dark:from-brand-primary/20 dark:via-midnight-850 dark:to-midnight-800 bg-gradient-to-br from-indigo-100 to-white border border-brand-primary/40 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Correct Concept
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Mastery: 95%</span>
                </div>
                <p className="text-xs text-slate-200 dark:text-slate-200 text-slate-800 leading-relaxed">
                  Attention allows parallel token processing across sequences, replacing sequential step-by-step recurrence.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-white/10">
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Spaced Repetition Verified
                  </span>
                  <span className="text-[10px] text-slate-400">Click to flip back</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Live Quiz Teaser & Progress */}
        <div className="p-3.5 rounded-2xl bg-midnight-800/50 dark:bg-midnight-800/50 bg-slate-100/70 border border-white/10 dark:border-white/10 border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 dark:text-slate-200 text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Quick Knowledge Check
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-400">Score: 4/5</span>
          </div>

          <p className="text-xs text-slate-300 dark:text-slate-300 text-slate-700 mb-2">
            In TCP 3-way handshake, what packet initiates connection?
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {['SYN packet', 'ACK packet', 'RST reset', 'FIN packet'].map((opt, idx) => (
              <button
                key={opt}
                onClick={() => setSelectedAnswer(idx)}
                className={`px-3 py-1.5 rounded-xl text-left font-medium transition-all flex items-center justify-between ${
                  selectedAnswer === idx
                    ? 'bg-brand-primary text-white shadow-glow-sm border border-brand-primary'
                    : 'bg-white/5 dark:bg-white/5 bg-white text-slate-300 dark:text-slate-300 text-slate-700 border border-white/10 hover:border-brand-primary/40'
                }`}
              >
                <span>{opt}</span>
                {selectedAnswer === idx && <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />}
              </button>
            ))}
          </div>

          {/* Animated Quiz Progress Bar */}
          <div className="mt-3 pt-2.5 border-t border-white/10 dark:border-white/10 border-slate-200 flex items-center gap-3">
            <div className="flex-1 bg-white/10 dark:bg-white/10 bg-slate-200 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '40%' }}
                animate={{ width: ['40%', '80%', '80%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                className="h-full rounded-full bg-gradient-to-r from-brand-primary via-indigo-500 to-brand-accent"
              />
            </div>
            <span className="text-[10px] font-mono text-slate-400">80% Mastered</span>
          </div>
        </div>

        {/* Floating Mini Badges */}
        <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full bg-brand-primary text-white text-[11px] font-bold shadow-glow-md flex items-center gap-1.5 animate-bounce">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Tutor Ready</span>
        </div>
      </div>
    </div>
  );
};
