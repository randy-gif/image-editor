export type shapeType = 'Rectangle' | 'Circle' | 'Ellipse' | 'Polygon' | 'Polyline' | 'Text' | 'Image' | 'Video' | 'None';
export type DrawingObject = Rectangle | Circle | Ellipse | Polygon | Polyline | Text | Image; 

export interface CanvasObject {
    name: string;
    type: shapeType;
    id: string;
    x: number;
    y: number;
    objectWidth: number;
    objectHeight: number;
    clicked: boolean;
    draggable: boolean;
    focused: boolean;
    hovered: boolean;
    imageBitmap: any;
}

export interface Rectangle extends CanvasObject{
  fillColor: string;
  width: number;
  height: number;
};

export interface Circle extends CanvasObject {
  fillColor: string;
  radius: number;
}

export interface Ellipse extends CanvasObject {
  fillColor: string;
  radiusX: number;
  radiusY: number;
}

export interface Polygon extends CanvasObject {
  fillColor: string;
  sides: number;
}

export interface Polyline extends CanvasObject {
  fillColor: string;
  sides: number;
}

export interface Text extends CanvasObject {
  text: string,
  fillColor: string,
  fontSize: number,
  fontFamily: string,
  fontWeight: string,
}

export interface Image extends CanvasObject {
  img: typeof Image;
  width: number;
  height: number;
}

