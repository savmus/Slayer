function Monster(width, height, color, x, y, worldCtx, world, weapon, speed, level) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = worldCtx;
    this.world = world;

    this.pos = {
        'x': this.x,
        'y': this.y
    };

    this.speed = {
        'x': 2,
        'y': 2
    };

    this.engaged = false;
    this.beat = false;
    this.weapon = weapon;
    this.attackSpeed = speed;
    this.level = level;
    this.health = 100;

    this.image = new Image();
    this.image.src = color;

    this.image.onload = this.update();
}

Monster.prototype.update = function update() {
    const that = this;

    this.image.onload = function draw() {
        that.ctx.drawImage(
            that.image,
            that.x,
            that.y,
            that.width,
            that.height
        );
    }
}

module.exports = Monster;