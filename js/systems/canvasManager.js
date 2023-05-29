export let canvas;
export function setupCanvas() {
    const canvasContainer = document.querySelector('#canvas-container');
    const canvasElement = document.querySelector('#canvas');
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
