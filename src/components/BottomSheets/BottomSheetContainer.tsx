import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BottomSheetContainerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  children: React.ReactNode;
}

export const BottomSheetContainer: React.FC<BottomSheetContainerProps> = ({
  isOpen,
  onClose,
  title,
  category,
  children
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[95] flex justify-center items-end pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[rgba(26,26,30,0.4)] backdrop-blur-[2px] pointer-events-auto"
          />

          {/* Sheet Window */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-[480px] max-h-[85vh] bg-[#fcfcfd] rounded-t-[2rem] shadow-[0_25px_60px_rgba(0,0,0,0.18)] border-t border-[rgba(45,45,58,0.06)] overflow-y-auto px-6 pt-4 pb-12 pointer-events-auto flex flex-col"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Drag Handle */}
            <div className="w-9 h-1 rounded-full bg-[rgba(45,45,58,0.2)] mx-auto mb-4 shrink-0" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#6b6b7a] hover:text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.05)] transition-colors cursor-pointer"
            >
              <X size={19} />
            </button>

            {/* Header / Category */}
            {category && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block">
                {category}
              </span>
            )}
            {title && (
              <h2 className="mt-1 mb-6 text-[1.5rem] font-bold tracking-[-0.01em] text-[#1a1a1e]">
                {title}
              </h2>
            )}

            {/* Body content */}
            <div className="flex-1">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
