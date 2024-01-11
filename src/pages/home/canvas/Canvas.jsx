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
    const canvasHeight = Math.floor(windowDimensions.height);
    const canvasWidth = Math.floor(windowDimensions.width);

    const mainCanvasRef = useRef();
    const mousePosition = useMouseMove(mainCanvasRef);
    
    useEffect(()=> {
        const canvas = mainCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawingObjs.forEach(drawing => {
            if(drawing.imageBitmap.height > canvas.height) {
                const scale = canvas.height / drawing.imageBitmap.height;

                if(drawing.scaleX !== scale && drawing.scaleY !== scale) {
                    drawing.scaleX = scale;
                    drawing.scaleY = scale;
                    updateDrawing(drawing)
                }

                ctx.save();
                ctx.scale(scale, scale);
                ctx.drawImage(drawing.imageBitmap, drawing.x / scale, drawing.y / scale);
                ctx.restore();
            }else {
                drawing.scaleX = 1;
                drawing.scaleY = 1;
                ctx.drawImage(drawing.imageBitmap, drawing.x, drawing.y );
            }
            if (drawing.focused) {
                drawFocusOutline(ctx, drawing.x, drawing.y, drawing.objectWidth * drawing.scaleX, drawing.objectHeight * drawing.scaleY);
            }
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

    useEffect(() => {
        const canvasPosition = getCanvasPosition();
        const drawingClicked = drawingObjs.find(drawing => drawing.clicked)
        const clientX = mousePosition.x - canvasPosition.x;
        const clientY = mousePosition.y - canvasPosition.y;
        if(drawingClicked) {
            drawingClicked.x = clientX - drawingClicked.objectWidth * drawingClicked.scaleX/ 2;
            drawingClicked.y = clientY - drawingClicked.objectHeight * drawingClicked.scaleY/ 2;
            updateDrawing(drawingClicked);
        }
    }, [mousePosition]);

    function handleMouseDown(e) {
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        const drawingClicked = [...drawingObjs].reverse().find(drawing => {
            const pass = new Array();

            if(clientX >= drawing.x) {
                pass.push(true);
            } else {
                pass.push(false);
            }
            if(clientX <= (drawing.x + (drawing.objectWidth * drawing.scaleX))){
                pass.push(true);
            } else {
                pass.push(false);
            }
            if(clientY >= drawing.y) {
                pass.push(true);
            } else {
                pass.push(false);
            }
            if(clientY <= (drawing.y + (drawing.objectHeight * drawing.scaleY))) {
                pass.push(true);
            } else {
                pass.push(false);
            }
            if(pass.every(pass => pass === true)) {
                return drawing;
            }
        });
        if (drawingClicked) {   
            drawingObjs.forEach(drawing => {
                if(drawing.id === drawingClicked.id) {
                    drawing.clicked = true;
                    drawing.focused = true;
                    updateDrawing(drawing); 
                }else {
                    drawing.clicked = false;
                    drawing.focused = false;
                    updateDrawing(drawing);
                }
            });             
        }else if(!drawingClicked) {
            drawingObjs.forEach(drawing => {
                drawing.focused = false;
                drawing.clicked = false;
                updateDrawing(drawing);
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
            drawingClicked.x = clientX - drawingClicked.objectWidth * drawingClicked.scaleX / 2;
            drawingClicked.y = clientY - drawingClicked.objectHeight * drawingClicked.scaleY / 2;
            updateDrawing(drawingClicked);
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