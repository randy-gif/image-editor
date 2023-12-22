import { useRef, useEffect, useState } from "react";
import CanvasToolbar from './toolbar/CanvasToolbar'; 
import CanvasContext from './CanvasContext'
import useDrawingObjArray from './hooks/useDrawing';
import { createRectangle } from './createDrawingObjects';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();

    const { drawingObjs, addDrawing, removeDrawing, updateDrawing } = useDrawingObjArray();

    useEffect(()=> {
        console.log(drawingObjs, "canvas");
        drawingObjs.forEach(drawing => {
            ctx.drawImage(drawing.imageBitmap, 0, 0);
    }   );
    });

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
        const drawingCliked = drawingObjs.reverse().findIndex(drawing => (clientX >= drawing.x && clientX <= drawing.x + drawing.width && clientY >= drawing.y && clientY <= drawing.y + drawing.height))
        if (drawingCliked) {
            updateDrawing( drawingCliked.id, {
                ...drawingCliked,
                clicked: true
            })
        } 
    }

    function handleMouseUp(e) {
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        const drawingsCliked = drawings.filter(drawing => drawing.clicked === true);
        if (drawingsCliked) {
            drawingsCliked.forEach(drawing => {
                switch(drawing.type) {
                    case 'Rectangle':
                        updateRectangle({
                            x: clientX - drawing.width/2,
                            y: clientY - drawing.height/2,
                            width: drawing.width,
                            height: drawing.height,
                            color: drawing.color,
                            clicked: false
                        }, drawing.id,);
                        break;
                    case 'Circle':
                        updateCircle({
                            x: clientX - drawing.width/2,
                            y: clientY - drawing.height/2,
                            radius: drawing.radius,
                            color: drawing.color,
                            clicked: false
                        }, drawing.id);
                        break;
                    case 'Img':
                        paintImg(drawing);
                        updateImg({
                            img: drawing.img,
                            x: clientX - drawing.width/2,
                            y: clientY - drawing.height/2,
                            width: drawing.img.width,
                            height: drawing.img.height,
                            clicked: false
                        }, drawing.id);
                        break;
                }
    
            });
        }
    }

    const contextValue = {
        createRectangle: createRectangle,
    };
    return (
        <CanvasContext.Provider value={contextValue}>
            <section>
                <CanvasToolbar/>
                <div className='canvas-containor'>
                    <canvas onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className='my-canvas' ref={canvasRef} height={canvasHeight} width={canvasWidth} />
                </div>
            </section>
        </CanvasContext.Provider>
    );
};

export default Canvas;