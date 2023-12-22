import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';
import useDrawingObjArray from '../../hooks/useDrawing';

function TextBoxButton() {
    const { createRectangle } = useContext(CanvasContext);
    const [textBoxes, setTextBoxes] = useState([]);
    const { addDrawing, removeDrawing, updateDrawing } = useDrawingObjArray();

    async function handleButtonClick() {
        const rectangleObj = await createRectangle(440, 220, 120, 60, 'white');
        console.log(rectangleObj);
        addDrawing(rectangleObj);
        setTextBoxes([...textBoxes, rectangleObj ]);
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