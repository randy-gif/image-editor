import React, { useEffect, useState, useContext } from "react";
import { BiPaint } from "react-icons/bi";
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, Theme } from '../../../theme';
import CanvasContext from "../../CanvasContext";
import Rectangle from '../../classes/RectangleClass.ts';
import createBitmap from '../../utils/createBitmap.tsx';

const styledDiv = styled.div<{theme: Theme}>`
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    
`;



const Drawing = () => {
    const [active, setActive] = useState<boolean>(false);
    const {addDrawing} = useContext(CanvasContext);

    const toggleActive = () => setActive((prevActive)=>!prevActive);

    const createRectBtn = () => {
        const rect = new Rectangle(625, 200, 100, 60, 'white');
        rect.drawOnCanvas();
        createBitmap(rect.canvas)
        .then((imageBitmap) => {
            rect.imageBitmap = imageBitmap;
            addDrawing(rect);
        });
    }
    return(
        <div>
            <div className="icon">
                <span id='drawing-button' className='sidebar-button' onClick={toggleActive}><BiPaint size={30}/></span>
            </div>
            <section className={`tooldrawer ${active? 'active' : ''}`}>
                <div>
                    <h2>{'Text'}</h2>
                    <div className='tooldrawer-containor'>
                        <label>tool
                            <input type='text'></input>
                        </label>
                        <label>Shapes
                            <button onClick={createRectBtn}>rectangle</button>
                        </label>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Drawing