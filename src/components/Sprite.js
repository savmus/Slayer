const Game = require('./Game');

function Sprite(key, world, player, images, playCtx, handler) {
    this.key = key;
    this.world = world;
    this.player = player;
    this.images = images;
    this.playCtx = playCtx;
    this.handler = handler;

    this.pos = {
        'x': 39,
        'y': 29
    };

    this.pos2 = {
        'x': this.player.width / 2,
        'y': this.player.height / 2
    };

    this.speed = {
        'x': 1.25,
        'y': 1.25
    };

    this.inventory = {
        healing: [],
        weapons: [
            {
                name: "Fists",
                damage: 1
            }
        ]
    };

    this.weapons = {
        "Sword": false,
        "Bow": false,
        "Dagger": false,
        "Spear": false,
        "Lightening spell": false,
        "Fire spell": false,
        "Large stick": false,
        "Small stick": false,
        "Fists": true
    };

    this.weapon = "Fists";
    this.level = Game.levels[1];
    this.health = 100;
    this.defeated = 0;

    this.img = this.images[this.key];
    this.width = this.img.width;
    this.height = this.img.height;
}

Sprite.prototype.draw = function draw() {
    this.playCtx.clearRect(0, 0, this.player.width, this.player.height);
    
    if (this.pos.x < 300) {
        this.pos2.x = this.pos.x;
    } else if (this.pos.x > this.world.width - 300) {
        this.pos2.x = 600 - (this.world.width - this.pos.x);
    } else {
        this.pos2.x = this.player.width / 2;
    }

    if (this.pos.y < 250) {
        this.pos2.y = this.pos.y;
    } else if (this.pos.y > this.world.height - 250) {
        this.pos2.y = 500 - (this.world.height - this.pos.y);
    } else {
        this.pos2.y = this.player.height / 2;
    }

    this.playCtx.drawImage(this.img, this.pos2.x, this.pos2.y);
};

Sprite.prototype.addItem = function addItem(item) {
    if (item.health) {
        this.inventory.healing.push(item);
        let menu = document.getElementById("menu");
        menu.innerHTML += `<div class='option' id='${item.name}'>${item.name} +${item.health}</div>`;
    } else {
        if (!this.weapons[item.name]) {
            this.inventory.weapons.push(item);
            this.weapons[item.name] = true;

            let menu = document.getElementById("weapons");
            menu.innerHTML += `<div class='weapon' id='${item.name}'>${item.name} atk${item.damage}</div>`;
        }
    }
}

Sprite.prototype.isChest = function isChest(chests) {
    var myleft = this.pos.x;
    var myright = this.pos.x + (this.width);
    var mytop = this.pos.y;
    var mybottom = this.pos.y + (this.height);

    var chest = false;

    for (let i = 0; chest || i < chests.length; i++) {
        var chestleft = chests[i].x;
        var chestright = chests[i].x + (chests[i].width);
        var chesttop = chests[i].y;
        var chestbottom = chests[i].y + (chests[i].height);

        chest = true;
        if ((chests[i].opened) || 
            (mybottom < chesttop) ||
            (mytop > chestbottom) ||
            (myright < chestleft) ||
            (myleft > chestright)) {
            chest = false;
        }

        if (chest) {
            return chests[i];
        }
    }

    return false;
}

Sprite.prototype.isMonster = function isMonster(monsters) {
    var myleft = this.pos.x;
    var myright = this.pos.x + (this.width);
    var mytop = this.pos.y;
    var mybottom = this.pos.y + (this.height);

    var monster = false;

    for (let i = 0; monster || i < monsters.length; i++) {
        var monsterleft = monsters[i].pos.x;
        var monsterright = monsters[i].pos.x + (monsters[i].width);
        var monstertop = monsters[i].pos.y;
        var monsterbottom = monsters[i].pos.y + (monsters[i].height);

        monster = true;
        if ((monsters[i].beat) ||
            (mybottom < monstertop) ||
            (mytop > monsterbottom) ||
            (myright < monsterleft) ||
            (myleft > monsterright)) {
            monster = false;
        }

        if (monster) {
            return monsters[i];
        }
    }

    return false;
}

Sprite.prototype.heal = function heal(item) {
    window.removeEventListener("click", this.handler);

    let newArr = [];

    let found = false;

    for (let i = 0; !found || i < this.inventory.healing.length; i++) {
        found = true;
        if (this.inventory.healing[i]) {
            if (this.inventory.healing[i].name !== item.innerHTML) {
                found = false;
                newArr.push(this.inventory.healing[i]);
            }
        };

        if (found) {
            newArr.push(this.inventory.healing.slice(i + 1, this.inventory.healing.length + 1));
            break;
        }
    }

    this.inventory.healing = newArr.reduce((acc, val) => acc.concat(val), []);
}

module.exports = Sprite;