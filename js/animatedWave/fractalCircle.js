import Vec2 from "../lib/vector.js";
import { calculateFractalHeightOffsets } from "./subdivision.js";
const DEG_TO_RAD = 0.01745329251;
export default class FractalCircle {
    constructor(angle, radius) {
        this.angle = angle;
        this.radius = radius;
    }
    calculateShape({ circle }, noiseSource, noisePosition) {
        const fractalLine = calculateFractalHeightOffsets()(0, 0, circle.iterations, circle.displacement, noiseSource, noisePosition);
        this.pointsInCircle = mapHeightsToCircle(fractalLine, this.radius, this.angle);
    }
}
function mapHeightsToCircle(offsets, radius, startAngleDegrees) {
    const pointCount = offsets.length;
    const anglePerStep = 360 / pointCount;
    return offsets.map((offset, index) => {
        const angleDeg = startAngleDegrees + anglePerStep * index;
        if (offset < -radius) {
            offset = -radius;
        }
        return positionOnCircle(angleDeg * DEG_TO_RAD, radius + offset);
    });
}
function positionOnCircle(radians, radius) {
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return new Vec2(x, y);
}
