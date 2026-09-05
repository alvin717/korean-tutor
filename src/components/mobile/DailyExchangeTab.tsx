import React, { useState } from 'react';
import { 
  Globe, Volume2, CheckCircle2, ArrowRight, Sparkles, MessageCircle, 
  Lightbulb, ChevronRight, Award, Flame, RefreshCw 
} from 'lucide-react';
import { NativeCountry, ExchangeScene, CountryInfo } from '../../types';
import { SUPPORTED_COUNTRIES, DAILY_EXCHANGE_SCENES } from '../../data/dailyExchangeData';
import { speakKorean, speakForeign, sounds } from '../../utils/audio';

interface DailyExchangeTabProps {
  selectedCountry: NativeCountry;
  onOpenCountryModal: () => void;
  onAddGems?: (amount: number) => void;
}

export const DailyExchangeTab: React.FC<DailyExchangeTabProps> = ({
  selectedCountry,
  onOpenCountryModal,
  onAddGems,
}) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<'step1' | 'step2' | 'step3'>('step1');
  
  // Step 1 State: Chosen option by user
  const [chosenStep1OptId, setChosenStep1OptId] = useState<string | null>(null);
  
  // Step 3 State: Roleplay answer
  const [chosenStep3OptId, setChosenStep3OptId] = useState<string | null>(null);
  const [completedScenes, setCompletedScenes] = useState<string[]>([]);

  const currentCountry: CountryInfo = SUPPORTED_COUNTRIES.find(c => c.code === selectedCountry) || SUPPORTED_COUNTRIES[0];
  const currentScene: ExchangeScene = DAILY_EXCHANGE_SCENES[selectedSceneIndex] || DAILY_EXCHANGE_SCENES[0];

  const handlePlayForeign = (text: string) => {
    sounds.playTap();
    speakForeign(text, currentCountry.langCode);
  };

  const handlePlayKorean = (text: string) => {
    sounds.playTap();
    speakKorean(text);
  };

  const handleSelectStep1Option = (optId: string) => {
    setChosenStep1OptId(optId);
    sounds.playSuccess();
  };

  const handleSelectStep3Option = (optId: string, isCorrect: boolean) => {
    setChosenStep3OptId(optId);
    if (isCorrect) {
      sounds.playFanfare();
      if (!completedScenes.includes(currentScene.id)) {
        setCompletedScenes(prev => [...prev, currentScene.id]);
        if (onAddGems) onAddGems(5);
      }
    } else {
      sounds.playError();
    }
  };

  const handleSwitchScene = (index: number) => {
    sounds.playTap();
    setSelectedSceneIndex(index);
    setActiveStep('step1');
    setChosenStep1OptId(null);
    setChosenStep3OptId(null);
  };

  const progressPercent = Math.round((completedScenes.length / DAILY_EXCHANGE_SCENES.length) * 100);

  return (
    <div className="space-y-4 pb-6">
      {/* Top Banner: Country & Native Language Switcher */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 rounded-3xl p-4 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 text-8xl pointer-events-none select-none font-sans font-black">
          24H
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl drop-shadow-xs">{currentCountry.flag}</span>
              <div>
                <span className="text-[11px] font-semibold text-emerald-100 uppercase tracking-wider block">
                  나의 모국어 ⇄ 한국어 일상 교환
                </span>
                <span className="font-extrabold text-sm sm:text-base">
                  {currentCountry.nameKo}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sounds.playTap();
                onOpenCountryModal();
              }}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/30 shadow-xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>국가 변경</span>
            </button>
          </div>

          <p className="text-xs text-emerald-50 leading-relaxed max-w-sm">
            아침 07:00 기상부터 밤 23:00 취침까지! {currentCountry.partnerAvatar} {currentCountry.partnerName}님과 한국인 친구 민수가 서로의 모국어로 하루 일상을 가르쳐줍니다.
          </p>

          {/* 24-hour Progress */}
          <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-100 font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>하루 일상 달성도: <strong className="text-white font-bold">{completedScenes.length}/{DAILY_EXCHANGE_SCENES.length} 개</strong></span>
            </div>
            <span className="font-extrabold text-white text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {progressPercent}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-amber-300 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 24h Timeline Selector (Horizontally scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 custom-scrollbar select-none">
        {DAILY_EXCHANGE_SCENES.map((scene, idx) => {
          const isSelected = selectedSceneIndex === idx;
          const isDone = completedScenes.includes(scene.id);

          return (
            <button
              key={scene.id}
              onClick={() => handleSwitchScene(idx)}
              className={`shrink-0 px-3 py-2 rounded-2xl flex items-center gap-2 transition-all border text-left ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <span className="text-base">{scene.icon}</span>
              <div>
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-bold px-1 rounded ${
                    isSelected ? 'bg-white/20 text-emerald-300' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {scene.timeSlot}
                  </span>
                  {isDone && (
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 fill-emerald-100" />
                  )}
                </div>
                <div className="text-xs font-bold whitespace-nowrap mt-0.5">
                  {scene.periodKo.split('&')[0].trim()}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Current Scene Header Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-xl shadow-2xs">
              {currentScene.icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {currentScene.timeSlot}
                </span>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  {currentScene.periodKo}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentScene.situationSummaryKo}
              </p>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => {
              sounds.playTap();
              setActiveStep('step1');
            }}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeStep === 'step1'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🤝 1단계</span>
            <span className="text-[10px] font-normal sm:font-bold hidden sm:inline">내가 가르쳐주기</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveStep('step2');
            }}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeStep === 'step2'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🇰🇷 2단계</span>
            <span className="text-[10px] font-normal sm:font-bold hidden sm:inline">한국 일상 표현</span>
          </button>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveStep('step3');
            }}
            className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
              activeStep === 'step3'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>💬 3단계</span>
            <span className="text-[10px] font-normal sm:font-bold hidden sm:inline">티키타카 챌린지</span>
          </button>
        </div>
      </div>

      {/* Step 1: 내가 한국 친구에게 내 나라 일상 표현 가르쳐주기 */}
      {activeStep === 'step1' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
              <span>{currentCountry.flag}</span>
              <span>{currentCountry.nameKo} 일상 표현 공유</span>
            </span>
            <span className="text-xs text-slate-400">Step 1 of 3</span>
          </div>

          {/* Korean Friend prompt speech bubble */}
          <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black shrink-0 text-base shadow-2xs">
              🇰🇷
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900">한국 친구 민수</span>
                <button
                  onClick={() => handlePlayKorean(currentScene.partnerGreetingPromptKo)}
                  className="text-indigo-600 hover:text-indigo-800 p-1 rounded-lg hover:bg-indigo-50 transition-colors"
                  title="한국어 음성 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-800 mt-1 leading-relaxed">
                "{currentScene.partnerGreetingPromptKo}"
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentScene.partnerGreetingPromptEn}
              </p>
            </div>
          </div>

          {/* Question / Task instructions */}
          <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{currentScene.nativeTeachTask.questionKo}</span>
          </div>

          {/* Country Options */}
          <div className="space-y-2.5">
            {currentScene.nativeTeachTask.options.map((opt) => {
              const isSelected = chosenStep1OptId === opt.id;
              const nativeText = opt.phraseByCountry[selectedCountry] || opt.phraseByCountry['US'];

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectStep1Option(opt.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-300 shadow-sm'
                      : 'bg-white border-slate-200 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          {currentCountry.languageName}
                        </span>
                        <span className="text-sm font-extrabold text-slate-900">
                          {nativeText}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-slate-600 mt-1">
                        뜻: {opt.meaningKo}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {opt.explanationKo}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayForeign(nativeText);
                      }}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 flex items-center justify-center transition-colors shrink-0"
                      title="원어민 발음 듣기"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reaction after selecting */}
          {chosenStep1OptId && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-2 animate-in fade-in">
              <div className="flex items-center gap-2 font-extrabold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>민수가 감탄했어요! ("대박! 그렇게 말하는구나!")</span>
              </div>
              <p className="text-emerald-900 leading-relaxed">
                민수가 {currentCountry.nameKo} 표현을 소리내어 따라 읽으며 배웠습니다. 이제 민수가 한국의 생생한 일상 표현을 가르쳐줍니다!
              </p>
              <button
                onClick={() => {
                  sounds.playTap();
                  setActiveStep('step2');
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>2단계: 한국 친구의 표현 배우기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 2: 한국 친구가 알려주는 한국의 진짜 일상 표현 & 문화 */}
      {activeStep === 'step2' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200 flex items-center gap-1">
              <span>🇰🇷</span>
              <span>한국의 찐 일상 표현 & 문화</span>
            </span>
            <span className="text-xs text-slate-400">Step 2 of 3</span>
          </div>

          {/* Main Key Phrase Display */}
          <div className="p-5 bg-gradient-to-br from-indigo-50/70 via-slate-50 to-purple-50/50 rounded-3xl border border-indigo-100 relative overflow-hidden">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs font-extrabold text-indigo-600 tracking-wider mb-1">
                  TODAY'S ESSENTIAL KOREAN
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {currentScene.koreanTeachInfo.koreanPhrase}
                </h2>
                {currentScene.koreanTeachInfo.phoneticSpelling && (
                  <div className="text-xs font-bold text-amber-700 mt-1">
                    실제 발음: {currentScene.koreanTeachInfo.phoneticSpelling}
                  </div>
                )}
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {currentScene.koreanTeachInfo.romanization}
                </div>
                <div className="text-sm font-bold text-indigo-950 mt-2 bg-white/80 px-3 py-1.5 rounded-xl border border-indigo-100 inline-block">
                  {currentCountry.flag} {currentScene.koreanTeachInfo.translationByCountry[selectedCountry] || currentScene.koreanTeachInfo.translationByCountry['US']}
                </div>
              </div>

              <button
                onClick={() => handlePlayKorean(currentScene.koreanTeachInfo.koreanPhrase)}
                className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md shadow-indigo-200 transition-transform active:scale-95 shrink-0"
                title="한국어 원어민 발음 듣기"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Context and Nuance Guide */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>뉘앙스 및 쓰임새 (Usage Nuance)</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {currentScene.koreanTeachInfo.usageContextKo}
            </p>
            <p className="text-slate-400 text-[11px]">
              {currentScene.koreanTeachInfo.usageContextEn}
            </p>
          </div>

          {/* Cultural Note (Culture Bite) */}
          <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>한국 문화 꿀팁 (Korean Culture Note)</span>
            </div>
            <p className="text-amber-900 leading-relaxed font-medium">
              {currentScene.koreanTeachInfo.culturalNoteKo}
            </p>
            <p className="text-amber-800 text-[11px]">
              {currentScene.koreanTeachInfo.culturalNoteEn}
            </p>
          </div>

          {/* Example Dialogue between Minsu and Me */}
          <div className="space-y-2 pt-1">
            <div className="text-xs font-extrabold text-slate-700">
              실생활 2인 대화 롤플레잉 (Real Dialogue)
            </div>
            {currentScene.koreanTeachInfo.exampleDialogue.map((dialogue, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                  dialogue.speaker === 'korean'
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-emerald-50/60 border-emerald-200'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  dialogue.speaker === 'korean' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
                }`}>
                  {dialogue.speaker === 'korean' ? '민수' : '나'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{dialogue.korean}</span>
                    <button
                      onClick={() => handlePlayKorean(dialogue.korean)}
                      className="text-slate-400 hover:text-slate-700 p-0.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {dialogue.translationByCountry[selectedCountry] || dialogue.translationByCountry['US']}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              sounds.playTap();
              setActiveStep('step3');
            }}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>3단계: 실전 티키타카 퀴즈 풀기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Step 3: 실전 티키타카 메신저 챌린지 */}
      {activeStep === 'step3' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>실전 메신저 롤플레잉 챌린지</span>
            </span>
            <span className="text-xs text-slate-400">Step 3 of 3</span>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            {currentScene.roleplayChallenge.situationKo}
          </div>

          {/* Messenger Style Chat Window */}
          <div className="bg-slate-100/80 p-4 rounded-3xl space-y-3 border border-slate-200">
            {/* Friend's message */}
            <div className="flex items-start gap-2 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                민수
              </div>
              <div>
                <div className="text-[10px] text-slate-500 mb-0.5">한국 친구 민수</div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs border border-slate-200 text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>{currentScene.roleplayChallenge.koreanFriendPrompt}</span>
                  <button
                    onClick={() => handlePlayKorean(currentScene.roleplayChallenge.koreanFriendPrompt)}
                    className="text-indigo-600 hover:text-indigo-800 shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* User response choice options */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-extrabold text-slate-700 flex items-center justify-between">
                <span>나의 자연스러운 답장을 골라주세요:</span>
                <span className="text-slate-400 text-[10px]">Select Best Reply</span>
              </div>

              {currentScene.roleplayChallenge.options.map((opt) => {
                const isSelected = chosenStep3OptId === opt.id;
                let borderClass = 'border-slate-200 hover:bg-slate-50 bg-white';
                if (isSelected) {
                  borderClass = opt.isCorrect
                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300'
                    : 'border-rose-400 bg-rose-50 ring-2 ring-rose-300';
                }

                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectStep3Option(opt.id, opt.isCorrect)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${borderClass}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="text-sm font-extrabold text-slate-900">
                          {opt.korean}
                        </div>
                        <div className="text-xs font-mono text-slate-500 mt-0.5">
                          {opt.romanization}
                        </div>
                        <div className="text-xs text-slate-600 font-medium mt-1">
                          뜻: {opt.translationByCountry[selectedCountry] || opt.translationByCountry['US']}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayKorean(opt.korean);
                        }}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Feedback & Result */}
          {chosenStep3OptId && (
            <div>
              {currentScene.roleplayChallenge.options.find(o => o.id === chosenStep3OptId)?.isCorrect ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>대화 미션 성공! (+5 💎 보석 획득)</span>
                    </div>
                    <span className="text-xs font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                      🎉 축하해요!
                    </span>
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                    {currentScene.roleplayChallenge.options.find(o => o.id === chosenStep3OptId)?.friendReactionKo}
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    {selectedSceneIndex < DAILY_EXCHANGE_SCENES.length - 1 ? (
                      <button
                        onClick={() => handleSwitchScene(selectedSceneIndex + 1)}
                        className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>다음 시간대 ({DAILY_EXCHANGE_SCENES[selectedSceneIndex + 1].timeSlot})로 이동</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="w-full text-center py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-xs">
                        🎊 24시간 하루 일상 언어교환 코스를 모두 완료하셨습니다!
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-950 space-y-1.5 animate-in fade-in">
                  <div className="font-extrabold text-rose-800">
                    아쉬워요! 다른 답변을 골라보세요.
                  </div>
                  <p className="text-rose-900 leading-relaxed">
                    {currentScene.roleplayChallenge.options.find(o => o.id === chosenStep3OptId)?.friendReactionKo}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
