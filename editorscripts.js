document.addEventListener("DOMContentLoaded", () => {
    const unitList = document.getElementById('unitList');
    const unitForm = document.getElementById('unitForm');
    const saveButton = document.getElementById('saveButton');
    const saveAsButton = document.getElementById('saveAsButton');
    const deleteButton = document.getElementById('deleteButton');
    const validateButton = document.getElementById('validateButton');
    const infoButton = document.getElementById('infoButton');
    const goToBattleButton = document.getElementById('goToBattleButton');
    const unitSearch = document.getElementById('unitSearch');
    let currentUnitKey = null;

    function populateUnitList(filter = '') {
        unitList.innerHTML = '';
        Object.keys(units).forEach(unitKey => {
            if (units[unitKey].name.toLowerCase().includes(filter.toLowerCase())) {
                const listItem = document.createElement('li');
                listItem.textContent = units[unitKey].name;
                listItem.dataset.unitKey = unitKey;
                listItem.classList.add('unit-list-item');
                if (unitKey === currentUnitKey) {
                    listItem.classList.add('current-unit');
                }
                listItem.addEventListener('click', () => loadUnitDetails(unitKey));
                unitList.appendChild(listItem);
            }
        });
    }

    function loadUnitDetails(unitKey) {
        currentUnitKey = unitKey;
        const unit = units[unitKey];
        unitForm.unitOriginalName.value = unitKey;
        unitForm.unitName.value = unit.name || '';
        unitForm.unitDescription.value = unit.description || '';
        unitForm.unitHp.value = unit.hp || 0;
        unitForm.unitMaxHp.value = unit.maxHp || 0;
        unitForm.unitDamage.value = unit.damage ? unit.damage.join(',') : '0,0';
        unitForm.unitApDamage.value = unit.apdamage || 0;
        unitForm.unitArmor.value = unit.armor || 0;
        unitForm.unitSpeed.value = unit.speed || 0;
        unitForm.unitCost.value = unit.cost || 0;
        unitForm.unitRange.value = unit.range || 0;
        unitForm.unitAmmo.value = unit.ammo || 0;
        unitForm.unitMorale.value = unit.morale || 0;
        unitForm.unitMaxMorale.value = unit.maxMorale || 0;
        unitForm.unitOrders.value = unit.orders || '';
        unitForm.unitCategory.value = unit.category || 'Infantry';
        if (unit.portrait) {
            document.getElementById('unitPortrait').src = unit.portrait;
        } else {
            document.getElementById('unitPortrait').src = '';
        }
        populateUnitList(unitSearch.value);
    }

    function saveUnit(unitKey) {
        if (!units[unitKey]) {
            units[unitKey] = {};
        }
        const unit = units[unitKey];
        unit.name = unitForm.unitName.value;
        unit.description = unitForm.unitDescription.value;
        unit.hp = parseInt(unitForm.unitHp.value);
        unit.maxHp = parseInt(unitForm.unitMaxHp.value);
        unit.damage = unitForm.unitDamage.value.split(',').map(Number);
        unit.apdamage = parseInt(unitForm.unitApDamage.value);
        unit.armor = parseInt(unitForm.unitArmor.value);
        unit.speed = parseFloat(unitForm.unitSpeed.value);
        unit.cost = parseInt(unitForm.unitCost.value);
        unit.range = parseInt(unitForm.unitRange.value);
        unit.ammo = parseInt(unitForm.unitAmmo.value);
        unit.morale = parseInt(unitForm.unitMorale.value);
        unit.maxMorale = parseInt(unitForm.unitMaxMorale.value);
        unit.orders = unitForm.unitOrders.value;
        unit.category = unitForm.unitCategory.value;

        // Handle portrait file change
        const portraitFile = unitForm.unitPortraitFile.files[0];
        if (portraitFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                unit.portrait = e.target.result;
                document.getElementById('unitPortrait').src = unit.portrait;
                updateUnitsFile();
            };
            reader.readAsDataURL(portraitFile);
        } else {
            updateUnitsFile();
        }
    }

    function saveAsNewUnit() {
        const newUnitKey = unitForm.unitName.value.replace(/\s+/g, '');
        if (!units[newUnitKey]) {
            units[newUnitKey] = {};
            saveUnit(newUnitKey);
            populateUnitList(unitSearch.value);
            alert('Unit saved as new.');
        } else {
            alert('Unit with this name already exists.');
        }
    }

    function deleteUnit(unitKey) {
        if (units[unitKey]) {
            delete units[unitKey];
            populateUnitList(unitSearch.value);
            alert('Unit deleted.');
            unitForm.reset();
            currentUnitKey = null;
            updateUnitsFile();
        }
    }

    function updateUnitsFile() {
        const unitsData = JSON.stringify(units, null, 2);
        // Simulate file update
        console.log('Updating units.js file...');
        console.log(unitsData);

        // Update the units.js file content on the server
        fetch('update_units.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: unitsData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert('Units file updated.');
        })
        .catch(error => {
            console.error('Error updating units file:', error);
            alert('Error updating units file.');
        });
    }

    function validateUnitCost() {
        let totalCost = 0;
        Object.keys(units).forEach(unitKey => {
            const unit = units[unitKey];
            const damage = unit.damage.reduce((a, b) => a + b, 0) / 2;
            unit.cost = Math.round((unit.hp + damage + unit.armor + unit.speed + unit.range + unit.ammo + unit.morale + unit.maxMorale) / 8);
            totalCost += unit.cost;
        });
        alert(`Total cost of all units: ${totalCost}`);
    }

    saveButton.addEventListener('click', () => {
        if (currentUnitKey) {
            saveUnit(currentUnitKey);
        } else {
            alert('No unit selected.');
        }
    });

    saveAsButton.addEventListener('click', saveAsNewUnit);

    deleteButton.addEventListener('click', () => {
        if (currentUnitKey) {
            deleteUnit(currentUnitKey);
        } else {
            alert('No unit selected.');
        }
    });

    validateButton.addEventListener('click', validateUnitCost);

    infoButton.addEventListener('click', () => {
        alert('This project is a unit editor for customizing game units.');
    });

    goToBattleButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    unitSearch.addEventListener('input', (event) => {
        populateUnitList(event.target.value);
    });

    populateUnitList();
});
