import React, { useState } from 'react';
import { RefreshCw, Brain, Sparkles, Clock, AlertTriangle, CheckCircle2, Volume2, ArrowRight } from 'lucide-react';
import { SrsItem } from '../../types';
import { sounds, speakKorean } from '../../utils/audio';
import { simulateFsrsReview } from '../../utils/srsEngine';
import { BilingualText } from '../common/BilingualText';

interface ReviewTabProps {
  srsItems: SrsItem[];
  onUpdateItem: (updated: SrsItem) => void;
}

export const ReviewTab: React.FC<ReviewTabProps> = ({ srsItems, onUpdateItem }) => {
  const [activeReviewItem, setActiveReviewItem] = useState<SrsItem | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Filter urgent / due items
  const urgentCount = srsItems.filter(i => i.retrievability < 0.75).length;

  const handleStartReview = (item: SrsItem) => {
    sounds.playTap();
    setActiveReviewItem(item);
    setShowAnswer(false);
  };

  const handleGrade = (grade: 1 | 2 | 3 | 4) => {
    if (!activeReviewItem) return;

    if (grade === 1) {
      sounds.playError();
    } else {
      sounds.playSuccess();
    }

    // Run FSRS algorithm simulation
    const result = simulateFsrsReview(
      activeReviewItem.stability,
      activeReviewItem.difficulty,
      3, // assumed elapsed days
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
    <div className="space-y-6 pb-20">
      {/* Header Stat Card */}
      <div className="p-5 bg-gradient-to-br from-indigo-50 via-white to-slate-50 rounded-3xl border border-indigo-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold border border-indigo-200">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 group cursor-pointer">
                <BilingualText
                  ko="AI 적응형 간격 반복 (SRS)"
                  en="AI Adaptive Spaced Repetition (SRS)"
                  enClassName="text-indigo-700 font-extrabold"
                />
              </h3>
              <p className="text-xs text-indigo-700 font-medium">FSRS v4 망각 곡선 & 반감기 예측 엔진</p>
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
              <BilingualText ko="학습 단어" en="Learned Words" enClassName="text-slate-800 font-bold" />
            </span>
            <span className="text-sm font-extrabold text-slate-900">{srsItems.length}개</span>
          </div>
          <div className="group p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer">
            <span className="text-[10px] text-slate-500 block">
              <BilingualText ko="평균 기억유지율" en="Avg Retention" enClassName="text-emerald-800 font-bold" />
            </span>
            <span className="text-sm font-extrabold text-emerald-700">81.4%</span>
          </div>
          <div className="group p-2.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs cursor-pointer">
            <span className="text-[10px] text-slate-500 block">
              <BilingualText ko="평균 반감기(H)" en="Avg Half-Life" enClassName="text-amber-800 font-bold" />
            </span>
            <span className="text-sm font-extrabold text-amber-700">10.8일</span>
          </div>
        </div>
      </div>

      {/* Review Flashcard Modal/Session if active */}
      {activeReviewItem && (
        <div className="p-5 bg-white rounded-2xl border-2 border-indigo-500 shadow-xl space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold group cursor-pointer">
              <BilingualText
                ko="단어 플래시카드 복습 (SRS)"
                en="Word Flashcard Review (SRS)"
                enClassName="text-indigo-700 font-bold"
              />
            </span>
            <button
              onClick={() => setActiveReviewItem(null)}
              className="group text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <BilingualText ko="닫기" en="Close" enClassName="text-slate-900 font-bold" />
            </button>
          </div>

          <div className="text-center py-6 space-y-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-medium">
              {activeReviewItem.partOfSpeech}
            </span>
            <h2 className="text-3xl font-black text-slate-900">{activeReviewItem.word}</h2>
            <p className="text-xs text-indigo-600 font-mono font-medium">{activeReviewItem.romanization}</p>

            <button
              onClick={() => speakKorean(activeReviewItem.word)}
              className="group mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-full text-xs text-emerald-700 font-semibold border border-slate-200 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <BilingualText ko="발음 듣기" en="Play Audio" enClassName="text-emerald-800 font-bold" />
            </button>
          </div>

          {!showAnswer ? (
            <button
              onClick={() => {
                sounds.playTap();
                setShowAnswer(true);
              }}
              className="group w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
            >
              <BilingualText ko="뜻 확인하기" en="Show Answer" enClassName="text-white font-black" />
            </button>
          ) : (
            <div className="space-y-4 pt-2 border-t border-slate-200">
              <div className="text-center">
                <span className="text-lg font-bold text-emerald-700">{activeReviewItem.meaning}</span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-500 block text-center">기억 난이도를 평가해 주세요 (FSRS 알고리즘 반영)</span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleGrade(1)}
                    className="group py-2.5 px-1 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl text-xs font-bold text-rose-800 transition-colors cursor-pointer"
                  >
                    <BilingualText ko="1. 망각" en="1. Again" enClassName="text-rose-900 font-black" /><br/>
                    <span className="text-[9px] font-normal text-rose-600">
                      <BilingualText ko="다시 보기" en="< 1 Day" enClassName="text-rose-700 font-bold" />
                    </span>
                  </button>
                  <button
                    onClick={() => handleGrade(2)}
                    className="group py-2.5 px-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-amber-800 transition-colors cursor-pointer"
                  >
                    <BilingualText ko="2. 어려움" en="2. Hard" enClassName="text-amber-900 font-black" /><br/>
                    <span className="text-[9px] font-normal text-amber-600">
                      <BilingualText ko="간신히 회상" en="~2 Days" enClassName="text-amber-700 font-bold" />
                    </span>
                  </button>
                  <button
                    onClick={() => handleGrade(3)}
                    className="group py-2.5 px-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 transition-colors cursor-pointer"
                  >
                    <BilingualText ko="3. 알맞음" en="3. Good" enClassName="text-emerald-900 font-black" /><br/>
                    <span className="text-[9px] font-normal text-emerald-600">
                      <BilingualText ko="정상 정답" en="~6 Days" enClassName="text-emerald-700 font-bold" />
                    </span>
                  </button>
                  <button
                    onClick={() => handleGrade(4)}
                    className="group py-2.5 px-1 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl text-xs font-bold text-cyan-800 transition-colors cursor-pointer"
                  >
                    <BilingualText ko="4. 매우 쉬움" en="4. Easy" enClassName="text-cyan-900 font-black" /><br/>
                    <span className="text-[9px] font-normal text-cyan-600">
                      <BilingualText ko="즉각 회상" en="~14 Days" enClassName="text-cyan-700 font-bold" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SRS Item List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 group cursor-pointer">
          <BilingualText
            ko="망각 위험도 순 단어장 (Retention Deck)"
            en="Retention Deck (Risk-sorted)"
            enClassName="text-indigo-700 font-bold"
          />
        </h4>

        {srsItems.map(item => {
          const retPct = Math.round(item.retrievability * 100);
          const isUrgent = retPct < 75;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all ${
                isUrgent
                  ? 'bg-rose-50/80 border-rose-200 shadow-2xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-slate-900">{item.word}</span>
                    <button
                      onClick={() => speakKorean(item.word)}
                      className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                      title="발음 듣기 (Listen Pronunciation)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{item.meaning}</p>
                  <span className="text-[10px] text-slate-500 font-mono">
                    반감기: {item.halfLifeDays}일 • 복습 {item.reps}회
                  </span>
                </div>

                <div className="text-right space-y-1">
                  <div className="flex items-center gap-1 justify-end group cursor-pointer">
                    <span className="text-[10px] text-slate-500">
                      <BilingualText ko="기억 확률" en="Retention" enClassName="text-slate-800 font-bold" />
                    </span>
                    <span className={`text-xs font-extrabold ${
                      retPct < 70 ? 'text-rose-600' : retPct < 85 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {retPct}%
                    </span>
                  </div>

                  {/* Retention bar */}
                  <div className="w-20 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        retPct < 70 ? 'bg-rose-500' : retPct < 85 ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${retPct}%` }}
                    />
                  </div>

                  <button
                    onClick={() => handleStartReview(item)}
                    className="group mt-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-xs cursor-pointer"
                  >
                    <BilingualText ko="복습" en="Review" enClassName="text-white font-black" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
