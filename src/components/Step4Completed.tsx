import React, { useEffect } from 'react';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface Step4CompletedProps {
  onRestart: () => void;
}

export const Step4Completed: React.FC<Step4CompletedProps> = ({ onRestart }) => {
  useEffect(() => {
    // Elegant soft celebratory confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#2d2d3a', '#c99f6c', '#6b6b7a', '#b6ac77', '#f0f1f4']
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  }, []);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-8 py-12 gap-5">
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 260 }}
        className="w-16 h-16 rounded-full bg-[#f0f1f4] flex items-center justify-center text-[#1a1a1e] shadow-sm mb-2"
      >
        <Check size={28} strokeWidth={2.5} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-[1.5rem] font-bold text-[#1a1a1e]"
      >
        De kaart is bevestigd
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="text-[0.9375rem] leading-relaxed text-[#6b6b7a] max-w-[34ch]"
      >
        Deze gaat zo in productie. U ontvangt een bevestiging zodra de kaarten klaar zijn.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        type="button"
        onClick={onRestart}
        className="mt-4 px-6 h-[52px] rounded-[999px] bg-[#f0f1f4] text-[#1a1a1e] font-medium text-[0.9375rem] hover:bg-[rgba(45,45,58,0.08)] transition-all cursor-pointer"
      >
        Terug naar het begin
      </motion.button>
    </div>
  );
};
