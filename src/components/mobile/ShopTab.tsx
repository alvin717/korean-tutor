import React from 'react';
import { Sparkles, Snowflake, Heart, Zap, Shield, Gift } from 'lucide-react';
import { UserState } from '../../types';
import { sounds } from '../../utils/audio';
import { BilingualText } from '../common/BilingualText';

interface ShopTabProps {
  userState: UserState;
  onBuyStreakFreeze: () => void;
  onRefillHearts: () => void;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  userState,
  onBuyStreakFreeze,
  onRefillHearts,
}) => {
  return (
    <div className="space-y-6 pb-20">
      {/* Gem Balance Banner */}
      <div className="p-4 bg-gradient-to-r from-cyan-50 via-sky-50 to-white rounded-3xl border border-cyan-200/90 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-700 border border-cyan-200">
            <Sparkles className="w-6 h-6 text-cyan-600" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-semibold block group cursor-pointer">
              <BilingualText ko="보유 보석(Gems)" en="Gem Balance" enClassName="text-cyan-800 font-bold" />
            </span>
            <span className="text-2xl font-black text-cyan-800">{userState.gems} 💎</span>
          </div>
        </div>

        <div className="text-right group cursor-pointer">
          <span className="text-[11px] text-slate-500 block">
            <BilingualText ko="연속 학습 동결권" en="Streak Freeze" enClassName="text-slate-800 font-bold" />
          </span>
          <span className="text-sm font-bold text-sky-700">
            <BilingualText
              ko={`${userState.streakFreezeCount}개 보유`}
              en={`${userState.streakFreezeCount} Owned`}
              enClassName="text-sky-900 font-black"
            />
          </span>
        </div>
      </div>

      {/* Item Shelf */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 group cursor-pointer">
          <BilingualText
            ko="손실 회피 & 파워업 아이템"
            en="Loss Aversion & Power-Ups"
            enClassName="text-cyan-800 font-bold"
          />
        </h3>

        {/* Streak Freeze item */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200">
              <Snowflake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-900 group cursor-pointer">
                  <BilingualText
                    ko="스트릭 동결권 (Streak Freeze)"
                    en="Streak Freeze Protection"
                    enClassName="text-sky-700 font-bold"
                  />
                </h4>
                <span className="text-[10px] px-2 py-0.5 bg-sky-100 text-sky-800 font-bold rounded-full border border-sky-200">
                  <BilingualText ko="인기" en="Popular" enClassName="text-sky-900 font-extrabold" />
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                하루 학습을 쉬어도 연속 학습(Streak) 카운트가 0으로 리셋되지 않도록 방어합니다.
              </p>
            </div>
          </div>

          <button
            disabled={userState.gems < 200 || userState.streakFreezeCount >= 2}
            onClick={() => {
              sounds.playSuccess();
              onBuyStreakFreeze();
            }}
            className="group px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs whitespace-nowrap transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            {userState.streakFreezeCount >= 2 ? (
              <BilingualText ko="최대 보유" en="Max Owned" enClassName="text-slate-500 font-bold" />
            ) : (
              <BilingualText ko="200 💎 구매" en="Buy 200 💎" enClassName="text-white font-black" />
            )}
          </button>
        </div>

        {/* Heart Refill item */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
              <Heart className="w-6 h-6 fill-rose-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group cursor-pointer">
                <BilingualText
                  ko="체력 완전 충전 (Full Hearts)"
                  en="Full Hearts Refill"
                  enClassName="text-rose-700 font-bold"
                />
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                즉시 하트 5개를 가득 채워 오답 페널티 없이 바로 학습을 이어갑니다.
              </p>
            </div>
          </div>

          <button
            disabled={userState.hearts >= userState.maxHearts || userState.gems < 150}
            onClick={() => {
              sounds.playSuccess();
              onRefillHearts();
            }}
            className="group px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs whitespace-nowrap transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            {userState.hearts >= userState.maxHearts ? (
              <BilingualText ko="체력 가득참" en="Hearts Full" enClassName="text-slate-500 font-bold" />
            ) : (
              <BilingualText ko="150 💎 충전" en="Refill 150 💎" enClassName="text-white font-black" />
            )}
          </button>
        </div>

        {/* Double XP Boost */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center border border-amber-200">
              <Zap className="w-6 h-6 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 group cursor-pointer">
                <BilingualText
                  ko="15분 2배 XP 부스트 (Double XP)"
                  en="15m Double XP Boost"
                  enClassName="text-amber-700 font-bold"
                />
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                다음 15분 동안 모든 레슨 완료 경험치가 2배로 지급되어 리그 순위가 급상승합니다.
              </p>
            </div>
          </div>

          <button
            onClick={() => sounds.playTap()}
            className="group px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs whitespace-nowrap transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <BilingualText ko="100 💎 구매" en="Buy 100 💎" enClassName="text-white font-black" />
          </button>
        </div>
      </div>

      {/* Duolingo Super Subscription Teaser */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full group cursor-pointer">
            <BilingualText ko="K-Lingo Plus (구독 모델)" en="K-Lingo Plus (Subscription)" enClassName="text-white font-bold" />
          </span>
          <Shield className="w-5 h-5 text-emerald-200" />
        </div>
        <div>
          <h3 className="text-lg font-black group cursor-pointer">
            <BilingualText
              ko="무제한 하트 & 오프라인 학습 지원"
              en="Unlimited Hearts & Offline Learning"
              enClassName="text-emerald-100 font-black"
            />
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            광고 없이 편안하게, 틀려도 하트 걱정 없는 무제한 학습 모드와 약점 집중 클리닉을 이용하세요.
          </p>
        </div>
        <button
          onClick={() => sounds.playTap()}
          className="group w-full py-3 bg-white text-emerald-800 font-extrabold text-xs rounded-xl shadow hover:bg-emerald-50 transition-colors cursor-pointer"
        >
          <BilingualText ko="2주 무료 체험 시작하기" en="Start 2-Week Free Trial" enClassName="text-emerald-900 font-black" />
        </button>
      </div>
    </div>
  );
};
