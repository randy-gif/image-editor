import { useState } from 'react';
import getRandomId from '../utils/randomId';
import useId from './useId';

// Define drawing types
type Rectangle = {
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
}

type Circle = {
  radius: number;
  color: string;
  x: number;
  y: number;
}

type Img =  {
  img: typeof Image;
  width: number;
  height: number;
  x: number;
  y: number;
}

type Drawing = Rectangle | Circle | Img;

type DrawingObject = Drawing & {
  type: string;
  id: Id;
  clicked: boolean;
  draggable: boolean;
}

type Id = string;

function useDrawing() {
  const [drawings, setDrawings] = useState<DrawingObject[]>([]);

  function createRectangle(rectangle: Rectangle): Id {
    const newDrawingObj = { 
      type: 'Rectangle',
      id: 'hello',
      x: 0,
      y: 0,
      clicked: false,
      draggable: true,
      color: 'white',
      width: rectangle.width,
      height: rectangle.height,
    }
    setDrawings((prevDrawings) => [...prevDrawings, newDrawingObj]);
    return newDrawingObj.id;
  };


  function updateRectangle(rectangle: Rectangle, id: Id): void {
    if(drawings.some((drawing) => drawing.id === id)) {
      const newDrawingObj = { 
        type: 'Rectangle',
        id: id,
        x: rectangle.x ? rectangle.x : 0,
        y: rectangle.x ? rectangle.y : 0,
        clicked: false,
        draggable: true,
        color: 'white',
        width: rectangle.width,
        height: rectangle.height,
      }
      setDrawings((prevDrawings) => {
        const newArray = prevDrawings.filter((drawing) => (drawing.id !== id));
        newArray.push(newDrawingObj);
        return newArray;
      });
    }else {
      throw new Error('Drawing not found');
    };
  };

  function getDrawingById(id: Id): DrawingObject {
    if(drawings.some((drawing) => drawing.id === id)) {
      return drawings.find((drawing) => drawing.id === id)!;
    }else {
      throw new Error('Drawing not found');
    };
  };

  function createCircle(circle: Circle): Id {
    const newDrawingObj = { 
      type: 'Circle',
      id: useId(),
      x: circle.x ? circle.x : 0,
      y: circle.y? circle.y : 0,
      clicked: false,
      draggable: true,
      color: 'white',
      radius: circle.radius,
    }
    setDrawings((prevDrawings) => [...prevDrawings, newDrawingObj]);
    return newDrawingObj.id;
  };

  function updateCircle(circle: Circle, id: Id): void {
    if(drawings.some((drawing) => drawing.id === id)) {
      const newDrawingObj = { 
        type: 'Circle',
        id: id,
        x: circle.x? circle.x : 0,
        y: circle.y? circle.y : 0,
        clicked: false,
        draggable: true,
        color: 'white',
        radius: circle.radius,
      }
      setDrawings((prevDrawings) => {
        const newArray = prevDrawings.filter((drawing) => (drawing.id !== id));
        newArray.push(newDrawingObj);
        return newArray;
      });
    }else {
      throw new Error('Drawing not found');
    };
  };

  function createImg(img: Img): Id {
    const newDrawingObj = { 
      type: 'Img',
      id: 'notHello',
      x: img.x? img.x : 0,
      y: img.y? img.y : 0,
      width: img.width,
      height: img.height,
      clicked: false,
      draggable: true,
      color: 'white',
      img: img.img,
    }
    setDrawings((prevDrawings) => [...prevDrawings, newDrawingObj]);
    return newDrawingObj.id;
  };

  function updateImg(img: Img, id: Id): void {
    if(drawings.some((drawing) => drawing.id === id)) {
      const newDrawingObj = { 
        type: 'Img',
        id: id,
        width: img.width,
        height: img.height,
        x: img.x? img.x : 0,
        y: img.y? img.y : 0,
        clicked: false,
        draggable: true,
        color: 'white',
        img: img.img,
      }

      setDrawings((prevDrawings) => {
        const newArray = prevDrawings.filter((drawing) => (drawing.id !== id));
        newArray.push(newDrawingObj);
        return newArray;
      });    
    }else {
      throw new Error('Drawing not found');
    };
  };

  const setClicked = (id: Id, tOrF: boolean) => {
    if(drawings.some((drawing) => drawing.id === id)) {
      setDrawings((prevDrawings) => {
        const updatedObject = prevDrawings.find((drawing) => drawing.id === id);
        updatedObject!.clicked = tOrF;
        const newArray = prevDrawings.filter((drawing) => (drawing.id!== id));
        newArray.unshift(updatedObject!);
        return newArray;
      });
    }else {
      throw new Error('Drawing not found');
    };
  };


 
  return { 
    drawings,
    createRectangle,
    createCircle,
    createImg,
    updateCircle,
    updateImg,
    updateRectangle,
    setClicked,
    getDrawingById,
  };
}

export default useDrawing;
