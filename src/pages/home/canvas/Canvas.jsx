import { useRef, useEffect, useState } from "react";
import CanvasToolbar from './toolbar/CanvasToolbar'; 
import CanvasContext from './CanvasContext'
import useDrawing from './hooks/useDrawing';

const Canvas = () => {
    const canvasWidth = 1000;
    const canvasHeight = 500;
    const canvasRef = useRef();
    const{ 
        drawings,
        createRectangle,
        createCircle,
        createImg,
        updateCircle,
        updateImg,
        updateRectangle,
        setClicked,
        getDrawingById,
    } = useDrawing();

    // this useEffect paints the drawings state on the canvas //
    useEffect(()=> {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log(drawings);
        drawings.forEach(drawing => {
            switch(drawing.type){
                case'Rectangle':
                    context.strokeStyle  = drawing.color;
                    context.strokeRect (drawing.x, drawing.y, drawing.width, drawing.height);
                    break;
                case 'Circle':
                    context.fillStyle = drawing.color;
                    context.beginPath();
                    context.arc(drawing.x, drawing.y, drawing.radius, 0, 2 * Math.PI);
                    context.fill();
                    break;
                case 'Img':
                    context.drawImage(drawing.img, drawing.x, drawing.y);
                    break;
            }
        });
    },[drawings]);

    
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
        const drawingsCliked = drawings.filter(drawing => (clientX >= drawing.x && clientX <= drawing.x + drawing.width && clientY >= drawing.y && clientY <= drawing.y + drawing.height))
        if (drawingsCliked) {
            drawingsCliked.forEach(drawing => setClicked(drawing.id, true));
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
        paintImg: paintImg,
        createRectangle: createRectangle,
        updateRectangle: updateRectangle,
        createCircle: createCircle,
        createImg: createImg,
        drawing: drawings,
        getDrawingById: getDrawingById
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