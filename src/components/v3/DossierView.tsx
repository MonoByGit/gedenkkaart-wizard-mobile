import React, { useState } from 'react';
import { V3State, PersonaId } from '../../types/v3';
import { PERSONAS } from '../../constants/v3data';
import { ArrowLeft, Download, Check, Sparkles, ChevronRight, Share2, Copy, Lock, Unlock, FileText, Image as ImageIcon } from 'lucide-react';

interface DossierViewProps {
  state: V3State;
  onUpdateState: (patch: Partial<V3State>) => void;
  onBack: () => void;
  onStartEditor: (id: PersonaId) => void;
}

export const DossierView: React.FC<DossierViewProps> = ({
  state,
  onUpdateState,
  onBack,
  onStartEditor
}) => {
  const p = PERSONAS[state.persona];
  const edits = state.edits[state.persona] || {};
  const c = { ...p, ...edits };

  const [activePrint, setActivePrint] = useState<'kleur' | 'zwartwit' | 'sepia'>('kleur');
  const [showOriginal, setShowOriginal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<'combo' | 'rouw' | 'bedank'>('combo');
  const [linkCopied, setLinkCopied] = useState(false);

  const priceCalc = selectedOffer === 'combo' ? 129 : selectedOffer === 'rouw' ? 79 : 59;

  return (
    <div className="flex flex-col min-h-screen pb-28 text-[var(--foreground)] bg-[var(--background)]">
      {/* Top Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Uw dossiers</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
            Dossier
          </span>
          <span className="text-[14px] font-bold text-[var(--foreground)]">
            {c.call}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onUpdateState({ toast: 'Dossierlink gekopieerd' })}
          className="w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          aria-label="Deel dossier"
        >
          <Share2 size={14} />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-5 flex flex-col gap-6 pt-2">
        {/* 1. Het Oplevermoment (Foto onthulling) */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]">
              Het portret
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)]">
              {p.deliveredAt}
            </span>
          </div>

          {state.hasPhoto ? (
            <div className="flex flex-col gap-3">
              {/* Fototafel Prints Stage */}
              <div className="relative w-full aspect-[4/3] rounded-3xl bg-[var(--secondary)] border border-[var(--border)] overflow-hidden p-4 flex items-center justify-center shadow-inner">
                {/* Print Cards Stack */}
                <div className="relative w-[180px] aspect-[105/148] rounded-xl overflow-hidden shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
                  <img
                    src={p.photoFull}
                    alt={c.call}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      activePrint === 'zwartwit'
                        ? 'grayscale contrast-110'
                        : activePrint === 'sepia'
                        ? 'sepia contrast-105'
                        : ''
                    } ${showOriginal ? 'blur-xs opacity-80' : ''}`}
                    style={{ objectPosition: p.photoPos }}
                  />

                  {/* Print Tag */}
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider">
                    {activePrint === 'kleur' ? 'Kleur' : activePrint === 'zwartwit' ? 'Zwart-wit' : 'Sepia'}
                  </span>
                </div>
              </div>

              {/* Variant Selectors */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex bg-[var(--secondary)] rounded-full p-1 border border-[var(--border)] gap-1">
                  {[
                    { id: 'kleur' as const, label: 'Kleur' },
                    { id: 'zwartwit' as const, label: 'Zwart-wit' },
                    { id: 'sepia' as const, label: 'Sepia' }
                  ].map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setActivePrint(v.id)}
                      className={`px-3 py-1 rounded-full text-[11.5px] transition-all cursor-pointer ${
                        activePrint === v.id
                          ? 'bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs'
                          : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onUpdateState({ toast: `Portret (${activePrint}) gedownload in hoge resolutie` })}
                  className="px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  <Download size={13} />
                  <span>Downloaden</span>
                </button>
              </div>

              <div className="flex flex-col text-[12px] text-[var(--muted-foreground)] leading-relaxed mt-1">
                <span className="font-semibold text-[var(--foreground)]">{c.name}</span>
                <span>* {c.born} — † {c.died}</span>
              </div>
            </div>
          ) : (
            /* 24-hours Promise Placeholder */
            <div className="p-6 rounded-3xl bg-[var(--secondary)] border border-[var(--border)] flex flex-col gap-2.5 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Wij zijn begonnen
              </span>
              <p className="text-[16px] font-bold text-[var(--foreground)] m-0">
                Zodra wij de foto hebben, staat het portret hier binnen 24 uur.
              </p>
              <span className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">
                U hoeft niets te doen. Wij laten het direct weten zodra het bewerkte portret klaarstaat.
              </span>
              <button
                type="button"
                onClick={() => onUpdateState({ hasPhoto: true, toast: 'Demo: portret geplaatst' })}
                className="mt-3 mx-auto px-4 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[11.5px] font-bold hover:opacity-90 transition-opacity cursor-pointer"
              >
                Simuleer levering portret
              </button>
            </div>
          )}
        </div>

        {/* 2. De Vork (Hoe verder) */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]">
            Hoe verder
          </span>

          <div className="flex flex-col gap-3">
            {/* Vork A: De Kaart Starten */}
            <button
              type="button"
              onClick={() => onStartEditor(state.persona)}
              className="p-4 rounded-3xl bg-linear-to-r from-[var(--secondary)] to-[var(--card)] border border-[var(--border-strong)] flex items-center justify-between gap-3 text-left hover:border-[var(--primary)] transition-all cursor-pointer shadow-sm group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] flex items-center gap-1.5">
                  <Sparkles size={16} className="text-[#c99f6c]" />
                  De kaart starten
                </span>
                <span className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">
                  Open de editor met dit portret en kies formaat, thema en indeling.
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--background)] flex items-center justify-center text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors flex-none">
                <ChevronRight size={16} />
              </div>
            </button>

            {/* Vork B: Alleen Foto Downloaden */}
            <button
              type="button"
              onClick={() => onUpdateState({ toast: 'Alle 3 portretvarianten gedownload als ZIP' })}
              className="p-4 rounded-3xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-between gap-3 text-left hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[14px] font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                  <Download size={15} />
                  Alleen foto's downloaden
                </span>
                <span className="text-[12px] text-[var(--muted-foreground)] leading-relaxed">
                  Voor wie alleen de bewerkte foto nodig heeft voor eigen drukwerk.
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] flex-none">
                <ChevronRight size={16} />
              </div>
            </button>
          </div>
        </div>

        {/* 3. Het Kaartaanbod (Combinatievoordeel) */}
        <div className="p-5 rounded-3xl bg-[var(--secondary)] border border-[var(--border)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
              Kaartaanbod
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              Combinatiebesparing € 9
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'combo' as const, label: 'Rouw + Bedank', price: '€ 129', badge: 'Populairst' },
              { id: 'rouw' as const, label: 'Alleen Rouw', price: '€ 79' },
              { id: 'bedank' as const, label: 'Alleen Bedank', price: '€ 59' }
            ].map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setSelectedOffer(o.id)}
                className={`p-3 rounded-2xl border text-left flex flex-col justify-between gap-1 transition-all cursor-pointer ${
                  selectedOffer === o.id
                    ? 'bg-[var(--background)] border-[var(--primary)] shadow-xs'
                    : 'bg-[var(--background)]/60 border-[var(--border)] text-[var(--muted-foreground)]'
                }`}
              >
                <span className="text-[11px] font-medium text-[var(--foreground)]">{o.label}</span>
                <span className="text-[14px] font-bold text-[var(--foreground)]">{o.price}</span>
              </button>
            ))}
          </div>

          <span className="text-[11.5px] text-[var(--muted-foreground)]">
            Totaal: <strong>€ {priceCalc}</strong>. Gedachtenisprentjes: prijs volgt.
          </span>
        </div>

        {/* 4. De Voorbereiding & Splitmoment */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]">
              Klaar voor de familie
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)]">
              Het splitmoment
            </span>
          </div>

          <div className="p-4 rounded-3xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-4">
            <p className="text-[12.5px] text-[var(--foreground)] leading-relaxed m-0">
              De voorbereiding (naam, data, afscheid) staat klaar. U kunt nu de link delen zodat de familie zelf de woorden kan nalopen.
            </p>

            {/* Lock switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--secondary)]">
              <div className="flex items-center gap-2">
                {state.locked ? <Lock size={16} className="text-[#c99f6c]" /> : <Unlock size={16} />}
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-[var(--foreground)]">
                    Ontwerp vastzetten (lock)
                  </span>
                  <span className="text-[10.5px] text-[var(--muted-foreground)]">
                    {state.locked ? 'Familie past alleen woorden aan' : 'Familie kan ook thema/stijl wijzigen'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onUpdateState({ locked: !state.locked })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  state.locked ? 'bg-[var(--primary)]' : 'bg-[#d4d4d8]'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    state.locked ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Share link button */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setLinkCopied(true);
                  onUpdateState({ toast: 'Familielink gekopieerd naar klembord' });
                  setTimeout(() => setLinkCopied(false), 2400);
                }}
                className="flex-1 py-3 px-4 rounded-full bg-[var(--secondary)] text-[var(--foreground)] text-[12.5px] font-bold flex items-center justify-center gap-2 hover:bg-[var(--muted)] transition-colors cursor-pointer border border-[var(--border)]"
              >
                {linkCopied ? <Check size={15} /> : <Copy size={15} />}
                <span>{linkCopied ? 'Gekopieerd!' : 'Familielink kopiëren'}</span>
              </button>

              <button
                type="button"
                onClick={() => onStartEditor(state.persona)}
                className="flex-1 py-3 px-4 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12.5px] font-bold flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                <span>Naar de editor</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
