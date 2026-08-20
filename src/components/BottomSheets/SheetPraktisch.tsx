import React from 'react';

interface SheetPraktischProps {
  locatieTekst: string;
  datumTijdTekst: string;
  samenzijnTekst: string;
  inzamelingTekst: string;
  onChangeLocatie: (val: string) => void;
  onChangeDatumTijd: (val: string) => void;
  onChangeSamenzijn: (val: string) => void;
  onChangeInzameling: (val: string) => void;
}

export const SheetPraktisch: React.FC<SheetPraktischProps> = ({
  locatieTekst,
  datumTijdTekst,
  samenzijnTekst,
  inzamelingTekst,
  onChangeLocatie,
  onChangeDatumTijd,
  onChangeSamenzijn,
  onChangeInzameling
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Locatie */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Locatie &amp; adres
        </label>
        <textarea
          rows={2}
          value={locatieTekst}
          onChange={(e) => onChangeLocatie(e.target.value)}
          placeholder="Naam van de locatie, straat, postcode en plaats"
          className="w-full p-4 rounded-[1.5rem] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all leading-snug"
        />
      </div>

      {/* Datum & Tijd */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Datum &amp; tijd
        </label>
        <input
          type="text"
          value={datumTijdTekst}
          onChange={(e) => onChangeDatumTijd(e.target.value)}
          placeholder="Bijvoorbeeld: donderdag 28 augustus 2026, 14:00 uur"
          className="w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all"
        />
      </div>

      {/* Samenzijn */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Uitnodiging tot samenzijn
        </label>
        <textarea
          rows={2}
          value={samenzijnTekst}
          onChange={(e) => onChangeSamenzijn(e.target.value)}
          placeholder="Bijvoorbeeld: Na de plechtigheid is er gelegenheid tot samenzijn"
          className="w-full p-4 rounded-[1.5rem] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all leading-snug"
        />
      </div>

      {/* Inzameling */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Inzameling of goed doel
        </label>
        <textarea
          rows={2}
          value={inzamelingTekst}
          onChange={(e) => onChangeInzameling(e.target.value)}
          placeholder="Bijvoorbeeld: In plaats van bloemen graag een bijdrage aan het Longfonds"
          className="w-full p-4 rounded-[1.5rem] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all leading-snug"
        />
      </div>
    </div>
  );
};
