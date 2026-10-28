import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Layers,
  HelpCircle,
  Bot,
  CalendarCheck,
  BarChart3,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { ViewMode } from '../../types';

interface FeaturesGridProps {
  onSelectFeature: (view: ViewMode) => void;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ onSelectFeature }) => {
  const features = [
    {
      view: 'materials' as ViewMode,
      icon: <FileText className="w-5 h-5 text-black" />,
      title: 'Smart Material Extraction',
      description: 'Upload lectures, textbooks, and notes. Our neural engine extracts core definitions, formulas, and structural hierarchy in seconds.',
      badge: 'Multiformat Upload',
    },
    {
      view: 'tutor' as ViewMode,
      icon: <Bot className="w-5 h-5 text-[#5B875C]" />,
      title: 'Personal Socratic Tutor',
      description: 'Engage in deep conceptual dialogues. Ask for step-by-step proofs, custom analogies, and instant code walkthroughs with real-time feedback.',
      badge: 'Gemini Pro Integrated',
    },
    {
      view: 'flashcards' as ViewMode,
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: '3D Spaced Repetition Cards',
      description: 'Study with tactile 3D flipping cards powered by proven spaced repetition algorithms (Again, Hard, Good, Easy) for 10x retention.',
      badge: 'Adaptive Schedule',
    },
    {
      view: 'quiz' as ViewMode,
      icon: <HelpCircle className="w-5 h-5 text-black" />,
      title: 'Adaptive Quizzing & Tests',
      description: 'Generate dynamic multiple-choice exams tailored to your weakest knowledge points with in-depth rationales and score analysis.',
      badge: 'Instant Explanations',
    },
    {
      view: 'planner' as ViewMode,
      icon: <CalendarCheck className="w-5 h-5 text-[#5B875C]" />,
      title: 'Study Planner & Pomodoro',
      description: 'Organize high-yield tasks and stay laser-focused with precision circular Pomodoro intervals and streak accountability.',
      badge: 'Focus Accelerator',
    },
    {
      view: 'analytics' as ViewMode,
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: 'Mastery Analytics & Heatmaps',
      description: 'Track daily study streaks, subject retention velocity, and unlockable achievement badges based on real learning data.',
      badge: 'Real Data Driven',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-semibold text-[#000000] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>INTELLIGENT CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight">
            Engineered for <span className="text-[#6F6F6F]">Deep Mastery</span>
          </h2>
          <p className="text-[#6F6F6F] mt-3 text-base leading-relaxed font-sans">
            Every feature is synchronized into a unified learning loop: ingest materials, clarify concepts, reinforce memories, and verify mastery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <GlassCard
                onClick={() => onSelectFeature(feature.view)}
                className="h-full p-8 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-full bg-black/[0.04] text-black group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <span className="text-[10px] font-medium px-3 py-1 rounded-full bg-black/[0.03] text-[#6F6F6F] border border-black/5 uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-[#000000] mb-2 group-hover:text-[#5B875C] transition-colors leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-black group-hover:text-[#5B875C] transition-colors">
                  <span>Open Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
