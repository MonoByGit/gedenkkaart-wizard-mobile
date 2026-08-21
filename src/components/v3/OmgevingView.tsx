import React, { useState } from 'react';
import { V3State, PersonaId } from '../../types/v3';
import { PERSONAS } from '../../constants/v3data';
import { ChevronRight, ChevronDown, Download, Check, Info, ArrowRight, ShieldCheck } from 'lucide-react';

interface OmgevingViewProps {
  state: V3State;
  onUpdateState: (patch: Partial<V3State>) => void;
  onOpenDossier: (id: PersonaId) => void;
  onOpenEditor: (id: PersonaId) => void;
  onOpenDrukproef: (id: PersonaId) => void;
}

export const OmgevingView: React.FC<OmgevingViewProps> = ({
  state,
  onUpdateState,
  onOpenDossier,
  onOpenEditor,
  onOpenDrukproef
}) => {
  const [activeTab, setActiveTab] = useState<'aanu' | 'open' | 'alles'>('aanu');
  const [selectedCrew, setSelectedCrew] = useState<string>('iedereen');
  const [downloadConfirm, setDownloadConfirm] = useState<string | null>(null);
  const [correctieOpen, setCorrectieOpen] = useState(false);
  const [correctieVal, setCorrectieVal] = useState('14 maart 1940 te Utrecht');
  const [archiefOpen, setArchiefOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  // Filter dossiers based on tab and crew
  const allPersonas = Object.values(PERSONAS);

  const filteredDossiers = allPersonas.filter((p) => {
    if (activeTab === 'aanu' && p.whoStatus !== 'aanu') return false;
    if (activeTab === 'open' && (p.statusKeten === 'afgerond' || p.whoStatus === 'klaar')) return false;
    if (selectedCrew !== 'iedereen' && p.begeleider.toLowerCase() !== selectedCrew.toLowerCase()) return false;
    return true;
  });

  const aanUCount = allPersonas.filter((p) => p.whoStatus === 'aanu').length;
  const openCount = allPersonas.filter((p) => p.statusKeten !== 'afgerond').length;
  const allesCount = allPersonas.length;

  const handleCorrectieSave = () => {
    // Update Greet's born data
    const edits = { ...state.edits };
    edits.greet = { ...edits.greet, born: correctieVal };
    const newLog = [{ text: `Geboortegegevens gecorrigeerd naar "${correctieVal}"`, at: '13:14' }, ...state.log];
    onUpdateState({
      edits,
      log: newLog,
      toast: 'Geboortegegevens aangepast in het dossier'
    });
    setCorrectieOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 text-[var(--foreground)] bg-[var(--background)]">
      {/* Top Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--muted-foreground)]">
            Uitvaartzorg De Vijverhof
          </span>
          <h1 className="text-[22px] font-bold text-[var(--foreground)] tracking-tight">
            Uw dossiers
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setInfoOpen(!infoOpen)}
          aria-label="Over deze omgeving"
          className="w-9 h-9 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
        >
          <Info size={18} />
        </button>
      </div>

      {/* Info popover */}
      {infoOpen && (
        <div className="mx-5 mb-4 p-4 rounded-2xl bg-[var(--glass-nav-bg)] border border-[var(--glass-nav-border)] backdrop-blur-xl shadow-lg flex flex-col gap-2 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Over de omgeving
            </span>
            <button
              type="button"
              onClick={() => setInfoOpen(false)}
              className="text-[11px] font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              Sluiten
            </button>
          </div>
          <p className="text-[13px] leading-relaxed text-[var(--foreground)] m-0">
            Hier beheert u alle lopende uitvaarten. Bij <strong>Aan u</strong> ziet u waar directe actie van u nodig is (zoals drukwerk klaarzetten of een vraag van de familie beantwoorden).
          </p>
        </div>
      )}

      {/* WeergaveStrip (Tabs) */}
      <div className="px-5 py-2">
        <div className="flex gap-1 bg-[var(--secondary)] rounded-full p-1 border border-[var(--border)]">
          <button
            type="button"
            onClick={() => setActiveTab('aanu')}
            className={`flex-1 py-2 px-3 rounded-full text-[12.5px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'aanu'
                ? 'bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse flex-none" />
            <span>Aan u</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-bold">
              {aanUCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('open')}
            className={`flex-1 py-2 px-3 rounded-full text-[12.5px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'open'
                ? 'bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>Open</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
              {openCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('alles')}
            className={`flex-1 py-2 px-3 rounded-full text-[12.5px] font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'alles'
                ? 'bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            <span>Alles</span>
            <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
              {allesCount}
            </span>
          </button>
        </div>
      </div>

      {/* Begeleider Chips (visible on Open & Alles) */}
      {activeTab !== 'aanu' && (
        <div className="px-5 py-2 flex items-center gap-2 overflow-x-auto mem-scroll">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)] mr-1 flex-none">
            Begeleider:
          </span>
          {[
            { id: 'iedereen', label: `Iedereen · ${allesCount}` },
            { id: 'hans', label: 'Hans · 2' },
            { id: 'sanne', label: 'Sanne · 1' }
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCrew(c.id)}
              className={`px-3 py-1 rounded-full text-[11.5px] whitespace-nowrap transition-all cursor-pointer ${
                selectedCrew === c.id
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-xs'
                  : 'bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* Dossier Cards List */}
      <div className="px-5 pt-3 flex flex-col gap-4">
        {filteredDossiers.map((p) => {
          const isAanU = p.whoStatus === 'aanu';
          return (
            <div
              key={p.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col ${
                isAanU
                  ? 'bg-[var(--card)] border-[var(--border-strong)] shadow-md ring-1 ring-[var(--ring)]'
                  : 'bg-[var(--card)] border-[var(--border)] shadow-xs'
              }`}
            >
              {/* Card Header & Main Info */}
              <div
                onClick={() => {
                  if (p.id === 'greet') onOpenDrukproef(p.id);
                  else if (p.id === 'carien') onOpenEditor(p.id);
                  else onOpenDossier(p.id);
                }}
                className="p-4 flex gap-3.5 cursor-pointer hover:bg-[var(--muted)] transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-[46px] h-[60px] rounded-xl overflow-hidden bg-[var(--secondary)] border border-[var(--border)] flex-none relative shadow-xs">
                  {p.hasPortrait ? (
                    <img
                      src={p.photoFull}
                      alt={p.call}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-[16px] text-[var(--muted-foreground)]">
                      {p.call[0]}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[15px] font-bold text-[var(--foreground)] truncate">
                      {p.who}
                    </span>

                    {/* Status Badge */}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-none flex items-center gap-1 ${
                        isAanU
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : p.whoStatus === 'familie'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'
                      }`}
                    >
                      {isAanU && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />}
                      {isAanU ? 'Aan u' : p.whoStatus === 'familie' ? 'Bij familie' : 'Bij ons'}
                    </span>
                  </div>

                  <span className="text-[13px] font-semibold text-[var(--foreground)]">
                    {p.status}
                  </span>
                  <span className="text-[12px] text-[var(--muted-foreground)] truncate mt-0.5">
                    → {p.nextStep}
                  </span>

                  <div className="flex items-center justify-between text-[11px] text-[var(--muted-foreground)] mt-2 pt-2 border-t border-[var(--border)]">
                    <span>{p.lastEvent}</span>
                    <span className="font-medium text-[var(--foreground)]">{p.order}</span>
                  </div>
                </div>
              </div>

              {/* Melding van de familie (Quote box if available) */}
              {p.quote && (
                <div className="mx-4 mb-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col gap-2 text-[12.5px]">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Melding van de familie
                    </span>
                    <span className="text-[11px] opacity-75">{p.quoteTime}</span>
                  </div>
                  <p className="text-[13px] italic text-[var(--foreground)] m-0 leading-relaxed font-serif">
                    "{p.quote}"
                  </p>
                  <div className="flex items-baseline gap-2 pt-1 text-[11.5px]">
                    <span className="text-[var(--muted-foreground)] flex-none">Nu op de kaart:</span>
                    <span className="font-medium line-through text-[var(--muted-foreground)]">
                      {p.cardVal}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="px-4 py-3 bg-[var(--secondary)]/40 border-t border-[var(--border)] flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2 flex-wrap flex-1">
                  {p.id === 'greet' && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCorrectieOpen(true)}
                        className="px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                      >
                        Gegeven corrigeren
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (downloadConfirm === p.id) {
                            onUpdateState({ toast: 'Pakket gedownload (129 MB zip)' });
                            setDownloadConfirm(null);
                          } else {
                            setDownloadConfirm(p.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border-strong)] text-[var(--foreground)] text-[11.5px] font-medium hover:bg-[var(--secondary)] transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Download size={13} />
                        <span>{downloadConfirm === p.id ? 'Bevestig download' : 'Alles downloaden'}</span>
                      </button>
                    </>
                  )}

                  {p.id === 'carien' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onOpenEditor(p.id)}
                        className="px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                      >
                        Meekijken in de kaart
                      </button>

                      <button
                        type="button"
                        onClick={() => onUpdateState({ toast: 'Herinnering verstuurd naar de familie' })}
                        className="px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border-strong)] text-[var(--foreground)] text-[11.5px] font-medium hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                      >
                        Herinnering sturen
                      </button>
                    </>
                  )}

                  {p.id === 'richard' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onOpenDossier(p.id)}
                        className="px-3.5 py-1.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                      >
                        Voorbereiding starten
                      </button>

                      <button
                        type="button"
                        onClick={() => onUpdateState({ hasPhoto: true, toast: 'Portret Richard geplaatst' })}
                        className="px-3 py-1.5 rounded-full bg-[var(--background)] border border-[var(--border-strong)] text-[var(--foreground)] text-[11.5px] font-medium hover:bg-[var(--secondary)] transition-colors cursor-pointer"
                      >
                        Foto uploaden
                      </button>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (p.id === 'greet') onOpenDrukproef(p.id);
                    else if (p.id === 'carien') onOpenEditor(p.id);
                    else onOpenDossier(p.id);
                  }}
                  className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer flex-none"
                  aria-label="Open dossier"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Archief Accordion */}
      <div className="mt-8 px-5">
        <button
          type="button"
          onClick={() => setArchiefOpen(!archiefOpen)}
          className="w-full py-3.5 px-4 rounded-2xl bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-between text-left cursor-pointer hover:bg-[var(--muted)] transition-colors"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
              Archief
            </span>
            <span className="text-[13px] font-semibold text-[var(--foreground)]">
              4 dossiers ouder dan twee maanden
            </span>
          </div>

          <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${archiefOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </button>

        {archiefOpen && (
          <div className="mt-2 p-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-2 animate-fadeIn text-[12.5px]">
            {[
              { name: 'Jan Willem de Boer', date: 'Mei 2026', total: '€ 129', files: '6 bestanden' },
              { name: 'Hester van Schaik', date: 'April 2026', total: '€ 79', files: '4 bestanden' },
              { name: 'Klaas Oosterbeek', date: 'Maart 2026', total: '€ 129', files: '6 bestanden' },
              { name: 'Ingrid Visser-Meijer', date: 'Februari 2026', total: '€ 49', files: '2 bestanden' }
            ].map((a, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-[var(--foreground)]">{a.name}</span>
                  <span className="text-[11px] text-[var(--muted-foreground)]">
                    {a.date} · {a.files}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-[var(--foreground)]">{a.total}</span>
                  <button
                    type="button"
                    onClick={() => onUpdateState({ toast: `Archiefbestand ${a.name} gedownload` })}
                    className="p-1.5 rounded-full hover:bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CorrectieBlad Modal (Bottom sheet) */}
      {correctieOpen && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-[480px] bg-[var(--background)] rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-4 border-t border-[var(--border-strong)] animate-slideUp">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
                  Correctie doorvoeren
                </span>
                <h3 className="text-[18px] font-bold text-[var(--foreground)] m-0">
                  Geboorteplaats en -datum
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCorrectieOpen(false)}
                className="text-[12px] font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                Sluiten
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] text-[var(--muted-foreground)]">
                Wat moet er op de kaart staan?
              </label>
              <input
                type="text"
                value={correctieVal}
                maxLength={34}
                onChange={(e) => setCorrectieVal(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[15px] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
              <span className="text-[11px] text-[var(--muted-foreground)] text-right">
                {correctieVal.length} van 34 tekens
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--secondary)] text-[12px] text-[var(--muted-foreground)] leading-relaxed">
              Deze correctie wordt direct verwerkt in de kaart en in het dossierlog vastgelegd.
            </div>

            <button
              type="button"
              onClick={handleCorrectieSave}
              className="w-full h-13 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[14px] hover:opacity-90 transition-opacity cursor-pointer shadow-md mt-2"
            >
              Corrigeren & opslaan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
