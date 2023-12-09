import { useEffect, useContext, useRef} from 'react';
import MyContext from '../../MyContext';
import Rectangle from '../../Rectangle';


function TextBoxButton() {
    const {paintRect, canvasPosition } = useContext(MyContext);
    const textBox = useRef(Rectangle);
    const rectObj = textBox.current;

    function handleButtonClick() {
        rectObj.x = 420;
        rectObj.y = 220;
        rectObj.width = 160;
        rectObj.height = 60;
        rectObj.color = 'white';
        rectObj.id = 1

        paintRect(rectObj);
    }

    function handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowUp':
                rectObj.y = (rectObj.y - 20);
                paintRect(rectObj);
            break;
            case 'ArrowDown':
                rectObj.y = (rectObj.y + 20);
                paintRect(rectObj);            
            break;
            case 'ArrowLeft':
                rectObj.x = (rectObj.x - 20);
                paintRect(rectObj);            
            break;
            case 'ArrowRight':
                rectObj.x = (rectObj.x + 20);
                paintRect(rectObj);            
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
            console.log(mousePosition);
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