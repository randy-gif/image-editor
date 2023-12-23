import { useState, useEffect } from 'react';
import { DrawingObject } from '../drawingTypes';

function useDrawingObjArray() {
  const [drawingObjs, setDrawingObjs] = useState<DrawingObject[]>([]);
    const addDrawing = (obj: DrawingObject) => {
        setDrawingObjs([...drawingObjs, obj]);
    };
    const removeDrawing = (id: string) => {
        setDrawingObjs(drawingObjs.filter((obj) => obj.id!== id));
    };
    const updateDrawing = (id: string, obj: DrawingObject) => {
      if(drawingObjs.some((drawingObj) => drawingObj.id === id)){
        setDrawingObjs(drawingObjs.map((drawingObj) => (drawingObj.id === id? obj : drawingObj)));
      }else{
        throw new Error('No such drawing object');
      }
    };
  return { drawingObjs, addDrawing, removeDrawing, updateDrawing };
}

export default useDrawingObjArray;
