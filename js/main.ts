import { addListener, backgroundClearing, startAnimationLoop, time } from "./systems/animationLoop.js";
import { canvas, setupCanvas } from "./systems/canvasManager.js";
import { createShapesAtCenter, createSweepingShapes } from "./shapeManager.js";
import { setupAnimatedWave } from "./animatedWave/simulationManager.js";

// Variables

// Functions
function setup() {
    setupCanvas();

    // createSweepingShapes();
    setupAnimatedWave();

    startAnimationLoop(backgroundClearing.Clear);
}

// Init
setup();