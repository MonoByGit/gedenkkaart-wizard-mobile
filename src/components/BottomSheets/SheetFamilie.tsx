import React from 'react';
import { ChevronDown, ChevronRight, X, Plus } from 'lucide-react';
import { FamilieLid } from '../../types/wizard';

interface SheetFamilieProps {
  geenNamenOpKaart: boolean;
  kopregel: string;
  familieNamen: FamilieLid[];
  samenvattendeRegel: string;
  bredereKring: string;
  deFamilies: string;
  onToggleGeenNamen: () => void;
  onChangeKopregel: (val: string) => void;
  onAddNaam: () => void;
  onRemoveNaam: (id: number) => void;
  onUpdateNaamVeld: (id: number, key: keyof FamilieLid, val: any) => void;
  onToggleOverleden: (id: number) => void;
  onIndentNaam: (id: number) => void;
  onOutdentNaam: (id: number) => void;
  onChangeSamenvattend: (val: string) => void;
  onChangeBredereKring: (val: string) => void;
  onChangeDeFamilies: (val: string) => void;
}

export const SheetFamilie: React.FC<SheetFamilieProps> = ({
  geenNamenOpKaart,
  kopregel,
  familieNamen,
  samenvattendeRegel,
  bredereKring,
  deFamilies,
  onToggleGeenNamen,
  onChangeKopregel,
  onAddNaam,
  onRemoveNaam,
  onUpdateNaamVeld,
  onToggleOverleden,
  onIndentNaam,
  onOutdentNaam,
  onChangeSamenvattend,
  onChangeBredereKring,
  onChangeDeFamilies
}) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Geen namen switch */}
      <div className="flex items-start gap-4 p-4 border border-[rgba(45,45,58,0.14)] rounded-[1.5rem] bg-[#fcfcfd]">
        <button
          type="button"
          role="switch"
          aria-checked={geenNamenOpKaart}
          onClick={onToggleGeenNamen}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            geenNamenOpKaart ? 'bg-[#2d2d3a]' : 'bg-[#e2e2e8]'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              geenNamenOpKaart ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
        <div>
          <span className="text-[0.9375rem] font-medium text-[#1a1a1e] block">
            Geen namen op de kaart
          </span>
          <span className="text-[0.8125rem] text-[#6b6b7a] block mt-0.5">
            Bij grote of samengestelde families is één regel soms passender.
          </span>
        </div>
      </div>

      {!geenNamenOpKaart && (
        <>
          {/* Kopregel */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
              Kopregel
            </label>
            <input
              type="text"
              value={kopregel}
              onChange={(e) => onChangeKopregel(e.target.value)}
              placeholder="Bijvoorbeeld: Dit melden u bedroefd:"
              className="w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all"
            />
          </div>

          {/* Namen lijst */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
              De namen
            </label>

            <div className="flex flex-col gap-3 mt-1">
              {familieNamen.map((lid, idx) => {
                const indented = !!lid.parentId;
                const parent = indented
                  ? familieNamen.find((p) => p.id === lid.parentId)
                  : null;

                let canIndent = false;
                if (!indented) {
                  for (let i = idx - 1; i >= 0; i--) {
                    if (!familieNamen[i].parentId) {
                      canIndent = true;
                      break;
                    }
                  }
                }

                return (
                    <div
                      key={lid.id}
                      className={`border rounded-[1.5rem] p-4 transition-all ${
                        indented
                          ? 'border-[#2d2d3a]/25 bg-[rgba(45,45,58,0.03)] ml-5 relative'
                          : 'border-[rgba(45,45,58,0.14)] bg-[#fcfcfd]'
                      }`}
                    >
                      {/* Tree connector indicator */}
                      {parent && (
                        <div className="flex items-center gap-1.5 text-[0.75rem] text-[#6b6b7a] mb-2.5 font-medium">
                          <span className="text-[#2d2d3a] font-bold">↳</span>
                          <span>Ingesprongen onder <strong className="text-[#1a1a1e] font-semibold">{parent.naam || 'bovenstaande naam'}</strong></span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {indented ? (
                          <button
                            type="button"
                            onClick={() => onOutdentNaam(lid.id)}
                            title="Plaats op gelijk niveau"
                            className="h-8 px-2.5 rounded-full border border-[rgba(45,45,58,0.16)] bg-white flex items-center gap-1 text-[0.75rem] font-medium text-[#4a4a58] hover:text-[#1a1a1e] shrink-0 cursor-pointer shadow-xs"
                          >
                            <ChevronRight size={13} />
                            <span>Naar links</span>
                          </button>
                        ) : canIndent ? (
                          <button
                            type="button"
                            onClick={() => onIndentNaam(lid.id)}
                            title="Inspringen als kind/gezinslid"
                            className="h-8 px-2.5 rounded-full border border-[rgba(45,45,58,0.16)] bg-white flex items-center gap-1 text-[0.75rem] font-medium text-[#4a4a58] hover:text-[#1a1a1e] shrink-0 cursor-pointer shadow-xs"
                          >
                            <ChevronDown size={13} />
                            <span>Inspringen</span>
                          </button>
                        ) : null}

                        <div className="flex-1">
                          <input
                            type="text"
                            value={lid.naam}
                            onChange={(e) =>
                              onUpdateNaamVeld(lid.id, 'naam', e.target.value)
                            }
                            placeholder={indented ? "Naam kind / gezinslid" : "Voor- en achternaam"}
                            className="w-full h-[46px] px-4 rounded-[23px] bg-[#ffffff] border border-[rgba(45,45,58,0.12)] text-[0.9375rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a]"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveNaam(lid.id)}
                          aria-label="Verwijderen"
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[#6b6b7a] hover:text-[#943d3d] shrink-0 cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={lid.relatie}
                            onChange={(e) =>
                              onUpdateNaamVeld(lid.id, 'relatie', e.target.value)
                            }
                            placeholder="Relatie (bijv. echtgenoot, zoon, etc.)"
                            className="w-full h-[38px] px-3.5 rounded-[19px] bg-[#ffffff] border border-[rgba(45,45,58,0.1)] text-[0.875rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a]"
                          />
                        </div>

                        <label className="flex items-center gap-2 text-[0.8125rem] text-[#1a1a1e] cursor-pointer shrink-0">
                          <input
                            type="checkbox"
                            checked={lid.overleden}
                            onChange={() => onToggleOverleden(lid.id)}
                            className="w-4 h-4 rounded text-[#2d2d3a] border-[rgba(45,45,58,0.2)] focus:ring-0 cursor-pointer"
                          />
                          <span>Overleden (†)</span>
                        </label>
                      </div>
                    </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={onAddNaam}
              className="mt-2 flex items-center gap-1.5 text-[0.9375rem] font-medium text-[#1a1a1e] hover:opacity-75 transition-opacity cursor-pointer text-left py-2"
            >
              <Plus size={16} />
              <span>Naam toevoegen</span>
            </button>
          </div>

          {/* Samenvattende regel */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
              Samenvattende regel
            </label>
            <input
              type="text"
              value={samenvattendeRegel}
              onChange={(e) => onChangeSamenvattend(e.target.value)}
              placeholder="Bijvoorbeeld: broers en zussen"
              className="w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all"
            />
          </div>

          {/* Bredere kring */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
              Bredere kring
            </label>
            <input
              type="text"
              value={bredereKring}
              onChange={(e) => onChangeBredereKring(e.target.value)}
              placeholder="Bijvoorbeeld: haar zus, schoonbroers, neven en nichten"
              className="w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all"
            />
          </div>

          {/* De families */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
              De families
            </label>
            <input
              type="text"
              value={deFamilies}
              onChange={(e) => onChangeDeFamilies(e.target.value)}
              placeholder="Bijvoorbeeld: de families Bakker en Steenhaut"
              className="w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border border-[rgba(45,45,58,0.14)] text-[1rem] text-[#1a1a1e] placeholder:text-[#6b6b7a] focus:outline-none focus:border-[#2d2d3a] transition-all"
            />
          </div>
        </>
      )}
    </div>
  );
};
