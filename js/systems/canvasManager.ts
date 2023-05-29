
export type CanvasInfo = {
    container: Element,
    element: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
}

export let canvas: CanvasInfo;

export function setupCanvas() {
    const canvasContainer: Element = document.querySelector('#canvas-container');
    const canvasElement: HTMLCanvasElement = document.querySelector('#canvas');
    const context = canvasElement.getContext("2d");

    canvasElement.width = canvasContainer.clientWidth;
    canvasElement.height = canvasContainer.clientHeight;

    canvas = {
        container: canvasContainer,
        element: canvasElement,
        ctx: context,
        width: canvasElement.clientWidth,
        height: canvasElement.clientHeight,
    };
}

export function clearCanvas() {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function fadeCanvas() {
    canvas.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
}