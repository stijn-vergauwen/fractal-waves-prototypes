import Vec2 from "../lib/vector.js";
import Noise from "../noise/noise.js";
import { SimulationParameters } from "./simulationParameters.js";
import { calculateFractalHeightOffsets } from "./subdivision.js";

const DEG_TO_RAD = 0.01745329251;

export default class FractalCircle {
    angle: number;
    radius: number;
    pointsInCircle: Vec2[];
    heightOffset: number;

    constructor(angle: number, radius: number, heightOffset: number) {
        this.angle = angle;
        this.radius = radius;
        this.heightOffset = heightOffset;
    }

    calculateShape({ circle }: SimulationParameters, noiseSource: Noise, noisePosition: Vec2): void {
        const fractalLine = calculateFractalHeightOffsets()(
            0,
            0,
            circle.iterations,
            circle.displacement,
            noiseSource,
            noisePosition
        );

        this.pointsInCircle = mapHeightsToCircle(fractalLine, this.radius, this.angle);
    }
}

function mapHeightsToCircle(offsets: number[], radius: number, startAngleDegrees: number): Vec2[] {
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

function positionOnCircle(radians: number, radius: number): Vec2 {
    const x = radius * Math.cos(radians) * 0.8;
    const y = radius * Math.sin(radians);
    return new Vec2(x, y);
}