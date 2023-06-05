import { backgroundClearing, startAnimationLoop } from "./systems/animationLoop.js";
import { setupCanvas } from "./systems/canvasManager.js";
import { setupAnimatedWave } from "./animatedWave/simulationManager.js";
// Variables
// Functions
function setup() {
    setupCanvas();
    // createSweepingShapes();
    setupAnimatedWave();
    startAnimationLoop(backgroundClearing.None);
}
// Init
setup();
