import { drawRectangle, drawLine, drawCircle } from "./drawShapes"; 
export function drawFocusOutline(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, color: string = 'blue' ) {
    drawRectangle(ctx, x, y, width, height, color, 2);
    drawLine(ctx, x + width / 2, y, x + width / 2, y - 20, color);
    drawCircle(ctx, x + width / 2, y - 20, 2, 'white');
    drawCircle(ctx, x, y, 2, 'white');
    drawCircle(ctx, x + width, y, 2, 'white');
    drawCircle(ctx, x, y + height, 2, 'white');
    drawCircle(ctx, x + width, y + height, 2, 'white');
}