import { drawPathFromPoints } from "../lib/draw.js";
import Vec2 from "../lib/vector.js";
import { canvas } from "../systems/canvasManager.js";
import FractalCircle from "./fractalCircle.js";
export default class Wave {
    constructor(noiseSource) {
        this.noiseSource = noiseSource;
        this.noiseValue = 0;
    }
    update(parameters) {
        const widthPerSegment = canvas.width / parameters.waveSegmentCount;
        for (let i = 0; i < parameters.waveSegmentCount + 1; i++) {
            const xOffset = widthPerSegment * i - canvas.width / 2;
            const shapePosition = new Vec2(canvas.center.x + xOffset, canvas.center.y);
            let pointsInCircle = new FractalCircle().calculateCircle(parameters.shapeSegmentCount);
            drawPathFromPoints(canvas, shapePosition, pointsInCircle, "lime", 3, true);
        }
    }
}
