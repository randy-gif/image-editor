import { useRef, useEffect, useState } from "react";
import SideBar from './toolbar/SideBar'; 
import BottomBar from './BottomBar';
import CanvasContext from './CanvasContext'
import useDrawingObjArray from './hooks/useDrawing';
import { drawFocusOutline } from "./drawings";
import useWindowDimensions from "./hooks/useWindowDimensions";
import useMouseMove from './hooks/useMouseMove';
import './Canvas.css';

const Canvas = () => {
    const { drawingObjs, addDrawing, removeDrawing, updateDrawing } = useDrawingObjArray();
    const windowDimensions = useWindowDimensions();

    const canvasHeight = windowDimensions.height;
    const canvasWidth = windowDimensions.width;

    const mainCanvasRef = useRef();
    const mousePosition = useMouseMove(mainCanvasRef);

    useEffect(()=> {
        const canvas = mainCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawingObjs.forEach(drawing => {
            if(drawing.imageBitmap.height > canvas.height) {
                const scale = canvas.height / drawing.imageBitmap.height;

                if(drawing.objectHeight !== canvas.height) {
                    drawing.objectWidth = Math.ceil(drawing.objectWidth * scale);
                    drawing.objectHeight = Math.ceil(drawing.objectHeight * scale);
                    updateDrawing(drawing.id, drawing);
                }     

                ctx.save();
                ctx.scale(scale, scale);
                ctx.drawImage(drawing.imageBitmap, drawing.x / scale, drawing.y / scale);
                ctx.restore();

            }else {
                ctx.drawImage(drawing.imageBitmap, drawing.x, drawing.y );
            }
            if (drawing.focused) {
                console.log('it is working');
                drawFocusOutline(ctx, drawing.x, drawing.y, drawing.objectWidth, drawing.objectHeight);
            }
    }   );
    },[drawingObjs]);

    console.log(drawingObjs);

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

    useEffect(() => {
        const canvasPosition = getCanvasPosition();
        const drawingClicked = drawingObjs.find(drawing => drawing.clicked)
        const clientX = mousePosition.x - canvasPosition.x;
        const clientY = mousePosition.y - canvasPosition.y;
        if(drawingClicked) {
            drawingClicked.x = clientX - drawingClicked.objectWidth / 2;
            drawingClicked.y = clientY - drawingClicked.objectHeight / 2;
            updateDrawing(drawingClicked.id ,drawingClicked);
        }
    }, [mousePosition]);

    function handleMouseDown(e) {
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        const drawingClicked = [...drawingObjs].reverse().find(drawing => (clientX >= drawing.x && clientX <= drawing.x + drawing.objectWidth && clientY >= drawing.y && clientY <= drawing.y + drawing.objectHeight))
        if (drawingClicked) {   
            drawingObjs.forEach(drawing => {
                if(drawing.id === drawingClicked.id) {
                    drawing.clicked = true;
                    drawing.focused = true;
                    updateDrawing( drawingClicked.id, drawing); 
                }else {
                    drawing.clicked = false;
                    drawing.focused = false;
                    updateDrawing(drawing.id, drawing);
                }
            });             
        }else if(!drawingClicked) {
            drawingObjs.forEach(drawing => {
                drawing.focused = false;
                drawing.clicked = false;
                updateDrawing(drawing.id, drawing);
            });
        }

  
    }

    function handleMouseUp(e) {
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        const drawingClicked = [...drawingObjs].reverse().find(drawing => drawing.clicked);
        if (drawingClicked) {
            drawingClicked.clicked = false;
            drawingClicked.x = clientX - drawingClicked.objectWidth / 2;
            drawingClicked.y = clientY - drawingClicked.objectHeight / 2;
            updateDrawing(drawingClicked.id, drawingClicked);
        };
    };

    const contextValue = {
        addDrawing: addDrawing,
        removeDrawing: removeDrawing,
        updateDrawing: updateDrawing
    };
    return (
        <CanvasContext.Provider value={contextValue}>
            <section className="workspace">
                <div className="containor">
                    <SideBar/>
                    <canvas onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}  className='main-canvas' ref={mainCanvasRef} height={canvasHeight} width={canvasWidth} />
                </div>
                <BottomBar/>
            </section>
        </CanvasContext.Provider>
    );
};

export default Canvas;