import FractalCircle from "./classes/fractalCircle.js";
import FractalLine from "./classes/fractalLine.js";
import Vec2 from "./lib/vector.js";
import Noise from "./noise/noise.js";
import { addListener, stopAnimationLoop, time } from "./systems/animationLoop.js";
import { canvas } from "./systems/canvasManager.js";

let isActive = false;
// to remove 'any', I could make a generic type for shapes
let shapes: any[];
const noiseSpeed = .001;
const drawsPerUpdate: number = 2;

let shapePosition: Vec2;
let moveShapePosition: boolean = false;
const shapePositionMoveSpeed = 0.2;

export function createShapesAtCenter() {
    shapePosition = new Vec2(canvas.width / 2, canvas.height / 2);
    moveShapePosition = false;

    const shapesToSpawn = 1;
    shapes = [];

    for (let i = 0; i < shapesToSpawn; i++) {
        shapes[i] = new FractalCircle(new Noise(Math.random() * 1000));
    }

    // update();
    activateUpdates();
}

export function createSweepingShapes() {
    shapePosition = new Vec2(-200, canvas.height / 2);
    moveShapePosition = true;

    const shapesToSpawn = 1;
    shapes = [];

    for (let i = 0; i < shapesToSpawn; i++) {
        shapes[i] = new FractalCircle(new Noise(Math.random() * 1000));
    }

    activateUpdates();
}

function update() {

    if (shapePosition.x > canvas.width + 200) {
        deactivateUpdates();
    }

    const deltaNoise = noiseSpeed / drawsPerUpdate * time.delta
    for (let i = 0; i < drawsPerUpdate; i++) {
        if (moveShapePosition) {
            shapePosition.x += shapePositionMoveSpeed / drawsPerUpdate * time.delta;
        }

        for (const shape of shapes) {
            shape.update(deltaNoise, shapePosition);
        }
    }
}

function activateUpdates() {
    if (!isActive) {
        isActive = true;
        addListener(update);
    }
}

function deactivateUpdates() {
    if (isActive) {
        isActive = false;
        stopAnimationLoop();
    }
}