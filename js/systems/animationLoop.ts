import { clearCanvas, fadeCanvas } from "./canvasManager.js";

let isRunning = false;
let clearBackground: backgroundClearing;
let prevTimeStamp: number;
let updateDelegates: updateDelegate[] = [];

type updateDelegate = () => void;

export enum backgroundClearing { None, Fade, Clear };

export const time = {
    delta: 0,
    runTime: 0,
};

export function addListener(callBack: updateDelegate) {
    updateDelegates.push(callBack);
}

export function startAnimationLoop(setClearBackground: backgroundClearing) {
    if (isRunning) {
        return;
    }

    console.log("start animation loop");

    isRunning = true;
    clearBackground = setClearBackground;
    requestAnimationFrame(animationLoop);
}

export function stopAnimationLoop() {
    if (!isRunning) {
        return;
    }

    console.log("stop animation loop");

    isRunning = false;
    prevTimeStamp = NaN;
}

function animationLoop(timeStamp: number) {
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

    if (isRunning) {
        requestAnimationFrame(animationLoop);
    }
}

function callDelegates() {
    updateDelegates.forEach(delegate => {
        delegate();
    });
}