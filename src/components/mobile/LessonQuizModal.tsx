import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Mic, RotateCcw, Check } from 'lucide-react';
import { Lesson, Question, QuizType } from '../../types';
import { sounds, speakKorean, speakEnglish, speakByLanguage, FANFARE_THEMES } from '../../utils/audio';
import { triggerCorrectFireworks, triggerGrandLessonFireworks } from '../../utils/confettiEffects';
import { FanfareSettingsModal } from './FanfareSettingsModal';

interface LessonQuizModalProps {
  lesson: Lesson;
  hearts: number;
  onClose: () => void;
  onComplete: (earnedXp: number) => void;
  onLoseHeart: () => void;
}

export const LessonQuizModal: React.FC<LessonQuizModalProps> = ({
  lesson,
  hearts,
  onClose,
  onComplete,
  onLoseHeart,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [arrangedWords, setArrangedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  
  // Word matching state
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [selectedWordCard, setSelectedWordCard] = useState<{ id: string; text: string; lang: 'kr' | 'en' } | null>(null);
  const [shuffledKrCards, setShuffledKrCards] = useState<{ id: string; text: string; lang: 'kr' }[]>([]);
  const [shuffledEnCards, setShuffledEnCards] = useState<{ id: string; text: string; lang: 'en' }[]>([]);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [matchDirection, setMatchDirection] = useState<'kr-to-en' | 'en-to-kr'>('kr-to-en');
  const [lastAudioPrompt, setLastAudioPrompt] = useState<{ korean: string; english: string } | null>(null);

  // Speaking state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedSpeech, setRecordedSpeech] = useState<string | null>(null);
  const [speechScore, setSpeechScore] = useState<number | null>(null);

  // Listening 4-question challenge state
  const [listeningTargets, setListeningTargets] = useState<string[]>([]);
  const [activeListeningIndex, setActiveListeningIndex] = useState<number>(0);
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
  const [listeningResults, setListeningResults] = useState<Record<number, boolean> | null>(null);
  const [playingTargetIndex, setPlayingTargetIndex] = useState<number | null>(null);

  // Feedback state
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isFanfareModalOpen, setIsFanfareModalOpen] = useState<boolean>(false);
  const [activeFanfareInfo, setActiveFanfareInfo] = useState<{ nameKo: string; icon: string } | null>(null);

  // Listen to fanfare events to display an interactive celebration toast
  useEffect(() => {
    const unsubscribe = sounds.onFanfarePlay((themeId) => {
      const themeObj = FANFARE_THEMES.find(t => t.id === themeId);
      if (themeObj) {
        setActiveFanfareInfo({ nameKo: themeObj.nameKo, icon: themeObj.icon });
        const timer = setTimeout(() => {
          setActiveFanfareInfo(null);
        }, 2600);
        return () => clearTimeout(timer);
      }
    });
    return unsubscribe;
  }, []);

  const currentQuestion: Question | undefined = lesson.questions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / lesson.questions.length) * 100);

  // Initialize question state when question changes
  useEffect(() => {
    if (!currentQuestion) return;
    setSelectedOption(null);
    setTextInput('');
    setAnswerStatus('idle');
    setRecordedSpeech(null);
    setSpeechScore(null);
    setIsRecording(false);
    setSelectedWordCard(null);

    if (currentQuestion.type === 'sentence-arrange') {
      const original = currentQuestion.options || [];
      const expected = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer.join(' ')
        : currentQuestion.correctAnswer;
      let shuffled = [...original].sort(() => Math.random() - 0.5);
      if (shuffled.join(' ') === expected && shuffled.length > 1) {
        shuffled = [...shuffled].reverse();
      }
      setAvailableWords(shuffled);
      setArrangedWords([]);
    }

    if (currentQuestion.type === 'word-match' && currentQuestion.wordPairs) {
      setMatchedPairs([]);
      const pairs = currentQuestion.wordPairs;
      const kr = pairs.map((p, idx) => ({ id: `kr-${p.korean}-${idx}`, text: p.korean, lang: 'kr' as const }));
      const en = pairs.map((p, idx) => ({ id: `en-${p.english}-${idx}`, text: p.english, lang: 'en' as const }));

      // 1. Randomize Korean list
      const shuffledKr = [...kr].sort(() => Math.random() - 0.5);

      // 2. Randomize English list with guaranteed crisscross / derangement
      // (Ensures no word directly horizontally aligns with its pair on the same row!)
      let shuffledEn = [...en].sort(() => Math.random() - 0.5);
      if (pairs.length > 1) {
        for (let attempt = 0; attempt < 20; attempt++) {
          let hasHorizontalMatch = false;
          for (let i = 0; i < shuffledKr.length; i++) {
            const krItem = shuffledKr[i];
            const matchingPair = pairs.find(p => p.korean === krItem.text);
            if (shuffledEn[i]?.text === matchingPair?.english) {
              hasHorizontalMatch = true;
              const swapIdx = (i + 1) % shuffledEn.length;
              const temp = shuffledEn[i];
              shuffledEn[i] = shuffledEn[swapIdx];
              shuffledEn[swapIdx] = temp;
            }
          }
          if (!hasHorizontalMatch) break;
        }
      }

      setShuffledKrCards(shuffledKr);
      setShuffledEnCards(shuffledEn);
    }

    if (currentQuestion.options) {
      setShuffledOptions([...currentQuestion.options].sort(() => Math.random() - 0.5));
    } else {
      setShuffledOptions([]);
    }

    if (currentQuestion.type === 'listening') {
      const opts = currentQuestion.options || [];
      // Use options as the 4 targets to be tested for each of the 4 listening questions
      const targets = opts.length > 0 ? [...opts].sort(() => Math.random() - 0.5) : [currentQuestion.correctAnswer as string];
      setListeningTargets(targets);
      setActiveListeningIndex(0);
      setListeningAnswers({});
      setListeningResults(null);
      setPlayingTargetIndex(null);
    } else if (currentQuestion.type === 'dictation') {
      setTimeout(() => {
        speakKorean(currentQuestion.audioPrompt || currentQuestion.koreanText || '');
      }, 350);
    }
  }, [currentIndex, currentQuestion]);

  if (!currentQuestion && !isCompleted) {
    return null;
  }

  // Handle listening quiz target audio playback
  const handlePlayTargetAudio = (idx: number, word: string) => {
    sounds.playTap();
    setPlayingTargetIndex(idx);
    speakKorean(word);
    setTimeout(() => {
      setPlayingTargetIndex((prev) => (prev === idx ? null : prev));
    }, 1200);
  };

  // Handle TTS speaker button
  const handlePlayAudio = (text?: string, langHint?: 'kr' | 'en') => {
    sounds.playTap();
    const target = text || currentQuestion?.audioPrompt || currentQuestion?.koreanText || '';
    if (langHint === 'en') {
      speakEnglish(target);
    } else if (langHint === 'kr') {
      speakKorean(target);
    } else {
      speakByLanguage(target);
    }
  };

  // Word Matching logic
  const handleSelectWordCard = (id: string, text: string, lang: 'kr' | 'en') => {
    sounds.playTap();
    if (matchedPairs.includes(text)) return;

    const pairs = currentQuestion?.wordPairs || [];

    // Pronunciation on tap:
    // English words are pronounced with natural English native voice!
    // Korean words are pronounced with natural Korean native voice!
    if (lang === 'en') {
      speakEnglish(text);
      const match = pairs.find(p => p.english === text);
      if (match) {
        setLastAudioPrompt({ korean: match.korean, english: text });
      }
    } else if (lang === 'kr') {
      speakKorean(text);
      const match = pairs.find(p => p.korean === text);
      if (match) {
        setLastAudioPrompt({ korean: text, english: match.english });
      }
    }

    if (!selectedWordCard) {
      setSelectedWordCard({ id, text, lang });
      return;
    }

    if (selectedWordCard.lang === lang) {
      setSelectedWordCard({ id, text, lang });
      return;
    }

    // Check pair match between kr and en
    let isMatch = false;
    if (selectedWordCard.lang === 'kr' && lang === 'en') {
      isMatch = pairs.some(p => p.korean === selectedWordCard.text && p.english === text);
    } else if (selectedWordCard.lang === 'en' && lang === 'kr') {
      isMatch = pairs.some(p => p.korean === text && p.english === selectedWordCard.text);
    }

    if (isMatch) {
      sounds.playSuccess();
      const krWord = selectedWordCard.lang === 'kr' ? selectedWordCard.text : text;
      const enWord = selectedWordCard.lang === 'en' ? selectedWordCard.text : text;
      const nextMatched = [...matchedPairs, krWord, enWord];
      setMatchedPairs(nextMatched);
      setSelectedWordCard(null);

      // Pronounce the matched Korean word in celebration
      speakKorean(krWord);

      // If all matched
      if (nextMatched.length >= pairs.length * 2) {
        sounds.playFanfare();
        triggerCorrectFireworks();
        setAnswerStatus('correct');
      }
    } else {
      sounds.playError();
      setSelectedWordCard(null);
    }
  };

  // Speech recording simulation / SpeechRecognition
  const handleStartSpeaking = () => {
    sounds.playTap();
    setIsRecording(true);
    setRecordedSpeech('듣는 중... 말씀해 주세요 🎙️');

    // Simulate speech recognition result after 1.8s
    setTimeout(() => {
      setIsRecording(false);
      const targetText = currentQuestion?.koreanText || '';
      setRecordedSpeech(targetText);
      const score = Math.floor(88 + Math.random() * 11); // 88 ~ 98%
      setSpeechScore(score);
      sounds.playFanfare();
      triggerCorrectFireworks();
      setAnswerStatus('correct');
    }, 1800);
  };

  // Word arrange chips logic
  const handleAddWordChip = (word: string, index: number) => {
    sounds.playTap();
    setArrangedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWordChip = (word: string, index: number) => {
    sounds.playTap();
    setAvailableWords(prev => [...prev, word]);
    setArrangedWords(prev => prev.filter((_, i) => i !== index));
  };

  // Retry listening: keep correct ones, clear wrong ones
  const handleRetryListening = () => {
    sounds.playTap();
    setAnswerStatus('idle');
    if (listeningResults) {
      const nextAnswers: Record<number, string> = {};
      listeningTargets.forEach((_, idx) => {
        if (listeningResults[idx]) {
          nextAnswers[idx] = listeningAnswers[idx];
        }
      });
      setListeningAnswers(nextAnswers);
    }
    setListeningResults(null);
    setPlayingTargetIndex(null);
  };

  // Check Answer Handler
  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (currentQuestion.type === 'listening') {
      let allCorrect = true;
      const results: Record<number, boolean> = {};
      listeningTargets.forEach((target, idx) => {
        const isSubCorrect = listeningAnswers[idx] === target;
        results[idx] = isSubCorrect;
        if (!isSubCorrect) {
          allCorrect = false;
        }
      });
      setListeningResults(results);

      if (allCorrect) {
        sounds.playFanfare();
        triggerCorrectFireworks();
        setAnswerStatus('correct');
      } else {
        sounds.playError();
        setAnswerStatus('wrong');
        onLoseHeart();
        const firstWrong = listeningTargets.findIndex((_, idx) => !results[idx]);
        if (firstWrong !== -1) {
          setActiveListeningIndex(firstWrong);
        }
      }
      return;
    } else if (currentQuestion.type === 'fill-blank') {
      isCorrect = selectedOption === currentQuestion.correctAnswer;
    } else if (currentQuestion.type === 'sentence-arrange') {
      const expected = Array.isArray(currentQuestion.correctAnswer)
        ? currentQuestion.correctAnswer.join(' ')
        : currentQuestion.correctAnswer;
      isCorrect = arrangedWords.join(' ') === expected;
    } else if (currentQuestion.type === 'dictation') {
      const cleanInput = textInput.trim().replace(/\s+/g, ' ');
      const cleanExpected = (currentQuestion.correctAnswer as string).trim().replace(/\s+/g, ' ');
      isCorrect = cleanInput === cleanExpected;
    } else if (currentQuestion.type === 'speaking') {
      isCorrect = (speechScore ?? 0) >= 80;
    } else if (currentQuestion.type === 'word-match') {
      isCorrect = matchedPairs.length >= (currentQuestion.wordPairs?.length || 0) * 2;
    }

    if (isCorrect) {
      sounds.playFanfare();
      triggerCorrectFireworks();
      setAnswerStatus('correct');
    } else {
      sounds.playError();
      setAnswerStatus('wrong');
      onLoseHeart();
    }
  };

  // Continue to Next Question or Complete
  const handleContinue = () => {
    sounds.playTap();
    if (currentIndex + 1 < lesson.questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Lesson Complete!
      setIsCompleted(true);
      sounds.playStreakFanfare();
      triggerGrandLessonFireworks();
      // Do not call onComplete here immediately; let user see victory summary screen first
    }
  };

  // Render Quiz Question Body based on type
  const renderQuizBody = () => {
    switch (currentQuestion.type) {
      case 'word-match': {
        const pairs = currentQuestion.wordPairs || [];
        const krCards = shuffledKrCards.length > 0
          ? shuffledKrCards
          : pairs.map((p, idx) => ({ id: `kr-${p.korean}-${idx}`, text: p.korean, lang: 'kr' as const }));
        const enCards = shuffledEnCards.length > 0
          ? shuffledEnCards
          : pairs.map((p, idx) => ({ id: `en-${p.english}-${idx}`, text: p.english, lang: 'en' as const }));

        // Render English cards column
        const renderEnglishColumn = (stagger: boolean) => (
          <div className={`space-y-2.5 ${stagger ? 'pt-1.5 sm:pt-2' : ''}`}>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center py-0.5 flex items-center justify-center gap-1">
              <span>🇺🇸 영어 (영어 발음)</span>
              <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            {enCards.map((item) => {
              const isMatched = matchedPairs.includes(item.text);
              const isSelected = selectedWordCard?.text === item.text && selectedWordCard.lang === 'en';
              const matchPair = pairs.find(p => p.english === item.text);
              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleSelectWordCard(item.id, item.text, item.lang)}
                  className={`w-full py-3.5 px-3 sm:px-4 rounded-2xl font-bold text-sm transition-all border relative cursor-pointer flex items-center justify-between gap-1 group ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700 opacity-60 line-through'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white ring-4 ring-indigo-500/20 shadow-md scale-102 -translate-y-0.5'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/30 shadow-xs active:scale-95'
                  }`}
                >
                  <span className="flex-1 text-center truncate">{item.text}</span>
                  {!isMatched && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playTap();
                        speakEnglish(item.text);
                        if (matchPair) {
                          setLastAudioPrompt({ korean: matchPair.korean, english: item.text });
                        }
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        isSelected ? 'text-white hover:bg-indigo-700' : 'text-indigo-600 hover:bg-indigo-100'
                      }`}
                      title="🇺🇸 영어 원어민 발음 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </span>
                  )}
                  {isMatched && (
                    <span className="text-[10px] text-emerald-600 font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        );

        // Render Korean cards column
        const renderKoreanColumn = (stagger: boolean) => (
          <div className={`space-y-2.5 ${stagger ? 'pt-1.5 sm:pt-2' : ''}`}>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center py-0.5 flex items-center justify-center gap-1">
              <span>🇰🇷 한글 (한국어 발음)</span>
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            {krCards.map((item) => {
              const isMatched = matchedPairs.includes(item.text);
              const isSelected = selectedWordCard?.text === item.text && selectedWordCard.lang === 'kr';
              const matchPair = pairs.find(p => p.korean === item.text);
              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleSelectWordCard(item.id, item.text, item.lang)}
                  className={`w-full py-3.5 px-3 sm:px-4 rounded-2xl font-black text-base transition-all border relative cursor-pointer flex items-center justify-between gap-1 group ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-700 opacity-60 line-through'
                      : isSelected
                      ? 'bg-emerald-600 border-emerald-500 text-white ring-4 ring-emerald-500/20 shadow-md scale-102 -translate-y-0.5'
                      : 'bg-white border-slate-200 text-slate-900 hover:border-emerald-300 hover:bg-emerald-50/30 shadow-xs active:scale-95'
                  }`}
                >
                  <span className="flex-1 text-center truncate">{item.text}</span>
                  {!isMatched && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playTap();
                        speakKorean(item.text);
                        if (matchPair) {
                          setLastAudioPrompt({ korean: item.text, english: matchPair.english });
                        }
                      }}
                      className={`p-1 rounded-md transition-colors ${
                        isSelected ? 'text-white hover:bg-emerald-700' : 'text-emerald-600 hover:bg-emerald-100'
                      }`}
                      title="🇰🇷 한국어 원어민 발음 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </span>
                  )}
                  {isMatched && (
                    <span className="text-[10px] text-emerald-600 font-bold">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        );

        return (
          <div className="space-y-3.5">
            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setMatchDirection('kr-to-en');
                  setSelectedWordCard(null);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  matchDirection === 'kr-to-en'
                    ? 'bg-white text-emerald-800 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇰🇷 한글 발음 듣고 ➔ 🇺🇸 영어 맞추기
              </button>
              <button
                type="button"
                onClick={() => {
                  sounds.playTap();
                  setMatchDirection('en-to-kr');
                  setSelectedWordCard(null);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  matchDirection === 'en-to-kr'
                    ? 'bg-white text-indigo-800 shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎧 🇺🇸 영어 발음 듣고 ➔ 🇰🇷 한글 맞추기
              </button>
            </div>

            {/* Crisscross Pairs Status & Remaining Count */}
            <div className="flex items-center justify-between px-1 text-xs">
              <span className="font-extrabold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 flex items-center gap-1">
                <span>🔀</span> {matchDirection === 'kr-to-en' ? '왼쪽 한글 ➔ 오른쪽 영어 지그재그 매칭' : '오른쪽 영어 듣고 ➔ 왼쪽 한글 찾기'}
              </span>
              <span className="text-slate-600 font-semibold">
                남은 짝: {Math.max(0, (currentQuestion.wordPairs?.length || 0) - Math.floor(matchedPairs.length / 2))}개
              </span>
            </div>

            {/* Audio Prompt Feedback Banner with Dual Pronunciation Buttons (Korean on Left, English on Right) */}
            {lastAudioPrompt && (
              <div className="p-3 bg-slate-50/90 border border-slate-200/80 rounded-2xl space-y-2 text-xs animate-in fade-in shadow-2xs">
                <div className="flex items-center justify-between text-slate-600 font-semibold px-0.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>선택 단어 원어민 발음 비교</span>
                  </span>
                  <span className="text-[11px] text-slate-500">언어별 버튼을 눌러 개별 청취</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      speakKorean(lastAudioPrompt.korean);
                    }}
                    className="py-2 px-2.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl flex items-center justify-between font-black text-slate-900 transition-colors shadow-2xs cursor-pointer"
                    title="한국어 원어민 발음 듣기"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>🇰🇷</span>
                      <span className="truncate">{lastAudioPrompt.korean}</span>
                    </span>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      speakEnglish(lastAudioPrompt.english);
                    }}
                    className="py-2 px-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded-xl flex items-center justify-between font-bold text-slate-800 transition-colors shadow-2xs cursor-pointer"
                    title="미국식 영어 원어민 발음 듣기"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span>🇺🇸</span>
                      <span className="truncate">{lastAudioPrompt.english}</span>
                    </span>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  </button>
                </div>
              </div>
            )}

            {/* 2-Column Grid: Korean on Left (Column 1), English on Right (Column 2) */}
            <div className="grid grid-cols-2 gap-3.5 items-start">
              {renderKoreanColumn(false)}
              {renderEnglishColumn(true)}
            </div>

            <p className="text-center text-xs text-slate-500 pt-1">
              💡 왼쪽의 한글 단어와 오른쪽의 영어 단어를 터치하여 연결해 보세요. 각 단어마다 한국어와 영어 원어민 발음이 지원됩니다.
            </p>
          </div>
        );
      }

      case 'listening': {
        const answeredCount = Object.keys(listeningAnswers).length;
        const totalCount = listeningTargets.length || 4;

        return (
          <div className="space-y-4">
            {/* Listening Challenge Intro Banner */}
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 rounded-2xl border border-emerald-200 shadow-2xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-emerald-950">4문항 원어민 청취 퀴즈</h4>
                  <p className="text-[11px] text-emerald-800/80">각 문항의 소리를 듣고 맞는 단어를 선택하세요</p>
                </div>
              </div>
              <span className="text-xs font-black px-3 py-1 rounded-full bg-emerald-600 text-white shadow-2xs">
                {answeredCount} / {totalCount} 완료
              </span>
            </div>

            {/* 4 Question Cards List */}
            <div className="space-y-3.5">
              {listeningTargets.map((targetWord, idx) => {
                const currentAnswer = listeningAnswers[idx];
                const isPlayingThis = playingTargetIndex === idx;
                const isEvaluated = listeningResults !== null;
                const isCorrect = listeningResults ? listeningResults[idx] : null;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all duration-200 ${
                      isEvaluated
                        ? isCorrect
                          ? 'bg-emerald-50/70 border-emerald-400 ring-1 ring-emerald-300 shadow-xs'
                          : 'bg-rose-50/70 border-rose-400 ring-1 ring-rose-300 shadow-xs'
                        : currentAnswer
                        ? 'bg-white border-emerald-400/80 shadow-xs ring-1 ring-emerald-100'
                        : 'bg-white border-slate-200/90 shadow-2xs hover:border-slate-300'
                    }`}
                  >
                    {/* Card Header: Question number, Speaker button, Selected status */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => handlePlayTargetAudio(idx, targetWord)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 ${
                            isPlayingThis
                              ? 'bg-emerald-500 text-white ring-4 ring-emerald-300/60 animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                          }`}
                          title={`${idx + 1}번 문항 원어민 소리 듣기`}
                        >
                          <Volume2 className={`w-5 h-5 ${isPlayingThis ? 'scale-110' : ''}`} />
                        </button>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-800">
                              {idx + 1}번 문항
                            </span>
                            {isPlayingThis && (
                              <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full animate-bounce">
                                소리 재생 중...
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            소리 재생을 눌러 발음을 들어보세요
                          </p>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div>
                        {isEvaluated ? (
                          isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                              <Check className="w-3.5 h-3.5 stroke-[3]" /> 정답 ({currentAnswer})
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-black text-rose-800 bg-rose-100 px-2.5 py-1 rounded-full border border-rose-300">
                              <X className="w-3.5 h-3.5 stroke-[3]" /> 오답 ({currentAnswer || '미선택'})
                            </span>
                          )
                        ) : currentAnswer ? (
                          <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" /> 선택됨: {currentAnswer}
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                            선택 대기
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 4 Options Grid */}
                    <div className="pt-3">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {(currentQuestion.options || []).map((opt) => {
                          const isSelected = currentAnswer === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                sounds.playTap();
                                speakKorean(opt);
                                setListeningAnswers(prev => ({
                                  ...prev,
                                  [idx]: opt
                                }));
                              }}
                              className={`py-2.5 px-3 rounded-xl text-sm font-bold border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                                isSelected
                                  ? 'bg-emerald-600 border-emerald-600 text-white font-black shadow-sm ring-2 ring-emerald-400/40'
                                  : 'bg-slate-50 hover:bg-slate-100/80 text-slate-700 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* If evaluated and wrong, show explanation & replay target */}
                      {isEvaluated && !isCorrect && (
                        <div className="mt-2.5 text-xs text-rose-700 bg-rose-100/70 p-2.5 rounded-xl border border-rose-200 flex items-center justify-between">
                          <span>💡 <strong>정답 단어:</strong> {targetWord}</span>
                          <button
                            type="button"
                            onClick={() => handlePlayTargetAudio(idx, targetWord)}
                            className="text-[11px] font-bold text-rose-800 hover:text-rose-950 underline flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3 h-3" /> 다시 듣기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center">
              💡 각 문항의 🔊 버튼을 눌러 소리를 듣고, 4개 단어를 모두 선택한 후 하단의 [정답 확인]을 눌러주세요.
            </div>
          </div>
        );
      }

      case 'speaking': {
        return (
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-wide">{currentQuestion.koreanText}</h3>
                <button
                  onClick={() => handlePlayAudio(currentQuestion.koreanText)}
                  className="p-2 rounded-full bg-white hover:bg-slate-100 text-emerald-700 border border-slate-200"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-medium text-emerald-700">{currentQuestion.romanization}</p>
              <p className="text-xs text-slate-500">{currentQuestion.englishText}</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 py-4">
              <button
                disabled={isRecording}
                onClick={handleStartSpeaking}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse ring-4 ring-rose-200'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 active:scale-95'
                }`}
              >
                <Mic className="w-9 h-9" />
              </button>

              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">
                  {isRecording ? '듣는 중... 말씀해 주세요' : '마이크를 누르고 한국어로 말해보세요'}
                </p>
                {recordedSpeech && (
                  <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs inline-block shadow-2xs">
                    <span className="text-slate-500">인식 결과: </span>
                    <span className="font-bold text-slate-900">"{recordedSpeech}"</span>
                    {speechScore && (
                      <span className="ml-2 font-bold text-emerald-700">({speechScore}점 - 우수)</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }

      case 'sentence-arrange': {
        return (
          <div className="space-y-6">
            {/* Target arrangement zone */}
            <div className="min-h-[100px] p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-wrap items-center gap-2">
              {arrangedWords.length === 0 ? (
                <span className="text-xs text-slate-400 w-full text-center">
                  아래의 단어 칩을 탭하여 올바른 어순으로 문장을 완성하세요
                </span>
              ) : (
                arrangedWords.map((word, idx) => (
                  <button
                    key={`arranged-${idx}`}
                    onClick={() => handleRemoveWordChip(word, idx)}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow hover:bg-emerald-500 transition-all active:scale-95"
                  >
                    {word}
                  </button>
                ))
              )}
            </div>

            {/* Available source word chips */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {availableWords.map((word, idx) => (
                <button
                  key={`available-${idx}`}
                  onClick={() => handleAddWordChip(word, idx)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95 shadow-2xs"
                >
                  {word}
                </button>
              ))}
            </div>

            {currentQuestion.grammarFocus && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 text-center">
                📌 문법 포인트: <span className="text-emerald-700 font-medium">{currentQuestion.grammarFocus}</span>
              </div>
            )}
          </div>
        );
      }

      case 'fill-blank': {
        return (
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-xl font-bold text-slate-900 tracking-wide leading-relaxed">
                {currentQuestion.koreanText}
              </p>
              {currentQuestion.grammarFocus && (
                <p className="mt-2 text-xs text-emerald-700 font-medium">
                  {currentQuestion.grammarFocus}
                </p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(shuffledOptions.length > 0 ? shuffledOptions : (currentQuestion.options || [])).map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedOption(opt);
                  }}
                  className={`py-4 px-3 rounded-xl text-center font-bold text-base transition-all border ${
                    selectedOption === opt
                      ? 'bg-emerald-600 border-emerald-500 text-white ring-2 ring-emerald-400 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      }

      case 'dictation': {
        return (
          <div className="space-y-5">
            <div className="flex flex-col items-center justify-center p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <button
                onClick={() => handlePlayAudio(currentQuestion.audioPrompt || currentQuestion.koreanText)}
                className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
                title="소리 다시 듣기"
              >
                <Volume2 className="w-8 h-8" />
              </button>
              <span className="mt-2 text-xs text-slate-500">발음을 듣고 정확한 한국어로 적어보세요</span>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="들린 한국어를 입력하세요 (아래 글자 칩을 눌러 입력할 수도 있습니다)"
                className="w-full p-4 bg-white border border-slate-200 rounded-xl text-slate-900 font-bold text-center text-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400 placeholder:font-normal placeholder:text-sm shadow-2xs"
              />

              {/* Smart syllable chips for users without a Korean keyboard */}
              <div className="flex flex-wrap gap-1.5 justify-center pt-1">
                {(() => {
                  const targetChars = String(currentQuestion.correctAnswer || currentQuestion.koreanText || '')
                    .replace(/\s+/g, '')
                    .split('');
                  const pool = Array.from(
                    new Set([
                      ...targetChars,
                      '나', '무', '다', '리', '모', '자', '바', '지',
                      '물', '밥', '집', '책', '아', '이', '오', '우'
                    ])
                  ).slice(0, 10);

                  return (
                    <>
                      {pool.map((char) => (
                        <button
                          key={char}
                          onClick={() => {
                            sounds.playTap();
                            setTextInput((prev) => prev + char);
                          }}
                          className="px-3 py-1.5 text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-400 text-slate-800 rounded-lg transition-colors shadow-2xs active:scale-95"
                        >
                          +{char}
                        </button>
                      ))}
                      {textInput.length > 0 && (
                        <button
                          onClick={() => {
                            sounds.playTap();
                            setTextInput((prev) => prev.slice(0, -1));
                          }}
                          className="px-2.5 py-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg transition-colors"
                          title="한 글자 지우기"
                        >
                          ⌫ 지우기
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  // Lesson Completed View
  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg shadow-yellow-500/30 animate-bounce">
            <Sparkles className="w-12 h-12 text-slate-950 fill-slate-950" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">레슨 완료! 잘 하셨어요! 🎉</h2>
            <p className="text-sm text-slate-500">{lesson.title}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 py-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">획득 XP</span>
              <span className="text-2xl font-extrabold text-amber-600">+{lesson.xpReward} XP</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">정확도</span>
              <span className="text-2xl font-extrabold text-emerald-600">100%</span>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium">
            🔥 오늘 연속 학습(Streak)이 유지되었습니다! 내일도 잊지 말고 방문하세요.
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              onComplete(lesson.xpReward);
            }}
            className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
          >
            계속하기 (Continue)
          </button>
        </div>
      </div>
    );
  }

  // Check button disable condition
  const isCheckDisabled = () => {
    if (answerStatus !== 'idle') return false;
    switch (currentQuestion.type) {
      case 'listening':
        return Object.keys(listeningAnswers).length < (listeningTargets.length || 4);
      case 'fill-blank':
        return !selectedOption;
      case 'sentence-arrange':
        return arrangedWords.length === 0;
      case 'dictation':
        return textInput.trim().length === 0;
      case 'speaking':
        return !recordedSpeech || isRecording;
      case 'word-match':
        return matchedPairs.length < (currentQuestion.wordPairs?.length || 0) * 2;
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 flex flex-col h-[92vh] max-h-[720px] overflow-hidden shadow-2xl relative">
        {/* Top Header: Close, Progress bar, Hearts, Fanfare Settings */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Progress bar */}
          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Hearts counter */}
          <div className="flex items-center gap-1 font-bold text-rose-500 text-sm">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>{hearts}</span>
          </div>

          {/* Fanfare theme settings trigger */}
          <button
            onClick={() => {
              sounds.playTap();
              setIsFanfareModalOpen(true);
            }}
            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 flex items-center gap-1 transition-all active:scale-95"
            title="정답 축하 팡파레 효과음 선택 및 미리듣기 (5가지 테마)"
          >
            <span>🎉</span>
            <span className="hidden sm:inline text-[11px]">팡파레</span>
          </button>
        </div>

        {/* Dynamic Fanfare Celebration Toast */}
        {activeFanfareInfo && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200 border border-amber-300">
            <span className="text-sm">{activeFanfareInfo.icon}</span>
            <span>{activeFanfareInfo.nameKo} 팡파레!</span>
            <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" />
          </div>
        )}

        {/* Question Header & Subprompt */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              문제 {currentIndex + 1} / {lesson.questions.length} • {currentQuestion.type}
            </span>
            {currentQuestion.hint && (
              <span className="text-xs text-slate-400 cursor-help" title={currentQuestion.hint}>
                💡 힌트
              </span>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            {currentQuestion.prompt}
          </h2>
          {currentQuestion.subPrompt && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{currentQuestion.subPrompt}</p>
          )}
        </div>

        {/* Question Interactive Content (Scrollable) */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {renderQuizBody()}
        </div>

        {/* Bottom Feedback Sheet / Action Drawer */}
        <div className={`p-4 sm:p-5 border-t transition-colors ${
          answerStatus === 'correct'
            ? 'bg-emerald-50 border-emerald-200'
            : answerStatus === 'wrong'
            ? 'bg-rose-50 border-rose-200'
            : 'bg-slate-50 border-slate-200'
        }`}>
          {answerStatus === 'idle' ? (
            <button
              disabled={isCheckDisabled()}
              onClick={handleCheckAnswer}
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-base shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {currentQuestion.type === 'listening'
                ? Object.keys(listeningAnswers).length < (listeningTargets.length || 4)
                  ? `정답 확인 (${Object.keys(listeningAnswers).length}/${listeningTargets.length || 4}개 선택됨 - 4개 모두 선택 필요)`
                  : '4개 문항 정답 확인 (Check All 4)'
                : '정답 확인 (Check)'}
            </button>
          ) : answerStatus === 'correct' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-base">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 animate-bounce">
                    <Sparkles className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="block text-base text-emerald-900 font-black">
                      {currentQuestion.type === 'listening'
                        ? '정답입니다! 4개 발음을 모두 완벽하게 맞혔습니다! 🎉'
                        : '정답입니다! 완벽해요! 🎉'}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">Excellent! Correct Answer</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black border border-emerald-300">
                  +10 XP
                </span>
              </div>
              <p className="text-xs text-emerald-900 pl-10 font-medium leading-relaxed bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200">
                {currentQuestion.type === 'listening'
                  ? `정답 단어 목록: ${listeningTargets.map((t, idx) => `${idx + 1}번 [${t}]`).join(' • ')}`
                  : currentQuestion.explanation}
              </p>
              <button
                onClick={handleContinue}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <span>다음 문제로 계속하기 (Continue)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-rose-800 font-bold text-base">
                <AlertCircle className="w-6 h-6 fill-rose-600 text-white" />
                <span>
                  {currentQuestion.type === 'listening' && listeningResults
                    ? `아쉬워요! 4개 중 ${Object.values(listeningResults).filter(Boolean).length}개만 정답입니다.`
                    : '아쉬워요! 하트 1개가 소모되었습니다.'}
                </span>
              </div>
              <div className="text-xs text-rose-900 pl-8 space-y-1">
                {currentQuestion.type === 'listening' ? (
                  <p className="font-semibold text-rose-800">
                    4문항을 모두 맞혀야 완료됩니다. ❌ 표시된 번호의 소리를 다시 듣고 단어를 수정해 보세요!
                  </p>
                ) : (
                  <>
                    <p>
                      <span className="font-semibold">정답: </span>
                      {Array.isArray(currentQuestion.correctAnswer)
                        ? currentQuestion.correctAnswer.join(' ')
                        : String(currentQuestion.correctAnswer)}
                    </p>
                    <p className="text-rose-700">{currentQuestion.explanation}</p>
                  </>
                )}
              </div>
              {currentQuestion.type === 'listening' ? (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleRetryListening}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>틀린 문제 다시 풀기</span>
                  </button>
                  <button
                    onClick={handleContinue}
                    className="w-full py-3.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-sm border border-rose-300 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>이해했어요 (계속)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleContinue}
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-base shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <span>이해했어요 (계속)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Fanfare Theme Settings Modal */}
      <FanfareSettingsModal
        isOpen={isFanfareModalOpen}
        onClose={() => setIsFanfareModalOpen(false)}
      />
    </div>
  );
};
