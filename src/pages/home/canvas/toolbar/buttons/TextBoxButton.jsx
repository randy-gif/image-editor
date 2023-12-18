import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';

function TextBoxButton() {
    const {addRectangle, replaceRectangle} = useContext(CanvasContext);
    const [textBoxes, setTextBoxes] = useState([]);

    function handleButtonClick() {
        const newTextBox = {
            id: 2,
            x: 440,
            y: 220,
            width: 120,
            height: 60,
            color: 'white',
            draggable: true,
        }
        addRectangle(newTextBox);
        setTextBoxes([...textBoxes, newTextBox]);
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
                    return [ newObj]                
                }));
            break;
        };
    };


    useEffect(()=> {
        if(textBoxes.length > 0) {
            textBoxes.forEach((textBox)=> {
                replaceRectangle(textBox.id, textBox);
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