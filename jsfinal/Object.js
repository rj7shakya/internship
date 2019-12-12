//rectangle 
var Rect = function(x, y, w, h, m) {
    if (typeof(m) === 'undefined') {
        this.m = 1;
    }

    this.width = w;
    this.height = h;

    this.topLeft = new Vec2(x, y);
    this.topRight = new Vec2(x + w, y);
    this.bottomRight = new Vec2(x + w, y + h);
    this.bottomLeft = new Vec2(x, y + h);

    this.v = new Vec2(0, 0);
    this.a = new Vec2(0, 0);
    this.theta = 0;
    this.omega = 0;
    this.alpha = 0;
    this.J = this.m * (this.height*this.height + this.width*this.width) / 12000;
};
Rect.prototype.center = function() {
    var diagonal = this.bottomRight.subtract(this.topLeft);
    var midpoint = this.topLeft.add(diagonal.scale(0.5));
    return midpoint;
};
Rect.prototype.rotate = function(angle) {
    this.theta += angle;
    var center = this.center();

    this.topLeft = this.topLeft.rotate(angle, center);
    this.topRight = this.topRight.rotate(angle, center);
    this.bottomRight = this.bottomRight.rotate(angle, center);
    this.bottomLeft = this.bottomLeft.rotate(angle, center);

    return this;
};
Rect.prototype.move = function(v) {
    this.topLeft = this.topLeft.add(v);
    this.topRight = this.topRight.add(v);
    this.bottomRight = this.bottomRight.add(v);
    this.bottomLeft = this.bottomLeft.add(v);

    return this;
}

