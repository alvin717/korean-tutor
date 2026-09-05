import React, { useState, useEffect } from 'react';
import { X, Volume2, Sparkles, Check, Play, Shuffle } from 'lucide-react';
import { FanfareThemeId } from '../../types';
import { sounds, FANFARE_THEMES } from '../../utils/audio';
import { BilingualText } from '../common/BilingualText';

interface FanfareSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FanfareSettingsModal: React.FC<FanfareSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<FanfareThemeId | 'random'>('random');
  const [playingTheme, setPlayingTheme] = useState<FanfareThemeId | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedTheme(sounds.getFanfareTheme());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectTheme = (theme: FanfareThemeId | 'random') => {
    sounds.playTap();
    setSelectedTheme(theme);
    sounds.setFanfareTheme(theme);
  };

  const handlePreview = (themeId: FanfareThemeId, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingTheme(themeId);
    sounds.playFanfare(themeId);
    setTimeout(() => {
      setPlayingTheme(prev => (prev === themeId ? null : prev));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-xl shadow-inner">
              🎉
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-black tracking-tight">정답 팡파레 효과음</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/25 font-bold tracking-wider uppercase">
                  5 Themes
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                <BilingualText
                  ko="정답을 맞혔을 때 울리는 축하 팡파레를 골라보세요"
                  en="Choose celebration fanfares played on correct answers"
                  koClassName="text-amber-100"
                  enClassName="text-white font-bold"
                />
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/25 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {/* Random Option (Recommended) */}
          <div
            onClick={() => handleSelectTheme('random')}
            className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              selectedTheme === 'random'
                ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/50 border-amber-500 shadow-sm shadow-amber-500/10'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-colors shadow-xs ${
                  selectedTheme === 'random'
                    ? 'bg-amber-500 text-white shadow-amber-500/30'
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <Shuffle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900">
                    <BilingualText ko="무작위 랜덤 셔플" en="Random Shuffle" enClassName="text-amber-800 font-black" />
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                    추천 (매번 색다르게)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  <BilingualText
                    ko="정답을 맞힐 때마다 5가지 팡파레가 중복 없이 번갈아가며 울려요!"
                    en="Rotates all 5 distinct fanfares without repeating the same one!"
                    enClassName="text-slate-700 font-medium"
                  />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 pl-2">
              {selectedTheme === 'random' && (
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 pt-2 px-1 text-xs font-bold text-slate-400">
            <span>또는 특정 팡파레 하나로 고정:</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* 5 Distinct Fanfares */}
          {FANFARE_THEMES.map(theme => {
            const isSelected = selectedTheme === theme.id;
            const isPlaying = playingTheme === theme.id;

            return (
              <div
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-500 shadow-sm shadow-emerald-500/10'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl transition-all shadow-xs shrink-0 ${
                      isPlaying
                        ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-200'
                        : isSelected
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <span>{theme.icon}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-slate-900 truncate">
                        <BilingualText ko={theme.nameKo} en={theme.nameEn} enClassName="text-emerald-800 font-bold" />
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {theme.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug truncate">
                      <BilingualText ko={theme.descKo} en={theme.descEn} enClassName="text-slate-700" />
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* Preview Button */}
                  <button
                    onClick={e => handlePreview(theme.id, e)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all border ${
                      isPlaying
                        ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 active:scale-95'
                    }`}
                    title="미리듣기"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="text-[11px]">{isPlaying ? '재생 중' : '듣기'}</span>
                  </button>

                  {/* Radio / Check indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>설정 즉시 저장됨 (웹 오디오 신시사이저)</span>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
