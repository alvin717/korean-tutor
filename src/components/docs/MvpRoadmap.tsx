import React from 'react';
import { Target, CheckCircle2, Clock, Calendar, BarChart2, ShieldAlert } from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../../data/architectureSpecData';

export const MvpRoadmap: React.FC = () => {
  const kpis = [
    { label: 'DAU / MAU 비율', target: '20% 이상', desc: '매일 방문하는 진성 학습자 비율' },
    { label: '7일 / 30일 리텐션', target: '40% / 25% 이상', desc: '초기 온보딩 및 지속 습관 형성' },
    { label: '평균 세션 체류 시간', target: '8분 이상', desc: '1일 1~2개 레슨 및 복습 완료' },
    { label: '유료 구독 전환율', target: '5% 이상', desc: 'Plus 멤버십 (무제한 하트 & 스트릭 방어)' },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
          <Target className="w-4 h-4" />
          <span>Section 2: 제품 로드맵 & 기능 우선순위</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          MVP(최소 기능 제품) 우선순위 매트릭스 & KPI
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          MoSCoW (Must, Should, Could, Won't) 프레임워크를 적용하여, 핵심 가치인 '매일 한국어 학습 습관 형성'에 집중하면서 불필요한 개발 리소스 낭비를 방지하는 단계별 출시 전략입니다.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1.5"
          >
            <span className="text-[11px] font-bold text-slate-400 block">{kpi.label}</span>
            <span className="text-2xl font-black text-emerald-400 block">{kpi.target}</span>
            <p className="text-[11px] text-slate-400">{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* MoSCoW Prioritization Matrix */}
      <div className="space-y-4">
        {ARCHITECTURE_SPEC.mvpPriorities.map((tier, idx) => {
          const isP0 = tier.tier.startsWith('P0');
          const isP1 = tier.tier.startsWith('P1');
          const isP2 = tier.tier.startsWith('P2');

          return (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all ${
                isP0
                  ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg'
                  : isP1
                  ? 'bg-blue-950/20 border-blue-500/30'
                  : isP2
                  ? 'bg-purple-950/20 border-purple-500/30'
                  : 'bg-slate-900/40 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${
                    isP0 ? 'bg-emerald-400' : isP1 ? 'bg-blue-400' : isP2 ? 'bg-purple-400' : 'bg-slate-500'
                  }`} />
                  <h3 className="font-extrabold text-base text-white">{tier.tier}</h3>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/90 rounded-full text-xs font-mono font-bold text-slate-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{tier.timeline}</span>
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {tier.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-3"
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isP0 ? 'text-emerald-400' : isP1 ? 'text-blue-400' : isP2 ? 'text-purple-400' : 'text-slate-600'
                    }`} />
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
