
import { Stat, Ring } from './types';

export const CURRENT_BUILD_VERSION = 6;

export const STAT_NAMES: Stat[] = ['str', 'for', 'int', 'agi', 'cha'];

export const STAT_MAP: Record<Stat, string> = {
    str: 'Strength',
    agi: 'Agility',
    int: 'Intellect',
    cha: 'Chakra',
    for: 'Fortitude',
};

export const MASTERIES = ['Medical', 'Weapon', 'Taijutsu', 'Fire', 'Wind', 'Lightning', 'Earth', 'Water'];

export const VILLAGES = ['Leaf', 'Sand', 'Mist'];

export const CORPORATIONS = ['ANBU', 'Twelve Fangs', 'Kuronami', 'Puppeteer Squad'];

export const RINGS_DATA: Record<string, Ring> = {
    'Copper spirit rend band': {
        name: 'Copper spirit rend band',
        buffs: { for: 1 }
    },
    'Iron spirit rend band': {
        name: 'Iron spirit rend band',
        buffs: { for: 4 }
    },
    'Green Agate ring': {
        name: 'Green Agate ring',
        buffs: { agi: 3 }
    },
    'Limestone bedrock band': {
        name: 'Limestone bedrock band',
        buffs: { agi: 5 }
    },
    'Silver chakra vein band': {
        name: 'Silver chakra vein band',
        buffs: { cha: 1 }
    },
    'Steel chakra vein band': {
        name: 'Steel chakra vein band',
        buffs: { cha: 2 }
    },
    'Azurite bedrock band': {
        name: 'Azurite bedrock band',
        buffs: { for: 1, cha: 4 }
    }
};

export const RINGS_LIST = Object.keys(RINGS_DATA);

// Sorted weapon groups alphabetically
export const WEAPON_GROUPS = ['Blunt', 'Fan', 'Fist', 'Pipe', 'Seven Blades', 'Sword'];

export const STAT_MAP_KEY_TO_NAME: Record<Stat, string> = STAT_MAP;

