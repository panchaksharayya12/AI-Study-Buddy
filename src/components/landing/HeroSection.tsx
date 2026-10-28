import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { GlowButton } from '../common/GlowButton';
import { LivePreviewWidget } from './LivePreviewWidget';

interface HeroSectionProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onExploreFeatures,
}) => {
  // Split headline for word-by-word staggered reveal
  const headlineWords = ['Learn', 'Smarter.', 'Remember', 'Longer.'];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary dark:text-indigo-300 text-xs font-semibold mb-6 shadow-glow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              <span>Next-Gen Autonomous AI Learning Platform</span>
            </motion.div>

            {/* Headline (Word by Word Reveal) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 text-slate-900 leading-[1.12] mb-6">
              {headlineWords.map((word, index) => {
                const isHighlight = word.includes('Smarter.') || word.includes('Longer.');
                return (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.15 + index * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-3 ${
                      isHighlight ? 'text-gradient-primary' : ''
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: 'easeOut' }}
              className="text-base sm:text-lg text-slate-400 dark:text-slate-400 text-slate-600 leading-relaxed mb-8 max-w-xl"
            >
              Your personal AI study partner transforms study materials into smart notes,
              interactive flashcards, quizzes, and personalized learning experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.85, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <GlowButton
                size="lg"
                variant="primary"
                onClick={onGetStarted}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Launch Study Workspace
              </GlowButton>

              <GlowButton
                size="lg"
                variant="secondary"
                onClick={onExploreFeatures}
                icon={<Play className="w-4 h-4 fill-current" />}
                className="w-full sm:w-auto"
              >
                Explore Features
              </GlowButton>
            </motion.div>

            {/* Trust Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-white/10 dark:border-white/10 border-slate-200 text-xs text-slate-400"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant PDF & TXT Analysis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-accent" />
                <span>Gemini Pro AI Powered</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Preview Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 w-full"
          >
            <LivePreviewWidget />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
