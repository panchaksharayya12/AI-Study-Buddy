import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export const AuthSideIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950/80 via-midnight-900 to-violet-950/80 border border-white/10">
      {/* Drifting orbs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-brand-primary/25 blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-brand-secondary/25 blur-3xl animate-float-medium" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Futuristic Holographic Core */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Central Node */}
        <div className="relative mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
            className="w-28 h-28 rounded-full border border-dashed border-brand-accent/40 flex items-center justify-center p-2"
          >
            <div className="w-full h-full rounded-full border border-indigo-500/30" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary p-[1px] shadow-glow-md">
              <div className="w-full h-full rounded-2xl bg-midnight-900 flex items-center justify-center">
                <Brain className="w-8 h-8 text-brand-accent animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Your Autonomous Learning Partner
        </h3>

        <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6">
          Ingest materials once, retain forever with adaptive spaced recall and contextual AI dialogues.
        </p>

        {/* Feature Checkmarks */}
        <div className="flex flex-col gap-2.5 text-xs text-left w-full max-w-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Instant PDF and lecture notes parsing</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>3D interactive flashcards with audio cues</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Progress heatmap & Pomodoro focus timer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
