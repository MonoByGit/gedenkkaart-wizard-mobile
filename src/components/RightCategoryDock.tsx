import React from 'react';
import { motion } from 'framer-motion';
import {
  Image as ImageIcon,
  Palette,
  LayoutGrid,
  Type,
  Sparkles,
  BookOpen,
  MapPin,
  Users
} from 'lucide-react';
import { Side, ActiveDockCategory } from '../types/wizard';

interface DockItem {
  id: ActiveDockCategory;
  label: string;
  icon: React.ElementType;
  hint: string;
}

interface RightCategoryDockProps {
  side: Side;
  activeCategory: ActiveDockCategory;
  onSelectCategory: (cat: ActiveDockCategory) => void;
  disabled?: boolean;
}

export const RightCategoryDock: React.FC<RightCategoryDockProps> = ({
  side,
  activeCategory,
  onSelectCategory,
  disabled = false
}) => {
  // Context-aware categories per page
  const items: DockItem[] = React.useMemo(() => {
    if (side === 'voor') {
      return [
        { id: 'foto', label: 'Foto', icon: ImageIcon, hint: 'Portret of cut-out' },
        { id: 'thema', label: 'Thema', icon: Palette, hint: 'Achtergrondbeelden' },
        { id: 'indeling', label: 'Indeling', icon: LayoutGrid, hint: 'Compositie & marge' },
        { id: 'stijl', label: 'Stijl', icon: Type, hint: 'Lettertype combinaties' },
        { id: 'sfeer', label: 'Sfeer', icon: Sparkles, hint: 'Kleur- en sfeerfilters' }
      ];
    }
    if (side === 'binnen') {
      return [
        { id: 'indeling', label: 'Indeling', icon: LayoutGrid, hint: 'Paginaverdeling' },
        { id: 'tekst', label: 'Tekst', icon: BookOpen, hint: 'Gedicht & herinnering' },
        { id: 'praktisch', label: 'Praktisch', icon: MapPin, hint: 'Ceremonie & locatie' },
        { id: 'stijl', label: 'Stijl', icon: Type, hint: 'Lettertype combinaties' },
        { id: 'sfeer', label: 'Sfeer', icon: Sparkles, hint: 'Matte frosted sfeer' }
      ];
    }
    // Achterkant
    return [
      { id: 'familie', label: 'Familie', icon: Users, hint: 'Stamboom & inspringing' },
      { id: 'indeling', label: 'Indeling', icon: LayoutGrid, hint: '3-zone stamboom' },
      { id: 'stijl', label: 'Stijl', icon: Type, hint: 'Lettertype combinaties' },
      { id: 'sfeer', label: 'Sfeer', icon: Sparkles, hint: 'Achtergrond & contrast' }
    ];
  }, [side]);

  return (
    <nav
      aria-label="Aanpassingsopties"
      className="flex flex-col gap-2.5 items-center z-20 select-none"
    >
      {items.map((item) => {
        const isActive = activeCategory === item.id;
        const IconComponent = item.icon;

        return (
          <motion.button
            key={item.id}
            type="button"
            disabled={disabled}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              if (isActive) {
                // Keep open or toggle if needed
                onSelectCategory(item.id);
              } else {
                onSelectCategory(item.id);
              }
            }}
            title={item.hint}
            aria-label={`${item.label}: ${item.hint}`}
            aria-pressed={isActive}
            className={`relative flex flex-col items-center justify-center w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full transition-all duration-200 cursor-pointer ${
              disabled
                ? 'opacity-35 cursor-not-allowed bg-[#f0f1f4]'
                : isActive
                ? 'bg-[#1a1a1e] text-[#ffffff] shadow-[0_8px_20px_-4px_rgba(26,26,30,0.35)] ring-2 ring-offset-2 ring-[#1a1a1e]'
                : 'bg-[#ffffff]/90 hover:bg-[#ffffff] text-[#3e3e4a] hover:text-[#1a1a1e] border border-[rgba(45,45,58,0.12)] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)] hover:shadow-md'
            }`}
          >
            {/* Active Pill Glow */}
            {isActive && (
              <motion.div
                layoutId="activeDockGlow"
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1a1a1e] to-[#3a3a46] -z-10"
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              />
            )}

            <IconComponent
              size={18}
              strokeWidth={isActive ? 2.3 : 1.8}
              className="mb-0.5 transition-transform duration-200"
            />
            <span
              className={`text-[10.5px] leading-tight font-medium tracking-tight ${
                isActive ? 'text-[#ffffff] font-semibold' : 'text-[#525260]'
              }`}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
};
