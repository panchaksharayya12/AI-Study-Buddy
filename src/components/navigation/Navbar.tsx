import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Settings,
  LogIn,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { GlowButton } from '../common/GlowButton';
import { ViewMode } from '../../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenAuth,
  onOpenSettings,
}) => {
  const { soundEnabled, toggleSound } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; view: ViewMode }[] = [
    { label: 'Home', view: 'landing' },
    { label: 'Dashboard', view: 'dashboard' },
    { label: 'Studio', view: 'materials' },
    { label: 'AI Tutor', view: 'tutor' },
    { label: 'Flashcards', view: 'flashcards' },
    { label: 'Journal', view: 'quiz' },
    { label: 'Planner', view: 'planner' },
    { label: 'Notes', view: 'notes' },
    { label: 'Analytics', view: 'analytics' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-black/[0.06] shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo: AI Study Buddy® in Modern Bold Sans */}
        <div
          onClick={() => onNavigate('landing')}
          className="cursor-pointer group flex items-center gap-2 select-none"
        >
          <span className="font-display font-black text-2xl tracking-tight text-[#000000]">
            AI Study Buddy<sup className="text-xs font-normal ml-0.5">®</sup>
          </span>
        </div>

        {/* Center Menu Items: Home, Dashboard, Studio, AI Tutor, Flashcards, Journal, Planner */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium font-sans">
          {navLinks.map(link => {
            const isActive = currentView === link.view;
            return (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className={`transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-[#000000] font-semibold'
                    : 'text-[#6F6F6F] hover:text-[#000000]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-[#000000] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Sound, Settings, CTA */}
        <div className="flex items-center gap-3">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound"
            className="p-2 rounded-full text-[#6F6F6F] hover:text-[#000000] hover:bg-black/5 transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#5B875C]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            aria-label="Settings"
            className="p-2 rounded-full text-[#6F6F6F] hover:text-[#000000] hover:bg-black/5 transition-colors"
            title="AI Key & Preferences"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Auth Button or User Badge */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2 pl-2 border-l border-black/10">
              <div
                onClick={() => onNavigate('dashboard')}
                className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-black/5 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-black/20"
                />
                <span className="hidden sm:inline text-xs font-medium text-[#000000]">
                  {user.name.split(' ')[0]}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-full text-[#6F6F6F] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <GlowButton
              size="sm"
              variant="primary"
              onClick={onOpenAuth}
            >
              Begin Journey
            </GlowButton>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#000000] hover:bg-black/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden px-6 py-4 bg-white/95 backdrop-blur-xl border-b border-black/10"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <button
                  key={link.view}
                  onClick={() => {
                    onNavigate(link.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    currentView === link.view
                      ? 'bg-black text-white'
                      : 'text-[#6F6F6F] hover:text-[#000000] hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
