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
        health: 99,
        adj: "a "
    },
    "Wine": {
        name: "Wine",
        health: 94,
        adj: ""
    },
    "Mead": {
        name: "Mead",
        health: 89,
        adj: ""
    },
    "Rum": {
        name: "Rum",
        health: 84,
        adj: ""
    },
    "Ale": {
        name: "Ale",
        health: 79,
        adj: ""
    },
    "Bandage": {
        name: "Bandage",
        health: 74,
        adj: "a "
    },
    "Tourniquet": {
        name: "Tourniquet",
        health: 69,
        adj: "a "
    },
    "Fresh water": {
        name: "Fresh water",
        health: 64,
        adj: ""
    },
    "Warm milk": {
        name: "Warm milk",
        health: 59,
        adj: ""
    },
    "Bread": {
        name: "Bread",
        health: 54,
        adj: ""
    },
    "Cheese": {
        name: "Cheese",
        health: 49,
        adj: ""
    },
    "Apple": {
        name: "Apple",
        health: 44,
        adj: "an "
    },
    "Berries": {
        name: "Berries",
        health: 39,
        adj: ""
    },
    "Moldy bread": {
        name: "Moldy bread",
        health: 34,
        adj: ""
    },
    "Moldy cheese": {
        name: "Moldy cheese",
        health: 29,
        adj: ""
    },
    "Grass": {
        name: "Grass",
        health: 24,
        adj: ""
    },
    "Dirty water": {
        name: "Dirty water",
        health: 19,
        adj: ""
    },
    "Bread crumbs": {
        name: "Bread crumbs",
        health: 14,
        adj: ""
    },
    "Dead grass": {
        name: "Dead grass",
        health: 9,
        adj: ""
    },
    "Crumb": {
        name: "Crumb",
        health: 4,
        adj: "a "
    },
    "Spear": {
        name: "Spear",
        damage: 10,
        adj: "a "
    },
    "Sword": {
        name: "Sword",
        damage: 8,
        adj: "a "
    },
    "Bow": {
        name: "Bow",
        damage: 7,
        adj: "a "
    },
    "Lightening spell": {
        name: "Lightening spell",
        damage: 6,
        adj: "a "
    },
    "Fire spell": {
        name: "Fire spell",
        damage: 5,
        adj: "a "
    },
    "Dagger": {
        name: "Dagger",
        damage: 4,
        adj: "a "
    },
    "Large stick": {
        name: "Large stick",
        damage: 3,
        adj: "a "
    },
    "Small stick": {
        name: "Small stick",
        damage: 2,
        adj: "a "
    },
    "Fists": {
        name: "Fists",
        damage: 1,
        adj: ""
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