import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Image as ImageIcon, Layout, Grid, SplitSquareVertical, BookOpen, Layers } from 'lucide-react';
import {
  WizardState,
  ActiveDockCategory,
  Side,
  Indeling,
  FontPairingId,
  SfeerId,
  Smaak,
  SizeOption
} from '../types/wizard';
import { THEMES, PAIRINGS, SFEREN, MAX_BINNEN } from '../constants/wizard';

interface BottomOptionCarouselProps {
  state: WizardState;
  activeCategory: ActiveDockCategory;
  side: Side;
  onUpdateState: (patch: Partial<WizardState>) => void;
  onOpenSheet?: (sheet: any) => void;
}

export const BottomOptionCarousel: React.FC<BottomOptionCarouselProps> = ({
  state: s,
  activeCategory,
  side,
  onUpdateState
}) => {
  // If no category is selected, default to a sensible one based on side
  const currentCategory = activeCategory || (side === 'voor' ? 'foto' : side === 'binnen' ? 'tekst' : 'familie');

  return (
    <div className="w-full bg-[#ffffff]/95 backdrop-blur-md border-t border-[rgba(45,45,58,0.08)] py-3 px-3 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.06)] select-none">
      <AnimatePresence mode="wait">
        {/* ================= FOTO ================= */}
        {currentCategory === 'foto' && (
          <motion.div
            key="foto"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-stretch gap-2.5 overflow-x-auto py-1 px-1 scrollbar-none"
          >
            {/* Volledige foto */}
            <button
              type="button"
              onClick={() => onUpdateState({ smaak: 'volledige-foto' })}
              className={`flex-shrink-0 flex flex-col rounded-[1.15rem] bg-white overflow-hidden text-center w-[120px] transition-all cursor-pointer shadow-sm ${
                s.smaak === 'volledige-foto'
                  ? 'border-[1.5px] border-[#1a1a1e] shadow-md ring-1 ring-[#1a1a1e]/20'
                  : 'border border-[rgba(45,45,58,0.12)] hover:border-[rgba(45,45,58,0.25)]'
              }`}
            >
              <div className="relative w-full aspect-[3/4] bg-[#2d2d3a] overflow-hidden">
                <img
                  src={s.photoVolledigUrl || '/assets/persons/Nana_After_Portrait.jpg'}
                  alt="Volledige foto"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {s.smaak === 'volledige-foto' && (
                  <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 rounded-full bg-[#1a1a1e] text-white flex items-center justify-center shadow-md">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="py-2 px-1">
                <span className="text-[12px] font-medium text-[#1a1a1e] block truncate">
                  Volledige foto
                </span>
              </div>
            </button>

            {/* Vrijgezet op thema */}
            <button
              type="button"
              onClick={() => onUpdateState({ smaak: 'vrijgezet' })}
              className={`flex-shrink-0 flex flex-col rounded-[1.15rem] bg-white overflow-hidden text-center w-[120px] transition-all cursor-pointer shadow-sm ${
                s.smaak === 'vrijgezet'
                  ? 'border-[1.5px] border-[#1a1a1e] shadow-md ring-1 ring-[#1a1a1e]/20'
                  : 'border border-[rgba(45,45,58,0.12)] hover:border-[rgba(45,45,58,0.25)]'
              }`}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden checkerboard-pattern">
                <img
                  src={s.photoCutoutUrl || '/assets/persons/Nana_After_Portrait_cutout.png'}
                  alt="Vrijgezet op thema"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                {s.smaak === 'vrijgezet' && (
                  <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 rounded-full bg-[#1a1a1e] text-white flex items-center justify-center shadow-md">
                    <Check size={11} strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="py-2 px-1">
                <span className="text-[12px] font-medium text-[#1a1a1e] block truncate">
                  Vrijgezet op thema
                </span>
              </div>
            </button>
          </motion.div>
        )}

        {/* ================= THEMA ================= */}
        {currentCategory === 'thema' && (
          <motion.div
            key="thema"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-stretch gap-3 overflow-x-auto py-2 px-1 scrollbar-none"
          >
            {/* Geen thema / Pure foto sfeer */}
            <button
              type="button"
              onClick={() => onUpdateState({ thema: null })}
              className={`flex-shrink-0 flex flex-col rounded-[1.25rem] bg-white overflow-hidden text-left w-[145px] transition-all cursor-pointer shadow-sm ${
                s.thema === null
                  ? 'border-2 border-[#1a1a1e] shadow-md ring-1 ring-[#1a1a1e]'
                  : 'border border-[rgba(45,45,58,0.12)] hover:border-[rgba(45,45,58,0.28)]'
              }`}
            >
              <div className="relative w-full h-[85px] bg-[#eef0f3] overflow-hidden">
                <img
                  src={s.photoVolledigUrl || '/assets/persons/Nana_After_Portrait.jpg'}
                  alt="Foto sfeer"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 20%' }}
                />
                {s.thema === null && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#1a1a1e] text-white flex items-center justify-center shadow-md">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <span className="text-[13px] font-semibold text-[#1a1a1e] block truncate">
                  Foto sfeer
                </span>
                <span className="text-[10.5px] text-[#6b6b7a] block leading-tight mt-0.5 line-clamp-2">
                  Originele ambiance behouden
                </span>
              </div>
            </button>

            {/* Curated Theme Cards */}
            {THEMES.map((t) => {
              const isSelected = s.thema === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onUpdateState({ thema: t.id })}
                  className={`flex-shrink-0 flex flex-col rounded-[1.25rem] bg-white overflow-hidden text-left w-[145px] transition-all cursor-pointer shadow-sm ${
                    isSelected
                      ? 'border-2 border-[#1a1a1e] shadow-md ring-1 ring-[#1a1a1e]'
                      : 'border border-[rgba(45,45,58,0.12)] hover:border-[rgba(45,45,58,0.28)]'
                  }`}
                >
                  <div
                    className="relative w-full h-[85px] overflow-hidden"
                    style={{ background: t.bg }}
                  >
                    {isSelected && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#1a1a1e] text-white flex items-center justify-center shadow-md">
                        <Check size={12} strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <span className="text-[13px] font-semibold text-[#1a1a1e] block truncate">
                      {t.naam}
                    </span>
                    <span className="text-[10.5px] text-[#6b6b7a] block leading-tight mt-0.5 line-clamp-2">
                      {t.mood}
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* ================= INDELING ================= */}
        {currentCategory === 'indeling' && (
          <motion.div
            key="indeling"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1 scrollbar-none"
          >
            {[
              {
                id: 'volledig',
                label: 'Volledig',
                sublabel: 'Paginagroot portret',
                icon: Layout
              },
              {
                id: 'kader',
                label: 'In kader',
                sublabel: 'Passe-partout rand',
                icon: Grid
              },
              {
                id: 'naast-tekst',
                label: 'Duo / Half',
                sublabel: 'Boven beeld, onder tekst',
                icon: SplitSquareVertical
              },
              {
                id: 'sfeer-voorop',
                label: 'Sfeer voorop',
                sublabel: 'Portret binnenzijde',
                icon: Layers
              }
            ].map((layout) => {
              const isSelected = s.indeling === layout.id;
              const IconComp = layout.icon;
              return (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => onUpdateState({ indeling: layout.id as Indeling })}
                  className={`flex-shrink-0 flex items-center gap-2.5 py-2.5 px-3 rounded-[1.25rem] transition-all cursor-pointer min-w-[140px] ${
                    isSelected
                      ? 'bg-[#1a1a1e] text-white shadow-md ring-2 ring-[#1a1a1e]'
                      : 'bg-[#f4f5f8] text-[#1a1a1e] hover:bg-[#eaecef]'
                  }`}
                >
                  <div
                    className={`w-9 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-white text-[#2d2d3a] shadow-sm'
                    }`}
                  >
                    <IconComp size={18} strokeWidth={isSelected ? 2.3 : 1.8} />
                  </div>
                  <div className="text-left">
                    <div className="text-[12px] font-semibold flex items-center gap-1">
                      {layout.label}
                      {isSelected && <Check size={13} className="text-emerald-400" strokeWidth={3} />}
                    </div>
                    <div className={`text-[10px] leading-tight ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                      {layout.sublabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* ================= STIJL ================= */}
        {currentCategory === 'stijl' && (
          <motion.div
            key="stijl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1 scrollbar-none"
          >
            {PAIRINGS.map((p) => {
              const isSelected = s.fontPairing === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onUpdateState({ fontPairing: p.id as FontPairingId })}
                  className={`flex-shrink-0 flex flex-col justify-between p-2.5 rounded-[1.25rem] w-[130px] h-[86px] transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#1a1a1e] text-white shadow-md ring-2 ring-[#1a1a1e]'
                      : 'bg-[#f4f5f8] text-[#1a1a1e] hover:bg-[#eaecef]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold truncate">{p.label}</span>
                      {isSelected && <Check size={12} className="text-emerald-400" strokeWidth={3} />}
                    </div>
                    <p
                      className={`text-[13px] leading-snug line-clamp-1 mt-1 ${
                        isSelected ? 'text-gray-200' : 'text-gray-800'
                      }`}
                      style={{ fontFamily: p.naamFamily, fontWeight: p.naamWeight }}
                    >
                      {s.naam ? s.naam.split(' ')[0] : 'Johanna'}
                    </p>
                  </div>
                  <span className={`text-[9.5px] truncate ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
                    {p.pairingDescription}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* ================= SFEER ================= */}
        {currentCategory === 'sfeer' && (
          <motion.div
            key="sfeer"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2.5 overflow-x-auto pb-1 px-1 scrollbar-none"
          >
            {SFEREN.map((sf) => {
              const isSelected = s.sfeer === sf.id;
              return (
                <button
                  key={sf.id}
                  type="button"
                  onClick={() => {
                    const patch: Partial<WizardState> = { sfeer: sf.id as SfeerId };
                    if (sf.scrimMode === 'licht') patch.uitstraling = 'licht';
                    else if (sf.scrimMode === 'donker') patch.uitstraling = 'donker';
                    else patch.uitstraling = 'automatisch';
                    onUpdateState(patch);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2.5 py-2.5 px-3 rounded-[1.25rem] transition-all cursor-pointer min-w-[136px] ${
                    isSelected
                      ? 'bg-[#1a1a1e] text-white shadow-md ring-2 ring-[#1a1a1e]'
                      : 'bg-[#f4f5f8] text-[#1a1a1e] hover:bg-[#eaecef]'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                    style={{ background: sf.swatch }}
                  >
                    {isSelected && <Check size={14} className="text-white drop-shadow-md" strokeWidth={3} />}
                  </div>
                  <div className="text-left">
                    <div className="text-[12px] font-semibold leading-tight">{sf.label}</div>
                    <div className={`text-[10px] leading-tight truncate max-w-[85px] ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                      {sf.sublabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* ================= TEKST (Inline Editor) ================= */}
        {currentCategory === 'tekst' && (
          <motion.div
            key="tekst"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2.5 px-1 max-w-lg mx-auto"
          >
            {side === 'voor' ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={s.naam}
                  onChange={(e) => onUpdateState({ naam: e.target.value })}
                  placeholder="Volledige naam overledene"
                  className="w-full h-10 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[13px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
                />
                <input
                  type="text"
                  value={s.spreuk}
                  onChange={(e) => onUpdateState({ spreuk: e.target.value })}
                  placeholder="Korte spreuk of herinneringszin"
                  className="w-full h-10 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[13px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <textarea
                  rows={2}
                  value={s.binnenTekst}
                  maxLength={MAX_BINNEN[s.sizes.binnen]}
                  onChange={(e) => onUpdateState({ binnenTekst: e.target.value })}
                  placeholder="Gedicht of persoonlijke herinnering..."
                  className="w-full p-2.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[13px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e] resize-none"
                />
                <input
                  type="text"
                  value={s.afsluitingTekst}
                  onChange={(e) => onUpdateState({ afsluitingTekst: e.target.value })}
                  placeholder="Afsluiting (bijv. In liefdevolle herinnering)"
                  className="w-full h-9 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[12px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
                />
              </div>
            )}
          </motion.div>
        )}

        {/* ================= PRAKTISCH (Inline Editor) ================= */}
        {currentCategory === 'praktisch' && (
          <motion.div
            key="praktisch"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2 px-1 max-w-lg mx-auto"
          >
            <input
              type="text"
              value={s.datumTijdTekst}
              onChange={(e) => onUpdateState({ datumTijdTekst: e.target.value })}
              placeholder="Datum &amp; tijd ceremonie"
              className="w-full h-9 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[12.5px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
            />
            <input
              type="text"
              value={s.locatieTekst}
              onChange={(e) => onUpdateState({ locatieTekst: e.target.value })}
              placeholder="Locatie &amp; adres"
              className="w-full h-9 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[12.5px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
            />
          </motion.div>
        )}

        {/* ================= FAMILIE (Inline Editor) ================= */}
        {currentCategory === 'familie' && (
          <motion.div
            key="familie"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2 px-1 max-w-lg mx-auto"
          >
            <input
              type="text"
              value={s.kopregel}
              onChange={(e) => onUpdateState({ kopregel: e.target.value })}
              placeholder="Kopregel (bijv. Bedroefd, maar dankbaar:)"
              className="w-full h-9 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[12.5px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
            />
            <input
              type="text"
              value={s.samenvattendeRegel}
              onChange={(e) => onUpdateState({ samenvattendeRegel: e.target.value })}
              placeholder="Slotregel (bijv. kinderen en kleinkinderen)"
              className="w-full h-9 px-3.5 rounded-xl bg-[#f4f5f8] border border-[rgba(45,45,58,0.12)] text-[12.5px] text-[#1a1a1e] focus:bg-white focus:outline-none focus:border-[#1a1a1e]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
