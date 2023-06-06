
export type SimulationParameters = {
    waveSegmentCount: number;

    noiseVelocity: number;
    horizontalVelocity: number;

    drawnLine: {
        width: number;
        color: string;
    };

    circle: {
        radius: number;
        iterations: number;
        displacement: number;
    };
};

export let parameters = {
    waveSegmentCount: 3,

    noiseVelocity: 0.0002,
    horizontalVelocity: 1,

    drawnLine: {
        width: 2,
        color: "blue",
    },

    circle: {
        radius: 100,
        iterations: 8,
        displacement: 200,
    }
};