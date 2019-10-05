const Health = require("./Health");
const Text = require("./Text");
const Game = require("./Game");

function HP(canvas, player) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.player = player;
    this.health = new Health(140, 15, 440, 20, this.ctx, this.player);
    this.hp = new Text("14px", "Sans-Serif", "black", 440, 15, this.ctx, "100/100 HP");
    this.weapon = new Text("14px", "Sans-Serif", "black", 440, 50, this.ctx, "Weapon: ");
    this.level = new Text("14px", "Sans-Serif", "black", 440, 65, this.ctx, "Level: ");
    this.attack = new Text("14px", "Sans-Serif", "black", 440, 80, this.ctx, "Attack: ");

    this.update = this.update.bind(this);

    this.interval = setInterval(this.update, 20);
}

HP.prototype.clear = function clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

HP.prototype.update = function update() {
    this.clear();

    this.hp.text = this.player.health + "/100 HP";
    this.weapon.text = "Weapon: " + this.player.weapon;
    this.level.text = "Level: " + this.player.level.level;
    this.attack.text = "Attack: " + (Game.items[this.player.weapon].damage + this.player.level.attack);

    this.health.update();
    this.hp.update();
    this.weapon.update();
    this.level.update();
    this.attack.update();
}

module.exports = HP;