
export type Stat = 'str' | 'agi' | 'int' | 'cha' | 'for';

export interface Character {
  name: string;
  class: string;
  baseStats: Record<Stat, number>;
}

// Fix: Add missing AIGeneratedStats interface to resolve import errors.
export interface AIGeneratedStats {
  description: string;
  str: number;
  for: number;
  int: number;
  agi: number;
  cha: number;
}


// Fix: Add missing types for EquipmentSlot component
export type EquipmentSlotName = string;

export interface EquipmentItem {
  name: string;
  bonuses: Partial<Record<Stat, number>>;
}

export interface Ring {
  name: string;
  buffs: Partial<Record<Stat, number>>;
}

// Fix: Add missing SavedBuild interface for SavedBuildsList component
export interface SavedBuild {
  id: number;
  name: string;
  level: number;
  village: string;
  firstMastery: string;
  secondMastery: string;
  corporation: string;
  weaponGroup: string;
  weapon: string;
  ring1: string;
  ring2: string;
  baseStats: Record<Stat, number>;
  guildBuff: number;
}
