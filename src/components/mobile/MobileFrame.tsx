import React, { useState } from 'react';
import { BookOpen, Brain, Trophy, ShoppingBag, User, Wifi, Battery, Signal, Languages } from 'lucide-react';
import { Unit, Lesson, UserState, SrsItem, LeaderboardUser } from '../../types';
import { LearnTab } from './LearnTab';
import { ReviewTab } from './ReviewTab';
import { LeaderboardTab } from './LeaderboardTab';
import { ShopTab } from './ShopTab';
import { ProfileTab } from './ProfileTab';
import { sounds } from '../../utils/audio';
import { BilingualText } from '../common/BilingualText';

interface MobileFrameProps {
  units: Unit[];
  userState: UserState;
  srsItems: SrsItem[];
  leaderboardUsers: LeaderboardUser[];
  onSelectLesson: (lesson: Lesson) => void;
  onUpdateSrsItem: (item: SrsItem) => void;
  onBuyStreakFreeze: () => void;
  onRefillHearts: () => void;
  onOpenNotificationSim: () => void;
  isFrameMode: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  units,
  userState,
  srsItems,
  leaderboardUsers,
  onSelectLesson,
  onUpdateSrsItem,
  onBuyStreakFreeze,
  onRefillHearts,
  onOpenNotificationSim,
  isFrameMode,
}) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'srs' | 'leaderboard' | 'shop' | 'profile'>('learn');

  const navItems = [
    { id: 'learn', label: '학습', labelEn: 'Learn', icon: BookOpen },
    { id: 'srs', label: '복습(SRS)', labelEn: 'Review(SRS)', icon: Brain },
    { id: 'leaderboard', label: '리그', labelEn: 'Leagues', icon: Trophy },
    { id: 'shop', label: '상점', labelEn: 'Shop', icon: ShoppingBag },
    { id: 'profile', label: '내정보', labelEn: 'Profile', icon: User },
  ];

  return (
    <div className={`mx-auto transition-all ${
      isFrameMode
        ? 'w-full max-w-[430px] rounded-[48px] border-[10px] border-slate-800 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] bg-slate-50 overflow-hidden relative ring-1 ring-slate-300'
        : 'w-full max-w-2xl bg-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden'
    }`}>
      {/* Mobile Top Status Bar */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between text-xs text-slate-500 select-none bg-white border-b border-slate-100">
        <span className="font-semibold text-slate-700">09:41</span>
        {isFrameMode && (
          <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto" />
        )}
        <div className="flex items-center gap-2 text-slate-600">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 text-emerald-600" />
        </div>
      </div>

      {/* App In-Game Top Bar */}
      <div className="px-5 py-3 border-b border-slate-200/80 bg-white/95 backdrop-blur flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        {/* Flag & Target Level with Hover Translate */}
        <div className="flex items-center gap-2 group cursor-pointer" title="클릭/호버 시 영문으로 확인">
          <span className="text-xl">🇰🇷</span>
          <span className="text-xs font-bold text-slate-800">
            <BilingualText
              ko="한국어 (초급 1~2)"
              en="Korean (Beginner 1~2)"
              enClassName="text-emerald-700 font-extrabold"
            />
          </span>
          <span className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 flex items-center gap-0.5 font-medium hidden sm:flex">
            <Languages className="w-3 h-3" />
            <BilingualText ko="호버 시 영어 전환" en="Hover for English" enClassName="text-emerald-800 font-semibold" />
          </span>
        </div>

        {/* Quick Gamification Chips */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1 text-amber-600 group cursor-pointer" title="연속 학습 일수 (Streak)">
            <span>🔥</span>
            <BilingualText ko={`${userState.streakCount}일`} en={`${userState.streakCount}d`} enClassName="text-amber-800 font-extrabold" />
          </div>
          <div className="flex items-center gap-1 text-cyan-600 group cursor-pointer" title="보석 (Gems)">
            <span>💎</span>
            <span>{userState.gems}</span>
          </div>
          <div className="flex items-center gap-1 text-rose-500 group cursor-pointer" title="남은 하트 (Hearts)">
            <span>❤️</span>
            <span>{userState.hearts}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area (Scrollable) */}
      <div className="p-4 sm:p-5 min-h-[580px] max-h-[720px] overflow-y-auto bg-slate-50/70 custom-scrollbar">
        {activeTab === 'learn' && (
          <LearnTab
            units={units}
            userState={userState}
            onSelectLesson={onSelectLesson}
            onOpenNotificationSim={onOpenNotificationSim}
          />
        )}
        {activeTab === 'srs' && (
          <ReviewTab srsItems={srsItems} onUpdateItem={onUpdateSrsItem} />
        )}
        {activeTab === 'leaderboard' && (
          <LeaderboardTab users={leaderboardUsers} userState={userState} />
        )}
        {activeTab === 'shop' && (
          <ShopTab
            userState={userState}
            onBuyStreakFreeze={onBuyStreakFreeze}
            onRefillHearts={onRefillHearts}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileTab userState={userState} />
        )}
      </div>

      {/* Bottom Tab Navigation Bar with instant hover translate */}
      <div className="border-t border-slate-200 bg-white/95 backdrop-blur px-3 py-2 flex items-center justify-around sticky bottom-0 z-20 shadow-xs">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                sounds.playTap();
                setActiveTab(item.id as typeof activeTab);
              }}
              className={`group flex flex-col items-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-emerald-600 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <BilingualText
                ko={item.label}
                en={item.labelEn}
                className="text-[10px] tracking-tight"
                koClassName={isActive ? 'font-bold text-emerald-600' : 'text-slate-500 font-medium'}
                enClassName="font-extrabold text-emerald-700"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
