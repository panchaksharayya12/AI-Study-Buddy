import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => Promise<void>;
  loginAsDemo: () => void;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  updateUserStats: (studyMinutesDelta: number) => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-demo-1',
  name: 'Alex Vance',
  email: 'alex.vance@studybuddy.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  streakDays: 7,
  totalStudyMinutes: 870,
  isDemo: true,
  createdAt: '2026-10-15',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('study_buddy_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    // Default to demo user so the platform is immediately interactive
    return DEFAULT_DEMO_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('study_buddy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('study_buddy_user');
    }
  }, [user]);

  const login = async (email: string, name?: string) => {
    // Simulated authentication with real client persistence
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(email)}`,
      streakDays: 1,
      totalStudyMinutes: 0,
      isDemo: false,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const loginAsDemo = () => {
    setUser(DEFAULT_DEMO_USER);
  };

  const register = async (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      streakDays: 1,
      totalStudyMinutes: 0,
      isDemo: false,
      createdAt: new Date().toISOString(),
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserStats = (studyMinutesDelta: number) => {
    if (!user) return;
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        totalStudyMinutes: prev.totalStudyMinutes + studyMinutesDelta,
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginAsDemo,
        register,
        logout,
        updateUserStats,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
