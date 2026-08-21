import React, { useState, useEffect } from 'react';
import { ArrowLeft, Home, Bookmark, Maximize2 } from 'lucide-react';
import { CardPreview } from './CardPreview';
import { RightCategoryDock } from './RightCategoryDock';
import { BottomOptionCarousel } from './BottomOptionCarousel';
import { WizardState, Side, ActiveSheet, ActiveDockCategory } from '../types/wizard';

interface Step2PersonalizeProps {
  state: WizardState;
  onBack: () => void;
  onNext: () => void;
  onGoHome: () => void;
  onSaveCreation: () => void;
  onSetSide: (side: Side) => void;
  onOpenSheet: (sheet: ActiveSheet) => void;
  onZoomBinnen: (side: 'links' | 'rechts' | null) => void;
  onOpenLockDialog: () => void;
  onOpenLightbox: () => void;
  onUpdateState: (patch: Partial<WizardState>) => void;
}

export const Step2Personalize: React.FC<Step2PersonalizeProps> = ({
  state: s,
  onBack,
  onNext,
  onGoHome,
  onSaveCreation,
  onSetSide,
  onOpenSheet,
  onZoomBinnen,
  onOpenLockDialog,
  onOpenLightbox,
  onUpdateState
}) => {
  const isGevouwen = s.formaat === 'gevouwen';

  // Active Category in Right Dock
  const [activeCategory, setActiveCategory] = useState<ActiveDockCategory>('foto');

  // Reset active category sensibly when changing sides
  useEffect(() => {
    if (s.side === 'voor') {
      setActiveCategory('foto');
    } else if (s.side === 'binnen') {
      setActiveCategory('tekst');
    } else if (s.side === 'achter') {
      setActiveCategory('familie');
    }
  }, [s.side]);

  const handleCategorySelect = (cat: ActiveDockCategory) => {
    setActiveCategory(cat);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-[var(--surface-canvas)]">
      {/* Top Header Bar */}
      <header className="px-4 pt-3 pb-1 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onGoHome}
            aria-label="Naar overzicht"
            className="w-8 h-8 rounded-full bg-[#f0f1f4] flex items-center justify-center text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.1)] transition-colors cursor-pointer"
          >
            <Home size={15} />
          </button>
          <button
            type="button"
            onClick={onBack}
            aria-label="Terug naar Stap 1"
            className="flex items-center gap-1 bg-transparent border-none py-1 text-[#1a1a1e] font-medium text-[0.875rem] cursor-pointer hover:opacity-75 transition-opacity"
          >
            <ArrowLeft size={16} />
            <span>Stap 2 van 3</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSaveCreation}
            className="px-2.5 py-1.5 rounded-[999px] border border-[rgba(45,45,58,0.14)] text-[0.75rem] font-medium text-[#1a1a1e] hover:bg-[#f0f1f4] transition-all cursor-pointer flex items-center gap-1"
          >
            <Bookmark size={12} />
            <span>Opslaan</span>
          </button>

          <button
            type="button"
            onClick={onOpenLockDialog}
            className={`px-3 py-1.5 rounded-[999px] text-[0.75rem] font-medium transition-all cursor-pointer ${
              s.locked
                ? 'bg-[#1a1a1e] text-white font-semibold'
                : 'border border-[rgba(45,45,58,0.14)] text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.04)]'
            }`}
          >
            {s.locked ? 'Vastgezet' : 'Vastzetten'}
          </button>
        </div>
      </header>

      {/* Segmented Side Tabs (Voorkant | Binnenzijde | Achterkant) */}
      <nav aria-label="Kaartzijde selectie" className="flex justify-center mt-1 px-4 z-20">
        <div className="inline-flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1 w-full max-w-[340px] shadow-sm">
          <button
            type="button"
            onClick={() => {
              onSetSide('voor');
              onZoomBinnen(null);
            }}
            className={`flex-1 py-1.5 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
              s.side === 'voor'
                ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_2px_8px_rgba(0,0,0,0.08)] font-semibold'
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
              className={`flex-1 py-1.5 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                s.side === 'binnen'
                  ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_2px_8px_rgba(0,0,0,0.08)] font-semibold'
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
            className={`flex-1 py-1.5 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
              s.side === 'achter'
                ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_2px_8px_rgba(0,0,0,0.08)] font-semibold'
                : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
            }`}
          >
            Achterkant
          </button>
        </div>
      </nav>

      {/* Main Canvas Area: Card Preview (left/center) + Right Category Dock */}
      <main className="flex-1 flex items-center justify-center px-3 sm:px-4 py-3 min-h-[360px] relative">
        <div className="w-full max-w-[390px] flex items-center justify-between gap-3">
          {/* Card Preview with floating expand button */}
          <div className="relative flex-1 flex justify-center">
            {/* Expand / Lightbox Button */}
            <button
              type="button"
              onClick={onOpenLightbox}
              aria-label="Vergroot weergave (Lightbox)"
              className="absolute top-2.5 left-2.5 z-30 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-[11px] font-medium shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Maximize2 size={12} />
              <span>Vergroot</span>
            </button>

            <div
              onClick={onOpenLightbox}
              className="w-full max-w-[260px] sm:max-w-[280px] cursor-zoom-in transition-transform active:scale-[0.99]"
            >
              <CardPreview
                state={s}
                interactive={false}
                onOpenSheet={onOpenSheet}
                onZoomBinnen={onZoomBinnen}
                onCardClick={onOpenLightbox}
              />
            </div>
          </div>

          {/* Vertical Category Dock on the Right */}
          <div className="flex-shrink-0">
            <RightCategoryDock
              side={s.side}
              activeCategory={activeCategory}
              onSelectCategory={handleCategorySelect}
              disabled={s.locked}
            />
          </div>
        </div>
      </main>

      {/* Dynamic Bottom Option Carousel / Mini-Editor */}
      <div className="w-full mt-auto">
        <BottomOptionCarousel
          state={s}
          activeCategory={activeCategory}
          side={s.side}
          onUpdateState={onUpdateState}
          onOpenSheet={onOpenSheet}
        />
      </div>

      {/* Sticky Bottom CTA Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto bg-[#fcfcfd]/95 backdrop-blur-md border-t border-[rgba(45,45,58,0.08)] px-4 py-3 z-30">
        <button
          type="button"
          onClick={onNext}
          className="w-full h-[48px] rounded-[999px] bg-[#1a1a1e] text-[#fcfcfd] font-medium text-[0.9375rem] hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-md flex items-center justify-center"
        >
          Naar overzicht
        </button>
      </footer>
    </div>
  );
};
