import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { CardPreview } from '../CardPreview';
import { WizardState, Side } from '../../types/wizard';

interface ModalLightboxProps {
  isOpen: boolean;
  state: WizardState;
  onClose: () => void;
  onSetSide?: (side: Side) => void;
}

export const ModalLightbox: React.FC<ModalLightboxProps> = ({
  isOpen,
  state,
  onClose,
  onSetSide
}) => {
  const isGevouwen = state.formaat === 'gevouwen';
  const sides: Side[] = isGevouwen ? ['voor', 'binnen', 'achter'] : ['voor', 'achter'];
  const currentIndex = sides.indexOf(state.side);

  const goToNext = () => {
    if (!onSetSide) return;
    const nextIndex = (currentIndex + 1) % sides.length;
    onSetSide(sides[nextIndex]);
  };

  const goToPrev = () => {
    if (!onSetSide) return;
    const prevIndex = (currentIndex - 1 + sides.length) % sides.length;
    onSetSide(sides[prevIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, currentIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-between p-4 sm:p-6 bg-[rgba(15,13,18,0.88)] backdrop-blur-lg select-none cursor-zoom-out"
        >
          {/* Top Bar inside Lightbox */}
          <div
            className="w-full max-w-[420px] flex items-center justify-between z-20 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Page Pill Selector */}
            <div className="flex bg-white/15 backdrop-blur-md rounded-full p-1 gap-1 shadow-md">
              {sides.map((side) => {
                const isSelected = state.side === side;
                const labels: Record<Side, string> = {
                  voor: 'Voorkant',
                  binnen: 'Binnenzijde',
                  achter: 'Achterkant'
                };
                return (
                  <button
                    key={side}
                    type="button"
                    onClick={() => onSetSide?.(side)}
                    className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black shadow-sm font-semibold'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {labels[side]}
                  </button>
                );
              })}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
            >
              <X size={18} />
            </button>
          </div>

          {/* Center Card Canvas with swipe gestures */}
          <div
            className="relative flex items-center justify-center w-full max-w-[380px] my-auto cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Arrow */}
            {sides.length > 1 && (
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Vorige pagina"
                className="hidden sm:flex absolute -left-12 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white items-center justify-center backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Swipeable Card container */}
            <motion.div
              key={state.side}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50 || velocity.x < -400) {
                  goToNext();
                } else if (swipe > 50 || velocity.x > 400) {
                  goToPrev();
                }
              }}
              initial={{ scale: 0.92, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.92, opacity: 0, x: -20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="w-full touch-pan-y"
            >
              <CardPreview state={state} interactive={false} />
            </motion.div>

            {/* Next Arrow */}
            {sides.length > 1 && (
              <button
                type="button"
                onClick={goToNext}
                aria-label="Volgende pagina"
                className="hidden sm:flex absolute -right-12 z-20 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white items-center justify-center backdrop-blur-sm transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Bottom Swipe Hint */}
          <div
            className="text-white/60 text-[11px] font-medium flex items-center gap-2 cursor-default z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span>← Swipe naar links of rechts om te bladeren →</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
