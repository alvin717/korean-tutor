import React from 'react';
import { UserState } from '../../types';
import { Flame, Clock, Award, BarChart3, AlertCircle, Target, TrendingUp } from 'lucide-react';
import { BilingualText } from '../common/BilingualText';

interface ProfileTabProps {
  userState: UserState;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ userState }) => {
  // Weekly XP Mock Graph Data
  const weeklyData = [
    { day: '월', dayEn: 'Mon', xp: 45, goal: 50 },
    { day: '화', dayEn: 'Tue', xp: 60, goal: 50 },
    { day: '수', dayEn: 'Wed', xp: 55, goal: 50 },
    { day: '목', dayEn: 'Thu', xp: 40, goal: 50 },
    { day: '금', dayEn: 'Fri', xp: 50, goal: 50 },
    { day: '토', dayEn: 'Sat', xp: 70, goal: 50 },
    { day: '오늘', dayEn: 'Today', xp: userState.todayXp, goal: 50 },
  ];

  // Weakness Analysis Data
  const weaknesses = [
    { topic: '주제/주격 조사 구분 (은/는 vs 이/가)', topicEn: 'Topic vs Subject Particle (은/는 vs 이/가)', errorRate: 34, status: '집중 복습 필요', statusEn: 'Urgent Review' },
    { topic: '종성(받침) 연음 발음 법칙', topicEn: 'Batchim Linking Sound Rules', errorRate: 26, status: '주의', statusEn: 'Caution' },
    { topic: '비격식 존댓말 활용 (-아/어요)', topicEn: 'Polite Informal Conjugation (-아/어요)', errorRate: 18, status: '안정', statusEn: 'Stable' },
    { topic: '수사 체계 (하나/둘 vs 일/이/삼)', topicEn: 'Number Systems (Native vs Sino-Korean)', errorRate: 14, status: '양호', statusEn: 'Good' }
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Card */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 flex items-center gap-4 shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-3xl shadow-md shadow-emerald-600/20 text-white">
          {userState.avatar}
        </div>
        <div>
          <h2 className="text-lg font-black text-slate-900">{userState.name}</h2>
          <p className="text-xs text-slate-500 group cursor-pointer">
            <BilingualText
              ko="학습 시작 24일차 • 한국어 초급 마스터 중"
              en="Day 24 of Learning • Mastering Korean Beginner"
              enClassName="text-slate-800 font-medium"
            />
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="group px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 cursor-pointer">
              <BilingualText
                ko={`${userState.league} 리그`}
                en={`${userState.league} League`}
                enClassName="text-emerald-800 font-extrabold"
              />
            </span>
            <span className="group px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 cursor-pointer">
              <BilingualText
                ko={`🔥 ${userState.streakCount}일 스트릭`}
                en={`🔥 ${userState.streakCount}-Day Streak`}
                enClassName="text-amber-900 font-extrabold"
              />
            </span>
          </div>
        </div>
      </div>

      {/* TOPIK Forecast Card */}
      <div className="p-5 bg-gradient-to-r from-blue-50 via-indigo-50/60 to-white rounded-3xl border border-blue-200/90 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-800 font-bold text-xs group cursor-pointer">
            <Target className="w-4 h-4 text-blue-600" />
            <BilingualText
              ko="AI TOPIK 공식 급수 예측 모델"
              en="AI TOPIK Level Forecast Model"
              enClassName="text-blue-900 font-black"
            />
          </div>
          <span className="group text-[11px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full cursor-pointer">
            <BilingualText
              ko={`합격 확률 ${userState.topikLevelForecast.passProbability}%`}
              en={`Pass Chance: ${userState.topikLevelForecast.passProbability}%`}
              enClassName="text-emerald-950 font-black"
            />
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <h3 className="text-2xl font-black text-slate-900">{userState.topikLevelForecast.level}</h3>
            <p className="text-xs text-slate-600 group cursor-pointer">
              <BilingualText
                ko={`현재 예상 획득 점수: ${userState.topikLevelForecast.score}점 / 100점`}
                en={`Projected Score: ${userState.topikLevelForecast.score} / 100 pts`}
                enClassName="text-slate-900 font-bold"
              />
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 group cursor-pointer">
            <BilingualText
              ko="합격 기준선 (80점) 돌파"
              en="Target (80 pts) Cleared"
              enClassName="text-blue-900 font-bold"
            />
          </span>
        </div>

        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            style={{ width: `${userState.topikLevelForecast.score}%` }}
          />
        </div>
      </div>

      {/* Weekly XP Bar Chart */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              <BilingualText
                ko="주간 학습 경험치 (Weekly XP)"
                en="Weekly Learning XP Graph"
                enClassName="text-emerald-700 font-extrabold"
              />
            </h4>
          </div>
          <span className="text-xs text-slate-500 group cursor-pointer">
            <BilingualText
              ko="일일 목표: 50 XP"
              en="Daily Goal: 50 XP"
              enClassName="text-slate-800 font-bold"
            />
          </span>
        </div>

        <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
          {weeklyData.map((d, i) => {
            const heightPercent = Math.min(100, Math.round((d.xp / 80) * 100));
            const isToday = d.day === '오늘';
            const reachedGoal = d.xp >= d.goal;

            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer">
                <span className="text-[10px] text-slate-500 font-mono">{d.xp}</span>
                <div className="w-full max-w-[28px] h-full flex items-end bg-slate-100 rounded-t-lg overflow-hidden">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-500 ${
                      isToday
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                        : reachedGoal
                        ? 'bg-emerald-500'
                        : 'bg-slate-300'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className={`text-[11px] font-bold ${isToday ? 'text-emerald-700 font-extrabold' : 'text-slate-500'}`}>
                  <BilingualText ko={d.day} en={d.dayEn} enClassName="text-slate-800 font-bold" />
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weakness Analysis */}
      <div className="p-5 bg-white rounded-3xl border border-slate-200 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-rose-700 group cursor-pointer">
          <AlertCircle className="w-4 h-4" />
          <h4 className="text-xs font-bold uppercase tracking-wider">
            <BilingualText
              ko="AI 학습자 오답 패턴 및 약점 분석"
              en="Learner Error Patterns & Weakness Clinic"
              enClassName="text-rose-900 font-black"
            />
          </h4>
        </div>
        <p className="text-xs text-slate-500">
          최근 풀이한 문제 데이터를 바탕으로 자주 혼동하는 문법 요소를 도출했습니다.
        </p>

        <div className="space-y-2.5 pt-2">
          {weaknesses.map((w, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs group cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <div>
                <span className="font-semibold text-slate-800 block">
                  <BilingualText ko={w.topic} en={w.topicEn} enClassName="text-slate-900 font-bold" />
                </span>
                <span className="text-[10px] text-rose-600 font-mono font-medium">
                  <BilingualText ko={`오답률 ${w.errorRate}%`} en={`Error Rate: ${w.errorRate}%`} enClassName="text-rose-700 font-bold" />
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border whitespace-nowrap ${
                w.errorRate > 30 ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                <BilingualText ko={w.status} en={w.statusEn} enClassName="font-extrabold" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
