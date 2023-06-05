import Vec2 from "../lib/vector.js";
const DEG_TO_RAD = 0.01745329251;
export default class FractalCircle {
    calculateCircle(segmentCount) {
        const numberArray = new Array(segmentCount);
        numberArray.fill(0);
        const spikyArray = numberArray.map((value, index) => index % 2 == 0 ? -10 : 10);
        return mapHeightsToCircle(spikyArray, 100, 0);
    }
}
function mapHeightsToCircle(offsets, radius, startAngleDegrees) {
    const pointCount = offsets.length;
    const anglePerStep = 360 / pointCount;
    return offsets.map((offset, index) => {
        const angle = startAngleDegrees + anglePerStep * index;
        if (offset < -radius) {
            offset = -radius;
        }
        const finalPosition = positionOnCircle(angle * DEG_TO_RAD, radius + offset);
        return finalPosition;
    });
}
function positionOnCircle(radians, radius) {
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return new Vec2(x, y);
}
