import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GlowButton } from '../common/GlowButton';

interface CtaSectionProps {
  onGetStarted: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="py-24 relative overflow-hidden font-sans">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center bg-black text-white shadow-2xl"
        >
          {/* Subtle warm glow backing */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#5B875C]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>COMMENCE YOUR MASTERY</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
            Ready to Experience the <span className="text-slate-300">Future of Studying</span>?
          </h2>

          <p className="text-base text-white/70 max-w-xl mx-auto mb-8 leading-relaxed font-sans">
            Join thousands of ambitious students mastering complex domains faster with AI-synthesized notes, 3D flashcards, and instant Socratic tutoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onGetStarted}
              className="rounded-full px-12 py-4 text-base font-medium bg-white text-black hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl"
            >
              Begin Journey
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5B875C]" />
              Instant Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5B875C]" />
              Curated Chapters
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5B875C]" />
              Spaced Repetition Engine
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
