import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CardPreview } from './CardPreview';
import { WizardState, Side, ActiveSheet } from '../types/wizard';

interface Step2PersonalizeProps {
  state: WizardState;
  onBack: () => void;
  onNext: () => void;
  onSetSide: (side: Side) => void;
  onOpenSheet: (sheet: ActiveSheet) => void;
  onZoomBinnen: (side: 'links' | 'rechts' | null) => void;
  onOpenLockDialog: () => void;
}

export const Step2Personalize: React.FC<Step2PersonalizeProps> = ({
  state: s,
  onBack,
  onNext,
  onSetSide,
  onOpenSheet,
  onZoomBinnen,
  onOpenLockDialog
}) => {
  const isGevouwen = s.formaat === 'gevouwen';

  return (
    <div className="flex flex-col min-h-full pb-28">
      {/* Top Bar */}
      <div className="px-5 pt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label="Terug naar Stap 1"
          className="flex items-center gap-2 bg-transparent border-none py-1.5 text-[#1a1a1e] font-medium text-[0.9375rem] cursor-pointer hover:opacity-75 transition-opacity"
        >
          <ArrowLeft size={18} />
          <span>Stap 2 van 3</span>
        </button>

        <button
          type="button"
          onClick={onOpenLockDialog}
          className={`px-4 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
            s.locked
              ? 'bg-[#f0f1f4] text-[#1a1a1e] font-bold tracking-wide'
              : 'border border-[rgba(45,45,58,0.14)] text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.04)]'
          }`}
        >
          {s.locked ? 'Vastgezet' : 'Vastzetten'}
        </button>
      </div>

      {/* Segmented Side Tabs */}
      <div className="flex justify-center mt-4 px-5">
        <div className="inline-flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1 w-full max-w-[340px]">
          <button
            type="button"
            onClick={() => {
              onSetSide('voor');
              onZoomBinnen(null);
            }}
            className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
              s.side === 'voor'
                ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
            }`}
          >
            Voorkant
          </button>

          {isGevouwen && (
            <button
              type="button"
              onClick={() => {
                onSetSide('binnen');
                onZoomBinnen(null);
              }}
              className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                s.side === 'binnen'
                  ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                  : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
              }`}
            >
              Binnenzijde
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onSetSide('achter');
              onZoomBinnen(null);
            }}
            className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
              s.side === 'achter'
                ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
            }`}
          >
            Achterkant
          </button>
        </div>
      </div>

      {/* Inside Zoom Back Button (when zoomed into left or right inside page) */}
      {s.side === 'binnen' && s.binnenZoom && (
        <div className="px-6 pt-3">
          <button
            type="button"
            onClick={() => onZoomBinnen(null)}
            className="flex items-center gap-1.5 text-[0.8125rem] font-medium text-[#6b6b7a] hover:text-[#1a1a1e] py-1 cursor-pointer transition-colors"
          >
            <ArrowLeft size={15} />
            <span>Beide pagina's</span>
          </button>
        </div>
      )}

      {/* Card Canvas */}
      <div className="px-6 pt-5">
        <CardPreview
          state={s}
          interactive={true}
          onOpenSheet={onOpenSheet}
          onZoomBinnen={onZoomBinnen}
        />
      </div>

      {/* Subtitle / Hint */}
      <div className="px-6 pt-3.5 text-center">
        <span className="text-[0.8125rem] text-[#6b6b7a]">
          {s.side === 'binnen' && !s.binnenZoom
            ? 'Tik op een pagina om die te bewerken.'
            : 'Precies zoals u het hier ziet, komt de kaart ook gedrukt uit.'}
        </span>
      </div>

      {/* Action Buttons for Customization */}
      <div className="px-6 pt-4 pb-2">
        {s.side === 'voor' && (
          <div className="flex gap-2.5">
            <button
              type="button"
              disabled={s.locked}
              onClick={() => onOpenSheet('stijl')}
              className={`flex-1 h-[52px] rounded-[999px] bg-[#ffffff] border border-[rgba(45,45,58,0.14)] text-[0.9375rem] font-medium text-[#1a1a1e] transition-all ${
                s.locked
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-[#f0f1f4] active:scale-[0.99] cursor-pointer shadow-sm'
              }`}
            >
              Stijl
            </button>
            <button
              type="button"
              disabled={s.locked}
              onClick={() => onOpenSheet('thema')}
              className={`flex-1 h-[52px] rounded-[999px] bg-[#ffffff] border border-[rgba(45,45,58,0.14)] text-[0.9375rem] font-medium text-[#1a1a1e] transition-all ${
                s.locked
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-[#f0f1f4] active:scale-[0.99] cursor-pointer shadow-sm'
              }`}
            >
              Thema &amp; sfeer
            </button>
          </div>
        )}

        {s.side === 'binnen' && s.binnenZoom && (
          <div className="flex gap-2.5">
            {s.binnenZoom === 'links' ? (
              <button
                type="button"
                disabled={s.locked}
                onClick={() => onOpenSheet('binnen')}
                className={`flex-1 h-[52px] rounded-[999px] bg-[#ffffff] border border-[rgba(45,45,58,0.14)] text-[0.9375rem] font-medium text-[#1a1a1e] transition-all ${
                  s.locked
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#f0f1f4] active:scale-[0.99] cursor-pointer shadow-sm'
                }`}
              >
                Tekst
              </button>
            ) : (
              <button
                type="button"
                disabled={s.locked}
                onClick={() => onOpenSheet('praktisch')}
                className={`flex-1 h-[52px] rounded-[999px] bg-[#ffffff] border border-[rgba(45,45,58,0.14)] text-[0.9375rem] font-medium text-[#1a1a1e] transition-all ${
                  s.locked
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:bg-[#f0f1f4] active:scale-[0.99] cursor-pointer shadow-sm'
                }`}
              >
                Praktische informatie
              </button>
            )}
          </div>
        )}

        {s.side === 'achter' && (
          <div className="flex gap-2.5">
            <button
              type="button"
              disabled={s.locked}
              onClick={() => onOpenSheet('familie')}
              className={`flex-1 h-[52px] rounded-[999px] bg-[#ffffff] border border-[rgba(45,45,58,0.14)] text-[0.9375rem] font-medium text-[#1a1a1e] transition-all ${
                s.locked
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:bg-[#f0f1f4] active:scale-[0.99] cursor-pointer shadow-sm'
              }`}
            >
              Namen
            </button>
          </div>
        )}

        {s.locked && (
          <p className="text-[0.8125rem] text-[#6b6b7a] mt-3 text-center">
            De uitvaartbegeleider heeft het ontwerp vastgezet. U kunt de woorden nog altijd aanpassen.
          </p>
        )}
      </div>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#fcfcfd]/90 backdrop-blur-md border-t border-[rgba(45,45,58,0.06)] px-6 py-4 pb-8 z-30">
        <button
          type="button"
          onClick={onNext}
          className="w-full h-[52px] rounded-[999px] bg-[#1a1a1e] text-[#fcfcfd] font-medium text-[1rem] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-lg flex items-center justify-center"
        >
          Naar overzicht
        </button>
      </div>
    </div>
  );
};
