import getUniqueId from "../utils/getUniqueId";

export default class CanvasObject {
    _name: string;
    _id: string;
    _x: number;
    _y: number;
    _objectWidth: number;
    _objectHeight: number;
    _clicked: boolean;
    _draggable: boolean;
    _focused: boolean;
    _hovered: boolean;
    _canvas: OffscreenCanvas;
    _imageBitmap: ImageBitmap;
    _scaleX: number;
    _scaleY: number;

    constructor(name: string, x: number, y: number, objectWidth: number, objectHeight: number) {
        this._name = name;
        this._id = getUniqueId();
        this._x = x;
        this._y = y;
        this._objectWidth = objectWidth;
        this._objectHeight = objectHeight;
        this._clicked = false;
        this._draggable = false;
        this._focused = false;
        this._hovered = false;
        this._scaleX = 1;
        this._scaleY = 1;
        this._canvas = new OffscreenCanvas(this.objectWidth, this.objectHeight);
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }
    get id(): string {
        return this._id;
    }
    set x(x: number) {
        this._x = x;
    }
    get x(): number {
        return this._x;
    }
    set y(y: number) {
        this._y = y;
    }
    get y(): number {
        return this._y;
    }
    set objectWidth(objectWidth: number) {
        this._objectWidth = objectWidth;
    }
    get objectWidth(): number {
        return this._objectWidth;
    }
    set objectHeight(objectHeight: number) {
        this._objectHeight = objectHeight;
    }
    get objectHeight(): number {
        return this._objectHeight;
    }
    set clicked(clicked: boolean) {
        this._clicked = clicked;
    }
    get clicked(): boolean {
        return this._clicked;
    }
    set draggable(draggable: boolean) {
        this._draggable = draggable;
    }
    get draggable(): boolean {
        return this._draggable;
    }
    set focused(focused: boolean) {
        this._focused = focused;
    }
    get focused(): boolean {
        return this._focused;
    }
    set hovered(hovered: boolean) {
        this._hovered = hovered;
    }
    get hovered(): boolean {
        return this._hovered;
    }
    get canvas(): OffscreenCanvas {
        return this._canvas;
    }
    set imageBitmap(imageBitmap: ImageBitmap) {
        this._imageBitmap = imageBitmap;
    }
    get imageBitmap(): ImageBitmap {
        return this._imageBitmap;
    }
    
}