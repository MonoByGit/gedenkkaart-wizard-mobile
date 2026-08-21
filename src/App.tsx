import React, { useState, useEffect } from 'react';

export const App: React.FC = () => {
  // Determine starting screen based on hash or default to portaal / dossier
  const [screen, setScreen] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['portaal', 'opleveren', 'wizard', 'drukproef'].includes(hash)) {
      return hash;
    }
    return 'opleveren'; // Starts at the delivery / oplevermoment or portaal
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (['portaal', 'opleveren', 'wizard', 'drukproef'].includes(h)) {
        setScreen(h);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectScreen = (s: string) => {
    window.location.hash = s;
    setScreen(s);
    setMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#fcfcfd] overflow-hidden flex flex-col">
      {/* Floating Menu Toggle for Testing (Subtle floating dot top-right) */}
      <div className="fixed top-2 right-2 z-[9999]">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 text-[#1a1a1e] flex items-center justify-center text-[10px] font-bold backdrop-blur-md transition-all cursor-pointer opacity-40 hover:opacity-100"
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '⋯'}
        </button>

        {/* Flyout Menu for switching stages without cluttering the screen */}
        {menuOpen && (
          <div className="absolute right-0 top-8 w-56 p-2 rounded-2xl bg-[rgba(26,26,30,0.95)] text-white shadow-2xl backdrop-blur-xl border border-white/10 flex flex-col gap-1 text-[12px] animate-fadeIn">
            <span className="px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#a1a1aa]">
              Direct naar scherm
            </span>
            {[
              { id: 'portaal', label: '1. Omgeving (Portaal)' },
              { id: 'opleveren', label: '2. Dossier (Oplevermoment)' },
              { id: 'wizard', label: '3. Editor (Stap 2)' },
              { id: 'drukproef', label: '4. Drukproef (Stap 3)' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectScreen(item.id)}
                className={`w-full px-3 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                  screen === item.id ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-[#d4d4d8]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pure 100% Edge-to-Edge Customer Screen */}
      <main className="w-full h-full flex-1 relative overflow-hidden bg-[#fcfcfd]">
        <iframe
          key={screen}
          src={`/${screen}.html`}
          title="Memortium Customer View"
          className="w-full h-full border-none bg-[#fcfcfd]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>
    </div>
  );
};

export default App;
