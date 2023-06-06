import Vec2 from "../lib/vector.js";
export let canvas;
export function setupCanvas() {
    const canvasContainer = document.querySelector('#canvas-container');
    const canvasElement = document.querySelector('#canvas');
    const context = canvasElement.getContext("2d", { alpha: false });
    canvasElement.width = canvasContainer.clientWidth;
    canvasElement.height = canvasContainer.clientHeight;
    const width = canvasElement.clientWidth;
    const height = canvasElement.clientHeight;
    canvas = {
        container: canvasContainer,
        element: canvasElement,
        ctx: context,
        width: width,
        height: height,
        center: new Vec2(width / 2, height / 2),
    };
    window.addEventListener("resize", updateCanvasDimensions);
}
export function clearCanvas() {
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
}
export function fadeCanvas() {
    canvas.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function updateCanvasDimensions() {
    const { container, element } = canvas;
    element.width = container.clientWidth;
    element.height = container.clientHeight;
    canvas.width = element.clientWidth;
    canvas.height = element.clientHeight;
    canvas.center.x = canvas.width / 2;
    canvas.center.y = canvas.height / 2;
}
