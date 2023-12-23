import { useRef, useEffect, useState } from "react";
import SideBar from './toolbar/SideBar'; 
import BottomBar from './BottomBar';
import CanvasContext from './CanvasContext'
import useDrawingObjArray from './hooks/useDrawing';
import { createRectangle } from './createDrawingObjects';
import { drawFocusOutline } from "./drawFocusOutline";
import './Canvas.css';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();

    const { drawingObjs, addDrawing, removeDrawing, updateDrawing } = useDrawingObjArray();

    useEffect(()=> {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawingObjs.forEach(drawing => {
            if (drawing.focused) drawFocusOutline(ctx, drawing.x, drawing.y, drawing.objectWidth, drawing.objectHeight);
            ctx.drawImage(drawing.imageBitmap, drawing.x, drawing.y);
    }   );
    },[drawingObjs]);

    const getCanvasPosition = () => {
        const canvas = canvasRef.current;
        const canvasPosition = canvas.getBoundingClientRect();
        return {
            x: canvasPosition.left,
            y: canvasPosition.top,
            width: canvasPosition.width,
            height: canvasPosition.height
        }
    }

    function handleMouseDown(e) {
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        const drawingCliked = drawingObjs.reverse().find(drawing => (clientX >= drawing.x && clientX <= drawing.x + drawing.objectWidth && clientY >= drawing.y && clientY <= drawing.y + drawing.objectHeight))
        if (drawingCliked) {
            updateDrawing( drawingCliked.id, {
                ...drawingCliked,
                clicked: true,
                focused: true,
            });
            drawingObjs.forEach(drawing => {
                if(drawingCliked.id !== drawing.id) {
                    console.log(drawingCliked.id, drawing.id, 'not same');
                    updateDrawing(drawing.id, {
                        ...drawing,
                        clicked: false,
                        focused: false,
                    })
                }else {
                    console.log(drawingCliked.id, drawing.id, 'same');
                }
            });
        }else if(!drawingCliked) {
            console.log('no drawing clicked');
            drawingObjs.forEach(drawing => {
                updateDrawing(drawing.id, {
                    ...drawing,
                    clicked: false,
                    focused: false,
                })
            });
        }
  
    }

    function handleMouseUp(e) {
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        const drawingCliked = drawingObjs.find(drawing => drawing.clicked)
        if (drawingCliked) {
            updateDrawing(drawingCliked.id, {
                ...drawingCliked,
                x: clientX - drawingCliked.objectWidth/2,
                y: clientY - drawingCliked.objectHeight/2,
                clicked: false
            });
        };
    };

    const contextValue = {
        createRectangle: createRectangle,
        addDrawing: addDrawing,
        removeDrawing: removeDrawing,
        updateDrawing: updateDrawing
    };
    return (
        <CanvasContext.Provider value={contextValue}>
            <section className="workspace">
                <SideBar/>
                <BottomBar/>
                <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className='my-canvas' ref={canvasRef} height={canvasHeight} width={canvasWidth} />
            </section>
        </CanvasContext.Provider>
    );
};

export default Canvas;