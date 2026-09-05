import React, { useState } from 'react';
import { X, Bell, Sparkles, Send, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';
import { sounds } from '../../utils/audio';

interface NotificationSimulatorModalProps {
  onClose: () => void;
}

export const NotificationSimulatorModal: React.FC<NotificationSimulatorModalProps> = ({ onClose }) => {
  const [selectedScenario, setSelectedScenario] = useState<'streak_risk' | 'league_promotion' | 'srs_due' | 'weekly_recap'>('streak_risk');
  const [lastSentNotification, setLastSentNotification] = useState<string | null>(null);

  const banditArms = {
    streak_risk: [
      {
        id: 'arm-1',
        title: '🔥 호돌이가 눈물을 흘리고 있어요...',
        body: '오늘이 2시간 남았습니다! 7일 연속 학습 스트릭이 곧 사라져요. 지금 3분만 공부하세요!',
        predictedCtr: 34.8,
        banditWeight: 0.42,
        sendTime: '오후 9:30 (퇴근/취침 전)',
        rewardOutcome: '+38% 학습 재개율'
      },
      {
        id: 'arm-2',
        title: '⚠️ [경고] 스트릭 동결권이 사용될 예정입니다',
        body: '보유 중인 스트릭 동결권 2개 중 1개가 소진됩니다. 지금 1레슨 완료하고 동결권을 아끼세요!',
        predictedCtr: 29.4,
        banditWeight: 0.31,
        sendTime: '오후 10:15',
        rewardOutcome: '+31% 학습 재개율'
      }
    ],
    league_promotion: [
      {
        id: 'arm-3',
        title: '🏆 골드 리그 3위까지 단 40 XP 남았어요!',
        body: '지금 레슨 2개만 풀면 사파이어 리그 승격권에 진입합니다. Sophia님을 역전해 보세요!',
        predictedCtr: 27.5,
        banditWeight: 0.36,
        sendTime: '오후 7:00 (여가 시간)',
        rewardOutcome: '+25% 주간 리텐션'
      }
    ],
    srs_due: [
      {
        id: 'arm-4',
        title: '🧠 "은/는"과 "이/가" 조사를 잊기 직전이에요!',
        body: 'FSRS 알고리즘 분석: 오늘 복습하지 않으면 단어 4개의 기억 확률이 50% 아래로 떨어집니다.',
        predictedCtr: 22.1,
        banditWeight: 0.28,
        sendTime: '오전 11:45 (점심 직전)',
        rewardOutcome: '+19% 단기 기억 강화'
      }
    ],
    weekly_recap: [
      {
        id: 'arm-5',
        title: '🎉 이번 주 한국어 단어 35개를 정복하셨습니다!',
        body: 'Alex님의 TOPIK 1급 달성 확률이 92%로 상승했습니다. 주간 성취 리포트를 확인하세요.',
        predictedCtr: 18.9,
        banditWeight: 0.22,
        sendTime: '일요일 오후 6:00',
        rewardOutcome: '+15% 만족도'
      }
    ]
  };

  const activeArms = banditArms[selectedScenario];

  const handleTestSend = (title: string, body: string) => {
    sounds.playTap();
    setLastSentNotification(`${title}\n${body}`);
    // Native browser notification if supported
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">AI 개인화 알림 엔진 (MAB)</h3>
              <p className="text-xs text-slate-500">Contextual Multi-Armed Bandit 실시간 최적화</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Selector Chips */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500">푸시 시나리오 선택</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'streak_risk', label: '🔥 스트릭 소멸 위기' },
              { id: 'league_promotion', label: '🏆 리그 승격 기회' },
              { id: 'srs_due', label: '🧠 간격 복습 단어 임박' },
              { id: 'weekly_recap', label: '📊 주간 성취 리포트' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playTap();
                  setSelectedScenario(tab.id as typeof selectedScenario);
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold text-left transition-all border ${
                  selectedScenario === tab.id
                    ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Arms List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Bandit 알고리즘 추천 문구 & 발송 슬롯</span>
            <span className="text-amber-700 font-mono text-[11px] font-semibold">Thompson Sampling 탐색/활용</span>
          </div>

          {activeArms.map(arm => (
            <div
              key={arm.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{arm.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{arm.body}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px]">
                <div className="flex items-center gap-3 text-slate-500 font-mono">
                  <span>예상 CTR: <strong className="text-emerald-700 font-bold">{arm.predictedCtr}%</strong></span>
                  <span>최적 시간: <strong className="text-slate-800 font-bold">{arm.sendTime}</strong></span>
                </div>

                <button
                  onClick={() => handleTestSend(arm.title, arm.body)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>테스트 발송</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toast simulated feedback */}
        {lastSentNotification && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate">모바일 가상 푸시 발송 완료!</span>
          </div>
        )}
      </div>
    </div>
  );
};
