import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Layers, Award } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <UploadCloud className="w-5 h-5 text-black" />,
      title: 'Upload Study Material',
      desc: 'Drop in lecture slides, research PDFs, or markdown notes. Our system parses and prepares the knowledge base instantly.',
    },
    {
      num: '02',
      icon: <Cpu className="w-5 h-5 text-[#5B875C]" />,
      title: 'Neural Synthesis',
      desc: 'The AI extracts key concepts, formulas, summaries, and generates tailored flashcards and practice test questions.',
    },
    {
      num: '03',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      title: 'Interactive Practice',
      desc: 'Flip 3D spaced repetition cards, take adaptive quizzes with instant reasoning, and consult your personal AI tutor.',
    },
    {
      num: '04',
      icon: <Award className="w-5 h-5 text-[#5B875C]" />,
      title: 'Verify & Excel',
      desc: 'Watch your mastery scores climb, maintain your daily study streak, and ace your university and certification exams.',
    },
  ];

  return (
    <section className="py-24 relative border-y border-black/[0.06] bg-black/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#6F6F6F] tracking-widest uppercase font-sans">
            UNIFIED LEARNING LOOP
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight mt-2">
            From Raw Notes to <span className="text-[#6F6F6F]">Permanent Retention</span>
          </h2>
          <p className="text-[#6F6F6F] text-sm mt-3 font-sans">
            A scientifically designed cognitive feedback loop based on active recall and spaced repetition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard className="p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-black text-4xl text-black/20">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-full bg-black/[0.04]">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-[#000000] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6F6F6F] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
