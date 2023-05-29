import { CanvasInfo } from "../systems/canvasManager.js";
import Vec2 from "./vector.js";


export function drawPathFromPoints(
    canvas: CanvasInfo,
    center: Vec2,
    points: Vec2[],
    color?: string,
    lineWidth?: number,
    closePath?: boolean,
) {
    const pointCount = points.length;

    // Line can't be drawn with fewer than 2 points
    if (pointCount < 2) {
        return;
    }

    const ctx = canvas.ctx;

    ctx.strokeStyle = color ?? "black";
    ctx.lineWidth = lineWidth ?? 3;
    ctx.miterLimit = 4;

    ctx.beginPath();

    points.forEach((point, index) => {
        const { x, y } = center.add(point);
        if (index == 0) {
            ctx.moveTo(x, y);
        }
        else {
            ctx.lineTo(x, y);
        }
    })

    if (closePath) {
        ctx.closePath();
    }

    ctx.stroke();
}