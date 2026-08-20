import React, { useState } from 'react';
import { Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { SizeOption } from '../../types/wizard';
import { MONTHS, formatDateDutch } from '../../constants/wizard';

interface SheetDataProps {
  dataGeboorte: string;
  dataOverlijden: string;
  size: SizeOption;
  onChangeGeboorte: (val: string) => void;
  onChangeOverlijden: (val: string) => void;
  onChangeSize: (size: SizeOption) => void;
}

export const SheetData: React.FC<SheetDataProps> = ({
  dataGeboorte,
  dataOverlijden,
  size,
  onChangeGeboorte,
  onChangeOverlijden,
  onChangeSize
}) => {
  const [openPicker, setOpenPicker] = useState<'geboorte' | 'overlijden' | null>(null);
  const todayIso = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const [pickerMonthGeboorte, setPickerMonthGeboorte] = useState<string>(
    (dataGeboorte || '1938-03-12').slice(0, 7)
  );
  const [pickerMonthOverlijden, setPickerMonthOverlijden] = useState<string>(
    (dataOverlijden || todayIso()).slice(0, 7)
  );

  const shiftMonth = (key: 'geboorte' | 'overlijden', delta: number) => {
    const current = key === 'geboorte' ? pickerMonthGeboorte : pickerMonthOverlijden;
    const [y, m] = current.split('-').map(Number);
    const nextDate = new Date(y, m - 1 + delta, 1);
    const nextIso = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}`;
    if (key === 'geboorte') setPickerMonthGeboorte(nextIso);
    else setPickerMonthOverlijden(nextIso);
  };

  const buildCalendarDays = (monthIso: string, selectedIso: string, onSelect: (iso: string) => void) => {
    const [y, m] = monthIso.split('-').map(Number);
    const startOffset = (new Date(y, m - 1, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(y, m, 0).getDate();
    const prevMonthDays = new Date(y, m - 1, 0).getDate();
    const today = todayIso();

    const days = [];
    for (let i = 0; i < 42; i++) {
      const dayNum = i - startOffset + 1;
      let cellDate: Date;
      let inMonth: boolean;

      if (dayNum < 1) {
        cellDate = new Date(y, m - 2, prevMonthDays + dayNum);
        inMonth = false;
      } else if (dayNum > daysInMonth) {
        cellDate = new Date(y, m, dayNum - daysInMonth);
        inMonth = false;
      } else {
        cellDate = new Date(y, m - 1, dayNum);
        inMonth = true;
      }

      const iso = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, '0')}-${String(cellDate.getDate()).padStart(2, '0')}`;
      const isSelected = inMonth && iso === selectedIso;
      const isToday = iso === today;

      days.push(
        <button
          key={iso + i}
          type="button"
          disabled={!inMonth}
          onClick={() => {
            if (inMonth) {
              onSelect(iso);
              setOpenPicker(null);
            }
          }}
          className={`h-9 flex items-center justify-center rounded-full text-[0.875rem] transition-all ${
            !inMonth
              ? 'text-[#6b6b7a] opacity-30 cursor-default'
              : isSelected
              ? 'bg-[#2d2d3a] text-[#ffffff] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
              : isToday
              ? 'border border-[rgba(45,45,58,0.25)] text-[#1a1a1e] font-medium'
              : 'text-[#1a1a1e] hover:bg-[rgba(45,45,58,0.06)]'
          }`}
        >
          {cellDate.getDate()}
        </button>
      );
    }
    return days;
  };

  const renderMonthLabel = (monthIso: string) => {
    const [y, m] = monthIso.split('-').map(Number);
    return `${MONTHS[m - 1]} ${y}`;
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Geboortedatum */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Geboren
        </label>
        <button
          type="button"
          onClick={() => setOpenPicker(openPicker === 'geboorte' ? null : 'geboorte')}
          className={`w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border flex items-center justify-between transition-all cursor-pointer ${
            openPicker === 'geboorte'
              ? 'border-[#2d2d3a]'
              : 'border-[rgba(45,45,58,0.14)] hover:border-[rgba(45,45,58,0.3)]'
          }`}
        >
          <span className={`text-[1rem] ${dataGeboorte ? 'text-[#1a1a1e]' : 'text-[#6b6b7a]'}`}>
            {dataGeboorte ? formatDateDutch(dataGeboorte) : 'Kies een datum'}
          </span>
          <Calendar size={18} className="text-[#6b6b7a]" />
        </button>

        {openPicker === 'geboorte' && (
          <div className="mt-2 p-4 bg-[#ffffff] border border-[rgba(45,45,58,0.1)] rounded-[1.5rem] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => shiftMonth('geboorte', -1)}
                className="w-8 h-8 rounded-full border border-[rgba(45,45,58,0.14)] flex items-center justify-center text-[#1a1a1e] hover:bg-[#f0f1f4]"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="font-bold text-[0.9375rem] capitalize text-[#1a1a1e]">
                {renderMonthLabel(pickerMonthGeboorte)}
              </span>
              <button
                type="button"
                onClick={() => shiftMonth('geboorte', 1)}
                className="w-8 h-8 rounded-full border border-[rgba(45,45,58,0.14)] flex items-center justify-center text-[#1a1a1e] hover:bg-[#f0f1f4]"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center mb-1 text-[0.75rem] font-medium text-[#6b6b7a]">
              <span>M</span><span>D</span><span>W</span><span>D</span><span>V</span><span>Z</span><span>Z</span>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {buildCalendarDays(pickerMonthGeboorte, dataGeboorte, onChangeGeboorte)}
            </div>

            <div className="flex justify-between mt-3 pt-3 border-t border-[rgba(45,45,58,0.06)] text-[0.8125rem]">
              <button
                type="button"
                onClick={() => {
                  onChangeGeboorte('');
                  setOpenPicker(null);
                }}
                className="text-[#6b6b7a] hover:text-[#1a1a1e] cursor-pointer"
              >
                Wissen
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeGeboorte(todayIso());
                  setOpenPicker(null);
                }}
                className="text-[#1a1a1e] font-bold cursor-pointer"
              >
                Vandaag
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Overlijdensdatum */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Overleden
        </label>
        <button
          type="button"
          onClick={() => setOpenPicker(openPicker === 'overlijden' ? null : 'overlijden')}
          className={`w-full h-[52px] px-5 rounded-[26px] bg-[#fcfcfd] border flex items-center justify-between transition-all cursor-pointer ${
            openPicker === 'overlijden'
              ? 'border-[#2d2d3a]'
              : 'border-[rgba(45,45,58,0.14)] hover:border-[rgba(45,45,58,0.3)]'
          }`}
        >
          <span className={`text-[1rem] ${dataOverlijden ? 'text-[#1a1a1e]' : 'text-[#6b6b7a]'}`}>
            {dataOverlijden ? formatDateDutch(dataOverlijden) : 'Kies een datum'}
          </span>
          <Calendar size={18} className="text-[#6b6b7a]" />
        </button>

        {openPicker === 'overlijden' && (
          <div className="mt-2 p-4 bg-[#ffffff] border border-[rgba(45,45,58,0.1)] rounded-[1.5rem] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => shiftMonth('overlijden', -1)}
                className="w-8 h-8 rounded-full border border-[rgba(45,45,58,0.14)] flex items-center justify-center text-[#1a1a1e] hover:bg-[#f0f1f4]"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="font-bold text-[0.9375rem] capitalize text-[#1a1a1e]">
                {renderMonthLabel(pickerMonthOverlijden)}
              </span>
              <button
                type="button"
                onClick={() => shiftMonth('overlijden', 1)}
                className="w-8 h-8 rounded-full border border-[rgba(45,45,58,0.14)] flex items-center justify-center text-[#1a1a1e] hover:bg-[#f0f1f4]"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center mb-1 text-[0.75rem] font-medium text-[#6b6b7a]">
              <span>M</span><span>D</span><span>W</span><span>D</span><span>V</span><span>Z</span><span>Z</span>
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center">
              {buildCalendarDays(pickerMonthOverlijden, dataOverlijden, onChangeOverlijden)}
            </div>

            <div className="flex justify-between mt-3 pt-3 border-t border-[rgba(45,45,58,0.06)] text-[0.8125rem]">
              <button
                type="button"
                onClick={() => {
                  onChangeOverlijden('');
                  setOpenPicker(null);
                }}
                className="text-[#6b6b7a] hover:text-[#1a1a1e] cursor-pointer"
              >
                Wissen
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeOverlijden(todayIso());
                  setOpenPicker(null);
                }}
                className="text-[#1a1a1e] font-bold cursor-pointer"
              >
                Vandaag
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Size Pill Group */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6b6b7a]">
          Grootte
        </label>
        <div className="flex bg-[#f0f1f4] rounded-[999px] p-1 gap-1">
          {(['klein', 'normaal', 'groot'] as SizeOption[]).map((s) => {
            const isSelected = size === s;
            const labels: Record<SizeOption, string> = { klein: 'Klein', normaal: 'Normaal', groot: 'Groot' };
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChangeSize(s)}
                className={`flex-1 py-2 rounded-[999px] text-[0.8125rem] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffffff] text-[#1a1a1e] shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)]'
                    : 'text-[#6b6b7a] hover:text-[#1a1a1e]'
                }`}
              >
                {labels[s]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
