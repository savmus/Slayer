const Sprite = require('./Sprite');
const Sound = require('./Sound');
const Game = require('./Game');
const Chest = require('./Chest');
const Monster = require('./Monster');
const Fight = require('./Fight');
const HP = require('./HP');

function GameView(game, player, viewport, viewCtx, playCtx) {
    this.game = game;
    this.viewport = viewport;
    this.player = player;
    this.viewCtx = viewCtx;
    this.playCtx = playCtx;

    this.grid = { 'width': 60, 'height': 60 };
    this.tile = { 'width': 64, 'height': 64 };
    this.view = { 'width': 640, 'height': 640 };

    this.world = this.createElement('canvas', {
        'width': 3840,
        'height': 3840
    });

    this.worldCtx = this.world.getContext("2d");

    this.cursor = {
        'rightPressed': false,
        'leftPressed': false,
        'downPressed': false,
        'upPressed': false
    };

    this.img = {};
    this.sprites = {};
    this.chests = [];
    this.monsters = [];

    this.loop = this.loop.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
}

GameView.prototype.createElement = function createElement(ele, attrObj) {
    var element = document.createElement(ele);

    if (attrObj) {
        for (var i in attrObj) {
            element.setAttribute(i, attrObj[i]);
        }
    }

    return element;
}

GameView.prototype.keyDownHandler = function keyDownHandler(event) {
    event.preventDefault();

    if (event.keyCode == 39) {
        this.cursor.rightPressed = true;
    } else if (event.keyCode == 37) {
        this.cursor.leftPressed = true;
    }

    if (event.keyCode == 40) {
        this.cursor.downPressed = true;
    } else if (event.keyCode == 38) {
        this.cursor.upPressed = true;
    }
}

GameView.prototype.keyUpHandler = function keyUpHandler(event) {
    event.preventDefault();

    if (event.keyCode == 39) {
        this.cursor.rightPressed = false;
    } else if (event.keyCode == 37) {
        this.cursor.leftPressed = false;
    }

    if (event.keyCode == 40) {
        this.cursor.downPressed = false;
    } else if (event.keyCode == 38) {
        this.cursor.upPressed = false;
    }
}

GameView.prototype.addSprite = function addSprite(key) {
    this.sprites[key] = new Sprite(key, this.world, this.player, this.img, this.playCtx, this.clickHandler);
}

GameView.prototype.imageSrc = function imageSrc() {
    let values = Object.values(this.cursor);
    let count = 0;

    for (let i = 0; i < values.length; i++) {
        if (values[i]) {
            count++;
        }
    };

    if (count > 1) {
        if (this.cursor.downPressed) {
            this.sprites['player'].img.src = "../assets/characters/main_forward.png";
        } else if (this.cursor.upPressed) {
            this.sprites['player'].img.src = "../assets/characters/main_up.png";
        }

        return true;
    } else {
        return false;
    }
}

GameView.prototype.spriteUpdate = function update() {
    if (this.cursor.rightPressed && this.sprites['player'].pos.x < this.world.width - this.sprites['player'].width) {
        if (!this.imageSrc()) {
            this.sprites['player'].img.src = "../assets/characters/main_right.png";
        };

        this.sprites['player'].pos.x += this.sprites['player'].speed.x;
    } else if (this.cursor.leftPressed && this.sprites['player'].pos.x >= 0) {
        if (!this.imageSrc()) {
            this.sprites['player'].img.src = "../assets/characters/main_left.png";
        };

        this.sprites['player'].pos.x -= this.sprites['player'].speed.x;
    }

    if (this.cursor.downPressed && this.sprites['player'].pos.y < this.world.height - this.sprites['player'].height) {
        if (!this.imageSrc()) {
            this.sprites['player'].img.src = "../assets/characters/main_forward.png";
        };
        
        this.sprites['player'].pos.y += this.sprites['player'].speed.y;
    } else if (this.cursor.upPressed && this.sprites['player'].pos.y >= 0) {
        if (!this.imageSrc()) {
            this.sprites['player'].img.src = "../assets/characters/main_up.png";
        };
        
        this.sprites['player'].pos.y -= this.sprites['player'].speed.y;
    }
};

GameView.prototype.openChest = function openChest(chest) {
    this.sprites['player'].addItem(chest.item);

    chest.opened = true;
    chest.image.src = "../assets/items/open_chest.png";

    requestAnimationFrame(this.loop);
}

GameView.prototype.fightMonster = function fightMonster(monster) {
    monster.engaged = true;

    let canvas = document.getElementById("fight");
    canvas.classList.remove("hide");

    let fight = new Fight(canvas, monster, this.sprites['player'], this.loop);
    
    fight.start();
}

GameView.prototype.clickHandler = function clickHandler(e) {
    e.preventDefault();

    let heal = Game.items[e.target.id].health;

    this.sprites['player'].health += heal;

    if (this.sprites['player'].health > 100) {
        this.sprites['player'].health = 100;
    }

    this.sprites['player'].heal(e.target);

    if (e.target.parentNode) {
        e.target.parentNode.removeChild(e.target);
    }
}

GameView.prototype.findsx = function findsx() {
    if (this.sprites.player.pos.x < 300) {
        return 0;
    } else if (this.sprites.player.pos.x > this.world.width - 300) {
        return this.world.width - 600;
    } else {
        return this.sprites.player.pos.x + (this.sprites.player.width / 2) - 300;
    }
}

