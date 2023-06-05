
export type SimulationParameters = {
    waveSegmentCount: number;
    shapeSegmentCount: number;
    drawnLine: {
        width: number;
        color: string;
    };
    noiseVelocity: number;
    horizontalVelocity: number;
};

export let parameters = {
    waveSegmentCount: 10,
    shapeSegmentCount: 40,

    drawnLine: {
        width: 2,
        color: "blue",
    },

    noiseVelocity: 1,
    horizontalVelocity: 1,
};