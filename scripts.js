// scripts.js
let particles = []; // Define particles array globally
let isPaused = false;
let selectedUnitType = 'Infantry';
let selectedOrderType = 'attack';
let playerUnits = [];
let enemyUnits = [];
let SlotsNumber = 6;
let LogInfoLevel=1;
let MoraleRoundReward = 1;
let totemPosition = null;


let battlefieldWidth = 800;
let battlefieldHeight = 800;
const originalConsoleLog = console.log;
console.log = function(message) {
    originalConsoleLog(message);
    const logDiv = document.getElementById('console-logs');
    if (logDiv) {
        const logMessage = document.createElement('div');
        logMessage.textContent = message;
        logDiv.appendChild(logMessage);
        logDiv.scrollTop = logDiv.scrollHeight; // Scroll to the bottom
    }
};

//checkCookie();


document.addEventListener('DOMContentLoaded', () => {
    
    generateUnitSlots('player');
    generateUnitSlots('enemy');

        document.getElementById('battlefield').addEventListener('click', function(event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        totemPosition = { x: x, y: y };
        drawTotem();
    });

    
document.getElementById('start-battle').addEventListener('click', function() {
    battlefieldWidth = parseInt(document.getElementById('battlefield-width').value);
    battlefieldHeight = parseInt(document.getElementById('battlefield-height').value);
   // SlotsNumber = parseInt(document.getElementById('slots-number').value);

    document.getElementById('battlefield').width = battlefieldWidth;
    document.getElementById('battlefield').height = battlefieldHeight;
    generateUnitSlots('player');
    generateUnitSlots('enemy');
    //startBattle();
});


    document.getElementById('start-battle').addEventListener('click', startBattle);
    document.getElementById('pause-battle').addEventListener('click', togglePause);
   // document.getElementById('unit-editor').addEventListener('click', window.location.href = 'editor.html');
    document.getElementById('select-infantry').addEventListener('click', () => selectUnitType('Infantry'));
    document.getElementById('select-range').addEventListener('click', () => selectUnitType('Range'));
    document.getElementById('select-cavalry').addEventListener('click', () => selectUnitType('Cavalry'));
    document.getElementById('select-general').addEventListener('click', () => selectUnitType('General'));
    document.getElementById('select-attack').addEventListener('click', () => selectedOrderSet('attack'));
    document.getElementById('select-skirmish').addEventListener('click', () => selectedOrderSet('skirmish'));
    document.getElementById('select-defend').addEventListener('click', () => selectedOrderSet('defend'));
    document.getElementById('select-retreat').addEventListener('click', () => selectedOrderSet('retreat'));
    document.getElementById('select-follow').addEventListener('click', () => selectedOrderSet('follow'));
    document.getElementById('select-regroup').addEventListener('click', () => selectedOrderSet('regroup'));
    document.getElementById('help-rules').addEventListener('click', () => {
        document.getElementById('help-popup').style.display = 'block';
    });
    document.getElementById('unit-editor').addEventListener('click', () => {
        document.getElementById('editor-popup').style.display = 'block';
    });
    document.getElementById('about').addEventListener('click', () => {
        document.getElementById('about-popup').style.display = 'block';
    });
    document.getElementById('close-help').addEventListener('click', () => {
        document.getElementById('help-popup').style.display = 'none';
    });
    document.getElementById('close-editor').addEventListener('click', () => {
        document.getElementById('editor-popup').style.display = 'none';
    });
    document.getElementById('close-about').addEventListener('click', () => {
        document.getElementById('about-popup').style.display = 'none';
    });
    document.addEventListener('keydown', (event) => {
        const unitsToMove = playerUnits.filter(unit => unit.category === selectedUnitType);
        if (unitsToMove.length === 0) return;
    
        unitsToMove.forEach(unit => {
            switch (event.key) {
                case 'w':
                    unit.y = Math.max(0, unit.y - 10);
                    break;
                case 's':
                    unit.y = Math.min(battlefieldHeight, unit.y + 10);
                    break;
                case 'a':
                    unit.x = Math.max(0, unit.x - 10);
                    break;
                case 'd':
                    unit.x = Math.min(battlefieldWidth, unit.x + 10);
                    break;
            }
        });
    });
    
});




const playerInitialSlotCounts = new Array(SlotsNumber).fill(0);
const enemyInitialSlotCounts = new Array(SlotsNumber).fill(0);

