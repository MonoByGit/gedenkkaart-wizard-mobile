import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#fcfcfd] overflow-hidden flex flex-col">
      <main className="w-full h-full flex-1 relative overflow-hidden bg-[#fcfcfd]">
        <iframe
          src="/Memortium Portaal.dc.html"
          title="Memortium 360 Customer Journey"
          className="w-full h-full border-none bg-[#fcfcfd]"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </main>
    </div>
  );
};

export default App;
