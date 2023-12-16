import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';

function TextBoxButton() {
    const {addDrawing } = useContext(CanvasContext);
    const [textBoxes, setTextBoxes] = useState([]);

    function handleButtonClick() {
        setTextBoxes((prevTextBoxes)=> {
            const newTextBox = {
                id: prevTextBoxes.length + 1,
                x: 440,
                y: 220,
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
                    const newObj = {...prevTextBoxes[0], y: prevTextBoxes[0].y - 20}
                    return [newObj]
                }));
                break;
            case 'ArrowDown':
                setTextBoxes((prevTextBoxes => {
                    const newObj = {...prevTextBoxes[0], y: prevTextBoxes[0].y + 20}
                    return [newObj]
                }));
                break;
            case 'ArrowLeft':
                setTextBoxes((prevTextBoxes => {
                    const newObj = {...prevTextBoxes[0], x: prevTextBoxes[0].x - 20}
                    return [newObj]               
                 }));                
                break;
            case 'ArrowRight':
                setTextBoxes((prevTextBoxes => {
                    const newObj = {...prevTextBoxes[0], x: prevTextBoxes[0].x + 20}
                    return [newObj]                
                }));
            break;
        };
    };


    useEffect(()=> {
        if(textBoxes.length > 0) {
            textBoxes.forEach((textBox)=> {
                addDrawing('rectangle', textBox)
            });
            
        };
    },[textBoxes]);
    
    useEffect(()=>{
       document.addEventListener('keydown', handleKeyDown);
       return () => document.removeEventListener('keydown', handleKeyDown)
    });

    return (
        <button className='textbox-button' onClick={handleButtonClick} >add text box</button>
    );
};

export default TextBoxButton;