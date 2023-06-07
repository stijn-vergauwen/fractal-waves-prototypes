import Noise from "../noise/noise.js";
import { addListener } from "../systems/animationLoop.js";
import { parameters } from "./simulationParameters.js";
import Wave from "./wave.js";
let wave;
export function setupAnimatedWave() {
    if (wave) {
        return;
    }
    let noiseSource = new Noise(Math.random() * 1000);
    wave = new Wave(noiseSource, parameters.waveSegmentCount);
    addListener(update);
    // update();
}
function update() {
    wave.update(parameters);
}
