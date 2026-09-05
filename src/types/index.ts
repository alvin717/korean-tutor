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

export type WordTheme = 'all' | 'daily' | 'dining' | 'transport' | 'shopping' | 'emotions' | 'work' | 'health' | 'places';
export type WordPartOfSpeech = 'all' | 'noun' | 'verb' | 'adjective' | 'particle' | 'phrase' | 'interjection';
export type WordPronunciationRule = 'all' | 'standard' | 'liaison' | 'tensification' | 'aspiration' | 'neutralization';
export type WordTopikLevel = 'all' | '기초' | 'TOPIK I' | 'TOPIK II';

export interface SrsItem {
  id: string;
  word: string;
  meaning: string;
  partOfSpeech: string;
  posCategory?: 'noun' | 'verb' | 'adjective' | 'particle' | 'phrase' | 'interjection';
  theme?: 'daily' | 'dining' | 'transport' | 'shopping' | 'emotions' | 'work' | 'health' | 'places';
  pronunciationRule?: 'standard' | 'liaison' | 'tensification' | 'aspiration' | 'neutralization';
  ruleDescription?: string;
  topikLevel?: '기초' | 'TOPIK I' | 'TOPIK II';
  phoneticSpelling?: string; // e.g. [한구거], [추카], [식땅]
  exampleKorean?: string;
  exampleEnglish?: string;
  conjugation?: string; // e.g. '가다 → 가요, 갔어요'
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

export type NativeCountry = 'US' | 'JP' | 'CN' | 'VN' | 'ES' | 'FR' | 'DE' | 'ID' | 'TH' | 'BR';

export interface CountryInfo {
  code: NativeCountry;
  nameKo: string;
  nameNative: string;
  flag: string;
  languageName: string;
  langCode: string;
  partnerName: string;
  partnerCity: string;
  partnerAvatar: string;
}

export interface ExchangeScene {
  id: string;
  timeSlot: string; // e.g. '07:00'
  periodKo: string; // e.g. '아침 기상 & 모닝 루틴'
  periodEn: string;
  icon: string;
  situationSummaryKo: string;
  situationSummaryEn: string;
  partnerGreetingPromptKo: string;
  partnerGreetingPromptEn: string;
  
  // 1단계: 내가 내 나라 말로 알려주기
  nativeTeachTask: {
    questionKo: string;
    questionEn: string;
    options: {
      id: string;
      phraseByCountry: Record<NativeCountry, string>;
      pronunciationByCountry?: Record<NativeCountry, string>;
      meaningKo: string;
      isBestMatch: boolean;
      explanationKo: string;
      explanationEn: string;
    }[];
  };

  // 2단계: 한국인 친구가 한국의 진짜 일상 표현 알려주기
  koreanTeachInfo: {
    koreanPhrase: string;
    romanization: string;
    phoneticSpelling?: string;
    translationByCountry: Record<NativeCountry, string>;
    usageContextKo: string;
    usageContextEn: string;
    culturalNoteKo: string;
    culturalNoteEn: string;
    exampleDialogue: {
      speaker: 'korean' | 'me';
      speakerNameKo: string;
      speakerNameNative: string;
      korean: string;
      romanization?: string;
      translationByCountry: Record<NativeCountry, string>;
    }[];
  };

  // 3단계: 티키타카 상호 대화 퀴즈
  roleplayChallenge: {
    situationKo: string;
    situationEn: string;
    koreanFriendPrompt: string;
    options: {
      id: string;
      korean: string;
      romanization: string;
      translationByCountry: Record<NativeCountry, string>;
      isCorrect: boolean;
      friendReactionKo: string;
      friendReactionEn: string;
    }[];
  };
}

export type FanfareThemeId = 'classic' | 'arcade' | 'champion' | 'sparkle' | 'festival';

export interface FanfareThemeOption {
  id: FanfareThemeId;
  nameKo: string;
  nameEn: string;
  icon: string;
  descKo: string;
  descEn: string;
  tag: string;
}
