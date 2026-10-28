import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ViewMode } from './types';
import { useAuth } from './context/AuthContext';
import { AnimatedBackground } from './components/common/AnimatedBackground';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/navigation/Navbar';
import { PageTransition } from './components/navigation/PageTransition';

// Intro
import { CinematicIntro } from './components/intro/CinematicIntro';

// Landing Page Components
import { CinematicHero } from './components/landing/CinematicHero';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { HowItWorks } from './components/landing/HowItWorks';
import { StatsSection } from './components/landing/StatsSection';
import { Testimonials } from './components/landing/Testimonials';
import { CtaSection } from './components/landing/CtaSection';

// Feature Views
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { MaterialsView } from './components/materials/MaterialsView';
import { AiTutorView } from './components/tutor/AiTutorView';
import { FlashcardsView } from './components/flashcards/FlashcardsView';
import { QuizView } from './components/quiz/QuizView';
import { StudyPlannerView } from './components/planner/StudyPlannerView';
import { SmartNotesView } from './components/notes/SmartNotesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';

// Modals
import { AuthModal } from './components/auth/AuthModal';
import { SettingsModal } from './components/settings/SettingsModal';

export const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<ViewMode>('landing');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  // Intro overlay state (disabled by default so user immediately lands on cinematic hero)
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    return sessionStorage.getItem('study_buddy_intro_played') === 'replay';
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem('study_buddy_intro_played', 'true');
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const handleNavigate = (view: ViewMode) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      handleNavigate('dashboard');
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FAFAF8] text-[#000000] selection:bg-black selection:text-white font-sans antialiased">
      {/* Cinematic Intro Animation */}
      {showIntro && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Global Ambient Background */}
      <AnimatedBackground />

      {/* Global Toast Notification System */}
      <ToastContainer />

      {/* Single Unified Top Navigation Bar (Consistent Across the Entire Site) */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main Content Area (Spacious & Clean without redundant sidebars) */}
      <main className="flex-1 w-full overflow-x-hidden pt-24 px-6 sm:px-8 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && (
            <PageTransition key="landing" viewKey="landing">
              <div className="-mt-24 -mx-6 sm:-mx-8">
                <CinematicHero
                  onBeginJourney={handleGetStarted}
                  onNavigate={handleNavigate}
                />
                <div className="px-6 sm:px-8 max-w-7xl mx-auto">
                  <StatsSection />
                  <FeaturesGrid onSelectFeature={handleNavigate} />
                  <HowItWorks />
                  <Testimonials />
                  <CtaSection onGetStarted={handleGetStarted} />
                </div>
              </div>
            </PageTransition>
          )}

          {currentView === 'dashboard' && (
            <PageTransition key="dashboard" viewKey="dashboard">
              <DashboardOverview onNavigate={handleNavigate} />
            </PageTransition>
          )}

          {currentView === 'materials' && (
            <PageTransition key="materials" viewKey="materials">
              <MaterialsView onNavigate={handleNavigate} />
            </PageTransition>
          )}

          {currentView === 'tutor' && (
            <PageTransition key="tutor" viewKey="tutor">
              <AiTutorView />
            </PageTransition>
          )}

          {currentView === 'flashcards' && (
            <PageTransition key="flashcards" viewKey="flashcards">
              <FlashcardsView />
            </PageTransition>
          )}

          {currentView === 'quiz' && (
            <PageTransition key="quiz" viewKey="quiz">
              <QuizView />
            </PageTransition>
          )}

          {currentView === 'planner' && (
            <PageTransition key="planner" viewKey="planner">
              <StudyPlannerView />
            </PageTransition>
          )}

          {currentView === 'notes' && (
            <PageTransition key="notes" viewKey="notes">
              <SmartNotesView />
            </PageTransition>
          )}

          {currentView === 'analytics' && (
            <PageTransition key="analytics" viewKey="analytics">
              <AnalyticsView />
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="py-12 border-t border-black/[0.06] mt-20 text-xs text-[#6F6F6F] font-sans">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-display text-lg text-[#000000]">
              AI Study Buddy<sup className="text-[10px] ml-0.5">®</sup>
            </span>
            <span>· Autonomous Learning Studio</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavigate('dashboard')} className="hover:text-black transition-colors">
              Dashboard
            </button>
            <button onClick={() => handleNavigate('materials')} className="hover:text-black transition-colors">
              Studio
            </button>
            <button onClick={() => handleNavigate('tutor')} className="hover:text-black transition-colors">
              AI Tutor
            </button>
            <button onClick={() => handleNavigate('flashcards')} className="hover:text-black transition-colors">
              Flashcards
            </button>
            <button onClick={handleReplayIntro} className="hover:text-black transition-colors">
              Replay Intro
            </button>
          </div>
          <div>&copy; 2026 AI Study Buddy®. All rights reserved.</div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => handleNavigate('dashboard')}
      />

      {/* Preferences & Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        onReplayIntro={handleReplayIntro}
      />
    </div>
  );
};