const playerUnitSlotCounts = new Array(SlotsNumber).fill(0);
const enemyUnitSlotCounts = new Array(SlotsNumber).fill(0);




function generateUnitSlots(side) {
    const unitContainer = document.getElementById(`${side}-units`);
    unitContainer.innerHTML = ''; // Clear existing slots
    for (let i = 1; i <= SlotsNumber; i++) {
        const unitSlot = document.createElement('div');
        unitSlot.classList.add('unit-slot');
        unitSlot.innerHTML = `
            <label>Unit Type:
                <select id="${side}-unit${i}" onchange="updateUnitStats('${side}', ${i})">
                    ${Object.keys(units).map(unit => `<option value="${unit}">${unit}</option>`).join('')}
                </select>
            </label>
            <label>Count: <input type="number" id="${side}-unit${i}-count" min="1" value="400" onchange="updateUnitStats('${side}', ${i})"></label>
            <div id="${side}-unit${i}-stats" class="unit-stats"></div>
        `;
        unitContainer.appendChild(unitSlot);
        updateUnitStats(side, i); // Initialize with default values
    }
}

function updateUnitStats(side, slot) {
    const unitType = document.getElementById(`${side}-unit${slot}`).value;
    const unit = units[unitType];
    const statsElement = document.getElementById(`${side}-unit${slot}-stats`);
    if (statsElement) {
        statsElement.innerHTML = `
            <img src="${unit.portrait}" alt="${unit.name}" class="unit-portrait">
            <p>${unit.name}</p>
            <p>${unit.description}</p>
            <p>HP: ${unit.hp}</p>
            <p>Armor: ${unit.armor}</p>
            <p>Damage: ${unit.damage.join('d')}</p>
            <p>Armor Piercing Dmg: ${unit.apdamage}</p>
            <p>Speed: ${unit.speed}</p>
            <p>Range: ${unit.range}</p>
            <p>Ammo: ${unit.ammo}</p>
            <p>Morale: ${unit.morale}</p>
            <p>Orders: ${unit.orders}</p>
            <p>Category: ${unit.category}</p>
            <p>Cost: ${unit.cost}</p>
            <p>Total Cost: ${unit.cost * parseInt(document.getElementById(`${side}-unit${slot}-count`).value)}</p>
        `;
    }
    updateSummary();
}

function updateSummary() {
    const playerSummary = document.getElementById('player-summary');
    const enemySummary = document.getElementById('enemy-summary');
    let playerTotalCost = 0;
    let enemyTotalCost = 0;
    let playerTotalArmy = 0;
    let enemyTotalArmy = 0;
    let playerUnitDetails = '';
    let enemyUnitDetails = '';

    for (let i = 1; i <= SlotsNumber; i++) {
        const playerUnitElement = document.getElementById(`player-unit${i}`);
        const enemyUnitElement = document.getElementById(`enemy-unit${i}`);
        if (playerUnitElement && enemyUnitElement) {
            const playerUnitCount = parseInt(document.getElementById(`player-unit${i}-count`).value);
            const enemyUnitCount = parseInt(document.getElementById(`enemy-unit${i}-count`).value);
            const playerUnitCost = units[playerUnitElement.value].cost;
            const enemyUnitCost = units[enemyUnitElement.value].cost;
            playerTotalCost += playerUnitCount * playerUnitCost;
            enemyTotalCost += enemyUnitCount * enemyUnitCost;
            playerTotalArmy += playerUnitCount;
            enemyTotalArmy += enemyUnitCount;

            playerUnitDetails += `Slot ${i}, ${units[playerUnitElement.value].name}, ${playerUnitCount}/${playerUnitCount}<br>`;
            enemyUnitDetails += `Slot ${i}, ${units[enemyUnitElement.value].name}, ${enemyUnitCount}/${enemyUnitCount}<br>`;
        }
    }
    playerSummary.innerHTML = `Player Army Value: ${playerTotalCost}<br>Soldier Count: ${playerTotalArmy}`;
    enemySummary.innerHTML = `Enemy Army Value: ${enemyTotalCost}<br>Soldier Count: ${enemyTotalArmy}`;

    document.getElementById('player-total-units').innerText = playerTotalArmy;
    document.getElementById('player-alive-counter').innerText = playerTotalArmy;
    document.getElementById('enemy-total-units').innerText = enemyTotalArmy;
    document.getElementById('enemy-alive-counter').innerText = enemyTotalArmy;
    document.getElementById('player-unit-details').innerHTML = playerUnitDetails;
    document.getElementById('enemy-unit-details').innerHTML = enemyUnitDetails;
}

