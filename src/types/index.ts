export type ViewMode = 
  | 'landing' 
  | 'dashboard' 
  | 'materials' 
  | 'tutor' 
  | 'flashcards' 
  | 'quiz' 
  | 'planner' 
  | 'notes' 
  | 'analytics';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  streakDays: number;
  totalStudyMinutes: number;
  isDemo: boolean;
  createdAt: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  category: string;
  fileName: string;
  fileSize: string;
  fileType: 'pdf' | 'txt' | 'md' | 'doc';
  uploadDate: string;
  content: string;
  summary: string;
  keyConcepts: string[];
  readTimeMinutes: number;
  flashcardCount: number;
  quizCount: number;
}

export type FlashcardMastery = 'again' | 'hard' | 'good' | 'easy' | 'unseen';

export interface Flashcard {
  id: string;
  materialId: string;
  question: string;
  answer: string;
  explanation?: string;
  category: string;
  mastery: FlashcardMastery;
  reviewCount: number;
  lastReviewed?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  materialId: string;
  title: string;
  category: string;
  questions: QuizQuestion[];
  timeLimitMinutes?: number;
  bestScore?: number;
  attemptsCount: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  date: string;
  score: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  userAnswers: number[];
}

export interface StudyTask {
  id: string;
  title: string;
  category: 'Exam Prep' | 'Homework' | 'Review' | 'Reading' | 'Project';
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
}

export interface SmartNote {
  id: string;
  materialId?: string;
  title: string;
  category: string;
  lastModified: string;
  summary: string;
  keyPoints: string[];
  sections: {
    title: string;
    content: string;
    highlights: string[];
  }[];
  userEdits?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  duration?: number;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  count: number; // intensity 0-4
  studyMinutes: number;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
}
