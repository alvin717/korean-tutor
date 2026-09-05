import React, { useState, useMemo } from 'react';
import {
  Brain,
  AlertTriangle,
  Volume2,
  Search,
  Layers,
  BookOpen,
  Sparkles,
  Tag,
  Compass,
  Zap,
  Activity,
  ChevronDown
} from 'lucide-react';
import { SrsItem, WordTheme, WordPartOfSpeech, WordPronunciationRule, WordTopikLevel } from '../../types';
import { sounds, speakKorean, speakEnglish } from '../../utils/audio';
import { simulateFsrsReview } from '../../utils/srsEngine';
import { triggerCorrectFireworks } from '../../utils/confettiEffects';
import { BilingualText } from '../common/BilingualText';

interface ReviewTabProps {
  srsItems: SrsItem[];
  onUpdateItem: (updated: SrsItem) => void;
}

type AspectDimension = 'theme' | 'pos' | 'pronunciation' | 'topik' | 'retention';

export const ReviewTab: React.FC<ReviewTabProps> = ({ srsItems, onUpdateItem }) => {
  const [activeReviewItem, setActiveReviewItem] = useState<SrsItem | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [cardDirection, setCardDirection] = useState<'kr-to-en' | 'en-to-kr'>('kr-to-en');

  // Multi-faceted filtering state
  const [activeDimension, setActiveDimension] = useState<AspectDimension>('theme');
  const [selectedTheme, setSelectedTheme] = useState<WordTheme>('all');
  const [selectedPos, setSelectedPos] = useState<WordPartOfSpeech>('all');
  const [selectedPronunciation, setSelectedPronunciation] = useState<WordPronunciationRule>('all');
  const [selectedTopik, setSelectedTopik] = useState<WordTopikLevel>('all');
  const [selectedRetention, setSelectedRetention] = useState<'all' | 'urgent' | 'moderate' | 'stable'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Count metrics
  const urgentCount = useMemo(() => srsItems.filter(i => i.retrievability < 0.75).length, [srsItems]);
  const avgRetention = useMemo(() => {
    if (srsItems.length === 0) return 0;
    const total = srsItems.reduce((acc, curr) => acc + curr.retrievability, 0);
    return Math.round((total / srsItems.length) * 100);
  }, [srsItems]);

  // Dimension facets definitions
  const themeFacets: { id: WordTheme; labelKo: string; labelEn: string; icon: string }[] = [
    { id: 'all', labelKo: '전체 테마', labelEn: 'All Themes', icon: '🌐' },
    { id: 'daily', labelKo: '일상 & 생활', labelEn: 'Daily Life', icon: '☕' },
    { id: 'dining', labelKo: '식당 & 음식', labelEn: 'Dining & Food', icon: '🍽️' },
    { id: 'transport', labelKo: '교통 & 길찾기', labelEn: 'Transport', icon: '🚇' },
    { id: 'shopping', labelKo: '쇼핑 & 가격', labelEn: 'Shopping', icon: '🛍️' },
    { id: 'emotions', labelKo: '감정 & 리액션', labelEn: 'Emotions', icon: '💖' },
    { id: 'work', labelKo: '학교 & 직장', labelEn: 'School & Work', icon: '🏫' },
    { id: 'health', labelKo: '건강 & 긴급', labelEn: 'Health & Help', icon: '🏥' },
    { id: 'places', labelKo: '장소 & 위치', labelEn: 'Places', icon: '📍' }
  ];

  const posFacets: { id: WordPartOfSpeech; labelKo: string; labelEn: string; color: string }[] = [
    { id: 'all', labelKo: '전체 품사', labelEn: 'All Parts', color: 'bg-slate-100 text-slate-800' },
    { id: 'noun', labelKo: '명사', labelEn: 'Nouns', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { id: 'verb', labelKo: '동사 활용', labelEn: 'Verbs', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { id: 'adjective', labelKo: '묘사 형용사', labelEn: 'Adjectives', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { id: 'particle', labelKo: '필수 조사', labelEn: 'Particles', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { id: 'phrase', labelKo: '회화 표현', labelEn: 'Phrases', color: 'bg-rose-50 text-rose-800 border-rose-200' },
    { id: 'interjection', labelKo: '감탄사', labelEn: 'Interjections', color: 'bg-orange-50 text-orange-800 border-orange-200' }
  ];

  const pronunciationFacets: { id: WordPronunciationRule; labelKo: string; labelEn: string; desc: string }[] = [
    { id: 'all', labelKo: '전체 발음', labelEn: 'All Rules', desc: '모든 발음 규칙 단어' },
    { id: 'liaison', labelKo: '연음 법칙', labelEn: 'Liaison', desc: '앞 받침이 뒷 모음으로 넘어가는 소리' },
    { id: 'tensification', labelKo: '된소리되기', labelEn: 'Tensification', desc: '예사소리가 된소리[ㄲ,ㄸ,ㅃ,ㅆ,ㅉ]로 강화' },
    { id: 'aspiration', labelKo: '거센소리(격음)', labelEn: 'Aspiration', desc: 'ㅎ과 결합하여 거센소리[ㅋ,ㅌ,ㅍ,ㅊ]로 발음' },
    { id: 'neutralization', labelKo: '7종성 대표음', labelEn: 'Neutralization', desc: '받침이 7개 대표음으로 닫혀 발음' },
    { id: 'standard', labelKo: '표준 평음', labelEn: 'Standard', desc: '기본 규칙 표준 발음' }
  ];

  const topikFacets: { id: WordTopikLevel; labelKo: string; labelEn: string }[] = [
    { id: 'all', labelKo: '전체 레벨', labelEn: 'All Levels' },
    { id: '기초', labelKo: '🌱 입문 기초', labelEn: 'Beginner' },
    { id: 'TOPIK I', labelKo: '🌿 TOPIK I (초급)', labelEn: 'TOPIK 1' },
    { id: 'TOPIK II', labelKo: '🌳 TOPIK II (중급)', labelEn: 'TOPIK 2' }
  ];

  const retentionFacets: { id: 'all' | 'urgent' | 'moderate' | 'stable'; labelKo: string; labelEn: string; color: string }[] = [
    { id: 'all', labelKo: '전체 기억 상태', labelEn: 'All Retention', color: 'bg-slate-100 text-slate-800' },
    { id: 'urgent', labelKo: '🔴 긴급 복습 (<75%)', labelEn: 'Due Urgent', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'moderate', labelKo: '🟡 복습 권장 (75~85%)', labelEn: 'Review Soon', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'stable', labelKo: '🟢 안정 기억 (>85%)', labelEn: 'Mastered', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ];

  // Filtered words
  const filteredItems = useMemo(() => {
    return srsItems.filter(item => {
      // Dimension filters
      if (activeDimension === 'theme' && selectedTheme !== 'all') {
        if (item.theme !== selectedTheme) return false;
      }
      if (activeDimension === 'pos' && selectedPos !== 'all') {
        if (item.posCategory !== selectedPos) return false;
      }
      if (activeDimension === 'pronunciation' && selectedPronunciation !== 'all') {
        if (item.pronunciationRule !== selectedPronunciation) return false;
      }
      if (activeDimension === 'topik' && selectedTopik !== 'all') {
        if (item.topikLevel !== selectedTopik) return false;
      }
      if (activeDimension === 'retention' && selectedRetention !== 'all') {
        const pct = item.retrievability * 100;
        if (selectedRetention === 'urgent' && pct >= 75) return false;
        if (selectedRetention === 'moderate' && (pct < 75 || pct > 85)) return false;
        if (selectedRetention === 'stable' && pct <= 85) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchRom = item.romanization.toLowerCase().includes(q);
        const matchPhonetic = item.phoneticSpelling?.toLowerCase().includes(q) || false;
        const matchPos = item.partOfSpeech.toLowerCase().includes(q);
        if (!matchWord && !matchMeaning && !matchRom && !matchPhonetic && !matchPos) {
          return false;
        }
      }

      return true;
    });
  }, [
    srsItems,
    activeDimension,
    selectedTheme,
    selectedPos,
    selectedPronunciation,
    selectedTopik,
    selectedRetention,
    searchQuery
  ]);

  const handleStartReview = (item: SrsItem) => {
    sounds.playTap();
    setActiveReviewItem(item);
    setShowAnswer(false);
  };

  const handleGrade = (grade: 1 | 2 | 3 | 4) => {
    if (!activeReviewItem) return;

    if (grade === 1) {
      sounds.playError();
    } else if (grade >= 3) {
      sounds.playFanfare();
      triggerCorrectFireworks();
    } else {
      sounds.playSuccess();
    }

    const result = simulateFsrsReview(
      activeReviewItem.stability,
      activeReviewItem.difficulty,
      3,
      grade
    );

    const updated: SrsItem = {
      ...activeReviewItem,
      stability: result.newStability,
      difficulty: result.newDifficulty,
      retrievability: grade === 1 ? 0.4 : 0.95,
      reps: activeReviewItem.reps + 1,
      lapses: grade === 1 ? activeReviewItem.lapses + 1 : activeReviewItem.lapses,
      lastReviewDate: new Date().toISOString().split('T')[0],
      nextReviewDate: result.nextReviewDateString,
      halfLifeDays: result.newStability,
    };

    onUpdateItem(updated);
    setActiveReviewItem(null);
    setShowAnswer(false);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Header Stat Card */}
      <div className="p-5 bg-gradient-to-br from-indigo-50 via-white to-emerald-50/40 rounded-3xl border border-indigo-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group cursor-pointer">
                <BilingualText
                  ko="다각도 단어장 & 간격 반복 (SRS)"
                  en="Multi-Faceted Vocabulary & SRS Deck"
                  enClassName="text-indigo-700 font-extrabold"
                />
              </h3>
              <p className="text-xs text-indigo-700 font-medium">상황·품사·발음·난이도별 입체적 어휘 학습</p>
            </div>
          </div>
          <span className="group px-2.5 py-1 text-xs font-bold rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 cursor-pointer">
            <AlertTriangle className="w-3.5 h-3.5" />
            <BilingualText
              ko={`복습 필요 ${urgentCount}개`}
              en={`Review Due: ${urgentCount}`}
              enClassName="text-rose-800 font-extrabold"
            />
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="group p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer">
            <span className="text-[10px] text-slate-500 block">
              <BilingualText ko="전체 구축 어휘" en="Total Words" enClassName="text-slate-800 font-bold" />
            </span>
            <span className="text-sm font-extrabold text-slate-900">{srsItems.length}개</span>
          </div>
          <div className="group p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer">
            <span className="text-[10px] text-slate-500 block">
              <BilingualText ko="평균 기억유지율" en="Avg Retention" enClassName="text-emerald-800 font-bold" />
            </span>
            <span className="text-sm font-extrabold text-emerald-700">{avgRetention}%</span>
          </div>
          <div className="group p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer">
            <span className="text-[10px] text-slate-500 block">
              <BilingualText ko="현재 필터 단어" en="Filtered" enClassName="text-indigo-800 font-bold" />
            </span>
            <span className="text-sm font-extrabold text-indigo-700">{filteredItems.length}개</span>
          </div>
        </div>
      </div>

      {/* Multi-Faceted Aspect Dimension Switcher */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <BilingualText
              ko="단어 구성 측면 선택 (Multi-Aspects)"
              en="Vocabulary Classification Dimensions"
              enClassName="text-indigo-700 font-bold"
            />
          </span>
          <span className="text-[11px] text-slate-500 font-medium">원하는 관점으로 단어를 분류해 보세요</span>
        </div>

        {/* 5 Main Dimensions Tabs */}
        <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              setActiveDimension('theme');
            }}
            className={`py-2 px-1 rounded-lg text-center transition-all text-xs font-bold flex flex-col items-center gap-1 cursor-pointer ${
              activeDimension === 'theme'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-indigo-600" />
            <span className="text-[11px] font-bold">상황·테마</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              setActiveDimension('pos');
            }}
            className={`py-2 px-1 rounded-lg text-center transition-all text-xs font-bold flex flex-col items-center gap-1 cursor-pointer ${
              activeDimension === 'pos'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold">품사·문법</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              setActiveDimension('pronunciation');
            }}
            className={`py-2 px-1 rounded-lg text-center transition-all text-xs font-bold flex flex-col items-center gap-1 cursor-pointer ${
              activeDimension === 'pronunciation'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-600" />
            <span className="text-[11px] font-bold">발음 규칙</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              setActiveDimension('topik');
            }}
            className={`py-2 px-1 rounded-lg text-center transition-all text-xs font-bold flex flex-col items-center gap-1 cursor-pointer ${
              activeDimension === 'topik'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] font-bold">TOPIK 난이도</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playTap();
              setActiveDimension('retention');
            }}
            className={`py-2 px-1 rounded-lg text-center transition-all text-xs font-bold flex flex-col items-center gap-1 cursor-pointer ${
              activeDimension === 'retention'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-rose-600" />
            <span className="text-[11px] font-bold">망각 위험도</span>
          </button>
        </div>

        {/* Sub-facets Chips based on active Dimension */}
        <div className="pt-2">
          {activeDimension === 'theme' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {themeFacets.map(facet => {
                const isSelected = selectedTheme === facet.id;
                const count =
                  facet.id === 'all'
                    ? srsItems.length
                    : srsItems.filter(i => i.theme === facet.id).length;

                return (
                  <button
                    key={facet.id}
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setSelectedTheme(facet.id);
                    }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{facet.icon}</span>
                    <span>{facet.labelKo}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeDimension === 'pos' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {posFacets.map(facet => {
                const isSelected = selectedPos === facet.id;
                const count =
                  facet.id === 'all'
                    ? srsItems.length
                    : srsItems.filter(i => i.posCategory === facet.id).length;

                return (
                  <button
                    key={facet.id}
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setSelectedPos(facet.id);
                    }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{facet.labelKo}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeDimension === 'pronunciation' && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {pronunciationFacets.map(facet => {
                  const isSelected = selectedPronunciation === facet.id;
                  const count =
                    facet.id === 'all'
                      ? srsItems.length
                      : srsItems.filter(i => i.pronunciationRule === facet.id).length;

                  return (
                    <button
                      key={facet.id}
                      type="button"
                      onClick={() => {
                        sounds.playTap();
                        setSelectedPronunciation(facet.id);
                      }}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{facet.labelKo}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-amber-700 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              {selectedPronunciation !== 'all' && (
                <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200">
                  💡{' '}
                  <span className="font-extrabold">
                    {pronunciationFacets.find(f => f.id === selectedPronunciation)?.labelKo}:
                  </span>{' '}
                  {pronunciationFacets.find(f => f.id === selectedPronunciation)?.desc}
                </p>
              )}
            </div>
          )}

          {activeDimension === 'topik' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {topikFacets.map(facet => {
                const isSelected = selectedTopik === facet.id;
                const count =
                  facet.id === 'all'
                    ? srsItems.length
                    : srsItems.filter(i => i.topikLevel === facet.id).length;

                return (
                  <button
                    key={facet.id}
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setSelectedTopik(facet.id);
                    }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{facet.labelKo}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {activeDimension === 'retention' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {retentionFacets.map(facet => {
                const isSelected = selectedRetention === facet.id;
                const count =
                  facet.id === 'all'
                    ? srsItems.length
                    : facet.id === 'urgent'
                    ? srsItems.filter(i => i.retrievability < 0.75).length
                    : facet.id === 'moderate'
                    ? srsItems.filter(i => i.retrievability >= 0.75 && i.retrievability <= 0.85).length
                    : srsItems.filter(i => i.retrievability > 0.85).length;

                return (
                  <button
                    key={facet.id}
                    type="button"
                    onClick={() => {
                      sounds.playTap();
                      setSelectedRetention(facet.id);
                    }}
                    className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{facet.labelKo}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-rose-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Live Search Input */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="단어 검색 (한국어, 영어 뜻, 발음, 로마자)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Review Flashcard Modal/Session if active */}
      {activeReviewItem && (
        <div className="p-5 bg-white rounded-3xl border-2 border-indigo-500 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold flex items-center gap-1.5 text-indigo-700">
              <Sparkles className="w-4 h-4" />
              <BilingualText
                ko="입체 플래시카드 복습 (SRS)"
                en="Multi-Faceted Flashcard Review"
                enClassName="text-indigo-800 font-extrabold"
              />
            </span>
            <button
              onClick={() => setActiveReviewItem(null)}
              className="group text-slate-400 hover:text-slate-700 p-1 cursor-pointer font-bold text-xs"
            >
              <BilingualText ko="닫기" en="Close" enClassName="text-slate-900 font-bold" />
            </button>
          </div>

          {/* Flashcard Direction Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setCardDirection('kr-to-en');
                setShowAnswer(false);
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                cardDirection === 'kr-to-en'
                  ? 'bg-white text-emerald-800 shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🇰🇷 한국어 ➔ 🇺🇸 영어 뜻
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playTap();
                setCardDirection('en-to-kr');
                setShowAnswer(false);
              }}
              className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                cardDirection === 'en-to-kr'
                  ? 'bg-white text-indigo-800 shadow-xs font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🇺🇸 영어 뜻 ➔ 🇰🇷 한국어
            </button>
          </div>

          {cardDirection === 'en-to-kr' ? (
            /* English Prompt -> Match Korean */
            <div className="text-center py-5 space-y-2.5">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  {activeReviewItem.partOfSpeech}
                </span>
                {activeReviewItem.topikLevel && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold">
                    {activeReviewItem.topikLevel}
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-black text-slate-900">{activeReviewItem.meaning}</h2>
              <p className="text-xs text-slate-500">영어를 보고 알맞은 한국어 단어와 발음을 떠올려 보세요</p>

              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap();
                    speakEnglish(activeReviewItem.meaning);
                  }}
                  className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-full text-xs text-indigo-800 font-extrabold border border-indigo-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-indigo-600" />
                  <span>🇺🇸 영어 발음 듣기</span>
                </button>
              </div>
            </div>
          ) : (
            /* Korean Prompt -> English */
            <div className="text-center py-6 space-y-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold">
                  {activeReviewItem.partOfSpeech}
                </span>
                {activeReviewItem.phoneticSpelling && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono font-bold">
                    발음: {activeReviewItem.phoneticSpelling}
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-black text-slate-900">{activeReviewItem.word}</h2>
              <p className="text-xs text-indigo-600 font-mono font-medium">{activeReviewItem.romanization}</p>

              <button
                type="button"
                onClick={() => {
                  sounds.playTap();
                  speakKorean(activeReviewItem.word);
                }}
                className="group mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-50 hover:bg-emerald-100 rounded-full text-xs text-emerald-800 font-extrabold border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <BilingualText ko="한국어 원어민 발음 듣기" en="Play Korean Audio" enClassName="text-emerald-900 font-black" />
              </button>
            </div>
          )}

          {!showAnswer ? (
            <button
              onClick={() => {
                sounds.playTap();
                setShowAnswer(true);
                if (cardDirection === 'en-to-kr') {
                  speakKorean(activeReviewItem.word);
                } else {
                  speakEnglish(activeReviewItem.meaning);
                }
              }}
              className="group w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              <BilingualText
                ko={cardDirection === 'en-to-kr' ? '한글 정답 및 상세 해설 확인' : '뜻과 다각도 해설 확인'}
                en={cardDirection === 'en-to-kr' ? 'Show Korean Answer' : 'Show Answer & Details'}
                enClassName="text-white font-black"
              />
            </button>
          ) : (
            <div className="space-y-4 pt-3 border-t border-slate-200 animate-in fade-in">
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-2 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-900">{activeReviewItem.word}</span>
                    <button
                      type="button"
                      onClick={() => speakKorean(activeReviewItem.word)}
                      className="p-1 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-indigo-700">{activeReviewItem.meaning}</span>
                    <button
                      type="button"
                      onClick={() => speakEnglish(activeReviewItem.meaning)}
                      className="p-1 rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {activeReviewItem.phoneticSpelling && (
                  <div className="text-xs text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span>
                      🔊 <strong>실제 발음:</strong> {activeReviewItem.phoneticSpelling}
                    </span>
                    {activeReviewItem.ruleDescription && (
                      <span className="text-[11px] text-amber-700">{activeReviewItem.ruleDescription}</span>
                    )}
                  </div>
                )}

                {activeReviewItem.conjugation && (
                  <div className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    🌱 <strong>활용 규칙:</strong> {activeReviewItem.conjugation}
                  </div>
                )}

                {activeReviewItem.exampleKorean && (
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-800">
                        🇰🇷 {activeReviewItem.exampleKorean}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakKorean(activeReviewItem.exampleKorean || '')}
                        className="p-1 text-emerald-600 hover:text-emerald-800"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      🇺🇸 {activeReviewItem.exampleEnglish}
                    </p>
                  </div>
                )}
              </div>

              {/* FSRS Rating Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 block text-center">
                  기억 회상 난이도를 선택해 주세요 (FSRS v4 학습 반감기 갱신)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleGrade(1)}
                    className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-center transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-black">다시 (1)</span>
                    <span className="text-[10px] text-rose-600 block">기억 안남</span>
                  </button>

                  <button
                    onClick={() => handleGrade(2)}
                    className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-center transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-black">어려움 (2)</span>
                    <span className="text-[10px] text-amber-600 block">가물가물</span>
                  </button>

                  <button
                    onClick={() => handleGrade(3)}
                    className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-center transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-black">알맞음 (3)</span>
                    <span className="text-[10px] text-blue-600 block">잘 기억남</span>
                  </button>

                  <button
                    onClick={() => handleGrade(4)}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-center transition-all cursor-pointer"
                  >
                    <span className="block text-xs font-black">쉬움 (4)</span>
                    <span className="text-[10px] text-emerald-600 block">완벽 마스터</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Multi-Faceted Vocabulary Item List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 group cursor-pointer flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <BilingualText
              ko={`단어장 (${filteredItems.length}개)`}
              en={`Word Deck (${filteredItems.length})`}
              enClassName="text-indigo-700 font-bold"
            />
          </h4>
          <span className="text-[11px] text-slate-400">
            한국어(좌) • 영어(우)
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <span className="text-2xl">🔍</span>
            <p className="text-xs font-bold text-slate-700">해당 조건에 일치하는 단어가 없습니다.</p>
            <p className="text-[11px] text-slate-400">다른 측면 분류 탭을 누르거나 검색어를 초기화해 보세요.</p>
            <button
              onClick={() => {
                setSelectedTheme('all');
                setSelectedPos('all');
                setSelectedPronunciation('all');
                setSelectedTopik('all');
                setSelectedRetention('all');
                setSearchQuery('');
              }}
              className="mt-2 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl"
            >
              모든 필터 초기화
            </button>
          </div>
        ) : (
          filteredItems.map(item => {
            const retPct = Math.round(item.retrievability * 100);
            const isUrgent = retPct < 75;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUrgent
                    ? 'bg-rose-50/50 border-rose-200 shadow-2xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                }`}
              >
                {/* Top Row: Tags and Meta */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Part of speech tag */}
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.partOfSpeech}
                    </span>

                    {/* Topik Level Tag */}
                    {item.topikLevel && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700">
                        {item.topikLevel}
                      </span>
                    )}

                    {/* Pronunciation Rule Tag */}
                    {item.pronunciationRule && item.pronunciationRule !== 'standard' && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5 text-amber-600" />
                        {item.pronunciationRule === 'liaison'
                          ? '연음 법칙'
                          : item.pronunciationRule === 'tensification'
                          ? '된소리'
                          : item.pronunciationRule === 'aspiration'
                          ? '거센소리'
                          : '대표음'}
                      </span>
                    )}

                    {/* Phonetic Spelling if available */}
                    {item.phoneticSpelling && (
                      <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded">
                        실제 발음: {item.phoneticSpelling}
                      </span>
                    )}
                  </div>

                  {/* Retention Rate Badge */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] text-slate-500">기억률</span>
                    <span
                      className={`text-xs font-black ${
                        retPct < 70 ? 'text-rose-600' : retPct < 85 ? 'text-amber-600' : 'text-emerald-600'
                      }`}
                    >
                      {retPct}%
                    </span>
                  </div>
                </div>

                {/* Main Content: Korean on LEFT, English on RIGHT */}
                <div className="flex items-start justify-between gap-4">
                  {/* LEFT: Korean Word & Pronunciation */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-slate-900 tracking-tight">
                        {item.word}
                      </span>
                      <button
                        type="button"
                        onClick={() => speakKorean(item.word)}
                        className="p-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors shadow-2xs"
                        title="🇰🇷 한국어 발음 듣기"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                      </button>
                    </div>
                    <p className="text-[11px] text-indigo-600 font-mono font-medium">
                      [{item.romanization}]
                    </p>

                    {/* Conjugation or Rule Hint */}
                    {item.conjugation && (
                      <p className="text-[11px] text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md inline-block font-medium">
                        🌱 {item.conjugation}
                      </p>
                    )}
                    {item.ruleDescription && !item.conjugation && (
                      <p className="text-[10px] text-slate-500">
                        ℹ️ {item.ruleDescription}
                      </p>
                    )}
                  </div>

                  {/* RIGHT: English Meaning & Audio + Review Button */}
                  <div className="text-right space-y-2 min-w-0 flex-1 flex flex-col items-end">
                    <div className="flex items-center justify-end gap-1.5">
                      <p className="text-sm font-bold text-slate-800 text-right">
                        {item.meaning}
                      </p>
                      <button
                        type="button"
                        onClick={() => speakEnglish(item.meaning)}
                        className="p-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                        title="🇺🇸 영어 발음 듣기"
                      >
                        <Volume2 className="w-3 h-3 text-indigo-600" />
                      </button>
                    </div>

                    {/* Retention Progress bar */}
                    <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          retPct < 70 ? 'bg-rose-500' : retPct < 85 ? 'bg-amber-400' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${retPct}%` }}
                      />
                    </div>

                    <button
                      onClick={() => handleStartReview(item)}
                      className="group px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <BilingualText ko="복습하기" en="Review" enClassName="text-white font-black" />
                    </button>
                  </div>
                </div>

                {/* Example sentence if present */}
                {item.exampleKorean && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100/90 flex items-center justify-between text-xs bg-slate-50/70 px-2.5 py-1.5 rounded-xl">
                    <div className="space-y-0.5">
                      <span className="font-extrabold text-slate-800 block">
                        예문: {item.exampleKorean}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {item.exampleEnglish}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakKorean(item.exampleKorean || '')}
                      className="p-1 text-emerald-600 hover:text-emerald-800 shrink-0 ml-2"
                      title="예문 한국어 발음 듣기"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
