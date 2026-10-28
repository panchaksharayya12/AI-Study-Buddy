import React from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Clock,
  Layers,
  Award,
  ArrowRight,
  BookOpen,
  Bot,
  Play,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudyData } from '../../context/StudyDataContext';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { StatCounter } from '../common/StatCounter';
import { ActivityHeatmap } from './ActivityHeatmap';
import { ViewMode } from '../../types';

interface DashboardOverviewProps {
  onNavigate: (view: ViewMode) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { flashcards, quizzes, quizAttempts, tasks } = useStudyData();

  // Calculated Real Application Data
  const reviewedFlashcardsCount = flashcards.filter(f => f.reviewCount > 0).length;

  const totalQuizScores =
    quizAttempts.length > 0
      ? quizAttempts.reduce((acc, curr) => acc + curr.score, 0)
      : quizzes.reduce((acc, curr) => acc + (curr.bestScore || 0), 0);
  const quizCount =
    quizAttempts.length > 0
      ? quizAttempts.length
      : quizzes.filter(q => q.bestScore !== undefined).length;
  const averageQuizScore = quizCount > 0 ? Math.round(totalQuizScores / quizCount) : 0;

  const totalStudyMinutes = user?.totalStudyMinutes || 870;
  const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const statCards = [
    {
      label: 'Study Streak',
      value: user?.streakDays || 7,
      suffix: ' Days',
      icon: <Flame className="w-4 h-4 text-[#5B875C]" />,
      subtext: 'Active momentum preserved',
    },
    {
      label: 'Focus Time',
      value: parseFloat(totalStudyHours),
      suffix: ' hrs',
      decimals: 1,
      icon: <Clock className="w-4 h-4 text-black" />,
      subtext: `${totalStudyMinutes} minutes accumulated`,
    },
    {
      label: 'Cards Mastered',
      value: reviewedFlashcardsCount,
      suffix: ` / ${flashcards.length}`,
      icon: <Layers className="w-4 h-4 text-blue-600" />,
      subtext: 'Spaced repetition verified',
    },
    {
      label: 'Quiz Accuracy',
      value: averageQuizScore,
      suffix: '%',
      icon: <Award className="w-4 h-4 text-[#5B875C]" />,
      subtext: `${quizzes.length} available assessments`,
    },
  ];

  const weeklyData = [
    { day: 'Mon', hours: 2.1 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.5 },
    { day: 'Fri', hours: 1.4 },
    { day: 'Sat', hours: 4.0 },
    { day: 'Sun', hours: 2.8 },
  ];
  const maxHours = Math.max(...weeklyData.map(d => d.hours));

