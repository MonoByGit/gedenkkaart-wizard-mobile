import React, { useState } from 'react';
import { V3State, PersonaId, ScreenMode, Role, Format } from '../../types/v3';
import { PERSONAS } from '../../constants/v3data';
import { Moon, Sun, ChevronDown, ChevronUp, Sliders } from 'lucide-react';

interface PersonaSwitcherProps {
  state: V3State;
  onUpdateState: (patch: Partial<V3State>) => void;
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({ state, onUpdateState }) => {
  const [expanded, setExpanded] = useState(false);

  const curPersona = PERSONAS[state.persona];

  return (
    <header className="sticky top-0 z-[100] w-full bg-[rgba(26,26,30,0.92)] backdrop-blur-xl text-[#fcfcfd] border-b border-[rgba(255,255,255,0.08)] shadow-md text-[13px] select-none" aria-label="Prototype bediening">
      {/* Primary Bar */}
      <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Persona Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto mem-scroll">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa] mr-1 hidden sm:inline">
            Persona:
          </span>
          {(Object.keys(PERSONAS) as PersonaId[]).map((pid) => {
            const p = PERSONAS[pid];
            const on = state.persona === pid;
            return (
              <button
                key={pid}
                type="button"
                onClick={() => {
                  const targetScreen: ScreenMode =
                    pid === 'greet' ? 'drukproef' : pid === 'carien' ? 'editor' : 'dossier';
                  const pTheme = pid === 'greet' ? 'stilte' : pid === 'carien' ? 'dons' : 'gloed';
                  const pFormat: Format = pid === 'richard' ? 'enkel' : 'gevouwen';
                  const pPhoto = pid === 'carien' ? 'vrijgezet' : 'volledig';
                  onUpdateState({
                    persona: pid,
                    screen: targetScreen,
                    theme: pTheme,
                    format: pFormat,
                    photo: pPhoto,
                    hasPhoto: pid !== 'richard',
                    page: 'front',
                    face: null,
                    zoom: false,
                    cat: pid === 'carien' ? 'thema' : null
                  });
                }}
                className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                  on
                    ? 'bg-white text-[#1a1a1e] font-bold shadow-sm'
                    : 'bg-[rgba(255,255,255,0.1)] text-[#d4d4d8] hover:bg-[rgba(255,255,255,0.18)]'
                }`}
              >
                {p.call} <span className="text-[10px] opacity-70">({p.status})</span>
              </button>
            );
          })}
        </div>

        {/* Screen Shortcut tabs & Controls */}
        <div className="flex items-center gap-1.5 flex-none">
          <div className="hidden md:flex items-center bg-[rgba(255,255,255,0.08)] rounded-full p-0.5">
            {[
              { k: 'omgeving' as const, l: 'Omgeving' },
              { k: 'dossier' as const, l: 'Dossier' },
              { k: 'editor' as const, l: 'Editor (Stap 2)' },
              { k: 'drukproef' as const, l: 'Drukproef (Stap 3)' }
            ].map((s) => (
              <button
                key={s.k}
                type="button"
                onClick={() => onUpdateState({ screen: s.k, face: null, zoom: false })}
                className={`px-2.5 py-1 rounded-full text-[11.5px] transition-all cursor-pointer ${
                  state.screen === s.k
                    ? 'bg-white text-[#1a1a1e] font-bold shadow-xs'
                    : 'text-[#d4d4d8] hover:text-white'
                }`}
              >
                {s.l}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onUpdateState({ darkTheme: !state.darkTheme })}
            className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#d4d4d8] hover:text-white transition-colors cursor-pointer"
            aria-label="Wissel donkere modus"
          >
            {state.darkTheme ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[rgba(255,255,255,0.1)] text-[#d4d4d8] hover:text-white transition-colors cursor-pointer text-[11.5px]"
          >
            <Sliders size={13} />
            <span className="hidden sm:inline">Details</span>
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
        </div>
      </div>

      {/* Expanded Control Drawer */}
      {expanded && (
        <div className="border-t border-[rgba(255,255,255,0.08)] bg-[rgba(18,18,22,0.98)] px-4 py-3 max-w-[1200px] mx-auto flex flex-wrap gap-5 items-center justify-between text-[12px]">
          {/* Mobile Screen Switcher */}
          <div className="flex flex-col gap-1.5 md:hidden w-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Scherm:</span>
            <div className="flex gap-1.5 flex-wrap">
              {[
                { k: 'omgeving' as const, l: 'Omgeving' },
                { k: 'dossier' as const, l: 'Dossier' },
                { k: 'editor' as const, l: 'Editor (Stap 2)' },
                { k: 'drukproef' as const, l: 'Drukproef (Stap 3)' }
              ].map((s) => (
                <button
                  key={s.k}
                  type="button"
                  onClick={() => onUpdateState({ screen: s.k, face: null, zoom: false })}
                  className={`px-3 py-1.5 rounded-full text-[12px] ${
                    state.screen === s.k ? 'bg-white text-[#1a1a1e] font-bold' : 'bg-[rgba(255,255,255,0.1)] text-[#d4d4d8]'
                  }`}
                >
                  {s.l}
                </button>
              ))}
            </div>
          </div>

          {/* Rol Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Rol:</span>
            <div className="flex bg-[rgba(255,255,255,0.08)] rounded-full p-0.5">
              {[
                { k: 'operator' as Role, l: 'Uitvaartbegeleider' },
                { k: 'family' as Role, l: 'Familie' }
              ].map((r) => (
                <button
                  key={r.k}
                  type="button"
                  onClick={() => onUpdateState({ role: r.k })}
                  className={`px-2.5 py-1 rounded-full text-[11.5px] cursor-pointer ${
                    state.role === r.k ? 'bg-white text-[#1a1a1e] font-bold' : 'text-[#d4d4d8]'
                  }`}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>

          {/* Formaat Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Formaat:</span>
            <div className="flex bg-[rgba(255,255,255,0.08)] rounded-full p-0.5">
              {[
                { k: 'gevouwen' as Format, l: 'Gevouwen' },
                { k: 'enkel' as Format, l: 'Enkel' }
              ].map((f) => (
                <button
                  key={f.k}
                  type="button"
                  onClick={() => onUpdateState({ format: f.k, page: 'front', face: null })}
                  className={`px-2.5 py-1 rounded-full text-[11.5px] cursor-pointer ${
                    state.format === f.k ? 'bg-white text-[#1a1a1e] font-bold' : 'text-[#d4d4d8]'
                  }`}
                >
                  {f.l}
                </button>
              ))}
            </div>
          </div>

          {/* Lock status toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Lock:</span>
            <button
              type="button"
              onClick={() => onUpdateState({ locked: !state.locked })}
              className={`px-3 py-1 rounded-full text-[11.5px] font-medium cursor-pointer ${
                state.locked ? 'bg-[#c99f6c] text-[#1a1a1e] font-bold' : 'bg-[rgba(255,255,255,0.1)] text-[#d4d4d8]'
              }`}
            >
              {state.locked ? '🔒 Vastgezet' : '🔓 Vrij'}
            </button>
          </div>

          {/* Portrait Available toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">Foto:</span>
            <button
              type="button"
              onClick={() => onUpdateState({ hasPhoto: !state.hasPhoto })}
              className={`px-3 py-1 rounded-full text-[11.5px] font-medium cursor-pointer ${
                state.hasPhoto ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}
            >
              {state.hasPhoto ? '✓ Portret aanwezig' : '⏳ 24u belofte'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
