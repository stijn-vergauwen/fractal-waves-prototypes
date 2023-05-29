import { addListener, backgroundClearing, startAnimationLoop, time } from "./systems/animationLoop.js";
import { canvas, setupCanvas } from "./systems/canvasManager.js";
import { createShapesAtCenter, createSweepingShapes } from "./shapeManager.js";

// Variables

// Functions
function setup() {
    setupCanvas();

    createSweepingShapes();

    startAnimationLoop(backgroundClearing.None);
}

// Init
setup();