function startBattle() {
   // checkCookie()
    const playerAmmoSize = parseInt(document.getElementById('player-army-size').value);
    const playerMorale = parseInt(document.getElementById('player-morale').value);
    const enemyAmmoSize = parseInt(document.getElementById('enemy-army-size').value);
    const enemyMorale = parseInt(document.getElementById('enemy-morale').value);

    const playerUnitCounts = getUnitCounts('player');
    const enemyUnitCounts = getUnitCounts('enemy');

    playerUnits = createUnits('player', playerUnitCounts, playerMorale, playerAmmoSize);
    enemyUnits = createUnits('enemy', enemyUnitCounts, enemyMorale, enemyAmmoSize);

    document.getElementById('pre-battle').style.display = 'none';
    document.getElementById('battle').style.display = 'block';
    requestAnimationFrame(updateBattle);
    
}



function updateBattle() {
    if (!isPaused) {
        moveUnits(playerUnits, enemyUnits);
        moveUnits(enemyUnits, playerUnits);
        drawBattlefield(document.getElementById('battlefield').getContext('2d'));
    }
    requestAnimationFrame(updateBattle);
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        document.getElementById('pause-battle').textContent = 'Resume Simulation';
    } else {
        document.getElementById('pause-battle').textContent = 'Pause Simulation';
    }
}

