import Vec2 from "../lib/vector.js";
import { calculateFractalSubdivision, createFractalSubdivisionPerlin } from "../lib/subdivision.js";
import Noise from "../noise/noise.js";
import { canvas } from "../systems/canvasManager.js";
import { drawPathFromPoints } from "../lib/draw.js";

export default class FractalLine {
    noiseSource: Noise;
    noisePos: number = 0;
    points: Vec2[] = [];
    color: string;

    constructor(noise: Noise) {
        this.noiseSource = noise;

        // This line decides the generated color
        this.color = `hsl(${getValueBetween(30, 60)}, 100%, ${getValueBetween(50, 80)}%)`;
    }

    update(deltaNoise: number) {
        this.noisePos += deltaNoise;

        const halfHeight = canvas.height / 2;
        const start = new Vec2(0, halfHeight);
        const end = new Vec2(canvas.width, halfHeight);

        // this.points = calculateFractalSubdivision(start, end, 8, 100);

        this.points = createFractalSubdivisionPerlin()(start, end, 10, 600, this.noiseSource, this.noisePos);

        this.draw();
    }

    draw() {
        // console.log(this.points);
        drawPathFromPoints(canvas, new Vec2(0, 0), this.points, this.color, 3);
    }

}

// utility functions

function getValueBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}