import React, { useState } from 'react';
import { V3State, PersonaId, ShareChannel, NameRow } from '../../types/v3';
import { PERSONAS, THEMES, STYLES, SHARES } from '../../constants/v3data';
import { ArrowLeft, Download, Check, Copy, Info, CheckCircle2, Circle, HelpCircle, MessageSquare, ChevronRight, Share2, Sparkles, Send } from 'lucide-react';

interface DrukproefViewProps {
  state: V3State;
  onUpdateState: (patch: Partial<V3State>) => void;
  onBack: () => void;
  onFinished: () => void;
}

export const DrukproefView: React.FC<DrukproefViewProps> = ({
  state,
  onUpdateState,
  onBack,
  onFinished
}) => {
  const p = PERSONAS[state.persona];
  const edits = state.edits[state.persona] || {};
  const c = { ...p, ...edits };

  const themeDef = THEMES[state.theme] || THEMES.stilte;
  const currentTint = themeDef.tints[state.tint] || themeDef.tints[0];
  const currentStyle = STYLES[state.style] || STYLES[0];

  const [activeFaceIndex, setActiveFaceIndex] = useState(0);
  const [shareChannel, setShareChannel] = useState<ShareChannel>('whatsapp');
  const [copied, setCopied] = useState(false);
  const [namencheckOpen, setNamencheckOpen] = useState(false);
  const [actionStage, setActionStage] = useState<'idle' | 'readyToSend'>('idle');
  const [questionModalOpen, setQuestionModalOpen] = useState<{ field: string; label: string; currentVal: string } | null>(null);
  const [questionText, setQuestionText] = useState('');

  const faces = state.format === 'gevouwen'
    ? ['Voorkant', 'Binnenzijde links', 'Binnenzijde rechts', 'Achterkant']
    : ['Voorkant', 'Achterkant'];

  // Check state calculation
  const totalRows = 5 + c.names.length;
  const checkedKeys = Object.keys(state.checkOk).filter((k) => state.checkOk[k]);
  const checkedCount = Math.min(totalRows, checkedKeys.length);
  const allChecked = checkedCount >= totalRows;

  // WhatsApp Message Generator
  const generateWhatsAppMsg = () => {
    return `${c.call}\n${c.name}\n${c.partner ? c.partner + '\n' : ''}* ${c.born}\n† ${c.died}\n\n${c.plechtigheid}\n${c.groet ? c.groet + '\n' : ''}${c.condoleren ? c.condoleren + '\n' : ''}\n${c.online || ''}`;
  };

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(generateWhatsAppMsg());
    setCopied(true);
    onUpdateState({ toast: 'WhatsApp bericht gekopieerd naar klembord' });
    setTimeout(() => setCopied(false), 2400);
  };

  const handleCheckAll = () => {
    const okPatch: Record<string, boolean> = {
      'k:call': true,
      'k:name': true,
      'k:partner': true,
      'k:born': true,
      'k:died': true
    };
    c.names.forEach((_, idx) => {
      okPatch[`n:${idx}`] = true;
    });
    onUpdateState({
      checkOk: okPatch,
      toast: 'Alle namen en gegevens nagelopen en akkoord'
    });
  };

  const handleSendQuestion = () => {
    if (!questionModalOpen) return;
    const newLog = [
      { text: `Vraag gesteld over ${questionModalOpen.label}: "${questionText}"`, at: '13:20' },
      ...state.log
    ];
    onUpdateState({
      log: newLog,
      toast: 'Vraag verstuurd naar de uitvaartbegeleider'
    });
    setQuestionModalOpen(null);
    setQuestionText('');
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 text-[var(--foreground)] bg-[var(--background)] relative select-none">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Editor</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
            Stap 3 · Drukproef
          </span>
          <span className="text-[15px] font-bold text-[var(--foreground)]">
            {c.call}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onUpdateState({ toast: 'De verhouding staat vast (105×148 mm). Drukker kiest A6 of A5.' })}
          className="w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
          aria-label="Over de drukproef"
        >
          <Info size={15} />
        </button>
      </div>

      <div className="px-5 flex flex-col gap-6 pt-2">
        {/* 1. Kanten Carrousel */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]">
              De kaart ({faces[activeFaceIndex]})
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)]">
              {activeFaceIndex + 1} van {faces.length}
            </span>
          </div>

          {/* Card Carousel Stage */}
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-[var(--secondary)] border border-[var(--border)] overflow-hidden p-4 flex items-center justify-center shadow-inner">
            {/* Active Face Preview */}
            <div className="w-[180px] aspect-[105/148] rounded-lg overflow-hidden bg-white shadow-2xl p-4 flex flex-col justify-between text-center border border-black/10 transition-all duration-300">
              {activeFaceIndex === 0 && (
                <>
                  <div className="w-full h-24 rounded overflow-hidden bg-zinc-100">
                    <img src={p.photoFull} alt={c.call} className="w-full h-full object-cover object-top" />
                  </div>
                  <p className="italic text-[9px] text-zinc-600 m-0">"{c.spreuk}"</p>
                  <div>
                    <h4 className="font-bold text-[14px] text-zinc-900 m-0">{c.call}</h4>
                    <span className="text-[8.5px] text-zinc-500">* {c.born.split('te')[0]}</span>
                  </div>
                </>
              )}

              {activeFaceIndex === 1 && state.format === 'gevouwen' && (
                <div className="flex flex-col justify-between h-full text-left py-2">
                  <span className="text-[7.5px] font-bold uppercase text-zinc-400">Links</span>
                  <p className="italic text-[9.5px] text-zinc-700 leading-relaxed m-0">
                    {c.herinnering}
                  </p>
                  <span className="text-[7.5px] text-zinc-400">Memortium</span>
                </div>
              )}

              {activeFaceIndex === 2 && state.format === 'gevouwen' && (
                <div className="flex flex-col justify-between h-full text-left py-2">
                  <span className="text-[7.5px] font-bold uppercase text-zinc-400">Rechts · Afscheid</span>
                  <div className="text-[8.5px] text-zinc-800 flex flex-col gap-1">
                    <p className="m-0 font-medium">{c.plechtigheid}</p>
                    {c.groet && <p className="m-0 opacity-80">{c.groet}</p>}
                  </div>
                  <span className="text-[7.5px] text-zinc-400">{c.online || ''}</span>
                </div>
              )}

              {(activeFaceIndex === 3 || (activeFaceIndex === 1 && state.format === 'enkel')) && (
                <div className="flex flex-col justify-between h-full text-center py-2">
                  <span className="text-[7.5px] font-bold uppercase text-zinc-400">{c.fam}</span>
                  <div className="flex flex-col gap-0.5 text-[8.5px] text-zinc-800">
                    {c.names.slice(0, 5).map((n, i) => (
                      <span key={i} className={n.it ? 'italic' : ''}>{n.t}</span>
                    ))}
                    {c.names.length > 5 && <span className="text-[7px] text-zinc-400">...</span>}
                  </div>
                  <span className="text-[7.5px] text-zinc-500">{c.correspondentie}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {faces.map((f, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveFaceIndex(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  activeFaceIndex === i ? 'w-6 bg-[var(--primary)]' : 'w-2 bg-[var(--border-strong)]'
                }`}
                aria-label={`Bekijk ${f}`}
              />
            ))}
          </div>
        </div>

        {/* 2. Deelvarianten Generator */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--foreground)]">
              Deelvarianten
            </span>
            <span className="text-[11px] text-[var(--muted-foreground)]">
              Direct uit de kaartinhoud
            </span>
          </div>

          {/* Share Channels Switcher */}
          <div className="flex bg-[var(--secondary)] rounded-full p-1 border border-[var(--border)]">
            {SHARES.map((s) => (
              <button
                key={s.k}
                type="button"
                onClick={() => setShareChannel(s.k)}
                className={`flex-1 py-1.5 px-3 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                  shareChannel === s.k
                    ? 'bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                }`}
              >
                {s.n}
              </button>
            ))}
          </div>

          {/* Share Preview Card */}
          <div className="p-4 rounded-3xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3">
            {shareChannel === 'whatsapp' && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-zinc-200 flex-none shadow-sm">
                    <img src={p.photoFull} alt={c.call} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[13px] font-bold text-[var(--foreground)]">WhatsApp bericht</span>
                    <span className="text-[11px] text-[var(--muted-foreground)] leading-tight mt-0.5">
                      Vierkante foto los + tekstbericht
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--secondary)] text-[12px] text-[var(--foreground)] font-sans whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto mem-scroll border border-[var(--border)]">
                  {generateWhatsAppMsg()}
                </div>

                <button
                  type="button"
                  onClick={handleCopyWhatsApp}
                  className="w-full h-11 rounded-full bg-emerald-700 text-white font-bold text-[12.5px] flex items-center justify-center gap-2 hover:bg-emerald-800 transition-colors cursor-pointer shadow-xs"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copied ? 'Bericht gekopieerd!' : 'Kopieer WhatsApp bericht'}</span>
                </button>
              </div>
            )}

            {shareChannel === 'instagram' && (
              <div className="flex flex-col gap-3 items-center">
                <div className="relative w-[180px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border border-black/10">
                  <img src={p.photoFull} alt={c.call} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-3 text-white text-left">
                    <h3 className="font-bold text-[14px] m-0 font-serif">{c.call}</h3>
                    <span className="text-[9px] opacity-85">* {c.born.split('te')[0]} — † {c.died.split('te')[0]}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onUpdateState({ toast: 'Instagram afbeelding (4:5) gedownload' })}
                  className="px-4 py-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[12px] flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Instagram beeld (4:5)</span>
                </button>
              </div>
            )}

            {shareChannel === 'facebook' && (
              <div className="flex flex-col gap-3 items-center">
                <div className="relative w-full aspect-[1200/627] rounded-2xl overflow-hidden shadow-xl bg-zinc-800 border border-black/10 flex">
                  <div className="w-1/2 p-4 flex flex-col justify-center text-left text-white bg-zinc-900/90 z-10">
                    <p className="italic text-[11px] font-serif leading-relaxed m-0 opacity-90">
                      "{c.spreuk}"
                    </p>
                    <span className="text-[12px] font-bold mt-1 font-serif">{c.call}</span>
                  </div>
                  <div className="w-1/2 relative">
                    <img src={p.photoFull} alt={c.call} className="w-full h-full object-cover object-top" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-transparent to-transparent" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onUpdateState({ toast: 'Facebook liggend beeld (1200×627) gedownload' })}
                  className="px-4 py-2 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[12px] flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                >
                  <Download size={14} />
                  <span>Download Facebook banner</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 3. Namencheck & Goedkeuringsstatus */}
        <div className="p-4 rounded-3xl bg-[var(--secondary)] border border-[var(--border)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Namencheck
            </span>
            <span className={`text-[11.5px] font-bold ${allChecked ? 'text-emerald-600' : 'text-amber-600'}`}>
              {checkedCount} van {totalRows} nagelopen
            </span>
          </div>

          <div className="w-full bg-[var(--border-strong)] h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(checkedCount / totalRows) * 100}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => setNamencheckOpen(true)}
            className="py-3 px-4 rounded-2xl bg-[var(--background)] border border-[var(--border-strong)] text-[12.5px] font-bold text-[var(--foreground)] flex items-center justify-between hover:bg-[var(--secondary)] transition-colors cursor-pointer"
          >
            <span>Open de volledige namencheck</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Sticky 2-Tik Action Foot Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-[var(--glass-nav-bg)] border-t border-[var(--glass-nav-border)] backdrop-blur-2xl flex items-center justify-center max-w-[480px] mx-auto">
        <button
          type="button"
          onClick={() => {
            if (allChecked) {
              onFinished();
            } else {
              setNamencheckOpen(true);
            }
          }}
          className={`w-full h-13 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
            allChecked
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white animate-pulse'
              : 'bg-[var(--primary)] hover:opacity-90 text-[var(--primary-foreground)]'
          }`}
        >
          {allChecked ? (
            <>
              <Send size={16} />
              <span>Versturen naar de uitvaartbegeleider</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Namen nalopen ({checkedCount}/{totalRows})</span>
            </>
          )}
        </button>
      </div>

      {/* FULL NAMENCHECK MODAL (Bottom sheet) */}
      {namencheckOpen && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-[480px] bg-[var(--background)] rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-4 border-t border-[var(--border-strong)] max-h-[90vh] overflow-y-auto mem-scroll animate-slideUp">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
                  Controle voor drukwerk
                </span>
                <h3 className="text-[18px] font-bold text-[var(--foreground)] m-0">
                  Kloppen de namen en feiten?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNamencheckOpen(false)}
                className="text-[12px] font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                Sluiten
              </button>
            </div>

            {/* Quick check remaining button */}
            {!allChecked && (
              <button
                type="button"
                onClick={handleCheckAll}
                className="py-2.5 px-4 rounded-full bg-[var(--secondary)] text-[12px] font-bold text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors cursor-pointer border border-[var(--border)] text-center"
              >
                De overige {totalRows - checkedCount} kloppen allemaal ✓
              </button>
            )}

            {/* Kerngegevens Section */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                1. Kerngegevens
              </span>

              {[
                { k: 'k:call', label: 'Roepnaam', val: c.call },
                { k: 'k:name', label: 'Volledige naam', val: c.name },
                { k: 'k:partner', label: 'Partnerregel', val: c.partner },
                { k: 'k:born', label: 'Geboortedatum', val: c.born, locked: true },
                { k: 'k:died', label: 'Overlijdensdatum', val: c.died, locked: true }
              ].map((row) => {
                const isOk = state.checkOk[row.k];
                return (
                  <div
                    key={row.k}
                    className="p-3 rounded-2xl bg-[var(--secondary)]/50 border border-[var(--border)] flex items-center justify-between gap-3"
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[var(--muted-foreground)]">
                        {row.label}
                      </span>
                      <span className="text-[13.5px] font-medium text-[var(--foreground)] truncate">
                        {row.val || 'Niet ingevuld'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-none">
                      {row.locked && (
                        <button
                          type="button"
                          onClick={() =>
                            setQuestionModalOpen({
                              field: row.k,
                              label: row.label,
                              currentVal: row.val || ''
                            })
                          }
                          className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"
                        >
                          <HelpCircle size={12} />
                          <span>Vraag stellen</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...state.checkOk, [row.k]: !isOk };
                          onUpdateState({ checkOk: updated });
                        }}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                          isOk ? 'bg-emerald-600 text-white' : 'border border-[var(--border-strong)] text-[var(--muted-foreground)]'
                        }`}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Namenblok Section */}
            <div className="flex flex-col gap-2 mt-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                2. Namenblok ({c.names.length} regels)
              </span>

              {c.names.map((nr, idx) => {
                const rowKey = `n:${idx}`;
                const isOk = state.checkOk[rowKey];
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-[var(--secondary)]/50 border border-[var(--border)] flex items-center justify-between gap-3"
                    style={{ marginLeft: `${nr.l * 10}px` }}
                  >
                    <span className={`text-[13.5px] flex-1 ${nr.it ? 'italic opacity-85' : ''}`}>
                      {nr.t} {nr.x && '†'}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...state.checkOk, [rowKey]: !isOk };
                        onUpdateState({ checkOk: updated });
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors flex-none ${
                        isOk ? 'bg-emerald-600 text-white' : 'border border-[var(--border-strong)] text-[var(--muted-foreground)]'
                      }`}
                    >
                      <Check size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Live Dossierlog Section */}
            <div className="flex flex-col gap-2 mt-4 p-4 rounded-2xl bg-[var(--secondary)]">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
                Dossierlog
              </span>
              <div className="flex flex-col gap-1.5 text-[11.5px] text-[var(--muted-foreground)]">
                {state.log.map((entry, idx) => (
                  <div key={idx} className="flex items-baseline gap-2">
                    <span className="font-mono text-[10px] opacity-75">{entry.at}</span>
                    <span>{entry.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNamencheckOpen(false)}
              className="w-full h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[13px] hover:opacity-90 transition-opacity cursor-pointer mt-2"
            >
              Akkoord & terug naar drukproef
            </button>
          </div>
        </div>
      )}

      {/* VRAAG STELLEN MODAL */}
      {questionModalOpen && (
        <div className="fixed inset-0 z-[130] bg-black/50 flex items-center justify-center p-5 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-[380px] bg-[var(--background)] rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[var(--border-strong)] animate-scaleUp">
            <h3 className="text-[17px] font-bold text-[var(--foreground)] m-0">
              Vraag over {questionModalOpen.label}
            </h3>
            <p className="text-[12.5px] text-[var(--muted-foreground)] leading-relaxed m-0">
              Geboorte- en overlijdensgegevens komen uit de officiële aangifte. Stel hieronder uw vraag aan de uitvaartbegeleider om het aan te passen.
            </p>

            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder={`Ik denk dat de ${questionModalOpen.label.toLowerCase()} niet klopt: ...`}
              className="w-full p-3 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[13px] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setQuestionModalOpen(null)}
                className="flex-1 py-2.5 rounded-full bg-[var(--secondary)] text-[var(--foreground)] text-[12px] font-semibold cursor-pointer"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={handleSendQuestion}
                className="flex-1 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] font-bold cursor-pointer"
              >
                Verstuur vraag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
