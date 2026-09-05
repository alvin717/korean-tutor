import React from 'react';
import { Sparkles, Heart, Shield, Flame, Trophy, Gift, Compass } from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../../data/architectureSpecData';

export const GamificationPsychology: React.FC = () => {
  const g = ARCHITECTURE_SPEC.gamification;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <Sparkles className="w-4 h-4" />
          <span>Section 5: 행동 심리학 기반 게임화 아키텍처</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          게임화(Gamification) 요소의 심리학적 근거 & 실전 구현 전략
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          듀오링고의 경이적인 일일 활성 사용자(DAU)와 30일 리텐션을 만들어낸 핵심 원동력은 단순한 점수 매기기가 아닌, 노벨 경제학상 수상 이론인 '손실 회피(Loss Aversion)'와 스키너의 '가변 보상(Variable Rewards)' 심리학적 메커니즘의 정밀한 결합입니다.
        </p>
      </div>

      {/* Psychological Principles Grid */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-white">4대 핵심 인지 심리학 이론 적용</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {g.principles.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 space-y-3.5 hover:border-slate-600 transition-all"
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                  심리학 이론 #{idx + 1}
                </span>
                <h4 className="text-base font-extrabold text-white">{item.psychTitle}</h4>
                <p className="text-xs text-slate-400 italic">"{item.concept}"</p>
              </div>

              <div className="p-3 bg-slate-900/70 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 block mb-1">앱 구현 기능:</span>
                <span className="text-sm font-semibold text-slate-200">{item.appFeature}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-300 block mb-1">전략 및 비즈니스 임팩트:</span>
                <p className="text-xs text-slate-300 leading-relaxed">{item.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yu-kai Chou Octalysis Framework Table */}
      <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Compass className="w-5 h-5" />
            <span>유카이 초(Yu-kai Chou) 옥탈리시스(Octalysis) 8 Core Drives 대응 매트릭스</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">360° 인간 중심 디자인</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {g.octalysisFramework.map((octa, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-start gap-2.5 text-xs"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                {idx + 1}
              </div>
              <div>
                <span className="font-bold text-slate-200 block">{octa.coreDrive}</span>
                <p className="text-slate-400 text-[11px] mt-0.5">{octa.design}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
