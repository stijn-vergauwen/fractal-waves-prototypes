import { backgroundClearing, startAnimationLoop } from "./systems/animationLoop.js";
import { setupCanvas } from "./systems/canvasManager.js";
import { createSweepingShapes } from "./shapeManager.js";
// Variables
// Functions
function setup() {
    setupCanvas();
    createSweepingShapes();
    startAnimationLoop(backgroundClearing.None);
}
// Init
setup();
