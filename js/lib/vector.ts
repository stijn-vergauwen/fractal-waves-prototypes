export default class Vec2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vec2): Vec2 {
        return new Vec2(
            this.x + other.x,
            this.y + other.y,
        );
    }

    subtract(other: Vec2): Vec2 {
        return new Vec2(
            this.x - other.x,
            this.y - other.y,
        );
    }

    divide(value: number): Vec2 {
        return new Vec2(
            this.x / value,
            this.y / value,
        );
    }

    multiply(value: number): Vec2 {
        return new Vec2(
            this.x * value,
            this.y * value,
        );
    }

    length(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(): Vec2 {
        const length = this.length();

        return new Vec2(
            this.x / length,
            this.y / length,
        );
    }
}