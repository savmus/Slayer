function Monster(width, height, color, x, y, worldCtx, world, weapon, speed, level) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = worldCtx;
    this.world = world;
    this.canvasWidth = screen.width * 0.44;
    this.canvasHeight = screen.height * 0.65;

    this.pos = {
        'x': this.x,
        'y': this.y
    };

    this.pos2 = {
        'x': this.width / 2,
        'y': this.height / 2
    };

    this.speed = {
        'x': 1.25,
        'y': 1.25
    };

    this.directions = [
        "right",
        "left",
        "up",
        "down"
    ];

    this.direction = "right";

    this.updateDirection = this.updateDirection.bind(this);
    this.interval = setInterval(this.updateDirection, 3000);

    this.engaged = false;
    this.beat = false;
    this.weapon = weapon;
    this.attackSpeed = speed;
    this.level = level;
    this.health = 100;

    this.image = new Image();
    this.image.src = color;

    this.image.onload = this.update();
    this.clear = this.clear.bind(this);

    this.interval = setInterval(this.clear, 15);
}

Monster.prototype.clear = function clear() {
    this.ctx.clearRect(0, 0, this.world.width, this.world.height);
}

Monster.prototype.updateDirection = function updateDirection() {
    this.direction = this.directions[Math.floor(Math.random() * 4)];
}

Monster.prototype.update = function update() {
    this.ctx.drawImage(
        this.image,
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
    );
}

Monster.prototype.isPlayer = function isPlayer(player) {
    var areaLeft = player.pos.x - (this.canvasHeight / 2);
    var areaRight = player.pos.x + (this.canvasHeight / 2);
    var areaTop = player.pos.y - (this.canvasWidth / 2);
    var areaBottom = player.pos.y + (this.canvasWidth / 2);

    if (this.pos.x > areaLeft && 
        this.pos.x < areaRight &&
        this.pos.y > areaTop &&
        this.pos.y < areaBottom) {
        return true
    } else {
        return false
    };
}

module.exports = Monster;