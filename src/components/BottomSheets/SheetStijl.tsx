import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import {
  Uitstraling,
  Uitlijning,
  SpreukPositie,
  SfeerZinPositie,
  FontPairingId,
  Indeling
} from '../../types/wizard';
import { PAIRINGS } from '../../constants/wizard';

interface SheetStijlProps {
  naam: string;
  uitstraling: Uitstraling;
  uitlijning: Uitlijning;
  spreukPositie: SpreukPositie;
  sfeerZinPositie: SfeerZinPositie;
  fontPairing: FontPairingId;
  indeling: Indeling;
  onChangeUitstraling: (val: Uitstraling) => void;
  onChangeUitlijning: (val: Uitlijning) => void;
  onChangeSpreukPositie: (val: SpreukPositie) => void;
  onChangeSfeerZinPositie: (val: SfeerZinPositie) => void;
  onChangeFontPairing: (val: FontPairingId) => void;
}

export const SheetStijl: React.FC<SheetStijlProps> = ({
  naam,
  uitstraling,
  uitlijning,
  spreukPositie,
  sfeerZinPositie,
  fontPairing,
  indeling,
  onChangeUitstraling,
  onChangeUitlijning,
  onChangeSpreukPositie,
  onChangeSfeerZinPositie,
  onChangeFontPairing
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedPairing = PAIRINGS.find((p) => p.id === fontPairing) || PAIRINGS[0];
  const displayName = naam.trim() || 'Voornaam Achternaam';

  return (
    <div className="flex flex-col gap-7">
      {/* Tekstvolgorde / Positie (Spreuk & Naam cluster) */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Tekstvolgorde
        </label>
        <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
          <button
            type="button"
            onClick={() => onChangeSpreukPositie('boven')}
            className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
              spreukPositie === 'boven'
                ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
            }`}
          >
            Spreuk boven, naam onder
          </button>
          <button
            type="button"
            onClick={() => onChangeSpreukPositie('onder')}
            className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
              spreukPositie === 'onder'
                ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
            }`}
          >
            Naam boven, spreuk onder
          </button>
        </div>
      </div>

      {/* Uitstraling */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Uitstraling
        </label>
        <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
          {(
            [
              { id: 'automatisch', label: 'Automatisch' },
              { id: 'donker', label: 'Donker' },
              { id: 'licht', label: 'Licht' }
            ] as { id: Uitstraling; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeUitstraling(item.id)}
              className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                uitstraling === item.id
                  ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                  : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Uitlijning */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Uitlijning
        </label>
        <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
          {(
            [
              { id: 'links', label: 'Links' },
              { id: 'gecentreerd', label: 'Gecentreerd' },
              { id: 'rechts', label: 'Rechts' }
            ] as { id: Uitlijning; label: string }[]
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeUitlijning(item.id)}
              className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                uitlijning === item.id
                  ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                  : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plaats van het zinnetje (if sfeer-voorop) */}
      {indeling === 'sfeer-voorop' && (
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
            Plaats van het zinnetje
          </label>
          <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
            {(
              [
                { id: 'boven', label: 'Boven' },
                { id: 'tussenin', label: 'Tussenin' },
                { id: 'midden', label: 'Midden' }
              ] as { id: SfeerZinPositie; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeSfeerZinPositie(item.id)}
                className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                  sfeerZinPositie === item.id
                    ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                    : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lettertype selectie (Font Pairing: Headline + Paired Body) */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Typografie &amp; Font Combinatie
        </label>
        <div className="relative">
          {/* Active selection preview trigger */}
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full p-4 rounded-[1.5rem] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] flex items-center justify-between text-left transition-all cursor-pointer hover:border-[rgba(45,45,58,0.25)]"
          >
            <div className="flex flex-col gap-0.5">
              <span
                className="text-[1.25rem] text-[#1a1a1e] leading-snug"
                style={{
                  fontFamily: selectedPairing.naamFamily,
                  fontWeight: selectedPairing.naamWeight,
                  fontStyle: selectedPairing.naamStyle || 'normal',
                  textTransform: selectedPairing.naamTransform || 'none',
                  letterSpacing: selectedPairing.naamTracking || 'normal'
                }}
              >
                {displayName}
              </span>
              <span
                className="text-[0.875rem] text-[#4a4a58] italic"
                style={{
                  fontFamily: selectedPairing.spreukFamily || selectedPairing.dataFamily
                }}
              >
                "{selectedPairing.sampleText}"
              </span>
              <span className="text-[0.6875rem] text-[#6b6b7a] font-medium uppercase tracking-wider mt-1">
                {selectedPairing.label} • {selectedPairing.pairingDescription}
              </span>
            </div>
            <ChevronDown
              size={18}
              className={`text-[#6b6b7a] shrink-0 ml-2 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Expanded font pairing list */}
          {dropdownOpen && (
            <div className="flex flex-col gap-2.5 mt-2.5 max-h-[340px] overflow-y-auto pr-1">
              {PAIRINGS.map((p) => {
                const isSelected = fontPairing === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onChangeFontPairing(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex flex-col p-4 rounded-[1.5rem] text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-2 border-[#2d2d3a] bg-[rgba(45,45,58,0.04)] shadow-sm'
                        : 'border border-[rgba(45,45,58,0.12)] bg-[#ffffff] hover:bg-[#f0f1f4]'
                    }`}
                  >
                    {/* 1. Headline (Person's dynamic name) */}
                    <div className="flex items-baseline justify-between w-full">
                      <span
                        className="text-[1.3rem] text-[#1a1a1e] leading-snug"
                        style={{
                          fontFamily: p.naamFamily,
                          fontWeight: p.naamWeight,
                          fontStyle: p.naamStyle || 'normal',
                          textTransform: p.naamTransform || 'none',
                          letterSpacing: p.naamTracking || 'normal'
                        }}
                      >
                        {displayName}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-[#2d2d3a] text-white flex items-center justify-center shrink-0 ml-2">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>

                    {/* 2. Body / Spreuk sample in paired font */}
                    <span
                      className="text-[0.875rem] text-[#4a4a58] mt-1 italic leading-relaxed"
                      style={{
                        fontFamily: p.spreukFamily || p.dataFamily,
                        fontWeight: p.spreukWeight || 400,
                        fontStyle: p.spreukStyle || 'italic'
                      }}
                    >
                      "{p.sampleText}"
                    </span>

                    {/* 3. Description & Font names */}
                    <span className="text-[0.6875rem] text-[#6b6b7a] font-medium uppercase tracking-wider mt-1.5 pt-1.5 border-t border-[rgba(45,45,58,0.08)]">
                      {p.label} • {p.pairingDescription}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
