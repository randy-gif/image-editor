import { useRef, useEffect, useState } from "react";
import SideBar from './toolbar/SideBar'; 
import BottomBar from './BottomBar';
import CanvasContext from './CanvasContext'
import useDrawingObjArray from './hooks/useDrawing';
import { createRectangle } from './createDrawingObjects';
import { drawFocusOutline } from "./drawings";
import useWindowDimensions from "./hooks/useWindowDimensions";
import './Canvas.css';

const Canvas = () => {
    const { drawingObjs, addDrawing, removeDrawing, updateDrawing } = useDrawingObjArray();
    const windowDimensions = useWindowDimensions();

    const mainCanvasRef = useRef();
    const drawingCanvasRef = useRef();


    useEffect(()=> {
        const canvas = mainCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawingObjs.forEach(drawing => {
            if (drawing.focused) drawFocusOutline(ctx, drawing.x, drawing.y, drawing.objectWidth, drawing.objectHeight);
            const imageBitmap = drawing.createImageBitmap()
            .then(imageBitmap => ctx.drawImage(imageBitmap, drawing.x, drawing.y))
            .catch(error => {throw new Error(error)});
    }   );
    },[drawingObjs]);

    const getCanvasPosition = () => {
        const canvas = mainCanvasRef.current;
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
                <div className="containor">
                    <SideBar/>
                    <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className='main-canvas' ref={mainCanvasRef} height={windowDimensions.height} width={windowDimensions.width} />
                    <canvas ref={drawingCanvasRef} className="drawing-canvas"/>
                </div>
                <BottomBar/>
            </section>
        </CanvasContext.Provider>
    );
};

export default Canvas;