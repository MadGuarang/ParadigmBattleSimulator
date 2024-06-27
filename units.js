const units = {
    LightFootman: {
        name: 'Light infrantry',
        description: 'Light infantry using javelins.',
        hp: 50,
        maxHp: 50,
        damage: [1, 4], // d4 damage  <- instead of this damage we want it split on weaponRange, weaponMelee slots, more in our chat, gpt
        apdamage: 0,
        armor: 1,
        speed: 1.5,
        cost: 1,
        range: 20,
        ammo: 20,
        morale: 60,
        maxMorale: 60,
        orders: 'skirmish'
    },
    Footman: {
        name: 'Footman',
        description: 'Basic infantry unit with moderate stats.',
        hp: 60,
        maxHp: 60,
        damage: [1, 6], // d6 damage
        apdamage: 0,
        armor: 2,
        speed: 1,
        cost: 10,
        range: 1,
        ammo: 0,
        morale: 90,
        maxMorale: 90,
        orders: 'defend'
    },
    Archer: {
        name: 'Archer',
        description: 'Can shoot from a distance.',
        hp: 45,
        maxHp: 45,
        damage: [1, 3], // d3 damage
        apdamage: 0,
        armor: 1,
        speed: 1.25,
        cost: 25,
        range: 100,
        ammo: 100,
        morale: 45,
        maxMorale: 45,
        orders: 'skirmish'
    },
    Cavalry: {
        name: 'Cavalry',
        description: 'Fast and powerful mounted unit.',
        hp: 100,
        maxHp: 100,
        damage: [1, 8], // d8 damage
        apdamage: 1,
        armor: 2,
        speed: 3,
        cost: 10,
        range: 1,
        ammo: 0,
        morale: 90,
        maxMorale: 90,
        orders: 'follow_leader'
    },
    General: {
        name: 'General',
        description: 'Army leader and most powerful unit on the field. ',
        hp: 400,
        maxHp: 400,
        damage: [1, 20], // d8 damage
        apdamage: 4,
        armor: 4,
        speed: 2,
        cost: 100,
        range: 200,
        ammo: 100,
        morale: 160,
        maxMorale: 160,
        orders: 'leader'
    },
    Warlord: {
        name: 'Warlord',
        description: 'Army leader fighting in close distance. ',
        hp: 600,
        maxHp: 600,
        damage: [1, 50], // d8 damage
        apdamage: 10,
        armor: 4,
        speed: 2,
        cost: 100,
        range: 10,
        ammo: 100,
        morale: 260,
        maxMorale: 260,
        orders: 'leader'
    },
    // Add more units as needed
};
