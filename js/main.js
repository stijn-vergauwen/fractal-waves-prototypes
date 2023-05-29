import { backgroundClearing, startAnimationLoop } from "./systems/animationLoop.js";
import { setupCanvas } from "./systems/canvasManager.js";
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
