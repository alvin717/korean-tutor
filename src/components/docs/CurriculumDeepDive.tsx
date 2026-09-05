import React from 'react';
import { BookOpen, Volume2, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../../data/architectureSpecData';
import { speakKorean } from '../../utils/audio';

export const CurriculumDeepDive: React.FC = () => {
  const c = ARCHITECTURE_SPEC.curriculumUnit1;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
          <BookOpen className="w-4 h-4" />
          <span>Section 3: 한국어 특화 커리큘럼 아키텍처</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          초급 1 단위(Unit 1) 상세 커리큘럼 & 교수법 설계
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          영어권 및 비한자어권 학습자가 가장 어려워하는 한글 자모, 7대표 종성(받침), 연음 법칙 및 어순(SOV)을 5단계로 세분화하여 인지 부하(Cognitive Load)를 최소화했습니다.
        </p>
      </div>

      {/* Target Level & Objectives Box */}
      <div className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
          <h3 className="text-base font-extrabold text-white">{c.unitName}</h3>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
            {c.targetLevel}
          </span>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 block">학습 도달 목표 (Key Learning Objectives):</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {c.learningObjectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 bg-slate-900/50 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">{obj}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-white">Unit 1 구성 레슨 상세 분해도</h3>
        <div className="space-y-3.5">
          {c.lessonsBreakdown.map((lesson, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                    {lesson.lessonNum}
                  </span>
                  <h4 className="text-sm font-bold text-white">{lesson.title}</h4>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {lesson.typesCovered.map((t, ti) => (
                    <span key={ti} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Words Chips with Audio buttons */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">핵심 학습 어휘:</span>
                <div className="flex flex-wrap gap-2">
                  {lesson.coreWords.map((word, wi) => {
                    const koreanPart = word.split(' ')[0];
                    return (
                      <button
                        key={wi}
                        onClick={() => speakKorean(koreanPart)}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-200 rounded-lg border border-slate-700 transition-colors group"
                      >
                        <Volume2 className="w-3 h-3 text-emerald-400 group-hover:scale-110" />
                        <span>{word}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grammar & Phonology tip */}
              <div className="p-3 bg-slate-800/50 rounded-xl text-xs text-slate-300 flex items-start gap-2 border border-slate-700/50">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p><strong>문법 & 음운 핵심: </strong>{lesson.grammar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
