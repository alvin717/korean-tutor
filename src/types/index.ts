export type QuizType =
  | 'word-match'
  | 'listening'
  | 'speaking'
  | 'sentence-arrange'
  | 'fill-blank'
  | 'dictation';

export interface Question {
  id: string;
  type: QuizType;
  prompt: string;
  subPrompt?: string;
  koreanText?: string;
  englishText?: string;
  romanization?: string;
  audioPrompt?: string; // Text to speak via TTS
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  wordPairs?: { korean: string; english: string }[];
  hint?: string;
  grammarFocus?: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  unitTitle: string;
  title: string;
  titleEn?: string;
  description: string;
  level: '초급 1' | '초급 2' | '초급 3' | '중급 1';
  xpReward: number;
  difficulty: number; // 1 to 5
  questions: Question[];
  status: 'locked' | 'available' | 'completed';
}

export interface UnitGuidebook {
  title: string;
  grammarPoints: {
    title: string;
    explanation: string;
    examples: { korean: string; english: string }[];
  }[];
  keyVocab: { korean: string; english: string; pronunciation?: string }[];
  cultureTip?: string;
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  themeColor: string;
  lessons: Lesson[];
  checkpointGrammar: string[];
  totalVocab: number;
  guidebook?: UnitGuidebook;
}

export interface UserState {
  userId: string;
  name: string;
  avatar: string;
  streakCount: number;
  streakFreezeCount: number;
  isStreakActiveToday: boolean;
  hearts: number;
  maxHearts: number;
  gems: number;
  xpTotal: number;
  todayXp: number;
  dailyGoalXp: number;
  league: '브론즈' | '실버' | '골드' | '사파이어' | '다이아몬드';
  leagueRank: number;
  topikLevelForecast: {
    level: string;
    score: number;
    passProbability: number;
  };
  completedLessonIds: string[];
}

export interface SrsItem {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech: string;
  romanization: string;
  stability: number; // days
  difficulty: number; // 1 - 10
  retrievability: number; // 0.0 - 1.0
  reps: number;
  lapses: number;
  lastReviewDate: string;
  nextReviewDate: string;
  halfLifeDays: number;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  isCurrentUser?: boolean;
  rank: number;
  change: 'up' | 'down' | 'same';
}
