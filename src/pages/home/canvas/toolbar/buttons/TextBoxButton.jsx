import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';



function TextBoxButton() {
    const {addDrawing, canvasPosition } = useContext(CanvasContext);
    const [textBoxes, setTextBoxes] = useState();

    function handleButtonClick() {
        setTextBoxes((prevTextBoxes)=> {
            const newTextBox = {
                id: textBoxes.length + 1,
                x: 940,
                y: 470,
                width: 120,
                height: 60,
                color: 'white',
            }
            return [...prevTextBoxes, newTextBox]
        }) 
    }

    function handleKeyDown(event) {
        switch(event.key) {
            case 'ArrowUp':
                setTextBoxes((prevTextBoxes => {
                    return {...prevTextBoxes, y: prevTextBoxes.y - 20}
                }));
                break;
            case 'ArrowDown':
                setTextBoxes((prevTextBoxes => {
                    return {...prevTextBoxes, y: prevTextBoxes.y + 20}
                }));
                break;
            case 'ArrowLeft':
                setTextBoxes((prevTextBoxes => {
                    return {...prevTextBoxes, x: prevTextBoxes.x - 20}
                }));                
                break;
            case 'ArrowRight':
                setTextBoxes((prevTextBoxes => {
                    return {...prevTextBoxes, x: prevTextBoxes.x + 20}
                }));
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
        if(mousePosition.x >= textBoxes.x && mousePosition.x <= (textBoxes.x + textBoxes.width) && mousePosition.y >= textBoxes.y && mousePosition.y <= (textBoxes.y + textBoxes.height)) {
        };

    };

    useEffect(()=> {
        addDrawing('rectangle', textBoxes);
    },[textBoxes]);
    
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