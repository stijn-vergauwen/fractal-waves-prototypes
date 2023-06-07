export function calculateFractalHeightOffsets() {
    let currentIndex = 0;
    function calculateOffsets(startPoint, endPoint, iterations, displacement, noiseSource, noisePosition) {
        if (iterations === 0) {
            return [startPoint, endPoint];
        }
        let middlePoint = (startPoint + endPoint) / 2;
        currentIndex++;
        // This value I multiply by is to break up some patterns, it's randomly chosen (by me)
        const noiseXOffset = currentIndex * 7.523948;
        const positionOffset = noiseSource.perlin2(noisePosition.x + noiseXOffset, noisePosition.y) * displacement;
        // const positionOffset = (Math.random() * 2 - 1) * displacement;
        middlePoint += positionOffset;
        const leftSegment = calculateOffsets(startPoint, middlePoint, iterations - 1, displacement * .6, noiseSource, noisePosition);
        const rightSegment = calculateOffsets(middlePoint, endPoint, iterations - 1, displacement * .6, noiseSource, noisePosition);
        rightSegment.shift();
        return [...leftSegment, ...rightSegment];
    }
    return calculateOffsets;
}
