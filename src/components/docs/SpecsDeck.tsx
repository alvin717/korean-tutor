import React, { useState } from 'react';
import { Layers, Target, BookOpen, Brain, Sparkles, Globe, ChevronRight } from 'lucide-react';
import { ArchitectureOverview } from './ArchitectureOverview';
import { MvpRoadmap } from './MvpRoadmap';
import { CurriculumDeepDive } from './CurriculumDeepDive';
import { SrsPseudocode } from './SrsPseudocode';
import { GamificationPsychology } from './GamificationPsychology';
import { GlobalDatabaseScaling } from './GlobalDatabaseScaling';
import { sounds } from '../../utils/audio';
import { BilingualText } from '../common/BilingualText';

export const SpecsDeck: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections = [
    { id: 'arch', label: '1. 앱 아키텍처 다이어그램', labelEn: '1. Architecture Diagram', icon: Layers },
    { id: 'mvp', label: '2. MVP 기능 우선순위', labelEn: '2. MVP Roadmap & Priority', icon: Target },
    { id: 'curriculum', label: '3. 초급 1~2 커리큘럼 명세', labelEn: '3. Curriculum Specs (1~2)', icon: BookOpen },
    { id: 'srs', label: '4. 간격 반복 의사코드', labelEn: '4. Spaced Repetition (SRS)', icon: Brain },
    { id: 'gamification', label: '5. 게임화 심리학 전략', labelEn: '5. Gamification Psychology', icon: Sparkles },
    { id: 'global', label: '6. 다국어 & 글로벌 DB 최적화', labelEn: '6. Global DB Scaling', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Horizontal Tab Navigator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar border-b border-slate-200">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          const isActive = activeSection === idx;

          return (
            <button
              key={sec.id}
              onClick={() => {
                sounds.playTap();
                setActiveSection(idx);
              }}
              className={`group flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <BilingualText
                ko={sec.label}
                en={sec.labelEn}
                enClassName={isActive ? 'text-white font-extrabold' : 'text-emerald-700 font-extrabold'}
              />
            </button>
          );
        })}
      </div>

      {/* Render Active Document Section */}
      <div className="p-1 sm:p-2">
        {activeSection === 0 && <ArchitectureOverview />}
        {activeSection === 1 && <MvpRoadmap />}
        {activeSection === 2 && <CurriculumDeepDive />}
        {activeSection === 3 && <SrsPseudocode />}
        {activeSection === 4 && <GamificationPsychology />}
        {activeSection === 5 && <GlobalDatabaseScaling />}
      </div>
    </div>
  );
};
