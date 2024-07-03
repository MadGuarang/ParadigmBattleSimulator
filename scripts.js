// scripts.js
let isPaused = false;
let selectedUnitType = 'Infantry';
let selectedOrderType = 'attack';
let playerUnits = [];
let enemyUnits = [];
const battlefieldWidth = 800;
const battlefieldHeight = 800;

document.addEventListener('DOMContentLoaded', () => {
    generateUnitSlots('player');
    generateUnitSlots('enemy');

    document.getElementById('start-battle').addEventListener('click', startBattle);
    document.getElementById('pause-battle').addEventListener('click', togglePause);
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
    document.getElementById('save-player-army').addEventListener('click', () => saveArmy('player'));
    document.getElementById('load-player-army').addEventListener('click', () => loadArmy('player'));
    document.getElementById('save-enemy-army').addEventListener('click', () => saveArmy('enemy'));
    document.getElementById('load-enemy-army').addEventListener('click', () => loadArmy('enemy'));
    document.getElementById('help-rules').addEventListener('click', () => {
        document.getElementById('help-popup').style.display = 'block';
    });
    document.getElementById('about').addEventListener('click', () => {
        document.getElementById('about-popup').style.display = 'block';
    });
    document.getElementById('close-help').addEventListener('click', () => {
        document.getElementById('help-popup').style.display = 'none';
    });
    document.getElementById('close-about').addEventListener('click', () => {
        document.getElementById('about-popup').style.display = 'none';
    });
    document.addEventListener('keydown', (event) => {
        const generalUnit = playerUnits.find(unit => unit.category === 'General');
        if (!generalUnit) return;

        switch (event.key) {
            case 'w':
                generalUnit.y = Math.max(0, generalUnit.y - 10);
                break;
            case 's':
                generalUnit.y = Math.min(800, generalUnit.y + 10);
                break;
            case 'a':
                generalUnit.x = Math.max(0, generalUnit.x - 10);
                break;
            case 'd':
                generalUnit.x = Math.min(800, generalUnit.x + 10);
                break;
        }
    });
});




