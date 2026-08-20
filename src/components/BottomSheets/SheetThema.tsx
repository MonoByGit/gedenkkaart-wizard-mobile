import React from 'react';
import { Check } from 'lucide-react';
import { OrnamentId } from '../../types/wizard';
import { THEMES, ORNAMENTS } from '../../constants/wizard';

interface SheetThemaProps {
  selectedThema: string | null;
  selectedOrnament: OrnamentId;
  onChangeThema: (id: string) => void;
  onChangeOrnament: (id: OrnamentId) => void;
}

export const SheetThema: React.FC<SheetThemaProps> = ({
  selectedThema,
  selectedOrnament,
  onChangeThema,
  onChangeOrnament
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Thema Grid */}
      <div>
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block mb-3">
          Thema en sfeer
        </label>
        <div className="grid grid-cols-2 gap-3">
          {THEMES.map((t) => {
            const isSelected = selectedThema === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChangeThema(t.id)}
                className={`flex flex-col rounded-[1.5rem] bg-[#ffffff] overflow-hidden text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#2d2d3a] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.1)]'
                    : 'border border-[rgba(45,45,58,0.1)] hover:border-[rgba(45,45,58,0.25)]'
                }`}
              >
                <div
                  className="relative w-full aspect-[4/3] rounded-t-[1.35rem]"
                  style={{ background: t.bg }}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#2d2d3a] text-[#ffffff] flex items-center justify-center shadow-md">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <span className="text-[0.9375rem] font-medium text-[#1a1a1e] block">
                    {t.naam}
                  </span>
                  <span className="text-[0.75rem] text-[#6b6b7a] block leading-snug mt-0.5">
                    {t.mood}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ornamenten */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Ornament
        </label>
        <p className="text-[0.875rem] text-[#6b6b7a] -mt-1 mb-1">
          Lichte versiering, nooit over het portret.
        </p>
        <div className="flex flex-col gap-2">
          {ORNAMENTS.map((o) => {
            const isSelected = selectedOrnament === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => onChangeOrnament(o.id)}
                className={`flex items-center justify-between p-4 rounded-[1.5rem] bg-[#ffffff] text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border border-[#2d2d3a] bg-[rgba(45,45,58,0.02)]'
                    : 'border border-[rgba(45,45,58,0.1)] hover:bg-[#f0f1f4]'
                }`}
              >
                <div>
                  <span className="text-[0.9375rem] font-medium text-[#1a1a1e] block">
                    {o.label}
                  </span>
                  <span className="text-[0.8125rem] text-[#6b6b7a] block mt-0.5">
                    {o.hint}
                  </span>
                </div>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-[#2d2d3a] text-[#ffffff] flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
