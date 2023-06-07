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
    ctx.lineJoin = "bevel";
    ctx.globalCompositeOperation = "lighter";
    // ctx.filter = "blur(4px)";

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

export function drawPathFromPointsWithRadialGradient(
    canvas: CanvasInfo,
    center: Vec2,
    points: Vec2[],
    innerColor: string,
    outerColor: string,
    gradientRadius: number,
    lineWidth: number,
) {
    const pointCount = points.length;

    // Line can't be drawn with fewer than 2 points
    if (pointCount < 2) {
        return;
    }

    const ctx = canvas.ctx;

    const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, gradientRadius);

    gradient.addColorStop(0, innerColor);
    gradient.addColorStop(1, outerColor);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "bevel";
    ctx.globalCompositeOperation = "lighter";

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

    ctx.closePath();

    ctx.stroke();
}