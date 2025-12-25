
import React from 'react';
import { Stat } from '../types';
import { WEAPONS_DATA, WEAPON_GROUPS } from '../constants';

interface WeaponDisplayProps {
  weaponGroup: string;
  onWeaponGroupChange: (group: string) => void;
  weapon: string;
  onWeaponChange: (weapon: string) => void;
  availableWeapons: { name: string }[];
  baseStats: Record<Stat, number>;
  level: number;
}

const STAT_MAP_REVERSE: Record<string, Stat> = {
  'Strength': 'str',
  'Agility': 'agi',
  'Intellect': 'int',
  'Chakra': 'cha',
  'Fortitude': 'for',
};

export const WeaponDisplay: React.FC<WeaponDisplayProps> = ({
  weaponGroup,
  onWeaponGroupChange,
  weapon,
  onWeaponChange,
  availableWeapons,
  baseStats,
  level,
}) => {
  const weaponDetails = weapon ? WEAPONS_DATA[weapon] : null;

  const hasRequirements = weaponDetails && weaponDetails.requirements && Object.keys(weaponDetails.requirements).length > 0;  const hasStats = weaponDetails && weaponDetails.stats && Object.keys(weaponDetails.stats).length > 0;
  const hasBuffs = weaponDetails && weaponDetails.buffs && Object.keys(weaponDetails.buffs).length > 0;

  return (
    <section className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg shadow-2xl">
      <h2 className="text-xl font-title text-white mb-8 flex items-center gap-3">
          <span className="w-1 h-6 bg-amber-500"></span>
          WEAPON
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div>
              <label htmlFor="weapon-group-display" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-amber-500 transition-colors">Category</label>
              <select
                  id="weapon-group-display"
                  value={weaponGroup}
                  onChange={e => onWeaponGroupChange(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-amber-500 appearance-none transition-all text-white font-medium"
              >
                  <option value="">Unspecified</option>
                  {WEAPON_GROUPS.map(group => (
                      <option key={group} value={group}>{group}</option>
                  ))}
              </select>
          </div>
          <div>
              <label htmlFor="weapon-display" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-amber-500 transition-colors">Model</label>
              <select
                  id="weapon-display"
                  value={weapon}
                  onChange={e => onWeaponChange(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-amber-500 appearance-none transition-all disabled:opacity-10 text-white font-medium"
                  disabled={!weaponGroup || availableWeapons.length === 0}
              >
                  <option value="">None</option>
                  {availableWeapons.map(w => (
                      <option key={w.name} value={w.name}>{w.name}</option>
                  ))}
              </select>
          </div>
      </div>

      {!weaponDetails ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-zinc-800 bg-black/50">
            <svg className="w-10 h-10 text-zinc-800 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.2em]">Hardware not detected</p>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex items-start gap-8">
            {weaponDetails.image && (
                <div className="w-24 h-24 bg-black border border-zinc-800 flex items-center justify-center p-4 flex-shrink-0">
                    <img src={weaponDetails.image} alt={weaponDetails.name} className="object-contain w-full h-full" />
                </div>
            )}
            <div className="flex-grow pt-1">
                <h4 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">{weaponDetails.name}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed font-medium">{weaponDetails.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hasRequirements && (
                    <div className="bg-black p-5 border border-zinc-800">
                        <h5 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-4">Requirements</h5>
                        <ul className="space-y-3">
                            {Object.entries(weaponDetails.requirements!).map(([key, value]) => {
                                const characterValue = key === 'Level' ? level : baseStats[STAT_MAP_REVERSE[key]];
                                const met = characterValue >= value;
                                return (
                                    <li key={key} className="flex justify-between items-center text-[11px] font-bold">
                                        <span className="text-zinc-400 uppercase tracking-tighter">{key}</span>
                                        <div className="flex items-center gap-3">
                                            {!met && <span className="text-[10px] text-red-600">[{characterValue}]</span>}
                                            <span className={`${met ? 'text-white' : 'text-red-500'}`}>
                                                {value}
                                            </span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                
                {hasStats && (
                    <div className="bg-black p-5 border border-zinc-800">
                        <h5 className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-4">Specifications</h5>
                        <ul className="space-y-3">
                            {Object.entries(weaponDetails.stats!).map(([key, value]) => {
                                return (
                                    <li key={key} className="flex justify-between items-center text-[11px] font-bold">
                                        <span className="text-zinc-400 uppercase tracking-tighter">{key}</span>
                                        <span className="text-white uppercase">{value}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                
                {hasBuffs && (
                    <div className="md:col-span-2 bg-amber-500/10 p-5 border border-amber-500/20">
                        <h5 className="text-[9px] font-black text-amber-500 uppercase tracking-widest mb-4">Augments</h5>
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            {Object.entries(weaponDetails.buffs!).map(([key, value]) => (
                                <div key={key} className="flex items-center gap-2 text-[11px] font-black">
                                    <span className="text-zinc-400 uppercase">{key}</span>
                                    <span className="text-amber-400 uppercase">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
          </div>
        </div>
      )}
    </section>
  );
};
