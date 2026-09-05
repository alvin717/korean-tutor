import React, { useState } from 'react';
import { Brain, Code, Play, Calculator, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../../data/architectureSpecData';
import { simulateFsrsReview } from '../../utils/srsEngine';
import { sounds } from '../../utils/audio';

export const SrsPseudocode: React.FC = () => {
  const [calcStability, setCalcStability] = useState<number>(3.5);
  const [calcDifficulty, setCalcDifficulty] = useState<number>(5.0);
  const [calcElapsedDays, setCalcElapsedDays] = useState<number>(4);
  const [calcGrade, setCalcGrade] = useState<1 | 2 | 3 | 4>(3);

  const calcResult = simulateFsrsReview(calcStability, calcDifficulty, calcElapsedDays, calcGrade);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
          <Brain className="w-4 h-4" />
          <span>Section 4: 적응형 간격 반복(SRS) 알고리즘 명세</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          FSRS v4 & Duolingo HLR 기반 복습 스케줄러 의사코드
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          에빙하우스의 망각 곡선(Ebbinghaus Forgetting Curve)과 듀오링고의 HLR(Half-Life Regression), 최신 FSRS v4 모델의 수학적 공식을 기반으로 사용자가 단어를 잊기 직전(기억 유지율 90% 도달 시점)에 정확히 문제를 출제합니다.
        </p>
      </div>

      {/* Mathematical Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
            <span>1. 듀오링고 HLR (Half-Life Regression)</span>
          </h3>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
            {ARCHITECTURE_SPEC.srsAlgorithm.hlrFormula}
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            단어의 특성(단어 길이, 품사, 음운 복잡도)과 학습자의 실력 벡터를 로지스틱 회귀로 결합하여 각 단어 고유의 반감기 h를 추정합니다.
          </p>
        </div>

        <div className="p-5 bg-slate-800/80 rounded-2xl border border-indigo-500/30 space-y-2 bg-gradient-to-br from-indigo-950/20 to-slate-800">
          <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
            <span>2. FSRS v4 DSR(Difficulty, Stability, Retrievability)</span>
          </h3>
          <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-indigo-300 border border-slate-800">
            R(t, S) = (1 + Factor * t / S)^(-w)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            안정성(S), 난이도(D), 회상 확률(R)의 3차원 상태 머신을 통하여 Anki와 SuperMemo보다 20% 이상 정확하게 다음 복습 일자를 산출합니다.
          </p>
        </div>
      </div>

      {/* Interactive Live FSRS Sandbox Calculator */}
      <div className="p-6 bg-slate-900 rounded-3xl border-2 border-indigo-500/40 shadow-xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Calculator className="w-5 h-5" />
            <span>인터랙티브 FSRS 복습 스케줄러 시뮬레이터 (Live Sandbox)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">실시간 파라미터 연산</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold flex justify-between">
              <span>기억 안정성 (Stability, S):</span>
              <strong className="text-indigo-400 font-mono">{calcStability}일</strong>
            </label>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={calcStability}
              onChange={(e) => setCalcStability(parseFloat(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <span className="text-[10px] text-slate-500 block">회상률 90% 유지 일수</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold flex justify-between">
              <span>단어 난이도 (Difficulty, D):</span>
              <strong className="text-amber-400 font-mono">{calcDifficulty}</strong>
            </label>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.5"
              value={calcDifficulty}
              onChange={(e) => setCalcDifficulty(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
            <span className="text-[10px] text-slate-500 block">1(매우 쉬움) ~ 10(극난도)</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold flex justify-between">
              <span>마지막 복습 후 경과 일수:</span>
              <strong className="text-cyan-400 font-mono">{calcElapsedDays}일</strong>
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={calcElapsedDays}
              onChange={(e) => setCalcElapsedDays(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <span className="text-[10px] text-slate-500 block">마지막 학습 후 지난 시간</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-300 font-semibold block">
              학습자 응답 등급 (Grade):
            </label>
            <select
              value={calcGrade}
              onChange={(e) => {
                sounds.playTap();
                setCalcGrade(parseInt(e.target.value) as 1 | 2 | 3 | 4);
              }}
              className="w-full p-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="1">1: Again (오답/망각)</option>
              <option value="2">2: Hard (어려움/힌트)</option>
              <option value="3">3: Good (정상 정답)</option>
              <option value="4">4: Easy (즉각 정답)</option>
            </select>
            <span className="text-[10px] text-slate-500 block">퀴즈 풀이 결과</span>
          </div>
        </div>

        {/* Calculation Result Outputs */}
        <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <span className="text-[10px] text-indigo-300 block">현재 회상 확률 R(t)</span>
            <span className="text-lg font-black text-white">
              {Math.round(calcResult.retrievability * 100)}%
            </span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 block">업데이트된 안정성 S'</span>
            <span className="text-lg font-black text-indigo-400">
              {calcResult.newStability}일
            </span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 block">업데이트된 난이도 D'</span>
            <span className="text-lg font-black text-amber-400">
              {calcResult.newDifficulty}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-indigo-300 block">다음 복습 주기 (Target 90%)</span>
            <span className="text-lg font-black text-emerald-400">
              +{calcResult.nextIntervalDays}일 뒤
            </span>
          </div>
        </div>
      </div>

      {/* Code Viewer */}
      <div className="p-5 bg-slate-950 rounded-3xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
            <Code className="w-4 h-4 text-emerald-400" />
            <span>spaced_repetition_engine.py (Python / FastAPI Microservice)</span>
          </div>
          <span className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md">
            Production Ready Pseudocode
          </span>
        </div>

        <pre className="text-xs font-mono text-slate-300 overflow-x-auto p-3 bg-slate-900/60 rounded-xl leading-relaxed custom-scrollbar">
          {ARCHITECTURE_SPEC.srsAlgorithm.pseudocode}
        </pre>
      </div>
    </div>
  );
};
