import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DialogLockProps {
  isOpen: boolean;
  isLocked: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DialogLock: React.FC<DialogLockProps> = ({
  isOpen,
  isLocked,
  onClose,
  onConfirm
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[101] flex items-end justify-center pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(26,26,30,0.4)] backdrop-blur-[2px] pointer-events-auto"
          />

          {/* Dialog Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="w-full max-w-[480px] bg-[#fcfcfd] rounded-t-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.18)] p-7 pb-10 flex flex-col gap-3 pointer-events-auto z-10 border-t border-[rgba(45,45,58,0.06)]"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
              {isLocked ? 'Ontgrendelen' : 'Vastzetten'}
            </span>
            <h2 className="text-[1.5rem] font-bold tracking-[-0.01em] text-[#1a1a1e]">
              {isLocked ? 'Ontwerp weer openen?' : 'Ontwerp vastzetten?'}
            </h2>
            <p className="text-[1rem] text-[#1a1a1e] leading-relaxed">
              {isLocked
                ? 'De familie kan dan opnieuw thema, indeling en stijl aanpassen.'
                : 'De familie past dan alleen nog de woorden op de kaart aan.'}
            </p>

            <div className="flex gap-2.5 mt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-[52px] rounded-[999px] bg-[#f0f1f4] text-[#1a1a1e] font-medium text-[0.9375rem] hover:bg-[rgba(45,45,58,0.08)] transition-all cursor-pointer"
              >
                Annuleren
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 h-[52px] rounded-[999px] bg-[#1a1a1e] text-[#fcfcfd] font-bold text-[0.9375rem] hover:opacity-90 transition-all cursor-pointer shadow-md"
              >
                {isLocked ? 'Openen' : 'Vastzetten'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
