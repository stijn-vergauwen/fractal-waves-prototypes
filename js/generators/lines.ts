import Noise from "../noise/noise.js";
import { CanvasInfo } from "../systems/canvasManager.js";

let noise = new Noise(Math.random());

const colors = ["green", "lime", "aqua", "blue", "orange", "yellow", "teal"];

export function generateWavyLine(canvas: CanvasInfo) {
    const pointsCount = 100;
    const frequency = 60;
    const amplitude = 100;

    drawFullLine(canvas, canvas.height / 2, generateYOffsets(pointsCount, frequency, amplitude), "green", 4);
}

export function generateRandomStack(canvas: CanvasInfo) {
    // stack
    const lineCount = 40;
    const lineGap = canvas.height / (lineCount - 1);

    // line
    const pointsCount = 30;
    const frequency = 200;
    const amplitude = 18;

    for (let i = 0; i < lineCount; i++) {
        const yPosition = lineGap * i;

        drawFullLine(
            canvas,
            yPosition,
            generateYOffsets(pointsCount, frequency, amplitude, yPosition),
            "black",
            3
        );
    }
}

export function generateRandomColoredStack(canvas: CanvasInfo) {
    // stack
    const lineCount = 60;
    const lineGap = canvas.height / (lineCount - 1);

    // line
    const pointsCount = 30;
    const frequency = 400;
    const amplitude = 10;

    for (let i = 0; i < lineCount; i++) {
        const yPosition = lineGap * i;
        const color = colors[Math.floor(Math.random() * colors.length)];

        drawFullLine(
            canvas,
            yPosition,
            generateYOffsets(pointsCount, frequency, amplitude, yPosition),
            color,
            30
        );
    }
}

export function generate2DPerlinStack(canvas: CanvasInfo) {
    // stack
    const lineCount = 140;
    const lineGap = canvas.height / (lineCount - 1);

    // line
    const pointsCount = 30;
    const frequency = 260;
    const amplitude = 30;

    for (let i = 0; i < lineCount; i++) {
        const yPosition = lineGap * i;

        drawFullLine(
            canvas,
            yPosition,
            generateYOffsets(pointsCount, frequency, amplitude, (yPosition * (frequency / pointsCount + .03298)) / 200),
            "black",
            2
        );
    }
}

export function generate2DPerlinBlueColorStack(canvas: CanvasInfo) {
    // Looks best when the background is black

    // stack
    const lineCount = 120;
    const lineGap = canvas.height / (lineCount - 1);

    // line
    const pointsCount = 30;
    const frequency = 400;
    const amplitude = 24;

    for (let i = 0; i < lineCount; i++) {
        const yPosition = lineGap * i;
        const color = `hsl(${getValueBetween(180, 190)}, ${getValueBetween(50, 100)}%, ${getValueBetween(0, 100)}%)`

        drawFullLine(
            canvas,
            yPosition,
            generateYOffsets(pointsCount, frequency, amplitude, (yPosition * (frequency / pointsCount + .03298)) / 500),
            color,
            4
        );
    }

    function getValueBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

function generateYOffsets(pointsCount: number, frequency: number, amplitude: number, noiseY?: number) {
    const yOffsets: number[] = [];
    for (let i = 0; i < pointsCount; i++) {
        const noiseX = (i * (frequency / pointsCount + .03298)) / 100;
        // console.log(noisePos);
        yOffsets[i] = noise.perlin2(noiseX, noiseY) * amplitude;
    }
    return yOffsets;
}

function drawFullLine(
    canvas: CanvasInfo,
    yPosition: number,
    yOffsets: number[],
    color: string,
    lineWidth: number,
) {
    const offsetCount = yOffsets.length;
    const lineSegments = offsetCount - 1;

    // Calculations can't be done when there are no segments
    if (lineSegments <= 0) {
        return;
    }

    const ctx = canvas.ctx;
    const widthPerSegment = canvas.width / lineSegments;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.beginPath();

    yOffsets.forEach((yOffset, index) => {
        const x = widthPerSegment * index;
        const y = yPosition + yOffset;

        if (index == 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    })

    ctx.stroke();
}