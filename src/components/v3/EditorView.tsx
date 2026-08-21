import React, { useState } from 'react';
import { V3State, PersonaId, PageFace, CategoryRail } from '../../types/v3';
import { PERSONAS, THEMES, STYLES, SUGGEST } from '../../constants/v3data';
import { ArrowLeft, Lock, Unlock, Info, Maximize2, Minimize2, ChevronLeft, ChevronRight, X, Plus, Trash2, Check, Sparkles } from 'lucide-react';

interface EditorViewProps {
  state: V3State;
  onUpdateState: (patch: Partial<V3State>) => void;
  onBack: () => void;
  onGoToDrukproef: () => void;
}

export const EditorView: React.FC<EditorViewProps> = ({
  state,
  onUpdateState,
  onBack,
  onGoToDrukproef
}) => {
  const p = PERSONAS[state.persona];
  const edits = state.edits[state.persona] || {};
  const c = { ...p, ...edits };

  const themeDef = THEMES[state.theme] || THEMES.stilte;
  const currentTint = themeDef.tints[state.tint] || themeDef.tints[0];
  const currentStyle = STYLES[state.style] || STYLES[0];

  const isFamily = state.role === 'family';
  const railLocked = isFamily && state.locked;

  const [activeSheet, setActiveSheet] = useState<'text' | 'namen' | 'afscheid' | null>(null);
  const [activeBlock, setActiveBlock] = useState<string | null>(null);
  const [tone, setTone] = useState<string>('Algemeen');
  const [infoOpen, setInfoOpen] = useState(false);
  const [lockDialogOpen, setLockDialogOpen] = useState(false);

  // Edit helper
  const handleEdit = (key: string, value: any) => {
    const pEdits = { ...state.edits };
    pEdits[state.persona] = { ...pEdits[state.persona], [key]: value };
    onUpdateState({ edits: pEdits });
  };

  const handleSetNames = (newNames: any[]) => {
    handleEdit('names', newNames);
  };

  // Typography styles
  const isDarkPaper = currentTint.mode === 'dark';
  const inkColor = isDarkPaper ? '#fcfcfd' : '#1a1a1e';
  const paperColor = isDarkPaper ? '#1c2228' : '#faf9f6';
  const alignCss = (state.align[state.page] || 'center') as any;

  // Background layers
  const hasBackgroundImg = state.theme !== 'foto' && themeDef.img && state.photo === 'vrijgezet';

  return (
    <div className="flex flex-col min-h-screen pb-24 text-[var(--foreground)] bg-[var(--background)] relative select-none">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-[13px] font-medium text-[var(--foreground)] hover:opacity-75 transition-opacity cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Stap 2</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[8.5px] font-bold tracking-[0.18em] uppercase text-[var(--muted-foreground)]">
            {isFamily ? 'Familieweergave' : 'Uitvaartbegeleider'}
          </span>
          <span className="text-[15px] font-bold text-[var(--foreground)]">
            {c.call}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setInfoOpen(!infoOpen)}
            className="w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="Over automatisch bewaren"
          >
            <Info size={15} />
          </button>

          <button
            type="button"
            onClick={() => {
              if (isFamily) {
                onUpdateState({
                  toast: state.locked
                    ? 'Het ontwerp is vastgezet door de begeleider.'
                    : 'Het ontwerp is vrij om aan te passen.'
                });
              } else {
                setLockDialogOpen(true);
              }
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              state.locked
                ? 'bg-[var(--primary)] text-white shadow-xs'
                : 'border border-[var(--border-strong)] text-[var(--foreground)]'
            }`}
            aria-label={state.locked ? 'Vrijgeven' : 'Vastzetten'}
          >
            {state.locked ? <Lock size={14} className="text-[#c99f6c]" /> : <Unlock size={14} />}
          </button>
        </div>
      </div>

      {/* Info Popover */}
      {infoOpen && (
        <div className="mx-5 mb-3 p-4 rounded-2xl bg-[var(--glass-nav-bg)] border border-[var(--glass-nav-border)] backdrop-blur-xl shadow-lg flex flex-col gap-2 animate-fadeIn z-50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              Automatisch bewaren
            </span>
            <button
              type="button"
              onClick={() => setInfoOpen(false)}
              className="text-[11px] font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            >
              Duidelijk
            </button>
          </div>
          <p className="text-[12.5px] leading-relaxed text-[var(--foreground)] m-0">
            Wijzigingen worden meteen bewaard. U hoeft niets op te slaan; wat u hier ziet staat ook in het dossier bij de uitvaartbegeleider.
          </p>
        </div>
      )}

      {/* Lock Note */}
      {railLocked && (
        <div className="px-5 text-right text-[11px] text-[var(--muted-foreground)] -mt-1 mb-2">
          Vastgezet door de uitvaartbegeleider. U werkt aan de woorden.
        </div>
      )}

      {/* Tabs: Voorkant | Binnenzijde | Achterkant */}
      <div className="px-5 py-2">
        <div className="flex bg-[var(--secondary)] rounded-full p-1 border border-[var(--border)]">
          {[
            { id: 'front' as PageFace, label: 'Voorkant' },
            ...(state.format === 'gevouwen' ? [{ id: 'inside' as PageFace, label: 'Binnenzijde' }] : []),
            { id: 'back' as PageFace, label: 'Achterkant' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onUpdateState({ page: t.id, cat: null, face: null })}
              className={`flex-1 py-1.5 px-3 rounded-full text-[12.5px] font-medium transition-all cursor-pointer ${
                state.page === t.id
                  ? 'bg-[var(--background)] text-[var(--foreground)] font-bold shadow-xs'
                  : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Card Stage / Canvas with Category Rail */}
      <div className="relative px-5 py-3 flex items-center justify-center flex-1 min-h-[420px]">
        {/* The Card Container */}
        <div
          className={`relative rounded-lg overflow-hidden shadow-2xl transition-all duration-300 border border-[var(--border)] ${
            state.page === 'inside' ? 'w-full max-w-[420px] aspect-[210/148]' : 'w-[260px] aspect-[105/148]'
          }`}
          style={{
            backgroundColor: paperColor,
            color: inkColor,
            containerType: 'inline-size'
          }}
        >
          {/* Card Background Theme / Texture */}
          {hasBackgroundImg && (
            <div
              className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none opacity-40 mix-blend-multiply"
              style={{
                backgroundImage: themeDef.img,
                backgroundPosition: themeDef.pos || 'center'
              }}
            />
          )}

          {/* Card Scrim overlay */}
          {state.photo === 'vrijgezet' && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isDarkPaper
                  ? 'radial-gradient(ellipse at 50% 40%, rgba(20,24,28,0.2) 0%, rgba(12,16,20,0.8) 100%)'
                  : 'radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.4) 0%, rgba(240,240,245,0.8) 100%)'
              }}
            />
          )}

          {/* FRONT PAGE CONTENT */}
          {state.page === 'front' && (
            <div className="absolute inset-0 flex flex-col justify-between p-[6cqw] text-center">
              {/* Photo Area */}
              {state.hasPhoto && (
                <div
                  onClick={() => onUpdateState({ cat: 'foto' })}
                  className="relative w-full h-[52cqw] rounded-[3cqw] overflow-hidden cursor-pointer group shadow-sm mb-2"
                >
                  <img
                    src={state.photo === 'vrijgezet' ? p.photoCut : p.photoFull}
                    alt={c.call}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: p.photoPos }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              )}

              {/* Spreuk (clickable) */}
              <div
                onClick={() => {
                  setActiveBlock('spreuk');
                  setActiveSheet('text');
                }}
                className="cursor-pointer py-1 hover:outline-1 hover:outline-dashed hover:outline-current/30 rounded px-1 transition-all"
              >
                <p
                  className="italic m-0 text-[3.8cqw] leading-relaxed text-balance"
                  style={{ fontFamily: currentStyle.b }}
                >
                  "{c.spreuk}"
                </p>
              </div>

              {/* Name & Data (clickable) */}
              <div
                onClick={() => {
                  setActiveBlock('naam');
                  setActiveSheet('text');
                }}
                className="cursor-pointer py-1 hover:outline-1 hover:outline-dashed hover:outline-current/30 rounded px-1 transition-all flex flex-col gap-0.5"
              >
                <h2
                  className="font-bold m-0 text-[6.8cqw] tracking-tight leading-tight"
                  style={{
                    fontFamily: currentStyle.d,
                    letterSpacing: currentStyle.tr,
                    textTransform: currentStyle.caps ? 'uppercase' : 'none'
                  }}
                >
                  {c.call}
                </h2>
                <span className="text-[3.2cqw] opacity-80" style={{ fontFamily: currentStyle.b }}>
                  * {c.born.split('te')[0]} — † {c.died.split('te')[0]}
                </span>
              </div>
            </div>
          )}

          {/* INSIDE SPREAD CONTENT */}
          {state.page === 'inside' && (
            <div className="absolute inset-0 flex">
              {/* Left Page (Tekst & Herinnering) */}
              <div
                onClick={() => {
                  setActiveBlock('herinnering');
                  setActiveSheet('text');
                }}
                className="w-1/2 h-full p-[6cqw] border-r border-black/10 flex flex-col justify-between cursor-pointer hover:bg-black/5 transition-colors"
              >
                <span className="text-[2.6cqw] uppercase tracking-widest text-[var(--muted-foreground)] font-bold">
                  Binnenzijde links
                </span>
                <p
                  className="italic m-0 text-[3.6cqw] leading-relaxed text-balance"
                  style={{ fontFamily: currentStyle.b }}
                >
                  {c.herinnering}
                </p>
                <span className="text-[2.6cqw] opacity-60 text-right">Tik om tekst te wijzigen</span>
              </div>

              {/* Right Page (Praktisch & Afscheid) */}
              <div
                onClick={() => {
                  setActiveBlock('afscheid');
                  setActiveSheet('afscheid');
                }}
                className="w-1/2 h-full p-[6cqw] flex flex-col justify-between cursor-pointer hover:bg-black/5 transition-colors"
              >
                <span className="text-[2.6cqw] uppercase tracking-widest text-[var(--muted-foreground)] font-bold">
                  Het afscheid
                </span>
                <div className="flex flex-col gap-1.5 text-[3.2cqw] leading-relaxed">
                  <p className="m-0 font-medium">{c.plechtigheid}</p>
                  {c.groet && <p className="m-0 opacity-85">{c.groet}</p>}
                  {c.condoleren && <p className="m-0 opacity-85">{c.condoleren}</p>}
                </div>
                <span className="text-[2.6cqw] opacity-60 text-right">Tik om afscheid te wijzigen</span>
              </div>
            </div>
          )}

          {/* BACK PAGE CONTENT */}
          {state.page === 'back' && (
            <div
              onClick={() => {
                setActiveBlock('namen');
                setActiveSheet('namen');
              }}
              className="absolute inset-0 p-[6cqw] flex flex-col justify-between cursor-pointer hover:bg-black/5 transition-colors text-center"
            >
              <span className="text-[2.6cqw] uppercase tracking-widest text-[var(--muted-foreground)] font-bold">
                Achterkant · Namen
              </span>

              <div className="flex flex-col gap-1 my-auto text-[3.4cqw]" style={{ fontFamily: currentStyle.b }}>
                <span className="font-bold text-[3.8cqw] mb-1">{c.fam}</span>
                {c.names.slice(0, 8).map((nr, idx) => (
                  <span
                    key={idx}
                    className={`block ${nr.it ? 'italic opacity-85 text-[3cqw]' : ''}`}
                    style={{ paddingLeft: `${nr.l * 3}cqw` }}
                  >
                    {nr.t} {nr.x && '†'}
                  </span>
                ))}
                {c.names.length > 8 && (
                  <span className="text-[2.8cqw] opacity-70 italic mt-1">
                    +{c.names.length - 8} meer namen...
                  </span>
                )}
              </div>

              <div className="text-[2.8cqw] opacity-75 flex flex-col gap-0.5">
                <span>{c.correspondentie}</span>
                {c.online && <span>{c.online}</span>}
              </div>
            </div>
          )}

          {/* Zoom toggle button in card corner */}
          <button
            type="button"
            onClick={() => onUpdateState({ zoom: !state.zoom })}
            className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
            aria-label="Vergroot weergave"
          >
            {state.zoom ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>

        {/* Vertical Category Rail (Foto, Thema, Indeling, Stijl, Sfeer) */}
        {!railLocked && (
          <aside
            aria-label="Categorie instellingen"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1 p-1 bg-[var(--glass-nav-bg)] border border-[var(--glass-nav-border)] backdrop-blur-2xl rounded-full shadow-lg"
          >
            {[
              { id: 'foto' as CategoryRail, label: 'Foto' },
              { id: 'thema' as CategoryRail, label: 'Thema' },
              { id: 'indeling' as CategoryRail, label: 'Indeling' },
              { id: 'stijl' as CategoryRail, label: 'Stijl' },
              { id: 'sfeer' as CategoryRail, label: 'Sfeer' }
            ].map((r) => {
              const on = state.cat === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => onUpdateState({ cat: on ? null : r.id })}
                  className={`w-10 h-10 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
                    on
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-md'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]'
                  }`}
                  aria-label={r.label}
                >
                  <span className="text-[9.5px] font-bold tracking-tight uppercase">{r.label}</span>
                </button>
              );
            })}
          </aside>
        )}
      </div>

      {/* Horizontal Smaken-Strip (Drawer at bottom of canvas) */}
      {state.cat && !railLocked && (
        <div className="mx-5 mb-4 p-4 rounded-3xl bg-[var(--glass-nav-bg)] border border-[var(--glass-nav-border)] backdrop-blur-2xl shadow-xl flex flex-col gap-3 animate-slideUp">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--foreground)]">
              {state.cat === 'foto'
                ? 'Foto & Behandeling'
                : state.cat === 'thema'
                ? 'Thema & Sfeer'
                : state.cat === 'indeling'
                ? 'Indeling'
                : state.cat === 'stijl'
                ? 'Letterstijl & Uitlijning'
                : 'Sfeertint & Ornament'}
            </span>

            <button
              type="button"
              onClick={() => onUpdateState({ cat: null })}
              className="text-[11px] font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] uppercase"
            >
              Sluiten
            </button>
          </div>

          {/* Strip Content per category */}
          <div className="flex gap-2 overflow-x-auto mem-scroll pb-1">
            {/* Foto category */}
            {state.cat === 'foto' && (
              <div className="flex gap-3">
                {[
                  { id: 'volledig' as const, label: 'Volledige foto', sub: 'Originele bewerking' },
                  { id: 'vrijgezet' as const, label: 'Vrijgezet op thema', sub: 'Portret vrij op sfeerbeeld' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => onUpdateState({ photo: f.id })}
                    className={`p-3 rounded-2xl border text-left flex flex-col gap-1 w-40 transition-all cursor-pointer ${
                      state.photo === f.id
                        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                        : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--foreground)]'
                    }`}
                  >
                    <span className="text-[12.5px] font-bold">{f.label}</span>
                    <span className="text-[10.5px] opacity-80">{f.sub}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Thema category */}
            {state.cat === 'thema' && (
              <div className="flex gap-2.5">
                {Object.keys(THEMES).map((thKey) => {
                  const th = THEMES[thKey];
                  const on = state.theme === thKey;
                  return (
                    <button
                      key={thKey}
                      type="button"
                      onClick={() => onUpdateState({ theme: thKey, tint: 0, orn: 'geen' })}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all cursor-pointer ${
                        on
                          ? 'border-[var(--primary)] bg-[var(--background)] shadow-md'
                          : 'border-transparent hover:bg-[var(--secondary)]'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden border border-black/10 bg-cover bg-center shadow-xs"
                        style={{
                          backgroundImage: th.img || undefined,
                          backgroundColor: th.tints[0]?.chip?.startsWith('#') ? th.tints[0].chip : '#eee'
                        }}
                      />
                      <span className={`text-[11px] ${on ? 'font-bold' : 'text-[var(--muted-foreground)]'}`}>
                        {th.n}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Stijl category */}
            {state.cat === 'stijl' && (
              <div className="flex gap-2">
                {STYLES.map((st, idx) => {
                  const on = state.style === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onUpdateState({ style: idx })}
                      className={`px-4 py-2.5 rounded-2xl border text-left flex flex-col gap-0.5 whitespace-nowrap transition-all cursor-pointer ${
                        on
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md'
                          : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--foreground)]'
                      }`}
                    >
                      <span className="text-[15px] font-serif" style={{ fontFamily: st.d }}>
                        Aa Bb
                      </span>
                      <span className="text-[11px] font-medium opacity-80">{st.n}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Sfeer category */}
            {state.cat === 'sfeer' && (
              <div className="flex gap-3 items-center">
                {themeDef.tints.map((tt, idx) => {
                  const on = state.tint === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onUpdateState({ tint: idx })}
                      className={`flex flex-col items-center gap-1 p-1.5 rounded-2xl border transition-all cursor-pointer ${
                        on ? 'border-[var(--primary)]' : 'border-transparent'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border border-black/10 shadow-xs"
                        style={{ background: tt.chip }}
                      />
                      <span className="text-[10px] text-[var(--muted-foreground)]">{tt.n}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Indeling category */}
            {state.cat === 'indeling' && (
              <div className="flex gap-2">
                {['Recht', 'Rond', 'Ovaal', 'Boog'].map((sh) => {
                  const currentShape = state.shape.front || 'recht';
                  const on = currentShape.toLowerCase() === sh.toLowerCase();
                  return (
                    <button
                      key={sh}
                      type="button"
                      onClick={() => {
                        const newShape = { ...state.shape, front: sh.toLowerCase() };
                        onUpdateState({ shape: newShape });
                      }}
                      className={`px-3.5 py-2 rounded-xl text-[12px] font-medium transition-all cursor-pointer ${
                        on
                          ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-xs'
                          : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'
                      }`}
                    >
                      {sh}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar: Naar Drukproef */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-[var(--glass-nav-bg)] border-t border-[var(--glass-nav-border)] backdrop-blur-2xl flex items-center justify-center max-w-[480px] mx-auto">
        <button
          type="button"
          onClick={onGoToDrukproef}
          className="w-full h-13 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[14px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-lg"
        >
          <span>Naar de drukproef (Stap 3)</span>
          <ChevronRight size={17} />
        </button>
      </div>

      {/* TEXT EDITING MODAL (Bottom sheet) */}
      {activeSheet === 'text' && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-[480px] bg-[var(--background)] rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-4 border-t border-[var(--border-strong)] max-h-[82vh] overflow-y-auto mem-scroll animate-slideUp">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
                  Tekst bewerken
                </span>
                <h3 className="text-[18px] font-bold text-[var(--foreground)] m-0">
                  {activeBlock === 'spreuk'
                    ? 'De spreuk'
                    : activeBlock === 'naam'
                    ? 'Naam en data'
                    : 'Tekstblok'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSheet(null)}
                className="text-[12px] font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                Klaar
              </button>
            </div>

            {/* Fields */}
            {activeBlock === 'spreuk' && (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={3}
                  value={c.spreuk}
                  onChange={(e) => handleEdit('spreuk', e.target.value)}
                  className="w-full p-4 rounded-2xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[15px] font-serif italic text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                />

                {/* Tone suggestions */}
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Suggesties
                  </span>
                  <div className="flex gap-1.5 overflow-x-auto mem-scroll">
                    {['Algemeen', 'Na ziekte', 'Onverwacht', 'Religieus'].map((tn) => (
                      <button
                        key={tn}
                        type="button"
                        onClick={() => setTone(tn)}
                        className={`px-3 py-1 rounded-full text-[11.5px] whitespace-nowrap cursor-pointer ${
                          tone === tn
                            ? 'bg-[var(--primary)] text-[var(--primary-foreground)] font-bold'
                            : 'bg-[var(--secondary)] text-[var(--muted-foreground)]'
                        }`}
                      >
                        {tn}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-1">
                    {(SUGGEST.spreuk[tone] || []).map((sugg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleEdit('spreuk', sugg)}
                        className="p-3 rounded-xl bg-[var(--secondary)]/60 hover:bg-[var(--secondary)] text-left text-[13px] italic font-serif leading-relaxed text-[var(--foreground)] transition-colors cursor-pointer border border-[var(--border)]"
                      >
                        "{sugg}"
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeBlock === 'naam' && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[var(--muted-foreground)]">Roepnaam</label>
                  <input
                    type="text"
                    value={c.call}
                    onChange={(e) => handleEdit('call', e.target.value)}
                    className="h-11 px-3.5 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[15px] font-bold text-[var(--foreground)]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[var(--muted-foreground)]">Volledige naam</label>
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => handleEdit('name', e.target.value)}
                    className="h-11 px-3.5 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[14px] text-[var(--foreground)]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[var(--muted-foreground)]">Geboortegegevens</label>
                  <input
                    type="text"
                    value={c.born}
                    onChange={(e) => handleEdit('born', e.target.value)}
                    className="h-11 px-3.5 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[14px] text-[var(--foreground)]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] text-[var(--muted-foreground)]">Overlijdensgegevens</label>
                  <input
                    type="text"
                    value={c.died}
                    onChange={(e) => handleEdit('died', e.target.value)}
                    className="h-11 px-3.5 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[14px] text-[var(--foreground)]"
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveSheet(null)}
              className="w-full h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[13px] hover:opacity-90 transition-opacity cursor-pointer mt-2"
            >
              Klaar
            </button>
          </div>
        </div>
      )}

      {/* NAMEN SHEET MODAL */}
      {activeSheet === 'namen' && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex items-end justify-center backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-[480px] bg-[var(--background)] rounded-t-[32px] p-6 shadow-2xl flex flex-col gap-4 border-t border-[var(--border-strong)] max-h-[85vh] overflow-y-auto mem-scroll animate-slideUp">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)]">
                  Achterkant
                </span>
                <h3 className="text-[18px] font-bold text-[var(--foreground)] m-0">
                  Het namenblok ({c.names.length} namen)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveSheet(null)}
                className="text-[12px] font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                Klaar
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-[var(--muted-foreground)]">Familie kopregel</label>
                <input
                  type="text"
                  value={c.fam}
                  onChange={(e) => handleEdit('fam', e.target.value)}
                  className="h-11 px-3.5 rounded-xl bg-[var(--input-background)] border border-[var(--border-strong)] text-[14px] font-bold text-[var(--foreground)]"
                />
              </div>

              {/* Names tree list */}
              <div className="flex flex-col gap-1.5 mt-2">
                {c.names.map((nr, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[var(--secondary)]/70 flex items-center justify-between gap-2 border border-[var(--border)]"
                    style={{ marginLeft: `${nr.l * 12}px` }}
                  >
                    <input
                      type="text"
                      value={nr.t}
                      onChange={(e) => {
                        const updated = [...c.names];
                        updated[idx].t = e.target.value;
                        handleSetNames(updated);
                      }}
                      className={`flex-1 bg-transparent border-none text-[13.5px] text-[var(--foreground)] focus:outline-none ${
                        nr.it ? 'italic' : ''
                      }`}
                    />

                    <div className="flex items-center gap-1 flex-none">
                      {/* Indent level toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...c.names];
                          updated[idx].l = (updated[idx].l + 1) % 3;
                          handleSetNames(updated);
                        }}
                        className="px-2 py-0.5 rounded text-[10px] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      >
                        Niv {nr.l + 1}
                      </button>

                      {/* Deceased dagger toggle */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...c.names];
                          updated[idx].x = !updated[idx].x;
                          handleSetNames(updated);
                        }}
                        className={`w-6 h-6 rounded flex items-center justify-center text-[12px] ${
                          nr.x ? 'bg-[var(--primary)] text-white' : 'bg-[var(--background)] text-[var(--muted-foreground)]'
                        }`}
                      >
                        †
                      </button>

                      {/* Remove row */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = c.names.filter((_, i) => i !== idx);
                          handleSetNames(updated);
                        }}
                        className="w-6 h-6 rounded flex items-center justify-center text-rose-500 hover:bg-rose-500/10"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    handleSetNames([...c.names, { t: 'Nieuwe naam', l: 0 }]);
                  }}
                  className="py-2.5 rounded-xl border border-dashed border-[var(--border-strong)] text-[12px] font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                >
                  <Plus size={14} />
                  <span>Naam toevoegen</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveSheet(null)}
              className="w-full h-12 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-[13px] hover:opacity-90 transition-opacity cursor-pointer mt-2"
            >
              Klaar
            </button>
          </div>
        </div>
      )}

      {/* Lock Confirmation Dialog */}
      {lockDialogOpen && (
        <div className="fixed inset-0 z-[130] bg-black/50 flex items-center justify-center p-5 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-[360px] bg-[var(--background)] rounded-3xl p-6 shadow-2xl flex flex-col gap-4 border border-[var(--border-strong)] animate-scaleUp">
            <h3 className="text-[17px] font-bold text-[var(--foreground)] m-0">
              {state.locked ? 'Ontwerp weer vrijgeven?' : 'Ontwerp vastzetten?'}
            </h3>
            <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed m-0">
              {state.locked
                ? 'De familie kan daarna weer thema, indeling en sfeer wijzigen.'
                : 'De familie werkt dan alleen nog aan de woorden. U kunt dit later altijd weer vrijgeven.'}
            </p>

            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setLockDialogOpen(false)}
                className="flex-1 py-2.5 rounded-full bg-[var(--secondary)] text-[var(--foreground)] text-[12.5px] font-semibold cursor-pointer"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateState({
                    locked: !state.locked,
                    toast: state.locked ? 'Ontwerp vrijgegeven' : 'Ontwerp vastgezet'
                  });
                  setLockDialogOpen(false);
                }}
                className="flex-1 py-2.5 rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] text-[12.5px] font-bold cursor-pointer"
              >
                {state.locked ? 'Ja, vrijgeven' : 'Ja, vastzetten'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
