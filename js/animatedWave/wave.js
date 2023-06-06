import { drawPathFromPoints } from "../lib/draw.js";
import Vec2 from "../lib/vector.js";
import { time } from "../systems/animationLoop.js";
import { canvas } from "../systems/canvasManager.js";
import FractalCircle from "./fractalCircle.js";
import { parameters } from "./simulationParameters.js";
export default class Wave {
    constructor(noiseSource, waveSegmentCount) {
        this.noiseSource = noiseSource;
        this.noiseValue = 0;
        this.createFractalCircles(waveSegmentCount + 1);
    }
    createFractalCircles(count) {
        this.fractalCircles = [];
        for (let i = 0; i < count; i++) {
            this.fractalCircles.push(new FractalCircle(i * 140, parameters.circle.radius, Math.random() * 200 - 100));
        }
    }
    update(parameters) {
        this.noiseValue += time.delta * parameters.noiseVelocity;
        this.updateCircles(parameters);
        this.drawWave(parameters);
    }
    updateCircles(parameters) {
        for (let i = 0; i < this.fractalCircles.length; i++) {
            const noisePosition = new Vec2(i, this.noiseValue);
            const circle = this.fractalCircles[i];
            circle.calculateShape(parameters, this.noiseSource, noisePosition);
        }
    }
    drawWave(parameters) {
        const widthPerSegment = canvas.width / parameters.waveSegmentCount;
        for (let i = 0; i < this.fractalCircles.length - 1; i++) {
            const currentCircle = this.fractalCircles[i];
            const nextCircle = this.fractalCircles[i + 1];
            const currentPosition = new Vec2(widthPerSegment * i, canvas.height / 2 + currentCircle.heightOffset);
            const nextPosition = new Vec2(widthPerSegment * (i + 1), canvas.height / 2 + nextCircle.heightOffset);
            this.drawSegment(currentCircle, nextCircle, currentPosition, nextPosition);
        }
    }
    drawSegment(startShape, targetShape, startPosition, targetPosition) {
        const steps = 200;
        for (let i = 0; i < steps; i++) {
            const lerpValue = i / steps;
            const smoothStep = (Math.pow(lerpValue, 2)) * (3 - 2 * lerpValue);
            const interpolatedPoints = startShape.pointsInCircle.map((startPoint, index) => {
                const targetPoint = targetShape.pointsInCircle[index];
                return lerpVec2(startPoint, targetPoint, smoothStep);
            });
            // const shapePosition = lerpVec2(startPosition, targetPosition, lerpValue);
            const shapePosition = new Vec2(lerp(startPosition.x, targetPosition.x, lerpValue), lerp(startPosition.y, targetPosition.y, smoothStep));
            const color = `hsla(110, 100%, 60%, 20%)`;
            drawPathFromPoints(canvas, shapePosition, interpolatedPoints, color, 1, true);
        }
    }
}
function lerpVec2(a, b, value) {
    const deltaPoint = b.subtract(a);
    return a.add(deltaPoint.multiply(value));
}
function lerp(a, b, value) {
    return a + (b - a) * value;
}
