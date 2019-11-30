const Fighter = require("./Fighter");
const Health = require("./Health");
const Text = require('./Text');
const Game = require('./Game');

function Fight(canvas, monster, player, loop, view) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.monster = monster;
    this.player = player;
    this.loop = loop;
    this.view = view;

    this.updateFight = this.updateFight.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.monsterAttack = this.monsterAttack.bind(this);

    this.interval = setInterval(this.updateFight, 20);
    this.attack = setInterval(this.monsterAttack, this.monster.attackSpeed);
}

Fight.prototype.startHandler = function startHandler(ev) {
    if (ev.keyCode === 13) {
        this.monster.health -= (Game.items[this.player.weapon].damage) + (this.player.level.attack);

        if (this.monster.health <= 0) {
            this.end('player');
        }
    }
}

Fight.prototype.monsterAttack = function monsterAttack() {
    this.player.health -= (this.monster.weapon.damage) + (this.monster.level.attack);

    if (this.player.health <= 0) {
        this.end('monster');
        clearInterval(this.attack);
    }
}

Fight.prototype.end = function end(winner) {
    window.removeEventListener("keyup", this.startHandler);
    clearInterval(this.attack);

    if (winner === 'player') {
        this.monster.beat = true;
        this.monster.image.src = "../assets/backgrounds/grass_tile.png";
        this.player.defeated += 1;

        if (this.player.defeated === 10 && this.player.level.level !== 10) {
            this.player.level = Game.levels[this.player.level.level + 1];
            this.player.defeated = 0;
        }

        let monsterIdx = this.view.monsters.indexOf(this.monster);
        this.view.monsters.splice(monsterIdx, 1);

        clearInterval(this.interval);
        this.canvas.classList.add("hide");
        requestAnimationFrame(this.loop);
    } else {
        let canvas = document.getElementById("screenChange");
        canvas.innerHTML = "<div class='loser'><div class='loser-text'><h1>You have been defeated.<br>You lose.</h1><div class='credits'><h2>Credits</h2><p>Artwork by:</p><ul><li><a href='https://pipoya.itch.io/'>pipoya</a></li><li><a href='https://opengameart.org/users/athile'>athile</a></li><li><a href='https://opengameart.org/users/gaurav'>Gaurav</a></li><li><a href='https://opengameart.org/users/reemax'>Reemax</a></li></ul><p>Music by: <a href='www.soundimage.org'>Eric Matyas</a></p></div></div></div><script type='application/javascript' src='./main.js'></script>";

        let aside = document.getElementById("aside");
        aside.classList.add("hide");
        aside.classList.remove("reveal-aside");
    }
}

Fight.prototype.start = function start() {
    this.background = new Fighter(600, 500, "../assets/backgrounds/grass.png", 0, 0, this.ctx);
    this.mFighter = new Fighter(100, 150, "../assets/monsters/undead_forward.png", 250, 50, this.ctx);
    this.pFighter = new Fighter(76, 100, "../assets/characters/main_up.png", 262, 350, this.ctx);
    this.mHealth = new Health(140, 15, 425, 20, this.ctx, this.monster);
    this.pHealth = new Health(140, 15, 35, 350, this.ctx, this.player);
    this.mHealthText = new Text("18px", "Serif", "black", 425, 50, this.ctx, "Undead HP: ");
    this.pHealthText = new Text("18px", "Serif", "black", 35, 380, this.ctx, "Your HP: ");
    this.weaponType = new Text("20px", "Serif", "black", 35, 430, this.ctx, "Active weapon: ");
    this.weaponAttack = new Text("20px", "Serif", "black", 35, 455, this.ctx, "Attack: ");
    this.monsterAttack = new Text("20px", "Serif", "black", 425, 105, this.ctx, "Undead attack: ");
    this.monsterName = new Text("38px", "Serif", "black", 35, 45, this.ctx, "Undead");
    this.pLevel = new Text("18px", "Serif", "black", 425, 430, this.ctx, "Level ");
    this.mLevel = new Text("18px", "Serif", "black", 35, 100, this.ctx, "Level ");

    window.addEventListener("keyup", this.startHandler);
}

Fight.prototype.clear = function clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Fight.prototype.updateFight = function updateFight() {
    this.clear();

    this.pHealthText.text = "Your HP: " + this.player.health;
    this.mHealthText.text = "Undead HP: " + this.monster.health;
    this.weaponType.text = "Active weapon: " + this.player.weapon;
    this.weaponAttack.text = "Attack: " + (Game.items[this.player.weapon].damage + this.player.level.attack);
    this.monsterAttack.text = "Undead attack: " + (this.monster.weapon.damage + this.monster.level.attack);
    this.pLevel.text = "Level " + this.player.level.level;
    this.mLevel.text = "Level " + this.monster.level.level;

    this.background.update();
    this.mFighter.update();
    this.pFighter.update();
    this.pHealth.update();
    this.mHealth.update();
    this.pHealthText.update();
    this.mHealthText.update();
    this.weaponType.update();
    this.weaponAttack.update();
    this.monsterAttack.update();
    this.monsterName.update();
    this.pLevel.update();
    this.mLevel.update();
}

module.exports = Fight;