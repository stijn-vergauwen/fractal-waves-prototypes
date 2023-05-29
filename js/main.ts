import { addListener, backgroundClearing, startAnimationLoop, time } from "./systems/animationLoop.js";
import { canvas, setupCanvas } from "./systems/canvasManager.js";
import { createShapesAtCenter } from "./shapeManager.js";

// Variables

// Functions
function setup() {
    setupCanvas();

    createShapesAtCenter();

    startAnimationLoop(backgroundClearing.None);
}

// Init
setup();