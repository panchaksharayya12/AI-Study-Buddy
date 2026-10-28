import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStudyData } from '../../context/StudyDataContext';
import { GlowButton } from '../common/GlowButton';
import { Modal } from '../common/Modal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { login, register, loginAsDemo } = useAuth();
  const { addToast } = useStudyData();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, name);
        addToast({
          type: 'success',
          title: 'Welcome Back',
          message: `Logged in as ${email}. Your study progress is synced.`,
        });
      } else {
        await register(name, email);
        addToast({
          type: 'success',
          title: 'Account Created',
          message: `Welcome to AI Study Buddy, ${name}!`,
        });
      }
      onSuccess();
      onClose();
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    loginAsDemo();
    addToast({
      type: 'info',
      title: 'Demo Session Active',
      message: 'Logged in as Alex Vance. All features and chapters unlocked.',
    });
    onSuccess();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="p-2 font-sans">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#000000]">
              {mode === 'login' ? 'Begin Journey' : 'Create Account'}
            </h2>
            <p className="text-xs text-[#6F6F6F] mt-1">
              {mode === 'login'
                ? 'Sign in to access your autonomous study studio.'
                : 'Start your accelerated AI study journey today.'}
            </p>
          </div>

          <div className="flex p-1 rounded-full bg-black/[0.04] text-xs font-medium">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                mode === 'login'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[#6F6F6F] hover:text-black'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`px-3 py-1 rounded-full transition-all ${
                mode === 'register'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[#6F6F6F] hover:text-black'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AnimatePresence>
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-xs font-semibold text-[#000000] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6F6F6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-black/[0.03] border border-black/10 text-[#000000] focus:outline-none focus:border-black"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-xs font-semibold text-[#000000] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6F6F6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-black/[0.03] border border-black/10 text-[#000000] focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#000000] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6F6F6F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-full text-xs bg-black/[0.03] border border-black/10 text-[#000000] focus:outline-none focus:border-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6F6F6F] hover:text-black"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-medium">
              {error}
            </p>
          )}

          <GlowButton
            type="submit"
            variant="primary"
            size="md"
            isLoading={isLoading}
            className="w-full mt-2 font-medium"
          >
            {mode === 'login' ? 'Enter Studio' : 'Create Account'}
          </GlowButton>
        </form>

        {/* Demo Login Option */}
        <div className="mt-6 pt-5 border-t border-black/[0.06]">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-medium bg-black/[0.04] hover:bg-black hover:text-white border border-black/10 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#5B875C]" />
            <span>One-Click Student Demo (Alex Vance)</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
