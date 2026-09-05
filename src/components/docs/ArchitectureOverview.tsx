import React, { useState } from 'react';
import { Layers, Server, Database, Cpu, Cloud, Smartphone, Globe, Shield, Activity, ArrowDown, ArrowRight } from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../../data/architectureSpecData';

export const ArchitectureOverview: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  return (
    <div className="space-y-8">
      {/* Title & Introduction */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
          <Layers className="w-4 h-4" />
          <span>Section 1: 시스템 설계 및 아키텍처 청사진</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          전체 앱 아키텍처 다이어그램 & 기술 스택 명세
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          {ARCHITECTURE_SPEC.overview.summary} 클라이언트 오프라인 우선(Offline-first) 동기화부터 글로벌 저지연 API 게이트웨이, PyTorch 기반 적응형 AI/SRS 엔진, 분산 데이터베이스까지 전 계층을 유기적으로 결합했습니다.
        </p>
      </div>

      {/* Visual Interactive Architecture Diagram (SVG / Box Flow) */}
      <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <h3 className="font-extrabold text-base text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>엔드투엔드 시스템 데이터 파이프라인 (Data Flow Diagram)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            클라이언트 ⇄ 엣지 ⇄ 마이크로서비스 ⇄ AI 모델 ⇄ DB
          </span>
        </div>

        {/* High-level diagram boxes */}
        <div className="space-y-4">
          {/* 1. Client Tier */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border-2 border-emerald-500/50 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span className="font-extrabold text-sm text-white">Client Tier (모바일 앱 & PWA)</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-bold">
                React Native / Flutter
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-slate-200 block">오프라인 스토리지</span>
                <span className="text-[11px] text-slate-400 font-mono">SQLite / WatermelonDB</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-slate-200 block">오디오 / 음성 처리</span>
                <span className="text-[11px] text-slate-400 font-mono">Web Audio API / Native STT</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-slate-200 block">글로벌 상태 관리</span>
                <span className="text-[11px] text-slate-400 font-mono">Zustand + React Query</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-slate-200 block">렌더링 최적화</span>
                <span className="text-[11px] text-slate-400 font-mono">Skia 60fps 애니메이션</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-emerald-500 animate-bounce" />
          </div>

          {/* 2. Gateway & Edge Tier */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 text-blue-400" />
                <span className="font-extrabold text-sm text-white">API Gateway & Edge CDN Tier</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full font-bold">
                Cloudflare CDN + Kong Gateway
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-2">
              전 세계 300+ Edge POP 라우팅, Rate Limiting (DDoS 방어), JWT 인증 인가 토큰 검증, WebSocket 실시간 연결 관리.
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-blue-500" />
          </div>

          {/* 3. Microservices & AI Cluster */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Backend Microservices */}
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Server className="w-4 h-4" />
                <span>Core Microservices (Node.js / Go)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span><strong>Auth & User Service:</strong> OAuth2, 세션, 계정 관리</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span><strong>Curriculum & Progress:</strong> 레슨 상태 및 검증</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span><strong>Leaderboard Engine:</strong> 주간 리그 및 XP 실시간 집계</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span><strong>Payment & Shop:</strong> 인앱 구매 및 아이템 트랜잭션</span>
                </li>
              </ul>
            </div>

            {/* AI & ML Engine */}
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-purple-500/40 space-y-2 bg-gradient-to-br from-purple-950/20 to-slate-800">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Cpu className="w-4 h-4" />
                <span>Adaptive AI & Speech (Python / PyTorch)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span><strong>FSRS / HLR Engine:</strong> 망각 곡선 반감기 계산</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span><strong>Birdbrain IRT:</strong> 문항 반응 이론 기반 실시간 난이도</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span><strong>Multi-Armed Bandit (MAB):</strong> 푸시 알림 CTR 극대화</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span><strong>Speech Pronunciation:</strong> 음소 단위 정확도 채점</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-5 h-5 text-purple-500" />
          </div>

          {/* 4. Persistence & Cache Tier */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-sm text-white">Database, Cache & Event Bus</span>
              </div>
              <span className="text-[11px] px-2.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-bold">
                PostgreSQL + Redis Cluster + Kafka
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-amber-400 block">PostgreSQL (Primary DB)</span>
                <span className="text-slate-300 text-[11px]">사용자 계정, 커리큘럼, SRS 파라미터 샤딩 저장</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-rose-400 block">Redis Cluster (Cache & ZSet)</span>
                <span className="text-slate-300 text-[11px]">주간 리그 랭킹(O(log N)), 토큰 세션, 레이트 리밋</span>
              </div>
              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-700/60">
                <span className="font-bold text-cyan-400 block">Kafka / RabbitMQ (Event Bus)</span>
                <span className="text-slate-300 text-[11px]">학습 로그 이벤트 발행 및 비동기 ML 배치 파이프라인</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer Detail Selector Tabs */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-white">계층별 기술 스택 상세 분석</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {ARCHITECTURE_SPEC.overview.layers.map((layer, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedLayer(idx)}
              className={`p-3 rounded-xl text-left transition-all border ${
                selectedLayer === idx
                  ? 'bg-emerald-600/20 border-emerald-500 text-white shadow'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold text-emerald-400 block">Layer {idx + 1}</span>
              <span className="text-xs font-extrabold truncate block">{layer.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Selected Layer Info Card */}
        <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-black text-white">
              {ARCHITECTURE_SPEC.overview.layers[selectedLayer].name}
            </h4>
            <span className="text-xs px-2.5 py-1 bg-slate-700 text-slate-300 rounded-lg font-mono">
              SLA 99.99% 가용성
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 block">핵심 기술 스택:</span>
            <p className="text-sm font-semibold text-slate-200 mt-0.5">
              {ARCHITECTURE_SPEC.overview.layers[selectedLayer].tech}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 block">역할 및 아키텍처 특성:</span>
            <p className="text-sm text-slate-300 mt-0.5 leading-relaxed">
              {ARCHITECTURE_SPEC.overview.layers[selectedLayer].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
