import React from 'react';
import { Globe, Database, Server, Zap, ShieldCheck, Code2, Network } from 'lucide-react';
import { ARCHITECTURE_SPEC } from '../../data/architectureSpecData';

export const GlobalDatabaseScaling: React.FC = () => {
  const g = ARCHITECTURE_SPEC.globalScaling;

  const sqlSchemaSnippet = `
-- ============================================================================
-- K-Lingo Global Database Schema (PostgreSQL 16 + Citus Partitioning)
-- ============================================================================

-- 1. 사용자 마스터 테이블 (Citus Hash Partitioned by user_id)
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    native_lang VARCHAR(10) DEFAULT 'en', -- 학습자의 모국어 (UI i18n 기준)
    streak_count INT DEFAULT 0,
    streak_freeze_count INT DEFAULT 2,
    xp_total BIGINT DEFAULT 0,
    current_league VARCHAR(20) DEFAULT 'BRONZE',
    topik_predicted_score INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 다국어 커리큘럼 문항 카탈로그 (i18n 분리 구조)
CREATE TABLE questions (
    question_id VARCHAR(64) PRIMARY KEY,
    unit_id VARCHAR(64) NOT NULL,
    quiz_type VARCHAR(32) NOT NULL, -- word-match, listening, speaking, etc.
    korean_prompt TEXT NOT NULL,
    audio_asset_url TEXT,
    difficulty_score NUMERIC(3, 2) DEFAULT 5.0
);

CREATE TABLE question_localizations (
    question_id VARCHAR(64) REFERENCES questions(question_id) ON DELETE CASCADE,
    lang_code VARCHAR(10) NOT NULL, -- 'en', 'ja', 'zh', 'vi', 'es'
    localized_instruction TEXT NOT NULL,
    explanation TEXT NOT NULL,
    options_json JSONB, -- 다국어 선택지
    PRIMARY KEY (question_id, lang_code)
);

-- 3. 적응형 간격 반복 (SRS) 학습 상태 (수억 건 대비 유저별 파티셔닝)
CREATE TABLE spaced_repetition_items (
    user_id UUID NOT NULL,
    word_id VARCHAR(64) NOT NULL,
    stability NUMERIC(6, 2) DEFAULT 0.40,  -- S (안정성)
    difficulty NUMERIC(4, 2) DEFAULT 5.00, -- D (난이도)
    retrievability NUMERIC(4, 3) DEFAULT 1.000, -- R (회상 확률)
    reps INT DEFAULT 0,
    lapses INT DEFAULT 0,
    last_review_at TIMESTAMPTZ,
    next_review_at TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (user_id, word_id)
) PARTITION BY HASH (user_id);
`;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
          <Globe className="w-4 h-4" />
          <span>Section 6: 글로벌 인프라 & 분산 데이터베이스 설계</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          다국어 확장(i18n) 및 글로벌 분산 데이터베이스 최적화
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          전 세계 5천만 명 이상의 동시 접속을 수용하는 듀오링고의 인프라 설계를 벤치마킹하여, 다국어 콘텐츠 카탈로그 분리, PostgreSQL 16 분할 파티셔닝, Redis ZSet 초고속 랭킹 및 엣지 CDN 캐싱 전략을 제시합니다.
        </p>
      </div>

      {/* Strategies Grid */}
      <div className="space-y-4">
        {g.strategies.map((strat, idx) => (
          <div
            key={idx}
            className="p-6 bg-slate-800/80 rounded-3xl border border-slate-700/80 space-y-3"
          >
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                {idx + 1}
              </span>
              <span>{strat.topic}</span>
            </h3>

            <div className="space-y-2 pl-8">
              {strat.details.map((detail, di) => (
                <div key={di} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Production SQL Schema Showcase */}
      <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Database className="w-5 h-5" />
            <span>PostgreSQL 16 & Citus 파티셔닝 DDL 스키마 (Production Schema)</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">schema.sql</span>
        </div>

        <pre className="text-xs font-mono text-cyan-300/90 overflow-x-auto p-4 bg-slate-900/80 rounded-2xl leading-relaxed custom-scrollbar border border-slate-800/80">
          {sqlSchemaSnippet}
        </pre>
      </div>
    </div>
  );
};
