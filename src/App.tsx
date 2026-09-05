/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileFrame } from './components/mobile/MobileFrame';
import { SpecsDeck } from './components/docs/SpecsDeck';
import { LessonQuizModal } from './components/mobile/LessonQuizModal';
import { NotificationSimulatorModal } from './components/mobile/NotificationSimulatorModal';
import { UNITS_DATA, INITIAL_USER_STATE, INITIAL_SRS_ITEMS, INITIAL_LEADERBOARD } from './data/curriculumData';
import { Lesson, UserState, SrsItem, LeaderboardUser } from './types';
import { sounds } from './utils/audio';

export default function App() {
  const [viewMode, setViewMode] = useState<'simulator' | 'specs' | 'dual'>('dual');
  const [phoneFrameMode, setPhoneFrameMode] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Core application state
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem('klingo_user_state');
      return saved ? JSON.parse(saved) : INITIAL_USER_STATE;
    } catch {
      return INITIAL_USER_STATE;
    }
  });

  const [srsItems, setSrsItems] = useState<SrsItem[]>(INITIAL_SRS_ITEMS);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);

  // Active modals
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [showNotificationSim, setShowNotificationSim] = useState<boolean>(false);

  // Save state on change
  useEffect(() => {
    try {
      localStorage.setItem('klingo_user_state', JSON.stringify(userState));
    } catch {
      // Ignore
    }
  }, [userState]);

  // Adjust default viewMode on small mobile screens
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      setViewMode('simulator');
    }
  }, []);

  // Lesson actions
  const handleSelectLesson = (lesson: Lesson) => {
    if (userState.hearts <= 0) {
      sounds.playError();
      alert('하트가 모두 소진되었습니다! 상점에서 충전하거나 이전 레슨을 복습하세요.');
      return;
    }
    setActiveLesson(lesson);
  };

  const handleCompleteLesson = (earnedXp: number) => {
    setUserState(prev => {
      const newXpTotal = prev.xpTotal + earnedXp;
      const newTodayXp = prev.todayXp + earnedXp;
      const newCompleted = activeLesson && !prev.completedLessonIds.includes(activeLesson.id)
        ? [...prev.completedLessonIds, activeLesson.id]
        : prev.completedLessonIds;

      const newStreak = prev.isStreakActiveToday ? prev.streakCount : prev.streakCount + 1;

      return {
        ...prev,
        xpTotal: newXpTotal,
        todayXp: newTodayXp,
        completedLessonIds: newCompleted,
        streakCount: newStreak,
        isStreakActiveToday: true,
        gems: prev.gems + 15,
        leagueRank: Math.max(1, prev.leagueRank - 1),
      };
    });

    // Update leaderboard
    setLeaderboardUsers(prev =>
      prev.map(u => (u.id === 'current-user' ? { ...u, xp: u.xp + earnedXp } : u))
        .sort((a, b) => b.xp - a.xp)
        .map((u, i) => ({ ...u, rank: i + 1 }))
    );

    setActiveLesson(null);
  };

  const handleLoseHeart = () => {
    setUserState(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1),
    }));
  };

  const handleUpdateSrsItem = (updated: SrsItem) => {
    setSrsItems(prev => prev.map(item => (item.id === updated.id ? updated : item)));
  };

  const handleBuyStreakFreeze = () => {
    if (userState.gems < 200) return;
    setUserState(prev => ({
      ...prev,
      gems: prev.gems - 200,
      streakFreezeCount: prev.streakFreezeCount + 1,
    }));
  };

  const handleRefillHearts = () => {
    if (userState.gems < 150) return;
    setUserState(prev => ({
      ...prev,
      gems: prev.gems - 150,
      hearts: prev.maxHearts,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        userState={userState}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        phoneFrameMode={phoneFrameMode}
        setPhoneFrameMode={setPhoneFrameMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-3 sm:p-5">
        {viewMode === 'simulator' && (
          <div className="py-2 flex justify-center">
            <MobileFrame
              units={UNITS_DATA}
              userState={userState}
              srsItems={srsItems}
              leaderboardUsers={leaderboardUsers}
              onSelectLesson={handleSelectLesson}
              onUpdateSrsItem={handleUpdateSrsItem}
              onBuyStreakFreeze={handleBuyStreakFreeze}
              onRefillHearts={handleRefillHearts}
              onOpenNotificationSim={() => setShowNotificationSim(true)}
              isFrameMode={phoneFrameMode}
            />
          </div>
        )}

        {viewMode === 'specs' && (
          <div className="py-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
            <SpecsDeck />
          </div>
        )}

        {viewMode === 'dual' && (
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start py-2">
            {/* Left: Mobile App Simulator */}
            <div className="xl:col-span-5 flex justify-center sticky top-16">
              <MobileFrame
                units={UNITS_DATA}
                userState={userState}
                srsItems={srsItems}
                leaderboardUsers={leaderboardUsers}
                onSelectLesson={handleSelectLesson}
                onUpdateSrsItem={handleUpdateSrsItem}
                onBuyStreakFreeze={handleBuyStreakFreeze}
                onRefillHearts={handleRefillHearts}
                onOpenNotificationSim={() => setShowNotificationSim(true)}
                isFrameMode={true}
              />
            </div>

            {/* Right: Technical Specification Deck */}
            <div className="xl:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
              <SpecsDeck />
            </div>
          </div>
        )}
      </main>

      {/* Interactive Lesson Runner Modal */}
      {activeLesson && (
        <LessonQuizModal
          lesson={activeLesson}
          hearts={userState.hearts}
          onClose={() => setActiveLesson(null)}
          onComplete={handleCompleteLesson}
          onLoseHeart={handleLoseHeart}
        />
      )}

      {/* AI Multi-Armed Bandit Notification Simulator */}
      {showNotificationSim && (
        <NotificationSimulatorModal onClose={() => setShowNotificationSim(false)} />
      )}
    </div>
  );
}
