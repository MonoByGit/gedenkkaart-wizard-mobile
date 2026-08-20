import React from 'react';
import { Sparkles, Plus, Trash2, ArrowRight, BookOpen, Clock, Heart } from 'lucide-react';
import { PersonaDef, SavedCreation, WizardState } from '../types/wizard';
import { PERSONAS, THEMES } from '../constants/wizard';
import { CardPreview } from './CardPreview';

interface HomeScreenProps {
  creations: SavedCreation[];
  onSelectPersona: (persona: PersonaDef) => void;
  onOpenCreation: (creation: SavedCreation) => void;
  onDeleteCreation: (id: string) => void;
  onDuplicateCreation: (creation: SavedCreation) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  creations,
  onSelectPersona,
  onOpenCreation,
  onDeleteCreation,
  onDuplicateCreation
}) => {
  return (
    <div className="flex flex-col min-h-screen pb-20 select-none bg-[var(--surface-page-image)]">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f1f4] text-[#1a1a1e] text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
          <Heart size={12} className="text-[#1a1a1e]" />
          <span>Memortium Studio</span>
        </div>
        <h1 className="text-[1.85rem] font-bold tracking-tight text-[#1a1a1e] leading-tight">
          Gedenkkaart Wizard
        </h1>
        <p className="mt-2 text-[0.9375rem] text-[#6b6b7a] max-w-[34ch] mx-auto leading-relaxed">
          Kies een persoon om direct te testen, of open een van de opgeslagen kaartcreaties.
        </p>
      </div>

      {/* 1. Kies een test-persona */}
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
            Kies een testpersoon (3 Persona's)
          </span>
          <span className="text-[0.75rem] text-[#6b6b7a]">Volledig ingevuld</span>
        </div>

        <div className="flex flex-col gap-3.5">
          {PERSONAS.map((persona) => (
            <div
              key={persona.id}
              onClick={() => onSelectPersona(persona)}
              className="group p-4 bg-[#ffffff] rounded-[1.75rem] border border-[rgba(45,45,58,0.1)] hover:border-[#2d2d3a] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.12)] transition-all cursor-pointer flex gap-4 items-center"
            >
              {/* Avatar / Portrait thumbnail */}
              <div className="relative w-16 h-20 rounded-[1.25rem] overflow-hidden bg-[#f0f1f4] shrink-0 border border-[rgba(45,45,58,0.08)]">
                <img
                  src={persona.photoVolledigUrl}
                  alt={persona.naam}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[1.05rem] text-[#1a1a1e] truncate">
                    {persona.naam}
                  </h3>
                </div>
                <p className="text-[0.8125rem] text-[#6b6b7a] line-clamp-2 mt-0.5 leading-snug">
                  {persona.tagline}
                </p>

                <div className="flex items-center gap-3 mt-2 text-[0.75rem] text-[#1a1a1e] font-medium">
                  <span className="inline-flex items-center gap-1 text-[#2d2d3a]">
                    <Sparkles size={12} />
                    <span>Start wizard</span>
                  </span>
                  <span className="text-[#6b6b7a]">•</span>
                  <span className="text-[#6b6b7a]">Foto &amp; Cutout</span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#f0f1f4] group-hover:bg-[#2d2d3a] group-hover:text-white flex items-center justify-center text-[#1a1a1e] transition-colors shrink-0">
                <ArrowRight size={15} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Opgeslagen Creaties / Gallery */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
            Opgeslagen Samenstellingen ({creations.length})
          </span>
          <span className="text-[0.75rem] text-[#6b6b7a]">Bewaard op dit toestel</span>
        </div>

        {creations.length === 0 ? (
          <div className="p-8 text-center bg-[#ffffff] rounded-[1.75rem] border border-[rgba(45,45,58,0.1)] text-[#6b6b7a]">
            <BookOpen size={24} className="mx-auto mb-2 opacity-40" />
            <p className="text-[0.875rem]">Nog geen opgeslagen kaarten.</p>
            <p className="text-[0.75rem] mt-1 opacity-70">
              Kies hierboven een persoon en sla uw eerste ontwerp op.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {creations.map((c) => {
              const theme = THEMES.find((t) => t.id === c.state.thema);
              return (
                <div
                  key={c.id}
                  className="bg-[#ffffff] rounded-[1.75rem] border border-[rgba(45,45,58,0.1)] p-4 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)] flex gap-4 items-center"
                >
                  {/* Card Mini Preview */}
                  <div
                    onClick={() => onOpenCreation(c)}
                    className="w-20 aspect-[397/559] rounded-[0.75rem] overflow-hidden shrink-0 cursor-pointer shadow-sm hover:scale-[1.02] transition-transform"
                  >
                    <CardPreview state={c.state} interactive={false} isMini={true} />
                  </div>

                  {/* Creation Details */}
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => onOpenCreation(c)}
                      className="font-bold text-[0.9375rem] text-[#1a1a1e] truncate cursor-pointer hover:underline"
                    >
                      {c.title || c.state.naam}
                    </h4>

                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#f0f1f4] text-[#1a1a1e] text-[10px] font-medium capitalize">
                        {c.state.formaat}
                      </span>
                      {theme && (
                        <span className="px-2 py-0.5 rounded-full bg-[#f0f1f4] text-[#6b6b7a] text-[10px] font-medium">
                          {theme.naam}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full bg-[rgba(45,45,58,0.04)] text-[#6b6b7a] text-[10px]">
                        {c.createdAt}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => onOpenCreation(c)}
                        className="text-[0.8125rem] font-bold text-[#1a1a1e] hover:opacity-75 cursor-pointer flex items-center gap-1"
                      >
                        <span>Openen</span>
                        <ArrowRight size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDuplicateCreation(c)}
                        className="text-[0.8125rem] text-[#6b6b7a] hover:text-[#1a1a1e] cursor-pointer"
                      >
                        Kopiëren
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteCreation(c.id)}
                        aria-label="Verwijderen"
                        className="text-[#6b6b7a] hover:text-[#943d3d] cursor-pointer ml-auto p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
