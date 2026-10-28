import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Elena Rostova',
      role: 'Computer Science, MIT',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      text: 'The 3D flashcards and AI tutor completely changed how I study for operating systems. The instant Socratic breakdowns clarify tricky kernel concepts better than office hours.',
      rating: 5,
    },
    {
      name: 'Marcus Chen',
      role: 'Pre-Med, Johns Hopkins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      text: 'Ingesting 100-page biology chapters and having it automatically generate high-yield spaced repetition flashcards and mock quizzes saved me at least 15 hours every single week before exams.',
      rating: 5,
    },
    {
      name: 'Sophia Patel',
      role: 'Data Science, Stanford',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      text: 'The editorial aesthetic is so calming and free of distractions. The Pomodoro focus timer combined with the activity heatmap keeps me locked in. I maintained a 35-day streak.',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#6F6F6F] tracking-widest uppercase font-sans">
            STUDENT VOICES
          </span>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight mt-2">
            Trusted by Scholars at <span className="text-[#6F6F6F]">Top Universities</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 font-sans">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <GlassCard className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#5B875C]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <Quote className="w-5 h-5 text-black/15 mb-2" />

                  <p className="text-sm text-[#1A1A1A] leading-relaxed mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.06]">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-black/10"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-[#000000]">
                      {rev.name}
                    </h4>
                    <p className="text-xs text-[#6F6F6F]">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
