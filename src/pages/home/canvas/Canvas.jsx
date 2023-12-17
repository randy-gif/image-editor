import { useRef, useEffect, useState } from "react";
import CanvasToolbar from './toolbar/CanvasToolbar'; 
import CanvasContext from './CanvasContext'
import useDrawing from './hooks/useDrawing';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();
    const{
        drawing,
        addRectangle, 
        addBackgroundColor,
        addCircle, 
        addImg, 
        replaceRectangle, 
        replaceCircle, 
        replaceImg, 
        replaceBackgroundColor
    } = useDrawing();

    // useEffect(() => {
    //     if (!canvasPosition) setCanvasPosition(canvasRef.current.getBoundingClientRect());
    //     function handleScroll() {
    //         setCanvasPosition(canvasRef.current.getBoundingClientRect());
    //     }
    //     window.addEventListener('scroll', handleScroll);
    // });



    // this useEffect paints the painting state on the canvas //
    useEffect(()=> {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drawing.length; i++) {
            for (let j = 0; j < drawing[i].drawingObjs.length; j++) {
                switch(drawing[i].type) {
                    case 'backgroundColor':
                        paintBackground(drawing[i].drawingObjs[j]);
                    break;
                    case 'img':
                        paintImg(drawing[i].drawingObjs[j]);
                    break;
                    case 'circle':
                        paintCircle(drawing[i].drawingObjs[j]);
                    break;
                    case 'rectangle':
                        paintRect(drawing[i].drawingObjs[j]);
                    break;
                    case 'triangle':
                        paintTriangle(drawing[i].drawingObjs[j]);
                    break;
                    case 'line':
                        paintLine(drawing[i].drawingObjs[j]);
                    break;
                    case 'text':
                        paintText(drawing[i].drawingObjs[j]);
                    break;
                };
            };  
        };
    },[drawing]);

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

    function handleMouseDown() {

    };

    function handleMouseUp() {

    }
    const contextValue = {
        paintImg: paintImg,
        paintRect: paintRect,
        addRectangle: addRectangle,
        addBackgroundColor: addBackgroundColor,
        addCircle: addCircle,
        addImg: addImg,
        drawing: drawing,
        handleMouseDown: handleMouseDown,
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