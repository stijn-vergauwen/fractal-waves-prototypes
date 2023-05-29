import FractalCircle from "./classes/fractalCircle.js";
import Vec2 from "./lib/vector.js";
import Noise from "./noise/noise.js";
import { addListener, time } from "./systems/animationLoop.js";
import { canvas } from "./systems/canvasManager.js";
let isActive = false;
// to remove 'any', I could make a generic type for shapes
let shapes;
const noiseSpeed = .0006;
let centerOfCanvas;
export function createShapesAtCenter() {
    centerOfCanvas = new Vec2(canvas.width / 2, canvas.height / 2);
    const shapesToSpawn = 1;
    shapes = [];
    for (let i = 0; i < shapesToSpawn; i++) {
        shapes[i] = new FractalCircle(new Noise(Math.random() * 1000));
    }
    // update();
    activateUpdates();
}
function update() {
    for (const shape of shapes) {
        shape.update(noiseSpeed * time.delta, centerOfCanvas);
    }
}
function activateUpdates() {
    if (!isActive) {
        isActive = true;
        addListener(update);
    }
}
