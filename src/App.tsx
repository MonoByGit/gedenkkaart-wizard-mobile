import React, { useState, useEffect } from 'react';
import { V3State, PersonaId, ScreenMode } from './types/v3';
import { INITIAL_V3_STATE, PERSONAS } from './constants/v3data';
import { PersonaSwitcher } from './components/v3/PersonaSwitcher';
import { OmgevingView } from './components/v3/OmgevingView';
import { DossierView } from './components/v3/DossierView';
import { EditorView } from './components/v3/EditorView';
import { DrukproefView } from './components/v3/DrukproefView';
import { Check } from 'lucide-react';

export const App: React.FC = () => {
  const [state, setState] = useState<V3State>(INITIAL_V3_STATE);

  const updateState = (patch: Partial<V3State>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  // Toast clear timer
  useEffect(() => {
    if (state.toast) {
      const timer = setTimeout(() => {
        updateState({ toast: '' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.toast]);

  const handleOpenDossier = (id: PersonaId) => {
    updateState({
      persona: id,
      screen: 'dossier',
      hasPhoto: id !== 'richard'
    });
  };

  const handleOpenEditor = (id: PersonaId) => {
    updateState({
      persona: id,
      screen: 'editor',
      theme: id === 'greet' ? 'stilte' : id === 'carien' ? 'dons' : 'gloed',
      photo: id === 'carien' ? 'vrijgezet' : 'volledig',
      hasPhoto: id !== 'richard'
    });
  };

  const handleOpenDrukproef = (id: PersonaId) => {
    updateState({
      persona: id,
      screen: 'drukproef',
      theme: id === 'greet' ? 'stilte' : id === 'carien' ? 'dons' : 'gloed',
      hasPhoto: true
    });
  };

  return (
    <div
      data-theme={state.darkTheme ? 'dark' : 'light'}
      className={`min-h-screen bg-[var(--background)] flex flex-col items-center selection:bg-[#c99f6c]/30 ${
        state.darkTheme ? 'dark' : ''
      }`}
    >
      {/* 360 Persona Switcher Floating Bar */}
      <PersonaSwitcher state={state} onUpdateState={updateState} />

      {/* Main Mobile App Frame */}
      <main className="w-full max-w-[480px] min-h-screen bg-[var(--background)] shadow-2xl relative flex flex-col transition-colors duration-300">
        {/* Screen 1: Omgeving / Portaal */}
        {state.screen === 'omgeving' && (
          <OmgevingView
            state={state}
            onUpdateState={updateState}
            onOpenDossier={handleOpenDossier}
            onOpenEditor={handleOpenEditor}
            onOpenDrukproef={handleOpenDrukproef}
          />
        )}

        {/* Screen 2: Dossier / Oplevermoment */}
        {state.screen === 'dossier' && (
          <DossierView
            state={state}
            onUpdateState={updateState}
            onBack={() => updateState({ screen: 'omgeving' })}
            onStartEditor={handleOpenEditor}
          />
        )}

        {/* Screen 3: Editor (Stap 2) */}
        {state.screen === 'editor' && (
          <EditorView
            state={state}
            onUpdateState={updateState}
            onBack={() => updateState({ screen: 'dossier' })}
            onGoToDrukproef={() => handleOpenDrukproef(state.persona)}
          />
        )}

        {/* Screen 4: Drukproef & Deelvarianten (Stap 3) */}
        {state.screen === 'drukproef' && (
          <DrukproefView
            state={state}
            onUpdateState={updateState}
            onBack={() => updateState({ screen: 'editor' })}
            onFinished={() => {
              updateState({
                screen: 'omgeving',
                toast: 'Kaartpakket verstuurd naar de uitvaartbegeleider!'
              });
            }}
          />
        )}

        {/* Global Toast Notification */}
        {state.toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150] px-4 py-2.5 rounded-full bg-[#1a1a1e] text-white text-[12.5px] font-medium shadow-2xl flex items-center gap-2 border border-white/10 animate-bounce">
            <Check size={14} className="text-emerald-400" />
            <span>{state.toast}</span>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
