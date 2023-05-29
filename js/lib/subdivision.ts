// Helper classes to calculate stuff

import Noise from "../noise/noise.js";
import Vec2 from "./vector.js";

export function calculateFractalSubdivision(startPoint: Vec2, endPoint: Vec2, iterations: number, displacement: number): Vec2[] {
    if (iterations === 0) {
        return [startPoint, endPoint];
    }

    const middlePoint = getMiddlePoint(startPoint, endPoint);
    const perpendicular = getPerpendicular(getDelta(startPoint, endPoint).normalize());

    const positionOffset = Math.random() * displacement * 2 - displacement;
    middlePoint.x += perpendicular.x * positionOffset;
    middlePoint.y += perpendicular.y * positionOffset;

    const leftSegment = calculateFractalSubdivision(startPoint, middlePoint, iterations - 1, displacement / 2);
    const rightSegment = calculateFractalSubdivision(middlePoint, endPoint, iterations - 1, displacement / 2);

    rightSegment.shift();

    return [...leftSegment, ...rightSegment];
}

export function calculateFractalSubdivisionOnlyHeight(startPoint: Vec2, endPoint: Vec2, iterations: number, displacement: number): Vec2[] {
    if (iterations === 0) {
        return [startPoint, endPoint];
    }

    const middlePoint = getMiddlePoint(startPoint, endPoint);

    const positionOffset = Math.random() * displacement * 2 - displacement;
    middlePoint.y += positionOffset;

    const leftSegment = calculateFractalSubdivisionOnlyHeight(startPoint, middlePoint, iterations - 1, displacement * .6);
    const rightSegment = calculateFractalSubdivisionOnlyHeight(middlePoint, endPoint, iterations - 1, displacement * .6);

    rightSegment.shift();

    return [...leftSegment, ...rightSegment];
}

export function createFractalSubdivisionPerlin(): (startPoint: Vec2, endPoint: Vec2, iterations: number, displacement: number, noiseSource: Noise, noiseY: number) => Vec2[] {
    let currentIndex = 0;

    function fractalSubdivisionPerlin(startPoint: Vec2, endPoint: Vec2, iterations: number, displacement: number, noiseSource: Noise, noiseY: number): Vec2[] {
        if (iterations === 0) {
            return [startPoint, endPoint];
        }

        const middlePoint = getMiddlePoint(startPoint, endPoint);
        const perpendicular = getPerpendicular(getDelta(startPoint, endPoint).normalize());

        currentIndex++;

        // This value I multiply by is to break up some patterns, it's randomly chosen (by me, not alg)
        const noiseX = currentIndex * 2.523948;
        const positionOffset = noiseSource.perlin2(noiseX, noiseY / (displacement * .01)) * displacement;
        middlePoint.x += perpendicular.x * positionOffset;
        middlePoint.y += perpendicular.y * positionOffset;

        const leftSegment = fractalSubdivisionPerlin(startPoint, middlePoint, iterations - 1, displacement * .6, noiseSource, noiseY);
        const rightSegment = fractalSubdivisionPerlin(middlePoint, endPoint, iterations - 1, displacement * .6, noiseSource, noiseY);

        rightSegment.shift();

        return [...leftSegment, ...rightSegment];
    }

    return fractalSubdivisionPerlin;
}

export function createFractalSubdivisionPerlinOnlyHeight(): (startPoint: Vec2, endPoint: Vec2, iterations: number, displacement: number, noiseSource: Noise, noiseY: number) => Vec2[] {
    let currentIndex = 0;

    function fractalSubdivisionPerlinOnlyHeight(startPoint: Vec2, endPoint: Vec2, iterations: number, displacement: number, noiseSource: Noise, noiseY: number): Vec2[] {
        if (iterations === 0) {
            return [startPoint, endPoint];
        }

        const middlePoint = getMiddlePoint(startPoint, endPoint);

        currentIndex++;

        // This value I multiply by is to break up some patterns, it's randomly chosen (by me, not alg)
        const noiseX = currentIndex * 2.523948;
        const positionOffset = noiseSource.perlin2(noiseX, noiseY / (displacement * .01)) * displacement;
        middlePoint.y += positionOffset;

        const leftSegment = fractalSubdivisionPerlinOnlyHeight(startPoint, middlePoint, iterations - 1, displacement * .6, noiseSource, noiseY);
        const rightSegment = fractalSubdivisionPerlinOnlyHeight(middlePoint, endPoint, iterations - 1, displacement * .6, noiseSource, noiseY);

        rightSegment.shift();

        return [...leftSegment, ...rightSegment];
    }

    return fractalSubdivisionPerlinOnlyHeight;
}

export function calculateOffsetFromStraightLine(points: Vec2[]): Vec2[] {
    const startPoint = points[0];
    const endPoint = points[points.length - 1];

    const deltaPerStep = getDelta(startPoint, endPoint).divide(points.length - 1);

    return points.map((point, index) => {
        const pointOnStraightLine = startPoint.add(deltaPerStep.multiply(index));
        return getDelta(pointOnStraightLine, point);
    })
}

function getMiddlePoint(a: Vec2, b: Vec2): Vec2 {
    return new Vec2(
        a.x + (b.x - a.x) / 2,
        a.y + (b.y - a.y) / 2,
    );
}

function getDelta(a: Vec2, b: Vec2) {
    return new Vec2(
        b.x - a.x,
        b.y - a.y,
    );
}

function getPerpendicular(direction: Vec2) {
    return new Vec2(
        direction.y,
        -direction.x,
    );
}