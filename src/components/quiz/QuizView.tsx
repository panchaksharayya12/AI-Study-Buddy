import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  Award,
  Timer,
} from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';
import { Quiz, QuizQuestion } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { GlowButton } from '../common/GlowButton';
import { StatCounter } from '../common/StatCounter';
import { playClickSound, playSuccessSound, playErrorSound } from '../../utils/sound';
import { triggerCelebration } from '../../utils/confetti';

export const QuizView: React.FC = () => {
  const { quizzes, recordQuizAttempt, recordStudySession } = useStudyData();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(quizzes[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isCompleted]);

  const currentQuestion: QuizQuestion = selectedQuiz.questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (hasAnsweredCurrent) return;
    playClickSound();
    setSelectedOption(index);
    setHasAnsweredCurrent(true);

    const isCorrect = index === currentQuestion.correctIndex;
    if (isCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }

    setUserAnswers(prev => [...prev, index]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setHasAnsweredCurrent(false);
    } else {
      setTimerActive(false);
      setIsCompleted(true);

      const allAnswers = [...userAnswers];
      let correctCount = 0;
      selectedQuiz.questions.forEach((q, idx) => {
        if (allAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });
      const finalScore = Math.round((correctCount / selectedQuiz.questions.length) * 100);

      recordQuizAttempt({
        quizId: selectedQuiz.id,
        score: finalScore,
        totalQuestions: selectedQuiz.questions.length,
        timeSpentSeconds: timeSpent,
        userAnswers: allAnswers,
      });

      recordStudySession(Math.max(5, Math.ceil(timeSpent / 60)));

      if (finalScore >= 80) {
        triggerCelebration();
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasAnsweredCurrent(false);
    setUserAnswers([]);
    setIsCompleted(false);
    setTimeSpent(0);
    setTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isCompleted) {
    let correctCount = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / selectedQuiz.questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-3xl mx-auto space-y-8 pb-16"
      >
        <GlassCard className="p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#5B875C]/15 text-[#5B875C] flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="font-display font-black text-4xl text-[#000000] mb-2">
            Assessment Complete
          </h2>
          <p className="text-sm text-[#6F6F6F] mb-6 font-sans">
            {selectedQuiz.title}
          </p>

          <div className="flex items-center justify-center gap-8 sm:gap-14 py-8 border-y border-black/[0.06] font-sans">
            <div>
              <div className="font-display font-black text-4xl sm:text-5xl text-[#000000] leading-none mb-1">
                <StatCounter value={finalScore} suffix="%" />
              </div>
              <span className="text-[11px] font-medium text-[#6F6F6F] uppercase tracking-wider">
                Accuracy
              </span>
            </div>

            <div>
              <div className="font-display font-black text-4xl sm:text-5xl text-[#5B875C] leading-none mb-1">
                {correctCount} / {selectedQuiz.questions.length}
              </div>
              <span className="text-[11px] font-medium text-[#6F6F6F] uppercase tracking-wider">
                Correct
              </span>
            </div>

            <div>
              <div className="font-display font-black text-4xl sm:text-5xl text-[#000000] leading-none mb-1">
                {formatTime(timeSpent)}
              </div>
              <span className="text-[11px] font-medium text-[#6F6F6F] uppercase tracking-wider">
                Time Spent
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 font-sans">
            <GlowButton
              size="md"
              variant="primary"
              onClick={handleRestartQuiz}
              icon={<RefreshCw className="w-4 h-4" />}
            >
              Retake Assessment
            </GlowButton>
          </div>
        </GlassCard>

        {/* Detailed Review */}
        <div className="space-y-4 font-sans">
          <h3 className="font-display font-bold text-2xl text-[#000000]">
            Question Review
          </h3>

          {selectedQuiz.questions.map((q, idx) => {
            const userAnswer = userAnswers[idx];
            const isCorrect = userAnswer === q.correctIndex;

            return (
              <GlassCard
                key={q.id}
                className={`p-6 border-l-4 ${
                  isCorrect ? 'border-l-[#5B875C]' : 'border-l-rose-500'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="text-xs font-semibold text-[#6F6F6F]">Question {idx + 1}</span>
                  {isCorrect ? (
                    <span className="text-xs font-semibold text-[#5B875C] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-rose-600 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                </div>

                <p className="text-sm font-semibold text-[#000000] mb-4">
                  {q.question}
                </p>

                <div className="space-y-2 mb-4 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isUserChoice = userAnswer === optIdx;
                    const isActualCorrect = optIdx === q.correctIndex;

                    return (
                      <div
                        key={opt}
                        className={`p-3 rounded-xl flex items-center justify-between font-medium ${
                          isActualCorrect
                            ? 'bg-[#5B875C]/15 text-[#5B875C] font-semibold border border-[#5B875C]/30'
                            : isUserChoice
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-black/[0.02] text-[#6F6F6F]'
                        }`}
                      >
                        <span>{opt}</span>
                        {isActualCorrect && <CheckCircle2 className="w-4 h-4 text-[#5B875C]" />}
                        {isUserChoice && !isActualCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                      </div>
                    );
                  })}
                </div>

                <div className="p-3.5 rounded-xl bg-black/[0.02] text-xs text-[#6F6F6F]">
                  <strong className="text-black block mb-1">Explanation:</strong>
                  {q.explanation}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>
    );
  }

  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100
  );

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      {/* Quiz Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black text-white inline-block mb-3 font-sans">
            {selectedQuiz.category}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#000000] tracking-tight leading-none">
            {selectedQuiz.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 font-sans">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.04] text-xs font-mono font-medium text-black">
            <Timer className="w-3.5 h-3.5" />
            <span>{formatTime(timeSpent)}</span>
          </div>

          {quizzes.length > 1 && (
            <select
              value={selectedQuiz.id}
              onChange={e => {
                const found = quizzes.find(q => q.id === e.target.value);
                if (found) {
                  setSelectedQuiz(found);
                  handleRestartQuiz();
                }
              }}
              className="bg-white text-xs font-medium text-black border border-black/10 rounded-full px-4 py-1.5 focus:outline-none"
            >
              {quizzes.map(q => (
                <option key={q.id} value={q.id}>
                  {q.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 font-sans">
        <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
          <span>
            Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
          </span>
          <span className="font-mono font-medium text-black">{progressPercent}%</span>
        </div>
        <div className="w-full bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-black"
            style={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card with Slide Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <GlassCard className="p-8 sm:p-10">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#000000] leading-snug mb-8">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3 mb-8 font-sans">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                let optionStyle = 'bg-black/[0.02] border-black/[0.08] hover:border-black/30 text-[#1A1A1A]';

                if (hasAnsweredCurrent) {
                  if (isCorrect) {
                    optionStyle = 'bg-[#5B875C]/15 border-[#5B875C] text-[#5B875C] font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-50 border-rose-400 text-rose-700';
                  } else {
                    optionStyle = 'bg-black/[0.02] opacity-50 border-transparent';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-black text-white border-black';
                }

                return (
                  <motion.button
                    key={option}
                    whileTap={!hasAnsweredCurrent ? { scale: 0.99 } : undefined}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnsweredCurrent}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {hasAnsweredCurrent && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-[#5B875C] shrink-0" />
                    )}
                    {hasAnsweredCurrent && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation box on answer */}
            <AnimatePresence>
              {hasAnsweredCurrent && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-black/[0.03] border border-black/[0.06] text-xs text-[#1A1A1A] leading-relaxed mb-6 font-sans"
                >
                  <strong className="text-black block mb-1">Contextual Rationale:</strong>
                  {currentQuestion.explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Bar */}
            <div className="flex items-center justify-end font-sans">
              <GlowButton
                size="md"
                variant="primary"
                onClick={handleNextQuestion}
                disabled={!hasAnsweredCurrent}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {currentQuestionIndex === selectedQuiz.questions.length - 1
                  ? 'Complete Assessment'
                  : 'Next Question'}
              </GlowButton>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
