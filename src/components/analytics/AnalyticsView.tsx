import React from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Brain,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudyData } from '../../context/StudyDataContext';
import { GlassCard } from '../common/GlassCard';
import { CircularProgress } from '../common/CircularProgress';
import { StatCounter } from '../common/StatCounter';
import { ActivityHeatmap } from '../dashboard/ActivityHeatmap';

export const AnalyticsView: React.FC = () => {
  const { user } = useAuth();
  const { flashcards, quizzes, quizAttempts, achievements } = useStudyData();

  const totalCards = flashcards.length;
  const masteredCards = flashcards.filter(f => f.mastery === 'easy' || f.mastery === 'good').length;
  const masteryPercentage = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  const totalQuizAttempts = quizAttempts.length > 0 ? quizAttempts.length : quizzes.reduce((acc, q) => acc + q.attemptsCount, 0);
  const totalScores = quizAttempts.length > 0
    ? quizAttempts.reduce((acc, a) => acc + a.score, 0)
    : quizzes.reduce((acc, q) => acc + (q.bestScore || 0), 0);
  const avgQuizAccuracy = totalQuizAttempts > 0 ? Math.round(totalScores / Math.max(1, totalQuizAttempts)) : 88;

  const totalMinutes = user?.totalStudyMinutes || 870;
  const studyHours = (totalMinutes / 60).toFixed(1);
  const weeklyGoalHours = 15;
  const weeklyGoalPercent = Math.min(100, Math.round(((parseFloat(studyHours) % weeklyGoalHours) / weeklyGoalHours) * 100)) || 76;

  const domainBreakdown = [
    { name: 'Computer Science (AI & Networking)', count: flashcards.filter(f => f.category.includes('Deep') || f.category.includes('Net')).length, mastery: 85 },
    { name: 'Life Sciences (Genetics)', count: flashcards.filter(f => f.category.includes('Genetics') || f.category.includes('Bio')).length, mastery: 72 },
    { name: 'Applied Mathematics', count: 4, mastery: 65 },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight leading-none">
            Learning Analytics
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-2 font-sans max-w-xl">
            Cognitive retention velocity, spaced recall progress, and unlockable achievement milestones.
          </p>
        </div>
      </div>

      {/* Top Gauges Grid */}
      <div className="grid md:grid-cols-3 gap-6 font-sans">
        <GlassCard className="p-8 flex flex-col items-center justify-between text-center">
          <div className="text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
            Spaced Retention Rate
          </div>

          <div className="py-2">
            <CircularProgress
              percentage={masteryPercentage}
              size={160}
              strokeWidth={8}
              circleColor="rgba(0, 0, 0, 0.05)"
              progressColor="#000000"
              gradientId="masteryCleanGrad"
            >
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-4xl text-[#000000]">
                  <StatCounter value={masteryPercentage} suffix="%" />
                </span>
                <span className="text-[10px] text-[#6F6F6F] font-medium">Active Recall</span>
              </div>
            </CircularProgress>
          </div>

          <p className="text-xs text-[#6F6F6F] mt-2">
            {masteredCards} of {totalCards} concepts verified in memory
          </p>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col items-center justify-between text-center">
          <div className="text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
            Weekly Target Milestone
          </div>

          <div className="py-2">
            <CircularProgress
              percentage={weeklyGoalPercent}
              size={160}
              strokeWidth={8}
              circleColor="rgba(0, 0, 0, 0.05)"
              progressColor="#5B875C"
              gradientId="weeklyCleanGrad"
            >
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-4xl text-[#5B875C]">
                  <StatCounter value={weeklyGoalPercent} suffix="%" />
                </span>
                <span className="text-[10px] text-[#6F6F6F] font-medium">Weekly Goal</span>
              </div>
            </CircularProgress>
          </div>

          <p className="text-xs text-[#6F6F6F] mt-2">
            {studyHours} hrs logged towards {weeklyGoalHours} hrs target
          </p>
        </GlassCard>

        <GlassCard className="p-8 flex flex-col items-center justify-between text-center">
          <div className="text-xs font-semibold text-[#6F6F6F] uppercase tracking-wider mb-2">
            Evaluation Accuracy
          </div>

          <div className="py-2">
            <CircularProgress
              percentage={avgQuizAccuracy}
              size={160}
              strokeWidth={8}
              circleColor="rgba(0, 0, 0, 0.05)"
              progressColor="#000000"
              gradientId="quizCleanGrad"
            >
              <div className="flex flex-col items-center">
                <span className="font-display font-black text-4xl text-[#000000]">
                  <StatCounter value={avgQuizAccuracy} suffix="%" />
                </span>
                <span className="text-[10px] text-[#6F6F6F] font-medium">Avg Score</span>
              </div>
            </CircularProgress>
          </div>

          <p className="text-xs text-[#6F6F6F] mt-2">
            Across {totalQuizAttempts} total assessment attempts
          </p>
        </GlassCard>
      </div>

      {/* Domain Knowledge Retention Breakdown */}
      <GlassCard className="p-8 font-sans">
        <h3 className="font-display font-bold text-2xl text-[#000000] mb-5 flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#5B875C]" />
          <span>Subject Domain Mastery</span>
        </h3>

        <div className="space-y-5">
          {domainBreakdown.map(domain => (
            <div key={domain.name} className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-[#000000]">
                <span>{domain.name}</span>
                <span className="font-mono text-[#5B875C]">{domain.mastery}% Mastered</span>
              </div>
              <div className="w-full bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${domain.mastery}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-black"
                />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Heatmap Section */}
      <GlassCard className="p-8">
        <ActivityHeatmap />
      </GlassCard>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-2xl text-[#000000] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#5B875C]" />
            <span>Achievement Milestones</span>
          </h3>
          <span className="text-xs text-[#6F6F6F] font-sans">
            {achievements.filter(a => a.unlocked).length} of {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
          {achievements.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <GlassCard className={`p-6 flex items-start gap-3.5 ${badge.unlocked ? '' : 'opacity-50'}`}>
                <div
                  className={`p-2.5 rounded-full shrink-0 ${
                    badge.unlocked
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-black/[0.04] text-[#6F6F6F]'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-[#000000] truncate">
                      {badge.title}
                    </h4>
                    {badge.unlocked && (
                      <CheckCircle2 className="w-4 h-4 text-[#5B875C] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-[#6F6F6F] mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                  {badge.unlockedAt && (
                    <span className="text-[10px] text-[#6F6F6F] font-mono block mt-2">
                      Unlocked on {badge.unlockedAt}
                    </span>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
