import React from 'react';

export const App: React.FC = () => {
  const [screen, setScreen] = React.useState<'portaal' | 'opleveren' | 'wizard' | 'drukproef'>('wizard');

  const screens = [
    { id: 'portaal', label: '1. Omgeving (Portaal)', path: '/portaal.html' },
    { id: 'opleveren', label: '2. Dossier (Opleveren)', path: '/opleveren.html' },
    { id: 'wizard', label: '3. Editor (Wizard)', path: '/wizard.html' },
    { id: 'drukproef', label: '4. Drukproef (Stap 3)', path: '/drukproef.html' }
  ] as const;

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0c0c0f] flex flex-col items-center overflow-hidden">
      {/* Top Floating Master Navigation */}
      <header className="w-full bg-[rgba(26,26,30,0.95)] backdrop-blur-xl text-[#fcfcfd] border-b border-[rgba(255,255,255,0.1)] shadow-xl z-50 flex-none select-none">
        <div className="max-w-[1200px] mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a1a1aa]">
              Memortium V3
            </span>
          </div>

          {/* Screen Navigation */}
          <div className="flex items-center gap-1 bg-[rgba(255,255,255,0.08)] rounded-full p-1 border border-[rgba(255,255,255,0.06)] overflow-x-auto mem-scroll">
            {screens.map((s) => {
              const on = screen === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setScreen(s.id)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                    on
                      ? 'bg-white text-[#1a1a1e] font-bold shadow-sm'
                      : 'text-[#d4d4d8] hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Native Interactive Claude Designer App Frame */}
      <main className="w-full flex-1 relative flex items-center justify-center bg-[#0c0c0f] overflow-hidden">
        <iframe
          key={screen}
          src={`/${screen}.html`}
          title="Memortium V3 Design"
          className="w-full h-full border-none bg-[#e7e7ea]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>
    </div>
  );
};

export default App;
