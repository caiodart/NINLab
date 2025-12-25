
import React, { useState, useEffect } from 'react';
import { Stat } from '../types';
import { STAT_MAP } from '../constants';

interface StatInputProps {
  stat: Stat;
  value: number;
  buffValue: number;
  onChange: (stat: Stat, value: number) => void;
  canIncrement: boolean;
  canDecrement: boolean;
  isUnmet?: boolean;
}

export const StatInput: React.FC<StatInputProps> = ({ stat, value, buffValue, onChange, canIncrement, canDecrement, isUnmet }) => {
  const [inputValue, setInputValue] = useState(String(value));

  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    const numValue = parseInt(inputValue, 10);
    if (isNaN(numValue)) {
      setInputValue(String(value));
    } else {
      onChange(stat, numValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };
  
  const increment = () => onChange(stat, value + 1);
  const decrement = () => onChange(stat, value - 1);

  const totalStat = value + buffValue;

  return (
    <div className={`flex items-center justify-between p-3 transition-colors group ${isUnmet ? 'bg-red-950/20 border-l-2 border-red-600' : 'hover:bg-zinc-900 border-l-2 border-transparent hover:border-emerald-500/50'}`}>
      <div className="w-24">
        <label htmlFor={stat} className="font-bold text-[11px] uppercase tracking-widest text-zinc-400 group-hover:text-emerald-400 transition-colors">
          {STAT_MAP[stat]}
        </label>
      </div>
      
      <div className="flex items-center space-x-1 flex-grow justify-center">
        <div className="flex items-center bg-black border border-zinc-800 p-1 focus-within:border-emerald-500/50 transition-colors">
            <button 
                onClick={decrement} 
                disabled={!canDecrement}
                className="stat-button border-none bg-transparent hover:bg-zinc-800 disabled:opacity-10"
                aria-label={`Decrement ${STAT_MAP[stat]}`}
            >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M20 12H4"/></svg>
            </button>
            <input
              id={stat}
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="stat-input w-12 font-black"
            />
            <button 
                onClick={increment}
                disabled={!canIncrement}
                className="stat-button border-none bg-transparent hover:bg-zinc-800 disabled:opacity-10"
                aria-label={`Increment ${STAT_MAP[stat]}`}
            >
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M12 4v16m8-8H4"/></svg>
            </button>
        </div>
      </div>

      <div className="w-14 text-center">
        <span className={`text-[10px] font-bold ${buffValue > 0 ? 'text-emerald-400' : 'text-zinc-700'}`}>
            {buffValue > 0 ? `+${buffValue}` : '0'}
        </span>
      </div>
      
      <div className="w-16 text-center">
        <span className="text-lg font-black text-emerald-400">
            {totalStat}
        </span>
      </div>
    </div>
  );
};
