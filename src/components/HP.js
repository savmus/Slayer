const Health = require("./Health");
const Text = require("./Text");
const Game = require("./Game");

function HP(canvas, player) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvasWidth = screen.width * 0.44;
    this.canvasHeight = screen.height * 0.65;

    this.player = player;
    this.health = new Health(this.canvasWidth * 0.23, this.canvasHeight * 0.03, this.canvasWidth * 0.73, this.canvasHeight * 0.04, this.ctx, this.player);
    this.hp = new Text("0.88vw", "Serif", "black", this.canvasWidth * 0.73, this.canvasHeight * 0.03, this.ctx, "100/100 HP");
    this.weapon = new Text("0.88vw", "Serif", "black", this.canvasWidth * 0.73, this.canvasHeight * 0.1, this.ctx, "Weapon: ");
    this.level = new Text("0.88vw", "Serif", "black", this.canvasWidth * 0.73, this.canvasHeight * 0.13, this.ctx, "Level: ");
    this.attack = new Text("0.88vw", "Serif", "black", this.canvasWidth * 0.73, this.canvasHeight * 0.16, this.ctx, "Attack: ");

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