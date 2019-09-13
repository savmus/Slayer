function Text(width, height, color, x, y, ctx, text) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.text = text;
    this.ctx = ctx;
}

Text.prototype.update = function update() {
    this.ctx.font = this.width + " " + this.height;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.text, this.x, this.y);
}

module.exports = Text;