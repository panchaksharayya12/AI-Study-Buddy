import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Check,
  Trash2,
  CheckCircle2,
} from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';
import { StudyTask } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { PomodoroTimer } from './PomodoroTimer';

export const StudyPlannerView: React.FC = () => {
  const { tasks, addTask, removeTask, toggleTaskCompleted } = useStudyData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StudyTask['category']>('Homework');
  const [priority, setPriority] = useState<StudyTask['priority']>('medium');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [pomodoros, setPomodoros] = useState(2);

  const categories = ['All', 'Exam Prep', 'Homework', 'Review', 'Reading', 'Project'];

  const filteredTasks = tasks.filter(t =>
    selectedCategory === 'All' ? true : t.category === selectedCategory
  );

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      category,
      priority,
      dueDate,
      estimatedPomodoros: pomodoros,
    });

    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight leading-none">
            Study Planner
          </h1>
          <p className="text-sm text-[#6F6F6F] mt-2 font-sans max-w-xl">
            Organize high-yield academic milestones and maintain focused Pomodoro intervals.
          </p>
        </div>

        <GlowButton
          size="md"
          variant="primary"
          onClick={() => setShowAddModal(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Study Task
        </GlowButton>
      </div>

      {/* Main Grid: Pomodoro Timer (Left) + Task Manager (Right) */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <PomodoroTimer />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Progress Card */}
          <GlassCard className="p-6 font-sans">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-semibold text-black">
                Milestone Progress
              </span>
              <span className="font-mono text-[#5B875C] font-semibold">
                {completedCount} / {tasks.length} Completed ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full bg-black"
              />
            </div>
          </GlassCard>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 font-sans">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-black/[0.04] text-[#6F6F6F] hover:text-black hover:bg-black/[0.08]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-3 font-sans">
            <AnimatePresence>
              {filteredTasks.map(task => {
                const priorityBadge =
                  task.priority === 'high'
                    ? 'bg-rose-50 text-rose-700'
                    : task.priority === 'medium'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-black/[0.04] text-[#6F6F6F]';

                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22 }}
                  >
                    <GlassCard className={`p-4 transition-all duration-200 ${task.completed ? 'opacity-60' : ''}`}>
                      <div className="flex items-center gap-3.5">
                        <button
                          onClick={() => toggleTaskCompleted(task.id)}
                          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                            task.completed
                              ? 'bg-[#5B875C] border-[#5B875C] text-white shadow-sm'
                              : 'border-black/20 hover:border-black'
                          }`}
                        >
                          {task.completed && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </button>

                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-semibold truncate ${
                              task.completed ? 'line-through text-[#6F6F6F]' : 'text-[#000000]'
                            }`}
                          >
                            {task.title}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-[#6F6F6F]">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase ${priorityBadge}`}>
                              {task.priority}
                            </span>
                            <span>{task.category}</span>
                            <span>· Due {task.dueDate}</span>
                            <span>· {task.completedPomodoros}/{task.estimatedPomodoros} Pomodoros</span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeTask(task.id)}
                          className="p-1 rounded-full text-[#6F6F6F] hover:text-rose-600 transition-colors"
                          title="Delete task"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <CheckCircle2 className="w-8 h-8 text-[#6F6F6F] mx-auto mb-2 opacity-30" />
                <p className="text-xs text-[#6F6F6F]">No tasks in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />
          <GlassCard className="relative z-10 w-full max-w-md p-8 border-black/10">
            <h3 className="font-serif-display text-3xl text-[#000000] mb-4">
              Add New Study Task
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-semibold text-[#000000] mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Backpropagation Chain Rule"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-black/[0.03] border border-black/10 text-[#000000] focus:outline-none focus:border-black text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#000000] mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as StudyTask['category'])}
                    className="w-full px-3 py-2 rounded-full bg-white text-black border border-black/10 text-xs focus:outline-none"
                  >
                    <option value="Exam Prep">Exam Prep</option>
                    <option value="Homework">Homework</option>
                    <option value="Review">Review</option>
                    <option value="Reading">Reading</option>
                    <option value="Project">Project</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#000000] mb-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as StudyTask['priority'])}
                    className="w-full px-3 py-2 rounded-full bg-white text-black border border-black/10 text-xs focus:outline-none"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#000000] mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-full bg-white text-black border border-black/10 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#000000] mb-1">
                    Estimated Pomodoros
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={pomodoros}
                    onChange={e => setPomodoros(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-full bg-white text-black border border-black/10 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <GlowButton
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </GlowButton>
                <GlowButton type="submit" size="sm" variant="primary">
                  Create Task
                </GlowButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
