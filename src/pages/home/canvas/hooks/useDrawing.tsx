import { useState } from 'react';
import getRandomId from '../utils/randomId';

// Define drawing types
interface Rectangle {
  id?: Id;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
  clicked?: boolean;
  draggable?: boolean;
}

interface Circle {
  id?: Id;
  x?: number;
  y?: number;
  radius?: number;
  clicked?: boolean;
  draggable?: boolean;
}

interface Img {
  id?: Id;
  x?: number;
  y?: number;
  img: typeof Image;
  clicked?: boolean;
  draggable?: boolean;
}

interface BackgroundColor {
  id?: Id;
  color: string;
  clicked?: boolean;
}

type Id = number;

// Define the generic drawing type that can be one of the specific types
type DrawingType = 'backgroundColor' | 'img' | 'circle' | 'rectangle' | 'triangle' | 'line' | 'text';

// Union type of all specific drawing types
type DrawingObject = Rectangle | Circle | Img | BackgroundColor;

function useDrawing() {
  const [drawings, setDrawings] = useState<{
    type: DrawingType;
    drawingObjs: DrawingObject[];
  }[]>([
    { type: 'backgroundColor', drawingObjs: [] },
    { type: 'img', drawingObjs: [] },
    { type: 'circle', drawingObjs: [] },
    { type: 'rectangle', drawingObjs: [] },
    { type: 'triangle', drawingObjs: [] },
    { type: 'line', drawingObjs: [] },
    { type: 'text', drawingObjs: [] },
  ]);

  const addDrawing = (type: DrawingType, newDrawing: DrawingObject) => {
    setDrawings((prevDrawing) => {
      return prevDrawing.map((drawing) => {
        if (drawing.type === type) {
          return {
            type: drawing.type,
            drawingObjs: [...drawing.drawingObjs, newDrawing],
          };
        }
        return drawing;
      });
    });
  };

  const replaceDrawing = (type: DrawingType, newDrawing: DrawingObject) => {
    setDrawings((prevDrawing) => {
      return prevDrawing.map((drawing) => {
        if (drawing.type === type) {
          return {
            type: drawing.type,
            drawingObjs: drawing.drawingObjs.map((obj)=> obj.id === newDrawing.id? newDrawing : obj),
          };
        }
        return drawing;
      });
    });
  }

  const clicked = (type: DrawingType, id: Id, tOrF: boolean) => {
    setDrawings((prevDrawing) => {
      return prevDrawing.map((drawing) => {
        if (drawing.type === type) {
          return {
            type: drawing.type,
            drawingObjs: drawing.drawingObjs.map((obj)=> obj.id === id? {...obj, clicked: tOrF} : obj),
          };
        }
        return drawing;
      });
    });
  };
  const addRectangle = (userRect: Rectangle) => {
    // validation logic
    const existingIds = drawings.flatMap(item => item.drawingObjs.map(draw => draw.id));

    if (!userRect || typeof userRect !== 'object') {
      throw new Error ('Invalid Rectangle object');
    }
    const { id } = userRect;
    if (id !== undefined) {
      // Ensure the id matches the Id type
      if (!Number.isInteger(id) || id <= 0 || existingIds.includes(id as Id)) {
        throw new Error('Invalid or duplicate rectangle id');
      }
    }
    // add rectangle
    const randomId = getRandomId(existingIds);
    const rect: Rectangle = {
      id: userRect.id?? randomId,
      x: userRect.x?? 470,
      y: userRect.y?? 235,
      width: userRect.width?? 60,
      height: userRect.height?? 30,
      color: userRect.color??'white',
      clicked: false,
      draggable: userRect.draggable?? false,
    }
    addDrawing('rectangle', rect);
  };

  const replaceRectangle = (userId: Id, userRect: Rectangle) => {
    const rectDrawingIds = drawings.flatMap(draw => draw.type ==='rectangle'? draw.drawingObjs.map( draw => draw.id): -1000);
    const existingIds = rectDrawingIds.filter(id => id!== -1000);
    if(existingIds.includes(userId)) {
      const rect: Rectangle = {
        id: userId,
        x: userRect.x?? 470,
        y: userRect.y?? 235,
        width: userRect.width??60,
        height: userRect.height?? 30,
        color: userRect.color??'white',
        clicked: false,
        draggable: userRect.draggable?? false,

      }
      replaceDrawing('rectangle', rect);
    }else {
      throw new Error ('rectangle id does not exist');
    }
  }

  const addCircle = (userCircle: Circle) => {
    // validation logic
    const existingIds = drawings.flatMap(item => item.drawingObjs.map(draw => draw.id));
    if (!userCircle || typeof userCircle!== 'object') {
      console.error('Invalid Circle object');
      return 1;
    }
    if (userCircle.id){
      if (userCircle.id < 0) {
        console.error('Invalid circle id');
        return 1;
      }
      if (existingIds.includes(userCircle.id)) {
        console.error('Duplicate id');
        return 1;
      }
    }
    // add circle
    const randomId = getRandomId(existingIds);
    const circle: Circle = {
      id: userCircle.id?? randomId,
      x: userCircle.x?? 470,
      y: userCircle.y?? 235,
      radius: userCircle.radius?? 30,
      clicked: false,
      draggable: userCircle.draggable?? false,
    }
    addDrawing('circle', circle);
  };

  const replaceCircle = (userId: Id, userCircle: Circle) => {
    const circleDrawingIds = drawings.flatMap(draw => draw.type === 'circle'? draw.drawingObjs.map( draw => draw.id): -1);
    const existingIds = circleDrawingIds.filter(id => id!== -1);
    if(existingIds.includes(userId)) {
      const circle: Circle = {
        id: userId,
        x: userCircle.x?? 470,
        y: userCircle.y?? 235,
        radius: userCircle.radius?? 30,
        clicked: false,
        draggable: userCircle.draggable?? false,
      }
      replaceDrawing('circle', circle);
    }else {
      console.error('circle id does not exist');
      return 1;
    }
  };

  const addImg = (userImg: Img) => {
    // validation logic
    const existingIds = drawings.flatMap(item => item.drawingObjs.map(draw => draw.id));
    if (!userImg || typeof userImg!== 'object') {
      console.error('Invalid Img object');
      return 1;
    }
    if (userImg.id){
      if (userImg.id < 0) {
        console.error('Invalid img id');
        return 1;
      }
      if (existingIds.includes(userImg.id)) {
        console.error('Duplicate id');
        return 1;
      }
    }
    // add img
    const randomId = getRandomId(existingIds);
    const img: Img = {
      id: userImg.id??randomId,
      x: userImg.x?? 0,
      y: userImg.y?? 0,
      img: userImg.img,
      clicked: false,
      draggable: userImg.draggable?? false,
    }
    addDrawing('img', img);
  };
  const replaceImg = (userId: Id, userImg: Img) => {
    const imgDrawingIds = drawings.flatMap(draw => draw.type === 'img'? draw.drawingObjs.map( draw => draw.id): -1);
    const existingIds = imgDrawingIds.filter(id => id!== -1);
    if(existingIds.includes(userId)) {
      const img: Img = {
        id: userId,
        x: userImg.x?? 0,
        y: userImg.y?? 0,
        img: userImg.img,
        clicked: false,
        draggable: userImg.draggable?? false,
      }
      replaceDrawing('img', img);
    }else {
      console.error('img id does not exist');
      return 1;
    }
  };
  const addBackgroundColor = (userBGColor: BackgroundColor) => {
    //validation logic
    const existingIds = drawings.flatMap(item => item.drawingObjs.map(draw => draw.id));
    if (!userBGColor || typeof userBGColor!== 'object') {
      console.error('Invalid Background color object');
      return 1;
    }
    if (userBGColor.id){
      if (userBGColor.id < 0) {
        console.error('Invalid id');
        return 1;
      }
      if (existingIds.includes(userBGColor.id)) {
        console.error('Duplicate id');
        return 1;
      }
    }
    // add background color
    const randomId = getRandomId(existingIds);
    const bgColor: BackgroundColor = {
      id: userBGColor.id?? randomId,
      color: userBGColor.color?? 'white',
      clicked: false,
    }
    addDrawing('backgroundColor', bgColor);
  };

  const replaceBackgroundColor = (userId: Id, userBGColor: BackgroundColor) => {
    const bgColorDrawingIds = drawings.flatMap(draw => draw.type === 'backgroundColor'? draw.drawingObjs.map( draw => draw.id): -1);
    const existingIds = bgColorDrawingIds.filter(id => id!== -1);
    if(existingIds.includes(userId)) {
      const bgColor: BackgroundColor = {
        id: userId,
        color: userBGColor.color?? 'white',
        clicked: false,
      }
      replaceDrawing('backgroundColor', bgColor);
    }else {
      console.error('background color id does not exist');
      return 1;
    }
  };
 
  return { 
    drawings: drawings,
    addRectangle,
    addBackgroundColor,
    addCircle,
    addImg,
    replaceBackgroundColor,
    replaceCircle,
    replaceImg,
    replaceRectangle,
    clicked
  };
}

export default useDrawing;
