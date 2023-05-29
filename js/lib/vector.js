export default class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vec2(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vec2(this.x - other.x, this.y - other.y);
    }
    divide(value) {
        return new Vec2(this.x / value, this.y / value);
    }
    multiply(value) {
        return new Vec2(this.x * value, this.y * value);
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    normalize() {
        const length = this.length();
        return new Vec2(this.x / length, this.y / length);
    }
}
