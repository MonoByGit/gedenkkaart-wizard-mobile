import React from 'react';
import { SizeOption, SpreukTone, SpreukPositie } from '../../types/wizard';
import { PHRASES, MAX_SPREUK } from '../../constants/wizard';

interface SheetSpreukProps {
  spreuk: string;
  spreukTone: SpreukTone;
  spreukPositie: SpreukPositie;
  size: SizeOption;
  forceBoven?: boolean;
  onChangeSpreuk: (val: string) => void;
  onChangeTone: (tone: SpreukTone) => void;
  onChangePositie: (pos: SpreukPositie) => void;
  onChangeSize: (size: SizeOption) => void;
}

export const SheetSpreuk: React.FC<SheetSpreukProps> = ({
  spreuk,
  spreukTone,
  spreukPositie,
  size,
  forceBoven = false,
  onChangeSpreuk,
  onChangeTone,
  onChangePositie,
  onChangeSize
}) => {
  const max = MAX_SPREUK[size];
  const charsLeft = Math.max(0, max - spreuk.length);

  const toneDefs: { id: SpreukTone; label: string }[] = [
    { id: 'algemeen', label: 'Algemeen' },
    { id: 'ziekte', label: 'Na ziekte' },
    { id: 'onverwacht', label: 'Onverwacht' },
    { id: 'religieus', label: 'Religieus' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Textarea Field */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Spreuk of korte tekst
        </label>
        <textarea
          rows={3}
          value={spreuk}
          maxLength={max}
          onChange={(e) => onChangeSpreuk(e.target.value.slice(0, max))}
          placeholder="Bijvoorbeeld een dichtregel of gedachte"
          className="w-full p-4 rounded-[1.5rem] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all leading-relaxed"
        />
        <span className="text-[0.8125rem] text-[#6b6b7a] text-right">
          {charsLeft} van {max} tekens over
        </span>
      </div>

      {/* Formulering Suggesties */}
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Kies een formulering
        </label>
        {/* Tone Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {toneDefs.map((t) => {
            const isSelected = spreukTone === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onChangeTone(t.id)}
                className={`shrink-0 px-4 py-2 rounded-[999px] text-[0.875rem] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#2d2d3a] text-[#ffffff]'
                    : 'bg-transparent border border-[rgba(45,45,58,0.14)] text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.04)]'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Phrases List */}
        <div className="flex flex-col gap-2 mt-2">
          {(PHRASES[spreukTone] || []).map((phrase, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChangeSpreuk(phrase)}
              className="text-left font-sans text-[0.9375rem] text-[#1a1a1e] bg-[#f0f1f4] hover:bg-[rgba(45,45,58,0.08)] border-none rounded-[1.5rem] p-4 transition-all cursor-pointer leading-snug"
            >
              {phrase}
            </button>
          ))}
        </div>
      </div>

      {/* Plaats van de spreuk (if not forced to top) */}
      {!forceBoven && (
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
            Plaats van de spreuk
          </label>
          <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
            <button
              type="button"
              onClick={() => onChangePositie('boven')}
              className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                spreukPositie === 'boven'
                  ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                  : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
              }`}
            >
              Bovenaan de kaart
            </button>
            <button
              type="button"
              onClick={() => onChangePositie('onder')}
              className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                spreukPositie === 'onder'
                  ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                  : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
              }`}
            >
              Onderaan de kaart
            </button>
          </div>
        </div>
      )}

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
