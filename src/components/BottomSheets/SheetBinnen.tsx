import React from 'react';
import { SizeOption } from '../../types/wizard';
import { MAX_BINNEN } from '../../constants/wizard';

interface SheetBinnenProps {
  binnenTekst: string;
  afsluitingTekst: string;
  size: SizeOption;
  onChangeBinnenTekst: (val: string) => void;
  onChangeAfsluitingTekst: (val: string) => void;
  onChangeSize: (size: SizeOption) => void;
}

export const SheetBinnen: React.FC<SheetBinnenProps> = ({
  binnenTekst,
  afsluitingTekst,
  size,
  onChangeBinnenTekst,
  onChangeAfsluitingTekst,
  onChangeSize
}) => {
  const max = MAX_BINNEN[size];
  const charsLeft = Math.max(0, max - binnenTekst.length);

  return (
    <div className="flex flex-col gap-8">
      {/* Binnenzijde Textarea */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Tekst voor de binnenzijde
        </label>
        <textarea
          rows={5}
          value={binnenTekst}
          maxLength={max}
          onChange={(e) => onChangeBinnenTekst(e.target.value.slice(0, max))}
          placeholder="Bijvoorbeeld een gedicht, gedachte of dankwoord"
          className="w-full p-4 rounded-[1.5rem] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all leading-relaxed"
        />
        <span className="text-[0.8125rem] text-[#6b6b7a] text-right">
          {charsLeft} van {max} tekens over
        </span>
      </div>

      {/* Afsluiting Input */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Afsluiting
        </label>
        <input
          type="text"
          value={afsluitingTekst}
          onChange={(e) => onChangeAfsluitingTekst(e.target.value)}
          placeholder="Bijvoorbeeld: Uit naam van de familie"
          className="w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all"
        />
      </div>

      {/* Size Pill Group */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Grootte
        </label>
        <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
          {(['klein', 'normaal', 'groot'] as SizeOption[]).map((s) => {
            const isSelected = size === s;
            const labels: Record<SizeOption, string> = { klein: 'Klein', normaal: 'Normaal', groot: 'Groot' };
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChangeSize(s)}
                className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                    : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
                }`}
              >
                {labels[s]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
