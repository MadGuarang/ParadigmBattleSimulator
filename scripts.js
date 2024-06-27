
let isPaused = false;
let selectedUnitType = 'footmen';
let playerUnits = [];
let enemyUnits = [];
const battlefieldWidth = 600;
const battlefieldHeight = 800;

document.addEventListener('DOMContentLoaded', () => {
    generateUnitSlots('player');
    generateUnitSlots('enemy');

    document.getElementById('start-battle').addEventListener('click', startBattle);
});


function generateUnitSlots(side) {
    const unitContainer = document.getElementById(`${side}-units`);
    for (let i = 1; i <= 4; i++) {
        const unitSlot = document.createElement('div');
        unitSlot.innerHTML = `
            <label>Unit Type:
                <select id="${side}-unit${i}" onchange="updateUnitStats('${side}', ${i})">
                    ${Object.keys(units).map(unit => `<option value="${unit}">${unit}</option>`).join('')}
                </select>
            </label>
            <label>Count: <input type="number" id="${side}-unit${i}-count" min="1" value="600"></label>
        `;
        unitContainer.appendChild(unitSlot);
    }
}

function updateUnitStats(side, slot) {
    const unitType = document.getElementById(`${side}-unit${slot}`).value;
    const unit = units[unitType];
    const statsElement = document.getElementById(`${side}-unit${slot}-stats`);
    if (statsElement) {
        statsElement.innerHTML = `
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
            <p>maxMorale: ${unit.maxMorale}</p>
            <p>orders: ${unit.orders}</p>
        `;
    }
}

function startBattle() {
    const playerArmySize = parseInt(document.getElementById('player-army-size').value);
    const playerMorale = parseInt(document.getElementById('player-morale').value);
    const playerUnitCounts = getUnitCounts('player');

    const enemyArmySize = parseInt(document.getElementById('enemy-army-size').value);
    const enemyMorale = parseInt(document.getElementById('enemy-morale').value);
    const enemyUnitCounts = getUnitCounts('enemy');

    playerUnits = createUnits('player', playerUnitCounts, playerMorale);
    enemyUnits = createUnits('enemy', enemyUnitCounts, enemyMorale);

    document.getElementById('pre-battle').style.display = 'none';
    document.getElementById('battle').style.display = 'block';
    requestAnimationFrame(updateBattle);
}

function getUnitCounts(side) {
    const unitCounts = [];
    for (let i = 1; i <= 4; i++) {
        const count = parseInt(document.getElementById(`${side}-unit${i}-count`).value);
        unitCounts.push(count);
    }
    return unitCounts;
}

function createUnits(side, unitCounts, morale) {
    const unitsArray = [];
    for (let i = 1; i <= 4; i++) {
        const unitType = document.getElementById(`${side}-unit${i}`).value;
        for (let j = 0; j < unitCounts[i - 1]; j++) {
            unitsArray.push(createUnit(units[unitType], side === 'enemy', morale));
        }
    }
    return unitsArray;
}

function createUnit(unitTemplate, isEnemy, morale) {
    const unit = JSON.parse(JSON.stringify(unitTemplate));
    unit.hp = unitTemplate.hp * (1 + morale / 10);
    unit.maxHp = unitTemplate.maxHp * (1 + morale / 10);
    unit.damage = Math.floor(Math.random() * unitTemplate.damage[1]) + unitTemplate.damage[0];
    unit.morale = unitTemplate.morale;
    unit.maxMorale = unitTemplate.maxMorale;
    unit.x = isEnemy ? battlefieldWidth - Math.random() * 100 : Math.random() * 100;
    unit.y = Math.random() * battlefieldHeight;
    unit.isEnemy = isEnemy;
    unit.color = isEnemy ? 'red' : 'blue';
    return unit;
}

function togglePause() {
    isPaused = !isPaused;
}

function updateBattle() {
    if (!isPaused) {
        moveUnits(playerUnits, enemyUnits);
        moveUnits(enemyUnits, playerUnits);
        drawBattlefield(document.getElementById('battlefield').getContext('2d'));
    }
    requestAnimationFrame(updateBattle);
}

function moveUnits(units, enemyUnits) {
    units.forEach(unit => {
        if (unit.hp <= 0) return;

        const target = getClosestEnemy(unit, enemyUnits);
        if (target) {
            moveTowards(unit, target);
            attack(unit, target);
        }
    });
}

function getClosestEnemy(unit, enemies) {
    let closestEnemy = null;
    let minDistance = Infinity;
    enemies.forEach(enemy => {
        if (enemy.hp > 0) {
            const distance = getDistance(unit, enemy);
            if (distance < minDistance) {
                closestEnemy = enemy;
                minDistance = distance;
            }
        }
    });
    return closestEnemy;
}

function getDistance(unit1, unit2) {
    return Math.hypot(unit2.x - unit1.x, unit2.y - unit1.y);
}

function moveTowards(unit, target) {
    const angle = Math.atan2(target.y - unit.y, target.x - unit.x);
    unit.x += Math.cos(angle) * unit.speed;
    unit.y += Math.sin(angle) * unit.speed;
}

function attack(unit, target) {
    if (getDistance(unit, target) < 10) {
        target.hp -= unit.damage;
        if (target.hp <= 0) {
            target.hp = 0;
            // Other unit death logic
        }
    }
}

function drawBattlefield(ctx) {
    ctx.clearRect(0, 0, battlefieldWidth, battlefieldHeight);
    drawUnits(ctx, playerUnits);
    drawUnits(ctx, enemyUnits);
}

function drawUnits(ctx, units) {
    units.forEach(unit => {
        if (unit.hp > 0) {
            ctx.fillStyle = unit.color;
            ctx.fillRect(unit.x, unit.y, 5, 5);
        }
    });
}
