import CanvasObject from "./CanvasObjectClass";

export default class Rectangle extends CanvasObject {
    _width: number;
    _height: number;
    _color: string;
    
    constructor(x: number, y: number, width: number, height: number, color: string) {
        super('Rectangle', x, y, width, height);
        this._width = width;
        this._height = height;
        this._color = color;
    }
    drawOnCanvas(): void {
        const ctx = this._canvas.getContext('2d');
        if(ctx) {
            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, this.width, this.height);
        }
    }
    set width(width: number) {
        this._width = width;
    }
    get width(): number {
        return this._width;
    }
    set height(height: number) {
        this._height = height;
    }
    get height(): number {
        return this._height;
    }
    set color(color: string) {
        this._color = color;
    }
    get color(): string {
        return this._color;
    }

}