GameView.prototype.findsy = function findsy() {
    if (this.sprites.player.pos.y < 250) {
        return 0;
    } else if (this.sprites.player.pos.y > this.world.height - 250) {
        return this.world.height - 600;
    } else {
        return this.sprites.player.pos.y + (this.sprites.player.height / 2) - 250;
    }
}

GameView.prototype.loop = function loop() {
    const that = this;

    if (this.game.isWon(this.monsters)) {
        let canvas = document.getElementById("screenChange");
        canvas.innerHTML = "<div class='winner'><div class='winner-text'><h1>You defeated all the monsters!<br>You win!</h1><div class='credits'><h2>Credits</h2><p>Artwork by:</p><ul><li><a href='https://pipoya.itch.io/'>pipoya</a></li><li><a href='https://opengameart.org/users/athile'>athile</a></li><li><a href='https://opengameart.org/users/gaurav'>Gaurav</a></li><li><a href='https://opengameart.org/users/reemax'>Reemax</a></li></ul><p>Music by: <a href='www.soundimage.org'>Eric Matyas</a></p></div></div></div><script type='application/javascript' src='./main.js'></script>";

        let aside = document.getElementById("aside");
        aside.classList.add("hide");
    } else {
        const monster = this.sprites['player'].isMonster(this.monsters);
        const chest = this.sprites['player'].isChest(this.chests);

        if (monster) {
            this.fightMonster(monster);
        } else if (chest) {
            this.openChest(chest);
        } else {
            this.spriteUpdate();
            this.hBar.update();

            this.chests.forEach(chest => {
                chest.update();
            });

            this.monsters.forEach(monster => {
                monster.update();
            })

            this.sprites['player'].draw();

            this.viewCtx.clearRect(0, 0, this.viewport.width, this.viewport.height);
            
            debugger;

            this.viewCtx.drawImage(
                this.world, 
                this.findsx(), 
                this.findsy(), 
                600, 
                500, 
                0, 
                0, 
                600, 
                500
            );

            let optionsArr = Array.from(document.getElementsByClassName("option"));
            optionsArr.forEach((option, idx) => {
                option.addEventListener('click', this.clickHandler);
            });

            let weaponsArr = Array.from(document.getElementsByClassName("weapon"));
            weaponsArr.forEach((weapon, idx) => {
                weapon.addEventListener('click', (e) => {
                    e.preventDefault();

                    that.sprites['player'].weapon = e.target.id;
                })
            });

            requestAnimationFrame(this.loop);
        }
    }
}

GameView.prototype.generateChests = function generateChests() {
    const items = Object.values(Game.items);

    for (let i = 0; i < 50; i++) {
        let x = Math.floor(Math.random() * (3841 - 1 + 1)) + 1;
        let y = Math.floor(Math.random() * (3841 - 1 + 1)) + 1;

        let j = Math.floor(Math.random() * (28 - 0 + 0)) + 0;

        let chest = new Chest(20, 20, "../assets/items/chest.png", x, y, this.worldCtx, items[j]);
        this.chests.push(chest);
    }
}

GameView.prototype.generateMonsters = function generateMonsters() {
    const weapons = Object.values(Game.items).slice(20, 29);
    const levels = Object.values(Game.levels);

    for (let i = 0; i < 100; i++) {
        let x = Math.floor(Math.random() * (3841 - 1 + 1)) + 1;
        let y = Math.floor(Math.random() * (3841 - 1 + 1)) + 1;

        let j = Math.floor(Math.random() * (8 - 0 + 0)) + 0;
        let speed = Math.floor(Math.random() * (1500 - 500 + 500)) + 500;
        let k = Math.floor(Math.random() * (9 - 0 + 0)) + 0;

        let monster = new Monster(35, 40, "../assets/monsters/undead_forward.png", x, y, this.worldCtx, this.world, weapons[j], speed, levels[k]);
        this.monsters.push(monster);
    }
}

GameView.prototype.createWorld = function createWorld(_numTileWidth, _numTileHeight, _tWidth, _tHeight) {
    for (var i = 0, len = _numTileHeight; i < len; i++) {
        for (var k = 0, len2 = _numTileWidth; k < len2; k++) {
            var x = k * _tWidth,
                y = i * _tHeight,
                image = this.img['tile'];
            this.worldCtx.drawImage(image, x, y, _tWidth, _tHeight);
        }
    }

    this.addSprite('player');
    this.generateChests();
    this.generateMonsters();

    let hCanvas = document.getElementById("health");
    this.hBar = new HP(hCanvas, this.sprites['player']);
    
    this.music = new Sound("../assets/music/fantascape.mp3");
    this.music.play();

    let mute = document.getElementById("mute");
    mute.addEventListener('click', this.music.mute);

    requestAnimationFrame(this.loop);
}

GameView.prototype.init = function init(key, assets) {
    document.onkeydown = this.keyDownHandler.bind(this);
    document.onkeyup = this.keyUpHandler.bind(this);

    const that = this;

    for (var i = 0, len = assets.length; i < len; i++) {
        var image = new Image();

        if (i !== len - 1) {
            var str = key[i];
            image.onload = function () {
                that.img[str] = this;
                that.createWorld(that.grid.width, that.grid.height, that.tile.width, that.tile.height);
            };
        } else {
            var str2 = key[i];
            image.onload = function () {
                that.img[str2] = this;
            };
        }

        image.src = assets[i];
    }
}

module.exports = GameView;