function Game() {
    
}

Game.prototype.isWon = function isWon(monsters) {
    let beat = monsters.filter((el, idx, arr) => { el.beat });

    if (beat.length === 100) {
        return true;
    } else {
        return false;
    }
}

Game.items = {
    "Healing potion": {
        name: "Healing potion",
        health: 99
    },
    "Wine": {
        name: "Wine",
        health: 94
    },
    "Mead": {
        name: "Mead",
        health: 89
    },
    "Rum": {
        name: "Rum",
        health: 84
    },
    "Ale": {
        name: "Ale",
        health: 79
    },
    "Bandage": {
        name: "Bandage",
        health: 74
    },
    "Tourniquet": {
        name: "Tourniquet",
        health: 69
    },
    "Fresh water": {
        name: "Fresh water",
        health: 64
    },
    "Warm milk": {
        name: "Warm milk",
        health: 59
    },
    "Bread": {
        name: "Bread",
        health: 54
    },
    "Cheese": {
        name: "Cheese",
        health: 49
    },
    "Apple": {
        name: "Apple",
        health: 44
    },
    "Berries": {
        name: "Berries",
        health: 39
    },
    "Moldy bread": {
        name: "Moldy bread",
        health: 34
    },
    "Moldy cheese": {
        name: "Moldy cheese",
        health: 29
    },
    "Grass": {
        name: "Grass",
        health: 24
    },
    "Dirty water": {
        name: "Dirty water",
        health: 19
    },
    "Bread crumbs": {
        name: "Bread crumbs",
        health: 14
    },
    "Dead grass": {
        name: "Dead grass",
        health: 9
    },
    "Crumb": {
        name: "Crumb",
        health: 4
    },
    "Spear": {
        name: "Spear",
        damage: 10
    },
    "Sword": {
        name: "Sword",
        damage: 8
    },
    "Bow": {
        name: "Bow",
        damage: 7
    },
    "Lightening spell": {
        name: "Lightening spell",
        damage: 6
    },
    "Fire spell": {
        name: "Fire spell",
        damage: 5
    },
    "Dagger": {
        name: "Dagger",
        damage: 4
    },
    "Large stick": {
        name: "Large stick",
        damage: 3
    },
    "Small stick": {
        name: "Small stick",
        damage: 2
    },
    "Fists": {
        name: "Fists",
        damage: 1
    }
}

Game.levels = {
    1: {
        level: 1,
        attack: 2
    },
    2: {
        level: 2,
        attack: 4
    },
    3: {
        level: 3,
        attack: 6
    },
    4: {
        level: 4,
        attack: 8
    },
    5: {
        level: 5,
        attack: 10
    },
    6: {
        level: 6,
        attack: 12
    },
    7: {
        level: 7,
        attack: 14
    },
    8: {
        level: 8,
        attack: 16
    },
    9: {
        level: 9,
        attack: 18
    },
    10: {
        level: 10,
        attack: 20
    }
}

module.exports = Game;