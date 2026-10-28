import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  RefreshCw,
  Check,
} from 'lucide-react';
import { useStudyData } from '../../context/StudyDataContext';
import { FlashcardMastery } from '../../types';
import { GlowButton } from '../common/GlowButton';
import { playFlipSound, playClickSound, playSuccessSound } from '../../utils/sound';
import { triggerCelebration } from '../../utils/confetti';

export const FlashcardsView: React.FC = () => {
  const { flashcards, updateFlashcardMastery, recordStudySession } = useStudyData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedDeck, setCompletedDeck] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(flashcards.map(f => f.category)))];

  const filteredCards = flashcards.filter(f =>
    activeCategory === 'All' ? true : f.category === activeCategory
  );

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    playFlipSound();
    setIsFlipped(!isFlipped);
  };

  const handleRateCard = (mastery: FlashcardMastery) => {
    if (!currentCard) return;
    playClickSound();
    updateFlashcardMastery(currentCard.id, mastery);

    if (currentIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 150);
    } else {
      setCompletedDeck(true);
      triggerCelebration();
      playSuccessSound();
      recordStudySession(15);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompletedDeck(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight' && !isFlipped) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && !isFlipped) {
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRateCard('again');
        if (e.key === '2') handleRateCard('hard');
        if (e.key === '3') handleRateCard('good');
        if (e.key === '4') handleRateCard('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, filteredCards]);

  if (completedDeck || filteredCards.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto py-16 text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-[#5B875C]/15 flex items-center justify-center mx-auto text-[#5B875C]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <h2 className="font-display font-black text-4xl text-[#000000]">
            Chapter Review Complete
          </h2>
          <p className="text-sm text-[#6F6F6F] mt-2 font-sans">
            You've reviewed all {filteredCards.length} cards in this deck. Spaced repetition intervals have been logged.
          </p>
        </div>

        <div className="pt-4">
          <GlowButton
            variant="primary"
            size="md"
            onClick={handleRestart}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Review Deck Again
          </GlowButton>
        </div>
      </motion.div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / filteredCards.length) * 100);

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header and Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/[0.06]">
        <div>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-[#000000] tracking-tight leading-none">
            Interactive Flashcards
          </h1>
          <p className="text-sm text-[#6F6F6F] font-sans mt-2">
            Space to flip · Numbers 1–4 to rate recall
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all font-sans ${
                activeCategory === cat
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-black/[0.04] text-[#6F6F6F] hover:text-black hover:bg-black/[0.08]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 font-sans">
        <div className="flex items-center justify-between text-xs text-[#6F6F6F]">
          <span className="font-medium text-black">
            Card {currentIndex + 1} of {filteredCards.length}
          </span>
          <span className="font-mono font-medium">{progressPercent}%</span>
        </div>
        <div className="w-full bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-full bg-black"
          />
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div className="perspective-1000 py-4 select-none">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleFlip}
          className="relative w-full min-h-[380px] sm:min-h-[420px] rounded-[24px] transform-style-3d cursor-pointer shadow-[0_12px_40px_rgba(28,70,120,0.08)] group"
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 backface-hidden rounded-[24px] p-8 sm:p-12 bg-white border border-black/[0.08] flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between font-sans">
              <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-black/[0.04] text-[#000000]">
                {currentCard.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#6F6F6F]">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>Click or Space to Flip</span>
              </div>
            </div>

            <div className="my-auto py-6 text-center">
              <span className="text-xs uppercase tracking-widest text-[#6F6F6F] font-semibold block mb-3 font-sans">
                CONCEPT
              </span>
              <p className="font-display font-black text-2xl sm:text-3xl text-[#000000] leading-snug">
                {currentCard.question}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-[#6F6F6F] pt-4 border-t border-black/[0.06] font-sans">
              <span>Reviewed {currentCard.reviewCount} times</span>
              <span className="font-semibold text-black">
                Reveal Answer &rsaquo;
              </span>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-[24px] p-8 sm:p-12 bg-white border border-black/[0.08] flex flex-col justify-between shadow-sm">
            <div className="flex items-center justify-between font-sans">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#5B875C]/15 text-[#5B875C]">
                Verified Concept
              </span>
              <span className="text-xs text-[#6F6F6F]">Click to flip back</span>
            </div>

            <div className="my-auto py-4 font-sans">
              <p className="text-base sm:text-lg text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
                {currentCard.answer}
              </p>

              {currentCard.explanation && (
                <div className="mt-4 p-4 rounded-xl bg-black/[0.02] border border-black/[0.05] text-xs text-[#6F6F6F] leading-relaxed">
                  <strong className="text-black block mb-1">Contextual Insight:</strong>
                  {currentCard.explanation}
                </div>
              )}
            </div>

            <div className="text-center text-xs text-[#6F6F6F] pt-2 border-t border-black/[0.06] font-sans">
              Rate your recall below to update repetition intervals
            </div>
          </div>
        </motion.div>
      </div>

      {/* Response Rating Buttons */}
      <AnimatePresence>
        {isFlipped ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-sans"
          >
            <button
              onClick={() => handleRateCard('again')}
              className="p-3.5 rounded-full border border-rose-300 bg-rose-50/50 hover:bg-rose-100 text-rose-700 font-medium text-xs sm:text-sm flex flex-col items-center gap-0.5 transition-all shadow-sm"
            >
              <span>1. Again</span>
              <span className="text-[10px] opacity-70">&lt; 10 min</span>
            </button>

            <button
              onClick={() => handleRateCard('hard')}
              className="p-3.5 rounded-full border border-amber-300 bg-amber-50/50 hover:bg-amber-100 text-amber-700 font-medium text-xs sm:text-sm flex flex-col items-center gap-0.5 transition-all shadow-sm"
            >
              <span>2. Hard</span>
              <span className="text-[10px] opacity-70">1 day</span>
            </button>

            <button
              onClick={() => handleRateCard('good')}
              className="p-3.5 rounded-full border border-black/20 bg-black/[0.03] hover:bg-black hover:text-white text-black font-medium text-xs sm:text-sm flex flex-col items-center gap-0.5 transition-all shadow-sm"
            >
              <span>3. Good</span>
              <span className="text-[10px] opacity-70">3 days</span>
            </button>

            <button
              onClick={() => handleRateCard('easy')}
              className="p-3.5 rounded-full border border-[#5B875C]/40 bg-[#5B875C]/10 hover:bg-[#5B875C] hover:text-white text-[#5B875C] font-medium text-xs sm:text-sm flex flex-col items-center gap-0.5 transition-all shadow-sm"
            >
              <span>4. Easy</span>
              <span className="text-[10px] opacity-70">7 days</span>
            </button>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between pt-2 font-sans">
            <GlowButton
              size="sm"
              variant="secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              icon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous
            </GlowButton>

            <button
              onClick={handleFlip}
              className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-medium hover:scale-[1.02] transition-transform shadow-sm"
            >
              Flip Card (Space)
            </button>

            <GlowButton
              size="sm"
              variant="secondary"
              onClick={handleNext}
              disabled={currentIndex === filteredCards.length - 1}
              icon={<ChevronRight className="w-4 h-4" />}
            >
              Next
            </GlowButton>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
