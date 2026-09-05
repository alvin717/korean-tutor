import React from 'react';
import { Smartphone, FileText, Columns, Volume2, VolumeX, Flame, Heart, Sparkles, Trophy } from 'lucide-react';
import { UserState } from '../types';
import { sounds } from '../utils/audio';
import { BilingualText } from './common/BilingualText';

interface HeaderProps {
  viewMode: 'simulator' | 'specs' | 'dual';
  setViewMode: (mode: 'simulator' | 'specs' | 'dual') => void;
  userState: UserState;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  phoneFrameMode: boolean;
  setPhoneFrameMode: (enabled: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  userState,
  soundEnabled,
  setSoundEnabled,
  phoneFrameMode,
  setPhoneFrameMode,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.setSoundEnabled(next);
    if (next) sounds.playTap();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/90 px-4 py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-emerald-600/20">
              한
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900">K-Lingo</span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                  Duolingo Architecture
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                <BilingualText
                  ko="한국어 적응형 학습 앱 아키텍처 & 인터랙티브 프로토타입"
                  en="Korean Adaptive Learning Architecture & Interactive Prototype"
                />
              </p>
            </div>
          </div>

          {/* Audio toggle (mobile) */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
              title={soundEnabled ? '음향 끄기' : '음향 켜기'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* Live User Quick Stats with hover bilingual */}
        <div className="hidden lg:flex items-center gap-4 bg-slate-100/90 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-amber-700 group cursor-pointer" title="연속 학습 일수 (Streak)">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <BilingualText ko={`${userState.streakCount}일`} en={`${userState.streakCount} Days`} enClassName="text-amber-800 font-bold" />
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 font-bold text-rose-600 group cursor-pointer" title="체력 (하트 Hearts)">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{userState.hearts}/{userState.maxHearts}</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 font-bold text-cyan-700 group cursor-pointer" title="보유 젬 (보석 Gems)">
            <Sparkles className="w-4 h-4 text-cyan-600" />
            <BilingualText ko={`${userState.gems}개`} en={`${userState.gems} Gems`} enClassName="text-cyan-800 font-bold" />
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div className="flex items-center gap-1.5 font-bold text-amber-800 group cursor-pointer" title="주간 리그 (Weekly League)">
            <Trophy className="w-4 h-4 text-amber-600" />
            <BilingualText
              ko={`${userState.league} ${userState.leagueRank}위`}
              en={`${userState.league} #${userState.leagueRank}`}
              enClassName="text-amber-900 font-bold"
            />
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
          {/* Main View Mode Selector */}
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
            <button
              onClick={() => {
                setViewMode('simulator');
                sounds.playTap();
              }}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'simulator'
                  ? 'bg-emerald-600 text-white shadow font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <BilingualText
                ko="앱 체험"
                en="App Demo"
                enClassName={viewMode === 'simulator' ? 'text-emerald-100 font-bold' : 'text-emerald-700 font-bold'}
              />
            </button>
            <button
              onClick={() => {
                setViewMode('specs');
                sounds.playTap();
              }}
              className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'specs'
                  ? 'bg-emerald-600 text-white shadow font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <BilingualText
                ko="설계 명세"
                en="Tech Specs"
                enClassName={viewMode === 'specs' ? 'text-emerald-100 font-bold' : 'text-emerald-700 font-bold'}
              />
            </button>
            <button
              onClick={() => {
                setViewMode('dual');
                sounds.playTap();
              }}
              className={`group hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'dual'
                  ? 'bg-emerald-600 text-white shadow font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <BilingualText
                ko="듀얼 뷰"
                en="Dual View"
                enClassName={viewMode === 'dual' ? 'text-emerald-100 font-bold' : 'text-emerald-700 font-bold'}
              />
            </button>
          </div>

          {/* Desktop Sound & Frame Toggles */}
          <div className="hidden md:flex items-center gap-1.5">
            {viewMode === 'simulator' && (
              <button
                onClick={() => setPhoneFrameMode(!phoneFrameMode)}
                className={`group px-2.5 py-1.5 text-xs rounded-lg border transition-colors ${
                  phoneFrameMode
                    ? 'bg-slate-200 border-slate-300 text-slate-800 font-semibold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title={phoneFrameMode ? '반응형 와이드 모드로 전환' : '모바일 폰 프레임으로 전환'}
              >
                {phoneFrameMode ? (
                  <BilingualText ko="📱 폰 프레임" en="📱 Phone Frame" enClassName="text-slate-900 font-bold" />
                ) : (
                  <BilingualText ko="🖥️ 와이드 뷰" en="🖥️ Wide View" enClassName="text-emerald-700 font-bold" />
                )}
              </button>
            )}

            <button
              onClick={toggleSound}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
              title={soundEnabled ? '효과음 끄기 (Sound Off)' : '효과음 켜기 (Sound On)'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
