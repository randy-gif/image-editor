import { useRef, useEffect, useState } from "react";
import CanvasToolbar from './toolbar/CanvasToolbar'; 
import CanvasContext from './CanvasContext'
import useDrawing from './hooks/useDrawing';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();
    const{drawing, addDrawing} = useDrawing();

    // useEffect(() => {
    //     if (!canvasPosition) setCanvasPosition(canvasRef.current.getBoundingClientRect());
    //     function handleScroll() {
    //         setCanvasPosition(canvasRef.current.getBoundingClientRect());
    //     }
    //     window.addEventListener('scroll', handleScroll);
    // });



    // this useEffect paints the painting state on the canvas //
    useEffect(()=> {
        console.log(drawing);
        for (let i = 0; i < drawing.length; i++) {
            for (let j = 0; j < drawing[i].drawings.length; j++) {
                switch(drawing[i].type) {
                    case 'backgroundColor':
                        paintBackground(drawing[i].drawings[j]);
                    break;
                    case 'img':
                        paintImg(drawing[i].drawings[j]);
                    break;
                    case 'circle':
                        paintCircle(drawing[i].drawings[j]);
                    break;
                    case 'rectangle':
                        paintRect(drawing[i].drawings[j]);
                    break;
                    case 'triangle':
                        paintTriangle(drawing[i].drawings[j]);
                    break;
                    case 'line':
                        paintLine(drawing[i].drawings[j]);
                    break;
                    case 'text':
                        paintText(drawing[i].drawings[j]);
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
        if(imgObj.height > canvasHeight) {
            imgObj.width = ((imgObj.width * canvasHeight)/imgObj.height);
            imgObj.height = canvasHeight;
        }
        const x = ((canvasWidth - imgObj.width)/2);
        const y = ((canvasHeight - imgObj.height)/2);
        const ctx = canvasRef.current.getContext("2d");
        ctx.drawImage(imgObj, x, y, imgObj.width, imgObj.height);
    };

    function paintBackground(color) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0 , canvasWidth, canvasHeight);
    }
    const contextValue = {
        paintImg: paintImg,
        paintRect: paintRect,
        addDrawing: addDrawing,
    };
    return (
        <CanvasContext.Provider value={contextValue}>
            <section>
                <CanvasToolbar/>
                <div className='canvas-containor'>
                    <canvas className='my-canvas' ref={canvasRef} height={canvasHeight} width={canvasWidth} />
                </div>
            </section>
        </CanvasContext.Provider>
    );
};

export default Canvas;