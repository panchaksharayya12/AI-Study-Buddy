import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  Layers,
  HelpCircle,
  CalendarCheck,
  FileText,
  BarChart3,
  Flame,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ViewMode } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useStudyData } from '../../context/StudyDataContext';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const { flashcards, tasks, materials } = useStudyData();

  const unseenCards = flashcards.filter(f => f.mastery === 'again' || f.mastery === 'unseen').length;
  const pendingTasks = tasks.filter(t => !t.completed).length;

  const menuItems: { view: ViewMode; label: string; icon: React.ReactNode; badge?: number }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { view: 'materials', label: 'Study Materials', icon: <BookOpen className="w-5 h-5" />, badge: materials.length },
    { view: 'tutor', label: 'AI Study Tutor', icon: <Bot className="w-5 h-5" /> },
    { view: 'flashcards', label: 'Flashcards', icon: <Layers className="w-5 h-5" />, badge: unseenCards > 0 ? unseenCards : undefined },
    { view: 'quiz', label: 'Quizzes & Tests', icon: <HelpCircle className="w-5 h-5" /> },
    { view: 'planner', label: 'Study Planner', icon: <CalendarCheck className="w-5 h-5" />, badge: pendingTasks > 0 ? pendingTasks : undefined },
    { view: 'notes', label: 'Smart Notes', icon: <FileText className="w-5 h-5" /> },
    { view: 'analytics', label: 'Analytics & Goals', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex flex-col shrink-0 h-screen sticky top-0 pt-20 pb-6 px-3 bg-midnight-950/70 dark:bg-midnight-950/70 bg-slate-50/80 backdrop-blur-2xl border-r border-white/10 dark:border-white/10 border-slate-200 z-30 select-none overflow-x-hidden"
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="self-end p-1.5 mb-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 dark:hover:bg-white/10 hover:bg-slate-200 transition-colors"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Menu Links */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden pr-1">
        {menuItems.map(item => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 dark:text-slate-400 text-slate-600 hover:text-slate-100 dark:hover:text-slate-100 hover:text-slate-900 hover:bg-white/5 dark:hover:bg-white/5 hover:bg-slate-100'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-gradient-to-r from-brand-primary/90 to-brand-secondary/90 rounded-xl shadow-glow-sm"
                />
              )}
              <span className="relative z-10 shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 truncate flex-1 text-left"
                >
                  {item.label}
                </motion.span>
              )}
              {!collapsed && item.badge !== undefined && (
                <span
                  className={`relative z-10 px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Mini Widget (Study Streak) */}
      {!collapsed ? (
        <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.04] dark:bg-white/[0.04] bg-white/70 border border-white/10 dark:border-white/10 border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-200 dark:text-slate-200 text-slate-800">
                  {user?.streakDays || 7} Day Streak
                </div>
                <div className="text-[10px] text-slate-400">Keep it burning!</div>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          </div>
          <div className="w-full bg-white/10 dark:bg-white/10 bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-rose-500 h-full rounded-full w-[85%]" />
          </div>
        </div>
      ) : (
        <div className="mt-4 flex justify-center p-2 rounded-xl bg-white/[0.04]">
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
        </div>
      )}
    </motion.aside>
  );
};
