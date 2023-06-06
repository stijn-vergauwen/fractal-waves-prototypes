import { drawPathFromPoints } from "../lib/draw.js";
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
            this.fractalCircles.push(new FractalCircle(0, parameters.circle.radius));
        }
    }

    update(parameters: SimulationParameters) {
        this.noiseValue += time.delta * parameters.noiseVelocity;


        const widthPerSegment = canvas.width / parameters.waveSegmentCount;

        for (let i = 0; i < this.fractalCircles.length; i++) {
            const circle = this.fractalCircles[i];

            const xOffset = widthPerSegment * i - canvas.width / 2;
            const shapePosition = new Vec2(
                canvas.center.x + xOffset,
                canvas.center.y,
            );

            const noisePosition = new Vec2(
                i,
                this.noiseValue
            );

            circle.calculateShape(parameters, this.noiseSource, noisePosition);

            drawPathFromPoints(canvas, shapePosition, circle.pointsInCircle, "lime", 3, true);
        }
    }

}