import { Check, Home } from 'lucide-react';
import { CardPreview } from './CardPreview';
import { WizardState, Formaat, Smaak, Indeling } from '../types/wizard';
import { THEMES } from '../constants/wizard';

interface Step1ThreeChoicesProps {
  state: WizardState;
  onSetFormaat: (f: Formaat) => void;
  onSetSmaak: (s: Smaak) => void;
  onSetIndeling: (i: Indeling) => void;
  onSetThema: (t: string) => void;
  onOpenLightbox: () => void;
  onNext: () => void;
  onGoHome: () => void;
}

export const Step1ThreeChoices: React.FC<Step1ThreeChoicesProps> = ({
  state: s,
  onSetFormaat,
  onSetSmaak,
  onSetIndeling,
  onSetThema,
  onOpenLightbox,
  onNext,
  onGoHome
}) => {
  const isEnkel = s.formaat === 'enkel';
  const isGevouwen = s.formaat === 'gevouwen';
  const isVolledigeFoto = s.smaak === 'volledige-foto';
  const isVrijgezet = s.smaak === 'vrijgezet';
  const themaChosen = !!s.thema;

  const formaatHint = isEnkel
    ? 'Eén kaart, voorkant en achterkant.'
    : 'Kaart met een binnenzijde erbij.';
  const smaakHint = isVolledigeFoto
    ? 'Het beeld van de plechtigheid, persoon en achtergrond als één geheel.'
    : 'Wij zetten het portret vrij en plaatsen het op een van onze themabeelden.';
  const indelingHints: Record<Indeling, string> = {
    volledig: 'De foto vult de hele kaart.',
    kader: 'De foto staat in een kader, met de tekst erna.',
    'naast-tekst': 'Foto en tekst naast elkaar.',
    'sfeer-voorop': 'Het themabeeld vult de voorkant, het portret komt binnenin.'
  };

  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header section */}
      <div className="px-6 pt-6 pb-1">
        <div className="flex items-center justify-between mb-1">
          <button
            type="button"
            onClick={onGoHome}
            className="flex items-center gap-1.5 text-[0.8125rem] text-[#6b6b7a] hover:text-[#1a1a1e] font-medium py-1 transition-colors cursor-pointer"
          >
            <Home size={15} />
            <span>Overzicht</span>
          </button>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
            Stap 1 van 3
          </span>
        </div>
        <h1 className="mt-2 text-[1.75rem] font-bold tracking-[-0.01em] text-[#1a1a1e] leading-[1.2]">
          Drie keuzes, dan staat de kaart
        </h1>
        <p className="mt-2.5 text-[1rem] text-[#6b6b7a] leading-relaxed max-w-[34ch]">
          Formaat, foto en thema. Wat u daarna schrijft, doet u zo op de kaart zelf.
        </p>
      </div>

      {/* Live Mini Preview */}
      <div className="px-6 pt-6 flex justify-center">
        <button
          type="button"
          onClick={onOpenLightbox}
          aria-label="Kaart groter bekijken"
          className="w-[48%] max-w-[210px] transition-transform active:scale-[0.98] cursor-pointer"
        >
          <CardPreview state={s} interactive={false} isMini={true} />
        </button>
      </div>

      {/* 1. Formaat */}
      <div className="px-6 pt-8 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block">
          Formaat
        </span>
        <div className="flex gap-7 mt-3.5">
          {/* Enkel */}
          <button
            type="button"
            onClick={() => onSetFormaat('enkel')}
            className="flex flex-col items-center gap-2 p-1.5 bg-transparent border-none cursor-pointer group"
          >
            <div className="w-[26px] h-[36px] rounded-[3px] border-[1.5px] border-[#6b6b7a] group-hover:border-[#1a1a1e] transition-colors" />
            <span className="text-[0.875rem] font-medium text-[#1a1a1e]">Enkel</span>
            <div
              className={`w-[18px] h-[2px] rounded-full transition-all ${
                isEnkel ? 'bg-[#1a1a1e]' : 'bg-transparent'
              }`}
            />
          </button>

          {/* Gevouwen */}
          <button
            type="button"
            onClick={() => onSetFormaat('gevouwen')}
            className="flex flex-col items-center gap-2 p-1.5 bg-transparent border-none cursor-pointer group"
          >
            <div className="flex gap-[3px]">
              <div className="w-[13px] h-[36px] rounded-l-[3px] border-[1.5px] border-[#6b6b7a] border-r-0 group-hover:border-[#1a1a1e] transition-colors" />
              <div className="w-[13px] h-[36px] rounded-r-[3px] border-[1.5px] border-[#6b6b7a] border-l-0 group-hover:border-[#1a1a1e] transition-colors" />
            </div>
            <span className="text-[0.875rem] font-medium text-[#1a1a1e]">Gevouwen</span>
            <div
              className={`w-[18px] h-[2px] rounded-full transition-all ${
                isGevouwen ? 'bg-[#1a1a1e]' : 'bg-transparent'
              }`}
            />
          </button>
        </div>
        <p className="text-[0.8125rem] text-[#6b6b7a] mt-3">{formaatHint}</p>
      </div>

      {/* 2. De Foto */}
      <div className="px-6 pt-7 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block">
          De foto
        </span>
        <div className="flex gap-3.5 mt-3.5">
          {/* Volledige foto */}
          <button
            type="button"
            onClick={() => onSetSmaak('volledige-foto')}
            className="flex-1 text-center bg-transparent border-none p-0 cursor-pointer"
          >
            <div
              className={`relative w-full aspect-[3/4] rounded-[1.25rem] overflow-hidden bg-[#f0f1f4] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)] box-border transition-all ${
                isVolledigeFoto
                  ? 'border-2 border-[#2d2d3a] ring-2 ring-[rgba(45,45,58,0.15)]'
                  : 'border-2 border-transparent'
              }`}
            >
              <img
                src={s.photoVolledigUrl || "/assets/persons/Nana_After_Portrait.jpg"}
                alt="Volledige foto"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <span className="block mt-2 text-[0.8125rem] font-medium text-[#1a1a1e]">
              Volledige foto
            </span>
          </button>

          {/* Vrijgezet op thema */}
          <button
            type="button"
            onClick={() => onSetSmaak('vrijgezet')}
            className="flex-1 text-center bg-transparent border-none p-0 cursor-pointer"
          >
            <div
              className={`relative w-full aspect-[3/4] rounded-[1.25rem] overflow-hidden shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)] checkerboard-pattern box-border transition-all ${
                isVrijgezet
                  ? 'border-2 border-[#2d2d3a] ring-2 ring-[rgba(45,45,58,0.15)]'
                  : 'border-2 border-transparent'
              }`}
            >
              <img
                src={s.photoCutoutUrl || "/assets/persons/Nana_After_Portrait_cutout.png"}
                alt="Vrijgezet op thema"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
            <span className="block mt-2 text-[0.8125rem] font-medium text-[#1a1a1e]">
              Vrijgezet op thema
            </span>
          </button>
        </div>
        <p className="text-[0.8125rem] text-[#6b6b7a] mt-3">{smaakHint}</p>
      </div>

      {/* 3. Indeling */}
      <div className="px-6 pt-7 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block">
          Indeling
        </span>
        <div className="flex gap-6 mt-3.5 flex-wrap">
          {/* Volledig */}
          <button
            type="button"
            onClick={() => onSetIndeling('volledig')}
            className="flex flex-col items-center gap-2 p-1.5 bg-transparent border-none cursor-pointer"
          >
            <div className="flex items-center justify-center h-[36px]">
              <div className="relative box-border w-[26px] h-[36px] rounded-[3px] border-[1.5px] border-[#6b6b7a]">
                <div className="absolute left-[5px] right-[5px] bottom-[8px] h-[1.5px] bg-[#6b6b7a]" />
              </div>
            </div>
            <span className="text-[0.875rem] font-medium text-[#1a1a1e]">Volledig</span>
            <div
              className={`w-[18px] h-[2px] rounded-full transition-all ${
                s.indeling === 'volledig' ? 'bg-[#1a1a1e]' : 'bg-transparent'
              }`}
            />
          </button>

          {/* In kader */}
          <button
            type="button"
            onClick={() => onSetIndeling('kader')}
            className="flex flex-col items-center gap-2 p-1.5 bg-transparent border-none cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center gap-1.5 h-[36px]">
              <div className="w-[22px] h-[16px] rounded-[2px] border-[1.5px] border-[#6b6b7a]" />
              <div className="w-[14px] h-[1.5px] bg-[#6b6b7a]" />
            </div>
            <span className="text-[0.875rem] font-medium text-[#1a1a1e]">In kader</span>
            <div
              className={`w-[18px] h-[2px] rounded-full transition-all ${
                s.indeling === 'kader' ? 'bg-[#1a1a1e]' : 'bg-transparent'
              }`}
            />
          </button>

          {/* Naast tekst */}
          <button
            type="button"
            onClick={() => onSetIndeling('naast-tekst')}
            className="flex flex-col items-center gap-2 p-1.5 bg-transparent border-none cursor-pointer"
          >
            <div className="flex items-center gap-[5px] h-[36px]">
              <div className="w-[9px] h-[32px] rounded-[2px] border-[1.5px] border-[#6b6b7a]" />
              <div className="flex flex-col gap-[5px]">
                <div className="w-[14px] h-[1.5px] bg-[#6b6b7a]" />
                <div className="w-[14px] h-[1.5px] bg-[#6b6b7a]" />
                <div className="w-[9px] h-[1.5px] bg-[#6b6b7a]" />
              </div>
            </div>
            <span className="text-[0.875rem] font-medium text-[#1a1a1e]">Naast tekst</span>
            <div
              className={`w-[18px] h-[2px] rounded-full transition-all ${
                s.indeling === 'naast-tekst' ? 'bg-[#1a1a1e]' : 'bg-transparent'
              }`}
            />
          </button>

          {/* Sfeer voorop (alleen bij gevouwen) */}
          {isGevouwen && (
            <button
              type="button"
              onClick={() => onSetIndeling('sfeer-voorop')}
              className="flex flex-col items-center gap-2 p-1.5 bg-transparent border-none cursor-pointer"
            >
              <div className="relative w-[26px] h-[36px] rounded-[3px] border-[1.5px] border-dashed border-[#6b6b7a]">
                <div className="absolute left-[5px] right-[5px] bottom-[8px] h-[1.5px] bg-[#6b6b7a]" />
              </div>
              <span className="text-[0.875rem] font-medium text-[#1a1a1e]">Sfeer voorop</span>
              <div
                className={`w-[18px] h-[2px] rounded-full transition-all ${
                  s.indeling === 'sfeer-voorop' ? 'bg-[#1a1a1e]' : 'bg-transparent'
                }`}
              />
            </button>
          )}
        </div>
        <p className="text-[0.8125rem] text-[#6b6b7a] mt-3">{indelingHints[s.indeling]}</p>
      </div>

      {/* 4. Thema */}
      <div className="px-6 pt-7 pb-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block">
          Thema
        </span>
        <p className="mt-1 text-[0.9375rem] text-[#6b6b7a]">
          Het thema bepaalt het beeld op de hele kaart.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-3.5">
          {THEMES.map((t) => {
            const isSelected = s.thema === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSetThema(t.id)}
                className={`flex flex-col rounded-[1.5rem] bg-[#ffffff] overflow-hidden text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#2d2d3a] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.12)] ring-2 ring-[rgba(45,45,58,0.15)]'
                    : 'border-2 border-transparent hover:border-[rgba(45,45,58,0.2)]'
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

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#fcfcfd]/90 backdrop-blur-md border-t border-[rgba(45,45,58,0.06)] px-6 py-4 pb-8 z-30">
        {!themaChosen && (
          <span className="text-[0.8125rem] text-[#6b6b7a] block mb-2 text-center">
            Kies eerst een thema.
          </span>
        )}
        <button
          type="button"
          disabled={!themaChosen}
          onClick={onNext}
          className={`w-full h-[52px] rounded-[999px] font-medium text-[1rem] transition-all flex items-center justify-center ${
            themaChosen
              ? 'bg-[#1a1a1e] text-[#fcfcfd] hover:opacity-90 active:scale-[0.99] cursor-pointer shadow-lg'
              : 'bg-[rgba(45,45,58,0.08)] text-[#6b6b7a] opacity-50 cursor-not-allowed'
          }`}
        >
          Naar de kaart
        </button>
      </div>
    </div>
  );
};
