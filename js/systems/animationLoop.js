import { clearCanvas, fadeCanvas } from "./canvasManager.js";
let isRunning = false;
let clearBackground;
let prevTimeStamp;
let updateDelegates = [];
let iterator = 0;
export var backgroundClearing;
(function (backgroundClearing) {
    backgroundClearing[backgroundClearing["None"] = 0] = "None";
    backgroundClearing[backgroundClearing["Fade"] = 1] = "Fade";
    backgroundClearing[backgroundClearing["Clear"] = 2] = "Clear";
})(backgroundClearing || (backgroundClearing = {}));
;
export const time = {
    delta: 0,
    runTime: 0,
};
export function addListener(callBack) {
    updateDelegates.push(callBack);
}
export function startAnimationLoop(setClearBackground) {
    if (isRunning) {
        return;
    }
    // console.log("start animation loop");
    isRunning = true;
    clearBackground = setClearBackground;
    requestAnimationFrame(animationLoop);
}
export function stopAnimationLoop() {
    if (!isRunning) {
        return;
    }
    // console.log("stop animation loop");
    isRunning = false;
    prevTimeStamp = NaN;
}
function animationLoop(timeStamp) {
    if (!isRunning) {
        return;
    }
    iterator++;
    if (iterator >= 3) {
        iterator = 0;
        time.delta = prevTimeStamp ? timeStamp - prevTimeStamp : 0;
        time.runTime += time.delta;
        prevTimeStamp = timeStamp;
        if (clearBackground == backgroundClearing.Clear) {
            clearCanvas();
        }
        else if (clearBackground == backgroundClearing.Fade) {
            fadeCanvas();
        }
        callDelegates();
    }
    requestAnimationFrame(animationLoop);
}
function callDelegates() {
    updateDelegates.forEach(delegate => {
        delegate();
    });
}