// Data structure for all weapons
export const WEAPONS_DATA: Record<string, {
    name: string;
    group: string;
    description: string;
    image?: string; 
    requirements?: Partial<Record<'Level' | 'Fortitude' | 'Intellect' | 'Strength' | 'Agility' | 'Chakra', number>>;
    stats?: Record<string, string | number>;
    buff?: Record<string, string | number>;
    buffs?: Record<string, string | number>;
}> = {
    // Blunt
    'Bo Staff': { 
        name: 'Bo Staff', 
        group: 'Blunt', 
        description: 'A hand-carved bo staff used for martial arts its extended length allows the user to reach further than a common sword.',
        image: 'https://i.imgur.com/nzqWbEr.png',
        requirements: {
            'Level': 25,
            'Fortitude': 25,
            'Intellect': 45
        },
        stats: {
            'Base Damage': 24,
            'Range': 1,
            'Rarity': 'Uncommon',
        }
    },
    'Reinforced Bo Staff': { 
        name: 'Reinforced Bo Staff', 
        group: 'Blunt', 
        description: 'A hand-carved bo staff used for martial arts its extended length allows the user to reach further than a common sword.',
        image: 'https://i.imgur.com/29T5hut.png',
        requirements: {
            'Level': 25,
            'Fortitude': 25,
            'Intellect': 45
        },
        stats: {
            'Base Damage': 27,
            'Range': 2,
            'Rarity': 'Unique'
        },
        buffs: {
            'Range': '+1'
        }
    },
    'Adamantine Staff': { 
        name: 'Adamantine Staff', 
        group: 'Blunt', 
        description: 'An adamantine staff as hard as diamond, making it very destructive. Has a large area of attack and provides some defense.',
        image: 'https://i.imgur.com/DgLCTho.png',
        requirements: {
            'Level': 57,
            'Fortitude': 50,
            'Intellect': 90
        },
        stats: {
            'Base Damage': 36,
            'Range': 2,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Range': '+1',
            'Fortitude': '+3'
        }
    },
    'Metal Tonfa': { 
        name: 'Metal Tonfa', 
        group: 'Blunt', 
        description: 'Tonfa made by the best quality wood, that could easly block any sword attack. Tonfa increases melee hits by 19 but slows down your attacks to a base 0.8s per swing.',
        image: 'https://i.imgur.com/CmxfxXD.png',
        requirements: {
            'Level': 25,
            'Agility': 60
        },
        stats: {
            'Base Damage': 40,
            'Attack Speed': '0.8s',
            'Rarity': 'Rare'
        },
        buffs: {
            'Fortitude': '+5'
        }
    },
    'Wooden Tonfa': { 
        name: 'Wooden Tonfa', 
        group: 'Blunt', 
        description: 'Tonfa made by the best quality wood, that could easly block any sword attack. Tonfa increases melee hits by 19 but slows down your attacks to a base 0.8s per swing.',
        image: 'https://i.imgur.com/CmxfxXD.png',
        requirements: {
            'Level': 25,
            'Agility': 60
        },
        stats: {
            'Base Damage': 32,
            'Attack Speed': '0.8s',
            'Rarity': 'Rare'
        },
        buffs: {
            'Fortitude': '+2'
        }
    },
    'Blood Tonfa': { 
        name: 'Blood Tonfa', 
        group: 'Blunt', 
        description: 'Tonfa made by the best quality wood, and infused with blood engine chakra, that could easly block any sword attack. Tonfa increases melee hits by 25 but slows down your attacks to a base 1s per swing.',
        image: 'https://i.imgur.com/B5GiqNQ.png',
        requirements: {
            'Level': 53,
            'Agility': 110
        },
        stats: {
            'Base Damage': 35,
            'Attack Speed': '0.9s',
            'Rarity': 'Enchanted'
        },
        buffs: {
            'Fortitude': '+2',
            'Chakra': '+5',
            'Life Steal': '5%'
        }
    },
    // Fan
    'Giant Folding Fan': {
        name: 'Giant Folding Fan',
        group: 'Fan',
        description: 'A giant folding fan made of iron that sends a wind projectile, able to knock back enemies with wind and deal heavy damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/5/5e/Giant_Folding_Fan.png',
        requirements: {
            'Level': 10,
            'Strength': 20
        },
        stats: {
            'Base Damage': 36,
            'Rarity': 'Common'
        },
        buffs: {}
    },
    'Seji No Hani': {
        name: 'Seji No Hani',
        group: 'Fan',
        description: 'A set of ancient folding fans that shoots a projectile that deals 46 base damage, able to knock back enemies with wind and deal heavy damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/0/00/Seji_No_Hani.png',
        requirements: {
            'Level': 23,
            'Strength': 40
        },
        stats: {
            'Base Damage': 46,
            'Rarity': 'Rare'
        },
        buffs: {}
    },
    'Black Giant Folding Fan': {
        name: 'Black Giant Folding Fan',
        group: 'Fan',
        description: 'A giant folding fan made of iron that shoots projectiles across 4 tiles dealing 48 base damage scaling with STR, able to knock back enemies with wind and deal heavy damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/9/93/Black_Giant_Folding_Fan.png',
        requirements: {
            'Level': 10,
            'Strength': 20
        },
        stats: {
            'Base Damage': 48,
            'Rarity': 'Legendary'
        },
        buffs: {}
    },
    'Hisui Fans': {
        name: 'Hisui Fans',
        group: 'Fan',
        description: 'Twin Fans made of Jade and Gold that shoots projectiles across 4 tiles dealing 36 base damage scaling with STR, knocks back enemies with wind dealing light but quick attacks.',
        image: 'https://static.wikitide.net/ninonlinewiki/8/80/Hisui_Fans.png',
        requirements: {
            'Level': 35,
            'Strength': 70,
            'Agility': 20
        },
        stats: {
            'Base Damage': 36,
            'Rarity': 'Unique'
        },
        buffs: {
            'Bonus': 'Knockback, Triple Projectile'
        }
    },
    'Crystal Fan': {
        name: 'Crystal Fan',
        group: 'Fan',
        description: 'Made of the rarest crafting materials as crystal. Shoots a wind projectile with 8 range that deals 50 base damage, able to knock back enemies with wind and stuns them for 0.5 second.',
        image: 'https://static.wikitide.net/ninonlinewiki/f/fa/Crystal_Fan.png',
        requirements: {
            'Level': 50,
            'Strength': 80
        },
        stats: {
            'Base Damage': 50,
            'Rarity': 'Rare'
        },
        buffs: {
            'Fortitude': '+3',
            'Agility': '+3',
            'Bonus': '0.5s Snare, Knockback'
        }
    },
    'Oriental Fan': {
        name: 'Oriental Fan',
        group: 'Fan',
        description: 'Oriental fan created for requested By Legendary Ninja. Shoots a projectile that pierces enemies and deals 48 base damage across 8 tiles, able to knock back enemies with wind.',
        image: 'https://static.wikitide.net/ninonlinewiki/a/a9/Oriental_Fan.png',
        requirements: {
            'Level': 40,
            'Strength': 60
        },
        stats: {
            'Base Damage': 48,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Strength': '+2',
            'Bonus': 'Knockback, Pierce'
        }
    },
    'Blood Iron Fan': {
        name: 'Blood Iron Fan',
        group: 'Fan',
        description: 'Made of Iron and blood colored fabric. Shoots a wind projectile with 8 range that deals 53 base damage, able to knock back enemies with wind and stuns them for 0.5 second.',
        image: 'https://static.wikitide.net/ninonlinewiki/3/3f/Blood_Iron_Fan.png',
        requirements: {
            'Level': 55,
            'Strength': 80
        },
        stats: {
            'Base Damage': 53,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Fortitude': '+2',
            'Life Steal': '10%',
            'Bonus': '0.5s Snare, Knockback'
        }
    },
    'Sukarabe Omo': {
        name: 'Sukarabe Omo',
        group: 'Fan',
        description: 'Twin fans made of Gold and ebony stitching that shoots tornado across 6 tiles dealing 36 base damage scaling with STR, able to stun enemies.',
        image: 'https://static.wikitide.net/ninonlinewiki/1/15/Sukarabe_Omo.png',
        requirements: {
            'Level': 60,
            'Strength': 110
        },
        stats: {
            'Base Damage': 36,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Fortitude': '+4',
            'Intellect': '+2',
            'Bonus': '1 second stun'
        }
    },
    'Nitoryu Fan': {
        name: 'Nitoryu Fan',
        group: 'Fan',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Hyaku Sutsukesu': {
        name: 'Hyaku Sutsukesu',
        group: 'Fan',
        description: 'A suitcase filled with a million ryo that shoots projectiles across 4 tiles dealing 55 base damage scaling with STR, able to knock back enemies with the power of money and deal heavy damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/f/fb/Hyaku_Sutsukesu.png',
        requirements: {
            'Level': 10,
            'Strength': 20
        },
        stats: {
            'Base Damage': 55,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Bonus': 'Knockback'
        }
    },
    // Fist
    'Kunai Dagger': {
        name: 'Kunai Dagger',
        group: 'Fist',
        description: 'A slightly large kunai forged to be wielded like a dagger, adding damage scaling with STR. Does not work as a sword for Kenjutsu!',
        image: 'https://static.wikitide.net/ninonlinewiki/b/b0/Kunai_Dagger.png',
        requirements: {
            'Level': 4,
            'Intellect': 10
        },
        stats: {
            'Base Damage': 20,
            'Rarity': 'Common'
        }
    },
    'Poison-laced Kunai Dagger': {
        name: 'Poison-laced Kunai Dagger',
        group: 'Fist',
        description: 'A slighthly large kunai forged to be wielded like a dagger, adding 25 base damage scaling with STR. Does not work as a sword for Kenjutsu!',
        image: 'https://static.wikitide.net/ninonlinewiki/c/c3/Poison-laced_Kunai_Dagger.png',
        requirements: {
            'Level': 17,
            'Intellect': 10
        },
        stats: {
            'Base Damage': 25,
            'Attack Speed': '1.5s',
            'Rarity': 'Uncommon'
        },
        buffs: {
            'Bonus': 'Applies poison'
        }
    },
    'Wooden Knuckle Blades': {
        name: 'Wooden Knuckle Blades',
        group: 'Fist',
        description: 'A wooden blade fitted with finger slots to be worn to enhance knuckle damage while still allowing the user to have full access to handseals and other items. Deals 16 damage every 0.7 seconds',
        image: 'https://static.wikitide.net/ninonlinewiki/5/53/Wooden_Knuckle_Blades.png',
        requirements: {
            'Level': 10,
            'Agility': 20
        },
        stats: {
            'Base Damage': 16,
            'Attack Speed': '0.7s',
            'Rarity': 'Common'
        }
    },
    'Blood Knuckle Blades': {
        name: 'Blood Knuckle Blades',
        group: 'Fist',
        description: 'Expertly carved from reinforced hardwood and imbued with blood engine chakra, this compact weapon is worn over the knuckles, increasing melee damage by 26 while allowing full use of your fists.',
        image: 'https://static.wikitide.net/ninonlinewiki/2/2c/Blood_Knuckle_Blades.png',
        requirements: {
            'Level': 58,
            'Agility': 120
        },
        stats: {
            'Base Damage': 26,
            'Attack Speed': '0.7s',
            'Rarity': 'Enchanted'
        },
        buffs: {
            'Chakra': '+5',
            'Life Steal': '8%'
        }
    },
    'Metal Knuckle Blades': {
        name: 'Metal Knuckle Blades',
        group: 'Fist',
        description: 'Two metal blades that are swift and deadly, pulsing with regenerative chakra that adds damage to fist attacks. Their sleek design channels hits into rapid, precision strikes. Perfect for agility experts.',
        image: 'https://static.wikitide.net/ninonlinewiki/5/53/Metal_Knuckle_Blades.png',
        requirements: {
            'Level': 30,
            'Agility': 70,
            'Chakra': 20
        },
        stats: {
            'Base Damage': 26,
            'Attack Speed': '0.6s',
            'Rarity': 'Legendary'
        },
        buffs: {
            'Chakra': '+3'
        }
    },
    'Demon Claws': {
        name: 'Demon Claws',
        group: 'Fist',
        description: 'A pair of large claws worn to inflict more damage on enemies when using Taijutsu, dealing a base damage of 32.',
        image: 'https://static.wikitide.net/ninonlinewiki/9/92/Demon_Claws.png',
        requirements: {
            'Level': 45,
            'Agility': 95
        },
        stats: {
            'Base Damage': 32,
            'Attack Speed': '0.6s',
            'Rarity': 'Legendary'
        },
        buffs: {
            'Agility': '+1',
            'Chakra Steal': '10%'
        }
    },
    // Pipe
    'Bubble-Utilising Pipe': {
        name: 'Bubble-Utilising Pipe',
        group: 'Pipe',
        description: 'This bubble pipe can be used to perform bubble ninjutsu. It\'s golden in color and bent in the middle. It can create bubbles for many different purposes!',
        image: 'https://static.wikitide.net/ninonlinewiki/7/76/Bubble-Utilising_Pipe.png',
        requirements: {
            'Level': 10,
            'Strength': 20
        },
        stats: {
            'Base Damage': 30,
            'Rarity': 'Common'
        },
        buffs: {
            'Bonus': 'Snare'
        }
    },
    'Rusty Pipe': {
        name: 'Rusty Pipe',
        group: 'Pipe',
        description: 'This corroded pipe is perfect for performing bubble ninjutsu. It\'s a dull brown color with flecks of rust and sharp bend in the middle. It can create bubbles that slows enemies!',
        image: 'https://static.wikitide.net/ninonlinewiki/f/ff/Rusty_Pipe.png',
        requirements: {
            'Level': 28,
            'Strength': 50
        },
        stats: {
            'Base Damage': 30,
            'Rarity': 'Unique'
        },
        buffs: {
            'Bonus': 'Slow'
        }
    },
    'Seathorn Pipe': {
        name: 'Seathorn Pipe',
        group: 'Pipe',
        description: 'This bubble pipe made in the shape of a rose which can be used to perform bubble ninjutsu. It\'s basic bubble attack creates a poisonous bubble trap. Invented by a ninja named "Fuze".',
        image: 'https://static.wikitide.net/ninonlinewiki/9/9b/Seathorn_Pipe.png',
        requirements: {
            'Level': 35,
            'Strength': 80
        },
        stats: {
            'Base Damage': 30,
            'Rarity': 'Common'
        },
        buffs: {
            'Bonus': 'Snare, Poison'
        }
    },
    'Kiryukan Pipe': {
        name: 'Kiryukan Pipe',
        group: 'Pipe',
        description: 'This bubble pipe can be used to perform bubble ninjutsu. It\'s bloody red in color and bent like a horn. It can create bubbles every 4s for many different purposes!',
        image: 'https://static.wikitide.net/ninonlinewiki/3/3d/Blood_Pipe.png',
        requirements: {
            'Level': 60,
            'Strength': 140
        },
        stats: {
            'Base Damage': 30,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Bonus': 'Creates 3 bubbles',
            'Life Steal': '10%'
        }
    },
    'Crystal Pipe': {
        name: 'Crystal Pipe',
        group: 'Pipe',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    // Seven Blades
    'Armor Breaking': {
        name: 'Armor Breaking',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Decapitating': {
        name: 'Decapitating',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Flameburst': {
        name: 'Flameburst',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Lightning Spear': {
        name: 'Lightning Spear',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Needle': {
        name: 'Needle',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Scale Skin': {
        name: 'Scale Skin',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    'Thunder': {
        name: 'Thunder',
        group: 'Seven Blades',
        description: '',
        requirements: {},
        stats: {},
        buffs: {}
    },
    // Sword
    'Kyuketsuki': {
        name: 'Kyuketsuki',
        group: 'Sword',
        description: 'Made of the rarest crafting materials as crystal. When used as a sword, deals 56 damage on hits.',
        image: 'https://static.wikitide.net/ninonlinewiki/9/93/Kyuketsuki.png',
        requirements: {
            'Level': 54,
            'Strength': 120
        },
        stats: {
            'Base Damage': 56,
            'Rarity': 'Rare'
        },
        buffs: {
            'Agility': '+7',
            'Fortitude': '+1'
        }
    },
    'Cursed Scythe': {
        name: 'Cursed Scythe',
        group: 'Sword',
        description: 'A brutal, soul-touched weapon that strikes with 42 base damage, each swing echoing with lingering malice.',
        image: 'https://static.wikitide.net/ninonlinewiki/4/49/Cursed_Scythe.png',
        requirements: {
            'Level': 30,
            'Strength': 50,
            'Intellect': 25
        },
        stats: {
            'Base Damage': 42,
            'Range': 1,
            'Rarity': 'Unique'
        },
        buffs: {
            'Intellect': '+2',
            'Chakra': '+2'
        }
    },
    'Twin Blades': {
        name: 'Twin Blades',
        group: 'Sword',
        description: 'Dual swords that deal 43 base damage with unique looks that can kick enemies almost miles away.',
        image: 'https://static.wikitide.net/ninonlinewiki/5/54/Twin_Blades.png',
        requirements: {
            'Level': 28,
            'Strength': 70
        },
        stats: {
            'Base Damage': 43,
            'Rarity': 'Rare'
        },
        buffs: {
            'Bonus': '50% Knockback'
        }
    },
    'Spiked Baseball Bat': {
        name: 'Spiked Baseball Bat',
        group: 'Sword',
        description: 'A spiked baseball bat that can be used in place of a Sword that adds 38 damage once wielded by sporty ninja.',
        image: 'https://static.wikitide.net/ninonlinewiki/1/1b/Spiked_Baseball_Bat.png',
        requirements: {
            'Level': 25,
            'Strength': 70
        },
        stats: {
            'Base Damage': 38,
            'Rarity': 'Rare'
        },
        buffs: {
            'Strength': '+2'
        }
    },
    'Shirokata': {
        name: 'Shirokata',
        group: 'Sword',
        description: 'A well-forged katana that adds 47 damage and glows of white Chakra when used by ninjas. It\'s glow is distinct and mysterious.',
        image: 'https://static.wikitide.net/ninonlinewiki/e/eb/Shirokata.png',
        requirements: {
            'Level': 40,
            'Strength': 85
        },
        stats: {
            'Base Damage': 47,
            'Rarity': 'Rare'
        },
        buffs: {}
    },
    'Dark Bandit Blade': {
        name: 'Dark Bandit Blade',
        group: 'Sword',
        description: 'A very crudely forged blade intended to sever limbs from the bodies of enemies. Deals 49 base damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/2/2c/Dark_Bandit_Blade.png',
        requirements: {
            'Level': 40,
            'Strength': 100
        },
        stats: {
            'Base Damage': 49,
            'Rarity': 'Unique'
        },
        buffs: {}
    },
    'Blood Katana': {
        name: 'Blood Katana',
        group: 'Sword',
        description: 'A blood-infused wooden katana that adds 59 base damage and scales your melee attacks with Strength.',
        image: 'https://static.wikitide.net/ninonlinewiki/4/43/Blood_Katana.png',
        requirements: {
            'Level': 51,
            'Strength': 110
        },
        stats: {
            'Base Damage': 59,
            'Rarity': 'Enchanted'
        },
        buffs: {
            'Life Steal': '8%',
            'Chakra': '+5'
        }
    },
    'Dark Scythes': {
        name: 'Dark Scythes',
        group: 'Sword',
        description: 'Two small dark scythes that works like a sword replacement. Adds 57 base damage and scales your melee attacks with Strength.',
        image: 'https://static.wikitide.net/ninonlinewiki/8/8b/Dark_Scythes.png',
        requirements: {
            'Level': 51,
            'Strength': 110
        },
        stats: {
            'Base Damage': 57,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Strength': '+3'
        }
    },
    'Adamantine Claymore': {
        name: 'Adamantine Claymore',
        group: 'Sword',
        description: 'A large broad sword that seems like it was made for a person larger than life. Deals 80 on hit and knocking them back 2 tiles.',
        image: 'https://static.wikitide.net/ninonlinewiki/7/72/Adamantine_Claymore.png',
        requirements: {
            'Level': 59,
            'Strength': 120
        },
        stats: {
            'Base Damage': 72,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Bonus': 'Knockback',
            'Strength': '+2',
            'Fortitude': '+4'
        }
    },
    'Asarihanma': {
        name: 'Asarihanma',
        group: 'Sword',
        description: "This hammer is made with a dense shell of a clam, it's eye twitches from time to time... Can be used as a sword, dealing 68 on hit and knocking them back 4 tiles.",
        image: 'https://static.wikitide.net/ninonlinewiki/8/8f/Asarihanma.png',
        requirements: {
            'Level': 53,
            'Strength': 115
        },
        stats: {
            'Base Damage': 68,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Bonus': 'Knockback',
            'Strength': '+2',
            'Fortitude': '+2',
            'Intellect': '+2',
            'Chakra': '+2'
        }
    },
    'Hunter Warglaive': {
        name: 'Hunter Warglaive',
        group: 'Sword',
        description: 'Hunter warglaive that focuses on attacking multiple targets at once and adds 60 damage while making it user steal enemies life.',
        image: 'https://static.wikitide.net/ninonlinewiki/f/f8/Hunter_Warglaive.png',
        requirements: {
            'Level': 58,
            'Strength': 105
        },
        stats: {
            'Base Damage': 60,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Fortitude': '+3',
            'Life Steal': '5%',
            'Bonus': '8 tile AOE around user'
        }
    },
    'Jakuma': {
        name: 'Jakuma',
        group: 'Sword',
        description: 'An unknown, black metal is used to craft this blade and even it\'s hilt. When used as a sword, deals 65 damage on hits. Gives it\'s wielder Chakra Regeneration passive.',
        image: 'https://static.wikitide.net/ninonlinewiki/c/c2/Jakuma.png',
        requirements: {
            'Level': 59,
            'Strength': 100,
            'Chakra': 40
        },
        stats: {
            'Base Damage': 65,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Chakra': '+3',
            'Bonus': 'Chakra Regeneration'
        }
    },
    'Yamazaru': {
        name: 'Yamazaru',
        group: 'Sword',
        description: 'An unknown, red metal is used to craft this blade and even it\'s hilt. When used as a sword, deals 65 damage on hits. Gives it\'s wielder Health Regeneration passive.',
        image: 'https://static.wikitide.net/ninonlinewiki/a/a3/Yamazaru.png',
        requirements: {
            'Level': 59,
            'Strength': 120
        },
        stats: {
            'Base Damage': 65,
            'Rarity': 'Legendary'
        },
        buffs: {
            'Fortitude': '+3',
            'Bonus': 'Health Regeneration'
        }
    },
    'Wooden Katana': {
        name: 'Wooden Katana',
        group: 'Sword',
        description: 'A simple wooden katana that adds 16 base damage and scales your melee attacks with Strength.',
        image: 'https://static.wikitide.net/ninonlinewiki/a/a2/Wooden_Katana.png',
        requirements: {
            'Level': 5,
            'Strength': 13
        },
        stats: {
            'Base Damage': 16,
            'Range': 1,
            'Rarity': 'Common'
        },
        buffs: {}
    },
    'Broad Sword': {
        name: 'Broad Sword',
        group: 'Sword',
        description: 'A broad sword crafted with a heavy metal alloy that adds 23 damage. Beating an enemy down with this will be easy, but requires a large amount of strength to utilize.',
        image: 'https://static.wikitide.net/ninonlinewiki/8/88/Broad_Sword.png',
        requirements: {
            'Level': 10,
            'Strength': 23
        },
        stats: {
            'Base Damage': 23,
            'Range': 1,
            'Rarity': 'Common'
        },
        buffs: {}
    },
    'Nikuya': {
        name: 'Nikuya',
        group: 'Sword',
        description: 'A large cleaver-like blade that adds 40 damage. It is broad with a fairly long hilt and has three hinges running along the blade.',
        image: 'https://static.wikitide.net/ninonlinewiki/2/28/Nikuya.png',
        requirements: {
            'Level': 20,
            'Strength': 53
        },
        stats: {
            'Base Damage': 40,
            'Range': 1,
            'Rarity': 'Common'
        },
        buffs: {}
    },
    'Butcher Sword': {
        name: 'Butcher Sword',
        group: 'Sword',
        description: 'A well-forged blade that glows radiantly with blue Chakra that adds 32 damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/7/75/Butcher_Sword.png',
        requirements: {
            'Level': 15,
            'Strength': 30
        },
        stats: {
            'Base Damage': 32,
            'Range': 1,
            'Rarity': 'Common'
        },
        buffs: {}
    },
    'Stylish Sword': {
        name: 'Stylish Sword',
        group: 'Sword',
        description: 'A Stylish Tsurigi that adds 36 damage once wielded by Stylish Ninja.',
        image: 'https://static.wikitide.net/ninonlinewiki/1/1a/Stylish_Sword.png',
        requirements: {
            'Level': 25,
            'Strength': 70
        },
        stats: {
            'Base Damage': 36,
            'Range': 1,
            'Rarity': 'Rare'
        },
        buffs: {
            'Strength': '+2'
        }
    },
    'Great Grandfather\'s Muramasa': {
        name: 'Great Grandfather\'s Muramasa',
        group: 'Sword',
        description: 'You are truly blessed to witness the powers of this extravagant sword! Carved by once the Greatest Swordsman in the World, you must carry on his legacy and become a great warrior yourself!',
        image: 'https://static.wikitide.net/ninonlinewiki/b/b5/Great_Grandfather%27s_Muramasa.png',
        requirements: {
            'Level': 30,
            'Strength': 80
        },
        stats: {
            'Base Damage': 41,
            'Rarity': 'Rare'
        },
        buffs: {
            'Strength': '+1'
        }
    },
    'Iron Scythe': {
        name: 'Iron Scythe',
        group: 'Sword',
        description: 'An iron scythe that works like a sword replacement. Adds 37 base damage and scales your melee attacks with Strength.',
        image: 'https://static.wikitide.net/ninonlinewiki/d/da/Iron_Scythe.png',
        requirements: {
            'Level': 42,
            'Strength': 75
        },
        stats: {
            'Base Damage': 37,
            'Rarity': 'Rare'
        },
        buffs: {
            'Strength': '+3'
        }
    },
    'Religious Katana': {
        name: 'Religious Katana',
        group: 'Sword',
        description: 'Katana that was once used by a religious group whom instead of its damage rate it for its light wealding and faster attack. Katana adds 36 damage.',
        image: 'https://static.wikitide.net/ninonlinewiki/7/70/Religious_Katana.png',
        requirements: {
            'Level': 40,
            'Strength': 70
        },
        stats: {
            'Base Damage': 36,
            'Rarity': 'Rare'
        },
        buffs: {
            'Chakra': '+3'
        }
    },
    'Kotsuzui Tanto': {
        name: 'Kotsuzui Tanto',
        group: 'Sword',
        description: 'This bone is compressed to maximum density, making it as solid as steel. A sharpened bone from a deadly ninja. When used as a sword, deals 47 damage on hits.',
        image: 'https://static.wikitide.net/ninonlinewiki/f/f5/Kotsuzui_Tanto.png',
        requirements: {
            'Level': 50,
            'Strength': 110
        },
        stats: {
            'Base Damage': 47,
            'Rarity': 'Legendary'
        },
        buffs: {}
    }
};

// Helper to group weapons by their group property for easier access and sort weapon lists by level requirement (ascending)
export const WEAPONS_BY_GROUP: Record<string, {name: string}[]> = WEAPON_GROUPS.reduce((acc, group) => {
    acc[group] = Object.values(WEAPONS_DATA)
        .filter(weapon => weapon.group === group)
        .sort((a, b) => {
            // Check if weapon has characteristics (description or stats)
            const aHasData = (a.description && a.description.length > 0) || (a.stats && Object.keys(a.stats).length > 0);
            const bHasData = (b.description && b.description.length > 0) || (b.stats && Object.keys(b.stats).length > 0);

            // Put weapons with data before those without
            if (aHasData !== bHasData) {
                return aHasData ? -1 : 1;
            }

            const levelA = a.requirements?.Level || 0;
            const levelB = b.requirements?.Level || 0;
            // Sort by level ascending
            if (levelA !== levelB) {
                return levelA - levelB;
            }
            // Fallback to alphabetical
            return a.name.localeCompare(b.name);
        })
        .map(w => ({ name: w.name }));
    return acc;
}, {} as Record<string, {name: string}[]>);
