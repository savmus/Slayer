function Fighter(width, height, src, x, y, ctx) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.ctx = ctx;

    this.image = new Image();
    this.image.src = src;
}

Fighter.prototype.update = function update() {
    this.ctx.drawImage(
        this.image,
        this.x,
        this.y,
        this.width, 
        this.height
    );
}

module.exports = Fighter;