import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';

function TextBoxButton() {
    const {createRectangle, updateRectangle, getDrawingById} = useContext(CanvasContext);
    const [textBoxes, setTextBoxes] = useState([]);

    function handleButtonClick() {
        const newTextBox = {
            x: 440,
            y: 220,
            width: 120,
            height: 60,
            color: 'white',
        }
        const rectangleId = createRectangle(newTextBox);
        setTextBoxes([...textBoxes, rectangleId ]);
    }

    function handleKeyDown(event) {
        const rect = getDrawingById(textBoxes[0]);
        switch(event.key) {
            case 'ArrowUp':
                updateRectangle({...rect, y: rect.y - 20}, textBoxes[0] );
                break;
            case 'ArrowDown':
                updateRectangle({...rect, y: rect.y + 20}, textBoxes[0] );
                break;
            case 'ArrowLeft':
                updateRectangle({...rect, x: rect.x - 20}, textBoxes[0] );
                break;
            case 'ArrowRight':
                updateRectangle({...rect, x: rect.x + 20}, textBoxes[0] );
            break;
        };
    };


    // useEffect(()=> {
    //     if(textBoxes.length > 0) {
    //         textBoxes.forEach((textBox)=> {
    //             updateRectangle(textBox.id, textBox);
    //         });
            
    //     };
    // },[textBoxes]);
    
    useEffect(()=>{
       document.addEventListener('keydown', handleKeyDown);
       return () => document.removeEventListener('keydown', handleKeyDown)
    });

    return (
        <button className='textbox-button' onClick={handleButtonClick} >add text box</button>
    );
};

export default TextBoxButton;