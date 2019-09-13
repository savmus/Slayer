function Chest(width, height, color, x, y, worldCtx, item) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.item = item;
    this.opened = false;

    this.image = new Image();
    this.image.src = color;

    this.ctx = worldCtx;
    worldCtx.fillStyle = color;
    worldCtx.fillRect(this.x, this.y, this.width, this.height);
}

Chest.prototype.update = function update() {
    this.ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width, 
        this.height
    );
}

module.exports = Chest;