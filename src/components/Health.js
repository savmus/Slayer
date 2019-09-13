function Health(width, height, x, y, ctx, fighter) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.fighter = fighter;
    this.max = 100;
}

Health.prototype.update = function update() {
    var percent = this.fighter.health / this.max;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width * percent, this.height);
}

module.exports = Health;