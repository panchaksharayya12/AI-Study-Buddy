import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { CircularProgress } from '../common/CircularProgress';
import { GlowButton } from '../common/GlowButton';
import { GlassCard } from '../common/GlassCard';
import { playClickSound, playTimerFinishSound } from '../../utils/sound';
import { useStudyData } from '../../context/StudyDataContext';

type Mode = 'focus' | 'short_break' | 'long_break';

export const PomodoroTimer: React.FC = () => {
  const { recordStudySession, addToast } = useStudyData();

  const durations: Record<Mode, number> = {
    focus: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60,
  };

  const [mode, setMode] = useState<Mode>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(durations.focus);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(3);

  const targetTimeRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning) {
      if (!targetTimeRef.current) {
        targetTimeRef.current = Date.now() + timeLeft * 1000;
      }

      interval = setInterval(() => {
        if (!targetTimeRef.current) return;
        const now = Date.now();
        const remaining = Math.max(0, Math.round((targetTimeRef.current - now) / 1000));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(interval);
          setIsRunning(false);
          targetTimeRef.current = null;
          playTimerFinishSound();

          if (mode === 'focus') {
            setCompletedSessions(prev => prev + 1);
            recordStudySession(25);
            addToast({
              type: 'success',
              title: 'Focus Session Completed!',
              message: 'Time for a well-deserved short break.',
            });
            setMode('short_break');
            setTimeLeft(durations.short_break);
          } else {
            addToast({
              type: 'info',
              title: 'Break Concluded',
              message: 'Ready for another deep focus block?',
            });
            setMode('focus');
            setTimeLeft(durations.focus);
          }
        }
      }, 500);
    } else {
      targetTimeRef.current = null;
    }

    return () => clearInterval(interval);
  }, [isRunning, mode, timeLeft]);

  const handleToggle = () => {
    playClickSound();
    if (!isRunning) {
      targetTimeRef.current = Date.now() + timeLeft * 1000;
    } else {
      targetTimeRef.current = null;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    playClickSound();
    setIsRunning(false);
    targetTimeRef.current = null;
    setTimeLeft(durations[mode]);
  };

  const handleChangeMode = (newMode: Mode) => {
    playClickSound();
    setIsRunning(false);
    targetTimeRef.current = null;
    setMode(newMode);
    setTimeLeft(durations[newMode]);
  };

  const totalDuration = durations[mode];
  const progressPercent = Math.round(((totalDuration - timeLeft) / totalDuration) * 100);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <GlassCard className="p-8 flex flex-col items-center justify-between text-center">
      {/* Mode Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/[0.04] mb-8 font-sans">
        <button
          onClick={() => handleChangeMode('focus')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            mode === 'focus'
              ? 'bg-black text-white shadow-sm'
              : 'text-[#6F6F6F] hover:text-black'
          }`}
        >
          Focus (25m)
        </button>
        <button
          onClick={() => handleChangeMode('short_break')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            mode === 'short_break'
              ? 'bg-[#5B875C] text-white shadow-sm'
              : 'text-[#6F6F6F] hover:text-black'
          }`}
        >
          Short Break (5m)
        </button>
        <button
          onClick={() => handleChangeMode('long_break')}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            mode === 'long_break'
              ? 'bg-black text-white shadow-sm'
              : 'text-[#6F6F6F] hover:text-black'
          }`}
        >
          Long Break (15m)
        </button>
      </div>

      {/* Circular Progress Ring */}
      <div className="py-2">
        <CircularProgress
          percentage={progressPercent}
          size={220}
          strokeWidth={10}
          circleColor="rgba(0, 0, 0, 0.06)"
          progressColor="#000000"
          gradientId="pomodoroCleanGrad"
        >
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-5xl sm:text-6xl text-[#000000] tracking-tight leading-none">
              {timeFormatted}
            </span>
            <span className="text-xs font-medium text-[#6F6F6F] font-sans mt-2">
              {mode === 'focus' ? 'Deep Work Block' : 'Rest & Recharge'}
            </span>
          </div>
        </CircularProgress>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 mt-8 font-sans">
        <GlowButton
          size="lg"
          variant="primary"
          onClick={handleToggle}
          icon={isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          className="min-w-[140px]"
        >
          {isRunning ? 'Pause' : 'Start Focus'}
        </GlowButton>

        <GlowButton
          size="lg"
          variant="secondary"
          onClick={handleReset}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Reset
        </GlowButton>
      </div>

      {/* Session counter dots */}
      <div className="flex items-center gap-2 mt-8 pt-4 border-t border-black/[0.06] text-xs text-[#6F6F6F] font-sans">
        <Sparkles className="w-3.5 h-3.5 text-[#5B875C]" />
        <span>Today's Completed Cycles:</span>
        <div className="flex items-center gap-1.5 ml-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i < completedSessions % 4
                  ? 'bg-black shadow-sm scale-110'
                  : 'bg-black/15'
              }`}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
