import React from 'react';
import { X, Check, Globe, Sparkles } from 'lucide-react';
import { CountryInfo, NativeCountry } from '../../types';
import { SUPPORTED_COUNTRIES } from '../../data/dailyExchangeData';
import { sounds } from '../../utils/audio';

interface CountrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry: NativeCountry;
  onSelectCountry: (country: NativeCountry) => void;
}

export const CountrySelectModal: React.FC<CountrySelectModalProps> = ({
  isOpen,
  onClose,
  selectedCountry,
  onSelectCountry,
}) => {
  if (!isOpen) return null;

  const handleSelect = (code: NativeCountry) => {
    sounds.playTap();
    onSelectCountry(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                나의 모국어 설정
              </h2>
              <p className="text-xs text-slate-500">
                Select Your Native Language & Country
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guidance notice */}
        <div className="px-5 py-3 bg-emerald-50/70 border-b border-emerald-100 text-xs text-emerald-900 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">선택하신 국가의 모국어</span>와 한국인의 일상을 1:1로 비교하며 서로 가르쳐주는 양방향 교환 학습이 진행됩니다.
          </div>
        </div>

        {/* Country list */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 space-y-1 custom-scrollbar">
          {SUPPORTED_COUNTRIES.map((country: CountryInfo) => {
            const isSelected = selectedCountry === country.code;
            return (
              <button
                key={country.code}
                onClick={() => handleSelect(country.code)}
                className={`w-full p-3 rounded-2xl flex items-center justify-between text-left transition-all group ${
                  isSelected
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200 ring-2 ring-emerald-400'
                    : 'hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl drop-shadow-xs">{country.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {country.nameKo}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                      }`}>
                        {country.languageName}
                      </span>
                    </div>
                    <div className={`text-xs mt-0.5 flex items-center gap-1.5 ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                      <span>{country.nameNative}</span>
                      <span>•</span>
                      <span>파트너: {country.partnerAvatar} {country.partnerName} ({country.partnerCity})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-white text-emerald-600 flex items-center justify-center font-bold">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-200 group-hover:border-slate-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={() => {
              sounds.playTap();
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs"
          >
            확인 (Done)
          </button>
        </div>
      </div>
    </div>
  );
};