function saveArmy(side) {
    const army = [];
    for (let i = 1; i <= 6; i++) {
        const unitType = document.getElementById(`${side}-unit${i}`).value;
        const unitCount = document.getElementById(`${side}-unit${i}-count`).value;
        army.push({ unitType, unitCount });
    }
    const saveName = prompt("Choose save name:");
    if (saveName) {
        fetch('save_army.php', {
            method: 'POST',
            body: JSON.stringify({ name: saveName, side: side, army: army }),
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then(data => {
            if (data.success) {
                alert('Army saved successfully');
            } else {
                alert('Error saving army');
            }
        });
    }
}

function loadArmy(side) {
    fetch('load_army.php', {
        method: 'POST',
        body: JSON.stringify({ side: side }),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json()).then(data => {
        if (data.success) {
            const army = data.army;
            for (let i = 0; i < army.length; i++) {
                document.getElementById(`${side}-unit${i + 1}`).value = army[i].unitType;
                document.getElementById(`${side}-unit${i + 1}-count`).value = army[i].unitCount;
                updateUnitStats(side, i + 1);
            }
        } else {
            alert('Error loading army');
        }
    });
}


function generateUnitSlots(side) {
    const unitContainer = document.getElementById(`${side}-units`);
    for (let i = 1; i <= 6; i++) {
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
            <p>Damage: ${unit.damage.join('d')}</p>
            <p>ApDamage: ${unit.apdamage}</p>
            <p>Armor: ${unit.armor}</p>
            <p>Speed: ${unit.speed}</p>
            <p>Cost: ${unit.cost}</p>
            <p>Range: ${unit.range}</p>
            <p>Ammo: ${unit.ammo}</p>
            <p>Morale: ${unit.morale}</p>
            <p>orders: ${unit.orders}</p>
            <p>category: ${unit.category}</p>
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
    for (let i = 1; i <= 6; i++) {
        const playerUnitElement = document.getElementById(`player-unit${i}`);
        const enemyUnitElement = document.getElementById(`enemy-unit${i}`);
        if (playerUnitElement && enemyUnitElement) {
            const playerUnitCount = document.getElementById(`player-unit${i}-count`).value;
            const enemyUnitCount = document.getElementById(`enemy-unit${i}-count`).value;
            const playerUnitCost = units[playerUnitElement.value].cost;
            const enemyUnitCost = units[enemyUnitElement.value].cost;
            playerTotalCost += playerUnitCount * playerUnitCost;
            enemyTotalCost += enemyUnitCount * enemyUnitCost;
        }
    }
    playerSummary.innerHTML = `Player Army Value: ${playerTotalCost}`;
    enemySummary.innerHTML = `Enemy Army Value: ${enemyTotalCost}`;
}

function startBattle() {
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
}



function selectedOrderSet(order) {
    selectedOrderType = order;
    console.log('Orders selectedOrderSet -' + selectedUnitType + ', ' + selectedOrderType + ')');
    
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


function changeOrders(selectedUnitType,selectedOrderType) {
    playerUnits.forEach(unit => {
        
        if (unit.category === selectedUnitType) {
            unit.orders = selectedOrderType;
            console.log('EXECUTION: Orders --- ' + selectedUnitType + ' ==+== ' + selectedOrderType + ')');
        }
    });
}




function getUnitCounts(side) {
    const unitCounts = [];
    for (let i = 1; i <= 6; i++) {
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
            placeFlanker(unitsArray, 800, 800);
            break;
    }
}

function createUnits(side, unitCounts, morale, ammo) {
    const unitsArray = [];
    const startX = side === 'player' ? 100 : 700;
    const startY = side === 'player' ? 100 : 700;
    for (let i = 1; i <= 6; i++) {
        const unitType = document.getElementById(`${side}-unit${i}`).value;
        const unitTemplate = units[unitType];
        const category = unitTemplate.category;
        const count = unitCounts[i - 1];
        for (let j = 0; j < count; j++) {
            unitsArray.push(createUnit(unitTemplate, side === 'enemy', morale, ammo));
        }
        placeUnits(unitsArray, side, category, startX, startY);
    }
    return unitsArray;
}



function createUnit(unitTemplate, isEnemy, morale, ammunition) {
    const unit = JSON.parse(JSON.stringify(unitTemplate));
    unit.hp = unitTemplate.hp * (1 + morale / 10);
    unit.maxHp = unitTemplate.maxHp * (1 + morale / 10);
    unit.ammo = unitTemplate.ammo * (1 + ammunition / 10);
    unit.damage = Math.floor(Math.random() * unitTemplate.damage[1]) + unitTemplate.damage[0];
    unit.morale = unitTemplate.morale * (1 + morale / 10);
    unit.maxMorale = unitTemplate.maxMorale * (1 + morale / 10);
    unit.orders = unitTemplate.orders
    unit.x = isEnemy ? battlefieldWidth - Math.random() * 100 : Math.random() * 100;
    unit.y = Math.random() * battlefieldHeight;
    unit.isEnemy = isEnemy;
    unit.color = isEnemy ? 'black' : 'white';
    return unit;
}

function drawBattlefield(ctx) {
    ctx.clearRect(0, 0, battlefieldWidth, battlefieldHeight);
    drawUnits(ctx, playerUnits);
    drawUnits(ctx, enemyUnits);
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
        let moralereward = 1;
        if (unit.morale < unit.maxMorale) {
            unit.morale += Math.min(moralereward, unit.maxMorale - unit.morale);
        }
        
        // Update morale based on the current order
        switch (unit.orders) {
            case 'attack':
                if (unit.morale > 30) {
                    let closestEnemy = findClosestEnemy(unit, enemyUnits);
                if (closestEnemy) {
                    if (!isInRange(unit, closestEnemy)) {
                        moveToTarget(unit, closestEnemy);
                    }
                    if (isInRange(unit, closestEnemy)) {
                        attackUnit(unit, closestEnemy);
                    }
                }
                } else {
                    let closestEnemy = findClosestEnemy(unit, enemyUnits);
            if (closestEnemy) {
                if (!isInRange(unit, closestEnemy)) {
                    let randomAlly = findRandomAlly(unit, units);
                    moveToTarget(unit, randomAlly);
                }
                if (isInRange(unit, closestEnemy)) {
                    moveToSafety(unit, closestEnemy);
                    }
                }  
                }
                break;
            case 'defend':
                let closestEnemy = findClosestEnemy(unit, enemyUnits);
                if (unit.morale > 30) {
                    unit.morale += Math.min(moralereward*2, unit.maxMorale - unit.morale);
                    if (isInRange(unit, closestEnemy)) {
                        attackUnit(unit, closestEnemy);}
                } else {
                    let ClosestAlly = findClosestAlly(unit, units);
                    moveToTarget(unit, ClosestAlly);
                }
                break;
            case 'skirmish':
                if (unit.morale > 30) {
                    let closestEnemy = findClosestEnemy(unit, enemyUnits);
                if (closestEnemy) {
                    if (!isInRange(unit, closestEnemy)) {
                        moveToTarget(unit, closestEnemy);
                    }
                    if (isInRange(closestEnemy, unit)) {   //we check if 'attacker' is in range of 'defender', if yes, then instead of attack, unit moves to a safe place
                        moveToSafety(unit, closestEnemy);
                        unit.morale += Math.min(moralereward, unit.maxMorale - unit.morale);  // during retreat unit does not attack, instead it gains 1 morale point for succesful battle management      
                    }
                    if (isInRange(unit, closestEnemy)) {
                        attackUnit(unit, closestEnemy);    
                    }
                }
                } else {
                    let closestEnemy = findClosestEnemy(unit, enemyUnits);
            if (closestEnemy) {
                if (!isInRange(unit, closestEnemy)) {     // if unit is below 30 morale, then a) if it is out of enemy range, it stays cool looking for allies
                    let randomAlly = findRandomAlly(unit, units);
                    moveToTarget(unit, randomAlly);
                }
                if (isInRange(unit, closestEnemy)) {    // b) if enemy is close and morale is <30>, then unit finally panics and just retreats to opposite direction to enemy
                    moveToSafety(unit, closestEnemy);
                    }
                }  
                }
                break;
            case 'regroup':
                let CloseEnemy = findClosestEnemy(unit, enemyUnits);
                
                if (unit.morale > 30) {
                    if (isInRange(unit, CloseEnemy)) {
                        let ClosestAlly = findClosestAlly(unit, units);
                        attackUnit(unit, CloseEnemy);
                        moveToTarget(unit, ClosestAlly);
                       }
                        
                } else {
                    let ClosestAlly = findClosestAlly(unit, units);
                    moveToTarget(unit, ClosestAlly);
                }
                break;
            case 'follow':
                if (unit.morale > 5) {
                    unit.morale += Math.min(moralereward, unit.maxMorale - unit.morale);
                } else {
                    unit.morale = 5;
                }
                break;
            default:
                unit.morale = 0;
        }
        
        
    });
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
        let distance = Math.hypot(enemy.x - unit.x, enemy.y - unit.y);        
        if (distance < closestDistance) {
            closestDistance = distance;
            closestEnemy = enemy;
        }
    });
    return closestEnemy;
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
    if (unit.ammo > 0) {        //infantry or other non-ranged units can throw projectiles, or we assume that they use long range weapons like 2H swords, halberds, lances, but after some time they also break. We always assume that unit has a spare, low-range weapon
        unit.ammo -= 1;
     }
    if (target.hp <= 0) {
        target.hp = 0;
        //console.log('Morgue: ' + unit.name + ' causes damage for' + damage + ' + armor piercing damage for' + apdamage + ' killing ' + target.name + ' order: ' + unit.order + ')');
        removeUnit(target);
        unit.morale += Math.min(moraledamage, unit.maxMorale - unit.morale);
    }
    
}

function removeUnit(unit) {
    if (unit.isEnemy) {
        enemyUnits = enemyUnits.filter(e => e !== unit);
        
    } else {
        playerUnits = playerUnits.filter(u => u !== unit);
    }
}

function findRandomTarget(unit, enemyUnits) {
    return enemyUnits[Math.floor(Math.random() * enemyUnits.length)];
}

function findRandomAlly(unit, units) {
    return units[Math.floor(Math.random() * units.length)];
}

