import { useState, useEffect } from 'react';
import Rectangle from '../classes/RectangleClass';
import CanvasImg from '../classes/ImageClass';

type DrawingObject = Rectangle | CanvasImg; ;

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

const updateDrawing = (obj: DrawingObject) => {
    setDrawingObjs(prevDrawingObjs => {
        if (prevDrawingObjs.some((drawingObj) => drawingObj.id === obj.id)) {
            return prevDrawingObjs.map((drawingObj) => {
                if (drawingObj.id === obj.id) {
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