function selectUnitType(type) {
    selectedUnitType = type;
    const footmenButton = document.getElementById('select-infantry');
    const archersButton = document.getElementById('select-range');
    const cavalryButton = document.getElementById('select-cavalry');
    const generalButton = document.getElementById('select-general');

    if (footmenButton) footmenButton.classList.remove('active');
    if (archersButton) archersButton.classList.remove('active');
    if (cavalryButton) cavalryButton.classList.remove('active');
    if (generalButton) generalButton.classList.remove('active');

    const selectedButton = document.getElementById(`select-${type}`);
    if (selectedButton) selectedButton.classList.add('active');

    document.getElementById('selected-unit-type').textContent = `Units chosen: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    if (LogInfoLevel >= 1) {
        console.log(`${side}s ${unit.name}, slot ${unit.slot}, is dead.`); console.log('Selected unit category - ' + selectedUnitType + '.' + ')');
    }
    
}



function selectedOrderSet(order) {
    selectedOrderType = order;
    if (LogInfoLevel >= 1) {
        console.log('Orders selected: Unit category -' + selectedUnitType + ', order: ' + selectedOrderType + ')');
    }
    
    const AttackButton = document.getElementById('select-Attack');
    const SkirmishButton = document.getElementById('select-Skirmish');
    const DefendButton = document.getElementById('select-Defend');
    const RetreatButton = document.getElementById('select-Retreat');
    const FollowButton = document.getElementById('select-Follow');
    const RegroupButton = document.getElementById('select-Regroup');
    
    
    if (AttackButton) AttackButton.classList.remove('active');
    if (SkirmishButton) SkirmishButton.classList.remove('active');
    if (DefendButton) DefendButton.classList.remove('active');
    if (RetreatButton) RetreatButton.classList.remove('active');
    if (FollowButton) FollowButton.classList.remove('active');
    if (RegroupButton) RegroupButton.classList.remove('active');
   

    const selectedButton = document.getElementById(`select-${order}`);
    if (selectedButton) selectedButton.classList.add('active');

    document.getElementById('selected-unit-order').textContent = `Orders: ${order.charAt(0).toUpperCase() + order.slice(1)}`;
    changeOrders(selectedUnitType,selectedOrderType);
}


function changeOrders(selectedUnitType, selectedOrderType) {
    playerUnits.forEach(unit => {
        if (unit.category === selectedUnitType) {
            unit.orders = selectedOrderType;
            if (LogInfoLevel >= 3) {
                console.log('EXECUTION: Orders given to ' + unit.name + ' category (' + selectedUnitType + '), unit current health: '  + unit.hp + ' , morale: ' + selectedOrderType + ')');
            }
        }
    });
}




function getUnitCounts(side) {
    const unitCounts = [];
    for (let i = 1; i <= SlotsNumber; i++) {
        const countElement = document.getElementById(`${side}-unit${i}-count`);
        if (countElement) {
            const count = parseInt(countElement.value);
            unitCounts.push(count);
        }
    }
    return unitCounts;
}

function placeInfantry(units, startX, startY, unitsPerRow) {
    let x = startX;
    let y = startY;
    units.forEach((unit, index) => {
        unit.x = x;
        unit.y = y;
        x += 5; // Adjust spacing as needed
        if ((index + 1) % unitsPerRow === 0) {
            x = startX;
            y += 5; // Adjust row spacing as needed
        }
    });
}

function placeRange(units, startX, startY, spreadX, spreadY) {
    units.forEach(unit => {
        unit.x = startX + Math.random() * spreadX;
        unit.y = startY + Math.random() * spreadY;
    });
}

function placeCavalryX(units, startX, startY, wedgeAngle) {
    let rows = Math.ceil(Math.sqrt(units.length));
    let unitsInRow = 1;
    let rowCount = 0;
    units.forEach((unit, index) => {
        let offsetX = rowCount * wedgeAngle;
        let offsetY = rowCount * 10;
        unit.x = startX + offsetX - unitsInRow * 5;
        unit.y = startY + offsetY;
        unitsInRow++;
        if (unitsInRow > rows) {
            unitsInRow = 1;
            rowCount++;
        }
    });
}

function placeShock(units, centerX, centerY, radius) {
    units.forEach((unit, index) => {
        let angle = (index / units.length) * Math.PI * 2;
        unit.x = centerX + Math.cos(angle) * radius;
        unit.y = centerY + Math.sin(angle) * radius;
    });
}

function placeCavalry(units, battlefieldWidth, battlefieldHeight) {
    units.forEach(unit => {
        let side = Math.random() < 0.5 ? 'left' : 'right';
        unit.x = side === 'left' ? Math.random() * battlefieldWidth * 0.25 : battlefieldWidth * 0.75 + Math.random() * battlefieldWidth * 0.25;
        unit.y = Math.random() * battlefieldHeight;
    });
}

function placeUnits(unitsArray, side, category, startX, startY) {
    switch (category) {
        case 'Infantry':
            placeInfantry(unitsArray, startX, startY, 10);
            break;
        case 'Range':
            placeRange(unitsArray, startX, startY, 400, 200);
            break;
        case 'Cavalry':
            placeInfantry(unitsArray, startX, startY, 10);
            break;
        case 'Shock':
            placeShock(unitsArray, startX, startY, 50);
            break;
        case 'Flanker':
            placeFlanker(unitsArray, battlefieldWidth, battlefieldHeight);
            break;
    }
}


function updateSlotDetails(side, slotCounts, initialSlotCounts) {
    const unitDetailsElement = document.getElementById(`${side}-unit-details`);
    let unitDetails = '';

    for (let i = 1; i <= SlotsNumber; i++) {
        const unitElement = document.getElementById(`${side}-unit${i}`);
        if (unitElement) {
            const unitType = unitElement.value;
            const unit = units[unitType];
            const aliveCount = slotCounts[i - 1];
            const initialCount = initialSlotCounts[i - 1];
            unitDetails += `Slot ${i}, ${unit.name}, ${aliveCount}/${initialCount}<br>`;
        }
    }
    unitDetailsElement.innerHTML = unitDetails;
}


function createUnits(side, unitCounts, morale, ammo) {
    const unitsArray = [];
    const startX = side === 'player' ? 100 : 700;
    const startY = side === 'player' ? 100 : 700;
    const slotCounts = side === 'player' ? playerUnitSlotCounts : enemyUnitSlotCounts;
    const initialSlotCounts = side === 'player' ? playerInitialSlotCounts : enemyInitialSlotCounts;

    for (let i = 1; i <= SlotsNumber; i++) {
        const unitType = document.getElementById(`${side}-unit${i}`).value;
        const unitTemplate = units[unitType];
        const category = unitTemplate.category;
        const count = unitCounts[i - 1];
        for (let j = 0; j < count; j++) {
            const unit = createUnit(unitTemplate, side === 'enemy', morale, ammo, i);
            unitsArray.push(unit);
            slotCounts[i - 1]++;
        }
        initialSlotCounts[i - 1] += count;  // Set initial count
        placeUnits(unitsArray, side, category, startX, startY);
    }

    updateSlotDetails(side, slotCounts, initialSlotCounts);  // Update slot details after creating units
    return unitsArray;
}



function createUnit(unitTemplate, isEnemy, morale, ammunition, slot) {
    const unit = JSON.parse(JSON.stringify(unitTemplate));
    unit.hp = unitTemplate.hp * (1 + morale / 10);
    unit.maxHp = unitTemplate.maxHp * (1 + morale / 10);
    unit.ammo = unitTemplate.ammo * (1 + ammunition / 10);
    unit.damage = Math.floor(Math.random() * unitTemplate.damage[1]) + unitTemplate.damage[0];
    unit.morale = unitTemplate.morale * (1 + morale / 10);
    unit.maxMorale = unitTemplate.maxMorale * (1 + morale / 10);
    unit.orders = unitTemplate.orders;
    unit.x = isEnemy ? battlefieldWidth - Math.random() * 100 : Math.random() * 100;
    unit.y = Math.random() * battlefieldHeight;
    unit.isEnemy = isEnemy;
    unit.color = isEnemy ? 'black' : 'white';
    unit.slot = slot;
    return unit;
}


function drawBattlefield(ctx) {
    ctx.clearRect(0, 0, battlefieldWidth, battlefieldHeight);
    drawUnits(ctx, playerUnits);
    drawUnits(ctx, enemyUnits);
    drawParticles(ctx); // Draw particles after units
}


function drawTotem() {
    const canvas = document.getElementById('battlefield');
    const ctx = canvas.getContext('2d');
    if (totemPosition) {
        ctx.clearRect(0, 0, battlefieldWidth, battlefieldHeight); // Clear canvas
        drawUnits(ctx, playerUnits);
        drawUnits(ctx, enemyUnits);
        drawParticles(ctx); // Redraw particles after clearing

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(totemPosition.x, totemPosition.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function triggerDeathFX(unit) {
    const particles = 10;
    for (let i = 0; i < particles; i++) {
        createParticle(unit.x, unit.y, 'red');
    }
}

function createParticle(x, y, color) {
    const particle = {
        x: x,
        y: y,
        size: Math.random() * 3 + 1,
        color: color,
        lifetime: Math.random() * 30 + 20
    };
    particles.push(particle);
}

function drawParticles(ctx) {
    particles.forEach((particle, index) => {
        particle.lifetime--;
        if (particle.lifetime <= 0) {
            particles.splice(index, 1);
            return;
        }
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        particle.x += Math.random() * 2 - 1;
        particle.y += Math.random() * 2 - 1;
    });
}



function drawUnits(ctx, units) {
    units.forEach(unit => {
        if (unit.hp > 0) {
            switch (unit.category) {
                case 'Infantry':
                    ctx.fillStyle = unit.color;
                    ctx.fillRect(unit.x, unit.y, 5, 5);
                    break;
                case 'Range':
                    ctx.fillStyle = unit.color;
                    ctx.beginPath();
                    ctx.arc(unit.x, unit.y, 3, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'Cavalry':
                    ctx.fillStyle = unit.color;
                    ctx.beginPath();
                    ctx.moveTo(unit.x, unit.y);
                    ctx.lineTo(unit.x - 5, unit.y + 10);
                    ctx.lineTo(unit.x + 5, unit.y + 10);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 'General':
                    ctx.fillStyle = unit.color;
                    ctx.beginPath();
                    ctx.arc(unit.x, unit.y, 3, 0, Math.PI * 2);
                    ctx.moveTo(unit.x + 10, unit.y);
                    ctx.lineTo(unit.x - 10, unit.y);
                    ctx.lineTo(unit.x, unit.y + 20);
                    ctx.closePath();
                    ctx.fill();
                    break;
            }
        }
    });
}


function moveUnits(units, enemyUnits) {
    units.forEach(unit => {
        if (unit.hp <= 0) {
            triggerDeathFX(unit);
            removeUnit(unit);
            return;
        }
        if (unit.morale <= unit.maxMorale) {
            unit.morale += Math.min(MoraleRoundReward, unit.maxMorale - unit.morale);
        }
        
        if (unit.morale < 30) {
            panic(unit, units, enemyUnits);
        } else {
            switch (unit.orders) {
                case 'attack':
                    handleAttack(unit, units, enemyUnits);
                    break;
                case 'defend':
                    handleDefend(unit, units, enemyUnits);
                    break;
                case 'skirmish':
                    handleSkirmish(unit, units, enemyUnits);
                    break;
                case 'regroup':
                    handleRegroup(unit, units, enemyUnits);
                    break;
                case 'follow':
                    handleFollow(unit, units, enemyUnits);
                    break;
                case 'spread':
                    handleSpread(unit);
                    break;
                case 'retreat':
                    handleRetreat(unit);
                    break;
                default:
                    break;
            }
        }
    });
}


function handleFollow(unit, units, enemyUnits) {
    const closestEnemy = findClosestEnemy(unit, enemyUnits);
    if (closestEnemy && isInRange(unit, closestEnemy)) {
        attackUnit(unit, closestEnemy);
    } else {
        if (totemPosition) {
            moveToTarget(unit, totemPosition);
        } else {
            const center = { x: battlefieldWidth / 2, y: battlefieldHeight / 2 };
            moveToTarget(unit, center);
        }
    }
}


function handleAttack(unit, units, enemyUnits) {
    const closestEnemy = findClosestEnemy(unit, enemyUnits);
    if (closestEnemy) {
        if (!isInRange(unit, closestEnemy)) {
            moveToTarget(unit, closestEnemy);
        } else {
            attackUnit(unit, closestEnemy);
        }
    }
}

function handleDefend(unit, units, enemyUnits) {
    const closestEnemy = findClosestEnemy(unit, enemyUnits);
    if (closestEnemy) {
        if (unit.morale > 30) {
            unit.morale += Math.min(2, unit.maxMorale - unit.morale);
            if (isInRange(unit, closestEnemy)) {
                attackUnit(unit, closestEnemy);
            }
        } else {
            const closestAlly = findClosestAlly(unit, units);
            moveToTarget(unit, closestAlly);
        }
    }
}

function handleSkirmish(unit, units, enemyUnits) {
    const closestEnemy = findClosestEnemy(unit, enemyUnits);
    if (closestEnemy) {
        if (unit.ammo > 0 && unit.morale > 30) {
            if (!isInRange(unit, closestEnemy)) {
                moveToTarget(unit, closestEnemy);
            } else {
                moveToSafety(unit, closestEnemy);
                attackUnit(unit, closestEnemy);
            }
        } else {
            if (!isInRange(unit, closestEnemy)) {
                const randomAlly = findRandomAlly(unit, units);
                moveToTarget(unit, randomAlly);
            } else {
                moveToSafety(unit, closestEnemy);
            }
        }
    }
}

function handleRegroup(unit, units, enemyUnits) {
    const closestAlly = findClosestAlly(unit, units);
    if (unit.morale > 30 && closestAlly) {
        moveToTarget(unit, closestAlly);
    } else {
        moveToSafety(unit, findClosestEnemy(unit, enemyUnits));
    }
}

function handleSpread(unit) {
    const dx = Math.random() * 90 + 10; // Move by 10-100 px
    const dy = Math.random() * 90 + 10;
    unit.x += dx * (Math.random() < 0.5 ? -1 : 1);
    unit.y += dy * (Math.random() < 0.5 ? -1 : 1);
}

function handleRetreat(unit) {
    const targetX = unit.isEnemy ? battlefieldWidth : 0;
    const targetY = unit.isEnemy ? battlefieldHeight : 0;
    moveToTarget(unit, { x: targetX, y: targetY });
}

function panic(unit, units, enemyUnits) {
    const closestEnemy = findClosestEnemy(unit, enemyUnits);
    if (closestEnemy && isInRange(unit, closestEnemy)) {
        moveToSafety(unit, closestEnemy);
    } else {
        const closestAlly = findClosestAlly(unit, units);
        if (closestAlly) {
            moveToTarget(unit, closestAlly);
        } else {
            handleSpread(unit); // Random movement if no allies are found
        }
    }
}







function findClosestAlly(unit, units) {
    let closestAlly = null;
    let closestDistance = Infinity;
    units.forEach(ally => {
        let distance = Math.hypot(ally.x - unit.x, ally.y - unit.y);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestAlly = ally;
        }
    });
    return closestAlly;
}

function moveToSafety(unit, target) {
    let angle = Math.atan2(unit.y - target.y, unit.x - target.x);
    unit.x += unit.speed * Math.cos(angle);
    unit.y += unit.speed * Math.sin(angle);

    
    //unit.x = (unit.x + battlefieldWidth) % battlefieldWidth;
    //unit.y = (unit.y + battlefieldHeight) % battlefieldHeight;
}


function findClosestEnemy(unit, enemyUnits) {
    let closestEnemy = null;
    let closestDistance = Infinity;
    enemyUnits.forEach(enemy => {
        if (enemy.hp > 0) {  // Only consider enemies that are still alive
            let distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestEnemy = enemy;
            }
        }
    });
    return closestEnemy;
}

function moveToTargetOLD(unit, target) {
    const dx = target.x - unit.x;
    const dy = target.y - unit.y;
    const distance = Math.sqrt(dx * dy + dy * dy);
    if (distance > 1) {
        unit.x += dx / distance;
        unit.y += dy / distance;
    }
}

function moveToTarget(unit, target) {
    let angle = Math.atan2(target.y - unit.y, target.x - unit.x);
    unit.x += unit.speed * Math.cos(angle);
    unit.y += unit.speed * Math.sin(angle);

    unit.x = (unit.x + battlefieldWidth) % battlefieldWidth;
    unit.y = (unit.y + battlefieldHeight) % battlefieldHeight;
}

function isInRange(unit, target) {
    return Math.hypot(target.x - unit.x, target.y - unit.y) <= unit.range;
}






function attackUnit(unit, target) {
    let damage = unit.damage - target.armor;
    let apdamage = unit.apdamage;
    let moraledamage = unit.damage + unit.apdamage;
    target.hp -= Math.max(damage, 0);
    target.hp -= Math.max(apdamage, 0);
    target.morale -= Math.max(moraledamage, 0);

    if (unit.ammo > 0) {
        unit.ammo -= 1;
    }

    if (target.hp <= 0) {
        target.hp = 0;
        if (LogInfoLevel >= 3) {
            console.log('Death-log: ' + unit.name +  ' gains ' + moraledamage + ' morale for killing ' + target.name + '. ');
            console.log('Killing hit damage / armor piercing damage: ' + damage +  ' / ' + apdamage);
        }
        //console.log('Death-log: ' + unit.name + ' (hp)_' + unit.hp + ' causes damage for ' + damage + ' + armor piercing damage for ' + apdamage + ' killing ' + target.name + ' (hp)_' + target.hp + ' morale: ' + target.morale);
      //  
      //  
        removeUnit(target);
        unit.morale += Math.min(target.maxHp, unit.maxMorale - unit.morale);
    }
}                                                                                                    


function removeUnit(unit) {
    const side = unit.isEnemy ? 'enemy' : 'player';
    const counterDead = `${side}-dead-counter`;
    const counterAlive = `${side}-alive-counter`;
    const slotCounts = side === 'enemy' ? enemyUnitSlotCounts : playerUnitSlotCounts;
    const initialSlotCounts = side === 'enemy' ? enemyInitialSlotCounts : playerInitialSlotCounts;

    document.getElementById(counterDead).innerText = parseInt(document.getElementById(counterDead).innerText) + 1;
    document.getElementById(counterAlive).innerText = parseInt(document.getElementById(counterAlive).innerText) - 1;

    triggerDeathFX(unit);
    slotCounts[unit.slot - 1]--;

    if (unit.isEnemy) {
        enemyUnits = enemyUnits.filter(e => e !== unit);
    } else {
        playerUnits = playerUnits.filter(u => u !== unit);
    }

 if (LogInfoLevel >= 2) {
       // console.log('Death-log: ' + unit.name +  ' gains ' + moraledamage + ' morale for killing ' + target.name + '. ');
       console.log(`${side}s ${unit.name}, slot ${unit.slot}, is dead.`);
   }
    
    updateSlotDetails(side, slotCounts, initialSlotCounts);  // Update slot details
}






function findRandomTarget(unit, enemyUnits) {
    return enemyUnits[Math.floor(Math.random() * enemyUnits.length)];
}

function findRandomAlly(unit, units) {
    return units[Math.floor(Math.random() * units.length)];
}





 // Example usage of cookies
        function setCookie(name, value, days) {
            const d = new Date();
            d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        }

        function getCookie(name) {
            const cname = name + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(cname) === 0) {
                    return c.substring(cname.length, c.length);
                }
            }
            return "";
        }

        function checkCookie() {
            let user = getCookie("username");
            if (user !== "") {
                alert("Welcome again " + user);
                console.log(`Welcome again ${user}.`);
            } else {
                user = prompt("Please enter your name:", "");
                if (user !== "" && user !== null) {
                    setCookie("username", user, 365);
                }
            }
        }
        
