import React, { useState, useEffect } from 'react';
import { X, Heart, Volume2, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Mic, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Question, QuizType } from '../../types';
import { sounds, speakKorean } from '../../utils/audio';

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

  // Speaking state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedSpeech, setRecordedSpeech] = useState<string | null>(null);
  const [speechScore, setSpeechScore] = useState<number | null>(null);

  // Feedback state
  const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
      const shuffled = [...(currentQuestion.options || [])].sort(() => Math.random() - 0.5);
      setAvailableWords(shuffled);
      setArrangedWords([]);
    }

    if (currentQuestion.type === 'word-match' && currentQuestion.wordPairs) {
      setMatchedPairs([]);
    }

    // Auto-play audio prompt if listening or dictation
    if (currentQuestion.type === 'listening' || currentQuestion.type === 'dictation') {
      setTimeout(() => {
        speakKorean(currentQuestion.audioPrompt || currentQuestion.koreanText || '');
      }, 350);
    }
  }, [currentIndex, currentQuestion]);

  if (!currentQuestion && !isCompleted) {
    return null;
  }

  // Handle TTS speaker button
  const handlePlayAudio = (text?: string) => {
    sounds.playTap();
    speakKorean(text || currentQuestion?.audioPrompt || currentQuestion?.koreanText || '');
  };

  // Word Matching logic
  const handleSelectWordCard = (id: string, text: string, lang: 'kr' | 'en') => {
    sounds.playTap();
    if (matchedPairs.includes(text)) return;

    if (!selectedWordCard) {
      setSelectedWordCard({ id, text, lang });
      if (lang === 'kr') speakKorean(text);
      return;
    }

    if (selectedWordCard.lang === lang) {
      setSelectedWordCard({ id, text, lang });
      if (lang === 'kr') speakKorean(text);
      return;
    }

    // Check pair
    const pairs = currentQuestion?.wordPairs || [];
    let isMatch = false;
    if (selectedWordCard.lang === 'kr' && lang === 'en') {
      isMatch = pairs.some(p => p.korean === selectedWordCard.text && p.english === text);
    } else if (selectedWordCard.lang === 'en' && lang === 'kr') {
      isMatch = pairs.some(p => p.korean === text && p.english === selectedWordCard.text);
      speakKorean(text);
    }

    if (isMatch) {
      sounds.playSuccess();
      const krWord = selectedWordCard.lang === 'kr' ? selectedWordCard.text : text;
      const enWord = selectedWordCard.lang === 'en' ? selectedWordCard.text : text;
      const nextMatched = [...matchedPairs, krWord, enWord];
      setMatchedPairs(nextMatched);
      setSelectedWordCard(null);

      // If all matched
      if (nextMatched.length >= pairs.length * 2) {
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
      sounds.playSuccess();
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

  // Check Answer Handler
  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (currentQuestion.type === 'listening' || currentQuestion.type === 'fill-blank') {
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
      sounds.playSuccess();
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
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Do not call onComplete here immediately; let user see victory summary screen first
    }
  };

  // Render Quiz Question Body based on type
  const renderQuizBody = () => {
    switch (currentQuestion.type) {
      case 'word-match': {
        const pairs = currentQuestion.wordPairs || [];
        const krList = pairs.map(p => ({ id: `kr-${p.korean}`, text: p.korean, lang: 'kr' as const }));
        const enList = pairs.map(p => ({ id: `en-${p.english}`, text: p.english, lang: 'en' as const }));

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Korean column */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">한글 (Korean)</div>
                {krList.map(item => {
                  const isMatched = matchedPairs.includes(item.text);
                  const isSelected = selectedWordCard?.text === item.text && selectedWordCard.lang === 'kr';
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleSelectWordCard(item.id, item.text, item.lang)}
                      className={`w-full py-3.5 px-4 rounded-xl text-center font-bold text-base transition-all border ${
                        isMatched
                          ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40 line-through'
                          : isSelected
                          ? 'bg-emerald-600 border-emerald-500 text-white ring-2 ring-emerald-400 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                      }`}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>

              {/* English column */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">영어 (English)</div>
                {enList.map(item => {
                  const isMatched = matchedPairs.includes(item.text);
                  const isSelected = selectedWordCard?.text === item.text && selectedWordCard.lang === 'en';
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleSelectWordCard(item.id, item.text, item.lang)}
                      className={`w-full py-3.5 px-4 rounded-xl text-center font-medium text-sm transition-all border ${
                        isMatched
                          ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-40 line-through'
                          : isSelected
                          ? 'bg-emerald-600 border-emerald-500 text-white ring-2 ring-emerald-400 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                      }`}
                    >
                      {item.text}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-center text-xs text-slate-500">
              💡 한글 카드와 알맞은 영어 카드를 번갈아 터치해 짝을 맞춰보세요.
            </p>
          </div>
        );
      }

      case 'listening': {
        return (
          <div className="space-y-6">
            {/* Audio speaker trigger */}
            <div className="flex flex-col items-center justify-center p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <button
                onClick={() => handlePlayAudio()}
                className="w-20 h-20 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 active:scale-95 transition-all group"
                title="발음 다시 듣기"
              >
                <Volume2 className="w-9 h-9 group-hover:scale-110 transition-transform" />
              </button>
              <span className="mt-3 text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                스피커를 탭하여 원어민 소리를 들어보세요
              </span>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuestion.options?.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    sounds.playTap();
                    setSelectedOption(opt);
                  }}
                  className={`w-full py-4 px-5 rounded-xl text-left font-bold text-base transition-all border flex items-center justify-between ${
                    selectedOption === opt
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-400'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                  }`}
                >
                  <span>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedOption === opt ? 'border-emerald-500 bg-emerald-600 text-white' : 'border-slate-300'
                  }`}>
                    {selectedOption === opt && <span className="text-[10px]">✓</span>}
                  </div>
                </button>
              ))}
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
              {currentQuestion.options?.map((opt, i) => (
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
        {/* Top Header: Close, Progress bar, Hearts */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
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
        </div>

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
              className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold text-base shadow-sm transition-all active:scale-95"
            >
              정답 확인 (Check)
            </button>
          ) : answerStatus === 'correct' ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-base">
                <CheckCircle2 className="w-6 h-6 fill-emerald-600 text-white" />
                <span>완벽해요! 정답입니다.</span>
              </div>
              <p className="text-xs text-emerald-800 pl-8 font-medium">
                {currentQuestion.explanation}
              </p>
              <button
                onClick={handleContinue}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>다음 문제</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-rose-800 font-bold text-base">
                <AlertCircle className="w-6 h-6 fill-rose-600 text-white" />
                <span>아쉬워요! 하트 1개가 소모되었습니다.</span>
              </div>
              <div className="text-xs text-rose-900 pl-8 space-y-1">
                <p>
                  <span className="font-semibold">정답: </span>
                  {Array.isArray(currentQuestion.correctAnswer)
                    ? currentQuestion.correctAnswer.join(' ')
                    : String(currentQuestion.correctAnswer)}
                </p>
                <p className="text-rose-700">{currentQuestion.explanation}</p>
              </div>
              <button
                onClick={handleContinue}
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-base shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <span>이해했어요 (계속)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
