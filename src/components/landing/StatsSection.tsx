import React from 'react';
import { motion } from 'framer-motion';
import { Users, Layers, Award, Star } from 'lucide-react';
import { StatCounter } from '../common/StatCounter';
import { GlassCard } from '../common/GlassCard';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Active Student Scholars',
      value: 52400,
      suffix: '+',
      icon: <Users className="w-4 h-4 text-black" />,
      subtext: 'Across 140+ universities',
    },
    {
      label: 'Flashcards Generated',
      value: 1250000,
      suffix: '+',
      icon: <Layers className="w-4 h-4 text-[#5B875C]" />,
      subtext: 'Spaced repetition verified',
    },
    {
      label: 'Retention Score Boost',
      value: 94.8,
      suffix: '%',
      decimals: 1,
      icon: <Award className="w-4 h-4 text-blue-600" />,
      subtext: 'Average exam improvement',
    },
    {
      label: 'Student Community Rating',
      value: 4.9,
      suffix: ' / 5.0',
      decimals: 1,
      icon: <Star className="w-4 h-4 text-[#5B875C] fill-[#5B875C]" />,
      subtext: 'Based on 8,400+ reviews',
    },
  ];

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <GlassCard className="p-7 text-center flex flex-col items-center justify-center font-sans">
                <div className="p-2.5 rounded-full bg-black/[0.04] mb-3">
                  {stat.icon}
                </div>
                <div className="font-serif-display text-4xl sm:text-5xl text-[#000000] leading-none mb-1">
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#000000] mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-[#6F6F6F] mt-0.5">
                  {stat.subtext}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
