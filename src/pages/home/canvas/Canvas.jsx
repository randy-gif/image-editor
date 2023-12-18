import { useRef, useEffect, useState } from "react";
import CanvasToolbar from './toolbar/CanvasToolbar'; 
import CanvasContext from './CanvasContext'
import useDrawing from './hooks/useDrawing';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();
    const{
        drawings: drawings,
        addRectangle, 
        addBackgroundColor,
        addCircle, 
        addImg, 
        replaceRectangle, 
        replaceCircle, 
        replaceImg, 
        replaceBackgroundColor
    } = useDrawing();

    // this useEffect paints the painting state on the canvas //
    useEffect(()=> {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drawings.length; i++) {
            for (let j = 0; j < drawings[i].drawingObjs.length; j++) {
                switch(drawings[i].type) {
                    case 'backgroundColor':
                        paintBackground(drawings[i].drawingObjs[j]);
                    break;
                    case 'img':
                        paintImg(drawings[i].drawingObjs[j]);
                    break;
                    case 'circle':
                        paintCircle(drawings[i].drawingObjs[j]);
                    break;
                    case 'rectangle':
                        paintRect(drawings[i].drawingObjs[j]);
                    break;
                    case 'triangle':
                        paintTriangle(drawings[i].drawingObjs[j]);
                    break;
                    case 'line':
                        paintLine(drawings[i].drawingObjs[j]);
                    break;
                    case 'text':
                        paintText(drawings[i].drawingObjs[j]);
                    break;
                };
            };  
        };
    },[drawings]);

    function paintRect(rectObj) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.strokeStyle = rectObj.color;
        ctx.strokeRect(rectObj.x, rectObj.y , rectObj.width, rectObj.height);
    };
    
    function paintImg(imgObj) {
        if(imgObj.img.height > canvasHeight) {
            imgObj.img.width = ((imgObj.img.width * canvasHeight)/imgObj.img.height);
            imgObj.img.height = canvasHeight;
        }
        const x = ((canvasWidth - imgObj.img.width)/2);
        const y = ((canvasHeight - imgObj.img.height)/2);
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(imgObj.img, x, y, imgObj.img.width, imgObj.img.height);
    };

    function paintBackground(color) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0 , canvasWidth, canvasHeight);
    }

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

    const getDrawingsPosition = () => {
        return drawings.flatMap(drawing => drawing.drawingObjs.map(drawingObj => {
            return {id: drawingObj.id, x:drawingObj.x, y:drawingObj.y, width: drawingObj.width, height: drawingObj.height};
        }));
    }
    function handleMouseDown(e) {
        const drawingPosition = getDrawingsPosition();
        const canvasPosition = getCanvasPosition();
        const clientX = e.clientX - canvasPosition.x;
        const clientY = e.clientY - canvasPosition.y;
        if (drawingPosition.some(drawing => drawing.x <= clientX && drawing.x + drawing.width >= clientX && drawing.y <= clientY && drawing.y + drawing.height >= clientY)) {
            const drawingClicked = drawings.flatMap(drawing => drawing.drawingObjs.filter(drawingObj => drawingObj.x <= clientX && drawingObj.x + drawingObj.width >= clientX && drawingObj.y <= clientY && drawingObj.y + drawingObj.height >= clientY ));
            console.log(drawingClicked);
        }

    }

    function handleMouseUp() {

    }
    const contextValue = {
        paintImg: paintImg,
        paintRect: paintRect,
        addRectangle: addRectangle,
        addBackgroundColor: addBackgroundColor,
        addCircle: addCircle,
        addImg: addImg,
        drawing: drawings,
        replaceRectangle: replaceRectangle,
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