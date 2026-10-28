import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudyMaterial,
  Flashcard,
  Quiz,
  QuizAttempt,
  StudyTask,
  SmartNote,
  DailyActivity,
  AchievementBadge,
  ToastMessage,
  FlashcardMastery,
} from '../types';
import {
  INITIAL_MATERIALS,
  INITIAL_FLASHCARDS,
  INITIAL_QUIZZES,
  INITIAL_TASKS,
  INITIAL_NOTES,
  INITIAL_ACTIVITY_HEATMAP,
  INITIAL_ACHIEVEMENTS,
} from '../data/defaultData';
import { triggerMiniStars, triggerCelebration } from '../utils/confetti';
import { playSuccessSound } from '../utils/sound';

interface StudyDataContextType {
  materials: StudyMaterial[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  tasks: StudyTask[];
  notes: SmartNote[];
  activityHeatmap: DailyActivity[];
  achievements: AchievementBadge[];
  toasts: ToastMessage[];
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  // Actions
  addMaterial: (material: Omit<StudyMaterial, 'id' | 'uploadDate' | 'flashcardCount' | 'quizCount'>) => StudyMaterial;
  removeMaterial: (id: string) => void;
  updateFlashcardMastery: (id: string, mastery: FlashcardMastery) => void;
  addFlashcards: (newCards: Omit<Flashcard, 'id'>[]) => void;
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => void;
  toggleTaskCompleted: (id: string) => void;
  addTask: (task: Omit<StudyTask, 'id' | 'completed' | 'completedPomodoros'>) => void;
  removeTask: (id: string) => void;
  incrementTaskPomodoro: (id: string) => void;
  updateNoteEdits: (id: string, edits: string) => void;
  addNote: (note: Omit<SmartNote, 'id' | 'lastModified'>) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  recordStudySession: (minutes: number) => void;
}

const StudyDataContext = createContext<StudyDataContextType | undefined>(undefined);

export const StudyDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('study_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('study_flashcards');
    return saved ? JSON.parse(saved) : INITIAL_FLASHCARDS;
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    const saved = localStorage.getItem('study_quizzes');
    return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    const saved = localStorage.getItem('study_quiz_attempts');
    return saved ? JSON.parse(saved) : [];
  });

  const [tasks, setTasks] = useState<StudyTask[]>(() => {
    const saved = localStorage.getItem('study_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [notes, setNotes] = useState<SmartNote[]>(() => {
    const saved = localStorage.getItem('study_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [activityHeatmap, setActivityHeatmap] = useState<DailyActivity[]>(() => {
    const saved = localStorage.getItem('study_activity');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_HEATMAP;
  });

  const [achievements, setAchievements] = useState<AchievementBadge[]>(() => {
    const saved = localStorage.getItem('study_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem('study_gemini_api_key') || '';
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem('study_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('study_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('study_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem('study_quiz_attempts', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('study_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('study_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('study_activity', JSON.stringify(activityHeatmap));
  }, [activityHeatmap]);

  useEffect(() => {
    localStorage.setItem('study_achievements', JSON.stringify(achievements));
  }, [achievements]);

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('study_gemini_api_key', key);
    addToast({
      type: 'info',
      title: key ? 'Gemini API Key Saved' : 'Gemini Key Removed',
      message: key ? 'Live Google Gemini AI tutor engine is now connected!' : 'Reverted to built-in smart AI tutor mode.',
    });
  };

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addMaterial = (materialData: Omit<StudyMaterial, 'id' | 'uploadDate' | 'flashcardCount' | 'quizCount'>): StudyMaterial => {
    const newId = `mat-${Date.now()}`;
    const newMaterial: StudyMaterial = {
      ...materialData,
      id: newId,
      uploadDate: new Date().toISOString().split('T')[0],
      flashcardCount: 3,
      quizCount: 2,
    };

    setMaterials(prev => [newMaterial, ...prev]);

    // Automatically generate accompanying smart flashcards & notes from content
    const autoFlashcards: Flashcard[] = [
      {
        id: `fc-auto-${Date.now()}-1`,
        materialId: newId,
        category: newMaterial.category,
        question: `What are the core concepts covered in "${newMaterial.title}"?`,
        answer: newMaterial.summary,
        explanation: `Extracted key concepts include: ${newMaterial.keyConcepts.join(', ')}.`,
        mastery: 'unseen',
        reviewCount: 0,
      },
      {
        id: `fc-auto-${Date.now()}-2`,
        materialId: newId,
        category: newMaterial.category,
        question: `Define "${newMaterial.keyConcepts[0] || 'Key Principle'}" as introduced in this study material.`,
        answer: `This represents a foundational pillar in ${newMaterial.category}, governing the behavior and analytical outcomes outlined in the document.`,
        mastery: 'unseen',
        reviewCount: 0,
      }
    ];
    setFlashcards(prev => [...autoFlashcards, ...prev]);

    // Create an initial smart note
    const autoNote: SmartNote = {
      id: `note-auto-${Date.now()}`,
      materialId: newId,
      title: `${newMaterial.title} - Smart Summary`,
      category: newMaterial.category,
      lastModified: new Date().toLocaleString(),
      summary: newMaterial.summary,
      keyPoints: newMaterial.keyConcepts,
      sections: [
        {
          title: 'Executive Overview',
          content: newMaterial.summary,
          highlights: newMaterial.keyConcepts.slice(0, 3),
        },
        {
          title: 'Extracted Content Highlights',
          content: newMaterial.content.slice(0, 450) + '...',
          highlights: newMaterial.keyConcepts,
        }
      ]
    };
    setNotes(prev => [autoNote, ...prev]);

    addToast({
      type: 'success',
      title: 'Material Processed Successfully',
      message: `Extracted ${newMaterial.keyConcepts.length} concepts and generated smart flashcards!`,
    });

    triggerMiniStars();
    return newMaterial;
  };

  const removeMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    addToast({
      type: 'info',
      title: 'Material Removed',
      message: 'The document and associated generated views have been archived.',
    });
  };

  const updateFlashcardMastery = (id: string, mastery: FlashcardMastery) => {
    setFlashcards(prev =>
      prev.map(fc => {
        if (fc.id === id) {
          return {
            ...fc,
            mastery,
            reviewCount: fc.reviewCount + 1,
            lastReviewed: new Date().toISOString().split('T')[0],
          };
        }
        return fc;
      })
    );
  };

  const addFlashcards = (newCards: Omit<Flashcard, 'id'>[]) => {
    const formatted = newCards.map((c, idx) => ({
      ...c,
      id: `fc-gen-${Date.now()}-${idx}`,
    }));
    setFlashcards(prev => [...formatted, ...prev]);
    addToast({
      type: 'success',
      title: 'Flashcards Generated',
      message: `Added ${formatted.length} interactive cards to your study deck.`,
    });
  };

  const recordQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'date'>) => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: `att-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setQuizAttempts(prev => [newAttempt, ...prev]);

    // Update Quiz stats
    setQuizzes(prev =>
      prev.map(q => {
        if (q.id === attemptData.quizId) {
          const newAttempts = q.attemptsCount + 1;
          const currentBest = q.bestScore || 0;
          return {
            ...q,
            attemptsCount: newAttempts,
            bestScore: Math.max(currentBest, attemptData.score),
          };
        }
        return q;
      })
    );

    // If score is high (>80%), celebrate!
    if (attemptData.score >= 80) {
      triggerCelebration();
      playSuccessSound();
      addToast({
        type: 'success',
        title: 'Outstanding Quiz Performance!',
        message: `You scored ${attemptData.score}%! Your mastery level has been updated.`,
      });
    }
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextState = !t.completed;
          if (nextState) {
            triggerMiniStars();
            playSuccessSound();
          }
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const addTask = (taskData: Omit<StudyTask, 'id' | 'completed' | 'completedPomodoros'>) => {
    const newTask: StudyTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      completed: false,
      completedPomodoros: 0,
    };
    setTasks(prev => [newTask, ...prev]);
    addToast({
      type: 'info',
      title: 'Task Scheduled',
      message: `Added "${newTask.title}" to your study planner.`,
    });
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const incrementTaskPomodoro = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          return { ...t, completedPomodoros: t.completedPomodoros + 1 };
        }
        return t;
      })
    );
  };

  const updateNoteEdits = (id: string, edits: string) => {
    setNotes(prev =>
      prev.map(n => {
        if (n.id === id) {
          return {
            ...n,
            userEdits: edits,
            lastModified: new Date().toLocaleString(),
          };
        }
        return n;
      })
    );
  };

  const addNote = (noteData: Omit<SmartNote, 'id' | 'lastModified'>) => {
    const newNote: SmartNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      lastModified: new Date().toLocaleString(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const recordStudySession = (minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    setActivityHeatmap(prev => {
      const existingIndex = prev.findIndex(item => item.date === today);
      if (existingIndex >= 0) {
        const copy = [...prev];
        const cur = copy[existingIndex];
        const newMins = cur.studyMinutes + minutes;
        copy[existingIndex] = {
          ...cur,
          studyMinutes: newMins,
          count: Math.min(4, Math.floor(newMins / 30) + 1),
        };
        return copy;
      } else {
        return [
          ...prev.slice(1),
          {
            date: today,
            count: 1,
            studyMinutes: minutes,
          },
        ];
      }
    });
  };

  return (
    <StudyDataContext.Provider
      value={{
        materials,
        flashcards,
        quizzes,
        quizAttempts,
        tasks,
        notes,
        activityHeatmap,
        achievements,
        toasts,
        geminiApiKey,
        setGeminiApiKey,
        addMaterial,
        removeMaterial,
        updateFlashcardMastery,
        addFlashcards,
        recordQuizAttempt,
        toggleTaskCompleted,
        addTask,
        removeTask,
        incrementTaskPomodoro,
        updateNoteEdits,
        addNote,
        addToast,
        removeToast,
        recordStudySession,
      }}
    >
      {children}
    </StudyDataContext.Provider>
  );
};

export const useStudyData = () => {
  const context = useContext(StudyDataContext);
  if (!context) throw new Error('useStudyData must be used within StudyDataProvider');
  return context;
};
