import { drawPathFromPoints } from "../lib/draw.js";
import { calculateOffsetFromStraightLine, createFractalSubdivisionPerlinOnlyHeight } from "../lib/subdivision.js";
import Vec2 from "../lib/vector.js";
import { canvas } from "../systems/canvasManager.js";
export default class FractalCircle {
    constructor(noise) {
        this.noisePos = 0;
        this.points = [];
        this.noiseSource = noise;
        this.color = `hsla(${getValueBetween(0, 360)}, 100%, ${getValueBetween(60, 100)}%, 40%)`;
    }
    update(deltaNoise, centerPosition) {
        this.noisePos += deltaNoise;
        const halfHeight = canvas.height / 2;
        const start = new Vec2(0, halfHeight);
        const end = new Vec2(canvas.width, halfHeight);
        // this.points = calculateFractalSubdivisionOnlyHeight(start, end, 7, 140);
        this.points = createFractalSubdivisionPerlinOnlyHeight()(start, end, 8, 350, this.noiseSource, this.noisePos);
        this.draw(centerPosition);
    }
    draw(centerPosition) {
        const radius = 100;
        // const radius = this.noiseSource.perlin2(2.5937, this.noisePos) * 20 + 120;
        // const startAngle = Math.floor(Math.random() * 360);
        const startAngle = this.noiseSource.perlin2(.423, this.noisePos * .0629) * 360;
        const pointsInCircle = mapOffsetsToCircle(calculateOffsetFromStraightLine(this.points), radius, startAngle);
        const emptyVecArray = new Array(40);
        emptyVecArray.fill(new Vec2(0, 0));
        const pointsInRegularCircle = mapOffsetsToCircle(emptyVecArray, radius, startAngle);
        drawPathFromPoints(canvas, centerPosition, pointsInCircle, this.color, 1, true);
        // drawPathFromPoints(
        //     canvas,
        //     new Vec2(canvas.width / 2, canvas.height / 2),
        //     pointsInRegularCircle,
        //     "aqua",
        //     2,
        //     true,
        // );
        // drawPathFromPoints(
        //     canvas,
        //     new Vec2(0, 0),
        //     this.points,
        //     "gray",
        //     1,
        // )
    }
}
// Calculations, should be in separate file
function mapOffsetsToCircle(offsets, radius, startAngleDegrees) {
    const pointCount = offsets.length;
    const anglePerStep = 360 / pointCount;
    return offsets.map((offset, index) => {
        const angle = startAngleDegrees + anglePerStep * index;
        // following trig conventions, an angle of 0 means positive x, the offset orientation is upright so it should be adjusted
        const angleAdjustment = -90;
        if (offset.y < -radius) {
            offset.y = -radius;
        }
        const rotatedOffset = rotateVector(offset, degToRad(angle + angleAdjustment));
        const finalPosition = positionOnCircle(degToRad(angle), radius).add(rotatedOffset);
        return finalPosition;
    });
}
function rotateVector(vector, angleRadians) {
    const cosTheta = Math.cos(angleRadians);
    const sinTheta = Math.sin(angleRadians);
    return new Vec2(vector.x * cosTheta - vector.y * sinTheta, vector.x * sinTheta + vector.y * cosTheta);
}
function positionOnCircle(radians, radius) {
    const x = radius * Math.cos(radians);
    const y = radius * Math.sin(radians);
    return new Vec2(x, y);
}
function degToRad(deg) {
    return deg * 0.01745329251;
}
// color util
function getValueBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
