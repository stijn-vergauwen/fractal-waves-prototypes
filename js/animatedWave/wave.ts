import { drawPathFromPoints, drawPathFromPointsWithRadialGradient } from "../lib/draw.js";
import Vec2 from "../lib/vector.js";
import Noise from "../noise/noise.js";
import { time } from "../systems/animationLoop.js";
import { canvas } from "../systems/canvasManager.js";
import FractalCircle from "./fractalCircle.js";
import { SimulationParameters, parameters } from "./simulationParameters.js";

export default class Wave {
    noiseSource: Noise;
    noiseValue: number;

    fractalCircles: FractalCircle[];

    constructor(
        noiseSource: Noise,
        waveSegmentCount: number,
    ) {
        this.noiseSource = noiseSource;
        this.noiseValue = 0;

        this.createFractalCircles(waveSegmentCount + 1);
    }

    createFractalCircles(count: number): void {
        this.fractalCircles = [];
        for (let i = 0; i < count; i++) {
            this.fractalCircles.push(new FractalCircle(
                0,
                parameters.circle.radius,
                this.noiseSource.perlin2(i * 52.4163, this.noiseValue) * 200
            ));
        }
    }

    update(parameters: SimulationParameters) {
        this.noiseValue += time.delta * parameters.noiseVelocity;

        this.updateCircles(parameters);

        this.drawWave(parameters);
    }

    updateCircles(parameters: SimulationParameters) {
        for (let i = 0; i < this.fractalCircles.length; i++) {
            const noisePosition = new Vec2(
                i,
                this.noiseValue
            );

            const circle = this.fractalCircles[i];
            circle.calculateShape(parameters, this.noiseSource, noisePosition);
        }
    }

    drawWave(parameters: SimulationParameters) {
        const widthPerSegment = canvas.width / parameters.waveSegmentCount;
        for (let i = 0; i < this.fractalCircles.length - 1; i++) {
            const currentCircle = this.fractalCircles[i];
            const nextCircle = this.fractalCircles[i + 1];

            const currentPosition = new Vec2(
                widthPerSegment * i,
                canvas.height / 2 + currentCircle.heightOffset
            );

            const nextPosition = new Vec2(
                widthPerSegment * (i + 1),
                canvas.height / 2 + nextCircle.heightOffset,
            );

            this.drawSegment(
                currentCircle,
                nextCircle,
                currentPosition,
                nextPosition,
                parameters,
            );
        }
    }

    drawSegment(
        startShape: FractalCircle,
        targetShape: FractalCircle,
        startPosition: Vec2,
        targetPosition: Vec2,
        parameters: SimulationParameters,
    ) {
        const steps = parameters.stepsPerSegment;


        for (let i = 0; i < steps; i++) {
            const lerpValue = i / steps;
            const smoothStep = (Math.pow(lerpValue, 2)) * (3 - 2 * lerpValue)

            const interpolatedPoints = startShape.pointsInCircle.map((startPoint, index) => {
                const targetPoint = targetShape.pointsInCircle[index];
                return lerpVec2(startPoint, targetPoint, smoothStep);
            })

            // const shapePosition = lerpVec2(startPosition, targetPosition, lerpValue);
            const shapePosition = new Vec2(
                lerp(startPosition.x, targetPosition.x, lerpValue),
                lerp(startPosition.y, targetPosition.y, smoothStep)
            );

            // drawPathFromPoints(
            //     canvas,
            //     shapePosition,
            //     interpolatedPoints,
            //     parameters.drawnLine.outerColor,
            //     parameters.drawnLine.width,
            //     true
            // );

            drawPathFromPointsWithRadialGradient(
                canvas,
                shapePosition,
                interpolatedPoints,
                parameters.drawnLine.innerColor,
                parameters.drawnLine.outerColor,
                parameters.circle.radius * 2,
                parameters.drawnLine.width,
            );
        }
    }

}

function lerpVec2(a: Vec2, b: Vec2, value: number): Vec2 {
    const deltaPoint = b.subtract(a);
    return a.add(deltaPoint.multiply(value));
}

function lerp(a: number, b: number, value: number): number {
    return a + (b - a) * value;
}