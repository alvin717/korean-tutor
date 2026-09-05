import React from 'react';
import { Trophy, Flame, ChevronUp, ChevronDown, Minus, Clock, ShieldCheck } from 'lucide-react';
import { LeaderboardUser, UserState } from '../../types';
import { BilingualText } from '../common/BilingualText';

interface LeaderboardTabProps {
  users: LeaderboardUser[];
  userState: UserState;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ users, userState }) => {
  return (
    <div className="space-y-6 pb-20">
      {/* League Header */}
      <div className="p-5 bg-gradient-to-br from-amber-50 via-yellow-50/60 to-white rounded-3xl border border-amber-200/90 text-center space-y-3 shadow-xs">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-slate-900 font-black shadow-md shadow-yellow-500/20">
          <Trophy className="w-8 h-8 fill-slate-950 text-slate-950" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800 group cursor-pointer block">
            <BilingualText ko="주간 경쟁 리그" en="Weekly Competitive League" enClassName="text-amber-900 font-black" />
          </span>
          <h2 className="text-xl font-black text-slate-900 group cursor-pointer">
            <BilingualText ko={`${userState.league} 리그`} en={`${userState.league} League`} enClassName="text-amber-800 font-black" />
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 group cursor-pointer">
            <BilingualText
              ko="상위 3명은 사파이어 리그로 승격됩니다!"
              en="Top 3 users get promoted to Sapphire League!"
              enClassName="text-slate-900 font-bold"
            />
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-slate-200 text-xs text-slate-700 shadow-2xs group cursor-pointer">
          <Clock className="w-3.5 h-3.5 text-amber-600" />
          <span>
            <BilingualText
              ko="시즌 종료까지 2일 14시간"
              en="2 Days 14 Hours remaining"
              enClassName="text-amber-800 font-bold"
            />
          </span>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
        {users.map((u) => {
          const isCurrentUser = u.id === 'current-user';
          const isTop3 = u.rank <= 3;
          const isDemotion = u.rank >= 9;

          return (
            <div
              key={u.id}
              className={`p-3.5 sm:p-4 flex items-center justify-between transition-colors group cursor-pointer ${
                isCurrentUser
                  ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600'
                  : 'hover:bg-slate-50/70'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Rank Number */}
                <div className="w-6 text-center font-extrabold text-sm">
                  {u.rank === 1 ? (
                    <span className="text-amber-500 text-base">🥇</span>
                  ) : u.rank === 2 ? (
                    <span className="text-slate-400 text-base">🥈</span>
                  ) : u.rank === 3 ? (
                    <span className="text-amber-700 text-base">🥉</span>
                  ) : (
                    <span className={isDemotion ? 'text-rose-600' : 'text-slate-500'}>{u.rank}</span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg border border-slate-200">
                  {u.avatar}
                </div>

                {/* Name */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold ${isCurrentUser ? 'text-emerald-800' : 'text-slate-800'}`}>
                      {u.name}
                    </span>
                    {isCurrentUser && (
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold">
                        <BilingualText ko="나" en="You" enClassName="text-emerald-900 font-extrabold" />
                      </span>
                    )}
                  </div>
                  {isTop3 ? (
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                      <ChevronUp className="w-3 h-3" />
                      <BilingualText ko="승격 구역" en="Promotion Zone" enClassName="text-emerald-800 font-extrabold" />
                    </span>
                  ) : isDemotion ? (
                    <span className="text-[10px] text-rose-600 font-semibold flex items-center gap-0.5">
                      <ChevronDown className="w-3 h-3" />
                      <BilingualText ko="강등 위험" en="Demotion Zone" enClassName="text-rose-800 font-extrabold" />
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">
                      <BilingualText ko="안전 구역" en="Safe Zone" enClassName="text-slate-700 font-bold" />
                    </span>
                  )}
                </div>
              </div>

              {/* XP score */}
              <div className="text-right">
                <span className="text-sm font-black text-slate-900">{u.xp.toLocaleString()} XP</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
