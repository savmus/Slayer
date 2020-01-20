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

Fight.prototype.preRenderText = function preRenderText(width, height, color, text) {
    const temp = document.createElement('canvas');
    
    temp.width = 120;
    temp.height = 30;

    const ctx = temp.getContext('2d');

    ctx.font = width + " " + height;
    ctx.fillStyle = color;
    ctx.fillText(text, 10, 30);

    return temp;
}

Fight.prototype.start = function start() {
    this.background = new Fighter(this.canvas.width, this.canvas.height, "../assets/backgrounds/grass.png", 0, 0, this.ctx);
    this.mFighter = new Fighter(Math.floor(this.canvas.width * 0.17), Math.floor(this.canvas.height * 0.3), "../assets/monsters/undead_forward.png", Math.floor(this.canvas.width * 0.42), Math.floor(this.canvas.height * 0.1), this.ctx);
    this.pFighter = new Fighter(Math.floor(this.canvas.width * 0.13), Math.floor(this.canvas.height * 0.2), "../assets/characters/main_up.png", Math.floor(this.canvas.width * 0.44), Math.floor(this.canvas.height * 0.7), this.ctx);
    this.mHealth = new Health(Math.floor(this.canvas.width * 0.23), Math.floor(this.canvas.height * 0.03), Math.floor(this.canvas.width * 0.71), Math.floor(this.canvas.height * 0.04), this.ctx, this.monster);
    this.pHealth = new Health(Math.floor(this.canvas.width * 0.23), Math.floor(this.canvas.height * 0.03), Math.floor(this.canvas.width * 0.06), Math.floor(this.canvas.height * 0.7), this.ctx, this.player);
    this.mHealthText = new Text("1.13vw", "Serif", "black", Math.floor(this.canvas.width * 0.71), Math.floor(this.canvas.height * 0.1), this.ctx, "Undead HP: ");
    this.pHealthText = new Text("1.13vw", "Serif", "black", Math.floor(this.canvas.width * 0.06), Math.floor(this.canvas.height * 0.76), this.ctx, "Your HP: ");
    this.weaponType = new Text("1.25vw", "Serif", "black", Math.floor(this.canvas.width * 0.06), Math.floor(this.canvas.height * 0.86), this.ctx, "Active weapon: ");
    this.weaponAttack = new Text("1.25vw", "Serif", "black", Math.floor(this.canvas.width * 0.06), Math.floor(this.canvas.height * 0.91), this.ctx, "Attack: ");
    
    this.monsterAttack = new Text("1.25vw", "Serif", "black", Math.floor(this.canvas.width * 0.71), Math.floor(this.canvas.height * 0.21), this.ctx, "Undead attack: ");
    this.monsterAttackCanvas = this.preRenderText("1.25vw", "Serif", "black", `Undead attack: ${this.monster.weapon.damage + this.monster.level.attack}`);
    
    this.monsterName = new Text("2.38vw", "Serif", "black", Math.floor(this.canvas.width * 0.06), Math.floor(this.canvas.height * 0.09), this.ctx, "Undead");
    this.monsterNameCanvas = this.preRenderText("2.38vw", "Serif", "black", "Undead");
    
    this.pLevel = new Text("1.13vw", "Serif", "black", Math.floor(this.canvas.width * 0.71), Math.floor(this.canvas.height * 0.86), this.ctx, "Level ");
    this.pLevelCanvas = this.preRenderText("1.13vw", "Serif", "black", `Level: ${this.player.level.level}`);
    
    this.mLevel = new Text("1.13vw", "Serif", "black", Math.floor(this.canvas.width * 0.06), Math.floor(this.canvas.height * 0.2), this.ctx, "Level ");
    this.mLevelCanvas = this.preRenderText("1.13vw", "Serif", "black", `Level: ${this.monster.level.level}`);

    window.addEventListener("keyup", this.startHandler);
    requestAnimationFrame(this.updateFight);
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

    this.background.update();
    this.pHealth.update();
    this.mHealth.update();
    this.pHealthText.update();
    this.mHealthText.update();
    this.mFighter.update();
    this.pFighter.update();
    this.weaponType.update();
    this.weaponAttack.update();

    this.ctx.drawImage(
        this.monsterAttackCanvas, 
        Math.floor(this.canvas.width * 0.71), 
        Math.floor(this.canvas.height * 0.21)
    );

    this.ctx.drawImage(
        this.monsterNameCanvas,
        Math.floor(this.canvas.width * 0.06), 
        Math.floor(this.canvas.height * 0.09)
    );

    this.ctx.drawImage(
        this.pLevelCanvas,
        Math.floor(this.canvas.width * 0.71), 
        Math.floor(this.canvas.height * 0.86)
    );

    this.ctx.drawImage(
        this.mLevelCanvas,
        Math.floor(this.canvas.width * 0.06), 
        Math.floor(this.canvas.height * 0.2)
    );

    requestAnimationFrame(this.updateFight);
}

module.exports = Fight;