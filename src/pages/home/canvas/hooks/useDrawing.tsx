import { useState, useEffect } from 'react';
import Rectangle from '../classes/RectangleClass';

type DrawingObject = Rectangle ;

function useDrawingObjArray() {
const [drawingObjs, setDrawingObjs] = useState<DrawingObject[]>([]);
const addDrawing = (obj: DrawingObject) => {
    setDrawingObjs(prevDrawingObjs => [...prevDrawingObjs, obj]);
};
const removeDrawing = (id: string) => {
    setDrawingObjs(prevDrawingObjs => {
        if(prevDrawingObjs.some(drawingObj => drawingObj.id === id)) {
            return prevDrawingObjs.filter((obj) => obj.id!== id);
        } else {
            throw new Error('No such drawing object');
        }
    });
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

return { drawingObjs, addDrawing, removeDrawing, updateDrawing };
}

export default useDrawingObjArray;
