import { useState } from 'react';
import getUniqueId from './utils/getUniqueId';
import { 
  shapeType,
  CanvasObject,
  Rectangle,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Text,
  } from './drawingTypes';


async function createImageFromCanvas(canvas: OffscreenCanvas) : Promise<ImageBitmap> {
  return new Promise((resolve, reject) => {
    canvas.convertToBlob().then((blob) => {
      createImageBitmap(blob)
      .then((imageBitmap) => {
        resolve(imageBitmap);
      })
      .catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject(error);
    });
  });
};

const initializeObject = (name? : string, type? : shapeType, width?: number, height?: number, x?: number, y?: number, draggable? : boolean) : CanvasObject => {
  const defaultType: shapeType = 'None';
  return {
    name: name?? 'new object',
    type: type?? defaultType,
    id: getUniqueId(),
    x: x?? 0,
    y: y?? 0,
    objectWidth: width?? 100,
    objectHeight: height?? 100,
    draggable: draggable || false,
    clicked: false,
    focused: false,
    hovered: false,
    imageBitmap: undefined,
  };
};

export async function createRectangle(x: number, y: number, width: number, height: number, color?: 'string') : Promise<Rectangle> {
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const type: shapeType = 'Rectangle';
  const fillColor : string = color?? '#000000';
  
  if(ctx) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
  };
  const imageBitmap = await createImageFromCanvas(canvas);

  let rectangleObj = {
    ...initializeObject('rectangle', type, width, height, x, y),
     fillColor: fillColor,
     width: width,
     height: height,
     imageBitmap: imageBitmap,
  };
  return rectangleObj;
};

async function createCircle(x: number, y: number, radius: number, color?: 'string') : Promise<Circle> {
  const type: shapeType = 'Circle';
  const width = radius * 2;
  const height = radius * 2;
  const fillColor : string = color?? '#000000';

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');

  if(ctx) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  };
  const imageBitmap = await createImageFromCanvas(canvas);
  let circleObj = {
    ...initializeObject('circle', 'Circle', width, height, x, y),
    fillColor: fillColor,
    radius: radius,
    imageBitmap: imageBitmap,
  }
  return circleObj;
};

async function createEllipse(x: number, y: number, radiusX: number, radiusY: number, color?:'string') : Promise<Ellipse> {
  const type: shapeType = 'Ellipse';
  const width = radiusX * 2;
  const height = radiusY * 2;
  const fillColor : string = color?? '#000000';
  
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  if(ctx) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill();
  };
  const imageBitmap = await createImageFromCanvas(canvas);
  let ellipseObj = {
    ...initializeObject('ellipse', 'Ellipse', width, height, x, y),
     fillColor: fillColor,
     radiusX: radiusX,
     radiusY: radiusY,
     imageBitmap: imageBitmap,
  };
  return ellipseObj;
}

async function createPolygon(x: number, y: number, sides: number, color?:'string') : Promise<Polygon> {
  const type: shapeType = 'Polygon';
  const width = sides * 2;
  const height = sides * 2;
  const fillColor : string = color?? '#000000';
  
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  if(ctx) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for(let i = 0; i < sides; i++) {
      ctx.lineTo(x + i * 2, y + i * 2);
    }
    ctx.fill();
  };
  const imageBitmap = await createImageFromCanvas(canvas);
  let polygonObj = {
   ...initializeObject('polygon', type, width, height, x, y),
     fillColor: fillColor,
     sides: sides,
     imageBitmap: imageBitmap,
  };
  return polygonObj;
};

async function createPolyline(x: number, y: number, sides: number, color?:'string') : Promise<Polyline> {
  const type: shapeType = 'Polyline';
  const width = sides * 2;
  const height = sides * 2;
  const fillColor : string = color?? '#000000';
  
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  if(ctx) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for(let i = 0; i < sides; i++) {
      ctx.lineTo(x + i * 2, y + i * 2);
    }
    ctx.stroke();
  };
  const imageBitmap = await createImageFromCanvas(canvas);
  let polylineObj = {
    ...initializeObject('polyline', type, width, height, x, y),
     fillColor: fillColor,
     sides: sides,
     imageBitmap: imageBitmap,
  };
  return polylineObj;
};

async function createText(x: number, y: number, text: string, color?:'string', fontSize?: number, fontFamily?: string, fontWeight?: string) : Promise<Text> {
  const font_size = fontSize?? 10;
  const font_family = fontFamily?? 'Arial';
  const font_weight = fontWeight?? 'normal';
  const type: shapeType = 'Text';
  const width = text.length * font_size;
  const height = font_size;
  const fillColor : string = color?? '#000000';
  
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  if(ctx) {
    ctx.fillStyle = fillColor;
    ctx.font = `${font_weight} ${font_size}px ${font_family}`;
    ctx.fillText(text, x, y);
  };
  const imageBitmap = await createImageFromCanvas(canvas);
  let textObj = {
   ...initializeObject('text', type, width, height, x, y),
     fillColor: fillColor,
     text: text,
     fontSize: font_size,
     fontFamily: font_family,
     fontWeight: font_weight,
     imageBitmap: imageBitmap,
  };
  return textObj;
};