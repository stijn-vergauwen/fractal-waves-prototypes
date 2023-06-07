export let parameters = {
    waveSegmentCount: 10,
    stepsPerSegment: 80,
    noiseVelocity: 0.0003,
    horizontalVelocity: 1,
    drawnLine: {
        width: 1,
        innerColor: `hsla(20, 100%, 60%, 15%)`,
        outerColor: `hsla(140, 100%, 60%, 15%)`,
    },
    circle: {
        radius: 160,
        iterations: 8,
        displacement: 300,
    }
};
