import CanvasObject from "./CanvasObjectClass";

export default class CanvasImg extends CanvasObject {
    _src: string;

    constructor(x: number, y: number, width: number, height: number, src: string) {
        super('Image', x, y, width, height);
        this._src = src;
    }

    createBitmap(): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                createImageBitmap(img, 0, 0, img.width, img.height)
                .then((imageBitmap) => {
                    this._imageBitmap = imageBitmap;
                    this._canvas.width = this._imageBitmap.width;
                    this._canvas.height = this._imageBitmap.height;
                    const ctx = this._canvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
                    if(ctx) {
                        ctx.drawImage(this._imageBitmap, 0, 0);
                    }
                    this._objectWidth = this._imageBitmap.width;
                    this._objectHeight = this._imageBitmap.height;
                    resolve();
                })
                .catch((err) => {
                    reject(err);
                })
            };
            img.onerror = () => {
                reject(new Error('error loading image'));
            };
            img.src = this._src;
        });
    }
    
    get src(): string {
        return this._src;
    }
    set src(value: string) {
        this._src = value;
    }

}