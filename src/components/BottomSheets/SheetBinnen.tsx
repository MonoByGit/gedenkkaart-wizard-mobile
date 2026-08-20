import React from 'react';
import { SizeOption } from '../../types/wizard';
import { MAX_BINNEN } from '../../constants/wizard';

interface SheetBinnenProps {
  binnenTekst: string;
  afsluitingTekst: string;
  size: SizeOption;
  indeling?: string;
  spreuk?: string;
  onChangeBinnenTekst: (val: string) => void;
  onChangeAfsluitingTekst: (val: string) => void;
  onChangeSize: (size: SizeOption) => void;
}

export const SheetBinnen: React.FC<SheetBinnenProps> = ({
  binnenTekst,
  afsluitingTekst,
  size,
  indeling,
  spreuk,
  onChangeBinnenTekst,
  onChangeAfsluitingTekst,
  onChangeSize
}) => {
  const max = MAX_BINNEN[size];
  const charsLeft = Math.max(0, max - binnenTekst.length);
  const isSfeerVoorop = indeling === 'sfeer-voorop';

  return (
    <div className="flex flex-col gap-6">
      {/* Contextual notice for sfeer-voorop */}
      {isSfeerVoorop && (
        <div className="p-4 rounded-[1.25rem] bg-[rgba(45,45,58,0.04)] border border-[rgba(45,45,58,0.1)] flex flex-col gap-1 text-[0.8125rem]">
          <span className="font-semibold text-[#1a1a1e]">
            ✨ Paginagroot portret aan de binnenzijde
          </span>
          <span className="text-[#6b6b7a] leading-relaxed">
            Bij 'Sfeer voorop' staat uw hoofdspreuk op de voorpagina. De linkerpagina toont het portret van de overledene paginagroot. Hieronder kunt u eventueel een kort onderschrift of gedicht toevoegen dat onderaan het portret wordt getoond.
          </span>
        </div>
      )}

      {/* Binnenzijde Textarea */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          {isSfeerVoorop ? 'Onderschrift / Tekst bij portret' : 'Tekst voor de binnenzijde'}
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
