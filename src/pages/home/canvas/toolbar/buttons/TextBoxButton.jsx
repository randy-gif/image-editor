import { useEffect, useContext, useRef, useState} from 'react';
import CanvasContext from '../../CanvasContext';
import Rectangle from '../../../Rectangle';

class TextBox extends Rectangle {
    _text;
    _mouseDown;
    _mouseUp;

    constructor(x, y, width, height, color, id, text) {
        super(x, y, width, height, color, id);
        this._text = text;
        this._mouseDown = false;
        this._mouseUp = false;
    };
    get text() {
        return this._text;
    };
    get mouseUp() {
        return this._mouseUp;
    };
    get mouseDown() {
        return this._mouseDown;
    };
    set text(str) {
        this._text = str;
    };
    set mouseUp(boolean) {
        this._mouseUp = boolean;
    }
    set mouseDown(boolean) {
        this._mouseDown = boolean;
    }
};


function TextBoxButton() {
    const {paintRect, canvasPosition } = useContext(CanvasContext);
    const [textBox, setTextBox] = useState([TextBox]);

    function handleButtonClick() {
        setTextBox(prevTextBox => {
            const newTextBox = new TextBox;
            newTextBox.x = 420;
            newTextBox.y = 220;
            newTextBox.width = 160;
            newTextBox.height = 60;
            newTextBox.color = 'white';
            newTextBox.id = 1
            newTextBox.text = '';
            return [...prevTextBox, newTextBox]
        });
    };

    useEffect(() => {
        paintRect(textBox);
    },[textBox]);

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
        if(mousePosition.x >= textBox .x && mousePosition.x <= (textBox.x + textBox.width) && mousePosition.y >= textBox.y && mousePosition.y <= (textBox.y + textBox.height)) {
            textBox
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