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
          {/* Subtle clean backdrop (allows top card preview to remain sharp and visible) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/15 pointer-events-auto"
          />

          {/* Sheet Window: 52vh height for balanced 50/50 view with top preview */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full max-w-[480px] h-[52vh] max-h-[52vh] bg-[#fcfcfd] rounded-t-[2rem] shadow-[0_-10px_35px_rgba(0,0,0,0.12)] border-t border-[rgba(45,45,58,0.08)] overflow-y-auto px-6 pt-3.5 pb-10 pointer-events-auto flex flex-col"
            style={{ overscrollBehavior: 'contain' }}
          >
            {/* Drag Handle */}
            <div className="w-9 h-1 rounded-full bg-[rgba(45,45,58,0.2)] mx-auto mb-3 shrink-0" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="absolute top-4 right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#6b6b7a] hover:text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.06)] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header / Category */}
            {category && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a] block">
                {category}
              </span>
            )}
            {title && (
              <h2 className="mt-0.5 mb-4 text-[1.35rem] font-bold tracking-[-0.01em] text-[#1a1a1e]">
                {title}
              </h2>
            )}

            {/* Body content */}
            <div className="flex-1 pb-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
