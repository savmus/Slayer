function Message(width, height, color, x, y, ctx, text) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.text = text;
    this.ctx = ctx;

    this.clear = this.clear.bind(this);
    this.time = setTimeout(this.clear, 3000);
}

Message.prototype.clear = function clear() {
    this.text = "";
}

Message.prototype.update = function update() {
    this.ctx.font = this.width + " " + this.height;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.text, this.x, this.y);
}

module.exports = Message;