  const chapters = [
    {
      id: 'mat-1',
      title: 'Neural Architectures & Transformers',
      subtitle: 'Chapter 01 · Deep Learning',
      image: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cd2d844f-ae3f-4fa9-8067-b077530b6e71.webp',
      view: 'flashcards' as ViewMode,
    },
    {
      id: 'mat-2',
      title: 'Internet Protocols & TCP/IP Stack',
      subtitle: 'Chapter 02 · Computer Networks',
      image: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48f5b97e-c27c-4afd-9427-eb35aebd1751.webp',
      view: 'materials' as ViewMode,
    },
    {
      id: 'mat-3',
      title: 'Molecular Genetics & CRISPR Editing',
      subtitle: 'Chapter 03 · Life Sciences',
      image: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cde5384e-ce4d-423f-925a-451b779066e0.webp',
      view: 'quiz' as ViewMode,
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[11px] font-semibold text-[#000000] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
            <span>LEARNING WORKSPACE</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight leading-tight">
            {getGreeting()}, <span className="text-[#6F6F6F]">{user?.name?.split(' ')[0] || 'Scholar'}</span>.
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-2 font-sans max-w-xl">
            Your personal digital haven for deep work and structured cognitive recall.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlowButton
            size="md"
            variant="secondary"
            onClick={() => onNavigate('materials')}
            icon={<BookOpen className="w-4 h-4" />}
          >
            Studio
          </GlowButton>
          <GlowButton
            size="md"
            variant="primary"
            onClick={() => onNavigate('tutor')}
            icon={<Bot className="w-4 h-4" />}
          >
            AI Study Tutor
          </GlowButton>
        </div>
      </div>

      {/* Clean Stat Metric Cards in Instrument Serif */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, idx) => (
          <GlassCard key={card.label} className="p-6">
            <div className="flex items-center justify-between mb-3 text-xs font-medium text-[#6F6F6F]">
              <span>{card.label}</span>
              <div className="p-1.5 rounded-full bg-black/[0.04]">{card.icon}</div>
            </div>

            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#000000] leading-none mb-2">
              <StatCounter
                value={card.value}
                suffix={card.suffix}
                decimals={card.decimals || 0}
              />
            </div>

            <p className="text-[11px] text-[#6F6F6F] font-sans">
              {card.subtext}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Middle Section: Next Action Card + Study Hours Chart */}
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Recommended Action Card */}
        <div className="lg:col-span-5 flex flex-col">
          <GlassCard className="p-7 h-full flex flex-col justify-between">
            <div>
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black text-white inline-block mb-4">
                Recommended Focus
              </span>

              <h3 className="font-display font-bold text-2xl text-[#000000] leading-tight mb-3">
                Deep Learning: Attention & Transformers
              </h3>

              <p className="text-xs sm:text-sm text-[#6F6F6F] leading-relaxed mb-6 font-sans">
                Review your 5-card mastery deck and test your recall on the Scaled Dot-Product Attention equations.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-[#000000] font-medium font-sans">
                  <span>Topic Retention</span>
                  <span className="font-bold text-[#5B875C]">80% Mastered</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-[#000000] w-[80%]" />
                </div>
              </div>
            </div>

            <GlowButton
              size="md"
              variant="primary"
              onClick={() => onNavigate('flashcards')}
              icon={<Play className="w-4 h-4 fill-current" />}
              className="w-full"
            >
              Resume 3D Flashcards
            </GlowButton>
          </GlassCard>
        </div>

        {/* Weekly Study Trend Chart */}
        <div className="lg:col-span-7 flex flex-col">
          <GlassCard className="p-7 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-xl text-[#000000] flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#5B875C]" />
                  <span>Weekly Study Velocity</span>
                </h3>
                <p className="text-xs text-[#6F6F6F] font-sans mt-0.5">
                  Deep work hours logged across the past 7 days
                </p>
              </div>
              <span className="text-xs font-mono font-medium text-[#5B875C] bg-[#5B875C]/10 px-3 py-1 rounded-full border border-[#5B875C]/20">
                +18.4% vs last week
              </span>
            </div>

            {/* Minimalist Bar Chart in Solid Black */}
            <div className="grid grid-cols-7 gap-3 sm:gap-5 items-end h-40 pt-6 pb-2 border-b border-black/[0.06]">
              {weeklyData.map((d, i) => {
                const heightPercent = (d.hours / maxHours) * 100;
                return (
                  <div key={d.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-[11px] font-mono text-[#6F6F6F] group-hover:text-black font-semibold transition-colors">
                      {d.hours}h
                    </span>
                    <div className="w-full max-w-[32px] bg-black/[0.04] rounded-t-lg overflow-hidden flex items-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                        className="w-full rounded-t-lg bg-[#000000] group-hover:bg-[#5B875C] transition-colors duration-200"
                      />
                    </div>
                    <span className="text-xs font-medium text-[#6F6F6F] font-sans">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-3 flex items-center justify-between text-xs text-[#6F6F6F] font-sans">
              <span>Target: 2.5 hrs/day</span>
              <span className="text-black font-semibold">Weekly Total: 17.8 Hours</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Chapters Row in Dashboard */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-extrabold text-2xl text-[#000000] uppercase tracking-tight">
            ACTIVE CHAPTERS
          </h2>
          <button
            onClick={() => onNavigate('materials')}
            className="text-xs font-sans text-[#6F6F6F] hover:text-black transition-colors flex items-center gap-1"
          >
            <span>browse all chapters &rsaquo;</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {chapters.map(chapter => (
            <div
              key={chapter.id}
              onClick={() => onNavigate(chapter.view)}
              className="group relative h-[210px] rounded-[15px] overflow-hidden cursor-pointer shadow-[0_10px_30px_rgba(28,70,120,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 select-none border border-black/5 bg-white"
            >
              <img
                src={chapter.image}
                alt={chapter.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-black" />
                </div>
                <div className="text-left text-white">
                  <span className="text-[10px] font-medium tracking-wider uppercase opacity-80 block">
                    {chapter.subtitle}
                  </span>
                  <h3 className="text-xs font-bold font-sans line-clamp-1">
                    {chapter.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Heatmap & Priority Tasks */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <GlassCard className="p-6">
            <ActivityHeatmap />
          </GlassCard>
        </div>

        <div className="lg:col-span-4">
          <GlassCard className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-[#000000]">
                  Priority Tasks
                </h3>
                <button
                  onClick={() => onNavigate('planner')}
                  className="text-xs font-sans font-medium text-[#6F6F6F] hover:text-black transition-colors"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="space-y-2.5">
                {tasks.slice(0, 3).map(task => (
                  <div
                    key={task.id}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-black/[0.02] border border-black/[0.05] text-xs font-sans"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        task.completed ? 'bg-[#5B875C]' : 'bg-black'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-medium truncate ${
                          task.completed ? 'line-through text-[#6F6F6F]' : 'text-[#000000]'
                        }`}
                      >
                        {task.title}
                      </div>
                      <div className="text-[10px] text-[#6F6F6F] mt-0.5">
                        Due: {task.dueDate} · {task.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <GlowButton
              size="sm"
              variant="outline"
              onClick={() => onNavigate('planner')}
              className="w-full mt-4"
            >
              Open Study Planner
            </GlowButton>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
