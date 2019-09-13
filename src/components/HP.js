const Health = require("./Health");
const Text = require("./Text");

function HP(canvas, player) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.player = player;
    this.health = new Health(140, 15, 440, 20, this.ctx, this.player);
    this.hp = new Text("14px", "Sans-Serif", "black", 440, 15, this.ctx, "100/100 HP");
    this.weapon = new Text("14px", "Sans-Serif", "black", 440, 50, this.ctx, "Weapon: ");

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

    this.health.update();
    this.hp.update();
    this.weapon.update();
}

module.exports = HP;