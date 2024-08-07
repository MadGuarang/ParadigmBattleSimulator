const units = {
    Lightinfrantry: {
        name: 'Light Infantry',
        description: 'Light infantry using primitve spears.',
        hp: 30,
        maxHp: 30,
        damage: [1, 4], // d4 damage  
        apdamage: 1,
        armor: 0,
        speed: 1.5,
        cost: 10,
        range: 4,
        ammo: 20,
        morale: 50,
        maxMorale: 50,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/Lightinfrantry.png'
    },
    Footman: {
        name: 'Footman',
        description: 'Basic infantry unit with moderate stats.',
        hp: 60,
        maxHp: 60,
        damage: [1, 6], // d6 damage
        apdamage: 1,
        armor: 1,
        speed: 1,
        cost: 20,
        range: 1,
        ammo: 0,
        morale: 90,
        maxMorale: 90,
        orders: 'defend',
        category: 'Infantry',
        portrait: 'assets/Footman.png'
    },
    Halberdier: {
        name: 'Halberdier',
        description: 'Specialised damage dealer with medium armor and good mobility. Halberd brakes after 320 attacks.',
        hp: 50,
        maxHp: 50,
        damage: [1, 10], // 1d10 damage
        apdamage: 2,
        armor: 1,
        speed: 1,
        cost: 30,
        range: 4,
        ammo: 320,
        morale: 80,
        maxMorale: 80,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/halberdier.png'
    },
    PanzerGuard: {
        name: 'Panzer Guard',
        description: 'Very heavy infantry unit with medium damage output.',
        hp: 75,
        maxHp: 75,
        damage: [1, 8], // d6 damage
        apdamage: 1,
        armor: 4,
        speed: 0.5,
        cost: 45,
        range: 1,
        ammo: 0,
        morale: 135,
        maxMorale: 135,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/Panzerman.png'
    },
    GunpowderKnight: {
        name: 'Gunpowder Knight',
        description: 'Medium armored infantry unit with powerful damage output.',
        hp: 75,
        maxHp: 75,
        damage: [2, 6], // d6 damage
        apdamage: 2,
        armor: 2,
        speed: 0.75,
        cost: 45,
        range: 15,
        ammo: 40,
        morale: 135,
        maxMorale: 135,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/gunpowder_knight.png'
    },
    Berserk: {
        name: 'Berserk',
        description: 'Shock unit, no armor, high speed, and very good damage.',
        hp: 100,
        maxHp: 100,
        damage: [2, 10], // d6 damage
        apdamage: 3,
        armor: 0,
        speed: 2,
        cost: 45,
        range: 4,
        ammo: 300,
        morale: 350,
        maxMorale: 350,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/Berserk.png' // Add portrait path
    },
    Archer: {
        name: 'Archer',
        description: 'Can shoot from a distance. Good range and ammo reserves, low damage.',
        hp: 35,
        maxHp: 35,
        damage: [1, 4], // d6 damage
        apdamage: 1,
        armor: 0,
        speed: 1,
        cost: 25,
        range: 100,
        ammo: 160,
        morale: 45,
        maxMorale: 45,
        orders: 'skirmish',
        category: 'Range',
        portrait: 'assets/Archer.png' // Add portrait path
    },
    Crossbowman: {
        name: 'Crossbowman',
        description: 'Can shoot from a distance. Good armor piercing damage.',
        hp: 35,
        maxHp: 35,
        damage: [1, 4], // d3 damage
        apdamage: 3,
        armor: 1,
        speed: 0.75,
        cost: 25,
        range: 80,
        ammo: 120,
        morale: 55,
        maxMorale: 55,
        orders: 'skirmish',
        category: 'Range',
        portrait: 'assets/Crossbowman.png'
    },
    Naftathrower: {
        name: 'Nafta thrower',
        description: 'Throws flammable nafta on a short distance. Low ammo, high damage.',
        hp: 65,
        maxHp: 65,
        damage: [2, 6], // 2d6 damage
        apdamage: 2,
        armor: 1,
        speed: 1,
        cost: 40,
        range: 45,
        ammo: 80,
        morale: 175,
        maxMorale: 175,
        orders: 'attack',
        category: 'skirmish',
        portrait: 'assets/Cannonier.png'
    },
    FireworckMonk: {
        name: 'Fireworck Monk',
        description: 'Inquisitore delle Fiaccolate Sacre - uses "Fireworcks" that hit with great force, elite range unit.',
        hp: 60,
        maxHp: 60,
        damage: [1, 20], // 4d2 damage
        apdamage: 0,
        armor: 2,
        speed: 1.5,
        cost: 105,
        range: 30,
        ammo: 40,
        morale: 105,
        maxMorale: 105,
        orders: 'skirmish',
        category: 'Range',
        portrait: 'assets/FireworckMonk.png'
    },
    Cannoncino: {
        name: 'Cannoncino di acciaio',
        description: 'Walking cannon in armor, using hand cannon, elite range unit.',
        hp: 80,
        maxHp: 80,
        damage: [3, 4], // 3d3 damage
        apdamage: 6,
        armor: 4,
        speed: 0.75,
        cost: 105,
        range: 50,
        ammo: 40,
        morale: 75,
        maxMorale: 75,
        orders: 'skirmish',
        category: 'Range',
        portrait: 'assets/Juggernaut.png'
    },
    Raiders: {
        name: 'Light Raiders',
        description: 'Young wolf riders using primitive javelins. Very fast. ',
        hp: 50,
        maxHp: 50,
        damage: [1, 4], // d8 damage
        apdamage: 1,
        armor: 0,
        speed: 4,
        cost: 40,
        range: 40,
        ammo: 20,
        morale: 65,
        maxMorale: 65,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/Raiders.png'
    },
    CavalryShock: {
        name: 'Shock Cavalry',
        description: 'Fast mounted unit armed with spears. Good at charges, cannot stand long fight with equal infantry units due to light armor.',
        hp: 100,
        maxHp: 100,
        damage: [1, 8], // d8 damage
        apdamage: 1,
        armor: 1,
        speed: 6,
        cost: 70,
        range: 1,
        ammo: 0,
        morale: 90,
        maxMorale: 90,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/Cavalry.png'
    },
    
    BeduinWarrior: {
        name: 'Beduin Warrior',
        description: 'Light mounted unit armed with spear and few javelins. Too slow for horse racing, but excellent to deal with enemy range units.',
        hp: 100,
        maxHp: 100,
        damage: [1, 6], // d8 damage
        apdamage: 1,
        armor: 1,
        speed: 6,
        cost: 70,
        range: 30,
        ammo: 20,
        morale: 100,
        maxMorale: 100,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/BeduinWarrior.png'
    },
    BeduinCamelArcher: {
        name: 'Beduin Camel Archer',
        description: 'A Camel Bedouin cavalry weaponized with bows. These warriors were adept at using camels as mounts, which allowed them to cover great distances while carrying both themselves and their equipment.',
        hp: 70,
        maxHp: 70,
        damage: [1, 4], // d4 damage
        apdamage: 1,
        armor: 1,
        speed: 3,
        cost: 40,
        range: 60,
        ammo: 90,
        morale: 70,
        maxMorale: 70,
        orders: 'skirmish',
        category: 'Cavalry',
        portrait: 'assets/BeduinCamelArcher.png'
    },
    WingedHussars: {
        name: 'Winged Hussars',
        description: 'Probably heaviest mounted unit ever, XVII century tanks. In summary, the Polish Hussars were a legendary cavalry unit in 17th and 18th-century Europe, distinguished by their use of pistols, long, hollow lances, and sabers.',
        hp: 150,
        maxHp: 150,
        damage: [4, 3], // 4d3 damage
        apdamage: 3,
        armor: 4,
        speed: 3,
        cost: 100,
        range: 40,
        ammo: 24,
        morale: 250,
        maxMorale: 250,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/WingedHussars.png'
    },
    PegasusRiders: {
        name: 'Pegasus Riders',
        description: 'Elven flying cavalry. Light armor, but powerful magic damage.',
        hp: 170,
        maxHp: 170,
        damage: [2, 10], // 2d10 damage
        apdamage: 3,
        armor: 1,
        speed: 14,
        cost: 220,
        range: 60,
        ammo: 200,
        morale: 140,
        maxMorale: 140,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/Pegasus.png'
    },
    GenArtilleryCommander: {
        name: 'Artillery Commander',
        description: 'Army leader focused on ranged combat. ',
        hp: 1500,
        maxHp: 1500,
        damage: [1, 50], // d8 damage
        apdamage: 4,
        armor: 3,
        speed: 4,
        cost: 1000,
        range: 200,
        ammo: 800,
        morale: 2000,
        maxMorale: 2000,
        orders: 'skirmish',
        category: 'General',
        portrait: 'assets/General.png'
    },
    GenWarlord: {
        name: 'Warlord',
        description: 'Army leader fighting in close distance. ',
        hp: 1800,
        maxHp: 1800,
        damage: [4, 20], // 4d20 damage
        apdamage: 6,
        armor: 4,
        speed: 2,
        cost: 1500,
        range: 10,
        ammo: 1000, //has giant weapon with huge range that breaks after 1000 hits, then range=1
        morale: 3200,
        maxMorale: 3200,
        orders: 'attack',
        category: 'General',
        portrait: 'assets/Warlord.png'
    },
    GenDarkEnvoy: {
        name: 'Dark Envoy',
        description: 'Powerful army leader using black magic. ',
        hp: 1400,
        maxHp: 1400,
        damage: [1, 100], // d50 damage
        apdamage: 0,
        armor: 4,
        speed: 10,
        cost: 1500,
        range: 120,
        ammo: 400,
        morale: 1000,
        maxMorale: 1000,
        orders: 'skirmish',
        category: 'General',
        portrait: 'assets/WarlockGeneral.png'
    },
    GoblinLollipop: {
    name: 'Lollipop Goblin',
    description: 'High damage for such a small goblin.',
    hp: 10,
    maxHp: 10,
    damage: [1, 6], // d4 damage  <- instead of this damage we want it split on weaponRange, weaponMelee slots, more in our chat, gpt
    apdamage: 0,
    armor: 0,
    speed: 1.5,
    cost: 10,
    range: 1,
    ammo: 0,
    morale: 50,
    maxMorale: 50,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/GoblinLollipop.png'
    },
    OrcIceCream: {
    name: 'Ice Cream Orc',
    description: 'Orc throwing ice cream balls.',
    hp: 30,
    maxHp: 30,
    damage: [1, 6], // d3 damage
    apdamage: 1,
    armor: 0,
    speed: 1.25,
    cost: 20,
    range: 60,
    ammo: 160,
    morale: 65,
    maxMorale: 65,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/IceCreamOrc.png'
    },
    MadGuarang: {
    name: 'JokerMad',
    description: 'MadGuarang is a cookie joker-monster using dirty tricks in fight. Unbelievably agile, can dodge hits and bullets with ease.',
    hp: 66,
    maxHp: 66,
    damage: [3, 6], // 2d8 damage
    apdamage: 1,
    armor: 4,
    speed: 1.5,
    cost: 50,
    range: 66,
    ammo: 48,
    morale: 69,
    maxMorale: 96,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/MadGuarang.png'
    },
    AliceInCookielands: {
    name: 'Alice in the Cookielands',
    description: 'Alice from the Cookielands. Does not like visitors. Fast, agile, high piercing damage. Easily gets panicked.',
    hp: 99,
    maxHp: 99,
    damage: [1, 20], // d3 damage
    apdamage: 4,
    armor: 1,
    speed: 1.5,
    cost: 45,
    range: 1,
    ammo: 0,
    morale: 133,
    maxMorale: 169,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/AliceInCookieland.png'
    },
    CentipedeCookie: {
    name: 'Cookie Centipede',
    description: 'Monstrous cookie centipede.',
    hp: 245,
    maxHp: 245,
    damage: [2, 8], // d3 damage
    apdamage: 4,
    armor: 0,
    speed: 0.5,
    cost: 125,
    range: 1,
    ammo: 0,
    morale: 345,
    maxMorale: 345,
    orders: 'attack',
    category: 'Cavalry',
    portrait: 'assets/CentipedeCookie.png'
    },
    DragonChocolate: {
    name: 'Chocolate Dragon',
    description: '70% dark chocolate, alpine milk. This beasts uses liquid choco to sugar its enemies.',
    hp: 445,
    maxHp: 445,
    damage: [1, 20], // d3 damage
    apdamage: 4,
    armor: 2,
    speed: 4.25,
    cost: 200,
    range: 66,
    ammo: 666,
    morale: 666,
    maxMorale: 666,
    orders: 'skirmish',
    category: 'Cavalry',
    portrait: 'assets/ChocolateDragon.png'
    },
    HolderCookie: {
    name: 'Cookieholder',
    description: 'Cookieholder is a giant biscuit monster, crunchy.',
    hp: 10000,
    maxHp: 10000,
    damage: [5, 100], // 5d20 damage
    apdamage: 10,
    armor: 10,
    speed: 1,
    cost: 5000,
    range: 1,
    ammo: 0,
    morale: 12000,
    maxMorale: 12000,
    orders: 'attack',
    category: 'General',
    portrait: 'assets/HolderCookie.png'
    },

    NecroBat: {
        name: 'Vampire Bat',
        description: 'Vampiric bat-like beast. Very aggressive.',
        hp: 15,
        maxHp: 15,
        damage: [1, 2], // d2 damage
        apdamage: 3,
        armor: 0,
        speed: 6,
        cost: 10,
        range: 1,
        ammo: 0,
        morale: 45,
        maxMorale: 45,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/NecroBat.png'
        },
        VampireWolf: {
        name: 'Vampire Wolf',
        description: 'Vampiric wolf spawn. Slower than bat, but tougher.',
        hp: 25,
        maxHp: 25,
        damage: [1, 4], // d3 damage
        apdamage: 2,
        armor: 0,
        speed: 4,
        cost: 20,
        range: 1,
        ammo: 0,
        morale: 60,
        maxMorale: 60,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/VampireWolf.png'
        },
        VampireNoble: {
        name: 'Vampire Noble',
        description: 'Low rank vampire that just been accepted to a Clan. Very thirsty, extremaly fast.',
        hp: 245,
        maxHp: 245,
        damage: [1, 12], // d12 damage
        apdamage: 2,
        armor: 3,
        speed: 4,
        cost: 350,
        range: 20,
        ammo: 10,
        morale: 300,
        maxMorale: 300,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/VampireNoble.png'
        },
        VampireClan: {
        name: 'Clan Vampire',
        description: 'Vampire envoy of the Clan. Extreme speed and damage.',
        hp: 445,
        maxHp: 445,
        damage: [1, 20], // d20 damage
        apdamage: 4,
        armor: 2,
        speed: 6,
        cost: 500,
        range: 20,
        ammo: 20,
        morale: 845,
        maxMorale: 845,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/VampireHybrid.png'
        },
        VampireLord: {
        name: 'Vampire Lord',
        description: 'Vampire Lord - ready to plunder and conquer. For the Sabbath, for The Loge and Cabaal. And for his own glory.',
        hp: 800,
        maxHp: 800,
        damage: [1, 50], // d50 damage
        apdamage: 6,
        armor: 5,
        speed: 4,
        cost: 1250,
        range: 10,
        ammo: 60,
        morale: 1450,
        maxMorale: 1450,
        orders: 'attack',
        category: 'Infantry',
        portrait: 'assets/VampireLord.png'
        },

    NecroSkeleton: {
    name: 'Skeleton',
    description: 'Skeleton. Low health. Decent speed.',
    hp: 15,
    maxHp: 15,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 1,
    speed: 1.25,
    cost: 5,
    range: 1,
    ammo: 0,
    morale: 50,
    maxMorale: 50,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/NecroSkeleton.png'
    },
    NecroKnight: {
    name: 'Skeletal Knight',
    description: 'Armored, with razor sharp blades. Chaotic.',
    hp: 35,
    maxHp: 35,
    damage: [1, 6], // d3 damage
    apdamage: 2,
    armor: 2,
    speed: 1,
    cost: 25,
    range: 1,
    ammo: 0,
    morale: 65,
    maxMorale: 65,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/NecroKnight.png'
    },
    NecroZombieChaser: {
    name: 'Zombie Chaser',
    description: 'Very fast. Easily perishable.',
    hp: 20,
    maxHp: 20,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 1,
    speed: 2.25,
    cost: 15,
    range: 1,
    ammo: 0,
    morale: 60,
    maxMorale: 60,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/NecroZombieChaser.png'
    },
    NecroZombieVeteran: {
    name: 'Zombie Veteran',
    description: 'Ripe rotten flesh kept together by fungoidal parasites. Can take a lot of damage.',
    hp: 70,
    maxHp: 70,
    damage: [1, 4], // d3 damage
    apdamage: 1,
    armor: 0,
    speed: 1.25,
    cost: 30,
    range: 1,
    ammo: 0,
    morale: 90,
    maxMorale: 90,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/NecroZombieVeteran.png'
    },
        
    NecroWeaver: {
    name: 'Death Weaver',
    description: 'Death Weaver - Skeletal witch using illusion to destroy its enemies.',
    hp: 50,
    maxHp: 50,
    damage: [1, 6], // d3 damage
    apdamage: 0,
    armor: 0,
    speed: 0.75,
    cost: 35,
    range: 60,
    ammo: 120,
    morale: 125,
    maxMorale: 125,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/NecroWeaver.png'
    },
    NecroGhoul: {
    name: 'Ghoul',
    description: 'Ghoul, sources his power from death and spreads decay.',
    hp: 70,
    maxHp: 70,
    damage: [1, 6], // d3 damage
    apdamage: 3,
    armor: 1,
    speed: 0.75,
    cost: 60,
    range: 20,
    ammo: 200,
    morale: 225,
    maxMorale: 225,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/NecroGhoul.png'
    },
    
    NecroTombWarrior: {
    name: 'Tomb Warrior',
    description: 'Cursed Tomb Warrior from far east. Hard to perish. Can throw curses himself.',
    hp: 100,
    maxHp: 100,
    damage: [2, 12], // 2d6 damage
    apdamage: 2,
    armor: 2,
    speed: 1,
    cost: 60,
    range: 20,
    ammo: 40,
    morale: 300,
    maxMorale: 300,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/NecroTombWarrior.png'
    },
    BlackCavalry: {
        name: 'Black Cavalry',
        description: 'Grim raiders in plated armors using claymores and black magic.',
        hp: 80,
        maxHp: 80,
        damage: [2, 6], // 2d6 damage
        apdamage: 2,
        armor: 3,
        speed: 5,
        cost: 70,
        range: 1,
        ammo: 0,
        morale: 200,
        maxMorale: 200,
        orders: 'attack',
        category: 'Cavalry',
        portrait: 'assets/BlackCavalry.png'
    },
    DarkMessenger: {
    name: 'Dark Messenger',
    description: 'Fear and sorrow follows Raider of black armored beast as he brings death and destruction.',
    hp: 333,
    maxHp: 333,
    damage: [4, 12], // 2d12 damage
    apdamage: 4,
    armor: 5,
    speed: 5,
    cost: 300,
    range: 80,
    ammo: 60,
    morale: 400,
    maxMorale: 400,
    orders: 'attack',
    category: 'Cavalry',
    portrait: 'assets/DarkRider.png'
    },
    NecroDisciple: {
    name: 'Necro Disciple',
    description: 'Death disciple - Dying humanoid transferring to undead state. Unexperienced magic caster.',
    hp: 40,
    maxHp: 40,
    damage: [1, 6], // d6 damage
    apdamage: 2,
    armor: 0,
    speed: 0.5,
    cost: 25,
    range: 30,
    ammo: 60,
    morale: 85,
    maxMorale: 85,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/NecroAcollyte.png'
    },
    NecroSister: {
    name: 'Sister-of-no-mercy',
    description: 'Sister-of-no-mercy uses mutated body to launch biohazard and fungoidal projectiles.',
    hp: 30,
    maxHp: 30,
    damage: [1, 4], // d4 damage
    apdamage: 1,
    armor: 0,
    speed: 1.75,
    cost: 30,
    range: 45,
    ammo: 160,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/VideoDromeAgent.png'
    },
    NecroNecromant: {
    name: 'Master Necromant',
    description: 'Powerful magician, master of the dark arts.',
    hp: 150,
    maxHp: 150,
    damage: [1, 20], // d50 damage
    apdamage: 3,
    armor: 2,
    speed: 1,
    cost: 200,
    range: 50,
    ammo: 100,
    morale: 250,
    maxMorale: 250,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/NecroSkeletalMagus.png'
    },
    NecroLich: {
    name: 'Master Lich',
    description: 'Skeletal magicians who uncover secret of eternal life gain incredible power, and become masters of life and death.',
    hp: 3300,
    maxHp: 3300,
    damage: [1, 100], // 10d10 damage
    apdamage: 4,
    armor: 8,
    speed: 0.5,
    cost: 8000,
    range: 160,
    ammo: 300,
    morale: 3000,
    maxMorale: 3000,
    orders: 'attack',
    category: 'General',
    portrait: 'assets/NecroLich.png'
    },
    PirateSeaDog: {
    name: 'Sea Puppy',
    description: 'Sea Puppy - Unexperierenced adventure seeker.',
    hp: 25,
    maxHp: 25,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 1,
    speed: 1.5,
    cost: 5,
    range: 1,
    ammo: 0,
    morale: 45,
    maxMorale: 45,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/PirateSeaDog.png'
    },
    PirateColonist: {
    name: 'Colonist',
    description: 'Colonist - survivor. Can throw primitve javelins.',
    hp: 30,
    maxHp: 30,
    damage: [1, 4], // d3 damage
    apdamage: 1,
    armor: 1,
    speed: 1.5,
    cost: 10,
    range: 30,
    ammo: 30,
    morale: 50,
    maxMorale: 50,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/PirateColonist.png'
    },
    PirateFurry: {
    name: 'Pirate Furry',
    description: 'Pirate Furry ball of something. Sometimes bites. Dangerously cute.',
    hp: 10,
    maxHp: 10,
    damage: [1, 4], // d3 damage
    apdamage: -1,
    armor: 1,
    speed: 0.5,
    cost: 1,
    range: 1,
    ammo: 0,
    morale: 40,
    maxMorale: 40,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/PirateFurry.png'
    },
    PirateSwabbie: {
    name: 'PirateSwabbie',
    description: 'Pirate Swabbie - recruit with wooden stick.',
    hp: 20,
    maxHp: 20,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 0,
    speed: 0.75,
    cost: 5,
    range: 1,
    ammo: 0,
    morale: 45,
    maxMorale: 45,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/PirateSwabbie.png'
    },
    PirateAdventurer: {
    name: 'PirateAdventurer',
    description: 'Pirate Adventurer.',
    hp: 30,
    maxHp: 30,
    damage: [1, 4], // d4 damage
    apdamage: 0,
    armor: 0,
    speed: 1,
    cost: 10,
    range: 1,
    ammo: 0,
    morale: 60,
    maxMorale: 60,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/PirateAdventurer.png'
    },
    PirateBlade: {
    name: 'Pirate Blade',
    description: 'Pirate Blade. Do not understimate him!',
    hp: 50,
    maxHp: 50,
    damage: [1, 6], // d3 damage
    apdamage: 1,
    armor: 0,
    speed: 1.75,
    cost: 25,
    range: 1,
    ammo: 0,
    morale: 80,
    maxMorale: 80,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/PirateBlade.png'
    },
    PirateAvantguarde: {
    name: 'Pirate Avantguarde',
    description: 'Pirate Avantguarde - armed with dangerous pistols. Fast and agile.',
    hp: 45,
    maxHp: 45,
    damage: [2, 8], // d3 damage
    apdamage: 3,
    armor: 0,
    speed: 2,
    cost: 45,
    range: 40,
    ammo: 60,
    morale: 65,
    maxMorale: 65,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/PirateAvantguarde.png'
    },
    PirateBuccaneer: {
    name: 'Pirate Buccaneer',
    description: 'Pirate Buccaneer armed with long rifle.',
    hp: 60,
    maxHp: 60,
    damage: [1, 10], // d3 damage
    apdamage: 2,
    armor: 0,
    speed: 2.5,
    cost: 70,
    range: 120,
    ammo: 60,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/PirateBuccaneer.png'
    },
    PirateVoodoo: {
    name: 'Pirate Voodoo',
    description: 'Pirate Voodoo witch. Uses short range magic.',
    hp: 80,
    maxHp: 80,
    damage: [2, 12], // 2d6 damage
    apdamage: 2,
    armor: 1,
    speed: 1.25,
    cost: 90,
    range: 40,
    ammo: 80,
    morale: 160,
    maxMorale: 160,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/PirateVoodoo.png'
    },
    PirateCaptain: {
    name: 'Pirate Captain',
    description: 'Pirate Captain, master of naval strategy. Armed with all the best what golden tallars can buy. Flyer.',
    hp: 250,
    maxHp: 250,
    damage: [2, 24], // 2d12 damage
    apdamage: 4,
    armor: 3,
    speed: 6,
    cost: 500,
    range: 80,
    ammo: 80,
    morale: 400,
    maxMorale: 400,
    orders: 'skirmish',
    category: 'General',
    portrait: 'assets/PirateCaptain.png'
    },
    PirateTankiette: {
    name: 'Pirate Tankiette',
    description: 'Pirate Tankiette. Rides, but does not shoot.',
    hp: 30,
    maxHp: 30,
    damage: [1, 4], // d4 damage
    apdamage: 0,
    armor: 1,
    speed: 2,
    cost: 15,
    range: 1,
    ammo: 1,
    morale: 60,
    maxMorale: 60,
    orders: 'attack',
    category: 'Cavalry',
    portrait: 'assets/PirateTankiette.png'
    },
    PirateTankLight: {
    name: 'Pirate Light Tank',
    description: 'Pirate Light Tank. Shoots cocoa. Not a joke.',
    hp: 40,
    maxHp: 40,
    damage: [1, 4], // d4 damage
    apdamage: 0,
    armor: 2,
    speed: 1,
    cost: 30,
    range: 30,
    ammo: 40,
    morale: 75,
    maxMorale: 75,
    orders: 'skirmish',
    category: 'Cavalry',
    portrait: 'assets/PirateTankLight.png'
    },
    PirateTankMedium: {
    name: 'Pirate Medium Tank',
    description: 'Pirate Medium Tank. Armor made from better wood, actually has a real cannon.',
    hp: 160,
    maxHp: 160,
    damage: [1, 20], // d8 damage
    apdamage: 4,
    armor: 6,
    speed: 0.75,
    cost: 350,
    range: 240,
    ammo: 30,
    morale: 400,
    maxMorale: 400,
    orders: 'skirmish',
    category: 'Cavalry',
    portrait: 'assets/PirateTankMedium.png'
    },
    PirateTankHeavy: {
    name: 'Pirate Heavy Tank',
    description: 'Pirate Heavy Tank - made partially from armored steel, with huge gun.',
    hp: 1240,
    maxHp: 1240,
    damage: [1, 50], // d3 damage
    apdamage: 6,
    armor: 12,
    speed: 0.5,
    cost: 8200,
    range: 250,
    ammo: 60,
    morale: 2000,
    maxMorale: 2000,
    orders: 'skirmish',
    category: 'Cavalry',
    portrait: 'assets/PirateTankHeavy.png'
    },
    TrenchTankGiant: {
    name: 'Trench Tank - Super Heavy',
    description: 'Giant Trench Tank - very slow, but with thick armor and powerful cannon..',
    hp: 3200,
    maxHp: 3200,
    damage: [1, 50], // d3 damage
    apdamage: 20,
    armor: 20,
    speed: 0.35,
    cost: 23500,
    range: 40,
    ammo: 60,
    morale: 5000,
    maxMorale: 5000,
    orders: 'skirmish',
    category: 'Cavalry',
    portrait: 'assets/TrenchTankSuperHeavy.png'
    },
    TrenchZombie: {
    name: 'Trench Zombie',
    description: 'Half-undead trooper intoxicated with gases.',
    hp: 15,
    maxHp: 15,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 1,
    speed: 0.5,
    cost: 5,
    range: 1,
    ammo: 0,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/TrenchZombie.png'
    },
    TrenchTrooper: {
    name: 'Trench Trooper',
    description: 'Trench Trooper. Puppet of war.',
    hp: 45,
    maxHp: 45,
    damage: [1, 10], // d3 damage
    apdamage: 3,
    armor: 0,
    speed: 0.75,
    cost: 35,
    range: 120,
    ammo: 40,
    morale: 55,
    maxMorale: 55,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/TrenchTrooper.png'
    },
    TrenchGrenadier: {
    name: 'Trench Grenadier',
    description: 'Trench Grenadier uses wide range of throwing projectiles, from grenades to gas bombs.',
    hp: 55,
    maxHp: 55,
    damage: [1, 20], // d3 damage
    apdamage: 4,
    armor: 1,
    speed: 0.85,
    cost: 45,
    range: 30,
    ammo: 25,
    morale: 85,
    maxMorale: 85,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/TrenchGrenadier.png'
    },
    TrenchAssault: {
    name: 'Trench Assault',
    description: 'Trench Assault squads are specially buffed trenches zombie weaponized with flamethrowers.',
    hp: 45,
    maxHp: 45,
    damage: [1, 4], // d3 damage
    apdamage: 10,
    armor: 1,
    speed: 1.25,
    cost: 35,
    range: 20,
    ammo: 80,
    morale: 145,
    maxMorale: 145,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/TrenchAssault.png'
    },
    TrenchEnforcer: {
    name: 'Trench Enforcer',
    description: 'Trench Enforcer - amored flamethrower unit. Deadly and fanatical.',
    hp: 145,
    maxHp: 145,
    damage: [1, 20], // d3 damage
    apdamage: 6,
    armor: 3,
    speed: 0.5,
    cost: 350,
    range: 20,
    ammo: 160,
    morale: 666,
    maxMorale: 666,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/TrenchEnforcer.png'
    },
    TrenchHellSergeant: {
    name: 'Trench Hell Sergeant',
    description: 'Trench Hell Sergeant. Uses plasma thrower, burns everything.',
    hp: 85,
    maxHp: 85,
    damage: [3, 30], // 3d10 damage
    apdamage: 10,
    armor: 0,
    speed: 1.25,
    cost: 350,
    range: 40,
    ammo: 90,
    morale: 400,
    maxMorale: 400,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/TrenchHellSergeant.png'
    },
    TrenchGasSoldat: {
    name: 'Trench Soldat',
    description: 'Will do everything to survive. If he dies, his body will be recycled to Trench Zombie and sent to the front again.',
    hp: 60,
    maxHp: 60,
    damage: [1, 10], // 1d10 damage
    apdamage: 2,
    armor: 0,
    speed: 1.5,
    cost: 65,
    range: 120,
    ammo: 120,
    morale: 55,
    maxMorale: 55,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/TrenchHellSergeant.png'
    },
    
    WhiteRabbit: {
    name: 'White Rabbit',
    description: 'White Rabbit. Bloodthirsty, ruthless.',
    hp: 30000,
    maxHp: 30000,
    damage: [10, 20], // 10d20 damage
    apdamage: 25,
    armor: 0,
    speed: 10,
    cost: 25000,
    range: 1,
    ammo: 0,
    morale: 10000,
    maxMorale: 10000,
    orders: 'attack',
    category: 'General',
    portrait: 'assets/WhiteRabbit.png'
    },
    MutantTroglodyte: {
    name: 'Troglodyte',
    description: 'Troglodyte, primitive humanoid with abnormal amount of chromosomes. Easy presy to mutations. Strong and aggressive.',
    hp: 25,
    maxHp: 25,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 0,
    speed: 1.5,
    cost: 5,
    range: 1,
    ammo: 0,
    morale: 75,
    maxMorale: 75,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/MutantTroglodyte.png'
    },
    Mutant: {
    name: 'Mutant',
    description: 'Mutated troglodyte. Stronger, more aggressive, and now - very, very hungry.',
    hp: 45,
    maxHp: 45,
    damage: [2, 3], // d3 damage
    apdamage: 0,
    armor: 0,
    speed: 2,
    cost: 35,
    range: 3,
    ammo: 200,
    morale: 125,
    maxMorale: 125,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/MutantGrunt.png'
    },
    MutantAlpha: {
    name: 'MutantAlpha',
    description: 'Evolution, or rather extreme battle conditions force even more extreme mutations in troglodyte bodies. Abnormal and chaostic production of mutagen causes 6 times stronger units. Their muscles are so hard, that become armor. ',
    hp: 105,
    maxHp: 105,
    damage: [2, 6], // 10d10 damage
    apdamage: 1,
    armor: 1,
    speed: 10,
    cost: 50,
    range: 4,
    ammo: 400,
    morale: 330,
    maxMorale: 330,
    orders: 'attack',
    category: 'Infantry',
    portrait: 'assets/MutantAlpha.png'
    },
    MutantHiveMaster: {
    name: 'HiveMaster',
    description: 'Sometimes many mutants combine themselves in meat pulp and become new entity known as Hive Master. It is believed it is evolutions way to use intelligence and telepathy to make mutants event more efficient devourers.',
    hp: 3000,
    maxHp: 3000,
    damage: [1, 50], // 1d100 damage
    apdamage: 5,
    armor: 0,
    speed: 2,
    cost: 1500,
    range: 50,
    ammo: 1000,
    morale: 2000,
    maxMorale: 2000,
    orders: 'attack',
    category: 'General',
    portrait: 'assets/MutantHiveMaster.png'
    },
    MutantFly: {
    name: 'Mutant Fly',
    description: 'Aka "Flying piranha" - mutated meat pulp with wings and teeths. ',
    hp: 10,
    maxHp: 10,
    damage: [2, 3], // 2d3 damage
    apdamage: 1,
    armor: 0,
    speed: 2.25,
    cost: 20,
    range: 1,
    ammo: 0,
    morale: 40,
    maxMorale: 40,
    orders: 'attack',
    category: 'Cavalry',
    portrait: 'assets/MutantFly.png'
    },
    InsectsToothFairy: {
    name: 'Tooth Fairy',
    description: 'One of many mutations. Uses teeths to rip off eyeballs and use them as auxilliary egg shells during mating season.',
    hp: 45,
    maxHp: 45,
    damage: [3, 3], // d3 damage
    apdamage: 2,
    armor: 0,
    speed: 14,
    cost: 35,
    range: 40,
    ammo: 60,
    morale: 45,
    maxMorale: 45,
    orders: 'attack',
    category: 'Cavalry',
    portrait: 'assets/InsectsToothFairy.png'
    },// Add more units as needed
    InsectMothFairy: {
    name: 'Moth Fairy',
    description: 'Insect-Human hybrid, fights using sword and telepathy. Like most mutants, very fast.',
    hp: 45,
    maxHp: 45,
    damage: [2, 6], // d3 damage
    apdamage: 2,
    armor: 0,
    speed: 2.25,
    cost: 45,
    range: 40,
    ammo: 30,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/InsectMothFairy.png'
    },
    InsectWhisperer: {
    name: 'Whisperer',
    description: 'There are mutants who can talk with insectoids. They do not fight themselves, their guardians do it for them.',
    hp: 45,
    maxHp: 45,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 0,
    speed: 1.25,
    cost: 35,
    range: 40,
    ammo: 60,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/InsectWhisperer.png'
    },
    MonsterHiveQueen: {
    name: 'Monster Hive Queen',
    description: 'Breeder of worlds.',
    hp: 45,
    maxHp: 45,
    damage: [2, 6], // d3 damage
    apdamage: 2,
    armor: 0,
    speed: 2.25,
    cost: 45,
    range: 40,
    ammo: 30,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/InsectHiveQueen.png'
    },
    MonsterCapibara: {
    name: 'Monstrous Capibara',
    description: 'Mutation of giant rat and capibara.',
    hp: 45,
    maxHp: 45,
    damage: [1, 4], // d3 damage
    apdamage: 0,
    armor: 0,
    speed: 1.25,
    cost: 35,
    range: 40,
    ammo: 60,
    morale: 45,
    maxMorale: 45,
    orders: 'skirmish',
    category: 'Range',
    portrait: 'assets/MonsterGiantRatMutant.png'
    },
    MutantGiantChau: {
    name: 'White Rabbit',
    description: 'White Rabbit. Bloodthirsty, ruthless.',
    hp: 1000,
    maxHp: 1000,
    damage: [1, 100], // 10d10 damage
    apdamage: 25,
    armor: 0,
    speed: 10,
    cost: 25000,
    range: 1,
    ammo: 0,
    morale: 10000,
    maxMorale: 10000,
    orders: 'attack',
    category: 'General',
    portrait: 'assets/MutantGiantChau.png'
    },
    
    // Add more units as needed
};