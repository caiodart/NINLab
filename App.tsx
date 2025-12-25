
import React, { useState, useMemo, useEffect } from 'react';
import { Stat } from './types';
import { STAT_NAMES, MASTERIES, CORPORATIONS, WEAPON_GROUPS, WEAPONS_BY_GROUP, WEAPONS_DATA, STAT_MAP, VILLAGES, RINGS_DATA, RINGS_LIST } from './constants';
import { StatInput } from './components/StatInput';
import { WeaponDisplay } from './components/WeaponDisplay';

const BASE_STAT_VALUE = 5;

const calculateTotalPoints = (level: number): number => {
    if (level <= 1) return 0;
    const pointsFromLvl2to50 = (Math.min(level, 50) - 1) * 5;
    const pointsFromLvl51to60 = level > 50 ? (level - 50) * 4 : 0;
    return pointsFromLvl2to50 + pointsFromLvl51to60;
};


const initialStats: Record<Stat, number> = {
  str: 5,
  for: 5,
  int: 5,
  agi: 5,
  cha: 5,
};

const App: React.FC = () => {
  const [characterName, setCharacterName] = useState('My Ninja');
  const [level, setLevel] = useState(60);
  const [village, setVillage] = useState('');
  const [firstMastery, setFirstMastery] = useState('');
  const [secondMastery, setSecondMastery] = useState('');
  const [corporation, setCorporation] = useState('');
  const [weaponGroup, setWeaponGroup] = useState('');
  const [weapon, setWeapon] = useState('');
  const [ring1, setRing1] = useState('');
  const [ring2, setRing2] = useState('');
  const [baseStats, setBaseStats] = useState<Record<Stat, number>>(initialStats);
  const [guildBuff, setGuildBuff] = useState(0);

  // When weapon group changes, reset the specific weapon
  useEffect(() => {
    setWeapon('');
  }, [weaponGroup]);
  
  const totalPoints = useMemo(() => calculateTotalPoints(level), [level]);

  const pointsSpent = useMemo(() => {
    return STAT_NAMES.reduce((acc, stat) => acc + (baseStats[stat] - BASE_STAT_VALUE), 0);
  }, [baseStats]);

  const pointsRemaining = totalPoints - pointsSpent;

  const guildStatBuffs = useMemo(() => {
    const buffs: Record<Stat, number> = { str: 0, for: 0, int: 0, agi: 0, cha: 0 };
    if (guildBuff > 0) {
        STAT_NAMES.forEach(stat => {
            buffs[stat] = Math.floor(baseStats[stat] * (guildBuff / 100));
        });
    }
    return buffs;
  }, [baseStats, guildBuff]);

  const ringBuffs = useMemo(() => {
    const buffs: Record<Stat, number> = { str: 0, for: 0, int: 0, agi: 0, cha: 0 };
    const r1 = RINGS_DATA[ring1];
    const r2 = RINGS_DATA[ring2];
    
    STAT_NAMES.forEach(stat => {
        if (r1?.buffs?.[stat]) buffs[stat] += r1.buffs[stat]!;
        if (r2?.buffs?.[stat]) buffs[stat] += r2.buffs[stat]!;
    });
    return buffs;
  }, [ring1, ring2]);

  const corpBuffs = useMemo(() => {
    const buffs: Record<Stat, number> = { str: 0, for: 0, int: 0, agi: 0, cha: 0 };
    if (corporation === 'Kuronami') {
        buffs.str = 20;
        buffs.for = 30;
        buffs.int = 20;
        buffs.agi = 20;
        buffs.cha = 20;
    } else if (corporation === 'ANBU') {
        buffs.str = 7;
        buffs.for = 7;
        buffs.int = 7;
        buffs.agi = 7;
        buffs.cha = 7;
    } else if (corporation === 'Puppeteer Squad') {
        buffs.for = 10;
    } else if (corporation === 'Twelve Fangs') {
        buffs.str = 5;
        buffs.for = 5;
        buffs.int = 5;
        buffs.agi = 5;
        buffs.cha = 5;
    }
    return buffs;
  }, [corporation]);

  const weaponBuffs = useMemo(() => {
    const buffs: Record<Stat, number> = { str: 0, for: 0, int: 0, agi: 0, cha: 0 };
    if (!weapon) return buffs;

    const weaponData = WEAPONS_DATA[weapon];
    if (!weaponData || !weaponData.buffs) return buffs;
    
    const statNameMap = Object.entries(STAT_MAP).reduce((acc, [key, value]) => {
        acc[value] = key as Stat;
        return acc;
    }, {} as Record<string, Stat>);

    for (const [buffName, buffValue] of Object.entries(weaponData.buffs)) {
        const statKey = statNameMap[buffName];
        if (statKey) {
            const numericValue = parseInt(String(buffValue).replace('+', ''), 10);
            if (!isNaN(numericValue)) {
                buffs[statKey] = numericValue;
            }
        }
    }

    return buffs;
  }, [weapon]);

  const totalStats = useMemo(() => {
    const totals: Record<Stat, number> = { str: 0, for: 0, int: 0, agi: 0, cha: 0 };
    STAT_NAMES.forEach(stat => {
      totals[stat] = baseStats[stat] + guildStatBuffs[stat] + corpBuffs[stat] + weaponBuffs[stat] + ringBuffs[stat];
    });
    return totals;
  }, [baseStats, guildStatBuffs, corpBuffs, weaponBuffs, ringBuffs]);
  
  const totalHp = 210 + (totalStats.for * 8);
  const totalChakra = 25 + (totalStats.cha * 5);

  const weaponData = weapon ? WEAPONS_DATA[weapon] : null;
  const weaponBaseDamage = weaponData?.stats?.['Base Damage'] ? Number(weaponData.stats['Base Damage']) : 0;
  
  const unmetStats = useMemo(() => {
    const unmet = new Set<string>();
    if (!weaponData?.requirements) return unmet;
    
    const reqs = weaponData.requirements;
    if (reqs.Level && level < reqs.Level) unmet.add('level');
    if (reqs.Strength && baseStats.str < reqs.Strength) unmet.add('str');
    if (reqs.Agility && baseStats.agi < reqs.Agility) unmet.add('agi');
    if (reqs.Intellect && baseStats.int < reqs.Intellect) unmet.add('int');
    if (reqs.Chakra && baseStats.cha < reqs.Chakra) unmet.add('cha');
    if (reqs.Fortitude && baseStats.for < reqs.Fortitude) unmet.add('for');
    
    return unmet;
  }, [weaponData, baseStats, level]);

  const strengthBonus = Math.floor(totalStats.str * 0.2);
  const agilityBonus = Math.floor(totalStats.agi * 0.2);
  
  const autoAttackDamage = weapon 
    ? (23 + weaponBaseDamage + strengthBonus) 
    : (23 + agilityBonus);


  const handleStatChange = (stat: Stat, value: number) => {
    const oldValue = baseStats[stat];
    const clampedValue = Math.max(BASE_STAT_VALUE, isNaN(value) ? BASE_STAT_VALUE : value);
    const pointDifference = clampedValue - oldValue;

    if (pointDifference > 0) { 
      if (pointsRemaining >= pointDifference) {
        setBaseStats(prev => ({ ...prev, [stat]: clampedValue }));
      } else {
        setBaseStats(prev => ({ ...prev, [stat]: oldValue + pointsRemaining}));
      }
    } else { 
      setBaseStats(prev => ({ ...prev, [stat]: clampedValue }));
    }
  };
  
  const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newLevel = parseInt(e.target.value, 10);
    if (isNaN(newLevel)) newLevel = 1;
    newLevel = Math.max(1, Math.min(60, newLevel));
    setLevel(newLevel);
  };

  const handleReset = () => {
    setBaseStats(initialStats);
    setGuildBuff(0);
    setCharacterName('My Ninja');
    setVillage('');
    setFirstMastery('');
    setSecondMastery('');
    setCorporation('');
    setWeaponGroup('');
    setWeapon('');
    setRing1('');
    setRing2('');
    setLevel(60);
  };

  const guildBuffPercentage = (guildBuff / 10) * 100;
  const availableWeapons = WEAPONS_BY_GROUP[weaponGroup] || [];

  return (
    <div className="min-h-screen p-4 md:p-12 bg-black">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-7xl font-title text-white tracking-tighter">NINLAB</h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide uppercase text-xs">Build your character and stay on top of the meta</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side: Character Configuration & Weapon */}
            <div className="space-y-10">
                <section className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg shadow-2xl">
                    <h2 className="text-xl font-title text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-6 bg-indigo-500"></span>
                        CHARACTER
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="group">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Character Name</label>
                            <input type="text" value={characterName} onChange={e => setCharacterName(e.target.value)} className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 transition-all text-white font-medium"/>
                        </div>
                        
                        <div>
                            <label htmlFor="village" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Village</label>
                            <select
                                id="village"
                                value={village}
                                onChange={e => setVillage(e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 appearance-none transition-all text-white font-medium"
                            >
                                <option value="">None</option>
                                {VILLAGES.map(v => (
                                    <option key={v} value={v}>{v}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="first-mastery" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Primary Mastery</label>
                                <select
                                    id="first-mastery"
                                    value={firstMastery}
                                    onChange={e => setFirstMastery(e.target.value)}
                                    className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 appearance-none transition-all text-white font-medium"
                                >
                                    <option value="">Unassigned</option>
                                    {MASTERIES.map(mastery => (
                                        <option key={mastery} value={mastery}>{mastery}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="second-mastery" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Secondary Mastery</label>
                                <select
                                    id="second-mastery"
                                    value={secondMastery}
                                    onChange={e => setSecondMastery(e.target.value)}
                                    className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 appearance-none transition-all text-white font-medium"
                                >
                                    <option value="">Unassigned</option>
                                    {MASTERIES.map(mastery => (
                                        <option key={mastery} value={mastery}>{mastery}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                         <div>
                            <label htmlFor="corporation" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Corporation</label>
                            <select
                                id="corporation"
                                value={corporation}
                                onChange={e => setCorporation(e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 appearance-none transition-all text-white font-medium"
                            >
                                <option value="">Freelance</option>
                                {CORPORATIONS.map(corp => (
                                    <option key={corp} value={corp}>{corp}</option>
                                ))}
                            </select>
                        </div>

                         <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="guild-buff" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Guild buff</label>
                                <span className="text-xs font-bold text-indigo-400">{guildBuff}%</span>
                            </div>
                            <input 
                                id="guild-buff"
                                type="range" 
                                min="0" 
                                max="10" 
                                step="1"
                                value={guildBuff} 
                                onChange={e => setGuildBuff(parseInt(e.target.value, 10))}
                                className="w-full h-1.5 bg-zinc-900 rounded-none appearance-none cursor-pointer accent-indigo-500"
                                style={{
                                    background: `linear-gradient(to right, #6366f1 ${guildBuffPercentage}%, #18181b ${guildBuffPercentage}%)`
                                }}
                            />
                        </div>

                        <div className="pt-6">
                           <button onClick={handleReset} className="w-full border border-zinc-800 hover:bg-white hover:text-black text-zinc-500 font-bold py-3 px-4 rounded-none transition-all duration-200 text-[10px] uppercase tracking-widest">
                              Erase All Configurations
                          </button>
                        </div>
                    </div>
                </section>

                <WeaponDisplay
                    weaponGroup={weaponGroup}
                    onWeaponGroupChange={setWeaponGroup}
                    weapon={weapon}
                    onWeaponChange={setWeapon}
                    availableWeapons={availableWeapons}
                    baseStats={baseStats}
                    level={level}
                />
            </div>

            {/* Right Side: Stats & Equipment */}
            <div className="space-y-10">
                <section className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg shadow-2xl">
                    <h2 className="text-xl font-title text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-6 bg-emerald-500"></span>
                        NINJA STATS
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <label htmlFor="character-level" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ninja level</label>
                            <input
                                id="character-level"
                                type="number"
                                min="1"
                                max="60"
                                value={level}
                                onChange={handleLevelChange}
                                className={`w-full bg-black border ${unmetStats.has('level') ? 'border-red-600 focus:border-red-500' : 'border-zinc-800 focus:border-emerald-500'} rounded-none px-4 py-3 mt-1 focus:outline-none transition-all font-bold text-lg`}
                            />
                        </div>
                        <div className="flex flex-col justify-end">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest py-1">
                                <span className="text-zinc-500">Unallocated</span>
                                <span className={`text-xl font-black ${pointsRemaining < 0 ? 'text-red-500' : 'text-emerald-400'}`}>{pointsRemaining}</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-900 rounded-none overflow-hidden mt-1">
                                <div 
                                    className={`h-full transition-all duration-500 ${pointsRemaining < 0 ? 'bg-red-600' : 'bg-emerald-500'}`}
                                    style={{ width: `${Math.min(100, (pointsSpent / totalPoints) * 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1 mb-10">
                        <div className="flex items-center text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] px-3 mb-4">
                            <span className="w-24 text-left">Stat</span>
                            <span className="flex-grow text-center">Allocated</span>
                            <span className="w-14 text-center">Buff</span>
                            <span className="w-16 text-center">Total</span>
                        </div>
                        {STAT_NAMES.map(stat => (
                            <StatInput 
                                key={stat} 
                                stat={stat} 
                                value={baseStats[stat]} 
                                buffValue={guildStatBuffs[stat] + corpBuffs[stat] + weaponBuffs[stat] + ringBuffs[stat]}
                                onChange={handleStatChange} 
                                canIncrement={pointsRemaining > 0}
                                canDecrement={baseStats[stat] > BASE_STAT_VALUE}
                                isUnmet={unmetStats.has(stat)}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-0 border border-zinc-800 bg-black">
                        <div className="p-5 border-r border-zinc-800 flex flex-col items-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Health</span>
                            <span className="text-2xl font-black text-red-500 mt-1">{totalHp}</span>
                        </div>
                        <div className="p-5 border-r border-zinc-800 flex flex-col items-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Chakra</span>
                            <span className="text-2xl font-black text-indigo-400 mt-1">{totalChakra}</span>
                        </div>
                        <div className="p-5 flex flex-col items-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Damage</span>
                            <span className="text-2xl font-black text-emerald-400 mt-1">{autoAttackDamage}</span>
                        </div>
                    </div>
                </section>

                <section className="bg-zinc-950 border border-zinc-800 p-8 rounded-lg shadow-2xl">
                    <h2 className="text-xl font-title text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-6 bg-indigo-500"></span>
                        RINGS
                    </h2>
                    <div className="grid grid-cols-1 gap-8">
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex-grow">
                                    <label htmlFor="ring-1-select" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ring Slot Alpha</label>
                                    <select
                                        id="ring-1-select"
                                        value={ring1}
                                        onChange={e => setRing1(e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 transition-all text-white font-medium"
                                    >
                                        <option value="">Vacant</option>
                                        {RINGS_LIST.map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="ring-2-select" className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Ring Slot Beta</label>
                                    <select
                                        id="ring-2-select"
                                        value={ring2}
                                        onChange={e => setRing2(e.target.value)}
                                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 mt-1 focus:outline-none focus:border-indigo-500 transition-all text-white font-medium"
                                    >
                                        <option value="">Vacant</option>
                                        {RINGS_LIST.map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            {(ring1 || ring2) && (
                                <div className="bg-black p-4 border border-zinc-800 border-l-2 border-l-emerald-500">
                                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] block mb-3">Active Augmentations</span>
                                    <div className="flex flex-wrap gap-2">
                                        {STAT_NAMES.map(stat => {
                                            const buff = ringBuffs[stat];
                                            if (buff === 0) return null;
                                            return (
                                                <span key={stat} className="text-[10px] font-bold border border-emerald-500/50 text-emerald-400 px-3 py-1 uppercase tracking-widest bg-emerald-500/5">
                                                    {STAT_MAP[stat]}: +{buff}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
