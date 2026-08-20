import React, { useEffect } from 'react';
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
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[rgba(20,17,22,0.85)] backdrop-blur-md cursor-zoom-out select-none"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Sluiten"
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.92)] shadow-lg flex items-center justify-center text-[#1a1a1e] hover:bg-[#ffffff] active:scale-95 transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Card display */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-[360px] cursor-default"
          >
            <CardPreview state={state} interactive={false} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
