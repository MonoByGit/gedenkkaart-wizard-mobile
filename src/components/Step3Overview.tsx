import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CardPreview } from './CardPreview';
import { WizardState, Side } from '../types/wizard';

interface Step3OverviewProps {
  state: WizardState;
  onBack: () => void;
  onConfirm: () => void;
  onSetSide: (side: Side) => void;
  onZoomBinnen: (side: 'links' | 'rechts' | null) => void;
  onOpenLockDialog: () => void;
}

export const Step3Overview: React.FC<Step3OverviewProps> = ({
  state: s,
  onBack,
  onConfirm,
  onSetSide,
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
          aria-label="Terug naar Stap 2"
          className="flex items-center gap-2 bg-transparent border-none py-1.5 text-[#1a1a1e] font-medium text-[0.9375rem] cursor-pointer hover:opacity-75 transition-opacity"
        >
          <ArrowLeft size={18} />
          <span>Stap 3 van 3</span>
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

      {/* Review Titles */}
      <div className="px-6 pt-4 text-center">
        <h1 className="text-[1.5rem] font-bold tracking-[-0.01em] text-[#1a1a1e] leading-tight">
          Klaar voor de drukker
        </h1>
        <p className="mt-2 text-[0.9375rem] text-[#6b6b7a] leading-relaxed max-w-[36ch] mx-auto">
          Controleer voor- en achterkant nog eenmaal. Zo gaat de kaart in productie.
        </p>
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

      {/* Read-only Card Canvas */}
      <div className="px-6 pt-5">
        <CardPreview
          state={s}
          interactive={false}
          onZoomBinnen={onZoomBinnen}
        />
      </div>

      {/* Reassurance text */}
      <div className="px-6 pt-4 text-center">
        <span className="text-[0.8125rem] text-[#6b6b7a]">
          Precies zoals u het hier ziet, komt de kaart ook gedrukt uit.
        </span>
      </div>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#fcfcfd]/90 backdrop-blur-md border-t border-[rgba(45,45,58,0.06)] px-6 py-4 pb-8 z-30">
        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-[52px] rounded-[999px] bg-[#1a1a1e] text-[#fcfcfd] font-bold text-[1rem] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-lg flex items-center justify-center"
        >
          Bevestigen
        </button>
      </div>
    </div>
  );
};
