import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';



function TextBoxButton() {
    const {addDrawing, canvasPosition } = useContext(CanvasContext);


    function handleButtonClick() {
        const rectObj = {x:0, y:0, width: 0, height: 0, color: 'white', id: 1};
        rectObj.x = 420;
        rectObj.y = 220;
        rectObj.width = 160;
        rectObj.height = 60;
        rectObj.color = 'white';
        rectObj.id = 1

        rectObj.id = 1;
        rectObj.x = 440;
        rectObj.y = 220;
        rectObj.width = 160;
        rectObj.height = 60;
        rectObj.color = 'white';

        console.log(rectObj);

        addDrawing('rectangle', rectObj);
    }

    function handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowUp':
                rectObj.y -= 20;
                console.log(rectObj);
                addDrawing('rectangle', rectObj);
                break;
            case 'ArrowDown':
                rectObj.y = (rectObj.y + 20);
                addDrawing('rectangle', rectObj);
                break;
            case 'ArrowLeft':
                rectObj.x = (rectObj.x - 20);
                addDrawing('rectangle', rectObj);
                break;
            case 'ArrowRight':
                rectObj.x = (rectObj.x + 20);
                addDrawing('rectangle', rectObj);
            break;
        };
    };
    function handleClick(e) {
        let mousePosition = {}
        if(e.clientX <= canvasPosition.x || e.clientX >= (canvasPosition.x + canvasPosition.width)) {
            mousePosition = { x: 0, y: 0 };
        }
        else if(e.clientY <= canvasPosition.y || e.clientY >= (canvasPosition.y + canvasPosition.height)) {
            mousePosition = { x: 0, y: 0 };
        }
        else {
            mousePosition = { x: (e.clientX - canvasPosition.x), y: (e.clientY - canvasPosition.y) };
        };
        if(mousePosition.x >= rectObj.x && mousePosition.x <= (rectObj.x + rectObj.width) && mousePosition.y >= rectObj.y && mousePosition.y <= (rectObj.y + rectObj.height)) {
        };

    }
    useEffect(()=>{
       window.addEventListener('keydown', handleKeyDown);
       return () => window.removeEventListener('keydown', handleKeyDown)
    });

    useEffect(()=>{
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick)
    });

    useEffect(()=>{
        document.addEventListener('mouseup', handleClick);
        return () => document.removeEventListener('mouseup', handleClick)
    });

    return (
        <button className='textbox-button' onClick={handleButtonClick} >add text box</button>
    );
};

export default TextBoxButton;