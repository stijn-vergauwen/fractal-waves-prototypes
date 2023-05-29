import Noise from "../noise/noise.js";
import { time } from "../systems/animationLoop.js";
import { CanvasInfo } from "../systems/canvasManager.js";

let radius = getRandomRadius();
let prevGenerateTime = 0;
let noise = new Noise(Math.random());

export function generateRandomRadius(canvas: CanvasInfo) {
    if (time.runTime - prevGenerateTime > 1000) {
        prevGenerateTime = time.runTime;
        radius = getRandomRadius();
    }

    drawInCenter(canvas, radius, 4);
}

export function generatePerlinRadius(canvas: CanvasInfo) {
    const noiseValue = (noise.perlin2(time.runTime / 4000, time.runTime / 3200) + 1) * 100;
    drawInCenter(canvas, noiseValue, 4);
}

function drawInCenter(canvas: CanvasInfo, radius: number, lineWidth: number) {
    const ctx = canvas.ctx;
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;

    ctx.strokeStyle = "black";
    ctx.lineWidth = lineWidth;

    ctx.beginPath();
    ctx.ellipse(
        halfWidth,
        halfHeight,
        radius,
        radius,
        0,
        0,
        Math.PI * 2
    );
    ctx.stroke();
}

function getRandomRadius() {
    return Math.random() * 100 + 10;
}