
import React, { useState } from 'react';
import { EquipmentSlotName, EquipmentItem, Stat } from '../types';
import { STAT_NAMES } from '../constants';

interface EquipmentSlotProps {
  slot: EquipmentSlotName;
  item: EquipmentItem;
  onChange: (slot: EquipmentSlotName, stat: Stat | 'name', value: string | number) => void;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const StatBonusInput: React.FC<{ stat: Stat, value: number, onChange: (stat: Stat, value: string) => void }> = ({ stat, value, onChange }) => (
    <div className="flex items-center space-x-2">
        <label className="uppercase text-xs font-bold text-gray-400 w-8">{stat}</label>
        <input
            type="number"
            placeholder="0"
            value={value || ''}
            onChange={(e) => onChange(stat, e.target.value)}
            className="w-14 bg-[#1E1E1F] border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
    </div>
);

export const EquipmentSlot: React.FC<EquipmentSlotProps> = ({ slot, item, onChange }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <p className="capitalize font-bold text-purple-400">{slot.replace(/[0-9]/g, ' $&')}</p>
                    <input
                        type="text"
                        placeholder="Empty"
                        value={item.name}
                        onChange={(e) => onChange(slot, 'name', e.target.value)}
                        className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                    />
                </div>
                <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 rounded-full hover:bg-gray-700 transition-colors">
                    <PlusIcon className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
                </button>
            </div>
            {isExpanded && (
                <div className="mt-3 pt-3 border-t border-gray-700 grid grid-cols-2 gap-2">
                    {STAT_NAMES.map(stat => (
                        <StatBonusInput
                            key={stat}
                            stat={stat}
                            value={item.bonuses[stat] || 0}
                            onChange={(s, v) => onChange(slot, s, v)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};