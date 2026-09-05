import React, { useState } from 'react';
import {
  Play,
  Check,
  Star,
  Trophy,
  BookOpen,
  Volume2,
  X,
  Zap,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  Compass
} from 'lucide-react';
import { Unit, Lesson, UserState, UnitGuidebook } from '../../types';
import { sounds, speakKorean } from '../../utils/audio';
import { BilingualText } from '../common/BilingualText';
import { getLessonTitleEn, getUnitTitleEn } from '../../utils/translationMap';

interface LearnTabProps {
  units: Unit[];
  userState: UserState;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenNotificationSim: () => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({
  units,
  userState,
  onSelectLesson,
  onOpenNotificationSim,
}) => {
  const [selectedGuidebook, setSelectedGuidebook] = useState<{
    unitNumber: number;
    guidebook: UnitGuidebook;
  } | null>(null);

  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('all');

  // Calculate total lessons and completed count
  const allLessons = units.flatMap((u) => u.lessons);
  const completedCount = allLessons.filter((l) =>
    userState.completedLessonIds.includes(l.id)
  ).length;
  const totalLessons = allLessons.length;
  const overallProgress = Math.round((completedCount / (totalLessons || 1)) * 100);

  // Quick 3-Min Drill Generator: takes 5 random questions from available lessons
  const handleStartSpeedDrill = () => {
    sounds.playTap();
    const availableLessons = units.flatMap((u) => u.lessons);
    const randomQuestions = availableLessons
      .flatMap((l) => l.questions)
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    const speedLesson: Lesson = {
      id: `speed-drill-${Date.now()}`,
      unitId: 'speed-drill',
      unitTitle: '⚡ 3분 스피드 데일리 드릴',
      title: '랜덤 스피드 챌린지 5문항',
      description: '배운 내용을 빠르게 복습하고 25XP 보너스를 획득하세요!',
      level: '초급 1',
      xpReward: 25,
      difficulty: 2,
      status: 'available',
      questions: randomQuestions,
    };

    onSelectLesson(speedLesson);
  };

  const filteredUnits =
    selectedUnitFilter === 'all'
      ? units
      : units.filter((u) => u.id === selectedUnitFilter);

  return (
    <div className="space-y-6 pb-24" id="learn-tab-container">
      {/* Daily Motivation & Streak Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-50 via-emerald-50/40 to-indigo-50/40 rounded-2xl border border-amber-200/80 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-black text-2xl shadow-inner border border-amber-200">
            🔥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-slate-900">
                {userState.streakCount}일 연속 학습 중!
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-full border border-amber-200">
                목표 50XP
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              전체 커리큘럼: {completedCount}/{totalLessons} 완료 ({overallProgress}%)
            </p>
          </div>
        </div>

        <button
          onClick={onOpenNotificationSim}
          className="group px-2.5 py-1.5 text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 shadow-xs"
          title="AI 알림 시뮬레이터 확인 (Check AI Notification Simulator)"
          id="btn-open-notification-sim"
        >
          <span>🔔</span>
          <span className="hidden sm:inline">
            <BilingualText ko="AI 알림" en="AI Push" enClassName="text-indigo-600 font-bold" />
          </span>
        </button>
      </div>

      {/* Quick Action Learning Bar: Speed Drill & Stats */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleStartSpeedDrill}
          id="btn-speed-drill"
          className="p-3.5 bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 rounded-2xl text-left transition-all active:scale-[0.98] group flex items-center justify-between shadow-xs cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-1.5 text-amber-700 font-black text-xs">
              <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              <BilingualText ko="3분 스피드 드릴" en="3-Min Speed Drill" enClassName="text-amber-900 font-black" />
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              <BilingualText ko="랜덤 5문제 속성 복습" en="Quick 5-Question Drill" enClassName="text-slate-900 font-semibold" />
            </p>
          </div>
          <span className="text-xs bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-extrabold group-hover:scale-105 transition-transform shadow-xs">
            +25XP
          </span>
        </button>

        <div className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-xs group cursor-pointer">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs">
              <Compass className="w-4 h-4 text-emerald-600" />
              <BilingualText ko="커리큘럼 로드맵" en="Curriculum Roadmap" enClassName="text-emerald-800 font-extrabold" />
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              <BilingualText
                ko={`총 ${units.length}개 유닛 • ${totalLessons}개 레슨`}
                en={`${units.length} Units • ${totalLessons} Lessons`}
                enClassName="text-slate-800 font-semibold"
              />
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-extrabold text-xs">
            {overallProgress}%
          </div>
        </div>
      </div>

      {/* Unit Selector / Jump Pills */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 group cursor-pointer">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <BilingualText ko="유닛 바로가기" en="Jump to Unit" enClassName="text-emerald-700 font-bold" />
          </span>
          <span className="text-[11px] text-slate-400">
            {filteredUnits.length === 1 ? filteredUnits[0].title : `전체 ${units.length}개 유닛`}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
          <button
            onClick={() => {
              sounds.playTap();
              setSelectedUnitFilter('all');
            }}
            id="unit-filter-all"
            className={`group px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedUnitFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-xs'
            }`}
          >
            <BilingualText
              ko={`전체 보기 (${units.length} Units)`}
              en={`View All (${units.length} Units)`}
              enClassName={selectedUnitFilter === 'all' ? 'text-emerald-100 font-extrabold' : 'text-emerald-700 font-extrabold'}
            />
          </button>
          {units.map((u) => {
            const unitCompleted = u.lessons.filter((l) =>
              userState.completedLessonIds.includes(l.id)
            ).length;
            const isSelected = selectedUnitFilter === u.id;
            return (
              <button
                key={u.id}
                onClick={() => {
                  sounds.playTap();
                  setSelectedUnitFilter(u.id);
                }}
                id={`unit-filter-${u.id}`}
                className={`group px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-xs'
                }`}
              >
                <span>Unit {u.unitNumber}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-black/25 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {unitCompleted}/{u.lessons.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-10">
        {filteredUnits.map((unit) => {
          const unitCompletedCount = unit.lessons.filter((l) =>
            userState.completedLessonIds.includes(l.id)
          ).length;
          const unitTotal = unit.lessons.length;
          const unitPercent = Math.round((unitCompletedCount / unitTotal) * 100);

          // Find checkpoint lesson (usually the last lesson in the unit)
          const checkpointLesson = unit.lessons[unit.lessons.length - 1];

          return (
            <div key={unit.id} className="space-y-6" id={`unit-section-${unit.id}`}>
              {/* Unit Header Card */}
              <div
                className={`p-5 rounded-3xl bg-gradient-to-r ${unit.themeColor} text-white shadow-xl relative overflow-hidden`}
              >
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-wider bg-black/25 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10 group cursor-pointer inline-flex items-center justify-center min-h-[26px]">
                      <BilingualText
                        ko={`Unit ${unit.unitNumber} • 초급 필수 코스`}
                        en={`Unit ${unit.unitNumber} • Beginner Core`}
                        enClassName="text-emerald-200 font-black"
                      />
                    </span>
                    <span className="text-xs font-extrabold bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm group cursor-pointer inline-flex items-center justify-center min-h-[26px]">
                      <BilingualText
                        ko={`${unitCompletedCount}/${unitTotal} 완료 (${unitPercent}%)`}
                        en={`${unitCompletedCount}/${unitTotal} Done (${unitPercent}%)`}
                        enClassName="text-white font-black"
                      />
                    </span>
                  </div>

                  <h3 className="text-xl font-black tracking-tight group cursor-pointer">
                    <BilingualText
                      ko={unit.title}
                      en={getUnitTitleEn(unit.title)}
                      enClassName="text-white drop-shadow-sm font-black"
                    />
                  </h3>
                  <p className="text-xs text-white/95 leading-relaxed">{unit.subtitle}</p>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-black/25 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-500 rounded-full"
                      style={{ width: `${unitPercent}%` }}
                    />
                  </div>

                  {/* Footer Meta & Guidebook button */}
                  <div className="pt-2 flex items-center justify-between text-xs font-semibold text-white/90">
                    <div className="flex items-center gap-2 text-[11px] group cursor-pointer">
                      <BookOpen className="w-3.5 h-3.5" />
                      <BilingualText
                        ko={`어휘 ${unit.totalVocab}개 • 핵심 문법 ${unit.checkpointGrammar.length}개`}
                        en={`${unit.totalVocab} Vocab • ${unit.checkpointGrammar.length} Grammar`}
                        enClassName="text-white font-bold"
                      />
                    </div>

                    {unit.guidebook && (
                      <button
                        onClick={() => {
                          sounds.playTap();
                          setSelectedGuidebook({
                            unitNumber: unit.unitNumber,
                            guidebook: unit.guidebook!,
                          });
                        }}
                        id={`btn-guidebook-${unit.id}`}
                        className="group px-2.5 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-[11px] font-extrabold transition-all active:scale-95 flex items-center gap-1 border border-white/20 cursor-pointer"
                        title="가이드북 보기 (View Guidebook)"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <BilingualText
                          ko="가이드북 보기"
                          en="View Guidebook"
                          enClassName="text-amber-200 font-black"
                        />
                      </button>
                    )}
                  </div>
                </div>

                {/* Decorative Big Unit Number */}
                <div className="absolute -right-3 -bottom-5 text-8xl opacity-15 select-none pointer-events-none font-black">
                  {unit.unitNumber}
                </div>
              </div>

              {/* Duolingo-style Lesson Stepper Path */}
              <div className="relative py-2 flex flex-col items-center gap-6">
                {unit.lessons.map((lesson, lessonIdx) => {
                  const isCompleted = userState.completedLessonIds.includes(lesson.id);
                  const isCheckpoint = lessonIdx === unit.lessons.length - 1;

                  // Alternating horizontal offset for organic Duolingo winding path vibe
                  const offsetClass =
                    lessonIdx % 3 === 1
                      ? 'translate-x-8'
                      : lessonIdx % 3 === 2
                      ? '-translate-x-8'
                      : '';

                  return (
                    <div
                      key={lesson.id}
                      className={`flex flex-col items-center transition-transform group ${offsetClass}`}
                    >
                      <button
                        onClick={() => {
                          sounds.playTap();
                          onSelectLesson(lesson);
                        }}
                        id={`btn-lesson-${lesson.id}`}
                        className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all duration-200 group active:scale-95 shadow-xl cursor-pointer ${
                          isCompleted
                            ? 'bg-amber-400 border-4 border-amber-500 text-slate-900 shadow-amber-500/25'
                            : isCheckpoint
                            ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 border-4 border-purple-400 text-white shadow-purple-500/30 hover:scale-105'
                            : 'bg-emerald-500 border-4 border-emerald-600 text-white shadow-emerald-500/30 hover:scale-105'
                        }`}
                        title={`${lesson.title} (${getLessonTitleEn(lesson.title)})`}
                      >
                        {isCompleted ? (
                          <Check className="w-9 h-9 stroke-[3]" />
                        ) : isCheckpoint ? (
                          <Trophy className="w-8 h-8 fill-amber-300 text-amber-300" />
                        ) : (
                          <Play className="w-8 h-8 fill-white translate-x-0.5" />
                        )}

                        {/* XP / Reward floating pill */}
                        <span className="absolute -bottom-2 bg-white px-2 py-0.5 rounded-full text-[10px] font-black border border-slate-200 text-amber-600 flex items-center gap-0.5 shadow-xs whitespace-nowrap">
                          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          +{lesson.xpReward}XP
                        </span>
                      </button>

                      <div
                        className="mt-3 text-center max-w-[170px] group/title cursor-pointer"
                        onClick={() => {
                          sounds.playTap();
                          onSelectLesson(lesson);
                        }}
                      >
                        <span className="text-xs font-bold text-slate-800 block truncate group-hover/title:text-emerald-700">
                          <BilingualText
                            ko={lesson.title}
                            en={getLessonTitleEn(lesson.title)}
                            enClassName="text-emerald-700 font-extrabold"
                          />
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          <BilingualText
                            ko={`${lesson.questions.length}개 문제 • ${lesson.level}`}
                            en={`${lesson.questions.length} Questions • ${lesson.level}`}
                            enClassName="text-slate-700 font-medium"
                          />
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Unit Master Quest Banner / Trigger */}
                {checkpointLesson && (
                  <div className="mt-4 flex flex-col items-center">
                    <button
                      onClick={() => {
                        sounds.playTap();
                        onSelectLesson(checkpointLesson);
                      }}
                      id={`btn-unit-quest-${unit.id}`}
                      className="group p-3 px-5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-amber-300 flex items-center gap-3 transition-all active:scale-95 shadow-sm cursor-pointer"
                      title={`${unit.unitNumber} 마스터 퀘스트 (${unit.unitNumber} Master Quest)`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold border border-amber-200">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-extrabold text-amber-800 flex items-center gap-1">
                          <BilingualText
                            ko={`Unit ${unit.unitNumber} 마스터 퀘스트`}
                            en={`Unit ${unit.unitNumber} Master Quest`}
                            enClassName="text-amber-900 font-black"
                          />
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <p className="text-[10px] text-slate-500">
                          <BilingualText
                            ko={`종합 체크포인트 도전하고 +${checkpointLesson.xpReward}XP 획득!`}
                            en={`Checkpoint test to earn +${checkpointLesson.xpReward}XP!`}
                            enClassName="text-slate-800 font-semibold"
                          />
                        </p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidebook Modal */}
      {selectedGuidebook && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
          id="modal-guidebook"
        >
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Unit {selectedGuidebook.unitNumber} 핵심 가이드북
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedGuidebook.guidebook.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.playTap();
                  setSelectedGuidebook(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
                id="btn-close-guidebook"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-6 text-sm text-slate-700">
              {/* Grammar Points */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-emerald-700 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>핵심 문법 포인트 (Grammar Notes)</span>
                </h4>

                <div className="space-y-3">
                  {selectedGuidebook.guidebook.grammarPoints.map((gp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2"
                    >
                      <h5 className="font-bold text-slate-900 text-sm">{gp.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {gp.explanation}
                      </p>
                      {gp.examples.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-200 space-y-1.5">
                          {gp.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-2xs"
                            >
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => speakKorean(ex.korean)}
                                  className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                                  title="발음 듣기"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                                <span className="font-bold text-emerald-700">
                                  {ex.korean}
                                </span>
                              </div>
                              <span className="text-slate-500 text-[11px]">
                                {ex.english}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Core Vocabulary */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase text-indigo-700 tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>필수 어휘 & 원어민 발음 (Key Vocabulary)</span>
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {selectedGuidebook.guidebook.keyVocab.map((vocab, vIdx) => (
                    <div
                      key={vIdx}
                      className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {vocab.korean}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[110px]">
                          {vocab.english}
                        </div>
                        {vocab.pronunciation && (
                          <div className="text-[9px] text-indigo-600 font-medium">
                            [{vocab.pronunciation}]
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => speakKorean(vocab.korean)}
                        className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition-colors"
                        title="원어민 발음 재생"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Culture Tip */}
              {selectedGuidebook.guidebook.cultureTip && (
                <div className="p-4 bg-gradient-to-r from-amber-50 via-orange-50/40 to-amber-50 border border-amber-200 rounded-2xl space-y-1.5 shadow-2xs">
                  <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs">
                    <span>🇰🇷 K-컬처 & 생활 팁</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {selectedGuidebook.guidebook.cultureTip}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-white flex justify-end">
              <button
                onClick={() => {
                  sounds.playTap();
                  setSelectedGuidebook(null);
                }}
                className="group px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
              >
                <BilingualText ko="가이드북 닫기" en="Close Guidebook" enClassName="text-white font-bold" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
