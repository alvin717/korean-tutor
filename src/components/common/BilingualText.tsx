import React from 'react';

interface BilingualTextProps {
  ko: string;
  en: string;
  className?: string;
  koClassName?: string;
  enClassName?: string;
  badge?: boolean;
}

/**
 * Renders Korean text by default, and seamlessly cross-fades to English on hover.
 * Uses a zero-shift CSS grid overlay (col-start-1 row-start-1) so that the container
 * maintains a rock-solid, constant width and height (max of Korean and English),
 * completely preventing layout shifting, boundary jitter, and flickering ("막 떠는 현상 방지").
 */
export const BilingualText: React.FC<BilingualTextProps> = ({
  ko,
  en,
  className = '',
  koClassName = '',
  enClassName = '',
  badge = false,
}) => {
  return (
    <span
      className={`inline-grid grid-cols-1 grid-rows-1 items-center justify-items-center group/bilingual cursor-pointer transition-colors ${className}`}
      title={`${ko} → ${en}`}
    >
      {/* Korean text shown by default */}
      <span
        className={`col-start-1 row-start-1 transition-opacity duration-200 group-hover:opacity-0 group-hover/bilingual:opacity-0 group-hover/title:opacity-0 pointer-events-none select-none whitespace-nowrap ${koClassName}`}
      >
        {ko}
      </span>

      {/* English translation shown on mouse hover */}
      <span
        className={`col-start-1 row-start-1 transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-hover/bilingual:opacity-100 group-hover/title:opacity-100 pointer-events-none select-none inline-flex items-center justify-center gap-1 whitespace-nowrap ${
          enClassName || 'font-semibold text-emerald-600'
        }`}
      >
        {en}
        {badge && (
          <span className="text-[9px] px-1 py-0.2 bg-emerald-100 text-emerald-700 rounded font-bold uppercase tracking-wider">
            EN
          </span>
        )}
      </span>
    </span>
  );
};
