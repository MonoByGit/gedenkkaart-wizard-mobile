import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { CardPreview } from '../CardPreview';
import { WizardState } from '../../types/wizard';

interface ModalLightboxProps {
  isOpen: boolean;
  state: WizardState;
  onClose: () => void;
}

export const ModalLightbox: React.FC<ModalLightboxProps> = ({
  isOpen,
  state,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(26,26,30,0.8)] backdrop-blur-md"
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Sluiten"
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.92)] shadow-lg flex items-center justify-center text-[#1a1a1e] hover:bg-[#ffffff] transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Card display */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[360px]"
          >
            <CardPreview state={state} interactive={false} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
