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
    setDrawingObjs(prevDrawingObjs => {
        if (prevDrawingObjs.some((drawingObj) => drawingObj.id === id)) {
            return prevDrawingObjs.map((drawingObj) => {
                if (drawingObj.id === id) {
                    return obj;
                } else {
                    return drawingObj;
                }
            });
        } else {
            throw new Error('No such drawing object');
        }
    });
};

console.log('drawingObjs from useDrawing', drawingObjs);
return { drawingObjs, addDrawing, removeDrawing, updateDrawing };
}

export default useDrawingObjArray;
